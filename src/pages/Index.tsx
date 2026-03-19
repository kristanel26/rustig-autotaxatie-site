import { Link } from "react-router-dom";
import { ArrowRight, Phone, Shield, MapPin, Scale as ScaleIcon, Award, Users, Star, Calculator, Caravan, Car, Bike, Truck, Wrench, ChevronRight } from "lucide-react";
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

const Index = () => {
  return (
    <div className="min-h-screen bg-white">
      <SiteHeader />

      {/* ── HERO ── */}
      <section className="relative min-h-[85vh] flex items-center overflow-hidden">
        <div className="absolute inset-0">
          <img src={heroImage} alt="" className="w-full h-full object-cover" />
          <div className="absolute inset-0 bg-[#1d3c71]/[0.55]" />
        </div>

        <div className="max-w-7xl mx-auto w-full px-6 lg:px-8 py-24 md:py-36 relative z-10">
          <div className="max-w-[600px]">
            <p className="text-[#ff751f] font-semibold uppercase tracking-[0.1em] text-xs mb-5">
              Erkend taxatiebureau &mdash; landelijk actief
            </p>
            <h1 className="heading-display text-[40px] md:text-[52px] text-white mb-6 leading-[1.12]">
              De laagst haalbare BPM. Fysiek onderbouwd. Juridisch verdedigbaar.
            </h1>
            <p className="text-white/80 text-lg leading-[1.7] mb-10">
              Automobieltaxaties.nl is het erkende taxatiebureau voor merkdealers, importeurs en particulieren. Wij komen bij u op locatie, door heel Nederland.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Link to="/contact">
                <button className="bg-[#ff751f] text-white font-semibold px-8 py-4 rounded-lg text-base hover:bg-[#e5681b] transition-colors shadow-[0_4px_14px_rgba(255,117,31,0.4)]">
                  Taxatie aanvragen
                </button>
              </Link>
              <a href="tel:+31854832461">
                <button className="border-2 border-white/30 text-white font-semibold px-8 py-4 rounded-lg text-base hover:bg-white/10 transition-colors flex items-center gap-2">
                  <Phone className="w-5 h-5" />
                  085 483 2461
                </button>
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* ── BPM CALCULATOR (placeholder) ── */}
      <section className="bg-[#f7f8fa] py-16 md:py-24 px-6 lg:px-8">
        <div className="max-w-7xl mx-auto grid md:grid-cols-2 gap-10 items-center">
          <div>
            <h2 className="heading-display text-[32px] text-[#1a1a1a] mb-4">Bereken uw BPM indicatie</h2>
            <p className="text-[#1a1a1a]/60 text-[17px] leading-[1.7] mb-8">
              Gebruik onze calculator voor een eerste indicatie van de BPM-kosten bij import. Let op: een berekening is geen taxatie en biedt geen juridische onderbouwing.
            </p>
            <div className="bg-white rounded-xl border border-[#adafc7]/30 p-10 text-center min-h-[200px] flex items-center justify-center">
              <p className="text-[#698db3]">BPM Calculator wordt hier ingeladen</p>
            </div>
          </div>
          <div className="bg-[#1d3c71] rounded-xl p-10 text-white">
            <h3 className="heading-display text-2xl mb-4">Twijfelt u na de berekening?</h3>
            <p className="text-white/70 text-[17px] leading-[1.7] mb-6">
              Vraag gratis BPM advies aan. Wij bepalen de laagst haalbare BPM voor uw specifieke voertuig.
            </p>
            <Link to="/contact">
              <button className="bg-[#ff751f] text-white font-semibold px-6 py-3 rounded-lg hover:bg-[#e5681b] transition-colors">
                Gratis advies aanvragen
              </button>
            </Link>
          </div>
        </div>
      </section>

      {/* ── USP BAR ── */}
      <section className="bg-white py-14 px-6 lg:px-8 border-y border-[#e5e7eb]">
        <div className="max-w-7xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-8">
          {usps.map((usp, i) => (
            <div key={i} className="text-center relative">
              <div className="inline-flex items-center justify-center w-12 h-12 rounded-xl bg-[#1d3c71]/[0.08] mb-4">
                <usp.icon className="w-6 h-6 text-[#1d3c71]" />
              </div>
              <h4 className="font-semibold text-[#1a1a1a] mb-1">{usp.title}</h4>
              <p className="text-sm text-[#1a1a1a]/60">{usp.sub}</p>
              {i < usps.length - 1 && (
                <div className="hidden md:block absolute right-0 top-1/2 -translate-y-1/2 w-px h-12 bg-[#e5e7eb]" />
              )}
            </div>
          ))}
        </div>
      </section>

      {/* ── ERIK SECTION ── */}
      <section className="bg-white py-16 md:py-24 px-6 lg:px-8">
        <div className="max-w-7xl mx-auto grid md:grid-cols-2 gap-12 md:gap-16 items-center">
          <div className="relative">
            <img
              src={erikPhoto}
              alt="Erik Elderson – eigenaar Automobiel Taxaties"
              className="rounded-lg w-full max-w-md mx-auto shadow-xl"
              loading="lazy"
            />
          </div>
          <div>
            <p className="text-[#ff751f] font-semibold uppercase tracking-[0.1em] text-xs mb-3">
              Uw taxateur
            </p>
            <h2 className="heading-display text-[32px] text-[#1a1a1a] mb-2">Erik Elderson</h2>
            <p className="text-[#698db3] text-sm mb-6">
              Eigenaar &mdash; Notarieel Beëdigd TMV Register Taxateur &mdash; Register Taxateur VRT
            </p>
            <p className="text-[#1a1a1a]/70 text-[17px] leading-[1.7] mb-4">
              Automobiel Taxaties werkt onafhankelijk en met meer dan 15 jaar ervaring in voertuigwaarderingen. Ik neem de tijd om een voertuig goed te bekijken en leg vast wat écht van invloed is op de waarde.
            </p>
            <p className="text-[#1a1a1a]/70 text-[17px] leading-[1.7] mb-6">
              Geen aannames, geen haastwerk. Zo ontvang je een duidelijk en zorgvuldig opgesteld taxatierapport waar je op kunt vertrouwen.
            </p>
            <div className="space-y-2 mb-6">
              <div className="flex items-center gap-3">
                <div className="w-5 h-5 rounded-full bg-[#ff751f]/10 flex items-center justify-center">
                  <ChevronRight className="w-3 h-3 text-[#ff751f]" />
                </div>
                <span className="text-[#1a1a1a] text-sm font-medium">Meer dan 15 jaar ervaring</span>
              </div>
              <div className="flex items-center gap-3">
                <div className="w-5 h-5 rounded-full bg-[#ff751f]/10 flex items-center justify-center">
                  <ChevronRight className="w-3 h-3 text-[#ff751f]" />
                </div>
                <span className="text-[#1a1a1a] text-sm font-medium">Landelijk actief, op locatie bij u</span>
              </div>
            </div>
            <Link to="/werkwijze" className="text-[#ff751f] text-sm font-semibold hover:underline inline-flex items-center gap-1">
              Lees meer over onze werkwijze <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </section>

      {/* ── SERVICES GRID ── */}
      <section className="bg-white py-16 md:py-24 px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <h2 className="heading-display text-[32px] text-[#1a1a1a] text-center mb-14">
            Wat kunnen wij voor u doen?
          </h2>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {services.map((service, i) => (
              <Link
                key={i}
                to={service.href}
                className={`group rounded-xl border p-6 transition-all duration-300 hover:-translate-y-1 hover:shadow-lg ${
                  service.highlight
                    ? "border-[#ff751f]/30 bg-[#ff751f]/[0.03] shadow-md col-span-1 lg:col-span-2 sm:col-span-2"
                    : "border-[#e5e7eb] bg-white shadow-[0_2px_10px_rgba(0,0,0,0.07)]"
                }`}
              >
                <div className={`inline-flex items-center justify-center w-10 h-10 rounded-lg mb-4 ${
                  service.highlight ? "bg-[#ff751f]/10" : "bg-[#1d3c71]/[0.08]"
                }`}>
                  <service.icon className={`w-5 h-5 ${service.highlight ? "text-[#ff751f]" : "text-[#1d3c71]"}`} />
                </div>
                <h3 className="font-semibold text-[#1a1a1a] mb-1.5">{service.title}</h3>
                <p className="text-sm text-[#1a1a1a]/60 leading-relaxed mb-3">{service.description}</p>
                <span className="text-[#ff751f] text-sm font-medium inline-flex items-center gap-1 group-hover:gap-2 transition-all">
                  Meer info <ArrowRight className="w-3.5 h-3.5" />
                </span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* ── COMPARISON TABLE ── */}
      <section className="bg-[#f7f8fa] py-16 md:py-24 px-6 lg:px-8">
        <div className="max-w-4xl mx-auto">
          <h2 className="heading-display text-[32px] text-[#1a1a1a] text-center mb-10">
            Wat is het verschil?
          </h2>
          <div className="overflow-hidden rounded-xl border border-[#e5e7eb]">
            <table className="w-full text-left text-sm">
              <thead>
                <tr>
                  <th className="bg-[#f7f8fa] px-6 py-4 font-semibold text-[#1a1a1a]/60 border-b border-r border-[#e5e7eb]">
                    Een online BPM berekening
                  </th>
                  <th className="bg-[#EBF2FB] px-6 py-4 font-semibold text-[#1d3c71] border-b border-[#e5e7eb]">
                    Een taxatierapport van Automobieltaxaties.nl
                  </th>
                </tr>
              </thead>
              <tbody className="text-[#1a1a1a]/70">
                {[
                  ["Gebaseerd op software", "Fysieke inspectie op locatie"],
                  ["Geen opname van het voertuig", "Lakdiktemetingen, schadecalculatie, fotodossier"],
                  ["Niet bruikbaar als officieel tegenbewijs", "Officieel erkend, verdedigbaar bij bezwaar"],
                  ["Gratis, maar zonder garantie", "Betaald, maar juridisch waterdicht"],
                ].map(([left, right], i) => (
                  <tr key={i} className="border-b border-[#e5e7eb] last:border-0">
                    <td className="px-6 py-4 bg-white border-r border-[#e5e7eb]">{left}</td>
                    <td className="px-6 py-4 bg-[#EBF2FB] text-[#1d3c71] font-medium">{right}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* ── GOOGLE REVIEWS ── */}
      <section className="bg-[#f7f8fa] py-16 md:py-24 px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <h2 className="heading-display text-[32px] text-[#1a1a1a] text-center mb-12">
            Wat onze klanten zeggen
          </h2>
          <div className="grid md:grid-cols-3 gap-6 mb-10">
            {reviews.map((review, i) => (
              <div key={i} className="bg-white rounded-xl p-7 shadow-[0_2px_10px_rgba(0,0,0,0.07)] border border-[#e5e7eb]">
                <div className="flex gap-1 mb-3">
                  {[...Array(5)].map((_, s) => (
                    <Star key={s} className="w-4 h-4 fill-[#ff751f] text-[#ff751f]" />
                  ))}
                </div>
                <p className="text-[#1a1a1a]/70 text-sm leading-relaxed mb-4">"{review.text}"</p>
                <p className="text-[#1a1a1a] font-semibold text-sm">{review.name}</p>
              </div>
            ))}
          </div>
          <div className="text-center">
            <p className="text-[#1a1a1a] font-semibold mb-4">4,9 / 5 sterren op Google Reviews</p>
            <a href="#" className="text-[#ff751f] font-semibold text-sm hover:underline inline-flex items-center gap-1">
              Bekijk alle reviews <ArrowRight className="w-4 h-4" />
            </a>
          </div>
        </div>
      </section>

      {/* ── TARGET AUDIENCE BANNER ── */}
      <section className="bg-[#1d3c71] py-16 px-6 lg:px-8">
        <div className="max-w-7xl mx-auto grid md:grid-cols-3 gap-8 text-white text-center">
          {[
            { title: "Merkdealers en groothandelaren", sub: "Professionele taxatierapporten voor uw bedrijfsvoering en handelsvoorraad." },
            { title: "Importeurs en handelaren", sub: "De laagst haalbare BPM met een juridisch waterdicht rapport als onderbouwing." },
            { title: "Particulieren", sub: "Persoonlijke begeleiding bij het taxeren van uw voertuig voor verzekering of import." },
          ].map((item, i) => (
            <div key={i}>
              <div className="w-12 h-12 rounded-xl bg-white/10 flex items-center justify-center mx-auto mb-4">
                <Users className="w-6 h-6 text-white" />
              </div>
              <h3 className="font-semibold text-lg mb-2">{item.title}</h3>
              <p className="text-white/70 text-sm leading-relaxed">{item.sub}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ── NEWS SECTION (placeholder) ── */}
      <section className="bg-white py-16 md:py-24 px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <h2 className="heading-display text-[32px] text-[#1a1a1a] text-center mb-12">
            Laatste nieuws
          </h2>
          <div className="grid md:grid-cols-3 gap-6 mb-10">
            {[
              { date: "12 maart 2026", title: "Nieuwe BPM-tarieven per 1 april 2026", intro: "De Belastingdienst heeft de nieuwe forfaitaire tabel gepubliceerd. Wat dit betekent voor importeurs." },
              { date: "28 februari 2026", title: "Uitspraak rechtbank over taxatiemethode", intro: "Een recente uitspraak bevestigt de geldigheid van fysieke inspectie als grondslag voor BPM-bepaling." },
              { date: "15 februari 2026", title: "Verzekeringstaxatie nu ook voor foodtrucks", intro: "Wij hebben ons dienstenaanbod uitgebreid met taxaties specifiek voor mobiele horecavoertuigen." },
            ].map((item, i) => (
              <div key={i} className="bg-white rounded-xl border border-[#e5e7eb] p-7 shadow-[0_2px_10px_rgba(0,0,0,0.07)] hover:-translate-y-1 transition-transform">
                <p className="text-xs text-[#698db3] mb-2">{item.date}</p>
                <h3 className="font-semibold text-[#1d3c71] mb-2">{item.title}</h3>
                <p className="text-sm text-[#1a1a1a]/60 leading-relaxed mb-3 line-clamp-2">{item.intro}</p>
                <span className="text-[#ff751f] text-sm font-medium inline-flex items-center gap-1 hover:gap-2 transition-all cursor-pointer">
                  Lees meer <ArrowRight className="w-3.5 h-3.5" />
                </span>
              </div>
            ))}
          </div>
          <div className="text-center">
            <Link to="/nieuws">
              <button className="border-2 border-[#1d3c71] text-[#1d3c71] font-semibold px-6 py-3 rounded-lg hover:bg-[#1d3c71] hover:text-white transition-colors">
                Bekijk al het nieuws
              </button>
            </Link>
          </div>
        </div>
      </section>

      {/* ── CTA BLOCK ── */}
      <section className="bg-[#1d3c71] py-16 md:py-20 px-6 lg:px-8 text-center">
        <div className="max-w-2xl mx-auto">
          <h2 className="heading-display text-[32px] text-white mb-4">
            Vragen of een taxatie nodig?
          </h2>
          <p className="text-white/70 text-lg mb-10">
            Neem contact op om uw situatie te bespreken. We kijken graag mee welke taxatie bij uw vraag past.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link to="/contact">
              <button className="bg-[#ff751f] text-white font-semibold px-8 py-4 rounded-lg text-base hover:bg-[#e5681b] transition-colors shadow-[0_4px_14px_rgba(255,117,31,0.4)]">
                Taxatie aanvragen
              </button>
            </Link>
            <a href="tel:+31854832461">
              <button className="border-2 border-white/30 text-white font-semibold px-8 py-4 rounded-lg text-base hover:bg-white/10 transition-colors flex items-center gap-2">
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
