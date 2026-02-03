import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import { Textarea } from '@/components/ui/textarea';

export interface MoistureAndSafetyFormData {
  // Vocht (Moisture)
  moisture_measurement_performed: boolean;
  moisture_advice: string;
  
  // Brand & Gas veiligheid
  fire_extinguisher: boolean;
  gas_detection: boolean;
  smoke_detector: boolean;
}

interface MoistureAndSafetyFormProps {
  formData: MoistureAndSafetyFormData;
  onChange: (field: keyof MoistureAndSafetyFormData, value: string | boolean) => void;
}

export const getInitialMoistureAndSafetyFormData = (): MoistureAndSafetyFormData => ({
  moisture_measurement_performed: false,
  moisture_advice: '',
  fire_extinguisher: false,
  gas_detection: false,
  smoke_detector: false,
});

export const MoistureAndSafetyForm = ({
  formData,
  onChange,
}: MoistureAndSafetyFormProps) => {
  return (
    <div className="space-y-6">
      {/* Vocht */}
      <Card>
        <CardHeader>
          <CardTitle className="text-lg">Vocht</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center space-x-3">
            <Switch
              id="moisture_measurement_performed"
              checked={formData.moisture_measurement_performed}
              onCheckedChange={(v) => onChange('moisture_measurement_performed', v)}
            />
            <Label htmlFor="moisture_measurement_performed">Vochtmeting verricht</Label>
          </div>
          <div className="space-y-2">
            <Label htmlFor="moisture_advice">Advies omtrent vochtinwerking</Label>
            <Textarea
              id="moisture_advice"
              value={formData.moisture_advice}
              onChange={(e) => onChange('moisture_advice', e.target.value)}
              placeholder="Eventueel advies met betrekking tot vocht..."
              rows={2}
            />
          </div>
        </CardContent>
      </Card>

      {/* Brand & Gas veiligheid */}
      <Card>
        <CardHeader>
          <CardTitle className="text-lg">Brand- en gasveiligheid</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="flex items-center space-x-3">
              <Switch
                id="fire_extinguisher"
                checked={formData.fire_extinguisher}
                onCheckedChange={(v) => onChange('fire_extinguisher', v)}
              />
              <Label htmlFor="fire_extinguisher">Brandblusapparaat</Label>
            </div>
            <div className="flex items-center space-x-3">
              <Switch
                id="gas_detection"
                checked={formData.gas_detection}
                onCheckedChange={(v) => onChange('gas_detection', v)}
              />
              <Label htmlFor="gas_detection">Gasdetectie</Label>
            </div>
            <div className="flex items-center space-x-3">
              <Switch
                id="smoke_detector"
                checked={formData.smoke_detector}
                onCheckedChange={(v) => onChange('smoke_detector', v)}
              />
              <Label htmlFor="smoke_detector">Rookmelder</Label>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default MoistureAndSafetyForm;
