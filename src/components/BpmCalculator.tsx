import { useState } from "react";
import { Link } from "react-router-dom";
import erikInspectie from "@/assets/erik-inspectie-overons.jpg";

const fuelOptions = [
  { value: "benzine", label: "Benzine" },
  { value: "diesel", label: "Diesel" },
  { value: "hybride", label: "Hybride PHEV" },
  { value: "elektrisch", label: "Volledig elektrisch" },
];

interface BpmCalculatorProps {
  /** Show the advice card on the right (default true) */
  showAdviceCard?: boolean;
  /** Custom advice card content */
  adviceTitle?: string;
  adviceText?: string;
  adviceButtonText?: string;
  adviceImage?: string;
}

const BpmCalculator = ({
  showAdviceCard = true,
  adviceTitle = "Twijfel je na de berekening?",
  adviceText = "Wij bepalen de laagst haalbare BPM voor jouw specifieke voertuig. Vraag gratis advies aan.",
  adviceButtonText = "Gratis advies aanvragen",
}: BpmCalculatorProps) => {
  const [bpmDate, setBpmDate] = useState("");
  const [bpmFuel, setBpmFuel] = useState("benzine");
  const [bpmCo2Nedc, setBpmCo2Nedc] = useState("");
  const [bpmCo2Wltp, setBpmCo2Wltp] = useState("");
  const [bpmResult, setBpmResult] = useState<null | { restBpm: number; afschrijving: number }>(null);

  const handleBpmCalc = () => {
    const co2 = bpmCo2Wltp ? parseInt(bpmCo2Wltp) : bpmCo2Nedc ? parseInt(bpmCo2Nedc) : 0;
    if (!bpmDate || co2 === 0) return;
    const today = new Date();
    const regDate = new Date(bpmDate);
    const monthsDiff = (today.getFullYear() - regDate.getFullYear()) * 12 + (today.getMonth() - regDate.getMonth());
    const afschrijving = Math.min(Math.max(monthsDiff * 0.8, 0), 90);
    const bruto = co2 * 25;
    const rest = Math.round(bruto * (1 - afschrijving / 100));
    setBpmResult({ restBpm: rest, afschrijving: Math.round(afschrijving) });
  };

  return (
    <div className={`grid ${showAdviceCard ? 'md:grid-cols-2' : ''} gap-8 items-stretch`}>
      <div
        className="rounded-[14px] p-7 bg-white flex-1"
        style={{
          boxShadow: '0 4px 24px rgba(29,60,113,0.10), 0 1px 6px rgba(0,0,0,0.05)',
          border: '1px solid rgba(29,60,113,0.08)',
        }}
      >
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium mb-1.5" style={{ color: '#1a1a1a' }}>Datum eerste toelating</label>
            <input
              type="date"
              value={bpmDate}
              onChange={(e) => setBpmDate(e.target.value)}
              className="w-full px-4 py-2.5 rounded-lg border border-border text-sm focus:outline-none focus:ring-2 focus:ring-[hsl(var(--primary))] focus:border-transparent"
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1.5" style={{ color: '#1a1a1a' }}>Brandstof</label>
            <select
              value={bpmFuel}
              onChange={(e) => setBpmFuel(e.target.value)}
              className="w-full px-4 py-2.5 rounded-lg border border-border text-sm focus:outline-none focus:ring-2 focus:ring-[hsl(var(--primary))] focus:border-transparent bg-white"
            >
              {fuelOptions.map(o => (
                <option key={o.value} value={o.value}>{o.label}</option>
              ))}
            </select>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium mb-1.5" style={{ color: '#1a1a1a' }}>CO₂ NEDC (g/km)</label>
              <input
                type="number"
                value={bpmCo2Nedc}
                onChange={(e) => { setBpmCo2Nedc(e.target.value); setBpmCo2Wltp(""); }}
                placeholder="—"
                className="w-full px-4 py-2.5 rounded-lg border border-border text-sm focus:outline-none focus:ring-2 focus:ring-[hsl(var(--primary))] focus:border-transparent"
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1.5" style={{ color: '#1a1a1a' }}>CO₂ WLTP (g/km)</label>
              <input
                type="number"
                value={bpmCo2Wltp}
                onChange={(e) => { setBpmCo2Wltp(e.target.value); setBpmCo2Nedc(""); }}
                placeholder="—"
                className="w-full px-4 py-2.5 rounded-lg border border-border text-sm focus:outline-none focus:ring-2 focus:ring-[hsl(var(--primary))] focus:border-transparent"
              />
            </div>
          </div>
          <button onClick={handleBpmCalc} className="btn-cta w-full text-center">
            Bereken BPM
          </button>
          {bpmResult && (
            <div className="mt-4 p-5 rounded-xl" style={{ background: 'rgba(29,60,113,0.04)', border: '1px solid rgba(29,60,113,0.10)' }}>
              <p className="text-sm mb-1" style={{ color: '#698db3' }}>Indicatie rest-BPM</p>
              <p className="heading-display text-[32px] font-bold" style={{ color: '#1a1a1a' }}>€ {bpmResult.restBpm.toLocaleString('nl-NL')}</p>
              <p className="text-sm mt-2" style={{ color: '#698db3' }}>Afschrijvingspercentage: {bpmResult.afschrijving}%</p>
              <p className="text-xs mt-3" style={{ color: '#698db3', opacity: 0.6 }}>Dit is een indicatie. Voor een exacte berekening met juridische onderbouwing, vraag een taxatierapport aan.</p>
            </div>
          )}
        </div>
      </div>

      {showAdviceCard && (
        <div
          className="rounded-[14px] overflow-hidden flex flex-col self-stretch"
          style={{ boxShadow: '0 4px 24px rgba(29,60,113,0.12)' }}
        >
          <div className="w-full h-[220px] overflow-hidden flex-shrink-0">
            <img
              src={erikInspectie}
              alt="Erik Elderson fotografeert een auto tijdens taxatie"
              className="w-full h-full object-cover"
              style={{ objectPosition: '70% 20%' }}
            />
          </div>
          <div className="flex-1 flex flex-col justify-center" style={{ background: '#1d3c71', padding: '28px 28px 32px' }}>
            <h3 className="heading-display text-xl font-bold mb-3" style={{ color: '#ffffff', lineHeight: 1.3 }}>
              {adviceTitle}
            </h3>
            <p style={{ fontFamily: "'Inter', sans-serif", fontSize: 14, color: 'rgba(255,255,255,0.82)', lineHeight: 1.70 }} className="mb-5">
              {adviceText}
            </p>
            <Link to="/contact" className="self-start">
              <button
                className="inline-flex items-center justify-center font-semibold text-white text-sm rounded-md transition-colors"
                style={{
                  height: 46,
                  padding: '0 24px',
                  background: '#ff751f',
                  boxShadow: '0 3px 12px rgba(255,117,31,0.35)',
                }}
                onMouseEnter={(e) => (e.currentTarget.style.background = '#e8651a')}
                onMouseLeave={(e) => (e.currentTarget.style.background = '#ff751f')}
              >
                {adviceButtonText}
              </button>
            </Link>
          </div>
        </div>
      )}
    </div>
  );
};

export default BpmCalculator;
