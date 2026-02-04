import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Plus, Trash2, AlertTriangle } from 'lucide-react';

export interface WevComparable {
  id: string;
  bron: string;
  datum: string;
  prijs: string;
  toelichting: string;
}

export interface WevComparablesData {
  wev_comparables: WevComparable[];
}

export const getInitialWevComparablesData = (): WevComparablesData => ({
  wev_comparables: [],
});

const createNewComparable = (): WevComparable => ({
  id: crypto.randomUUID(),
  bron: '',
  datum: '',
  prijs: '',
  toelichting: '',
});

interface WevComparablesFormProps {
  data: WevComparablesData;
  onChange: (comparables: WevComparable[]) => void;
}

export const WevComparablesForm = ({ data, onChange }: WevComparablesFormProps) => {
  const comparables = data.wev_comparables || [];
  const isComplete = comparables.length >= 3 && comparables.every(c => 
    c.bron && c.datum && c.prijs && c.toelichting
  );

  const handleAddComparable = () => {
    onChange([...comparables, createNewComparable()]);
  };

  const handleRemoveComparable = (id: string) => {
    onChange(comparables.filter(c => c.id !== id));
  };

  const handleComparableChange = (id: string, field: keyof WevComparable, value: string) => {
    onChange(comparables.map(c => 
      c.id === id ? { ...c, [field]: value } : c
    ));
  };

  const formatCurrency = (value: string) => {
    const num = parseFloat(value);
    if (isNaN(num)) return '';
    return new Intl.NumberFormat('nl-NL', {
      style: 'currency',
      currency: 'EUR',
      minimumFractionDigits: 0,
    }).format(num);
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-lg flex items-center gap-2">
          Vergelijkingsobjecten
          {comparables.length < 3 && (
            <span className="text-xs font-normal text-destructive">
              (minimaal 3 verplicht)
            </span>
          )}
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Warning if less than 3 comparables */}
        {comparables.length < 3 && (
          <Alert className="bg-warning/10 border-warning">
            <AlertTriangle className="h-4 w-4" />
            <AlertDescription>
              Er zijn minimaal 3 vergelijkingsobjecten nodig voor een onderbouwde WEV-taxatie.
              Voeg nog {3 - comparables.length} object{comparables.length === 2 ? '' : 'en'} toe.
            </AlertDescription>
          </Alert>
        )}

        {/* Comparables list */}
        <div className="space-y-4">
          {comparables.map((comparable, index) => {
            const isItemComplete = comparable.bron && comparable.datum && comparable.prijs && comparable.toelichting;
            
            return (
              <Card key={comparable.id} className={!isItemComplete ? 'border-destructive/50' : ''}>
                <CardHeader className="pb-2">
                  <div className="flex items-center justify-between">
                    <CardTitle className="text-base">
                      Vergelijkingsobject {index + 1}
                      {comparable.prijs && (
                        <span className="ml-2 text-sm font-normal text-muted-foreground">
                          - {formatCurrency(comparable.prijs)}
                        </span>
                      )}
                    </CardTitle>
                    <Button
                      type="button"
                      variant="ghost"
                      size="sm"
                      onClick={() => handleRemoveComparable(comparable.id)}
                      className="text-destructive hover:text-destructive"
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div className="space-y-2">
                      <Label>Bron *</Label>
                      <Input
                        value={comparable.bron}
                        onChange={(e) => handleComparableChange(comparable.id, 'bron', e.target.value)}
                        placeholder="Autoscout24, Marktplaats..."
                        className={!comparable.bron ? 'border-destructive' : ''}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label>Datum *</Label>
                      <Input
                        type="date"
                        value={comparable.datum}
                        onChange={(e) => handleComparableChange(comparable.id, 'datum', e.target.value)}
                        className={!comparable.datum ? 'border-destructive' : ''}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label>Prijs (€) *</Label>
                      <Input
                        type="number"
                        min="0"
                        step="1"
                        value={comparable.prijs}
                        onChange={(e) => handleComparableChange(comparable.id, 'prijs', e.target.value)}
                        placeholder="0"
                        className={!comparable.prijs ? 'border-destructive' : ''}
                      />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <Label>Toelichting *</Label>
                    <Textarea
                      value={comparable.toelichting}
                      onChange={(e) => handleComparableChange(comparable.id, 'toelichting', e.target.value)}
                      rows={2}
                      placeholder="Beschrijf het vergelijkingsobject en relevante overeenkomsten/verschillen..."
                      className={!comparable.toelichting ? 'border-destructive' : ''}
                    />
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>

        {/* Add button */}
        <Button
          type="button"
          variant="outline"
          onClick={handleAddComparable}
          className="w-full"
        >
          <Plus className="h-4 w-4 mr-2" />
          Vergelijkingsobject toevoegen
        </Button>

        {/* Summary */}
        {comparables.length > 0 && (
          <div className="pt-4 border-t">
            <div className="flex items-center justify-between text-sm">
              <span className="text-muted-foreground">Totaal vergelijkingsobjecten:</span>
              <span className={comparables.length >= 3 ? 'text-primary font-medium' : 'text-destructive font-medium'}>
                {comparables.length} van minimaal 3
              </span>
            </div>
            {comparables.length >= 3 && (
              <div className="flex items-center justify-between text-sm mt-2">
                <span className="text-muted-foreground">Gemiddelde prijs:</span>
                <span className="font-medium">
                  {formatCurrency(
                    (comparables.reduce((sum, c) => sum + (parseFloat(c.prijs) || 0), 0) / comparables.length).toString()
                  )}
                </span>
              </div>
            )}
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default WevComparablesForm;
