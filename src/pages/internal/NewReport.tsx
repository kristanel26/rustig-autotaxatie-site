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
import { normalizeReportFormData, LICENSE_PLATE_REGEX, numberToDutchWords } from '@/lib/normalizers';
import { VehicleInfoForm, VehicleFormData, getInitialVehicleFormData } from '@/components/internal/VehicleInfoForm';

const reportSchema = z.object({
  // Customer fields
  customer_title: z.string().optional(),
  customer_initials: z.string().optional(),
  customer_last_name: z.string().optional(),
  customer_street: z.string().optional(),
  customer_postcode: z.string().optional(),
  customer_city: z.string().optional(),
  
  // Vehicle identifiers
  license_plate: z.string().min(1, 'Kenteken is verplicht'),
  vin: z.string().min(4, 'VIN moet minimaal 4 tekens bevatten'),
  
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

  // Customer data
  const [customerData, setCustomerData] = useState({
    customer_title: '',
    customer_initials: '',
    customer_last_name: '',
    customer_street: '',
    customer_postcode: '',
    customer_city: '',
  });

  // Vehicle data (from VehicleInfoForm)
  const [vehicleData, setVehicleData] = useState<VehicleFormData>(getInitialVehicleFormData());

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

    setIsSubmitting(true);

    try {
      const insertData = {
        user_id: user!.id,
        
        // Customer data
        customer_title: normalizedData.customer_title || null,
        customer_initials: normalizedData.customer_initials || null,
        customer_last_name: normalizedData.customer_last_name || null,
        customer_street: normalizedData.customer_street || null,
        customer_postcode: normalizedData.customer_postcode || null,
        customer_city: normalizedData.customer_city || null,
        
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
        
        // Sectie 6: Opbouw/constructie (Taxateur)
        soort_bouw: vehicleData.soort_bouw || null,
        opbouw_merk: vehicleData.opbouw_merk || null,
        opbouw_type: vehicleData.opbouw_type || null,
        constructievorm: vehicleData.constructievorm || null,
        
        // Sectie 7: Gebruik/stalling (Taxateur)
        gebruik: vehicleData.gebruik || null,
        stalling: vehicleData.stalling || null,
        staat_bij_opname: vehicleData.staat_bij_opname || null,
        
        // RDW lock status
        rdw_data_locked: vehicleData.rdw_data_locked,
        rdw_fetched_at: vehicleData.rdw_data_locked ? new Date().toISOString() : null,
        
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

  return (
    <InternalLayout title="Nieuw Rapport">
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
            <div className="space-y-2">
              <Label htmlFor="customer_postcode">Postcode</Label>
              <Input
                id="customer_postcode"
                value={customerData.customer_postcode}
                onChange={(e) => handleCustomerChange('customer_postcode', e.target.value)}
                placeholder="1234 AB"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="customer_city">Plaats</Label>
              <Input
                id="customer_city"
                value={customerData.customer_city}
                onChange={(e) => handleCustomerChange('customer_city', e.target.value)}
                placeholder="Amsterdam"
              />
            </div>
            <p className="text-xs text-muted-foreground md:col-span-2">
              Invoer wordt automatisch netjes opgeslagen.
            </p>
          </CardContent>
        </Card>

        {/* Vehicle Information - 7 Secties */}
        <VehicleInfoForm
          formData={vehicleData}
          onChange={handleVehicleChange}
          errors={errors}
          isEditMode={false}
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
              <p className="text-xs text-muted-foreground">
                Wordt automatisch gegenereerd.
              </p>
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
