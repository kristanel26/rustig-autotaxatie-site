import WhatsAppButton from "@/components/WhatsAppButton";
import BekijkOok from "@/components/BekijkOok";
import Breadcrumbs from "@/components/Breadcrumbs";
import JsonLd from "@/components/JsonLd";
import { useRef } from "react";
import { Link } from "react-router-dom";
import LandingHero from "@/components/LandingHero";
import IntakeForm from "@/components/IntakeForm";
import ContactSidebar from "@/components/ContactSidebar";
import SiteHeader from "@/components/SiteHeader";
import SiteFooter from "@/components/SiteFooter";
import PageMeta from "@/components/PageMeta";
import UspBar from "@/components/UspBar";
import { Button } from "@/components/ui/button";
import { ArrowDown, ArrowRight, CheckCircle, Award, Calendar, Wrench, Hammer, TrendingUp, FileCheck, Info } from "lucide-react";
import StatsBar from "@/components/StatsBar";
import heroCamper from "@/assets/hero-camper-new.jpg";

const CamperTaxatie = () => {
  const formRef = useRef<HTMLDivElement>(null);

  const scrollToForm = () => {
    formRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  const verwachtItems = [
    "De technische en cosmetische staat wordt beoordeeld",
    "Aanpassingen, accessoires en zelfbouw worden meegenomen",
    "De waarde wordt vastgelegd op basis van de werkelijke staat",
    "Het rapport is geaccepteerd door verzekeraars",
  ];

  const nodigItems = [
    "Jouw naam en contactgegevens",
    "De kentekencard van het voertuig",
    "Onderhoudsboekje of servicehistorie (indien aanwezig)",
    "Facturen van aanpassingen, accessoires of zelfbouw",
  ];

  const wanneerCards = [
    { icon: Wrench, label: "Aanpassingen", desc: "Extra's of accessoires ingebouwd" },
    { icon: Hammer, label: "Zelfbouw", desc: "Bijzondere of eigen uitvoeringen" },
    { icon: TrendingUp, label: "Afwijkende waarde", desc: "Hoger dan standaard bedragen" },
    { icon: FileCheck, label: "Eis verzekeraar", desc: "Verzekeraar vraagt om taxatie" },
  ];

  const acceptatieCards = [
    { icon: Award, title: "Federatie TMV, VRT Register en FEHAC", desc: "Aangesloten bij de erkende brancheorganisaties" },
    { icon: CheckCircle, title: "Geaccepteerd door verzekeraars", desc: "Rapporten geaccepteerd door verzekeraars" },
    { icon: Calendar, title: "Geldigheid 3 tot 5 jaar", desc: "Check bij jouw verzekeraar naar de exacte geldigheidsduur" },
  ];

  return (
    <div className="min-h-screen bg-background">
      <PageMeta
        title="Camper Taxatie | Erkende Waardebepaling | Automobiel Taxaties"
        description="Professionele camper taxatie door een specialist in de campermarkt. Erkend rapport voor jou verzekeringspolis. Op locatie bij jouw camper."
      />
      <JsonLd data={{ "@context": "https://schema.org", "@type": "Service", "name": "Camper Taxatie", "provider": { "@type": "Organization", "name": "Automobiel Taxaties" }, "areaServed": "Netherlands", "url": "https://www.automobieltaxaties.nl/camper-taxatie" }} />
      <SiteHeader />
      <Breadcrumbs items={[{ label: "Verzekeringstaxatie", href: "/verzekeringstaxatie" }, { label: "Camper" }]} />
      <LandingHero
        subtitle="VERZEKERINGSTAXATIE CAMPER"
        title="Zekerheid over de waarde van jouw camper"
        description="Met een verzekeringstaxatie leg jij de waarde vooraf vast. Wij komen op locatie bij jouw camper."
        ctaText="Verzekeringstaxatie aanvragen"
        onCtaClick={scrollToForm}
        heroImage={heroCamper}
        compact
      />
      <UspBar />

      {/* Waarom taxeren */}
      <section className="py-14 md:py-16 px-6 md:px-8" style={{ background: '#f7f8fa' }}>
        <div className="container-wide">
          <div className="grid md:grid-cols-[1fr_0.7fr] gap-8 items-start">
            <div>
              <p className="uppercase text-[12px] font-semibold tracking-[0.15em] mb-2" style={{ color: '#ff751f', fontFamily: "'Inter', sans-serif" }}>WAAROM TAXEREN</p>
              <h2 className="heading-display text-2xl md:text-3xl font-bold mb-4" style={{ color: '#1d3c71' }}>Waarom een verzekeringstaxatie voor jouw camper?</h2>
              <p className="text-[15px] leading-relaxed mb-5" style={{ color: '#4a5568' }}>
                Je hebt net een nieuwe camper gekocht of na maanden klussen is jouw zelfbouw camper eindelijk klaar. Je staat er wellicht niet direct bij stil, maar jouw camper kan op verschillende manieren schade oplopen. Bijvoorbeeld door brand of storm, inbraak, vandalisme of een aanrijding. Een kloppend taxatierapport en een goede verzekering zijn dus belangrijk om zorgeloos op pad te gaan.
              </p>
              <p className="text-[15px] leading-relaxed" style={{ color: '#4a5568' }}>
                Bij veel verzekeraars is een taxatierapport vereist wanneer de waarde van een camper afwijkt van standaard verzekeringsbedragen. Met een taxatierapport wordt de waarde vooraf vastgelegd, zodat bij schade of diefstal geen discussie ontstaat.
              </p>
            </div>
            <div className="rounded-[12px] p-8 flex flex-col" style={{ background: '#1d3c71' }}>
              <div className="flex items-center justify-center rounded-full mb-4 mx-auto" style={{ width: 48, height: 48, background: 'rgba(255,255,255,0.15)' }}>
                <Info className="w-6 h-6 text-white" />
              </div>
              <p className="text-white font-bold text-[18px] text-center leading-[1.4] mb-4">De waarde staat vooraf vast. Geen discussie bij schade of diefstal.</p>
              <div className="mb-5" style={{ borderBottom: '1px solid rgba(255,255,255,0.2)' }} />
              <div className="space-y-3 mb-6">
                {[
                  "Uitkering op taxatiewaarde, niet dagwaarde",
                  "Premie betalen over de juiste waarde",
                  "Rapport 2 tot 3 jaar geldig, check jouw verzekeraar",
                ].map((item, i) => (
                  <div key={i} className="flex items-start gap-3">
                    <CheckCircle className="w-4 h-4 flex-shrink-0 mt-0.5" style={{ color: '#ff751f' }} />
                    <span className="text-white text-[14px] leading-snug">{item}</span>
                  </div>
                ))}
              </div>
              <Button variant="cta" className="w-full" onClick={scrollToForm}>
                Verzekeringstaxatie aanvragen
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Wanneer nodig */}
      <section className="py-14 md:py-16 px-6 md:px-8 bg-background">
        <div className="container-wide">
          <div className="grid md:grid-cols-2 gap-8 items-center">
            <div>
              <div className="w-[40px] h-[3px] mb-3" style={{ background: '#ff751f' }} />
              <p className="uppercase text-[11px] font-semibold tracking-[0.15em] mb-2" style={{ color: '#ff751f' }}>WANNEER NODIG</p>
              <h2 className="heading-display text-2xl md:text-3xl font-bold mb-3" style={{ color: '#1d3c71' }}>Wanneer is een taxatie nodig?</h2>
              <p className="text-[15px] leading-relaxed" style={{ color: '#4a5568' }}>
                Een verzekeringstaxatie is relevant wanneer de waarde van jouw camper niet vanzelfsprekend is voor de verzekeraar.
              </p>
            </div>
            <div className="grid grid-cols-2 gap-4">
              {wanneerCards.map((item, i) => (
                <div
                  key={i}
                  className="bg-white rounded-[12px] p-6 text-center cursor-default transition-all duration-200 hover:-translate-y-[2px]"
                  style={{ boxShadow: '0 4px 16px rgba(0,0,0,0.08)' }}
                >
                  <div className="w-[48px] h-[48px] rounded-full flex items-center justify-center mx-auto mb-3" style={{ background: '#EBF2FB' }}>
                    <item.icon className="w-[22px] h-[22px]" style={{ color: '#1d3c71' }} />
                  </div>
                  <p className="font-bold text-[15px] mb-1" style={{ fontFamily: "'Inter', sans-serif", color: '#1d3c71' }}>{item.label}</p>
                  <p style={{ fontFamily: "'Inter', sans-serif", fontSize: 13, color: '#666' }}>{item.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Werkwijze */}
      <section className="py-14 md:py-16 px-6 md:px-8" style={{ background: '#f7f8fa' }}>
        <div className="container-wide">
          <div className="text-center mb-8">
            <p className="uppercase text-[11px] font-semibold tracking-[0.15em] mb-2" style={{ color: '#ff751f' }}>WERKWIJZE</p>
            <h2 className="heading-display text-2xl md:text-3xl font-bold" style={{ color: '#1d3c71' }}>Onze werkwijze in 5 stappen</h2>
          </div>
          <div className="relative">
            <div className="hidden md:block absolute top-[26px] left-[10%] right-[10%] h-[2px]" style={{ background: '#ff751f' }} />
            <div className="grid md:grid-cols-5 gap-5 relative">
              {[
                { step: 1, title: "Gegevens aanleveren", desc: "Type, bouwjaar en gebruik van de camper" },
                { step: 2, title: "Fysieke inspectie", desc: "Staat, uitvoering, opties en bijzonderheden" },
                { step: 3, title: "Waarde vaststellen", desc: "Op basis van inspectie en marktgegevens" },
                { step: 4, title: "Rapport opstellen", desc: "Duidelijk hoe de waarde tot stand is gekomen" },
                { step: 5, title: "Oplevering", desc: "Digitaal, klaar voor de verzekeraar" },
              ].map((s) => (
                <div key={s.step} className="text-center relative z-10">
                  <div className="w-[52px] h-[52px] rounded-full flex items-center justify-center mx-auto mb-3 text-white font-bold text-[20px]" style={{ background: '#1d3c71' }}>
                    {s.step}
                  </div>
                  <h4 className="font-bold text-[15px] mb-1" style={{ fontFamily: "'Inter', sans-serif", color: '#1d3c71' }}>{s.title}</h4>
                  <p className="text-[13px] leading-relaxed" style={{ color: '#666' }}>{s.desc}</p>
                </div>
              ))}
            </div>
          </div>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mt-10">
            <Button variant="cta" size="lg" onClick={scrollToForm}>
              Verzekeringstaxatie aanvragen
              <ArrowDown className="w-4 h-4 ml-2" />
            </Button>
            <Link to="/camper-taxatie-stappenplan">
              <Button variant="outline" size="lg" className="border-2 font-medium" style={{ borderColor: '#1d3c71', color: '#1d3c71' }}>
                Bekijk het volledige stappenplan
                <ArrowRight className="w-4 h-4 ml-2" />
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Mid-page CTA */}
      <section className="py-12 md:py-14 px-6 md:px-8" style={{ background: 'linear-gradient(135deg, #1d3c71 0%, #2a4f8a 100%)' }}>
        <div className="container-wide text-center">
          <h2 className="heading-display text-2xl md:text-3xl font-bold text-white mb-3">Verzekeringstaxatie voor jouw camper?</h2>
          <p className="text-[15px] mb-6 max-w-xl mx-auto" style={{ color: 'rgba(255,255,255,0.75)' }}>
            Vooraf zekerheid over de waarde. Wij plannen de taxatie op locatie bij jouw camper.
          </p>
          <Button variant="cta" size="lg" onClick={scrollToForm}>
            Verzekeringstaxatie aanvragen
            <ArrowDown className="w-4 h-4 ml-2" />
          </Button>
        </div>
      </section>

      <StatsBar />

      {/* Acceptatie — 3 kaartjes */}
      <section className="py-14 md:py-16 px-6 md:px-8" style={{ background: '#f7f8fa' }}>
        <div className="container-wide">
          <div className="text-center mb-8">
            <p className="uppercase text-[11px] font-semibold tracking-[0.15em] mb-2" style={{ color: '#ff751f' }}>ACCEPTATIE</p>
            <h2 className="heading-display text-[22px] font-bold" style={{ color: '#1d3c71' }}>Acceptatie en geldigheid</h2>
          </div>
          <div className="grid md:grid-cols-3 gap-6 max-w-4xl mx-auto">
            {acceptatieCards.map((card, i) => (
              <div
                key={i}
                className="bg-white rounded-[12px] p-7 text-center transition-all duration-200 hover:-translate-y-[3px]"
                style={{ boxShadow: '0 4px 20px rgba(0,0,0,0.08)' }}
              >
                <div className="w-[56px] h-[56px] rounded-full flex items-center justify-center mx-auto mb-4" style={{ background: '#EBF2FB' }}>
                  <card.icon className="w-6 h-6" style={{ color: '#1d3c71' }} />
                </div>
                <h3 className="font-bold text-[17px] mb-2" style={{ fontFamily: "'Inter', sans-serif", color: '#1d3c71' }}>{card.title}</h3>
                <p style={{ fontFamily: "'Inter', sans-serif", fontSize: 14, color: '#555', lineHeight: 1.65 }}>{card.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Bottom CTA */}
      <section className="py-12 md:py-14 px-6 md:px-8" style={{ background: 'linear-gradient(135deg, #1d3c71 0%, #2a4f8a 100%)' }}>
        <div className="container-wide text-center">
          <h2 className="heading-display text-2xl md:text-3xl font-bold text-white mb-3">Zekerheid over de waarde van jouw camper?</h2>
          <p className="text-[15px] mb-6" style={{ color: 'rgba(255,255,255,0.75)' }}>
            Vraag vrijblijvend een verzekeringstaxatie aan.
          </p>
          <Button variant="cta" size="lg" onClick={scrollToForm}>
            Verzekeringstaxatie aanvragen
            <ArrowDown className="w-4 h-4 ml-2" />
          </Button>
        </div>
      </section>

      <BekijkOok links={["Oldtimer taxatie", "Motor taxatie", "BPM Taxatie"]} />

      {/* Formulier */}
      <section className="py-14 md:py-16 px-6 md:px-8 bg-background" ref={formRef}>
        <div className="container-wide">
          <div className="text-center mb-8">
            <p className="uppercase text-[11px] font-semibold tracking-[0.15em] mb-2" style={{ color: '#ff751f' }}>AANVRAGEN</p>
            <h2 className="heading-display text-2xl md:text-3xl font-bold mb-2" style={{ color: '#1d3c71' }}>Verzekeringstaxatie aanvragen</h2>
            <p className="text-[15px] max-w-2xl mx-auto" style={{ color: '#4a5568' }}>
              Vul het formulier in en wij nemen binnen één werkdag contact met jou op.
            </p>
          </div>
          <div className="grid md:grid-cols-[1fr_380px] gap-8 items-stretch">
            <div>
              <IntakeForm
                serviceType="camperverzekeringstaxatie"
                formTitle="Verzekeringstaxatie aanvragen"
                formSubtext="Vul onderstaand formulier zo volledig mogelijk in."
                submitButtonText="Verzekeringstaxatie aanvragen"
                styledKenteken
              />
            </div>
            <ContactSidebar />
          </div>
        </div>
      </section>

      <SiteFooter />
      <WhatsAppButton />
    </div>
  );
};

export default CamperTaxatie;
