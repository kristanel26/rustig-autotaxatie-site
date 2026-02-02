import { useState, useEffect, useCallback } from 'react';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { Search, CheckCircle, XCircle, Loader2 } from 'lucide-react';
import { usePostcodeLookup } from '@/hooks/usePostcodeLookup';
import { cn } from '@/lib/utils';

interface PostcodeFieldProps {
  postcode: string;
  city: string;
  street?: string;
  onPostcodeChange: (value: string) => void;
  onCityChange: (value: string) => void;
  onStreetChange?: (value: string) => void;
}

export const PostcodeField = ({
  postcode,
  city,
  street,
  onPostcodeChange,
  onCityChange,
  onStreetChange,
}: PostcodeFieldProps) => {
  const { lookupPostcode, isLoading, status } = usePostcodeLookup();
  const [cityLocked, setCityLocked] = useState(false);
  const [debounceTimer, setDebounceTimer] = useState<NodeJS.Timeout | null>(null);

  // Debounced postcode lookup
  const handlePostcodeChange = useCallback((value: string) => {
    onPostcodeChange(value);
    setCityLocked(false);
    
    // Clear previous timer
    if (debounceTimer) {
      clearTimeout(debounceTimer);
    }
    
    // Validate format before triggering lookup
    const cleaned = value.replace(/\s/g, '').toUpperCase();
    if (cleaned.length === 6 && /^[1-9][0-9]{3}[A-Z]{2}$/.test(cleaned)) {
      const timer = setTimeout(async () => {
        const result = await lookupPostcode(value);
        if (result?.found && result.city) {
          onCityChange(result.city);
          setCityLocked(true);
          
          // Optionally fill street if available and empty
          if (result.street && onStreetChange && !street) {
            const capitalizedStreet = result.street.charAt(0).toUpperCase() + result.street.slice(1).toLowerCase();
            onStreetChange(capitalizedStreet);
          }
        }
      }, 500);
      setDebounceTimer(timer);
    }
  }, [onPostcodeChange, onCityChange, onStreetChange, street, lookupPostcode, debounceTimer]);

  // Manual lookup trigger
  const handleManualLookup = async () => {
    const result = await lookupPostcode(postcode);
    if (result?.found && result.city) {
      onCityChange(result.city);
      setCityLocked(true);
      
      if (result.street && onStreetChange && !street) {
        const capitalizedStreet = result.street.charAt(0).toUpperCase() + result.street.slice(1).toLowerCase();
        onStreetChange(capitalizedStreet);
      }
    }
  };

  // Cleanup debounce timer on unmount
  useEffect(() => {
    return () => {
      if (debounceTimer) {
        clearTimeout(debounceTimer);
      }
    };
  }, [debounceTimer]);

  const getStatusIcon = () => {
    if (isLoading) {
      return <Loader2 className="h-4 w-4 animate-spin text-muted-foreground" />;
    }
    if (status === 'found') {
      return <CheckCircle className="h-4 w-4 text-primary" />;
    }
    if (status === 'not-found') {
      return <XCircle className="h-4 w-4 text-destructive" />;
    }
    return null;
  };

  const getStatusMessage = () => {
    if (status === 'found') {
      return 'Postcode gevonden';
    }
    if (status === 'not-found') {
      return 'Postcode niet gevonden';
    }
    return null;
  };

  return (
    <>
      <div className="space-y-2">
        <Label htmlFor="customer_postcode">Postcode</Label>
        <div className="flex gap-2">
          <div className="relative flex-1">
            <Input
              id="customer_postcode"
              value={postcode}
              onChange={(e) => handlePostcodeChange(e.target.value)}
              placeholder="1234 AB"
              className="pr-10"
            />
            <div className="absolute right-3 top-1/2 -translate-y-1/2">
              {getStatusIcon()}
            </div>
          </div>
          <Button
            type="button"
            variant="outline"
            size="icon"
            onClick={handleManualLookup}
            disabled={isLoading || !postcode}
            title="Zoek postcode"
          >
            <Search className="h-4 w-4" />
          </Button>
        </div>
        {getStatusMessage() && (
          <p className={cn(
            "text-xs",
            status === 'found' ? "text-primary" : "text-destructive"
          )}>
            {getStatusMessage()}
          </p>
        )}
      </div>
      <div className="space-y-2">
        <Label htmlFor="customer_city">Plaats</Label>
        <Input
          id="customer_city"
          value={city}
          onChange={(e) => {
            onCityChange(e.target.value);
            setCityLocked(false);
          }}
          placeholder="Amsterdam"
          className={cn(
            cityLocked && "bg-muted/50"
          )}
        />
        {cityLocked && (
          <p className="text-xs text-muted-foreground">
            Automatisch ingevuld. Klik om aan te passen.
          </p>
        )}
      </div>
    </>
  );
};

export default PostcodeField;
