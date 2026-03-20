import { useRef } from "react";
import { Link } from "react-router-dom";
import LandingHero from "@/components/LandingHero";
import IntakeForm from "@/components/IntakeForm";
import ContactSidebar from "@/components/ContactSidebar";
import SiteHeader from "@/components/SiteHeader";
import SiteFooter from "@/components/SiteFooter";
import WhatsAppButton from "@/components/WhatsAppButton";
import PageMeta from "@/components/PageMeta";
import UspBar from "@/components/UspBar";
import { Button } from "@/components/ui/button";
import { ArrowDown, ArrowRight, CheckCircle, Shield, Star, Award, Calendar } from "lucide-react";
import heroCamper from "@/assets/hero-camper.jpg";

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
    "Je naam en contactgegevens",
    "De kentekencard van het voertuig",
    "Onderhoudsboekje of servicehistorie (indien aanwezig)",
    "Facturen van aanpassingen, accessoires of zelfbouw",
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
        description="Professionele camper taxatie door een specialist in de campermarkt. Erkend rapport voor je verzekeringspolis. Op locatie bij je camper."
      />
      <SiteHeader />
      <LandingHero
        subtitle="VERZEKERINGSTAXATIE CAMPER"
        title="Zekerheid over de waarde van je camper"
        description="Je camper is meer dan alleen een voertuig. Met een verzekeringstaxatie leg je vast wat het op dit moment werkelijk waard is. Die waarde vormt de basis voor de verzekering, zodat je bij schade of diefstal niet afhankelijk bent van een dagwaarde."
        ctaText="Verzekeringstaxatie aanvragen"
        onCtaClick={scrollToForm}
        heroImage={heroCamper}
      />
      <UspBar />

      {/* Korte intro */}
      <section className="py-14 md:py-16 px-6 md:px-8" style={{ background: '#f0f4f8' }}>
        <div className="container-wide">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-2xl md:text-3xl font-semibold mb-3">Waarom een verzekeringstaxatie voor je camper?</h2>
            <p className="text-[15px] leading-relaxed" style={{ color: '#4a5568' }}>
              Bij veel verzekeraars is een taxatierapport vereist wanneer de waarde van een camper afwijkt van standaard verzekeringsbedragen. Met een taxatierapport wordt de waarde vooraf vastgelegd, zodat bij schade of diefstal geen discussie ontstaat.
            </p>
          </div>
        </div>
      </section>

      {/* Voor wie */}
      <section className="py-14 md:py-16 px-6 md:px-8 bg-background">
        <div className="container-wide">
          <div className="grid md:grid-cols-2 gap-8 items-center">
            <div>
              <p className="uppercase text-[11px] font-semibold tracking-[0.12em] text-cta mb-2">Wanneer nodig</p>
              <h2 className="text-2xl md:text-3xl font-semibold mb-3">Wanneer is een taxatie nodig?</h2>
              <p className="text-[15px] leading-relaxed" style={{ color: '#4a5568' }}>
                Een verzekeringstaxatie is relevant wanneer de waarde van je camper niet vanzelfsprekend is voor de verzekeraar.
              </p>
            </div>
            <div className="grid grid-cols-2 gap-4">
              {[
                { label: "Aanpassingen", desc: "Extra's of accessoires ingebouwd" },
                { label: "Zelfbouw", desc: "Bijzondere of eigen uitvoeringen" },
                { label: "Afwijkende waarde", desc: "Hoger dan standaard bedragen" },
                { label: "Eis verzekeraar", desc: "Verzekeraar vraagt om taxatie" },
              ].map((item, i) => (
                <div
                  key={i}
                  className="card-elevated p-5 text-center cursor-default transition-transform duration-200 hover:-translate-y-1"
                >
                  <p className="text-sm font-semibold text-foreground">{item.label}</p>
                  <p className="text-xs mt-0.5" style={{ color: '#4a5568' }}>{item.desc}</p>
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
            <p className="uppercase text-[11px] font-semibold tracking-[0.12em] text-cta mb-2">Werkwijze</p>
            <h2 className="text-2xl md:text-3xl font-semibold">Onze werkwijze in 5 stappen</h2>
          </div>
          <div className="relative">
            {/* Verbindingslijn */}
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
                  <div
                    className="w-[52px] h-[52px] rounded-full flex items-center justify-center mx-auto mb-3 text-white font-bold text-[20px]"
                    style={{ background: '#1d3c71' }}
                  >
                    {s.step}
                  </div>
                  <h4 className="font-semibold text-sm mb-1 text-foreground">{s.title}</h4>
                  <p className="text-xs leading-relaxed" style={{ color: '#666' }}>{s.desc}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Knoppen onder stappenplan */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mt-10">
            <Button variant="cta" size="lg" onClick={scrollToForm}>
              Verzekeringstaxatie aanvragen
              <ArrowDown className="w-4 h-4 ml-2" />
            </Button>
            <Link to="/camper-taxatie-stappenplan">
              <Button
                variant="outline"
                size="lg"
                className="border-2 font-medium"
                style={{ borderColor: '#1d3c71', color: '#1d3c71' }}
              >
                Bekijk het volledige stappenplan
                <ArrowRight className="w-4 h-4 ml-2" />
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Mid-page CTA */}
      <section className="py-12 md:py-14 px-6 md:px-8" style={{ background: '#1d3c71' }}>
        <div className="container-wide text-center">
          <h2 className="text-2xl md:text-3xl font-semibold text-white mb-3">Verzekeringstaxatie voor je camper?</h2>
          <p className="text-[15px] mb-6 max-w-xl mx-auto" style={{ color: 'rgba(255,255,255,0.75)' }}>
            Vooraf zekerheid over de waarde. Wij plannen de taxatie op locatie bij je camper.
          </p>
          <Button variant="cta" size="lg" onClick={scrollToForm}>
            Verzekeringstaxatie aanvragen
            <ArrowDown className="w-4 h-4 ml-2" />
          </Button>
        </div>
      </section>

      {/* Reviews placeholder */}
      <section className="py-10 md:py-12 px-6 md:px-8 bg-background">
        <div className="container-wide">
          <div className="max-w-3xl mx-auto text-center">
            <p className="text-sm font-medium" style={{ color: '#4a5568' }}>[REVIEWS AANLEVEREN DOOR OPDRACHTGEVER]</p>
          </div>
        </div>
      </section>

      {/* Trust balk */}
      <section className="py-6 px-6 md:px-8" style={{ background: '#f0f4f8' }}>
        <div className="container-wide">
          <div className="flex flex-wrap justify-center gap-6 md:gap-14 items-center">
            <div className="flex items-center gap-2">
              <div className="flex">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-3.5 h-3.5 fill-cta text-cta" />
                ))}
              </div>
              <span className="text-sm font-semibold text-foreground">4.9 / 5</span>
              <span className="text-xs" style={{ color: '#4a5568' }}>Google Reviews</span>
            </div>
            <div className="text-center">
              <span className="text-lg font-bold text-foreground">25.000+</span>
              <span className="text-xs ml-1" style={{ color: '#4a5568' }}>voertuigen getaxeerd</span>
            </div>
            <div className="text-center">
              <span className="text-lg font-bold text-foreground">13 jaar</span>
              <span className="text-xs ml-1" style={{ color: '#4a5568' }}>ervaring</span>
            </div>
            <div className="text-center">
              <span className="text-lg font-bold text-foreground">Landelijk</span>
              <span className="text-xs ml-1" style={{ color: '#4a5568' }}>actief</span>
            </div>
          </div>
        </div>
      </section>

      {/* Verwachtingen + Nodig */}
      <section className="py-14 md:py-16 px-6 md:px-8 bg-background">
        <div className="container-wide">
          <div className="grid md:grid-cols-2 gap-8">
            <div>
              <div className="w-[40px] h-[3px] mb-3" style={{ background: '#ff751f' }} />
              <h2 className="heading-display text-[22px] font-bold mb-5" style={{ color: '#1d3c71' }}>Wat kun je verwachten?</h2>
              <div className="space-y-[10px]">
                {verwachtItems.map((item, i) => (
                  <div key={i} className="flex items-center gap-4 bg-white rounded-[10px] px-5 py-[18px]" style={{ boxShadow: '0 2px 12px rgba(0,0,0,0.06)' }}>
                    <CheckCircle className="w-[22px] h-[22px] flex-shrink-0" style={{ color: '#ff751f' }} />
                    <span style={{ fontFamily: "'Inter', sans-serif", fontSize: 15, color: '#333', lineHeight: 1.5 }}>{item}</span>
                  </div>
                ))}
              </div>
            </div>
            <div>
              <div className="w-[40px] h-[3px] mb-3" style={{ background: '#ff751f' }} />
              <h2 className="heading-display text-[22px] font-bold mb-5" style={{ color: '#1d3c71' }}>Wat hebben wij nodig?</h2>
              <div className="space-y-[10px]">
                {nodigItems.map((item, i) => (
                  <div key={i} className="flex items-center gap-4 bg-white rounded-[10px] px-5 py-[18px]" style={{ boxShadow: '0 2px 12px rgba(0,0,0,0.06)' }}>
                    <CheckCircle className="w-[22px] h-[22px] flex-shrink-0" style={{ color: '#ff751f' }} />
                    <span style={{ fontFamily: "'Inter', sans-serif", fontSize: 15, color: '#333', lineHeight: 1.5 }}>{item}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Bottom CTA */}
      <section className="py-12 md:py-14 px-6 md:px-8" style={{ background: '#1d3c71' }}>
        <div className="container-wide text-center">
          <h2 className="text-2xl md:text-3xl font-semibold text-white mb-3">Zekerheid over de waarde van je camper?</h2>
          <p className="text-[15px] mb-6" style={{ color: 'rgba(255,255,255,0.75)' }}>
            Vraag vrijblijvend een verzekeringstaxatie aan.
          </p>
          <Button variant="cta" size="lg" onClick={scrollToForm}>
            Verzekeringstaxatie aanvragen
            <ArrowDown className="w-4 h-4 ml-2" />
          </Button>
        </div>
      </section>

      {/* Formulier — 65/35 layout */}
      <section className="py-14 md:py-16 px-6 md:px-8 bg-background" ref={formRef}>
        <div className="container-wide">
          <div className="text-center mb-8">
            <h2 className="text-2xl md:text-3xl font-semibold mb-2">Verzekeringstaxatie aanvragen</h2>
            <p className="text-[15px] max-w-2xl mx-auto" style={{ color: '#4a5568' }}>
              Vul het formulier in en wij nemen binnen één werkdag contact met je op.
            </p>
          </div>
          <div className="grid md:grid-cols-[1fr_380px] gap-8">
            <div>
              <IntakeForm
                serviceType="camperverzekeringstaxatie"
                formTitle="Verzekeringstaxatie aanvragen"
                formSubtext="Vul onderstaand formulier zo volledig mogelijk in."
                submitButtonText="Verzekeringstaxatie aanvragen"
              />
            </div>
            <ContactSidebar />
          </div>
        </div>
      </section>

      {/* Acceptatie — 3 kaartjes */}
      <section className="py-14 md:py-16 px-6 md:px-8" style={{ background: '#f7f8fa' }}>
        <div className="container-wide">
          <div className="text-center mb-8">
            <p className="uppercase text-[11px] font-semibold tracking-[0.15em] mb-2" style={{ color: '#ff751f' }}>Acceptatie</p>
            <h2 className="heading-display text-[22px] font-bold" style={{ color: '#1d3c71' }}>Acceptatie en geldigheid</h2>
          </div>
          <div className="grid md:grid-cols-3 gap-6 max-w-4xl mx-auto">
            {acceptatieCards.map((card, i) => (
              <div
                key={i}
                className="bg-white rounded-[12px] p-7 text-center transition-all duration-200 hover:-translate-y-[3px]"
                style={{ boxShadow: '0 4px 20px rgba(0,0,0,0.08)' }}
              >
                <div
                  className="w-[56px] h-[56px] rounded-full flex items-center justify-center mx-auto mb-4"
                  style={{ background: '#EBF2FB' }}
                >
                  <card.icon className="w-6 h-6" style={{ color: '#1d3c71' }} />
                </div>
                <h3 className="font-bold text-[17px] mb-2" style={{ fontFamily: "'Inter', sans-serif", color: '#1d3c71' }}>{card.title}</h3>
                <p style={{ fontFamily: "'Inter', sans-serif", fontSize: 14, color: '#555', lineHeight: 1.65 }}>{card.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <SiteFooter />
      <WhatsAppButton />
    </div>
  );
};

export default CamperTaxatie;
