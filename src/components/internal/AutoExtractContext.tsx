import React, { createContext, useContext, useState, useCallback } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { toast } from 'sonner';
import type { PhotoType, ExtractSection } from './photoTypes';
import { PHOTO_TYPE_TO_SECTION } from './photoTypes';

export interface ExtractionResult {
  field_key: string;
  proposed_value: string | null;
  status: 'zeker' | 'waarschijnlijk' | 'ontbreekt';
  confidence: number;
  raw_text?: string;
}

export interface PendingSuggestion {
  fieldKey: string;
  proposedValue: string;
  confidence: number;
  status: 'zeker' | 'waarschijnlijk';
  photoUrl: string;
  photoType: PhotoType;
  section: ExtractSection;
}

interface AutoExtractContextValue {
  // State
  isExtracting: boolean;
  pendingSuggestions: Record<string, PendingSuggestion>;
  
  // Actions
  triggerExtraction: (photoUrl: string, photoType: PhotoType, allPhotos: string[], photoTypeMap: Record<string, PhotoType>) => Promise<void>;
  acceptSuggestion: (fieldKey: string) => string | null;
  dismissSuggestion: (fieldKey: string) => void;
  clearAllSuggestions: () => void;
  
  // Report context
  setReportId: (id: string) => void;
}

const AutoExtractContext = createContext<AutoExtractContextValue | null>(null);

export function useAutoExtract() {
  const context = useContext(AutoExtractContext);
  if (!context) {
    throw new Error('useAutoExtract must be used within AutoExtractProvider');
  }
  return context;
}

interface AutoExtractProviderProps {
  children: React.ReactNode;
}

export function AutoExtractProvider({ children }: AutoExtractProviderProps) {
  const [isExtracting, setIsExtracting] = useState(false);
  const [pendingSuggestions, setPendingSuggestions] = useState<Record<string, PendingSuggestion>>({});
  const [reportId, setReportId] = useState<string>('');

  // Map photo type to tire position prefix
  const getTirePositionPrefix = (photoType: PhotoType): string | null => {
    switch (photoType) {
      case 'band_voor_links': return 'tire_front_left_';
      case 'band_voor_rechts': return 'tire_front_right_';
      case 'band_achter_links': return 'tire_rear_left_';
      case 'band_achter_rechts': return 'tire_rear_right_';
      default: return null;
    }
  };

  const triggerExtraction = useCallback(async (
    photoUrl: string,
    photoType: PhotoType,
    allPhotos: string[],
    photoTypeMap: Record<string, PhotoType>
  ) => {
    const section = PHOTO_TYPE_TO_SECTION[photoType];
    
    // No extraction for purely visual photo types
    if (!section) {
      return;
    }

    setIsExtracting(true);

    try {
      // Find all photos of the same or related types for this section
      // For example, for VIN we might want both vin_typeplaat and vin_ruit
      const sectionPhotoTypes = Object.entries(PHOTO_TYPE_TO_SECTION)
        .filter(([_, s]) => s === section)
        .map(([t]) => t as PhotoType);

      const relevantPhotos = allPhotos.filter(url => {
        const type = photoTypeMap[url];
        return type && sectionPhotoTypes.includes(type);
      });

      const relevantPhotoTypes = relevantPhotos
        .map(url => photoTypeMap[url])
        .filter((type): type is PhotoType => type !== undefined);

      if (relevantPhotos.length === 0) {
        // Just use the single photo that was tagged
        relevantPhotos.push(photoUrl);
        relevantPhotoTypes.push(photoType);
      }

      const { data, error } = await supabase.functions.invoke('extract-photo-data', {
        body: {
          section,
          photo_urls: relevantPhotos,
          photo_types: relevantPhotoTypes,
        },
      });

      if (error) {
        console.error('Extraction error:', error);
        toast.error('Fout bij extractie', {
          description: 'Probeer het later opnieuw',
        });
        return;
      }

      if (data.error) {
        // Don't show error toast for empty results - just skip silently
        console.log('Extraction returned no data:', data.error);
        return;
      }

      const results: ExtractionResult[] = data.results || [];

      // Convert results to pending suggestions
      const newSuggestions: Record<string, PendingSuggestion> = {};
      
      // Track if we found tire brand for feedback
      let foundTireBrand = false;
      let hadTirePhoto = section === 'banden';
      
      results.forEach(result => {
        if (result.status !== 'ontbreekt' && result.proposed_value) {
          // For tire extraction, ensure the field_key uses the correct position prefix
          let finalFieldKey = result.field_key;
          
          // If this is a tire result and doesn't have a position prefix, add one based on the photo
          if (section === 'banden') {
            const positionPrefix = getTirePositionPrefix(photoType);
            
            // Handle generic tire_size - use it globally
            if (result.field_key === 'tire_size') {
              finalFieldKey = 'tire_bandenmaat';
            }
            // Handle tire_dot without position - add position from photo type
            else if (result.field_key === 'tire_dot' && positionPrefix) {
              finalFieldKey = `${positionPrefix}dot`;
            }
            // Check if brand was found
            if (result.field_key.includes('brand') && result.proposed_value) {
              foundTireBrand = true;
            }
          }
          
          newSuggestions[finalFieldKey] = {
            fieldKey: finalFieldKey,
            proposedValue: result.proposed_value,
            confidence: result.confidence,
            status: result.status,
            photoUrl,
            photoType,
            section,
          };
        }
      });

      if (Object.keys(newSuggestions).length > 0) {
        setPendingSuggestions(prev => ({
          ...prev,
          ...newSuggestions,
        }));

        // Show toast with summary
        const count = Object.keys(newSuggestions).length;
        toast.success(`${count} waarde${count > 1 ? 's' : ''} gevonden`, {
          description: 'Bekijk de suggesties bij de velden',
        });
      }
      
      // Show feedback if tire photo but no brand found
      if (hadTirePhoto && !foundTireBrand && Object.keys(newSuggestions).length > 0) {
        toast.info('Bandenmerk niet herkend', {
          description: 'Tip: maak een close-up van de zijwand met merk + DOT in beeld',
          duration: 5000,
        });
      }

    } catch (err) {
      console.error('Extract failed:', err);
    } finally {
      setIsExtracting(false);
    }
  }, []);

  const acceptSuggestion = useCallback((fieldKey: string): string | null => {
    const suggestion = pendingSuggestions[fieldKey];
    if (!suggestion) return null;

    // Store acceptance in database if we have a report ID
    if (reportId) {
      supabase.from('photo_extract_results').insert({
        report_id: reportId,
        photo_url: suggestion.photoUrl,
        photo_type: suggestion.photoType,
        section: suggestion.section,
        field_key: suggestion.fieldKey,
        proposed_value: suggestion.proposedValue,
        status: suggestion.status,
        confidence: suggestion.confidence,
        accepted: true,
      }).then(({ error }) => {
        if (error) console.error('Failed to store extraction result:', error);
      });
    }

    // Remove from pending
    setPendingSuggestions(prev => {
      const updated = { ...prev };
      delete updated[fieldKey];
      return updated;
    });

    return suggestion.proposedValue;
  }, [pendingSuggestions, reportId]);

  const dismissSuggestion = useCallback((fieldKey: string) => {
    setPendingSuggestions(prev => {
      const updated = { ...prev };
      delete updated[fieldKey];
      return updated;
    });
  }, []);

  const clearAllSuggestions = useCallback(() => {
    setPendingSuggestions({});
  }, []);

  return (
    <AutoExtractContext.Provider
      value={{
        isExtracting,
        pendingSuggestions,
        triggerExtraction,
        acceptSuggestion,
        dismissSuggestion,
        clearAllSuggestions,
        setReportId,
      }}
    >
      {children}
    </AutoExtractContext.Provider>
  );
}
