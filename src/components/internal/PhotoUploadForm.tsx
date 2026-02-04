import { useState, useCallback, useRef } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { useToast } from '@/hooks/use-toast';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/contexts/AuthContext';
import { Upload, X, Star, GripVertical, Loader2, RotateCw, RotateCcw, Undo2, MoreVertical } from 'lucide-react';
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
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from '@/components/ui/alert-dialog';
import { PhotoTypeTag } from './PhotoTypeTag';
import { useAutoExtract } from './AutoExtractContext';
import type { PhotoType, ReportType } from './photoTypes';

// Rotation values: 0, 90, 180, 270
export type PhotoRotation = 0 | 90 | 180 | 270;

export interface PhotoRotations {
  [url: string]: PhotoRotation;
}

export interface PhotoTypes {
  [url: string]: PhotoType;
}

interface PhotoUploadFormProps {
  photos: string[];
  rotations: PhotoRotations;
  photoTypes?: PhotoTypes;
  onChange: (photos: string[]) => void;
  onRotationsChange: (rotations: PhotoRotations) => void;
  onPhotoTypesChange?: (types: PhotoTypes) => void;
  reportId?: string;
  reportType?: ReportType | null;
}

interface SortablePhotoItemProps {
  url: string;
  index: number;
  isCover: boolean;
  rotation: PhotoRotation;
  photoType: PhotoType | undefined;
  onSetCover: () => void;
  onRequestDelete: () => void;
  onRotateRight: () => void;
  onRotateLeft: () => void;
  onPhotoTypeChange: (type: PhotoType | undefined) => void;
  reportType?: ReportType | null;
  isExtracting?: boolean;
}

const SortablePhotoItem = ({ 
  url, 
  index, 
  isCover, 
  rotation,
  photoType,
  onSetCover, 
  onRequestDelete,
  onRotateRight,
  onRotateLeft,
  onPhotoTypeChange,
  reportType,
  isExtracting,
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

      {/* Drag handle - positioned on left side to avoid overlap */}
      <button
        {...attributes}
        {...listeners}
        className="absolute top-2 left-2 z-10 p-1.5 bg-background/80 backdrop-blur-sm rounded-md opacity-0 group-hover:opacity-100 transition-opacity cursor-grab active:cursor-grabbing"
        style={{ left: isCover ? 'auto' : '0.5rem', right: isCover ? '0.5rem' : 'auto' }}
        title="Verslepen om volgorde aan te passen"
      >
        <GripVertical className="h-4 w-4 text-muted-foreground" />
      </button>

      {/* Actions menu - top right corner */}
      <div className="absolute top-2 right-2 z-20">
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button
              type="button"
              variant="secondary"
              size="icon"
              className="h-7 w-7 bg-background/80 backdrop-blur-sm opacity-0 group-hover:opacity-100 transition-opacity"
            >
              <MoreVertical className="h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-48">
            <DropdownMenuItem onClick={onRotateLeft}>
              <RotateCcw className="h-4 w-4 mr-2" />
              Roteer linksom
            </DropdownMenuItem>
            <DropdownMenuItem onClick={onRotateRight}>
              <RotateCw className="h-4 w-4 mr-2" />
              Roteer rechtsom
            </DropdownMenuItem>
            {!isCover && (
              <>
                <DropdownMenuSeparator />
                <DropdownMenuItem onClick={onSetCover}>
                  <Star className="h-4 w-4 mr-2" />
                  Voorbladfoto maken
                </DropdownMenuItem>
              </>
            )}
            <DropdownMenuSeparator />
            <DropdownMenuItem 
              onClick={onRequestDelete}
              className="text-destructive focus:text-destructive"
            >
              <X className="h-4 w-4 mr-2" />
              Verwijderen
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>

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

      {/* Photo type tag dropdown - at bottom with high z-index */}
      <div className="relative z-30">
        <PhotoTypeTag
          photoUrl={url}
          currentType={photoType}
          onTypeChange={(_, type) => onPhotoTypeChange(type)}
          reportType={reportType}
          isExtracting={isExtracting}
        />
      </div>
    </div>
  );
};

const PhotoUploadForm = ({ 
  photos, 
  rotations, 
  photoTypes = {},
  onChange, 
  onRotationsChange,
  onPhotoTypesChange,
  reportId,
  reportType = null,
}: PhotoUploadFormProps) => {
  const { user } = useAuth();
  const { toast } = useToast();
  const [isUploading, setIsUploading] = useState(false);
  const [isDragOver, setIsDragOver] = useState(false);
  const [deleteDialogUrl, setDeleteDialogUrl] = useState<string | null>(null);
  const [recentlyDeleted, setRecentlyDeleted] = useState<{ url: string; index: number; timeout: NodeJS.Timeout } | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  
  // Auto-extract context
  const { isExtracting, triggerExtraction } = useAutoExtract();

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

  // Get photo type for a URL
  const getPhotoType = useCallback((url: string): PhotoType | undefined => {
    return photoTypes[url];
  }, [photoTypes]);

  // Handle photo type change - triggers auto-extraction
  const handlePhotoTypeChange = useCallback((url: string, type: PhotoType | undefined) => {
    if (!onPhotoTypesChange) return;
    
    const newTypes = { ...photoTypes };
    if (type) {
      newTypes[url] = type;
      // Trigger auto-extraction when a tag is selected
      triggerExtraction(url, type, photos, newTypes);
    } else {
      delete newTypes[url];
    }
    onPhotoTypesChange(newTypes);
  }, [photoTypes, onPhotoTypesChange, photos, triggerExtraction]);

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

  // Upload files (shared logic for both button and drag-drop)
  const uploadFiles = useCallback(async (files: FileList | File[]) => {
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
      const fileArray = Array.from(files);
      
      for (const file of fileArray) {
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
    }
  }, [user, photos, onChange, reportId, toast]);

  const handleFileUpload = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files || files.length === 0) return;
    uploadFiles(files);
    e.target.value = '';
  }, [uploadFiles]);

  // Drag and drop handlers - prevent default to avoid opening files in browser
  const handleDragEnter = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragOver(true);
  }, []);

  const handleDragLeave = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragOver(false);
  }, []);

  const handleDragOver = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
  }, []);

  const handleDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragOver(false);

    const files = e.dataTransfer.files;
    if (files && files.length > 0) {
      uploadFiles(files);
    }
  }, [uploadFiles]);

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

  // Request delete - opens confirmation dialog
  const handleRequestDelete = useCallback((url: string) => {
    setDeleteDialogUrl(url);
  }, []);

  // Confirm delete with undo option
  const handleConfirmDelete = useCallback(async () => {
    if (!deleteDialogUrl) return;
    
    const url = deleteDialogUrl;
    const index = photos.indexOf(url);
    
    // Close dialog first
    setDeleteDialogUrl(null);

    // Clear any previous undo timeout
    if (recentlyDeleted?.timeout) {
      clearTimeout(recentlyDeleted.timeout);
    }

    // Store for potential undo
    const timeout = setTimeout(() => {
      // After 5 seconds, actually delete from storage
      const urlObj = new URL(url);
      const pathParts = urlObj.pathname.split('/report-photos/');
      if (pathParts.length > 1) {
        const filePath = decodeURIComponent(pathParts[1]);
        supabase.storage.from('report-photos').remove([filePath]).catch(console.error);
      }
      setRecentlyDeleted(null);
    }, 5000);

    setRecentlyDeleted({ url, index, timeout });

    // Remove photo from array immediately (visual feedback)
    const newPhotos = photos.filter((_, i) => i !== index);
    onChange(newPhotos);

    // Remove rotation entry for deleted photo
    const newRotations = { ...rotations };
    delete newRotations[url];
    onRotationsChange(newRotations);

    // Remove photo type
    if (onPhotoTypesChange) {
      const newPhotoTypes = { ...photoTypes };
      delete newPhotoTypes[url];
      onPhotoTypesChange(newPhotoTypes);
    }
    
    toast({
      title: 'Foto verwijderd',
      description: 'De foto is verwijderd uit de collectie.',
      action: (
        <Button
          variant="outline"
          size="sm"
          onClick={() => handleUndoDelete(url, index)}
          className="flex items-center gap-1"
        >
          <Undo2 className="h-3 w-3" />
          Ongedaan maken
        </Button>
      ),
      duration: 5000,
    });
  }, [deleteDialogUrl, photos, rotations, photoTypes, onChange, onRotationsChange, onPhotoTypesChange, toast, recentlyDeleted]);

  // Undo delete
  const handleUndoDelete = useCallback((url: string, originalIndex: number) => {
    if (!recentlyDeleted || recentlyDeleted.url !== url) return;

    // Clear the delete timeout
    clearTimeout(recentlyDeleted.timeout);
    setRecentlyDeleted(null);

    // Restore photo to original position
    const newPhotos = [...photos];
    newPhotos.splice(originalIndex, 0, url);
    onChange(newPhotos);

    toast({
      title: 'Verwijdering ongedaan gemaakt',
      description: 'De foto is hersteld.',
    });
  }, [recentlyDeleted, photos, onChange, toast]);

  const handleDragEnd = useCallback((event: DragEndEvent) => {
    const { active, over } = event;

    if (over && active.id !== over.id) {
      const oldIndex = photos.indexOf(active.id as string);
      const newIndex = photos.indexOf(over.id as string);
      
      const newPhotos = arrayMove(photos, oldIndex, newIndex);
      onChange(newPhotos);
    }
  }, [photos, onChange]);

  // Open file picker when clicking on drop zone
  const handleDropzoneClick = useCallback(() => {
    fileInputRef.current?.click();
  }, []);

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-lg font-semibold">Fotocollectie</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {/* Instructions */}
        <div className="text-sm text-muted-foreground space-y-1">
          <p>Upload hier de foto's van het voertuig.</p>
          <p>Tag foto's om automatisch gegevens te extraheren (bijv. kenteken, km-stand, banden).</p>
          <p>Eén foto kan worden vastgezet als voorblad.</p>
        </div>

        {/* Drag & Drop zone + upload button */}
        <div
          onDragEnter={handleDragEnter}
          onDragLeave={handleDragLeave}
          onDragOver={handleDragOver}
          onDrop={handleDrop}
          onClick={handleDropzoneClick}
          className={`border-2 border-dashed rounded-lg p-6 text-center transition-colors cursor-pointer ${
            isDragOver 
              ? 'border-primary bg-primary/10' 
              : 'border-muted-foreground/25 hover:border-muted-foreground/50'
          }`}
        >
          <input
            ref={fileInputRef}
            type="file"
            accept="image/jpeg,image/jpg,image/png,image/webp"
            multiple
            onChange={handleFileUpload}
            disabled={isUploading}
            className="hidden"
          />
          {isUploading ? (
            <div className="flex flex-col items-center gap-2">
              <Loader2 className="h-8 w-8 animate-spin text-primary" />
              <span className="text-sm text-muted-foreground">Uploaden...</span>
            </div>
          ) : (
            <div className="flex flex-col items-center gap-2">
              <Upload className={`h-8 w-8 ${isDragOver ? 'text-primary' : 'text-muted-foreground/50'}`} />
              <span className="text-sm text-muted-foreground">
                {isDragOver ? 'Laat los om te uploaden' : 'Sleep foto\'s hierheen of klik om te selecteren'}
              </span>
            </div>
          )}
        </div>

        <p className="text-xs text-muted-foreground">
          Kies een tag bij een foto om automatisch gegevens te laten extraheren.
        </p>

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
                    photoType={getPhotoType(url)}
                    onSetCover={() => handleSetCover(index)}
                    onRequestDelete={() => handleRequestDelete(url)}
                    onRotateRight={() => handleRotateRight(url)}
                    onRotateLeft={() => handleRotateLeft(url)}
                    onPhotoTypeChange={(type) => handlePhotoTypeChange(url, type)}
                    reportType={reportType}
                    isExtracting={isExtracting}
                  />
                ))}
              </div>
            </SortableContext>
          </DndContext>
        )}

        {/* Photo count */}
        {photos.length > 0 && (
          <p className="text-sm text-muted-foreground">
            {photos.length} foto{photos.length !== 1 ? '\'s' : ''} in de collectie
          </p>
        )}

        {/* Delete confirmation dialog */}
        <AlertDialog open={!!deleteDialogUrl} onOpenChange={() => setDeleteDialogUrl(null)}>
          <AlertDialogContent>
            <AlertDialogHeader>
              <AlertDialogTitle>Foto verwijderen?</AlertDialogTitle>
              <AlertDialogDescription>
                Weet je zeker dat je deze foto wilt verwijderen? Je kunt dit 5 seconden lang ongedaan maken na het verwijderen.
              </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
              <AlertDialogCancel>Annuleren</AlertDialogCancel>
              <AlertDialogAction onClick={handleConfirmDelete} className="bg-destructive text-destructive-foreground hover:bg-destructive/90">
                Verwijderen
              </AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
      </CardContent>
    </Card>
  );
};

export default PhotoUploadForm;
