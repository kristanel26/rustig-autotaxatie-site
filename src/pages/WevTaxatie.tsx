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
import { ArrowRight, ArrowDown, CheckCircle, Shield, Building2, RefreshCw, FileText, Search, BarChart3, TrendingUp, Gauge, Wrench, FileCheck } from "lucide-react";
import ContactSidebar from "@/components/ContactSidebar";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
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

      {/* Wanneer nodig — ongewijzigd */}
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

      {/* NIEUW — Sectie 1: Wat is WEV? */}
      <section className="py-12 md:py-16 px-6 md:px-8 bg-background">
        <div className="container-wide">
          <div className="grid md:grid-cols-[3fr_2fr] gap-10 items-start">
            <div>
              <p className="uppercase text-[11px] font-semibold tracking-[0.12em] text-cta mb-3">Wat is WEV</p>
              <h2 className="font-display text-2xl md:text-3xl font-semibold mb-4 text-primary">Waarde in het Economisch Verkeer — wat betekent dat?</h2>
              <p className="text-[15px] leading-relaxed mb-4" style={{ color: '#4a5568' }}>
                WEV staat voor Waarde in het Economisch Verkeer. Dit is de prijs waarvoor een voertuig normaliter door de meestbiedende koper zou worden overgenomen bij vrijwillige verkoop tussen onafhankelijke partijen.
              </p>
              <p className="text-[15px] leading-relaxed" style={{ color: '#4a5568' }}>
                Voor de Belastingdienst vormt de WEV de grondslag voor de verrekening van het privégebruik van een auto. De basis is altijd de oorspronkelijke cataloguswaarde inclusief btw en bpm, inclusief alle accessoires die zijn aangebracht vóór het toekennen van het kenteken aan het voertuig.
              </p>
            </div>
            <div className="rounded-[10px] p-7" style={{ background: '#EBF2FB' }}>
              <h3 className="font-semibold text-primary mb-4">Waarvoor gebruikt de Belastingdienst de WEV?</h3>
              <ul className="space-y-3">
                {[
                  "Grondslag voor verrekening privégebruik auto",
                  "Basis bij overdracht voertuig van zaak naar privé",
                  "Uitgangspunt bij inbreng privéauto in de onderneming",
                  "Referentie bij controle door de Belastingdienst",
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

      {/* NIEUW — Sectie 2: Hoe bepalen wij de waarde? */}
      <section className="py-12 md:py-16 px-6 md:px-8" style={{ background: '#f7f8fa' }}>
        <div className="container-wide">
          <div className="text-center mb-10">
            <p className="uppercase text-[11px] font-semibold tracking-[0.12em] text-cta mb-3">Onze werkwijze</p>
            <h2 className="font-display text-2xl md:text-3xl font-semibold mb-3 text-primary">Hoe bepalen wij de waarde van jouw voertuig?</h2>
            <p className="text-[15px] max-w-[600px] mx-auto" style={{ color: '#4a5568' }}>
              Onze taxateurs combineren marktdata, fysieke inspectie en erkende koerslijsten tot één helder rapport.
            </p>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {[
              { icon: TrendingUp, title: "Meest gunstige koerslijst", desc: "We raadplegen meerdere erkende koerslijsten en kiezen de waardering die het meest gunstig is voor jouw situatie." },
              { icon: Gauge, title: "Kilometerstand", desc: "De kilometerstand op de dag van taxatie is bepalend voor de waarde. Hoe meer kilometers, hoe lager de waarde doorgaans uitvalt." },
              { icon: Search, title: "Fysieke inspectie", desc: "We inspecteren het voertuig op beschadigingen, krassen, deuken en oneffenheden. Dit bepaalt mede de eindwaarde." },
              { icon: Wrench, title: "Courantheid en uitvoering", desc: "De vraag naar het specifieke merk, model en uitvoering op de tweedehandsmarkt wordt meegewogen in de waardebepaling." },
              { icon: FileCheck, title: "Cataloguswaarde als basis", desc: "De oorspronkelijke cataloguswaarde inclusief btw, bpm en aangebrachte accessoires vormt het vertrekpunt van de berekening." },
              { icon: Shield, title: "Onderbouwd en controleerbaar", desc: "Alle bevindingen worden samengevoegd in een transparant rapport dat controleerbaar en verdedigbaar is bij de Belastingdienst." },
            ].map((item, i) => (
              <div key={i} className="bg-white rounded-[10px] p-6" style={{ boxShadow: '0 2px 10px rgba(0,0,0,0.07)' }}>
                <div className="inline-flex items-center justify-center w-10 h-10 rounded-xl mb-3" style={{ background: 'rgba(29,60,113,0.08)' }}>
                  <item.icon className="w-5 h-5 text-primary" />
                </div>
                <h3 className="text-sm font-semibold mb-1 text-primary">{item.title}</h3>
                <p className="text-xs leading-relaxed" style={{ color: '#4a5568' }}>{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* NIEUW — Sectie 3: Belangrijk om te weten + Wat hebben wij nodig */}
      <section className="py-12 md:py-16 px-6 md:px-8 bg-background">
        <div className="container-wide">
          <div className="grid md:grid-cols-2 gap-10">
            <div>
              <h3 className="font-display text-xl md:text-2xl font-semibold mb-4 text-primary">Belangrijk om te weten</h3>
              <ul className="space-y-3">
                {[
                  "De staat van het voertuig op de dag van taxatie is bepalend",
                  "Werkzaamheden moeten vóór de taxatiedatum zijn uitgevoerd — niet achteraf",
                  "De cataloguswaarde inclusief btw en bpm vormt altijd de basis",
                  "Accessoires aangebracht vóór kentekentoekenning tellen mee in de waarde",
                  "Zo blijft de taxatie fiscaal verdedigbaar bij controle",
                ].map((item, i) => (
                  <li key={i} className="flex items-start gap-3">
                    <CheckCircle className="w-5 h-5 text-cta flex-shrink-0 mt-0.5" />
                    <span className="text-[15px]" style={{ color: '#4a5568' }}>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <h3 className="font-display text-xl md:text-2xl font-semibold mb-4 text-primary">Wat hebben wij nodig?</h3>
              <ul className="space-y-3">
                {[
                  "Naam en contactgegevens",
                  "Voertuiggegevens: kenteken, merk, type, bouwjaar en kilometerstand",
                  "Fiscale context: bijv. zakelijk naar privé of privé naar zakelijk",
                  "Relevante documentatie: onderhoudsboekje, facturen van accessoires",
                  "Eventuele schaderapporten of eerdere taxaties (indien aanwezig)",
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

      {/* NIEUW — Sectie 4: FAQ */}
      <section className="py-12 md:py-16 px-6 md:px-8" style={{ background: '#f7f8fa' }}>
        <div className="container-wide">
          <div className="text-center mb-10">
            <p className="uppercase text-[11px] font-semibold tracking-[0.12em] text-cta mb-3">Veelgestelde vragen</p>
            <h2 className="font-display text-2xl md:text-3xl font-semibold text-primary">Veelgestelde vragen over de WEV-taxatie</h2>
          </div>
          <div className="max-w-[780px] mx-auto">
            <Accordion type="single" collapsible className="space-y-3">
              {[
                { q: "Wat is het verschil tussen WEV en dagwaarde?", a: "De WEV (Waarde Economisch Verkeer) is de prijs bij vrijwillige verkoop tussen onafhankelijke partijen onder normale omstandigheden. De dagwaarde is een bredere term die ook in andere contexten wordt gebruikt. Voor fiscale doeleinden gebruikt de Belastingdienst de WEV als grondslag, niet de dagwaarde." },
                { q: "Wanneer heb ik een WEV-taxatie nodig?", a: "Je hebt een WEV-taxatie nodig als je een zakelijke auto naar privé wil overbrengen, een privéauto op de zaak wil zetten, of als een voertuig wordt overgedragen tussen een BV en haar aandeelhouder of directeur-grootaandeelhouder. Een objectief rapport voorkomt discussies met de Belastingdienst." },
                { q: "Hoe lang duurt de taxatie en wanneer ontvang ik het rapport?", a: "De fysieke inspectie duurt gemiddeld 30 tot 45 minuten. Je ontvangt het volledige, ondertekende taxatierapport digitaal binnen 3 werkdagen na de inspectie. Het rapport is direct bruikbaar voor je administratie of aangifte." },
                { q: "Waar voeren jullie de taxatie uit?", a: "Wij komen op locatie bij jou — thuis, op je bedrijfsadres of bij een garage. Wij zijn werkzaam in het grootste gedeelte van Nederland." },
                { q: "Is het rapport geldig als tegenbewijs bij de Belastingdienst?", a: "Het rapport is opgesteld door een Notarieel Beëdigd TMV Register-Taxateur en Register-Taxateur VRT en is stevig onderbouwd met marktdata, inspectieresultaten en koerslijsten. Het vormt daarmee een solide en controleerbare basis bij je aangifte of bij een eventueel bezwaar. De uiteindelijke beoordeling ligt altijd bij de Belastingdienst zelf." },
              ].map((faq, i) => (
                <AccordionItem key={i} value={`faq-${i}`} className="rounded-lg border-0 overflow-hidden" style={{ background: '#e8ecf1' }}>
                  <AccordionTrigger className="px-5 py-4 text-[15px] font-semibold text-left hover:no-underline" style={{ color: '#1d3c71' }}>
                    {faq.q}
                  </AccordionTrigger>
                  <AccordionContent className="px-5 pb-5 text-[15px] leading-relaxed bg-white border-l-4" style={{ borderColor: '#1d3c71', color: '#4a5568' }}>
                    {faq.a}
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </div>
        </div>
      </section>

      {/* Werkwijze stappen — ongewijzigd */}
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

      {/* CTA blok — ongewijzigd */}
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

      {/* Onafhankelijk — ongewijzigd */}
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

      {/* Formulier — ongewijzigd */}
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
