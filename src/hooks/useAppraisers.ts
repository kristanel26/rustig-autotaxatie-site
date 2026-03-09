import { useEffect, useState } from 'react';
import { supabase } from '@/integrations/supabase/client';

export interface Appraiser {
  user_id: string;
  email: string;
  initials: string;
}

const getInitials = (email: string): string => {
  const local = email.split('@')[0];
  const parts = local.split(/[._-]/);
  if (parts.length >= 2) {
    return (parts[0][0] + parts[1][0]).toUpperCase();
  }
  return local.slice(0, 2).toUpperCase();
};

export const useAppraisers = () => {
  const [appraisers, setAppraisers] = useState<Appraiser[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetch = async () => {
      const { data } = await supabase.rpc('get_user_emails');
      if (data) {
        setAppraisers(
          data.map((d: { user_id: string; email: string }) => ({
            user_id: d.user_id,
            email: d.email,
            initials: getInitials(d.email),
          }))
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
