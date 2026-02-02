-- Remove separate cover_photo_url and add vehicle_photos array
ALTER TABLE public.reports DROP COLUMN IF EXISTS cover_photo_url;

-- Add vehicle_photos as a text array to store multiple photo URLs in order
ALTER TABLE public.reports ADD COLUMN vehicle_photos TEXT[] DEFAULT '{}';

-- Add a comment explaining the field
COMMENT ON COLUMN public.reports.vehicle_photos IS 'Array of vehicle photo URLs. First photo (index 0) is used as cover photo.';