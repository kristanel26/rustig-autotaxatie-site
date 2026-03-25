import WhatsAppButton from "@/components/WhatsAppButton";
import SiteHeader from "@/components/SiteHeader";
import SiteFooter from "@/components/SiteFooter";
import PageMeta from "@/components/PageMeta";
import UspBar from "@/components/UspBar";
import { Link } from "react-router-dom";
import { ArrowRight, AlertTriangle, Info, Phone, CheckCircle } from "lucide-react";
import stepCarShopping from "@/assets/step-car-shopping.jpg";
import heroStappenplanBpm from "@/assets/hero-stappenplan-bpm.jpg";
import stepDocuments from "@/assets/step-documents-needed.png";
import erikHero from "@/assets/erik-bpm-taxatie-hero.jpg";
import stepRdw from "@/assets/step-rdw-inspection.jpg";
import stepHappyOwner from "@/assets/step-happy-car-owner.jpg";
import stepAangifteFormulier from "@/assets/bpm-aangifte-formulier.png";
import stepTransport from "@/assets/step-transport.png";
import stepReportProcessing from "@/assets/step-report-processing.png";
import stepBelastingdienstEmail from "@/assets/step-belastingdienst-email.png";
import stepVehicleParked from "@/assets/step-vehicle-parked.png";

const steps: { number: number; title: string; image?: string; content: React.ReactNode }[] = [
  {
    number: 1,
    image: stepCarShopping,
    title: "Het voertuig",
    content: (
      <p>Heb je al een voertuig op het oog of heb je er al één gekocht in het buitenland? Dan begint het proces hier. Particulieren zoeken vaak via platforms zoals <a href="https://www.mobile.de" target="_blank" rel="noopener noreferrer" className="text-[hsl(var(--primary))] underline hover:no-underline">www.mobile.de</a>, <a href="https://www.autoscout24.de" target="_blank" rel="noopener noreferrer" className="text-[hsl(var(--primary))] underline hover:no-underline">www.autoscout24.de</a>, <a href="https://www.autoscout24.be" target="_blank" rel="noopener noreferrer" className="text-[hsl(var(--primary))] underline hover:no-underline">www.autoscout24.be</a> of <a href="https://www.autoscout24.eu" target="_blank" rel="noopener noreferrer" className="text-[hsl(var(--primary))] underline hover:no-underline">www.autoscout24.eu</a>. Dealers, importeurs en handelaren starten doorgaans vanuit hun eigen inkoopkanalen. In alle gevallen geldt: zodra het voertuig naar Nederland komt, moet BPM worden aangegeven.</p>
    ),
  },
  {
    number: 2,
    image: stepTransport,
    title: "Transport regelen",
    content: (
      <p>Je kunt de auto zelf ophalen of laten transporteren. Automobiel Taxaties heeft connecties die dit voor jou kunnen verzorgen. Heb je hier vragen over? Stel ze gerust.</p>
    ),
  },
  {
    number: 3,
    image: erikHero,
    title: "Laat het voertuig taxeren door Automobiel Taxaties",
    content: (
      <p>Voordat je naar de RDW gaat voor de keuring, laat je het voertuig eerst taxeren. Dit is een belangrijk aandachtspunt: een taxatierapport is alleen geldig als de opname door de taxateur heeft plaatsgevonden binnen één maand voorafgaand aan de RDW-keuring. Is dit niet het geval, dan wordt het rapport afgekeurd en berekent de Belastingdienst de BPM op basis van de forfaitaire afschrijving. Dat is meestal aanzienlijk ongunstiger. Plan je taxatie daarom op tijd. Eerst taxeren, dan keuren.</p>
    ),
  },
  {
    number: 4,
    image: stepRdw,
    title: "Voertuig keuren bij de RDW",
    content: (
      <p>Is het voertuig in Nederland en heb je de buitenlandse kentekenpapieren? Dan moet het voertuig gekeurd worden bij de RDW. Doe dit zo snel mogelijk na de taxatie. Wil je hierbij worden ontzorgd? Laat het ons weten, we helpen graag.</p>
    ),
  },
  {
    number: 5,
    image: stepDocuments,
    title: "Wat hebben wij van je nodig?",
    content: (
      <p>Om de aangifte op te stellen hebben wij je NAW-gegevens nodig, een kopie van de buitenlandse kentekenpapieren en het CvO van de auto, en de aankoopfactuur.</p>
    ),
  },
  {
    number: 6,
    image: stepReportProcessing,
    title: "Wij stellen de BPM aangifte op",
    content: (
      <p>Na de inspectie verwerken wij alle gegevens zorgvuldig tot een compleet rapport. Na afhandeling ontvang je het taxatierapport per e-mail.</p>
    ),
  },
  {
    number: 7,
    image: stepAangifteFormulier,
    title: "Wat doe je na ontvangst van het rapport?",
    content: (
      <>
        <p className="mb-3">Print het rapport in kleur uit. Ben je particulier? Vul dan je BSN in. Vul de datum van de RDW keuring in, onderteken het rapport en voeg de aankoopfactuur toe.</p>
        <p>Stuur alles op naar: <strong>Belastingdienst, Postbus 2710, 6401 DE Heerlen</strong>.</p>
      </>
    ),
  },
  {
    number: 8,
    image: stepVehicleParked,
    title: "Laat het voertuig in getaxeerde staat",
    content: (
      <>
        <p className="mb-3">Je dient het voertuig 6 werkdagen in exact dezelfde staat te laten als op het moment van taxatie. Herstel dus geen schade, poets niet bij en voer geen wijzigingen door.</p>
        <p className="mb-4">Let op: deze 6 werkdagen gaan pas in op de dag dat de Belastingdienst de BPM-aangifte ontvangt, niet op de dag dat jij die verstuurt.</p>
        <div
          className="flex gap-3 items-start"
          style={{ background: '#EBF2FB', borderLeft: '4px solid #1d3c71', borderRadius: 8, padding: '16px 20px' }}
        >
          <Info className="w-5 h-5 shrink-0 mt-0.5" style={{ color: '#1d3c71' }} />
          <p className="text-sm font-medium" style={{ color: '#1d3c71' }}>
            Wordt het voertuig toch aangepast of gerepareerd binnen deze periode? Dan kan de Belastingdienst de taxatie ongeldig verklaren en de BPM opnieuw vaststellen op basis van de forfaitaire tabel.
          </p>
        </div>
      </>
    ),
  },
  {
    number: 9,
    image: stepBelastingdienstEmail,
    title: "Betaalbericht van de Belastingdienst",
    content: (
      <p>Je ontvangt een betaalbericht van de Belastingdienst per e-mail. Je mag de betaaldatum zelf bepalen. Hoe eerder de betaling is afgehandeld, hoe sneller je het voertuig op Nederlands kenteken hebt.</p>
    ),
  },
  {
    number: 10,
    image: stepHappyOwner,
    title: "Kenteken ontvangen",
    content: (
      <p>Na betaling geeft de Belastingdienst het fiscaal akkoord af aan de RDW. Je ontvangt het nieuwe kenteken en de kentekencard. Het enige wat je dan nog hoeft te doen is een set kentekenplaten laten maken en monteren.</p>
    ),
  },
];

const StappenplanBpmAangifte = () => {
  return (
    <>
      <PageMeta
        title="Stappenplan BPM aangifte | Automobiel Taxaties"
        description="Bekijk het volledige stappenplan voor een BPM aangifte. Van auto zoeken tot kenteken ontvangen, wij begeleiden je door het hele proces."
      />
      <SiteHeader />
      <Breadcrumbs items={[{ label: "BPM Taxatie", href: "/bpm-taxatie" }, { label: "Stappenplan" }]} />

      {/* Hero */}
      <section className="relative overflow-hidden flex items-center" style={{ height: 420, minHeight: 420, maxHeight: 420 }}>
        <div className="absolute inset-0">
          <img src={heroStappenplanBpm} alt="" className="w-full h-full object-cover" />
          <div className="absolute inset-0" style={{ background: 'rgba(29,60,113,0.60)' }} />
        </div>
        <div className="max-w-7xl mx-auto px-6 lg:px-8 py-20 md:py-28 relative z-10">
          <p className="text-white/70 text-sm font-medium tracking-wider uppercase mb-4">BPM Aangifte</p>
          <h1
            className="text-white font-bold mb-6"
            style={{ fontFamily: "'Playfair Display', serif", fontSize: 'clamp(2rem, 4vw, 3.2rem)', lineHeight: 1.15 }}
          >
            Stappenplan BPM aangifte
          </h1>
          <p className="text-white/80 text-lg max-w-[550px] mb-8" style={{ lineHeight: 1.7 }}>
            Hoe verloopt een BPM aangifte?
          </p>
          <div className="flex flex-col sm:flex-row gap-3">
            <Link to="/contact">
              <button className="btn-cta flex items-center gap-2">
                Afspraak inplannen
                <ArrowRight className="w-4 h-4" />
              </button>
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
      <UspBar />

      {/* Steps Timeline */}
      {steps.map((step, i) => (
        <div key={step.number}>
          <section
            className="py-12 md:py-16"
            style={{ background: i % 2 === 1 ? '#f7f8fa' : '#ffffff' }}
          >
            <div className="max-w-5xl mx-auto px-6 lg:px-8">
              <div className={`flex gap-6 md:gap-10 ${step.image ? 'flex-col md:flex-row md:items-start' : ''}`}>
                {/* Step number + text */}
                <div className="flex gap-5 md:gap-6 flex-1 min-w-0">
                  <div className="shrink-0">
                    <div
                      className="w-12 h-12 rounded-full flex items-center justify-center text-white font-bold text-lg"
                      style={{ background: '#1d3c71' }}
                    >
                      {step.number}
                    </div>
                  </div>
                  <div className="flex-1">
                    <h2 className="text-xl md:text-2xl font-bold mb-4" style={{ color: '#1d3c71', fontFamily: "'Playfair Display', serif" }}>
                      {step.title}
                    </h2>
                    <div className="text-foreground/80 leading-relaxed">
                      {step.content}
                    </div>
                  </div>
                </div>
                {/* Optional image */}
                {step.image && (
                  <div className="shrink-0 md:w-[360px] h-[240px]">
                    <img
                      src={step.image}
                      alt={step.title}
                      className="w-full h-full rounded-lg shadow-md object-cover"
                      loading="lazy"
                    />
                  </div>
                )}
              </div>
            </div>
          </section>

          {/* Attention block after step 2 */}
          {step.number === 2 && (
            <div className="max-w-5xl mx-auto px-6 lg:px-8 py-6">
              <div
                className="rounded-xl p-6 flex gap-4 items-start"
                style={{ background: '#FFF8E1', borderLeft: '4px solid #FF751F' }}
              >
                <AlertTriangle className="w-6 h-6 shrink-0 mt-0.5" style={{ color: '#FF751F' }} />
                <p className="text-sm font-medium" style={{ color: '#5D4E37' }}>
                  Vanaf dit moment dienen alle onderstaande stappen binnen één maand te zijn afgerond.
                </p>
              </div>
            </div>
          )}
        </div>
      ))}


      {/* Verwachten + Nodig */}
      <section className="py-14 md:py-16 px-6 md:px-8 bg-white">
        <div className="max-w-5xl mx-auto">
          <div className="grid md:grid-cols-2 gap-12">
            <div>
              <div className="mb-3" style={{ width: 40, height: 4, background: '#ff751f', borderRadius: 2 }} />
              <h3 className="font-bold mb-6" style={{ fontFamily: 'Playfair Display, serif', fontSize: 20, color: '#1d3c71', fontWeight: 700 }}>Wat kun je verwachten?</h3>
              <div className="flex flex-col gap-[10px]">
                {[
                  "Onafhankelijke beoordeling per voertuig",
                  "Duidelijke uitleg over de gekozen methode",
                  "Onderbouwing die standhoudt bij controle",
                  "Geen wensbedragen of vooraf bepaalde uitkomsten",
                ].map((item, i) => (
                  <div key={i} className="flex items-center gap-4 bg-white" style={{ borderRadius: 10, padding: '16px 20px', boxShadow: '0 2px 12px rgba(0,0,0,0.06)' }}>
                    <CheckCircle className="w-[22px] h-[22px] flex-shrink-0" style={{ color: '#ff751f' }} />
                    <span className="text-[15px] leading-normal" style={{ fontFamily: 'Inter, sans-serif', color: '#1a1a1a' }}>{item}</span>
                  </div>
                ))}
              </div>
            </div>
            <div>
              <div className="mb-3" style={{ width: 40, height: 4, background: '#ff751f', borderRadius: 2 }} />
              <h3 className="font-bold mb-6" style={{ fontFamily: 'Playfair Display, serif', fontSize: 20, color: '#1d3c71', fontWeight: 700 }}>Wat hebben wij nodig?</h3>
              <div className="flex flex-col gap-[10px]">
                {[
                  "Buitenlands kenteken of chassisnummer",
                  "Aankoopfactuur van het voertuig",
                  "Actuele kilometerstand",
                  "Info over schade, gebruik en onderhoud",
                ].map((item, i) => (
                  <div key={i} className="flex items-center gap-4 bg-white" style={{ borderRadius: 10, padding: '16px 20px', boxShadow: '0 2px 12px rgba(0,0,0,0.06)' }}>
                    <CheckCircle className="w-[22px] h-[22px] flex-shrink-0" style={{ color: '#ff751f' }} />
                    <span className="text-[15px] leading-normal" style={{ fontFamily: 'Inter, sans-serif', color: '#1a1a1a' }}>{item}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Info block after all steps */}
      <div className="max-w-5xl mx-auto px-6 lg:px-8 py-8">
        <div
          className="rounded-xl p-6 flex gap-4 items-start"
          style={{ background: '#EBF2FB', borderLeft: '4px solid #1d3c71' }}
        >
          <Info className="w-6 h-6 shrink-0 mt-0.5" style={{ color: '#1d3c71' }} />
          <div className="text-sm leading-relaxed" style={{ color: '#1d3c71' }}>
            <p className="mb-2">BPM aangiftes zijn maximaal één maand geldig na het inspectiemoment.</p>
            <p className="mb-2">Word je opgeroepen voor een hertaxatie, dan ben je verplicht te verschijnen. Zonder aanwezigheid wordt geen fiscaal akkoord verleend.</p>
            <p>Houd er rekening mee dat het volledige proces binnen één maand moet zijn afgerond.</p>
          </div>
        </div>
      </div>

      {/* Dark blue CTA block */}
      <section className="py-16 md:py-20" style={{ background: '#1d3c71' }}>
        <div className="max-w-3xl mx-auto px-6 lg:px-8 text-center">
          <h2
            className="text-white font-bold mb-6"
            style={{ fontFamily: "'Playfair Display', serif", fontSize: 'clamp(1.5rem, 3vw, 2.2rem)' }}
          >
            Klaar om te starten?
          </h2>
          <p className="text-white/80 text-lg mb-8">
            Plan je taxatie op tijd in en voorkom onnodige kosten.
          </p>
          <Link to="/contact">
            <button className="btn-cta flex items-center gap-2 mx-auto">
              Afspraak inplannen
              <ArrowRight className="w-4 h-4" />
            </button>
          </Link>
        </div>
      </section>

      <SiteFooter />
      <WhatsAppButton />
    </>
  );
};

export default StappenplanBpmAangifte;
