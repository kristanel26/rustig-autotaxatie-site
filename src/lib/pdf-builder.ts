/**
 * PDF Page Builder
 * 
 * Builds the final page list with computed page numbers.
 * This is the SINGLE SOURCE OF TRUTH for page numbering.
 * Both preview and export use this same function.
 */

import { getPageRegistry, type PageDefinition } from './pdf-config';

export interface BuiltPage {
  /** Page definition from the registry */
  definition: PageDefinition;
  /** 1-based page number */
  pageNumber: number;
}

export interface BuildResult {
  /** Ordered list of pages to render */
  pages: BuiltPage[];
  /** Total number of pages (including multi-page expansions like photos) */
  totalPages: number;
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function buildPdfPages(report: Record<string, any>): BuildResult {
  const reportType = report.report_type || 'camper';
  const registry = getPageRegistry(reportType);

  // Calculate total pages, accounting for multi-page components (photos)
  let totalPages = 0;
  
  for (const pageDef of registry) {
    if (pageDef.isMultiPage && pageDef.id === 'photos') {
      // Photo pages: all photos in a 2x3 grid (6 per page)
      const allPhotos = (report.vehicle_photos || []).filter((url: string) => url && url.trim() !== '');
      const photoPageCount = Math.max(1, Math.ceil(allPhotos.length / 6));
      totalPages += photoPageCount;
    } else {
      totalPages += 1;
    }
  }

  // Build page list with sequential numbering
  const pages: BuiltPage[] = [];
  let currentPage = 1;

  for (const pageDef of registry) {
    pages.push({
      definition: pageDef,
      pageNumber: currentPage,
    });

    if (pageDef.isMultiPage && pageDef.id === 'photos') {
      const allPhotos = (report.vehicle_photos || []).filter((url: string) => url && url.trim() !== '');
      const photoPageCount = Math.max(1, Math.ceil(allPhotos.length / 6));
      currentPage += photoPageCount;
    } else {
      currentPage += 1;
    }
  }

  return { pages, totalPages };
}
