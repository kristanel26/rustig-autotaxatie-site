import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';

interface TireFieldProps {
  position: string;
  brand: string;
  dot: string;
  season: string;
  onBrandChange: (value: string) => void;
  onDotChange: (value: string) => void;
  onSeasonChange: (value: string) => void;
}

const seasonOptions = [
  { value: 'zomer', label: 'Zomer' },
  { value: 'winter', label: 'Winter' },
  { value: 'allseason', label: 'All-season' },
];

export const TireField = ({
  position,
  brand,
  dot,
  season,
  onBrandChange,
  onDotChange,
  onSeasonChange,
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
          <Label className="text-xs text-muted-foreground">DOT-code</Label>
          <Input
            value={dot}
            onChange={(e) => onDotChange(e.target.value)}
            placeholder="Bijv. 2523"
          />
        </div>
        <div className="space-y-1">
          <Label className="text-xs text-muted-foreground">Seizoen</Label>
          <Select value={season} onValueChange={onSeasonChange}>
            <SelectTrigger>
              <SelectValue placeholder="Type..." />
            </SelectTrigger>
            <SelectContent>
              {seasonOptions.map((option) => (
                <SelectItem key={option.value} value={option.value}>
                  {option.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </div>
    </div>
  );
};

export default TireField;
