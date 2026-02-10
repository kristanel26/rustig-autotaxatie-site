/**
 * PdfRenderer — Unified renderer for PDF preview and export.
 * 
 * Uses the page registry + builder to render all pages in the correct order.
 * Pages are NEVER conditionally omitted. Missing data = placeholders.
 */

import { Suspense } from 'react';
import { buildPdfPages } from '@/lib/pdf-builder';

interface PdfRendererProps {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  report: Record<string, any>;
}

const PdfRenderer = ({ report }: PdfRendererProps) => {
  const { pages, totalPages } = buildPdfPages(report);

  return (
    <div 
      className="bg-muted min-h-screen py-4"
      style={{ fontFamily: 'Helvetica, Arial, sans-serif' }}
    >
      <div 
        className="max-w-[210mm] mx-auto space-y-4"
        style={{ width: '210mm' }}
      >
        <Suspense fallback={null}>
          {pages.map((builtPage) => {
            const PageComponent = builtPage.definition.component;
            const isPhotos = builtPage.definition.id === 'photos';
            const isCover = builtPage.definition.id === 'cover';

            // Photos component handles its own multi-page rendering
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

            // Cover page has its own totalPages prop format
            if (isCover) {
              return (
                <div key={builtPage.definition.id} className="shadow-lg" style={{ width: '210mm', height: '297mm', overflow: 'hidden' }}>
                  <PageComponent
                    report={report}
                    totalPages={totalPages}
                  />
                </div>
              );
            }

            // Standard single-page components
            return (
              <div key={builtPage.definition.id} className="shadow-lg" style={{ width: '210mm', minHeight: '297mm' }}>
                <PageComponent
                  report={report}
                  pageNumber={builtPage.pageNumber}
                  totalPages={totalPages}
                />
              </div>
            );
          })}
        </Suspense>
      </div>
    </div>
  );
};

export default PdfRenderer;
