import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { numberToDutchWords } from '@/lib/normalizers';
import { qualityClasses } from '@/lib/qualityClasses';

export interface KlassiekerValueData {
  appraised_value: string;
  appraised_value_text: string;
  quality_class: string;
}

interface KlassiekerValueFormProps {
  data: KlassiekerValueData;
  onChange: (field: keyof KlassiekerValueData, value: string) => void;
}

export const getInitialKlassiekerValueData = (): KlassiekerValueData => ({
  appraised_value: '',
  appraised_value_text: '',
  quality_class: '',
});

export const KlassiekerValueForm = ({ data, onChange }: KlassiekerValueFormProps) => {
  const handleValueChange = (value: string) => {
    onChange('appraised_value', value);
    
    // Auto-generate "waarde in woorden"
    const numValue = parseFloat(value);
    if (!isNaN(numValue) && numValue > 0) {
      onChange('appraised_value_text', numberToDutchWords(numValue));
    } else {
      onChange('appraised_value_text', '');
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-lg">Waardevaststelling</CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        <p className="text-sm text-muted-foreground">
          Vastgestelde vervangingswaarde voor verzekeringsdoeleinden.
        </p>

        {/* Quality Class */}
        <div className="space-y-2">
          <Label htmlFor="quality_class">Kwaliteitsklasse *</Label>
          <Select
            value={data.quality_class}
            onValueChange={(value) => onChange('quality_class', value)}
          >
            <SelectTrigger className={!data.quality_class ? 'border-destructive' : ''}>
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
          {!data.quality_class && (
            <p className="text-xs text-destructive">Kwaliteitsklasse is verplicht</p>
          )}
          {data.quality_class && (
            <p className="text-sm text-muted-foreground mt-2">
              {qualityClasses.find((qc) => qc.value === data.quality_class)?.description}
            </p>
          )}
        </div>

        {/* Value */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label htmlFor="appraised_value">Vervangingswaarde (€) *</Label>
            <Input
              id="appraised_value"
              type="number"
              step="1"
              min="0"
              value={data.appraised_value}
              onChange={(e) => handleValueChange(e.target.value)}
              placeholder="bijv. 45000"
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="appraised_value_text">Waarde in woorden</Label>
            <Input
              id="appraised_value_text"
              value={data.appraised_value_text}
              readOnly
              disabled
              className="bg-muted"
              placeholder="Wordt automatisch ingevuld"
            />
            <p className="text-xs text-muted-foreground">
              Wordt automatisch gegenereerd op basis van het bedrag.
            </p>
          </div>
        </div>

        <p className="text-xs text-muted-foreground border-t pt-4">
          De vervangingswaarde is het bedrag dat nodig is voor het verkrijgen van een naar soort, kwaliteit, staat en ouderdom vergelijkbaar voertuig.
        </p>
      </CardContent>
    </Card>
  );
};

export default KlassiekerValueForm;
