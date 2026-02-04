import React, { createContext, useContext, useState, useCallback, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { toast } from 'sonner';
import type { PhotoType, ExtractSection } from './photoTypes';
import { PHOTO_TYPE_TO_SECTION, EXTRACTION_FIELD_MAPPINGS } from './photoTypes';

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
  source?: string; // e.g., "Pedalen" or "Versnellingspook"
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
  
  // Callbacks for auto-apply
  onAutoApply: (callback: (fieldKey: string, value: string, source?: string) => void) => void;
  
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
  const [autoApplyCallback, setAutoApplyCallback] = useState<((fieldKey: string, value: string, source?: string) => void) | null>(null);

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

  // Get source label for transmissie
  const getTransmissieSource = (photoType: PhotoType): string => {
    switch (photoType) {
      case 'voetenruimte_pedalen': return 'Pedalen';
      case 'versnellingspook': return 'Versnellingspook';
      default: return photoType;
    }
  };

  const triggerExtraction = useCallback(async (
    photoUrl: string,
    photoType: PhotoType,
    allPhotos: string[],
    photoTypeMap: Record<string, PhotoType>
  ) => {
    const section = PHOTO_TYPE_TO_SECTION[photoType];
    
    // No extraction for photo types without a section
    if (!section) {
      return;
    }

    setIsExtracting(true);

    try {
      // Find all photos of the same or related types for this section
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
        console.log('Extraction returned no data:', data.error);
        return;
      }

      const results: ExtractionResult[] = data.results || [];

      // Track stats
      let foundTireBrand = false;
      let hadTirePhoto = section === 'banden';
      let autoAppliedCount = 0;
      const manualSuggestions: Record<string, PendingSuggestion> = {};
      
      results.forEach(result => {
        if (result.status !== 'ontbreekt' && result.proposed_value) {
          let finalFieldKey = result.field_key;
          let source: string | undefined;
          
          // For tire extraction, ensure the field_key uses the correct position prefix
          if (section === 'banden') {
            const positionPrefix = getTirePositionPrefix(photoType);
            
            if (result.field_key === 'tire_size') {
              finalFieldKey = 'tire_bandenmaat';
            } else if (result.field_key === 'tire_dot' && positionPrefix) {
              finalFieldKey = `${positionPrefix}dot`;
            }
            
            if (result.field_key.includes('brand') && result.proposed_value) {
              foundTireBrand = true;
            }
          }
          
          // For transmissie, track the source
          if (section === 'transmissie') {
            source = getTransmissieSource(photoType);
            
            // Check if we already have a higher priority source
            const existingSuggestion = pendingSuggestions['transmissie'];
            if (existingSuggestion) {
              // Pedalen is higher priority than Versnellingspook
              if (existingSuggestion.source === 'Pedalen' && source === 'Versnellingspook') {
                return; // Skip, pedalen is already set
              }
              // Use the one with higher confidence if same source type
              if (existingSuggestion.confidence >= result.confidence) {
                return; // Skip, existing is better
              }
            }
          }
          
          const suggestion: PendingSuggestion = {
            fieldKey: finalFieldKey,
            proposedValue: result.proposed_value,
            confidence: result.confidence,
            status: result.status,
            photoUrl,
            photoType,
            section,
            source,
          };
          
          // Auto-apply if confidence >= 85% and we have a callback
          if (result.confidence >= 85 && autoApplyCallback) {
            autoApplyCallback(finalFieldKey, result.proposed_value, source);
            autoAppliedCount++;
            
            // Store in database
            if (reportId) {
              supabase.from('photo_extract_results').insert({
                report_id: reportId,
                photo_url: photoUrl,
                photo_type: photoType,
                section,
                field_key: finalFieldKey,
                proposed_value: result.proposed_value,
                status: result.status,
                confidence: result.confidence,
                accepted: true,
              }).then(({ error }) => {
                if (error) console.error('Failed to store extraction result:', error);
              });
            }
          } else {
            manualSuggestions[finalFieldKey] = suggestion;
          }
        }
      });

      // Update pending suggestions (for values that weren't auto-applied)
      if (Object.keys(manualSuggestions).length > 0) {
        setPendingSuggestions(prev => ({
          ...prev,
          ...manualSuggestions,
        }));
      }

      // Show appropriate toast
      const totalFound = autoAppliedCount + Object.keys(manualSuggestions).length;
      if (totalFound > 0) {
        if (autoAppliedCount > 0 && Object.keys(manualSuggestions).length > 0) {
          toast.success(`${autoAppliedCount} waarde(s) automatisch overgenomen`, {
            description: `${Object.keys(manualSuggestions).length} suggestie(s) wachten op bevestiging`,
          });
        } else if (autoAppliedCount > 0) {
          toast.success(`${autoAppliedCount} waarde(s) automatisch overgenomen`, {
            description: 'Velden zijn bijgewerkt',
          });
        } else {
          toast.success(`${totalFound} waarde(s) gevonden`, {
            description: 'Bekijk de suggesties bij de velden',
          });
        }
      }
      
      // Show feedback if tire photo but no brand found
      if (hadTirePhoto && !foundTireBrand && totalFound > 0) {
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
  }, [autoApplyCallback, pendingSuggestions, reportId]);

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

  const onAutoApply = useCallback((callback: (fieldKey: string, value: string, source?: string) => void) => {
    setAutoApplyCallback(() => callback);
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
        onAutoApply,
        setReportId,
      }}
    >
      {children}
    </AutoExtractContext.Provider>
  );
}
