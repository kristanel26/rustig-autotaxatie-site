-- Vocht (Moisture) sectie
ALTER TABLE public.reports 
  ADD COLUMN IF NOT EXISTS moisture_measurement_performed boolean DEFAULT false,
  ADD COLUMN IF NOT EXISTS moisture_advice text;

-- Brand & Gas veiligheid (Fire & Gas Safety)
ALTER TABLE public.reports 
  ADD COLUMN IF NOT EXISTS fire_extinguisher boolean DEFAULT false,
  ADD COLUMN IF NOT EXISTS gas_detection boolean DEFAULT false,
  ADD COLUMN IF NOT EXISTS smoke_detector boolean DEFAULT false;

-- Beveiliging soort (Security type - free text)
ALTER TABLE public.reports 
  ADD COLUMN IF NOT EXISTS security_type text;

-- Advies banden (Tire advice)
ALTER TABLE public.reports 
  ADD COLUMN IF NOT EXISTS tire_advice text;