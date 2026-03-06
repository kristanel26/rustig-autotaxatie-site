// Photo type definitions per report type
// This is the central source of truth for photo tags

export type PhotoType =
  // Extractable tags (AI can extract data from these)
  | 'kenteken'
  | 'vin'
  | 'vin_typeplaat'    // Legacy - still supported
  | 'vin_ruit'         // Legacy - still supported
  | 'tellerstand'
  | 'dashboard_old'    // Legacy alias for tellerstand
  | 'transmissie'
  | 'bandenmerk'
  | 'bandenmaat'
  | 'dot_code'
  | 'dot_voor'         // Legacy
  | 'dot_achter'       // Legacy
  // Visual-only tags (categorization, no extraction)
  | 'velgtype'
  | 'voorblad'
  | 'exterieur_voor'
  | 'exterieur_achter'
  | 'exterieur_links'
  | 'exterieur_rechts'
  | 'interieur'
  | 'dashboard_visueel'
  | 'motor'
  | 'schade'
  | 'overig'
  // Legacy tags (kept for backward compatibility)
  | 'band_voor_links'
  | 'band_voor_rechts'
  | 'band_achter_links'
  | 'band_achter_rechts'
  | 'typeplaat_massa'
  | 'gasinstallatie';

export type ReportType = 'camper' | 'wev' | 'klassieker';

// Extraction section mapping - which section to extract for each photo type
export type ExtractSection = 'voertuigidentificatie' | 'tellerstand' | 'banden' | 'massa' | 'gasinstallatie' | 'transmissie';

export const PHOTO_TYPE_TO_SECTION: Record<PhotoType, ExtractSection | null> = {
  kenteken: 'voertuigidentificatie',
  vin: 'voertuigidentificatie',
  vin_typeplaat: 'voertuigidentificatie',
  vin_ruit: 'voertuigidentificatie',
  tellerstand: 'tellerstand',
  dashboard_old: 'tellerstand',
  transmissie: 'transmissie',
  bandenmerk: 'banden',
  bandenmaat: 'banden',
  dot_code: 'banden',
  dot_voor: 'banden',
  dot_achter: 'banden',
  // Visual-only tags → no extraction
  velgtype: null,
  voorblad: null,
  exterieur_voor: null,
  exterieur_achter: null,
  exterieur_links: null,
  exterieur_rechts: null,
  interieur: null,
  dashboard_visueel: null,
  motor: null,
  schade: null,
  overig: null,
  // Legacy tags
  band_voor_links: 'banden',
  band_voor_rechts: 'banden',
  band_achter_links: 'banden',
  band_achter_rechts: 'banden',
  typeplaat_massa: 'massa',
  gasinstallatie: 'gasinstallatie',
};

// Labels shown in UI
export const PHOTO_TYPE_LABELS: Record<PhotoType, string> = {
  kenteken: 'Kenteken',
  vin: 'VIN / Chassisnummer',
  vin_typeplaat: 'VIN Typeplaat',
  vin_ruit: 'VIN Ruit',
  tellerstand: 'Tellerstand',
  dashboard_old: 'Km-stand',
  transmissie: 'Transmissie',
  bandenmerk: 'Bandenmerk',
  bandenmaat: 'Bandenmaat',
  dot_code: 'DOT-code',
  dot_voor: 'DOT-code voor',
  dot_achter: 'DOT-code achter',
  velgtype: 'Velgtype',
  voorblad: 'Voorblad',
  exterieur_voor: 'Exterieur voor',
  exterieur_achter: 'Exterieur achter',
  exterieur_links: 'Exterieur links',
  exterieur_rechts: 'Exterieur rechts',
  interieur: 'Interieur',
  dashboard_visueel: 'Dashboard',
  motor: 'Motor',
  schade: 'Schade',
  overig: 'Overig',
  // Legacy
  band_voor_links: 'Band LV',
  band_voor_rechts: 'Band RV',
  band_achter_links: 'Band LA',
  band_achter_rechts: 'Band RA',
  typeplaat_massa: 'Typeplaat Massa',
  gasinstallatie: 'Gasinstallatie',
};

// The unified tag list used by ALL report types
const COMMON_PHOTO_TYPES: PhotoType[] = [
  'kenteken',
  'vin',
  'tellerstand',
  'transmissie',
  'bandenmerk',
  'bandenmaat',
  'dot_code',
  'velgtype',
  'voorblad',
  'exterieur_voor',
  'exterieur_achter',
  'exterieur_links',
  'exterieur_rechts',
  'interieur',
  'dashboard_visueel',
  'motor',
  'schade',
  'overig',
];

// Which photo types are available per report type
export const PHOTO_TYPES_BY_REPORT: Record<ReportType, PhotoType[]> = {
  klassieker: COMMON_PHOTO_TYPES,
  camper: COMMON_PHOTO_TYPES,
  wev: COMMON_PHOTO_TYPES,
};

// Get label for a photo type
export function getPhotoTypeLabel(type: PhotoType, _reportType?: ReportType): string {
  return PHOTO_TYPE_LABELS[type] || type;
}

// Get available photo types for a report type
export function getPhotoTypesForReport(reportType: ReportType | null): PhotoType[] {
  if (!reportType) {
    return COMMON_PHOTO_TYPES;
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
  
  // DOT code extractions
  dot_front_left: { fieldKey: 'tire_front_left_dot', formSection: 'appraisal', displayLabel: 'DOT LV' },
  dot_front_right: { fieldKey: 'tire_front_right_dot', formSection: 'appraisal', displayLabel: 'DOT RV' },
  dot_rear_left: { fieldKey: 'tire_rear_left_dot', formSection: 'appraisal', displayLabel: 'DOT LA' },
  dot_rear_right: { fieldKey: 'tire_rear_right_dot', formSection: 'appraisal', displayLabel: 'DOT RA' },
  
  // Massa
  max_massa: { fieldKey: 'rdw_max_massa', formSection: 'vehicle', displayLabel: 'Toegestane max massa' },
  
  // Gas installation
  gas_type: { fieldKey: 'lpg_underbody', formSection: 'moisture', displayLabel: 'Type gasinstallatie' },
  gas_hose_date: { fieldKey: 'gas_hose_production_date', formSection: 'moisture', displayLabel: 'Gasslang productiedatum' },
  pressure_regulator_date: { fieldKey: 'pressure_regulator_production_date', formSection: 'moisture', displayLabel: 'Drukregelaar productiedatum' },
};
