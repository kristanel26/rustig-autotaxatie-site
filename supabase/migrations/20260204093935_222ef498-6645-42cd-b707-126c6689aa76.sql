-- Add WEV valuation fields to reports table
ALTER TABLE public.reports
ADD COLUMN IF NOT EXISTS wev_handelsinkoopwaarde_autotelex numeric NULL,
ADD COLUMN IF NOT EXISTS wev_verkoopwaarde_autotelex numeric NULL,
ADD COLUMN IF NOT EXISTS wev_bron_waardes text NULL DEFAULT 'Autotelex',
ADD COLUMN IF NOT EXISTS wev_peildatum date NULL,
ADD COLUMN IF NOT EXISTS wev_berekend numeric NULL,
ADD COLUMN IF NOT EXISTS wev_definitief numeric NULL,
ADD COLUMN IF NOT EXISTS wev_override_actief boolean NULL DEFAULT false,
ADD COLUMN IF NOT EXISTS wev_override_redenering text NULL;

-- Add index for WEV reports lookup
CREATE INDEX IF NOT EXISTS idx_reports_wev_peildatum 
ON public.reports (wev_peildatum) 
WHERE wev_peildatum IS NOT NULL;