import { cn } from '@/lib/utils';
import { ArrowRight, Info } from 'lucide-react';

export type ReportType = 'camper' | 'wev' | 'klassieker';

/* ── Custom SVG silhouette icons ── */

const CamperIcon = () => (
  <svg viewBox="0 0 120 80" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
    {/* Body */}
    <rect x="8" y="22" width="90" height="38" rx="4" fill="currentColor" opacity="0.15" />
    <rect x="8" y="22" width="90" height="38" rx="4" stroke="currentColor" strokeWidth="2" />
    {/* Cab windshield angle */}
    <path d="M98 60V30a8 8 0 00-8-8H88L78 22" stroke="currentColor" strokeWidth="2" />
    <path d="M98 60H108a4 4 0 004-4V42a8 8 0 00-8-8H98" stroke="currentColor" strokeWidth="2" />
    {/* Roof unit / AC */}
    <rect x="30" y="14" width="28" height="8" rx="3" stroke="currentColor" strokeWidth="1.5" fill="currentColor" opacity="0.1" />
    {/* Windows */}
    <rect x="14" y="28" width="16" height="12" rx="2" stroke="currentColor" strokeWidth="1.5" fill="currentColor" opacity="0.08" />
    <rect x="36" y="28" width="16" height="12" rx="2" stroke="currentColor" strokeWidth="1.5" fill="currentColor" opacity="0.08" />
    <rect x="58" y="28" width="16" height="12" rx="2" stroke="currentColor" strokeWidth="1.5" fill="currentColor" opacity="0.08" />
    {/* Cab window */}
    <rect x="100" y="36" width="10" height="10" rx="2" stroke="currentColor" strokeWidth="1.5" fill="currentColor" opacity="0.08" />
    {/* Door */}
    <rect x="80" y="32" width="12" height="24" rx="2" stroke="currentColor" strokeWidth="1.5" />
    <circle cx="88" cy="44" r="1.5" fill="currentColor" />
    {/* Wheels */}
    <circle cx="26" cy="62" r="9" stroke="currentColor" strokeWidth="2" fill="currentColor" opacity="0.1" />
    <circle cx="26" cy="62" r="4" fill="currentColor" opacity="0.3" />
    <circle cx="100" cy="62" r="9" stroke="currentColor" strokeWidth="2" fill="currentColor" opacity="0.1" />
    <circle cx="100" cy="62" r="4" fill="currentColor" opacity="0.3" />
    {/* Ground line */}
    <line x1="4" y1="72" x2="116" y2="72" stroke="currentColor" strokeWidth="1" opacity="0.2" />
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
  <svg viewBox="0 0 120 80" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
    {/* Body / fenders — long hood classic car silhouette */}
    <path 
      d="M16 52 Q16 44 24 42 L50 38 Q54 30 62 26 L78 24 Q88 24 92 30 L96 38 Q106 40 110 44 Q114 48 114 52" 
      stroke="currentColor" strokeWidth="2" fill="currentColor" opacity="0.12" 
    />
    {/* Hood / bonnet (long) */}
    <path d="M24 42 L50 38" stroke="currentColor" strokeWidth="1.5" opacity="0.6" />
    {/* Cabin */}
    <path d="M54 38 Q56 28 64 26 L78 24 Q86 24 90 30 L94 38" stroke="currentColor" strokeWidth="2" fill="currentColor" opacity="0.08" />
    {/* Windshield */}
    <line x1="56" y1="38" x2="62" y2="26" stroke="currentColor" strokeWidth="1.5" opacity="0.5" />
    {/* Rear window */}
    <line x1="88" y1="28" x2="94" y2="38" stroke="currentColor" strokeWidth="1.5" opacity="0.5" />
    {/* Running board */}
    <line x1="28" y1="52" x2="100" y2="52" stroke="currentColor" strokeWidth="1.5" />
    {/* Front fender curve */}
    <path d="M16 52 Q14 52 14 56 Q14 60 20 62" stroke="currentColor" strokeWidth="2" />
    {/* Rear fender curve */}
    <path d="M114 52 Q116 52 116 56 Q116 60 110 62" stroke="currentColor" strokeWidth="2" />
    {/* Headlight */}
    <circle cx="18" cy="44" r="3" stroke="currentColor" strokeWidth="1.5" fill="currentColor" opacity="0.25" />
    {/* Taillight */}
    <rect x="112" y="42" width="3" height="6" rx="1" fill="currentColor" opacity="0.3" />
    {/* Grille lines */}
    <line x1="14" y1="46" x2="22" y2="46" stroke="currentColor" strokeWidth="1" opacity="0.3" />
    <line x1="14" y1="48" x2="22" y2="48" stroke="currentColor" strokeWidth="1" opacity="0.3" />
    <line x1="14" y1="50" x2="22" y2="50" stroke="currentColor" strokeWidth="1" opacity="0.3" />
    {/* Front wheel with spokes */}
    <circle cx="34" cy="56" r="10" stroke="currentColor" strokeWidth="2" fill="currentColor" opacity="0.1" />
    <circle cx="34" cy="56" r="4" fill="currentColor" opacity="0.3" />
    <line x1="34" y1="47" x2="34" y2="50" stroke="currentColor" strokeWidth="1" opacity="0.3" />
    <line x1="34" y1="62" x2="34" y2="65" stroke="currentColor" strokeWidth="1" opacity="0.3" />
    <line x1="25" y1="56" x2="28" y2="56" stroke="currentColor" strokeWidth="1" opacity="0.3" />
    <line x1="40" y1="56" x2="43" y2="56" stroke="currentColor" strokeWidth="1" opacity="0.3" />
    {/* Rear wheel with spokes */}
    <circle cx="96" cy="56" r="10" stroke="currentColor" strokeWidth="2" fill="currentColor" opacity="0.1" />
    <circle cx="96" cy="56" r="4" fill="currentColor" opacity="0.3" />
    <line x1="96" y1="47" x2="96" y2="50" stroke="currentColor" strokeWidth="1" opacity="0.3" />
    <line x1="96" y1="62" x2="96" y2="65" stroke="currentColor" strokeWidth="1" opacity="0.3" />
    <line x1="87" y1="56" x2="90" y2="56" stroke="currentColor" strokeWidth="1" opacity="0.3" />
    <line x1="102" y1="56" x2="105" y2="56" stroke="currentColor" strokeWidth="1" opacity="0.3" />
    {/* Ground line */}
    <line x1="6" y1="67" x2="124" y2="67" stroke="currentColor" strokeWidth="1" opacity="0.2" />
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
                "w-[100px] h-[68px] mb-5 text-[hsl(var(--gold-lt))]",
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
