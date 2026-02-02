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

const reportSchema = z.object({
  client_name: z.string().trim().min(1, 'Klantnaam is verplicht'),
  opdrachtgever: z.string().optional(),
  customer_title: z.string().optional(),
  customer_initials: z.string().optional(),
  customer_last_name: z.string().optional(),
  license_plate: z.string().optional(),
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

interface Report {
  id: string;
  report_number: string;
  document_reference: string | null;
  client_name: string;
  opdrachtgever: string | null;
  customer_title: string | null;
  customer_initials: string | null;
  customer_last_name: string | null;
  license_plate: string | null;
  vin: string | null;
  vehicle_model: string | null;
  inspection_location: string | null;
  inspection_date: string | null;
  inspection_start_time: string | null;
  inspection_end_time: string | null;
  appraised_value: number | null;
  appraised_value_text: string | null;
  quality_class: number | null;
  general_remarks: string | null;
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
        
        const reportData = data as Report;
        setReport(reportData);
        
        // Pre-fill form with existing data
        setFormData({
          client_name: reportData.client_name || '',
          opdrachtgever: reportData.opdrachtgever || '',
          customer_title: reportData.customer_title || '',
          customer_initials: reportData.customer_initials || '',
          customer_last_name: reportData.customer_last_name || '',
          license_plate: reportData.license_plate || '',
          vin: reportData.vin || '',
          vehicle_model: reportData.vehicle_model || '',
          inspection_location: reportData.inspection_location || '',
          inspection_date: reportData.inspection_date || '',
          inspection_start_time: reportData.inspection_start_time?.slice(0, 5) || '',
          inspection_end_time: reportData.inspection_end_time?.slice(0, 5) || '',
          appraised_value: reportData.appraised_value?.toString() || '',
          appraised_value_text: reportData.appraised_value_text || '',
          quality_class: reportData.quality_class?.toString() || '',
          general_remarks: reportData.general_remarks || '',
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
      const { error } = await supabase
        .from('reports')
        .update({
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
        } as any)
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
          <CardContent className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label>Rapportnummer</Label>
              <Input
                value={report.report_number}
                disabled
                className="bg-muted"
              />
            </div>
            <div className="space-y-2">
              <Label>Documentreferentie</Label>
              <Input
                value={report.document_reference || ''}
                disabled
                className="bg-muted"
              />
              <p className="text-xs text-muted-foreground">
                Wordt automatisch bijgewerkt op basis van andere velden
              </p>
            </div>
          </CardContent>
        </Card>

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
              <Label htmlFor="license_plate">Kenteken</Label>
              <Input
                id="license_plate"
                value={formData.license_plate}
                onChange={(e) => handleChange('license_plate', e.target.value)}
                placeholder="XX-XXX-X"
              />
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
