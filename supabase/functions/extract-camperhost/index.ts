const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type, x-supabase-client-platform, x-supabase-client-platform-version, x-supabase-client-runtime, x-supabase-client-runtime-version',
};

Deno.serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { fileUrls } = await req.json();

    if (!fileUrls || !Array.isArray(fileUrls) || fileUrls.length === 0) {
      return new Response(
        JSON.stringify({ success: false, error: 'fileUrls is required' }),
        { status: 400, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    const apiKey = Deno.env.get('LOVABLE_API_KEY');
    if (!apiKey) {
      return new Response(
        JSON.stringify({ success: false, error: 'AI gateway not configured' }),
        { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    // Download each file and convert to base64 for the AI
    const fileContents: { name: string; base64: string; mimeType: string }[] = [];

    for (const fileUrl of fileUrls) {
      try {
        const resp = await fetch(fileUrl);
        if (!resp.ok) {
          console.error(`Failed to fetch ${fileUrl}: ${resp.status}`);
          continue;
        }
        const buffer = await resp.arrayBuffer();
        const uint8 = new Uint8Array(buffer);
        let binary = '';
        for (let i = 0; i < uint8.length; i++) {
          binary += String.fromCharCode(uint8[i]);
        }
        const base64 = btoa(binary);

        const contentType = resp.headers.get('content-type') || 'application/pdf';
        const name = fileUrl.split('/').pop() || 'document';

        fileContents.push({ name, base64, mimeType: contentType });
      } catch (e) {
        console.error(`Error downloading file ${fileUrl}:`, e);
      }
    }

    if (fileContents.length === 0) {
      return new Response(
        JSON.stringify({ success: false, error: 'Could not download any files' }),
        { status: 400, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    // Build multimodal content for Gemini (supports PDF natively)
    const contentParts: any[] = [];

    for (const file of fileContents) {
      contentParts.push({
        type: 'file',
        file: {
          filename: file.name,
          file_data: `data:${file.mimeType};base64,${file.base64}`,
        },
      });
    }

    contentParts.push({
      type: 'text',
      text: `Je bent een expert in het uitlezen van CamperHost keuringsrapporten en taxatieformulieren voor campers/kampeerauto's.

Analyseer de bijgevoegde documenten en extraheer ALLE gegevens die je kunt vinden. Organiseer de gegevens in de volgende secties:

1. **voertuig** (Voertuiggegevens): kenteken, merk, model, bouwjaar, chassisnummer (VIN), brandstof, transmissie, kleur, carrosserievorm, vermogen, cilinderinhoud, tellerstand, etc.
2. **opbouw** (Opbouwgegevens): opbouw merk, opbouw type, soort bouw, constructievorm, gebruik, etc.
3. **klant** (Klantgegevens): naam, adres, postcode, woonplaats, telefoon, e-mail, etc.
4. **inspectie** (Inspectiegegevens): inspectiedatum, locatie, begin- en eindtijd, etc.
5. **exterieur** (Exterieur conditie): staat van lak, carrosserie, ramen, rubber, chroom, kit, etc.
6. **interieur** (Interieur conditie): dashboard, bekleding, vloer, dak, keuken, sanitair, etc.
7. **technisch** (Technische conditie): motor, remmen, ophanging, stuurinrichting, transmissie, elektra, etc.
8. **installaties** (Installaties): gas, water, elektra, spanning, accu, etc.
9. **vocht_veiligheid** (Vocht & Veiligheid): vochtmeting, rookmelder, brandblusser, gasdetectie, etc.
10. **banden** (Banden): bandenmaat, merk, profiel, DOT-code per positie, velgtype, etc.
11. **algemeen** (Algemene indruk): algemene staat, kwaliteitsklasse, opmerkingen, etc.

Antwoord UITSLUITEND in het volgende JSON-formaat, zonder markdown codeblokken:

{
  "sections": [
    {
      "key": "voertuig",
      "label": "Voertuiggegevens",
      "fields": {
        "license_plate": { "label": "Kenteken", "value": "XX-999-X" },
        "vin": { "label": "Chassisnummer", "value": "..." }
      }
    }
  ]
}

Regels:
- Gebruik de exacte section keys zoals hierboven.
- De field keys moeten overeenkomen met database-veldnamen (snake_case, Engels).
- Geef alleen velden terug die je daadwerkelijk in de documenten hebt gevonden.
- Als een waarde onduidelijk is, geef dan je beste inschatting.
- Labels altijd in het Nederlands.
- Geef GEEN lege secties terug.`,
    });

    console.log('Calling AI gateway for CamperHost extraction...');

    const aiResponse = await fetch('https://ai.gateway.lovable.dev/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${apiKey}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        model: 'google/gemini-2.5-flash',
        messages: [
          {
            role: 'user',
            content: contentParts,
          },
        ],
        temperature: 0.1,
        max_tokens: 8000,
      }),
    });

    if (!aiResponse.ok) {
      const errText = await aiResponse.text();
      console.error('AI gateway error:', aiResponse.status, errText);
      return new Response(
        JSON.stringify({ success: false, error: `AI error: ${aiResponse.status}` }),
        { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    const aiData = await aiResponse.json();
    const rawContent = aiData.choices?.[0]?.message?.content || '';

    console.log('AI response received, parsing...');

    // Strip markdown code fences if present
    let jsonStr = rawContent.trim();
    if (jsonStr.startsWith('```')) {
      jsonStr = jsonStr.replace(/^```(?:json)?\n?/, '').replace(/\n?```$/, '');
    }

    let parsed;
    try {
      parsed = JSON.parse(jsonStr);
    } catch (parseErr) {
      console.error('Failed to parse AI response:', jsonStr.substring(0, 500));
      return new Response(
        JSON.stringify({
          success: false,
          error: 'Kon het AI-antwoord niet verwerken',
          raw: jsonStr.substring(0, 1000),
        }),
        { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    return new Response(
      JSON.stringify({
        success: true,
        sections: parsed.sections || [],
        extractedAt: new Date().toISOString(),
      }),
      { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );
  } catch (error) {
    console.error('Error in extract-camperhost:', error);
    return new Response(
      JSON.stringify({ success: false, error: error.message || 'Internal error' }),
      { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );
  }
});
