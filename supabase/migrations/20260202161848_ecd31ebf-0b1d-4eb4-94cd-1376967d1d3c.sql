-- Add vehicle_title field for the free-form vehicle title on PDF cover
-- This is the appraiser's custom title, NOT the RDW handelsbenaming
ALTER TABLE public.reports 
ADD COLUMN vehicle_title text;