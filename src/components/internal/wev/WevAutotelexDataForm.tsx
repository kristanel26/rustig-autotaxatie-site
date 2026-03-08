import { useEffect, useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Alert, AlertDescription } from '@/components/ui/alert';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { AlertTriangle } from 'lucide-react';

export interface WevAutotelexData {
  wev_btw_of_marge: string;
  wev_btw_marge_override_motivatie: string;
  wev_handelsinkoopwaarde_autotelex: string;
  wev_verkoopwaarde_autotelex: string;
  wev_autotelex_lookup_timestamp: string;
  wev_bron_waardes: string;
  wev_manual_source_note: string;
  wev_berekend: string;
  wev_definitief: string;
  wev_override_actief: boolean;
  wev_override_redenering: string;
  wev_schade_bedrag: string;
}

export const getInitialWevAutotelexData = (): WevAutotelexData => ({
  wev_btw_of_marge: '',
  wev_btw_marge_override_motivatie: '',
  wev_handelsinkoopwaarde_autotelex: '',
  wev_verkoopwaarde_autotelex: '',
  wev_autotelex_lookup_timestamp: '',
  wev_bron_waardes: 'Autotelex',
  wev_manual_source_note: '',
  wev_berekend: '',
  wev_definitief: '',
  wev_override_actief: false,
  wev_override_redenering: '',
  wev_schade_bedrag: '',
});

interface WevAutotelexDataFormProps {
  data: WevAutotelexData;
  onChange: (field: keyof WevAutotelexData, value: string | boolean) => void;
}

const btwMargeOptions = [
  { value: 'BTW', label: 'BTW-voertuig' },
  { value: 'marge', label: 'Marge-voertuig' },
];

// Calculate WEV: rounded average of handelsinkoop and verkoop, minus schade
const calculateWev = (handelsinkoop: number, verkoop: number, schade: number = 0): number => {
  return Math.round((handelsinkoop + verkoop) / 2 - schade);
};

// Format currency for display
const formatCurrency = (value: number) => {
  if (value === 0) return '';
  return new Intl.NumberFormat('nl-NL', {
    style: 'currency',
    currency: 'EUR',
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(value);
};

export const WevAutotelexDataForm = ({ data, onChange }: WevAutotelexDataFormProps) => {
  const [showWarning, setShowWarning] = useState(false);
  const [showBtwOverride, setShowBtwOverride] = useState(false);

  // Parse numeric values
  const handelsinkoopValue = parseFloat(data.wev_handelsinkoopwaarde_autotelex) || 0;
  const verkoopValue = parseFloat(data.wev_verkoopwaarde_autotelex) || 0;
  const wevBerekend = parseFloat(data.wev_berekend) || 0;
  const wevDefinitief = parseFloat(data.wev_definitief) || 0;

  // Check if verkoop < handelsinkoop (warning condition)
  useEffect(() => {
    if (handelsinkoopValue > 0 && verkoopValue > 0 && verkoopValue < handelsinkoopValue) {
      setShowWarning(true);
    } else {
      setShowWarning(false);
    }
  }, [handelsinkoopValue, verkoopValue]);

  // Auto-calculate wev_berekend when handelsinkoop or verkoop changes
  useEffect(() => {
    if (handelsinkoopValue > 0 && verkoopValue > 0) {
      const newWevBerekend = calculateWev(handelsinkoopValue, verkoopValue);
      
      // Update wev_berekend
      if (newWevBerekend.toString() !== data.wev_berekend) {
        onChange('wev_berekend', newWevBerekend.toString());
      }
      
      // If override not active, sync wev_definitief to wev_berekend
      if (!data.wev_override_actief) {
        if (newWevBerekend.toString() !== data.wev_definitief) {
          onChange('wev_definitief', newWevBerekend.toString());
        }
      }
    } else if (handelsinkoopValue === 0 || verkoopValue === 0) {
      // Clear berekend if inputs are empty
      if (data.wev_berekend !== '') {
        onChange('wev_berekend', '');
      }
    }
  }, [handelsinkoopValue, verkoopValue, data.wev_override_actief, data.wev_berekend, data.wev_definitief, onChange]);

  // Handle wev_definitief change - detect override
  const handleDefinitieChange = (value: string) => {
    const numValue = parseFloat(value) || 0;
    onChange('wev_definitief', value);

    // Check if override is now active
    if (wevBerekend > 0 && numValue !== wevBerekend) {
      if (!data.wev_override_actief) {
        onChange('wev_override_actief', true);
      }
    } else if (numValue === wevBerekend) {
      // Values match, disable override
      if (data.wev_override_actief) {
        onChange('wev_override_actief', false);
        onChange('wev_override_redenering', '');
      }
    }
  };

  // Check if override needs reasoning
  const needsRedenering = data.wev_override_actief && !data.wev_override_redenering.trim();

  // Check for manual input (no API timestamp)
  const isManualInput = !data.wev_autotelex_lookup_timestamp;

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-lg">Marktgegevens</CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* BTW/Marge selection */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label htmlFor="wev_btw_of_marge">BTW of Marge *</Label>
            <Select
              value={data.wev_btw_of_marge}
              onValueChange={(value) => {
                onChange('wev_btw_of_marge', value);
                // If changed manually, show override motivation field
                setShowBtwOverride(true);
              }}
            >
              <SelectTrigger className={!data.wev_btw_of_marge ? 'border-destructive' : ''}>
                <SelectValue placeholder="Selecteer..." />
              </SelectTrigger>
              <SelectContent>
                {btwMargeOptions.map((option) => (
                  <SelectItem key={option.value} value={option.value}>
                    {option.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            <p className="text-xs text-muted-foreground">
              Bepaalt welke marktwaarden van toepassing zijn.
            </p>
          </div>
          
          {showBtwOverride && data.wev_btw_of_marge && (
            <div className="space-y-2">
              <Label htmlFor="wev_btw_marge_override_motivatie">Motivatie BTW/Marge keuze</Label>
              <Input
                id="wev_btw_marge_override_motivatie"
                value={data.wev_btw_marge_override_motivatie}
                onChange={(e) => onChange('wev_btw_marge_override_motivatie', e.target.value)}
                placeholder="Indien afwijkend, licht toe..."
              />
            </div>
          )}
        </div>

        {/* Input values */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label htmlFor="wev_handelsinkoopwaarde_autotelex">
              Handelsinkoopwaarde (€) *
            </Label>
            <Input
              id="wev_handelsinkoopwaarde_autotelex"
              type="number"
              min="0"
              step="1"
              value={data.wev_handelsinkoopwaarde_autotelex}
              onChange={(e) => onChange('wev_handelsinkoopwaarde_autotelex', e.target.value)}
              placeholder="0"
              className={!data.wev_handelsinkoopwaarde_autotelex ? 'border-destructive' : ''}
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="wev_verkoopwaarde_autotelex">
              Verkoopwaarde (€) *
            </Label>
            <Input
              id="wev_verkoopwaarde_autotelex"
              type="number"
              min="0"
              step="1"
              value={data.wev_verkoopwaarde_autotelex}
              onChange={(e) => onChange('wev_verkoopwaarde_autotelex', e.target.value)}
              placeholder="0"
              className={!data.wev_verkoopwaarde_autotelex ? 'border-destructive' : ''}
            />
          </div>
        </div>

        {/* Warning for verkoop < handelsinkoop */}
        {showWarning && (
          <Alert className="bg-warning/10 border-warning text-warning-foreground">
            <AlertTriangle className="h-4 w-4" />
            <AlertDescription>
              Let op: de verkoopwaarde is lager dan de handelsinkoopwaarde. Dit is ongebruikelijk. Controleer of de waarden correct zijn ingevoerd.
            </AlertDescription>
          </Alert>
        )}

        {/* Source info */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label htmlFor="wev_bron_waardes">Bron marktgegevens</Label>
            <Input
              id="wev_bron_waardes"
              type="text"
              value={data.wev_bron_waardes}
              onChange={(e) => onChange('wev_bron_waardes', e.target.value)}
              placeholder="Autotelex"
            />
          </div>
          {data.wev_autotelex_lookup_timestamp && (
            <div className="space-y-2">
              <Label>Opgehaald op</Label>
              <Input
                type="text"
                value={new Date(data.wev_autotelex_lookup_timestamp).toLocaleString('nl-NL')}
                disabled
                className="bg-muted"
              />
            </div>
          )}
        </div>

        {/* Manual source note - required if no API lookup */}
        {isManualInput && (handelsinkoopValue > 0 || verkoopValue > 0) && (
          <div className="space-y-2">
            <Label htmlFor="wev_manual_source_note" className="flex items-center gap-2">
              Bronvermelding handmatige invoer *
              {!data.wev_manual_source_note && (
                <span className="text-xs text-destructive">(verplicht bij handmatige invoer)</span>
              )}
            </Label>
            <Textarea
              id="wev_manual_source_note"
              value={data.wev_manual_source_note}
              onChange={(e) => onChange('wev_manual_source_note', e.target.value)}
              rows={2}
              placeholder="Vermeld de bron en datum van de marktgegevens..."
              className={!data.wev_manual_source_note ? 'border-destructive' : ''}
            />
          </div>
        )}

        {/* Calculated and final values */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-4 border-t">
          <div className="space-y-2">
            <Label htmlFor="wev_berekend">WEV berekend (gemiddelde)</Label>
            <Input
              id="wev_berekend"
              type="text"
              value={wevBerekend > 0 ? formatCurrency(wevBerekend) : ''}
              readOnly
              disabled
              className="bg-muted font-medium"
              placeholder="Wordt automatisch berekend"
            />
            <p className="text-xs text-muted-foreground">
              Rekenkundig gemiddelde van handelsinkoopwaarde en verkoopwaarde, afgerond op hele euro's.
            </p>
          </div>
          <div className="space-y-2">
            <Label htmlFor="wev_definitief">WEV definitief (€) *</Label>
            <Input
              id="wev_definitief"
              type="number"
              min="0"
              step="1"
              value={data.wev_definitief}
              onChange={(e) => handleDefinitieChange(e.target.value)}
              className={data.wev_override_actief ? 'border-warning' : ''}
              placeholder="0"
            />
            {data.wev_override_actief && (
              <p className="text-xs text-warning">
                Afwijkend van berekende waarde. Onderbouwing vereist.
              </p>
            )}
          </div>
        </div>

        {/* Override reasoning - only visible when override is active */}
        {(data.wev_override_actief || (wevDefinitief !== wevBerekend && wevBerekend > 0 && wevDefinitief > 0)) && (
          <div className="space-y-2 pt-4 border-t">
            <Label htmlFor="wev_override_redenering" className="flex items-center gap-2">
              Onderbouwing afwijking *
              {needsRedenering && (
                <span className="text-xs text-destructive">(verplicht bij afwijking)</span>
              )}
            </Label>
            <Textarea
              id="wev_override_redenering"
              value={data.wev_override_redenering}
              onChange={(e) => onChange('wev_override_redenering', e.target.value)}
              rows={3}
              placeholder="Geef hier de onderbouwing voor de afwijking van de berekende WEV..."
              className={needsRedenering ? 'border-destructive' : ''}
            />
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default WevAutotelexDataForm;
