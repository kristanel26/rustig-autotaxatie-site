import { useState, useEffect, useRef } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Search, UserPlus, X, Building2, User } from 'lucide-react';
import { Badge } from '@/components/ui/badge';

interface Customer {
  id: string;
  customer_type: string;
  company_name: string | null;
  salutation: string | null;
  initials: string | null;
  first_name: string | null;
  last_name: string;
  street: string | null;
  house_number: string | null;
  postal_code: string | null;
  city: string | null;
  email: string | null;
  phone: string | null;
}

interface CustomerSearchFieldProps {
  onSelect: (customer: Customer) => void;
  onNewCustomer: () => void;
}

export const CustomerSearchField = ({ onSelect, onNewCustomer }: CustomerSearchFieldProps) => {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState<Customer[]>([]);
  const [isOpen, setIsOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (query.length < 2) {
      setResults([]);
      setIsOpen(false);
      return;
    }

    const timer = setTimeout(async () => {
      setLoading(true);
      const q = `%${query}%`;
      const { data } = await supabase
        .from('customers')
        .select('id, customer_type, company_name, salutation, initials, first_name, last_name, street, house_number, postal_code, city, email, phone')
        .or(`last_name.ilike.${q},first_name.ilike.${q},company_name.ilike.${q}`)
        .order('last_name')
        .limit(8);
      setResults((data as Customer[]) || []);
      setIsOpen(true);
      setLoading(false);
    }, 300);

    return () => clearTimeout(timer);
  }, [query]);

  // Close on outside click
  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(e.target as Node)) {
        setIsOpen(false);
      }
    };
    document.addEventListener('mousedown', handler);
    return () => document.removeEventListener('mousedown', handler);
  }, []);

  const displayName = (c: Customer) => {
    return [c.initials, c.first_name, c.last_name].filter(Boolean).join(' ');
  };

  const handleSelect = (c: Customer) => {
    setIsOpen(false);
    setQuery('');
    onSelect(c);
  };

  return (
    <div ref={containerRef} className="relative">
      <div className="flex gap-2">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Zoek klant op naam of bedrijf..."
            className="pl-9 pr-8"
          />
          {query && (
            <button
              onClick={() => { setQuery(''); setIsOpen(false); }}
              className="absolute right-2 top-1/2 -translate-y-1/2 p-1 rounded hover:bg-muted"
            >
              <X className="h-3 w-3 text-muted-foreground" />
            </button>
          )}
        </div>
        <Button type="button" variant="outline" size="default" onClick={onNewCustomer} className="shrink-0">
          <UserPlus className="h-4 w-4 mr-1.5" />
          <span className="hidden sm:inline">Nieuwe klant</span>
        </Button>
      </div>

      {isOpen && (
        <div className="absolute z-50 w-full mt-1 bg-popover border border-border rounded-lg shadow-lg max-h-[280px] overflow-y-auto">
          {loading ? (
            <div className="p-3 text-sm text-muted-foreground text-center">Zoeken...</div>
          ) : results.length === 0 ? (
            <div className="p-3 text-sm text-muted-foreground text-center">
              Geen klanten gevonden
              <button
                onClick={onNewCustomer}
                className="block mx-auto mt-2 text-primary text-xs hover:underline"
              >
                + Nieuwe klant aanmaken
              </button>
            </div>
          ) : (
            results.map((c) => (
              <button
                key={c.id}
                onClick={() => handleSelect(c)}
                className="w-full flex items-center gap-3 px-3 py-2.5 text-left hover:bg-muted/50 transition-colors border-b last:border-b-0 border-border/50"
              >
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium truncate">{displayName(c)}</p>
                  <p className="text-xs text-muted-foreground truncate">
                    {[c.company_name, c.city].filter(Boolean).join(' · ') || 'Geen details'}
                  </p>
                </div>
                <Badge variant="outline" className="text-[10px] shrink-0">
                  {c.customer_type === 'zakelijk' ? <Building2 className="h-2.5 w-2.5" /> : <User className="h-2.5 w-2.5" />}
                </Badge>
              </button>
            ))
          )}
        </div>
      )}
    </div>
  );
};
