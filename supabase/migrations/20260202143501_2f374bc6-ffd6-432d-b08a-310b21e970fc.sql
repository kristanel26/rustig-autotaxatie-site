-- Update generate_report_number to use new document_reference format: [year]-[last 4 chars of VIN]
CREATE OR REPLACE FUNCTION public.generate_report_number()
 RETURNS trigger
 LANGUAGE plpgsql
 SET search_path TO 'public'
AS $function$
DECLARE
  current_year text;
  next_number integer;
  new_report_number text;
  vin_suffix text;
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
  
  -- Build document_reference: [year]-[last 4 chars of VIN]
  IF NEW.vin IS NOT NULL AND LENGTH(NEW.vin) >= 4 THEN
    vin_suffix := RIGHT(UPPER(NEW.vin), 4);
    NEW.document_reference := current_year || '-' || vin_suffix;
  ELSE
    NEW.document_reference := NULL;
  END IF;
  
  RETURN NEW;
END;
$function$;

-- Update sync_document_reference to use new format: [year]-[last 4 chars of VIN]
CREATE OR REPLACE FUNCTION public.sync_document_reference()
 RETURNS trigger
 LANGUAGE plpgsql
 SET search_path TO 'public'
AS $function$
DECLARE
  current_year text;
  vin_suffix text;
BEGIN
  current_year := EXTRACT(YEAR FROM CURRENT_DATE)::text;
  
  -- Build document_reference: [year]-[last 4 chars of VIN]
  IF NEW.vin IS NOT NULL AND LENGTH(NEW.vin) >= 4 THEN
    vin_suffix := RIGHT(UPPER(NEW.vin), 4);
    NEW.document_reference := current_year || '-' || vin_suffix;
  ELSE
    NEW.document_reference := NULL;
  END IF;
  
  RETURN NEW;
END;
$function$;