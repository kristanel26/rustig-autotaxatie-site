-- Update the generate_report_number function to also set document_reference
CREATE OR REPLACE FUNCTION public.generate_report_number()
RETURNS TRIGGER AS $$
DECLARE
  current_year text;
  next_number integer;
  new_report_number text;
BEGIN
  current_year := EXTRACT(YEAR FROM CURRENT_DATE)::text;
  
  -- Get the highest number for the current year
  SELECT COALESCE(
    MAX(
      CASE 
        WHEN report_number LIKE current_year || '-%' 
        THEN NULLIF(SPLIT_PART(report_number, '-', 2), '')::integer 
        ELSE 0 
      END
    ), 
    0
  ) + 1 INTO next_number
  FROM public.reports
  WHERE report_number LIKE current_year || '-%';
  
  -- Format as YYYY-NNN (e.g., 2026-001)
  new_report_number := current_year || '-' || LPAD(next_number::text, 3, '0');
  
  NEW.report_number := new_report_number;
  NEW.document_reference := new_report_number;
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SET search_path = public;

-- Create function to sync document_reference on update
CREATE OR REPLACE FUNCTION public.sync_document_reference()
RETURNS TRIGGER AS $$
BEGIN
  -- Always keep document_reference in sync with report_number
  IF NEW.report_number IS DISTINCT FROM OLD.report_number THEN
    NEW.document_reference := NEW.report_number;
  END IF;
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SET search_path = public;

-- Create trigger for updates
CREATE TRIGGER sync_document_reference_trigger
BEFORE UPDATE ON public.reports
FOR EACH ROW
EXECUTE FUNCTION public.sync_document_reference();

-- Update existing records to sync document_reference
UPDATE public.reports SET document_reference = report_number WHERE document_reference IS DISTINCT FROM report_number;