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

interface VehicleColor {
  id: string;
  name: string;
  hex_value: string | null;
  is_active: boolean;
}

interface ColorComboboxProps {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  disabled?: boolean;
}

/**
 * Normalize color name: trim spaces, capitalize first letter
 */
const normalizeColorName = (name: string): string => {
  const trimmed = name.trim();
  if (!trimmed) return '';
  return trimmed.charAt(0).toUpperCase() + trimmed.slice(1).toLowerCase();
};

export const ColorCombobox = ({
  value,
  onChange,
  placeholder = 'Selecteer kleur...',
  disabled = false,
}: ColorComboboxProps) => {
  const [open, setOpen] = useState(false);
  const [colors, setColors] = useState<VehicleColor[]>([]);
  const [searchValue, setSearchValue] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  // Fetch colors sorted alphabetically
  const fetchColors = useCallback(async () => {
    const { data, error } = await supabase
      .from('vehicle_colors')
      .select('*')
      .eq('is_active', true)
      .order('name', { ascending: true });

    if (!error && data) {
      setColors(data as VehicleColor[]);
    }
  }, []);

  useEffect(() => {
    fetchColors();
  }, [fetchColors]);

  // Filter colors based on search
  const filteredColors = colors.filter(color =>
    color.name.toLowerCase().includes(searchValue.toLowerCase())
  );

  // Check if the search value matches an existing color (case-insensitive)
  const normalizedSearch = normalizeColorName(searchValue);
  const existingColor = colors.find(
    c => c.name.toLowerCase() === normalizedSearch.toLowerCase()
  );
  const canAddNew = searchValue.trim().length > 0 && !existingColor;

  // Add new color to database
  const addNewColor = async (colorName: string) => {
    const normalized = normalizeColorName(colorName);
    if (!normalized) return;

    setIsLoading(true);
    try {
      // Check again if it exists (race condition prevention)
      const { data: existing } = await supabase
        .from('vehicle_colors')
        .select('id, name')
        .ilike('name', normalized)
        .maybeSingle();

      if (existing) {
        // Color already exists, select it
        onChange(existing.name);
      } else {
        // Insert new color
        const { data, error } = await supabase
          .from('vehicle_colors')
          .insert({ name: normalized })
          .select()
          .single();

        if (!error && data) {
          onChange(data.name);
        }
      }

      await fetchColors();
    } finally {
      setIsLoading(false);
      setOpen(false);
      setSearchValue('');
    }
  };

  // Select existing color
  const selectColor = (color: VehicleColor) => {
    onChange(color.name);
    setOpen(false);
    setSearchValue('');
  };

  // Find the selected color to show its hex value
  const selectedColor = colors.find(c => c.name.toLowerCase() === value?.toLowerCase());

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
          <span className="flex items-center gap-2">
            {selectedColor?.hex_value && (
              <span 
                className="w-4 h-4 rounded-full border border-border"
                style={{ backgroundColor: selectedColor.hex_value }}
              />
            )}
            {value || placeholder}
          </span>
          <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-[250px] p-0 z-50 bg-popover" align="start">
        <Command shouldFilter={false}>
          <CommandInput
            placeholder="Zoek of voeg kleur toe..."
            value={searchValue}
            onValueChange={setSearchValue}
          />
          <CommandList>
            <CommandEmpty className="py-2 px-3 text-sm text-muted-foreground">
              {searchValue.trim() ? (
                <span>Geen kleuren gevonden</span>
              ) : (
                <span>Begin met typen...</span>
              )}
            </CommandEmpty>

            {canAddNew && (
              <CommandGroup heading="Nieuwe kleur">
                <CommandItem
                  onSelect={() => addNewColor(searchValue)}
                  className="cursor-pointer"
                >
                  <Plus className="mr-2 h-4 w-4" />
                  "{normalizedSearch}" toevoegen
                </CommandItem>
              </CommandGroup>
            )}

            {filteredColors.length > 0 && (
              <CommandGroup heading="Kleuren">
                {filteredColors.map((color) => (
                  <CommandItem
                    key={color.id}
                    value={color.name}
                    onSelect={() => selectColor(color)}
                    className="cursor-pointer"
                  >
                    <Check
                      className={cn(
                        'mr-2 h-4 w-4',
                        value?.toLowerCase() === color.name.toLowerCase() ? 'opacity-100' : 'opacity-0'
                      )}
                    />
                    {color.hex_value && (
                      <span 
                        className="w-4 h-4 rounded-full border border-border mr-2"
                        style={{ backgroundColor: color.hex_value }}
                      />
                    )}
                    {color.name}
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

export default ColorCombobox;
