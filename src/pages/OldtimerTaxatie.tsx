import WhatsAppButton from "@/components/WhatsAppButton";
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
import { ArrowDown, ArrowRight, CheckCircle, Award, Calendar, Info, Search, TrendingUp, FileCheck } from "lucide-react";
import StatsBar from "@/components/StatsBar";
import heroOldtimer from "@/assets/hero-oldtimer.png";

const OldtimerTaxatie = () => {
  const formRef = useRef<HTMLDivElement>(null);
  const scrollToForm = () => formRef.current?.scrollIntoView({ behavior: "smooth" });

  const verwachtItems = [
    "De technische en cosmetische staat wordt beoordeeld",
    "Originaliteit, historie en uitvoering worden meegenomen",
    "De waarde wordt vastgelegd op basis van de werkelijke staat",
    "Het rapport is geaccepteerd door verzekeraars",
  ];

  const nodigItems = [
    "Je naam en contactgegevens",
    "De kentekencard van het voertuig",
    "Onderhoudsboekje of servicehistorie (indien aanwezig)",
    "Bijzonderheden in de historie (revisie, restauratie)",
  ];

  const wanneerCards = [
    { icon: Award, label: "Gerestaureerd", desc: "Waarde hoger dan catalogus" },
    { icon: Search, label: "Zeldzaam model", desc: "Beperkte referenties beschikbaar" },
    { icon: TrendingUp, label: "Afwijkende waarde", desc: "Hoger dan standaard bedragen" },
    { icon: FileCheck, label: "Eis verzekeraar", desc: "Verzekeraar vraagt om taxatie" },
  ];

  const acceptatieCards = [
    { icon: Award, title: "Federatie TMV, VRT Register en FEHAC", desc: "Aangesloten bij de erkende brancheorganisaties" },
    { icon: CheckCircle, title: "Geaccepteerd door verzekeraars", desc: "Rapporten geaccepteerd door verzekeraars" },
    { icon: Calendar, title: "Geldigheid 2 tot 3 jaar", desc: "Check bij jouw verzekeraar naar de exacte geldigheidsduur" },
  ];

  return (
    <div className="min-h-screen bg-background">
      <PageMeta
        title="Oldtimer Taxatie | Erkend Rapport | Automobiel Taxaties"
        description="Professionele oldtimer taxatie voor verzekering en waardebepaling. Oog voor detail en historie. Op locatie in het grootste gedeelte van Nederland."
      />
      <SiteHeader />
      <LandingHero
        subtitle="VERZEKERINGSTAXATIE OLDTIMER"
        title="Zekerheid over de waarde van je oldtimer"
        description={<>Met een verzekeringstaxatie leg je de waarde vooraf vast.<br />Wij komen op locatie bij je oldtimer.</>}
        ctaText="Verzekeringstaxatie aanvragen"
        onCtaClick={scrollToForm}
        heroImage={heroOldtimer}
        compact
      />
      <UspBar />

      {/* Waarom taxeren */}
      <section className="py-14 md:py-16 px-6 md:px-8" style={{ background: '#f7f8fa' }}>
        <div className="container-wide">
          <div className="grid md:grid-cols-[1fr_0.7fr] gap-8 items-start">
            <div>
              <p className="uppercase text-[12px] font-semibold tracking-[0.15em] mb-2" style={{ color: '#ff751f', fontFamily: "'Inter', sans-serif" }}>WAAROM TAXEREN</p>
              <h2 className="heading-display text-2xl md:text-3xl font-bold mb-4" style={{ color: '#1d3c71' }}>Waarom een verzekeringstaxatie voor je oldtimer?</h2>
              <p className="text-[15px] leading-relaxed mb-5" style={{ color: '#4a5568' }}>
                Oldtimers zijn wat betreft technische kenmerken en onderhoudsbehoefte niet te vergelijken met moderne auto's. Deze verschillen vertalen zich ook naar de verzekering en betekent dat een oldtimerverzekering op een andere manier wordt samengesteld dan een standaardautoverzekering.
              </p>
              <p className="text-[15px] leading-relaxed mb-5" style={{ color: '#4a5568' }}>
                In het oldtimer taxatierapport leggen wij de soortgelijke waarde vast. Daarin staan alle kenmerken en bijzonderheden van het voertuig, de staat en de eventuele gedane investeringen.
              </p>
              <p className="text-[15px] leading-relaxed" style={{ color: '#4a5568' }}>
                Meestal zijn verzekeraars bereid om gedurende drie jaar de taxatiewaarde aan te houden bij schade. Heb je veel verbeteringen aangebracht tijdens deze periode, dan is het slim jouw voertuig tussentijds opnieuw te laten beoordelen. Informeer bij jouw verzekeringsmaatschappij naar de polisvoorwaarden.
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
                  "Rapport 2 tot 3 jaar geldig, check je verzekeraar",
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
                Een verzekeringstaxatie is relevant wanneer de waarde van je oldtimer niet vanzelfsprekend is voor de verzekeraar.
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
                { step: 1, title: "Gegevens aanleveren", desc: "Type, bouwjaar, historie en bijzonderheden" },
                { step: 2, title: "Fysieke inspectie", desc: "Staat, originaliteit en uitvoering" },
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
            <Link to="/verzekering-stappenplan">
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
          <h2 className="heading-display text-2xl md:text-3xl font-bold text-white mb-3">Verzekeringstaxatie voor je oldtimer?</h2>
          <p className="text-[15px] mb-6 max-w-xl mx-auto" style={{ color: 'rgba(255,255,255,0.75)' }}>
            Vooraf zekerheid over de waarde. Wij plannen de taxatie op locatie bij jou.
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
          <h2 className="heading-display text-2xl md:text-3xl font-bold text-white mb-3">Zekerheid over de waarde van je oldtimer?</h2>
          <p className="text-[15px] mb-6" style={{ color: 'rgba(255,255,255,0.75)' }}>
            Vraag vrijblijvend een verzekeringstaxatie aan.
          </p>
          <Button variant="cta" size="lg" onClick={scrollToForm}>
            Verzekeringstaxatie aanvragen
            <ArrowDown className="w-4 h-4 ml-2" />
          </Button>
        </div>
      </section>

      {/* Formulier */}
      <section className="py-14 md:py-16 px-6 md:px-8 bg-background" ref={formRef}>
        <div className="container-wide">
          <div className="text-center mb-8">
            <p className="uppercase text-[11px] font-semibold tracking-[0.15em] mb-2" style={{ color: '#ff751f' }}>AANVRAGEN</p>
            <h2 className="heading-display text-2xl md:text-3xl font-bold mb-2" style={{ color: '#1d3c71' }}>Verzekeringstaxatie aanvragen</h2>
            <p className="text-[15px] max-w-2xl mx-auto" style={{ color: '#4a5568' }}>
              Vul het formulier in en wij nemen binnen één werkdag contact met je op.
            </p>
          </div>
          <div className="grid md:grid-cols-[1fr_380px] gap-8">
            <div>
              <IntakeForm
                serviceType="oldtimerverzekeringstaxatie"
                formTitle="Verzekeringstaxatie aanvragen"
                formSubtext="Vul onderstaand formulier zo volledig mogelijk in."
                submitButtonText="Verzekeringstaxatie aanvragen"
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

export default OldtimerTaxatie;
