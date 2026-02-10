/**
 * PDF Page Registry
 * 
 * Defines the FIXED page sequence for each report type.
 * Pages are NEVER conditional — they always render.
 * Missing data = placeholders inside the page component.
 * 
 * NOTE: Using direct imports (not lazy) because @react-pdf/renderer
 * requires synchronous component resolution within <Document>.
 */

import PDFCoverContent from '@/components/internal/pdf/PDFCoverContent';
import PDFValuationContent from '@/components/internal/pdf/PDFValuationContent';
import PDFWevValuationContent from '@/components/internal/pdf/PDFWevValuationContent';
import PDFKlassiekerValuationContent from '@/components/internal/pdf/PDFKlassiekerValuationContent';
import PDFVehicleDataContent from '@/components/internal/pdf/PDFVehicleDataContent';
import PDFAppraisalFindingsContent from '@/components/internal/pdf/PDFAppraisalFindingsContent';
import PDFPhotosContent from '@/components/internal/pdf/PDFPhotosContent';

export type ReportType = 'camper' | 'wev' | 'klassieker';

export interface PageDefinition {
  /** Unique page identifier */
  id: string;
  /** React component to render this page */
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  component: React.ComponentType<any>;
  /** Whether this page can produce multiple physical pages (e.g. photo annex) */
  isMultiPage?: boolean;
}

export const KLASSIEKER_PAGES: PageDefinition[] = [
  { id: 'cover', component: PDFCoverContent },
  { id: 'valuation', component: PDFKlassiekerValuationContent },
  { id: 'vehicle-data', component: PDFVehicleDataContent },
  { id: 'photos', component: PDFPhotosContent, isMultiPage: true },
];

export const CAMPER_PAGES: PageDefinition[] = [
  { id: 'cover', component: PDFCoverContent },
  { id: 'valuation', component: PDFValuationContent },
  { id: 'vehicle-data', component: PDFVehicleDataContent },
  { id: 'appraisal-findings', component: PDFAppraisalFindingsContent },
  { id: 'photos', component: PDFPhotosContent, isMultiPage: true },
];

export const WEV_PAGES: PageDefinition[] = [
  { id: 'cover', component: PDFCoverContent },
  { id: 'valuation', component: PDFWevValuationContent },
  { id: 'vehicle-data', component: PDFVehicleDataContent },
  { id: 'appraisal-findings', component: PDFAppraisalFindingsContent },
  { id: 'photos', component: PDFPhotosContent, isMultiPage: true },
];

export function getPageRegistry(reportType: ReportType | string | null): PageDefinition[] {
  switch (reportType) {
    case 'klassieker':
      return KLASSIEKER_PAGES;
    case 'wev':
      return WEV_PAGES;
    case 'camper':
    default:
      return CAMPER_PAGES;
  }
}
