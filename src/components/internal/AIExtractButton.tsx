import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Sparkles, Loader2 } from 'lucide-react';
import { supabase } from '@/integrations/supabase/client';
import { toast } from 'sonner';
import { AIExtractResultsDialog } from './AIExtractResultsDialog';
import type { PhotoType, ExtractSection } from './photoTypes';

// Re-export for backwards compatibility
export type { PhotoType } from './photoTypes';
export type Section = ExtractSection;

export interface ExtractionResult {
  field_key: string;
  proposed_value: string | null;
  status: 'zeker' | 'waarschijnlijk' | 'ontbreekt';
  confidence: number;
  raw_text?: string;
}

interface AIExtractButtonProps {
  section: ExtractSection;
  label: string;
  photoTypes: PhotoType[];
  photos: string[];
  photoTypeMap: Record<string, PhotoType>;
  onAccept: (fieldKey: string, value: string) => void;
  reportId: string;
  disabled?: boolean;
}

export function AIExtractButton({
  section,
  label,
  photoTypes,
  photos,
  photoTypeMap,
  onAccept,
  reportId,
  disabled = false,
}: AIExtractButtonProps) {
  const [isExtracting, setIsExtracting] = useState(false);
  const [results, setResults] = useState<ExtractionResult[]>([]);
  const [sourcePhotos, setSourcePhotos] = useState<string[]>([]);
  const [dialogOpen, setDialogOpen] = useState(false);

  // Filter photos by the required types
  const relevantPhotos = photos.filter(photoUrl => {
    const photoType = photoTypeMap[photoUrl];
    return photoType && photoTypes.includes(photoType);
  });

  // Filter out undefined photo types
  const relevantPhotoTypes = relevantPhotos
    .map(url => photoTypeMap[url])
    .filter((type): type is PhotoType => type !== undefined);

  const handleExtract = async () => {
    if (relevantPhotos.length === 0) {
      toast.info(`Geen foto's gevonden van type: ${photoTypes.join(', ')}`, {
        description: 'Upload eerst de juiste foto\'s en tag ze met het correcte type.',
      });
      return;
    }

    setIsExtracting(true);
    setResults([]);

    try {
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
          description: error.message || 'Probeer het later opnieuw',
        });
        return;
      }

      if (data.error) {
        toast.error('AI kon geen gegevens extraheren', {
          description: data.error,
        });
        return;
      }

      const extractedResults = data.results || [];
      
      if (extractedResults.length === 0) {
        toast.info('Geen gegevens gevonden', {
          description: 'AI kon geen relevante gegevens uit de foto\'s halen.',
        });
        return;
      }

      setResults(extractedResults);
      setSourcePhotos(data.photo_urls || relevantPhotos);
      setDialogOpen(true);

    } catch (err) {
      console.error('Extract failed:', err);
      toast.error('Er ging iets mis', {
        description: 'Probeer het later opnieuw',
      });
    } finally {
      setIsExtracting(false);
    }
  };

  const handleAcceptResult = async (result: ExtractionResult) => {
    if (!result.proposed_value) return;

    // Call the parent's onAccept to update the form field
    onAccept(result.field_key, result.proposed_value);

    // Store the accepted result in the database
    try {
      const relevantPhoto = sourcePhotos[0] || relevantPhotos[0] || '';
      // Get the actual photo type from the map, not from the required types array
      const photoType = relevantPhoto ? (photoTypeMap[relevantPhoto] || null) : null;

      await supabase.from('photo_extract_results').insert({
        report_id: reportId,
        photo_url: relevantPhoto || '',
        photo_type: photoType || 'unknown',
        section,
        field_key: result.field_key,
        proposed_value: result.proposed_value,
        status: result.status,
        confidence: result.confidence,
        raw_text: result.raw_text || null,
        accepted: true,
      });
    } catch (err) {
      console.error('Failed to store extraction result:', err);
      // Don't block the UI, just log the error
    }

    toast.success('Waarde overgenomen', {
      description: `${result.field_key}: ${result.proposed_value}`,
    });
  };

  const hasRelevantPhotos = relevantPhotos.length > 0;

  return (
    <>
      <Button
        type="button"
        variant="outline"
        size="sm"
        onClick={handleExtract}
        disabled={disabled || isExtracting || !hasRelevantPhotos}
        className="gap-2 text-xs"
        title={!hasRelevantPhotos ? `Geen foto's van type ${photoTypes.join(', ')} gevonden` : undefined}
      >
        {isExtracting ? (
          <Loader2 className="h-3 w-3 animate-spin" />
        ) : (
          <Sparkles className="h-3 w-3" />
        )}
        {isExtracting ? 'Bezig...' : label}
      </Button>

      <AIExtractResultsDialog
        open={dialogOpen}
        onOpenChange={setDialogOpen}
        results={results}
        sourcePhotos={sourcePhotos}
        section={section}
        onAccept={handleAcceptResult}
      />
    </>
  );
}
