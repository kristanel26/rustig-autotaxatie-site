// WEV-specific form components

// Simplified WEV value form (single value, no bandwidth)
export { WevValueForm, getInitialWevValueData } from './WevValueForm';
export type { WevValueData } from './WevValueForm';

// Market data form (BTW/marge, handelsinkoop, verkoop)
export { WevAutotelexDataForm, getInitialWevAutotelexData } from './WevAutotelexDataForm';
export type { WevAutotelexData } from './WevAutotelexDataForm';

// Document upload form
export { WevDocumentUploadForm } from './WevDocumentUploadForm';
export type { WevDocument, DocumentType } from './WevDocumentUploadForm';

// Legacy exports for backwards compatibility during migration
// These will be removed after migration is complete
export { WevValuationContextForm, getInitialWevValuationContextData } from './WevValuationContextForm';
export type { WevValuationContextData } from './WevValuationContextForm';

export { WevComparablesForm, getInitialWevComparablesData } from './WevComparablesForm';
export type { WevComparablesData, WevComparable } from './WevComparablesForm';

export { WevAdjustmentsForm, getInitialWevAdjustmentsData } from './WevAdjustmentsForm';
export type { WevAdjustmentsData } from './WevAdjustmentsForm';

export { WevConclusionForm, getInitialWevConclusionData } from './WevConclusionForm';
export type { WevConclusionData } from './WevConclusionForm';
