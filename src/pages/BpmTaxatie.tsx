import { useRef } from "react";
import LandingHero from "@/components/LandingHero";
import IntakeForm from "@/components/IntakeForm";
import SiteHeader from "@/components/SiteHeader";
import SiteFooter from "@/components/SiteFooter";
import WhatsAppButton from "@/components/WhatsAppButton";
import PageMeta from "@/components/PageMeta";
import { Button } from "@/components/ui/button";
import { Users, FileText, Shield, ClipboardCheck, Table, BarChart3, Search, ArrowDown, Star, CheckCircle, Scale, Phone, Mail, Clock, MessageCircle } from "lucide-react";
import erikInspectie from "@/assets/erik-inspectie.jpg";

const BpmTaxatie = () => {
  const formRef = useRef<HTMLDivElement>(null);

  const scrollToForm = () => {
    formRef.current?.scrollIntoView({ behavior: "smooth" });
  };

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
        heroImage={erikInspectie}
      />

      {/* Korte intro */}
      <section className="py-12 md:py-16 px-6 md:px-8" style={{ background: '#f0f4f8' }}>
        <div className="container-wide">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-2xl md:text-3xl font-semibold mb-4">BPM bij import van voertuigen</h2>
            <p className="text-[15px] leading-relaxed" style={{ color: '#4a5568' }}>
              Bij import van een voertuig uit het buitenland moet BPM worden aangegeven. De manier waarop de BPM wordt vastgesteld verschilt per situatie en heeft direct invloed op de onderbouwing richting de Belastingdienst.
            </p>
          </div>
        </div>
      </section>

      {/* Voor wie */}
      <section className="py-12 md:py-16 px-6 md:px-8 bg-background">
        <div className="container-wide">
          <div className="grid md:grid-cols-2 gap-8 items-center">
            <div>
              <p className="uppercase text-[11px] font-semibold tracking-[0.12em] text-cta mb-3">Voor wie</p>
              <h2 className="text-2xl md:text-3xl font-semibold mb-4">Voor wie is dit bedoeld?</h2>
              <p className="text-[15px] leading-relaxed mb-4" style={{ color: '#4a5568' }}>
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
                  <div className="inline-flex items-center justify-center w-10 h-10 rounded-xl mb-3" style={{ background: 'rgba(29,60,113,0.08)' }}>
                    <item.icon className="w-5 h-5 text-primary" />
                  </div>
                  <p className="text-sm font-semibold text-foreground">{item.label}</p>
                  <p className="text-xs mt-1" style={{ color: '#4a5568' }}>{item.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Drie methodes als kaarten */}
      <section className="py-12 md:py-16 px-6 md:px-8" style={{ background: '#f0f4f8' }}>
        <div className="container-wide">
          <div className="text-center mb-10">
            <p className="uppercase text-[11px] font-semibold tracking-[0.12em] text-cta mb-3">Methodes</p>
            <h2 className="text-2xl md:text-3xl font-semibold mb-3">Drie methodes om BPM vast te stellen</h2>
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
                className="card-elevated p-7 relative"
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
                <div className="inline-flex items-center justify-center w-12 h-12 rounded-xl mb-5" style={{ background: method.featured ? 'rgba(255,117,31,0.12)' : 'rgba(29,60,113,0.08)' }}>
                  <method.icon className={`w-6 h-6 ${method.featured ? 'text-cta' : 'text-primary'}`} />
                </div>
                <h3 className="text-lg font-semibold mb-2">{method.title}</h3>
                <p className="text-sm leading-relaxed" style={{ color: '#4a5568' }}>{method.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Werkwijze - horizontale stappen */}
      <section className="py-12 md:py-16 px-6 md:px-8 bg-background">
        <div className="container-wide">
          <div className="text-center mb-10">
            <p className="uppercase text-[11px] font-semibold tracking-[0.12em] text-cta mb-3">Werkwijze</p>
            <h2 className="text-2xl md:text-3xl font-semibold">Onze werkwijze in 5 stappen</h2>
          </div>
          <div className="grid md:grid-cols-5 gap-6">
            {[
              { step: 1, title: "Gegevens aanleveren", desc: "Kenteken, chassisnummer, factuur en documenten" },
              { step: 2, title: "Methode beoordelen", desc: "Per voertuig de fiscaal logische aanpak bepalen" },
              { step: 3, title: "Uitvoering", desc: "Aangifte op basis van tabel, koerslijst of taxatie" },
              { step: 4, title: "Aangifte opstellen", desc: "Compleet en controleerbaar opgebouwd" },
              { step: 5, title: "Oplevering", desc: "Per e-mail, klaar om te ondertekenen en versturen" },
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

      {/* Trust balk */}
      <section className="py-8 px-6 md:px-8" style={{ background: '#f0f4f8' }}>
        <div className="container-wide">
          <div className="flex flex-wrap justify-center gap-8 md:gap-16 items-center">
            <div className="flex items-center gap-2">
              <div className="flex">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-4 h-4 fill-cta text-cta" />
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

      {/* CTA blok donkerblauw */}
      <section className="py-14 md:py-20 px-6 md:px-8" style={{ background: '#1d3c71' }}>
        <div className="container-wide text-center">
          <h2 className="text-2xl md:text-3xl font-semibold text-white mb-3">BPM netjes en onafhankelijk laten regelen?</h2>
          <p className="text-base mb-8" style={{ color: 'rgba(255,255,255,0.75)' }}>
            Vraag vrijblijvend een BPM-aangifte aan. Wij beoordelen de juiste methode voor jouw situatie.
          </p>
          <Button variant="cta" size="lg" onClick={scrollToForm}>
            BPM-aangifte aanvragen
            <ArrowDown className="w-4 h-4 ml-2" />
          </Button>
        </div>
      </section>

      {/* Verwachtingen + Nodig - als twee kolommen */}
      <section className="py-12 md:py-16 px-6 md:px-8 bg-background">
        <div className="container-wide">
          <div className="grid md:grid-cols-2 gap-10">
            <div>
              <h2 className="text-xl md:text-2xl font-semibold mb-4">Wat kun je verwachten?</h2>
              <ul className="space-y-3">
                {[
                  "Onafhankelijke beoordeling per voertuig",
                  "Duidelijke uitleg over de gekozen methode",
                  "Onderbouwing die standhoudt bij controle",
                  "Geen wensbedragen of vooraf bepaalde uitkomsten",
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
                  "Buitenlands kenteken of chassisnummer",
                  "Aankoopfactuur van het voertuig",
                  "Actuele kilometerstand",
                  "Info over schade, gebruik en onderhoud",
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

      {/* Belangrijk + Onafhankelijkheid - compact */}
      <section className="py-12 md:py-16 px-6 md:px-8" style={{ background: '#f0f4f8' }}>
        <div className="container-wide">
          <div className="grid md:grid-cols-2 gap-10">
            <div className="card-elevated p-7">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 rounded-xl flex items-center justify-center" style={{ background: 'rgba(255,117,31,0.1)' }}>
                  <ClipboardCheck className="w-5 h-5 text-cta" />
                </div>
                <h3 className="text-lg font-semibold">Belangrijk om te weten</h3>
              </div>
              <ul className="space-y-2 text-sm" style={{ color: '#4a5568' }}>
                <li>• De BPM wordt vastgesteld op basis van de staat op moment van aangifte</li>
                <li>• Een taxatierapport heeft beperkte geldigheid</li>
                <li>• Het voertuig moet in getaxeerde staat blijven tot na verwerking</li>
                <li>• Volledige en juiste aankoopgegevens zijn essentieel</li>
              </ul>
            </div>
            <div className="card-elevated p-7">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 rounded-xl flex items-center justify-center" style={{ background: 'rgba(29,60,113,0.08)' }}>
                  <Shield className="w-5 h-5 text-primary" />
                </div>
                <h3 className="text-lg font-semibold">Onafhankelijk en juridisch geborgd</h3>
              </div>
              <ul className="space-y-2 text-sm" style={{ color: '#4a5568' }}>
                <li>• Geregistreerd bij VRT en aangesloten bij TMV</li>
                <li>• Geen vooraf afgesproken uitkomsten</li>
                <li>• Rapportages zijn transparant en controleerbaar</li>
                <li>• Samenwerking met gespecialiseerde BPM-jurist</li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Formulier — 65/35 layout */}
      <section className="py-12 md:py-16 px-6 md:px-8 bg-background" ref={formRef}>
        <div className="container-wide">
          <div className="text-center mb-10">
            <h2 className="text-2xl md:text-3xl font-semibold mb-3">BPM-aangifte laten uitvoeren</h2>
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
            {/* Contact sidebar */}
            <div
              className="rounded-2xl p-10 text-white self-start"
              style={{ background: '#1d3c71' }}
            >
              <h3 className="text-lg font-semibold mb-6">Direct contact</h3>
              <ul className="space-y-4 text-sm">
                <li className="flex items-center gap-3">
                  <Phone className="w-4 h-4 shrink-0 opacity-70" />
                  <a href="tel:+31854832461" className="hover:underline">085 483 2461</a>
                </li>
                <li className="flex items-center gap-3">
                  <MessageCircle className="w-4 h-4 shrink-0 opacity-70" />
                  <a href="https://wa.me/31629182258" className="hover:underline">06 29182258</a>
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
              <p className="mt-6 text-xs italic" style={{ color: 'rgba(255,255,255,0.6)' }}>
                Liever direct contact? Wij reageren binnen één werkdag.
              </p>
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
