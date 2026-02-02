-- Add new customer address fields and vehicle_brand
ALTER TABLE public.reports 
ADD COLUMN IF NOT EXISTS customer_street text,
ADD COLUMN IF NOT EXISTS customer_postcode text,
ADD COLUMN IF NOT EXISTS customer_city text,
ADD COLUMN IF NOT EXISTS vehicle_brand text;

-- Update the generate_report_number function to use new document_reference format
CREATE OR REPLACE FUNCTION public.generate_report_number()
 RETURNS trigger
 LANGUAGE plpgsql
 SET search_path TO 'public'
AS $function$
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
  
  -- Build document_reference: [report_number] [vehicle_brand] [vehicle_model] [license_plate] [customer_title] [customer_initials] [customer_last_name]
  NEW.document_reference := TRIM(CONCAT_WS(' ',
    new_report_number,
    NULLIF(TRIM(COALESCE(NEW.vehicle_brand, '')), ''),
    NULLIF(TRIM(COALESCE(NEW.vehicle_model, '')), ''),
    NULLIF(TRIM(COALESCE(NEW.license_plate, '')), ''),
    NULLIF(TRIM(COALESCE(NEW.customer_title, '')), ''),
    NULLIF(TRIM(COALESCE(NEW.customer_initials, '')), ''),
    NULLIF(TRIM(COALESCE(NEW.customer_last_name, '')), '')
  ));
  
  RETURN NEW;
END;
$function$;

-- Update the sync_document_reference function with new format
CREATE OR REPLACE FUNCTION public.sync_document_reference()
 RETURNS trigger
 LANGUAGE plpgsql
 SET search_path TO 'public'
AS $function$
BEGIN
  -- Rebuild document_reference: [report_number] [vehicle_brand] [vehicle_model] [license_plate] [customer_title] [customer_initials] [customer_last_name]
  NEW.document_reference := TRIM(CONCAT_WS(' ',
    NEW.report_number,
    NULLIF(TRIM(COALESCE(NEW.vehicle_brand, '')), ''),
    NULLIF(TRIM(COALESCE(NEW.vehicle_model, '')), ''),
    NULLIF(TRIM(COALESCE(NEW.license_plate, '')), ''),
    NULLIF(TRIM(COALESCE(NEW.customer_title, '')), ''),
    NULLIF(TRIM(COALESCE(NEW.customer_initials, '')), ''),
    NULLIF(TRIM(COALESCE(NEW.customer_last_name, '')), '')
  ));
  
  RETURN NEW;
END;
$function$;

-- Update existing records with the new document_reference format
UPDATE public.reports
SET document_reference = TRIM(CONCAT_WS(' ',
  report_number,
  NULLIF(TRIM(COALESCE(vehicle_brand, '')), ''),
  NULLIF(TRIM(COALESCE(vehicle_model, '')), ''),
  NULLIF(TRIM(COALESCE(license_plate, '')), ''),
  NULLIF(TRIM(COALESCE(customer_title, '')), ''),
  NULLIF(TRIM(COALESCE(customer_initials, '')), ''),
  NULLIF(TRIM(COALESCE(customer_last_name, '')), '')
));