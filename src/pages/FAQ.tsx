import WhatsAppButton from "@/components/WhatsAppButton";
import { Link } from "react-router-dom";
import { Phone, Mail, ChevronDown } from "lucide-react";
import heroFaq from "@/assets/hero-faq.jpg";
import UspBar from "@/components/UspBar";
import SiteHeader from "@/components/SiteHeader";
import SiteFooter from "@/components/SiteFooter";
import PageMeta from "@/components/PageMeta";
import { Button } from "@/components/ui/button";
import { useState, useRef } from "react";

const faqItems = [
  {
    category: "BPM-aangifte",
    questions: [
      { q: "Hoe verloopt een BPM-aangifte?", a: "Plan een afspraak bij de RDW en laat het voertuig identificeren of keuren. Na de keuring ontvang je een formulier voor de aangifte van de RDW. Dit stuur je met de BPM-berekening op via de post, of laat beide documenten achter in de aangiftezuil van de Belastingdienst op het keuringsstation. Binnen een aantal dagen ontvang je een betaalbericht. Na betaling geeft de RDW het kentekenbewijs af. Het enige dat dan nog rest is het maken van een kentekenplaat." },
      { q: "Moet ik BPM-aangifte doen voor een bestelauto?", a: "Ja. Voor een bestelauto tot 3.500 kg moet er ook BPM-aangifte worden gedaan. Ben je ondernemer en gebruik je de auto voor meer dan 10% van de kilometers voor je onderneming, dan betaal je geen BPM als de auto jonger is dan 5 jaar. Ben je geen ondernemer en is de auto jonger dan 5 jaar, dan betaal je wel BPM. Na 5 jaar is het te betalen BPM-bedrag € 0. Deze 5 jaar gaat in op de datum eerste toelating in welk land dan ook." },
      { q: "Welke gegevens hebben jullie nodig voor een BPM-aangifte?", a: "Wij hebben je NAW-gegevens nodig, een kopie van de buitenlandse kentekenpapieren, het Certificaat van Overeenstemming (CvO) en de aankoopfactuur." },
      { q: "Kunnen jullie de beste wijze van afdracht vooraf bepalen?", a: "Ja. Wij berekenen vooraf of de forfaitaire tabel, een koerslijst of een taxatierapport de laagste BPM oplevert voor jouw voertuig." },
      { q: "Hoeveel scheelt het als ik de aangifte doe met een taxatierapport?", a: "Dit verschilt per voertuig. Bij schade, hoge kilometerstand of bovengemiddelde slijtage kan een taxatierapport aanzienlijk voordeliger zijn dan de forfaitaire tabel. Wij berekenen dit gratis vooraf." },
      { q: "Is een taxatierapport ook interessant bij jonge én oude auto's?", a: "Ja. Bij jonge auto's is de BPM nog hoog, waardoor schade of slijtage relatief meer oplevert. Bij oudere auto's kan de werkelijke marktwaarde lager liggen dan de forfaitaire berekening suggereert." },
      { q: "Is een taxatierapport ook interessant bij lichte schade, zoals krassen en deuken?", a: "Zeker. Ook lichte schade kan de waarde van het voertuig merkbaar verlagen. Wij beoordelen vooraf of een taxatierapport in jouw situatie zinvol is." },
      { q: "Geen schade, maar wel veel kilometers op de teller. Wat te doen?", a: "Een hoge kilometerstand kan de waarde drukken ten opzichte van de forfaitaire tabel. Een koerslijst of taxatierapport kan dan voordeliger uitpakken. Neem contact op voor een gratis voorberekening." },
      { q: "Hoe werkt de BPM-aangifte op basis van een taxatierapport?", a: "Na de fysieke inspectie stellen wij de rest-BPM vast op basis van de werkelijke staat van het voertuig. Dit rapport dien je in bij de Belastingdienst als onderbouwing van de aangifte. Het rapport is juridisch verdedigbaar." },
      { q: "Wat is belangrijk bij aangifte op basis van een koerslijst?", a: "De koerslijst moet op de dag van de RDW-keuring geldig zijn. Wij controleren welke koerslijst het meest gunstig is voor jouw voertuig en zorgen dat alles correct wordt ingediend." },
      { q: "Hoe gaat de aangifte via de afschrijvingstabel van de Belastingdienst in zijn werk?", a: "De Belastingdienst hanteert een vaste tabel die de afschrijving berekent op basis van de leeftijd van het voertuig. Dit is de eenvoudigste methode, maar niet altijd de voordeligste." },
      { q: "Wat doe ik als de contrataxatie hoger uitvalt?", a: "Je kunt bezwaar maken. Ons rapport is juridisch verdedigbaar en wij ondersteunen je bij bezwaarprocedures." },
      { q: "Voert de Belastingdienst weleens een hertaxatie uit?", a: "Ja. De Belastingdienst kan tot 5 jaar navorderen en een hertaxatie uitvoeren. Bij een hertaxatie ben je verplicht te verschijnen. Zonder aanwezigheid wordt geen fiscaal akkoord verleend." },
      { q: "Hoe zit het met een naheffingsaanslag?", a: "Als de Belastingdienst van mening is dat er te weinig BPM is betaald, kan zij een naheffingsaanslag opleggen. Dit kan tot 5 jaar na de aangifte. Een goed onderbouwd taxatierapport verkleint dit risico." },
      { q: "Wat verstaat de Belastingdienst onder nieuwe of bijna nieuwe voertuigen?", a: "Voertuigen met minder dan 3.000 km op de teller worden door de Belastingdienst als nieuw beschouwd. Op nieuwe voertuigen mag geen afschrijving worden toegepast." },
      { q: "Mag je op auto's van buiten de EU ook aangifte doen met een taxatierapport?", a: "Ja, dat mag. Voor voertuigen van buiten de EU gelden aanvullende eisen. Neem contact op voor advies over jouw specifieke situatie." },
      { q: "Hoe bepaalt de RDW de CO2-uitstoot van een auto buiten de EU?", a: "De RDW hanteert een eigen meetmethode voor voertuigen zonder Europees typegoedkeuring. Dit kan invloed hebben op de BPM-berekening." },
      { q: "Zijn er aanpassingen nodig aan het voertuig bij import binnen de EU?", a: "In principe niet, mits het voertuig al voldoet aan Europese typegoedkeuring. Bij twijfel raden wij aan dit vooraf te controleren bij de RDW." },
      { q: "Hoe kan ik het transport regelen van een import binnen de EU?", a: "Je kunt de auto zelf ophalen of laten transporteren. Automobiel Taxaties heeft connecties die dit voor je kunnen verzorgen." },
      { q: "Welke stappen moet ik nemen na ontvangst van het taxatierapport?", a: "Print het rapport in kleur. Ben je particulier, vul dan je BSN in. Vul de datum van de RDW-keuring in, onderteken het rapport en voeg de aankoopfactuur toe. Stuur alles op naar: Belastingdienst, Postbus 2710, 6401 DE Heerlen." },
    ],
  },
  {
    category: "Verzekeringstaxaties",
    questions: [
      { q: "Hoe lang is een youngtimer- of oldtimer-taxatierapport geldig?", a: "Verzekeringstaxatierapporten zijn doorgaans 2 tot 3 jaar geldig. Check bij jouw verzekeraar naar de exacte geldigheidsduur, want dit verschilt per verzekeraar." },
      { q: "Kunnen jullie taxeren op afstand?", a: "Nee. Wij voeren altijd een fysieke inspectie uit op locatie bij het voertuig. Een taxatie op afstand of op basis van foto's is niet mogelijk en niet erkend." },
    ],
  },
  {
    category: "WEV-taxatie",
    questions: [
      { q: "Hoe wordt de waarde bepaald bij een WEV-taxatie?", a: "De werkelijke economische waarde wordt bepaald op basis van een fysieke inspectie, actuele marktgegevens en de staat van het voertuig. Het rapport is onafhankelijk en officieel erkend." },
    ],
  },
  {
    category: "Algemeen",
    questions: [
      { q: "Wanneer ben je erkend taxateur?", a: "Een erkend taxateur is geregistreerd bij een erkende brancheorganisatie zoals Federatie TMV of VRT Register. Erik Elderson is notarieel beëdigd TMV Register Taxateur en Register Taxateur VRT." },
    ],
  },
];

const categoryIds = faqItems.map((c) => c.category.toLowerCase().replace(/[^a-z]/g, "-"));

const FAQ = () => {
  const [openItems, setOpenItems] = useState<Record<string, boolean>>({});
  const [activeCategory, setActiveCategory] = useState(0);
  const sectionRefs = useRef<(HTMLDivElement | null)[]>([]);

  const toggleItem = (key: string) => {
    setOpenItems((prev) => ({ ...prev, [key]: !prev[key] }));
  };

  const scrollToCategory = (index: number) => {
    setActiveCategory(index);
    sectionRefs.current[index]?.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  return (
    <div className="min-h-screen bg-background">
      <PageMeta
        title="Veelgestelde Vragen over BPM en Taxaties | Automobiel Taxaties"
        description="Antwoorden op de meest gestelde vragen over BPM-aangifte, taxatierapporten, oldtimers, kosten en levertijden."
      />
      <SiteHeader />

      {/* Hero */}
      <section className="relative overflow-hidden flex items-center" style={{ minHeight: 320 }}>
        <div className="absolute inset-0">
          <img src={heroFaq} alt="" className="w-full h-full object-cover" />
          <div className="absolute inset-0" style={{ background: 'rgba(29,60,113,0.60)' }} />
        </div>
        <div className="max-w-7xl mx-auto px-6 lg:px-8 py-20 md:py-28 relative z-10 w-full">
          <span
            className="inline-block mb-3 font-semibold uppercase"
            style={{ fontFamily: "'Inter', sans-serif", fontSize: 11, letterSpacing: '0.15em', color: '#ff751f' }}
          >
            FAQ
          </span>
          <h1
            className="font-bold text-white mb-4"
            style={{ fontFamily: "'Playfair Display', serif", fontSize: 'clamp(32px, 4vw, 48px)', lineHeight: 1.15 }}
          >
            Veelgestelde vragen
          </h1>
          <p style={{ fontFamily: "'Inter', sans-serif", fontSize: 18, color: 'rgba(255,255,255,0.75)', lineHeight: 1.65, maxWidth: 560 }}>
            Alles wat je wilt weten over BPM, verzekeringstaxatie, WEV en schadevaststelling.
          </p>
        </div>
      </section>

      <UspBar />
      <div style={{ height: 4, background: '#ff751f', width: '100%' }} />

      {/* FAQ two-column layout */}
      <section style={{ background: '#f7f8fa', padding: '80px 40px' }}>
        <div className="flex flex-col lg:flex-row" style={{ maxWidth: 1100, margin: '0 auto', gap: 32 }}>

          {/* Sidebar */}
          <aside className="lg:sticky lg:top-8 self-start shrink-0" style={{ flex: '0 0 28%' }}>
            <div style={{ background: '#ffffff', borderRadius: 10, boxShadow: '0 2px 10px rgba(0,0,0,0.07)', padding: 24 }}>
              <span
                className="block mb-4 font-bold uppercase"
                style={{ fontFamily: "'Inter', sans-serif", fontSize: 11, letterSpacing: '0.12em', color: '#8a9bb5' }}
              >
                Categorieën
              </span>
              <div className="space-y-1">
                {faqItems.map((cat, i) => (
                  <button
                    key={i}
                    onClick={() => scrollToCategory(i)}
                    className="block w-full text-left px-3 py-2.5 rounded-md text-sm transition-all"
                    style={{
                      fontFamily: "'Inter', sans-serif",
                      fontSize: 14,
                      fontWeight: activeCategory === i ? 600 : 400,
                      color: activeCategory === i ? '#ff751f' : '#4a5568',
                      borderLeft: activeCategory === i ? '3px solid #ff751f' : '3px solid transparent',
                      background: activeCategory === i ? 'rgba(255,117,31,0.06)' : 'transparent',
                    }}
                  >
                    {cat.category}
                  </button>
                ))}
              </div>

              <div style={{ height: 1, background: '#eef0f3', margin: '20px 0' }} />

              <div style={{ background: '#1d3c71', borderRadius: 8, padding: 20 }}>
                <p className="text-white font-semibold text-sm mb-3" style={{ fontFamily: "'Inter', sans-serif" }}>
                  Staat je vraag er niet bij?
                </p>
                <a href="tel:+31854832461" className="block">
                  <button
                    className="w-full inline-flex items-center justify-center gap-2 font-semibold text-sm rounded-md transition-colors"
                    style={{ height: 40, background: '#ff751f', color: '#ffffff', border: 'none', cursor: 'pointer' }}
                  >
                    <Phone className="w-4 h-4" />
                    Bel 085 483 2461
                  </button>
                </a>
              </div>
            </div>
          </aside>

          {/* Accordion content */}
          <div className="flex-1 min-w-0">
            {faqItems.map((category, catIndex) => (
              <div
                key={catIndex}
                ref={(el) => { sectionRefs.current[catIndex] = el; }}
                style={{ marginTop: catIndex === 0 ? 0 : 56 }}
              >
                {/* Category pill */}
                <div className="flex justify-center mb-6">
                  <span
                    className="inline-block font-bold text-white"
                    style={{
                      fontFamily: "'Playfair Display', serif",
                      fontSize: 18,
                      background: '#1d3c71',
                      borderRadius: 30,
                      padding: '10px 32px',
                    }}
                  >
                    {category.category}
                  </span>
                </div>

                {/* Question cards */}
                <div className="space-y-2">
                  {category.questions.map((item, qIndex) => {
                    const key = `${catIndex}-${qIndex}`;
                    const isOpen = openItems[key] || false;
                    return (
                      <div
                        key={qIndex}
                        style={{
                          background: '#ffffff',
                          borderRadius: 8,
                          boxShadow: '0 2px 8px rgba(0,0,0,0.06)',
                          borderLeft: isOpen ? '3px solid #ff751f' : '3px solid transparent',
                          transition: 'border-color 200ms ease',
                          overflow: 'hidden',
                        }}
                      >
                        <button
                          onClick={() => toggleItem(key)}
                          className="w-full flex items-center justify-between text-left gap-4"
                          style={{ padding: '20px 24px', cursor: 'pointer', background: 'none', border: 'none' }}
                        >
                          <span
                            className="font-semibold"
                            style={{ fontFamily: "'Inter', sans-serif", fontSize: 15, color: '#1d3c71', lineHeight: 1.5 }}
                          >
                            {item.q}
                          </span>
                          <ChevronDown
                            className="shrink-0 transition-transform duration-300"
                            style={{
                              width: 18,
                              height: 18,
                              color: '#698db3',
                              transform: isOpen ? 'rotate(180deg)' : 'rotate(0deg)',
                            }}
                          />
                        </button>
                        <div
                          style={{
                            maxHeight: isOpen ? 500 : 0,
                            opacity: isOpen ? 1 : 0,
                            overflow: 'hidden',
                            transition: 'max-height 300ms ease, opacity 200ms ease',
                          }}
                        >
                          <div style={{ padding: '0 24px 20px 24px' }}>
                            <p style={{ fontFamily: "'Inter', sans-serif", fontSize: 14, color: '#4a5568', lineHeight: 1.7 }}>
                              {item.a}
                            </p>
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA block */}
      <section className="py-16 md:py-20 px-6 md:px-8" style={{ background: '#1d3c71' }}>
        <div className="max-w-3xl mx-auto text-center">
          <h2
            className="font-bold text-white mb-4"
            style={{ fontFamily: "'Playfair Display', serif", fontSize: 'clamp(24px, 3vw, 36px)' }}
          >
            Staat je vraag er niet bij?
          </h2>
          <p className="mb-8" style={{ fontFamily: "'Inter', sans-serif", fontSize: 17, color: 'rgba(255,255,255,0.75)', lineHeight: 1.65 }}>
            Bel ons of stuur een bericht. Wij reageren binnen één werkdag.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link to="/contact">
              <Button variant="cta" size="lg">
                Contact opnemen
              </Button>
            </Link>
            <a href="tel:+31854832461">
              <button className="btn-outline-white">
                <Phone className="w-4 h-4" />
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

export default FAQ;