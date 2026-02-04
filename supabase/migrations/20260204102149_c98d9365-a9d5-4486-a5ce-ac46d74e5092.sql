-- Create table for WEV valuation documents
CREATE TABLE public.wev_documents (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  report_id UUID NOT NULL REFERENCES public.reports(id) ON DELETE CASCADE,
  document_type TEXT NOT NULL CHECK (document_type IN ('autotelex', 'schadecalculatie', 'overig')),
  file_name TEXT NOT NULL,
  file_url TEXT NOT NULL,
  file_size INTEGER,
  uploaded_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable RLS
ALTER TABLE public.wev_documents ENABLE ROW LEVEL SECURITY;

-- Create policies for user access (based on report ownership)
CREATE POLICY "Users can view documents for their reports" 
ON public.wev_documents 
FOR SELECT 
USING (EXISTS (
  SELECT 1 FROM public.reports 
  WHERE reports.id = wev_documents.report_id 
  AND reports.user_id = auth.uid()
));

CREATE POLICY "Users can insert documents for their reports" 
ON public.wev_documents 
FOR INSERT 
WITH CHECK (EXISTS (
  SELECT 1 FROM public.reports 
  WHERE reports.id = wev_documents.report_id 
  AND reports.user_id = auth.uid()
));

CREATE POLICY "Users can delete documents for their reports" 
ON public.wev_documents 
FOR DELETE 
USING (EXISTS (
  SELECT 1 FROM public.reports 
  WHERE reports.id = wev_documents.report_id 
  AND reports.user_id = auth.uid()
));

-- Create index for faster lookups
CREATE INDEX idx_wev_documents_report_id ON public.wev_documents(report_id);