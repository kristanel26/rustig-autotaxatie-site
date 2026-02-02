-- =============================================
-- VOERTUIGINFO STRUCTUUR - DATABASE UITBREIDING
-- =============================================

-- Sectie 1: Voertuigidentificatie (RDW)
ALTER TABLE public.reports ADD COLUMN IF NOT EXISTS rdw_merk text;
ALTER TABLE public.reports ADD COLUMN IF NOT EXISTS rdw_handelsbenaming text;
ALTER TABLE public.reports ADD COLUMN IF NOT EXISTS rdw_voertuigsoort text;
ALTER TABLE public.reports ADD COLUMN IF NOT EXISTS rdw_carrosserievorm text;
ALTER TABLE public.reports ADD COLUMN IF NOT EXISTS rdw_bouwjaar integer;
ALTER TABLE public.reports ADD COLUMN IF NOT EXISTS rdw_datum_eerste_toelating date;
ALTER TABLE public.reports ADD COLUMN IF NOT EXISTS rdw_datum_eerste_tenaamstelling date;
ALTER TABLE public.reports ADD COLUMN IF NOT EXISTS rdw_datum_laatste_tenaamstelling date;

-- Sectie 2: Technische hoofdgegevens (RDW)
ALTER TABLE public.reports ADD COLUMN IF NOT EXISTS rdw_brandstof text;
ALTER TABLE public.reports ADD COLUMN IF NOT EXISTS rdw_transmissie text;
ALTER TABLE public.reports ADD COLUMN IF NOT EXISTS rdw_aantal_cilinders integer;
ALTER TABLE public.reports ADD COLUMN IF NOT EXISTS rdw_cilinderinhoud integer;
ALTER TABLE public.reports ADD COLUMN IF NOT EXISTS rdw_vermogen_kw integer;
ALTER TABLE public.reports ADD COLUMN IF NOT EXISTS rdw_aantal_deuren integer;
ALTER TABLE public.reports ADD COLUMN IF NOT EXISTS rdw_wielbasis integer;

-- Sectie 3: Massa en gewichten (RDW)
ALTER TABLE public.reports ADD COLUMN IF NOT EXISTS rdw_ledig_gewicht integer;
ALTER TABLE public.reports ADD COLUMN IF NOT EXISTS rdw_massa_rijklaar integer;
ALTER TABLE public.reports ADD COLUMN IF NOT EXISTS rdw_max_massa integer;

-- Sectie 4: Keuring en status (RDW)
ALTER TABLE public.reports ADD COLUMN IF NOT EXISTS rdw_apk_gekeurd boolean;
ALTER TABLE public.reports ADD COLUMN IF NOT EXISTS rdw_apk_vervaldatum date;
ALTER TABLE public.reports ADD COLUMN IF NOT EXISTS rdw_importvoertuig boolean;

-- Sectie 5: Tellerstand en gebruik (Taxateur)
ALTER TABLE public.reports ADD COLUMN IF NOT EXISTS tellerstand integer;
ALTER TABLE public.reports ADD COLUMN IF NOT EXISTS tellerstand_type text DEFAULT 'km';

-- Sectie 6: Opbouw en constructie (Taxateur)
ALTER TABLE public.reports ADD COLUMN IF NOT EXISTS soort_bouw text;
ALTER TABLE public.reports ADD COLUMN IF NOT EXISTS opbouw_merk text;
ALTER TABLE public.reports ADD COLUMN IF NOT EXISTS opbouw_type text;
ALTER TABLE public.reports ADD COLUMN IF NOT EXISTS constructievorm text;

-- Sectie 7: Gebruik en stalling (Taxateur)
ALTER TABLE public.reports ADD COLUMN IF NOT EXISTS gebruik text;
ALTER TABLE public.reports ADD COLUMN IF NOT EXISTS stalling text;
ALTER TABLE public.reports ADD COLUMN IF NOT EXISTS staat_bij_opname text;

-- RDW-velden vergrendelingsstatus
ALTER TABLE public.reports ADD COLUMN IF NOT EXISTS rdw_data_locked boolean DEFAULT false;
ALTER TABLE public.reports ADD COLUMN IF NOT EXISTS rdw_fetched_at timestamp with time zone;

-- Indexes voor nieuwe velden
CREATE INDEX IF NOT EXISTS idx_reports_rdw_voertuigsoort ON public.reports(rdw_voertuigsoort);
CREATE INDEX IF NOT EXISTS idx_reports_rdw_bouwjaar ON public.reports(rdw_bouwjaar);