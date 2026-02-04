import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type, x-supabase-client-platform, x-supabase-client-platform-version, x-supabase-client-runtime, x-supabase-client-runtime-version',
};

interface ExtractionResult {
  field_key: string;
  proposed_value: string | null;
  status: 'zeker' | 'waarschijnlijk' | 'ontbreekt';
  confidence: number;
  raw_text?: string;
}

interface ExtractRequest {
  section: 'voertuigidentificatie' | 'tellerstand' | 'banden' | 'massa' | 'gasinstallatie';
  photo_urls: string[];
  photo_types: string[];
}

// System prompts per section
const SYSTEM_PROMPTS: Record<string, string> = {
  voertuigidentificatie: `Je bent een expert in het lezen van voertuigdocumenten en kentekenplaten.
Analyseer de foto's en extraheer ALLEEN:
1. Kenteken (Nederlands kentekenformaat zoals XX-XX-XX of X-XXX-XX)
2. VIN/Chassisnummer (17 karakters, letters en cijfers)

Antwoord uitsluitend met JSON, zonder extra tekst. Gebruik dit exacte formaat:
{
  "results": [
    {
      "field_key": "license_plate",
      "proposed_value": "XX-123-X",
      "status": "zeker|waarschijnlijk|ontbreekt",
      "confidence": 0-100,
      "raw_text": "originele tekst van de foto"
    },
    {
      "field_key": "vin",
      "proposed_value": "WVWZZZ3CZWE123456",
      "status": "zeker|waarschijnlijk|ontbreekt",
      "confidence": 0-100,
      "raw_text": "originele tekst van de foto"
    }
  ]
}

Regels:
- Als je iets niet kunt lezen, gebruik status "ontbreekt" en confidence 0
- Als je onzeker bent, gebruik status "waarschijnlijk" met lagere confidence
- Als je zeker bent, gebruik status "zeker" met hoge confidence (80+)
- Geef NOOIT waarden die je niet daadwerkelijk ziet
- VIN moet exact 17 karakters zijn`,

  tellerstand: `Je bent een expert in het lezen van dashboards en kilometertellers.
Analyseer de dashboardfoto en extraheer ALLEEN de kilometerstand (odometer).

BELANGRIJK:
- Zoek naar de TOTALE kilometerstand, NIET de dagstand/trip meter
- De kilometerteller toont meestal het grootste getal
- Negeer brandstofmeters, snelheidsmeters en andere displays

Antwoord uitsluitend met JSON, zonder extra tekst. Gebruik dit exacte formaat:
{
  "results": [
    {
      "field_key": "tellerstand",
      "proposed_value": "123456",
      "status": "zeker|waarschijnlijk|ontbreekt",
      "confidence": 0-100,
      "raw_text": "originele tekst van display"
    }
  ]
}

Als je meerdere mogelijke waarden ziet, geef de meest waarschijnlijke (hoogste getal dat een odometer kan zijn).
Geef de waarde als geheel getal in kilometers, zonder punten of komma's.`,

  banden: `Je bent een expert in het lezen van bandenzijwanden en bandenlabels.
Analyseer de foto('s) en extraheer ALLE zichtbare bandinformatie per band.

LET OP: Elke foto is getagged met een positie (band_voor_links, band_voor_rechts, band_achter_links, band_achter_rechts).
Extraheer per foto de volgende gegevens:

1. BANDENMERK - Zoek naar de merknaam op de zijwand (bijv. Michelin, Continental, Pirelli, Hankook, Bridgestone)
   BELANGRIJK: Het merk staat altijd groot op de zijwand. Negeer:
   - Velgmerken (die staan op de velg, niet op de band)
   - Voertuigmerken
   - Mascotte namen (zoals "Bibendum" voor Michelin)
   
2. MODEL - Het type/model van de band (bijv. "Pilot Sport 4", "CrossClimate+", "Primacy 4")

3. BANDENMAAT - Formaat zoals "215/70 R15 C" of "225/45 R17"

4. DOT-CODE - De 4 cijfers na "DOT" die productieweek/jaar aangeven (bijv. "2521" = week 25, jaar 2021)

De foto_types worden meegegeven. Gebruik deze om de juiste field_key prefix te bepalen:
- band_voor_links → tire_front_left_
- band_voor_rechts → tire_front_right_
- band_achter_links → tire_rear_left_
- band_achter_rechts → tire_rear_right_

Antwoord ALLEEN in dit exacte JSON formaat:
{
  "results": [
    {
      "field_key": "tire_front_left_brand",
      "proposed_value": "Michelin",
      "status": "zeker|waarschijnlijk|ontbreekt",
      "confidence": 0-100,
      "raw_text": "originele tekst van zijwand"
    },
    {
      "field_key": "tire_front_left_model",
      "proposed_value": "Pilot Sport 4",
      "status": "zeker|waarschijnlijk|ontbreekt",
      "confidence": 0-100,
      "raw_text": "originele tekst"
    },
    {
      "field_key": "tire_size",
      "proposed_value": "215/70 R15 C",
      "status": "zeker|waarschijnlijk|ontbreekt",
      "confidence": 0-100,
      "raw_text": "originele tekst"
    },
    {
      "field_key": "tire_front_left_dot",
      "proposed_value": "2521",
      "status": "zeker|waarschijnlijk|ontbreekt",
      "confidence": 0-100,
      "raw_text": "originele tekst"
    }
  ]
}

Regels:
- DOT-code is ALTIJD exact 4 cijfers
- Bandenmaat volgt het formaat: breedte/hoogte R diameter [loadindex/speedrating]
- Als het merk niet duidelijk leesbaar is, gebruik status "ontbreekt" - GEEN gokken
- Geef per foto resultaten met de juiste positie-prefix
- Als je meerdere foto's analyseert, geef resultaten voor elke positie apart`,

  massa: `Je bent een expert in het lezen van voertuigtypeplaatjes voor massa's en gewichten.
Analyseer de typeplaat en extraheer ALLEEN numerieke kg-waarden voor:
1. Toegestane max massa (GVW/maximum mass)
2. Max combinatie massa (GCW/train weight) - indien aanwezig
3. Aslast voor (front axle load)
4. Aslast achter (rear axle load)

Antwoord ALLEEN in dit exacte JSON formaat:
{
  "results": [
    {
      "field_key": "max_massa",
      "proposed_value": "3500",
      "status": "zeker|waarschijnlijk|ontbreekt",
      "confidence": 0-100,
      "raw_text": "originele tekst"
    },
    {
      "field_key": "max_combinatie_massa",
      "proposed_value": "5500",
      "status": "zeker|waarschijnlijk|ontbreekt",
      "confidence": 0-100,
      "raw_text": "originele tekst"
    },
    {
      "field_key": "aslast_voor",
      "proposed_value": "1800",
      "status": "zeker|waarschijnlijk|ontbreekt",
      "confidence": 0-100,
      "raw_text": "originele tekst"
    },
    {
      "field_key": "aslast_achter",
      "proposed_value": "2000",
      "status": "zeker|waarschijnlijk|ontbreekt",
      "confidence": 0-100,
      "raw_text": "originele tekst"
    }
  ]
}

Geef waarden als gehele getallen in kg, zonder eenheden of punten.`,

  gasinstallatie: `Je bent een expert in het lezen van gasinstallatie-labels en stickers.
Analyseer de foto's en extraheer informatie over:
1. Type gasinstallatie (onderbouw LPG of losse gastank(s))
2. Gasslang productiedatum (formaat: MM/JJJJ of JJJJ-MM)
3. Drukregelaar productiedatum (formaat: MM/JJJJ of JJJJ-MM)

Antwoord ALLEEN in dit exacte JSON formaat:
{
  "results": [
    {
      "field_key": "gas_type",
      "proposed_value": "onderbouw_lpg|losse_gastank",
      "status": "zeker|waarschijnlijk|ontbreekt",
      "confidence": 0-100,
      "raw_text": "originele tekst"
    },
    {
      "field_key": "gas_hose_date",
      "proposed_value": "03/2022",
      "status": "zeker|waarschijnlijk|ontbreekt",
      "confidence": 0-100,
      "raw_text": "originele tekst"
    },
    {
      "field_key": "pressure_regulator_date",
      "proposed_value": "06/2021",
      "status": "zeker|waarschijnlijk|ontbreekt",
      "confidence": 0-100,
      "raw_text": "originele tekst"
    }
  ]
}

BELANGRIJK: Maak GEEN aannames over veiligheid of compliance. Rapporteer alleen wat je ziet.`
};

serve(async (req) => {
  // Handle CORS preflight
  if (req.method === 'OPTIONS') {
    return new Response('ok', { headers: corsHeaders });
  }

  try {
    const LOVABLE_API_KEY = Deno.env.get('LOVABLE_API_KEY');
    if (!LOVABLE_API_KEY) {
      console.error('LOVABLE_API_KEY is not configured');
      return new Response(
        JSON.stringify({ error: 'AI service is not configured' }),
        { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    const { section, photo_urls, photo_types }: ExtractRequest = await req.json();

    console.log(`Processing ${section} extraction with ${photo_urls.length} photos`);

    if (!photo_urls || photo_urls.length === 0) {
      return new Response(
        JSON.stringify({ 
          error: 'Geen foto\'s van het juiste type gevonden',
          results: [] 
        }),
        { status: 200, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    const systemPrompt = SYSTEM_PROMPTS[section];
    if (!systemPrompt) {
      return new Response(
        JSON.stringify({ error: 'Ongeldige sectie' }),
        { status: 400, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    // Build message content with images
    const imageContents = photo_urls.map((url, index) => ({
      type: 'image_url' as const,
      image_url: { url }
    }));

    const userContent = [
      { type: 'text' as const, text: `Analyseer deze ${photo_urls.length} foto('s) en extraheer de gevraagde gegevens. Foto types: ${photo_types.join(', ')}` },
      ...imageContents
    ];

    console.log('Calling Lovable AI Gateway...');

    const response = await fetch('https://ai.gateway.lovable.dev/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${LOVABLE_API_KEY}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        model: 'google/gemini-2.5-flash',
        messages: [
          { role: 'system', content: systemPrompt },
          { role: 'user', content: userContent }
        ],
        max_tokens: 2000,
      }),
    });

    if (!response.ok) {
      const errorText = await response.text();
      console.error(`AI Gateway error: ${response.status} - ${errorText}`);
      
      if (response.status === 429) {
        return new Response(
          JSON.stringify({ error: 'Te veel verzoeken, probeer het later opnieuw' }),
          { status: 429, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
        );
      }
      if (response.status === 402) {
        return new Response(
          JSON.stringify({ error: 'AI-credits zijn op, neem contact op met beheer' }),
          { status: 402, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
        );
      }
      
      return new Response(
        JSON.stringify({ error: 'AI-service tijdelijk niet beschikbaar' }),
        { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    const data = await response.json();
    const content = data.choices?.[0]?.message?.content;

    console.log('AI Response:', content);

    if (!content) {
      return new Response(
        JSON.stringify({ 
          error: 'Geen resultaten van AI',
          results: [] 
        }),
        { status: 200, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    // Parse JSON from response (handle markdown code blocks and extra text)
    let jsonContent = content;
    
    // First try to extract JSON from markdown code blocks
    const jsonMatch = content.match(/```(?:json)?\s*([\s\S]*?)```/);
    if (jsonMatch) {
      jsonContent = jsonMatch[1].trim();
    } else {
      // Fallback: find the first { to the last } as valid JSON
      const firstBrace = content.indexOf('{');
      const lastBrace = content.lastIndexOf('}');
      if (firstBrace !== -1 && lastBrace !== -1 && lastBrace > firstBrace) {
        jsonContent = content.substring(firstBrace, lastBrace + 1);
      }
    }

    try {
      const parsed = JSON.parse(jsonContent);
      const results: ExtractionResult[] = parsed.results || [];

      console.log(`Extracted ${results.length} results`);

      return new Response(
        JSON.stringify({ 
          results,
          photo_urls,
          section 
        }),
        { status: 200, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    } catch (parseError) {
      console.error('Failed to parse AI response:', parseError, 'Content:', jsonContent);
      return new Response(
        JSON.stringify({ 
          error: 'Kon AI-antwoord niet verwerken',
          raw_response: content,
          results: [] 
        }),
        { status: 200, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

  } catch (error) {
    console.error('Extraction error:', error);
    return new Response(
      JSON.stringify({ 
        error: error instanceof Error ? error.message : 'Onbekende fout',
        results: [] 
      }),
      { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );
  }
});
