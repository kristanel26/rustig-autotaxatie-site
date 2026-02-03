import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { supabase } from '@/integrations/supabase/client';

// PDF Content Components
import PDFCoverContent from '@/components/internal/pdf/PDFCoverContent';
import PDFVehicleDataContent from '@/components/internal/pdf/PDFVehicleDataContent';
import PDFAppraisalFindingsContent from '@/components/internal/pdf/PDFAppraisalFindingsContent';
import PDFValuationContent from '@/components/internal/pdf/PDFValuationContent';
import PDFPhotosContent from '@/components/internal/pdf/PDFPhotosContent';

interface PhotoRotations {
  [url: string]: number;
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
type ReportData = Record<string, any> & {
  id: string;
  report_number: string;
  document_reference: string | null;
  appraised_value: number | null;
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

  const hasValuation = report.appraised_value && report.appraised_value > 0;
  const valuationPageNumber = hasValuation ? 2 : 0;
  const vehicleDataPageNumber = hasValuation ? 3 : 2;
  const appraisalFindingsPageNumber = hasValuation ? 4 : 3;

  return (
    <div 
      className="bg-muted min-h-screen py-4"
      style={{ fontFamily: 'Inter, system-ui, sans-serif' }}
    >
      <div className="max-w-[210mm] mx-auto space-y-4">
        {/* Page 1: Cover */}
        <div className="shadow-lg">
          <PDFCoverContent report={report} />
        </div>

        {/* Page 2: Valuation (conditional) - right after cover */}
        {hasValuation && (
          <div className="shadow-lg">
            <PDFValuationContent report={report} pageNumber={valuationPageNumber} />
          </div>
        )}

        {/* Page 3: Vehicle Data */}
        <div className="shadow-lg">
          <PDFVehicleDataContent report={report} pageNumber={vehicleDataPageNumber} />
        </div>

        {/* Page 4: Appraisal Findings */}
        <div className="shadow-lg">
          <PDFAppraisalFindingsContent report={report} pageNumber={appraisalFindingsPageNumber} />
        </div>

        {/* Photo Annex (conditional) */}
        <PDFPhotosContent report={report} />
      </div>
    </div>
  );
};

export default PDFPreview;
