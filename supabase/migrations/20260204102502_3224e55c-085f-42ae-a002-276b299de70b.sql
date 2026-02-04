-- =====================================================
-- WEV DATAMODEL RESTRUCTURING
-- Complete schema for web appraisals (webtaxaties)
-- =====================================================

-- 1. Update reports table with new fields
ALTER TABLE public.reports 
ADD COLUMN IF NOT EXISTS status TEXT DEFAULT 'concept' CHECK (status IN ('concept', 'in_behandeling', 'gereed', 'gearchiveerd')),
ADD COLUMN IF NOT EXISTS ready_at TIMESTAMP WITH TIME ZONE,
ADD COLUMN IF NOT EXISTS signed_at TIMESTAMP WITH TIME ZONE;

-- 2. Create report_client table
CREATE TABLE IF NOT EXISTS public.report_client (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  report_id UUID NOT NULL REFERENCES public.reports(id) ON DELETE CASCADE,
  salutation TEXT CHECK (salutation IN ('dhr', 'mevr', 'anders', '')),
  initials TEXT,
  first_name TEXT,
  last_name TEXT NOT NULL,
  street TEXT,
  house_number TEXT,
  postal_code TEXT,
  city TEXT,
  email_internal TEXT,
  phone_internal TEXT,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  UNIQUE(report_id)
);

-- 3. Create report_vehicle table
CREATE TABLE IF NOT EXISTS public.report_vehicle (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  report_id UUID NOT NULL REFERENCES public.reports(id) ON DELETE CASCADE,
  license_plate TEXT,
  vin TEXT CHECK (vin IS NULL OR (LENGTH(vin) = 17 AND vin !~ '[IOQ]')),
  make TEXT,
  model TEXT,
  trim TEXT,
  body_type TEXT,
  fuel_type TEXT,
  transmission_type TEXT CHECK (transmission_type IS NULL OR transmission_type IN ('handgeschakeld', 'automaat', 'semi-automaat', 'onbekend')),
  odometer_value INTEGER CHECK (odometer_value IS NULL OR odometer_value >= 0),
  odometer_unit TEXT DEFAULT 'km' CHECK (odometer_unit IN ('km', 'mi')),
  color TEXT,
  power_kw INTEGER,
  engine_cc INTEGER,
  cylinders INTEGER,
  first_registration_date DATE,
  build_year INTEGER CHECK (build_year IS NULL OR (build_year >= 1900 AND build_year <= EXTRACT(YEAR FROM CURRENT_DATE) + 1)),
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  UNIQUE(report_id)
);

-- 4. Create report_inspection table
CREATE TABLE IF NOT EXISTS public.report_inspection (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  report_id UUID NOT NULL REFERENCES public.reports(id) ON DELETE CASCADE,
  inspection_date DATE,
  inspection_location TEXT,
  start_time TIME,
  end_time TIME,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  UNIQUE(report_id)
);

-- 5. Create report_condition_sections table
CREATE TABLE IF NOT EXISTS public.report_condition_sections (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  report_id UUID NOT NULL REFERENCES public.reports(id) ON DELETE CASCADE,
  section_key TEXT NOT NULL CHECK (section_key IN ('exterior', 'interior', 'engine', 'drivetrain_transmission', 'brakes', 'steering', 'suspension', 'electrical', 'general_state')),
  condition_rating TEXT CHECK (condition_rating IS NULL OR condition_rating IN ('goed', 'redelijk', 'matig', 'slecht', 'nvt')),
  notes TEXT,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  UNIQUE(report_id, section_key)
);

-- 6. Create report_market table
CREATE TABLE IF NOT EXISTS public.report_market (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  report_id UUID NOT NULL REFERENCES public.reports(id) ON DELETE CASCADE,
  vat_margin_type TEXT NOT NULL CHECK (vat_margin_type IN ('btw', 'marge', 'onbekend')),
  trade_in_value INTEGER NOT NULL CHECK (trade_in_value >= 0),
  retail_value INTEGER NOT NULL CHECK (retail_value >= 0),
  source TEXT DEFAULT 'Autotelex',
  wev_calculated_avg INTEGER GENERATED ALWAYS AS (ROUND((trade_in_value + retail_value) / 2.0)) STORED,
  final_value INTEGER NOT NULL CHECK (final_value >= 0),
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  UNIQUE(report_id)
);

-- 7. Create report_valuation_narratives table
CREATE TABLE IF NOT EXISTS public.report_valuation_narratives (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  report_id UUID NOT NULL REFERENCES public.reports(id) ON DELETE CASCADE,
  corrections_motivation TEXT NOT NULL,
  min_bandwidth INTEGER NOT NULL,
  max_bandwidth INTEGER NOT NULL,
  final_motivation TEXT NOT NULL,
  general_remarks TEXT,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  UNIQUE(report_id),
  CHECK (min_bandwidth <= max_bandwidth)
);

-- 8. Create report_comparables table
CREATE TABLE IF NOT EXISTS public.report_comparables (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  report_id UUID NOT NULL REFERENCES public.reports(id) ON DELETE CASCADE,
  title TEXT NOT NULL,
  url TEXT,
  source TEXT,
  asking_price INTEGER,
  mileage INTEGER,
  year INTEGER,
  notes TEXT,
  sort_order INTEGER DEFAULT 0,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- 9. Create report_media_photos table
CREATE TABLE IF NOT EXISTS public.report_media_photos (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  report_id UUID NOT NULL REFERENCES public.reports(id) ON DELETE CASCADE,
  file_url TEXT NOT NULL,
  file_name TEXT NOT NULL,
  uploaded_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  sort_order INTEGER DEFAULT 0,
  is_cover BOOLEAN DEFAULT false,
  rotation_degrees INTEGER DEFAULT 0 CHECK (rotation_degrees IN (0, 90, 180, 270)),
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- 10. Create report_attachments table
CREATE TABLE IF NOT EXISTS public.report_attachments (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  report_id UUID NOT NULL REFERENCES public.reports(id) ON DELETE CASCADE,
  attachment_type TEXT NOT NULL CHECK (attachment_type IN ('waardebepaling_autotelex', 'schadecalculatie_silverdat', 'overig')),
  file_url TEXT NOT NULL,
  file_name TEXT NOT NULL,
  uploaded_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  extracted_trade_in_value INTEGER,
  extracted_retail_value INTEGER,
  extracted_source_reference TEXT,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- =====================================================
-- INDEXES FOR PERFORMANCE
-- =====================================================
CREATE INDEX IF NOT EXISTS idx_report_client_report_id ON public.report_client(report_id);
CREATE INDEX IF NOT EXISTS idx_report_vehicle_report_id ON public.report_vehicle(report_id);
CREATE INDEX IF NOT EXISTS idx_report_vehicle_license_plate ON public.report_vehicle(license_plate);
CREATE INDEX IF NOT EXISTS idx_report_vehicle_vin ON public.report_vehicle(vin);
CREATE INDEX IF NOT EXISTS idx_report_inspection_report_id ON public.report_inspection(report_id);
CREATE INDEX IF NOT EXISTS idx_report_condition_sections_report_id ON public.report_condition_sections(report_id);
CREATE INDEX IF NOT EXISTS idx_report_market_report_id ON public.report_market(report_id);
CREATE INDEX IF NOT EXISTS idx_report_valuation_narratives_report_id ON public.report_valuation_narratives(report_id);
CREATE INDEX IF NOT EXISTS idx_report_comparables_report_id ON public.report_comparables(report_id);
CREATE INDEX IF NOT EXISTS idx_report_media_photos_report_id ON public.report_media_photos(report_id);
CREATE INDEX IF NOT EXISTS idx_report_attachments_report_id ON public.report_attachments(report_id);
CREATE INDEX IF NOT EXISTS idx_reports_status ON public.reports(status);
CREATE INDEX IF NOT EXISTS idx_reports_report_type ON public.reports(report_type);

-- =====================================================
-- ROW LEVEL SECURITY POLICIES
-- =====================================================

-- Enable RLS on all new tables
ALTER TABLE public.report_client ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.report_vehicle ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.report_inspection ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.report_condition_sections ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.report_market ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.report_valuation_narratives ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.report_comparables ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.report_media_photos ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.report_attachments ENABLE ROW LEVEL SECURITY;

-- report_client policies
CREATE POLICY "Users can view client data for their reports" ON public.report_client
  FOR SELECT USING (EXISTS (SELECT 1 FROM reports WHERE reports.id = report_client.report_id AND reports.user_id = auth.uid()));
CREATE POLICY "Users can insert client data for their reports" ON public.report_client
  FOR INSERT WITH CHECK (EXISTS (SELECT 1 FROM reports WHERE reports.id = report_client.report_id AND reports.user_id = auth.uid()));
CREATE POLICY "Users can update client data for their reports" ON public.report_client
  FOR UPDATE USING (EXISTS (SELECT 1 FROM reports WHERE reports.id = report_client.report_id AND reports.user_id = auth.uid()));
CREATE POLICY "Users can delete client data for their reports" ON public.report_client
  FOR DELETE USING (EXISTS (SELECT 1 FROM reports WHERE reports.id = report_client.report_id AND reports.user_id = auth.uid()));

-- report_vehicle policies
CREATE POLICY "Users can view vehicle data for their reports" ON public.report_vehicle
  FOR SELECT USING (EXISTS (SELECT 1 FROM reports WHERE reports.id = report_vehicle.report_id AND reports.user_id = auth.uid()));
CREATE POLICY "Users can insert vehicle data for their reports" ON public.report_vehicle
  FOR INSERT WITH CHECK (EXISTS (SELECT 1 FROM reports WHERE reports.id = report_vehicle.report_id AND reports.user_id = auth.uid()));
CREATE POLICY "Users can update vehicle data for their reports" ON public.report_vehicle
  FOR UPDATE USING (EXISTS (SELECT 1 FROM reports WHERE reports.id = report_vehicle.report_id AND reports.user_id = auth.uid()));
CREATE POLICY "Users can delete vehicle data for their reports" ON public.report_vehicle
  FOR DELETE USING (EXISTS (SELECT 1 FROM reports WHERE reports.id = report_vehicle.report_id AND reports.user_id = auth.uid()));

-- report_inspection policies
CREATE POLICY "Users can view inspection data for their reports" ON public.report_inspection
  FOR SELECT USING (EXISTS (SELECT 1 FROM reports WHERE reports.id = report_inspection.report_id AND reports.user_id = auth.uid()));
CREATE POLICY "Users can insert inspection data for their reports" ON public.report_inspection
  FOR INSERT WITH CHECK (EXISTS (SELECT 1 FROM reports WHERE reports.id = report_inspection.report_id AND reports.user_id = auth.uid()));
CREATE POLICY "Users can update inspection data for their reports" ON public.report_inspection
  FOR UPDATE USING (EXISTS (SELECT 1 FROM reports WHERE reports.id = report_inspection.report_id AND reports.user_id = auth.uid()));
CREATE POLICY "Users can delete inspection data for their reports" ON public.report_inspection
  FOR DELETE USING (EXISTS (SELECT 1 FROM reports WHERE reports.id = report_inspection.report_id AND reports.user_id = auth.uid()));

-- report_condition_sections policies
CREATE POLICY "Users can view condition data for their reports" ON public.report_condition_sections
  FOR SELECT USING (EXISTS (SELECT 1 FROM reports WHERE reports.id = report_condition_sections.report_id AND reports.user_id = auth.uid()));
CREATE POLICY "Users can insert condition data for their reports" ON public.report_condition_sections
  FOR INSERT WITH CHECK (EXISTS (SELECT 1 FROM reports WHERE reports.id = report_condition_sections.report_id AND reports.user_id = auth.uid()));
CREATE POLICY "Users can update condition data for their reports" ON public.report_condition_sections
  FOR UPDATE USING (EXISTS (SELECT 1 FROM reports WHERE reports.id = report_condition_sections.report_id AND reports.user_id = auth.uid()));
CREATE POLICY "Users can delete condition data for their reports" ON public.report_condition_sections
  FOR DELETE USING (EXISTS (SELECT 1 FROM reports WHERE reports.id = report_condition_sections.report_id AND reports.user_id = auth.uid()));

-- report_market policies
CREATE POLICY "Users can view market data for their reports" ON public.report_market
  FOR SELECT USING (EXISTS (SELECT 1 FROM reports WHERE reports.id = report_market.report_id AND reports.user_id = auth.uid()));
CREATE POLICY "Users can insert market data for their reports" ON public.report_market
  FOR INSERT WITH CHECK (EXISTS (SELECT 1 FROM reports WHERE reports.id = report_market.report_id AND reports.user_id = auth.uid()));
CREATE POLICY "Users can update market data for their reports" ON public.report_market
  FOR UPDATE USING (EXISTS (SELECT 1 FROM reports WHERE reports.id = report_market.report_id AND reports.user_id = auth.uid()));
CREATE POLICY "Users can delete market data for their reports" ON public.report_market
  FOR DELETE USING (EXISTS (SELECT 1 FROM reports WHERE reports.id = report_market.report_id AND reports.user_id = auth.uid()));

-- report_valuation_narratives policies
CREATE POLICY "Users can view narratives for their reports" ON public.report_valuation_narratives
  FOR SELECT USING (EXISTS (SELECT 1 FROM reports WHERE reports.id = report_valuation_narratives.report_id AND reports.user_id = auth.uid()));
CREATE POLICY "Users can insert narratives for their reports" ON public.report_valuation_narratives
  FOR INSERT WITH CHECK (EXISTS (SELECT 1 FROM reports WHERE reports.id = report_valuation_narratives.report_id AND reports.user_id = auth.uid()));
CREATE POLICY "Users can update narratives for their reports" ON public.report_valuation_narratives
  FOR UPDATE USING (EXISTS (SELECT 1 FROM reports WHERE reports.id = report_valuation_narratives.report_id AND reports.user_id = auth.uid()));
CREATE POLICY "Users can delete narratives for their reports" ON public.report_valuation_narratives
  FOR DELETE USING (EXISTS (SELECT 1 FROM reports WHERE reports.id = report_valuation_narratives.report_id AND reports.user_id = auth.uid()));

-- report_comparables policies
CREATE POLICY "Users can view comparables for their reports" ON public.report_comparables
  FOR SELECT USING (EXISTS (SELECT 1 FROM reports WHERE reports.id = report_comparables.report_id AND reports.user_id = auth.uid()));
CREATE POLICY "Users can insert comparables for their reports" ON public.report_comparables
  FOR INSERT WITH CHECK (EXISTS (SELECT 1 FROM reports WHERE reports.id = report_comparables.report_id AND reports.user_id = auth.uid()));
CREATE POLICY "Users can update comparables for their reports" ON public.report_comparables
  FOR UPDATE USING (EXISTS (SELECT 1 FROM reports WHERE reports.id = report_comparables.report_id AND reports.user_id = auth.uid()));
CREATE POLICY "Users can delete comparables for their reports" ON public.report_comparables
  FOR DELETE USING (EXISTS (SELECT 1 FROM reports WHERE reports.id = report_comparables.report_id AND reports.user_id = auth.uid()));

-- report_media_photos policies
CREATE POLICY "Users can view photos for their reports" ON public.report_media_photos
  FOR SELECT USING (EXISTS (SELECT 1 FROM reports WHERE reports.id = report_media_photos.report_id AND reports.user_id = auth.uid()));
CREATE POLICY "Users can insert photos for their reports" ON public.report_media_photos
  FOR INSERT WITH CHECK (EXISTS (SELECT 1 FROM reports WHERE reports.id = report_media_photos.report_id AND reports.user_id = auth.uid()));
CREATE POLICY "Users can update photos for their reports" ON public.report_media_photos
  FOR UPDATE USING (EXISTS (SELECT 1 FROM reports WHERE reports.id = report_media_photos.report_id AND reports.user_id = auth.uid()));
CREATE POLICY "Users can delete photos for their reports" ON public.report_media_photos
  FOR DELETE USING (EXISTS (SELECT 1 FROM reports WHERE reports.id = report_media_photos.report_id AND reports.user_id = auth.uid()));

-- report_attachments policies
CREATE POLICY "Users can view attachments for their reports" ON public.report_attachments
  FOR SELECT USING (EXISTS (SELECT 1 FROM reports WHERE reports.id = report_attachments.report_id AND reports.user_id = auth.uid()));
CREATE POLICY "Users can insert attachments for their reports" ON public.report_attachments
  FOR INSERT WITH CHECK (EXISTS (SELECT 1 FROM reports WHERE reports.id = report_attachments.report_id AND reports.user_id = auth.uid()));
CREATE POLICY "Users can update attachments for their reports" ON public.report_attachments
  FOR UPDATE USING (EXISTS (SELECT 1 FROM reports WHERE reports.id = report_attachments.report_id AND reports.user_id = auth.uid()));
CREATE POLICY "Users can delete attachments for their reports" ON public.report_attachments
  FOR DELETE USING (EXISTS (SELECT 1 FROM reports WHERE reports.id = report_attachments.report_id AND reports.user_id = auth.uid()));

-- =====================================================
-- TRIGGERS FOR updated_at
-- =====================================================
CREATE TRIGGER update_report_client_updated_at BEFORE UPDATE ON public.report_client
  FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();
CREATE TRIGGER update_report_vehicle_updated_at BEFORE UPDATE ON public.report_vehicle
  FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();
CREATE TRIGGER update_report_inspection_updated_at BEFORE UPDATE ON public.report_inspection
  FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();
CREATE TRIGGER update_report_condition_sections_updated_at BEFORE UPDATE ON public.report_condition_sections
  FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();
CREATE TRIGGER update_report_market_updated_at BEFORE UPDATE ON public.report_market
  FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();
CREATE TRIGGER update_report_valuation_narratives_updated_at BEFORE UPDATE ON public.report_valuation_narratives
  FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();