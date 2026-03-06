import { cn } from '@/lib/utils';
import { ArrowRight, Info } from 'lucide-react';

export type ReportType = 'camper' | 'wev' | 'klassieker';

/* ── Custom SVG silhouette icons ── */

const CamperIcon = () => (
  <svg viewBox="0 0 140 90" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
    {/* Alcove (overhang above cab) */}
    <path d="M88 18H108V30H88Z" fill="currentColor" opacity="0.12" stroke="currentColor" strokeWidth="2" strokeLinejoin="round" />
    {/* Main body — tall rectangular coach */}
    <rect x="10" y="18" width="98" height="46" rx="3" fill="currentColor" opacity="0.10" stroke="currentColor" strokeWidth="2" />
    {/* Cab section */}
    <path d="M108 30V64H128a4 4 0 004-4V42a10 10 0 00-10-10H108Z" fill="currentColor" opacity="0.08" stroke="currentColor" strokeWidth="2" strokeLinejoin="round" />
    {/* Cab windshield (angled) */}
    <path d="M108 32L122 36V54H108" stroke="currentColor" strokeWidth="1.5" fill="currentColor" opacity="0.06" />
    {/* Large side windows */}
    <rect x="16" y="26" width="18" height="14" rx="2" stroke="currentColor" strokeWidth="1.5" fill="currentColor" opacity="0.08" />
    <rect x="40" y="26" width="18" height="14" rx="2" stroke="currentColor" strokeWidth="1.5" fill="currentColor" opacity="0.08" />
    <rect x="64" y="26" width="18" height="14" rx="2" stroke="currentColor" strokeWidth="1.5" fill="currentColor" opacity="0.08" />
    {/* Habitation door */}
    <rect x="88" y="34" width="12" height="28" rx="2" stroke="currentColor" strokeWidth="1.5" />
    <circle cx="96" cy="48" r="1.5" fill="currentColor" opacity="0.5" />
    {/* Roof AC unit */}
    <rect x="34" y="11" width="24" height="7" rx="3" stroke="currentColor" strokeWidth="1.5" fill="currentColor" opacity="0.08" />
    {/* Rear wheel */}
    <circle cx="30" cy="66" r="11" stroke="currentColor" strokeWidth="2.5" fill="currentColor" opacity="0.1" />
    <circle cx="30" cy="66" r="5" fill="currentColor" opacity="0.3" />
    {/* Front wheel */}
    <circle cx="114" cy="66" r="11" stroke="currentColor" strokeWidth="2.5" fill="currentColor" opacity="0.1" />
    <circle cx="114" cy="66" r="5" fill="currentColor" opacity="0.3" />
    {/* Bumper */}
    <rect x="128" y="56" width="4" height="8" rx="1.5" fill="currentColor" opacity="0.2" />
    {/* Ground */}
    <line x1="4" y1="78" x2="136" y2="78" stroke="currentColor" strokeWidth="1" opacity="0.15" />
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
  <svg viewBox="0 0 140 90" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
    {/* Main body — long hood, rounded cabin, sweeping rear */}
    <path
      d="M8 58 Q8 52 14 50 L56 46 Q60 34 68 28 L82 26 Q92 26 96 34 L100 46 Q110 48 118 50 Q126 52 126 58"
      stroke="currentColor" strokeWidth="2" fill="currentColor" opacity="0.10"
    />
    {/* Long hood line — 40%+ of length */}
    <path d="M14 50 L56 46" stroke="currentColor" strokeWidth="1.5" opacity="0.5" />
    {/* Rounded cabin / greenhouse */}
    <path d="M58 46 Q60 30 70 28 L82 26 Q90 26 94 34 L98 46" stroke="currentColor" strokeWidth="2" fill="currentColor" opacity="0.06" />
    {/* Windshield */}
    <line x1="60" y1="46" x2="68" y2="28" stroke="currentColor" strokeWidth="1.5" opacity="0.45" />
    {/* Rear window */}
    <line x1="90" y1="30" x2="98" y2="46" stroke="currentColor" strokeWidth="1.5" opacity="0.45" />
    {/* Front fender — bold round spatbord */}
    <path d="M8 58 Q6 58 6 62 Q6 70 18 72 Q28 72 34 70 Q40 68 40 58" stroke="currentColor" strokeWidth="2.5" fill="currentColor" opacity="0.08" />
    {/* Rear fender — bold round spatbord */}
    <path d="M94 58 Q94 68 100 70 Q106 72 116 72 Q128 70 128 62 Q128 58 126 58" stroke="currentColor" strokeWidth="2.5" fill="currentColor" opacity="0.08" />
    {/* Running board between fenders */}
    <line x1="40" y1="58" x2="94" y2="58" stroke="currentColor" strokeWidth="1.5" opacity="0.4" />
    {/* Front bumper */}
    <path d="M6 56 Q2 56 2 58 Q2 60 6 60" stroke="currentColor" strokeWidth="1.5" opacity="0.3" />
    {/* Large round headlights */}
    <circle cx="10" cy="50" r="4" stroke="currentColor" strokeWidth="2" fill="currentColor" opacity="0.25" />
    <circle cx="10" cy="50" r="1.5" fill="currentColor" opacity="0.5" />
    {/* Grille */}
    <line x1="6" y1="52" x2="14" y2="52" stroke="currentColor" strokeWidth="0.8" opacity="0.25" />
    <line x1="6" y1="54" x2="14" y2="54" stroke="currentColor" strokeWidth="0.8" opacity="0.25" />
    <line x1="6" y1="56" x2="14" y2="56" stroke="currentColor" strokeWidth="0.8" opacity="0.25" />
    {/* Taillight */}
    <rect x="126" y="50" width="3" height="6" rx="1.5" fill="currentColor" opacity="0.3" />
    {/* Front wheel with spokes */}
    <circle cx="26" cy="64" r="11" stroke="currentColor" strokeWidth="2.5" fill="currentColor" opacity="0.08" />
    <circle cx="26" cy="64" r="5" fill="currentColor" opacity="0.25" />
    <line x1="26" y1="54" x2="26" y2="58" stroke="currentColor" strokeWidth="1" opacity="0.3" />
    <line x1="26" y1="70" x2="26" y2="74" stroke="currentColor" strokeWidth="1" opacity="0.3" />
    <line x1="16" y1="64" x2="20" y2="64" stroke="currentColor" strokeWidth="1" opacity="0.3" />
    <line x1="32" y1="64" x2="36" y2="64" stroke="currentColor" strokeWidth="1" opacity="0.3" />
    <line x1="19" y1="57" x2="22" y2="60" stroke="currentColor" strokeWidth="1" opacity="0.2" />
    <line x1="30" y1="68" x2="33" y2="71" stroke="currentColor" strokeWidth="1" opacity="0.2" />
    <line x1="19" y1="71" x2="22" y2="68" stroke="currentColor" strokeWidth="1" opacity="0.2" />
    <line x1="30" y1="60" x2="33" y2="57" stroke="currentColor" strokeWidth="1" opacity="0.2" />
    {/* Rear wheel with spokes */}
    <circle cx="110" cy="64" r="11" stroke="currentColor" strokeWidth="2.5" fill="currentColor" opacity="0.08" />
    <circle cx="110" cy="64" r="5" fill="currentColor" opacity="0.25" />
    <line x1="110" y1="54" x2="110" y2="58" stroke="currentColor" strokeWidth="1" opacity="0.3" />
    <line x1="110" y1="70" x2="110" y2="74" stroke="currentColor" strokeWidth="1" opacity="0.3" />
    <line x1="100" y1="64" x2="104" y2="64" stroke="currentColor" strokeWidth="1" opacity="0.3" />
    <line x1="116" y1="64" x2="120" y2="64" stroke="currentColor" strokeWidth="1" opacity="0.3" />
    <line x1="103" y1="57" x2="106" y2="60" stroke="currentColor" strokeWidth="1" opacity="0.2" />
    <line x1="114" y1="68" x2="117" y2="71" stroke="currentColor" strokeWidth="1" opacity="0.2" />
    <line x1="103" y1="71" x2="106" y2="68" stroke="currentColor" strokeWidth="1" opacity="0.2" />
    <line x1="114" y1="60" x2="117" y2="57" stroke="currentColor" strokeWidth="1" opacity="0.2" />
    {/* Ground */}
    <line x1="0" y1="76" x2="136" y2="76" stroke="currentColor" strokeWidth="1" opacity="0.15" />
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
