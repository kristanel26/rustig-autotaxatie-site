-- Add column to store photo rotations as JSONB object mapping URL to rotation (0, 90, 180, 270)
ALTER TABLE public.reports 
ADD COLUMN IF NOT EXISTS vehicle_photo_rotations JSONB DEFAULT '{}'::jsonb;

-- Add comment for documentation
COMMENT ON COLUMN public.reports.vehicle_photo_rotations IS 'Stores rotation values (0, 90, 180, 270) for each photo URL as key-value pairs';