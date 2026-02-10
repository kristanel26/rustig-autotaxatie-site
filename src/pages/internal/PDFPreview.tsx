import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { supabase } from '@/integrations/supabase/client';
import { PDFViewer } from '@react-pdf/renderer';
import PdfRenderer from '@/components/internal/pdf/PdfRenderer';

interface PhotoRotations {
  [url: string]: number;
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
type ReportData = Record<string, any> & {
  id: string;
  report_number: string;
  report_type: string | null;
  document_reference: string | null;
  appraised_value: number | null;
  wev_definitief: number | null;
  vehicle_photos: string[] | null;
  vehicle_photo_rotations: PhotoRotations | null;
};

const PDFPreview = () => {
  const { id } = useParams<{ id: string }>();
  const [report, setReport] = useState<ReportData | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchReport = async () => {
      if (!id) {
        setLoading(false);
        return;
      }

      try {
        const { data, error } = await supabase
          .from('reports')
          .select('*')
          .eq('id', id)
          .single();

        if (error) throw error;
        setReport(data as ReportData);
      } catch (error) {
        console.error('Error fetching report:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchReport();
  }, [id]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-muted">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
      </div>
    );
  }

  if (!report) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-muted">
        <p className="text-muted-foreground">Rapport niet gevonden.</p>
      </div>
    );
  }

  return (
    <div style={{ width: '100vw', height: '100vh' }}>
      <PDFViewer width="100%" height="100%" style={{ border: 'none' }} showToolbar={true}>
        <PdfRenderer report={report} />
      </PDFViewer>
    </div>
  );
};

export default PDFPreview;
