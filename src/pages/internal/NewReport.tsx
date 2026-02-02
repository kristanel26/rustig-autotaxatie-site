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

// Format Dutch license plate: remove spaces, uppercase, format as XX-XX-XX
const formatLicensePlate = (value: string): string => {
  // Remove all spaces and hyphens, convert to uppercase
  const cleaned = value.replace(/[\s-]/g, '').toUpperCase();
  
  // If exactly 6 characters, format as XX-XX-XX
  if (cleaned.length === 6) {
    return `${cleaned.slice(0, 2)}-${cleaned.slice(2, 4)}-${cleaned.slice(4, 6)}`;
  }
  
  // Return cleaned value if not 6 characters yet
  return cleaned;
};

const LICENSE_PLATE_REGEX = /^[A-Z0-9]{2}-[A-Z0-9]{2}-[A-Z0-9]{2}$/;

const reportSchema = z.object({
  client_name: z.string().trim().min(1, 'Klantnaam is verplicht'),
  opdrachtgever: z.string().optional(),
  customer_title: z.string().optional(),
  customer_initials: z.string().optional(),
  customer_last_name: z.string().optional(),
  license_plate: z.string()
    .min(1, 'Kenteken is verplicht')
    .regex(LICENSE_PLATE_REGEX, 'Kenteken moet worden opgeslagen als 65-PR-VK'),
  vin: z.string().optional(),
  vehicle_model: z.string().optional(),
  inspection_location: z.string().optional(),
  inspection_date: z.string().optional(),
  inspection_start_time: z.string().optional(),
  inspection_end_time: z.string().optional(),
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

  const [formData, setFormData] = useState({
    client_name: '',
    opdrachtgever: '',
    customer_title: '',
    customer_initials: '',
    customer_last_name: '',
    license_plate: '',
    vin: '',
    vehicle_model: '',
    inspection_location: '',
    inspection_date: '',
    inspection_start_time: '',
    inspection_end_time: '',
    appraised_value: '',
    appraised_value_text: '',
    quality_class: '',
    general_remarks: '',
  });

  const handleChange = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
    if (errors[field]) {
      setErrors((prev) => {
        const newErrors = { ...prev };
        delete newErrors[field];
        return newErrors;
      });
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrors({});

    const result = reportSchema.safeParse(formData);
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

    setIsSubmitting(true);

    try {
      const { error } = await supabase.from('reports').insert([{
        user_id: user!.id,
        client_name: formData.client_name,
        opdrachtgever: formData.opdrachtgever || null,
        customer_title: formData.customer_title || null,
        customer_initials: formData.customer_initials || null,
        customer_last_name: formData.customer_last_name || null,
        license_plate: formData.license_plate || null,
        vin: formData.vin || null,
        vehicle_model: formData.vehicle_model || null,
        inspection_location: formData.inspection_location || null,
        inspection_date: formData.inspection_date || null,
        inspection_start_time: formData.inspection_start_time || null,
        inspection_end_time: formData.inspection_end_time || null,
        appraised_value: formData.appraised_value ? parseFloat(formData.appraised_value) : null,
        appraised_value_text: formData.appraised_value_text || null,
        quality_class: formData.quality_class ? parseInt(formData.quality_class) : null,
        general_remarks: formData.general_remarks || null,
      }] as any);

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
        {/* Basic Information */}
        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Basisgegevens</CardTitle>
          </CardHeader>
          <CardContent className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="client_name">Klantnaam *</Label>
              <Input
                id="client_name"
                value={formData.client_name}
                onChange={(e) => handleChange('client_name', e.target.value)}
                className={errors.client_name ? 'border-destructive' : ''}
              />
              {errors.client_name && (
                <p className="text-sm text-destructive">{errors.client_name}</p>
              )}
            </div>
            <div className="space-y-2">
              <Label htmlFor="opdrachtgever">Opdrachtgever</Label>
              <Input
                id="opdrachtgever"
                value={formData.opdrachtgever}
                onChange={(e) => handleChange('opdrachtgever', e.target.value)}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="customer_title">Aanhef</Label>
              <Select
                value={formData.customer_title}
                onValueChange={(value) => handleChange('customer_title', value)}
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
                  value={formData.customer_initials}
                  onChange={(e) => handleChange('customer_initials', e.target.value)}
                  placeholder="J.P."
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="customer_last_name">Achternaam</Label>
                <Input
                  id="customer_last_name"
                  value={formData.customer_last_name}
                  onChange={(e) => handleChange('customer_last_name', e.target.value)}
                />
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Vehicle Information */}
        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Voertuiggegevens</CardTitle>
          </CardHeader>
          <CardContent className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="vehicle_model">Voertuigmodel</Label>
              <Input
                id="vehicle_model"
                value={formData.vehicle_model}
                onChange={(e) => handleChange('vehicle_model', e.target.value)}
                placeholder="Bijv. Volkswagen Golf"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="license_plate">Kenteken *</Label>
              <Input
                id="license_plate"
                value={formData.license_plate}
                onChange={(e) => {
                  const formatted = formatLicensePlate(e.target.value);
                  handleChange('license_plate', formatted);
                }}
                placeholder="65-PR-VK"
                className={errors.license_plate ? 'border-destructive' : ''}
              />
              {errors.license_plate && (
                <p className="text-sm text-destructive">{errors.license_plate}</p>
              )}
            </div>
            <div className="space-y-2">
              <Label htmlFor="vin">VIN / Chassisnummer</Label>
              <Input
                id="vin"
                value={formData.vin}
                onChange={(e) => handleChange('vin', e.target.value)}
              />
            </div>
          </CardContent>
        </Card>

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
                value={formData.inspection_location}
                onChange={(e) => handleChange('inspection_location', e.target.value)}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="inspection_date">Inspectiedatum</Label>
              <Input
                id="inspection_date"
                type="date"
                value={formData.inspection_date}
                onChange={(e) => handleChange('inspection_date', e.target.value)}
              />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="inspection_start_time">Starttijd</Label>
                <Input
                  id="inspection_start_time"
                  type="time"
                  value={formData.inspection_start_time}
                  onChange={(e) => handleChange('inspection_start_time', e.target.value)}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="inspection_end_time">Eindtijd</Label>
                <Input
                  id="inspection_end_time"
                  type="time"
                  value={formData.inspection_end_time}
                  onChange={(e) => handleChange('inspection_end_time', e.target.value)}
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
                value={formData.appraised_value}
                onChange={(e) => handleChange('appraised_value', e.target.value)}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="appraised_value_text">Waarde in woorden</Label>
              <Input
                id="appraised_value_text"
                value={formData.appraised_value_text}
                onChange={(e) => handleChange('appraised_value_text', e.target.value)}
                placeholder="Bijvoorbeeld: vijfentwintigduizend euro"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="quality_class">Kwaliteitsklasse</Label>
              <Select
                value={formData.quality_class}
                onValueChange={(value) => handleChange('quality_class', value)}
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
                value={formData.general_remarks}
                onChange={(e) => handleChange('general_remarks', e.target.value)}
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
