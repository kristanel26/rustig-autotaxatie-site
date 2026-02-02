-- Add tire size fields and customer contact fields
ALTER TABLE public.reports 
ADD COLUMN IF NOT EXISTS tire_front_left_size text,
ADD COLUMN IF NOT EXISTS tire_front_right_size text,
ADD COLUMN IF NOT EXISTS tire_rear_left_size text,
ADD COLUMN IF NOT EXISTS tire_rear_right_size text,
ADD COLUMN IF NOT EXISTS customer_email text,
ADD COLUMN IF NOT EXISTS customer_phone text;