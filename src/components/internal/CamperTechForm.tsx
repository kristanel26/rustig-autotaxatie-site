import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';

export interface CamperTechFormData {
  // Campertechniek (Sectie 14)
  lpg_underbody: boolean;
  loose_gas_tanks: boolean;
  gas_hose_production_date: string;
  pressure_regulator_production_date: string;
  voltage: string;
  earth_leakage_switch: boolean;
  fused: boolean;
  onboard_battery: boolean;
  starter_battery: boolean;
  
  // Beveiliging (Sectie 15)
  security_present: boolean;
  mechanical_security: string;
  vehicle_tracking: boolean;
  tracking_brand: string;
}

interface CamperTechFormProps {
  formData: CamperTechFormData;
  onChange: (field: keyof CamperTechFormData, value: string | boolean) => void;
}

export const getInitialCamperTechFormData = (): CamperTechFormData => ({
  lpg_underbody: false,
  loose_gas_tanks: false,
  gas_hose_production_date: '',
  pressure_regulator_production_date: '',
  voltage: '',
  earth_leakage_switch: false,
  fused: false,
  onboard_battery: false,
  starter_battery: false,
  security_present: false,
  mechanical_security: '',
  vehicle_tracking: false,
  tracking_brand: '',
});

const mechanicalSecurityOptions = [
  { value: 'bearlock', label: 'Bearlock' },
  { value: 'construct', label: 'Construct' },
  { value: 'anders', label: 'Anders' },
];

export const CamperTechForm = ({
  formData,
  onChange,
}: CamperTechFormProps) => {
  return (
    <div className="space-y-6">
      {/* Sectie 14: Extra's / Campertechniek */}
      <Card>
        <CardHeader>
          <CardTitle className="text-lg">Extra's / Campertechniek</CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          {/* Gas installatie */}
          <div>
            <h4 className="font-medium text-sm mb-3">Gasinstallatie</h4>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="flex items-center space-x-3">
                <Switch
                  id="lpg_underbody"
                  checked={formData.lpg_underbody}
                  onCheckedChange={(v) => onChange('lpg_underbody', v)}
                />
                <Label htmlFor="lpg_underbody">LPG onderbouw</Label>
              </div>
              <div className="flex items-center space-x-3">
                <Switch
                  id="loose_gas_tanks"
                  checked={formData.loose_gas_tanks}
                  onCheckedChange={(v) => onChange('loose_gas_tanks', v)}
                />
                <Label htmlFor="loose_gas_tanks">Losse gastank(s)</Label>
              </div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
              <div className="space-y-2">
                <Label htmlFor="gas_hose_production_date">Gasslang productiedatum</Label>
                <Input
                  id="gas_hose_production_date"
                  value={formData.gas_hose_production_date}
                  onChange={(e) => onChange('gas_hose_production_date', e.target.value)}
                  placeholder="Bijv. 03/2022"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="pressure_regulator_production_date">Drukregelaar productiedatum</Label>
                <Input
                  id="pressure_regulator_production_date"
                  value={formData.pressure_regulator_production_date}
                  onChange={(e) => onChange('pressure_regulator_production_date', e.target.value)}
                  placeholder="Bijv. 06/2021"
                />
              </div>
            </div>
          </div>

          {/* Elektrische installatie */}
          <div>
            <h4 className="font-medium text-sm mb-3">Elektrische installatie</h4>
            <div className="space-y-2 mb-4">
              <Label htmlFor="voltage">Voltage</Label>
              <Input
                id="voltage"
                value={formData.voltage}
                onChange={(e) => onChange('voltage', e.target.value)}
                placeholder="Bijv. 12V-230V"
                className="w-full md:w-[200px]"
              />
            </div>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <div className="flex items-center space-x-3">
                <Switch
                  id="earth_leakage_switch"
                  checked={formData.earth_leakage_switch}
                  onCheckedChange={(v) => onChange('earth_leakage_switch', v)}
                />
                <Label htmlFor="earth_leakage_switch" className="text-sm">Aardlekschakelaar</Label>
              </div>
              <div className="flex items-center space-x-3">
                <Switch
                  id="fused"
                  checked={formData.fused}
                  onCheckedChange={(v) => onChange('fused', v)}
                />
                <Label htmlFor="fused" className="text-sm">Gezekerd</Label>
              </div>
              <div className="flex items-center space-x-3">
                <Switch
                  id="onboard_battery"
                  checked={formData.onboard_battery}
                  onCheckedChange={(v) => onChange('onboard_battery', v)}
                />
                <Label htmlFor="onboard_battery" className="text-sm">Boordaccu</Label>
              </div>
              <div className="flex items-center space-x-3">
                <Switch
                  id="starter_battery"
                  checked={formData.starter_battery}
                  onCheckedChange={(v) => onChange('starter_battery', v)}
                />
                <Label htmlFor="starter_battery" className="text-sm">Startaccu</Label>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Sectie 15: Beveiliging */}
      <Card>
        <CardHeader>
          <CardTitle className="text-lg">Beveiliging</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center space-x-3">
            <Switch
              id="security_present"
              checked={formData.security_present}
              onCheckedChange={(v) => onChange('security_present', v)}
            />
            <Label htmlFor="security_present">Beveiliging aanwezig</Label>
          </div>
          
          {formData.security_present && (
            <div className="space-y-4 pl-4 border-l-2 border-muted">
              <div className="space-y-2">
                <Label>Mechanische beveiliging</Label>
                <Select
                  value={formData.mechanical_security}
                  onValueChange={(v) => onChange('mechanical_security', v)}
                >
                  <SelectTrigger className="w-full md:w-[250px]">
                    <SelectValue placeholder="Selecteer type..." />
                  </SelectTrigger>
                  <SelectContent>
                    {mechanicalSecurityOptions.map((opt) => (
                      <SelectItem key={opt.value} value={opt.value}>
                        {opt.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div className="flex items-center space-x-3">
                <Switch
                  id="vehicle_tracking"
                  checked={formData.vehicle_tracking}
                  onCheckedChange={(v) => onChange('vehicle_tracking', v)}
                />
                <Label htmlFor="vehicle_tracking">Voertuigvolgsysteem</Label>
              </div>
              {formData.vehicle_tracking && (
                <div className="space-y-2">
                  <Label htmlFor="tracking_brand">Merk volgsysteem</Label>
                  <Input
                    id="tracking_brand"
                    value={formData.tracking_brand}
                    onChange={(e) => onChange('tracking_brand', e.target.value)}
                    placeholder="Bijv. TrackJack"
                    className="w-full md:w-[250px]"
                  />
                </div>
              )}
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default CamperTechForm;
