CREATE TABLE public.interior_options (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL,
  usage_count integer NOT NULL DEFAULT 1,
  last_used_at timestamptz NOT NULL DEFAULT now(),
  created_at timestamptz NOT NULL DEFAULT now()
);

CREATE UNIQUE INDEX interior_options_name_lower_idx ON public.interior_options (lower(name));

ALTER TABLE public.interior_options ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Authenticated users can read interior_options"
  ON public.interior_options FOR SELECT TO authenticated USING (true);

CREATE POLICY "Authenticated users can insert interior_options"
  ON public.interior_options FOR INSERT TO authenticated WITH CHECK (true);

CREATE POLICY "Authenticated users can update interior_options"
  ON public.interior_options FOR UPDATE TO authenticated USING (true) WITH CHECK (true);