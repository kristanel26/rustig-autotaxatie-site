import { useState } from "react";
import { Link } from "react-router-dom";
import { ArrowRight, Phone, Shield, MapPin, Scale as ScaleIcon, Award, Users, Star, Calculator, Caravan, Car, Bike, Truck, Wrench, ChevronRight, Search, MessageCircle, Handshake } from "lucide-react";
import erikPhoto from "@/assets/erik-elderson.png";
import heroImage from "@/assets/hero-homepage.jpg";
import SiteHeader from "@/components/SiteHeader";
import SiteFooter from "@/components/SiteFooter";
import WhatsAppButton from "@/components/WhatsAppButton";

const services = [
  { title: "BPM Taxatie", description: "De laagst haalbare BPM voor je importvoertuig.", href: "/bpm-taxatie", icon: Calculator, highlight: true },
  { title: "Verzekeringstaxatie", description: "De juiste waarde voor je verzekeringspolis.", href: "/verzekeringstaxatie-info", icon: Shield },
  { title: "WEV Taxatie", description: "Objectieve waardebepaling voor fiscale doeleinden.", href: "/wev-taxatie", icon: ScaleIcon },
  { title: "Camper Taxatie", description: "Specifieke kennis van de campermarkt.", href: "/camper-taxatie", icon: Caravan },
  { title: "Oldtimer Taxatie", description: "Waardering met oog voor detail en historie.", href: "/oldtimer-taxatie", icon: Car },
  { title: "Youngtimer Taxatie", description: "Taxatie van voertuigen vanaf 15 jaar oud.", href: "/youngtimer-taxatie", icon: Car },
  { title: "Motor Taxatie", description: "Professionele waardering van motorfietsen.", href: "/motor-taxatie", icon: Bike },
  { title: "Foodtruck Taxatie", description: "Taxatie van mobiele horecavoertuigen.", href: "/foodtruck-taxatie", icon: Truck },
  { title: "Schadevaststelling", description: "Onafhankelijke vaststelling na schade.", href: "/schadevaststelling", icon: Wrench },
];

const usps = [
  { icon: Award, title: "Erkend taxateur", sub: "Geregistreerd bij TMV en VRT" },
  { icon: MapPin, title: "Op locatie", sub: "Wij komen naar uw voertuig toe" },
  { icon: Shield, title: "Juridisch verdedigbaar", sub: "Elk rapport standhoudt bij de Belastingdienst" },
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
          <div style={{ maxWidth: 560 }}>
            <p className="animate-slide-up uppercase font-semibold tracking-[0.13em] mb-5" style={{ fontSize: 11, color: '#ff751f' }}>
              Erkend taxatiebureau &mdash; landelijk actief
            </p>
            <h1
              className="animate-slide-up delay-100 heading-display text-white font-bold mb-6"
              style={{
                fontSize: 'clamp(44px, 5.5vw, 68px)',
                lineHeight: 1.08,
                letterSpacing: '-0.025em',
                maxWidth: 560,
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
              Automobieltaxaties.nl is het erkende taxatiebureau voor merkdealers, importeurs en particulieren. Wij komen bij u op locatie, door heel Nederland.
            </p>
            <div className="animate-slide-up delay-300 flex flex-col sm:flex-row gap-3">
              <Link to="/contact">
                <button className="btn-cta">Taxatie aanvragen</button>
              </Link>
              <a href="tel:+31854832461">
                <button className="btn-outline-white flex items-center gap-2">
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
        <div className="max-w-7xl mx-auto grid md:grid-cols-2 gap-8 items-start">
          <div>
            <h2
              className="heading-display font-bold mb-4"
              style={{ fontSize: 'clamp(30px, 3.5vw, 44px)', lineHeight: 1.15, letterSpacing: '-0.02em', color: '#1a1a1a' }}
            >
              Bereken uw BPM indicatie
            </h2>
            <p style={{ fontFamily: "'Inter', sans-serif", fontSize: 16, fontWeight: 400, lineHeight: 1.70, color: '#4a5568', maxWidth: 540 }} className="mb-8">
              Gebruik onze calculator voor een eerste indicatie van de BPM-kosten bij import. Let op: een berekening is geen taxatie en biedt geen juridische onderbouwing.
            </p>
            <div
              className="rounded-[14px] p-7 bg-white"
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
          <div
            className="rounded-[14px] p-8 text-white overflow-hidden"
            style={{
              background: '#1d3c71',
              backgroundImage: 'radial-gradient(ellipse at 20% 50%, rgba(105,141,179,0.20) 0%, transparent 60%), radial-gradient(ellipse at 80% 20%, rgba(255,255,255,0.04) 0%, transparent 50%)',
              height: 'fit-content',
              alignSelf: 'start',
            }}
          >
            <h3 className="heading-display text-2xl mb-4">Twijfelt u na de berekening?</h3>
            <p style={{ color: 'rgba(255,255,255,0.72)', fontSize: 15, lineHeight: 1.70 }} className="mb-6">
              Vraag gratis BPM advies aan. Wij bepalen de laagst haalbare BPM voor uw specifieke voertuig.
            </p>
            <Link to="/contact">
              <button className="btn-cta">Gratis advies aanvragen</button>
            </Link>
          </div>
        </div>
      </section>

      {/* ── USP BAR ── */}
      <section className="px-6 lg:px-8" style={{ background: '#ffffff', padding: '48px 0' }}>
        <div className="max-w-7xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-8 px-6 lg:px-8">
          {usps.map((usp, i) => (
            <div key={i} className="text-center relative">
              <div
                className="mx-auto mb-3.5 flex items-center justify-center"
                style={{ width: 56, height: 56, borderRadius: '50%', background: '#f0f4f8', color: '#1d3c71' }}
              >
                <usp.icon className="w-8 h-8" />
              </div>
              <h4 style={{ fontFamily: "'Inter', sans-serif", fontSize: 15, fontWeight: 600, color: '#1a1a1a' }} className="mb-1">{usp.title}</h4>
              <p style={{ fontFamily: "'Inter', sans-serif", fontSize: 13, color: '#698db3' }}>{usp.sub}</p>
              {i < usps.length - 1 && (
                <div className="hidden md:block absolute right-0 top-1/2 -translate-y-1/2 h-12" style={{ width: 1, background: '#e8edf3' }} />
              )}
            </div>
          ))}
        </div>
      </section>

      {/* ── ERIK SECTION ── */}
      <section className="bg-white py-16 md:py-24 px-6 lg:px-8">
        <div className="max-w-7xl mx-auto grid md:grid-cols-2 gap-12 md:gap-16 items-center">
          <div className="relative">
            <div className="absolute -bottom-4 -left-4 w-full h-full rounded-lg -z-10" style={{ border: '8px solid rgba(105,141,179,0.20)' }} />
            <img
              src={erikPhoto}
              alt="Erik Elderson – eigenaar Automobiel Taxaties"
              className="rounded-lg w-full max-w-md mx-auto relative z-10"
              style={{ boxShadow: '0 20px 60px rgba(29,60,113,0.20)' }}
              loading="lazy"
            />
          </div>
          <div>
            <span className="block mb-3" style={{ fontFamily: "'Inter', sans-serif", fontSize: 11, fontWeight: 600, letterSpacing: '0.13em', textTransform: 'uppercase' as const, color: '#ff751f' }}>
              Uw taxateur
            </span>
            <h2
              className="heading-display font-bold mb-2"
              style={{ fontSize: 'clamp(30px, 3.5vw, 44px)', lineHeight: 1.15, letterSpacing: '-0.02em', color: '#1a1a1a' }}
            >
              Erik Elderson
            </h2>
            <p style={{ color: '#698db3', fontSize: 16 }} className="mb-6">
              Eigenaar &mdash; Notarieel Beëdigd TMV Register Taxateur &mdash; Register Taxateur VRT
            </p>
            <p style={{ fontFamily: "'Inter', sans-serif", fontSize: 15, fontWeight: 400, lineHeight: 1.72, color: '#4a5568' }} className="mb-4">
              Automobiel Taxaties werkt onafhankelijk en met meer dan 15 jaar ervaring in voertuigwaarderingen. Ik neem de tijd om een voertuig goed te bekijken en leg vast wat écht van invloed is op de waarde.
            </p>
            <p style={{ fontFamily: "'Inter', sans-serif", fontSize: 15, fontWeight: 400, lineHeight: 1.72, color: '#4a5568' }} className="mb-6">
              Geen aannames, geen haastwerk. Zo ontvang je een duidelijk en zorgvuldig opgesteld taxatierapport waar je op kunt vertrouwen.
            </p>
            <div className="space-y-3 mb-6">
              <div className="flex items-center gap-3">
                <span className="w-5 h-0.5 rounded-full" style={{ background: '#ff751f' }} />
                <span style={{ fontFamily: "'Inter', sans-serif", fontSize: 15, fontWeight: 500, color: '#1a1a1a' }}>Meer dan 15 jaar ervaring</span>
              </div>
              <div className="flex items-center gap-3">
                <span className="w-5 h-0.5 rounded-full" style={{ background: '#ff751f' }} />
                <span style={{ fontFamily: "'Inter', sans-serif", fontSize: 15, fontWeight: 500, color: '#1a1a1a' }}>Landelijk actief, op locatie bij u</span>
              </div>
            </div>
            <Link to="/werkwijze" className="text-sm font-semibold hover:underline inline-flex items-center gap-1" style={{ color: '#ff751f' }}>
              Lees meer over onze werkwijze <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </section>

      {/* ── SERVICES GRID ── */}
      <section style={{ background: '#f0f4f8' }} className="py-16 md:py-24 px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <h2
            className="heading-display font-bold text-center mb-14"
            style={{ fontSize: 'clamp(30px, 3.5vw, 44px)', lineHeight: 1.15, letterSpacing: '-0.02em', color: '#1a1a1a' }}
          >
            Wat kunnen wij voor u doen?
          </h2>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {services.map((service, i) => (
              <Link
                key={i}
                to={service.href}
                className={`group card-elevated p-6 ${
                  service.highlight
                    ? "col-span-1 lg:col-span-2 sm:col-span-2"
                    : ""
                }`}
                style={{
                  background: service.highlight ? 'rgba(255,117,31,0.03)' : '#ffffff',
                  borderColor: service.highlight ? 'rgba(255,117,31,0.20)' : undefined,
                }}
              >
                <div
                  className="inline-flex items-center justify-center w-10 h-10 rounded-lg mb-4"
                  style={{ background: service.highlight ? 'rgba(255,117,31,0.10)' : 'rgba(29,60,113,0.08)' }}
                >
                  <service.icon className="w-5 h-5" style={{ color: service.highlight ? '#ff751f' : '#1d3c71' }} />
                </div>
                <h3 style={{ fontFamily: "'Inter', sans-serif", fontSize: 15, fontWeight: 600, color: '#1a1a1a' }} className="mb-1.5">{service.title}</h3>
                <p style={{ fontFamily: "'Inter', sans-serif", fontSize: 15, fontWeight: 400, lineHeight: 1.72, color: '#4a5568' }} className="mb-3">{service.description}</p>
                <span className="text-sm font-medium inline-flex items-center gap-1 group-hover:gap-2 transition-all" style={{ color: '#ff751f' }}>
                  Meer info <ArrowRight className="w-3.5 h-3.5" />
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
              Niet omdat wij de goedkoopste zijn. Maar omdat onze rapporten standhouden bij de Belastingdienst — en dat levert klanten gemiddeld duizenden euro's op.
            </p>
          </div>

          {/* 3 Statements */}
          <div className="grid md:grid-cols-3 gap-6 mb-14">
            {[
              {
                icon: Search,
                title: "Fysieke inspectie, geen software",
                text: "Wij komen op locatie bij uw voertuig. Lakdiktemetingen, schadecalculatie en een volledig fotodossier vormen de basis van elk rapport. Niet een algoritme — maar een erkende taxateur met twee ogen en vakkennis.",
              },
              {
                icon: Award,
                title: "Erkend en juridisch verdedigbaar",
                text: "Ons rapport is opgesteld door een notarieel beëdigd TMV Register Taxateur. Het staat bij bezwaar, beroep en navorderingen van de Belastingdienst. Klanten die twijfelden aan een rapport elders, kwamen bij ons terecht — en kregen gelijk.",
              },
              {
                icon: Handshake,
                title: "Gratis advies, eerlijk antwoord",
                text: "Wij berekenen altijd eerst vrijblijvend of een taxatierapport loont voor uw situatie. Is het niet zinvol? Dan zeggen wij dat gewoon. Zo weet u waar u aan toe bent — zonder verrassingen achteraf.",
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

          {/* Stats bar */}
          <div className="grid grid-cols-3 gap-0 mb-12">
            {[
              { num: "1.200+", label: "Taxaties uitgevoerd" },
              { num: "€ 2.400", label: "Gemiddelde BPM-besparing per voertuig" },
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
            { title: "Merkdealers en groothandelaren", sub: "Professionele taxatierapporten voor uw bedrijfsvoering en handelsvoorraad." },
            { title: "Importeurs en handelaren", sub: "De laagst haalbare BPM met een juridisch waterdicht rapport als onderbouwing." },
            { title: "Particulieren", sub: "Persoonlijke begeleiding bij het taxeren van uw voertuig voor verzekering of import." },
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
        className="py-16 md:py-20 px-6 lg:px-8 text-center overflow-hidden section-clip-bottom"
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
            Neem contact op om uw situatie te bespreken. We kijken graag mee welke taxatie bij uw vraag past.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link to="/contact">
              <button className="btn-cta">Taxatie aanvragen</button>
            </Link>
            <a href="tel:+31854832461">
              <button className="btn-outline-white flex items-center gap-2">
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
