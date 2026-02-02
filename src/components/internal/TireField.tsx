import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';

interface TireFieldProps {
  position: string;
  brand: string;
  size: string;
  dot: string;
  onBrandChange: (value: string) => void;
  onSizeChange: (value: string) => void;
  onDotChange: (value: string) => void;
  dotError?: string;
}

/**
 * Validates DOT code: exactly 4 digits required
 */
export const validateDotCode = (dot: string): boolean => {
  return /^\d{4}$/.test(dot);
};

export const TireField = ({
  position,
  brand,
  size,
  dot,
  onBrandChange,
  onSizeChange,
  onDotChange,
  dotError,
}: TireFieldProps) => {
  return (
    <div className="space-y-2 p-3 border rounded-lg bg-muted/30">
      <Label className="font-medium">{position}</Label>
      <div className="grid grid-cols-3 gap-2">
        <div className="space-y-1">
          <Label className="text-xs text-muted-foreground">Merk</Label>
          <Input
            value={brand}
            onChange={(e) => onBrandChange(e.target.value)}
            placeholder="Bijv. Michelin"
          />
        </div>
        <div className="space-y-1">
          <Label className="text-xs text-muted-foreground">Bandenmaat</Label>
          <Input
            value={size}
            onChange={(e) => onSizeChange(e.target.value)}
            placeholder="Bijv. 225/75 R16"
          />
        </div>
        <div className="space-y-1">
          <Label className="text-xs text-muted-foreground">DOT-code *</Label>
          <Input
            value={dot}
            onChange={(e) => {
              // Only allow digits, max 4
              const filtered = e.target.value.replace(/\D/g, '').slice(0, 4);
              onDotChange(filtered);
            }}
            placeholder="4 cijfers"
            maxLength={4}
            className={dotError ? 'border-destructive' : ''}
          />
          {dotError && (
            <p className="text-xs text-destructive">{dotError}</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default TireField;
