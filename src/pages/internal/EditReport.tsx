import { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
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
import { validateVin, validateDotCode, validateEmail, validatePhone } from '@/lib/validators';
import { VehicleInfoForm, VehicleFormData, getInitialVehicleFormData } from '@/components/internal/VehicleInfoForm';
import { AppraisalFindingsForm, AppraisalFormData, getInitialAppraisalFormData } from '@/components/internal/AppraisalFindingsForm';
import { PostcodeField } from '@/components/internal/PostcodeField';

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
  quality_class: number | null;
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
  const { toast } = useToast();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [report, setReport] = useState<Report | null>(null);

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

  // Vehicle data
  const [vehicleData, setVehicleData] = useState<VehicleFormData>(getInitialVehicleFormData());

  // Appraisal findings data
  const [appraisalData, setAppraisalData] = useState<AppraisalFormData>(getInitialAppraisalFormData());

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
        
        // Pre-fill customer data
        setCustomerData({
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
          rdw_voertuigsoort: reportData.rdw_voertuigsoort || '',
          rdw_carrosserievorm: reportData.rdw_carrosserievorm || '',
          rdw_bouwjaar: reportData.rdw_bouwjaar?.toString() || '',
          rdw_datum_eerste_toelating: reportData.rdw_datum_eerste_toelating || '',
          rdw_datum_eerste_tenaamstelling: reportData.rdw_datum_eerste_tenaamstelling || '',
          rdw_datum_laatste_tenaamstelling: reportData.rdw_datum_laatste_tenaamstelling || '',
          rdw_kleur: (reportData as any).rdw_kleur || '',
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
          rdw_data_locked: reportData.rdw_data_locked || false,
        });

        // Pre-fill inspection data
        setInspectionData({
          inspection_location: reportData.inspection_location || '',
          inspection_date: reportData.inspection_date || '',
          inspection_start_time: reportData.inspection_start_time?.slice(0, 5) || '',
          inspection_end_time: reportData.inspection_end_time?.slice(0, 5) || '',
        });

        // Pre-fill valuation data
        setValuationData({
          appraised_value: reportData.appraised_value?.toString() || '',
          appraised_value_text: reportData.appraised_value_text || '',
          quality_class: reportData.quality_class?.toString() || '',
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
          tire_front_left_brand: (reportData as any).tire_front_left_brand || '',
          tire_front_left_size: (reportData as any).tire_front_left_size || '',
          tire_front_left_dot: (reportData as any).tire_front_left_dot || '',
          tire_front_right_brand: (reportData as any).tire_front_right_brand || '',
          tire_front_right_size: (reportData as any).tire_front_right_size || '',
          tire_front_right_dot: (reportData as any).tire_front_right_dot || '',
          tire_rear_left_brand: (reportData as any).tire_rear_left_brand || '',
          tire_rear_left_size: (reportData as any).tire_rear_left_size || '',
          tire_rear_left_dot: (reportData as any).tire_rear_left_dot || '',
          tire_rear_right_brand: (reportData as any).tire_rear_right_brand || '',
          tire_rear_right_size: (reportData as any).tire_rear_right_size || '',
          tire_rear_right_dot: (reportData as any).tire_rear_right_dot || '',
          rim_type: (reportData as any).rim_type || '',
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

  const handleValuationChange = (field: string, value: string) => {
    setValuationData(prev => {
      const updated = { ...prev, [field]: value };
      
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

    // Validate DOT codes (all 4 tires must have valid 4-digit DOT)
    const tireFields = [
      { field: 'tire_front_left_dot', label: 'Linker voorband' },
      { field: 'tire_front_right_dot', label: 'Rechter voorband' },
      { field: 'tire_rear_left_dot', label: 'Linker achterband' },
      { field: 'tire_rear_right_dot', label: 'Rechter achterband' },
    ];
    const tireErrors: Record<string, string> = {};
    for (const tire of tireFields) {
      const dotValue = appraisalData[tire.field as keyof AppraisalFormData];
      const dotValidation = validateDotCode(dotValue);
      if (!dotValidation.valid) {
        tireErrors[tire.field] = dotValidation.error!;
      }
    }
    if (Object.keys(tireErrors).length > 0) {
      setErrors(tireErrors);
      toast({
        title: 'DOT-codes ongeldig',
        description: 'Elke band moet een DOT-code van exact 4 cijfers hebben.',
        variant: 'destructive',
      });
      return;
    }

    // Validate rim type (mandatory)
    if (!appraisalData.rim_type) {
      toast({
        title: 'Type velg verplicht',
        description: 'Selecteer een type velg (Staalvelgen of Lichtmetalen velgen).',
        variant: 'destructive',
      });
      return;
    }

    setIsSubmitting(true);

    try {
      const updateData = {
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
        tire_front_left_brand: appraisalData.tire_front_left_brand || null,
        tire_front_left_size: appraisalData.tire_front_left_size || null,
        tire_front_left_dot: appraisalData.tire_front_left_dot || null,
        tire_front_right_brand: appraisalData.tire_front_right_brand || null,
        tire_front_right_size: appraisalData.tire_front_right_size || null,
        tire_front_right_dot: appraisalData.tire_front_right_dot || null,
        tire_rear_left_brand: appraisalData.tire_rear_left_brand || null,
        tire_rear_left_size: appraisalData.tire_rear_left_size || null,
        tire_rear_left_dot: appraisalData.tire_rear_left_dot || null,
        tire_rear_right_brand: appraisalData.tire_rear_right_brand || null,
        tire_rear_right_size: appraisalData.tire_rear_right_size || null,
        tire_rear_right_dot: appraisalData.tire_rear_right_dot || null,
        rim_type: appraisalData.rim_type || null,
        
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
        interior_kitchen: appraisalData.interior_kitchen || null,
        interior_kitchen_notes: appraisalData.interior_kitchen_notes || null,
        interior_sanitary: appraisalData.interior_sanitary || null,
        interior_sanitary_notes: appraisalData.interior_sanitary_notes || null,
        
        // Inspection data
        inspection_location: inspectionData.inspection_location || null,
        inspection_date: inspectionData.inspection_date || null,
        inspection_start_time: inspectionData.inspection_start_time || null,
        inspection_end_time: inspectionData.inspection_end_time || null,
        
        // Valuation data
        appraised_value: valuationData.appraised_value ? parseFloat(valuationData.appraised_value) : null,
        appraised_value_text: valuationData.appraised_value_text || null,
        quality_class: valuationData.quality_class ? parseInt(valuationData.quality_class) : null,
        general_remarks: valuationData.general_remarks || null,
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
    <InternalLayout title={`Rapport ${report.report_number} Bewerken`}>
      <form onSubmit={handleSubmit} className="space-y-6 max-w-4xl">
        {/* Back Button */}
        <Button 
          type="button" 
          variant="ghost" 
          onClick={() => navigate(`/intern/rapport/${id}`)}
        >
          <ArrowLeft className="h-4 w-4 mr-2" />
          Terug naar rapport
        </Button>

        {/* Read-only Report Info */}
        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Rapportgegevens (alleen-lezen)</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              <Label>Rapportnummer</Label>
              <Input
                value={report.report_number}
                disabled
                className="bg-muted"
              />
            </div>
          </CardContent>
        </Card>

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
          isEditMode={true}
        />

        {/* Appraisal Findings - Taxateursecties */}
        <AppraisalFindingsForm
          formData={appraisalData}
          onChange={handleAppraisalChange}
          rdwHandelsbenaming={vehicleData.rdw_handelsbenaming}
          tireErrors={errors}
        />

        {/* Inspection Details */}
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

        {/* Valuation */}
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
            </div>
            <div className="space-y-2">
              <Label htmlFor="quality_class">Kwaliteitsklasse</Label>
              <Select
                value={valuationData.quality_class}
                onValueChange={(value) => handleValuationChange('quality_class', value)}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Selecteer klasse" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="1">1 - Uitstekend</SelectItem>
                  <SelectItem value="2">2 - Goed</SelectItem>
                  <SelectItem value="3">3 - Gemiddeld</SelectItem>
                  <SelectItem value="4">4 - Matig</SelectItem>
                  <SelectItem value="5">5 - Slecht</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </CardContent>
        </Card>

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
            {isSubmitting ? 'Opslaan...' : 'Wijzigingen Opslaan'}
          </Button>
          <Button
            type="button"
            variant="outline"
            onClick={() => navigate(`/intern/rapport/${id}`)}
          >
            Annuleren
          </Button>
        </div>
      </form>
    </InternalLayout>
  );
};

export default EditReport;
