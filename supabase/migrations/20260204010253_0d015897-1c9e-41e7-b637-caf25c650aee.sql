-- Add reminder fields to reports table
ALTER TABLE public.reports
ADD COLUMN IF NOT EXISTS herinnering_verzonden_op date NULL,
ADD COLUMN IF NOT EXISTS herinnering_status text NULL DEFAULT 'gepland';

-- Add constraint for valid status values
ALTER TABLE public.reports
ADD CONSTRAINT check_herinnering_status 
CHECK (herinnering_status IN ('gepland', 'verzonden', 'niet_meer_van_toepassing') OR herinnering_status IS NULL);

-- Create index for efficient querying of reminders
CREATE INDEX IF NOT EXISTS idx_reports_reminder_query 
ON public.reports (inspection_date, herinnering_verzonden_op, herinnering_status)
WHERE inspection_date IS NOT NULL 
  AND herinnering_verzonden_op IS NULL 
  AND (herinnering_status IS NULL OR herinnering_status = 'gepland');