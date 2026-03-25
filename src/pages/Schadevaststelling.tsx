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
import { ArrowDown, ArrowRight, CheckCircle, Award, Calendar, Info, AlertTriangle, ShieldCheck, TrendingUp, FileCheck } from "lucide-react";
import StatsBar from "@/components/StatsBar";
import heroImage from "@/assets/hero-verzekeringstaxatie.png";

const Schadevaststelling = () => {
  const formRef = useRef<HTMLDivElement>(null);
  const scrollToForm = () => formRef.current?.scrollIntoView({ behavior: "smooth" });

  const wanneerCards = [
    { icon: AlertTriangle, label: "Na een incident", desc: "Aanrijding, storm of vandalisme" },
    { icon: ShieldCheck, label: "Geschil verzekeraar", desc: "Onenigheid over schade-uitkering" },
    { icon: TrendingUp, label: "Aankoop met schade", desc: "Waardebepaling voor of na aankoop" },
    { icon: FileCheck, label: "Juridisch bewijs", desc: "Onderbouwing bij geschillen" },
  ];

  const acceptatieCards = [
    { icon: Award, title: "Federatie TMV en VRT Register", desc: "Aangesloten bij de erkende brancheorganisaties" },
    { icon: CheckCircle, title: "Geaccepteerd door verzekeraars", desc: "Rapporten geaccepteerd door verzekeraars" },
    { icon: Calendar, title: "Onafhankelijk rapport", desc: "Bruikbaar bij geschillen en claims" },
  ];

  return (
    <div className="min-h-screen bg-background">
      <PageMeta title="Schadevaststelling | Onafhankelijke schadebeoordeling | Automobiel Taxaties" description="Onafhankelijke vaststelling van schade aan jouw voertuig. Bruikbaar bij verzekeringsclaims, geschillen of aankoop van een voertuig met schade." />
      <JsonLd data={{ "@context": "https://schema.org", "@type": "Service", "name": "Schadevaststelling", "provider": { "@type": "Organization", "name": "Automobiel Taxaties" }, "areaServed": "Netherlands", "url": "https://www.automobieltaxaties.nl/schadevaststelling" }} />
      <SiteHeader />
      <Breadcrumbs items={[{ label: "Verzekeringstaxatie", href: "/verzekeringstaxatie" }, { label: "Schadevaststelling" }]} />
      <LandingHero
        subtitle="SCHADEVASTSTELLING"
        title="Onafhankelijke vaststelling van schade"
        description={<>Een onafhankelijk rapport dat de schade en waardevermindering vastlegt.<br />Wij komen op locatie bij jouw voertuig.</>}
        ctaText="Schadevaststelling aanvragen"
        onCtaClick={scrollToForm}
        heroImage={heroImage}
        compact
      />
      <UspBar />

      {/* Waarom schadevaststelling */}
      <section className="py-14 md:py-16 px-6 md:px-8" style={{ background: '#f7f8fa' }}>
        <div className="container-wide">
          <div className="grid md:grid-cols-[1fr_0.7fr] gap-8 items-start">
            <div>
              <p className="uppercase text-[12px] font-semibold tracking-[0.15em] mb-2" style={{ color: '#ff751f', fontFamily: "'Inter', sans-serif" }}>WAAROM SCHADEVASTSTELLING</p>
              <h2 className="heading-display text-2xl md:text-3xl font-bold mb-4" style={{ color: '#1d3c71' }}>Waarom een onafhankelijke schadevaststelling?</h2>
              <p className="text-[15px] leading-relaxed mb-5" style={{ color: '#4a5568' }}>
                Bij schade aan jouw voertuig wil je zekerheid over de omvang en de waardevermindering. Een onafhankelijk rapport legt alles vast: de aard en omvang van de schade, de herstelkosten en de eventuele waardevermindering na herstel.
              </p>
              <p className="text-[15px] leading-relaxed" style={{ color: '#4a5568' }}>
                Dit rapport is bruikbaar bij verzekeringsclaims, geschillen met tegenpartijen of bij aankoop van een voertuig met bestaande schade. Onafhankelijk opgesteld, zonder belang bij de uitkomst.
              </p>
            </div>
            <div className="rounded-[12px] p-8 flex flex-col" style={{ background: '#1d3c71' }}>
              <div className="flex items-center justify-center rounded-full mb-4 mx-auto" style={{ width: 48, height: 48, background: 'rgba(255,255,255,0.15)' }}>
                <Info className="w-6 h-6 text-white" />
              </div>
              <p className="text-white font-bold text-[18px] text-center leading-[1.4] mb-4">Onafhankelijk vastgesteld. Bruikbaar bij claims en geschillen.</p>
              <div className="mb-5" style={{ borderBottom: '1px solid rgba(255,255,255,0.2)' }} />
              <div className="space-y-3 mb-6">
                {[
                  "Schadeomvang en herstelkosten vastgelegd",
                  "Waardevermindering na herstel berekend",
                  "Bruikbaar als bewijs bij geschillen",
                ].map((item, i) => (
                  <div key={i} className="flex items-start gap-3">
                    <CheckCircle className="w-4 h-4 flex-shrink-0 mt-0.5" style={{ color: '#ff751f' }} />
                    <span className="text-white text-[14px] leading-snug">{item}</span>
                  </div>
                ))}
              </div>
              <Button variant="cta" className="w-full" onClick={scrollToForm}>
                Schadevaststelling aanvragen
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
              <h2 className="heading-display text-2xl md:text-3xl font-bold mb-3" style={{ color: '#1d3c71' }}>Wanneer is een schadevaststelling nodig?</h2>
              <p className="text-[15px] leading-relaxed" style={{ color: '#4a5568' }}>
                Een onafhankelijke schadevaststelling is relevant bij diverse situaties rondom voertuigschade.
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
                { step: 1, title: "Gegevens aanleveren", desc: "Type, bouwjaar en aard van de schade" },
                { step: 2, title: "Fysieke inspectie", desc: "Schade-inventarisatie op locatie" },
                { step: 3, title: "Schade beoordelen", desc: "Omvang, herstelkosten en waardevermindering" },
                { step: 4, title: "Rapport opstellen", desc: "Onderbouwd met foto's en bevindingen" },
                { step: 5, title: "Oplevering", desc: "Digitaal, klaar voor gebruik" },
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
              Schadevaststelling aanvragen
              <ArrowDown className="w-4 h-4 ml-2" />
            </Button>
          </div>
        </div>
      </section>

      {/* Mid-page CTA */}
      <section className="py-12 md:py-14 px-6 md:px-8" style={{ background: 'linear-gradient(135deg, #1d3c71 0%, #2a4f8a 100%)' }}>
        <div className="container-wide text-center">
          <h2 className="heading-display text-2xl md:text-3xl font-bold text-white mb-3">Schade aan jouw voertuig?</h2>
          <p className="text-[15px] mb-6 max-w-xl mx-auto" style={{ color: 'rgba(255,255,255,0.75)' }}>
            Laat de schade onafhankelijk vaststellen. Wij komen op locatie.
          </p>
          <Button variant="cta" size="lg" onClick={scrollToForm}>
            Schadevaststelling aanvragen
            <ArrowDown className="w-4 h-4 ml-2" />
          </Button>
        </div>
      </section>

      <StatsBar />

      {/* Acceptatie */}
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
          <h2 className="heading-display text-2xl md:text-3xl font-bold text-white mb-3">Zekerheid over de schade aan jouw voertuig?</h2>
          <p className="text-[15px] mb-6" style={{ color: 'rgba(255,255,255,0.75)' }}>
            Vraag vrijblijvend een schadevaststelling aan.
          </p>
          <Button variant="cta" size="lg" onClick={scrollToForm}>
            Schadevaststelling aanvragen
            <ArrowDown className="w-4 h-4 ml-2" />
          </Button>
        </div>
      </section>

      <BekijkOok links={["BPM Taxatie", "WEV Taxatie", "Verzekeringstaxatie"]} />

      {/* Formulier */}
      <section className="py-14 md:py-16 px-6 md:px-8 bg-background" ref={formRef}>
        <div className="container-wide">
          <div className="text-center mb-8">
            <p className="uppercase text-[11px] font-semibold tracking-[0.15em] mb-2" style={{ color: '#ff751f' }}>AANVRAGEN</p>
            <h2 className="heading-display text-2xl md:text-3xl font-bold mb-2" style={{ color: '#1d3c71' }}>Schadevaststelling aanvragen</h2>
            <p className="text-[15px] max-w-2xl mx-auto" style={{ color: '#4a5568' }}>
              Vul het formulier in en wij nemen binnen één werkdag contact met jou op.
            </p>
          </div>
          <div className="grid md:grid-cols-[1fr_380px] gap-8 items-stretch">
            <div>
              <IntakeForm
                serviceType="schadevaststelling"
                formTitle="Schadevaststelling aanvragen"
                formSubtext="Vul onderstaand formulier zo volledig mogelijk in."
                submitButtonText="Schadevaststelling aanvragen"
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

export default Schadevaststelling;