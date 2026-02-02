// Text normalization utilities for form fields

/**
 * Normalize Dutch license plate: remove spaces/hyphens, uppercase, format as XX-XX-XX
 */
export const normalizeLicensePlate = (value: string): string => {
  const cleaned = value.replace(/[\s-]/g, '').toUpperCase();
  if (cleaned.length === 6) {
    return `${cleaned.slice(0, 2)}-${cleaned.slice(2, 4)}-${cleaned.slice(4, 6)}`;
  }
  return cleaned;
};

export const LICENSE_PLATE_REGEX = /^[A-Z0-9]{2}-[A-Z0-9]{2}-[A-Z0-9]{2}$/;

/**
 * Normalize initials: remove spaces, uppercase, ensure each initial ends with a dot
 * Examples: "m" -> "M.", "m.a." -> "M.A.", "MA" -> "M.A."
 */
export const normalizeInitials = (value: string): string => {
  if (!value.trim()) return '';
  
  // Remove spaces
  let cleaned = value.replace(/\s/g, '').toUpperCase();
  
  // Remove existing dots to process uniformly
  const letters = cleaned.replace(/\./g, '');
  
  // Add dot after each letter
  return letters.split('').map(char => `${char}.`).join('');
};

/**
 * Capitalize first letter, lowercase rest
 * Examples: "hart" -> "Hart", "HART" -> "Hart"
 */
export const capitalizeFirst = (value: string): string => {
  const trimmed = value.trim();
  if (!trimmed) return '';
  return trimmed.charAt(0).toUpperCase() + trimmed.slice(1).toLowerCase();
};

/**
 * Normalize street: trim, replace multiple spaces with single, capitalize first letter
 * Examples: "leigraaf 160" -> "Leigraaf 160"
 */
export const normalizeStreet = (value: string): string => {
  const trimmed = value.trim().replace(/\s+/g, ' ');
  if (!trimmed) return '';
  return trimmed.charAt(0).toUpperCase() + trimmed.slice(1).toLowerCase();
};

/**
 * Capitalize first letter of each word
 * Examples: "dethleffs globescout" -> "Dethleffs Globescout"
 */
export const capitalizeWords = (value: string): string => {
  const trimmed = value.trim().replace(/\s+/g, ' ');
  if (!trimmed) return '';
  return trimmed
    .toLowerCase()
    .split(' ')
    .map(word => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' ');
};

/**
 * Normalize postcode: trim, uppercase
 * Examples: "1234 ab" -> "1234 AB"
 */
export const normalizePostcode = (value: string): string => {
  return value.trim().toUpperCase();
};

/**
 * Apply all normalizations to form data before saving
 */
export const normalizeReportFormData = (formData: {
  customer_title: string;
  customer_initials: string;
  customer_last_name: string;
  customer_street: string;
  customer_postcode: string;
  customer_city: string;
  license_plate: string;
  vehicle_brand: string;
  vehicle_model: string;
  [key: string]: string;
}) => {
  return {
    ...formData,
    customer_title: formData.customer_title.trim(),
    customer_initials: normalizeInitials(formData.customer_initials),
    customer_last_name: capitalizeFirst(formData.customer_last_name),
    customer_street: normalizeStreet(formData.customer_street),
    customer_postcode: normalizePostcode(formData.customer_postcode),
    customer_city: capitalizeFirst(formData.customer_city),
    license_plate: normalizeLicensePlate(formData.license_plate),
    vehicle_brand: capitalizeWords(formData.vehicle_brand),
    vehicle_model: capitalizeWords(formData.vehicle_model),
  };
};