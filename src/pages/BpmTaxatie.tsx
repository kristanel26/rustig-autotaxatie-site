import WhatsAppButton from "@/components/WhatsAppButton";
import BekijkOok from "@/components/BekijkOok";
import Breadcrumbs from "@/components/Breadcrumbs";
import JsonLd from "@/components/JsonLd";
import { useRef } from "react";
import { Link } from "react-router-dom";
import LandingHero from "@/components/LandingHero";
import IntakeForm from "@/components/IntakeForm";
import BpmCalculator from "@/components/BpmCalculator";
import SiteHeader from "@/components/SiteHeader";
import SiteFooter from "@/components/SiteFooter";
import PageMeta from "@/components/PageMeta";
import UspBar from "@/components/UspBar";
import StatsBar from "@/components/StatsBar";
import ContactSidebar from "@/components/ContactSidebar";
import { Button } from "@/components/ui/button";
import { Users, FileText, Shield, Table, BarChart3, Search, ArrowDown, ArrowRight, CheckCircle, Scale, Award, ShieldCheck, FileCheck } from "lucide-react";
import erikHeroBpm from "@/assets/erik-bpm-taxatie-hero.jpg";

const sectionLabel = (text: string) => (
  <p className="uppercase font-semibold mb-3" style={{ fontSize: 12, letterSpacing: '0.1em', color: '#ff751f' }}>{text}</p>
);

const BpmTaxatie = () => {
  const formRef = useRef<HTMLDivElement>(null);
  const scrollToForm = () => formRef.current?.scrollIntoView({ behavior: "smooth" });

  const verwachtItems = [
    "Onafhankelijke beoordeling per voertuig",
    "Duidelijke uitleg over de gekozen methode",
    "Onderbouwing die standhoudt bij controle",
    "Geen wensbedragen of vooraf bepaalde uitkomsten",
  ];
  const nodigItems = [
    "Buitenlands kenteken of chassisnummer",
    "Aankoopfactuur van het voertuig",
    "Actuele kilometerstand",
    "Info over schade, gebruik en onderhoud",
  ];

  return (
    <div className="min-h-screen bg-background">
      <PageMeta
        title="BPM Taxatie bij Import | Laagste BPM | Automobiel Taxaties"
        description="De laagst haalbare BPM voor jou importvoertuig. Fysieke inspectie op locatie door een erkend TMV en VRT register taxateur. Gratis advies aanvragen."
      />
      <JsonLd data={{ "@context": "https://schema.org", "@type": "Service", "name": "BPM Taxatie", "provider": { "@type": "Organization", "name": "Automobiel Taxaties" }, "areaServed": "Netherlands", "url": "https://www.automobieltaxaties.nl/bpm-taxatie" }} />
      />
      <SiteHeader />
      <Breadcrumbs items={[{ label: "BPM Taxatie" }]} />
      <LandingHero
        subtitle="BPM-taxatie"
        title="BPM-taxatie bij import van voertuigen"
        description="Per voertuig bepalen wij welke methode fiscaal het meest logisch en verdedigbaar is. Zodat de aangifte klopt en standhoudt bij controle."
        ctaText="BPM-aangifte aanvragen"
        onCtaClick={scrollToForm}
        heroImage={erikHeroBpm}
        compact
      />
      <UspBar />

      {/* BPM Calculator — direct na hero */}
      <section className="px-6 md:px-8" style={{ background: '#f7f8fa', paddingTop: 72, paddingBottom: 72 }}>
        <div className="container-wide">
          <div className="mb-8">
            {sectionLabel("BPM Calculator")}
            <h2 className="font-bold mb-2" style={{ fontFamily: 'Playfair Display, serif', fontSize: 36, color: '#1d3c71' }}>Bereken jouw BPM indicatie</h2>
            <p className="text-[15px]" style={{ color: '#4a5568', maxWidth: 540 }}>
              Gebruik onze calculator voor een eerste indicatie van de BPM-kosten bij import. Let op: een berekening is geen taxatie en biedt geen juridische onderbouwing.
            </p>
          </div>
          <BpmCalculator />
        </div>
      </section>

      {/* 1 — Intro – wit */}
      <section className="px-6 md:px-8" style={{ background: '#ffffff', paddingTop: 72, paddingBottom: 72 }}>
        <div className="container-wide">
          <div className="grid md:grid-cols-[1fr_400px] gap-12 items-center">
            <div>
              {sectionLabel("BPM-taxatie")}
              <div className="mb-4" style={{ width: 48, height: 3, background: '#ff751f', borderRadius: 2 }} />
              <h2 className="font-bold mb-4" style={{ fontFamily: 'Playfair Display, serif', fontSize: 36, color: '#1d3c71' }}>BPM bij import van voertuigen</h2>
              <p className="text-[15px] leading-relaxed" style={{ color: '#4a5568' }}>
                Bij import van een voertuig uit het buitenland moet BPM worden aangegeven. De manier waarop de BPM wordt vastgesteld verschilt per situatie en heeft direct invloed op de onderbouwing richting de Belastingdienst.
              </p>
            </div>
            <div className="rounded-2xl p-8 flex flex-col items-center text-center" style={{ background: '#1d3c71' }}>
              <div className="w-16 h-16 rounded-full flex items-center justify-center mb-5" style={{ background: 'rgba(255,255,255,0.12)' }}>
                <FileCheck className="w-8 h-8 text-white" />
              </div>
              <p className="text-[17px] font-semibold leading-snug text-white" style={{ fontFamily: 'Playfair Display, serif' }}>
                Per voertuig bepalen wij welke methode fiscaal het meest verdedigbaar is.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 2 — Voor wie – donkerblauw */}
      <section className="px-6 md:px-8" style={{ background: '#1d3c71', paddingTop: 72, paddingBottom: 72 }}>
        <div className="container-wide">
          <div className="text-center mb-10">
            <p className="uppercase font-semibold mb-2" style={{ fontSize: 12, letterSpacing: '0.1em', color: '#ff751f' }}>Voor wie</p>
            <h2 className="text-2xl md:text-3xl font-bold text-white mb-3" style={{ fontFamily: 'Playfair Display, serif' }}>Voor wie is dit bedoeld?</h2>
            <p className="text-[15px] max-w-2xl mx-auto" style={{ color: 'rgba(255,255,255,0.7)' }}>
              Voor autobedrijven, handelaren en importeurs die het BPM-traject correct willen laten uitvoeren. Ook particulieren die zekerheid willen over de methode en onderbouwing.
            </p>
          </div>
          <div className="grid sm:grid-cols-2 md:grid-cols-4 gap-6">
            {[
              { icon: Users, label: "Autobedrijven", desc: "Dealers en garagebedrijven" },
              { icon: Scale, label: "Handelaren", desc: "Import- en exporthandel" },
              { icon: FileText, label: "Importeurs", desc: "Professionele voertuigimport" },
              { icon: Shield, label: "Particulieren", desc: "Privé-import uit het buitenland" },
            ].map((item, i) => (
              <div
                key={i}
                className="text-center cursor-default"
                style={{
                  padding: '32px 24px',
                  borderRadius: 14,
                  background: 'rgba(255,255,255,0.08)',
                  border: '1px solid rgba(255,255,255,0.15)',
                  transition: 'transform 200ms ease, background 200ms ease, border-color 200ms ease',
                }}
                onMouseEnter={e => { e.currentTarget.style.transform = 'translateY(-2px)'; e.currentTarget.style.borderColor = '#698db3'; }}
                onMouseLeave={e => { e.currentTarget.style.transform = 'translateY(0)'; e.currentTarget.style.borderColor = 'rgba(255,255,255,0.15)'; }}
              >
                <div className="mx-auto flex items-center justify-center rounded-full mb-4" style={{ width: 64, height: 64, background: 'rgba(255,255,255,0.15)' }}>
                  <item.icon style={{ width: 28, height: 28, color: '#ffffff' }} />
                </div>
                <p className="font-bold text-[16px] mb-1 text-white">{item.label}</p>
                <p className="text-[13px]" style={{ color: '#adafc7' }}>{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 3 — Drie methodes – wit */}
      <section className="px-6 md:px-8" style={{ background: '#ffffff', paddingTop: 72, paddingBottom: 72 }}>
        <div className="container-wide">
          <div className="text-center mb-10">
            {sectionLabel("Methodes")}
            <h2 className="text-2xl md:text-3xl font-bold mb-2" style={{ fontFamily: 'Playfair Display, serif', color: '#1d3c71' }}>Drie methodes om BPM vast te stellen</h2>
            <p className="text-[15px] max-w-2xl mx-auto" style={{ color: '#4a5568' }}>
              De Belastingdienst staat meerdere methodes toe. Welke van toepassing is, hangt af van het voertuig en de staat.
            </p>
          </div>
          <div className="grid md:grid-cols-3 gap-6">
            {[
              { icon: Table, title: "Afschrijvingstabel", desc: "Een forfaitaire tabel op basis van de leeftijd van het voertuig. Houdt geen rekening met de werkelijke staat." },
              { icon: BarChart3, title: "Koerslijst", desc: "Een gestandaardiseerde waardebepaling op basis van merk, model en uitvoering. Geen individuele beoordeling." },
              { icon: Search, title: "BPM-taxatierapport", desc: "Een onderbouwing op basis van fysieke inspectie door een geregistreerd taxateur. De werkelijke staat is het uitgangspunt." },
            ].map((method, i) => (
              <div
                key={i}
                className="bg-white"
                style={{
                  borderRadius: 12,
                  padding: 28,
                  borderBottom: '3px solid #ff751f',
                  boxShadow: '0 4px 20px rgba(0,0,0,0.08)',
                  transition: 'transform 200ms ease, box-shadow 200ms ease',
                }}
                onMouseEnter={e => { e.currentTarget.style.transform = 'translateY(-3px)'; e.currentTarget.style.boxShadow = '0 8px 32px rgba(0,0,0,0.12)'; }}
                onMouseLeave={e => { e.currentTarget.style.transform = 'translateY(0)'; e.currentTarget.style.boxShadow = '0 4px 20px rgba(0,0,0,0.08)'; }}
              >
                <div className="inline-flex items-center justify-center rounded-full mb-4" style={{ width: 56, height: 56, background: '#EBF2FB' }}>
                  <method.icon style={{ width: 24, height: 24, color: '#1d3c71' }} />
                </div>
                <h3 className="font-bold mb-2" style={{ color: '#1d3c71', fontFamily: 'Inter, sans-serif', fontSize: 17 }}>{method.title}</h3>
                <p className="text-[14px]" style={{ color: '#555', lineHeight: 1.65 }}>{method.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 4 — Werkwijze – lichtgrijs */}
      <section className="px-6 md:px-8" style={{ background: '#f7f8fa', paddingTop: 72, paddingBottom: 72 }}>
        <div className="container-wide">
          <div className="text-center mb-12">
            {sectionLabel("Werkwijze")}
            <h2 className="text-2xl md:text-3xl font-bold" style={{ fontFamily: 'Playfair Display, serif', color: '#1d3c71' }}>Onze werkwijze in 5 stappen</h2>
          </div>
          <div className="grid md:grid-cols-5 gap-8 relative">
            <div className="hidden md:block absolute" style={{ top: 22, left: 'calc(10% + 22px)', right: 'calc(10% + 22px)', height: 2, background: '#ff751f', zIndex: 0 }} />
            {[
              { step: 1, title: "Gegevens aanleveren", desc: "Kenteken, chassisnummer, factuur en documenten" },
              { step: 2, title: "Methode beoordelen", desc: "Per voertuig de fiscaal logische aanpak bepalen" },
              { step: 3, title: "Uitvoering", desc: "Aangifte op basis van tabel, koerslijst of taxatie" },
              { step: 4, title: "Aangifte opstellen", desc: "Compleet en controleerbaar opgebouwd" },
              { step: 5, title: "Oplevering", desc: "Per e-mail, klaar om te ondertekenen en versturen" },
            ].map((s) => (
              <div key={s.step} className="text-center relative z-10">
                <div
                  className="mx-auto mb-4 flex items-center justify-center rounded-full text-white font-bold"
                  style={{ width: 44, height: 44, background: '#1d3c71', fontFamily: 'Playfair Display, serif', fontSize: 18 }}
                >
                  {s.step}
                </div>
                <h4 className="font-bold text-[15px] mb-1.5" style={{ color: '#1d3c71' }}>{s.title}</h4>
                <p className="text-[13px] leading-relaxed" style={{ color: '#6b7280' }}>{s.desc}</p>
              </div>
            ))}
          </div>
          <div className="flex flex-col sm:flex-row gap-4 justify-center mt-12">
            <Button variant="cta" size="lg" onClick={scrollToForm}>
              BPM-aangifte aanvragen
              <ArrowDown className="w-4 h-4 ml-2" />
            </Button>
            <Link to="/stappenplan-bpm-aangifte">
              <Button variant="outline" size="lg" style={{ borderColor: '#1d3c71', color: '#1d3c71' }}>
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
          <h2 className="text-2xl md:text-3xl font-bold text-white mb-3" style={{ fontFamily: 'Playfair Display, serif' }}>BPM-aangifte nodig?</h2>
          <p className="text-[15px] mb-6 max-w-xl mx-auto" style={{ color: 'rgba(255,255,255,0.75)' }}>
            Vraag vrijblijvend aan. Wij bepalen de juiste aanpak voor jouw situatie.
          </p>
          <Button variant="cta" size="lg" onClick={scrollToForm}>
            BPM-aangifte aanvragen
            <ArrowDown className="w-4 h-4 ml-2" />
          </Button>
        </div>
      </section>

      <StatsBar />

      {/* Erkend rapport — 3 kaartjes */}
      <section className="py-14 md:py-16 px-6 md:px-8" style={{ background: '#f7f8fa' }}>
        <div className="container-wide">
          <div className="text-center mb-10">
            <p className="uppercase font-semibold mb-2" style={{ fontSize: 12, letterSpacing: '0.1em', color: '#ff751f' }}>ONAFHANKELIJKHEID</p>
            <h2 className="text-2xl md:text-3xl font-bold" style={{ fontFamily: 'Playfair Display, serif', color: '#1d3c71' }}>Onafhankelijk en fiscaal verdedigbaar</h2>
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

      <BekijkOok links={["Verzekeringstaxatie", "WEV Taxatie", "Schadevaststelling"]} />
      <section className="px-6 md:px-8" style={{ background: '#f7f8fa', paddingTop: 72, paddingBottom: 72 }} ref={formRef}>
        <div className="container-wide">
          <div className="text-center" style={{ marginBottom: 48 }}>
            {sectionLabel("Aanvragen")}
            <h2 className="text-2xl md:text-3xl font-bold mb-2" style={{ fontFamily: 'Playfair Display, serif', color: '#1d3c71' }}>Vrijblijvend contact opnemen</h2>
            <p className="text-[15px] max-w-2xl mx-auto" style={{ color: '#4a5568' }}>
              Heb je een vraag over een BPM-aangifte of wil je een afspraak inplannen? Vul het formulier in en wij nemen binnen één werkdag contact met jou op.
            </p>
          </div>
          <div className="grid md:grid-cols-[1fr_380px] gap-8 items-stretch">
            <div className="bg-white" style={{ borderRadius: 16, boxShadow: '0 8px 40px rgba(0,0,0,0.10)', overflow: 'hidden' }}>
              <IntakeForm
                serviceType="BPM-aangifte"
                formTitle="Stel je vraag of vraag een aangifte aan"
                formSubtext="Heb je een vraag? Omschrijf jouw situatie kort en wij kijken wat de beste aanpak is."
                toelichtingLabel="Jouw vraag of situatie"
                toelichtingPlaceholder="Geef hier de beschikbare informatie over het voertuig en de import."
                submitButtonText="Verstuur. Wij nemen contact op."
                footerText="We nemen binnen één werkdag contact met jou op. Geen verplichtingen, gewoon een goed gesprek."
                showVoertuigType={true}
                hideKenteken={true}
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

export default BpmTaxatie;
