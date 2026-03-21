import { useState } from "react";
import { Check, ArrowRight, ArrowLeft, Bus } from "lucide-react";
import { FaFileInvoiceDollar, FaBalanceScale, FaClock, FaCar, FaMotorcycle, FaUtensils, FaCarCrash } from "react-icons/fa";

const BusIcon = ({ size, style }: { size?: number; style?: React.CSSProperties }) => (
  <Bus size={size || 28} style={style} />
);

const taxatieOptions = [
  { value: "bpm", label: "BPM Taxatie", icon: FaFileInvoiceDollar, badge: "MEEST GEKOZEN" },
  { value: "wev", label: "WEV Taxatie", icon: FaBalanceScale },
  { value: "oldtimer", label: "Oldtimer Taxatie", icon: FaClock },
  { value: "youngtimer", label: "Youngtimer Taxatie", icon: FaCar },
  { value: "camper", label: "Camper Taxatie", icon: BusIcon },
  { value: "motor", label: "Motor Taxatie", icon: FaMotorcycle },
  { value: "foodtruck", label: "Foodtruck Taxatie", icon: FaUtensils },
  { value: "schadevaststelling", label: "Schadevaststelling", icon: FaCarCrash },
];

const steps = ["Type taxatie", "Voertuig", "Locatie & datum", "Contact"];

const BookingWizard = () => {
  const [step, setStep] = useState(0);
  const [submitted, setSubmitted] = useState(false);
  const [form, setForm] = useState({
    type: "",
    merk_model: "",
    kenteken: "",
    postcode: "",
    stad: "",
    adres: "",
    datum: "",
    naam: "",
    telefoon: "",
    email: "",
  });

  const set = (key: string, val: string) => setForm(prev => ({ ...prev, [key]: val }));

  const canNext = () => {
    if (step === 0) return !!form.type;
    if (step === 1) return !!form.merk_model;
    if (step === 2) return !!form.postcode && !!form.stad;
    if (step === 3) return !!form.naam && !!form.telefoon;
    return true;
  };

  const handleSubmit = () => setSubmitted(true);

  if (submitted) {
    return (
      <div className="text-center py-16">
        <div className="w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-6" style={{ background: 'rgba(16,185,129,0.12)' }}>
          <Check className="w-8 h-8" style={{ color: '#10b981' }} />
        </div>
        <h3 className="heading-display text-2xl font-bold mb-3" style={{ color: '#1a1a1a' }}>Bedankt!</h3>
        <p style={{ fontFamily: "'Inter', sans-serif", fontSize: 15, color: '#4a5568', lineHeight: 1.7 }}>
          Erik neemt binnen één werkdag telefonisch contact met je op.
        </p>
      </div>
    );
  }

  const inputStyle: React.CSSProperties = {
    width: '100%',
    height: 52,
    border: '2px solid #e2e8f0',
    borderRadius: 8,
    padding: '0 16px',
    fontFamily: "'Inter', sans-serif",
    fontSize: 15,
    color: '#1a1a1a',
    background: '#ffffff',
    transition: 'border-color 200ms ease, box-shadow 200ms ease',
    outline: 'none',
  };

  const labelStyle: React.CSSProperties = {
    fontFamily: "'Inter', sans-serif",
    fontSize: 13,
    fontWeight: 600,
    color: '#4a5568',
    marginBottom: 6,
    display: 'block',
  };

  const hintStyle: React.CSSProperties = {
    fontSize: 12,
    color: '#9aa5b4',
    marginTop: 4,
  };

  const handleFocus = (e: React.FocusEvent<HTMLInputElement>) => {
    e.currentTarget.style.borderColor = '#1d3c71';
    e.currentTarget.style.boxShadow = '0 0 0 3px rgba(29,60,113,0.10)';
  };
  const handleBlur = (e: React.FocusEvent<HTMLInputElement>) => {
    e.currentTarget.style.borderColor = '#e2e8f0';
    e.currentTarget.style.boxShadow = 'none';
  };

  const nextBtnStyle: React.CSSProperties = {
    background: '#ff751f',
    color: '#ffffff',
    height: 52,
    padding: '0 40px',
    borderRadius: 8,
    fontFamily: "'Inter', sans-serif",
    fontSize: 15,
    fontWeight: 700,
    border: 'none',
    cursor: 'pointer',
    boxShadow: '0 4px 16px rgba(255,117,31,0.35)',
    opacity: canNext() ? 1 : 0.5,
  };

  return (
    <div>
      {/* Step indicator */}
      <div className="flex items-center mb-10">
        {steps.map((label, i) => {
          const isCompleted = i < step;
          const isActive = i === step;
          return (
            <div key={i} className="flex-1 flex flex-col items-center relative">
              {i < steps.length - 1 && (
                <div
                  className="absolute top-[22px] left-1/2 w-full"
                  style={{ height: 3, background: isCompleted ? '#ff751f' : '#e8edf3', zIndex: 0 }}
                />
              )}
              <div
                className="w-11 h-11 rounded-full flex items-center justify-center font-bold text-[16px] relative z-10 transition-all"
                style={{
                  fontFamily: "'Inter', sans-serif",
                  background: isCompleted ? '#ff751f' : isActive ? '#1d3c71' : '#e8edf3',
                  color: isCompleted || isActive ? '#ffffff' : '#9aa5b4',
                  boxShadow: isActive ? '0 0 0 5px rgba(29,60,113,0.15)' : 'none',
                }}
              >
                {isCompleted ? <Check className="w-4 h-4" /> : i + 1}
              </div>
              <span
                className="text-xs mt-2 text-center hidden sm:block"
                style={{
                  fontFamily: "'Inter', sans-serif",
                  fontSize: 12,
                  fontWeight: isActive ? 700 : 600,
                  color: isActive ? '#1d3c71' : '#9aa5b4',
                }}
              >
                {label}
              </span>
            </div>
          );
        })}
      </div>

      {/* Step 1 — Type taxatie */}
      {step === 0 && (
        <div>
          <h3 className="heading-display text-xl font-semibold mb-6" style={{ color: '#1a1a1a' }}>Welk type taxatie heb je nodig?</h3>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
            {taxatieOptions.map(opt => {
              const selected = form.type === opt.value;
              const isBpm = opt.value === 'bpm';
              return (
                <button
                  key={opt.value}
                  onClick={() => set("type", opt.value)}
                  className="rounded-[10px] p-5 text-center transition-all duration-200 cursor-pointer flex flex-col items-center gap-2.5 relative"
                  style={{
                    background: selected ? '#2a4f8f' : '#1d3c71',
                    border: selected ? '2px solid #ff751f' : '2px solid transparent',
                    boxShadow: selected ? '0 4px 20px rgba(255,117,31,0.25)' : '0 2px 8px rgba(0,0,0,0.15)',
                    transform: selected ? 'translateY(-2px)' : 'translateY(0)',
                  }}
                  onMouseEnter={(e) => {
                    if (!selected) {
                      e.currentTarget.style.background = '#2a4f8f';
                      e.currentTarget.style.transform = 'translateY(-2px)';
                      e.currentTarget.style.boxShadow = '0 4px 16px rgba(0,0,0,0.20)';
                    }
                  }}
                  onMouseLeave={(e) => {
                    if (!selected) {
                      e.currentTarget.style.background = '#1d3c71';
                      e.currentTarget.style.transform = 'translateY(0)';
                      e.currentTarget.style.boxShadow = '0 2px 8px rgba(0,0,0,0.15)';
                    }
                  }}
                >
                  {isBpm && opt.badge && (
                    <span style={{
                      position: 'absolute', top: -10, right: -6,
                      background: '#ff751f', color: '#fff',
                      fontSize: 9, fontWeight: 800, fontFamily: "'Inter', sans-serif",
                      padding: '3px 8px', borderRadius: 20, letterSpacing: '0.05em',
                      boxShadow: '0 2px 6px rgba(255,117,31,0.4)',
                    }}>
                      {opt.badge}
                    </span>
                  )}
                  <opt.icon size={28} style={{ color: '#ffffff', transition: 'color 200ms ease' }} />
                  <span style={{ fontFamily: "'Inter', sans-serif", fontSize: 13, fontWeight: 600, color: '#ffffff' }}>{opt.label}</span>
                </button>
              );
            })}
          </div>
        </div>
      )}

      {/* Step 2 — Voertuig */}
      {step === 1 && (
        <div>
          <h3 className="heading-display text-xl font-semibold mb-6" style={{ color: '#1a1a1a' }}>Voertuiggegevens</h3>
          <div style={{ marginBottom: 20 }}>
            <label style={labelStyle}>Merk en model *</label>
            <input
              value={form.merk_model}
              onChange={e => set("merk_model", e.target.value)}
              placeholder="bijv. Volkswagen Golf"
              style={inputStyle}
              onFocus={handleFocus}
              onBlur={handleBlur}
            />
          </div>
          {form.type !== "bpm" && (
            <div style={{ marginBottom: 20 }}>
              <label style={labelStyle}>Kenteken</label>
              <input
                value={form.kenteken}
                onChange={e => set("kenteken", e.target.value)}
                placeholder="optioneel"
                style={inputStyle}
                onFocus={handleFocus}
                onBlur={handleBlur}
              />
            </div>
          )}
        </div>
      )}

      {/* Step 3 — Locatie & datum */}
      {step === 2 && (
        <div>
          <h3 className="heading-display text-xl font-semibold mb-6" style={{ color: '#1a1a1a' }}>Wanneer en waar?</h3>
          <div style={{ marginBottom: 20 }}>
            <label style={labelStyle}>Postcode locatie voertuig *</label>
            <input
              value={form.postcode}
              onChange={e => set("postcode", e.target.value)}
              placeholder="1234 AB"
              style={inputStyle}
              onFocus={handleFocus}
              onBlur={handleBlur}
            />
            <p style={hintStyle}>Wij komen naar jouw locatie toe voor de inspectie.</p>
          </div>
          <div style={{ marginBottom: 20 }}>
            <label style={labelStyle}>Stad / gemeente *</label>
            <input
              value={form.stad}
              onChange={e => set("stad", e.target.value)}
              placeholder="bijv. Amsterdam, Rotterdam, Druten"
              style={inputStyle}
              onFocus={handleFocus}
              onBlur={handleBlur}
            />
          </div>
          <div style={{ marginBottom: 20 }}>
            <label style={labelStyle}>Straat en huisnummer (optioneel)</label>
            <input
              value={form.adres}
              onChange={e => set("adres", e.target.value)}
              placeholder="Hoofdstraat 12"
              style={inputStyle}
              onFocus={handleFocus}
              onBlur={handleBlur}
            />
          </div>
          <div style={{ marginBottom: 20 }}>
            <label style={labelStyle}>Voorkeursdatum *</label>
            <input
              type="date"
              value={form.datum}
              onChange={e => set("datum", e.target.value)}
              style={inputStyle}
              onFocus={handleFocus}
              onBlur={handleBlur}
            />
          </div>
        </div>
      )}

      {/* Step 4 — Contact */}
      {step === 3 && (
        <div>
          <h3 className="heading-display text-xl font-semibold mb-6" style={{ color: '#1a1a1a' }}>Jouw contactgegevens</h3>
          <div style={{ marginBottom: 20 }}>
            <label style={labelStyle}>Naam *</label>
            <input
              value={form.naam}
              onChange={e => set("naam", e.target.value)}
              placeholder="Voor- en achternaam"
              style={inputStyle}
              onFocus={handleFocus}
              onBlur={handleBlur}
            />
          </div>
          <div style={{ marginBottom: 20 }}>
            <label style={labelStyle}>Telefoonnummer *</label>
            <input
              type="tel"
              value={form.telefoon}
              onChange={e => set("telefoon", e.target.value)}
              placeholder="06 12345678"
              style={inputStyle}
              onFocus={handleFocus}
              onBlur={handleBlur}
            />
          </div>
          <div style={{ marginBottom: 20 }}>
            <label style={labelStyle}>E-mailadres</label>
            <input
              type="email"
              value={form.email}
              onChange={e => set("email", e.target.value)}
              placeholder="optioneel"
              style={inputStyle}
              onFocus={handleFocus}
              onBlur={handleBlur}
            />
          </div>
        </div>
      )}

      {/* Navigation */}
      <div className="flex justify-between mt-8 pt-6" style={{ borderTop: '1px solid #e2e8f0' }}>
        {step > 0 ? (
          <button
            onClick={() => setStep(step - 1)}
            className="flex items-center gap-2 px-6 py-3 rounded-md text-[15px] font-medium transition-colors"
            style={{ border: '1px solid #e2e8f0', color: '#4a5568', background: 'transparent' }}
          >
            <ArrowLeft className="w-4 h-4" /> Terug
          </button>
        ) : <div />}
        {step < 3 ? (
          <button
            onClick={() => canNext() && setStep(step + 1)}
            className="inline-flex items-center gap-2.5 transition-all duration-200"
            style={nextBtnStyle}
            onMouseEnter={(e) => { e.currentTarget.style.background = '#e8651a'; e.currentTarget.style.transform = 'translateY(-2px)'; }}
            onMouseLeave={(e) => { e.currentTarget.style.background = '#ff751f'; e.currentTarget.style.transform = 'translateY(0)'; }}
            disabled={!canNext()}
          >
            Volgende <ArrowRight className="w-4 h-4" />
          </button>
        ) : (
          <button
            onClick={handleSubmit}
            className="inline-flex items-center gap-2.5 transition-all duration-200"
            style={nextBtnStyle}
            onMouseEnter={(e) => { e.currentTarget.style.background = '#e8651a'; e.currentTarget.style.transform = 'translateY(-2px)'; }}
            onMouseLeave={(e) => { e.currentTarget.style.background = '#ff751f'; e.currentTarget.style.transform = 'translateY(0)'; }}
            disabled={!canNext()}
          >
            Verstuur aanvraag <ArrowRight className="w-4 h-4" />
          </button>
        )}
      </div>
    </div>
  );
};

export default BookingWizard;
