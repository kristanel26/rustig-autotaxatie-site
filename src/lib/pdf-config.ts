/**
 * PDF Page Registry
 * 
 * Defines the FIXED page sequence for each report type.
 * Pages are NEVER conditional — they always render.
 * Missing data = placeholders inside the page component.
 */

import { lazy } from 'react';

// Lazy imports for page components
const PDFCoverContent = lazy(() => import('@/components/internal/pdf/PDFCoverContent'));
const PDFValuationContent = lazy(() => import('@/components/internal/pdf/PDFValuationContent'));
const PDFWevValuationContent = lazy(() => import('@/components/internal/pdf/PDFWevValuationContent'));
const PDFKlassiekerValuationContent = lazy(() => import('@/components/internal/pdf/PDFKlassiekerValuationContent'));
const PDFVehicleDataContent = lazy(() => import('@/components/internal/pdf/PDFVehicleDataContent'));
const PDFAppraisalFindingsContent = lazy(() => import('@/components/internal/pdf/PDFAppraisalFindingsContent'));
const PDFPhotosContent = lazy(() => import('@/components/internal/pdf/PDFPhotosContent'));

export type ReportType = 'camper' | 'wev' | 'klassieker';

export interface PageDefinition {
  /** Unique page identifier */
  id: string;
  /** React component to render this page */
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  component: React.LazyExoticComponent<React.ComponentType<any>>;
  /** Whether this page can produce multiple physical pages (e.g. photo annex) */
  isMultiPage?: boolean;
}

/**
 * Klassieker report: Cover → Valuation → Vehicle Data → Photos
 * No appraisal findings page for klassieker.
 */
export const KLASSIEKER_PAGES: PageDefinition[] = [
  { id: 'cover', component: PDFCoverContent },
  { id: 'valuation', component: PDFKlassiekerValuationContent },
  { id: 'vehicle-data', component: PDFVehicleDataContent },
  { id: 'photos', component: PDFPhotosContent, isMultiPage: true },
];

/**
 * Camper report: Cover → Valuation → Vehicle Data → Appraisal Findings → Photos
 */
export const CAMPER_PAGES: PageDefinition[] = [
  { id: 'cover', component: PDFCoverContent },
  { id: 'valuation', component: PDFValuationContent },
  { id: 'vehicle-data', component: PDFVehicleDataContent },
  { id: 'appraisal-findings', component: PDFAppraisalFindingsContent },
  { id: 'photos', component: PDFPhotosContent, isMultiPage: true },
];

/**
 * WEV report: Cover → Valuation → Vehicle Data → Appraisal Findings → Photos
 */
export const WEV_PAGES: PageDefinition[] = [
  { id: 'cover', component: PDFCoverContent },
  { id: 'valuation', component: PDFWevValuationContent },
  { id: 'vehicle-data', component: PDFVehicleDataContent },
  { id: 'appraisal-findings', component: PDFAppraisalFindingsContent },
  { id: 'photos', component: PDFPhotosContent, isMultiPage: true },
];

/**
 * Get the page registry for a given report type.
 */
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
