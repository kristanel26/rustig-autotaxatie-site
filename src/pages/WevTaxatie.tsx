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
import {
  ArrowRight, ArrowDown, CheckCircle, Shield, Building2, Car, Scale,
  ShieldCheck, ArrowLeftRight, ArrowRightLeft, FileText, Search, BarChart3,
  TrendingUp, Gauge, Wrench, FileCheck, Info, Award, Users,
} from "lucide-react";
import ContactSidebar from "@/components/ContactSidebar";
import serviceWev from "@/assets/hero-wev-taxatie.png";

/* ── Shared tiny component ────────────────────────────── */
const OrangeCheck = ({ text }: { text: string }) => (
  <li className="flex items-start gap-3">
    <div className="w-[20px] h-[20px] rounded-full flex items-center justify-center flex-shrink-0 mt-0.5" style={{ background: 'rgba(255,117,31,0.12)' }}>
      <CheckCircle className="w-[13px] h-[13px]" style={{ color: '#ff751f' }} />
    </div>
    <span className="text-[15px]" style={{ color: '#4a5568' }}>{text}</span>
  </li>
);

/* ── Data ─────────────────────────────────────────────── */
const wanneerNodigCards = [
  { icon: ArrowLeftRight, label: "Zakelijk naar privé", desc: "Wil je als ondernemer je zakelijke auto naar privé overbrengen? Een WEV-taxatierapport bepaalt de juiste overdrachtsprijs en voorkomt discussies met de Belastingdienst." },
  { icon: ArrowRightLeft, label: "Privé naar zakelijk", desc: "Zet je een privéauto op de zaak? Dan is de WEV de grondslag voor de verrekening van het privégebruik. Een taxatierapport zorgt voor een correcte en verdedigbare administratie." },
  { icon: Car, label: "Youngtimer zakelijk rijden", desc: "Rijd je zakelijk in een auto van 15 jaar of ouder? Dan betaal je bijtelling over de WEV in plaats van de cataloguswaarde. Een lagere WEV betekent direct minder bijtelling. Een taxatierapport onderbouwt deze waarde tegenover de Belastingdienst." },
  { icon: Building2, label: "BV en DGA", desc: "Draag je als directeur-grootaandeelhouder een voertuig over van je BV naar privé of omgekeerd? De Belastingdienst vereist een objectieve waardebepaling door een erkend taxateur voor een correcte en transparante boeking." },
  { icon: Scale, label: "Erfenis en scheiding", desc: "Zijn er voertuigen betrokken bij een erfenis of echtscheiding? Een WEV-taxatie geeft een heldere, objectieve waardebepaling die zorgt voor een eerlijke boedelverdeling zonder discussies tussen de betrokken partijen." },
  { icon: ShieldCheck, label: "Controle voorkomen", desc: "Een objectief taxatierapport van een erkend taxateur is je beste bescherming bij een boekencontrole. De Belastingdienst accepteert geen zelf bepaalde of geschatte waardes." },
];

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
        heroImagePosition="center 20%"
        compact
      />
      <UspBar />

      {/* ── SECTIE A — Wanneer nodig (6 verbeterde kaartjes) ────── */}
      <section className="py-14 md:py-16 px-6 md:px-8" style={{ background: '#f7f8fa' }}>
        <div className="container-wide">
          <div className="text-center mb-10">
            <p className="uppercase text-[12px] font-semibold tracking-[0.15em] mb-2" style={{ color: '#ff751f', fontFamily: "'Inter', sans-serif" }}>WANNEER NODIG</p>
            <h2 className="heading-display text-2xl md:text-3xl font-bold mb-3" style={{ color: '#1d3c71' }}>Wanneer is een WEV-taxatie nodig?</h2>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {wanneerNodigCards.map((item, i) => (
              <div
                key={i}
                className="bg-white rounded-[10px] p-6 transition-all duration-200 hover:-translate-y-[2px] hover:shadow-lg"
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
                <h3 className="font-bold text-[15px] mb-2" style={{ fontFamily: "'Inter', sans-serif", color: '#1d3c71' }}>{item.label}</h3>
                <p style={{ fontFamily: "'Inter', sans-serif", fontSize: 13, color: '#666', lineHeight: 1.65 }}>{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Wat is WEV? — 60/40 ──────────────────────────────── */}
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
                  <OrangeCheck key={i} text={item} />
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* ── Hoe bepalen wij de waarde? ───────────────────────── */}
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
                className="bg-white rounded-[10px] p-6 transition-all duration-200 hover:-translate-y-[2px] hover:shadow-lg"
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
                <h3 className="font-bold text-[15px] mb-1" style={{ fontFamily: "'Inter', sans-serif", color: '#1d3c71' }}>{item.title}</h3>
                <p style={{ fontFamily: "'Inter', sans-serif", fontSize: 13, color: '#666', lineHeight: 1.65 }}>{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── SECTIE B — Youngtimerregeling (60/40, wit) ────────── */}
      <section className="py-14 md:py-16 px-6 md:px-8 bg-background">
        <div className="container-wide">
          <div className="grid md:grid-cols-[1fr_0.7fr] gap-8 items-start">
            <div>
              <p className="uppercase text-[12px] font-semibold tracking-[0.15em] mb-2" style={{ color: '#ff751f', fontFamily: "'Inter', sans-serif" }}>YOUNGTIMERREGELING</p>
              <h2 className="heading-display text-2xl md:text-3xl font-bold mb-4" style={{ color: '#1d3c71' }}>
                Zakelijk rijden in een youngtimer? De WEV bepaalt je bijtelling.
              </h2>
              <p className="text-[15px] leading-relaxed mb-4" style={{ color: '#4a5568' }}>
                Een youngtimer is een auto van 15 jaar of ouder. Voor zakelijke rijders geldt een bijzondere bijtellingsregeling: in plaats van de gebruikelijke bijtelling over de cataloguswaarde, betaal je slechts 35% bijtelling over de WEV, de actuele dagwaarde van het voertuig.
              </p>
              <p className="text-[15px] leading-relaxed mb-5" style={{ color: '#4a5568' }}>
                Hoe lager de WEV, hoe lager je maandelijkse bijtelling. Een correct en erkend WEV-taxatierapport is verplicht om deze regeling te mogen toepassen. Zonder rapport kan de Belastingdienst de bijtelling op basis van de cataloguswaarde berekenen, wat aanzienlijk duurder uitpakt.
              </p>
              <ul className="space-y-3">
                <OrangeCheck text="Bijtelling berekend over de actuele dagwaarde, niet de catalogusprijs" />
                <OrangeCheck text="Rapport verplicht om de youngtimerregeling te mogen toepassen" />
                <OrangeCheck text="Jaarlijks opnieuw laten taxeren kan de bijtelling verder verlagen" />
              </ul>
            </div>

            {/* Rekenvoorbeeld kaartje */}
            <div className="rounded-[10px] p-6" style={{ background: '#EBF2FB' }}>
              <p className="uppercase text-[11px] font-semibold tracking-[0.15em] mb-2" style={{ color: '#ff751f' }}>REKENVOORBEELD</p>
              <h3 className="font-bold text-[16px] mb-5" style={{ color: '#1d3c71' }}>Youngtimer vs. nieuwe auto</h3>

              {/* Nieuwe auto */}
              <div className="mb-4 pb-4" style={{ borderBottom: '1px solid rgba(29,60,113,0.12)' }}>
                <p className="font-semibold text-[14px] mb-2" style={{ color: '#1d3c71' }}>Nieuwe auto</p>
                <div className="space-y-1 text-[13px]" style={{ color: '#4a5568' }}>
                  <p>Cataloguswaarde: € 75.000</p>
                  <p>Bijtelling: 22% over € 75.000</p>
                  <p className="font-bold" style={{ color: '#c0392b' }}>Bijtelling per jaar: € 16.500</p>
                </div>
              </div>

              {/* Youngtimer */}
              <div className="mb-5">
                <p className="font-semibold text-[14px] mb-2" style={{ color: '#1d3c71' }}>Youngtimer (zelfde auto, 16 jaar oud)</p>
                <div className="space-y-1 text-[13px]" style={{ color: '#4a5568' }}>
                  <p>WEV (getaxeerde dagwaarde): € 8.000</p>
                  <p>Bijtelling: 35% over € 8.000</p>
                  <p className="font-bold" style={{ color: '#1d7a3a' }}>Bijtelling per jaar: € 2.800</p>
                </div>
              </div>

              <div className="pt-4" style={{ borderTop: '1px solid #ff751f' }}>
                <p className="font-bold text-[16px]" style={{ color: '#ff751f' }}>
                  Verschil: ruim € 13.700 per jaar minder bijtelling.
                </p>
              </div>
              <p className="text-[11px] mt-3" style={{ color: '#999' }}>
                Dit is een indicatief rekenvoorbeeld. De werkelijke besparing hangt af van de WEV en je belastingschijf.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ── SECTIE C — Erfenis en scheiding (50/50, lichtgrijs) ── */}
      <section className="py-14 md:py-16 px-6 md:px-8" style={{ background: '#f7f8fa' }}>
        <div className="container-wide">
          <div className="text-center mb-10">
            <p className="uppercase text-[12px] font-semibold tracking-[0.15em] mb-2" style={{ color: '#ff751f', fontFamily: "'Inter', sans-serif" }}>ANDERE SITUATIES</p>
            <h2 className="heading-display text-2xl md:text-3xl font-bold" style={{ color: '#1d3c71' }}>
              Een WEV-taxatie is ook nuttig bij erfenis of scheiding
            </h2>
          </div>
          <div className="grid md:grid-cols-2 gap-6">
            {/* Erfenis */}
            <div className="bg-white rounded-[10px] p-7" style={{ boxShadow: '0 4px 16px rgba(0,0,0,0.08)' }}>
              <div className="w-[48px] h-[48px] rounded-full flex items-center justify-center mb-4" style={{ background: '#EBF2FB' }}>
                <Scale className="w-[22px] h-[22px]" style={{ color: '#1d3c71' }} />
              </div>
              <h3 className="font-bold text-[16px] mb-3" style={{ color: '#1d3c71' }}>Erfenis: eerlijke boedelverdeling</h3>
              <p className="text-[14px] leading-relaxed mb-4" style={{ color: '#4a5568' }}>
                Zijn er voertuigen betrokken bij een nalatenschap? Een WEV-taxatie geeft een heldere, objectieve waardebepaling op het moment van overlijden. Zo weet iedereen zeker dat de verdeling eerlijk verloopt en ontstaan er geen discussies achteraf tussen erfgenamen.
              </p>
              <ul className="space-y-2">
                <OrangeCheck text="Objectieve waardebepaling op peildatum" />
                <OrangeCheck text="Erkend rapport als basis voor de aangifte erfbelasting" />
                <OrangeCheck text="Voorkomt conflicten tussen erfgenamen" />
              </ul>
            </div>

            {/* Scheiding */}
            <div className="bg-white rounded-[10px] p-7" style={{ boxShadow: '0 4px 16px rgba(0,0,0,0.08)' }}>
              <div className="w-[48px] h-[48px] rounded-full flex items-center justify-center mb-4" style={{ background: '#EBF2FB' }}>
                <Users className="w-[22px] h-[22px]" style={{ color: '#1d3c71' }} />
              </div>
              <h3 className="font-bold text-[16px] mb-3" style={{ color: '#1d3c71' }}>Scheiding: objectieve waarde bij boedelverdeling</h3>
              <p className="text-[14px] leading-relaxed mb-4" style={{ color: '#4a5568' }}>
                Gaan jullie uit elkaar en zijn er voertuigen onderdeel van de boedel? Een onafhankelijke WEV-taxatie zorgt voor een transparante en juridisch verdedigbare waardebepaling. Geen discussie over wat de auto waard is. Een erkend taxateur stelt dit objectief vast.
              </p>
              <ul className="space-y-2">
                <OrangeCheck text="Onafhankelijk en objectief vastgestelde waarde" />
                <OrangeCheck text="Erkend rapport bruikbaar bij notaris en rechtbank" />
                <OrangeCheck text="Voorkomt langdurige discussies over autowaarde" />
              </ul>
            </div>
          </div>
        </div>
      </section>

      <section className="py-14 md:py-16 px-6 md:px-8" style={{ background: '#f7f8fa' }}>
        <div className="container-wide">
          <div className="text-center mb-8">
            <p className="uppercase text-[12px] font-semibold tracking-[0.15em] mb-2" style={{ color: '#ff751f', fontFamily: "'Inter', sans-serif" }}>WERKWIJZE</p>
            <h2 className="heading-display text-2xl md:text-3xl font-bold" style={{ color: '#1d3c71' }}>Onze werkwijze in 5 stappen</h2>
          </div>
          <div className="relative">
            <div className="hidden md:block absolute top-[22px] left-[10%] right-[10%] h-[2px]" style={{ background: '#ff751f' }} />
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
                    className="w-[44px] h-[44px] rounded-full flex items-center justify-center mx-auto mb-3 text-white font-bold text-[18px]"
                    style={{ background: '#1d3c71' }}
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

      {/* ── CTA blok ─────────────────────────────────────────── */}
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

      {/* ── SECTIE D — Erkend rapport kaartjes ────────────────── */}
      <section className="py-14 md:py-16 px-6 md:px-8" style={{ background: '#f7f8fa' }}>
        <div className="container-wide">
          <div className="text-center mb-10">
            <p className="uppercase text-[12px] font-semibold tracking-[0.15em] mb-2" style={{ color: '#ff751f', fontFamily: "'Inter', sans-serif" }}>ONAFHANKELIJKHEID</p>
            <h2 className="heading-display text-2xl md:text-3xl font-bold" style={{ color: '#1d3c71' }}>Onafhankelijk en fiscaal verdedigbaar</h2>
          </div>
          <div className="grid sm:grid-cols-3 gap-6">
            {[
              { icon: Award, title: "Federatie TMV, VRT Register en FEHAC", desc: "Aangesloten bij alle erkende brancheorganisaties voor voertuigtaxateurs in Nederland." },
              { icon: ShieldCheck, title: "Geen vooraf afgesproken uitkomsten", desc: "Wij taxeren volledig onafhankelijk. Geen wensbedragen, geen afgesproken waardes. Dat is essentieel bij fiscale waarderingen." },
              { icon: FileCheck, title: "Transparant en controleerbaar", desc: "Elk rapport is stevig onderbouwd met marktdata, koerslijsten en inspectieresultaten. Verdedigbaar bij bezwaar en beroep." },
            ].map((col, i) => (
              <div key={i} className="bg-white text-center" style={{ borderRadius: 10, boxShadow: '0 2px 10px rgba(0,0,0,0.07)', padding: 28 }}>
                <div className="w-[48px] h-[48px] rounded-full flex items-center justify-center mx-auto mb-4" style={{ background: '#EBF2FB' }}>
                  <col.icon className="w-[22px] h-[22px]" style={{ color: '#1d3c71' }} />
                </div>
                <h3 className="font-bold mb-2" style={{ fontFamily: "'Playfair Display', serif", fontSize: 17, color: '#1d3c71', marginTop: 16 }}>{col.title}</h3>
                <p style={{ fontFamily: "'Inter', sans-serif", fontSize: 14, color: '#555', lineHeight: 1.6 }}>{col.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Formulier ────────────────────────────────────────── */}
      <section className="px-6 md:px-8" style={{ background: '#f7f8fa', paddingTop: 72, paddingBottom: 72 }} ref={formRef}>
        <div className="container-wide">
          <div className="text-center" style={{ marginBottom: 48 }}>
            <p className="uppercase font-semibold mb-2" style={{ fontSize: 12, letterSpacing: '0.1em', color: '#ff751f' }}>CONTACT</p>
            <h2 className="text-2xl md:text-3xl font-bold mb-2" style={{ fontFamily: 'Playfair Display, serif', color: '#1d3c71' }}>Vrijblijvend contact opnemen</h2>
            <p className="text-[15px] max-w-2xl mx-auto" style={{ color: '#4a5568' }}>
              Heb je een vraag over een WEV-taxatie of wil je een afspraak inplannen? Vul het formulier in en wij nemen binnen één werkdag contact met je op.
            </p>
          </div>
          <div className="grid md:grid-cols-[1fr_380px] gap-8 items-stretch">
            <div className="bg-white" style={{ borderRadius: 16, boxShadow: '0 8px 40px rgba(0,0,0,0.10)', overflow: 'hidden' }}>
              <IntakeForm
                serviceType="WEV-taxatie"
                formTitle="Stel je vraag of vraag een taxatie aan"
                formSubtext="Kenteken al bij de hand? Vul hem alvast in. Heb je een vraag? Omschrijf je situatie kort en wij kijken wat de beste aanpak is."
                styledKenteken
                toelichtingLabel="Jouw vraag of situatie"
                toelichtingPlaceholder="Bijv: ik wil mijn zakelijke auto naar privé overbrengen, of: ik heb een youngtimer en wil weten wat de bijtelling wordt."
                submitButtonText="Verstuur. Wij nemen contact op."
                footerText="We nemen binnen één werkdag contact met je op. Geen verplichtingen, gewoon een goed gesprek."
                compact={true}
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
