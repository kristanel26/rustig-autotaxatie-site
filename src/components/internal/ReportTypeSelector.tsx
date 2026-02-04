import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Caravan, FileSpreadsheet, Car } from 'lucide-react';

export type ReportType = 'camper' | 'wev' | 'classic';

interface ReportTypeOption {
  value: ReportType;
  label: string;
  description: string;
  icon: React.ReactNode;
  disabled?: boolean;
}

const reportTypeOptions: ReportTypeOption[] = [
  {
    value: 'camper',
    label: 'Campertaxatie',
    description: 'Verzekeringstaxatie voor campers, motorhomes en kampeerauto\'s inclusief opbouw, installaties en accessoires.',
    icon: <Caravan className="h-8 w-8" />,
  },
  {
    value: 'wev',
    label: 'WEV-taxatie',
    description: 'Waarde in het Economisch Verkeer bepaling voor fiscale doeleinden, zakelijk-privé overgang of bedrijfsbeëindiging.',
    icon: <FileSpreadsheet className="h-8 w-8" />,
  },
  {
    value: 'classic',
    label: 'Klassiekertaxatie',
    description: 'Taxatie voor oldtimers en youngtimers met specifieke waardebegrippen. (Binnenkort beschikbaar)',
    icon: <Car className="h-8 w-8" />,
    disabled: true,
  },
];

interface ReportTypeSelectorProps {
  onSelect: (type: ReportType) => void;
}

export const ReportTypeSelector = ({ onSelect }: ReportTypeSelectorProps) => {
  return (
    <div className="space-y-6">
      <div className="text-center">
        <h2 className="text-2xl font-semibold tracking-tight">Kies rapporttype</h2>
        <p className="text-muted-foreground mt-2">
          Selecteer het type taxatie dat je wilt uitvoeren
        </p>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 max-w-4xl mx-auto">
        {reportTypeOptions.map((option) => (
          <Card 
            key={option.value} 
            className={`cursor-pointer transition-all hover:border-primary hover:shadow-md ${
              option.disabled ? 'opacity-50 cursor-not-allowed' : ''
            }`}
            onClick={() => !option.disabled && onSelect(option.value)}
          >
            <CardHeader className="text-center pb-2">
              <div className="mx-auto mb-2 p-3 rounded-full bg-muted text-muted-foreground">
                {option.icon}
              </div>
              <CardTitle className="text-lg">{option.label}</CardTitle>
            </CardHeader>
            <CardContent>
              <CardDescription className="text-center text-sm">
                {option.description}
              </CardDescription>
              <Button 
                className="w-full mt-4" 
                variant={option.disabled ? 'outline' : 'default'}
                disabled={option.disabled}
                onClick={(e) => {
                  e.stopPropagation();
                  if (!option.disabled) onSelect(option.value);
                }}
              >
                {option.disabled ? 'Binnenkort' : 'Selecteren'}
              </Button>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default ReportTypeSelector;
