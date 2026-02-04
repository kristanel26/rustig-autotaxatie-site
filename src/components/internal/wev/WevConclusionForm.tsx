import { useEffect, useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { AlertTriangle, CheckCircle } from 'lucide-react';

export interface WevConclusionData {
  wev_bandbreedte_min: string;
  wev_bandbreedte_max: string;
  wev_eindwaarde: string;
  wev_motivatie_eindwaarde: string;
}

export const getInitialWevConclusionData = (): WevConclusionData => ({
  wev_bandbreedte_min: '',
  wev_bandbreedte_max: '',
  wev_eindwaarde: '',
  wev_motivatie_eindwaarde: '',
});

interface WevConclusionFormProps {
  data: WevConclusionData;
  onChange: (field: keyof WevConclusionData, value: string) => void;
  wevDefinitief?: string; // From AutotelexData form
}

const formatCurrency = (value: number) => {
  if (value === 0 || isNaN(value)) return '';
  return new Intl.NumberFormat('nl-NL', {
    style: 'currency',
    currency: 'EUR',
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(value);
};

export const WevConclusionForm = ({ data, onChange, wevDefinitief }: WevConclusionFormProps) => {
  const [showOutOfRangeWarning, setShowOutOfRangeWarning] = useState(false);

  const minValue = parseFloat(data.wev_bandbreedte_min) || 0;
  const maxValue = parseFloat(data.wev_bandbreedte_max) || 0;
  const eindwaarde = parseFloat(data.wev_eindwaarde) || 0;

  // Set default eindwaarde from wevDefinitief if available
  useEffect(() => {
    if (wevDefinitief && !data.wev_eindwaarde) {
      onChange('wev_eindwaarde', wevDefinitief);
    }
  }, [wevDefinitief, data.wev_eindwaarde, onChange]);

  // Check if eindwaarde is outside bandwidth
  useEffect(() => {
    if (minValue > 0 && maxValue > 0 && eindwaarde > 0) {
      setShowOutOfRangeWarning(eindwaarde < minValue || eindwaarde > maxValue);
    } else {
      setShowOutOfRangeWarning(false);
    }
  }, [minValue, maxValue, eindwaarde]);

  const isComplete = 
    data.wev_bandbreedte_min && 
    data.wev_bandbreedte_max && 
    data.wev_eindwaarde && 
    data.wev_motivatie_eindwaarde;

  const isBandwidthValid = minValue > 0 && maxValue > 0 && maxValue >= minValue;
  const isEindwaardeInRange = eindwaarde >= minValue && eindwaarde <= maxValue;

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-lg flex items-center gap-2">
          Bandbreedte en conclusie
          {!isComplete && (
            <span className="text-xs font-normal text-destructive">(alle velden verplicht)</span>
          )}
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Bandwidth */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label htmlFor="wev_bandbreedte_min">Bandbreedte minimum (€) *</Label>
            <Input
              id="wev_bandbreedte_min"
              type="number"
              min="0"
              step="1"
              value={data.wev_bandbreedte_min}
              onChange={(e) => onChange('wev_bandbreedte_min', e.target.value)}
              placeholder="0"
              className={!data.wev_bandbreedte_min ? 'border-destructive' : ''}
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="wev_bandbreedte_max">Bandbreedte maximum (€) *</Label>
            <Input
              id="wev_bandbreedte_max"
              type="number"
              min="0"
              step="1"
              value={data.wev_bandbreedte_max}
              onChange={(e) => onChange('wev_bandbreedte_max', e.target.value)}
              placeholder="0"
              className={!data.wev_bandbreedte_max ? 'border-destructive' : ''}
            />
          </div>
        </div>

        {/* Bandwidth visualization */}
        {isBandwidthValid && (
          <div className="p-4 bg-muted/50 rounded-lg">
            <div className="flex items-center justify-between text-sm">
              <span className="text-muted-foreground">Bandbreedte:</span>
              <span className="font-medium">
                {formatCurrency(minValue)} - {formatCurrency(maxValue)}
              </span>
            </div>
            <div className="flex items-center justify-between text-sm mt-1">
              <span className="text-muted-foreground">Marge:</span>
              <span className="font-medium">
                {formatCurrency(maxValue - minValue)} ({((maxValue - minValue) / minValue * 100).toFixed(1)}%)
              </span>
            </div>
          </div>
        )}

        {/* Warning for max < min */}
        {minValue > 0 && maxValue > 0 && maxValue < minValue && (
          <Alert className="bg-destructive/10 border-destructive">
            <AlertTriangle className="h-4 w-4" />
            <AlertDescription>
              De maximum bandbreedte kan niet lager zijn dan de minimum bandbreedte.
            </AlertDescription>
          </Alert>
        )}

        {/* Final value */}
        <div className="space-y-2 pt-4 border-t">
          <Label htmlFor="wev_eindwaarde">Eindwaarde WEV (€) *</Label>
          <Input
            id="wev_eindwaarde"
            type="number"
            min="0"
            step="1"
            value={data.wev_eindwaarde}
            onChange={(e) => onChange('wev_eindwaarde', e.target.value)}
            placeholder="0"
            className={`text-lg font-semibold ${!data.wev_eindwaarde ? 'border-destructive' : showOutOfRangeWarning ? 'border-warning' : 'border-primary'}`}
          />
          {wevDefinitief && (
            <p className="text-xs text-muted-foreground">
              Standaard overgenomen van WEV definitief: {formatCurrency(parseFloat(wevDefinitief))}
            </p>
          )}
        </div>

        {/* Out of range warning */}
        {showOutOfRangeWarning && (
          <Alert className="bg-warning/10 border-warning">
            <AlertTriangle className="h-4 w-4" />
            <AlertDescription>
              Let op: de eindwaarde ({formatCurrency(eindwaarde)}) ligt buiten de opgegeven bandbreedte 
              ({formatCurrency(minValue)} - {formatCurrency(maxValue)}). 
              Onderbouw dit extra in de motivatie.
            </AlertDescription>
          </Alert>
        )}

        {/* In range confirmation */}
        {isBandwidthValid && eindwaarde > 0 && isEindwaardeInRange && (
          <Alert className="bg-primary/10 border-primary">
            <CheckCircle className="h-4 w-4" />
            <AlertDescription>
              De eindwaarde ligt binnen de opgegeven bandbreedte.
            </AlertDescription>
          </Alert>
        )}

        {/* Motivation */}
        <div className="space-y-2">
          <Label htmlFor="wev_motivatie_eindwaarde">Motivatie eindwaarde *</Label>
          <Textarea
            id="wev_motivatie_eindwaarde"
            value={data.wev_motivatie_eindwaarde}
            onChange={(e) => onChange('wev_motivatie_eindwaarde', e.target.value)}
            rows={5}
            placeholder="Onderbouw de gekozen eindwaarde op basis van de marktanalyse, vergelijkingsobjecten en toegepaste correcties..."
            className={!data.wev_motivatie_eindwaarde ? 'border-destructive' : ''}
          />
          <p className="text-xs text-muted-foreground">
            Een heldere motivatie is essentieel voor de fiscale verdedigbaarheid van het rapport.
          </p>
        </div>

        {/* Summary card */}
        {isComplete && (
          <div className="p-4 bg-primary/5 border border-primary/20 rounded-lg">
            <h4 className="font-semibold text-primary mb-2">Samenvatting waardebepaling</h4>
            <div className="grid grid-cols-2 gap-4 text-sm">
              <div>
                <span className="text-muted-foreground">Bandbreedte:</span>
                <p className="font-medium">{formatCurrency(minValue)} - {formatCurrency(maxValue)}</p>
              </div>
              <div>
                <span className="text-muted-foreground">Eindwaarde WEV:</span>
                <p className="font-semibold text-lg">{formatCurrency(eindwaarde)}</p>
              </div>
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default WevConclusionForm;
