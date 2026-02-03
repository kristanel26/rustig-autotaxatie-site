import { useState } from 'react';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Tag } from 'lucide-react';
import type { PhotoType } from './AIExtractButton';

interface PhotoTypeTagProps {
  photoUrl: string;
  currentType: PhotoType | undefined;
  onTypeChange: (photoUrl: string, type: PhotoType | undefined) => void;
}

const PHOTO_TYPE_LABELS: Record<PhotoType, string> = {
  kenteken: 'Kenteken',
  dashboard: 'Dashboard',
  vin_typeplaat: 'VIN Typeplaat',
  vin_ruit: 'VIN Ruit',
  band_voor_links: 'Band LV',
  band_voor_rechts: 'Band RV',
  band_achter_links: 'Band LA',
  band_achter_rechts: 'Band RA',
  typeplaat_massa: 'Typeplaat Massa',
  gasinstallatie: 'Gasinstallatie',
};

const ALL_PHOTO_TYPES: PhotoType[] = [
  'kenteken',
  'dashboard',
  'vin_typeplaat',
  'vin_ruit',
  'band_voor_links',
  'band_voor_rechts',
  'band_achter_links',
  'band_achter_rechts',
  'typeplaat_massa',
  'gasinstallatie',
];

export function PhotoTypeTag({ photoUrl, currentType, onTypeChange }: PhotoTypeTagProps) {
  return (
    <div className="absolute bottom-1 left-1 right-1">
      <Select
        value={currentType || 'none'}
        onValueChange={(value) => {
          onTypeChange(photoUrl, value === 'none' ? undefined : value as PhotoType);
        }}
      >
        <SelectTrigger className="h-6 text-xs bg-background/90 backdrop-blur-sm border-0 shadow-sm">
          <Tag className="h-3 w-3 mr-1 flex-shrink-0" />
          <SelectValue placeholder="Tag..." />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="none" className="text-muted-foreground">
            Geen tag
          </SelectItem>
          {ALL_PHOTO_TYPES.map((type) => (
            <SelectItem key={type} value={type}>
              {PHOTO_TYPE_LABELS[type]}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  );
}
