import { cn } from '@/lib/utils';
import { ArrowRight, Info } from 'lucide-react';

export type ReportType = 'camper' | 'wev' | 'klassieker';

/* ── Custom SVG silhouette icons ── */

const CamperIcon = () => (
  <svg viewBox="0 0 140 90" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
    {/* Alcove — overhang above cab */}
    <path d="M90 12H114V28H90Z" fill="currentColor" opacity="0.12" stroke="currentColor" strokeWidth="2" strokeLinejoin="round" />
    <line x1="94" y1="12" x2="94" y2="17" stroke="currentColor" strokeWidth="0.8" opacity="0.2" />
    <line x1="100" y1="12" x2="100" y2="17" stroke="currentColor" strokeWidth="0.8" opacity="0.2" />
    <line x1="106" y1="12" x2="106" y2="17" stroke="currentColor" strokeWidth="0.8" opacity="0.2" />
    {/* Main body — tall rectangular coach */}
    <rect x="12" y="18" width="102" height="46" rx="2" fill="currentColor" opacity="0.10" stroke="currentColor" strokeWidth="2" />
    {/* Cab section — separate from body */}
    <path d="M114 28V64H130a4 4 0 004-4V40a12 12 0 00-12-12H114Z" fill="currentColor" opacity="0.08" stroke="currentColor" strokeWidth="2" strokeLinejoin="round" />
    {/* Cab windshield (large, angled) */}
    <path d="M114 30L128 36V56H114" stroke="currentColor" strokeWidth="1.5" fill="currentColor" opacity="0.06" />
    {/* Cab side window */}
    <rect x="116" y="34" width="8" height="10" rx="1.5" stroke="currentColor" strokeWidth="1" fill="currentColor" opacity="0.08" />
    {/* Large side windows (3 stuks) */}
    <rect x="18" y="26" width="20" height="14" rx="2" stroke="currentColor" strokeWidth="1.5" fill="currentColor" opacity="0.08" />
    <rect x="44" y="26" width="20" height="14" rx="2" stroke="currentColor" strokeWidth="1.5" fill="currentColor" opacity="0.08" />
    <rect x="70" y="26" width="14" height="14" rx="2" stroke="currentColor" strokeWidth="1.5" fill="currentColor" opacity="0.08" />
    {/* Habitation door */}
    <rect x="90" y="34" width="12" height="28" rx="2" stroke="currentColor" strokeWidth="1.5" />
    <circle cx="98" cy="48" r="1.5" fill="currentColor" opacity="0.5" />
    {/* Roof AC unit */}
    <rect x="38" y="10" width="22" height="8" rx="3.5" stroke="currentColor" strokeWidth="1.5" fill="currentColor" opacity="0.08" />
    {/* Roof vent */}
    <rect x="20" y="13" width="10" height="5" rx="2" stroke="currentColor" strokeWidth="1" fill="currentColor" opacity="0.06" />
    {/* Rear wheel */}
    <circle cx="32" cy="66" r="11" stroke="currentColor" strokeWidth="2.5" fill="currentColor" opacity="0.1" />
    <circle cx="32" cy="66" r="5.5" fill="currentColor" opacity="0.25" />
    <circle cx="32" cy="66" r="2" fill="currentColor" opacity="0.4" />
    {/* Front wheel */}
    <circle cx="118" cy="66" r="11" stroke="currentColor" strokeWidth="2.5" fill="currentColor" opacity="0.1" />
    <circle cx="118" cy="66" r="5.5" fill="currentColor" opacity="0.25" />
    <circle cx="118" cy="66" r="2" fill="currentColor" opacity="0.4" />
    {/* Rear bumper */}
    <rect x="6" y="54" width="6" height="10" rx="2" fill="currentColor" opacity="0.15" stroke="currentColor" strokeWidth="1" />
    {/* Front bumper */}
    <rect x="130" y="56" width="5" height="8" rx="2" fill="currentColor" opacity="0.15" stroke="currentColor" strokeWidth="1" />
    {/* Rear lights */}
    <rect x="10" y="50" width="3" height="5" rx="1" fill="currentColor" opacity="0.3" />
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
    {/* Long hood — over 50% of total length */}
    <path d="M6 54 Q6 48 12 46 L60 42" stroke="currentColor" strokeWidth="2" fill="none" />
    <path d="M6 54 L6 58 Q6 60 8 60 L38 60" stroke="currentColor" strokeWidth="2" fill="none" />
    {/* Hood surface fill */}
    <path d="M12 46 L60 42 L60 58 L38 60 Q20 60 10 58 L6 54 Q6 48 12 46Z" fill="currentColor" opacity="0.08" />
    {/* Low rounded cabin */}
    <path d="M60 42 Q62 26 72 22 L84 20 Q92 20 96 28 L100 42" stroke="currentColor" strokeWidth="2" fill="currentColor" opacity="0.06" />
    {/* Windshield */}
    <line x1="62" y1="42" x2="70" y2="24" stroke="currentColor" strokeWidth="1.8" opacity="0.5" />
    {/* Rear window */}
    <line x1="92" y1="24" x2="98" y2="42" stroke="currentColor" strokeWidth="1.8" opacity="0.5" />
    {/* Rear deck / trunk */}
    <path d="M100 42 L100 58 Q110 60 118 60 Q126 58 128 54 L128 52 Q128 46 120 44 L100 42" fill="currentColor" opacity="0.08" stroke="currentColor" strokeWidth="2" />
    {/* Front fender — bold protruding round spatbord */}
    <path d="M4 60 Q2 60 2 56 Q2 52 10 50 L16 50 Q30 50 36 54 Q42 58 42 60" stroke="currentColor" strokeWidth="2.5" fill="currentColor" opacity="0.10" />
    {/* Rear fender — bold protruding round spatbord */}
    <path d="M96 60 Q96 56 102 54 Q108 52 114 50 L120 50 Q132 52 134 56 Q136 60 134 60" stroke="currentColor" strokeWidth="2.5" fill="currentColor" opacity="0.10" />
    {/* Running board */}
    <line x1="42" y1="60" x2="96" y2="60" stroke="currentColor" strokeWidth="1.5" opacity="0.35" />
    {/* Front bumper */}
    <path d="M4 54 Q0 54 0 56 Q0 60 4 60" stroke="currentColor" strokeWidth="1.8" opacity="0.3" />
    {/* Rear bumper */}
    <path d="M132 52 Q136 52 136 56 Q136 60 134 60" stroke="currentColor" strokeWidth="1.8" opacity="0.3" />
    {/* Large round headlights */}
    <circle cx="10" cy="46" r="5" stroke="currentColor" strokeWidth="2" fill="currentColor" opacity="0.20" />
    <circle cx="10" cy="46" r="2.5" fill="currentColor" opacity="0.45" />
    <circle cx="10" cy="46" r="1" fill="currentColor" opacity="0.7" />
    {/* Grille lines */}
    <line x1="4" y1="48" x2="16" y2="48" stroke="currentColor" strokeWidth="0.7" opacity="0.2" />
    <line x1="4" y1="50" x2="16" y2="50" stroke="currentColor" strokeWidth="0.7" opacity="0.2" />
    <line x1="4" y1="52" x2="16" y2="52" stroke="currentColor" strokeWidth="0.7" opacity="0.2" />
    {/* Hood ornament / line */}
    <line x1="16" y1="46" x2="56" y2="43" stroke="currentColor" strokeWidth="0.8" opacity="0.25" />
    {/* Taillight */}
    <rect x="128" y="48" width="3" height="6" rx="1.5" fill="currentColor" opacity="0.35" />
    {/* Front wheel with spokes */}
    <circle cx="24" cy="64" r="12" stroke="currentColor" strokeWidth="2.5" fill="currentColor" opacity="0.06" />
    <circle cx="24" cy="64" r="6" stroke="currentColor" strokeWidth="1" fill="currentColor" opacity="0.15" />
    <circle cx="24" cy="64" r="2.5" fill="currentColor" opacity="0.4" />
    {/* Front wheel spokes */}
    <line x1="24" y1="53" x2="24" y2="57" stroke="currentColor" strokeWidth="1" opacity="0.3" />
    <line x1="24" y1="71" x2="24" y2="75" stroke="currentColor" strokeWidth="1" opacity="0.3" />
    <line x1="13" y1="64" x2="17" y2="64" stroke="currentColor" strokeWidth="1" opacity="0.3" />
    <line x1="31" y1="64" x2="35" y2="64" stroke="currentColor" strokeWidth="1" opacity="0.3" />
    <line x1="16" y1="56" x2="19" y2="59" stroke="currentColor" strokeWidth="0.8" opacity="0.2" />
    <line x1="29" y1="69" x2="32" y2="72" stroke="currentColor" strokeWidth="0.8" opacity="0.2" />
    <line x1="16" y1="72" x2="19" y2="69" stroke="currentColor" strokeWidth="0.8" opacity="0.2" />
    <line x1="29" y1="59" x2="32" y2="56" stroke="currentColor" strokeWidth="0.8" opacity="0.2" />
    {/* Rear wheel with spokes */}
    <circle cx="112" cy="64" r="12" stroke="currentColor" strokeWidth="2.5" fill="currentColor" opacity="0.06" />
    <circle cx="112" cy="64" r="6" stroke="currentColor" strokeWidth="1" fill="currentColor" opacity="0.15" />
    <circle cx="112" cy="64" r="2.5" fill="currentColor" opacity="0.4" />
    {/* Rear wheel spokes */}
    <line x1="112" y1="53" x2="112" y2="57" stroke="currentColor" strokeWidth="1" opacity="0.3" />
    <line x1="112" y1="71" x2="112" y2="75" stroke="currentColor" strokeWidth="1" opacity="0.3" />
    <line x1="101" y1="64" x2="105" y2="64" stroke="currentColor" strokeWidth="1" opacity="0.3" />
    <line x1="119" y1="64" x2="123" y2="64" stroke="currentColor" strokeWidth="1" opacity="0.3" />
    <line x1="104" y1="56" x2="107" y2="59" stroke="currentColor" strokeWidth="0.8" opacity="0.2" />
    <line x1="117" y1="69" x2="120" y2="72" stroke="currentColor" strokeWidth="0.8" opacity="0.2" />
    <line x1="104" y1="72" x2="107" y2="69" stroke="currentColor" strokeWidth="0.8" opacity="0.2" />
    <line x1="117" y1="59" x2="120" y2="56" stroke="currentColor" strokeWidth="0.8" opacity="0.2" />
    {/* Ground */}
    <line x1="0" y1="78" x2="136" y2="78" stroke="currentColor" strokeWidth="1" opacity="0.15" />
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
