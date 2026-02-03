-- Drop the old integer quality_class column and create a new text column
-- First rename old column to preserve data temporarily
ALTER TABLE public.reports 
  DROP COLUMN IF EXISTS quality_class;

-- Add new text column for quality class
ALTER TABLE public.reports 
  ADD COLUMN quality_class text;

-- Add a comment for documentation
COMMENT ON COLUMN public.reports.quality_class IS 'Kwaliteitsklasse - stores the exact class name (Uitmuntend, Zeer goed, Goed, Matig, Slecht)';