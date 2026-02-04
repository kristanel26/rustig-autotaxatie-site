-- WEV-specific fields for reports table
-- Screen 5: Valuation Context
ALTER TABLE public.reports ADD COLUMN IF NOT EXISTS wev_reden_peildatum text;
ALTER TABLE public.reports ADD COLUMN IF NOT EXISTS wev_doel_taxatie text;
ALTER TABLE public.reports ADD COLUMN IF NOT EXISTS wev_marktsegment text;
ALTER TABLE public.reports ADD COLUMN IF NOT EXISTS wev_doelgroep text;

-- Screen 6: Autotelex Data
ALTER TABLE public.reports ADD COLUMN IF NOT EXISTS wev_btw_of_marge text;
ALTER TABLE public.reports ADD COLUMN IF NOT EXISTS wev_btw_marge_override_motivatie text;
ALTER TABLE public.reports ADD COLUMN IF NOT EXISTS wev_autotelex_lookup_timestamp timestamptz;
ALTER TABLE public.reports ADD COLUMN IF NOT EXISTS wev_manual_source_note text;

-- Screen 7: Comparables (stored as JSONB array)
ALTER TABLE public.reports ADD COLUMN IF NOT EXISTS wev_comparables jsonb DEFAULT '[]'::jsonb;

-- Screen 8: Adjustments
ALTER TABLE public.reports ADD COLUMN IF NOT EXISTS wev_correcties_motivatie text;
ALTER TABLE public.reports ADD COLUMN IF NOT EXISTS wev_km_stand_correctie text;
ALTER TABLE public.reports ADD COLUMN IF NOT EXISTS wev_staat_correctie text;
ALTER TABLE public.reports ADD COLUMN IF NOT EXISTS wev_schade_correctie text;
ALTER TABLE public.reports ADD COLUMN IF NOT EXISTS wev_originaliteit_correctie text;

-- Screen 9: Conclusion
ALTER TABLE public.reports ADD COLUMN IF NOT EXISTS wev_bandbreedte_min numeric;
ALTER TABLE public.reports ADD COLUMN IF NOT EXISTS wev_bandbreedte_max numeric;
ALTER TABLE public.reports ADD COLUMN IF NOT EXISTS wev_eindwaarde numeric;
ALTER TABLE public.reports ADD COLUMN IF NOT EXISTS wev_motivatie_eindwaarde text;

-- Screen 10: Finalization
ALTER TABLE public.reports ADD COLUMN IF NOT EXISTS wev_status text DEFAULT 'concept';
ALTER TABLE public.reports ADD COLUMN IF NOT EXISTS wev_finalized_at timestamptz;
ALTER TABLE public.reports ADD COLUMN IF NOT EXISTS wev_locked boolean DEFAULT false;