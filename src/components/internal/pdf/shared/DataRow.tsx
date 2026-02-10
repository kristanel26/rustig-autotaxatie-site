import { View, Text } from '@react-pdf/renderer';

interface DataRowProps {
  label: string;
  value: string;
  fontSize?: number;
}

export function DataRow({ label, value, fontSize = 11 }: DataRowProps) {
  const displayValue = (!value || value === '-' || value === '') ? '–' : value;
  return (
    <View style={{ flexDirection: 'row', paddingVertical: 4, borderBottomWidth: 1, borderBottomColor: '#e2e8f0' }}>
      <Text style={{ width: '50%', color: '#000000', fontSize, fontFamily: 'Helvetica' }}>{label}</Text>
      <Text style={{ width: '50%', color: '#000000', fontSize, fontFamily: 'Helvetica-Bold' }}>{displayValue}</Text>
    </View>
  );
}

interface ConditionRowProps {
  label: string;
  condition: string | null;
  notes: string | null;
  fontSize?: number;
}

const conditionLabels: Record<string, string> = {
  goed: 'Goed',
  voldoende: 'Voldoende',
  matig: 'Matig',
  slecht: 'Slecht',
};

export function ConditionRow({ label, condition, notes, fontSize = 8 }: ConditionRowProps) {
  if (!condition) return null;
  return (
    <View style={{ flexDirection: 'row', paddingVertical: 3, borderBottomWidth: 1, borderBottomColor: '#e2e8f0' }}>
      <Text style={{ width: '35%', color: '#000000', fontSize }}>{label}</Text>
      <Text style={{ width: '18%', color: '#000000', fontSize, fontFamily: 'Helvetica-Bold' }}>
        {conditionLabels[condition] || condition}
      </Text>
      <Text style={{ width: '47%', color: '#000000', fontSize }}>{notes || ''}</Text>
    </View>
  );
}

interface SectionHeaderProps {
  title: string;
  number?: string;
  fontSize?: number;
}

export function SectionHeader({ title, number, fontSize = 13 }: SectionHeaderProps) {
  return (
    <View style={{ marginBottom: 6, paddingBottom: 4, borderBottomWidth: 2, borderBottomColor: '#000000' }}>
      <Text style={{ fontSize, fontFamily: 'Helvetica-Bold', color: '#000000' }}>
        {number ? `${number}. ${title}` : title}
      </Text>
    </View>
  );
}
