import { useRef } from "react";
import LandingHero from "@/components/LandingHero";
import IntakeForm from "@/components/IntakeForm";
import ContactSidebar from "@/components/ContactSidebar";
import SiteHeader from "@/components/SiteHeader";
import SiteFooter from "@/components/SiteFooter";
import WhatsAppButton from "@/components/WhatsAppButton";
import PageMeta from "@/components/PageMeta";
import UspBar from "@/components/UspBar";
import { Button } from "@/components/ui/button";
import { ArrowDown, CheckCircle, Shield, Star } from "lucide-react";
import heroMotor from "@/assets/hero-motor.jpg";

const BpmMotorTaxatie = () => {
  const formRef = useRef<HTMLDivElement>(null);
  const scrollToForm = () => formRef.current?.scrollIntoView({ behavior: "smooth" });

  return (
    <div className="min-h-screen bg-background">
      <PageMeta title="BPM Motor Taxatie | Import Motor | Automobiel Taxaties" description="BPM-taxatie voor geïmporteerde motorfietsen. Erkend taxateur op locatie voor de laagst haalbare BPM." />
      <SiteHeader />
      <LandingHero subtitle="BPM-TAXATIE MOTOR" title="Zorgvuldig vastgestelde BPM bij import van een motor" description="Wanneer je een motor uit het buitenland importeert, moet er BPM worden aangegeven. De hoogte van dat bedrag hangt af van de manier waarop de afschrijving wordt vastgesteld." ctaText="BPM-taxatie motor aanvragen" onCtaClick={scrollToForm} heroImage={heroMotor} />

      <section className="py-10 md:py-12 px-6 md:px-8" style={{ background: '#f0f4f8' }}>
        <div className="container-wide"><div className="max-w-3xl mx-auto text-center">
          <h2 className="text-2xl md:text-3xl font-semibold mb-3">Wanneer is een BPM-taxatie voor een motor nodig?</h2>
          <p className="text-[15px] leading-relaxed" style={{ color: '#4a5568' }}>In veel gevallen kan de BPM worden vastgesteld op basis van een afschrijvingstabel of koerslijst. Soms geven deze methodes echter geen realistisch beeld van de werkelijke staat van de motor.</p>
        </div></div>
      </section>

      <section className="py-10 md:py-12 px-6 md:px-8 bg-background">
        <div className="container-wide"><div className="grid md:grid-cols-2 gap-8 items-center">
          <div>
            <p className="uppercase text-[11px] font-semibold tracking-[0.12em] text-cta mb-2">Wanneer nodig</p>
            <h2 className="text-2xl md:text-3xl font-semibold mb-3">Wanneer is een taxatie nodig?</h2>
            <p className="text-[15px] leading-relaxed" style={{ color: '#4a5568' }}>Een BPM-taxatie is noodzakelijk wanneer standaardmethodes geen reëel en verdedigbaar beeld geven.</p>
          </div>
          <div className="grid grid-cols-2 gap-4">
            {[{ label: "Schade", desc: "Motor heeft (gehad) schade" }, { label: "Afwijkende staat", desc: "Anders dan gangbaar" }, { label: "Bijzondere uitvoering", desc: "Aangepaste motoren" }, { label: "Standaard ontoereikend", desc: "Tabel of koerslijst past niet" }].map((item, i) => (
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
          {[{ step: 1, title: "Gegevens aanleveren", desc: "Kenteken, chassisnummer, factuur" }, { step: 2, title: "Beoordeling", desc: "Welke methode passend is" }, { step: 3, title: "Fysieke inspectie", desc: "Werkelijke staat vastleggen" }, { step: 4, title: "Rapport opstellen", desc: "BPM-taxatierapport voor aangifte" }, { step: 5, title: "Oplevering", desc: "Per e-mail, klaar voor indiening" }].map((s) => (
            <div key={s.step} className="text-center"><div className="step-badge mx-auto mb-3">{s.step}</div><h4 className="font-semibold text-sm mb-1 text-foreground">{s.title}</h4><p className="text-xs leading-relaxed" style={{ color: '#4a5568' }}>{s.desc}</p></div>
          ))}
        </div></div>
      </section>

      <section className="py-12 md:py-14 px-6 md:px-8" style={{ background: '#1d3c71' }}>
        <div className="container-wide text-center">
          <h2 className="text-2xl md:text-3xl font-semibold text-white mb-3">BPM bij import van een motor?</h2>
          <p className="text-[15px] mb-6 max-w-xl mx-auto" style={{ color: 'rgba(255,255,255,0.75)' }}>Wij beoordelen per motor welke methode het meest verdedigbaar is.</p>
          <Button variant="cta" size="lg" onClick={scrollToForm}>BPM-taxatie motor aanvragen<ArrowDown className="w-4 h-4 ml-2" /></Button>
        </div>
      </section>

      <section className="py-6 px-6 md:px-8 bg-background">
        <div className="container-wide"><div className="flex flex-wrap justify-center gap-6 md:gap-14 items-center">
          <div className="flex items-center gap-2"><div className="flex">{[...Array(5)].map((_, i) => <Star key={i} className="w-3.5 h-3.5 fill-cta text-cta" />)}</div><span className="text-sm font-semibold text-foreground">4.9 / 5</span><span className="text-xs" style={{ color: '#4a5568' }}>Google Reviews</span></div>
          <div className="text-center"><span className="text-lg font-bold text-foreground">25.000+</span><span className="text-xs ml-1" style={{ color: '#4a5568' }}>voertuigen getaxeerd</span></div>
          <div className="text-center"><span className="text-lg font-bold text-foreground">13 jaar</span><span className="text-xs ml-1" style={{ color: '#4a5568' }}>ervaring</span></div>
          <div className="text-center"><span className="text-lg font-bold text-foreground">Landelijk</span><span className="text-xs ml-1" style={{ color: '#4a5568' }}>actief</span></div>
        </div></div>
      </section>

      <section className="py-10 md:py-12 px-6 md:px-8" style={{ background: '#f0f4f8' }}>
        <div className="container-wide"><div className="grid md:grid-cols-2 gap-8">
          <div><h2 className="text-xl md:text-2xl font-semibold mb-5">Wat kun je verwachten?</h2><div className="space-y-3">{["Onafhankelijke beoordeling per motor", "Duidelijke uitleg over de gekozen methode", "Onderbouwing die standhoudt bij controle", "Geen wensbedragen of vooraf bepaalde uitkomsten"].map((item, i) => (<div key={i} className="flex items-center gap-4 bg-white rounded-[10px] px-5 py-4" style={{ boxShadow: '0 2px 8px rgba(0,0,0,0.06)' }}><div className="w-8 h-8 rounded-full flex-shrink-0 flex items-center justify-center" style={{ background: 'rgba(255,117,31,0.12)' }}><CheckCircle className="w-4 h-4 text-cta" /></div><span className="text-[15px]" style={{ color: '#4a5568' }}>{item}</span></div>))}</div></div>
          <div><h2 className="text-xl md:text-2xl font-semibold mb-5">Wat hebben wij nodig?</h2><div className="space-y-3">{["Buitenlands kenteken of chassisnummer", "Aankoopfactuur", "Actuele kilometerstand", "Info over staat, schade en onderhoud"].map((item, i) => (<div key={i} className="flex items-center gap-4 bg-white rounded-[10px] px-5 py-4" style={{ boxShadow: '0 2px 8px rgba(0,0,0,0.06)' }}><div className="w-8 h-8 rounded-full flex-shrink-0 flex items-center justify-center" style={{ background: 'rgba(29,60,113,0.08)' }}><CheckCircle className="w-4 h-4 text-primary" /></div><span className="text-[15px]" style={{ color: '#4a5568' }}>{item}</span></div>))}</div></div>
        </div></div>
      </section>

      <section className="py-12 md:py-14 px-6 md:px-8" style={{ background: '#1d3c71' }}>
        <div className="container-wide text-center">
          <h2 className="text-2xl md:text-3xl font-semibold text-white mb-3">BPM netjes en onafhankelijk laten regelen?</h2>
          <p className="text-[15px] mb-6" style={{ color: 'rgba(255,255,255,0.75)' }}>Vraag vrijblijvend een BPM-taxatie aan voor je motor.</p>
          <Button variant="cta" size="lg" onClick={scrollToForm}>BPM-taxatie motor aanvragen<ArrowDown className="w-4 h-4 ml-2" /></Button>
        </div>
      </section>

      <section className="py-10 md:py-14 px-6 md:px-8 bg-background" ref={formRef}>
        <div className="container-wide"><div className="text-center mb-8"><h2 className="text-2xl md:text-3xl font-semibold mb-2">BPM-taxatie motor aanvragen</h2><p className="text-[15px] max-w-2xl mx-auto" style={{ color: '#4a5568' }}>Vul het formulier in en wij bepalen de juiste aanpak voor jouw situatie.</p></div>
        <div className="grid md:grid-cols-[1fr_380px] gap-8"><div><IntakeForm serviceType="bpm-taxatie motor" formTitle="BPM-taxatie motor aanvragen" formSubtext="Vul onderstaand formulier zo volledig mogelijk in." toelichtingPlaceholder="Geef hier de beschikbare informatie over de motor en de import." submitButtonText="BPM-taxatie motor aanvragen" /></div><ContactSidebar /></div></div>
      </section>

      <section className="py-10 md:py-12 px-6 md:px-8" style={{ background: '#f0f4f8' }}>
        <div className="container-wide"><div className="card-elevated p-8 md:p-10 max-w-3xl mx-auto"><div className="flex items-center gap-3 mb-4"><div className="w-10 h-10 rounded-xl flex items-center justify-center" style={{ background: 'rgba(29,60,113,0.08)' }}><Shield className="w-5 h-5 text-primary" /></div><h2 className="text-xl font-semibold">Onafhankelijk en juridisch geborgd</h2></div><ul className="space-y-2 text-sm" style={{ color: '#4a5568' }}><li>• Aangesloten bij Federatie TMV, VRT Register en FEHAC</li><li>• Geen vooraf afgesproken uitkomsten</li><li>• Rapportages zijn transparant en controleerbaar</li><li>• Samenwerking met gespecialiseerde BPM-jurist</li></ul></div></div>
      </section>

      <SiteFooter />
      <WhatsAppButton />
    </div>
  );
};

export default BpmMotorTaxatie;
