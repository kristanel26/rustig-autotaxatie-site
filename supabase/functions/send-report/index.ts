import { createClient } from 'https://esm.sh/@supabase/supabase-js@2'

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type, x-supabase-client-platform, x-supabase-client-platform-version, x-supabase-client-runtime, x-supabase-client-runtime-version',
}

Deno.serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders })
  }

  try {
    // Authenticate user
    const authHeader = req.headers.get('Authorization')
    if (!authHeader?.startsWith('Bearer ')) {
      return new Response(JSON.stringify({ error: 'Unauthorized' }), { status: 401, headers: corsHeaders })
    }

    const supabaseUrl = Deno.env.get('SUPABASE_URL')!
    const supabaseAnonKey = Deno.env.get('SUPABASE_ANON_KEY')!
    const supabase = createClient(supabaseUrl, supabaseAnonKey, {
      global: { headers: { Authorization: authHeader } },
    })

    const token = authHeader.replace('Bearer ', '')
    const { data: claimsData, error: claimsError } = await supabase.auth.getClaims(token)
    if (claimsError || !claimsData?.claims) {
      return new Response(JSON.stringify({ error: 'Unauthorized' }), { status: 401, headers: corsHeaders })
    }
    const userId = claimsData.claims.sub

    // Parse request body
    const { reportId, recipientEmail, subject, body } = await req.json()
    if (!reportId || !recipientEmail || !subject || !body) {
      return new Response(JSON.stringify({ error: 'Missing required fields' }), { status: 400, headers: corsHeaders })
    }

    // Verify the report belongs to this user
    const { data: report, error: reportError } = await supabase
      .from('reports')
      .select('id, document_reference, license_plate, status')
      .eq('id', reportId)
      .eq('user_id', userId)
      .single()

    if (reportError || !report) {
      return new Response(JSON.stringify({ error: 'Rapport niet gevonden' }), { status: 404, headers: corsHeaders })
    }

    // List files in the report's folder in finalized-reports bucket
    const serviceClient = createClient(supabaseUrl, Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!)
    const { data: files, error: listError } = await serviceClient.storage
      .from('finalized-reports')
      .list(reportId, { limit: 1, sortBy: { column: 'created_at', order: 'desc' } })

    if (listError || !files || files.length === 0) {
      return new Response(JSON.stringify({ error: 'Geen PDF gevonden. Rond het rapport eerst af.' }), { status: 400, headers: corsHeaders })
    }

    const pdfPath = `${reportId}/${files[0].name}`

    // Download the PDF
    const { data: pdfData, error: downloadError } = await serviceClient.storage
      .from('finalized-reports')
      .download(pdfPath)

    if (downloadError || !pdfData) {
      return new Response(JSON.stringify({ error: 'PDF downloaden mislukt' }), { status: 500, headers: corsHeaders })
    }

    // Convert to base64 for Resend attachment
    const arrayBuffer = await pdfData.arrayBuffer()
    const base64 = btoa(String.fromCharCode(...new Uint8Array(arrayBuffer)))

    // Send email via Resend
    const resendApiKey = Deno.env.get('RESEND_API_KEY')
    if (!resendApiKey) {
      return new Response(JSON.stringify({ error: 'RESEND_API_KEY not configured' }), { status: 500, headers: corsHeaders })
    }

    const resendResponse = await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${resendApiKey}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        from: 'Taxaris <noreply@taxaris.nl>',
        to: [recipientEmail],
        subject: subject,
        text: body,
        attachments: [
          {
            filename: files[0].name,
            content: base64,
          },
        ],
      }),
    })

    const resendResult = await resendResponse.json()

    if (!resendResponse.ok) {
      console.error('Resend error:', resendResult)
      // Log failed delivery
      await supabase.from('report_deliveries').insert({
        report_id: reportId,
        sent_to_email: recipientEmail,
        status: 'failed',
        error_message: resendResult?.message || 'Unknown Resend error',
      })
      return new Response(JSON.stringify({ error: `E-mail verzenden mislukt: ${resendResult?.message || 'onbekende fout'}` }), {
        status: 500, headers: corsHeaders,
      })
    }

    // Log successful delivery
    await supabase.from('report_deliveries').insert({
      report_id: reportId,
      sent_to_email: recipientEmail,
      status: 'sent',
      email_provider_message_id: resendResult.id || null,
    })

    // Update report status to verzonden
    await supabase.from('reports').update({
      status: 'verzonden',
      sent_at: new Date().toISOString(),
    }).eq('id', reportId)

    return new Response(JSON.stringify({ success: true, messageId: resendResult.id }), {
      status: 200,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    })
  } catch (error) {
    console.error('Error in send-report:', error)
    const message = error instanceof Error ? error.message : 'Unknown error'
    return new Response(JSON.stringify({ error: message }), {
      status: 500,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    })
  }
})
