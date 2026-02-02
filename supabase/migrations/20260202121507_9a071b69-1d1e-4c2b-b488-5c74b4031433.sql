-- Create reports table for internal vehicle appraisal reports
CREATE TABLE public.reports (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
  report_number SERIAL NOT NULL,
  document_reference TEXT,
  client_name TEXT NOT NULL,
  opdrachtgever TEXT,
  license_plate TEXT,
  vin TEXT,
  inspection_location TEXT,
  inspection_date DATE,
  inspection_start_time TIME,
  inspection_end_time TIME,
  appraised_value NUMERIC,
  appraised_value_text TEXT,
  quality_class INTEGER CHECK (quality_class >= 1 AND quality_class <= 5),
  general_remarks TEXT,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable Row Level Security
ALTER TABLE public.reports ENABLE ROW LEVEL SECURITY;

-- Create policies for authenticated users only
CREATE POLICY "Authenticated users can view all reports"
ON public.reports
FOR SELECT
TO authenticated
USING (true);

CREATE POLICY "Authenticated users can create reports"
ON public.reports
FOR INSERT
TO authenticated
WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Authenticated users can update their own reports"
ON public.reports
FOR UPDATE
TO authenticated
USING (auth.uid() = user_id);

CREATE POLICY "Authenticated users can delete their own reports"
ON public.reports
FOR DELETE
TO authenticated
USING (auth.uid() = user_id);

-- Create function to update timestamps
CREATE OR REPLACE FUNCTION public.update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SET search_path = public;

-- Create trigger for automatic timestamp updates
CREATE TRIGGER update_reports_updated_at
BEFORE UPDATE ON public.reports
FOR EACH ROW
EXECUTE FUNCTION public.update_updated_at_column();

-- Create index for faster lookups
CREATE INDEX idx_reports_user_id ON public.reports(user_id);
CREATE INDEX idx_reports_report_number ON public.reports(report_number);
CREATE INDEX idx_reports_license_plate ON public.reports(license_plate);