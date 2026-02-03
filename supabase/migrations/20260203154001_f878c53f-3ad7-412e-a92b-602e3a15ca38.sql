-- Create photo_extract_results table for storing AI extraction results
CREATE TABLE public.photo_extract_results (
  id uuid NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  report_id uuid NOT NULL REFERENCES public.reports(id) ON DELETE CASCADE,
  photo_url text NOT NULL,
  photo_type text NOT NULL CHECK (photo_type IN (
    'kenteken', 'dashboard', 'vin_typeplaat', 'vin_ruit',
    'band_voor_links', 'band_voor_rechts', 'band_achter_links', 'band_achter_rechts',
    'typeplaat_massa', 'gasinstallatie'
  )),
  section text NOT NULL CHECK (section IN (
    'voertuigidentificatie', 'tellerstand', 'banden', 'massa', 'gasinstallatie'
  )),
  field_key text NOT NULL,
  proposed_value text,
  status text NOT NULL CHECK (status IN ('zeker', 'waarschijnlijk', 'ontbreekt')),
  confidence integer NOT NULL CHECK (confidence >= 0 AND confidence <= 100),
  raw_text text,
  accepted boolean NOT NULL DEFAULT false,
  created_at timestamp with time zone NOT NULL DEFAULT now()
);

-- Add photo_types column to reports table for storing photo type tags
ALTER TABLE public.reports 
ADD COLUMN IF NOT EXISTS photo_types jsonb DEFAULT '{}'::jsonb;

-- Enable RLS
ALTER TABLE public.photo_extract_results ENABLE ROW LEVEL SECURITY;

-- RLS policies - users can manage extraction results for their own reports
CREATE POLICY "Users can view extraction results for their reports"
  ON public.photo_extract_results
  FOR SELECT
  USING (
    EXISTS (
      SELECT 1 FROM public.reports 
      WHERE reports.id = photo_extract_results.report_id 
      AND reports.user_id = auth.uid()
    )
  );

CREATE POLICY "Users can insert extraction results for their reports"
  ON public.photo_extract_results
  FOR INSERT
  WITH CHECK (
    EXISTS (
      SELECT 1 FROM public.reports 
      WHERE reports.id = photo_extract_results.report_id 
      AND reports.user_id = auth.uid()
    )
  );

CREATE POLICY "Users can update extraction results for their reports"
  ON public.photo_extract_results
  FOR UPDATE
  USING (
    EXISTS (
      SELECT 1 FROM public.reports 
      WHERE reports.id = photo_extract_results.report_id 
      AND reports.user_id = auth.uid()
    )
  );

CREATE POLICY "Users can delete extraction results for their reports"
  ON public.photo_extract_results
  FOR DELETE
  USING (
    EXISTS (
      SELECT 1 FROM public.reports 
      WHERE reports.id = photo_extract_results.report_id 
      AND reports.user_id = auth.uid()
    )
  );

-- Create index for faster lookups
CREATE INDEX idx_photo_extract_results_report_id ON public.photo_extract_results(report_id);
CREATE INDEX idx_photo_extract_results_section ON public.photo_extract_results(section);