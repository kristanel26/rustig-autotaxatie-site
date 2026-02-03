-- Add columns for Section 13: Leidingen & Installaties
ALTER TABLE public.reports ADD COLUMN IF NOT EXISTS installation_electrical text;
ALTER TABLE public.reports ADD COLUMN IF NOT EXISTS installation_water text;
ALTER TABLE public.reports ADD COLUMN IF NOT EXISTS installation_gas text;
ALTER TABLE public.reports ADD COLUMN IF NOT EXISTS leakage_electrical text;

-- Add columns for Section 14: Extra's / Campertechniek
ALTER TABLE public.reports ADD COLUMN IF NOT EXISTS lpg_underbody boolean DEFAULT false;
ALTER TABLE public.reports ADD COLUMN IF NOT EXISTS loose_gas_tanks boolean DEFAULT false;
ALTER TABLE public.reports ADD COLUMN IF NOT EXISTS gas_hose_production_date text;
ALTER TABLE public.reports ADD COLUMN IF NOT EXISTS pressure_regulator_production_date text;
ALTER TABLE public.reports ADD COLUMN IF NOT EXISTS voltage text;
ALTER TABLE public.reports ADD COLUMN IF NOT EXISTS earth_leakage_switch boolean DEFAULT false;
ALTER TABLE public.reports ADD COLUMN IF NOT EXISTS fused boolean DEFAULT false;
ALTER TABLE public.reports ADD COLUMN IF NOT EXISTS onboard_battery boolean DEFAULT false;
ALTER TABLE public.reports ADD COLUMN IF NOT EXISTS starter_battery boolean DEFAULT false;

-- Add columns for Section 15: Beveiliging
ALTER TABLE public.reports ADD COLUMN IF NOT EXISTS security_present boolean DEFAULT false;
ALTER TABLE public.reports ADD COLUMN IF NOT EXISTS mechanical_security text;
ALTER TABLE public.reports ADD COLUMN IF NOT EXISTS vehicle_tracking boolean DEFAULT false;
ALTER TABLE public.reports ADD COLUMN IF NOT EXISTS tracking_brand text;

-- Add columns for Section 16: Algemene Indruk (PDF text fields)
ALTER TABLE public.reports ADD COLUMN IF NOT EXISTS impression_suspension text;
ALTER TABLE public.reports ADD COLUMN IF NOT EXISTS impression_wheels_tires text;
ALTER TABLE public.reports ADD COLUMN IF NOT EXISTS impression_steering text;
ALTER TABLE public.reports ADD COLUMN IF NOT EXISTS impression_brakes text;
ALTER TABLE public.reports ADD COLUMN IF NOT EXISTS impression_engine text;
ALTER TABLE public.reports ADD COLUMN IF NOT EXISTS impression_transmission text;
ALTER TABLE public.reports ADD COLUMN IF NOT EXISTS impression_electrical text;
ALTER TABLE public.reports ADD COLUMN IF NOT EXISTS impression_body text;
ALTER TABLE public.reports ADD COLUMN IF NOT EXISTS impression_interior text;
ALTER TABLE public.reports ADD COLUMN IF NOT EXISTS impression_general text;
ALTER TABLE public.reports ADD COLUMN IF NOT EXISTS impression_extras text;

-- Add comments for documentation
COMMENT ON COLUMN public.reports.installation_electrical IS 'Montage elektra: Goed/Voldoende/Slecht';
COMMENT ON COLUMN public.reports.installation_water IS 'Montage water: Goed/Voldoende/Slecht';
COMMENT ON COLUMN public.reports.installation_gas IS 'Montage gas: Goed/Voldoende/Slecht';
COMMENT ON COLUMN public.reports.leakage_electrical IS 'Lekkage elektra: Geen meting verricht/Geen lekkage waargenomen';
COMMENT ON COLUMN public.reports.lpg_underbody IS 'LPG onderbouw aanwezig';
COMMENT ON COLUMN public.reports.loose_gas_tanks IS 'Losse gastank(s) aanwezig';
COMMENT ON COLUMN public.reports.gas_hose_production_date IS 'Gasslang productiedatum';
COMMENT ON COLUMN public.reports.pressure_regulator_production_date IS 'Drukregelaar productiedatum';
COMMENT ON COLUMN public.reports.voltage IS 'Voltage bijv. 12V-230V';
COMMENT ON COLUMN public.reports.earth_leakage_switch IS 'Aardlekschakelaar aanwezig';
COMMENT ON COLUMN public.reports.fused IS 'Gezekerd';
COMMENT ON COLUMN public.reports.onboard_battery IS 'Boordaccu aanwezig';
COMMENT ON COLUMN public.reports.starter_battery IS 'Startaccu aanwezig';
COMMENT ON COLUMN public.reports.security_present IS 'Beveiliging aanwezig';
COMMENT ON COLUMN public.reports.mechanical_security IS 'Mechanische beveiliging type (Bearlock/Construct)';
COMMENT ON COLUMN public.reports.vehicle_tracking IS 'Voertuigvolgsysteem aanwezig';
COMMENT ON COLUMN public.reports.tracking_brand IS 'Merk volgsysteem';
COMMENT ON COLUMN public.reports.impression_suspension IS 'Algemene indruk wielophanging';
COMMENT ON COLUMN public.reports.impression_wheels_tires IS 'Algemene indruk velgen en banden';
COMMENT ON COLUMN public.reports.impression_steering IS 'Algemene indruk stuurinrichting';
COMMENT ON COLUMN public.reports.impression_brakes IS 'Algemene indruk remmen';
COMMENT ON COLUMN public.reports.impression_engine IS 'Algemene indruk motor';
COMMENT ON COLUMN public.reports.impression_transmission IS 'Algemene indruk versnellingsbak en aandrijving';
COMMENT ON COLUMN public.reports.impression_electrical IS 'Algemene indruk elektrische installatie';
COMMENT ON COLUMN public.reports.impression_body IS 'Algemene indruk carrosserie staat';
COMMENT ON COLUMN public.reports.impression_interior IS 'Algemene indruk interieur';
COMMENT ON COLUMN public.reports.impression_general IS 'Algemene staat voertuig';
COMMENT ON COLUMN public.reports.impression_extras IS 'Algemene indruk extra''s';