import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type, x-supabase-client-platform, x-supabase-client-platform-version, x-supabase-client-runtime, x-supabase-client-runtime-version',
};

// RDW Open Data API endpoints
const RDW_VOERTUIGEN_URL = 'https://opendata.rdw.nl/resource/m9d7-ebf2.json';
const RDW_BRANDSTOF_URL = 'https://opendata.rdw.nl/resource/8ys7-d773.json';

interface RDWVoertuig {
  kenteken?: string;
  merk?: string;
  handelsbenaming?: string;
  voertuigsoort?: string;
  inrichting?: string;
  eerste_kleur?: string;
  tweede_kleur?: string;
  aantal_cilinders?: string;
  cilinderinhoud?: string;
  massa_ledig_voertuig?: string;
  toegestane_maximum_massa_voertuig?: string;
  massa_rijklaar?: string;
  maximum_massa_samenstelling?: string;
  aantal_deuren?: string;
  aantal_wielen?: string;
  afstand_hart_koppeling_tot_achterzijde_voertuig?: string;
  afstand_voorzijde_voertuig_tot_hart_koppeling?: string;
  datum_eerste_toelating?: string;
  datum_eerste_tenaamstelling_in_nederland?: string;
  datum_tenaamstelling?: string;
  vervaldatum_apk?: string;
  datum_eerste_afgifte_nederland?: string;
  openstaande_terugroepactie_indicator?: string;
  api_gekentekende_voertuigen_assen?: string;
  api_gekentekende_voertuigen_brandstof?: string;
  api_gekentekende_voertuigen_carrosserie?: string;
  api_gekentekende_voertuigen_carrosserie_specifiek?: string;
  api_gekentekende_voertuigen_voertuigklasse?: string;
  europese_voertuigcategorie?: string;
  europese_voertuigcategorie_toevoeging?: string;
  europese_uitvoeringcategorie_toevoeging?: string;
  plaats_chassisnummer?: string;
  type?: string;
  type_gasinstallatie?: string;
  typegoedkeuringsnummer?: string;
  variant?: string;
  uitvoering?: string;
  vermogen_massarijklaar?: string;
  volgnummer_wijziging_eu_typegoedkeuring?: string;
  wielbasis?: string;
  export_indicator?: string;
  wam_verzekerd?: string;
  maximum_constructiesnelheid_brom_snorfiets?: string;
  laadvermogen?: string;
  oplegger_geremd?: string;
  aanhangwagen_autonoom_geremd?: string;
  aanhangwagen_middenas_geremd?: string;
  vermogen_brom_snorfiets?: string;
  registratie_datum_goedkeuring_afschrijvingsmoment_bpm?: string;
  registratie_datum_goedkeuring_afschrijvingsmoment_bpm_dt?: string;
  gem_lading_wrde?: string;
  aerodynamische_voorziening_of_uitrusting?: string;
  taxi_indicator?: string;
  maximum_massa_technisch_maximaal?: string;
  maximum_trekken_massa_geremd?: string;
  catalogusprijs?: string;
  bruto_bpm?: string;
  zuinigheidslabel?: string;
}

interface RDWBrandstof {
  kenteken?: string;
  brandstof_omschrijving?: string;
  brandstof_volgnummer?: string;
  brandstofverbruik_buiten?: string;
  brandstofverbruik_gecombineerd?: string;
  brandstofverbruik_stad?: string;
  co2_uitstoot_gecombineerd?: string;
  co2_uitstoot_gewogen?: string;
  geluidsniveau_rijdend?: string;
  geluidsniveau_stationair?: string;
  nettomaximumvermogen?: string;
  nominaal_continu_maximumvermogen?: string;
  klasse_hybride_elektrisch_voertuig?: string;
  uitlaatemissieniveau?: string;
  milieuklasse_eg_goedkeuring_licht?: string;
  milieuklasse_eg_goedkeuring_zwaar?: string;
  emissieklasse?: string;
  emissie_deeltjes_licht?: string;
  emissie_deeltjes_zwaar?: string;
  emissie_co2_gecombineerd_wltp?: string;
  emissie_co2_gewogen_gecombineerd_wltp?: string;
}

serve(async (req) => {
  // Handle CORS preflight requests
  if (req.method === 'OPTIONS') {
    return new Response('ok', { headers: corsHeaders });
  }

  try {
    const { kenteken } = await req.json();

    if (!kenteken) {
      return new Response(
        JSON.stringify({ error: 'Kenteken is verplicht' }),
        { status: 400, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    // Normalize license plate: remove hyphens, spaces and convert to uppercase
    const normalizedKenteken = kenteken.replace(/[-\s]/g, '').toUpperCase();
    
    console.log(`Looking up RDW data for kenteken: ${normalizedKenteken}`);

    // Fetch main vehicle data
    const voertuigResponse = await fetch(
      `${RDW_VOERTUIGEN_URL}?kenteken=${normalizedKenteken}`,
      {
        headers: {
          'Accept': 'application/json',
        },
      }
    );

    if (!voertuigResponse.ok) {
      console.error(`RDW API error: ${voertuigResponse.status}`);
      return new Response(
        JSON.stringify({ error: 'Fout bij ophalen RDW data' }),
        { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    const voertuigData: RDWVoertuig[] = await voertuigResponse.json();

    if (!voertuigData || voertuigData.length === 0) {
      return new Response(
        JSON.stringify({ error: 'Kenteken niet gevonden in RDW register' }),
        { status: 404, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    const voertuig = voertuigData[0];

    // Fetch fuel/engine data
    let brandstofData: RDWBrandstof | null = null;
    try {
      const brandstofResponse = await fetch(
        `${RDW_BRANDSTOF_URL}?kenteken=${normalizedKenteken}`,
        {
          headers: {
            'Accept': 'application/json',
          },
        }
      );
      
      if (brandstofResponse.ok) {
        const brandstofArray: RDWBrandstof[] = await brandstofResponse.json();
        if (brandstofArray && brandstofArray.length > 0) {
          brandstofData = brandstofArray[0];
        }
      }
    } catch (e) {
      console.log('Could not fetch brandstof data:', e);
    }

    // Parse dates from RDW format (YYYYMMDD) to ISO format
    const parseRDWDate = (dateStr: string | undefined): string | null => {
      if (!dateStr || dateStr.length !== 8) return null;
      const year = dateStr.substring(0, 4);
      const month = dateStr.substring(4, 6);
      const day = dateStr.substring(6, 8);
      return `${year}-${month}-${day}`;
    };

    // Extract build year from first registration date
    const getBouwjaar = (dateStr: string | undefined): number | null => {
      if (!dateStr || dateStr.length < 4) return null;
      return parseInt(dateStr.substring(0, 4));
    };

    // Determine if vehicle is imported
    const isImport = (): boolean => {
      // If first registration in NL differs from first general registration, it's an import
      if (voertuig.datum_eerste_toelating && voertuig.datum_eerste_tenaamstelling_in_nederland) {
        return voertuig.datum_eerste_toelating !== voertuig.datum_eerste_tenaamstelling_in_nederland;
      }
      return false;
    };

    // Check APK status
    const checkAPK = (): boolean => {
      if (!voertuig.vervaldatum_apk) return false;
      const expiryDate = parseRDWDate(voertuig.vervaldatum_apk);
      if (!expiryDate) return false;
      return new Date(expiryDate) > new Date();
    };

    // Build response with mapped fields
    const rdwData = {
      // Sectie 1: Voertuigidentificatie
      rdw_merk: voertuig.merk || null,
      rdw_handelsbenaming: voertuig.handelsbenaming || null,
      rdw_voertuigsoort: voertuig.voertuigsoort || null,
      rdw_carrosserievorm: voertuig.inrichting || null,
      rdw_bouwjaar: getBouwjaar(voertuig.datum_eerste_toelating),
      rdw_datum_eerste_toelating: parseRDWDate(voertuig.datum_eerste_toelating),
      rdw_datum_eerste_tenaamstelling: parseRDWDate(voertuig.datum_eerste_tenaamstelling_in_nederland),
      rdw_datum_laatste_tenaamstelling: parseRDWDate(voertuig.datum_tenaamstelling),

      // Sectie 2: Technische hoofdgegevens
      rdw_brandstof: brandstofData?.brandstof_omschrijving || null,
      rdw_transmissie: null, // Not directly available in RDW open data
      rdw_aantal_cilinders: voertuig.aantal_cilinders ? parseInt(voertuig.aantal_cilinders) : null,
      rdw_cilinderinhoud: voertuig.cilinderinhoud ? parseInt(voertuig.cilinderinhoud) : null,
      rdw_vermogen_kw: brandstofData?.nettomaximumvermogen ? parseInt(brandstofData.nettomaximumvermogen) : null,
      rdw_aantal_deuren: voertuig.aantal_deuren ? parseInt(voertuig.aantal_deuren) : null,
      rdw_wielbasis: voertuig.wielbasis ? parseInt(voertuig.wielbasis) : null,

      // Sectie 3: Massa en gewichten
      rdw_ledig_gewicht: voertuig.massa_ledig_voertuig ? parseInt(voertuig.massa_ledig_voertuig) : null,
      rdw_massa_rijklaar: voertuig.massa_rijklaar ? parseInt(voertuig.massa_rijklaar) : null,
      rdw_max_massa: voertuig.toegestane_maximum_massa_voertuig ? parseInt(voertuig.toegestane_maximum_massa_voertuig) : null,

      // Sectie 4: Keuring en status
      rdw_apk_gekeurd: checkAPK(),
      rdw_apk_vervaldatum: parseRDWDate(voertuig.vervaldatum_apk),
      rdw_importvoertuig: isImport(),
    };

    console.log('Successfully fetched RDW data:', JSON.stringify(rdwData, null, 2));

    return new Response(
      JSON.stringify(rdwData),
      { status: 200, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );

  } catch (error) {
    console.error('Error in rdw-lookup function:', error);
    return new Response(
      JSON.stringify({ error: 'Er is een fout opgetreden bij het ophalen van RDW data' }),
      { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );
  }
});
