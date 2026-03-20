import { useRef } from "react";
import LandingHero from "@/components/LandingHero";
import IntakeForm from "@/components/IntakeForm";
import SiteHeader from "@/components/SiteHeader";
import SiteFooter from "@/components/SiteFooter";
import WhatsAppButton from "@/components/WhatsAppButton";
import PageMeta from "@/components/PageMeta";
import { Button } from "@/components/ui/button";
import { Users, FileText, Shield, ClipboardCheck, Table, BarChart3, Search, ArrowDown, Star, CheckCircle, Scale, Phone, Mail, Clock, MessageCircle, Quote } from "lucide-react";
import erikHeroBpm from "@/assets/erik-bpm-taxatie-hero.jpg";

const BpmTaxatie = () => {
  const formRef = useRef<HTMLDivElement>(null);

  const scrollToForm = () => {
    formRef.current?.scrollIntoView({ behavior: "smooth" });
  };

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
        title="BPM Taxatie bij Import | Laagste BPM | Automobieltaxaties"
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

      {/* Korte intro */}
      <section className="py-10 md:py-12 px-6 md:px-8" style={{ background: '#f0f4f8' }}>
        <div className="container-wide">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-2xl md:text-3xl font-semibold mb-3">BPM bij import van voertuigen</h2>
            <p className="text-[15px] leading-relaxed" style={{ color: '#4a5568' }}>
              Bij import van een voertuig uit het buitenland moet BPM worden aangegeven. De manier waarop de BPM wordt vastgesteld verschilt per situatie en heeft direct invloed op de onderbouwing richting de Belastingdienst.
            </p>
          </div>
        </div>
      </section>

      {/* Voor wie */}
      <section className="py-10 md:py-12 px-6 md:px-8 bg-background">
        <div className="container-wide">
          <div className="grid md:grid-cols-2 gap-8 items-center">
            <div>
              <p className="uppercase text-[11px] font-semibold tracking-[0.12em] text-cta mb-2">Voor wie</p>
              <h2 className="text-2xl md:text-3xl font-semibold mb-3">Voor wie is dit bedoeld?</h2>
              <p className="text-[15px] leading-relaxed" style={{ color: '#4a5568' }}>
                Voor autobedrijven, handelaren en importeurs die het BPM-traject correct willen laten uitvoeren. Ook particulieren die zekerheid willen over de methode en onderbouwing.
              </p>
            </div>
            <div className="grid grid-cols-2 gap-4">
              {[
                { icon: Users, label: "Autobedrijven", desc: "Dealers en garagebedrijven" },
                { icon: Scale, label: "Handelaren", desc: "Import- en exporthandel" },
                { icon: FileText, label: "Importeurs", desc: "Professionele voertuigimport" },
                { icon: Shield, label: "Particulieren", desc: "Privé-import uit het buitenland" },
              ].map((item, i) => (
                <div
                  key={i}
                  className="card-elevated p-5 text-center cursor-default transition-transform duration-200 hover:-translate-y-1"
                >
                  <div className="inline-flex items-center justify-center w-10 h-10 rounded-xl mb-2" style={{ background: 'rgba(29,60,113,0.08)' }}>
                    <item.icon className="w-5 h-5 text-primary" />
                  </div>
                  <p className="text-sm font-semibold text-foreground">{item.label}</p>
                  <p className="text-xs mt-0.5" style={{ color: '#4a5568' }}>{item.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Drie methodes */}
      <section className="py-10 md:py-12 px-6 md:px-8" style={{ background: '#f0f4f8' }}>
        <div className="container-wide">
          <div className="text-center mb-8">
            <p className="uppercase text-[11px] font-semibold tracking-[0.12em] text-cta mb-2">Methodes</p>
            <h2 className="text-2xl md:text-3xl font-semibold mb-2">Drie methodes om BPM vast te stellen</h2>
            <p className="text-[15px] max-w-2xl mx-auto" style={{ color: '#4a5568' }}>
              De Belastingdienst staat meerdere methodes toe. Welke van toepassing is, hangt af van het voertuig en de staat.
            </p>
          </div>
          <div className="grid md:grid-cols-3 gap-6">
            {[
              {
                icon: Table,
                title: "Afschrijvingstabel",
                desc: "Een forfaitaire tabel op basis van de leeftijd van het voertuig. Houdt geen rekening met de werkelijke staat.",
                featured: false,
              },
              {
                icon: BarChart3,
                title: "Koerslijst",
                desc: "Een gestandaardiseerde waardebepaling op basis van merk, model en uitvoering. Geen individuele beoordeling.",
                featured: false,
              },
              {
                icon: Search,
                title: "BPM-taxatierapport",
                desc: "Een onderbouwing op basis van fysieke inspectie door een geregistreerd taxateur. De werkelijke staat is het uitgangspunt.",
                featured: true,
              },
            ].map((method, i) => (
              <div
                key={i}
                className="card-elevated p-6 relative"
                style={method.featured ? {
                  borderLeft: '4px solid #ff751f',
                  background: '#EBF2FB',
                } : {}}
              >
                {method.featured && (
                  <span
                    className="absolute top-4 right-4 text-[11px] font-bold uppercase tracking-wide px-2.5 py-1 rounded-full"
                    style={{ background: '#ff751f', color: '#fff' }}
                  >
                    Aanbevolen
                  </span>
                )}
                <div className="inline-flex items-center justify-center w-11 h-11 rounded-xl mb-4" style={{ background: method.featured ? 'rgba(255,117,31,0.12)' : 'rgba(29,60,113,0.08)' }}>
                  <method.icon className={`w-5 h-5 ${method.featured ? 'text-cta' : 'text-primary'}`} />
                </div>
                <h3 className="text-lg font-semibold mb-1.5">{method.title}</h3>
                <p className="text-sm leading-relaxed" style={{ color: '#4a5568' }}>{method.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Mid-page CTA */}
      <section className="py-12 md:py-14 px-6 md:px-8" style={{ background: '#1d3c71' }}>
        <div className="container-wide text-center">
          <h2 className="text-2xl md:text-3xl font-semibold text-white mb-3">Wil je weten welke methode voor jou het gunstigst is?</h2>
          <p className="text-[15px] mb-6 max-w-xl mx-auto" style={{ color: 'rgba(255,255,255,0.75)' }}>
            Wij beoordelen per voertuig welke aanpak het meest verdedigbaar is — en geven je vrijblijvend advies.
          </p>
          <Button variant="cta" size="lg" onClick={scrollToForm}>
            Gratis advies aanvragen
            <ArrowDown className="w-4 h-4 ml-2" />
          </Button>
        </div>
      </section>

      {/* Werkwijze */}
      <section className="py-10 md:py-12 px-6 md:px-8 bg-background">
        <div className="container-wide">
          <div className="text-center mb-8">
            <p className="uppercase text-[11px] font-semibold tracking-[0.12em] text-cta mb-2">Werkwijze</p>
            <h2 className="text-2xl md:text-3xl font-semibold">Onze werkwijze in 5 stappen</h2>
          </div>
          <div className="grid md:grid-cols-5 gap-5">
            {[
              { step: 1, title: "Gegevens aanleveren", desc: "Kenteken, chassisnummer, factuur en documenten" },
              { step: 2, title: "Methode beoordelen", desc: "Per voertuig de fiscaal logische aanpak bepalen" },
              { step: 3, title: "Uitvoering", desc: "Aangifte op basis van tabel, koerslijst of taxatie" },
              { step: 4, title: "Aangifte opstellen", desc: "Compleet en controleerbaar opgebouwd" },
              { step: 5, title: "Oplevering", desc: "Per e-mail, klaar om te ondertekenen en versturen" },
            ].map((s) => (
              <div key={s.step} className="text-center">
                <div className="step-badge mx-auto mb-3">{s.step}</div>
                <h4 className="font-semibold text-sm mb-1 text-foreground">{s.title}</h4>
                <p className="text-xs leading-relaxed" style={{ color: '#4a5568' }}>{s.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Reviews placeholder */}
      <section className="py-10 md:py-12 px-6 md:px-8" style={{ background: '#f0f4f8' }}>
        <div className="container-wide">
          <div className="max-w-3xl mx-auto text-center">
            <p className="text-sm font-medium" style={{ color: '#4a5568' }}>[REVIEWS AANLEVEREN DOOR OPDRACHTGEVER]</p>
          </div>
        </div>
      </section>

      {/* Trust balk */}
      <section className="py-6 px-6 md:px-8 bg-background">
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
              <span className="text-lg font-bold text-foreground">98%</span>
              <span className="text-xs ml-1" style={{ color: '#4a5568' }}>akkoord bij controle</span>
            </div>
          </div>
        </div>
      </section>

      {/* Verwachtingen + Nodig — KAARTJES MET VINKJES */}
      <section className="py-10 md:py-12 px-6 md:px-8" style={{ background: '#f0f4f8' }}>
        <div className="container-wide">
          <div className="grid md:grid-cols-2 gap-8">
            <div>
              <h2 className="text-xl md:text-2xl font-semibold mb-5">Wat kun je verwachten?</h2>
              <div className="space-y-3">
                {verwachtItems.map((item, i) => (
                  <div
                    key={i}
                    className="flex items-center gap-4 bg-white rounded-[10px] px-5 py-4"
                    style={{ boxShadow: '0 2px 8px rgba(0,0,0,0.06)' }}
                  >
                    <div className="w-8 h-8 rounded-full flex-shrink-0 flex items-center justify-center" style={{ background: 'rgba(255,117,31,0.12)' }}>
                      <CheckCircle className="w-4 h-4 text-cta" />
                    </div>
                    <span className="text-[15px]" style={{ color: '#4a5568' }}>{item}</span>
                  </div>
                ))}
              </div>
            </div>
            <div>
              <h2 className="text-xl md:text-2xl font-semibold mb-5">Wat hebben wij nodig?</h2>
              <div className="space-y-3">
                {nodigItems.map((item, i) => (
                  <div
                    key={i}
                    className="flex items-center gap-4 bg-white rounded-[10px] px-5 py-4"
                    style={{ boxShadow: '0 2px 8px rgba(0,0,0,0.06)' }}
                  >
                    <div className="w-8 h-8 rounded-full flex-shrink-0 flex items-center justify-center" style={{ background: 'rgba(29,60,113,0.08)' }}>
                      <CheckCircle className="w-4 h-4 text-primary" />
                    </div>
                    <span className="text-[15px]" style={{ color: '#4a5568' }}>{item}</span>
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
          <h2 className="text-2xl md:text-3xl font-semibold text-white mb-3">BPM netjes en onafhankelijk laten regelen?</h2>
          <p className="text-[15px] mb-6" style={{ color: 'rgba(255,255,255,0.75)' }}>
            Vraag vrijblijvend een BPM-aangifte aan. Wij beoordelen de juiste methode voor jouw situatie.
          </p>
          <Button variant="cta" size="lg" onClick={scrollToForm}>
            BPM-aangifte aanvragen
            <ArrowDown className="w-4 h-4 ml-2" />
          </Button>
        </div>
      </section>

      {/* Formulier — 65/35 layout */}
      <section className="py-10 md:py-14 px-6 md:px-8 bg-background" ref={formRef}>
        <div className="container-wide">
          <div className="text-center mb-8">
            <h2 className="text-2xl md:text-3xl font-semibold mb-2">BPM-aangifte laten uitvoeren</h2>
            <p className="text-[15px] max-w-2xl mx-auto" style={{ color: '#4a5568' }}>
              Vul het formulier in en wij bepalen de juiste aanpak voor jouw situatie.
            </p>
          </div>
          <div className="grid md:grid-cols-[1fr_380px] gap-8">
            <div>
              <IntakeForm
                serviceType="BPM-aangifte"
                formTitle="Aanvraag BPM-aangifte"
                formSubtext="Vul onderstaand formulier zo volledig mogelijk in."
                toelichtingPlaceholder="Geef hier de beschikbare informatie over het voertuig en de import."
                submitButtonText="Aanvraag indienen"
                showVoertuigType={true}
              />
            </div>
            <div
              className="rounded-2xl p-10 text-white self-start"
              style={{ background: '#1d3c71' }}
            >
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
                href="https://wa.me/31629182258"
                target="_blank"
                rel="noopener noreferrer"
                className="mt-6 flex items-center justify-center gap-2 rounded-lg px-5 py-3 text-sm font-semibold text-white transition-opacity hover:opacity-90"
                style={{ background: '#25D366' }}
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

      {/* Belangrijk + Onafhankelijkheid — eenmalig */}
      <section className="py-10 md:py-12 px-6 md:px-8" style={{ background: '#f0f4f8' }}>
        <div className="container-wide">
          <div className="grid md:grid-cols-2 gap-6">
            <div className="card-elevated p-6">
              <div className="flex items-center gap-3 mb-3">
                <div className="w-10 h-10 rounded-xl flex items-center justify-center" style={{ background: 'rgba(255,117,31,0.1)' }}>
                  <ClipboardCheck className="w-5 h-5 text-cta" />
                </div>
                <h3 className="text-base font-semibold">Belangrijk om te weten</h3>
              </div>
              <ul className="space-y-1.5 text-sm" style={{ color: '#4a5568' }}>
                <li>• De BPM wordt vastgesteld op basis van de staat op moment van aangifte</li>
                <li>• Een taxatierapport heeft beperkte geldigheid</li>
                <li>• Het voertuig moet in getaxeerde staat blijven tot na verwerking</li>
                <li>• Volledige en juiste aankoopgegevens zijn essentieel</li>
              </ul>
            </div>
            <div className="card-elevated p-6">
              <div className="flex items-center gap-3 mb-3">
                <div className="w-10 h-10 rounded-xl flex items-center justify-center" style={{ background: 'rgba(29,60,113,0.08)' }}>
                  <Shield className="w-5 h-5 text-primary" />
                </div>
                <h3 className="text-base font-semibold">Onafhankelijk en juridisch geborgd</h3>
              </div>
              <ul className="space-y-1.5 text-sm" style={{ color: '#4a5568' }}>
                <li>• Aangesloten bij Federatie TMV, VRT Register en FEHAC</li>
                <li>• Geen vooraf afgesproken uitkomsten</li>
                <li>• Rapportages zijn transparant en controleerbaar</li>
                <li>• Samenwerking met gespecialiseerde BPM-jurist</li>
              </ul>
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
