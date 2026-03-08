import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';

interface ConditionFieldProps {
  id: string;
  label: string;
  conditionValue: string;
  notesValue: string;
  onConditionChange: (value: string) => void;
  onNotesChange: (value: string) => void;
  placeholder?: string;
}

const conditionOptions = [
  { value: 'goed', label: 'Goed' },
  { value: 'redelijk', label: 'Redelijk' },
  { value: 'voldoende', label: 'Voldoende' },
  { value: 'matig', label: 'Matig' },
  { value: 'slecht', label: 'Slecht' },
];

export const ConditionField = ({
  id,
  label,
  conditionValue,
  notesValue,
  onConditionChange,
  onNotesChange,
  placeholder = 'Opmerkingen...',
}: ConditionFieldProps) => {
  return (
    <div className="space-y-2">
      <Label htmlFor={id}>{label}</Label>
      <div className="flex gap-2">
        <Select value={conditionValue} onValueChange={onConditionChange}>
          <SelectTrigger className="w-[140px]">
            <SelectValue placeholder="Conditie..." />
          </SelectTrigger>
          <SelectContent>
            {conditionOptions.map((option) => (
              <SelectItem key={option.value} value={option.value}>
                {option.label}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
        <Textarea
          id={`${id}_notes`}
          value={notesValue}
          onChange={(e) => onNotesChange(e.target.value)}
          placeholder={placeholder}
          rows={1}
          className="flex-1 min-h-[40px]"
        />
      </div>
    </div>
  );
};

export default ConditionField;
