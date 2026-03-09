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

interface InteriorOption {
  id: string;
  name: string;
  usage_count: number;
}

interface InteriorComboboxProps {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  disabled?: boolean;
}

const normalizeInteriorName = (name: string): string => {
  const trimmed = name.trim();
  if (!trimmed) return '';
  return trimmed.charAt(0).toUpperCase() + trimmed.slice(1);
};

export const InteriorCombobox = ({
  value,
  onChange,
  placeholder = 'Selecteer of typ interieur...',
  disabled = false,
}: InteriorComboboxProps) => {
  const [open, setOpen] = useState(false);
  const [options, setOptions] = useState<InteriorOption[]>([]);
  const [searchValue, setSearchValue] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const fetchOptions = useCallback(async () => {
    const { data, error } = await supabase
      .from('interior_options')
      .select('*')
      .order('usage_count', { ascending: false });

    if (!error && data) {
      setOptions(data as InteriorOption[]);
    }
  }, []);

  useEffect(() => {
    fetchOptions();
  }, [fetchOptions]);

  const filteredOptions = options.filter(opt =>
    opt.name.toLowerCase().includes(searchValue.toLowerCase())
  );

  const normalizedSearch = normalizeInteriorName(searchValue);
  const existingOption = options.find(
    o => o.name.toLowerCase() === normalizedSearch.toLowerCase()
  );
  const canAddNew = searchValue.trim().length > 0 && !existingOption;

  const addNewOption = async (name: string) => {
    const normalized = normalizeInteriorName(name);
    if (!normalized) return;

    setIsLoading(true);
    try {
      const { data: existing } = await supabase
        .from('interior_options')
        .select('id, name')
        .ilike('name', normalized)
        .maybeSingle();

      if (existing) {
        // Bump usage count
        await supabase
          .from('interior_options')
          .update({ usage_count: (options.find(o => o.id === existing.id)?.usage_count || 0) + 1, last_used_at: new Date().toISOString() })
          .eq('id', existing.id);
        onChange(existing.name);
      } else {
        const { data, error } = await supabase
          .from('interior_options')
          .insert({ name: normalized })
          .select()
          .single();

        if (!error && data) {
          onChange(data.name);
        }
      }

      await fetchOptions();
    } finally {
      setIsLoading(false);
      setOpen(false);
      setSearchValue('');
    }
  };

  const selectOption = async (option: InteriorOption) => {
    // Bump usage count
    await supabase
      .from('interior_options')
      .update({ usage_count: option.usage_count + 1, last_used_at: new Date().toISOString() })
      .eq('id', option.id);
    onChange(option.name);
    setOpen(false);
    setSearchValue('');
    fetchOptions();
  };

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          role="combobox"
          aria-expanded={open}
          className="w-full justify-between font-normal"
          disabled={isLoading || disabled}
        >
          <span className="truncate">{value || placeholder}</span>
          <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-[280px] p-0 z-50 bg-popover" align="start">
        <Command shouldFilter={false}>
          <CommandInput
            placeholder="Zoek of voeg toe..."
            value={searchValue}
            onValueChange={setSearchValue}
          />
          <CommandList>
            <CommandEmpty className="py-2 px-3 text-sm text-muted-foreground">
              {searchValue.trim() ? (
                <span>Geen opties gevonden</span>
              ) : (
                <span>Begin met typen...</span>
              )}
            </CommandEmpty>

            {canAddNew && (
              <CommandGroup heading="Nieuwe optie">
                <CommandItem
                  onSelect={() => addNewOption(searchValue)}
                  className="cursor-pointer"
                >
                  <Plus className="mr-2 h-4 w-4" />
                  "{normalizedSearch}" toevoegen
                </CommandItem>
              </CommandGroup>
            )}

            {filteredOptions.length > 0 && (
              <CommandGroup heading="Eerder gebruikt">
                {filteredOptions.map((option) => (
                  <CommandItem
                    key={option.id}
                    value={option.name}
                    onSelect={() => selectOption(option)}
                    className="cursor-pointer"
                  >
                    <Check
                      className={cn(
                        'mr-2 h-4 w-4',
                        value?.toLowerCase() === option.name.toLowerCase() ? 'opacity-100' : 'opacity-0'
                      )}
                    />
                    {option.name}
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
