import { cn } from '@/lib/utils';
import { ArrowRight, Info } from 'lucide-react';

export type ReportType = 'camper' | 'wev' | 'klassieker';

/* ── Custom SVG silhouette icons ── */

const CamperIcon = () => (
  <svg viewBox="0 0 160 90" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
    {/* Main body — high box shape */}
    <path d="M12 22H120V68H12Z" fill="currentColor" opacity="0.06" stroke="currentColor" strokeWidth="2" strokeLinejoin="round" />
    {/* Cab — lower, separate section */}
    <path d="M120 36H140Q148 36 148 44V68H120Z" fill="currentColor" opacity="0.06" stroke="currentColor" strokeWidth="2" strokeLinejoin="round" />
    {/* Cab windshield — large angled */}
    <path d="M120 38L142 44V56L120 56Z" stroke="currentColor" strokeWidth="1.5" fill="currentColor" opacity="0.08" />
    {/* Alcove over cab */}
    <path d="M108 22H132Q134 22 134 24V36H120V22H108Z" fill="currentColor" opacity="0.08" stroke="currentColor" strokeWidth="2" strokeLinejoin="round" />
    {/* Side windows — coach */}
    <rect x="18" y="30" width="18" height="14" rx="2" stroke="currentColor" strokeWidth="1.5" fill="currentColor" opacity="0.08" />
    <rect x="40" y="30" width="18" height="14" rx="2" stroke="currentColor" strokeWidth="1.5" fill="currentColor" opacity="0.08" />
    <rect x="62" y="30" width="14" height="14" rx="2" stroke="currentColor" strokeWidth="1.5" fill="currentColor" opacity="0.08" />
    {/* Habitation door */}
    <rect x="82" y="34" width="14" height="32" rx="2" stroke="currentColor" strokeWidth="1.5" />
    <circle cx="91" cy="52" r="1.5" fill="currentColor" opacity="0.4" />
    {/* Roof AC */}
    <rect x="36" y="14" width="22" height="8" rx="3" stroke="currentColor" strokeWidth="1.5" fill="currentColor" opacity="0.06" />
    {/* Roof vent */}
    <rect x="70" y="16" width="10" height="6" rx="2" stroke="currentColor" strokeWidth="1" fill="currentColor" opacity="0.05" />
    {/* Rear wheel */}
    <circle cx="36" cy="70" r="14" stroke="currentColor" strokeWidth="2.5" fill="currentColor" opacity="0.06" />
    <circle cx="36" cy="70" r="7" stroke="currentColor" strokeWidth="1" fill="currentColor" opacity="0.12" />
    <circle cx="36" cy="70" r="2.5" fill="currentColor" opacity="0.35" />
    {/* Front wheel */}
    <circle cx="132" cy="70" r="14" stroke="currentColor" strokeWidth="2.5" fill="currentColor" opacity="0.06" />
    <circle cx="132" cy="70" r="7" stroke="currentColor" strokeWidth="1" fill="currentColor" opacity="0.12" />
    <circle cx="132" cy="70" r="2.5" fill="currentColor" opacity="0.35" />
    {/* Rear bumper / lights */}
    <rect x="6" y="54" width="6" height="12" rx="2" fill="currentColor" opacity="0.12" stroke="currentColor" strokeWidth="1" />
    <rect x="9" y="50" width="3" height="5" rx="1" fill="currentColor" opacity="0.25" />
    {/* Front bumper */}
    <rect x="148" y="56" width="5" height="10" rx="2" fill="currentColor" opacity="0.12" stroke="currentColor" strokeWidth="1" />
    {/* Headlight */}
    <circle cx="150" cy="48" r="3" stroke="currentColor" strokeWidth="1.5" fill="currentColor" opacity="0.2" />
    {/* Ground */}
    <line x1="4" y1="86" x2="156" y2="86" stroke="currentColor" strokeWidth="1" opacity="0.12" />
  </svg>
);

const WevIcon = () => (
  <svg viewBox="0 0 120 80" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
    {/* Scale post */}
    <rect x="57" y="12" width="6" height="50" rx="2" fill="currentColor" opacity="0.15" stroke="currentColor" strokeWidth="1.5" />
    {/* Scale beam */}
    <line x1="16" y1="22" x2="104" y2="22" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" />
    {/* Center pivot */}
    <circle cx="60" cy="12" r="5" stroke="currentColor" strokeWidth="2" fill="currentColor" opacity="0.15" />
    <circle cx="60" cy="12" r="2" fill="currentColor" opacity="0.4" />
    {/* Left pan strings */}
    <line x1="18" y1="22" x2="22" y2="38" stroke="currentColor" strokeWidth="1.5" />
    <line x1="42" y1="22" x2="38" y2="38" stroke="currentColor" strokeWidth="1.5" />
    {/* Left pan */}
    <path d="M18 38 Q30 50 42 38" stroke="currentColor" strokeWidth="2" fill="currentColor" opacity="0.1" />
    {/* Right pan strings */}
    <line x1="78" y1="22" x2="82" y2="38" stroke="currentColor" strokeWidth="1.5" />
    <line x1="102" y1="22" x2="98" y2="38" stroke="currentColor" strokeWidth="1.5" />
    {/* Right pan */}
    <path d="M78 38 Q90 50 102 38" stroke="currentColor" strokeWidth="2" fill="currentColor" opacity="0.1" />
    {/* Euro sign on left pan */}
    <text x="26" y="36" fontSize="14" fontWeight="700" fill="currentColor" opacity="0.7" fontFamily="serif" textAnchor="middle">€</text>
    {/* Base */}
    <rect x="42" y="60" width="36" height="5" rx="2" stroke="currentColor" strokeWidth="1.5" fill="currentColor" opacity="0.1" />
    {/* Feet */}
    <rect x="38" y="64" width="44" height="4" rx="2" stroke="currentColor" strokeWidth="1.5" fill="currentColor" opacity="0.15" />
  </svg>
);

const KlassiekerIcon = () => (
  <svg viewBox="0 0 180 80" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full" style={{ transform: 'scaleX(-1)' }}>
    {/* === Elegant classic GT: long nose, fastback roofline, smooth body === */}
    {/* Complete body outline — one continuous elegant shape */}
    <path d={`
      M8 52
      Q6 50 8 46 L16 44 L80 40
      Q84 32 92 26 L106 22 Q114 21 118 24 L124 30
      Q128 36 130 40 L140 42 Q152 44 158 48 Q162 52 160 56
      L158 58 Q156 60 152 60 L142 60
      Q138 60 136 58
      L46 58
      Q42 60 38 60 L16 60 Q10 60 8 56 Z
    `} stroke="currentColor" strokeWidth="2" fill="currentColor" opacity="0.06" strokeLinejoin="round" />
    {/* Hood surface — long and low */}
    <path d="M16 44L80 40L80 54L46 56L16 56Z" fill="currentColor" opacity="0.03" />
    {/* Hood center crease */}
    <line x1="20" y1="45" x2="76" y2="41" stroke="currentColor" strokeWidth="0.6" opacity="0.15" />
    {/* Windshield */}
    <path d="M82 40L90 28" stroke="currentColor" strokeWidth="2" opacity="0.45" />
    {/* Roof — low fastback */}
    <path d="M92 26L106 22Q114 21 118 24L124 30" stroke="currentColor" strokeWidth="2" fill="none" opacity="0.7" />
    {/* Rear window — long sloping fastback */}
    <path d="M124 30Q128 36 130 40" stroke="currentColor" strokeWidth="2" opacity="0.4" />
    {/* Rear deck */}
    <path d="M130 40L140 42Q152 44 158 48" stroke="currentColor" strokeWidth="2" fill="none" opacity="0.5" />
    {/* Rear end */}
    <path d="M158 48Q162 52 160 56L158 58" stroke="currentColor" strokeWidth="2" fill="none" />
    {/* Side chrome trim line */}
    <line x1="16" y1="52" x2="158" y2="52" stroke="currentColor" strokeWidth="0.7" opacity="0.15" />
    {/* Door seam */}
    <line x1="94" y1="32" x2="92" y2="56" stroke="currentColor" strokeWidth="0.6" opacity="0.12" />
    {/* Door handle */}
    <rect x="98" y="44" width="5" height="1.2" rx="0.6" fill="currentColor" opacity="0.2" />
    {/* Round headlight */}
    <circle cx="12" cy="46" r="4.5" stroke="currentColor" strokeWidth="2" fill="currentColor" opacity="0.15" />
    <circle cx="12" cy="46" r="2.2" fill="currentColor" opacity="0.35" />
    <circle cx="12" cy="46" r="0.8" fill="currentColor" opacity="0.6" />
    {/* Grille — vertical chrome slats */}
    <line x1="8" y1="48" x2="8" y2="54" stroke="currentColor" strokeWidth="0.7" opacity="0.2" />
    <line x1="10" y1="48" x2="10" y2="54" stroke="currentColor" strokeWidth="0.7" opacity="0.2" />
    <line x1="12" y1="48" x2="12" y2="54" stroke="currentColor" strokeWidth="0.7" opacity="0.2" />
    <line x1="14" y1="48" x2="14" y2="54" stroke="currentColor" strokeWidth="0.7" opacity="0.2" />
    {/* Front bumper — chrome overrider */}
    <path d="M4 50Q2 50 2 52Q2 56 6 58L8 58" stroke="currentColor" strokeWidth="1.8" opacity="0.25" />
    {/* Taillight */}
    <rect x="160" y="50" width="3" height="6" rx="1.5" fill="currentColor" opacity="0.3" />
    {/* Rear bumper */}
    <path d="M162 50Q164 50 164 54Q164 58 162 58" stroke="currentColor" strokeWidth="1.8" opacity="0.25" />
    {/* Front wheel */}
    <circle cx="36" cy="62" r="12" stroke="currentColor" strokeWidth="2.5" fill="currentColor" opacity="0.05" />
    <circle cx="36" cy="62" r="6" stroke="currentColor" strokeWidth="1" fill="currentColor" opacity="0.12" />
    <circle cx="36" cy="62" r="2.5" fill="currentColor" opacity="0.4" />
    {/* Spokes front */}
    <line x1="36" y1="51" x2="36" y2="55" stroke="currentColor" strokeWidth="0.7" opacity="0.2" />
    <line x1="36" y1="69" x2="36" y2="73" stroke="currentColor" strokeWidth="0.7" opacity="0.2" />
    <line x1="25" y1="62" x2="29" y2="62" stroke="currentColor" strokeWidth="0.7" opacity="0.2" />
    <line x1="43" y1="62" x2="47" y2="62" stroke="currentColor" strokeWidth="0.7" opacity="0.2" />
    <line x1="28" y1="54" x2="30" y2="56" stroke="currentColor" strokeWidth="0.6" opacity="0.14" />
    <line x1="42" y1="68" x2="44" y2="70" stroke="currentColor" strokeWidth="0.6" opacity="0.14" />
    <line x1="28" y1="70" x2="30" y2="68" stroke="currentColor" strokeWidth="0.6" opacity="0.14" />
    <line x1="42" y1="56" x2="44" y2="54" stroke="currentColor" strokeWidth="0.6" opacity="0.14" />
    {/* Rear wheel */}
    <circle cx="140" cy="62" r="12" stroke="currentColor" strokeWidth="2.5" fill="currentColor" opacity="0.05" />
    <circle cx="140" cy="62" r="6" stroke="currentColor" strokeWidth="1" fill="currentColor" opacity="0.12" />
    <circle cx="140" cy="62" r="2.5" fill="currentColor" opacity="0.4" />
    {/* Spokes rear */}
    <line x1="140" y1="51" x2="140" y2="55" stroke="currentColor" strokeWidth="0.7" opacity="0.2" />
    <line x1="140" y1="69" x2="140" y2="73" stroke="currentColor" strokeWidth="0.7" opacity="0.2" />
    <line x1="129" y1="62" x2="133" y2="62" stroke="currentColor" strokeWidth="0.7" opacity="0.2" />
    <line x1="147" y1="62" x2="151" y2="62" stroke="currentColor" strokeWidth="0.7" opacity="0.2" />
    <line x1="132" y1="54" x2="134" y2="56" stroke="currentColor" strokeWidth="0.6" opacity="0.14" />
    <line x1="146" y1="68" x2="148" y2="70" stroke="currentColor" strokeWidth="0.6" opacity="0.14" />
    <line x1="132" y1="70" x2="134" y2="68" stroke="currentColor" strokeWidth="0.6" opacity="0.14" />
    <line x1="146" y1="56" x2="148" y2="54" stroke="currentColor" strokeWidth="0.6" opacity="0.14" />
    {/* Ground */}
    <line x1="0" y1="76" x2="170" y2="76" stroke="currentColor" strokeWidth="1" opacity="0.1" />
  </svg>
);

/* ── Report type config ── */
interface ReportTypeOption {
  value: ReportType;
  label: string;
  code: string;
  description: string;
  ctaText: string;
  disabled?: boolean;
  isStar?: boolean;
  IconComponent: React.FC;
}

const reportTypeOptions: ReportTypeOption[] = [
  {
    value: 'camper',
    label: 'Campertaxatie',
    code: 'CAM',
    description: 'Verzekeringstaxatie voor campers, camperbussen en kampeerauto\'s.',
    ctaText: 'Start campertaxatie',
    IconComponent: CamperIcon,
  },
  {
    value: 'wev',
    label: 'WEV-taxatie',
    code: 'WEV',
    description: 'Waardebepaling voor fiscale doeleinden of bedrijfsoverdracht.',
    ctaText: 'Start WEV-taxatie',
    IconComponent: WevIcon,
  },
  {
    value: 'klassieker',
    label: 'Klassiekertaxatie',
    code: 'KLS',
    description: 'Verzekeringstaxatie voor oldtimers en youngtimers. Volgens art. 7:960 BW.',
    ctaText: 'Start klassiekertaxatie',
    isStar: true,
    IconComponent: KlassiekerIcon,
  },
];

interface ReportTypeSelectorProps {
  onSelect: (type: ReportType) => void;
}

export const ReportTypeSelector = ({ onSelect }: ReportTypeSelectorProps) => {
  return (
    <div className="w-full">
      <h1 className="font-display text-[2rem] text-white font-normal mb-1.5">Nieuwe taxatie</h1>
      <p className="text-[13.5px] text-[hsl(var(--s500))] mb-10">
        Kies het rapporttype. Dit kan na aanmaken niet meer worden gewijzigd.
      </p>

      {/* Cards grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
        {reportTypeOptions.map((option) => {
          const IconComp = option.IconComponent;
          return (
            <div
              key={option.value}
              onClick={() => !option.disabled && onSelect(option.value)}
              className={cn(
                "relative group rounded-[14px] p-7 cursor-pointer transition-all duration-200 overflow-hidden",
                "bg-[hsl(var(--s900))] border border-[hsl(var(--s700))]",
                // Gold top-line on hover
                "before:content-[''] before:absolute before:top-0 before:left-0 before:right-0 before:h-[2px]",
                "before:bg-gradient-to-r before:from-transparent before:via-[hsl(var(--gold))] before:to-transparent",
                "before:opacity-0 before:transition-opacity before:duration-200",
                "hover:border-[hsl(var(--gold))] hover:-translate-y-0.5",
                "hover:shadow-[0_16px_40px_rgba(0,0,0,0.45),0_0_0_1px_rgba(201,168,76,0.12)]",
                "hover:before:opacity-100",
                option.isStar && [
                  "border-[hsl(var(--gold)/0.35)]",
                  "bg-gradient-to-br from-[hsl(var(--s900))] to-[hsl(var(--gold)/0.03)]",
                  "before:opacity-50",
                ],
                option.disabled && "opacity-50 cursor-not-allowed hover:translate-y-0 hover:shadow-none"
              )}
              role="button"
              tabIndex={option.disabled ? -1 : 0}
              onKeyDown={(e) => {
                if (!option.disabled && (e.key === 'Enter' || e.key === ' ')) {
                  e.preventDefault();
                  onSelect(option.value);
                }
              }}
            >
              {/* Star badge */}
              {option.isStar && (
                <span className="absolute top-[1.1rem] right-[1.1rem] bg-[hsl(var(--gold)/0.12)] border border-[hsl(var(--gold)/0.25)] text-[hsl(var(--gold-lt))] font-intern-mono text-[9px] tracking-[0.1em] px-2 py-0.5 rounded-[3px]">
                  MEEST GEBRUIKT
                </span>
              )}

              {/* Icon — large silhouette */}
              <div className={cn(
                "w-full max-w-[180px] h-[120px] mb-5 text-[#c9a84c]",
                "transition-all duration-200",
                "group-hover:text-[hsl(var(--gold))]"
              )}>
                <IconComp />
              </div>

              {/* Code */}
              <div className="font-intern-mono text-[9.5px] tracking-[0.14em] text-[hsl(var(--gold))] uppercase mb-1">
                {option.code}
              </div>

              {/* Name */}
              <div className="font-display text-[1.2rem] text-white font-normal mb-2">
                {option.label}
              </div>

              {/* Description */}
              <p className="text-[12.5px] text-[hsl(var(--s500))] leading-[1.55] mb-6">
                {option.description}
              </p>

              {/* CTA button */}
              <div className={cn(
                "flex items-center justify-between px-[14px] py-[10px] rounded-[7px] text-[12.5px] font-medium transition-all duration-200",
                "bg-[hsl(var(--s800))] border border-[hsl(var(--s600))] text-[hsl(var(--s200))]",
                "group-hover:bg-gradient-to-br group-hover:from-[hsl(var(--gold))] group-hover:to-[hsl(var(--gold-lt))]",
                "group-hover:border-transparent group-hover:text-[hsl(var(--background))]"
              )}>
                {option.disabled ? 'Binnenkort beschikbaar' : option.ctaText}
                <ArrowRight className="w-[13px] h-[13px]" />
              </div>
            </div>
          );
        })}
      </div>

      {/* Notice */}
      <div className="flex items-center gap-[10px] px-[17px] py-[13px] mt-6 rounded-[7px] bg-[hsl(var(--intern-amber)/0.05)] border border-[hsl(var(--intern-amber)/0.12)] text-[12px] text-[hsl(var(--s500))]">
        <Info className="w-3.5 h-3.5 text-[hsl(var(--intern-amber))] flex-shrink-0" />
        Het rapporttype kan na aanmaken niet meer worden gewijzigd. Kies het type dat past bij het doel van de taxatie.
      </div>
    </div>
  );
};

export default ReportTypeSelector;
