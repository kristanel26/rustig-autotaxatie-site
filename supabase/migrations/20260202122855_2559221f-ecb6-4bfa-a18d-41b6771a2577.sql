-- Drop the existing sequence and column, recreate as text with auto-generation
-- First, drop the default on the column
ALTER TABLE public.reports ALTER COLUMN report_number DROP DEFAULT;

-- Drop the sequence
DROP SEQUENCE IF EXISTS reports_report_number_seq;

-- Change column type to text
ALTER TABLE public.reports ALTER COLUMN report_number TYPE text USING report_number::text;

-- Create function to generate report number in format YYYY-NNN
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
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SET search_path = public;

-- Create trigger to auto-generate report_number before insert
CREATE TRIGGER generate_report_number_trigger
BEFORE INSERT ON public.reports
FOR EACH ROW
EXECUTE FUNCTION public.generate_report_number();