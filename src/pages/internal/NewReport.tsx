import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import InternalLayout from '@/components/internal/InternalLayout';
import { useAuth } from '@/contexts/AuthContext';
import { supabase } from '@/integrations/supabase/client';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { useToast } from '@/hooks/use-toast';
import { z } from 'zod';
import { ArrowLeft } from 'lucide-react';
import { normalizeReportFormData, LICENSE_PLATE_REGEX, numberToDutchWords } from '@/lib/normalizers';
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
import { ReportTypeSelector, ReportType } from '@/components/internal/ReportTypeSelector';
import {
  WevValueForm,
  WevValueData,
  getInitialWevValueData,
  WevAutotelexDataForm,
  WevAutotelexData,
  getInitialWevAutotelexData,
  WevDocumentUploadForm,
} from '@/components/internal/wev';

const reportSchema = z.object({
  // Customer fields
  customer_title: z.string().optional(),
  customer_initials: z.string().optional(),
  customer_last_name: z.string().optional(),
  customer_street: z.string().optional(),
  customer_postcode: z.string().optional(),
  customer_city: z.string().optional(),
  
  customer_email: z.string().optional(),
  customer_phone: z.string().optional(),
  
  // Vehicle identifiers
  license_plate: z.string().min(1, 'Kenteken is verplicht'),
  vin: z.string().min(1, 'Chassisnummer is verplicht'),
  
  // Tellerstand (verplicht)
  tellerstand: z.string().min(1, 'Tellerstand is verplicht'),
  
  // Inspection fields
  inspection_location: z.string().optional(),
  inspection_date: z.string().optional(),
  inspection_start_time: z.string().optional(),
  inspection_end_time: z.string().optional(),
  
  // Valuation fields
  appraised_value: z.string().optional(),
  appraised_value_text: z.string().optional(),
  quality_class: z.string().optional(),
  general_remarks: z.string().optional(),
});

const NewReport = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const { toast } = useToast();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});
  
  // Report type selection (step 1)
  const [reportType, setReportType] = useState<ReportType | null>(null);

  // Customer data
  const [customerData, setCustomerData] = useState({
    customer_title: '',
    customer_initials: '',
    customer_last_name: '',
    customer_street: '',
    customer_postcode: '',
    customer_city: '',
    customer_email: '',
    customer_phone: '',
  });

  // Vehicle data (from VehicleInfoForm)
  const [vehicleData, setVehicleData] = useState<VehicleFormData>(getInitialVehicleFormData());

  // Appraisal findings data
  const [appraisalData, setAppraisalData] = useState<AppraisalFormData>(getInitialAppraisalFormData());
  const [allTiresSame, setAllTiresSame] = useState(false);

  // Installations data (Sectie 13)
  const [installationsData, setInstallationsData] = useState<InstallationsFormData>(getInitialInstallationsFormData());

  // Camper tech + security data (Sectie 14-15)
  const [camperTechData, setCamperTechData] = useState<CamperTechFormData>(getInitialCamperTechFormData());

  // General impression data (Sectie 16)
  const [impressionData, setImpressionData] = useState<GeneralImpressionFormData>(getInitialGeneralImpressionFormData());

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

  // Valuation data
  const [valuationData, setValuationData] = useState({
    appraised_value: '',
    appraised_value_text: '',
    quality_class: '',
    general_remarks: '',
  });

  // WEV valuation data (simplified - single value, no bandwidth)
  const [wevAutotelexData, setWevAutotelexData] = useState<WevAutotelexData>(getInitialWevAutotelexData());
  const [wevValueData, setWevValueData] = useState<WevValueData>(getInitialWevValueData());

  const handleCustomerChange = (field: string, value: string) => {
    setCustomerData(prev => ({ ...prev, [field]: value }));
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
    if (errors[field]) {
      setErrors(prev => {
        const newErrors = { ...prev };
        delete newErrors[field];
        return newErrors;
      });
    }
  };

  const handleInspectionChange = (field: string, value: string) => {
    setInspectionData(prev => ({ ...prev, [field]: value }));
  };

  const handleAppraisalChange = (field: keyof AppraisalFormData, value: string) => {
    setAppraisalData(prev => ({ ...prev, [field]: value }));
  };

  const handleAppraisalMultipleChange = (fields: Partial<AppraisalFormData>) => {
    setAppraisalData(prev => ({ ...prev, ...fields }));
  };

  const handleInstallationsChange = (field: keyof InstallationsFormData, value: string) => {
    setInstallationsData(prev => ({ ...prev, [field]: value }));
  };

  const handleCamperTechChange = (field: keyof CamperTechFormData, value: string | boolean) => {
    setCamperTechData(prev => ({ ...prev, [field]: value }));
  };

  const handleImpressionChange = (field: keyof GeneralImpressionFormData, value: string) => {
    setImpressionData(prev => ({ ...prev, [field]: value }));
  };

  const handleMoistureChange = (field: keyof MoistureAndSafetyFormData, value: string | boolean) => {
    setMoistureData(prev => ({ ...prev, [field]: value }));
  };

  const handleWevAutotelexChange = (field: keyof WevAutotelexData, value: string | boolean) => {
    setWevAutotelexData(prev => ({ ...prev, [field]: value }));
  };

  const handleWevValueChange = (field: keyof WevValueData, value: string) => {
    setWevValueData(prev => ({ ...prev, [field]: value }));
  };

  const handleValuationChange = (field: string, value: string) => {
    setValuationData(prev => {
      const updated = { ...prev, [field]: value };
      
      // Auto-generate "waarde in woorden" when appraised_value changes
      if (field === 'appraised_value') {
        const numValue = parseFloat(value);
        if (!isNaN(numValue) && numValue > 0) {
          updated.appraised_value_text = numberToDutchWords(numValue);
        } else {
          updated.appraised_value_text = '';
        }
      }
      
      return updated;
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrors({});

    // Combine all data for validation
    const combinedData = {
      ...customerData,
      ...vehicleData,
      ...inspectionData,
      ...valuationData,
    };

    // Normalize customer fields
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

    // Validate normalized license plate format
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

    // Validate quality class (mandatory for camper, optional for WEV)
    if (reportType === 'camper' && !valuationData.quality_class) {
      toast({
        title: 'Kwaliteitsklasse verplicht',
        description: 'Selecteer een kwaliteitsklasse voor het voertuig.',
        variant: 'destructive',
      });
      return;
    }

    // Validate WEV-specific fields (simplified - only eindwaarde required)
    if (reportType === 'wev') {
      if (!wevValueData.wev_eindwaarde) {
        toast({
          title: 'Eindwaarde verplicht',
          description: 'Vul de WEV-eindwaarde in.',
          variant: 'destructive',
        });
        return;
      }
    }

    setIsSubmitting(true);

    try {
      const insertData = {
        user_id: user!.id,
        report_type: reportType,
        
        // Customer data
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
        
        // RDW Sectie 1: Identificatie
        rdw_merk: vehicleData.rdw_merk || null,
        rdw_handelsbenaming: vehicleData.rdw_handelsbenaming || null,
        rdw_voertuigsoort: vehicleData.rdw_voertuigsoort || null,
        rdw_carrosserievorm: vehicleData.rdw_carrosserievorm || null,
        rdw_bouwjaar: vehicleData.rdw_bouwjaar ? parseInt(vehicleData.rdw_bouwjaar) : null,
        rdw_datum_eerste_toelating: vehicleData.rdw_datum_eerste_toelating || null,
        rdw_datum_eerste_tenaamstelling: vehicleData.rdw_datum_eerste_tenaamstelling || null,
        rdw_datum_laatste_tenaamstelling: vehicleData.rdw_datum_laatste_tenaamstelling || null,
        
        // RDW Sectie 2: Technische gegevens
        rdw_brandstof: vehicleData.rdw_brandstof || null,
        transmissie: vehicleData.transmissie || null,
        rdw_aantal_cilinders: vehicleData.rdw_aantal_cilinders ? parseInt(vehicleData.rdw_aantal_cilinders) : null,
        rdw_cilinderinhoud: vehicleData.rdw_cilinderinhoud ? parseInt(vehicleData.rdw_cilinderinhoud) : null,
        rdw_vermogen_kw: vehicleData.rdw_vermogen_kw ? parseInt(vehicleData.rdw_vermogen_kw) : null,
        rdw_aantal_deuren: vehicleData.rdw_aantal_deuren ? parseInt(vehicleData.rdw_aantal_deuren) : null,
        rdw_wielbasis: vehicleData.rdw_wielbasis ? parseInt(vehicleData.rdw_wielbasis) : null,
        
        // RDW Sectie 3: Massa/gewichten
        rdw_ledig_gewicht: vehicleData.rdw_ledig_gewicht ? parseInt(vehicleData.rdw_ledig_gewicht) : null,
        rdw_massa_rijklaar: vehicleData.rdw_massa_rijklaar ? parseInt(vehicleData.rdw_massa_rijklaar) : null,
        rdw_max_massa: vehicleData.rdw_max_massa ? parseInt(vehicleData.rdw_max_massa) : null,
        
        // RDW Sectie 4: Keuring/status
        rdw_apk_gekeurd: vehicleData.rdw_apk_gekeurd === 'true',
        rdw_apk_vervaldatum: vehicleData.rdw_apk_vervaldatum || null,
        rdw_importvoertuig: vehicleData.rdw_importvoertuig === 'true',
        
        // Sectie 5: Tellerstand (Taxateur)
        tellerstand: vehicleData.tellerstand ? parseInt(vehicleData.tellerstand) : null,
        tellerstand_type: vehicleData.tellerstand_type || 'km',
        
        // Sectie 6: Opbouw/constructie (Taxateur) - only for camper
        ...(reportType === 'camper' ? {
          soort_bouw: vehicleData.soort_bouw || null,
          opbouw_merk: vehicleData.opbouw_merk || null,
          opbouw_type: vehicleData.opbouw_type || null,
          constructievorm: vehicleData.constructievorm || null,
        } : {}),
        
        // Sectie 7: Gebruik/stalling (Taxateur)
        gebruik: vehicleData.gebruik || null,
        stalling: vehicleData.stalling || null,
        staat_bij_opname: vehicleData.staat_bij_opname || null,
        
        // RDW lock status
        rdw_data_locked: vehicleData.rdw_data_locked,
        rdw_fetched_at: vehicleData.rdw_data_locked ? new Date().toISOString() : null,
        
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
        
        // Interieur
        interior_upholstery: appraisalData.interior_upholstery || null,
        interior_upholstery_notes: appraisalData.interior_upholstery_notes || null,
        interior_dashboard: appraisalData.interior_dashboard || null,
        interior_dashboard_notes: appraisalData.interior_dashboard_notes || null,
        interior_floor: appraisalData.interior_floor || null,
        interior_floor_notes: appraisalData.interior_floor_notes || null,
        interior_roof: appraisalData.interior_roof || null,
        interior_roof_notes: appraisalData.interior_roof_notes || null,
        ...(reportType === 'camper' ? {
          interior_kitchen: appraisalData.interior_kitchen || null,
          interior_kitchen_notes: appraisalData.interior_kitchen_notes || null,
          interior_sanitary: appraisalData.interior_sanitary || null,
          interior_sanitary_notes: appraisalData.interior_sanitary_notes || null,
        } : {}),
        
        // Sectie 13: Leidingen & Installaties (only for camper)
        ...(reportType === 'camper' ? {
          installation_electrical: installationsData.installation_electrical || null,
          installation_water: installationsData.installation_water || null,
          installation_gas: installationsData.installation_gas || null,
          leakage_electrical: installationsData.leakage_electrical || null,
        } : {}),
        
        // Sectie 14: Extra's / Campertechniek (only for camper)
        ...(reportType === 'camper' ? {
          lpg_underbody: camperTechData.lpg_underbody,
          loose_gas_tanks: camperTechData.loose_gas_tanks,
          gas_hose_production_date: camperTechData.gas_hose_production_date || null,
          pressure_regulator_production_date: camperTechData.pressure_regulator_production_date || null,
          voltage: camperTechData.voltage || null,
          earth_leakage_switch: camperTechData.earth_leakage_switch,
          fused: camperTechData.fused,
          onboard_battery: camperTechData.onboard_battery,
          starter_battery: camperTechData.starter_battery,
        } : {}),
        
        // Sectie 15: Beveiliging
        security_present: camperTechData.security_present,
        security_type: camperTechData.security_type || null,
        mechanical_security: camperTechData.mechanical_security || null,
        vehicle_tracking: camperTechData.vehicle_tracking,
        tracking_brand: camperTechData.tracking_brand || null,
        
        // Vocht (Moisture) - only for camper
        ...(reportType === 'camper' ? {
          moisture_measurement_performed: moistureData.moisture_measurement_performed,
          moisture_advice: moistureData.moisture_advice || null,
          fire_extinguisher: moistureData.fire_extinguisher,
          gas_detection: moistureData.gas_detection,
          smoke_detector: moistureData.smoke_detector,
        } : {}),
        
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
        
        // Inspection data
        inspection_location: inspectionData.inspection_location || null,
        inspection_date: inspectionData.inspection_date || null,
        inspection_start_time: inspectionData.inspection_start_time || null,
        inspection_end_time: inspectionData.inspection_end_time || null,
        
        // Valuation data (only for camper)
        ...(reportType === 'camper' ? {
          appraised_value: valuationData.appraised_value ? parseFloat(valuationData.appraised_value) : null,
          appraised_value_text: valuationData.appraised_value_text || null,
          quality_class: valuationData.quality_class || null,
        } : {}),
        general_remarks: valuationData.general_remarks || null,
        
        // WEV valuation data (simplified - only for wev)
        ...(reportType === 'wev' ? {
          // Autotelex/market data
          wev_btw_of_marge: wevAutotelexData.wev_btw_of_marge || null,
          wev_btw_marge_override_motivatie: wevAutotelexData.wev_btw_marge_override_motivatie || null,
          wev_handelsinkoopwaarde_autotelex: wevAutotelexData.wev_handelsinkoopwaarde_autotelex ? parseFloat(wevAutotelexData.wev_handelsinkoopwaarde_autotelex) : null,
          wev_verkoopwaarde_autotelex: wevAutotelexData.wev_verkoopwaarde_autotelex ? parseFloat(wevAutotelexData.wev_verkoopwaarde_autotelex) : null,
          wev_bron_waardes: wevAutotelexData.wev_bron_waardes || 'Autotelex',
          wev_manual_source_note: wevAutotelexData.wev_manual_source_note || null,
          wev_berekend: wevAutotelexData.wev_berekend ? parseFloat(wevAutotelexData.wev_berekend) : null,
          wev_definitief: wevAutotelexData.wev_definitief ? parseFloat(wevAutotelexData.wev_definitief) : null,
          wev_override_actief: wevAutotelexData.wev_override_actief,
          wev_override_redenering: wevAutotelexData.wev_override_redenering || null,
          // Final WEV value (single value, no bandwidth)
          wev_eindwaarde: wevValueData.wev_eindwaarde ? parseFloat(wevValueData.wev_eindwaarde) : null,
        } : {}),
        
        // Photos
        vehicle_photos: vehiclePhotos.length > 0 ? vehiclePhotos : null,
        vehicle_photo_rotations: Object.keys(photoRotations).length > 0 ? photoRotations : null,
      };

      const { error } = await supabase.from('reports').insert([insertData] as any);

      if (error) throw error;

      toast({
        title: 'Rapport aangemaakt',
        description: 'Het rapport is succesvol opgeslagen.',
      });

      navigate('/intern/rapporten');
    } catch (error) {
      console.error('Error creating report:', error);
      toast({
        title: 'Fout bij opslaan',
        description: 'Er is een fout opgetreden bij het opslaan van het rapport.',
        variant: 'destructive',
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  // Helper to determine if we're showing camper-specific sections
  const isCamperReport = reportType === 'camper';
  const isWevReport = reportType === 'wev';

  // If no report type selected, show the selector
  if (!reportType) {
    return (
      <InternalLayout title="Nieuwe Taxatie">
        <ReportTypeSelector onSelect={setReportType} />
      </InternalLayout>
    );
  }

  return (
    <InternalLayout title={reportType === 'camper' ? 'Nieuwe Campertaxatie' : 'Nieuwe WEV-taxatie'}>
      <div className="mb-4">
        <Button 
          variant="ghost" 
          size="sm" 
          onClick={() => setReportType(null)}
          className="flex items-center gap-2"
        >
          <ArrowLeft className="h-4 w-4" />
          Ander rapporttype kiezen
        </Button>
      </div>
      
      <form onSubmit={handleSubmit} className="space-y-6 max-w-4xl">
        {/* Customer Information */}
        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Klantgegevens</CardTitle>
          </CardHeader>
          <CardContent className="grid grid-cols-1 md:grid-cols-2 gap-4">
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

        {/* Vehicle Information - 7 Secties */}
        <VehicleInfoForm
          formData={vehicleData}
          onChange={handleVehicleChange}
          errors={errors}
          reportType={reportType}
          photos={vehiclePhotos}
          photoTypes={photoTypes}
        />

        {/* WEV: Inspectiegegevens direct na voertuig (kantoorvoorbereiding) */}
        {isWevReport && (
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Inspectiegegevens</CardTitle>
            </CardHeader>
            <CardContent className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2 md:col-span-2">
                <Label htmlFor="inspection_location">Plaats opname *</Label>
                <Input
                  id="inspection_location"
                  value={inspectionData.inspection_location}
                  onChange={(e) => handleInspectionChange('inspection_location', e.target.value)}
                  placeholder="bijv. Druten"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="inspection_date">Datum opname *</Label>
                <Input
                  id="inspection_date"
                  type="date"
                  value={inspectionData.inspection_date}
                  onChange={(e) => handleInspectionChange('inspection_date', e.target.value)}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="wev_peildatum">Peildatum</Label>
                <Input
                  id="wev_peildatum"
                  type="date"
                  value={inspectionData.inspection_date}
                  disabled
                  className="bg-muted"
                />
                <p className="text-xs text-muted-foreground">
                  Peildatum is gelijk aan datum opname
                </p>
              </div>
            </CardContent>
          </Card>
        )}

        {/* WEV: Fotocollectie vóór technische staat */}
        {isWevReport && (
          <PhotoUploadForm
            photos={vehiclePhotos}
            rotations={photoRotations}
            photoTypes={photoTypes}
            onChange={setVehiclePhotos}
            onRotationsChange={setPhotoRotations}
            onPhotoTypesChange={setPhotoTypes}
          />
        )}

        {/* WEV: Taxatiebestanden vóór technische staat */}
        {isWevReport && (
          <WevDocumentUploadForm reportId="" />
        )}

        {/* Appraisal Findings - Taxateursecties */}
        <AppraisalFindingsForm
          formData={appraisalData}
          onChange={handleAppraisalChange}
          onMultipleChange={handleAppraisalMultipleChange}
          rdwHandelsbenaming={vehicleData.rdw_handelsbenaming}
          allTiresSame={allTiresSame}
          onAllTiresSameChange={setAllTiresSame}
          reportType={reportType}
          photos={vehiclePhotos}
          photoTypes={photoTypes}
        />

        {/* Sectie 13: Leidingen & Installaties - only for camper */}
        {isCamperReport && (
          <InstallationsForm
            formData={installationsData}
            onChange={handleInstallationsChange}
          />
        )}

        {/* Sectie 14-15: Campertechniek & Beveiliging - only for camper */}
        {isCamperReport && (
          <CamperTechForm
            formData={camperTechData}
            onChange={handleCamperTechChange}
          />
        )}

        {/* Sectie 16: Algemene Indruk */}
        <GeneralImpressionForm
          formData={impressionData}
          onChange={handleImpressionChange}
        />

        {/* Vocht & Brand/Gas veiligheid - only for camper */}
        {isCamperReport && (
          <MoistureAndSafetyForm
            formData={moistureData}
            onChange={handleMoistureChange}
          />
        )}

        {/* Fotocollectie - only for camper (WEV has it earlier) */}
        {isCamperReport && (
          <PhotoUploadForm
            photos={vehiclePhotos}
            rotations={photoRotations}
            photoTypes={photoTypes}
            onChange={setVehiclePhotos}
            onRotationsChange={setPhotoRotations}
            onPhotoTypesChange={setPhotoTypes}
          />
        )}

        {/* Camper: Inspection Details */}
        {isCamperReport && (
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Inspectiegegevens</CardTitle>
            </CardHeader>
            <CardContent className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2 md:col-span-2">
                <Label htmlFor="inspection_location">Inspectielocatie</Label>
                <Input
                  id="inspection_location"
                  value={inspectionData.inspection_location}
                  onChange={(e) => handleInspectionChange('inspection_location', e.target.value)}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="inspection_date">Inspectiedatum</Label>
                <Input
                  id="inspection_date"
                  type="date"
                  value={inspectionData.inspection_date}
                  onChange={(e) => handleInspectionChange('inspection_date', e.target.value)}
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="inspection_start_time">Starttijd</Label>
                  <Input
                    id="inspection_start_time"
                    type="time"
                    value={inspectionData.inspection_start_time}
                    onChange={(e) => handleInspectionChange('inspection_start_time', e.target.value)}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="inspection_end_time">Eindtijd</Label>
                  <Input
                    id="inspection_end_time"
                    type="time"
                    value={inspectionData.inspection_end_time}
                    onChange={(e) => handleInspectionChange('inspection_end_time', e.target.value)}
                  />
                </div>
              </div>
            </CardContent>
          </Card>
        )}

        {/* Valuation - only for camper */}
        {isCamperReport && (
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Waardebepaling</CardTitle>
            </CardHeader>
            <CardContent className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="appraised_value">Getaxeerde waarde (€)</Label>
                <Input
                  id="appraised_value"
                  type="number"
                  step="0.01"
                  value={valuationData.appraised_value}
                  onChange={(e) => handleValuationChange('appraised_value', e.target.value)}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="appraised_value_text">Waarde in woorden</Label>
                <Input
                  id="appraised_value_text"
                  value={valuationData.appraised_value_text}
                  readOnly
                  disabled
                  className="bg-muted"
                  placeholder="Wordt automatisch ingevuld"
                />
                <p className="text-xs text-muted-foreground">
                  Wordt automatisch gegenereerd.
                </p>
              </div>
              <div className="space-y-2 md:col-span-2">
                <Label htmlFor="quality_class">Kwaliteitsklasse *</Label>
                <Select
                  value={valuationData.quality_class}
                  onValueChange={(value) => handleValuationChange('quality_class', value)}
                >
                  <SelectTrigger className={!valuationData.quality_class ? 'border-destructive' : ''}>
                    <SelectValue placeholder="Selecteer kwaliteitsklasse..." />
                  </SelectTrigger>
                  <SelectContent>
                    {qualityClasses.map((qc) => (
                      <SelectItem key={qc.value} value={qc.value}>
                        {qc.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                {!valuationData.quality_class && (
                  <p className="text-xs text-destructive">Kwaliteitsklasse is verplicht</p>
                )}
                {valuationData.quality_class && (
                  <p className="text-sm text-muted-foreground mt-2">
                    {qualityClasses.find((qc) => qc.value === valuationData.quality_class)?.description}
                  </p>
                )}
              </div>
            </CardContent>
          </Card>
        )}

        {/* WEV Valuation - marktgegevens + eindwaarde */}
        {isWevReport && (
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

        {/* Remarks */}
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

        {/* Actions */}
        <div className="flex gap-3">
          <Button type="submit" disabled={isSubmitting}>
            {isSubmitting ? 'Opslaan...' : 'Rapport Opslaan'}
          </Button>
          <Button
            type="button"
            variant="outline"
            onClick={() => navigate('/intern/rapporten')}
          >
            Annuleren
          </Button>
        </div>
      </form>
    </InternalLayout>
  );
};

export default NewReport;
