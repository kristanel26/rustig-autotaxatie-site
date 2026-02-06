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

  // Determine report type
  const reportType = report.report_type || 'camper';
  const isCamperReport = reportType === 'camper';
  const isWevReport = reportType === 'wev';
  const isKlassiekerReport = reportType === 'klassieker';
  
  // ARCHITECTURE: Waardevaststelling is ALWAYS page 2, regardless of report type or value
  // Page 2 never renders conditionally based on hasValue checks
  const showValuationPage = true; // Always render
  
  // Calculate total pages dynamically
  // FIXED SEQUENCE: Cover → Waardevaststelling → Vehicle Data → Appraisal Findings (if not klassieker) → Photos
  let totalPagesCount = 1; // Cover
  totalPagesCount++; // Waardevaststelling is always page 2
  totalPagesCount++; // Vehicle data
  if (!isKlassiekerReport) totalPagesCount++; // Appraisal findings (not for klassieker)
  
  // Photo pages
  const detailPhotos = report.vehicle_photos?.slice(1) || [];
  const photoPages = Math.ceil(detailPhotos.length / 6);
  totalPagesCount += photoPages;

  // Calculate page numbers - fixed sequence
  const coverPage = 1;
  const valuationPage = 2; // ALWAYS page 2
  const vehicleDataPage = 3;
  const appraisalFindingsPage = !isKlassiekerReport ? 4 : 0;
  const photoStartPage = !isKlassiekerReport ? 5 : 4;

  return (
    <div 
      className="bg-muted min-h-screen py-4"
      style={{ fontFamily: 'Helvetica, Arial, sans-serif' }}
    >
      {/* Fixed A4 viewport container - prevents layout reflow */}
      <div 
        className="max-w-[210mm] mx-auto space-y-4"
        style={{ 
          width: '210mm',
          // Ensure stable layout by setting explicit dimensions
        }}
      >
        {/* Page 1: Cover */}
        <div className="shadow-lg" style={{ width: '210mm', height: '297mm', overflow: 'hidden' }}>
          <PDFCoverContent report={report} />
        </div>

        {/* Page 2: Waardevaststelling - ALWAYS renders, never conditional */}
        {showValuationPage && (
          <>
            {/* Render appropriate valuation component based on report type */}
            {isCamperReport && (
              <div className="shadow-lg" style={{ width: '210mm', height: '297mm' }}>
                <PDFValuationContent report={report} pageNumber={valuationPage} totalPages={totalPagesCount} />
              </div>
            )}
            
            {isWevReport && (
              <div className="shadow-lg" style={{ width: '210mm', height: '297mm' }}>
                <PDFWevValuationContent report={report} pageNumber={valuationPage} totalPages={totalPagesCount} />
              </div>
            )}
            
            {isKlassiekerReport && (
              <div className="shadow-lg" style={{ width: '210mm', height: '297mm' }}>
                <PDFKlassiekerValuationContent report={report} pageNumber={valuationPage} totalPages={totalPagesCount} />
              </div>
            )}
          </>
        )}

        {/* Page 3: Vehicle Data */}
        <div className="shadow-lg" style={{ width: '210mm', minHeight: '297mm' }}>
          <PDFVehicleDataContent report={report} pageNumber={vehicleDataPage} totalPages={totalPagesCount} />
        </div>

        {/* Page 4: Appraisal Findings (only for non-klassieker reports) */}
        {!isKlassiekerReport && (
          <div className="shadow-lg" style={{ width: '210mm', minHeight: '297mm' }}>
            <PDFAppraisalFindingsContent report={report} pageNumber={appraisalFindingsPage} />
          </div>
        )}

        {/* Photo Annex (starting after appraisal findings) */}
        <PDFPhotosContent report={report} startPageNumber={photoStartPage} totalPages={totalPagesCount} />
      </div>
    </div>
  );
};

export default PDFPreview;
