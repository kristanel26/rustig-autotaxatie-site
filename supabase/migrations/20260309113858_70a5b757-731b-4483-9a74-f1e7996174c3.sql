ALTER TABLE public.reports 
  ADD COLUMN is_nieuwe_auto boolean NOT NULL DEFAULT false,
  ADD COLUMN is_grijs_kenteken boolean NOT NULL DEFAULT false,
  ADD COLUMN is_geel_kenteken boolean NOT NULL DEFAULT true;