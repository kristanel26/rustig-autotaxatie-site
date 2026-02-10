/**
 * PdfRenderer — Unified renderer for PDF preview and export.
 * 
 * Uses @react-pdf/renderer Document wrapper.
 * Pages are NEVER conditionally omitted. Missing data = placeholders.
 */

import { Document } from '@react-pdf/renderer';
import { buildPdfPages } from '@/lib/pdf-builder';

interface PdfRendererProps {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  report: Record<string, any>;
}

const PdfRenderer = ({ report }: PdfRendererProps) => {
  const { pages, totalPages } = buildPdfPages(report);

  return (
    <Document
      title={`Taxatierapport ${report.report_number || ''}`}
      author="Automobiel Taxaties"
      subject={`${report.rdw_merk || ''} ${report.rdw_handelsbenaming || ''} - ${report.license_plate || ''}`}
      creator="Automobiel Taxaties"
      producer="Automobiel Taxaties"
    >
      {pages.map((builtPage) => {
        const PageComponent = builtPage.definition.component;
        const isPhotos = builtPage.definition.id === 'photos';
        const isCover = builtPage.definition.id === 'cover';

        if (isPhotos) {
          return (
            <PageComponent
              key={builtPage.definition.id}
              report={report}
              startPageNumber={builtPage.pageNumber}
              totalPages={totalPages}
            />
          );
        }

        if (isCover) {
          return (
            <PageComponent
              key={builtPage.definition.id}
              report={report}
              totalPages={totalPages}
            />
          );
        }

        return (
          <PageComponent
            key={builtPage.definition.id}
            report={report}
            pageNumber={builtPage.pageNumber}
            totalPages={totalPages}
          />
        );
      })}
    </Document>
  );
};

export default PdfRenderer;
