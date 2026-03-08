import { useState, useEffect, useCallback, useRef } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Badge } from '@/components/ui/badge';
import { Checkbox } from '@/components/ui/checkbox';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Upload, Trash2, FileText, Loader2 } from 'lucide-react';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';
import { useAuth } from '@/contexts/AuthContext';

export type DocumentType = 'autotelex' | 'schadecalculatie' | 'overig';

export type DocumentTag = 'algemene_info' | 'handelswaarde' | 'verkoopwaarde' | 'schadecalculatie';

const documentTagLabels: Record<DocumentTag, string> = {
  algemene_info: 'Algemene info',
  handelswaarde: 'Handelswaarde',
  verkoopwaarde: 'Verkoopwaarde',
  schadecalculatie: 'Schadecalculatie',
};

const ALL_TAGS: DocumentTag[] = ['algemene_info', 'handelswaarde', 'verkoopwaarde', 'schadecalculatie'];

export interface WevDocument {
  id: string;
  document_type: DocumentType;
  document_tags: DocumentTag[];
  file_name: string;
  file_url: string;
  file_size: number | null;
  uploaded_at: string;
}

interface WevDocumentUploadFormProps {
  reportId: string;
  onDocumentsChange?: (documents: WevDocument[]) => void;
}

const documentTypeLabels: Record<DocumentType, string> = {
  autotelex: 'Waardebepaling Autotelex',
  schadecalculatie: 'Schadecalculatie (SilverDAT / Zilver.pro)',
  overig: 'Overige onderbouwing',
};

export const WevDocumentUploadForm = ({
  reportId,
  onDocumentsChange,
}: WevDocumentUploadFormProps) => {
  const { toast } = useToast();
  const { user } = useAuth();
  const [documents, setDocuments] = useState<WevDocument[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isUploading, setIsUploading] = useState(false);
  const [selectedDocType, setSelectedDocType] = useState<DocumentType>('autotelex');
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Fetch existing documents
  const fetchDocuments = useCallback(async () => {
    if (!reportId) return;
    
    try {
      const { data, error } = await supabase
        .from('wev_documents')
        .select('*')
        .eq('report_id', reportId)
        .order('uploaded_at', { ascending: false });

      if (error) throw error;
      
      const docs = (data || []) as WevDocument[];
      setDocuments(docs);
      onDocumentsChange?.(docs);
    } catch (error) {
      console.error('Error fetching WEV documents:', error);
    } finally {
      setIsLoading(false);
    }
  }, [reportId, onDocumentsChange]);

  useEffect(() => {
    fetchDocuments();
  }, [fetchDocuments]);

  const handleFileUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file || !reportId) return;

    // Validate file type (PDF, images)
    const allowedTypes = ['application/pdf', 'image/jpeg', 'image/png', 'image/webp'];
    if (!allowedTypes.includes(file.type)) {
      toast({
        title: 'Ongeldig bestandstype',
        description: 'Alleen PDF, JPG, PNG en WebP bestanden zijn toegestaan.',
        variant: 'destructive',
      });
      return;
    }

    // Validate file size (max 10MB)
    if (file.size > 10 * 1024 * 1024) {
      toast({
        title: 'Bestand te groot',
        description: 'Maximale bestandsgrootte is 10MB.',
        variant: 'destructive',
      });
      return;
    }

    setIsUploading(true);

    try {
      // Generate unique file path (must start with user_id per storage RLS policy)
      const fileExt = file.name.split('.').pop();
      const userId = user?.id;
      if (!userId) throw new Error('Niet ingelogd');
      const fileName = `${userId}/${reportId}/wev-docs/${Date.now()}-${selectedDocType}.${fileExt}`;

      // Upload to storage
      const { error: uploadError } = await supabase.storage
        .from('report-photos')
        .upload(fileName, file);

      if (uploadError) throw uploadError;

      // Get public URL
      const { data: urlData } = supabase.storage
        .from('report-photos')
        .getPublicUrl(fileName);

      // Save document record
      const { data: docData, error: docError } = await supabase
        .from('wev_documents')
        .insert({
          report_id: reportId,
          document_type: selectedDocType,
          file_name: file.name,
          file_url: urlData.publicUrl,
          file_size: file.size,
        })
        .select()
        .single();

      if (docError) throw docError;

      const newDoc = docData as WevDocument;
      const updatedDocs = [newDoc, ...documents];
      setDocuments(updatedDocs);
      onDocumentsChange?.(updatedDocs);

      toast({
        title: 'Document geüpload',
        description: `${file.name} is succesvol toegevoegd.`,
      });
    } catch (error) {
      console.error('Error uploading document:', error);
      toast({
        title: 'Fout bij uploaden',
        description: 'Er is een fout opgetreden bij het uploaden van het document.',
        variant: 'destructive',
      });
    } finally {
      setIsUploading(false);
      // Reset the file input
      event.target.value = '';
    }
  };

  const handleDeleteDocument = async (doc: WevDocument) => {
    try {
      // Delete from database
      const { error: dbError } = await supabase
        .from('wev_documents')
        .delete()
        .eq('id', doc.id);

      if (dbError) throw dbError;

      // Extract file path from URL and delete from storage
      const urlParts = doc.file_url.split('/report-photos/');
      if (urlParts.length > 1) {
        await supabase.storage
          .from('report-photos')
          .remove([urlParts[1]]);
      }

      const updatedDocs = documents.filter((d) => d.id !== doc.id);
      setDocuments(updatedDocs);
      onDocumentsChange?.(updatedDocs);

      toast({
        title: 'Document verwijderd',
        description: `${doc.file_name} is verwijderd.`,
      });
    } catch (error) {
      console.error('Error deleting document:', error);
      toast({
        title: 'Fout bij verwijderen',
        description: 'Er is een fout opgetreden bij het verwijderen van het document.',
        variant: 'destructive',
      });
    }
  };

  const handleToggleTag = async (doc: WevDocument, tag: DocumentTag) => {
    const currentTags = doc.document_tags || [];
    const newTags = currentTags.includes(tag)
      ? currentTags.filter((t) => t !== tag)
      : [...currentTags, tag];

    try {
      const { error } = await supabase
        .from('wev_documents')
        .update({ document_tags: newTags })
        .eq('id', doc.id);

      if (error) throw error;

      const updatedDocs = documents.map((d) =>
        d.id === doc.id ? { ...d, document_tags: newTags as DocumentTag[] } : d
      );
      setDocuments(updatedDocs);
      onDocumentsChange?.(updatedDocs);
    } catch (error) {
      console.error('Error updating document tags:', error);
      toast({
        title: 'Fout bij opslaan',
        description: 'Tags konden niet worden opgeslagen.',
        variant: 'destructive',
      });
    }

  const formatFileSize = (bytes: number | null): string => {
    if (!bytes) return '-';
    if (bytes < 1024) return `${bytes} B`;
    if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`;
    return `${(bytes / (1024 * 1024)).toFixed(1)} MB`;
  };

  const formatDate = (dateStr: string): string => {
    return new Date(dateStr).toLocaleDateString('nl-NL', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    });
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-lg">Taxatiebestanden</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <p className="text-sm text-muted-foreground">
          Upload hier de onderliggende documenten voor de waardebepaling, zoals Autotelex-rapporten of schadecalculaties.
        </p>

        {/* Upload section */}
        <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-end">
          <div className="space-y-2 flex-1">
            <Label htmlFor="doc_type">Type document</Label>
            <Select
              value={selectedDocType}
              onValueChange={(v) => setSelectedDocType(v as DocumentType)}
            >
              <SelectTrigger className="w-full sm:w-[280px]">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="autotelex">Waardebepaling Autotelex</SelectItem>
                <SelectItem value="schadecalculatie">Schadecalculatie (SilverDAT / Zilver.pro)</SelectItem>
                <SelectItem value="overig">Overige onderbouwing</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div>
            <Label htmlFor="file_upload" className="sr-only">Bestand uploaden</Label>
            <input
              ref={fileInputRef}
              id="file_upload"
              type="file"
              accept=".pdf,.jpg,.jpeg,.png,.webp"
              onChange={handleFileUpload}
              className="hidden"
              disabled={isUploading || !reportId}
            />
            <Button
              type="button"
              variant="outline"
              disabled={isUploading || !reportId}
              onClick={(e) => {
                e.preventDefault();
                e.stopPropagation();
                fileInputRef.current?.click();
              }}
            >
              {isUploading ? (
                <Loader2 className="h-4 w-4 mr-2 animate-spin" />
              ) : (
                <Upload className="h-4 w-4 mr-2" />
              )}
              {isUploading ? 'Uploaden...' : 'Document uploaden'}
            </Button>
          </div>
        </div>

        {/* Document list */}
        {isLoading ? (
          <div className="flex items-center justify-center py-8">
            <Loader2 className="h-6 w-6 animate-spin text-muted-foreground" />
          </div>
        ) : documents.length === 0 ? (
          <div className="text-center py-8 text-muted-foreground">
            <FileText className="h-12 w-12 mx-auto mb-2 opacity-50" />
            <p>Nog geen documenten geüpload</p>
          </div>
        ) : (
          <div className="space-y-2">
            {documents.map((doc) => (
              <div
                key={doc.id}
                className="flex items-center justify-between p-3 bg-muted/50 rounded-lg"
              >
                <div className="flex items-center gap-3 min-w-0 flex-1">
                  <FileText className="h-5 w-5 text-muted-foreground shrink-0" />
                  <div className="min-w-0">
                    <a
                      href={doc.file_url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="font-medium text-sm hover:underline truncate block"
                    >
                      {doc.file_name}
                    </a>
                    <div className="flex items-center gap-2 text-xs text-muted-foreground">
                      <Badge variant="secondary" className="text-xs">
                        {documentTypeLabels[doc.document_type]}
                      </Badge>
                      <span>{formatFileSize(doc.file_size)}</span>
                      <span>•</span>
                      <span>{formatDate(doc.uploaded_at)}</span>
                    </div>
                  </div>
                </div>
                <Button
                  type="button"
                  variant="ghost"
                  size="icon"
                  onClick={() => handleDeleteDocument(doc)}
                  className="shrink-0 text-destructive hover:text-destructive"
                >
                  <Trash2 className="h-4 w-4" />
                </Button>
              </div>
            ))}
          </div>
        )}

        <p className="text-xs text-muted-foreground">
          Toegestane formaten: PDF, JPG, PNG, WebP. Maximale grootte: 10MB per bestand.
        </p>
      </CardContent>
    </Card>
  );
};

export default WevDocumentUploadForm;
