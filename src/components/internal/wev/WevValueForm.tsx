import { useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { numberToDutchWords } from '@/lib/normalizers';

export interface WevValueData {
  wev_eindwaarde: string;
  wev_eindwaarde_tekst: string;
}

export const getInitialWevValueData = (): WevValueData => ({
  wev_eindwaarde: '',
  wev_eindwaarde_tekst: '',
});

interface WevValueFormProps {
  data: WevValueData;
  onChange: (field: keyof WevValueData, value: string) => void;
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

export const WevValueForm = ({ data, onChange }: WevValueFormProps) => {
  const eindwaarde = parseFloat(data.wev_eindwaarde) || 0;

  // Auto-generate "waarde in woorden" when eindwaarde changes
  useEffect(() => {
    if (eindwaarde > 0) {
      const tekst = numberToDutchWords(eindwaarde);
      if (tekst !== data.wev_eindwaarde_tekst) {
        onChange('wev_eindwaarde_tekst', tekst);
      }
    } else if (data.wev_eindwaarde_tekst) {
      onChange('wev_eindwaarde_tekst', '');
    }
  }, [eindwaarde, data.wev_eindwaarde_tekst, onChange]);

  const isComplete = data.wev_eindwaarde && eindwaarde > 0;

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-lg flex items-center gap-2">
          Waarde in het Economisch Verkeer
          {!isComplete && (
            <span className="text-xs font-normal text-destructive">(eindwaarde verplicht)</span>
          )}
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Main WEV value */}
        <div className="space-y-2">
          <Label htmlFor="wev_eindwaarde">Definitieve WEV-waarde (€) *</Label>
          <Input
            id="wev_eindwaarde"
            type="number"
            min="0"
            step="1"
            value={data.wev_eindwaarde}
            onChange={(e) => onChange('wev_eindwaarde', e.target.value)}
            placeholder="0"
            className={`text-lg font-semibold ${!data.wev_eindwaarde ? 'border-destructive' : 'border-primary'}`}
          />
          <p className="text-xs text-muted-foreground">
            De waarde die het voertuig zou opbrengen bij verkoop op de voor de zaak meest geschikte wijze.
          </p>
        </div>

        {/* Value in words (auto-generated) */}
        <div className="space-y-2">
          <Label htmlFor="wev_eindwaarde_tekst">Waarde voluit geschreven</Label>
          <Input
            id="wev_eindwaarde_tekst"
            type="text"
            value={data.wev_eindwaarde_tekst}
            readOnly
            disabled
            className="bg-muted italic"
            placeholder="Wordt automatisch ingevuld"
          />
          <p className="text-xs text-muted-foreground">
            Wordt automatisch gegenereerd op basis van de eindwaarde.
          </p>
        </div>

        {/* Optional: Damage amount */}
        <div className="space-y-2 pt-4 border-t">
          <Label htmlFor="wev_schade_bedrag">Schadebedrag (€) - optioneel</Label>
          <Input
            id="wev_schade_bedrag"
            type="number"
            min="0"
            step="1"
            value={data.wev_schade_bedrag}
            onChange={(e) => onChange('wev_schade_bedrag', e.target.value)}
            placeholder="0"
          />
          <p className="text-xs text-muted-foreground">
            Indien van toepassing: het geschatte schadebedrag.
          </p>
        </div>

        {/* Summary display */}
        {isComplete && (
          <div className="p-4 bg-primary/5 border border-primary/20 rounded-lg mt-4">
            <h4 className="font-semibold text-primary mb-2">Samenvatting</h4>
            <div className="space-y-2 text-sm">
              <div className="flex justify-between">
                <span className="text-muted-foreground">WEV-waarde:</span>
                <span className="font-semibold text-lg">{formatCurrency(eindwaarde)}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Zegge:</span>
                <span className="italic">{data.wev_eindwaarde_tekst}</span>
              </div>
              {schadeBedrag > 0 && (
                <div className="flex justify-between pt-2 border-t">
                  <span className="text-muted-foreground">Schadebedrag:</span>
                  <span>{formatCurrency(schadeBedrag)}</span>
                </div>
              )}
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default WevValueForm;
