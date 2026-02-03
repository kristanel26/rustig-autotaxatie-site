-- Add general tire size field
ALTER TABLE public.reports
ADD COLUMN IF NOT EXISTS tire_bandenmaat text;

-- Add model columns per tire position
ALTER TABLE public.reports
ADD COLUMN IF NOT EXISTS tire_front_left_model text,
ADD COLUMN IF NOT EXISTS tire_front_right_model text,
ADD COLUMN IF NOT EXISTS tire_rear_left_model text,
ADD COLUMN IF NOT EXISTS tire_rear_right_model text;

-- Add profiel (tread depth) columns per tire position (optional)
ALTER TABLE public.reports
ADD COLUMN IF NOT EXISTS tire_front_left_profiel text,
ADD COLUMN IF NOT EXISTS tire_front_right_profiel text,
ADD COLUMN IF NOT EXISTS tire_rear_left_profiel text,
ADD COLUMN IF NOT EXISTS tire_rear_right_profiel text;