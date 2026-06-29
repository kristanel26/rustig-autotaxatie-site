import { createClient } from 'npm:@supabase/supabase-js@2';
import { corsHeaders } from 'npm:@supabase/supabase-js@2/cors';

const SUPABASE_URL = Deno.env.get('SUPABASE_URL')!;
const SERVICE_ROLE_KEY = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!;
const RESEND_API_KEY = Deno.env.get('RESEND_API_KEY');
const LOVABLE_API_KEY = Deno.env.get('LOVABLE_API_KEY');

const TO_EMAIL = 'algemeen@automobieltaxaties.nl';
const FROM_EMAIL = 'Automobiel Taxaties <aanvraag@taxaris.nl>';

interface AanvraagBody {
  bron: string;
  service_type?: string;
  naam?: string;
  email?: string;
  telefoon?: string;
  kenteken?: string;
  merk_model?: string;
  voertuig_type?: string;
  postcode?: string;
  stad?: string;
  adres?: string;
  gewenste_datum?: string;
  bericht?: string;
  payload?: Record<string, unknown>;
}

const FIELD_LABELS: Record<string, string> = {
  bron: 'Bron',
  service_type: 'Type taxatie',
  naam: 'Naam',
  email: 'E-mail',
  telefoon: 'Telefoon',
  kenteken: 'Kenteken',
  merk_model: 'Merk en model',
  voertuig_type: 'Voertuigtype',
  postcode: 'Postcode',
  stad: 'Stad',
  adres: 'Adres',
  gewenste_datum: 'Gewenste datum',
  bericht: 'Bericht',
};

const escapeHtml = (s: string) =>
  s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');

function buildEmailHtml(body: AanvraagBody): { subject: string; html: string; text: string } {
  const serviceType = body.service_type || body.bron;
  const naam = body.naam || 'onbekend';
  const subject = `Nieuwe aanvraag via website: ${serviceType} - ${naam}`;

  const rows: string[] = [];
  const textLines: string[] = [];

  for (const [key, label] of Object.entries(FIELD_LABELS)) {
    const v = (body as Record<string, unknown>)[key];
    if (v === undefined || v === null || v === '') continue;
    rows.push(
      `<tr><td style="padding:6px 12px;border-bottom:1px solid #eee;font-weight:600;color:#1d3c71;vertical-align:top;">${escapeHtml(label)}</td><td style="padding:6px 12px;border-bottom:1px solid #eee;">${escapeHtml(String(v))}</td></tr>`
    );
    textLines.push(`${label}: ${v}`);
  }

  // Extra payload fields not already in standard fields
  if (body.payload && typeof body.payload === 'object') {
    const extras = Object.entries(body.payload).filter(
      ([k, v]) =>
        !(k in FIELD_LABELS) &&
        v !== undefined &&
        v !== null &&
        v !== '' &&
        !(typeof v === 'object' && Object.keys(v as object).length === 0)
    );
    if (extras.length > 0) {
      rows.push(
        `<tr><td colspan="2" style="padding:14px 12px 6px;font-weight:700;color:#1d3c71;border-bottom:2px solid #ff751f;">Aanvullende gegevens</td></tr>`
      );
      textLines.push('', 'Aanvullende gegevens:');
      for (const [k, v] of extras) {
        const val = typeof v === 'object' ? JSON.stringify(v) : String(v);
        rows.push(
          `<tr><td style="padding:6px 12px;border-bottom:1px solid #eee;font-weight:600;color:#1d3c71;vertical-align:top;">${escapeHtml(k)}</td><td style="padding:6px 12px;border-bottom:1px solid #eee;">${escapeHtml(val)}</td></tr>`
        );
        textLines.push(`${k}: ${val}`);
      }
    }
  }

  const datum = new Date().toLocaleString('nl-NL', { timeZone: 'Europe/Amsterdam' });

  const html = `<!doctype html><html><body style="font-family:Arial,sans-serif;background:#f7f8fa;padding:24px;">
  <div style="max-width:640px;margin:0 auto;background:#fff;border-radius:8px;overflow:hidden;border:1px solid #e2e8f0;">
    <div style="background:#1d3c71;color:#fff;padding:20px 24px;">
      <div style="font-size:12px;letter-spacing:0.1em;text-transform:uppercase;color:#ff751f;">Nieuwe aanvraag</div>
      <div style="font-size:20px;font-weight:700;margin-top:4px;">${escapeHtml(subject)}</div>
      <div style="font-size:13px;opacity:0.85;margin-top:6px;">Ontvangen op ${escapeHtml(datum)}</div>
    </div>
    <table style="width:100%;border-collapse:collapse;font-size:14px;color:#1a1a1a;">${rows.join('')}</table>
  </div></body></html>`;

  const text = `Nieuwe aanvraag via website\nOntvangen: ${datum}\n\n${textLines.join('\n')}`;

  return { subject, html, text };
}

Deno.serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response('ok', { headers: corsHeaders });
  }

  if (req.method !== 'POST') {
    return new Response(JSON.stringify({ error: 'Method not allowed' }), {
      status: 405,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  }

  try {
    const body: AanvraagBody = await req.json();

    if (!body || typeof body !== 'object' || !body.bron) {
      return new Response(JSON.stringify({ error: 'Ongeldige aanvraag (bron ontbreekt)' }), {
        status: 400,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      });
    }

    const supabase = createClient(SUPABASE_URL, SERVICE_ROLE_KEY);

    const { data: inserted, error: dbError } = await supabase
      .from('aanvragen')
      .insert({
        bron: body.bron,
        service_type: body.service_type ?? null,
        naam: body.naam ?? null,
        email: body.email ?? null,
        telefoon: body.telefoon ?? null,
        kenteken: body.kenteken ?? null,
        merk_model: body.merk_model ?? null,
        voertuig_type: body.voertuig_type ?? null,
        postcode: body.postcode ?? null,
        stad: body.stad ?? null,
        adres: body.adres ?? null,
        gewenste_datum: body.gewenste_datum ?? null,
        bericht: body.bericht ?? null,
        payload: body.payload ?? null,
      })
      .select('id')
      .single();

    if (dbError) {
      console.error('DB insert error', dbError);
      return new Response(JSON.stringify({ error: 'Opslaan mislukt' }), {
        status: 500,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      });
    }

    const { subject, html, text } = buildEmailHtml(body);

    // Send via Resend — prefer direct Resend API with RESEND_API_KEY.
    // Fall back to Lovable connector gateway if only LOVABLE_API_KEY is available.
    let emailOk = false;
    let emailError: string | null = null;

    const payload = {
      from: FROM_EMAIL,
      to: [TO_EMAIL],
      reply_to: body.email || undefined,
      subject,
      html,
      text,
    };

    try {
      if (RESEND_API_KEY) {
        const res = await fetch('https://api.resend.com/emails', {
          method: 'POST',
          headers: {
            Authorization: `Bearer ${RESEND_API_KEY}`,
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(payload),
        });
        if (!res.ok) {
          emailError = `Resend ${res.status}: ${await res.text()}`;
        } else {
          emailOk = true;
        }
      } else if (LOVABLE_API_KEY) {
        const res = await fetch('https://connector-gateway.lovable.dev/resend/emails', {
          method: 'POST',
          headers: {
            Authorization: `Bearer ${LOVABLE_API_KEY}`,
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(payload),
        });
        if (!res.ok) {
          emailError = `Gateway ${res.status}: ${await res.text()}`;
        } else {
          emailOk = true;
        }
      } else {
        emailError = 'Geen Resend configuratie gevonden';
      }
    } catch (e) {
      emailError = (e as Error).message;
    }

    if (!emailOk) {
      console.error('Email send failed', emailError);
      // The aanvraag is saved; still report failure so the UI can react.
      return new Response(
        JSON.stringify({ error: 'Versturen e-mail mislukt', id: inserted?.id }),
        {
          status: 502,
          headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        }
      );
    }

    return new Response(JSON.stringify({ success: true, id: inserted?.id }), {
      status: 200,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  } catch (e) {
    console.error('Unhandled error', e);
    return new Response(JSON.stringify({ error: 'Onverwachte fout' }), {
      status: 500,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  }
});
