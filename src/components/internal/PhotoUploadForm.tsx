import { useState, useCallback } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { useToast } from '@/hooks/use-toast';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/contexts/AuthContext';
import { Upload, X, Star, GripVertical, Loader2, RotateCw, RotateCcw } from 'lucide-react';
import {
  DndContext,
  closestCenter,
  KeyboardSensor,
  PointerSensor,
  useSensor,
  useSensors,
  DragEndEvent,
} from '@dnd-kit/core';
import {
  arrayMove,
  SortableContext,
  sortableKeyboardCoordinates,
  useSortable,
  rectSortingStrategy,
} from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';

// Rotation values: 0, 90, 180, 270
export type PhotoRotation = 0 | 90 | 180 | 270;

export interface PhotoRotations {
  [url: string]: PhotoRotation;
}

interface PhotoUploadFormProps {
  photos: string[];
  rotations: PhotoRotations;
  onChange: (photos: string[]) => void;
  onRotationsChange: (rotations: PhotoRotations) => void;
  reportId?: string;
}

interface SortablePhotoItemProps {
  url: string;
  index: number;
  isCover: boolean;
  rotation: PhotoRotation;
  onSetCover: () => void;
  onDelete: () => void;
  onRotateRight: () => void;
  onRotateLeft: () => void;
  isDeleting: boolean;
}

const SortablePhotoItem = ({ 
  url, 
  index, 
  isCover, 
  rotation,
  onSetCover, 
  onDelete,
  onRotateRight,
  onRotateLeft,
  isDeleting 
}: SortablePhotoItemProps) => {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({ id: url });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    opacity: isDragging ? 0.5 : 1,
  };

  return (
    <div
      ref={setNodeRef}
      style={style}
      className={`relative group rounded-lg overflow-hidden border-2 ${
        isCover ? 'border-primary ring-2 ring-primary/20' : 'border-border'
      } bg-muted`}
    >
      {/* Cover badge */}
      {isCover && (
        <div className="absolute top-2 left-2 z-10 bg-primary text-primary-foreground text-xs font-medium px-2 py-1 rounded-full flex items-center gap-1">
          <Star className="h-3 w-3 fill-current" />
          Voorblad
        </div>
      )}

      {/* Drag handle */}
      <button
        {...attributes}
        {...listeners}
        className="absolute top-2 right-2 z-10 p-1.5 bg-background/80 backdrop-blur-sm rounded-md opacity-0 group-hover:opacity-100 transition-opacity cursor-grab active:cursor-grabbing"
        title="Verslepen om volgorde aan te passen"
      >
        <GripVertical className="h-4 w-4 text-muted-foreground" />
      </button>

      {/* Image with rotation applied */}
      <div className="aspect-[4/3] overflow-hidden">
        <img
          src={url}
          alt={`Foto ${index + 1}`}
          className="w-full h-full object-cover transition-transform duration-200"
          style={{ transform: `rotate(${rotation}deg)` }}
          loading="lazy"
        />
      </div>

      {/* Actions overlay */}
      <div className="absolute inset-0 bg-black/0 group-hover:bg-black/40 transition-colors flex flex-col items-center justify-center gap-2 opacity-0 group-hover:opacity-100">
        {/* Rotation buttons */}
        <div className="flex items-center gap-2">
          <Button
            type="button"
            variant="secondary"
            size="sm"
            onClick={onRotateLeft}
            className="text-xs"
            title="Roteer 90° linksom"
          >
            <RotateCcw className="h-3.5 w-3.5" />
          </Button>
          <Button
            type="button"
            variant="secondary"
            size="sm"
            onClick={onRotateRight}
            className="text-xs"
            title="Roteer 90° rechtsom"
          >
            <RotateCw className="h-3.5 w-3.5" />
          </Button>
        </div>

        {/* Other actions */}
        <div className="flex items-center gap-2">
          {!isCover && (
            <Button
              type="button"
              variant="secondary"
              size="sm"
              onClick={onSetCover}
              className="text-xs"
            >
              <Star className="h-3 w-3 mr-1" />
              Voorbladfoto
            </Button>
          )}
          <Button
            type="button"
            variant="destructive"
            size="sm"
            onClick={onDelete}
            disabled={isDeleting}
            className="text-xs"
          >
            {isDeleting ? (
              <Loader2 className="h-3 w-3 animate-spin" />
            ) : (
              <X className="h-3 w-3" />
            )}
          </Button>
        </div>
      </div>
    </div>
  );
};

const PhotoUploadForm = ({ 
  photos, 
  rotations, 
  onChange, 
  onRotationsChange, 
  reportId 
}: PhotoUploadFormProps) => {
  const { user } = useAuth();
  const { toast } = useToast();
  const [isUploading, setIsUploading] = useState(false);
  const [deletingUrl, setDeletingUrl] = useState<string | null>(null);

  const sensors = useSensors(
    useSensor(PointerSensor, {
      activationConstraint: {
        distance: 8,
      },
    }),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    })
  );

  // Get rotation for a photo URL
  const getRotation = useCallback((url: string): PhotoRotation => {
    return rotations[url] || 0;
  }, [rotations]);

  // Rotate photo right (clockwise)
  const handleRotateRight = useCallback((url: string) => {
    const currentRotation = getRotation(url);
    const newRotation = ((currentRotation + 90) % 360) as PhotoRotation;
    onRotationsChange({ ...rotations, [url]: newRotation });
  }, [rotations, getRotation, onRotationsChange]);

  // Rotate photo left (counter-clockwise)
  const handleRotateLeft = useCallback((url: string) => {
    const currentRotation = getRotation(url);
    const newRotation = ((currentRotation - 90 + 360) % 360) as PhotoRotation;
    onRotationsChange({ ...rotations, [url]: newRotation });
  }, [rotations, getRotation, onRotationsChange]);

  const handleFileUpload = useCallback(async (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files || files.length === 0) return;
    if (!user) {
      toast({
        title: 'Niet ingelogd',
        description: 'Je moet ingelogd zijn om foto\'s te uploaden.',
        variant: 'destructive',
      });
      return;
    }

    setIsUploading(true);
    const uploadedUrls: string[] = [];

    try {
      for (const file of Array.from(files)) {
        if (!file.type.startsWith('image/')) {
          toast({
            title: 'Ongeldig bestandstype',
            description: `${file.name} is geen afbeelding.`,
            variant: 'destructive',
          });
          continue;
        }

        if (file.size > 10 * 1024 * 1024) {
          toast({
            title: 'Bestand te groot',
            description: `${file.name} is groter dan 10MB.`,
            variant: 'destructive',
          });
          continue;
        }

        const timestamp = Date.now();
        const randomStr = Math.random().toString(36).substring(2, 8);
        const extension = file.name.split('.').pop()?.toLowerCase() || 'jpg';
        const filename = `${user.id}/${reportId || 'temp'}/${timestamp}-${randomStr}.${extension}`;

        const { data, error } = await supabase.storage
          .from('report-photos')
          .upload(filename, file, {
            cacheControl: '3600',
            upsert: false,
          });

        if (error) {
          console.error('Upload error:', error);
          toast({
            title: 'Upload mislukt',
            description: `Kon ${file.name} niet uploaden: ${error.message}`,
            variant: 'destructive',
          });
          continue;
        }

        const { data: urlData } = supabase.storage
          .from('report-photos')
          .getPublicUrl(data.path);

        if (urlData?.publicUrl) {
          uploadedUrls.push(urlData.publicUrl);
        }
      }

      if (uploadedUrls.length > 0) {
        onChange([...photos, ...uploadedUrls]);
        toast({
          title: 'Foto\'s geüpload',
          description: `${uploadedUrls.length} foto('s) succesvol toegevoegd.`,
        });
      }
    } catch (error) {
      console.error('Upload error:', error);
      toast({
        title: 'Upload mislukt',
        description: 'Er is een fout opgetreden bij het uploaden.',
        variant: 'destructive',
      });
    } finally {
      setIsUploading(false);
      e.target.value = '';
    }
  }, [user, photos, onChange, reportId, toast]);

  const handleSetCover = useCallback((index: number) => {
    if (index === 0) return;
    
    const newPhotos = [...photos];
    const [photo] = newPhotos.splice(index, 1);
    newPhotos.unshift(photo);
    onChange(newPhotos);
    
    toast({
      title: 'Voorbladfoto ingesteld',
      description: 'De geselecteerde foto wordt nu gebruikt als voorblad.',
    });
  }, [photos, onChange, toast]);

  const handleDelete = useCallback(async (index: number) => {
    const url = photos[index];
    setDeletingUrl(url);

    try {
      const urlObj = new URL(url);
      const pathParts = urlObj.pathname.split('/report-photos/');
      if (pathParts.length > 1) {
        const filePath = decodeURIComponent(pathParts[1]);
        
        const { error } = await supabase.storage
          .from('report-photos')
          .remove([filePath]);

        if (error) {
          console.error('Delete error:', error);
        }
      }

      // Remove photo from array
      const newPhotos = photos.filter((_, i) => i !== index);
      onChange(newPhotos);

      // Remove rotation entry for deleted photo
      const newRotations = { ...rotations };
      delete newRotations[url];
      onRotationsChange(newRotations);
      
      toast({
        title: 'Foto verwijderd',
        description: 'De foto is verwijderd uit de collectie.',
      });
    } catch (error) {
      console.error('Delete error:', error);
      toast({
        title: 'Verwijderen mislukt',
        description: 'Kon de foto niet verwijderen.',
        variant: 'destructive',
      });
    } finally {
      setDeletingUrl(null);
    }
  }, [photos, rotations, onChange, onRotationsChange, toast]);

  const handleDragEnd = useCallback((event: DragEndEvent) => {
    const { active, over } = event;

    if (over && active.id !== over.id) {
      const oldIndex = photos.indexOf(active.id as string);
      const newIndex = photos.indexOf(over.id as string);
      
      const newPhotos = arrayMove(photos, oldIndex, newIndex);
      onChange(newPhotos);
    }
  }, [photos, onChange]);

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-lg font-semibold">Fotocollectie</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {/* Instructions */}
        <div className="text-sm text-muted-foreground space-y-1">
          <p>Upload hier de foto's van het voertuig.</p>
          <p>Je kunt onbeperkt foto's toevoegen en roteren indien nodig.</p>
          <p>Eén foto kan worden vastgezet als voorblad.</p>
        </div>

        {/* Upload button */}
        <div>
          <Label htmlFor="photo-upload" className="sr-only">
            Foto's uploaden
          </Label>
          <div className="relative">
            <input
              id="photo-upload"
              type="file"
              accept="image/jpeg,image/jpg,image/png,image/webp"
              multiple
              onChange={handleFileUpload}
              disabled={isUploading}
              className="absolute inset-0 w-full h-full opacity-0 cursor-pointer disabled:cursor-not-allowed"
            />
            <Button
              type="button"
              variant="outline"
              disabled={isUploading}
              className="w-full sm:w-auto"
            >
              {isUploading ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Uploaden...
                </>
              ) : (
                <>
                  <Upload className="mr-2 h-4 w-4" />
                  Foto's uploaden
                </>
              )}
            </Button>
          </div>
          <p className="text-xs text-muted-foreground mt-2">
            Hover over een foto om te roteren of als voorbladfoto in te stellen.
          </p>
        </div>

        {/* Photo grid */}
        {photos.length > 0 && (
          <DndContext
            sensors={sensors}
            collisionDetection={closestCenter}
            onDragEnd={handleDragEnd}
          >
            <SortableContext items={photos} strategy={rectSortingStrategy}>
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
                {photos.map((url, index) => (
                  <SortablePhotoItem
                    key={url}
                    url={url}
                    index={index}
                    isCover={index === 0}
                    rotation={getRotation(url)}
                    onSetCover={() => handleSetCover(index)}
                    onDelete={() => handleDelete(index)}
                    onRotateRight={() => handleRotateRight(url)}
                    onRotateLeft={() => handleRotateLeft(url)}
                    isDeleting={deletingUrl === url}
                  />
                ))}
              </div>
            </SortableContext>
          </DndContext>
        )}

        {/* Empty state */}
        {photos.length === 0 && !isUploading && (
          <div className="border-2 border-dashed border-muted-foreground/25 rounded-lg p-8 text-center">
            <Upload className="h-12 w-12 mx-auto text-muted-foreground/50 mb-4" />
            <p className="text-sm text-muted-foreground">
              Nog geen foto's toegevoegd
            </p>
            <p className="text-xs text-muted-foreground mt-1">
              Klik op "Foto's uploaden" om te beginnen
            </p>
          </div>
        )}

        {/* Photo count */}
        {photos.length > 0 && (
          <p className="text-sm text-muted-foreground">
            {photos.length} foto{photos.length !== 1 ? '\'s' : ''} in de collectie
          </p>
        )}
      </CardContent>
    </Card>
  );
};

export default PhotoUploadForm;
