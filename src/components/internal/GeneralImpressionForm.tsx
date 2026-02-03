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

// Default texts for new reports - editable by taxateur
const defaultImpressionTexts: GeneralImpressionFormData = {
  impression_suspension: 'De wielophanging verkeert voor zover waarneembaar in een goede staat. Geen afwijkingen waargenomen.',
  impression_wheels_tires: 'De stalen velgen/banden set verkeert in een goede staat. Geen afwijkingen/schades waargenomen. Banden zijn nieuw.',
  impression_steering: 'De stuurinrichting verkeert in een redelijk onderhouden staat. Geen afwijkingen/schades waargenomen.',
  impression_brakes: 'De reminrichting verkeert voor zover waarneembaar in een redelijk onderhouden staat. Geen afwijkingen/schades waargenomen.',
  impression_engine: 'De motor verkeert voor zover waarneembaar in een goed werkende staat. Geen afwijkingen/schades waargenomen.',
  impression_transmission: 'De handgeschakelde versnellingsbak en de aandrijving verkeren voor zover waarneembaar in een goede staat. Geen afwijkingen/schades waargenomen.',
  impression_electrical: 'De elektrische installatie verkeert voor zover waarneembaar in een goed functionerende staat. Alles functioneert naar behoren.',
  impression_body: 'De carrosserie verkeert in een nette staat. Geen bijzonderheden, afwijkingen of schades waargenomen.',
  impression_interior: 'Het interieur van de passagiersruimte verkeert in een nette en complete staat. Woon- en slaapgedeelte verkeert in een nette staat.',
  impression_general: 'Dit voertuig verkeert in een nette / goede staat.',
  impression_extras: 'N.v.t.',
};

export const getInitialGeneralImpressionFormData = (): GeneralImpressionFormData => ({
  ...defaultImpressionTexts,
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
                rows={3}
                placeholder={`Beschrijf ${field.label.toLowerCase()}...`}
                className="text-foreground"
              />
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

export default GeneralImpressionForm;
