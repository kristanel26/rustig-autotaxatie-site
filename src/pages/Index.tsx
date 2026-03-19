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
  // BPM Calculator state
  const [bpmDate, setBpmDate] = useState("");
  const [bpmFuel, setBpmFuel] = useState("benzine");
  const [bpmCo2Nedc, setBpmCo2Nedc] = useState("");
  const [bpmCo2Wltp, setBpmCo2Wltp] = useState("");
  const [bpmResult, setBpmResult] = useState<null | { restBpm: number; afschrijving: number }>(null);

  const handleBpmCalc = () => {
    // Simplified placeholder calculation
    const co2 = bpmCo2Wltp ? parseInt(bpmCo2Wltp) : bpmCo2Nedc ? parseInt(bpmCo2Nedc) : 0;
    if (!bpmDate || co2 === 0) return;

    const today = new Date();
    const regDate = new Date(bpmDate);
    const monthsDiff = (today.getFullYear() - regDate.getFullYear()) * 12 + (today.getMonth() - regDate.getMonth());
    const afschrijving = Math.min(Math.max(monthsDiff * 0.8, 0), 90);
    const bruto = co2 * 25; // simplified
    const rest = Math.round(bruto * (1 - afschrijving / 100));
    setBpmResult({ restBpm: rest, afschrijving: Math.round(afschrijving) });
  };

  return (
    <div className="min-h-screen bg-white">
      <SiteHeader />

      {/* ── HERO ── */}
      <section className="relative min-h-[85vh] flex items-center overflow-hidden grain-overlay">
        <div className="absolute inset-0">
          <img src={heroImage} alt="" className="w-full h-full object-cover" />
          <div className="absolute inset-0" style={{ background: 'linear-gradient(105deg, rgba(29,60,113,0.88) 0%, rgba(29,60,113,0.55) 60%, transparent 100%)' }} />
          <div className="absolute inset-0" style={{ background: 'radial-gradient(ellipse at 30% 60%, rgba(105,141,179,0.18) 0%, transparent 60%)' }} />
        </div>

        <div className="max-w-7xl mx-auto w-full px-6 lg:px-8 py-24 md:py-36 relative z-10">
          <div className="max-w-[580px]">
            <p className="animate-slide-up text-[hsl(var(--cta))] font-semibold uppercase tracking-[0.12em] text-[11px] mb-5">
              Erkend taxatiebureau &mdash; landelijk actief
            </p>
            <h1 className="animate-slide-up delay-100 heading-display text-[38px] md:text-[58px] text-white mb-6 leading-[1.08] font-bold" style={{ letterSpacing: '-0.02em' }}>
              De laagst haalbare BPM.<br />
              Fysiek onderbouwd.<br />
              Juridisch verdedigbaar.
            </h1>
            <p className="animate-slide-up delay-200 text-white/80 text-[18px] leading-[1.7] mb-10 max-w-[480px]">
              Automobieltaxaties.nl is het erkende taxatiebureau voor merkdealers, importeurs en particulieren. Wij komen bij u op locatie, door heel Nederland.
            </p>
            <div className="animate-slide-up delay-300 flex flex-col sm:flex-row gap-3">
              <Link to="/contact">
                <button className="btn-cta">
                  Taxatie aanvragen
                </button>
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
      <section className="bg-pattern py-16 md:py-24 px-6 lg:px-8">
        <div className="max-w-7xl mx-auto grid md:grid-cols-2 gap-10 items-start">
          <div>
            <h2 className="heading-display text-[32px] md:text-[38px] text-foreground mb-4">Bereken uw BPM indicatie</h2>
            <p className="text-muted-foreground text-[17px] leading-[1.7] mb-8">
              Gebruik onze calculator voor een eerste indicatie van de BPM-kosten bij import. Let op: een berekening is geen taxatie en biedt geen juridische onderbouwing.
            </p>
            <div className="card-elevated p-7">
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-foreground mb-1.5">Datum eerste toelating</label>
                  <input
                    type="date"
                    value={bpmDate}
                    onChange={(e) => setBpmDate(e.target.value)}
                    className="w-full px-4 py-2.5 rounded-lg border border-border text-sm focus:outline-none focus:ring-2 focus:ring-[hsl(var(--primary))] focus:border-transparent"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-foreground mb-1.5">Brandstof</label>
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
                    <label className="block text-sm font-medium text-foreground mb-1.5">CO₂ NEDC (g/km)</label>
                    <input
                      type="number"
                      value={bpmCo2Nedc}
                      onChange={(e) => { setBpmCo2Nedc(e.target.value); setBpmCo2Wltp(""); }}
                      placeholder="—"
                      className="w-full px-4 py-2.5 rounded-lg border border-border text-sm focus:outline-none focus:ring-2 focus:ring-[hsl(var(--primary))] focus:border-transparent"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-foreground mb-1.5">CO₂ WLTP (g/km)</label>
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
                  <div className="mt-4 p-5 rounded-xl bg-[hsl(var(--primary))]/[0.04] border border-[hsl(var(--primary))]/10">
                    <p className="text-sm text-muted-foreground mb-1">Indicatie rest-BPM</p>
                    <p className="heading-display text-[32px] text-foreground font-bold">€ {bpmResult.restBpm.toLocaleString('nl-NL')}</p>
                    <p className="text-sm text-muted-foreground mt-2">Afschrijvingspercentage: {bpmResult.afschrijving}%</p>
                    <p className="text-xs text-muted-foreground/60 mt-3">Dit is een indicatie. Voor een exacte berekening met juridische onderbouwing, vraag een taxatierapport aan.</p>
                  </div>
                )}
              </div>
            </div>
          </div>
          <div className="bg-[hsl(var(--primary))] rounded-[14px] p-10 text-white grain-overlay overflow-hidden">
            <h3 className="heading-display text-2xl mb-4">Twijfelt u na de berekening?</h3>
            <p className="text-white/70 text-[17px] leading-[1.7] mb-6">
              Vraag gratis BPM advies aan. Wij bepalen de laagst haalbare BPM voor uw specifieke voertuig.
            </p>
            <Link to="/contact">
              <button className="btn-cta">
                Gratis advies aanvragen
              </button>
            </Link>
          </div>
        </div>
      </section>

      {/* ── USP BAR ── */}
      <section className="bg-white py-14 px-6 lg:px-8 border-y border-border">
        <div className="max-w-7xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-8">
          {usps.map((usp, i) => (
            <div key={i} className="text-center relative">
              <div className="inline-flex items-center justify-center w-12 h-12 rounded-xl bg-[hsl(var(--primary))]/[0.08] mb-4">
                <usp.icon className="w-6 h-6 text-[hsl(var(--primary))]" />
              </div>
              <h4 className="font-semibold text-foreground mb-1 text-base">{usp.title}</h4>
              <p className="text-sm text-muted-foreground">{usp.sub}</p>
              {i < usps.length - 1 && (
                <div className="hidden md:block absolute right-0 top-1/2 -translate-y-1/2 w-px h-12 bg-border" />
              )}
            </div>
          ))}
        </div>
      </section>

      {/* ── ERIK SECTION ── */}
      <section className="bg-white py-16 md:py-24 px-6 lg:px-8">
        <div className="max-w-7xl mx-auto grid md:grid-cols-2 gap-12 md:gap-16 items-center">
          <div className="relative">
            {/* Decorative element */}
            <div className="absolute -bottom-4 -left-4 w-full h-full rounded-lg bg-[hsl(var(--accent))]/20 -z-10" style={{ border: '8px solid hsl(211 33% 56% / 0.20)' }} />
            <img
              src={erikPhoto}
              alt="Erik Elderson – eigenaar Automobiel Taxaties"
              className="rounded-lg w-full max-w-md mx-auto relative z-10"
              style={{ boxShadow: '0 20px 60px rgba(29,60,113,0.20)' }}
              loading="lazy"
            />
          </div>
          <div>
            <p className="text-[hsl(var(--cta))] font-semibold uppercase tracking-[0.12em] text-[11px] mb-3">
              Uw taxateur
            </p>
            <h2 className="heading-display text-[32px] md:text-[38px] text-foreground mb-2 font-bold">Erik Elderson</h2>
            <p className="text-[hsl(var(--accent))] text-[16px] mb-6">
              Eigenaar &mdash; Notarieel Beëdigd TMV Register Taxateur &mdash; Register Taxateur VRT
            </p>
            <p className="text-foreground/70 text-[17px] leading-[1.7] mb-4">
              Automobiel Taxaties werkt onafhankelijk en met meer dan 15 jaar ervaring in voertuigwaarderingen. Ik neem de tijd om een voertuig goed te bekijken en leg vast wat écht van invloed is op de waarde.
            </p>
            <p className="text-foreground/70 text-[17px] leading-[1.7] mb-6">
              Geen aannames, geen haastwerk. Zo ontvang je een duidelijk en zorgvuldig opgesteld taxatierapport waar je op kunt vertrouwen.
            </p>
            <div className="space-y-3 mb-6">
              <div className="flex items-center gap-3">
                <span className="w-5 h-0.5 bg-[hsl(var(--cta))] rounded-full" />
                <span className="text-foreground text-[15px] font-medium">Meer dan 15 jaar ervaring</span>
              </div>
              <div className="flex items-center gap-3">
                <span className="w-5 h-0.5 bg-[hsl(var(--cta))] rounded-full" />
                <span className="text-foreground text-[15px] font-medium">Landelijk actief, op locatie bij u</span>
              </div>
            </div>
            <Link to="/werkwijze" className="text-[hsl(var(--cta))] text-sm font-semibold hover:underline inline-flex items-center gap-1">
              Lees meer over onze werkwijze <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </section>

      {/* ── SERVICES GRID ── */}
      <section className="bg-pattern py-16 md:py-24 px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <h2 className="heading-display text-[32px] md:text-[38px] text-foreground text-center mb-14">
            Wat kunnen wij voor u doen?
          </h2>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {services.map((service, i) => (
              <Link
                key={i}
                to={service.href}
                className={`group card-elevated p-6 ${
                  service.highlight
                    ? "border-[hsl(var(--cta))]/30 bg-[hsl(var(--cta))]/[0.03] col-span-1 lg:col-span-2 sm:col-span-2"
                    : "bg-white"
                }`}
              >
                <div className={`inline-flex items-center justify-center w-10 h-10 rounded-lg mb-4 ${
                  service.highlight ? "bg-[hsl(var(--cta))]/10" : "bg-[hsl(var(--primary))]/[0.08]"
                }`}>
                  <service.icon className={`w-5 h-5 ${service.highlight ? "text-[hsl(var(--cta))]" : "text-[hsl(var(--primary))]"}`} />
                </div>
                <h3 className="font-semibold text-foreground mb-1.5 text-base">{service.title}</h3>
                <p className="text-sm text-muted-foreground leading-relaxed mb-3">{service.description}</p>
                <span className="text-[hsl(var(--cta))] text-sm font-medium inline-flex items-center gap-1 group-hover:gap-2 transition-all">
                  Meer info <ArrowRight className="w-3.5 h-3.5" />
                </span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* ── WAAROM KIEZEN KLANTEN ONS? ── */}
      <section className="relative bg-[hsl(var(--primary))] py-20 md:py-28 px-6 lg:px-8 grain-overlay overflow-hidden">
        {/* Radial glow */}
        <div className="absolute top-0 left-0 w-[60%] h-[60%]" style={{ background: 'radial-gradient(ellipse at 20% 20%, rgba(105,141,179,0.20) 0%, transparent 70%)' }} />

        <div className="max-w-7xl mx-auto relative z-10">
          <div className="text-center mb-14">
            <p className="text-white/55 uppercase text-[11px] tracking-[0.12em] font-medium mb-4">
              Meer dan 15 jaar bewezen resultaat
            </p>
            <h2 className="heading-display text-[32px] md:text-[38px] text-white font-bold mb-4">
              Waarom kiezen klanten ons?
            </h2>
            <p className="text-white/70 text-[17px] leading-[1.7] max-w-[580px] mx-auto">
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
                className="rounded-[14px] p-9 border border-white/12 bg-white/[0.06] hover:bg-white/[0.10] transition-all duration-250"
              >
                <item.icon className="w-10 h-10 text-[hsl(var(--cta))] mb-5" />
                <h3 className="heading-display text-[22px] text-white font-semibold mb-3">{item.title}</h3>
                <p className="text-white/70 text-[15px] leading-[1.7]">{item.text}</p>
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
              <div key={i} className={`text-center py-6 ${i > 0 ? "border-l border-white/15" : ""}`}>
                <p className="heading-display text-[36px] md:text-[44px] text-white font-bold">{stat.num}</p>
                <p className="text-white/60 text-[13px] uppercase tracking-[0.06em] mt-1">{stat.label}</p>
              </div>
            ))}
          </div>

          <div className="text-center">
            <Link to="/contact">
              <button className="btn-cta">
                Vraag gratis advies aan
              </button>
            </Link>
          </div>
        </div>
      </section>

      {/* ── GOOGLE REVIEWS ── */}
      <section className="bg-pattern py-16 md:py-24 px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <h2 className="heading-display text-[32px] md:text-[38px] text-foreground text-center mb-12">
            Wat onze klanten zeggen
          </h2>
          <div className="grid md:grid-cols-3 gap-6 mb-10">
            {reviews.map((review, i) => (
              <div key={i} className="card-elevated bg-white p-7">
                <div className="flex gap-1 mb-3">
                  {[...Array(5)].map((_, s) => (
                    <Star key={s} className="w-4 h-4 fill-[hsl(var(--cta))] text-[hsl(var(--cta))]" />
                  ))}
                </div>
                <p className="text-foreground/70 text-sm leading-relaxed mb-4">"{review.text}"</p>
                <p className="text-foreground font-semibold text-sm">{review.name}</p>
              </div>
            ))}
          </div>
          <div className="text-center">
            <p className="text-foreground font-semibold mb-4">4,9 / 5 sterren op Google Reviews</p>
            <a href="#" className="text-[hsl(var(--cta))] font-semibold text-sm hover:underline inline-flex items-center gap-1">
              Bekijk alle reviews <ArrowRight className="w-4 h-4" />
            </a>
          </div>
        </div>
      </section>

      {/* ── TARGET AUDIENCE BANNER ── */}
      <section className="bg-[hsl(var(--primary))] py-16 px-6 lg:px-8 grain-overlay overflow-hidden">
        <div className="max-w-7xl mx-auto grid md:grid-cols-3 gap-0 text-white text-center relative z-10">
          {[
            { title: "Merkdealers en groothandelaren", sub: "Professionele taxatierapporten voor uw bedrijfsvoering en handelsvoorraad." },
            { title: "Importeurs en handelaren", sub: "De laagst haalbare BPM met een juridisch waterdicht rapport als onderbouwing." },
            { title: "Particulieren", sub: "Persoonlijke begeleiding bij het taxeren van uw voertuig voor verzekering of import." },
          ].map((item, i) => (
            <div key={i} className={`py-8 px-6 ${i > 0 ? "md:border-l border-white/15" : ""}`}>
              <div className="w-[72px] h-[72px] rounded-full bg-white/[0.12] flex items-center justify-center mx-auto mb-5">
                <Users className="w-12 h-12 text-white" />
              </div>
              <h3 className="heading-display text-[20px] font-semibold mb-2">{item.title}</h3>
              <p className="text-white/70 text-[14px] leading-relaxed">{item.sub}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ── NEWS SECTION (placeholder) ── */}
      <section className="bg-white py-16 md:py-24 px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <h2 className="heading-display text-[32px] md:text-[38px] text-foreground text-center mb-12">
            Laatste nieuws
          </h2>
          <div className="grid md:grid-cols-3 gap-6 mb-10">
            {[
              { date: "12 maart 2026", title: "Nieuwe BPM-tarieven per 1 april 2026", intro: "De Belastingdienst heeft de nieuwe forfaitaire tabel gepubliceerd. Wat dit betekent voor importeurs." },
              { date: "28 februari 2026", title: "Uitspraak rechtbank over taxatiemethode", intro: "Een recente uitspraak bevestigt de geldigheid van fysieke inspectie als grondslag voor BPM-bepaling." },
              { date: "15 februari 2026", title: "Verzekeringstaxatie nu ook voor foodtrucks", intro: "Wij hebben ons dienstenaanbod uitgebreid met taxaties specifiek voor mobiele horecavoertuigen." },
            ].map((item, i) => (
              <div key={i} className="card-elevated bg-white p-7">
                <p className="text-xs text-[hsl(var(--accent))] mb-2">{item.date}</p>
                <h3 className="font-semibold text-[hsl(var(--primary))] mb-2">{item.title}</h3>
                <p className="text-sm text-muted-foreground leading-relaxed mb-3 line-clamp-2">{item.intro}</p>
                <span className="text-[hsl(var(--cta))] text-sm font-medium inline-flex items-center gap-1 hover:gap-2 transition-all cursor-pointer">
                  Lees meer <ArrowRight className="w-3.5 h-3.5" />
                </span>
              </div>
            ))}
          </div>
          <div className="text-center">
            <Link to="/nieuws">
              <button className="border-2 border-[hsl(var(--primary))] text-[hsl(var(--primary))] font-semibold px-6 py-3 rounded-md hover:bg-[hsl(var(--primary))] hover:text-white transition-colors">
                Bekijk al het nieuws
              </button>
            </Link>
          </div>
        </div>
      </section>

      {/* ── CTA BLOCK ── */}
      <section className="bg-[hsl(var(--primary))] py-16 md:py-20 px-6 lg:px-8 text-center grain-overlay overflow-hidden section-clip-bottom">
        <div className="max-w-2xl mx-auto relative z-10">
          <h2 className="heading-display text-[32px] md:text-[38px] text-white mb-4 font-bold">
            Vragen of een taxatie nodig?
          </h2>
          <p className="text-white/70 text-lg mb-10">
            Neem contact op om uw situatie te bespreken. We kijken graag mee welke taxatie bij uw vraag past.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link to="/contact">
              <button className="btn-cta">
                Taxatie aanvragen
              </button>
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
