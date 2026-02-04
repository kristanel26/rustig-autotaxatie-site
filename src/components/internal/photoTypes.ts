// Photo type definitions per report type
// This is the central source of truth for photo tags

export type PhotoType =
  // Common types (shared across report types)
  | 'kenteken'
  | 'vin_typeplaat'
  | 'vin_ruit'
  | 'dashboard'  // internal key - displayed as "Km-stand" in UI for klassieker
  | 'band_voor_links'
  | 'band_voor_rechts'
  | 'band_achter_links'
  | 'band_achter_rechts'
  | 'typeplaat_massa'
  // Camper-specific
  | 'gasinstallatie'
  // Klassieker-specific
  | 'voetenruimte_pedalen'
  | 'versnellingspook';

export type ReportType = 'camper' | 'wev' | 'klassieker';

// Extraction section mapping - which section to extract for each photo type
export type ExtractSection = 'voertuigidentificatie' | 'tellerstand' | 'banden' | 'massa' | 'gasinstallatie';

export const PHOTO_TYPE_TO_SECTION: Record<PhotoType, ExtractSection | null> = {
  kenteken: 'voertuigidentificatie',
  vin_typeplaat: 'voertuigidentificatie',
  vin_ruit: 'voertuigidentificatie',
  dashboard: 'tellerstand',
  band_voor_links: 'banden',
  band_voor_rechts: 'banden',
  band_achter_links: 'banden',
  band_achter_rechts: 'banden',
  typeplaat_massa: 'massa',
  gasinstallatie: 'gasinstallatie',
  // New klassieker types - no extraction (visual only for now)
  voetenruimte_pedalen: null,
  versnellingspook: null,
};

// Labels shown in UI - can differ per report type
export const PHOTO_TYPE_LABELS: Record<PhotoType, string> = {
  kenteken: 'Kenteken',
  dashboard: 'Km-stand', // Was "Dashboard" - now shown as "Km-stand" 
  vin_typeplaat: 'VIN Typeplaat',
  vin_ruit: 'VIN Ruit',
  band_voor_links: 'Band LV',
  band_voor_rechts: 'Band RV',
  band_achter_links: 'Band LA',
  band_achter_rechts: 'Band RA',
  typeplaat_massa: 'Typeplaat Massa',
  gasinstallatie: 'Gasinstallatie',
  voetenruimte_pedalen: 'Voetenruimte/Pedalen',
  versnellingspook: 'Versnellingspook',
};

// Which photo types are available per report type
export const PHOTO_TYPES_BY_REPORT: Record<ReportType, PhotoType[]> = {
  klassieker: [
    'kenteken',
    'vin_typeplaat',
    'vin_ruit',
    'dashboard',  // shows as "Km-stand"
    'band_voor_links',
    'band_voor_rechts',
    'band_achter_links',
    'band_achter_rechts',
    'voetenruimte_pedalen',
    'versnellingspook',
  ],
  camper: [
    'kenteken',
    'dashboard',
    'vin_typeplaat',
    'vin_ruit',
    'band_voor_links',
    'band_voor_rechts',
    'band_achter_links',
    'band_achter_rechts',
    'typeplaat_massa',
    'gasinstallatie',
  ],
  wev: [
    'kenteken',
    'dashboard',
    'vin_typeplaat',
    'vin_ruit',
    'band_voor_links',
    'band_voor_rechts',
    'band_achter_links',
    'band_achter_rechts',
    'typeplaat_massa',
  ],
};

// Get label for a photo type - optionally with report type context
export function getPhotoTypeLabel(type: PhotoType, _reportType?: ReportType): string {
  return PHOTO_TYPE_LABELS[type];
}

// Get available photo types for a report type
export function getPhotoTypesForReport(reportType: ReportType | null): PhotoType[] {
  if (!reportType) {
    // Default to camper if no report type selected
    return PHOTO_TYPES_BY_REPORT.camper;
  }
  return PHOTO_TYPES_BY_REPORT[reportType];
}

// Field key mappings - which form field each extraction result should update
export interface FieldMapping {
  fieldKey: string;
  formSection: 'vehicle' | 'appraisal' | 'inspection' | 'moisture';
  displayLabel: string;
}

export const EXTRACTION_FIELD_MAPPINGS: Record<string, FieldMapping> = {
  // Vehicle identification
  license_plate: { fieldKey: 'license_plate', formSection: 'vehicle', displayLabel: 'Kenteken' },
  vin: { fieldKey: 'vin', formSection: 'vehicle', displayLabel: 'Chassisnummer' },
  
  // Tellerstand
  tellerstand: { fieldKey: 'tellerstand', formSection: 'vehicle', displayLabel: 'Kilometerstand' },
  
  // Tire data (per position)
  tire_size: { fieldKey: 'tire_bandenmaat', formSection: 'appraisal', displayLabel: 'Bandenmaat' },
  tire_dot: { fieldKey: 'tire_front_left_dot', formSection: 'appraisal', displayLabel: 'DOT-code' },
  
  // Massa
  max_massa: { fieldKey: 'rdw_max_massa', formSection: 'vehicle', displayLabel: 'Toegestane max massa' },
  
  // Gas installation
  gas_type: { fieldKey: 'lpg_underbody', formSection: 'moisture', displayLabel: 'Type gasinstallatie' },
  gas_hose_date: { fieldKey: 'gas_hose_production_date', formSection: 'moisture', displayLabel: 'Gasslang productiedatum' },
  pressure_regulator_date: { fieldKey: 'pressure_regulator_production_date', formSection: 'moisture', displayLabel: 'Drukregelaar productiedatum' },
};
