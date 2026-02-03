import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';

export interface InstallationsFormData {
  installation_electrical: string;
  installation_water: string;
  installation_gas: string;
  leakage_electrical: string;
}

interface InstallationsFormProps {
  formData: InstallationsFormData;
  onChange: (field: keyof InstallationsFormData, value: string) => void;
}

export const getInitialInstallationsFormData = (): InstallationsFormData => ({
  installation_electrical: '',
  installation_water: '',
  installation_gas: '',
  leakage_electrical: '',
});

const conditionOptions = [
  { value: 'goed', label: 'Goed' },
  { value: 'voldoende', label: 'Voldoende' },
  { value: 'slecht', label: 'Slecht' },
];

const leakageOptions = [
  { value: 'geen_meting', label: 'Geen meting verricht' },
  { value: 'geen_lekkage', label: 'Geen lekkage waargenomen' },
];

export const InstallationsForm = ({
  formData,
  onChange,
}: InstallationsFormProps) => {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-lg">Leidingen en installaties</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="space-y-2">
            <Label>Montage elektra</Label>
            <Select
              value={formData.installation_electrical}
              onValueChange={(v) => onChange('installation_electrical', v)}
            >
              <SelectTrigger>
                <SelectValue placeholder="Selecteer..." />
              </SelectTrigger>
              <SelectContent>
                {conditionOptions.map((opt) => (
                  <SelectItem key={opt.value} value={opt.value}>
                    {opt.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          <div className="space-y-2">
            <Label>Montage water</Label>
            <Select
              value={formData.installation_water}
              onValueChange={(v) => onChange('installation_water', v)}
            >
              <SelectTrigger>
                <SelectValue placeholder="Selecteer..." />
              </SelectTrigger>
              <SelectContent>
                {conditionOptions.map((opt) => (
                  <SelectItem key={opt.value} value={opt.value}>
                    {opt.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          <div className="space-y-2">
            <Label>Montage gas</Label>
            <Select
              value={formData.installation_gas}
              onValueChange={(v) => onChange('installation_gas', v)}
            >
              <SelectTrigger>
                <SelectValue placeholder="Selecteer..." />
              </SelectTrigger>
              <SelectContent>
                {conditionOptions.map((opt) => (
                  <SelectItem key={opt.value} value={opt.value}>
                    {opt.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>
        <div className="space-y-2">
          <Label>Lekkage elektra</Label>
          <Select
            value={formData.leakage_electrical}
            onValueChange={(v) => onChange('leakage_electrical', v)}
          >
            <SelectTrigger className="w-full md:w-[300px]">
              <SelectValue placeholder="Selecteer..." />
            </SelectTrigger>
            <SelectContent>
              {leakageOptions.map((opt) => (
                <SelectItem key={opt.value} value={opt.value}>
                  {opt.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </CardContent>
    </Card>
  );
};

export default InstallationsForm;
