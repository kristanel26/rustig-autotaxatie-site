import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';

export interface KlassiekerImpressionFormData {
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
  stalling: string;
  stalling_toelichting: string;
}

interface KlassiekerGeneralImpressionFormProps {
  formData: KlassiekerImpressionFormData;
  onChange: (field: keyof KlassiekerImpressionFormData, value: string) => void;
}

// Default texts for klassieker reports - editable by taxateur
const defaultKlassiekerImpressionTexts: KlassiekerImpressionFormData = {
  impression_suspension: 'De wielophanging verkeert voor zover waarneembaar in een goede staat. Geen afwijkingen waargenomen.',
  impression_wheels_tires: 'De lichtmetalen velgen/banden set verkeert in een goede staat. Geen afwijkingen of schades waargenomen.',
  impression_steering: 'De stuurinrichting verkeert in een goed onderhouden staat. Geen afwijkingen of schades waargenomen.',
  impression_brakes: 'De reminrichting verkeert voor zover waarneembaar in een goede staat. Geen afwijkingen waargenomen.',
  impression_engine: 'De motor verkeert voor zover waarneembaar in een goed werkende staat.',
  impression_transmission: 'De versnellingsbak en aandrijving verkeren voor zover waarneembaar in een goede staat.',
  impression_electrical: 'De elektrische installatie verkeert voor zover waarneembaar in een goed functionerende staat.',
  impression_body: 'De carrosserie verkeert in een goede staat. Geen bijzonderheden waargenomen.',
  impression_interior: 'Het interieur verkeert in een nette en complete staat. Normale gebruikssporen.',
  impression_general: 'Dit voertuig verkeert in een zeer goede staat en wordt netjes onderhouden.',
  impression_extras: '',
  stalling: '',
  stalling_toelichting: '',
};

export const getInitialKlassiekerImpressionFormData = (): KlassiekerImpressionFormData => ({
  ...defaultKlassiekerImpressionTexts,
});

const impressionFields = [
  { key: 'impression_suspension', label: 'Wielophanging' },
  { key: 'impression_wheels_tires', label: 'Velgen en banden' },
  { key: 'impression_steering', label: 'Stuurinrichting' },
  { key: 'impression_brakes', label: 'Remmen' },
  { key: 'impression_engine', label: 'Motor' },
  { key: 'impression_transmission', label: 'Versnellingsbak en aandrijving' },
  { key: 'impression_electrical', label: 'Elektrische installatie' },
  { key: 'impression_body', label: 'Carrosseriestaat' },
  { key: 'impression_interior', label: 'Interieur' },
  { key: 'impression_general', label: 'Algemene staat' },
  { key: 'impression_extras', label: "Extra's" },
] as const;

export const KlassiekerGeneralImpressionForm = ({
  formData,
  onChange,
}: KlassiekerGeneralImpressionFormProps) => {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-lg">Algemene indruk</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <p className="text-sm text-muted-foreground mb-4">
          Beschrijf per onderdeel de feitelijke bevindingen. De standaardteksten zijn volledig aanpasbaar.
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

          {/* Stalling — select + toelichting */}
          <div className="space-y-2">
            <Label htmlFor="stalling">Stalling</Label>
            <Select
              value={formData.stalling}
              onValueChange={(value) => onChange('stalling', value)}
            >
              <SelectTrigger>
                <SelectValue placeholder="Selecteer stalling..." />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="binnen">Binnen</SelectItem>
                <SelectItem value="buiten">Buiten</SelectItem>
                <SelectItem value="onbekend">Onbekend</SelectItem>
              </SelectContent>
            </Select>
            <Textarea
              id="stalling_toelichting"
              value={formData.stalling_toelichting}
              onChange={(e) => onChange('stalling_toelichting', e.target.value)}
              rows={2}
              placeholder="Eventuele toelichting stalling..."
              className="text-foreground"
            />
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default KlassiekerGeneralImpressionForm;
