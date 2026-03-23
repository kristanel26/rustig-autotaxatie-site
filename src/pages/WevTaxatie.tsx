import WhatsAppButton from "@/components/WhatsAppButton";
import { useRef } from "react";
import { Link } from "react-router-dom";
import LandingHero from "@/components/LandingHero";
import IntakeForm from "@/components/IntakeForm";
import SiteHeader from "@/components/SiteHeader";
import SiteFooter from "@/components/SiteFooter";
import PageMeta from "@/components/PageMeta";
import UspBar from "@/components/UspBar";
import StatsBar from "@/components/StatsBar";
import { Button } from "@/components/ui/button";
import { ArrowRight, ArrowDown, CheckCircle, Shield, Building2, RefreshCw, FileText, Search, BarChart3, TrendingUp, Gauge, Wrench, FileCheck, Info } from "lucide-react";
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

      {/* Wanneer nodig */}
      <section className="py-14 md:py-16 px-6 md:px-8" style={{ background: '#f7f8fa' }}>
        <div className="container-wide">
          <div className="text-center mb-10">
            <p className="uppercase text-[12px] font-semibold tracking-[0.15em] mb-2" style={{ color: '#ff751f', fontFamily: "'Inter', sans-serif" }}>WANNEER NODIG</p>
            <h2 className="heading-display text-2xl md:text-3xl font-bold mb-3" style={{ color: '#1d3c71' }}>Wanneer is een WEV-taxatie nodig?</h2>
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
              <div
                key={i}
                className="bg-white rounded-[12px] p-6 transition-all duration-200 hover:-translate-y-[2px] hover:shadow-lg"
                style={{
                  boxShadow: '0 4px 16px rgba(0,0,0,0.08)',
                  borderLeft: '3px solid transparent',
                }}
                onMouseEnter={(e) => (e.currentTarget.style.borderLeftColor = '#ff751f')}
                onMouseLeave={(e) => (e.currentTarget.style.borderLeftColor = 'transparent')}
              >
                <div className="w-[48px] h-[48px] rounded-full flex items-center justify-center mb-3" style={{ background: '#EBF2FB' }}>
                  <item.icon className="w-[22px] h-[22px]" style={{ color: '#1d3c71' }} />
                </div>
                <h3 className="font-bold text-[15px] mb-1" style={{ fontFamily: "'Inter', sans-serif", color: '#1d3c71' }}>{item.label}</h3>
                <p style={{ fontFamily: "'Inter', sans-serif", fontSize: 13, color: '#666' }}>{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Wat is WEV? — 60/40 */}
      <section className="py-14 md:py-16 px-6 md:px-8 bg-background">
        <div className="container-wide">
          <div className="grid md:grid-cols-[1fr_0.7fr] gap-8 items-start">
            <div>
              <p className="uppercase text-[12px] font-semibold tracking-[0.15em] mb-2" style={{ color: '#ff751f', fontFamily: "'Inter', sans-serif" }}>WAT IS WEV</p>
              <h2 className="heading-display text-2xl md:text-3xl font-bold mb-4" style={{ color: '#1d3c71' }}>Waarde in het Economisch Verkeer: wat betekent dat?</h2>
              <p className="text-[15px] leading-relaxed mb-5" style={{ color: '#4a5568' }}>
                WEV staat voor Waarde in het Economisch Verkeer. Dit is de prijs waarvoor een voertuig normaliter door de meestbiedende koper zou worden overgenomen bij vrijwillige verkoop tussen onafhankelijke partijen.
              </p>
              <p className="text-[15px] leading-relaxed" style={{ color: '#4a5568' }}>
                Voor de Belastingdienst vormt de WEV de grondslag voor de verrekening van het privégebruik van een auto. De basis is altijd de oorspronkelijke cataloguswaarde inclusief btw en bpm, inclusief alle accessoires die zijn aangebracht vóór het toekennen van het kenteken aan het voertuig.
              </p>
            </div>
            <div className="rounded-[12px] p-8" style={{ background: '#EBF2FB', boxShadow: '0 4px 20px rgba(29,60,113,0.08)' }}>
              <div className="flex items-center justify-center rounded-full mb-4 mx-auto" style={{ width: 48, height: 48, background: 'rgba(29,60,113,0.12)' }}>
                <Info className="w-6 h-6" style={{ color: '#1d3c71' }} />
              </div>
              <h3 className="font-semibold text-center mb-4" style={{ color: '#1d3c71' }}>Waarvoor gebruikt de Belastingdienst de WEV?</h3>
              <ul className="space-y-3">
                {[
                  "Grondslag voor verrekening privégebruik auto",
                  "Basis bij overdracht voertuig van zaak naar privé",
                  "Uitgangspunt bij inbreng privéauto in de onderneming",
                  "Referentie bij controle door de Belastingdienst",
                ].map((item, i) => (
                  <li key={i} className="flex items-start gap-3">
                    <div className="w-[22px] h-[22px] rounded-full flex items-center justify-center flex-shrink-0 mt-0.5" style={{ background: 'rgba(255,117,31,0.12)' }}>
                      <CheckCircle className="w-[14px] h-[14px]" style={{ color: '#ff751f' }} />
                    </div>
                    <span className="text-[15px]" style={{ color: '#4a5568' }}>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Hoe bepalen wij de waarde? */}
      <section className="py-14 md:py-16 px-6 md:px-8" style={{ background: '#f7f8fa' }}>
        <div className="container-wide">
          <div className="text-center mb-10">
            <p className="uppercase text-[12px] font-semibold tracking-[0.15em] mb-2" style={{ color: '#ff751f', fontFamily: "'Inter', sans-serif" }}>ONZE WERKWIJZE</p>
            <h2 className="heading-display text-2xl md:text-3xl font-bold mb-3" style={{ color: '#1d3c71' }}>Hoe bepalen wij de waarde van jouw voertuig?</h2>
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
              <div
                key={i}
                className="bg-white rounded-[12px] p-6 transition-all duration-200 hover:-translate-y-[2px] hover:shadow-lg"
                style={{
                  boxShadow: '0 4px 16px rgba(0,0,0,0.08)',
                  borderTop: '3px solid #ff751f',
                  borderRadius: '3px 3px 12px 12px',
                }}
              >
                <div className="w-[48px] h-[48px] rounded-full flex items-center justify-center mb-3" style={{ background: '#EBF2FB' }}>
                  <item.icon className="w-[22px] h-[22px]" style={{ color: '#1d3c71' }} />
                </div>
                <h3 className="font-bold text-[15px] mb-1" style={{ fontFamily: "'Inter', sans-serif", color: '#1d3c71' }}>{item.title}</h3>
                <p style={{ fontFamily: "'Inter', sans-serif", fontSize: 13, color: '#666', lineHeight: 1.65 }}>{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Belangrijk om te weten + Wat hebben wij nodig */}
      <section className="py-14 md:py-16 px-6 md:px-8 bg-background">
        <div className="container-wide">
          <div className="grid md:grid-cols-2 gap-8">
            <div>
              <div className="w-[40px] h-[3px] mb-3" style={{ background: '#ff751f' }} />
              <h2 className="heading-display text-[22px] font-bold mb-5" style={{ color: '#1d3c71' }}>Belangrijk om te weten</h2>
              <div className="space-y-[10px]">
                {[
                  "De staat van het voertuig op de dag van taxatie is bepalend",
                  "Werkzaamheden moeten vóór de taxatiedatum zijn uitgevoerd. Niet achteraf.",
                  "De cataloguswaarde inclusief btw en bpm vormt altijd de basis",
                  "Accessoires aangebracht vóór kentekentoekenning tellen mee in de waarde",
                  "Zo blijft de taxatie fiscaal verdedigbaar bij controle",
                ].map((item, i) => (
                  <div key={i} className="flex items-center gap-4 bg-white rounded-[10px] px-5 py-4" style={{ boxShadow: '0 2px 12px rgba(0,0,0,0.06)' }}>
                    <div className="w-[22px] h-[22px] rounded-full flex items-center justify-center flex-shrink-0" style={{ background: 'rgba(255,117,31,0.12)' }}>
                      <CheckCircle className="w-[14px] h-[14px]" style={{ color: '#ff751f' }} />
                    </div>
                    <span style={{ fontFamily: "'Inter', sans-serif", fontSize: 15, color: '#1a1a1a', lineHeight: 1.5 }}>{item}</span>
                  </div>
                ))}
              </div>
            </div>
            <div>
              <div className="w-[40px] h-[3px] mb-3" style={{ background: '#ff751f' }} />
              <h2 className="heading-display text-[22px] font-bold mb-5" style={{ color: '#1d3c71' }}>Wat hebben wij nodig?</h2>
              <div className="space-y-[10px]">
                {[
                  "Naam en contactgegevens",
                  "Voertuiggegevens: kenteken, merk, type, bouwjaar en kilometerstand",
                  "Fiscale context: bijv. zakelijk naar privé of privé naar zakelijk",
                  "Relevante documentatie: onderhoudsboekje, facturen van accessoires",
                  "Eventuele schaderapporten of eerdere taxaties (indien aanwezig)",
                ].map((item, i) => (
                  <div key={i} className="flex items-center gap-4 bg-white rounded-[10px] px-5 py-4" style={{ boxShadow: '0 2px 12px rgba(0,0,0,0.06)' }}>
                    <div className="w-[22px] h-[22px] rounded-full flex items-center justify-center flex-shrink-0" style={{ background: 'rgba(255,117,31,0.12)' }}>
                      <CheckCircle className="w-[14px] h-[14px]" style={{ color: '#ff751f' }} />
                    </div>
                    <span style={{ fontFamily: "'Inter', sans-serif", fontSize: 15, color: '#1a1a1a', lineHeight: 1.5 }}>{item}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="py-14 md:py-16 px-6 md:px-8" style={{ background: '#f7f8fa' }}>
        <div className="container-wide">
          <div className="text-center mb-10">
            <p className="uppercase text-[12px] font-semibold tracking-[0.15em] mb-2" style={{ color: '#ff751f', fontFamily: "'Inter', sans-serif" }}>VEELGESTELDE VRAGEN</p>
            <h2 className="heading-display text-2xl md:text-3xl font-bold" style={{ color: '#1d3c71' }}>Veelgestelde vragen over de WEV-taxatie</h2>
          </div>
          <div className="max-w-[780px] mx-auto">
            <Accordion type="single" collapsible className="space-y-3">
              {[
                { q: "Wat is het verschil tussen WEV en dagwaarde?", a: "De WEV (Waarde Economisch Verkeer) is de prijs bij vrijwillige verkoop tussen onafhankelijke partijen onder normale omstandigheden. De dagwaarde is een bredere term die ook in andere contexten wordt gebruikt. Voor fiscale doeleinden gebruikt de Belastingdienst de WEV als grondslag, niet de dagwaarde." },
                { q: "Wanneer heb ik een WEV-taxatie nodig?", a: "Je hebt een WEV-taxatie nodig als je een zakelijke auto naar privé wil overbrengen, een privéauto op de zaak wil zetten, of als een voertuig wordt overgedragen tussen een BV en haar aandeelhouder of directeur-grootaandeelhouder. Een objectief rapport voorkomt discussies met de Belastingdienst." },
                { q: "Hoe lang duurt de taxatie en wanneer ontvang ik het rapport?", a: "De fysieke inspectie duurt gemiddeld 30 tot 45 minuten. Je ontvangt het volledige, ondertekende taxatierapport digitaal binnen 3 werkdagen na de inspectie. Het rapport is direct bruikbaar voor je administratie of aangifte." },
                { q: "Waar voeren jullie de taxatie uit?", a: "Wij komen op locatie bij jou. Thuis, op je bedrijfsadres of bij een garage. Wij zijn werkzaam in het grootste gedeelte van Nederland." },
                { q: "Is het rapport geldig als tegenbewijs bij de Belastingdienst?", a: "Het rapport is opgesteld door een Notarieel Beëdigd TMV Register-Taxateur en Register-Taxateur VRT en is stevig onderbouwd met marktdata, inspectieresultaten en koerslijsten. Het vormt daarmee een solide en controleerbare basis bij je aangifte of bij een eventueel bezwaar. De uiteindelijke beoordeling ligt altijd bij de Belastingdienst zelf." },
              ].map((faq, i) => (
                <AccordionItem
                  key={i}
                  value={`faq-${i}`}
                  className="bg-white rounded-[8px] overflow-hidden data-[state=open]:shadow-md transition-all duration-200"
                  style={{ border: '1px solid #e8ecf0' }}
                >
                  <AccordionTrigger
                    className="px-5 py-4 text-[16px] font-semibold text-left hover:no-underline"
                    style={{ color: '#1a1a1a' }}
                  >
                    {faq.q}
                  </AccordionTrigger>
                  <AccordionContent
                    className="px-5 pb-5 text-[15px] leading-[1.7] border-l-4"
                    style={{ borderColor: '#1d3c71', color: '#555' }}
                  >
                    {faq.a}
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </div>
        </div>
      </section>

      {/* Werkwijze 5 stappen */}
      <section className="py-14 md:py-16 px-6 md:px-8" style={{ background: '#f7f8fa' }}>
        <div className="container-wide">
          <div className="text-center mb-8">
            <p className="uppercase text-[12px] font-semibold tracking-[0.15em] mb-2" style={{ color: '#ff751f', fontFamily: "'Inter', sans-serif" }}>WERKWIJZE</p>
            <h2 className="heading-display text-2xl md:text-3xl font-bold" style={{ color: '#1d3c71' }}>Onze werkwijze in 5 stappen</h2>
          </div>
          <div className="relative">
            <div className="hidden md:block absolute top-[26px] left-[10%] right-[10%] h-[2px]" style={{ background: '#698db3' }} />
            <div className="grid md:grid-cols-5 gap-5 relative">
              {[
                { step: 1, title: "Gegevens aanleveren", desc: "Kenteken, type, bouwjaar en fiscale context" },
                { step: 2, title: "Fysieke inspectie", desc: "De staat op dat moment is bepalend voor de waarde" },
                { step: 3, title: "WEV vaststellen", desc: "Op basis van inspectie en marktgegevens" },
                { step: 4, title: "Rapport opstellen", desc: "Helder en controleerbaar taxatierapport" },
                { step: 5, title: "Oplevering", desc: "Digitaal, klaar voor administratie of Belastingdienst" },
              ].map((s) => (
                <div key={s.step} className="text-center relative z-10">
                  <div
                    className="w-[52px] h-[52px] rounded-full flex items-center justify-center mx-auto mb-3 text-white font-bold text-[20px]"
                    style={{ background: '#1d3c71', boxShadow: '0 0 0 3px #ff751f' }}
                  >
                    {s.step}
                  </div>
                  <h4 className="font-bold text-[15px] mb-1" style={{ fontFamily: "'Inter', sans-serif", color: '#1a1a1a' }}>{s.title}</h4>
                  <p className="text-[13px] leading-relaxed" style={{ color: '#666' }}>{s.desc}</p>
                </div>
              ))}
            </div>
          </div>
          <div className="flex flex-col sm:flex-row gap-3 justify-center mt-8">
            <Button variant="cta" size="lg" onClick={scrollToForm}>
              WEV-taxatie aanvragen
              <ArrowDown className="w-4 h-4 ml-2" />
            </Button>
            <Link to="/wev-stappenplan">
              <Button variant="outline" size="lg" className="border-2" style={{ borderColor: '#1d3c71', color: '#1d3c71' }}>
                Meer weten? Bekijk het stappenplan
                <ArrowRight className="w-4 h-4 ml-2" />
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* CTA blok */}
      <section className="py-12 md:py-14 px-6 md:px-8" style={{ background: 'linear-gradient(135deg, #1d3c71 0%, #2a4f8a 100%)' }}>
        <div className="container-wide text-center">
          <h2 className="heading-display text-2xl md:text-3xl font-bold text-white mb-3">WEV-taxatie nodig?</h2>
          <p className="text-[15px] mb-6 max-w-xl mx-auto" style={{ color: 'rgba(255,255,255,0.75)' }}>
            Vraag vrijblijvend aan. Wij plannen de taxatie op basis van jouw situatie.
          </p>
          <Button variant="cta" size="lg" onClick={scrollToForm}>
            WEV-taxatie aanvragen
            <ArrowDown className="w-4 h-4 ml-2" />
          </Button>
        </div>
      </section>

      <StatsBar />

      {/* Formulier */}
      <section className="py-14 md:py-16 px-6 md:px-8 bg-background" ref={formRef}>
        <div className="container-wide">
          <div className="text-center mb-8">
            <p className="uppercase text-[12px] font-semibold tracking-[0.15em] mb-2" style={{ color: '#ff751f', fontFamily: "'Inter', sans-serif" }}>AANVRAGEN</p>
            <h2 className="heading-display text-2xl md:text-3xl font-bold mb-2" style={{ color: '#1d3c71' }}>WEV-taxatie aanvragen</h2>
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