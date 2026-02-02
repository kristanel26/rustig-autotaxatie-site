-- Add new fields for document_reference generation
ALTER TABLE public.reports ADD COLUMN IF NOT EXISTS vehicle_model text;
ALTER TABLE public.reports ADD COLUMN IF NOT EXISTS customer_title text;
ALTER TABLE public.reports ADD COLUMN IF NOT EXISTS customer_initials text;
ALTER TABLE public.reports ADD COLUMN IF NOT EXISTS customer_last_name text;

-- Update the generate_report_number function to also build document_reference
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
  
  -- Build document_reference from components
  NEW.document_reference := TRIM(CONCAT_WS(' ',
    new_report_number,
    NULLIF(TRIM(COALESCE(NEW.vehicle_model, '')), ''),
    NULLIF(TRIM(COALESCE(NEW.license_plate, '')), ''),
    NULLIF(TRIM(COALESCE(NEW.customer_title, '')), ''),
    NULLIF(TRIM(COALESCE(NEW.customer_initials, '')), ''),
    NULLIF(TRIM(COALESCE(NEW.customer_last_name, '')), '')
  ));
  
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SET search_path = public;

-- Update the sync function to rebuild document_reference on any relevant field change
CREATE OR REPLACE FUNCTION public.sync_document_reference()
RETURNS TRIGGER AS $$
BEGIN
  -- Rebuild document_reference when any component field changes
  NEW.document_reference := TRIM(CONCAT_WS(' ',
    NEW.report_number,
    NULLIF(TRIM(COALESCE(NEW.vehicle_model, '')), ''),
    NULLIF(TRIM(COALESCE(NEW.license_plate, '')), ''),
    NULLIF(TRIM(COALESCE(NEW.customer_title, '')), ''),
    NULLIF(TRIM(COALESCE(NEW.customer_initials, '')), ''),
    NULLIF(TRIM(COALESCE(NEW.customer_last_name, '')), '')
  ));
  
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SET search_path = public;

-- Update existing records
UPDATE public.reports SET document_reference = TRIM(CONCAT_WS(' ',
  report_number,
  NULLIF(TRIM(COALESCE(vehicle_model, '')), ''),
  NULLIF(TRIM(COALESCE(license_plate, '')), ''),
  NULLIF(TRIM(COALESCE(customer_title, '')), ''),
  NULLIF(TRIM(COALESCE(customer_initials, '')), ''),
  NULLIF(TRIM(COALESCE(customer_last_name, '')), '')
));