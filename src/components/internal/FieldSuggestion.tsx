import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Check, X, Sparkles } from 'lucide-react';
import { useAutoExtract, PendingSuggestion } from './AutoExtractContext';

interface FieldSuggestionProps {
  fieldKey: string;
  onAccept: (value: string) => void;
}

export function FieldSuggestion({ fieldKey, onAccept }: FieldSuggestionProps) {
  const { pendingSuggestions, acceptSuggestion, dismissSuggestion } = useAutoExtract();
  
  const suggestion = pendingSuggestions[fieldKey];
  if (!suggestion) return null;

  const handleAccept = () => {
    const value = acceptSuggestion(fieldKey);
    if (value) {
      onAccept(value);
    }
  };

  const confidenceColor = suggestion.confidence >= 80 
    ? 'bg-green-100 text-green-800 border-green-200'
    : 'bg-yellow-100 text-yellow-800 border-yellow-200';

  return (
    <div className="flex items-center gap-2 mt-1 p-2 bg-muted/50 rounded-md border border-dashed border-primary/30">
      <Sparkles className="h-3.5 w-3.5 text-primary flex-shrink-0" />
      <code className="text-sm font-mono flex-1 break-all">{suggestion.proposedValue}</code>
      <Badge variant="outline" className={`text-xs ${confidenceColor}`}>
        {suggestion.confidence}%
      </Badge>
      <Button
        type="button"
        size="sm"
        variant="default"
        className="h-6 px-2 text-xs gap-1"
        onClick={handleAccept}
      >
        <Check className="h-3 w-3" />
        Overnemen
      </Button>
      <Button
        type="button"
        size="sm"
        variant="ghost"
        className="h-6 px-1.5"
        onClick={() => dismissSuggestion(fieldKey)}
      >
        <X className="h-3 w-3" />
      </Button>
    </div>
  );
}

// Wrapper for tire-specific suggestions (maps tire position to field key)
interface TireFieldSuggestionProps {
  position: 'front_left' | 'front_right' | 'rear_left' | 'rear_right';
  fieldType: 'size' | 'dot' | 'brand' | 'profiel';
  onAccept: (value: string) => void;
}

export function TireFieldSuggestion({ position, fieldType, onAccept }: TireFieldSuggestionProps) {
  // Map position and field type to the extraction field key
  // The AI returns generic tire_size, tire_dot - we apply to the specific position
  const fieldKeyMap: Record<string, string> = {
    size: 'tire_size',
    dot: 'tire_dot',
  };
  
  const fieldKey = fieldKeyMap[fieldType];
  if (!fieldKey) return null;
  
  return <FieldSuggestion fieldKey={fieldKey} onAccept={onAccept} />;
}
