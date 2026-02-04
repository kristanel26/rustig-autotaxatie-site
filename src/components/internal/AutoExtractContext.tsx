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
      
      results.forEach(result => {
        if (result.status !== 'ontbreekt' && result.proposed_value) {
          newSuggestions[result.field_key] = {
            fieldKey: result.field_key,
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
