import WhatsAppButton from "@/components/WhatsAppButton";
import { useRef } from "react";
import { Link } from "react-router-dom";
import LandingHero from "@/components/LandingHero";
import IntakeForm from "@/components/IntakeForm";
import SiteHeader from "@/components/SiteHeader";
import SiteFooter from "@/components/SiteFooter";
import PageMeta from "@/components/PageMeta";
import UspBar from "@/components/UspBar";
import { Button } from "@/components/ui/button";
import { ArrowRight, ArrowDown, CheckCircle, Shield, Building2, RefreshCw, FileText, Search, BarChart3 } from "lucide-react";
import ContactSidebar from "@/components/ContactSidebar";
import serviceWev from "@/assets/service-wev.jpg";

const WevTaxatie = () => {
  const formRef = useRef<HTMLDivElement>(null);

  const scrollToForm = () => {
    formRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <div className="min-h-screen bg-background">
      <PageMeta
        title="WEV Taxatie | Werkelijke Economische Waarde | Automobiel Taxaties"
        description="Objectieve WEV taxatie voor fiscale en juridische doeleinden. Erkend taxatierapport door register taxateur Erik Elderson."
      />
      <SiteHeader />
      <LandingHero
        subtitle="WEV-TAXATIE"
        title="Werkelijke waarde. Fiscaal verdedigbaar."
        description="Objectieve waardebepaling voor de Belastingdienst, bij zakelijke of fiscale vraagstukken."
        ctaText="WEV-taxatie aanvragen"
        onCtaClick={scrollToForm}
        heroImage={serviceWev}
        compact
      />
      <UspBar />

      <section className="py-12 md:py-16 px-6 md:px-8" style={{ background: '#f0f4f8' }}>
        <div className="container-wide">
          <div className="text-center mb-10">
            <p className="uppercase text-[11px] font-semibold tracking-[0.12em] text-cta mb-3">Wanneer nodig</p>
            <h2 className="text-2xl md:text-3xl font-semibold mb-3">Wanneer is een WEV-taxatie nodig?</h2>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {[
              { icon: Building2, label: "Zakelijk naar privé", desc: "Voertuig overbrengen naar privébezit" },
              { icon: RefreshCw, label: "Privé naar zakelijk", desc: "Inbreng van een privévoertuig in de onderneming" },
              { icon: FileText, label: "Wijziging ondernemingsvorm", desc: "Bij beëindiging of herstructurering" },
              { icon: BarChart3, label: "Administratiecorrecties", desc: "Bij fiscale herstructurering" },
              { icon: Search, label: "Verzoek Belastingdienst", desc: "Wanneer een onderbouwde waarde gevraagd wordt" },
              { icon: Shield, label: "Controle voorkomen", desc: "Een objectieve waarde voorkomt discussie achteraf" },
            ].map((item, i) => (
              <div key={i} className="card-elevated p-6">
                <div className="inline-flex items-center justify-center w-10 h-10 rounded-xl mb-3" style={{ background: 'rgba(29,60,113,0.08)' }}>
                  <item.icon className="w-5 h-5 text-primary" />
                </div>
                <h3 className="text-sm font-semibold mb-1">{item.label}</h3>
                <p className="text-xs leading-relaxed" style={{ color: '#4a5568' }}>{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Wat houdt het in - twee kolommen */}
      <section className="py-12 md:py-16 px-6 md:px-8 bg-background">
        <div className="container-wide">
          <div className="grid md:grid-cols-2 gap-10 items-start">
            <div>
              <p className="uppercase text-[11px] font-semibold tracking-[0.12em] text-cta mb-3">Wat is WEV</p>
              <h2 className="text-2xl md:text-3xl font-semibold mb-4">Wat houdt een WEV-taxatie in?</h2>
              <p className="text-[15px] leading-relaxed mb-4" style={{ color: '#4a5568' }}>
                WEV staat voor Waarde in het Economisch Verkeer: de waarde die een voertuig zou hebben bij verkoop op de vrije markt, tussen onafhankelijke partijen.
              </p>
              <p className="text-[15px] leading-relaxed" style={{ color: '#4a5568' }}>
                De uitkomst wordt vastgelegd in een controleerbaar taxatierapport dat dient als onderbouwing voor je administratie en bij controle door de Belastingdienst.
              </p>
            </div>
            <div>
              <h3 className="text-lg font-semibold mb-4">Hierbij wordt gekeken naar:</h3>
              <ul className="space-y-3">
                {[
                  "Technische en cosmetische staat",
                  "Kilometerstand, uitvoering en opties",
                  "Onderhoud en gebruik",
                  "Marktgegevens van vergelijkbare voertuigen",
                  "Fiscale context van de waardering",
                ].map((item, i) => (
                  <li key={i} className="flex items-start gap-3">
                    <CheckCircle className="w-5 h-5 text-cta flex-shrink-0 mt-0.5" />
                    <span className="text-[15px]" style={{ color: '#4a5568' }}>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Werkwijze stappen */}
      <section className="py-12 md:py-16 px-6 md:px-8" style={{ background: '#f0f4f8' }}>
        <div className="container-wide">
          <div className="text-center mb-10">
            <p className="uppercase text-[11px] font-semibold tracking-[0.12em] text-cta mb-3">Werkwijze</p>
            <h2 className="text-2xl md:text-3xl font-semibold">Onze werkwijze in 5 stappen</h2>
          </div>
          <div className="grid md:grid-cols-5 gap-6">
            {[
              { step: 1, title: "Gegevens aanleveren", desc: "Kenteken, type, bouwjaar en fiscale context" },
              { step: 2, title: "Fysieke inspectie", desc: "De staat op dat moment is bepalend voor de waarde" },
              { step: 3, title: "WEV vaststellen", desc: "Op basis van inspectie en marktgegevens" },
              { step: 4, title: "Rapport opstellen", desc: "Helder en controleerbaar taxatierapport" },
              { step: 5, title: "Oplevering", desc: "Digitaal, klaar voor administratie of Belastingdienst" },
            ].map((s) => (
              <div key={s.step} className="text-center">
                <div className="step-badge mx-auto mb-4">{s.step}</div>
                <h4 className="font-semibold text-sm mb-1 text-foreground">{s.title}</h4>
                <p className="text-xs leading-relaxed" style={{ color: '#4a5568' }}>{s.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA blok */}
      <section className="py-14 md:py-20 px-6 md:px-8" style={{ background: '#1d3c71' }}>
        <div className="container-wide text-center">
          <h2 className="text-2xl md:text-3xl font-semibold text-white mb-3">WEV-taxatie nodig?</h2>
          <p className="text-base mb-8" style={{ color: 'rgba(255,255,255,0.75)' }}>
            Vraag vrijblijvend aan. Wij plannen de taxatie op basis van jouw situatie.
          </p>
          <Button variant="cta" size="lg" onClick={scrollToForm}>
            WEV-taxatie aanvragen
            <ArrowDown className="w-4 h-4 ml-2" />
          </Button>
        </div>
      </section>

      {/* Belangrijk + Nodig - twee kolommen */}
      <section className="py-12 md:py-16 px-6 md:px-8 bg-background">
        <div className="container-wide">
          <div className="grid md:grid-cols-2 gap-10">
            <div>
              <h2 className="text-xl md:text-2xl font-semibold mb-4">Belangrijk om te weten</h2>
              <ul className="space-y-3">
                {[
                  "De staat op de dag van taxatie is bepalend",
                  "Werkzaamheden moeten vóór de taxatiedatum zijn uitgevoerd",
                  "Zo blijft de taxatie fiscaal verdedigbaar",
                ].map((item, i) => (
                  <li key={i} className="flex items-start gap-3">
                    <CheckCircle className="w-5 h-5 text-cta flex-shrink-0 mt-0.5" />
                    <span className="text-[15px]" style={{ color: '#4a5568' }}>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <h2 className="text-xl md:text-2xl font-semibold mb-4">Wat hebben wij nodig?</h2>
              <ul className="space-y-3">
                {[
                  "Naam en contactgegevens",
                  "Voertuiggegevens (kenteken, merk, type, bouwjaar, km-stand)",
                  "Fiscale context (bijv. zakelijk naar privé)",
                  "Relevante documentatie (onderhoudsboekje, facturen)",
                ].map((item, i) => (
                  <li key={i} className="flex items-start gap-3">
                    <CheckCircle className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
                    <span className="text-[15px]" style={{ color: '#4a5568' }}>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Onafhankelijk */}
      <section className="py-12 md:py-16 px-6 md:px-8" style={{ background: '#f0f4f8' }}>
        <div className="container-wide">
          <div className="card-elevated p-8 md:p-10 max-w-3xl mx-auto">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 rounded-xl flex items-center justify-center" style={{ background: 'rgba(29,60,113,0.08)' }}>
                <Shield className="w-5 h-5 text-primary" />
              </div>
              <h2 className="text-xl font-semibold">Onafhankelijk en fiscaal verdedigbaar</h2>
            </div>
            <ul className="space-y-2 text-sm" style={{ color: '#4a5568' }}>
              <li>• Aangesloten bij Federatie TMV, VRT Register en FEHAC</li>
              <li>• Geen vooraf afgesproken uitkomsten of wensbedragen</li>
              <li>• Rapportages zijn transparant, controleerbaar en verdedigbaar</li>
              <li>• Onafhankelijkheid is essentieel bij fiscale waarderingen</li>
            </ul>
          </div>
        </div>
      </section>

      {/* Formulier — 65/35 layout */}
      <section className="py-12 md:py-16 px-6 md:px-8 bg-background" ref={formRef}>
        <div className="container-wide">
          <div className="text-center mb-10">
            <h2 className="text-2xl md:text-3xl font-semibold mb-3">WEV-taxatie aanvragen</h2>
            <p className="text-[15px] max-w-2xl mx-auto" style={{ color: '#4a5568' }}>
              Vul het formulier in en wij plannen de taxatie op basis van de aangeleverde informatie.
            </p>
          </div>
          <div className="grid md:grid-cols-[1fr_380px] gap-8">
            <div>
              <IntakeForm
                serviceType="WEV-taxatie"
                formTitle="WEV-taxatie aanvragen"
                toelichtingPlaceholder="Geef hier de beschikbare informatie over het voertuig en de fiscale context."
                submitButtonText="WEV-taxatie aanvragen"
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

export default WevTaxatie;
