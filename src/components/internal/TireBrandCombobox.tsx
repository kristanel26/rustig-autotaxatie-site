import { useState, useEffect, useCallback } from 'react';
import { Check, ChevronsUpDown, Plus } from 'lucide-react';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from '@/components/ui/command';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';
import { supabase } from '@/integrations/supabase/client';

interface TireBrand {
  id: string;
  name: string;
  usage_count: number;
  last_used_at: string;
}

interface TireBrandComboboxProps {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
}

/**
 * Normalize brand name: trim spaces, capitalize first letter of each word
 */
const normalizeBrandName = (name: string): string => {
  return name
    .trim()
    .toLowerCase()
    .split(' ')
    .filter(word => word.length > 0)
    .map(word => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' ');
};

export const TireBrandCombobox = ({
  value,
  onChange,
  placeholder = 'Selecteer merk...',
}: TireBrandComboboxProps) => {
  const [open, setOpen] = useState(false);
  const [brands, setBrands] = useState<TireBrand[]>([]);
  const [searchValue, setSearchValue] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  // Fetch brands sorted by usage
  const fetchBrands = useCallback(async () => {
    const { data, error } = await supabase
      .from('tire_brands')
      .select('*')
      .order('usage_count', { ascending: false })
      .order('last_used_at', { ascending: false });

    if (!error && data) {
      setBrands(data);
    }
  }, []);

  useEffect(() => {
    fetchBrands();
  }, [fetchBrands]);

  // Filter brands based on search
  const filteredBrands = brands.filter(brand =>
    brand.name.toLowerCase().includes(searchValue.toLowerCase())
  );

  // Check if the search value matches an existing brand (case-insensitive)
  const normalizedSearch = normalizeBrandName(searchValue);
  const existingBrand = brands.find(
    b => b.name.toLowerCase() === normalizedSearch.toLowerCase()
  );
  const canAddNew = searchValue.trim().length > 0 && !existingBrand;

  // Add new brand to database
  const addNewBrand = async (brandName: string) => {
    const normalized = normalizeBrandName(brandName);
    if (!normalized) return;

    setIsLoading(true);
    try {
      // Check again if it exists (race condition prevention)
      const { data: existing } = await supabase
        .from('tire_brands')
        .select('id, name')
        .ilike('name', normalized)
        .maybeSingle();

      if (existing) {
        // Brand already exists, update usage and select it
        await supabase
          .from('tire_brands')
          .update({
            usage_count: (existing as any).usage_count + 1 || 1,
            last_used_at: new Date().toISOString(),
          })
          .eq('id', existing.id);
        onChange(existing.name);
      } else {
        // Insert new brand
        const { data, error } = await supabase
          .from('tire_brands')
          .insert({ name: normalized })
          .select()
          .single();

        if (!error && data) {
          onChange(data.name);
        }
      }

      await fetchBrands();
    } finally {
      setIsLoading(false);
      setOpen(false);
      setSearchValue('');
    }
  };

  // Select existing brand and update usage
  const selectBrand = async (brand: TireBrand) => {
    onChange(brand.name);
    setOpen(false);
    setSearchValue('');

    // Update usage count in background
    await supabase
      .from('tire_brands')
      .update({
        usage_count: brand.usage_count + 1,
        last_used_at: new Date().toISOString(),
      })
      .eq('id', brand.id);

    fetchBrands();
  };

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          role="combobox"
          aria-expanded={open}
          className="w-full justify-between font-normal"
          disabled={isLoading}
        >
          {value || placeholder}
          <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-[200px] p-0 z-50" align="start">
        <Command shouldFilter={false}>
          <CommandInput
            placeholder="Zoek of voeg toe..."
            value={searchValue}
            onValueChange={setSearchValue}
          />
          <CommandList>
            <CommandEmpty className="py-2 px-3 text-sm text-muted-foreground">
              {searchValue.trim() ? (
                <span>Geen merken gevonden</span>
              ) : (
                <span>Begin met typen...</span>
              )}
            </CommandEmpty>

            {canAddNew && (
              <CommandGroup heading="Nieuw merk">
                <CommandItem
                  onSelect={() => addNewBrand(searchValue)}
                  className="cursor-pointer"
                >
                  <Plus className="mr-2 h-4 w-4" />
                  "{normalizedSearch}" toevoegen
                </CommandItem>
              </CommandGroup>
            )}

            {filteredBrands.length > 0 && (
              <CommandGroup heading="Merken">
                {filteredBrands.map((brand) => (
                  <CommandItem
                    key={brand.id}
                    value={brand.name}
                    onSelect={() => selectBrand(brand)}
                    className="cursor-pointer"
                  >
                    <Check
                      className={cn(
                        'mr-2 h-4 w-4',
                        value === brand.name ? 'opacity-100' : 'opacity-0'
                      )}
                    />
                    {brand.name}
                  </CommandItem>
                ))}
              </CommandGroup>
            )}
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  );
};

export default TireBrandCombobox;
