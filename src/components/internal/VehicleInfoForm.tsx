import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
import { Loader2, Search, Lock } from 'lucide-react';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';
import { AIExtractButton, PhotoType } from './AIExtractButton';
import { ColorCombobox } from './ColorCombobox';
import type { PhotoTypes } from './PhotoUploadForm';

export interface VehicleFormData {
  // Identifiers
  license_plate: string;
  vin: string;
  
  // Rapporttitel voertuig (vrij veld taxateur - voor PDF cover)
  vehicle_title: string;
  
  // Sectie 1: Voertuigidentificatie (RDW)
  rdw_merk: string;
  rdw_handelsbenaming: string;
  rdw_voertuigsoort: string;
  rdw_carrosserievorm: string;
  rdw_bouwjaar: string;
  rdw_datum_eerste_toelating: string;
  rdw_datum_eerste_tenaamstelling: string;
  rdw_datum_laatste_tenaamstelling: string;
  rdw_kleur: string;

  // Sectie 2: Technische hoofdgegevens (RDW)
  rdw_brandstof: string;
  rdw_aantal_cilinders: string;
  rdw_cilinderinhoud: string;
  rdw_vermogen_kw: string;
  rdw_aantal_deuren: string;
  rdw_wielbasis: string;

  // Transmissie (Taxateur - verplicht veld)
  transmissie: string;

  // Sectie 3: Massa en gewichten (RDW)
  rdw_ledig_gewicht: string;
  rdw_massa_rijklaar: string;
  rdw_max_massa: string;

  // Sectie 4: Keuring en status (RDW)
  rdw_apk_gekeurd: string;
  rdw_apk_vervaldatum: string;
  rdw_importvoertuig: string;

  // Sectie 5: Tellerstand en gebruik (Taxateur)
  tellerstand: string;
  tellerstand_type: string;

  // Sectie 6: Opbouw en constructie (Taxateur)
  soort_bouw: string;
  opbouw_merk: string;
  opbouw_type: string;
  constructievorm: string;

  // Sectie 7: Gebruik en stalling (Taxateur)
  gebruik: string;
  stalling: string;
  staat_bij_opname: string;

  // RDW status
  rdw_data_locked: boolean;
}

interface VehicleInfoFormProps {
  formData: VehicleFormData;
  onChange: (field: keyof VehicleFormData, value: string | boolean) => void;
  errors?: Record<string, string>;
  isEditMode?: boolean;
  reportType?: 'camper' | 'wev' | 'klassieker' | null;
  // AI extraction props
  photos?: string[];
  photoTypes?: PhotoTypes;
  reportId?: string;
}

export const getInitialVehicleFormData = (): VehicleFormData => ({
  license_plate: '',
  vin: '',
  vehicle_title: '',
  rdw_merk: '',
  rdw_handelsbenaming: '',
  rdw_voertuigsoort: '',
  rdw_carrosserievorm: '',
  rdw_bouwjaar: '',
  rdw_datum_eerste_toelating: '',
  rdw_datum_eerste_tenaamstelling: '',
  rdw_datum_laatste_tenaamstelling: '',
  rdw_kleur: '',
  rdw_brandstof: '',
  transmissie: '',
  rdw_aantal_cilinders: '',
  rdw_cilinderinhoud: '',
  rdw_vermogen_kw: '',
  rdw_aantal_deuren: '',
  rdw_wielbasis: '',
  rdw_ledig_gewicht: '',
  rdw_massa_rijklaar: '',
  rdw_max_massa: '',
  rdw_apk_gekeurd: '',
  rdw_apk_vervaldatum: '',
  rdw_importvoertuig: '',
  tellerstand: '',
  tellerstand_type: 'km',
  soort_bouw: '',
  opbouw_merk: '',
  opbouw_type: '',
  constructievorm: '',
  gebruik: '',
  stalling: '',
  staat_bij_opname: '',
  rdw_data_locked: false,
});

export const VehicleInfoForm = ({
  formData,
  onChange,
  errors = {},
  isEditMode = false,
  reportType = 'camper',
  photos = [],
  photoTypes = {},
  reportId = '',
}: VehicleInfoFormProps) => {
  // Determine if camper-specific sections should be shown
  const isCamperReport = reportType === 'camper' || reportType === null;
  const { toast } = useToast();
  const [isFetchingRDW, setIsFetchingRDW] = useState(false);

  const fetchRDWData = async () => {
    if (!formData.license_plate || formData.license_plate.length < 6) {
      toast({
        title: 'Kenteken ongeldig',
        description: 'Voer een geldig kenteken in om RDW data op te halen.',
        variant: 'destructive',
      });
      return;
    }

    setIsFetchingRDW(true);

    try {
      const { data, error } = await supabase.functions.invoke('rdw-lookup', {
        body: { kenteken: formData.license_plate },
      });

      if (error) {
        throw error;
      }

      if (data.error) {
        toast({
          title: 'RDW fout',
          description: data.error,
          variant: 'destructive',
        });
        return;
      }

      // Update all RDW fields (transmissie is now a taxateur field, not from RDW)
      const rdwFields: (keyof VehicleFormData)[] = [
        'rdw_merk', 'rdw_handelsbenaming', 'rdw_voertuigsoort', 'rdw_carrosserievorm',
        'rdw_bouwjaar', 'rdw_datum_eerste_toelating', 'rdw_datum_eerste_tenaamstelling',
        'rdw_datum_laatste_tenaamstelling', 'rdw_kleur', 'rdw_brandstof',
        'rdw_aantal_cilinders', 'rdw_cilinderinhoud', 'rdw_vermogen_kw',
        'rdw_aantal_deuren', 'rdw_wielbasis', 'rdw_ledig_gewicht',
        'rdw_massa_rijklaar', 'rdw_max_massa', 'rdw_apk_gekeurd',
        'rdw_apk_vervaldatum', 'rdw_importvoertuig',
      ];

      rdwFields.forEach(field => {
        if (data[field] !== undefined && data[field] !== null) {
          onChange(field, String(data[field]));
        }
      });

      // Lock RDW data
      onChange('rdw_data_locked', true);

      toast({
        title: 'RDW data opgehaald',
        description: 'Voertuiggegevens zijn succesvol ingeladen.',
      });

    } catch (error) {
      console.error('Error fetching RDW data:', error);
      toast({
        title: 'Fout bij ophalen',
        description: 'Er is een fout opgetreden bij het ophalen van RDW data.',
        variant: 'destructive',
      });
    } finally {
      setIsFetchingRDW(false);
    }
  };

  const rdwLocked = formData.rdw_data_locked;

  // Handler for AI extraction results - vehicle identification
  const handleVehicleAIAccept = (fieldKey: string, value: string) => {
    if (fieldKey === 'license_plate') {
      onChange('license_plate', value);
    } else if (fieldKey === 'vin') {
      onChange('vin', value);
    }
  };

  // Handler for AI extraction results - tellerstand
  const handleTellerstandAIAccept = (fieldKey: string, value: string) => {
    if (fieldKey === 'tellerstand') {
      onChange('tellerstand', value);
    }
  };

  const RDWBadge = () => (
    <Badge variant="secondary" className="ml-2 text-xs">
      <Lock className="h-3 w-3 mr-1" />
      RDW
    </Badge>
  );

  return (
    <div className="space-y-6">
      {/* Rapporttitel voertuig (vrij veld) */}
      <Card>
        <CardHeader>
          <CardTitle className="text-lg">Rapporttitel voertuig</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-2">
            <Label htmlFor="vehicle_title">Titel voor PDF-voorpagina *</Label>
            <Input
              id="vehicle_title"
              value={formData.vehicle_title}
              onChange={(e) => onChange('vehicle_title', e.target.value)}
              placeholder="Bijv. Dethleffs Globescout, Volkswagen Transporter T6"
              className={errors.vehicle_title ? 'border-destructive' : ''}
            />
            {errors.vehicle_title && (
              <p className="text-sm text-destructive">{errors.vehicle_title}</p>
            )}
            <p className="text-xs text-muted-foreground">
              Dit is de titel die prominent op de voorpagina van het PDF-rapport verschijnt. 
              Gebruik een herkenbare benaming (bijv. "Mercedes Sprinter Camper").
            </p>
          </div>
        </CardContent>
      </Card>

      {/* Kenteken + VIN */}
      <Card>
        <CardHeader>
          <CardTitle className="text-lg">Voertuigidentificatie</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="license_plate">Kenteken *</Label>
              <div className="flex gap-2">
                <Input
                  id="license_plate"
                  value={formData.license_plate}
                  onChange={(e) => onChange('license_plate', e.target.value)}
                  placeholder="65-PR-VK"
                  className={errors.license_plate ? 'border-destructive' : ''}
                  disabled={rdwLocked && isEditMode}
                />
                <Button
                  type="button"
                  variant="outline"
                  onClick={fetchRDWData}
                  disabled={isFetchingRDW || (rdwLocked && isEditMode)}
                >
                  {isFetchingRDW ? (
                    <Loader2 className="h-4 w-4 animate-spin" />
                  ) : (
                    <Search className="h-4 w-4" />
                  )}
                </Button>
              </div>
              {errors.license_plate && (
                <p className="text-sm text-destructive">{errors.license_plate}</p>
              )}
              <p className="text-xs text-muted-foreground">
                Klik op zoeken om RDW data automatisch op te halen
              </p>
            </div>
            <div className="space-y-2">
              <Label htmlFor="vin">Chassisnummer (VIN) *</Label>
              <Input
                id="vin"
                value={formData.vin}
                onChange={(e) => onChange('vin', e.target.value.toUpperCase())}
                className={errors.vin ? 'border-destructive' : ''}
                placeholder="Minimaal 4 tekens"
              />
              {errors.vin && (
                <p className="text-sm text-destructive">{errors.vin}</p>
              )}
            </div>
          </div>

          {/* AI Extraction Button for vehicle identification */}
          {photos.length > 0 && reportId && (
            <div className="pt-2">
              <AIExtractButton
                section="voertuigidentificatie"
                label="Haal kenteken en VIN uit foto's"
                photoTypes={['kenteken', 'vin_typeplaat', 'vin_ruit']}
                photos={photos}
                photoTypeMap={photoTypes}
                onAccept={handleVehicleAIAccept}
                reportId={reportId}
              />
            </div>
          )}

          {/* Sectie 1: RDW Voertuigidentificatie */}
          {rdwLocked && (
            <div className="pt-4 border-t">
              <div className="flex items-center mb-3">
                <h4 className="text-sm font-medium">RDW Gegevens</h4>
                <RDWBadge />
              </div>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="space-y-2">
                  <Label>Merk</Label>
                  <Input value={formData.rdw_merk} readOnly disabled className="bg-muted" />
                </div>
                <div className="space-y-2">
                  <Label>Handelsbenaming / Model</Label>
                  <Input value={formData.rdw_handelsbenaming} readOnly disabled className="bg-muted" />
                </div>
                <div className="space-y-2">
                  <Label>Voertuigsoort</Label>
                  <Input value={formData.rdw_voertuigsoort} readOnly disabled className="bg-muted" />
                </div>
                <div className="space-y-2">
                  <Label>Carrosserievorm</Label>
                  <Input value={formData.rdw_carrosserievorm} readOnly disabled className="bg-muted" />
                </div>
                <div className="space-y-2">
                  <Label>Bouwjaar</Label>
                  <Input value={formData.rdw_bouwjaar} readOnly disabled className="bg-muted" />
                </div>
                <div className="space-y-2">
                  <Label>Datum eerste toelating</Label>
                  <Input value={formData.rdw_datum_eerste_toelating} readOnly disabled className="bg-muted" />
                </div>
                <div className="space-y-2">
                  <Label>Datum eerste tenaamstelling</Label>
                  <Input value={formData.rdw_datum_eerste_tenaamstelling} readOnly disabled className="bg-muted" />
                </div>
                <div className="space-y-2">
                  <Label>Datum laatste tenaamstelling</Label>
                  <Input value={formData.rdw_datum_laatste_tenaamstelling} readOnly disabled className="bg-muted" />
                </div>
                <div className="space-y-2">
                  <Label>Kleur (bewerkbaar)</Label>
                  <ColorCombobox
                    value={formData.rdw_kleur}
                    onChange={(value) => onChange('rdw_kleur', value)}
                  />
                  <p className="text-xs text-muted-foreground">
                    Selecteer of voeg een nieuwe kleur toe
                  </p>
                </div>
              </div>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Sectie 2: Technische hoofdgegevens (RDW) */}
      {rdwLocked && (
        <Card>
          <CardHeader>
            <CardTitle className="text-lg flex items-center">
              Technische Hoofdgegevens
              <RDWBadge />
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="space-y-2">
                <Label>Brandstof</Label>
                <Input value={formData.rdw_brandstof} readOnly disabled className="bg-muted" />
              </div>
              <div className="space-y-2">
                <Label>Aantal cilinders</Label>
                <Input value={formData.rdw_aantal_cilinders} readOnly disabled className="bg-muted" />
              </div>
              <div className="space-y-2">
                <Label>Cilinderinhoud (cc)</Label>
                <Input value={formData.rdw_cilinderinhoud} readOnly disabled className="bg-muted" />
              </div>
              <div className="space-y-2">
                <Label>Vermogen (kW)</Label>
                <Input value={formData.rdw_vermogen_kw} readOnly disabled className="bg-muted" />
              </div>
              <div className="space-y-2">
                <Label>Aantal deuren</Label>
                <Input value={formData.rdw_aantal_deuren} readOnly disabled className="bg-muted" />
              </div>
              <div className="space-y-2">
                <Label>Wielbasis (mm)</Label>
                <Input value={formData.rdw_wielbasis} readOnly disabled className="bg-muted" />
              </div>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Transmissie (Taxateur - verplicht veld) */}
      <Card>
        <CardHeader>
          <CardTitle className="text-lg">Transmissie</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-2">
            <Label htmlFor="transmissie">Transmissie *</Label>
            <Select
              value={formData.transmissie}
              onValueChange={(value) => onChange('transmissie', value)}
            >
              <SelectTrigger className={errors.transmissie ? 'border-destructive' : ''}>
                <SelectValue placeholder="Selecteer transmissie..." />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="handgeschakeld">Handgeschakeld</SelectItem>
                <SelectItem value="automaat">Automaat</SelectItem>
              </SelectContent>
            </Select>
            {errors.transmissie && (
              <p className="text-sm text-destructive">{errors.transmissie}</p>
            )}
          </div>
        </CardContent>
      </Card>

      {/* Sectie 3: Massa en gewichten (RDW) */}
      {rdwLocked && (
        <Card>
          <CardHeader>
            <CardTitle className="text-lg flex items-center">
              Massa en Gewichten
              <RDWBadge />
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="space-y-2">
                <Label>Ledig gewicht (kg)</Label>
                <Input value={formData.rdw_ledig_gewicht} readOnly disabled className="bg-muted" />
              </div>
              <div className="space-y-2">
                <Label>Massa rijklaar (kg)</Label>
                <Input value={formData.rdw_massa_rijklaar} readOnly disabled className="bg-muted" />
              </div>
              <div className="space-y-2">
                <Label>Toegestane max. massa (kg)</Label>
                <Input value={formData.rdw_max_massa} readOnly disabled className="bg-muted" />
              </div>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Sectie 4: Keuring en status (RDW) */}
      {rdwLocked && (
        <Card>
          <CardHeader>
            <CardTitle className="text-lg flex items-center">
              Keuring en Status
              <RDWBadge />
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="space-y-2">
                <Label>APK gekeurd</Label>
                <Input
                  value={formData.rdw_apk_gekeurd === 'true' ? 'Ja' : formData.rdw_apk_gekeurd === 'false' ? 'Nee' : '-'}
                  readOnly
                  disabled
                  className="bg-muted"
                />
              </div>
              <div className="space-y-2">
                <Label>APK vervaldatum</Label>
                <Input value={formData.rdw_apk_vervaldatum || '-'} readOnly disabled className="bg-muted" />
              </div>
              <div className="space-y-2">
                <Label>Importvoertuig</Label>
                <Input
                  value={formData.rdw_importvoertuig === 'true' ? 'Ja' : formData.rdw_importvoertuig === 'false' ? 'Nee' : '-'}
                  readOnly
                  disabled
                  className="bg-muted"
                />
              </div>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Sectie 5: Tellerstand en gebruik (Taxateur) */}
      <Card>
        <CardHeader>
          <CardTitle className="text-lg">Tellerstand</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="tellerstand">Tellerstand *</Label>
              <Input
                id="tellerstand"
                type="number"
                value={formData.tellerstand}
                onChange={(e) => onChange('tellerstand', e.target.value)}
                placeholder="Bijv. 125000"
                className={errors.tellerstand ? 'border-destructive' : ''}
              />
              {errors.tellerstand && (
                <p className="text-sm text-destructive">{errors.tellerstand}</p>
              )}
            </div>
            <div className="space-y-2">
              <Label htmlFor="tellerstand_type">Eenheid</Label>
              <Select
                value={formData.tellerstand_type}
                onValueChange={(value) => onChange('tellerstand_type', value)}
              >
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="km">Kilometer (km)</SelectItem>
                  <SelectItem value="miles">Miles</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          {/* AI Extraction Button for tellerstand */}
          {photos.length > 0 && reportId && (
            <div className="pt-2">
              <AIExtractButton
                section="tellerstand"
                label="Haal tellerstand uit dashboardfoto"
                photoTypes={['dashboard']}
                photos={photos}
                photoTypeMap={photoTypes}
                onAccept={handleTellerstandAIAccept}
                reportId={reportId}
              />
            </div>
          )}
        </CardContent>
      </Card>

      {/* Sectie 6: Opbouw en constructie (Taxateur) - only for camper */}
      {isCamperReport && (
        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Opbouw en Constructie</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="soort_bouw">Soort bouw</Label>
                <Select
                  value={formData.soort_bouw}
                  onValueChange={(value) => onChange('soort_bouw', value)}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Selecteer..." />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="fabrieksbouw">Fabrieksbouw</SelectItem>
                    <SelectItem value="zelfbouw">Zelfbouw</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label htmlFor="opbouw_merk">Opbouw merk</Label>
                <Input
                  id="opbouw_merk"
                  value={formData.opbouw_merk}
                  onChange={(e) => onChange('opbouw_merk', e.target.value)}
                  placeholder="Bijv. Dethleffs"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="opbouw_type">Opbouw type</Label>
                <Input
                  id="opbouw_type"
                  value={formData.opbouw_type}
                  onChange={(e) => onChange('opbouw_type', e.target.value)}
                  placeholder="Bijv. Globescout"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="constructievorm">Constructievorm</Label>
                <Input
                  id="constructievorm"
                  value={formData.constructievorm}
                  onChange={(e) => onChange('constructievorm', e.target.value)}
                />
              </div>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Sectie 7: Gebruik en stalling (Taxateur) - only for camper */}
      {isCamperReport && (
        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Gebruik en Stalling</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="gebruik">Gebruik</Label>
                <Select
                  value={formData.gebruik}
                  onValueChange={(value) => onChange('gebruik', value)}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Selecteer..." />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="recreatief">Recreatief</SelectItem>
                    <SelectItem value="verhuur">Verhuur</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label htmlFor="stalling">Stalling</Label>
                <Select
                  value={formData.stalling}
                  onValueChange={(value) => onChange('stalling', value)}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Selecteer..." />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="binnen">Binnen</SelectItem>
                    <SelectItem value="buiten">Buiten</SelectItem>
                    <SelectItem value="onbekend">Onbekend</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2 md:col-span-2">
                <Label htmlFor="staat_bij_opname">Staat bij opname</Label>
                <Textarea
                  id="staat_bij_opname"
                  value={formData.staat_bij_opname}
                  onChange={(e) => onChange('staat_bij_opname', e.target.value)}
                  placeholder="Feitelijke constatering van de staat van het voertuig..."
                  rows={3}
                />
                <p className="text-xs text-muted-foreground">
                  Beschrijf de feitelijke staat, geen oordeel
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default VehicleInfoForm;
