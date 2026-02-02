-- Taxateursecties: Technische staat voertuig (dropdown + opmerkingen)
ALTER TABLE public.reports ADD COLUMN IF NOT EXISTS condition_engine text;
ALTER TABLE public.reports ADD COLUMN IF NOT EXISTS condition_engine_notes text;
ALTER TABLE public.reports ADD COLUMN IF NOT EXISTS condition_transmission text;
ALTER TABLE public.reports ADD COLUMN IF NOT EXISTS condition_transmission_notes text;
ALTER TABLE public.reports ADD COLUMN IF NOT EXISTS condition_brakes text;
ALTER TABLE public.reports ADD COLUMN IF NOT EXISTS condition_brakes_notes text;
ALTER TABLE public.reports ADD COLUMN IF NOT EXISTS condition_suspension text;
ALTER TABLE public.reports ADD COLUMN IF NOT EXISTS condition_suspension_notes text;
ALTER TABLE public.reports ADD COLUMN IF NOT EXISTS condition_steering text;
ALTER TABLE public.reports ADD COLUMN IF NOT EXISTS condition_steering_notes text;
ALTER TABLE public.reports ADD COLUMN IF NOT EXISTS condition_electrical text;
ALTER TABLE public.reports ADD COLUMN IF NOT EXISTS condition_electrical_notes text;

-- Taxateursecties: Banden en wielen
ALTER TABLE public.reports ADD COLUMN IF NOT EXISTS tire_front_left_brand text;
ALTER TABLE public.reports ADD COLUMN IF NOT EXISTS tire_front_left_dot text;
ALTER TABLE public.reports ADD COLUMN IF NOT EXISTS tire_front_left_season text;
ALTER TABLE public.reports ADD COLUMN IF NOT EXISTS tire_front_right_brand text;
ALTER TABLE public.reports ADD COLUMN IF NOT EXISTS tire_front_right_dot text;
ALTER TABLE public.reports ADD COLUMN IF NOT EXISTS tire_front_right_season text;
ALTER TABLE public.reports ADD COLUMN IF NOT EXISTS tire_rear_left_brand text;
ALTER TABLE public.reports ADD COLUMN IF NOT EXISTS tire_rear_left_dot text;
ALTER TABLE public.reports ADD COLUMN IF NOT EXISTS tire_rear_left_season text;
ALTER TABLE public.reports ADD COLUMN IF NOT EXISTS tire_rear_right_brand text;
ALTER TABLE public.reports ADD COLUMN IF NOT EXISTS tire_rear_right_dot text;
ALTER TABLE public.reports ADD COLUMN IF NOT EXISTS tire_rear_right_season text;
ALTER TABLE public.reports ADD COLUMN IF NOT EXISTS rim_type text;

-- Taxateursecties: Exterieur (dropdown + opmerkingen)
ALTER TABLE public.reports ADD COLUMN IF NOT EXISTS exterior_body text;
ALTER TABLE public.reports ADD COLUMN IF NOT EXISTS exterior_body_notes text;
ALTER TABLE public.reports ADD COLUMN IF NOT EXISTS exterior_paint text;
ALTER TABLE public.reports ADD COLUMN IF NOT EXISTS exterior_paint_notes text;
ALTER TABLE public.reports ADD COLUMN IF NOT EXISTS exterior_rubbers text;
ALTER TABLE public.reports ADD COLUMN IF NOT EXISTS exterior_rubbers_notes text;
ALTER TABLE public.reports ADD COLUMN IF NOT EXISTS exterior_windows text;
ALTER TABLE public.reports ADD COLUMN IF NOT EXISTS exterior_windows_notes text;
ALTER TABLE public.reports ADD COLUMN IF NOT EXISTS exterior_sealant text;
ALTER TABLE public.reports ADD COLUMN IF NOT EXISTS exterior_sealant_notes text;

-- Taxateursecties: Interieur (dropdown + opmerkingen)
ALTER TABLE public.reports ADD COLUMN IF NOT EXISTS interior_upholstery text;
ALTER TABLE public.reports ADD COLUMN IF NOT EXISTS interior_upholstery_notes text;
ALTER TABLE public.reports ADD COLUMN IF NOT EXISTS interior_dashboard text;
ALTER TABLE public.reports ADD COLUMN IF NOT EXISTS interior_dashboard_notes text;
ALTER TABLE public.reports ADD COLUMN IF NOT EXISTS interior_floor text;
ALTER TABLE public.reports ADD COLUMN IF NOT EXISTS interior_floor_notes text;
ALTER TABLE public.reports ADD COLUMN IF NOT EXISTS interior_roof text;
ALTER TABLE public.reports ADD COLUMN IF NOT EXISTS interior_roof_notes text;
ALTER TABLE public.reports ADD COLUMN IF NOT EXISTS interior_kitchen text;
ALTER TABLE public.reports ADD COLUMN IF NOT EXISTS interior_kitchen_notes text;
ALTER TABLE public.reports ADD COLUMN IF NOT EXISTS interior_sanitary text;
ALTER TABLE public.reports ADD COLUMN IF NOT EXISTS interior_sanitary_notes text;

-- Model display name (taxateur kan afwijkende modelnaam opgeven)
ALTER TABLE public.reports ADD COLUMN IF NOT EXISTS model_display_name text;