import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';

export interface GeneralImpressionFormData {
  impression_suspension: string;
  impression_wheels_tires: string;
  impression_steering: string;
  impression_brakes: string;
  impression_engine: string;
  impression_transmission: string;
  impression_electrical: string;
  impression_body: string;
  impression_interior: string;
  impression_general: string;
  impression_extras: string;
}

interface GeneralImpressionFormProps {
  formData: GeneralImpressionFormData;
  onChange: (field: keyof GeneralImpressionFormData, value: string) => void;
}

export const getInitialGeneralImpressionFormData = (): GeneralImpressionFormData => ({
  impression_suspension: '',
  impression_wheels_tires: '',
  impression_steering: '',
  impression_brakes: '',
  impression_engine: '',
  impression_transmission: '',
  impression_electrical: '',
  impression_body: '',
  impression_interior: '',
  impression_general: '',
  impression_extras: '',
});

const impressionFields = [
  { key: 'impression_suspension', label: 'Wielophanging' },
  { key: 'impression_wheels_tires', label: 'Velgen en banden' },
  { key: 'impression_steering', label: 'Stuurinrichting' },
  { key: 'impression_brakes', label: 'Remmen' },
  { key: 'impression_engine', label: 'Motor' },
  { key: 'impression_transmission', label: 'Versnellingsbak en aandrijving' },
  { key: 'impression_electrical', label: 'Elektrische installatie' },
  { key: 'impression_body', label: 'Carrosserie staat' },
  { key: 'impression_interior', label: 'Interieur' },
  { key: 'impression_general', label: 'Algemene staat' },
  { key: 'impression_extras', label: "Extra's" },
] as const;

export const GeneralImpressionForm = ({
  formData,
  onChange,
}: GeneralImpressionFormProps) => {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-lg">Algemene indruk (PDF-tekst)</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <p className="text-sm text-muted-foreground mb-4">
          Beschrijf per onderdeel de feitelijke bevindingen voor het PDF-rapport.
        </p>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {impressionFields.map((field) => (
            <div key={field.key} className="space-y-2">
              <Label htmlFor={field.key}>{field.label}</Label>
              <Textarea
                id={field.key}
                value={formData[field.key]}
                onChange={(e) => onChange(field.key, e.target.value)}
                rows={2}
                placeholder={`Beschrijf ${field.label.toLowerCase()}...`}
              />
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

export default GeneralImpressionForm;
