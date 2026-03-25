import { Link } from "react-router-dom";
import { ArrowRight, FileText, ShieldCheck, Scale, AlertTriangle, Bus, Car, Bike, UtensilsCrossed } from "lucide-react";
import type { LucideIcon } from "lucide-react";

interface CrossLink {
  label: string;
  href: string;
  description: string;
  icon: LucideIcon;
}

const allServices: Record<string, CrossLink> = {
  "Verzekeringstaxatie": {
    label: "Verzekeringstaxatie",
    href: "/verzekeringstaxatie",
    description: "Leg de waarde van jouw voertuig vast voor een correcte verzekeringspolis.",
    icon: ShieldCheck,
  },
  "BPM Taxatie": {
    label: "BPM Taxatie",
    href: "/bpm-taxatie",
    description: "Voorkom dat je te veel BPM betaalt bij import van jouw voertuig.",
    icon: FileText,
  },
  "WEV Taxatie": {
    label: "WEV Taxatie",
    href: "/wev-taxatie",
    description: "Bepaal de werkelijke economische waarde voor fiscale doeleinden.",
    icon: Scale,
  },
  "Schadevaststelling": {
    label: "Schadevaststelling",
    href: "/schadevaststelling",
    description: "Onafhankelijke vaststelling van de schade aan jouw voertuig.",
    icon: AlertTriangle,
  },
  "Camper taxatie": {
    label: "Camper taxatie",
    href: "/camper-taxatie",
    description: "Professionele taxatie van jouw camper voor verzekering of verkoop.",
    icon: Bus,
  },
  "Oldtimer taxatie": {
    label: "Oldtimer taxatie",
    href: "/oldtimer-taxatie",
    description: "Erkende waardering van jouw klassieke voertuig door een specialist.",
    icon: Car,
  },
  "Youngtimer taxatie": {
    label: "Youngtimer taxatie",
    href: "/youngtimer-taxatie",
    description: "Waardebepaling van jouw youngtimer voor verzekering of verkoop.",
    icon: Car,
  },
  "Motor taxatie": {
    label: "Motor taxatie",
    href: "/motor-taxatie",
    description: "Taxatie van jouw motor voor een passende verzekeringsdekking.",
    icon: Bike,
  },
  "Foodtruck taxatie": {
    label: "Foodtruck taxatie",
    href: "/foodtruck-taxatie",
    description: "Waardebepaling van jouw foodtruck voor verzekering of financiering.",
    icon: UtensilsCrossed,
  },
};

interface BekijkOokProps {
  links: string[];
}

const BekijkOok = ({ links }: BekijkOokProps) => {
  const items = links.map((key) => allServices[key]).filter(Boolean);

  if (items.length === 0) return null;

  return (
    <section className="px-6 md:px-8" style={{ background: '#f7f8fa', paddingTop: 56, paddingBottom: 56 }}>
      <div className="container-wide">
        <h2
          className="mb-6"
          style={{ fontFamily: "'Playfair Display', serif", fontSize: 20, fontWeight: 700, color: '#1d3c71' }}
        >
          Bekijk ook
        </h2>
        <div className="grid md:grid-cols-3 gap-5">
          {items.map((item) => {
            const Icon = item.icon;
            return (
              <Link
                key={item.href}
                to={item.href}
                className="block bg-white rounded-[10px] p-5 no-underline transition-all duration-200 hover:-translate-y-0.5"
                style={{ boxShadow: '0 2px 16px rgba(29,60,113,0.08)' }}
              >
                <Icon className="w-6 h-6 mb-3" style={{ color: '#1d3c71' }} strokeWidth={2.5} />
                <h3
                  className="font-bold mb-1"
                  style={{ fontFamily: "'Inter', sans-serif", fontSize: 16, color: '#1d3c71' }}
                >
                  {item.label}
                </h3>
                <p
                  className="mb-3"
                  style={{ fontFamily: "'Inter', sans-serif", fontSize: 14, color: '#4a5568', lineHeight: 1.6 }}
                >
                  {item.description}
                </p>
                <span
                  className="text-sm font-semibold inline-flex items-center gap-1.5"
                  style={{ color: '#ff751f' }}
                >
                  Meer informatie <ArrowRight className="w-3.5 h-3.5" />
                </span>
              </Link>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default BekijkOok;
