// Photo type definitions per report type
// This is the central source of truth for photo tags

export type PhotoType =
  // Common types (shared across report types)
  | 'kenteken'
  | 'vin'  // Combined VIN tag (replaces vin_typeplaat and vin_ruit)
  | 'vin_typeplaat'  // Legacy - still supported but mapped to 'vin'
  | 'vin_ruit'       // Legacy - still supported but mapped to 'vin'
  | 'dashboard'      // internal key - displayed as "Km-stand" in UI
  | 'band_voor_links'
  | 'band_voor_rechts'
  | 'band_achter_links'
  | 'band_achter_rechts'
  | 'typeplaat_massa'
  // Camper-specific
  | 'gasinstallatie'
  // Klassieker-specific - transmissie
  | 'transmissie';  // Single tag for transmission (replaces pedalen/pook)

export type ReportType = 'camper' | 'wev' | 'klassieker';

// Extraction section mapping - which section to extract for each photo type
export type ExtractSection = 'voertuigidentificatie' | 'tellerstand' | 'banden' | 'massa' | 'gasinstallatie' | 'transmissie';

export const PHOTO_TYPE_TO_SECTION: Record<PhotoType, ExtractSection | null> = {
  kenteken: 'voertuigidentificatie',
  vin: 'voertuigidentificatie',
  vin_typeplaat: 'voertuigidentificatie',  // Legacy
  vin_ruit: 'voertuigidentificatie',       // Legacy
  dashboard: 'tellerstand',
  band_voor_links: 'banden',
  band_voor_rechts: 'banden',
  band_achter_links: 'banden',
  band_achter_rechts: 'banden',
  typeplaat_massa: 'massa',
  gasinstallatie: 'gasinstallatie',
  transmissie: 'transmissie',
};

// Labels shown in UI - can differ per report type
export const PHOTO_TYPE_LABELS: Record<PhotoType, string> = {
  kenteken: 'Kenteken',
  vin: 'VIN / Chassisnummer',
  vin_typeplaat: 'VIN Typeplaat',   // Legacy
  vin_ruit: 'VIN Ruit',              // Legacy
  dashboard: 'Km-stand',
  band_voor_links: 'Band LV',
  band_voor_rechts: 'Band RV',
  band_achter_links: 'Band LA',
  band_achter_rechts: 'Band RA',
  typeplaat_massa: 'Typeplaat Massa',
  gasinstallatie: 'Gasinstallatie',
  transmissie: 'Transmissie',
};

// Which photo types are available per report type
export const PHOTO_TYPES_BY_REPORT: Record<ReportType, PhotoType[]> = {
  klassieker: [
    'kenteken',
    'vin',              // Simplified single VIN tag
    'dashboard',        // shows as "Km-stand"
    'band_voor_links',
    'band_voor_rechts',
    'band_achter_links',
    'band_achter_rechts',
    'transmissie',      // Single transmissie tag
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
  
  // Transmissie
  transmissie: { fieldKey: 'transmissie', formSection: 'vehicle', displayLabel: 'Transmissie' },
  
  // Tire data - global
  tire_size: { fieldKey: 'tire_bandenmaat', formSection: 'appraisal', displayLabel: 'Bandenmaat' },
  tire_bandenmaat: { fieldKey: 'tire_bandenmaat', formSection: 'appraisal', displayLabel: 'Bandenmaat' },
  
  // Tire data per position - Front Left
  tire_front_left_brand: { fieldKey: 'tire_front_left_brand', formSection: 'appraisal', displayLabel: 'Merk LV' },
  tire_front_left_model: { fieldKey: 'tire_front_left_model', formSection: 'appraisal', displayLabel: 'Model LV' },
  tire_front_left_dot: { fieldKey: 'tire_front_left_dot', formSection: 'appraisal', displayLabel: 'DOT LV' },
  tire_front_left_profiel: { fieldKey: 'tire_front_left_profiel', formSection: 'appraisal', displayLabel: 'Profiel LV' },
  
  // Tire data per position - Front Right
  tire_front_right_brand: { fieldKey: 'tire_front_right_brand', formSection: 'appraisal', displayLabel: 'Merk RV' },
  tire_front_right_model: { fieldKey: 'tire_front_right_model', formSection: 'appraisal', displayLabel: 'Model RV' },
  tire_front_right_dot: { fieldKey: 'tire_front_right_dot', formSection: 'appraisal', displayLabel: 'DOT RV' },
  tire_front_right_profiel: { fieldKey: 'tire_front_right_profiel', formSection: 'appraisal', displayLabel: 'Profiel RV' },
  
  // Tire data per position - Rear Left
  tire_rear_left_brand: { fieldKey: 'tire_rear_left_brand', formSection: 'appraisal', displayLabel: 'Merk LA' },
  tire_rear_left_model: { fieldKey: 'tire_rear_left_model', formSection: 'appraisal', displayLabel: 'Model LA' },
  tire_rear_left_dot: { fieldKey: 'tire_rear_left_dot', formSection: 'appraisal', displayLabel: 'DOT LA' },
  tire_rear_left_profiel: { fieldKey: 'tire_rear_left_profiel', formSection: 'appraisal', displayLabel: 'Profiel LA' },
  
  // Tire data per position - Rear Right
  tire_rear_right_brand: { fieldKey: 'tire_rear_right_brand', formSection: 'appraisal', displayLabel: 'Merk RA' },
  tire_rear_right_model: { fieldKey: 'tire_rear_right_model', formSection: 'appraisal', displayLabel: 'Model RA' },
  tire_rear_right_dot: { fieldKey: 'tire_rear_right_dot', formSection: 'appraisal', displayLabel: 'DOT RA' },
  tire_rear_right_profiel: { fieldKey: 'tire_rear_right_profiel', formSection: 'appraisal', displayLabel: 'Profiel RA' },
  
  // Massa
  max_massa: { fieldKey: 'rdw_max_massa', formSection: 'vehicle', displayLabel: 'Toegestane max massa' },
  
  // Gas installation
  gas_type: { fieldKey: 'lpg_underbody', formSection: 'moisture', displayLabel: 'Type gasinstallatie' },
  gas_hose_date: { fieldKey: 'gas_hose_production_date', formSection: 'moisture', displayLabel: 'Gasslang productiedatum' },
  pressure_regulator_date: { fieldKey: 'pressure_regulator_production_date', formSection: 'moisture', displayLabel: 'Drukregelaar productiedatum' },
};
