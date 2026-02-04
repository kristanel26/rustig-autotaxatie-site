import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { supabase } from '@/integrations/supabase/client';

// PDF Content Components
import PDFCoverContent from '@/components/internal/pdf/PDFCoverContent';
import PDFVehicleDataContent from '@/components/internal/pdf/PDFVehicleDataContent';
import PDFAppraisalFindingsContent from '@/components/internal/pdf/PDFAppraisalFindingsContent';
import PDFValuationContent from '@/components/internal/pdf/PDFValuationContent';
import PDFWevValuationContent from '@/components/internal/pdf/PDFWevValuationContent';
import PDFKlassiekerValuationContent from '@/components/internal/pdf/PDFKlassiekerValuationContent';
import PDFPhotosContent from '@/components/internal/pdf/PDFPhotosContent';

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

  // Determine report type and which valuations are present
  const reportType = report.report_type || 'camper';
  const isCamperReport = reportType === 'camper';
  const isWevReport = reportType === 'wev';
  const isKlassiekerReport = reportType === 'klassieker';
  
  // Show valuations based on report type
  const hasStandardValuation = isCamperReport && report.appraised_value && report.appraised_value > 0;
  const hasWevValuation = isWevReport && (report.wev_eindwaarde || report.wev_definitief) && ((report.wev_eindwaarde || report.wev_definitief) > 0);
  const hasKlassiekerValuation = isKlassiekerReport && report.appraised_value && report.appraised_value > 0;
  
  // Calculate page numbers dynamically
  let currentPage = 1; // Cover is page 1
  
  const standardValuationPage = hasStandardValuation ? ++currentPage : 0;
  const wevValuationPage = hasWevValuation ? ++currentPage : 0;
  const klassiekerValuationPage = hasKlassiekerValuation ? ++currentPage : 0;
  const vehicleDataPage = ++currentPage;
  const appraisalFindingsPage = !isKlassiekerReport ? ++currentPage : 0;

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

        {/* Standard Valuation (camper) */}
        {hasStandardValuation && (
          <div className="shadow-lg">
            <PDFValuationContent report={report} pageNumber={standardValuationPage} totalPages={10} />
          </div>
        )}

        {/* WEV Valuation */}
        {hasWevValuation && (
          <div className="shadow-lg">
            <PDFWevValuationContent report={report} pageNumber={wevValuationPage} totalPages={10} />
          </div>
        )}

        {/* Klassieker Valuation */}
        {hasKlassiekerValuation && (
          <div className="shadow-lg">
            <PDFKlassiekerValuationContent report={report} pageNumber={klassiekerValuationPage} totalPages={10} />
          </div>
        )}

        {/* Vehicle Data */}
        <div className="shadow-lg">
          <PDFVehicleDataContent report={report} pageNumber={vehicleDataPage} />
        </div>

        {/* Appraisal Findings (not for klassieker - they use general impression in PDF) */}
        {!isKlassiekerReport && (
          <div className="shadow-lg">
            <PDFAppraisalFindingsContent report={report} pageNumber={appraisalFindingsPage} />
          </div>
        )}

        {/* Photo Annex (conditional) */}
        <PDFPhotosContent report={report} />
      </div>
    </div>
  );
};

export default PDFPreview;
