import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { TireBrandCombobox } from './TireBrandCombobox';
import { Link2 } from 'lucide-react';
import { cn } from '@/lib/utils';

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
  isLinked?: boolean;
  disabled?: boolean;
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
  isLinked = false,
  disabled = false,
}: TireFieldProps) => {
  return (
    <div className={cn(
      "space-y-2 p-3 border rounded-lg bg-muted/30 relative transition-opacity",
      disabled && "opacity-60"
    )}>
      <div className="flex items-center justify-between">
        <Label className="font-medium">{position}</Label>
        {isLinked && (
          <div className="flex items-center gap-1 text-xs text-muted-foreground">
            <Link2 className="h-3 w-3" />
            <span>Gekoppeld</span>
          </div>
        )}
      </div>
      <div className="grid grid-cols-2 gap-2">
        <div className="space-y-1">
          <Label className="text-xs text-muted-foreground">Merk</Label>
          {disabled ? (
            <Input
              value={brand}
              readOnly
              className="bg-muted cursor-not-allowed"
            />
          ) : (
            <TireBrandCombobox
              value={brand}
              onChange={onBrandChange}
              placeholder="Selecteer merk..."
            />
          )}
        </div>
        <div className="space-y-1">
          <Label className="text-xs text-muted-foreground">Model</Label>
          <Input
            value={model}
            onChange={(e) => onModelChange(e.target.value)}
            placeholder="Bijv. Pilot Sport 4"
            readOnly={disabled}
            className={cn(disabled && "bg-muted cursor-not-allowed")}
          />
        </div>
        <div className="space-y-1">
          <Label className="text-xs text-muted-foreground">Profiel (mm)</Label>
          <Input
            value={profiel}
            onChange={(e) => onProfielChange(e.target.value)}
            placeholder="Optioneel"
            readOnly={disabled}
            className={cn(disabled && "bg-muted cursor-not-allowed")}
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
            readOnly={disabled}
            className={cn(disabled && "bg-muted cursor-not-allowed")}
          />
        </div>
      </div>
    </div>
  );
};

export default TireField;
