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
import { ConditionField } from './ConditionField';
import { TireField } from './TireField';

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
  
  // Banden (met bandenmaat en DOT-code)
  tire_front_left_brand: string;
  tire_front_left_size: string;
  tire_front_left_dot: string;
  tire_front_right_brand: string;
  tire_front_right_size: string;
  tire_front_right_dot: string;
  tire_rear_left_brand: string;
  tire_rear_left_size: string;
  tire_rear_left_dot: string;
  tire_rear_right_brand: string;
  tire_rear_right_size: string;
  tire_rear_right_dot: string;
  rim_type: string;
  
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
  rdwHandelsbenaming?: string;
  tireErrors?: Record<string, string>;
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
  tire_front_left_brand: '',
  tire_front_left_size: '',
  tire_front_left_dot: '',
  tire_front_right_brand: '',
  tire_front_right_size: '',
  tire_front_right_dot: '',
  tire_rear_left_brand: '',
  tire_rear_left_size: '',
  tire_rear_left_dot: '',
  tire_rear_right_brand: '',
  tire_rear_right_size: '',
  tire_rear_right_dot: '',
  rim_type: '',
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
  rdwHandelsbenaming,
  tireErrors = {},
}: AppraisalFindingsFormProps) => {
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
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <TireField
              position="Linker voorband"
              brand={formData.tire_front_left_brand}
              size={formData.tire_front_left_size}
              dot={formData.tire_front_left_dot}
              onBrandChange={(v) => onChange('tire_front_left_brand', v)}
              onSizeChange={(v) => onChange('tire_front_left_size', v)}
              onDotChange={(v) => onChange('tire_front_left_dot', v)}
              dotError={tireErrors.tire_front_left_dot}
            />
            <TireField
              position="Rechter voorband"
              brand={formData.tire_front_right_brand}
              size={formData.tire_front_right_size}
              dot={formData.tire_front_right_dot}
              onBrandChange={(v) => onChange('tire_front_right_brand', v)}
              onSizeChange={(v) => onChange('tire_front_right_size', v)}
              onDotChange={(v) => onChange('tire_front_right_dot', v)}
              dotError={tireErrors.tire_front_right_dot}
            />
            <TireField
              position="Linker achterband"
              brand={formData.tire_rear_left_brand}
              size={formData.tire_rear_left_size}
              dot={formData.tire_rear_left_dot}
              onBrandChange={(v) => onChange('tire_rear_left_brand', v)}
              onSizeChange={(v) => onChange('tire_rear_left_size', v)}
              onDotChange={(v) => onChange('tire_rear_left_dot', v)}
              dotError={tireErrors.tire_rear_left_dot}
            />
            <TireField
              position="Rechter achterband"
              brand={formData.tire_rear_right_brand}
              size={formData.tire_rear_right_size}
              dot={formData.tire_rear_right_dot}
              onBrandChange={(v) => onChange('tire_rear_right_brand', v)}
              onSizeChange={(v) => onChange('tire_rear_right_size', v)}
              onDotChange={(v) => onChange('tire_rear_right_dot', v)}
              dotError={tireErrors.tire_rear_right_dot}
            />
          </div>
          <p className="text-xs text-muted-foreground">
            * DOT-code is verplicht (exact 4 cijfers). Voorbeeld: 2523 betekent week 25, jaar 2023.
          </p>
          <div className="space-y-2">
            <Label htmlFor="rim_type">Type velg *</Label>
            <Select value={formData.rim_type} onValueChange={(v) => onChange('rim_type', v)}>
              <SelectTrigger className={`w-[200px] ${!formData.rim_type ? 'border-destructive' : ''}`}>
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
            {!formData.rim_type && (
              <p className="text-xs text-destructive">Type velg is verplicht</p>
            )}
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
        </CardContent>
      </Card>
    </div>
  );
};

export default AppraisalFindingsForm;
