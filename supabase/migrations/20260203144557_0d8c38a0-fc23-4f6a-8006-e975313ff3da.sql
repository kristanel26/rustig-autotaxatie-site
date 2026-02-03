-- Create tire_brands table for reusable brand suggestions
CREATE TABLE public.tire_brands (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  name TEXT NOT NULL UNIQUE,
  usage_count INTEGER NOT NULL DEFAULT 1,
  last_used_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable RLS
ALTER TABLE public.tire_brands ENABLE ROW LEVEL SECURITY;

-- Allow all authenticated users to read brands
CREATE POLICY "Authenticated users can view tire brands"
ON public.tire_brands
FOR SELECT
USING (true);

-- Allow authenticated users to insert new brands
CREATE POLICY "Authenticated users can insert tire brands"
ON public.tire_brands
FOR INSERT
WITH CHECK (true);

-- Allow authenticated users to update usage stats
CREATE POLICY "Authenticated users can update tire brands"
ON public.tire_brands
FOR UPDATE
USING (true);

-- Create index for ordering by usage
CREATE INDEX idx_tire_brands_usage ON public.tire_brands (usage_count DESC, last_used_at DESC);

-- Create index for name search (case-insensitive)
CREATE INDEX idx_tire_brands_name_lower ON public.tire_brands (LOWER(name));