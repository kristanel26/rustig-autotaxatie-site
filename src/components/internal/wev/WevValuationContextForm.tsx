import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';

export interface WevValuationContextData {
  wev_peildatum: string;
  wev_reden_peildatum: string;
  wev_doel_taxatie: string;
  wev_marktsegment: string;
  wev_doelgroep: string;
}

export const getInitialWevValuationContextData = (): WevValuationContextData => ({
  wev_peildatum: '',
  wev_reden_peildatum: '',
  wev_doel_taxatie: '',
  wev_marktsegment: '',
  wev_doelgroep: '',
});

interface WevValuationContextFormProps {
  data: WevValuationContextData;
  onChange: (field: keyof WevValuationContextData, value: string) => void;
}

const doelTaxatieOptions = [
  { value: 'overdracht_zakelijk_prive', label: 'Overdracht zakelijk-privé' },
  { value: 'schenking', label: 'Schenking' },
  { value: 'inbreng_onderneming', label: 'Inbreng onderneming' },
  { value: 'balanswaardering', label: 'Balanswaardering' },
  { value: 'anders', label: 'Anders' },
];

const marktsegmentOptions = [
  { value: 'particulier', label: 'Particulier' },
  { value: 'handel', label: 'Handel' },
  { value: 'verzamelaar', label: 'Verzamelaar' },
];

export const WevValuationContextForm = ({ data, onChange }: WevValuationContextFormProps) => {
  const isComplete = 
    data.wev_peildatum && 
    data.wev_reden_peildatum && 
    data.wev_doel_taxatie && 
    data.wev_marktsegment && 
    data.wev_doelgroep;

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-lg flex items-center gap-2">
          Waarderingskader
          {!isComplete && (
            <span className="text-xs font-normal text-destructive">(alle velden verplicht)</span>
          )}
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Peildatum and reason */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label htmlFor="wev_peildatum">Peildatum *</Label>
            <Input
              id="wev_peildatum"
              type="date"
              value={data.wev_peildatum}
              onChange={(e) => onChange('wev_peildatum', e.target.value)}
              className={!data.wev_peildatum ? 'border-destructive' : ''}
            />
            <p className="text-xs text-muted-foreground">
              De datum waarop de waarde wordt bepaald (fiscaal relevant moment).
            </p>
          </div>
          <div className="space-y-2">
            <Label htmlFor="wev_doel_taxatie">Doel taxatie *</Label>
            <Select
              value={data.wev_doel_taxatie}
              onValueChange={(value) => onChange('wev_doel_taxatie', value)}
            >
              <SelectTrigger className={!data.wev_doel_taxatie ? 'border-destructive' : ''}>
                <SelectValue placeholder="Selecteer doel..." />
              </SelectTrigger>
              <SelectContent>
                {doelTaxatieOptions.map((option) => (
                  <SelectItem key={option.value} value={option.value}>
                    {option.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>

        {/* Reason for valuation date */}
        <div className="space-y-2">
          <Label htmlFor="wev_reden_peildatum">Reden peildatum *</Label>
          <Textarea
            id="wev_reden_peildatum"
            value={data.wev_reden_peildatum}
            onChange={(e) => onChange('wev_reden_peildatum', e.target.value)}
            rows={3}
            placeholder="Onderbouw waarom deze peildatum van toepassing is..."
            className={!data.wev_reden_peildatum ? 'border-destructive' : ''}
          />
        </div>

        {/* Market segment */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label htmlFor="wev_marktsegment">Marktsegment *</Label>
            <Select
              value={data.wev_marktsegment}
              onValueChange={(value) => onChange('wev_marktsegment', value)}
            >
              <SelectTrigger className={!data.wev_marktsegment ? 'border-destructive' : ''}>
                <SelectValue placeholder="Selecteer marktsegment..." />
              </SelectTrigger>
              <SelectContent>
                {marktsegmentOptions.map((option) => (
                  <SelectItem key={option.value} value={option.value}>
                    {option.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            <p className="text-xs text-muted-foreground">
              Het marktsegment waar dit voertuig verhandeld zou worden.
            </p>
          </div>
        </div>

        {/* Target audience */}
        <div className="space-y-2">
          <Label htmlFor="wev_doelgroep">Doelgroep *</Label>
          <Textarea
            id="wev_doelgroep"
            value={data.wev_doelgroep}
            onChange={(e) => onChange('wev_doelgroep', e.target.value)}
            rows={3}
            placeholder="Beschrijf de typische koper of doelgroep voor dit voertuig..."
            className={!data.wev_doelgroep ? 'border-destructive' : ''}
          />
          <p className="text-xs text-muted-foreground">
            De typische koper die geïnteresseerd zou zijn in dit voertuig.
          </p>
        </div>
      </CardContent>
    </Card>
  );
};

export default WevValuationContextForm;
