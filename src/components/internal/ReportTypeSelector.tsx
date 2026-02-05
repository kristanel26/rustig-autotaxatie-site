import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Caravan, FileSpreadsheet, Car, LucideIcon } from 'lucide-react';
import { cn } from '@/lib/utils';

export type ReportType = 'camper' | 'wev' | 'klassieker';

interface ReportTypeOption {
  value: ReportType;
  label: string;
  description: string;
  Icon: LucideIcon;
  ctaText: string;
  disabled?: boolean;
  badgeColor: string;
}

const reportTypeOptions: ReportTypeOption[] = [
  {
    value: 'camper',
    label: 'Campertaxatie',
    description: 'Verzekeringstaxatie voor campers, motorhomes en kampeerauto\'s.',
    Icon: Caravan,
    ctaText: 'Start campertaxatie',
    badgeColor: 'bg-sky-50 border-sky-100 text-sky-600',
  },
  {
    value: 'wev',
    label: 'WEV-taxatie',
    description: 'Waardebepaling voor fiscale doeleinden of bedrijfsoverdracht.',
    Icon: FileSpreadsheet,
    ctaText: 'Start WEV-taxatie',
    badgeColor: 'bg-slate-50 border-slate-200 text-slate-600',
  },
  {
    value: 'klassieker',
    label: 'Klassiekertaxatie',
    description: 'Verzekeringstaxatie voor oldtimers en youngtimers.',
    Icon: Car,
    ctaText: 'Start klassiekertaxatie',
    disabled: false,
    badgeColor: 'bg-amber-50 border-amber-100 text-amber-600',
  },
];

interface ReportTypeSelectorProps {
  onSelect: (type: ReportType) => void;
}

export const ReportTypeSelector = ({ onSelect }: ReportTypeSelectorProps) => {
  return (
    <div className="min-h-[calc(100vh-4rem)] w-full bg-gradient-to-b from-slate-50/80 via-slate-50/40 to-white">
      {/* Subtle radial glow behind cards */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[400px] bg-gradient-radial from-primary/[0.03] to-transparent rounded-full blur-3xl" />
      </div>
      
      <div className="relative w-full max-w-[1140px] mx-auto px-5 sm:px-8 lg:px-10 py-12 sm:py-16 lg:py-20">
        {/* Header */}
        <div className="text-center mb-12 sm:mb-16">
          <h1 className="text-[28px] sm:text-[34px] lg:text-[38px] font-semibold tracking-[-0.02em] leading-tight text-foreground">
            Nieuwe taxatie
          </h1>
          <p className="text-muted-foreground mt-3 text-[15px] sm:text-base tracking-wide leading-relaxed">
            Kies het rapporttype dat je wilt aanmaken
          </p>
        </div>
        
        {/* Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 sm:gap-6 lg:gap-7">
          {reportTypeOptions.map((option) => {
            const IconComponent = option.Icon;
            return (
              <Card 
                key={option.value} 
                className={cn(
                  "relative flex flex-col h-full",
                  "bg-white/90 backdrop-blur-sm",
                  "border border-border/50",
                  "rounded-[20px]",
                  "shadow-[0_2px_12px_-4px_rgba(0,0,0,0.06)]",
                  "transition-all duration-250 ease-out",
                  "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/50 focus-visible:ring-offset-2",
                  option.disabled 
                    ? "opacity-50 cursor-not-allowed" 
                    : "cursor-pointer hover:shadow-[0_8px_30px_-8px_rgba(0,0,0,0.12)] hover:border-primary/30 hover:-translate-y-1"
                )}
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
                <CardHeader className="text-center pb-4 pt-8 px-7">
                  {/* Icon Badge with accent color */}
                  <div className={cn(
                    "mx-auto mb-5 flex h-14 w-14 items-center justify-center rounded-full border",
                    option.badgeColor
                  )}>
                    <IconComponent className="h-6 w-6" strokeWidth={1.75} />
                  </div>
                  <CardTitle className="text-lg font-semibold tracking-[-0.01em] text-foreground">
                    {option.label}
                  </CardTitle>
                </CardHeader>
                
                <CardContent className="flex flex-col flex-1 px-7 pb-8">
                  <CardDescription className="text-center text-[14px] text-muted-foreground leading-[1.6] flex-1 line-clamp-2">
                    {option.description}
                  </CardDescription>
                  
                  <Button 
                    className="w-full mt-6 h-12 text-[15px] font-medium rounded-xl shadow-sm hover:shadow-md transition-shadow" 
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
            );
          })}
        </div>

        {/* Microcopy */}
        <p className="text-center text-[13px] text-muted-foreground/70 mt-10 sm:mt-12 max-w-sm mx-auto leading-relaxed tracking-wide">
          Je kunt dit later niet wijzigen. Kies het rapporttype dat past bij het doel van de taxatie.
        </p>
      </div>
    </div>
  );
};

export default ReportTypeSelector;
