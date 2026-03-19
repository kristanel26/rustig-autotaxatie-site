import { useState } from "react";
import { Link } from "react-router-dom";
import { ArrowRight, Phone, Shield, MapPin, Scale as ScaleIcon, Award, Users, Star, Calculator, Car, Bike, Truck, Wrench, ChevronRight, Search, MessageCircle, Handshake, Clock, UtensilsCrossed } from "lucide-react";
import erikPhoto from "@/assets/erik-elderson.png";
import erikInspectie from "@/assets/erik-inspectie.jpg";
import heroImage from "@/assets/hero-homepage.jpg";
import SiteHeader from "@/components/SiteHeader";
import SiteFooter from "@/components/SiteFooter";
import WhatsAppButton from "@/components/WhatsAppButton";

const diensten = [
  { title: "BPM Taxatie", sub: "Importvoertuig", href: "/bpm-taxatie", icon: Calculator, accent: true },
  { title: "WEV Taxatie", sub: "Fiscale waardebepaling", href: "/wev-taxatie", icon: ScaleIcon },
  { title: "Oldtimer Taxatie", sub: "Klassieke voertuigen", href: "/oldtimer-taxatie", icon: Clock },
  { title: "Youngtimer Taxatie", sub: "Voertuigen vanaf 15 jaar", href: "/youngtimer-taxatie", icon: Car },
  { title: "Camper Taxatie", sub: "Campermarkt specialist", href: "/camper-taxatie", icon: Truck },
  { title: "Motor Taxatie", sub: "Motorfietsen", href: "/motor-taxatie", icon: Bike },
  { title: "Foodtruck Taxatie", sub: "Mobiele horeca", href: "/foodtruck-taxatie", icon: UtensilsCrossed },
  { title: "Schadevaststelling", sub: "Na een incident", href: "/schadevaststelling", icon: Wrench },
];

const usps = [
  { icon: Award, title: "Erkend taxateur", sub: "Geregistreerd bij TMV en VRT" },
  { icon: MapPin, title: "Op locatie", sub: "Wij komen naar je voertuig toe" },
  { icon: Shield, title: "Juridisch verdedigbaar", sub: "Elk rapport houdt stand bij de Belastingdienst" },
  { icon: Users, title: "Persoonlijk contact", sub: "Direct contact met de taxateur" },
];

const reviews = [
  { name: "Marco V.", text: "Uitstekende service. Rapport was snel klaar en zeer professioneel opgesteld. De BPM-besparing was aanzienlijk." },
  { name: "Sandra K.", text: "Erik nam de tijd om alles goed uit te leggen. Het taxatierapport was helder en compleet. Echt een aanrader." },
  { name: "Peter de G.", text: "Betrouwbaar en deskundig. De taxatie van mijn oldtimer was tot in detail correct. Zeer tevreden." },
];

const fuelOptions = [
  { value: "benzine", label: "Benzine" },
  { value: "diesel", label: "Diesel" },
  { value: "hybride", label: "Hybride PHEV" },
  { value: "elektrisch", label: "Volledig elektrisch" },
];

const Index = () => {
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
    <div className="min-h-screen bg-white">
      <SiteHeader />

      {/* ── HERO ── */}
      <section className="relative min-h-[85vh] flex items-center overflow-hidden">
        <div className="absolute inset-0">
          <img src={heroImage} alt="" className="w-full h-full object-cover" />
          <div className="absolute inset-0" style={{ background: 'linear-gradient(105deg, rgba(29,60,113,0.82) 0%, rgba(29,60,113,0.60) 55%, rgba(29,60,113,0.25) 100%)' }} />
          <div className="absolute inset-0" style={{ background: 'radial-gradient(ellipse at 30% 60%, rgba(105,141,179,0.18) 0%, transparent 60%)' }} />
        </div>

        <div className="max-w-7xl mx-auto w-full px-6 lg:px-8 py-24 md:py-36 relative z-10">
          <div style={{ maxWidth: 680 }}>
            <p
              className="animate-slide-up flex items-center gap-2.5 mb-5"
              style={{
                fontFamily: "'Inter', sans-serif",
                fontSize: 12,
                fontWeight: 700,
                letterSpacing: '0.14em',
                textTransform: 'uppercase' as const,
                color: '#ff751f',
                lineHeight: 1,
              }}
            >
              <span style={{ display: 'inline-block', width: 28, height: 2, background: '#ff751f', flexShrink: 0 }} />
              Erkend taxatiebureau &mdash; landelijk actief
            </p>
            <h1
              className="animate-slide-up delay-100 heading-display text-white font-bold mb-6"
              style={{
                fontSize: 'clamp(36px, 4.2vw, 58px)',
                lineHeight: 1.15,
                letterSpacing: '-0.02em',
                maxWidth: 680,
              }}
            >
              De laagst haalbare BPM.<br />
              Fysiek onderbouwd.<br />
              Juridisch verdedigbaar.
            </h1>
            <p
              className="animate-slide-up delay-200 mb-10"
              style={{
                fontFamily: "'Inter', sans-serif",
                fontSize: 'clamp(16px, 1.8vw, 19px)',
                fontWeight: 400,
                lineHeight: 1.70,
                color: 'rgba(255,255,255,0.72)',
                maxWidth: 540,
              }}
            >
              Automobieltaxaties.nl is het erkende taxatiebureau voor merkdealers, importeurs en particulieren. Wij komen bij je op locatie, door heel Nederland.
            </p>
            <div className="animate-slide-up delay-300 flex flex-col sm:flex-row gap-3 items-center">
              <Link to="/contact">
                <button className="btn-cta">Taxatie aanvragen</button>
              </Link>
              <a href="tel:+31854832461">
                <button className="btn-outline-white">
                  <Phone className="w-5 h-5" />
                  085 483 2461
                </button>
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* ── BPM CALCULATOR ── */}
      <section className="py-16 md:py-24 px-6 lg:px-8 bg-white">
        <div className="max-w-7xl mx-auto grid md:grid-cols-2 gap-8 items-stretch">
          <div className="flex flex-col">
            <h2
              className="heading-display font-bold mb-4"
              style={{ fontSize: 'clamp(30px, 3.5vw, 44px)', lineHeight: 1.15, letterSpacing: '-0.02em', color: '#1a1a1a' }}
            >
              Bereken je BPM indicatie
            </h2>
            <p style={{ fontFamily: "'Inter', sans-serif", fontSize: 16, fontWeight: 400, lineHeight: 1.70, color: '#4a5568', maxWidth: 540 }} className="mb-8">
              Gebruik onze calculator voor een eerste indicatie van de BPM-kosten bij import. Let op: een berekening is geen taxatie en biedt geen juridische onderbouwing.
            </p>
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
          </div>

          {/* BPM Advieskaart met foto */}
          <div
            className="rounded-[14px] overflow-hidden flex flex-col self-stretch"
            style={{ boxShadow: '0 4px 24px rgba(29,60,113,0.12)' }}
          >
            <div className="w-full h-[260px] overflow-hidden flex-shrink-0">
              <img
                src={erikInspectie}
                alt="Erik Elderson fotografeert een auto tijdens taxatie"
                className="w-full h-full object-cover"
                style={{ objectPosition: '50% 35%' }}
              />
            </div>
            <div
              className="flex-1 flex flex-col justify-center"
              style={{ background: '#1d3c71', padding: '28px 28px 32px' }}
            >
              <h3 className="heading-display text-xl font-bold mb-2.5" style={{ color: '#ffffff', lineHeight: 1.3 }}>
                Twijfel je na de berekening?
              </h3>
              <p style={{ fontFamily: "'Inter', sans-serif", fontSize: 14, color: 'rgba(255,255,255,0.82)', lineHeight: 1.70 }} className="mb-5">
                Vraag gratis BPM-advies aan. Wij bepalen de laagst haalbare BPM voor jouw specifieke voertuig.
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
                  Gratis advies aanvragen
                </button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* ── USP BAR ── */}
      <section style={{ background: '#ffffff', borderTop: '3px solid #ff751f', boxShadow: '0 4px 24px rgba(29,60,113,0.06)', padding: '40px 0' }} className="px-6 lg:px-8">
        <div className="max-w-7xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-8 px-6 lg:px-8">
          {usps.map((usp, i) => (
            <div key={i} className="text-center relative">
              <div
                className="mx-auto mb-3.5 flex items-center justify-center"
                style={{ width: 56, height: 56, borderRadius: '50%', background: '#f0f4f8', color: '#1d3c71' }}
              >
                <usp.icon className="w-8 h-8" />
              </div>
              <h4 className="heading-display mb-1" style={{ fontSize: 16, fontWeight: 600, color: '#1a1a1a' }}>{usp.title}</h4>
              <p style={{ fontFamily: "'Inter', sans-serif", fontSize: 13, color: '#698db3', lineHeight: 1.5 }}>{usp.sub}</p>
              {i < usps.length - 1 && (
                <div className="hidden md:block absolute right-0 top-1/2 -translate-y-1/2 h-12" style={{ width: 1, background: '#e8edf3' }} />
              )}
            </div>
          ))}
        </div>
      </section>

      {/* ── ERIK SECTION — EDITORIAL ── */}
      <section className="relative py-20 md:py-24 overflow-hidden" style={{ background: '#1d3c71' }}>
        {/* Decorative circle */}
        <div className="absolute pointer-events-none" style={{ top: -120, right: -120, width: 480, height: 480, borderRadius: '50%', background: 'radial-gradient(circle, rgba(105,141,179,0.18) 0%, transparent 70%)' }} />

        <div className="max-w-[1100px] mx-auto px-6 lg:px-10 grid md:grid-cols-[420px_1fr] gap-16 items-center">
          {/* Photo column */}
          <div className="relative hidden md:block">
            {/* Vertical accent line */}
            <div className="absolute rounded-sm" style={{ left: -20, top: 40, bottom: 40, width: 4, background: 'linear-gradient(to bottom, #ff751f 0%, rgba(255,117,31,0.20) 100%)' }} />

            {/* Photo */}
            <div className="rounded-2xl overflow-hidden relative" style={{ marginTop: -40, boxShadow: '0 24px 64px rgba(0,0,0,0.35), 0 8px 24px rgba(0,0,0,0.20)' }}>
              <img
                src={erikPhoto}
                alt="Erik Elderson — Automobieltaxaties"
                className="w-full block"
                style={{ height: 520, objectFit: 'cover', objectPosition: 'center top', filter: 'contrast(1.05) brightness(0.98)' }}
                loading="lazy"
              />
            </div>

            {/* Badge on photo */}
            <div
              className="absolute flex flex-col items-center rounded-[10px]"
              style={{
                bottom: 24,
                left: 24,
                background: 'rgba(29,60,113,0.92)',
                backdropFilter: 'blur(8px)',
                border: '1px solid rgba(255,255,255,0.15)',
                padding: '12px 18px',
              }}
            >
              <span className="heading-display" style={{ fontSize: 28, fontWeight: 700, color: '#ff751f', lineHeight: 1 }}>2013</span>
              <span style={{ fontFamily: "'Inter', sans-serif", fontSize: 10, fontWeight: 600, letterSpacing: '0.10em', textTransform: 'uppercase' as const, color: 'rgba(255,255,255,0.65)', marginTop: 4 }}>Opgericht</span>
            </div>
          </div>

          {/* Text column */}
          <div>
            <span
              className="flex items-center gap-2.5 mb-4"
              style={{ fontFamily: "'Inter', sans-serif", fontSize: 11, fontWeight: 700, letterSpacing: '0.14em', textTransform: 'uppercase' as const, color: '#ff751f' }}
            >
              <span style={{ display: 'inline-block', width: 28, height: 2, background: '#ff751f', flexShrink: 0 }} />
              Jouw taxateur
            </span>

            <h2 className="heading-display font-bold mb-2.5" style={{ fontSize: 'clamp(36px, 4vw, 52px)', lineHeight: 1.05, letterSpacing: '-0.02em', color: '#ffffff' }}>
              Erik Elderson
            </h2>

            <p style={{ fontFamily: "'Inter', sans-serif", fontSize: 13, fontWeight: 400, color: '#698db3', lineHeight: 1.6 }} className="mb-6">
              Eigenaar · Notarieel Beëdigd TMV Register Taxateur · Register Taxateur VRT
            </p>

            <div className="space-y-3.5 mb-7">
              <p style={{ fontFamily: "'Inter', sans-serif", fontSize: 15, fontWeight: 400, lineHeight: 1.75, color: 'rgba(255,255,255,0.78)' }}>
                In 2013 startte Erik Elderson Automobieltaxaties vanuit een eenvoudige overtuiging: een taxatierapport moet kloppen, en de klant verdient eerlijk advies.
              </p>
              <p style={{ fontFamily: "'Inter', sans-serif", fontSize: 15, fontWeight: 400, lineHeight: 1.75, color: 'rgba(255,255,255,0.78)' }}>
                Na jarenlange ervaring in de taxatiebranche wist Erik precies wat hij anders wilde doen. Geen aannames, geen haastwerk. Elk voertuig verdient een grondige fysieke inspectie, met lakdiktemetingen, schadecalculatie en een volledig fotodossier als basis.
              </p>
              <p style={{ fontFamily: "'Inter', sans-serif", fontSize: 15, fontWeight: 400, lineHeight: 1.75, color: 'rgba(255,255,255,0.78)' }}>
                Je krijgt altijd direct contact met Erik zelf. Geen callcenter, geen tussenpersoon.
              </p>
            </div>

            {/* Certification badges */}
            <div className="flex flex-wrap gap-2 mb-7">
              {["TMV Register", "VRT Register", "FEHAC", "Hobeon"].map((badge) => (
                <span
                  key={badge}
                  className="text-[11px] font-semibold uppercase"
                  style={{
                    letterSpacing: '0.06em',
                    color: 'rgba(255,255,255,0.80)',
                    background: 'rgba(255,255,255,0.10)',
                    border: '1px solid rgba(255,255,255,0.18)',
                    padding: '5px 14px',
                    borderRadius: 4,
                  }}
                >
                  {badge}
                </span>
              ))}
            </div>

            {/* Stats */}
            <div className="flex gap-8 mb-8 pt-6" style={{ borderTop: '1px solid rgba(255,255,255,0.10)' }}>
              {[
                { num: "15+", label: "Jaar ervaring" },
                { num: "25.000+", label: "Voertuigen getaxeerd" },
                { num: "98%", label: "Geaccepteerd" },
              ].map((stat, i) => (
                <div key={i} className="flex flex-col">
                  <span className="heading-display" style={{ fontSize: 32, fontWeight: 700, color: '#ffffff', lineHeight: 1, letterSpacing: '-0.02em' }}>{stat.num}</span>
                  <span style={{ fontFamily: "'Inter', sans-serif", fontSize: 11, fontWeight: 500, color: 'rgba(255,255,255,0.50)', textTransform: 'uppercase' as const, letterSpacing: '0.08em', marginTop: 6 }}>{stat.label}</span>
                </div>
              ))}
            </div>

            <Link
              to="/werkwijze"
              className="text-sm font-semibold inline-flex items-center gap-1.5 transition-all hover:gap-2.5"
              style={{ color: '#ff751f' }}
            >
              Lees meer over de werkwijze <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>

        {/* Mobile photo fallback */}
        <div className="md:hidden px-6 mt-8">
          <img
            src={erikPhoto}
            alt="Erik Elderson"
            className="rounded-xl w-full max-w-sm mx-auto"
            style={{ boxShadow: '0 16px 48px rgba(0,0,0,0.30)' }}
            loading="lazy"
          />
        </div>
      </section>

      {/* ── DIENSTEN GRID — GEKLEURDE TEGELS ── */}
      <section style={{ background: '#f0f4f8' }} className="py-16 md:py-24 px-6 lg:px-8">
        <div className="max-w-[1100px] mx-auto">
          <div className="text-center mb-12">
            <h2
              className="heading-display font-bold mb-2.5"
              style={{ fontSize: 'clamp(30px, 3.5vw, 44px)', lineHeight: 1.15, letterSpacing: '-0.02em', color: '#1a1a1a' }}
            >
              Wat kunnen wij voor je doen?
            </h2>
            <p style={{ fontSize: 16, color: '#698db3' }}>
              Kies het type taxatie dat bij jouw voertuig past.
            </p>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
            {diensten.map((d, i) => (
              <Link
                key={i}
                to={d.href}
                className="group relative rounded-[14px] overflow-hidden flex flex-col items-center justify-center text-center no-underline transition-all duration-200"
                style={{
                  background: d.accent ? '#ff751f' : '#1d3c71',
                  padding: '32px 20px 28px',
                  aspectRatio: '1 / 1',
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.transform = 'translateY(-4px)';
                  e.currentTarget.style.boxShadow = '0 12px 36px rgba(29,60,113,0.25)';
                  if (!d.accent) e.currentTarget.style.background = '#254d91';
                  else e.currentTarget.style.background = '#e8651a';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform = 'translateY(0)';
                  e.currentTarget.style.boxShadow = 'none';
                  e.currentTarget.style.background = d.accent ? '#ff751f' : '#1d3c71';
                }}
              >
                {/* Subtle glow */}
                <div className="absolute pointer-events-none" style={{ top: -30, right: -30, width: 100, height: 100, borderRadius: '50%', background: 'rgba(255,255,255,0.06)' }} />

                {d.accent && (
                  <span
                    className="absolute text-white font-bold uppercase"
                    style={{ top: 14, right: 14, fontSize: 9, letterSpacing: '0.10em', background: 'rgba(255,255,255,0.22)', padding: '3px 10px', borderRadius: 20 }}
                  >
                    Meest gekozen
                  </span>
                )}

                <div className="flex items-center justify-center mb-4" style={{ width: 56, height: 56 }}>
                  <d.icon style={{ width: 48, height: 48, color: 'rgba(255,255,255,0.90)' }} />
                </div>

                <span className="heading-display block mb-1" style={{ fontSize: 17, fontWeight: 600, color: '#ffffff', lineHeight: 1.3 }}>
                  {d.title}
                </span>
                <span style={{ fontFamily: "'Inter', sans-serif", fontSize: 12, fontWeight: 400, color: 'rgba(255,255,255,0.65)', letterSpacing: '0.02em' }}>
                  {d.sub}
                </span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* ── WAAROM KIEZEN KLANTEN ONS? ── */}
      <section
        className="relative py-20 md:py-28 px-6 lg:px-8 overflow-hidden"
        style={{
          background: '#1d3c71',
          backgroundImage: 'radial-gradient(ellipse at 20% 50%, rgba(105,141,179,0.20) 0%, transparent 60%), radial-gradient(ellipse at 80% 20%, rgba(255,255,255,0.04) 0%, transparent 50%)',
        }}
      >
        <div className="max-w-7xl mx-auto relative z-10">
          <div className="text-center mb-14">
            <span className="block mb-4" style={{ fontFamily: "'Inter', sans-serif", fontSize: 11, fontWeight: 600, letterSpacing: '0.13em', textTransform: 'uppercase' as const, color: 'rgba(255,255,255,0.50)' }}>
              Meer dan 15 jaar bewezen resultaat
            </span>
            <h2
              className="heading-display font-bold mb-4"
              style={{ fontSize: 'clamp(30px, 3.5vw, 44px)', lineHeight: 1.15, letterSpacing: '-0.02em', color: '#ffffff' }}
            >
              Waarom kiezen klanten ons?
            </h2>
            <p style={{ fontFamily: "'Inter', sans-serif", fontSize: 'clamp(16px, 1.8vw, 19px)', fontWeight: 400, lineHeight: 1.70, color: 'rgba(255,255,255,0.72)', maxWidth: 540 }} className="mx-auto">
              Niet omdat wij de goedkoopste zijn. Maar omdat onze rapporten standhouden bij de Belastingdienst, en dat levert klanten gemiddeld duizenden euro's op.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-6 mb-14">
            {[
              {
                icon: Search,
                title: "Fysieke inspectie, geen software",
                text: "Wij komen op locatie bij je voertuig. Lakdiktemetingen, schadecalculatie en een volledig fotodossier vormen de basis van elk rapport. Niet een algoritme, maar een erkende taxateur met twee ogen en vakkennis.",
              },
              {
                icon: Award,
                title: "Erkend en juridisch verdedigbaar",
                text: "Ons rapport is opgesteld door een notarieel beëdigd TMV Register Taxateur. Het staat bij bezwaar, beroep en navorderingen van de Belastingdienst. Klanten die twijfelden aan een rapport elders, kwamen bij ons terecht en kregen gelijk.",
              },
              {
                icon: Handshake,
                title: "Gratis advies, eerlijk antwoord",
                text: "Wij berekenen altijd eerst vrijblijvend of een taxatierapport loont voor jouw situatie. Is het niet zinvol? Dan zeggen wij dat gewoon. Zo weet je waar je aan toe bent, zonder verrassingen achteraf.",
              },
            ].map((item, i) => (
              <div
                key={i}
                className="rounded-[14px] p-9"
                style={{
                  border: '1px solid rgba(255,255,255,0.12)',
                  background: 'rgba(255,255,255,0.06)',
                  transition: 'background 250ms ease',
                }}
                onMouseEnter={(e) => (e.currentTarget.style.background = 'rgba(255,255,255,0.10)')}
                onMouseLeave={(e) => (e.currentTarget.style.background = 'rgba(255,255,255,0.06)')}
              >
                <item.icon className="w-10 h-10 mb-5" style={{ color: '#ff751f' }} />
                <h3 className="heading-display text-[22px] text-white font-semibold mb-3">{item.title}</h3>
                <p style={{ fontFamily: "'Inter', sans-serif", fontSize: 15, fontWeight: 400, lineHeight: 1.72, color: 'rgba(255,255,255,0.72)' }}>{item.text}</p>
              </div>
            ))}
          </div>

          <div className="grid grid-cols-3 gap-0 mb-12">
            {[
              { num: "25.000+", label: "Voertuigen getaxeerd" },
              { num: "15 jaar", label: "Ervaring in voertuigtaxaties" },
              { num: "98%", label: "Rapporten geaccepteerd door Belastingdienst" },
            ].map((stat, i) => (
              <div key={i} className={`text-center py-6 ${i > 0 ? "border-l" : ""}`} style={{ borderColor: 'rgba(255,255,255,0.15)' }}>
                <p
                  className="heading-display font-bold"
                  style={{ fontSize: 'clamp(40px, 5vw, 58px)', color: '#ffffff', letterSpacing: '-0.02em', lineHeight: 1 }}
                >
                  {stat.num}
                </p>
                <p style={{ fontFamily: "'Inter', sans-serif", fontSize: 11, fontWeight: 600, letterSpacing: '0.12em', textTransform: 'uppercase' as const, color: 'rgba(255,255,255,0.55)', marginTop: 8 }}>
                  {stat.label}
                </p>
              </div>
            ))}
          </div>

          <div className="text-center">
            <Link to="/contact">
              <button className="btn-cta">Vraag gratis advies aan</button>
            </Link>
          </div>
        </div>
      </section>

      {/* ── GOOGLE REVIEWS ── */}
      <section style={{ background: '#f0f4f8' }} className="py-16 md:py-24 px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <h2
            className="heading-display font-bold text-center mb-12"
            style={{ fontSize: 'clamp(30px, 3.5vw, 44px)', lineHeight: 1.15, letterSpacing: '-0.02em', color: '#1a1a1a' }}
          >
            Wat onze klanten zeggen
          </h2>
          <div className="grid md:grid-cols-3 gap-6 mb-10">
            {reviews.map((review, i) => (
              <div key={i} className="card-elevated bg-white p-7">
                <div className="flex gap-0.5 mb-3" style={{ fontSize: 18, color: '#ff751f' }}>
                  ★★★★★
                </div>
                <p style={{ fontFamily: "'Inter', sans-serif", fontSize: 14, color: '#4a5568', fontStyle: 'italic', lineHeight: 1.70 }} className="mb-4">
                  "{review.text}"
                </p>
                <div className="flex items-center gap-2">
                  <span style={{ fontFamily: "'Inter', sans-serif", fontSize: 13, fontWeight: 600, color: '#1a1a1a' }}>{review.name}</span>
                  <span style={{ fontSize: 11, color: '#698db3', fontWeight: 400 }}>Geverifieerde klant</span>
                </div>
              </div>
            ))}
          </div>
          <div className="text-center flex items-center justify-center gap-2">
            <span style={{ fontSize: 20, color: '#ff751f' }}>★★★★★</span>
            <span className="heading-display" style={{ fontSize: 22, fontWeight: 600, color: '#1a1a1a' }}>4,9 / 5 sterren op Google Reviews</span>
          </div>
        </div>
      </section>

      {/* ── TARGET AUDIENCE BANNER ── */}
      <section
        className="py-16 px-6 lg:px-8 overflow-hidden relative"
        style={{
          background: '#1d3c71',
          backgroundImage: 'radial-gradient(ellipse at 20% 50%, rgba(105,141,179,0.20) 0%, transparent 60%), radial-gradient(ellipse at 80% 20%, rgba(255,255,255,0.04) 0%, transparent 50%)',
        }}
      >
        <div className="max-w-7xl mx-auto grid md:grid-cols-3 gap-0 text-white text-center relative z-10">
          {[
            { title: "Merkdealers en groothandelaren", sub: "Professionele taxatierapporten voor je bedrijfsvoering en handelsvoorraad." },
            { title: "Importeurs en handelaren", sub: "De laagst haalbare BPM met een juridisch waterdicht rapport als onderbouwing." },
            { title: "Particulieren", sub: "Persoonlijke begeleiding bij het taxeren van je voertuig voor verzekering of import." },
          ].map((item, i) => (
            <div key={i} className={`py-8 px-8 ${i > 0 ? "md:border-l" : ""}`} style={{ borderColor: 'rgba(255,255,255,0.15)' }}>
              <div className="w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-5" style={{ background: 'rgba(255,255,255,0.15)' }}>
                <Users className="w-7 h-7 text-white" style={{ opacity: 1 }} />
              </div>
              <h3 className="heading-display text-[20px] font-semibold text-white mb-2" style={{ lineHeight: 1.3 }}>{item.title}</h3>
              <p style={{ fontFamily: "'Inter', sans-serif", fontSize: 14, lineHeight: 1.65, color: 'rgba(255,255,255,0.80)' }}>{item.sub}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ── NEWS SECTION ── */}
      <section className="bg-white py-16 md:py-24 px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <h2
            className="heading-display font-bold text-center mb-12"
            style={{ fontSize: 'clamp(30px, 3.5vw, 44px)', lineHeight: 1.15, letterSpacing: '-0.02em', color: '#1a1a1a' }}
          >
            Laatste nieuws
          </h2>
          <div className="grid md:grid-cols-3 gap-6 mb-10">
            {[
              { date: "12 maart 2026", label: "BPM Nieuws", title: "Nieuwe BPM-tarieven per 1 april 2026", intro: "De Belastingdienst heeft de nieuwe forfaitaire tabel gepubliceerd. Wat dit betekent voor importeurs." },
              { date: "28 februari 2026", label: "Jurisprudentie", title: "Uitspraak rechtbank over taxatiemethode", intro: "Een recente uitspraak bevestigt de geldigheid van fysieke inspectie als grondslag voor BPM-bepaling." },
              { date: "15 februari 2026", label: "Diensten", title: "Verzekeringstaxatie nu ook voor foodtrucks", intro: "Wij hebben ons dienstenaanbod uitgebreid met taxaties specifiek voor mobiele horecavoertuigen." },
            ].map((item, i) => (
              <div
                key={i}
                className="card-elevated bg-white p-7"
                style={{ borderTop: '3px solid #1d3c71', borderRadius: '0 0 14px 14px' }}
              >
                <span style={{ fontSize: 10, fontWeight: 600, letterSpacing: '0.10em', textTransform: 'uppercase' as const, color: '#ff751f', marginBottom: 6, display: 'block' }}>
                  {item.label}
                </span>
                <p className="text-xs mb-2" style={{ color: '#698db3' }}>{item.date}</p>
                <h3 style={{ fontFamily: "'Inter', sans-serif", fontSize: 15, fontWeight: 600, color: '#1d3c71' }} className="mb-2">{item.title}</h3>
                <p style={{ fontFamily: "'Inter', sans-serif", fontSize: 15, fontWeight: 400, lineHeight: 1.72, color: '#4a5568' }} className="mb-3 line-clamp-2">{item.intro}</p>
                <span className="text-sm font-medium inline-flex items-center gap-1 hover:gap-2 transition-all cursor-pointer" style={{ color: '#ff751f' }}>
                  Lees meer <ArrowRight className="w-3.5 h-3.5" />
                </span>
              </div>
            ))}
          </div>
          <div className="text-center">
            <Link to="/nieuws">
              <button className="font-semibold px-6 py-3 rounded-md transition-colors" style={{ border: '2px solid #1d3c71', color: '#1d3c71', background: 'transparent' }}>
                Bekijk al het nieuws
              </button>
            </Link>
          </div>
        </div>
      </section>

      {/* ── CTA BLOCK ── */}
      <section
        className="py-16 md:py-20 px-6 lg:px-8 text-center overflow-hidden"
        style={{
          background: '#1d3c71',
          backgroundImage: 'radial-gradient(ellipse at 20% 50%, rgba(105,141,179,0.20) 0%, transparent 60%), radial-gradient(ellipse at 80% 20%, rgba(255,255,255,0.04) 0%, transparent 50%)',
        }}
      >
        <div className="max-w-2xl mx-auto relative z-10">
          <h2
            className="heading-display font-bold mb-4"
            style={{ fontSize: 'clamp(30px, 3.5vw, 44px)', lineHeight: 1.15, letterSpacing: '-0.02em', color: '#ffffff' }}
          >
            Vragen of een taxatie nodig?
          </h2>
          <p style={{ fontFamily: "'Inter', sans-serif", fontSize: 'clamp(16px, 1.8vw, 19px)', fontWeight: 400, lineHeight: 1.70, color: 'rgba(255,255,255,0.72)' }} className="mb-10">
            Neem contact op om jouw situatie te bespreken. We kijken graag mee welke taxatie bij je vraag past.
          </p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center items-center">
            <Link to="/contact">
              <button className="btn-cta">Taxatie aanvragen</button>
            </Link>
            <a href="tel:+31854832461">
              <button className="btn-outline-white">
                <Phone className="w-5 h-5" />
                085 483 2461
              </button>
            </a>
          </div>
        </div>
      </section>

      <SiteFooter />
      <WhatsAppButton />
    </div>
  );
};

export default Index;