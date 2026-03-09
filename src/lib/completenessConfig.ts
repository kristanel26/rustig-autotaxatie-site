// Completeness check configuration per report type
// Each item defines what fields/conditions must be met for that section to be complete

export type ReportType = 'camper' | 'wev' | 'klassieker';

export interface ChecklistItem {
  id: string;
  label: string;
  sectionId: string; // ID to scroll to
  requirements: RequirementCheck[];
  warningConditions?: WarningCheck[]; // Optional orange status conditions
}

export interface RequirementCheck {
  field: string;
  condition: 'filled' | 'minLength' | 'minValue' | 'minCount' | 'oneOf' | 'fileUploaded' | 'custom';
  value?: number | string[];
  customCheck?: (data: Record<string, unknown>) => boolean;
  label?: string; // Human readable description
}

export interface WarningCheck {
  condition: (data: Record<string, unknown>) => boolean;
  message: string;
}

export type ChecklistStatus = 'complete' | 'incomplete' | 'warning';

// Minimum photo counts per report type
export const MIN_PHOTOS = {
  klassieker: 6,
  camper: 8,
  wev: 4,
} as const;

// Checklist configuration for Klassieker (Classic) reports
export const klassiekerChecklist: ChecklistItem[] = [
  {
    id: 'klantgegevens',
    label: 'Klantgegevens',
    sectionId: 'section-klant',
    requirements: [
      { field: 'customer_last_name', condition: 'filled', label: 'Achternaam' },
      { 
        field: 'customer_contact', 
        condition: 'custom',
        customCheck: (data) => !!(data.customer_email || data.customer_phone),
        label: 'E-mail of telefoon'
      },
    ],
  },
  {
    id: 'fotos',
    label: 'Fotocollectie',
    sectionId: 'section-fotos',
    requirements: [
      { 
        field: 'vehicle_photos', 
        condition: 'minCount', 
        value: MIN_PHOTOS.klassieker,
        label: `Minimaal ${MIN_PHOTOS.klassieker} foto's`
      },
    ],
  },
  {
    id: 'voertuig',
    label: 'Voertuigidentificatie',
    sectionId: 'section-voertuig',
    requirements: [
      { 
        field: 'vehicle_id', 
        condition: 'custom',
        customCheck: (data) => !!(data.license_plate || data.vin),
        label: 'Kenteken of VIN'
      },
      { field: 'rdw_merk', condition: 'filled', label: 'Merk' },
      { field: 'rdw_bouwjaar', condition: 'filled', label: 'Bouwjaar' },
      { field: 'tellerstand', condition: 'filled', label: 'Km-stand' },
    ],
  },
  {
    id: 'inspectie',
    label: 'Inspectiegegevens',
    sectionId: 'section-inspectie',
    requirements: [
      { field: 'inspection_location', condition: 'filled', label: 'Plaats opname' },
      { field: 'inspection_date', condition: 'filled', label: 'Datum opname' },
      { field: 'inspection_start_time', condition: 'filled', label: 'Aanvangstijd' },
      { field: 'inspection_end_time', condition: 'filled', label: 'Eindtijd' },
    ],
  },
  {
    id: 'waardeselectie',
    label: 'Waardeselectie',
    sectionId: 'section-waarde',
    requirements: [
      { field: 'appraised_value', condition: 'filled', label: 'Vervangingswaarde' },
      { field: 'appraised_value_text', condition: 'filled', label: 'Waarde in woorden' },
    ],
  },
];

// Checklist configuration for Camper reports
export const camperChecklist: ChecklistItem[] = [
  {
    id: 'klantgegevens',
    label: 'Klantgegevens',
    sectionId: 'section-klant',
    requirements: [
      { field: 'customer_last_name', condition: 'filled', label: 'Achternaam' },
      { 
        field: 'customer_contact', 
        condition: 'custom',
        customCheck: (data) => !!(data.customer_email || data.customer_phone),
        label: 'E-mail of telefoon'
      },
    ],
  },
  {
    id: 'fotos',
    label: 'Fotocollectie',
    sectionId: 'section-fotos',
    requirements: [
      { 
        field: 'vehicle_photos', 
        condition: 'minCount', 
        value: MIN_PHOTOS.camper,
        label: `Minimaal ${MIN_PHOTOS.camper} foto's`
      },
    ],
  },
  {
    id: 'voertuig',
    label: 'Voertuigidentificatie',
    sectionId: 'section-voertuig',
    requirements: [
      { 
        field: 'vehicle_id', 
        condition: 'custom',
        customCheck: (data) => !!(data.license_plate || data.vin),
        label: 'Kenteken of VIN'
      },
      { field: 'rdw_merk', condition: 'filled', label: 'Merk' },
      { field: 'rdw_bouwjaar', condition: 'filled', label: 'Bouwjaar' },
      { field: 'tellerstand', condition: 'filled', label: 'Km-stand' },
    ],
  },
  {
    id: 'inspectie',
    label: 'Inspectiegegevens',
    sectionId: 'section-inspectie',
    requirements: [
      { field: 'inspection_location', condition: 'filled', label: 'Inspectielocatie' },
      { field: 'inspection_date', condition: 'filled', label: 'Inspectiedatum' },
      { field: 'inspection_start_time', condition: 'filled', label: 'Aanvangstijd' },
      { field: 'inspection_end_time', condition: 'filled', label: 'Eindtijd' },
    ],
  },
  {
    id: 'waardeselectie',
    label: 'Waardeselectie',
    sectionId: 'section-waarde',
    requirements: [
      { field: 'appraised_value', condition: 'filled', label: 'Getaxeerde waarde' },
      { field: 'appraised_value_text', condition: 'filled', label: 'Waarde in woorden' },
    ],
  },
];

// Checklist configuration for WEV reports
export const wevChecklist: ChecklistItem[] = [
  {
    id: 'klantgegevens',
    label: 'Klantgegevens',
    sectionId: 'section-klant',
    requirements: [
      { field: 'customer_last_name', condition: 'filled', label: 'Achternaam' },
      { 
        field: 'customer_contact', 
        condition: 'custom',
        customCheck: (data) => !!(data.customer_email || data.customer_phone),
        label: 'E-mail of telefoon'
      },
    ],
  },
  {
    id: 'fotos',
    label: 'Fotocollectie',
    sectionId: 'section-fotos',
    requirements: [
      { 
        field: 'vehicle_photos', 
        condition: 'minCount', 
        value: MIN_PHOTOS.wev,
        label: `Minimaal ${MIN_PHOTOS.wev} foto's`
      },
    ],
  },
  {
    id: 'voertuig',
    label: 'Voertuigidentificatie',
    sectionId: 'section-voertuig',
    requirements: [
      { 
        field: 'vehicle_id', 
        condition: 'custom',
        customCheck: (data) => !!(data.license_plate || data.vin),
        label: 'Kenteken of VIN'
      },
      { field: 'rdw_merk', condition: 'filled', label: 'Merk' },
      { field: 'rdw_bouwjaar', condition: 'filled', label: 'Bouwjaar' },
      { field: 'tellerstand', condition: 'filled', label: 'Km-stand' },
    ],
  },
  {
    id: 'inspectie',
    label: 'Inspectiegegevens',
    sectionId: 'section-inspectie',
    requirements: [
      { field: 'inspection_location', condition: 'filled', label: 'Plaats opname' },
      { field: 'inspection_date', condition: 'filled', label: 'Datum opname' },
      { field: 'inspection_start_time', condition: 'filled', label: 'Aanvangstijd' },
      { field: 'inspection_end_time', condition: 'filled', label: 'Eindtijd' },
    ],
  },
  {
    id: 'taxatie_files',
    label: 'Taxatiebestanden',
    sectionId: 'section-documenten',
    requirements: [
      { 
        field: 'wev_documents', 
        condition: 'custom',
        customCheck: (data) => {
          const docs = data.wev_documents as Array<{ document_type: string }> | undefined;
          if (!docs || !Array.isArray(docs)) return false;
          const hasAutotelex = docs.some(d => d.document_type === 'autotelex');
          return hasAutotelex;
        },
        label: 'Autotelex waardebepaling geüpload'
      },
    ],
  },
  {
    id: 'eindwaarde',
    label: 'Eindwaarde WEV',
    sectionId: 'section-waarde',
    requirements: [
      { field: 'wev_eindwaarde', condition: 'filled', label: 'Eindwaarde ingevuld' },
    ],
  },
];

// Get checklist for a specific report type
export function getChecklistForType(reportType: ReportType | string | null): ChecklistItem[] {
  switch (reportType) {
    case 'klassieker':
      return klassiekerChecklist;
    case 'camper':
      return camperChecklist;
    case 'wev':
      return wevChecklist;
    default:
      return camperChecklist; // Default to camper for legacy reports
  }
}

// Check if a single requirement is met
export function checkRequirement(req: RequirementCheck, data: Record<string, unknown>): boolean {
  const value = data[req.field];
  
  switch (req.condition) {
    case 'filled':
      if (value === null || value === undefined) return false;
      if (typeof value === 'string') return value.trim().length > 0;
      if (typeof value === 'number') return !isNaN(value);
      return !!value;
      
    case 'minLength':
      if (typeof value !== 'string') return false;
      return value.length >= (req.value as number);
      
    case 'minValue':
      if (typeof value !== 'number') return false;
      return value >= (req.value as number);
      
    case 'minCount':
      if (!Array.isArray(value)) return false;
      return value.length >= (req.value as number);
      
    case 'oneOf':
      if (!Array.isArray(req.value)) return false;
      return req.value.includes(value as string);
      
    case 'fileUploaded':
      return !!value;
      
    case 'custom':
      if (!req.customCheck) return false;
      return req.customCheck(data);
      
    default:
      return false;
  }
}

// Calculate status for a checklist item
export function calculateItemStatus(
  item: ChecklistItem, 
  data: Record<string, unknown>
): { status: ChecklistStatus; missingFields: string[]; warnings: string[] } {
  const missingFields: string[] = [];
  const warnings: string[] = [];
  
  // Check all requirements
  for (const req of item.requirements) {
    if (!checkRequirement(req, data)) {
      missingFields.push(req.label || req.field);
    }
  }
  
  // Check warning conditions if all requirements are met
  if (missingFields.length === 0 && item.warningConditions) {
    for (const warn of item.warningConditions) {
      if (warn.condition(data)) {
        warnings.push(warn.message);
      }
    }
  }
  
  // Determine status
  let status: ChecklistStatus;
  if (missingFields.length > 0) {
    status = 'incomplete';
  } else if (warnings.length > 0) {
    status = 'warning';
  } else {
    status = 'complete';
  }
  
  return { status, missingFields, warnings };
}

// Calculate overall completeness percentage
export function calculateCompletenessPercentage(
  checklist: ChecklistItem[],
  data: Record<string, unknown>
): number {
  if (checklist.length === 0) return 0;
  
  const completeCount = checklist.filter(item => {
    const { status } = calculateItemStatus(item, data);
    return status === 'complete' || status === 'warning';
  }).length;
  
  return Math.round((completeCount / checklist.length) * 100);
}
