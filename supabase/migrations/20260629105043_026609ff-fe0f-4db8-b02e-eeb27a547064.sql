
CREATE TABLE public.aanvragen (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  created_at timestamptz NOT NULL DEFAULT now(),
  bron text NOT NULL,
  service_type text,
  naam text,
  email text,
  telefoon text,
  kenteken text,
  merk_model text,
  voertuig_type text,
  postcode text,
  stad text,
  adres text,
  gewenste_datum text,
  bericht text,
  payload jsonb,
  status text NOT NULL DEFAULT 'nieuw'
);

GRANT ALL ON public.aanvragen TO service_role;

ALTER TABLE public.aanvragen ENABLE ROW LEVEL SECURITY;

-- No public/auth policies: only service_role (which bypasses RLS) can access.
