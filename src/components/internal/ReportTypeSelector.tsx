import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Caravan, FileSpreadsheet, Car } from 'lucide-react';

export type ReportType = 'camper' | 'wev' | 'klassieker';

interface ReportTypeOption {
  value: ReportType;
  label: string;
  description: string;
  icon: React.ReactNode;
  ctaText: string;
  disabled?: boolean;
}

const reportTypeOptions: ReportTypeOption[] = [
  {
    value: 'camper',
    label: 'Campertaxatie',
    description: 'Verzekeringstaxatie voor campers, motorhomes en kampeerauto\'s.',
    icon: <Caravan className="h-6 w-6" />,
    ctaText: 'Start campertaxatie',
  },
  {
    value: 'wev',
    label: 'WEV-taxatie',
    description: 'Waardebepaling voor fiscale doeleinden of bedrijfsoverdracht.',
    icon: <FileSpreadsheet className="h-6 w-6" />,
    ctaText: 'Start WEV-taxatie',
  },
  {
    value: 'klassieker',
    label: 'Klassiekertaxatie',
    description: 'Verzekeringstaxatie voor oldtimers en youngtimers.',
    icon: <Car className="h-6 w-6" />,
    ctaText: 'Start klassiekertaxatie',
    disabled: false,
  },
];

interface ReportTypeSelectorProps {
  onSelect: (type: ReportType) => void;
}

export const ReportTypeSelector = ({ onSelect }: ReportTypeSelectorProps) => {
  return (
    <div className="w-full max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
      {/* Header */}
      <div className="text-center mb-10 sm:mb-12">
        <h1 className="text-2xl sm:text-3xl font-semibold tracking-tight text-foreground">
          Nieuwe taxatie
        </h1>
        <p className="text-muted-foreground mt-2 text-base sm:text-lg">
          Kies het rapporttype dat je wilt aanmaken
        </p>
      </div>
      
      {/* Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 sm:gap-6">
        {reportTypeOptions.map((option) => (
          <Card 
            key={option.value} 
            className={`
              relative flex flex-col h-full
              border border-border/60 
              rounded-2xl 
              shadow-sm
              transition-all duration-200 ease-out
              focus-within:ring-2 focus-within:ring-primary focus-within:ring-offset-2
              ${option.disabled 
                ? 'opacity-50 cursor-not-allowed' 
                : 'cursor-pointer hover:shadow-md hover:border-primary/40 hover:-translate-y-0.5'
              }
            `}
            onClick={() => !option.disabled && onSelect(option.value)}
            tabIndex={option.disabled ? -1 : 0}
            onKeyDown={(e) => {
              if (!option.disabled && (e.key === 'Enter' || e.key === ' ')) {
                e.preventDefault();
                onSelect(option.value);
              }
            }}
            role="button"
            aria-disabled={option.disabled}
          >
            <CardHeader className="text-center pb-3 pt-6 px-5">
              {/* Icon Badge */}
              <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-muted/60 text-muted-foreground">
                {option.icon}
              </div>
              <CardTitle className="text-lg font-semibold text-foreground">
                {option.label}
              </CardTitle>
            </CardHeader>
            
            <CardContent className="flex flex-col flex-1 px-5 pb-6">
              <CardDescription className="text-center text-sm text-muted-foreground leading-relaxed flex-1">
                {option.description}
              </CardDescription>
              
              <Button 
                className="w-full mt-5 h-11" 
                variant={option.disabled ? 'outline' : 'default'}
                disabled={option.disabled}
                onClick={(e) => {
                  e.stopPropagation();
                  if (!option.disabled) onSelect(option.value);
                }}
                tabIndex={-1}
              >
                {option.disabled ? 'Binnenkort beschikbaar' : option.ctaText}
              </Button>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Microcopy */}
      <p className="text-center text-sm text-muted-foreground/80 mt-8 max-w-md mx-auto">
        Je kunt dit later niet wijzigen. Kies het rapporttype dat past bij het doel van de taxatie.
      </p>
    </div>
  );
};

export default ReportTypeSelector;
