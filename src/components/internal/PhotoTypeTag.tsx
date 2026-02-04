import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Tag, Loader2 } from 'lucide-react';
import { 
  PhotoType, 
  ReportType, 
  getPhotoTypesForReport, 
  getPhotoTypeLabel,
} from './photoTypes';

interface PhotoTypeTagProps {
  photoUrl: string;
  currentType: PhotoType | undefined;
  onTypeChange: (photoUrl: string, type: PhotoType | undefined) => void;
  reportType?: ReportType | null;
  isExtracting?: boolean;
}

export function PhotoTypeTag({ 
  photoUrl, 
  currentType, 
  onTypeChange,
  reportType = null,
  isExtracting = false,
}: PhotoTypeTagProps) {
  const availableTypes = getPhotoTypesForReport(reportType);

  return (
    <div className="absolute bottom-1 left-1 right-1">
      <Select
        value={currentType || 'none'}
        onValueChange={(value) => {
          onTypeChange(photoUrl, value === 'none' ? undefined : value as PhotoType);
        }}
        disabled={isExtracting}
      >
        <SelectTrigger className="h-6 text-xs bg-background/90 backdrop-blur-sm border-0 shadow-sm">
          {isExtracting ? (
            <Loader2 className="h-3 w-3 mr-1 flex-shrink-0 animate-spin" />
          ) : (
            <Tag className="h-3 w-3 mr-1 flex-shrink-0" />
          )}
          <SelectValue placeholder="Tag..." />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="none" className="text-muted-foreground">
            Geen tag
          </SelectItem>
          {availableTypes.map((type) => (
            <SelectItem key={type} value={type}>
              {getPhotoTypeLabel(type, reportType || undefined)}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  );
}
