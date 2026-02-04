-- Create vehicle_colors table for color lookup
CREATE TABLE public.vehicle_colors (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL,
  hex_value text NULL,
  is_active boolean NOT NULL DEFAULT true,
  sort_order integer NULL,
  created_at timestamp with time zone NOT NULL DEFAULT now(),
  updated_at timestamp with time zone NOT NULL DEFAULT now()
);

-- Create unique constraint on lowercase name to prevent duplicates
CREATE UNIQUE INDEX idx_vehicle_colors_name_lower ON public.vehicle_colors (LOWER(name));

-- Create index for active colors sorted alphabetically
CREATE INDEX idx_vehicle_colors_active ON public.vehicle_colors (is_active, name);

-- Enable RLS
ALTER TABLE public.vehicle_colors ENABLE ROW LEVEL SECURITY;

-- Policies: authenticated users can read active colors
CREATE POLICY "Authenticated users can view active colors"
ON public.vehicle_colors
FOR SELECT
TO authenticated
USING (is_active = true);

-- Authenticated users can insert new colors
CREATE POLICY "Authenticated users can insert colors"
ON public.vehicle_colors
FOR INSERT
TO authenticated
WITH CHECK (true);

-- Only allow updates (for admin functionality later)
CREATE POLICY "Authenticated users can update colors"
ON public.vehicle_colors
FOR UPDATE
TO authenticated
USING (true);

-- Add trigger for updated_at
CREATE TRIGGER update_vehicle_colors_updated_at
BEFORE UPDATE ON public.vehicle_colors
FOR EACH ROW
EXECUTE FUNCTION public.update_updated_at_column();

-- Insert common Dutch vehicle colors
INSERT INTO public.vehicle_colors (name, hex_value, sort_order) VALUES
  ('Wit', '#FFFFFF', 1),
  ('Zwart', '#000000', 2),
  ('Grijs', '#808080', 3),
  ('Zilver', '#C0C0C0', 4),
  ('Blauw', '#0000FF', 5),
  ('Rood', '#FF0000', 6),
  ('Groen', '#008000', 7),
  ('Bruin', '#8B4513', 8),
  ('Beige', '#F5F5DC', 9),
  ('Geel', '#FFFF00', 10),
  ('Oranje', '#FFA500', 11),
  ('Paars', '#800080', 12),
  ('Bordeaux', '#800020', 13),
  ('Champagne', '#F7E7CE', 14),
  ('Antraciet', '#293133', 15),
  ('Crème', '#FFFDD0', 16),
  ('Ivoor', '#FFFFF0', 17)
ON CONFLICT DO NOTHING;

-- Add comment
COMMENT ON TABLE public.vehicle_colors IS 'Lookup table for vehicle colors with case-insensitive unique names';