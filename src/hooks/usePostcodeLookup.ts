import { useState, useCallback } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { capitalizeFirst, normalizePostcode } from '@/lib/normalizers';

interface PostcodeLookupResult {
  normalized_postcode: string;
  valid: boolean;
  found: boolean;
  city?: string;
  street?: string;
  house_number?: string;
  province?: string;
  municipality?: string;
  message?: string;
  error?: string;
}

interface UsePostcodeLookupReturn {
  lookupPostcode: (postcode: string, huisnummer?: string) => Promise<PostcodeLookupResult | null>;
  isLoading: boolean;
  lastResult: PostcodeLookupResult | null;
  status: 'idle' | 'loading' | 'found' | 'not-found' | 'error';
}

// Regex for Dutch postcode validation (with or without space)
const POSTCODE_REGEX = /^[1-9][0-9]{3}\s?[A-Z]{2}$/i;

export const usePostcodeLookup = (): UsePostcodeLookupReturn => {
  const [isLoading, setIsLoading] = useState(false);
  const [lastResult, setLastResult] = useState<PostcodeLookupResult | null>(null);
  const [status, setStatus] = useState<'idle' | 'loading' | 'found' | 'not-found' | 'error'>('idle');

  const lookupPostcode = useCallback(async (
    postcode: string,
    huisnummer?: string
  ): Promise<PostcodeLookupResult | null> => {
    // Validate postcode format first
    const cleaned = postcode.replace(/\s/g, '').toUpperCase();
    if (!POSTCODE_REGEX.test(cleaned)) {
      setStatus('idle');
      setLastResult(null);
      return null;
    }

    setIsLoading(true);
    setStatus('loading');

    try {
      const { data, error } = await supabase.functions.invoke('postcode-lookup', {
        body: { postcode, huisnummer },
      });

      if (error) {
        console.error('Postcode lookup error:', error);
        setStatus('error');
        setLastResult(null);
        return null;
      }

      const result = data as PostcodeLookupResult;
      
      // Apply title case to city
      if (result.city) {
        result.city = capitalizeFirst(result.city);
      }
      
      setLastResult(result);
      
      if (result.found) {
        setStatus('found');
      } else if (result.valid) {
        setStatus('not-found');
      } else {
        setStatus('error');
      }

      return result;
    } catch (err) {
      console.error('Postcode lookup failed:', err);
      setStatus('error');
      setLastResult(null);
      return null;
    } finally {
      setIsLoading(false);
    }
  }, []);

  return {
    lookupPostcode,
    isLoading,
    lastResult,
    status,
  };
};
