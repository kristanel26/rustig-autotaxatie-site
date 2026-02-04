-- Add new reminder tracking fields
ALTER TABLE public.reports
ADD COLUMN IF NOT EXISTS herinnering_verzonden_aan_email text NULL,
ADD COLUMN IF NOT EXISTS herinnering_laatste_fout text NULL;

-- Drop existing constraint if it exists
ALTER TABLE public.reports
DROP CONSTRAINT IF EXISTS check_herinnering_status;

-- Add updated constraint with 'mislukt' status
ALTER TABLE public.reports
ADD CONSTRAINT check_herinnering_status 
CHECK (herinnering_status IN ('gepland', 'verzonden', 'mislukt', 'niet_meer_van_toepassing') OR herinnering_status IS NULL);

-- Update index for efficient querying (drop and recreate with new criteria)
DROP INDEX IF EXISTS idx_reports_reminder_query;

CREATE INDEX idx_reports_reminder_query 
ON public.reports (inspection_date, herinnering_status, customer_email)
WHERE inspection_date IS NOT NULL 
  AND herinnering_verzonden_op IS NULL 
  AND herinnering_status = 'gepland'
  AND customer_email IS NOT NULL;