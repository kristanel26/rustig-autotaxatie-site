import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type, x-supabase-client-platform, x-supabase-client-platform-version, x-supabase-client-runtime, x-supabase-client-runtime-version",
};

serve(async (req) => {
  if (req.method === "OPTIONS") return new Response(null, { headers: corsHeaders });

  try {
    const { messages } = await req.json();
    const LOVABLE_API_KEY = Deno.env.get("LOVABLE_API_KEY");
    if (!LOVABLE_API_KEY) throw new Error("LOVABLE_API_KEY is not configured");

    const response = await fetch("https://ai.gateway.lovable.dev/v1/chat/completions", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${LOVABLE_API_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        model: "google/gemini-3-flash-preview",
        messages: [
          {
            role: "system",
            content: `Je bent de AutoAssistent van Automobiel Taxaties. Je helpt bezoekers met vragen over BPM-taxaties, verzekeringstaxaties, WEV-taxaties, het stappenplan en kosten/doorlooptijd.

Belangrijke feiten:
- Automobiel Taxaties is opgericht door Erik Elderson, erkend taxateur (TMV nr. 33106, VRT nr. 22-523-M)
- 15 jaar ervaring, 25.000+ voertuigen getaxeerd
- Aangesloten bij Federatie TMV, VRT Register en FEHAC
- Taxaties op locatie in het grootste gedeelte van Nederland
- Contact: 085 483 2461
- E-mail: algemeen@automobieltaxaties.nl

Regels voor je antwoorden:
- Geef altijd korte, directe antwoorden van maximaal 3 zinnen.
- Gebruik GEEN markdown-opmaak: geen asterisken, geen bold, geen bullets met sterretjes of streepjes.
- Schrijf in gewone lopende zinnen.
- Beantwoord alleen de gestelde vraag, geef geen extra achtergrondinformatie die niet gevraagd is.
- Sluit elk antwoord af met één concrete vervolgstap zoals "Bel ons op 085 483 2461" of "Vraag een gratis berekening aan via het formulier."
- Antwoord altijd in het Nederlands.`,
          },
          ...messages,
        ],
        stream: true,
      }),
    });

    if (!response.ok) {
      if (response.status === 429) {
        return new Response(JSON.stringify({ error: "Te veel verzoeken, probeer het later opnieuw." }), {
          status: 429,
          headers: { ...corsHeaders, "Content-Type": "application/json" },
        });
      }
      if (response.status === 402) {
        return new Response(JSON.stringify({ error: "AI-tegoed is op. Neem contact op met de beheerder." }), {
          status: 402,
          headers: { ...corsHeaders, "Content-Type": "application/json" },
        });
      }
      const t = await response.text();
      console.error("AI gateway error:", response.status, t);
      return new Response(JSON.stringify({ error: "Er is een fout opgetreden." }), {
        status: 500,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    return new Response(response.body, {
      headers: { ...corsHeaders, "Content-Type": "text/event-stream" },
    });
  } catch (e) {
    console.error("chat error:", e);
    return new Response(JSON.stringify({ error: e instanceof Error ? e.message : "Unknown error" }), {
      status: 500,
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  }
});
