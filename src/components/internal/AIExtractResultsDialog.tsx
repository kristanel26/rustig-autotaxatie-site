import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Check, AlertTriangle, HelpCircle, X } from 'lucide-react';
import type { ExtractionResult, Section } from './AIExtractButton';

interface AIExtractResultsDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  results: ExtractionResult[];
  sourcePhotos: string[];
  section: Section;
  onAccept: (result: ExtractionResult) => void;
}

const SECTION_TITLES: Record<Section, string> = {
  voertuigidentificatie: 'Voertuigidentificatie',
  tellerstand: 'Tellerstand',
  banden: 'Banden en Wielen',
  massa: 'Massa en Gewichten',
  gasinstallatie: 'Gasinstallatie',
};

const FIELD_LABELS: Record<string, string> = {
  license_plate: 'Kenteken',
  vin: 'VIN / Chassisnummer',
  tellerstand: 'Kilometerstand',
  tire_size: 'Bandenmaat',
  tire_dot: 'DOT-code',
  max_massa: 'Toegestane max massa',
  max_combinatie_massa: 'Max combinatie massa',
  aslast_voor: 'Aslast voor',
  aslast_achter: 'Aslast achter',
  gas_type: 'Type gasinstallatie',
  gas_hose_date: 'Gasslang productiedatum',
  pressure_regulator_date: 'Drukregelaar productiedatum',
};

const STATUS_CONFIG = {
  zeker: {
    label: 'Zeker',
    color: 'bg-green-100 text-green-800 border-green-200',
    icon: Check,
  },
  waarschijnlijk: {
    label: 'Waarschijnlijk',
    color: 'bg-yellow-100 text-yellow-800 border-yellow-200',
    icon: AlertTriangle,
  },
  ontbreekt: {
    label: 'Ontbreekt',
    color: 'bg-gray-100 text-gray-600 border-gray-200',
    icon: HelpCircle,
  },
};

export function AIExtractResultsDialog({
  open,
  onOpenChange,
  results,
  sourcePhotos,
  section,
  onAccept,
}: AIExtractResultsDialogProps) {
  const validResults = results.filter(r => r.status !== 'ontbreekt' && r.proposed_value);

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-lg max-h-[80vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            AI Extractie - {SECTION_TITLES[section]}
          </DialogTitle>
          <DialogDescription>
            De AI heeft de volgende gegevens uit de foto's gehaald. 
            Controleer de waarden en klik op "Neem over" om ze te gebruiken.
          </DialogDescription>
        </DialogHeader>

        {/* Source photo thumbnail */}
        {sourcePhotos.length > 0 && (
          <div className="flex gap-2 overflow-x-auto py-2">
            {sourcePhotos.slice(0, 3).map((url, i) => (
              <img
                key={i}
                src={url}
                alt={`Bron ${i + 1}`}
                className="h-16 w-24 object-cover rounded border"
              />
            ))}
            {sourcePhotos.length > 3 && (
              <div className="h-16 w-24 flex items-center justify-center bg-muted rounded border text-sm text-muted-foreground">
                +{sourcePhotos.length - 3}
              </div>
            )}
          </div>
        )}

        {/* Results */}
        <div className="space-y-3 mt-4">
          {results.map((result, index) => {
            const statusConfig = STATUS_CONFIG[result.status];
            const StatusIcon = statusConfig.icon;
            const fieldLabel = FIELD_LABELS[result.field_key] || result.field_key;
            const isAcceptable = result.status !== 'ontbreekt' && result.proposed_value;

            return (
              <div
                key={index}
                className="border rounded-lg p-3 space-y-2"
              >
                <div className="flex items-center justify-between">
                  <span className="font-medium text-sm">{fieldLabel}</span>
                  <Badge variant="outline" className={statusConfig.color}>
                    <StatusIcon className="h-3 w-3 mr-1" />
                    {statusConfig.label} ({result.confidence}%)
                  </Badge>
                </div>

                {result.proposed_value ? (
                  <div className="bg-muted/50 rounded px-3 py-2">
                    <code className="text-sm font-mono">{result.proposed_value}</code>
                  </div>
                ) : (
                  <div className="text-sm text-muted-foreground italic">
                    Geen waarde gevonden
                  </div>
                )}

                {result.raw_text && result.raw_text !== result.proposed_value && (
                  <div className="text-xs text-muted-foreground">
                    Ruwe tekst: {result.raw_text}
                  </div>
                )}

                {isAcceptable && (
                  <Button
                    size="sm"
                    onClick={() => onAccept(result)}
                    className="w-full mt-2"
                  >
                    <Check className="h-3 w-3 mr-2" />
                    Neem over
                  </Button>
                )}
              </div>
            );
          })}

          {results.length === 0 && (
            <div className="text-center py-8 text-muted-foreground">
              Geen gegevens gevonden in de foto's.
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="flex justify-end mt-4 pt-4 border-t">
          <Button variant="outline" onClick={() => onOpenChange(false)}>
            <X className="h-4 w-4 mr-2" />
            Sluiten
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
