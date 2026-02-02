-- Add transmissie as a taxateur field (separate from rdw_transmissie)
-- rdw_transmissie can be kept for historical data, transmissie is now the taxateur input

ALTER TABLE public.reports ADD COLUMN IF NOT EXISTS transmissie text;