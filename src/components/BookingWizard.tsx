import { useState } from "react";
import { Calculator, Shield, Scale as ScaleIcon, Caravan, Car, Bike, Truck, Wrench, Check, ArrowRight, ArrowLeft } from "lucide-react";

const taxatieOptions = [
  { value: "bpm", label: "BPM Taxatie", icon: Calculator },
  { value: "verzekering", label: "Verzekeringstaxatie", icon: Shield },
  { value: "wev", label: "WEV Taxatie", icon: ScaleIcon },
  { value: "camper", label: "Camper Taxatie", icon: Caravan },
  { value: "oldtimer", label: "Oldtimer Taxatie", icon: Car },
  { value: "youngtimer", label: "Youngtimer Taxatie", icon: Car },
  { value: "motor", label: "Motor Taxatie", icon: Bike },
  { value: "foodtruck", label: "Foodtruck Taxatie", icon: Truck },
];

const steps = ["Type taxatie", "Voertuig", "Locatie & datum", "Contact"];

const BookingWizard = () => {
  const [step, setStep] = useState(0);
  const [submitted, setSubmitted] = useState(false);
  const [form, setForm] = useState({
    type: "",
    kenteken: "",
    merk_model: "",
    bouwjaar: "",
    km: "",
    schade: "nee",
    adres: "",
    postcode: "",
    plaats: "",
    datum: "",
    tijd: "flexibel",
    opmerking: "",
    voornaam: "",
    achternaam: "",
    telefoon: "",
    email: "",
    gevonden: "",
  });

  const set = (key: string, val: string) => setForm(prev => ({ ...prev, [key]: val }));

  const canNext = () => {
    if (step === 0) return !!form.type;
    if (step === 1) return !!form.merk_model;
    if (step === 2) return !!form.postcode;
    if (step === 3) return !!form.voornaam && !!form.achternaam && !!form.telefoon && !!form.email;
    return true;
  };

  const handleSubmit = () => {
    setSubmitted(true);
  };

  if (submitted) {
    return (
      <div className="text-center py-16">
        <div className="w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-6" style={{ background: 'rgba(16,185,129,0.12)' }}>
          <Check className="w-8 h-8" style={{ color: '#10b981' }} />
        </div>
        <h3 className="heading-display text-2xl font-bold mb-3" style={{ color: '#1a1a1a' }}>Bedankt voor je aanvraag</h3>
        <p style={{ fontFamily: "'Inter', sans-serif", fontSize: 15, color: '#4a5568', lineHeight: 1.7 }}>
          We nemen binnen één werkdag contact met je op.
        </p>
      </div>
    );
  }

  const inputClass = "w-full px-4 py-2.5 rounded-lg border text-sm focus:outline-none focus:ring-2 focus:ring-[#1d3c71] focus:border-transparent bg-white";

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

      {/* Step content */}
      {step === 0 && (
        <div>
          <h3 className="heading-display text-xl font-semibold mb-6" style={{ color: '#1a1a1a' }}>Welk type taxatie heb je nodig?</h3>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
            {taxatieOptions.map(opt => {
              const selected = form.type === opt.value;
              return (
                <button
                  key={opt.value}
                  onClick={() => set("type", opt.value)}
                  className="rounded-xl p-5 text-center transition-all cursor-pointer flex flex-col items-center gap-2.5"
                  style={{
                    border: selected ? '2px solid #1d3c71' : '2px solid #e2e8f0',
                    background: selected ? '#eef3fb' : '#ffffff',
                    boxShadow: selected ? '0 4px 20px rgba(29,60,113,0.15)' : 'none',
                  }}
                  onMouseEnter={(e) => {
                    if (!selected) {
                      e.currentTarget.style.borderColor = '#698db3';
                      e.currentTarget.style.background = '#f7faff';
                      e.currentTarget.style.transform = 'translateY(-2px)';
                      e.currentTarget.style.boxShadow = '0 4px 16px rgba(29,60,113,0.10)';
                    }
                  }}
                  onMouseLeave={(e) => {
                    if (!selected) {
                      e.currentTarget.style.borderColor = '#e2e8f0';
                      e.currentTarget.style.background = '#ffffff';
                      e.currentTarget.style.transform = 'translateY(0)';
                      e.currentTarget.style.boxShadow = 'none';
                    }
                  }}
                >
                  <opt.icon className="w-7 h-7" style={{ color: selected ? '#1d3c71' : '#698db3', transition: 'color 200ms ease' }} />
                  <span style={{ fontFamily: "'Inter', sans-serif", fontSize: 13, fontWeight: 600, color: '#1a1a1a' }}>{opt.label}</span>
                </button>
              );
            })}
          </div>
        </div>
      )}

      {step === 1 && (
        <div>
          <h3 className="heading-display text-xl font-semibold mb-6" style={{ color: '#1a1a1a' }}>Voertuiggegevens</h3>
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium mb-1.5" style={{ color: '#1a1a1a' }}>Kenteken <span className="text-xs font-normal" style={{ color: '#9aa5b4' }}>(optioneel, helpt ons sneller)</span></label>
              <input value={form.kenteken} onChange={e => set("kenteken", e.target.value)} placeholder="AB-123-CD" className={inputClass} style={{ borderColor: '#e2e8f0' }} />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1.5" style={{ color: '#1a1a1a' }}>Merk en model *</label>
              <input value={form.merk_model} onChange={e => set("merk_model", e.target.value)} placeholder="bijv. Volkswagen Golf" className={inputClass} style={{ borderColor: '#e2e8f0' }} />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium mb-1.5" style={{ color: '#1a1a1a' }}>Bouwjaar</label>
                <input type="number" value={form.bouwjaar} onChange={e => set("bouwjaar", e.target.value)} placeholder="2020" className={inputClass} style={{ borderColor: '#e2e8f0' }} />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1.5" style={{ color: '#1a1a1a' }}>Kilometerstand</label>
                <input type="number" value={form.km} onChange={e => set("km", e.target.value)} placeholder="95.000" className={inputClass} style={{ borderColor: '#e2e8f0' }} />
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium mb-1.5" style={{ color: '#1a1a1a' }}>Eventuele schade?</label>
              <select value={form.schade} onChange={e => set("schade", e.target.value)} className={inputClass} style={{ borderColor: '#e2e8f0' }}>
                <option value="nee">Nee</option>
                <option value="licht">Ja, lichte schade</option>
                <option value="aanzienlijk">Ja, aanzienlijke schade</option>
              </select>
            </div>
          </div>
        </div>
      )}

      {step === 2 && (
        <div>
          <h3 className="heading-display text-xl font-semibold mb-6" style={{ color: '#1a1a1a' }}>Locatie en voorkeursdatum</h3>
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium mb-1.5" style={{ color: '#1a1a1a' }}>Adres van het voertuig <span className="text-xs font-normal" style={{ color: '#9aa5b4' }}>Wij komen naar het voertuig toe</span></label>
              <input value={form.adres} onChange={e => set("adres", e.target.value)} className={inputClass} style={{ borderColor: '#e2e8f0' }} />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium mb-1.5" style={{ color: '#1a1a1a' }}>Postcode *</label>
                <input value={form.postcode} onChange={e => set("postcode", e.target.value)} placeholder="1234 AB" className={inputClass} style={{ borderColor: '#e2e8f0' }} />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1.5" style={{ color: '#1a1a1a' }}>Plaatsnaam</label>
                <input value={form.plaats} onChange={e => set("plaats", e.target.value)} className={inputClass} style={{ borderColor: '#e2e8f0' }} />
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium mb-1.5" style={{ color: '#1a1a1a' }}>Voorkeursdatum</label>
                <input type="date" value={form.datum} onChange={e => set("datum", e.target.value)} className={inputClass} style={{ borderColor: '#e2e8f0' }} />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1.5" style={{ color: '#1a1a1a' }}>Voorkeurstijd</label>
                <select value={form.tijd} onChange={e => set("tijd", e.target.value)} className={inputClass} style={{ borderColor: '#e2e8f0' }}>
                  <option value="ochtend">Ochtend 8–12</option>
                  <option value="middag">Middag 12–17</option>
                  <option value="flexibel">Flexibel</option>
                </select>
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium mb-1.5" style={{ color: '#1a1a1a' }}>Opmerking <span className="text-xs font-normal" style={{ color: '#9aa5b4' }}>(optioneel)</span></label>
              <textarea value={form.opmerking} onChange={e => set("opmerking", e.target.value)} rows={3} className={inputClass} style={{ borderColor: '#e2e8f0', resize: 'vertical' }} />
            </div>
          </div>
        </div>
      )}

      {step === 3 && (
        <div>
          <h3 className="heading-display text-xl font-semibold mb-6" style={{ color: '#1a1a1a' }}>Jouw contactgegevens</h3>
          <div className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium mb-1.5" style={{ color: '#1a1a1a' }}>Voornaam *</label>
                <input value={form.voornaam} onChange={e => set("voornaam", e.target.value)} className={inputClass} style={{ borderColor: '#e2e8f0' }} />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1.5" style={{ color: '#1a1a1a' }}>Achternaam *</label>
                <input value={form.achternaam} onChange={e => set("achternaam", e.target.value)} className={inputClass} style={{ borderColor: '#e2e8f0' }} />
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium mb-1.5" style={{ color: '#1a1a1a' }}>Telefoonnummer *</label>
              <input type="tel" value={form.telefoon} onChange={e => set("telefoon", e.target.value)} className={inputClass} style={{ borderColor: '#e2e8f0' }} />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1.5" style={{ color: '#1a1a1a' }}>E-mailadres *</label>
              <input type="email" value={form.email} onChange={e => set("email", e.target.value)} className={inputClass} style={{ borderColor: '#e2e8f0' }} />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1.5" style={{ color: '#1a1a1a' }}>Hoe heb je ons gevonden?</label>
              <select value={form.gevonden} onChange={e => set("gevonden", e.target.value)} className={inputClass} style={{ borderColor: '#e2e8f0' }}>
                <option value="">— Selecteer —</option>
                <option value="google">Google</option>
                <option value="kennis">Via een kennis</option>
                <option value="social">Social media</option>
                <option value="anders">Anders</option>
              </select>
            </div>
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
            style={{
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
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.background = '#e8651a';
              e.currentTarget.style.transform = 'translateY(-2px)';
              e.currentTarget.style.boxShadow = '0 6px 20px rgba(255,117,31,0.45)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.background = '#ff751f';
              e.currentTarget.style.transform = 'translateY(0)';
              e.currentTarget.style.boxShadow = '0 4px 16px rgba(255,117,31,0.35)';
            }}
            disabled={!canNext()}
          >
            Volgende <ArrowRight className="w-4 h-4" />
          </button>
        ) : (
          <button
            onClick={handleSubmit}
            className="inline-flex items-center gap-2.5 transition-all duration-200"
            style={{
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
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.background = '#e8651a';
              e.currentTarget.style.transform = 'translateY(-2px)';
              e.currentTarget.style.boxShadow = '0 6px 20px rgba(255,117,31,0.45)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.background = '#ff751f';
              e.currentTarget.style.transform = 'translateY(0)';
              e.currentTarget.style.boxShadow = '0 4px 16px rgba(255,117,31,0.35)';
            }}
            disabled={!canNext()}
          >
            Aanvraag versturen <ArrowRight className="w-4 h-4" />
          </button>
        )}
      </div>
    </div>
  );
};

export default BookingWizard;
