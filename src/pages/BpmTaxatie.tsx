import { useRef } from "react";
import { Link } from "react-router-dom";
import LandingHero from "@/components/LandingHero";
import IntakeForm from "@/components/IntakeForm";
import BpmCalculator from "@/components/BpmCalculator";
import SiteHeader from "@/components/SiteHeader";
import SiteFooter from "@/components/SiteFooter";
import WhatsAppButton from "@/components/WhatsAppButton";
import PageMeta from "@/components/PageMeta";
import { Button } from "@/components/ui/button";
import { Users, FileText, Shield, Table, BarChart3, Search, ArrowDown, ArrowRight, CheckCircle, Scale, Phone, Mail, Clock, MessageCircle, FileCheck } from "lucide-react";
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
        description="De laagst haalbare BPM voor je importvoertuig. Fysieke inspectie op locatie door een erkend TMV en VRT register taxateur. Gratis advies aanvragen."
      />
      <SiteHeader />
      <LandingHero
        subtitle="BPM-taxatie"
        title="BPM-taxatie bij import van voertuigen"
        description="Per voertuig bepalen wij welke methode fiscaal het meest logisch en verdedigbaar is. Zodat de aangifte klopt en standhoudt bij controle."
        ctaText="BPM-aangifte aanvragen"
        onCtaClick={scrollToForm}
        heroImage={erikHeroBpm}
      />

      {/* BPM Calculator — direct na hero */}
      <section className="px-6 md:px-8" style={{ background: '#f7f8fa', paddingTop: 72, paddingBottom: 72 }}>
        <div className="container-wide">
          <div className="mb-8">
            {sectionLabel("BPM Calculator")}
            <h2 className="font-bold mb-2" style={{ fontFamily: 'Playfair Display, serif', fontSize: 36, color: '#1d3c71' }}>Bereken je BPM indicatie</h2>
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
                <div className="mx-auto flex items-center justify-center rounded-full mb-4" style={{ width: 64, height: 64, background: '#EBF2FB' }}>
                  <item.icon style={{ width: 28, height: 28, color: '#1d3c71' }} />
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
                  borderRadius: 14,
                  padding: 32,
                  borderTop: '3px solid #1d3c71',
                  borderBottom: '3px solid #ff751f',
                  boxShadow: '0 4px 24px rgba(0,0,0,0.07)',
                  transition: 'transform 200ms ease, box-shadow 200ms ease, border 200ms ease',
                }}
                onMouseEnter={e => { e.currentTarget.style.transform = 'translateY(-4px)'; e.currentTarget.style.boxShadow = '0 8px 32px rgba(0,0,0,0.12)'; e.currentTarget.style.borderBottom = '3px solid transparent'; e.currentTarget.style.borderTop = '3px solid #ff751f'; }}
                onMouseLeave={e => { e.currentTarget.style.transform = 'translateY(0)'; e.currentTarget.style.boxShadow = '0 4px 24px rgba(0,0,0,0.07)'; e.currentTarget.style.borderBottom = '3px solid #ff751f'; e.currentTarget.style.borderTop = '3px solid #1d3c71'; }}
              >
                <div className="inline-flex items-center justify-center rounded-full mb-4" style={{ width: 48, height: 48, background: '#EBF2FB' }}>
                  <method.icon style={{ width: 24, height: 24, color: '#1d3c71' }} />
                </div>
                <h3 className="font-bold mb-2" style={{ color: '#1d3c71', fontFamily: 'Playfair Display, serif', fontSize: 18 }}>{method.title}</h3>
                <p className="text-[14px]" style={{ color: '#4a5568', lineHeight: 1.6 }}>{method.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>




      {/* 4 — Werkwijze – wit */}
      <section className="px-6 md:px-8" style={{ background: '#ffffff', paddingTop: 96, paddingBottom: 96 }}>
        <div className="container-wide">
          <div className="text-center mb-12">
            {sectionLabel("Werkwijze")}
            <h2 className="text-2xl md:text-3xl font-bold" style={{ fontFamily: 'Playfair Display, serif', color: '#1d3c71' }}>Onze werkwijze in 5 stappen</h2>
          </div>
          <div className="grid md:grid-cols-5 gap-8 relative">
            <div className="hidden md:block absolute" style={{ top: 26, left: 'calc(10% + 26px)', right: 'calc(10% + 26px)', height: 2, background: '#ff751f', zIndex: 0 }} />
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
                  style={{ width: 52, height: 52, background: '#1d3c71', fontFamily: 'Playfair Display, serif', fontSize: 20 }}
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

      {/* 5 — Verwachtingen + Nodig – kaartjes */}
      <section className="px-6 md:px-8" style={{ background: '#f7f8fa', paddingTop: 96, paddingBottom: 96 }}>
        <div className="container-wide">
          <div className="grid md:grid-cols-2 gap-12">
            <div>
              <div className="mb-3" style={{ width: 48, height: 3, background: '#ff751f', borderRadius: 2 }} />
              <h3 className="text-xl font-semibold mb-6" style={{ fontFamily: 'Playfair Display, serif' }}>Wat kun je verwachten?</h3>
              <div className="space-y-4">
                {verwachtItems.map((item, i) => (
                  <div
                    key={i}
                    className="flex items-center gap-4 bg-white"
                    style={{ borderRadius: 10, padding: 20, boxShadow: '0 2px 10px rgba(0,0,0,0.07)' }}
                  >
                    <div className="w-9 h-9 rounded-full flex-shrink-0 flex items-center justify-center" style={{ background: 'rgba(255,117,31,0.12)' }}>
                      <CheckCircle className="w-[18px] h-[18px]" style={{ color: '#ff751f' }} />
                    </div>
                    <span className="text-[15px]" style={{ color: '#374151' }}>{item}</span>
                  </div>
                ))}
              </div>
            </div>
            <div>
              <div className="mb-3" style={{ width: 48, height: 3, background: '#ff751f', borderRadius: 2 }} />
              <h3 className="text-xl font-semibold mb-6" style={{ fontFamily: 'Playfair Display, serif' }}>Wat hebben wij nodig?</h3>
              <div className="space-y-4">
                {nodigItems.map((item, i) => (
                  <div
                    key={i}
                    className="flex items-center gap-4 bg-white"
                    style={{ borderRadius: 10, padding: 20, boxShadow: '0 2px 10px rgba(0,0,0,0.07)' }}
                  >
                    <div className="w-9 h-9 rounded-full flex-shrink-0 flex items-center justify-center" style={{ background: 'rgba(255,117,31,0.12)' }}>
                      <CheckCircle className="w-[18px] h-[18px]" style={{ color: '#ff751f' }} />
                    </div>
                    <span className="text-[15px]" style={{ color: '#374151' }}>{item}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 6 — Formulier – wit */}
      <section className="px-6 md:px-8" style={{ background: '#ffffff', paddingTop: 96, paddingBottom: 96 }} ref={formRef}>
        <div className="container-wide">
          <div className="text-center" style={{ marginBottom: 48 }}>
            {sectionLabel("Aanvragen")}
            <h2 className="text-2xl md:text-3xl font-bold mb-2" style={{ fontFamily: 'Playfair Display, serif', color: '#1d3c71' }}>BPM-aangifte laten uitvoeren</h2>
            <p className="text-[15px] max-w-2xl mx-auto" style={{ color: '#4a5568' }}>
              Vul het formulier in en wij bepalen de juiste aanpak voor jouw situatie.
            </p>
          </div>
          <div className="grid md:grid-cols-[1fr_380px] gap-8 items-stretch">
            <div className="bg-white" style={{ borderRadius: 16, boxShadow: '0 8px 40px rgba(0,0,0,0.10)', overflow: 'hidden' }}>
              <IntakeForm
                serviceType="BPM-aangifte"
                formTitle="Aanvraag BPM-aangifte"
                formSubtext="Vul onderstaand formulier zo volledig mogelijk in."
                toelichtingPlaceholder="Geef hier de beschikbare informatie over het voertuig en de import."
                submitButtonText="Aanvraag indienen"
                showVoertuigType={true}
                hideKenteken={true}
                compact={true}
              />
            </div>
            <div className="rounded-2xl p-10 text-white flex flex-col" style={{ background: '#1d3c71' }}>
              <h3 className="text-lg font-semibold mb-5">Direct contact</h3>
              <ul className="space-y-3.5 text-sm">
                <li className="flex items-center gap-3">
                  <Phone className="w-4 h-4 shrink-0 opacity-70" />
                  <a href="tel:+31854832461" className="hover:underline">085 483 2461</a>
                </li>
                <li className="flex items-center gap-3">
                  <MessageCircle className="w-4 h-4 shrink-0 opacity-70" />
                  <a href="https://wa.me/31650694978" className="hover:underline">06 506 949 78</a>
                </li>
                <li className="flex items-center gap-3">
                  <Mail className="w-4 h-4 shrink-0 opacity-70" />
                  <a href="mailto:algemeen@automobieltaxaties.nl" className="hover:underline text-[13px]">algemeen@automobieltaxaties.nl</a>
                </li>
                <li className="flex items-center gap-3">
                  <Clock className="w-4 h-4 shrink-0 opacity-70" />
                  <span>ma - vr 8:30 – 17:00</span>
                </li>
              </ul>
              <p className="mt-5 text-xs italic" style={{ color: 'rgba(255,255,255,0.6)' }}>
                Liever direct contact? Wij reageren binnen één werkdag.
              </p>
              <a
                href="https://wa.me/31650694978"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center gap-2 rounded-lg px-5 py-3 text-sm font-semibold text-white transition-opacity hover:opacity-90 w-full"
                style={{ background: '#25D366', marginTop: 'auto' }}
              >
                <svg viewBox="0 0 24 24" className="w-5 h-5 fill-white">
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
                </svg>
                App ons direct
              </a>
            </div>
          </div>
        </div>
      </section>

      <SiteFooter />
      <WhatsAppButton />
    </div>
  );
};

export default BpmTaxatie;
