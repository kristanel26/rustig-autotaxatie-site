import WhatsAppButton from "@/components/WhatsAppButton";
import { useRef } from "react";
import LandingHero from "@/components/LandingHero";
import IntakeForm from "@/components/IntakeForm";
import ContactSidebar from "@/components/ContactSidebar";
import SiteHeader from "@/components/SiteHeader";
import SiteFooter from "@/components/SiteFooter";
import PageMeta from "@/components/PageMeta";
import UspBar from "@/components/UspBar";
import { Button } from "@/components/ui/button";
import { ArrowDown, CheckCircle, Shield, Star } from "lucide-react";
import heroYoungtimer from "@/assets/hero-youngtimer.jpg";

const YoungtimerTaxatie = () => {
  const formRef = useRef<HTMLDivElement>(null);
  const scrollToForm = () => formRef.current?.scrollIntoView({ behavior: "smooth" });

  const verwachtItems = [
    "De technische en cosmetische staat wordt beoordeeld",
    "Aanpassingen en bijzonderheden worden meegenomen",
    "De waarde wordt vastgelegd op basis van de werkelijke staat",
    "Het rapport is geaccepteerd door verzekeraars",
  ];
  const nodigItems = [
    "Je naam en contactgegevens",
    "De kentekencard van het voertuig",
    "Onderhoudsboekje of servicehistorie (indien aanwezig)",
    "Facturen van aanpassingen of accessoires",
  ];

  return (
    <div className="min-h-screen bg-background">
      <PageMeta title="Youngtimer Taxatie | Voertuigen Vanaf 15 Jaar | Automobiel Taxaties" description="Erkende youngtimer taxatie voor verzekering en BPM. Specialist in voertuigen van 15 jaar en ouder. Gratis advies aanvragen." />
      <SiteHeader />
      <LandingHero subtitle="VERZEKERINGSTAXATIE YOUNGTIMER" title="Zekerheid over de waarde van je youngtimer" description="Je youngtimer is meer dan alleen een voertuig. Met een verzekeringstaxatie leg je vast wat het op dit moment werkelijk waard is. Die waarde vormt de basis voor de verzekering, zodat je bij schade of diefstal niet afhankelijk bent van een dagwaarde." ctaText="Verzekeringstaxatie aanvragen" onCtaClick={scrollToForm} heroImage={heroYoungtimer} compact />
      <UspBar />

      <section className="py-10 md:py-12 px-6 md:px-8" style={{ background: '#f0f4f8' }}>
        <div className="container-wide"><div className="max-w-3xl mx-auto text-center">
          <h2 className="text-2xl md:text-3xl font-semibold mb-3">Waarom een verzekeringstaxatie voor je youngtimer?</h2>
          <p className="text-[15px] leading-relaxed" style={{ color: '#4a5568' }}>Bij veel verzekeraars is een taxatierapport vereist wanneer de waarde van een youngtimer afwijkt van standaard verzekeringsbedragen. Met een taxatierapport wordt de waarde vooraf vastgelegd.</p>
        </div></div>
      </section>

      <section className="py-10 md:py-12 px-6 md:px-8 bg-background">
        <div className="container-wide"><div className="grid md:grid-cols-2 gap-8 items-center">
          <div>
            <p className="uppercase text-[11px] font-semibold tracking-[0.12em] text-cta mb-2">Wanneer nodig</p>
            <h2 className="text-2xl md:text-3xl font-semibold mb-3">Wanneer is een taxatie nodig?</h2>
            <p className="text-[15px] leading-relaxed" style={{ color: '#4a5568' }}>Een verzekeringstaxatie is relevant wanneer de waarde van je youngtimer niet vanzelfsprekend is.</p>
          </div>
          <div className="grid grid-cols-2 gap-4">
            {[{ label: "Goed onderhouden", desc: "Waarde hoger dan gemiddeld" }, { label: "Bijzondere uitvoering", desc: "Zeldzame opties of versie" }, { label: "Afwijkende waarde", desc: "Hoger dan standaard bedragen" }, { label: "Eis verzekeraar", desc: "Verzekeraar vraagt om taxatie" }].map((item, i) => (
              <div key={i} className="card-elevated p-5 text-center cursor-default transition-transform duration-200 hover:-translate-y-1">
                <p className="text-sm font-semibold text-foreground">{item.label}</p>
                <p className="text-xs mt-0.5" style={{ color: '#4a5568' }}>{item.desc}</p>
              </div>
            ))}
          </div>
        </div></div>
      </section>

      <section className="py-10 md:py-12 px-6 md:px-8" style={{ background: '#f0f4f8' }}>
        <div className="container-wide"><div className="text-center mb-8">
          <p className="uppercase text-[11px] font-semibold tracking-[0.12em] text-cta mb-2">Werkwijze</p>
          <h2 className="text-2xl md:text-3xl font-semibold">Onze werkwijze in 5 stappen</h2>
        </div>
        <div className="grid md:grid-cols-5 gap-5">
          {[{ step: 1, title: "Gegevens aanleveren", desc: "Type, bouwjaar en gebruik" }, { step: 2, title: "Fysieke inspectie", desc: "Staat, uitvoering en bijzonderheden" }, { step: 3, title: "Waarde vaststellen", desc: "Op basis van inspectie en marktgegevens" }, { step: 4, title: "Rapport opstellen", desc: "Duidelijk hoe de waarde tot stand is gekomen" }, { step: 5, title: "Oplevering", desc: "Digitaal, klaar voor de verzekeraar" }].map((s) => (
            <div key={s.step} className="text-center"><div className="step-badge mx-auto mb-3">{s.step}</div><h4 className="font-semibold text-sm mb-1 text-foreground">{s.title}</h4><p className="text-xs leading-relaxed" style={{ color: '#4a5568' }}>{s.desc}</p></div>
          ))}
        </div></div>
      </section>

      <section className="py-12 md:py-14 px-6 md:px-8" style={{ background: '#1d3c71' }}>
        <div className="container-wide text-center">
          <h2 className="text-2xl md:text-3xl font-semibold text-white mb-3">Verzekeringstaxatie voor je youngtimer?</h2>
          <p className="text-[15px] mb-6 max-w-xl mx-auto" style={{ color: 'rgba(255,255,255,0.75)' }}>Vooraf zekerheid over de waarde. Wij plannen de taxatie op locatie.</p>
          <Button variant="cta" size="lg" onClick={scrollToForm}>Verzekeringstaxatie aanvragen<ArrowDown className="w-4 h-4 ml-2" /></Button>
        </div>
      </section>

      <section className="py-10 md:py-12 px-6 md:px-8 bg-background">
        <div className="container-wide"><div className="max-w-3xl mx-auto text-center"><p className="text-sm font-medium" style={{ color: '#4a5568' }}>[REVIEWS AANLEVEREN DOOR OPDRACHTGEVER]</p></div></div>
      </section>

      <section className="py-6 px-6 md:px-8" style={{ background: '#f0f4f8' }}>
        <div className="container-wide"><div className="flex flex-wrap justify-center gap-6 md:gap-14 items-center">
          <div className="flex items-center gap-2"><div className="flex">{[...Array(5)].map((_, i) => <Star key={i} className="w-3.5 h-3.5 fill-cta text-cta" />)}</div><span className="text-sm font-semibold text-foreground">4.9 / 5</span><span className="text-xs" style={{ color: '#4a5568' }}>Google Reviews</span></div>
          <div className="text-center"><span className="text-lg font-bold text-foreground">25.000+</span><span className="text-xs ml-1" style={{ color: '#4a5568' }}>voertuigen getaxeerd</span></div>
          <div className="text-center"><span className="text-lg font-bold text-foreground">13 jaar</span><span className="text-xs ml-1" style={{ color: '#4a5568' }}>ervaring</span></div>
          <div className="text-center"><span className="text-lg font-bold text-foreground">Landelijk</span><span className="text-xs ml-1" style={{ color: '#4a5568' }}>werkzaam in groot deel van NL</span></div>
        </div></div>
      </section>

      <section className="py-12 md:py-14 px-6 md:px-8" style={{ background: '#1d3c71' }}>
        <div className="container-wide text-center">
          <h2 className="text-2xl md:text-3xl font-semibold text-white mb-3">Zekerheid over de waarde van je youngtimer?</h2>
          <p className="text-[15px] mb-6" style={{ color: 'rgba(255,255,255,0.75)' }}>Vraag vrijblijvend een verzekeringstaxatie aan.</p>
          <Button variant="cta" size="lg" onClick={scrollToForm}>Verzekeringstaxatie aanvragen<ArrowDown className="w-4 h-4 ml-2" /></Button>
        </div>
      </section>

      <section className="py-10 md:py-14 px-6 md:px-8 bg-background" ref={formRef}>
        <div className="container-wide"><div className="text-center mb-8"><h2 className="text-2xl md:text-3xl font-semibold mb-2">Verzekeringstaxatie aanvragen</h2><p className="text-[15px] max-w-2xl mx-auto" style={{ color: '#4a5568' }}>Vul het formulier in en wij nemen binnen één werkdag contact met je op.</p></div>
        <div className="grid md:grid-cols-[1fr_380px] gap-8"><div><div className="grid md:grid-cols-[1fr_380px] gap-8"><div><IntakeForm serviceType="youngtimerverzekeringstaxatie" formTitle="Verzekeringstaxatie aanvragen" formSubtext="Vul onderstaand formulier zo volledig mogelijk in." submitButtonText="Verzekeringstaxatie aanvragen" styledKenteken /></div><ContactSidebar /></div></div></div><ContactSidebar /></div></div>
      </section>

      <section className="py-10 md:py-12 px-6 md:px-8" style={{ background: '#f0f4f8' }}>
        <div className="container-wide"><div className="card-elevated p-8 md:p-10 max-w-3xl mx-auto"><div className="flex items-center gap-3 mb-4"><div className="w-10 h-10 rounded-xl flex items-center justify-center" style={{ background: 'rgba(29,60,113,0.08)' }}><Shield className="w-5 h-5 text-primary" /></div><h2 className="text-xl font-semibold">Acceptatie en geldigheid</h2></div><ul className="space-y-2 text-sm" style={{ color: '#4a5568' }}><li>• Aangesloten bij Federatie TMV, VRT Register en FEHAC</li><li>• Rapporten geaccepteerd door verzekeraars</li><li>• Geldigheid doorgaans 2 tot 3 jaar (check je verzekeraar)</li><li>• Onafhankelijk en zorgvuldig onderbouwd</li></ul></div></div>
      </section>

      <SiteFooter />
      <WhatsAppButton />
    </div>
  );
};

export default YoungtimerTaxatie;
