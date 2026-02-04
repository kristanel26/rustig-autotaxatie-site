import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';

export interface WevAdjustmentsData {
  wev_correcties_motivatie: string;
  wev_km_stand_correctie: string;
  wev_staat_correctie: string;
  wev_schade_correctie: string;
  wev_originaliteit_correctie: string;
}

export const getInitialWevAdjustmentsData = (): WevAdjustmentsData => ({
  wev_correcties_motivatie: '',
  wev_km_stand_correctie: '',
  wev_staat_correctie: '',
  wev_schade_correctie: '',
  wev_originaliteit_correctie: '',
});

interface WevAdjustmentsFormProps {
  data: WevAdjustmentsData;
  onChange: (field: keyof WevAdjustmentsData, value: string) => void;
}

export const WevAdjustmentsForm = ({ data, onChange }: WevAdjustmentsFormProps) => {
  const isComplete = data.wev_correcties_motivatie.trim().length > 0;

  const hasOptionalCorrections = 
    data.wev_km_stand_correctie || 
    data.wev_staat_correctie || 
    data.wev_schade_correctie || 
    data.wev_originaliteit_correctie;

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-lg flex items-center gap-2">
          Correcties en afweging
          {!isComplete && (
            <span className="text-xs font-normal text-destructive">(motivatie verplicht)</span>
          )}
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Main motivation - required */}
        <div className="space-y-2">
          <Label htmlFor="wev_correcties_motivatie">Motivatie correcties *</Label>
          <Textarea
            id="wev_correcties_motivatie"
            value={data.wev_correcties_motivatie}
            onChange={(e) => onChange('wev_correcties_motivatie', e.target.value)}
            rows={5}
            placeholder="Beschrijf hier de afwegingen en correcties die zijn toegepast op basis van de vergelijkingsobjecten. Leg uit hoe de specifieke kenmerken van dit voertuig de waarde beïnvloeden ten opzichte van de marktgegevens..."
            className={!data.wev_correcties_motivatie ? 'border-destructive' : ''}
          />
          <p className="text-xs text-muted-foreground">
            Geef een uitgebreide onderbouwing van de waardebepalende factoren en eventuele correcties.
          </p>
        </div>

        {/* Optional specific corrections */}
        <Accordion type="single" collapsible className="w-full">
          <AccordionItem value="specific-corrections">
            <AccordionTrigger className="text-sm">
              Specifieke correctiefactoren (optioneel)
              {hasOptionalCorrections && (
                <span className="ml-2 text-xs text-muted-foreground">
                  ({[
                    data.wev_km_stand_correctie && 'km',
                    data.wev_staat_correctie && 'staat',
                    data.wev_schade_correctie && 'schade',
                    data.wev_originaliteit_correctie && 'originaliteit',
                  ].filter(Boolean).join(', ')})
                </span>
              )}
            </AccordionTrigger>
            <AccordionContent className="space-y-4 pt-4">
              <p className="text-xs text-muted-foreground mb-4">
                Optioneel kunt u hier specifieke correctiefactoren tekstueel toelichten. 
                Deze worden niet als percentages berekend, maar dienen ter onderbouwing.
              </p>

              <div className="space-y-2">
                <Label htmlFor="wev_km_stand_correctie">Kilometerstand correctie</Label>
                <Textarea
                  id="wev_km_stand_correctie"
                  value={data.wev_km_stand_correctie}
                  onChange={(e) => onChange('wev_km_stand_correctie', e.target.value)}
                  rows={2}
                  placeholder="Toelichting afwijkende kilometerstand t.o.v. vergelijkingsobjecten..."
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="wev_staat_correctie">Staat/onderhoud correctie</Label>
                <Textarea
                  id="wev_staat_correctie"
                  value={data.wev_staat_correctie}
                  onChange={(e) => onChange('wev_staat_correctie', e.target.value)}
                  rows={2}
                  placeholder="Toelichting afwijkende staat of onderhoudsniveau..."
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="wev_schade_correctie">Schade correctie</Label>
                <Textarea
                  id="wev_schade_correctie"
                  value={data.wev_schade_correctie}
                  onChange={(e) => onChange('wev_schade_correctie', e.target.value)}
                  rows={2}
                  placeholder="Toelichting eventuele schade en invloed op waarde..."
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="wev_originaliteit_correctie">Originaliteit correctie</Label>
                <Textarea
                  id="wev_originaliteit_correctie"
                  value={data.wev_originaliteit_correctie}
                  onChange={(e) => onChange('wev_originaliteit_correctie', e.target.value)}
                  rows={2}
                  placeholder="Toelichting originaliteit, modificaties of accessoires..."
                />
              </div>
            </AccordionContent>
          </AccordionItem>
        </Accordion>
      </CardContent>
    </Card>
  );
};

export default WevAdjustmentsForm;
