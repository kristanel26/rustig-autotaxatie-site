import { useEffect, useState } from 'react';
import { supabase } from '@/integrations/supabase/client';

export interface Appraiser {
  user_id: string;
  email: string;
  initials: string;
  displayName: string;
}

// Map known emails to friendly display names
const KNOWN_NAMES: Record<string, string> = {
  'erik@automobieltaxaties.nl': 'Erik',
  'krista@automobieltaxaties.nl': 'Krista',
};

const getInitials = (email: string, displayName?: string): string => {
  if (displayName) {
    return displayName.slice(0, 2).toUpperCase();
  }
  const local = email.split('@')[0];
  const parts = local.split(/[._-]/);
  if (parts.length >= 2) {
    return (parts[0][0] + parts[1][0]).toUpperCase();
  }
  return local.slice(0, 2).toUpperCase();
};

const getDisplayName = (email: string): string => {
  const lower = email.toLowerCase();
  if (KNOWN_NAMES[lower]) return KNOWN_NAMES[lower];
  // Fallback: capitalize first part of email
  const local = email.split('@')[0];
  return local.charAt(0).toUpperCase() + local.slice(1);
};

export const useAppraisers = () => {
  const [appraisers, setAppraisers] = useState<Appraiser[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetch = async () => {
      const { data } = await supabase.rpc('get_user_emails');
      if (data) {
        setAppraisers(
          data.map((d: { user_id: string; email: string }) => {
            const displayName = getDisplayName(d.email);
            return {
              user_id: d.user_id,
              email: d.email,
              initials: getInitials(d.email, displayName),
              displayName,
            };
          })
        );
      }
      setLoading(false);
    };
    fetch();
  }, []);

  const getAppraiserById = (id: string | null | undefined): Appraiser | undefined => {
    if (!id) return undefined;
    return appraisers.find((a) => a.user_id === id);
  };

  return { appraisers, loading, getAppraiserById };
};
