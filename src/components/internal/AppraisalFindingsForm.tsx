import { useState, useEffect, useCallback } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Switch } from '@/components/ui/switch';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { ConditionField } from './ConditionField';
import { TireField } from './TireField';
import { AIExtractButton, PhotoType } from './AIExtractButton';
import type { PhotoTypes } from './PhotoUploadForm';

export interface AppraisalFormData {
  // Model display name
  model_display_name: string;
  
  // Technische staat
  condition_engine: string;
  condition_engine_notes: string;
  condition_transmission: string;
  condition_transmission_notes: string;
  condition_brakes: string;
  condition_brakes_notes: string;
  condition_suspension: string;
  condition_suspension_notes: string;
  condition_steering: string;
  condition_steering_notes: string;
  condition_electrical: string;
  condition_electrical_notes: string;
  
  // Banden en wielen
  tire_bandenmaat: string;
  tire_front_left_brand: string;
  tire_front_left_model: string;
  tire_front_left_profiel: string;
  tire_front_left_dot: string;
  tire_front_right_brand: string;
  tire_front_right_model: string;
  tire_front_right_profiel: string;
  tire_front_right_dot: string;
  tire_rear_left_brand: string;
  tire_rear_left_model: string;
  tire_rear_left_profiel: string;
  tire_rear_left_dot: string;
  tire_rear_right_brand: string;
  tire_rear_right_model: string;
  tire_rear_right_profiel: string;
  tire_rear_right_dot: string;
  rim_type: string;
  tire_advice: string;
  
  // Exterieur
  exterior_body: string;
  exterior_body_notes: string;
  exterior_paint: string;
  exterior_paint_notes: string;
  exterior_rubbers: string;
  exterior_rubbers_notes: string;
  exterior_windows: string;
  exterior_windows_notes: string;
  exterior_sealant: string;
  exterior_sealant_notes: string;
  
  // Interieur
  interior_upholstery: string;
  interior_upholstery_notes: string;
  interior_dashboard: string;
  interior_dashboard_notes: string;
  interior_floor: string;
  interior_floor_notes: string;
  interior_roof: string;
  interior_roof_notes: string;
  interior_kitchen: string;
  interior_kitchen_notes: string;
  interior_sanitary: string;
  interior_sanitary_notes: string;
}

interface AppraisalFindingsFormProps {
  formData: AppraisalFormData;
  onChange: (field: keyof AppraisalFormData, value: string) => void;
  onMultipleChange?: (fields: Partial<AppraisalFormData>) => void;
  rdwHandelsbenaming?: string;
  allTiresSame?: boolean;
  onAllTiresSameChange?: (value: boolean) => void;
  reportType?: 'camper' | 'wev' | 'klassieker' | null;
  // AI extraction props
  photos?: string[];
  photoTypes?: PhotoTypes;
  reportId?: string;
}

export const getInitialAppraisalFormData = (): AppraisalFormData => ({
  model_display_name: '',
  condition_engine: '',
  condition_engine_notes: '',
  condition_transmission: '',
  condition_transmission_notes: '',
  condition_brakes: '',
  condition_brakes_notes: '',
  condition_suspension: '',
  condition_suspension_notes: '',
  condition_steering: '',
  condition_steering_notes: '',
  condition_electrical: '',
  condition_electrical_notes: '',
  tire_bandenmaat: '',
  tire_front_left_brand: '',
  tire_front_left_model: '',
  tire_front_left_profiel: '',
  tire_front_left_dot: '',
  tire_front_right_brand: '',
  tire_front_right_model: '',
  tire_front_right_profiel: '',
  tire_front_right_dot: '',
  tire_rear_left_brand: '',
  tire_rear_left_model: '',
  tire_rear_left_profiel: '',
  tire_rear_left_dot: '',
  tire_rear_right_brand: '',
  tire_rear_right_model: '',
  tire_rear_right_profiel: '',
  tire_rear_right_dot: '',
  rim_type: '',
  tire_advice: '',
  exterior_body: '',
  exterior_body_notes: '',
  exterior_paint: '',
  exterior_paint_notes: '',
  exterior_rubbers: '',
  exterior_rubbers_notes: '',
  exterior_windows: '',
  exterior_windows_notes: '',
  exterior_sealant: '',
  exterior_sealant_notes: '',
  interior_upholstery: '',
  interior_upholstery_notes: '',
  interior_dashboard: '',
  interior_dashboard_notes: '',
  interior_floor: '',
  interior_floor_notes: '',
  interior_roof: '',
  interior_roof_notes: '',
  interior_kitchen: '',
  interior_kitchen_notes: '',
  interior_sanitary: '',
  interior_sanitary_notes: '',
});

const rimTypeOptions = [
  { value: 'staal', label: 'Staalvelgen' },
  { value: 'lichtmetaal', label: 'Lichtmetalen velgen' },
];

export const AppraisalFindingsForm = ({
  formData,
  onChange,
  onMultipleChange,
  rdwHandelsbenaming,
  allTiresSame = false,
  onAllTiresSameChange,
  reportType = 'camper',
  photos = [],
  photoTypes = {},
  reportId = '',
}: AppraisalFindingsFormProps) => {
  // Determine if camper-specific sections should be shown
  const isCamperReport = reportType === 'camper' || reportType === null;
  // Handler for AI tire extraction results
  const handleTireAIAccept = (fieldKey: string, value: string) => {
    if (fieldKey === 'tire_size') {
      onChange('tire_bandenmaat', value);
    } else if (fieldKey === 'tire_dot') {
      // Apply to first tire DOT field
      onChange('tire_front_left_dot', value);
    }
  };

  // Sync other tires when first tire changes and allTiresSame is enabled
  const handleFirstTireChange = useCallback((
    field: 'brand' | 'model' | 'profiel' | 'dot',
    value: string
  ) => {
    const fieldMap = {
      brand: ['tire_front_left_brand', 'tire_front_right_brand', 'tire_rear_left_brand', 'tire_rear_right_brand'],
      model: ['tire_front_left_model', 'tire_front_right_model', 'tire_rear_left_model', 'tire_rear_right_model'],
      profiel: ['tire_front_left_profiel', 'tire_front_right_profiel', 'tire_rear_left_profiel', 'tire_rear_right_profiel'],
      dot: ['tire_front_left_dot', 'tire_front_right_dot', 'tire_rear_left_dot', 'tire_rear_right_dot'],
    };
    
    if (allTiresSame && onMultipleChange) {
      const updates: Partial<AppraisalFormData> = {};
      fieldMap[field].forEach(f => {
        updates[f as keyof AppraisalFormData] = value;
      });
      onMultipleChange(updates);
    } else {
      onChange(fieldMap[field][0] as keyof AppraisalFormData, value);
    }
  }, [allTiresSame, onChange, onMultipleChange]);

  // When allTiresSame is toggled on, copy first tire to all others
  const handleAllTiresSameToggle = useCallback((checked: boolean) => {
    if (checked && onMultipleChange) {
      onMultipleChange({
        tire_front_right_brand: formData.tire_front_left_brand,
        tire_front_right_model: formData.tire_front_left_model,
        tire_front_right_profiel: formData.tire_front_left_profiel,
        tire_front_right_dot: formData.tire_front_left_dot,
        tire_rear_left_brand: formData.tire_front_left_brand,
        tire_rear_left_model: formData.tire_front_left_model,
        tire_rear_left_profiel: formData.tire_front_left_profiel,
        tire_rear_left_dot: formData.tire_front_left_dot,
        tire_rear_right_brand: formData.tire_front_left_brand,
        tire_rear_right_model: formData.tire_front_left_model,
        tire_rear_right_profiel: formData.tire_front_left_profiel,
        tire_rear_right_dot: formData.tire_front_left_dot,
      });
    }
    onAllTiresSameChange?.(checked);
  }, [formData, onMultipleChange, onAllTiresSameChange]);

  return (
    <div className="space-y-6">
      {/* Model display name */}
      <Card>
        <CardHeader>
          <CardTitle className="text-lg">Model (vastgesteld)</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-2">
            <Label htmlFor="model_display_name">Modelnaam voor rapport</Label>
            <Input
              id="model_display_name"
              value={formData.model_display_name}
              onChange={(e) => onChange('model_display_name', e.target.value)}
              placeholder={rdwHandelsbenaming || 'Bijv. California Ocean T6.1'}
            />
            <p className="text-xs text-muted-foreground">
              Laat leeg om de RDW handelsbenaming te gebruiken{rdwHandelsbenaming ? `: "${rdwHandelsbenaming}"` : ''}.
            </p>
          </div>
        </CardContent>
      </Card>

      {/* Technische staat voertuig */}
      <Card>
        <CardHeader>
          <CardTitle className="text-lg">Technische staat voertuig</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <ConditionField
            id="condition_engine"
            label="Motor en aandrijving"
            conditionValue={formData.condition_engine}
            notesValue={formData.condition_engine_notes}
            onConditionChange={(v) => onChange('condition_engine', v)}
            onNotesChange={(v) => onChange('condition_engine_notes', v)}
          />
          <ConditionField
            id="condition_transmission"
            label="Transmissie"
            conditionValue={formData.condition_transmission}
            notesValue={formData.condition_transmission_notes}
            onConditionChange={(v) => onChange('condition_transmission', v)}
            onNotesChange={(v) => onChange('condition_transmission_notes', v)}
          />
          <ConditionField
            id="condition_brakes"
            label="Remmen"
            conditionValue={formData.condition_brakes}
            notesValue={formData.condition_brakes_notes}
            onConditionChange={(v) => onChange('condition_brakes', v)}
            onNotesChange={(v) => onChange('condition_brakes_notes', v)}
          />
          <ConditionField
            id="condition_suspension"
            label="Ophanging"
            conditionValue={formData.condition_suspension}
            notesValue={formData.condition_suspension_notes}
            onConditionChange={(v) => onChange('condition_suspension', v)}
            onNotesChange={(v) => onChange('condition_suspension_notes', v)}
          />
          <ConditionField
            id="condition_steering"
            label="Besturing"
            conditionValue={formData.condition_steering}
            notesValue={formData.condition_steering_notes}
            onConditionChange={(v) => onChange('condition_steering', v)}
            onNotesChange={(v) => onChange('condition_steering_notes', v)}
          />
          <ConditionField
            id="condition_electrical"
            label="Elektrische installatie"
            conditionValue={formData.condition_electrical}
            notesValue={formData.condition_electrical_notes}
            onConditionChange={(v) => onChange('condition_electrical', v)}
            onNotesChange={(v) => onChange('condition_electrical_notes', v)}
          />
        </CardContent>
      </Card>

      {/* Banden en wielen */}
      <Card>
        <CardHeader>
          <CardTitle className="text-lg">Banden en wielen</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex flex-col sm:flex-row sm:items-center gap-4">
            <div className="space-y-2">
              <Label htmlFor="tire_bandenmaat">Bandenmaat</Label>
              <Input
                id="tire_bandenmaat"
                value={formData.tire_bandenmaat}
                onChange={(e) => onChange('tire_bandenmaat', e.target.value)}
                placeholder="Bijv. 225/45R16"
                className="w-[200px]"
              />
            </div>
            <div className="flex items-center space-x-3 pt-6">
              <Switch
                id="all_tires_same"
                checked={allTiresSame}
                onCheckedChange={handleAllTiresSameToggle}
              />
              <Label htmlFor="all_tires_same" className="cursor-pointer">
                Alle banden zijn gelijk
              </Label>
            </div>
            {/* AI Extraction Button for tires */}
            {photos.length > 0 && reportId && (
              <div className="pt-6">
                <AIExtractButton
                  section="banden"
                  label="Lees bandenmaat en DOT"
                  photoTypes={['band_voor_links', 'band_voor_rechts', 'band_achter_links', 'band_achter_rechts']}
                  photos={photos}
                  photoTypeMap={photoTypes}
                  onAccept={handleTireAIAccept}
                  reportId={reportId}
                />
              </div>
            )}
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <TireField
              position="Linker voorband"
              brand={formData.tire_front_left_brand}
              model={formData.tire_front_left_model}
              profiel={formData.tire_front_left_profiel}
              dot={formData.tire_front_left_dot}
              onBrandChange={(v) => handleFirstTireChange('brand', v)}
              onModelChange={(v) => handleFirstTireChange('model', v)}
              onProfielChange={(v) => handleFirstTireChange('profiel', v)}
              onDotChange={(v) => handleFirstTireChange('dot', v)}
            />
            <TireField
              position="Rechter voorband"
              brand={formData.tire_front_right_brand}
              model={formData.tire_front_right_model}
              profiel={formData.tire_front_right_profiel}
              dot={formData.tire_front_right_dot}
              onBrandChange={(v) => onChange('tire_front_right_brand', v)}
              onModelChange={(v) => onChange('tire_front_right_model', v)}
              onProfielChange={(v) => onChange('tire_front_right_profiel', v)}
              onDotChange={(v) => onChange('tire_front_right_dot', v)}
              isLinked={allTiresSame}
              disabled={allTiresSame}
            />
            <TireField
              position="Linker achterband"
              brand={formData.tire_rear_left_brand}
              model={formData.tire_rear_left_model}
              profiel={formData.tire_rear_left_profiel}
              dot={formData.tire_rear_left_dot}
              onBrandChange={(v) => onChange('tire_rear_left_brand', v)}
              onModelChange={(v) => onChange('tire_rear_left_model', v)}
              onProfielChange={(v) => onChange('tire_rear_left_profiel', v)}
              onDotChange={(v) => onChange('tire_rear_left_dot', v)}
              isLinked={allTiresSame}
              disabled={allTiresSame}
            />
            <TireField
              position="Rechter achterband"
              brand={formData.tire_rear_right_brand}
              model={formData.tire_rear_right_model}
              profiel={formData.tire_rear_right_profiel}
              dot={formData.tire_rear_right_dot}
              onBrandChange={(v) => onChange('tire_rear_right_brand', v)}
              onModelChange={(v) => onChange('tire_rear_right_model', v)}
              onProfielChange={(v) => onChange('tire_rear_right_profiel', v)}
              onDotChange={(v) => onChange('tire_rear_right_dot', v)}
              isLinked={allTiresSame}
              disabled={allTiresSame}
            />
          </div>
          <p className="text-xs text-muted-foreground">
            DOT-code bestaat uit 4 cijfers. Voorbeeld: 2523 betekent week 25, jaar 2023.
          </p>
          <div className="space-y-2">
            <Label htmlFor="rim_type">Type velg</Label>
            <Select value={formData.rim_type} onValueChange={(v) => onChange('rim_type', v)}>
              <SelectTrigger className="w-[200px]">
                <SelectValue placeholder="Selecteer type velg..." />
              </SelectTrigger>
              <SelectContent>
                {rimTypeOptions.map((option) => (
                  <SelectItem key={option.value} value={option.value}>
                    {option.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          <div className="space-y-2">
            <Label htmlFor="tire_advice">Advies banden</Label>
            <Textarea
              id="tire_advice"
              value={formData.tire_advice}
              onChange={(e) => onChange('tire_advice', e.target.value)}
              placeholder="Eventueel advies met betrekking tot de banden..."
              rows={2}
            />
          </div>
        </CardContent>
      </Card>

      {/* Exterieur */}
      <Card>
        <CardHeader>
          <CardTitle className="text-lg">Exterieur</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <ConditionField
            id="exterior_body"
            label="Carrosserie"
            conditionValue={formData.exterior_body}
            notesValue={formData.exterior_body_notes}
            onConditionChange={(v) => onChange('exterior_body', v)}
            onNotesChange={(v) => onChange('exterior_body_notes', v)}
          />
          <ConditionField
            id="exterior_paint"
            label="Lakwerk"
            conditionValue={formData.exterior_paint}
            notesValue={formData.exterior_paint_notes}
            onConditionChange={(v) => onChange('exterior_paint', v)}
            onNotesChange={(v) => onChange('exterior_paint_notes', v)}
          />
          <ConditionField
            id="exterior_rubbers"
            label="Rubbers"
            conditionValue={formData.exterior_rubbers}
            notesValue={formData.exterior_rubbers_notes}
            onConditionChange={(v) => onChange('exterior_rubbers', v)}
            onNotesChange={(v) => onChange('exterior_rubbers_notes', v)}
          />
          <ConditionField
            id="exterior_windows"
            label="Ruiten"
            conditionValue={formData.exterior_windows}
            notesValue={formData.exterior_windows_notes}
            onConditionChange={(v) => onChange('exterior_windows', v)}
            onNotesChange={(v) => onChange('exterior_windows_notes', v)}
          />
          <ConditionField
            id="exterior_sealant"
            label="Kitnaden"
            conditionValue={formData.exterior_sealant}
            notesValue={formData.exterior_sealant_notes}
            onConditionChange={(v) => onChange('exterior_sealant', v)}
            onNotesChange={(v) => onChange('exterior_sealant_notes', v)}
          />
        </CardContent>
      </Card>

      {/* Interieur */}
      <Card>
        <CardHeader>
          <CardTitle className="text-lg">Interieur</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <ConditionField
            id="interior_upholstery"
            label="Bekleding"
            conditionValue={formData.interior_upholstery}
            notesValue={formData.interior_upholstery_notes}
            onConditionChange={(v) => onChange('interior_upholstery', v)}
            onNotesChange={(v) => onChange('interior_upholstery_notes', v)}
          />
          <ConditionField
            id="interior_dashboard"
            label="Dashboard"
            conditionValue={formData.interior_dashboard}
            notesValue={formData.interior_dashboard_notes}
            onConditionChange={(v) => onChange('interior_dashboard', v)}
            onNotesChange={(v) => onChange('interior_dashboard_notes', v)}
          />
          <ConditionField
            id="interior_floor"
            label="Vloer"
            conditionValue={formData.interior_floor}
            notesValue={formData.interior_floor_notes}
            onConditionChange={(v) => onChange('interior_floor', v)}
            onNotesChange={(v) => onChange('interior_floor_notes', v)}
          />
          <ConditionField
            id="interior_roof"
            label="Dak"
            conditionValue={formData.interior_roof}
            notesValue={formData.interior_roof_notes}
            onConditionChange={(v) => onChange('interior_roof', v)}
            onNotesChange={(v) => onChange('interior_roof_notes', v)}
          />
          {/* Camper-specific interior fields */}
          {isCamperReport && (
            <>
              <ConditionField
                id="interior_kitchen"
                label="Keuken"
                conditionValue={formData.interior_kitchen}
                notesValue={formData.interior_kitchen_notes}
                onConditionChange={(v) => onChange('interior_kitchen', v)}
                onNotesChange={(v) => onChange('interior_kitchen_notes', v)}
              />
              <ConditionField
                id="interior_sanitary"
                label="Sanitair"
                conditionValue={formData.interior_sanitary}
                notesValue={formData.interior_sanitary_notes}
                onConditionChange={(v) => onChange('interior_sanitary', v)}
                onNotesChange={(v) => onChange('interior_sanitary_notes', v)}
              />
            </>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default AppraisalFindingsForm;
