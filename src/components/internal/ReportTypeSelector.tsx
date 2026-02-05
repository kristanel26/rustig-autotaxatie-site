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
  accentClass: string;
}

const reportTypeOptions: ReportTypeOption[] = [
  {
    value: 'camper',
    label: 'Campertaxatie',
    description: 'Verzekeringstaxatie voor campers, motorhomes en kampeerauto\'s.',
    Icon: Caravan,
    ctaText: 'Start campertaxatie',
    accentClass: 'bg-slate-50/80 text-slate-500 ring-slate-200/60',
  },
  {
    value: 'wev',
    label: 'WEV-taxatie',
    description: 'Waardebepaling voor fiscale doeleinden of bedrijfsoverdracht.',
    Icon: FileSpreadsheet,
    ctaText: 'Start WEV-taxatie',
    accentClass: 'bg-slate-100/60 text-slate-500 ring-slate-200/50',
  },
  {
    value: 'klassieker',
    label: 'Klassiekertaxatie',
    description: 'Verzekeringstaxatie voor oldtimers en youngtimers.',
    Icon: Car,
    ctaText: 'Start klassiekertaxatie',
    disabled: false,
    accentClass: 'bg-amber-50/70 text-amber-600/80 ring-amber-200/50',
  },
];

interface ReportTypeSelectorProps {
  onSelect: (type: ReportType) => void;
}

export const ReportTypeSelector = ({ onSelect }: ReportTypeSelectorProps) => {
  return (
    <div className="min-h-[calc(100vh-4rem)] w-full relative overflow-hidden">
      {/* Hero gradient background */}
      <div className="absolute inset-0 bg-gradient-to-b from-slate-50 via-slate-50/50 to-white" />
      
      {/* Subtle noise texture overlay */}
      <div 
        className="absolute inset-0 opacity-[0.015]" 
        style={{ 
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E")`,
        }} 
      />
      
      {/* Very subtle radial glow */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[1000px] h-[600px] bg-gradient-radial from-primary/[0.02] via-transparent to-transparent rounded-full blur-3xl pointer-events-none" />
      
      <div className="relative w-full max-w-[1200px] mx-auto px-6 sm:px-10 lg:px-12 py-16 sm:py-20 lg:py-28">
        {/* Hero Section */}
        <div className="text-center mb-14 sm:mb-20">
          <h1 className="text-[26px] sm:text-[32px] lg:text-[36px] font-semibold tracking-[-0.025em] leading-[1.1] text-foreground">
            Nieuwe taxatie
          </h1>
          <p className="text-muted-foreground/80 mt-3 text-[15px] sm:text-[16px] tracking-normal leading-relaxed max-w-md mx-auto">
            Kies het rapporttype dat je wilt aanmaken
          </p>
        </div>
        
        {/* Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-7 lg:gap-8">
          {reportTypeOptions.map((option) => {
            const IconComponent = option.Icon;
            return (
              <Card 
                key={option.value} 
                className={cn(
                  "group relative flex flex-col h-full",
                  "bg-white/[0.97] backdrop-blur-sm",
                  "border-0 ring-1 ring-black/[0.04]",
                  "rounded-[22px]",
                  "shadow-[0_1px_3px_rgba(0,0,0,0.02),0_4px_12px_rgba(0,0,0,0.04)]",
                  "transition-all duration-200 ease-out",
                  "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/40 focus-visible:ring-offset-4",
                  option.disabled 
                    ? "opacity-50 cursor-not-allowed" 
                    : "cursor-pointer hover:shadow-[0_4px_20px_rgba(0,0,0,0.08),0_8px_32px_rgba(0,0,0,0.06)] hover:-translate-y-1.5 hover:ring-black/[0.06]"
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
                <CardHeader className="text-center pb-3 pt-9 px-8">
                  {/* Minimalist icon badge */}
                  <div className={cn(
                    "mx-auto mb-5 flex h-12 w-12 items-center justify-center rounded-full ring-1",
                    option.accentClass
                  )}>
                    <IconComponent className="h-5 w-5" strokeWidth={1.5} />
                  </div>
                  <CardTitle className="text-[17px] font-semibold tracking-[-0.01em] text-foreground">
                    {option.label}
                  </CardTitle>
                </CardHeader>
                
                <CardContent className="flex flex-col flex-1 px-8 pb-9">
                  <CardDescription className="text-center text-[14px] text-slate-500 leading-[1.65] flex-1 line-clamp-2">
                    {option.description}
                  </CardDescription>
                  
                  <Button 
                    className={cn(
                      "w-full mt-7 h-11 text-[14px] font-medium rounded-xl",
                      "transition-all duration-150",
                      !option.disabled && "hover:shadow-[0_2px_8px_rgba(0,0,0,0.12)] active:scale-[0.98]"
                    )}
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
        <p className="text-center text-[12px] text-slate-400 mt-12 sm:mt-16 max-w-xs mx-auto leading-[1.7] tracking-wide">
          Je kunt dit later niet wijzigen. Kies het rapporttype dat past bij het doel van de taxatie.
        </p>
      </div>
    </div>
  );
};

export default ReportTypeSelector;
