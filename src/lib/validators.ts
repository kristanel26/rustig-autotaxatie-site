/**
 * Validates VIN (Chassisnummer): exactly 17 alphanumeric characters
 * Only validates when a value is provided - empty is allowed for drafts
 */
export const validateVin = (vin: string, required: boolean = true): { valid: boolean; error?: string } => {
  if (!vin || vin.trim() === '') {
    if (required) {
      return { valid: false, error: 'Chassisnummer is verplicht' };
    }
    return { valid: true };
  }
  
  const cleaned = vin.replace(/\s/g, '').toUpperCase();
  
  // VIN must be exactly 17 characters
  if (cleaned.length !== 17) {
    return { valid: false, error: `Chassisnummer moet exact 17 tekens zijn (nu: ${cleaned.length})` };
  }
  
  // VIN should only contain alphanumeric characters (no I, O, Q)
  if (!/^[A-HJ-NPR-Z0-9]{17}$/.test(cleaned)) {
    return { valid: false, error: 'Chassisnummer bevat ongeldige tekens (letters I, O, Q zijn niet toegestaan)' };
  }
  
  return { valid: true };
};

/**
 * Validates DOT code: exactly 4 digits
 */
export const validateDotCode = (dot: string): { valid: boolean; error?: string } => {
  if (!dot || dot.trim() === '') {
    return { valid: false, error: 'DOT-code is verplicht' };
  }
  
  if (!/^\d{4}$/.test(dot)) {
    return { valid: false, error: 'DOT-code moet exact 4 cijfers zijn' };
  }
  
  return { valid: true };
};

/**
 * Validates email address format
 */
export const validateEmail = (email: string): { valid: boolean; error?: string } => {
  if (!email || email.trim() === '') {
    return { valid: true }; // Email is optional
  }
  
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email)) {
    return { valid: false, error: 'Ongeldig e-mailadres' };
  }
  
  return { valid: true };
};

/**
 * Validates Dutch phone number
 */
export const validatePhone = (phone: string): { valid: boolean; error?: string } => {
  if (!phone || phone.trim() === '') {
    return { valid: true }; // Phone is optional
  }
  
  // Remove spaces and dashes
  const cleaned = phone.replace(/[\s-]/g, '');
  
  // Dutch phone numbers: 10 digits starting with 0, or +31 followed by 9 digits
  if (!/^(0\d{9}|\+31\d{9})$/.test(cleaned)) {
    return { valid: false, error: 'Ongeldig telefoonnummer (bijv. 0612345678 of +31612345678)' };
  }
  
  return { valid: true };
};
