import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { TireBrandCombobox } from './TireBrandCombobox';

interface TireFieldProps {
  position: string;
  brand: string;
  model: string;
  profiel: string;
  dot: string;
  onBrandChange: (value: string) => void;
  onModelChange: (value: string) => void;
  onProfielChange: (value: string) => void;
  onDotChange: (value: string) => void;
}

export const TireField = ({
  position,
  brand,
  model,
  profiel,
  dot,
  onBrandChange,
  onModelChange,
  onProfielChange,
  onDotChange,
}: TireFieldProps) => {
  return (
    <div className="space-y-2 p-3 border rounded-lg bg-muted/30">
      <Label className="font-medium">{position}</Label>
      <div className="grid grid-cols-2 gap-2">
        <div className="space-y-1">
          <Label className="text-xs text-muted-foreground">Merk</Label>
          <TireBrandCombobox
            value={brand}
            onChange={onBrandChange}
            placeholder="Selecteer merk..."
          />
        </div>
        <div className="space-y-1">
          <Label className="text-xs text-muted-foreground">Model</Label>
          <Input
            value={model}
            onChange={(e) => onModelChange(e.target.value)}
            placeholder="Bijv. Pilot Sport 4"
          />
        </div>
        <div className="space-y-1">
          <Label className="text-xs text-muted-foreground">Profiel (mm)</Label>
          <Input
            value={profiel}
            onChange={(e) => onProfielChange(e.target.value)}
            placeholder="Optioneel"
          />
        </div>
        <div className="space-y-1">
          <Label className="text-xs text-muted-foreground">DOT-code</Label>
          <Input
            value={dot}
            onChange={(e) => {
              // Only allow digits, max 4
              const filtered = e.target.value.replace(/\D/g, '').slice(0, 4);
              onDotChange(filtered);
            }}
            placeholder="4 cijfers"
            maxLength={4}
          />
        </div>
      </div>
    </div>
  );
};

export default TireField;
