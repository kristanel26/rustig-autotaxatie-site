import { useState, useEffect, useCallback, useMemo, useRef } from 'react';
import { useNavigate, useParams, useLocation } from 'react-router-dom';
import InternalLayout from '@/components/internal/InternalLayout';
import { useAuth } from '@/contexts/AuthContext';
import { supabase } from '@/integrations/supabase/client';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { useToast } from '@/hooks/use-toast';
import { z } from 'zod';
import { ArrowLeft, CheckCircle, Loader2, Send } from 'lucide-react';
import { pdf } from '@react-pdf/renderer';
import PdfRenderer from '@/components/internal/pdf/PdfRenderer';
import { normalizeReportFormData, LICENSE_PLATE_REGEX, numberToDutchWords, normalizeInitials, capitalizeFirst } from '@/lib/normalizers';
import { validateVin, validateEmail, validatePhone } from '@/lib/validators';
import { qualityClasses } from '@/lib/qualityClasses';
import { VehicleInfoForm, VehicleFormData, getInitialVehicleFormData } from '@/components/internal/VehicleInfoForm';
import { AppraisalFindingsForm, AppraisalFormData, getInitialAppraisalFormData } from '@/components/internal/AppraisalFindingsForm';
import { InstallationsForm, InstallationsFormData, getInitialInstallationsFormData } from '@/components/internal/InstallationsForm';
import { CamperTechForm, CamperTechFormData, getInitialCamperTechFormData } from '@/components/internal/CamperTechForm';
import { GeneralImpressionForm, GeneralImpressionFormData, getInitialGeneralImpressionFormData } from '@/components/internal/GeneralImpressionForm';
import { MoistureAndSafetyForm, MoistureAndSafetyFormData, getInitialMoistureAndSafetyFormData } from '@/components/internal/MoistureAndSafetyForm';
import { PostcodeField } from '@/components/internal/PostcodeField';
import PhotoUploadForm, { PhotoRotations, PhotoTypes } from '@/components/internal/PhotoUploadForm';
import { AutoExtractProvider } from '@/components/internal/AutoExtractContext';
import { useAutoSave } from '@/hooks/useAutoSave';
import { StickyAutoSaveBar } from '@/components/internal/StickyAutoSaveBar';
import { usePageLeaveProtection } from '@/hooks/usePageLeaveProtection';
import { UnsavedChangesDialog } from '@/components/internal/UnsavedChangesDialog';
import {
  WevValueForm,
  WevValueData,
  getInitialWevValueData,
  WevAutotelexDataForm,
  WevAutotelexData,
  getInitialWevAutotelexData,
  WevDocumentUploadForm,
} from '@/components/internal/wev';
import { ReportCompletenessCheck } from '@/components/internal/ReportCompletenessCheck';
import { ReportStatusBar, ReportStatus } from '@/components/internal/ReportStatusBar';
import {
  KlassiekerGeneralImpressionForm,
  KlassiekerImpressionFormData,
  getInitialKlassiekerImpressionFormData,
  KlassiekerValueForm,
  KlassiekerValueData,
  getInitialKlassiekerValueData,
} from '@/components/internal/klassieker';
import { CamperHostImportForm } from '@/components/internal/CamperHostImportForm';
import { CustomerSearchField } from '@/components/internal/CustomerSearchField';
import { SendReportDialog } from '@/components/internal/SendReportDialog';
import { useAppraisers } from '@/hooks/useAppraisers';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';

// Inline sub-component for assigned_to field
const AssignedToField = ({ reportId, saveField, initialValue }: { reportId: string | undefined; saveField: (field: string, value: any) => void; initialValue: string | null }) => {
  const { appraisers, loading } = useAppraisers();
  const [value, setValue] = useState<string>(initialValue || '');

  if (loading) return null;

  return (
    <div className="space-y-2">
      <Label>Toegewezen aan</Label>
      <Select value={value} onValueChange={(v) => { const val = v === '__none' ? '' : v; setValue(val); saveField('assigned_to', val || null); }}>
        <SelectTrigger>
          <SelectValue placeholder="Niet toegewezen" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="__none">Niet toegewezen</SelectItem>
          {appraisers.map((a) => (
            <SelectItem key={a.user_id} value={a.user_id}>
              {a.displayName}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  );
};

const reportSchema = z.object({
  customer_title: z.string().optional(),
  customer_initials: z.string().optional(),
  customer_last_name: z.string().optional(),
  customer_street: z.string().optional(),
  customer_postcode: z.string().optional(),
  customer_city: z.string().optional(),
  customer_email: z.string().optional(),
  customer_phone: z.string().optional(),
  license_plate: z.string().min(1, 'Kenteken is verplicht'),
  vin: z.string().min(1, 'Chassisnummer is verplicht'),
  tellerstand: z.string().min(1, 'Tellerstand is verplicht'),
  inspection_location: z.string().optional(),
  inspection_date: z.string().optional(),
  inspection_start_time: z.string().optional(),
  inspection_end_time: z.string().optional(),
  appraised_value: z.string().optional(),
  appraised_value_text: z.string().optional(),
  quality_class: z.string().optional(),
  general_remarks: z.string().optional(),
});

interface Report {
  id: string;
  report_number: string;
  report_type: string | null;
  document_reference: string | null;
  customer_title: string | null;
  customer_initials: string | null;
  customer_last_name: string | null;
  customer_street: string | null;
  customer_postcode: string | null;
  customer_city: string | null;
  license_plate: string | null;
  vin: string | null;
  vehicle_brand: string | null;
  vehicle_model: string | null;
  inspection_location: string | null;
  inspection_date: string | null;
  inspection_start_time: string | null;
  inspection_end_time: string | null;
  appraised_value: number | null;
  appraised_value_text: string | null;
  quality_class: string | null;
  general_remarks: string | null;
  // RDW fields
  rdw_merk: string | null;
  rdw_handelsbenaming: string | null;
  rdw_voertuigsoort: string | null;
  rdw_carrosserievorm: string | null;
  rdw_bouwjaar: number | null;
  rdw_datum_eerste_toelating: string | null;
  rdw_datum_eerste_tenaamstelling: string | null;
  rdw_datum_laatste_tenaamstelling: string | null;
  rdw_brandstof: string | null;
  rdw_transmissie: string | null;
  rdw_aantal_cilinders: number | null;
  rdw_cilinderinhoud: number | null;
  rdw_vermogen_kw: number | null;
  rdw_aantal_deuren: number | null;
  rdw_wielbasis: number | null;
  rdw_ledig_gewicht: number | null;
  rdw_massa_rijklaar: number | null;
  rdw_max_massa: number | null;
  rdw_apk_gekeurd: boolean | null;
  rdw_apk_vervaldatum: string | null;
  rdw_importvoertuig: boolean | null;
  rdw_data_locked: boolean | null;
  // Taxateur fields
  tellerstand: number | null;
  tellerstand_type: string | null;
  soort_bouw: string | null;
  opbouw_merk: string | null;
  opbouw_type: string | null;
  constructievorm: string | null;
  gebruik: string | null;
  stalling: string | null;
  staat_bij_opname: string | null;
}

const EditReport = () => {
  const { id } = useParams<{ id: string }>();
  const { user } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const { toast } = useToast();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [report, setReport] = useState<Report | null>(null);

  // Customer data
  const [customerData, setCustomerData] = useState({
    opdrachtgever: '',
    customer_title: '',
    customer_initials: '',
    customer_last_name: '',
    customer_street: '',
    customer_postcode: '',
    customer_city: '',
    customer_email: '',
    customer_phone: '',
  });

  // Vehicle data
  const [vehicleData, setVehicleData] = useState<VehicleFormData>(getInitialVehicleFormData());

  // Appraisal findings data
  const [appraisalData, setAppraisalData] = useState<AppraisalFormData>(getInitialAppraisalFormData());
  const [allTiresSame, setAllTiresSame] = useState(false);

  // Installations data (Sectie 13)
  const [installationsData, setInstallationsData] = useState<InstallationsFormData>(getInitialInstallationsFormData());

  // Camper tech + security data (Sectie 14-15)
  const [camperTechData, setCamperTechData] = useState<CamperTechFormData>(getInitialCamperTechFormData());

  // General impression data (Sectie 16) - for camper
  const [impressionData, setImpressionData] = useState<GeneralImpressionFormData>(getInitialGeneralImpressionFormData());

  // Klassieker-specific impression data (with default texts + stalling)
  const [klassiekerImpressionData, setKlassiekerImpressionData] = useState<KlassiekerImpressionFormData>(getInitialKlassiekerImpressionFormData());

  // Klassieker-specific valuation data
  const [klassiekerValueData, setKlassiekerValueData] = useState<KlassiekerValueData>(getInitialKlassiekerValueData());

  // Moisture and safety data (Vocht & Brand/Gas)
  const [moistureData, setMoistureData] = useState<MoistureAndSafetyFormData>(getInitialMoistureAndSafetyFormData());

  // Photo collection
  const [vehiclePhotos, setVehiclePhotos] = useState<string[]>([]);
  const [photoRotations, setPhotoRotations] = useState<PhotoRotations>({});
  const [photoTypes, setPhotoTypes] = useState<PhotoTypes>({});

  // Inspection data
  const [inspectionData, setInspectionData] = useState({
    inspection_location: '',
    inspection_date: '',
    inspection_start_time: '',
    inspection_end_time: '',
  });

  // Valuation data (for camper)
  const [valuationData, setValuationData] = useState({
    appraised_value: '',
    appraised_value_text: '',
    quality_class: '',
    general_remarks: '',
  });

  // WEV valuation data (simplified - single value, no bandwidth)
  const [wevAutotelexData, setWevAutotelexData] = useState<WevAutotelexData>(getInitialWevAutotelexData());
  const [wevValueData, setWevValueData] = useState<WevValueData>(getInitialWevValueData());

  // Report status
  const [reportStatus, setReportStatus] = useState<ReportStatus>('concept');
  const [isFinalizingReport, setIsFinalizingReport] = useState(false);
  const [isSendDialogOpen, setIsSendDialogOpen] = useState(false);

  // Auto-save hook - 10 second interval for better reliability
  const { status: saveStatus, lastSavedAt, hasPendingChanges, saveField, saveMultipleFields, flushSave } = useAutoSave({
    reportId: id,
    debounceMs: 800,
    intervalMs: 10000, // Changed from 20000 to 10000 (10 seconds)
  });

  // Page leave protection
  const { isBlocked, proceed, reset } = usePageLeaveProtection({
    hasUnsavedChanges: hasPendingChanges,
    onBeforeLeave: flushSave,
  });

  // Auto-link customer when returning from Customers page
  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const customerId = params.get('klant');
    if (!customerId) return;
    // Remove param from URL
    window.history.replaceState({}, document.title, location.pathname);
    // Fetch customer and link
    (async () => {
      const { data: c } = await supabase
        .from('customers')
        .select('id, customer_type, company_name, salutation, initials, first_name, last_name, street, house_number, postal_code, city, email, phone')
        .eq('id', customerId)
        .single();
      if (!c) return;
      const newData = {
        opdrachtgever: c.company_name || '',
        customer_title: c.salutation || '',
        customer_initials: c.initials || '',
        customer_last_name: c.last_name,
        customer_street: [c.street, c.house_number].filter(Boolean).join(' '),
        customer_postcode: c.postal_code || '',
        customer_city: c.city || '',
        customer_email: c.email || '',
        customer_phone: c.phone || '',
      };
      setCustomerData(newData);
      // Default inspection location to customer city if not yet set
      if (!inspectionData.inspection_location && c.city) {
        setInspectionData(p => ({ ...p, inspection_location: capitalizeFirst(c.city!) }));
      }
      saveMultipleFields({
        customer_id: c.id,
        opdrachtgever: c.company_name || null,
        customer_title: c.salutation || null,
        customer_initials: c.initials || null,
        customer_last_name: c.last_name || null,
        customer_street: newData.customer_street || null,
        customer_postcode: c.postal_code || null,
        customer_city: c.city || null,
        customer_email: c.email || null,
        customer_phone: c.phone || null,
      });
      toast({ title: 'Klant gekoppeld', description: `${[c.first_name, c.last_name].filter(Boolean).join(' ')} is ingevuld.` });
    })();
  }, [location.search]);

  // Combine all data for completeness check
  const completenessData = useMemo(() => ({
    // Customer data
    ...customerData,
    // Vehicle data
    ...vehicleData,
    license_plate: vehicleData.license_plate,
    vin: vehicleData.vin,
    rdw_merk: vehicleData.rdw_merk,
    rdw_bouwjaar: vehicleData.rdw_bouwjaar,
    tellerstand: vehicleData.tellerstand,
    rdw_data_locked: vehicleData.rdw_data_locked,
    // Inspection data
    ...inspectionData,
    // Valuation data (for camper)
    ...valuationData,
    // Klassieker valuation data
    ...klassiekerValueData,
    // WEV data
    ...wevAutotelexData,
    ...wevValueData,
    // Photos
    vehicle_photos: vehiclePhotos,
    // Status
    status: reportStatus,
  }), [customerData, vehicleData, inspectionData, valuationData, klassiekerValueData, wevAutotelexData, wevValueData, vehiclePhotos, reportStatus]);

  // Rapport afronden: generate PDF, upload to storage, set status gereed
  const handleFinalizeReport = useCallback(async () => {
    if (!id || !report || isFinalizingReport) return;
    setIsFinalizingReport(true);
    try {
      // 1. Flush any pending saves first
      await flushSave();

      // 2. Fetch the latest full report data for PDF generation
      const { data: fullReport, error: fetchError } = await supabase
        .from('reports')
        .select('*')
        .eq('id', id)
        .single();
      if (fetchError || !fullReport) throw new Error('Rapport niet gevonden');

      // 3. Generate PDF blob
      const blob = await pdf(<PdfRenderer report={fullReport as Record<string, unknown>} />).toBlob();

      // 4. Build filename
      const filename = [
        'Taxatierapport',
        fullReport.document_reference || '',
        fullReport.license_plate || '',
      ].filter(Boolean).join('_').replace(/\s+/g, '-') + '.pdf';

      const storagePath = `${id}/${filename}`;

      // 5. Upload to finalized-reports bucket (overwrite if exists)
      const { error: uploadError } = await supabase.storage
        .from('finalized-reports')
        .upload(storagePath, blob, {
          contentType: 'application/pdf',
          upsert: true,
        });
      if (uploadError) throw uploadError;

      // 6. Update status to gereed + set ready_at timestamp
      const { error: updateError } = await supabase
        .from('reports')
        .update({ status: 'gereed', ready_at: new Date().toISOString() })
        .eq('id', id);
      if (updateError) throw updateError;

      setReportStatus('gereed');

      toast({
        title: 'Rapport afgerond',
        description: 'De PDF is gegenereerd en het rapport is gemarkeerd als Gereed.',
      });
    } catch (error) {
      console.error('Error finalizing report:', error);
      toast({
        title: 'Fout bij afronden',
        description: 'Er ging iets mis bij het genereren van de PDF. Probeer het opnieuw.',
        variant: 'destructive',
      });
    } finally {
      setIsFinalizingReport(false);
    }
  }, [id, report, isFinalizingReport, flushSave, toast]);

  useEffect(() => {
    const fetchReport = async () => {
      if (!id) return;

      try {
        const { data, error } = await supabase
          .from('reports')
          .select('*')
          .eq('id', id)
          .single();

        if (error) throw error;
        
        const reportData = data as unknown as Report;
        setReport(reportData);
        setReportStatus((reportData as any).status || 'concept');
        
        // Pre-fill customer data
        setCustomerData({
          opdrachtgever: (reportData as any).opdrachtgever || '',
          customer_title: reportData.customer_title || '',
          customer_initials: reportData.customer_initials || '',
          customer_last_name: reportData.customer_last_name || '',
          customer_street: reportData.customer_street || '',
          customer_postcode: reportData.customer_postcode || '',
          customer_city: reportData.customer_city || '',
          customer_email: (reportData as any).customer_email || '',
          customer_phone: (reportData as any).customer_phone || '',
        });

        // Pre-fill vehicle data
        setVehicleData({
          license_plate: reportData.license_plate || '',
          vin: reportData.vin || '',
          vehicle_title: (reportData as any).vehicle_title || '',
          rdw_merk: reportData.rdw_merk || '',
          rdw_handelsbenaming: reportData.rdw_handelsbenaming || '',
          handelsbenaming_custom: (reportData as any).handelsbenaming_custom || '',
          rdw_voertuigsoort: reportData.rdw_voertuigsoort || '',
          rdw_carrosserievorm: reportData.rdw_carrosserievorm || '',
          rdw_bouwjaar: reportData.rdw_bouwjaar?.toString() || '',
          rdw_datum_eerste_toelating: reportData.rdw_datum_eerste_toelating || '',
          rdw_datum_eerste_tenaamstelling: reportData.rdw_datum_eerste_tenaamstelling || '',
          rdw_datum_laatste_tenaamstelling: reportData.rdw_datum_laatste_tenaamstelling || '',
          rdw_kleur: (reportData as any).rdw_kleur || '',
          kleur_laksoort: (reportData as any).kleur_laksoort || '',
          rdw_brandstof: reportData.rdw_brandstof || '',
          transmissie: (reportData as any).transmissie || '',
          rdw_aantal_cilinders: reportData.rdw_aantal_cilinders?.toString() || '',
          rdw_cilinderinhoud: reportData.rdw_cilinderinhoud?.toString() || '',
          rdw_vermogen_kw: reportData.rdw_vermogen_kw?.toString() || '',
          rdw_aantal_deuren: reportData.rdw_aantal_deuren?.toString() || '',
          rdw_wielbasis: reportData.rdw_wielbasis?.toString() || '',
          rdw_ledig_gewicht: reportData.rdw_ledig_gewicht?.toString() || '',
          rdw_massa_rijklaar: reportData.rdw_massa_rijklaar?.toString() || '',
          rdw_max_massa: reportData.rdw_max_massa?.toString() || '',
          rdw_apk_gekeurd: reportData.rdw_apk_gekeurd?.toString() || '',
          rdw_apk_vervaldatum: reportData.rdw_apk_vervaldatum || '',
          rdw_importvoertuig: reportData.rdw_importvoertuig?.toString() || '',
          tellerstand: reportData.tellerstand?.toString() || '',
          tellerstand_type: reportData.tellerstand_type || 'km',
          soort_bouw: reportData.soort_bouw || '',
          opbouw_merk: reportData.opbouw_merk || '',
          opbouw_type: reportData.opbouw_type || '',
          constructievorm: reportData.constructievorm || '',
          gebruik: reportData.gebruik || '',
          stalling: reportData.stalling || '',
          staat_bij_opname: reportData.staat_bij_opname || '',
          interieur_beschrijving: (reportData as any).interieur_beschrijving || '',
          stuurpositie: (reportData as any).stuurpositie || '',
          rdw_data_locked: reportData.rdw_data_locked || false,
        });

        // Pre-fill inspection data
        setInspectionData({
          inspection_location: reportData.inspection_location || reportData.customer_city || '',
          inspection_date: reportData.inspection_date || '',
          inspection_start_time: reportData.inspection_start_time?.slice(0, 5) || '',
          inspection_end_time: reportData.inspection_end_time?.slice(0, 5) || '',
        });

        // Pre-fill valuation data
        setValuationData({
          appraised_value: reportData.appraised_value?.toString() || '',
          appraised_value_text: reportData.appraised_value_text || '',
          quality_class: reportData.quality_class || '',
          general_remarks: reportData.general_remarks || '',
        });

        // Pre-fill appraisal findings data
        setAppraisalData({
          model_display_name: (reportData as any).model_display_name || '',
          condition_engine: (reportData as any).condition_engine || '',
          condition_engine_notes: (reportData as any).condition_engine_notes || '',
          condition_transmission: (reportData as any).condition_transmission || '',
          condition_transmission_notes: (reportData as any).condition_transmission_notes || '',
          condition_brakes: (reportData as any).condition_brakes || '',
          condition_brakes_notes: (reportData as any).condition_brakes_notes || '',
          condition_suspension: (reportData as any).condition_suspension || '',
          condition_suspension_notes: (reportData as any).condition_suspension_notes || '',
          condition_steering: (reportData as any).condition_steering || '',
          condition_steering_notes: (reportData as any).condition_steering_notes || '',
          condition_electrical: (reportData as any).condition_electrical || '',
          condition_electrical_notes: (reportData as any).condition_electrical_notes || '',
          tire_bandenmaat: (reportData as any).tire_bandenmaat || '',
          tire_bandenmaat_achter: (reportData as any).tire_bandenmaat_achter || '',
          tire_front_left_brand: (reportData as any).tire_front_left_brand || '',
          tire_front_left_model: (reportData as any).tire_front_left_model || '',
          tire_front_left_profiel: (reportData as any).tire_front_left_profiel || '',
          tire_front_left_dot: (reportData as any).tire_front_left_dot || '',
          tire_front_left_season: (reportData as any).tire_front_left_season || '',
          tire_front_left_size: (reportData as any).tire_front_left_size || '',
          tire_front_right_brand: (reportData as any).tire_front_right_brand || '',
          tire_front_right_model: (reportData as any).tire_front_right_model || '',
          tire_front_right_profiel: (reportData as any).tire_front_right_profiel || '',
          tire_front_right_dot: (reportData as any).tire_front_right_dot || '',
          tire_front_right_season: (reportData as any).tire_front_right_season || '',
          tire_front_right_size: (reportData as any).tire_front_right_size || '',
          tire_rear_left_brand: (reportData as any).tire_rear_left_brand || '',
          tire_rear_left_model: (reportData as any).tire_rear_left_model || '',
          tire_rear_left_profiel: (reportData as any).tire_rear_left_profiel || '',
          tire_rear_left_dot: (reportData as any).tire_rear_left_dot || '',
          tire_rear_left_season: (reportData as any).tire_rear_left_season || '',
          tire_rear_left_size: (reportData as any).tire_rear_left_size || '',
          tire_rear_right_brand: (reportData as any).tire_rear_right_brand || '',
          tire_rear_right_model: (reportData as any).tire_rear_right_model || '',
          tire_rear_right_profiel: (reportData as any).tire_rear_right_profiel || '',
          tire_rear_right_dot: (reportData as any).tire_rear_right_dot || '',
          tire_rear_right_season: (reportData as any).tire_rear_right_season || '',
          tire_rear_right_size: (reportData as any).tire_rear_right_size || '',
          rim_type: (reportData as any).rim_type || '',
          tire_advice: (reportData as any).tire_advice || '',
          exterior_body: (reportData as any).exterior_body || '',
          exterior_body_notes: (reportData as any).exterior_body_notes || '',
          exterior_paint: (reportData as any).exterior_paint || '',
          exterior_paint_notes: (reportData as any).exterior_paint_notes || '',
          exterior_rubbers: (reportData as any).exterior_rubbers || '',
          exterior_rubbers_notes: (reportData as any).exterior_rubbers_notes || '',
          exterior_windows: (reportData as any).exterior_windows || '',
          exterior_windows_notes: (reportData as any).exterior_windows_notes || '',
          exterior_sealant: (reportData as any).exterior_sealant || '',
          exterior_sealant_notes: (reportData as any).exterior_sealant_notes || '',
          exterior_chrome: (reportData as any).exterior_chrome || '',
          exterior_chrome_notes: (reportData as any).exterior_chrome_notes || '',
          interior_upholstery: (reportData as any).interior_upholstery || '',
          interior_upholstery_notes: (reportData as any).interior_upholstery_notes || '',
          interior_dashboard: (reportData as any).interior_dashboard || '',
          interior_dashboard_notes: (reportData as any).interior_dashboard_notes || '',
          interior_floor: (reportData as any).interior_floor || '',
          interior_floor_notes: (reportData as any).interior_floor_notes || '',
          interior_roof: (reportData as any).interior_roof || '',
          interior_roof_notes: (reportData as any).interior_roof_notes || '',
          interior_kitchen: (reportData as any).interior_kitchen || '',
          interior_kitchen_notes: (reportData as any).interior_kitchen_notes || '',
          interior_sanitary: (reportData as any).interior_sanitary || '',
          interior_sanitary_notes: (reportData as any).interior_sanitary_notes || '',
        });

        // Pre-fill installations data (Sectie 13)
        setInstallationsData({
          installation_electrical: (reportData as any).installation_electrical || '',
          installation_water: (reportData as any).installation_water || '',
          installation_gas: (reportData as any).installation_gas || '',
          leakage_electrical: (reportData as any).leakage_electrical || '',
        });

        // Pre-fill camper tech + security data (Sectie 14-15)
        setCamperTechData({
          lpg_underbody: (reportData as any).lpg_underbody || false,
          loose_gas_tanks: (reportData as any).loose_gas_tanks || false,
          gas_hose_production_date: (reportData as any).gas_hose_production_date || '',
          pressure_regulator_production_date: (reportData as any).pressure_regulator_production_date || '',
          voltage: (reportData as any).voltage || '',
          earth_leakage_switch: (reportData as any).earth_leakage_switch || false,
          fused: (reportData as any).fused || false,
          onboard_battery: (reportData as any).onboard_battery || false,
          starter_battery: (reportData as any).starter_battery || false,
          security_present: (reportData as any).security_present || false,
          security_type: (reportData as any).security_type || '',
          mechanical_security: (reportData as any).mechanical_security || '',
          vehicle_tracking: (reportData as any).vehicle_tracking || false,
          tracking_brand: (reportData as any).tracking_brand || '',
        });

        // Pre-fill general impression data (Sectie 16) - for camper
        // For klassieker, use defaults if fields are empty (new report)
        const isKlassieker = reportData.report_type === 'klassieker';
        const isWev = reportData.report_type === 'wev';
        const usesKlassiekerImpressions = isKlassieker || isWev;
        const defaultKlassiekerImpressions = getInitialKlassiekerImpressionFormData();
        
        setImpressionData({
          impression_suspension: (reportData as any).impression_suspension || '',
          impression_wheels_tires: (reportData as any).impression_wheels_tires || '',
          impression_steering: (reportData as any).impression_steering || '',
          impression_brakes: (reportData as any).impression_brakes || '',
          impression_engine: (reportData as any).impression_engine || '',
          impression_transmission: (reportData as any).impression_transmission || '',
          impression_electrical: (reportData as any).impression_electrical || '',
          impression_body: (reportData as any).impression_body || '',
          impression_interior: (reportData as any).impression_interior || '',
          impression_general: (reportData as any).impression_general || '',
          impression_extras: (reportData as any).impression_extras || '',
        });

        // Pre-fill klassieker-specific impression data with defaults for new reports
        // Only use defaults if this is a klassieker AND the fields are empty (new report)
        const hasExistingKlassiekerData = (reportData as any).impression_suspension || 
          (reportData as any).impression_wheels_tires || (reportData as any).impression_general;
        const shouldUseDefaults = usesKlassiekerImpressions && !hasExistingKlassiekerData;
        
        setKlassiekerImpressionData({
          impression_suspension: (reportData as any).impression_suspension || 
            (shouldUseDefaults ? defaultKlassiekerImpressions.impression_suspension : ''),
          impression_wheels_tires: (reportData as any).impression_wheels_tires || 
            (shouldUseDefaults ? defaultKlassiekerImpressions.impression_wheels_tires : ''),
          impression_steering: (reportData as any).impression_steering || 
            (shouldUseDefaults ? defaultKlassiekerImpressions.impression_steering : ''),
          impression_brakes: (reportData as any).impression_brakes || 
            (shouldUseDefaults ? defaultKlassiekerImpressions.impression_brakes : ''),
          impression_engine: (reportData as any).impression_engine || 
            (shouldUseDefaults ? defaultKlassiekerImpressions.impression_engine : ''),
          impression_transmission: (reportData as any).impression_transmission || 
            (shouldUseDefaults ? defaultKlassiekerImpressions.impression_transmission : ''),
          impression_electrical: (reportData as any).impression_electrical || 
            (shouldUseDefaults ? defaultKlassiekerImpressions.impression_electrical : ''),
          impression_body: (reportData as any).impression_body || 
            (shouldUseDefaults ? defaultKlassiekerImpressions.impression_body : ''),
          impression_interior: (reportData as any).impression_interior || 
            (shouldUseDefaults ? defaultKlassiekerImpressions.impression_interior : ''),
          impression_general: (reportData as any).impression_general || 
            (shouldUseDefaults ? defaultKlassiekerImpressions.impression_general : ''),
          impression_extras: (reportData as any).impression_extras || '',
          stalling: (reportData as any).stalling || 
            (shouldUseDefaults ? defaultKlassiekerImpressions.stalling : ''),
          stalling_toelichting: (reportData as any).stalling_toelichting || '',
        });

        // Pre-fill klassieker-specific valuation data
        setKlassiekerValueData({
          appraised_value: (reportData as any).appraised_value?.toString() || '',
          appraised_value_text: (reportData as any).appraised_value_text || '',
          quality_class: (reportData as any).quality_class || '',
        });

        // Pre-fill moisture and safety data
        setMoistureData({
          moisture_measurement_performed: (reportData as any).moisture_measurement_performed || false,
          moisture_advice: (reportData as any).moisture_advice || '',
          fire_extinguisher: (reportData as any).fire_extinguisher || false,
          gas_detection: (reportData as any).gas_detection || false,
          smoke_detector: (reportData as any).smoke_detector || false,
        });

        // Pre-fill photos
        setVehiclePhotos((reportData as any).vehicle_photos || []);
        setPhotoRotations((reportData as any).vehicle_photo_rotations || {});
        // photo_types is stored in the photo_types JSON column
        setPhotoTypes((reportData as any).photo_types || {});

        // Pre-fill WEV valuation data (simplified)
        setWevAutotelexData({
          wev_btw_of_marge: (reportData as any).wev_btw_of_marge || '',
          wev_btw_marge_override_motivatie: (reportData as any).wev_btw_marge_override_motivatie || '',
          wev_handelsinkoopwaarde_autotelex: (reportData as any).wev_handelsinkoopwaarde_autotelex?.toString() || '',
          wev_verkoopwaarde_autotelex: (reportData as any).wev_verkoopwaarde_autotelex?.toString() || '',
          wev_autotelex_lookup_timestamp: (reportData as any).wev_autotelex_lookup_timestamp || '',
          wev_bron_waardes: (reportData as any).wev_bron_waardes || 'Autotelex',
          wev_manual_source_note: (reportData as any).wev_manual_source_note || '',
          wev_berekend: (reportData as any).wev_berekend?.toString() || '',
          wev_definitief: (reportData as any).wev_definitief?.toString() || '',
          wev_override_actief: (reportData as any).wev_override_actief || false,
          wev_override_redenering: (reportData as any).wev_override_redenering || '',
          wev_schade_bedrag: (reportData as any).wev_schade_correctie || '',
        });
        setWevValueData({
          wev_eindwaarde: (reportData as any).wev_eindwaarde?.toString() || '',
          wev_eindwaarde_tekst: '',  // Will be auto-generated
        });

      } catch (error) {
        console.error('Error fetching report:', error);
        toast({
          title: 'Fout bij laden',
          description: 'Het rapport kon niet worden geladen.',
          variant: 'destructive',
        });
      } finally {
        setIsLoading(false);
      }
    };

    fetchReport();
  }, [id, toast]);

  const handleCustomerChange = (field: string, value: string) => {
    // Apply normalization based on field
    let normalizedValue = value;
    if (field === 'customer_initials') {
      normalizedValue = normalizeInitials(value);
    } else if (field === 'customer_last_name') {
      normalizedValue = capitalizeFirst(value);
    } else if (field === 'customer_city') {
      normalizedValue = capitalizeFirst(value);
    }
    
    setCustomerData(prev => ({ ...prev, [field]: normalizedValue }));
    saveField(field, normalizedValue || null);
    if (errors[field]) {
      setErrors(prev => {
        const newErrors = { ...prev };
        delete newErrors[field];
        return newErrors;
      });
    }
  };

  const handleVehicleChange = (field: keyof VehicleFormData, value: string | boolean) => {
    setVehicleData(prev => ({ ...prev, [field]: value }));
    // Convert numeric fields
    const numericFields = ['rdw_bouwjaar', 'rdw_aantal_cilinders', 'rdw_cilinderinhoud', 'rdw_vermogen_kw', 'rdw_aantal_deuren', 'rdw_wielbasis', 'rdw_ledig_gewicht', 'rdw_massa_rijklaar', 'rdw_max_massa', 'tellerstand'];
    if (numericFields.includes(field)) {
      saveField(field, value ? parseInt(value as string) : null);
    } else if (field === 'rdw_apk_gekeurd' || field === 'rdw_importvoertuig' || field === 'rdw_data_locked') {
      saveField(field, value === 'true' || value === true);
    } else {
      saveField(field, value || null);
    }
    if (errors[field]) {
      setErrors(prev => {
        const newErrors = { ...prev };
        delete newErrors[field];
        return newErrors;
      });
    }
  };

  const handleInspectionChange = (field: string, value: string) => {
    // Apply normalization for inspection_location
    let normalizedValue = value;
    if (field === 'inspection_location') {
      normalizedValue = capitalizeFirst(value);
    }
    
    setInspectionData(prev => ({ ...prev, [field]: normalizedValue }));
    saveField(field, normalizedValue || null);
  };

  const handleAppraisalChange = (field: keyof AppraisalFormData, value: string) => {
    setAppraisalData(prev => ({ ...prev, [field]: value }));
    saveField(field, value || null);
  };

  const handleAppraisalMultipleChange = (fields: Partial<AppraisalFormData>) => {
    setAppraisalData(prev => ({ ...prev, ...fields }));
    // Save all fields at once
    const fieldsToSave: Record<string, unknown> = {};
    Object.entries(fields).forEach(([key, value]) => {
      fieldsToSave[key] = value || null;
    });
    saveMultipleFields(fieldsToSave);
  };

  const handleInstallationsChange = (field: keyof InstallationsFormData, value: string) => {
    setInstallationsData(prev => ({ ...prev, [field]: value }));
    saveField(field, value || null);
  };

  const handleCamperTechChange = (field: keyof CamperTechFormData, value: string | boolean) => {
    setCamperTechData(prev => ({ ...prev, [field]: value }));
    saveField(field, typeof value === 'boolean' ? value : (value || null));
  };

  const handleImpressionChange = (field: keyof GeneralImpressionFormData, value: string) => {
    setImpressionData(prev => ({ ...prev, [field]: value }));
    saveField(field, value || null);
  };

  // Handler for klassieker impression changes (with stalling field)
  const handleKlassiekerImpressionChange = useCallback((field: keyof KlassiekerImpressionFormData, value: string) => {
    setKlassiekerImpressionData(prev => ({ ...prev, [field]: value }));
    saveField(field, value || null);
  }, [saveField]);

  // Handler for klassieker valuation changes
  const handleKlassiekerValueChange = useCallback((field: keyof KlassiekerValueData, value: string) => {
    setKlassiekerValueData(prev => {
      const updated = { ...prev, [field]: value };
      
      if (field === 'appraised_value') {
        const numValue = parseFloat(value);
        if (!isNaN(numValue) && numValue > 0) {
          updated.appraised_value_text = numberToDutchWords(numValue);
          saveMultipleFields({
            appraised_value: numValue,
            appraised_value_text: updated.appraised_value_text,
          });
        } else {
          updated.appraised_value_text = '';
          saveMultipleFields({
            appraised_value: null,
            appraised_value_text: null,
          });
        }
      } else {
        saveField(field, value || null);
      }
      
      return updated;
    });
  }, [saveField, saveMultipleFields]);

  const handleMoistureChange = (field: keyof MoistureAndSafetyFormData, value: string | boolean) => {
    setMoistureData(prev => ({ ...prev, [field]: value }));
    saveField(field, typeof value === 'boolean' ? value : (value || null));
  };

  const handleValuationChange = (field: string, value: string) => {
    setValuationData(prev => {
      const updated = { ...prev, [field]: value };
      
      if (field === 'appraised_value') {
        const numValue = parseFloat(value);
        if (!isNaN(numValue) && numValue > 0) {
          updated.appraised_value_text = numberToDutchWords(numValue);
          // Save both fields together
          saveMultipleFields({
            appraised_value: numValue,
            appraised_value_text: updated.appraised_value_text,
          });
        } else {
          updated.appraised_value_text = '';
          saveMultipleFields({
            appraised_value: null,
            appraised_value_text: null,
          });
        }
      } else {
        saveField(field, value || null);
      }
      
      return updated;
    });
  };

  // Handle WEV Autotelex changes with autosave
  const handleWevAutotelexChange = useCallback((field: keyof WevAutotelexData, value: string | boolean) => {
    setWevAutotelexData(prev => ({ ...prev, [field]: value }));
    const numericFields = ['wev_handelsinkoopwaarde_autotelex', 'wev_verkoopwaarde_autotelex', 'wev_berekend', 'wev_definitief', 'wev_schade_bedrag'];
    if (numericFields.includes(field as string)) {
      const numValue = parseFloat(value as string);
      saveField(field as string, !isNaN(numValue) ? numValue : null);
    } else if (field === 'wev_override_actief') {
      saveField(field as string, value as boolean);
    } else {
      saveField(field as string, (value as string) || null);
    }
  }, [saveField]);

  // Handle WEV Value changes with autosave
  const handleWevValueChange = useCallback((field: keyof WevValueData, value: string) => {
    setWevValueData(prev => ({ ...prev, [field]: value }));
    if (field === 'wev_eindwaarde') {
      const numValue = parseFloat(value);
      saveField('wev_eindwaarde', !isNaN(numValue) ? numValue : null);
    }
  }, [saveField]);

  const handlePhotosChange = useCallback((photos: string[]) => {
    setVehiclePhotos(photos);
    saveField('vehicle_photos', photos.length > 0 ? photos : null);
  }, [saveField]);

  const handleRotationsChange = useCallback((rotations: PhotoRotations) => {
    setPhotoRotations(rotations);
    saveField('vehicle_photo_rotations', Object.keys(rotations).length > 0 ? rotations : null);
  }, [saveField]);

  const handlePhotoTypesChange = useCallback((types: PhotoTypes) => {
    setPhotoTypes(types);
    saveField('photo_types', Object.keys(types).length > 0 ? types : null);
  }, [saveField]);

  // CamperHost import: map extracted section fields to report state + autosave
  const handleCamperHostImportSection = useCallback((sectionKey: string, fields: Record<string, string>) => {
    const dbFields: Record<string, unknown> = {};

    // Map extracted field keys to state setters and db fields
    const fieldMapping: Record<string, (value: string) => void> = {
      // Voertuig
      license_plate: (v) => setVehicleData(p => ({ ...p, license_plate: v })),
      vin: (v) => setVehicleData(p => ({ ...p, vin: v })),
      rdw_merk: (v) => setVehicleData(p => ({ ...p, rdw_merk: v })),
      rdw_handelsbenaming: (v) => setVehicleData(p => ({ ...p, rdw_handelsbenaming: v })),
      rdw_bouwjaar: (v) => setVehicleData(p => ({ ...p, rdw_bouwjaar: v })),
      rdw_brandstof: (v) => setVehicleData(p => ({ ...p, rdw_brandstof: v })),
      rdw_transmissie: (v) => setVehicleData(p => ({ ...p, rdw_transmissie: v })),
      rdw_kleur: (v) => setVehicleData(p => ({ ...p, rdw_kleur: v })),
      kleur_laksoort: (v) => setVehicleData(p => ({ ...p, kleur_laksoort: v })),
      rdw_carrosserievorm: (v) => setVehicleData(p => ({ ...p, rdw_carrosserievorm: v })),
      rdw_vermogen_kw: (v) => setVehicleData(p => ({ ...p, rdw_vermogen_kw: v })),
      rdw_cilinderinhoud: (v) => setVehicleData(p => ({ ...p, rdw_cilinderinhoud: v })),
      rdw_aantal_cilinders: (v) => setVehicleData(p => ({ ...p, rdw_aantal_cilinders: v })),
      rdw_ledig_gewicht: (v) => setVehicleData(p => ({ ...p, rdw_ledig_gewicht: v })),
      rdw_massa_rijklaar: (v) => setVehicleData(p => ({ ...p, rdw_massa_rijklaar: v })),
      rdw_max_massa: (v) => setVehicleData(p => ({ ...p, rdw_max_massa: v })),
      rdw_wielbasis: (v) => setVehicleData(p => ({ ...p, rdw_wielbasis: v })),
      tellerstand: (v) => setVehicleData(p => ({ ...p, tellerstand: v })),
      transmissie: (v) => setVehicleData(p => ({ ...p, transmissie: v })),
      model_display_name: (v) => setVehicleData(p => ({ ...p, model_display_name: v })),
      vehicle_title: (v) => setVehicleData(p => ({ ...p, vehicle_title: v })),
      rdw_voertuigsoort: (v) => setVehicleData(p => ({ ...p, rdw_voertuigsoort: v })),
      rdw_datum_eerste_toelating: (v) => setVehicleData(p => ({ ...p, rdw_datum_eerste_toelating: v })),
      rdw_datum_eerste_tenaamstelling: (v) => setVehicleData(p => ({ ...p, rdw_datum_eerste_tenaamstelling: v })),

      // Opbouw
      soort_bouw: (v) => setVehicleData(p => ({ ...p, soort_bouw: v })),
      opbouw_merk: (v) => setVehicleData(p => ({ ...p, opbouw_merk: v })),
      opbouw_type: (v) => setVehicleData(p => ({ ...p, opbouw_type: v })),
      constructievorm: (v) => setVehicleData(p => ({ ...p, constructievorm: v })),
      gebruik: (v) => setVehicleData(p => ({ ...p, gebruik: v })),
      stalling: (v) => setVehicleData(p => ({ ...p, stalling: v })),
      staat_bij_opname: (v) => setVehicleData(p => ({ ...p, staat_bij_opname: v })),

      // Klant
      customer_title: (v) => setCustomerData(p => ({ ...p, customer_title: v })),
      customer_initials: (v) => setCustomerData(p => ({ ...p, customer_initials: normalizeInitials(v) })),
      customer_last_name: (v) => setCustomerData(p => ({ ...p, customer_last_name: capitalizeFirst(v) })),
      customer_street: (v) => setCustomerData(p => ({ ...p, customer_street: v })),
      customer_postcode: (v) => setCustomerData(p => ({ ...p, customer_postcode: v })),
      customer_city: (v) => setCustomerData(p => ({ ...p, customer_city: capitalizeFirst(v) })),
      customer_email: (v) => setCustomerData(p => ({ ...p, customer_email: v })),
      customer_phone: (v) => setCustomerData(p => ({ ...p, customer_phone: v })),
      opdrachtgever: (v) => setCustomerData(p => ({ ...p, opdrachtgever: v })),

      // Inspectie
      inspection_date: (v) => setInspectionData(p => ({ ...p, inspection_date: v })),
      inspection_location: (v) => setInspectionData(p => ({ ...p, inspection_location: capitalizeFirst(v) })),
      inspection_start_time: (v) => setInspectionData(p => ({ ...p, inspection_start_time: v })),
      inspection_end_time: (v) => setInspectionData(p => ({ ...p, inspection_end_time: v })),

      // Exterieur
      exterior_paint: (v) => setAppraisalData(p => ({ ...p, exterior_paint: v })),
      exterior_paint_notes: (v) => setAppraisalData(p => ({ ...p, exterior_paint_notes: v })),
      exterior_body: (v) => setAppraisalData(p => ({ ...p, exterior_body: v })),
      exterior_body_notes: (v) => setAppraisalData(p => ({ ...p, exterior_body_notes: v })),
      exterior_rubbers: (v) => setAppraisalData(p => ({ ...p, exterior_rubbers: v })),
      exterior_rubbers_notes: (v) => setAppraisalData(p => ({ ...p, exterior_rubbers_notes: v })),
      exterior_windows: (v) => setAppraisalData(p => ({ ...p, exterior_windows: v })),
      exterior_windows_notes: (v) => setAppraisalData(p => ({ ...p, exterior_windows_notes: v })),
      exterior_sealant: (v) => setAppraisalData(p => ({ ...p, exterior_sealant: v })),
      exterior_sealant_notes: (v) => setAppraisalData(p => ({ ...p, exterior_sealant_notes: v })),
      exterior_chrome: (v) => setAppraisalData(p => ({ ...p, exterior_chrome: v })),
      exterior_chrome_notes: (v) => setAppraisalData(p => ({ ...p, exterior_chrome_notes: v })),

      // Interieur
      interior_upholstery: (v) => setAppraisalData(p => ({ ...p, interior_upholstery: v })),
      interior_upholstery_notes: (v) => setAppraisalData(p => ({ ...p, interior_upholstery_notes: v })),
      interior_dashboard: (v) => setAppraisalData(p => ({ ...p, interior_dashboard: v })),
      interior_dashboard_notes: (v) => setAppraisalData(p => ({ ...p, interior_dashboard_notes: v })),
      interior_floor: (v) => setAppraisalData(p => ({ ...p, interior_floor: v })),
      interior_floor_notes: (v) => setAppraisalData(p => ({ ...p, interior_floor_notes: v })),
      interior_roof: (v) => setAppraisalData(p => ({ ...p, interior_roof: v })),
      interior_roof_notes: (v) => setAppraisalData(p => ({ ...p, interior_roof_notes: v })),
      interior_kitchen: (v) => setAppraisalData(p => ({ ...p, interior_kitchen: v })),
      interior_kitchen_notes: (v) => setAppraisalData(p => ({ ...p, interior_kitchen_notes: v })),
      interior_sanitary: (v) => setAppraisalData(p => ({ ...p, interior_sanitary: v })),
      interior_sanitary_notes: (v) => setAppraisalData(p => ({ ...p, interior_sanitary_notes: v })),

      // Technisch
      condition_engine: (v) => setAppraisalData(p => ({ ...p, condition_engine: v })),
      condition_engine_notes: (v) => setAppraisalData(p => ({ ...p, condition_engine_notes: v })),
      condition_transmission: (v) => setAppraisalData(p => ({ ...p, condition_transmission: v })),
      condition_transmission_notes: (v) => setAppraisalData(p => ({ ...p, condition_transmission_notes: v })),
      condition_brakes: (v) => setAppraisalData(p => ({ ...p, condition_brakes: v })),
      condition_brakes_notes: (v) => setAppraisalData(p => ({ ...p, condition_brakes_notes: v })),
      condition_suspension: (v) => setAppraisalData(p => ({ ...p, condition_suspension: v })),
      condition_suspension_notes: (v) => setAppraisalData(p => ({ ...p, condition_suspension_notes: v })),
      condition_steering: (v) => setAppraisalData(p => ({ ...p, condition_steering: v })),
      condition_steering_notes: (v) => setAppraisalData(p => ({ ...p, condition_steering_notes: v })),
      condition_electrical: (v) => setAppraisalData(p => ({ ...p, condition_electrical: v })),
      condition_electrical_notes: (v) => setAppraisalData(p => ({ ...p, condition_electrical_notes: v })),

      // Installaties
      installation_gas: (v) => setInstallationsData(p => ({ ...p, installation_gas: v })),
      installation_water: (v) => setInstallationsData(p => ({ ...p, installation_water: v })),
      installation_electrical: (v) => setInstallationsData(p => ({ ...p, installation_electrical: v })),
      leakage_electrical: (v) => setInstallationsData(p => ({ ...p, leakage_electrical: v })),
      voltage: (v) => setInstallationsData(p => ({ ...p, voltage: v })),

      // Vocht & veiligheid
      moisture_measurement_performed: (v) => setMoistureData(p => ({ ...p, moisture_measurement_performed: v === 'true' || v === 'ja' })),
      moisture_advice: (v) => setMoistureData(p => ({ ...p, moisture_advice: v })),
      fire_extinguisher: (v) => setCamperTechData(p => ({ ...p, fire_extinguisher: v === 'true' || v === 'ja' })),
      smoke_detector: (v) => setCamperTechData(p => ({ ...p, smoke_detector: v === 'true' || v === 'ja' })),
      gas_detection: (v) => setCamperTechData(p => ({ ...p, gas_detection: v === 'true' || v === 'ja' })),
      gas_hose_production_date: (v) => setCamperTechData(p => ({ ...p, gas_hose_production_date: v })),
      pressure_regulator_production_date: (v) => setCamperTechData(p => ({ ...p, pressure_regulator_production_date: v })),
      earth_leakage_switch: (v) => setCamperTechData(p => ({ ...p, earth_leakage_switch: v === 'true' || v === 'ja' })),
      fused: (v) => setCamperTechData(p => ({ ...p, fused: v === 'true' || v === 'ja' })),
      lpg_underbody: (v) => setCamperTechData(p => ({ ...p, lpg_underbody: v === 'true' || v === 'ja' })),
      loose_gas_tanks: (v) => setCamperTechData(p => ({ ...p, loose_gas_tanks: v === 'true' || v === 'ja' })),
      onboard_battery: (v) => setCamperTechData(p => ({ ...p, onboard_battery: v === 'true' || v === 'ja' })),
      starter_battery: (v) => setCamperTechData(p => ({ ...p, starter_battery: v === 'true' || v === 'ja' })),

      // Banden
      tire_bandenmaat: (v) => setAppraisalData(p => ({ ...p, tire_bandenmaat: v })),
      tire_bandenmaat_achter: (v) => setAppraisalData(p => ({ ...p, tire_bandenmaat_achter: v })),
      rim_type: (v) => setAppraisalData(p => ({ ...p, rim_type: v })),
      tire_front_left_brand: (v) => setAppraisalData(p => ({ ...p, tire_front_left_brand: v })),
      tire_front_left_dot: (v) => setAppraisalData(p => ({ ...p, tire_front_left_dot: v })),
      tire_front_left_profiel: (v) => setAppraisalData(p => ({ ...p, tire_front_left_profiel: v })),
      tire_front_left_season: (v) => setAppraisalData(p => ({ ...p, tire_front_left_season: v })),
      tire_front_right_brand: (v) => setAppraisalData(p => ({ ...p, tire_front_right_brand: v })),
      tire_front_right_dot: (v) => setAppraisalData(p => ({ ...p, tire_front_right_dot: v })),
      tire_front_right_profiel: (v) => setAppraisalData(p => ({ ...p, tire_front_right_profiel: v })),
      tire_front_right_season: (v) => setAppraisalData(p => ({ ...p, tire_front_right_season: v })),
      tire_rear_left_brand: (v) => setAppraisalData(p => ({ ...p, tire_rear_left_brand: v })),
      tire_rear_left_dot: (v) => setAppraisalData(p => ({ ...p, tire_rear_left_dot: v })),
      tire_rear_left_profiel: (v) => setAppraisalData(p => ({ ...p, tire_rear_left_profiel: v })),
      tire_rear_left_season: (v) => setAppraisalData(p => ({ ...p, tire_rear_left_season: v })),
      tire_rear_right_brand: (v) => setAppraisalData(p => ({ ...p, tire_rear_right_brand: v })),
      tire_rear_right_dot: (v) => setAppraisalData(p => ({ ...p, tire_rear_right_dot: v })),
      tire_rear_right_profiel: (v) => setAppraisalData(p => ({ ...p, tire_rear_right_profiel: v })),
      tire_rear_right_season: (v) => setAppraisalData(p => ({ ...p, tire_rear_right_season: v })),
      tire_advice: (v) => setAppraisalData(p => ({ ...p, tire_advice: v })),

      // Algemene indruk
      impression_general: (v) => setImpressionData(p => ({ ...p, impression_general: v })),
      impression_body: (v) => setImpressionData(p => ({ ...p, impression_body: v })),
      impression_interior: (v) => setImpressionData(p => ({ ...p, impression_interior: v })),
      impression_engine: (v) => setImpressionData(p => ({ ...p, impression_engine: v })),
      impression_transmission: (v) => setImpressionData(p => ({ ...p, impression_transmission: v })),
      impression_brakes: (v) => setImpressionData(p => ({ ...p, impression_brakes: v })),
      impression_suspension: (v) => setImpressionData(p => ({ ...p, impression_suspension: v })),
      impression_steering: (v) => setImpressionData(p => ({ ...p, impression_steering: v })),
      impression_electrical: (v) => setImpressionData(p => ({ ...p, impression_electrical: v })),
      impression_wheels_tires: (v) => setImpressionData(p => ({ ...p, impression_wheels_tires: v })),
      impression_extras: (v) => setImpressionData(p => ({ ...p, impression_extras: v })),
      quality_class: (v) => setValuationData(p => ({ ...p, quality_class: v })),
      general_remarks: (v) => setValuationData(p => ({ ...p, general_remarks: v })),

      // Beveiliging
      security_present: (v) => setCamperTechData(p => ({ ...p, security_present: v === 'true' || v === 'ja' })),
      security_type: (v) => setCamperTechData(p => ({ ...p, security_type: v })),
      mechanical_security: (v) => setCamperTechData(p => ({ ...p, mechanical_security: v })),
      vehicle_tracking: (v) => setCamperTechData(p => ({ ...p, vehicle_tracking: v === 'true' || v === 'ja' })),
      tracking_brand: (v) => setCamperTechData(p => ({ ...p, tracking_brand: v })),
    };

    // Numeric fields that need parseInt conversion for DB
    const numericDbFields = new Set([
      'rdw_bouwjaar', 'rdw_aantal_cilinders', 'rdw_cilinderinhoud', 'rdw_vermogen_kw',
      'rdw_aantal_deuren', 'rdw_wielbasis', 'rdw_ledig_gewicht', 'rdw_massa_rijklaar',
      'rdw_max_massa', 'tellerstand',
    ]);

    // Boolean fields for DB
    const booleanDbFields = new Set([
      'moisture_measurement_performed', 'fire_extinguisher', 'smoke_detector', 'gas_detection',
      'earth_leakage_switch', 'fused', 'lpg_underbody', 'loose_gas_tanks',
      'onboard_battery', 'starter_battery', 'security_present', 'vehicle_tracking',
    ]);

    for (const [key, value] of Object.entries(fields)) {
      // Update component state
      const setter = fieldMapping[key];
      if (setter) {
        setter(value);
      }

      // Prepare DB value
      if (numericDbFields.has(key)) {
        const num = parseInt(value);
        dbFields[key] = !isNaN(num) ? num : null;
      } else if (booleanDbFields.has(key)) {
        dbFields[key] = value === 'true' || value === 'ja';
      } else {
        dbFields[key] = value || null;
      }
    }

    // Batch save all fields
    if (Object.keys(dbFields).length > 0) {
      saveMultipleFields(dbFields);
    }
  }, [saveMultipleFields]);

  const handleCamperHostImportAll = useCallback((sections: { key: string; label: string; fields: Record<string, { label: string; value: string }> }[]) => {
    for (const section of sections) {
      const flatFields: Record<string, string> = {};
      for (const [key, field] of Object.entries(section.fields)) {
        flatFields[key] = field.value;
      }
      handleCamperHostImportSection(section.key, flatFields);
    }
  }, [handleCamperHostImportSection]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Flush any pending auto-saves first
    await flushSave();
    
    setErrors({});

    const combinedData = {
      ...customerData,
      ...vehicleData,
      ...inspectionData,
      ...valuationData,
    };

    const normalizedData = normalizeReportFormData({
      ...customerData,
      license_plate: vehicleData.license_plate,
      vin: vehicleData.vin,
      vehicle_brand: vehicleData.rdw_merk,
      vehicle_model: vehicleData.rdw_handelsbenaming,
    });

    const result = reportSchema.safeParse({
      ...combinedData,
      license_plate: normalizedData.license_plate,
    });

    if (!result.success) {
      const fieldErrors: Record<string, string> = {};
      result.error.errors.forEach((err) => {
        if (err.path[0]) {
          fieldErrors[err.path[0] as string] = err.message;
        }
      });
      setErrors(fieldErrors);
      return;
    }

    if (!LICENSE_PLATE_REGEX.test(normalizedData.license_plate)) {
      setErrors({ license_plate: 'Ongeldig kenteken' });
      return;
    }

    // Validate VIN (17 characters)
    const vinValidation = validateVin(vehicleData.vin);
    if (!vinValidation.valid) {
      setErrors({ vin: vinValidation.error! });
      return;
    }

    // Validate email if provided
    const emailValidation = validateEmail(customerData.customer_email);
    if (!emailValidation.valid) {
      setErrors({ customer_email: emailValidation.error! });
      return;
    }

    // Validate phone if provided
    const phoneValidation = validatePhone(customerData.customer_phone);
    if (!phoneValidation.valid) {
      setErrors({ customer_phone: phoneValidation.error! });
      return;
    }

    // Validate quality class only for final submission (camper/klassieker)
    const reportType = report?.report_type;
    const needsQualityClass = reportType === 'camper' || reportType === 'klassieker';
    const qualityClassValue = reportType === 'klassieker' ? klassiekerValueData.quality_class : valuationData.quality_class;
    
    if (needsQualityClass && !qualityClassValue) {
      toast({
        title: 'Kwaliteitsklasse verplicht',
        description: 'Selecteer een kwaliteitsklasse voor het voertuig.',
        variant: 'destructive',
      });
      return;
    }

    setIsSubmitting(true);

    try {
      const updateData = {
        // Customer data
        opdrachtgever: customerData.opdrachtgever || null,
        customer_title: normalizedData.customer_title || null,
        customer_initials: normalizedData.customer_initials || null,
        customer_last_name: normalizedData.customer_last_name || null,
        customer_street: normalizedData.customer_street || null,
        customer_postcode: normalizedData.customer_postcode || null,
        customer_city: normalizedData.customer_city || null,
        customer_email: customerData.customer_email || null,
        customer_phone: customerData.customer_phone || null,
        
        // Vehicle identifiers
        license_plate: normalizedData.license_plate,
        vin: vehicleData.vin || null,
        vehicle_title: vehicleData.vehicle_title || null,
        vehicle_brand: vehicleData.rdw_merk || normalizedData.vehicle_brand || null,
        vehicle_model: vehicleData.rdw_handelsbenaming || normalizedData.vehicle_model || null,
        
        // RDW Sectie 1
        rdw_merk: vehicleData.rdw_merk || null,
        rdw_handelsbenaming: vehicleData.rdw_handelsbenaming || null,
        rdw_voertuigsoort: vehicleData.rdw_voertuigsoort || null,
        rdw_carrosserievorm: vehicleData.rdw_carrosserievorm || null,
        rdw_bouwjaar: vehicleData.rdw_bouwjaar ? parseInt(vehicleData.rdw_bouwjaar) : null,
        rdw_datum_eerste_toelating: vehicleData.rdw_datum_eerste_toelating || null,
        rdw_datum_eerste_tenaamstelling: vehicleData.rdw_datum_eerste_tenaamstelling || null,
        rdw_datum_laatste_tenaamstelling: vehicleData.rdw_datum_laatste_tenaamstelling || null,
        
        // RDW Sectie 2
        rdw_brandstof: vehicleData.rdw_brandstof || null,
        transmissie: vehicleData.transmissie || null,
        rdw_aantal_cilinders: vehicleData.rdw_aantal_cilinders ? parseInt(vehicleData.rdw_aantal_cilinders) : null,
        rdw_cilinderinhoud: vehicleData.rdw_cilinderinhoud ? parseInt(vehicleData.rdw_cilinderinhoud) : null,
        rdw_vermogen_kw: vehicleData.rdw_vermogen_kw ? parseInt(vehicleData.rdw_vermogen_kw) : null,
        rdw_aantal_deuren: vehicleData.rdw_aantal_deuren ? parseInt(vehicleData.rdw_aantal_deuren) : null,
        rdw_wielbasis: vehicleData.rdw_wielbasis ? parseInt(vehicleData.rdw_wielbasis) : null,
        
        // RDW Sectie 3
        rdw_ledig_gewicht: vehicleData.rdw_ledig_gewicht ? parseInt(vehicleData.rdw_ledig_gewicht) : null,
        rdw_massa_rijklaar: vehicleData.rdw_massa_rijklaar ? parseInt(vehicleData.rdw_massa_rijklaar) : null,
        rdw_max_massa: vehicleData.rdw_max_massa ? parseInt(vehicleData.rdw_max_massa) : null,
        
        // RDW Sectie 4
        rdw_apk_gekeurd: vehicleData.rdw_apk_gekeurd === 'true',
        rdw_apk_vervaldatum: vehicleData.rdw_apk_vervaldatum || null,
        rdw_importvoertuig: vehicleData.rdw_importvoertuig === 'true',
        
        // Sectie 5
        tellerstand: vehicleData.tellerstand ? parseInt(vehicleData.tellerstand) : null,
        tellerstand_type: vehicleData.tellerstand_type || 'km',
        
        // Sectie 6
        soort_bouw: vehicleData.soort_bouw || null,
        opbouw_merk: vehicleData.opbouw_merk || null,
        opbouw_type: vehicleData.opbouw_type || null,
        constructievorm: vehicleData.constructievorm || null,
        
        // Sectie 7
        gebruik: vehicleData.gebruik || null,
        stalling: vehicleData.stalling || null,
        staat_bij_opname: vehicleData.staat_bij_opname || null,
        
        // RDW lock status
        rdw_data_locked: vehicleData.rdw_data_locked,
        
        // Model display name (taxateur override)
        model_display_name: appraisalData.model_display_name || null,
        
        // Technische staat
        condition_engine: appraisalData.condition_engine || null,
        condition_engine_notes: appraisalData.condition_engine_notes || null,
        condition_transmission: appraisalData.condition_transmission || null,
        condition_transmission_notes: appraisalData.condition_transmission_notes || null,
        condition_brakes: appraisalData.condition_brakes || null,
        condition_brakes_notes: appraisalData.condition_brakes_notes || null,
        condition_suspension: appraisalData.condition_suspension || null,
        condition_suspension_notes: appraisalData.condition_suspension_notes || null,
        condition_steering: appraisalData.condition_steering || null,
        condition_steering_notes: appraisalData.condition_steering_notes || null,
        condition_electrical: appraisalData.condition_electrical || null,
        condition_electrical_notes: appraisalData.condition_electrical_notes || null,
        
        // Banden
        tire_bandenmaat: appraisalData.tire_bandenmaat || null,
        tire_bandenmaat_achter: appraisalData.tire_bandenmaat_achter || null,
        tire_front_left_brand: appraisalData.tire_front_left_brand || null,
        tire_front_left_model: appraisalData.tire_front_left_model || null,
        tire_front_left_profiel: appraisalData.tire_front_left_profiel || null,
        tire_front_left_dot: appraisalData.tire_front_left_dot || null,
        tire_front_right_brand: appraisalData.tire_front_right_brand || null,
        tire_front_right_model: appraisalData.tire_front_right_model || null,
        tire_front_right_profiel: appraisalData.tire_front_right_profiel || null,
        tire_front_right_dot: appraisalData.tire_front_right_dot || null,
        tire_rear_left_brand: appraisalData.tire_rear_left_brand || null,
        tire_rear_left_model: appraisalData.tire_rear_left_model || null,
        tire_rear_left_profiel: appraisalData.tire_rear_left_profiel || null,
        tire_rear_left_dot: appraisalData.tire_rear_left_dot || null,
        tire_rear_right_brand: appraisalData.tire_rear_right_brand || null,
        tire_rear_right_model: appraisalData.tire_rear_right_model || null,
        tire_rear_right_profiel: appraisalData.tire_rear_right_profiel || null,
        tire_rear_right_dot: appraisalData.tire_rear_right_dot || null,
        rim_type: appraisalData.rim_type || null,
        tire_advice: appraisalData.tire_advice || null,
        
        // Exterieur
        exterior_body: appraisalData.exterior_body || null,
        exterior_body_notes: appraisalData.exterior_body_notes || null,
        exterior_paint: appraisalData.exterior_paint || null,
        exterior_paint_notes: appraisalData.exterior_paint_notes || null,
        exterior_rubbers: appraisalData.exterior_rubbers || null,
        exterior_rubbers_notes: appraisalData.exterior_rubbers_notes || null,
        exterior_windows: appraisalData.exterior_windows || null,
        exterior_windows_notes: appraisalData.exterior_windows_notes || null,
        exterior_sealant: appraisalData.exterior_sealant || null,
        exterior_sealant_notes: appraisalData.exterior_sealant_notes || null,
        exterior_chrome: appraisalData.exterior_chrome || null,
        exterior_chrome_notes: appraisalData.exterior_chrome_notes || null,
        
        // Interieur
        interior_upholstery: appraisalData.interior_upholstery || null,
        interior_upholstery_notes: appraisalData.interior_upholstery_notes || null,
        interior_dashboard: appraisalData.interior_dashboard || null,
        interior_dashboard_notes: appraisalData.interior_dashboard_notes || null,
        interior_floor: appraisalData.interior_floor || null,
        interior_floor_notes: appraisalData.interior_floor_notes || null,
        interior_roof: appraisalData.interior_roof || null,
        interior_roof_notes: appraisalData.interior_roof_notes || null,
        interior_kitchen: appraisalData.interior_kitchen || null,
        interior_kitchen_notes: appraisalData.interior_kitchen_notes || null,
        interior_sanitary: appraisalData.interior_sanitary || null,
        interior_sanitary_notes: appraisalData.interior_sanitary_notes || null,
        
        // Sectie 13: Leidingen & Installaties
        installation_electrical: installationsData.installation_electrical || null,
        installation_water: installationsData.installation_water || null,
        installation_gas: installationsData.installation_gas || null,
        leakage_electrical: installationsData.leakage_electrical || null,
        
        // Sectie 14: Extra's / Campertechniek
        lpg_underbody: camperTechData.lpg_underbody,
        loose_gas_tanks: camperTechData.loose_gas_tanks,
        gas_hose_production_date: camperTechData.gas_hose_production_date || null,
        pressure_regulator_production_date: camperTechData.pressure_regulator_production_date || null,
        voltage: camperTechData.voltage || null,
        earth_leakage_switch: camperTechData.earth_leakage_switch,
        fused: camperTechData.fused,
        onboard_battery: camperTechData.onboard_battery,
        starter_battery: camperTechData.starter_battery,
        
        // Sectie 15: Beveiliging
        security_present: camperTechData.security_present,
        security_type: camperTechData.security_type || null,
        mechanical_security: camperTechData.mechanical_security || null,
        vehicle_tracking: camperTechData.vehicle_tracking,
        tracking_brand: camperTechData.tracking_brand || null,
        
        // Sectie 16: Algemene Indruk
        impression_suspension: impressionData.impression_suspension || null,
        impression_wheels_tires: impressionData.impression_wheels_tires || null,
        impression_steering: impressionData.impression_steering || null,
        impression_brakes: impressionData.impression_brakes || null,
        impression_engine: impressionData.impression_engine || null,
        impression_transmission: impressionData.impression_transmission || null,
        impression_electrical: impressionData.impression_electrical || null,
        impression_body: impressionData.impression_body || null,
        impression_interior: impressionData.impression_interior || null,
        impression_general: impressionData.impression_general || null,
        impression_extras: impressionData.impression_extras || null,
        
        // Vocht (Moisture)
        moisture_measurement_performed: moistureData.moisture_measurement_performed,
        moisture_advice: moistureData.moisture_advice || null,
        
        // Brand & Gas veiligheid
        fire_extinguisher: moistureData.fire_extinguisher,
        gas_detection: moistureData.gas_detection,
        smoke_detector: moistureData.smoke_detector,
        inspection_location: inspectionData.inspection_location || null,
        inspection_date: inspectionData.inspection_date || null,
        inspection_start_time: inspectionData.inspection_start_time || null,
        inspection_end_time: inspectionData.inspection_end_time || null,
        
        // Valuation data - use klassieker-specific data when applicable
        appraised_value: report?.report_type === 'klassieker'
          ? (klassiekerValueData.appraised_value ? parseFloat(klassiekerValueData.appraised_value) : null)
          : (valuationData.appraised_value ? parseFloat(valuationData.appraised_value) : null),
        appraised_value_text: report?.report_type === 'klassieker'
          ? (klassiekerValueData.appraised_value_text || null)
          : (valuationData.appraised_value_text || null),
        quality_class: report?.report_type === 'klassieker'
          ? (klassiekerValueData.quality_class || null)
          : (valuationData.quality_class || null),
        general_remarks: valuationData.general_remarks || null,
        
        // Photos
        vehicle_photos: vehiclePhotos.length > 0 ? vehiclePhotos : null,
        vehicle_photo_rotations: Object.keys(photoRotations).length > 0 ? photoRotations : null,
      };

      const { error } = await supabase
        .from('reports')
        .update(updateData as any)
        .eq('id', id);

      if (error) throw error;

      toast({
        title: 'Rapport bijgewerkt',
        description: 'De wijzigingen zijn succesvol opgeslagen.',
      });

      navigate(`/intern/rapport/${id}`);
    } catch (error) {
      console.error('Error updating report:', error);
      toast({
        title: 'Fout bij opslaan',
        description: 'Er is een fout opgetreden bij het opslaan van de wijzigingen.',
        variant: 'destructive',
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  if (isLoading) {
    return (
      <InternalLayout title="Rapport laden...">
        <div className="flex items-center justify-center py-12">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
        </div>
      </InternalLayout>
    );
  }

  if (!report) {
    return (
      <InternalLayout title="Rapport niet gevonden">
        <div className="text-center py-12">
          <p className="text-muted-foreground mb-4">
            Het opgevraagde rapport kon niet worden gevonden.
          </p>
          <Button onClick={() => navigate('/intern/rapporten')}>
            <ArrowLeft className="h-4 w-4 mr-2" />
            Terug naar rapporten
          </Button>
        </div>
      </InternalLayout>
    );
  }

  return (
    <AutoExtractProvider>
      <InternalLayout title={`Rapport ${report.report_number} Bewerken`}>
        {/* Unsaved changes dialog */}
        <UnsavedChangesDialog
          open={isBlocked}
          onSaveAndLeave={proceed}
          onLeaveWithoutSaving={proceed}
          onStay={reset}
        />

        {/* Sticky AutoSave Bar */}
        <StickyAutoSaveBar
          status={saveStatus}
          lastSavedAt={lastSavedAt}
          hasPendingChanges={hasPendingChanges}
          onSaveNow={() => flushSave()}
        />

        {/* Main content with completeness sidebar */}
        <div className="w-full px-4">
        <div className="flex gap-4 w-full">
          <form onSubmit={handleSubmit} className="space-y-6 flex-1">
            {/* Header with Back Button */}
            <div className="flex items-center">
              <Button 
                type="button" 
                variant="ghost" 
                onClick={() => navigate(`/intern/rapport/${id}`)}
              >
                <ArrowLeft className="h-4 w-4 mr-2" />
                Terug naar rapport
              </Button>
            </div>

            {/* Read-only Report Info — always visible above tabs */}
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Rapportgegevens (alleen-lezen)</CardTitle>
              </CardHeader>
              <CardContent className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label>Rapportnummer</Label>
                  <Input
                    value={report.report_number}
                    disabled
                    className="bg-muted"
                  />
                </div>
                <ReportStatusBar
                  status={reportStatus}
                  onChange={(newStatus) => {
                    setReportStatus(newStatus);
                    saveField('status', newStatus);
                  }}
                />
                <AssignedToField reportId={id} saveField={saveField} initialValue={(report as any).assigned_to || null} />
              </CardContent>
            </Card>

            {/* ============ TAB NAVIGATION ============ */}
            <Tabs defaultValue="algemeen" className="w-full">
              <TabsList className="w-full justify-start bg-transparent border-none rounded-none h-auto p-0 gap-2">
                {['Algemeen', "Foto's", 'Voertuig', 'Staat', 'Waarde'].map((tab) => (
                  <TabsTrigger
                    key={tab}
                    value={tab.toLowerCase().replace("'", '')}
                    className="rounded-[6px] border border-[rgba(201,168,76,0.3)] bg-transparent text-[#7a7870] px-[18px] py-[6px] font-normal shadow-none data-[state=active]:bg-[#C9A84C] data-[state=active]:border-[#C9A84C] data-[state=active]:text-[#0e0e0f] data-[state=active]:font-medium data-[state=active]:shadow-none"
                  >
                    {tab}
                  </TabsTrigger>
                ))}
              </TabsList>

              {/* ========== TAB 1: ALGEMEEN ========== */}
              <TabsContent value="algemeen" className="space-y-6 mt-6">
                {/* Customer Information */}
                <Card id="section-klant">
                  <CardHeader>
                    <CardTitle className="text-lg">Klantgegevens</CardTitle>
                  </CardHeader>
                  <CardContent className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {/* Customer search / link */}
                    <div className="md:col-span-2">
                      <Label className="text-xs text-muted-foreground mb-1.5 block">Bestaande klant koppelen</Label>
                      <CustomerSearchField
                        onSelect={(c) => {
                          const newData = {
                            opdrachtgever: c.company_name || '',
                            customer_title: c.salutation || '',
                            customer_initials: c.initials || '',
                            customer_last_name: c.last_name,
                            customer_street: [c.street, c.house_number].filter(Boolean).join(' '),
                            customer_postcode: c.postal_code || '',
                            customer_city: c.city || '',
                            customer_email: c.email || '',
                            customer_phone: c.phone || '',
                          };
                          setCustomerData(newData);
                          // Default inspection location to customer city if not yet set
                          if (!inspectionData.inspection_location && c.city) {
                            setInspectionData(p => ({ ...p, inspection_location: capitalizeFirst(c.city!) }));
                          }
                          saveMultipleFields({
                            customer_id: c.id,
                            opdrachtgever: c.company_name || null,
                            customer_title: c.salutation || null,
                            customer_initials: c.initials || null,
                            customer_last_name: c.last_name || null,
                            customer_street: newData.customer_street || null,
                            customer_postcode: c.postal_code || null,
                            customer_city: c.city || null,
                            customer_email: c.email || null,
                            customer_phone: c.phone || null,
                          });
                          toast({ title: 'Klant gekoppeld', description: `${[c.first_name, c.last_name].filter(Boolean).join(' ')} is ingevuld.` });
                        }}
                        onNewCustomer={() => {
                          const w = window.open(`/intern/klanten?nieuw=1&rapport=${id}`, '_blank');
                          if (!w) {
                            window.location.href = `/intern/klanten?nieuw=1&rapport=${id}`;
                          }
                        }}
                      />
                    </div>
                    <div className="space-y-2 md:col-span-2">
                      <Label htmlFor="opdrachtgever">Bedrijfsnaam (optioneel)</Label>
                      <Input
                        id="opdrachtgever"
                        value={customerData.opdrachtgever}
                        onChange={(e) => handleCustomerChange('opdrachtgever', e.target.value)}
                        placeholder="bijv. Autoservice Jansen B.V."
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="customer_title">Aanhef</Label>
                      <Select
                        value={customerData.customer_title}
                        onValueChange={(value) => handleCustomerChange('customer_title', value)}
                      >
                        <SelectTrigger>
                          <SelectValue placeholder="Selecteer aanhef" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="Dhr.">Dhr.</SelectItem>
                          <SelectItem value="Mevr.">Mevr.</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="customer_initials">Voorletters</Label>
                        <Input
                          id="customer_initials"
                          value={customerData.customer_initials}
                          onChange={(e) => handleCustomerChange('customer_initials', e.target.value)}
                          placeholder="J.P."
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="customer_last_name">Achternaam</Label>
                        <Input
                          id="customer_last_name"
                          value={customerData.customer_last_name}
                          onChange={(e) => handleCustomerChange('customer_last_name', e.target.value)}
                        />
                      </div>
                    </div>
                    <div className="space-y-2 md:col-span-2">
                      <Label htmlFor="customer_street">Straat en huisnummer</Label>
                      <Input
                        id="customer_street"
                        value={customerData.customer_street}
                        onChange={(e) => handleCustomerChange('customer_street', e.target.value)}
                        placeholder="Hoofdstraat 123"
                      />
                    </div>
                    <PostcodeField
                      postcode={customerData.customer_postcode}
                      city={customerData.customer_city}
                      street={customerData.customer_street}
                      onPostcodeChange={(value) => handleCustomerChange('customer_postcode', value)}
                      onCityChange={(value) => handleCustomerChange('customer_city', value)}
                      onStreetChange={(value) => handleCustomerChange('customer_street', value)}
                    />
                    <div className="space-y-2">
                      <Label htmlFor="customer_email">E-mailadres (intern gebruik)</Label>
                      <Input
                        id="customer_email"
                        type="email"
                        value={customerData.customer_email}
                        onChange={(e) => handleCustomerChange('customer_email', e.target.value)}
                        placeholder="klant@voorbeeld.nl"
                        className={errors.customer_email ? 'border-destructive' : ''}
                      />
                      {errors.customer_email && (
                        <p className="text-sm text-destructive">{errors.customer_email}</p>
                      )}
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="customer_phone">Telefoonnummer (intern gebruik)</Label>
                      <Input
                        id="customer_phone"
                        type="tel"
                        value={customerData.customer_phone}
                        onChange={(e) => handleCustomerChange('customer_phone', e.target.value)}
                        placeholder="0612345678"
                        className={errors.customer_phone ? 'border-destructive' : ''}
                      />
                      {errors.customer_phone && (
                        <p className="text-sm text-destructive">{errors.customer_phone}</p>
                      )}
                    </div>
                    <p className="text-xs text-muted-foreground md:col-span-2">
                      Invoer wordt automatisch netjes opgeslagen. E-mail en telefoon zijn alleen voor intern gebruik en verschijnen niet op het PDF-rapport.
                    </p>
                  </CardContent>
                </Card>

                {/* Inspectiegegevens — KLS */}
                {report.report_type === 'klassieker' && (
                  <Card id="section-inspectie">
                    <CardHeader>
                      <CardTitle className="text-lg">Inspectiegegevens</CardTitle>
                    </CardHeader>
                    <CardContent className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="kls_inspection_date">Datum opname *</Label>
                        <Input id="kls_inspection_date" type="date" value={inspectionData.inspection_date} onChange={(e) => handleInspectionChange('inspection_date', e.target.value)} />
                        {!inspectionData.inspection_date && <p className="text-xs text-destructive">Verplicht veld</p>}
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="kls_inspection_location">Plaats opname *</Label>
                        <Input id="kls_inspection_location" value={inspectionData.inspection_location} onChange={(e) => handleInspectionChange('inspection_location', e.target.value)} placeholder="bijv. Druten" />
                        {!inspectionData.inspection_location && <p className="text-xs text-destructive">Verplicht veld</p>}
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="kls_inspection_start_time">Aanvangstijd *</Label>
                        <Input id="kls_inspection_start_time" type="time" value={inspectionData.inspection_start_time} onChange={(e) => handleInspectionChange('inspection_start_time', e.target.value)} />
                        {!inspectionData.inspection_start_time && <p className="text-xs text-destructive">Verplicht veld</p>}
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="kls_inspection_end_time">Eindtijd *</Label>
                        <Input id="kls_inspection_end_time" type="time" value={inspectionData.inspection_end_time} onChange={(e) => handleInspectionChange('inspection_end_time', e.target.value)} />
                        {!inspectionData.inspection_end_time && <p className="text-xs text-destructive">Verplicht veld</p>}
                      </div>
                    </CardContent>
                  </Card>
                )}

                {/* Inspectiegegevens — CAM */}
                {(report.report_type === 'camper' || !report.report_type) && (
                  <Card id="section-inspectie">
                    <CardHeader>
                      <CardTitle className="text-lg">Inspectiegegevens</CardTitle>
                    </CardHeader>
                    <CardContent className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="space-y-2 md:col-span-2">
                        <Label htmlFor="cam_inspection_location">Inspectielocatie</Label>
                        <Input id="cam_inspection_location" value={inspectionData.inspection_location} onChange={(e) => handleInspectionChange('inspection_location', e.target.value)} />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="cam_inspection_date">Inspectiedatum</Label>
                        <Input id="cam_inspection_date" type="date" value={inspectionData.inspection_date} onChange={(e) => handleInspectionChange('inspection_date', e.target.value)} />
                      </div>
                      <div className="grid grid-cols-2 gap-4">
                        <div className="space-y-2">
                          <Label htmlFor="cam_inspection_start_time">Starttijd</Label>
                          <Input id="cam_inspection_start_time" type="time" value={inspectionData.inspection_start_time} onChange={(e) => handleInspectionChange('inspection_start_time', e.target.value)} />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="cam_inspection_end_time">Eindtijd</Label>
                          <Input id="cam_inspection_end_time" type="time" value={inspectionData.inspection_end_time} onChange={(e) => handleInspectionChange('inspection_end_time', e.target.value)} />
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                )}

                {/* Inspectiegegevens — WEV */}
                {report.report_type === 'wev' && (
                  <Card id="section-inspectie">
                    <CardHeader>
                      <CardTitle className="text-lg">Inspectiegegevens</CardTitle>
                    </CardHeader>
                    <CardContent className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="wev_inspection_date">Datum opname *</Label>
                        <Input id="wev_inspection_date" type="date" value={inspectionData.inspection_date} onChange={(e) => handleInspectionChange('inspection_date', e.target.value)} />
                        {!inspectionData.inspection_date && <p className="text-xs text-destructive">Verplicht veld</p>}
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="wev_inspection_location">Plaats opname *</Label>
                        <Input id="wev_inspection_location" value={inspectionData.inspection_location} onChange={(e) => handleInspectionChange('inspection_location', e.target.value)} placeholder="bijv. Druten" />
                        {!inspectionData.inspection_location && <p className="text-xs text-destructive">Verplicht veld</p>}
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="wev_inspection_start_time">Aanvangstijd *</Label>
                        <Input id="wev_inspection_start_time" type="time" value={inspectionData.inspection_start_time} onChange={(e) => handleInspectionChange('inspection_start_time', e.target.value)} />
                        {!inspectionData.inspection_start_time && <p className="text-xs text-destructive">Verplicht veld</p>}
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="wev_inspection_end_time">Eindtijd *</Label>
                        <Input id="wev_inspection_end_time" type="time" value={inspectionData.inspection_end_time} onChange={(e) => handleInspectionChange('inspection_end_time', e.target.value)} />
                        {!inspectionData.inspection_end_time && <p className="text-xs text-destructive">Verplicht veld</p>}
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="wev_peildatum">Peildatum</Label>
                        <Input id="wev_peildatum" type="date" value={inspectionData.inspection_date} disabled className="bg-muted" />
                        <p className="text-xs text-muted-foreground">Peildatum is gelijk aan datum opname</p>
                      </div>
                    </CardContent>
                  </Card>
                )}

                {/* CamperHost Import — CAM only */}
                {(report.report_type === 'camper' || !report.report_type) && (
                  <CamperHostImportForm
                    reportId={id || ''}
                    onImport={handleCamperHostImportSection}
                    onImportAll={handleCamperHostImportAll}
                  />
                )}
              </TabsContent>

              {/* ========== TAB 2: VOERTUIG ========== */}
              <TabsContent value="voertuig" className="space-y-6 mt-6">
                <div id="section-voertuig">
                  <VehicleInfoForm
                    formData={vehicleData}
                    onChange={handleVehicleChange}
                    errors={errors}
                    isEditMode={true}
                    reportType={report.report_type as 'camper' | 'wev' | 'klassieker' | null}
                    photos={vehiclePhotos}
                    photoTypes={photoTypes}
                    reportId={id}
                  />
                </div>

                {/* WEV/KLS: Model + Banden via AppraisalFindingsForm */}
                {report.report_type === 'wev' && (
                  <AppraisalFindingsForm
                    formData={appraisalData}
                    onChange={handleAppraisalChange}
                    onMultipleChange={handleAppraisalMultipleChange}
                    rdwHandelsbenaming={vehicleData.rdw_handelsbenaming}
                    allTiresSame={allTiresSame}
                    onAllTiresSameChange={setAllTiresSame}
                    reportType="wev"
                    photos={vehiclePhotos}
                    photoTypes={photoTypes}
                    reportId={id}
                    showSections={['model', 'tires']}
                  />
                )}

                {/* KLS: Full AppraisalFindings (includes model, tires) */}
                {report.report_type === 'klassieker' && (
                  <AppraisalFindingsForm
                    formData={appraisalData}
                    onChange={handleAppraisalChange}
                    onMultipleChange={handleAppraisalMultipleChange}
                    rdwHandelsbenaming={vehicleData.rdw_handelsbenaming}
                    allTiresSame={allTiresSame}
                    onAllTiresSameChange={setAllTiresSame}
                    reportType="klassieker"
                    photos={vehiclePhotos}
                    photoTypes={photoTypes}
                    reportId={id}
                  />
                )}

                {/* CAM: Full AppraisalFindings (includes model, tires, opbouw) */}
                {(report.report_type === 'camper' || !report.report_type) && (
                  <AppraisalFindingsForm
                    formData={appraisalData}
                    onChange={handleAppraisalChange}
                    onMultipleChange={handleAppraisalMultipleChange}
                    rdwHandelsbenaming={vehicleData.rdw_handelsbenaming}
                    allTiresSame={allTiresSame}
                    onAllTiresSameChange={setAllTiresSame}
                    reportType={report.report_type as 'camper' | 'wev' | 'klassieker' | null}
                    photos={vehiclePhotos}
                    photoTypes={photoTypes}
                    reportId={id}
                  />
                )}
              </TabsContent>

              {/* ========== TAB 3: STAAT ========== */}
              <TabsContent value="staat" className="space-y-6 mt-6">
                {/* WEV: Technische staat + Exterieur + Interieur */}
                {report.report_type === 'wev' && (
                  <AppraisalFindingsForm
                    formData={appraisalData}
                    onChange={handleAppraisalChange}
                    onMultipleChange={handleAppraisalMultipleChange}
                    rdwHandelsbenaming={vehicleData.rdw_handelsbenaming}
                    allTiresSame={allTiresSame}
                    onAllTiresSameChange={setAllTiresSame}
                    reportType="wev"
                    photos={vehiclePhotos}
                    photoTypes={photoTypes}
                    reportId={id}
                    showSections={['technical', 'exterior', 'interior']}
                  />
                )}

                {/* WEV/KLS: Algemene indruk */}
                {(report.report_type === 'wev' || report.report_type === 'klassieker') && (
                  <div id="section-indruk">
                    <KlassiekerGeneralImpressionForm
                      formData={klassiekerImpressionData}
                      onChange={handleKlassiekerImpressionChange}
                    />
                  </div>
                )}

                {/* CAM: Algemene indruk */}
                {(report.report_type === 'camper' || !report.report_type) && (
                  <div id="section-indruk">
                    <GeneralImpressionForm
                      formData={impressionData}
                      onChange={handleImpressionChange}
                    />
                  </div>
                )}
              </TabsContent>

              {/* ========== TAB 4: FOTO'S ========== */}
              <TabsContent value="fotos" className="space-y-6 mt-6">
                <div id="section-fotos">
                  <PhotoUploadForm
                    photos={vehiclePhotos}
                    rotations={photoRotations}
                    photoTypes={photoTypes}
                    onChange={handlePhotosChange}
                    onRotationsChange={handleRotationsChange}
                    onPhotoTypesChange={handlePhotoTypesChange}
                    reportId={id}
                    reportType={report.report_type as 'camper' | 'wev' | 'klassieker' | null}
                  />
                </div>
              </TabsContent>

              {/* ========== TAB 5: WAARDE ========== */}
              <TabsContent value="waarde" className="space-y-6 mt-6">
                {/* KLS + CAM: Kwaliteitsklasse + Waardevaststelling */}
                {(report.report_type === 'klassieker' || report.report_type === 'camper') && (
                  <div id="section-waarde">
                    <KlassiekerValueForm
                      data={klassiekerValueData}
                      onChange={handleKlassiekerValueChange}
                    />
                  </div>
                )}

                {/* WEV: Taxatiebestanden */}
                {report.report_type === 'wev' && (
                  <WevDocumentUploadForm reportId={id || ''} />
                )}

                {/* WEV: Marktgegevens + Waarde in het Economisch Verkeer */}
                {report.report_type === 'wev' && (
                  <>
                    <WevAutotelexDataForm
                      data={wevAutotelexData}
                      onChange={handleWevAutotelexChange}
                    />
                    <WevValueForm
                      data={wevValueData}
                      onChange={handleWevValueChange}
                    />
                  </>
                )}

                {/* Opmerkingen — alle types */}
                <Card>
                  <CardHeader>
                    <CardTitle className="text-lg">Opmerkingen</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-2">
                      <Label htmlFor="general_remarks">Algemene opmerkingen</Label>
                      <Textarea
                        id="general_remarks"
                        value={valuationData.general_remarks}
                        onChange={(e) => handleValuationChange('general_remarks', e.target.value)}
                        rows={5}
                        placeholder="Voeg hier eventuele opmerkingen toe..."
                      />
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
            </Tabs>

            {/* No manual save button needed — autosave handles all changes */}
          </form>

          {/* Completeness Sidebar - sticky on desktop */}
          <aside className="lg:w-80 lg:flex-shrink-0">
            <div className="lg:sticky lg:top-16 space-y-4">
              <ReportCompletenessCheck
                reportType={report.report_type}
                data={completenessData}
                onMarkGereed={handleFinalizeReport}
                isFinalizingReport={isFinalizingReport}
              />

              {/* Send button when report is gereed */}
              {reportStatus === 'gereed' && (
                <Button
                  type="button"
                  className="w-full"
                  onClick={() => setIsSendDialogOpen(true)}
                >
                  <Send className="h-4 w-4 mr-2" />
                  Rapport verzenden
                </Button>
              )}
            </div>
          </aside>
        </div>
        </div>

        <SendReportDialog
          open={isSendDialogOpen}
          onOpenChange={setIsSendDialogOpen}
          reportId={id!}
          customerEmail={customerData.customer_email}
          vehicleTitle={[vehicleData.rdw_merk, vehicleData.rdw_handelsbenaming].filter(Boolean).join(' ')}
          documentReference={(report as any)?.document_reference || ''}
          onSent={() => setReportStatus('verzonden')}
        />
      </InternalLayout>
    </AutoExtractProvider>
  );
};

export default EditReport;
