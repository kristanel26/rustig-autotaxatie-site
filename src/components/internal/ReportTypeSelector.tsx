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
  <svg viewBox="0 0 160 90" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
    {/* Body — classic Porsche 911/Mercedes SL silhouette with flowing lines */}
    {/* Roofline and body */}
    <path d="M10 58Q8 54 12 50L28 48L48 46L58 36Q64 28 76 24L92 22Q100 22 104 26L108 32Q110 36 112 40L118 44L136 48Q146 50 150 54Q152 58 150 62L148 64" 
      stroke="currentColor" strokeWidth="2" fill="currentColor" opacity="0.06" />
    {/* Lower body line */}
    <path d="M10 58L10 64Q10 66 14 66L40 66" stroke="currentColor" strokeWidth="2" fill="none" />
    <path d="M60 66L100 66" stroke="currentColor" strokeWidth="1.5" opacity="0.3" />
    <path d="M120 66L144 66Q148 66 148 64L150 62" stroke="currentColor" strokeWidth="2" fill="none" />
    {/* Hood — long sweeping */}
    <path d="M12 50L48 46" stroke="currentColor" strokeWidth="1.8" fill="none" />
    {/* Rear deck */}
    <path d="M112 40L136 48" stroke="currentColor" strokeWidth="1.8" fill="none" />
    {/* Windshield */}
    <path d="M56 36L48 46" stroke="currentColor" strokeWidth="2" opacity="0.5" />
    {/* Rear window */}
    <path d="M108 32L118 44" stroke="currentColor" strokeWidth="2" opacity="0.5" />
    {/* Roof */}
    <path d="M58 36Q66 28 76 24L92 22Q100 22 104 26L108 32" stroke="currentColor" strokeWidth="2" fill="currentColor" opacity="0.04" />
    {/* Chrome bumper front */}
    <path d="M6 56Q4 56 4 58Q4 62 8 64L14 66" stroke="currentColor" strokeWidth="2" opacity="0.3" />
    {/* Chrome bumper rear */}
    <path d="M148 56Q152 56 152 60Q152 64 148 66L144 66" stroke="currentColor" strokeWidth="2" opacity="0.3" />
    {/* Headlights — round classic */}
    <circle cx="10" cy="52" r="4.5" stroke="currentColor" strokeWidth="2" fill="currentColor" opacity="0.15" />
    <circle cx="10" cy="52" r="2" fill="currentColor" opacity="0.4" />
    {/* Second headlight */}
    <circle cx="20" cy="50" r="3.5" stroke="currentColor" strokeWidth="1.5" fill="currentColor" opacity="0.12" />
    <circle cx="20" cy="50" r="1.5" fill="currentColor" opacity="0.3" />
    {/* Taillight */}
    <rect x="150" y="52" width="3" height="8" rx="1.5" fill="currentColor" opacity="0.3" />
    {/* Side chrome trim */}
    <line x1="14" y1="56" x2="148" y2="56" stroke="currentColor" strokeWidth="0.8" opacity="0.15" />
    {/* Door handle */}
    <rect x="78" y="42" width="6" height="1.5" rx="0.75" fill="currentColor" opacity="0.25" />
    {/* Front wheel — wire spokes */}
    <circle cx="38" cy="68" r="14" stroke="currentColor" strokeWidth="2.5" fill="currentColor" opacity="0.05" />
    <circle cx="38" cy="68" r="7" stroke="currentColor" strokeWidth="1" fill="currentColor" opacity="0.12" />
    <circle cx="38" cy="68" r="2.5" fill="currentColor" opacity="0.4" />
    <line x1="38" y1="55" x2="38" y2="60" stroke="currentColor" strokeWidth="0.8" opacity="0.2" />
    <line x1="38" y1="76" x2="38" y2="81" stroke="currentColor" strokeWidth="0.8" opacity="0.2" />
    <line x1="25" y1="68" x2="30" y2="68" stroke="currentColor" strokeWidth="0.8" opacity="0.2" />
    <line x1="46" y1="68" x2="51" y2="68" stroke="currentColor" strokeWidth="0.8" opacity="0.2" />
    <line x1="29" y1="59" x2="32" y2="62" stroke="currentColor" strokeWidth="0.7" opacity="0.15" />
    <line x1="44" y1="74" x2="47" y2="77" stroke="currentColor" strokeWidth="0.7" opacity="0.15" />
    <line x1="29" y1="77" x2="32" y2="74" stroke="currentColor" strokeWidth="0.7" opacity="0.15" />
    <line x1="44" y1="62" x2="47" y2="59" stroke="currentColor" strokeWidth="0.7" opacity="0.15" />
    {/* Rear wheel — wire spokes */}
    <circle cx="128" cy="68" r="14" stroke="currentColor" strokeWidth="2.5" fill="currentColor" opacity="0.05" />
    <circle cx="128" cy="68" r="7" stroke="currentColor" strokeWidth="1" fill="currentColor" opacity="0.12" />
    <circle cx="128" cy="68" r="2.5" fill="currentColor" opacity="0.4" />
    <line x1="128" y1="55" x2="128" y2="60" stroke="currentColor" strokeWidth="0.8" opacity="0.2" />
    <line x1="128" y1="76" x2="128" y2="81" stroke="currentColor" strokeWidth="0.8" opacity="0.2" />
    <line x1="115" y1="68" x2="120" y2="68" stroke="currentColor" strokeWidth="0.8" opacity="0.2" />
    <line x1="136" y1="68" x2="141" y2="68" stroke="currentColor" strokeWidth="0.8" opacity="0.2" />
    <line x1="119" y1="59" x2="122" y2="62" stroke="currentColor" strokeWidth="0.7" opacity="0.15" />
    <line x1="134" y1="74" x2="137" y2="77" stroke="currentColor" strokeWidth="0.7" opacity="0.15" />
    <line x1="119" y1="77" x2="122" y2="74" stroke="currentColor" strokeWidth="0.7" opacity="0.15" />
    <line x1="134" y1="62" x2="137" y2="59" stroke="currentColor" strokeWidth="0.7" opacity="0.15" />
    {/* Ground */}
    <line x1="0" y1="84" x2="156" y2="84" stroke="currentColor" strokeWidth="1" opacity="0.12" />
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
