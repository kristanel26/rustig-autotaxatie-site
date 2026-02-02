import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type, x-supabase-client-platform, x-supabase-client-platform-version, x-supabase-client-runtime, x-supabase-client-runtime-version',
};

// PDOK Locatieserver API - Free Dutch government API
const PDOK_BASE_URL = 'https://api.pdok.nl/bzk/locatieserver/search/v3_1/free';

interface PDOKResponse {
  response: {
    numFound: number;
    docs: Array<{
      weergavenaam: string;
      woonplaatsnaam?: string;
      straatnaam?: string;
      huis_nlt?: string;
      postcode?: string;
      provincienaam?: string;
      gemeentenaam?: string;
    }>;
  };
}

// Normalize postcode to "1234 AB" format
const normalizePostcode = (postcode: string): string => {
  // Remove all spaces and convert to uppercase
  const cleaned = postcode.replace(/\s/g, '').toUpperCase();
  
  // Validate format: 4 digits followed by 2 letters
  const match = cleaned.match(/^([1-9][0-9]{3})([A-Z]{2})$/);
  if (!match) {
    return '';
  }
  
  // Return formatted as "1234 AB"
  return `${match[1]} ${match[2]}`;
};

// Validate Dutch postcode format
const isValidPostcode = (postcode: string): boolean => {
  const normalized = normalizePostcode(postcode);
  return normalized !== '';
};

serve(async (req) => {
  // Handle CORS preflight requests
  if (req.method === 'OPTIONS') {
    return new Response('ok', { headers: corsHeaders });
  }

  try {
    const { postcode, huisnummer } = await req.json();

    if (!postcode) {
      return new Response(
        JSON.stringify({ error: 'Postcode is verplicht' }),
        { status: 400, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    // Normalize the postcode
    const normalizedPostcode = normalizePostcode(postcode);
    
    if (!normalizedPostcode) {
      return new Response(
        JSON.stringify({ 
          error: 'Ongeldig postcode formaat',
          valid: false,
          normalized_postcode: null
        }),
        { status: 400, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    console.log(`Looking up postcode: ${normalizedPostcode}${huisnummer ? ` with house number: ${huisnummer}` : ''}`);

    // Build search query
    let searchQuery = normalizedPostcode;
    if (huisnummer) {
      searchQuery = `${normalizedPostcode} ${huisnummer}`;
    }

    // Call PDOK API
    const pdokUrl = `${PDOK_BASE_URL}?q=${encodeURIComponent(searchQuery)}&fq=type:adres&rows=1`;
    
    const response = await fetch(pdokUrl, {
      headers: {
        'Accept': 'application/json',
      },
    });

    if (!response.ok) {
      console.error(`PDOK API error: ${response.status}`);
      return new Response(
        JSON.stringify({ 
          error: 'Fout bij ophalen adresgegevens',
          normalized_postcode: normalizedPostcode,
          valid: true,
          found: false
        }),
        { status: 200, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    const data: PDOKResponse = await response.json();
    
    if (data.response.numFound === 0) {
      console.log('No results found for postcode');
      return new Response(
        JSON.stringify({ 
          normalized_postcode: normalizedPostcode,
          valid: true,
          found: false,
          message: 'Postcode niet gevonden'
        }),
        { status: 200, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    const result = data.response.docs[0];
    console.log('PDOK result:', result);

    // Extract city (woonplaatsnaam) and optionally street
    const city = result.woonplaatsnaam || '';
    const street = result.straatnaam || '';
    const houseNumber = result.huis_nlt || '';

    return new Response(
      JSON.stringify({
        normalized_postcode: normalizedPostcode,
        valid: true,
        found: true,
        city: city,
        street: street,
        house_number: houseNumber,
        province: result.provincienaam || '',
        municipality: result.gemeentenaam || '',
      }),
      { status: 200, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );

  } catch (error) {
    console.error('Error in postcode-lookup:', error);
    return new Response(
      JSON.stringify({ error: 'Interne serverfout' }),
      { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );
  }
});
