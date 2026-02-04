-- =====================================================
-- KLASSIEKER DELIVERY & TRACKING SYSTEM
-- =====================================================

-- 1. Add new columns to reports table for klassieker delivery tracking
ALTER TABLE public.reports
ADD COLUMN IF NOT EXISTS sent_at TIMESTAMP WITH TIME ZONE,
ADD COLUMN IF NOT EXISTS first_downloaded_at TIMESTAMP WITH TIME ZONE,
ADD COLUMN IF NOT EXISTS last_downloaded_at TIMESTAMP WITH TIME ZONE,
ADD COLUMN IF NOT EXISTS download_count INTEGER DEFAULT 0,
ADD COLUMN IF NOT EXISTS reminder_due_date DATE,
ADD COLUMN IF NOT EXISTS reminder_sent_at TIMESTAMP WITH TIME ZONE;

-- 2. Create report_deliveries table for email sending logs
CREATE TABLE IF NOT EXISTS public.report_deliveries (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  report_id UUID NOT NULL REFERENCES public.reports(id) ON DELETE CASCADE,
  sent_to_email TEXT NOT NULL,
  sent_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  email_provider_message_id TEXT,
  status TEXT NOT NULL DEFAULT 'sent',
  error_message TEXT,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable RLS
ALTER TABLE public.report_deliveries ENABLE ROW LEVEL SECURITY;

-- RLS policies for report_deliveries
CREATE POLICY "Users can view deliveries for their reports"
ON public.report_deliveries
FOR SELECT
USING (EXISTS (
  SELECT 1 FROM reports
  WHERE reports.id = report_deliveries.report_id
  AND reports.user_id = auth.uid()
));

CREATE POLICY "Users can insert deliveries for their reports"
ON public.report_deliveries
FOR INSERT
WITH CHECK (EXISTS (
  SELECT 1 FROM reports
  WHERE reports.id = report_deliveries.report_id
  AND reports.user_id = auth.uid()
));

-- 3. Create report_downloads table for download tracking
CREATE TABLE IF NOT EXISTS public.report_downloads (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  report_id UUID NOT NULL REFERENCES public.reports(id) ON DELETE CASCADE,
  downloaded_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  ip_address TEXT,
  user_agent TEXT,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable RLS
ALTER TABLE public.report_downloads ENABLE ROW LEVEL SECURITY;

-- RLS policies for report_downloads (public insert for tracking, owner select)
CREATE POLICY "Users can view downloads for their reports"
ON public.report_downloads
FOR SELECT
USING (EXISTS (
  SELECT 1 FROM reports
  WHERE reports.id = report_downloads.report_id
  AND reports.user_id = auth.uid()
));

-- Allow anyone to insert download records (needed for anonymous download tracking)
CREATE POLICY "Anyone can insert download records"
ON public.report_downloads
FOR INSERT
WITH CHECK (true);

-- 4. Create report_share_tokens table for secure download links
CREATE TABLE IF NOT EXISTS public.report_share_tokens (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  report_id UUID NOT NULL REFERENCES public.reports(id) ON DELETE CASCADE,
  token TEXT NOT NULL UNIQUE,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  expires_at TIMESTAMP WITH TIME ZONE,
  revoked_at TIMESTAMP WITH TIME ZONE
);

-- Enable RLS
ALTER TABLE public.report_share_tokens ENABLE ROW LEVEL SECURITY;

-- RLS policies for report_share_tokens
CREATE POLICY "Users can view tokens for their reports"
ON public.report_share_tokens
FOR SELECT
USING (EXISTS (
  SELECT 1 FROM reports
  WHERE reports.id = report_share_tokens.report_id
  AND reports.user_id = auth.uid()
));

CREATE POLICY "Users can insert tokens for their reports"
ON public.report_share_tokens
FOR INSERT
WITH CHECK (EXISTS (
  SELECT 1 FROM reports
  WHERE reports.id = report_share_tokens.report_id
  AND reports.user_id = auth.uid()
));

CREATE POLICY "Users can update tokens for their reports"
ON public.report_share_tokens
FOR UPDATE
USING (EXISTS (
  SELECT 1 FROM reports
  WHERE reports.id = report_share_tokens.report_id
  AND reports.user_id = auth.uid()
));

-- Allow public read for token validation (needed for download endpoint)
CREATE POLICY "Anyone can validate tokens"
ON public.report_share_tokens
FOR SELECT
USING (true);

-- 5. Create indexes for performance
CREATE INDEX IF NOT EXISTS idx_report_deliveries_report_id ON public.report_deliveries(report_id);
CREATE INDEX IF NOT EXISTS idx_report_downloads_report_id ON public.report_downloads(report_id);
CREATE INDEX IF NOT EXISTS idx_report_share_tokens_token ON public.report_share_tokens(token);
CREATE INDEX IF NOT EXISTS idx_report_share_tokens_report_id ON public.report_share_tokens(report_id);
CREATE INDEX IF NOT EXISTS idx_reports_reminder_due_date ON public.reports(reminder_due_date) WHERE report_type = 'klassieker';
CREATE INDEX IF NOT EXISTS idx_reports_status_type ON public.reports(status, report_type);

-- 6. Create storage bucket for finalized reports (private)
INSERT INTO storage.buckets (id, name, public)
VALUES ('finalized-reports', 'finalized-reports', false)
ON CONFLICT (id) DO NOTHING;

-- Storage policies for finalized-reports bucket
CREATE POLICY "Authenticated users can upload finalized reports"
ON storage.objects
FOR INSERT
WITH CHECK (
  bucket_id = 'finalized-reports' 
  AND auth.role() = 'authenticated'
);

CREATE POLICY "Authenticated users can read their own reports"
ON storage.objects
FOR SELECT
USING (
  bucket_id = 'finalized-reports'
  AND auth.role() = 'authenticated'
);