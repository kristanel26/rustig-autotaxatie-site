-- Add report_type column to reports table
ALTER TABLE public.reports
ADD COLUMN IF NOT EXISTS report_type text NULL DEFAULT 'camper';

-- Create index for filtering by report type
CREATE INDEX IF NOT EXISTS idx_reports_report_type 
ON public.reports (report_type);

-- Add comment for documentation
COMMENT ON COLUMN public.reports.report_type IS 'Type of report: camper, wev, classic. Determines which modules and PDF sections are shown.';