import { useState, useRef, useCallback } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';
import { Upload, FileText, Trash2, CheckCircle2, AlertCircle, Loader2 } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/contexts/AuthContext';

/** Extracted section with field key→value pairs */
export interface ExtractedSection {
  label: string;
  key: string;
  fields: Record<string, { label: string; value: string }>;
}

/** Full extraction result from edge function (future) */
export interface CamperHostExtraction {
  sections: ExtractedSection[];
  extractedAt: string;
}

interface UploadedFile {
  id: string;
  name: string;
  type: 'pdf' | 'docx' | 'doc';
  url: string;
  size: number;
}

interface CamperHostImportFormProps {
  reportId: string;
  onImport?: (sectionKey: string, fields: Record<string, string>) => void;
  onImportAll?: (sections: ExtractedSection[]) => void;
}

const formatFileSize = (bytes: number): string => {
  if (bytes < 1024) return `${bytes} B`;
  if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`;
  return `${(bytes / (1024 * 1024)).toFixed(1)} MB`;
};

export const CamperHostImportForm = ({
  reportId,
  onImport,
  onImportAll,
}: CamperHostImportFormProps) => {
  const { toast } = useToast();
  const { user } = useAuth();
  const fileInputRef = useRef<HTMLInputElement>(null);

  const [uploadedFiles, setUploadedFiles] = useState<UploadedFile[]>([]);
  const [isUploading, setIsUploading] = useState(false);
  const [isExtracting, setIsExtracting] = useState(false);
  const [extraction, setExtraction] = useState<CamperHostExtraction | null>(null);
  const [importedSections, setImportedSections] = useState<Set<string>>(new Set());

  const handleFileSelect = useCallback(async (files: FileList | null) => {
    if (!files || !reportId || !user?.id) return;

    const allowedTypes = [
      'application/pdf',
      'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
      'application/msword',
    ];

    const validFiles = Array.from(files).filter((f) => {
      if (!allowedTypes.includes(f.type)) {
        toast({
          title: 'Ongeldig bestandstype',
          description: `${f.name}: Alleen PDF, DOC en DOCX bestanden zijn toegestaan.`,
          variant: 'destructive',
        });
        return false;
      }
      if (f.size > 20 * 1024 * 1024) {
        toast({
          title: 'Bestand te groot',
          description: `${f.name}: Maximale bestandsgrootte is 20MB.`,
          variant: 'destructive',
        });
        return false;
      }
      return true;
    });

    if (validFiles.length === 0) return;

    setIsUploading(true);

    try {
      const newFiles: UploadedFile[] = [];

      for (const file of validFiles) {
        const fileExt = file.name.split('.').pop()?.toLowerCase();
        const fileType = fileExt === 'pdf' ? 'pdf' : fileExt === 'doc' ? 'doc' : 'docx';
        const fileId = `${Date.now()}-${Math.random().toString(36).slice(2, 8)}`;

        const storagePath = `${user.id}/${reportId}/camperhost/${fileId}.${fileExt}`;

        const { error: uploadError } = await supabase.storage
          .from('report-photos')
          .upload(storagePath, file);

        if (uploadError) throw uploadError;

        const { data: urlData } = supabase.storage
          .from('report-photos')
          .getPublicUrl(storagePath);

        newFiles.push({
          id: fileId,
          name: file.name,
          type: fileType as 'pdf' | 'docx' | 'doc',
          url: urlData.publicUrl,
          size: file.size,
        });
      }

      setUploadedFiles((prev) => [...prev, ...newFiles]);

      toast({
        title: 'Bestanden geüpload',
        description: `${newFiles.length} bestand(en) succesvol geüpload.`,
      });
    } catch (error) {
      console.error('Error uploading CamperHost files:', error);
      toast({
        title: 'Fout bij uploaden',
        description: 'Er is een fout opgetreden bij het uploaden.',
        variant: 'destructive',
      });
    } finally {
      setIsUploading(false);
    }
  }, [reportId, user?.id, toast]);

  const handleDrop = useCallback(
    (e: React.DragEvent) => {
      e.preventDefault();
      e.stopPropagation();
      handleFileSelect(e.dataTransfer.files);
    },
    [handleFileSelect]
  );

  const handleDragOver = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
  }, []);

  const handleRemoveFile = (type: 'pdf' | 'docx') => {
    setUploadedFiles((prev) => prev.filter((f) => f.type !== type));
    // Clear extraction if no files left
    if (uploadedFiles.length <= 1) {
      setExtraction(null);
      setImportedSections(new Set());
    }
  };

  const handleExtract = async () => {
    if (uploadedFiles.length === 0) return;
    setIsExtracting(true);
    try {
      const fileUrls = uploadedFiles.map((f) => f.url);

      const { data, error } = await supabase.functions.invoke('extract-camperhost', {
        body: { fileUrls },
      });

      if (error) throw error;

      if (!data?.success) {
        throw new Error(data?.error || 'Extractie mislukt');
      }

      const result: CamperHostExtraction = {
        sections: data.sections || [],
        extractedAt: data.extractedAt || new Date().toISOString(),
      };

      if (result.sections.length === 0) {
        toast({
          title: 'Geen gegevens gevonden',
          description: 'Er konden geen gegevens uit de documenten worden uitgelezen.',
          variant: 'destructive',
        });
        return;
      }

      setExtraction(result);
      setImportedSections(new Set());

      toast({
        title: 'Gegevens uitgelezen',
        description: `${result.sections.length} secties met gegevens gevonden.`,
      });
    } catch (error) {
      console.error('Error extracting CamperHost data:', error);
      toast({
        title: 'Fout bij uitlezen',
        description: error instanceof Error ? error.message : 'Er is een fout opgetreden bij het uitlezen van de documenten.',
        variant: 'destructive',
      });
    } finally {
      setIsExtracting(false);
    }
  };

  const handleImportSection = (section: ExtractedSection) => {
    if (!onImport) return;
    const flatFields: Record<string, string> = {};
    for (const [key, field] of Object.entries(section.fields)) {
      flatFields[key] = field.value;
    }
    onImport(section.key, flatFields);
    setImportedSections((prev) => new Set([...prev, section.key]));
    toast({
      title: 'Sectie overgenomen',
      description: `${section.label} is overgenomen in het rapport.`,
    });
  };

  const handleImportAll = () => {
    if (!extraction || !onImportAll) return;
    onImportAll(extraction.sections);
    setImportedSections(new Set(extraction.sections.map((s) => s.key)));
    toast({
      title: 'Alle secties overgenomen',
      description: 'Alle uitgelezen gegevens zijn overgenomen in het rapport.',
    });
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-lg flex items-center gap-2">
          <FileText className="h-5 w-5" />
          CamperHost Import
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <p className="text-sm text-muted-foreground">
          Upload het CamperHost PDF-keuringsrapport en/of het DOCX-werkformulier. 
          Na het uitlezen worden de gegevens automatisch in de juiste velden ingevuld.
        </p>

        {/* Dropzone */}
        <div
          className="border-2 border-dashed rounded-lg p-6 text-center cursor-pointer hover:border-primary/50 transition-colors"
          onDrop={handleDrop}
          onDragOver={handleDragOver}
          onClick={(e) => {
            e.preventDefault();
            e.stopPropagation();
            fileInputRef.current?.click();
          }}
        >
          <input
            ref={fileInputRef}
            type="file"
            accept=".pdf,.docx"
            multiple
            onChange={(e) => {
              handleFileSelect(e.target.files);
              e.target.value = '';
            }}
            className="hidden"
            disabled={isUploading}
          />
          {isUploading ? (
            <div className="flex flex-col items-center gap-2">
              <Loader2 className="h-8 w-8 animate-spin text-muted-foreground" />
              <p className="text-sm text-muted-foreground">Uploaden...</p>
            </div>
          ) : (
            <div className="flex flex-col items-center gap-2">
              <Upload className="h-8 w-8 text-muted-foreground" />
              <p className="text-sm font-medium">
                Sleep het PDF-keuringsrapport en/of het DOCX-werkformulier hierheen
              </p>
              <p className="text-xs text-muted-foreground">
                Of klik om bestanden te selecteren (max. 20MB per bestand)
              </p>
            </div>
          )}
        </div>

        {/* Uploaded files list */}
        {uploadedFiles.length > 0 && (
          <div className="space-y-2">
            {uploadedFiles.map((file) => (
              <div
                key={file.type}
                className="flex items-center justify-between p-3 bg-muted/50 rounded-lg"
              >
                <div className="flex items-center gap-3 min-w-0 flex-1">
                  <FileText className="h-5 w-5 text-muted-foreground shrink-0" />
                  <div className="min-w-0">
                    <a
                      href={file.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="font-medium text-sm hover:underline truncate block"
                    >
                      {file.name}
                    </a>
                    <div className="flex items-center gap-2 text-xs text-muted-foreground">
                      <Badge variant="secondary" className="text-xs">
                        {file.type.toUpperCase()}
                      </Badge>
                      <span>{formatFileSize(file.size)}</span>
                    </div>
                  </div>
                </div>
                <Button
                  type="button"
                  variant="ghost"
                  size="icon"
                  onClick={() => handleRemoveFile(file.type)}
                  className="shrink-0 text-destructive hover:text-destructive"
                >
                  <Trash2 className="h-4 w-4" />
                </Button>
              </div>
            ))}
          </div>
        )}

        {/* Extract button */}
        {uploadedFiles.length > 0 && (
          <Button
            type="button"
            onClick={(e) => {
              e.preventDefault();
              handleExtract();
            }}
            disabled={isExtracting}
            className="w-full"
          >
            {isExtracting ? (
              <>
                <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                Gegevens uitlezen...
              </>
            ) : extraction ? (
              'Opnieuw uitlezen'
            ) : (
              'Gegevens uitlezen'
            )}
          </Button>
        )}

        {/* Extraction results */}
        {extraction && (
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <p className="text-sm font-medium">
                {importedSections.size} van {extraction.sections.length} secties overgenomen
              </p>
              {importedSections.size < extraction.sections.length && (
                <Button
                  type="button"
                  size="sm"
                  onClick={(e) => {
                    e.preventDefault();
                    handleImportAll();
                  }}
                >
                  <CheckCircle2 className="h-4 w-4 mr-2" />
                  Alles overnemen
                </Button>
              )}
            </div>

            <Accordion type="multiple" className="w-full">
              {extraction.sections.map((section) => {
                const isImported = importedSections.has(section.key);
                const fieldCount = Object.keys(section.fields).length;
                return (
                  <AccordionItem key={section.key} value={section.key}>
                    <AccordionTrigger className="text-sm">
                      <div className="flex items-center gap-2">
                        {isImported ? (
                          <CheckCircle2 className="h-4 w-4 text-primary shrink-0" />
                        ) : (
                          <AlertCircle className="h-4 w-4 text-muted-foreground shrink-0" />
                        )}
                        <span>{section.label}</span>
                        <Badge variant="secondary" className="text-xs ml-1">
                          {fieldCount} veld{fieldCount !== 1 ? 'en' : ''}
                        </Badge>
                      </div>
                    </AccordionTrigger>
                    <AccordionContent>
                      <div className="space-y-2 mb-3">
                        {Object.entries(section.fields).map(([key, field]) => (
                          <div
                            key={key}
                            className="flex items-start justify-between text-sm gap-4"
                          >
                            <span className="text-muted-foreground shrink-0">
                              {field.label}
                            </span>
                            <span className="font-medium text-right">{field.value}</span>
                          </div>
                        ))}
                      </div>
                      {!isImported && (
                        <Button
                          type="button"
                          size="sm"
                          variant="outline"
                          onClick={(e) => {
                            e.preventDefault();
                            handleImportSection(section);
                          }}
                        >
                          <CheckCircle2 className="h-4 w-4 mr-2" />
                          Overnemen
                        </Button>
                      )}
                    </AccordionContent>
                  </AccordionItem>
                );
              })}
            </Accordion>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default CamperHostImportForm;
