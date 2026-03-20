import { useRef } from "react";
import { Link } from "react-router-dom";
import LandingHero from "@/components/LandingHero";
import IntakeForm from "@/components/IntakeForm";
import SiteHeader from "@/components/SiteHeader";
import SiteFooter from "@/components/SiteFooter";
import WhatsAppButton from "@/components/WhatsAppButton";
import PageMeta from "@/components/PageMeta";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import heroCamper from "@/assets/hero-camper.jpg";

const BpmCamperTaxatie = () => {
  const formRef = useRef<HTMLDivElement>(null);

  const scrollToForm = () => {
    formRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <div className="min-h-screen bg-background">
      <PageMeta
        title="BPM Camper Taxatie | Import Camper | Automobieltaxaties"
        description="BPM-taxatie voor geïmporteerde campers. Erkend taxateur bepaalt de juiste methode voor de laagst haalbare BPM."
      />
      <SiteHeader />
      <LandingHero
        subtitle="BPM-TAXATIE CAMPER"
        title="Zorgvuldig vastgestelde BPM bij import van een camper"
        description="Bij import van een camper uit het buitenland moet BPM worden aangegeven. De wijze waarop de BPM wordt vastgesteld, heeft direct invloed op de BPM-aangifte en de onderbouwing richting de Belastingdienst."
        ctaText="BPM-taxatie camper aanvragen"
        onCtaClick={scrollToForm}
        heroImage={heroCamper}
      />

      {/* Waarom vraagt BPM bij campers extra aandacht */}
      <section className="section-padding bg-muted/30">
        <div className="container-narrow">
          <h2 className="text-2xl md:text-3xl font-semibold text-foreground mb-6">
            Waarom vraagt BPM bij campers extra aandacht?
          </h2>
          <p className="text-foreground/90 leading-relaxed mb-6">
            Campers wijken in veel opzichten af van standaard personenvoertuigen. De opbouw, inrichting en het gebruik van een camper zorgen ervoor dat afschrijvingstabellen of koerslijsten niet altijd een realistisch beeld geven van de werkelijke waarde.
          </p>
          <p className="text-foreground/90 leading-relaxed mb-4">
            Dit kan bijvoorbeeld spelen wanneer:
          </p>
          <ul className="space-y-2 text-foreground/90 mb-6">
            <li className="flex items-start gap-2">
              <span className="text-primary mt-1">•</span>
              <span>de camper een afwijkende of bijzondere opbouw heeft</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-primary mt-1">•</span>
              <span>de inrichting of uitrusting invloed heeft op de waarde</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-primary mt-1">•</span>
              <span>het gebruikspatroon afwijkt van wat gangbaar is</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-primary mt-1">•</span>
              <span>standaardmethodes geen reëel of verdedigbaar beeld geven</span>
            </li>
          </ul>
          <p className="text-foreground/90 leading-relaxed">
            In deze situaties vraagt het vaststellen van de BPM om specifieke aandacht en een zorgvuldige afweging van de toe te passen methode.
          </p>
        </div>
      </section>

      {/* Wanneer is een BPM-taxatie logisch */}
      <section className="section-padding bg-background">
        <div className="container-narrow">
          <h2 className="text-2xl md:text-3xl font-semibold text-foreground mb-6">
            Wanneer is een BPM-taxatie bij een camper logisch?
          </h2>
          <p className="text-foreground/90 leading-relaxed mb-6">
            Wanneer de BPM bij import van een camper niet realistisch kan worden vastgesteld via een afschrijvingstabel of koerslijst, is een BPM-taxatie de meest logische en verdedigbare methode.
          </p>
          <p className="text-foreground/90 leading-relaxed mb-4">
            Dit speelt bijvoorbeeld wanneer:
          </p>
          <ul className="space-y-2 text-foreground/90 mb-6">
            <li className="flex items-start gap-2">
              <span className="text-primary mt-1">•</span>
              <span>de staat van de camper afwijkt van wat gangbaar is voor dit type voertuig</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-primary mt-1">•</span>
              <span>de inrichting of opbouw invloed heeft op de waarde</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-primary mt-1">•</span>
              <span>standaardmethodes geen reëel beeld geven van de werkelijke afschrijving</span>
            </li>
          </ul>
          <p className="text-foreground/90 leading-relaxed">
            In deze situaties is een BPM-taxatierapport de meest passende manier om de afschrijving inhoudelijk verdedigbaar vast te stellen.
          </p>
        </div>
      </section>

      {/* Wat houdt een BPM-taxatie in */}
      <section className="section-padding bg-muted/30">
        <div className="container-narrow">
          <h2 className="text-2xl md:text-3xl font-semibold text-foreground mb-6">
            Wat houdt een BPM-taxatie voor een camper in?
          </h2>
          <p className="text-foreground/90 leading-relaxed mb-6">
            Een BPM-taxatie is gebaseerd op een fysieke inspectie van de camper. Daarbij wordt gekeken naar de werkelijke staat van het voertuig, inclusief de opbouw, inrichting en eventuele bijzonderheden.
          </p>
          <p className="text-foreground/90 leading-relaxed mb-6">
            De afschrijving wordt onderbouwd in een BPM-taxatierapport. Dit rapport vormt onderdeel van de BPM-aangifte en maakt inzichtelijk hoe de waarde tot stand is gekomen.
          </p>
          <p className="text-foreground/90 leading-relaxed">
            Op deze manier is de aangifte inhoudelijk controleerbaar en verdedigbaar bij eventuele vragen van de Belastingdienst.
          </p>
        </div>
      </section>

      {/* Werkwijze */}
      <section className="section-padding bg-background">
        <div className="container-narrow">
          <h2 className="text-2xl md:text-3xl font-semibold text-foreground mb-4">
            Onze werkwijze bij BPM voor campers
          </h2>
          <p className="text-foreground/90 leading-relaxed mb-10">
            Het BPM-traject voor een camper verloopt bij ons volgens een vaste en overzichtelijke werkwijze. Zo weet je vooraf waar je aan toe bent.
          </p>

          <div className="space-y-8">
            <div className="flex gap-4">
              <div className="flex-shrink-0 w-10 h-10 rounded-full bg-primary text-primary-foreground flex items-center justify-center font-semibold">
                1
              </div>
              <div>
                <h3 className="text-lg font-semibold text-foreground mb-2">Aanleveren van voertuig- en aankoopgegevens</h3>
                <p className="text-foreground/90">
                  Je levert de beschikbare gegevens aan, waaronder het buitenlandse kenteken of chassisnummer, de aankoopfactuur en recente informatie over de staat van de camper.
                </p>
              </div>
            </div>

            <div className="flex gap-4">
              <div className="flex-shrink-0 w-10 h-10 rounded-full bg-primary text-primary-foreground flex items-center justify-center font-semibold">
                2
              </div>
              <div>
                <h3 className="text-lg font-semibold text-foreground mb-2">Beoordelen welke BPM-methode fiscaal logisch en verdedigbaar is</h3>
                <p className="text-foreground/90">
                  Op basis van de aangeleverde informatie beoordelen wij welke methode passend is: afschrijvingstabel, koerslijst of BPM-taxatie.
                </p>
              </div>
            </div>

            <div className="flex gap-4">
              <div className="flex-shrink-0 w-10 h-10 rounded-full bg-primary text-primary-foreground flex items-center justify-center font-semibold">
                3
              </div>
              <div>
                <h3 className="text-lg font-semibold text-foreground mb-2">Uitvoeren van de gekozen methode</h3>
                <p className="text-foreground/90">
                  De gekozen methode wordt zorgvuldig uitgevoerd. Bij een taxatie vindt een fysieke inspectie plaats waarin de werkelijke staat van de camper wordt vastgelegd.
                </p>
              </div>
            </div>

            <div className="flex gap-4">
              <div className="flex-shrink-0 w-10 h-10 rounded-full bg-primary text-primary-foreground flex items-center justify-center font-semibold">
                4
              </div>
              <div>
                <h3 className="text-lg font-semibold text-foreground mb-2">Opstellen van de volledige BPM-aangifte</h3>
                <p className="text-foreground/90">
                  De BPM-aangifte wordt opgesteld op basis van de vastgestelde waarde en de gekozen methode. Bij een taxatie vormt het BPM-taxatierapport onderdeel van het dossier.
                </p>
              </div>
            </div>

            <div className="flex gap-4">
              <div className="flex-shrink-0 w-10 h-10 rounded-full bg-primary text-primary-foreground flex items-center justify-center font-semibold">
                5
              </div>
              <div>
                <h3 className="text-lg font-semibold text-foreground mb-2">Oplevering per e-mail</h3>
                <p className="text-foreground/90">
                  Je ontvangt de BPM-aangifte en eventuele bijbehorende documenten per e-mail. Het dossier is daarmee klaar voor indiening bij de Belastingdienst.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Wat kun je van ons verwachten */}
      <section className="section-padding bg-muted/30">
        <div className="container-narrow">
          <h2 className="text-2xl md:text-3xl font-semibold text-foreground mb-6">
            Wat kun je van ons verwachten?
          </h2>
          <p className="text-foreground/90 leading-relaxed mb-6">
            Bij Automobiel Taxaties begeleiden wij het BPM-traject voor campers zorgvuldig en inhoudelijk onderbouwd. Per voertuig beoordelen wij welke methode fiscaal logisch en verdedigbaar is.
          </p>
          <ul className="space-y-2 text-foreground/90 mb-6">
            <li className="flex items-start gap-2">
              <span className="text-primary mt-1">•</span>
              <span>een onafhankelijke beoordeling per camper</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-primary mt-1">•</span>
              <span>geen wensbedragen of vooraf afgesproken uitkomsten</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-primary mt-1">•</span>
              <span>duidelijke uitleg over de gekozen methode</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-primary mt-1">•</span>
              <span>onderbouwing die is ingericht op controle door de Belastingdienst</span>
            </li>
          </ul>
          <p className="text-foreground/90 leading-relaxed">
            Wij werken zonder vooraf vastgestelde uitkomsten en richten ons op een dossier dat inhoudelijk verdedigbaar is.
          </p>
        </div>
      </section>

      {/* Wat hebben wij van je nodig */}
      <section className="section-padding bg-background">
        <div className="container-narrow">
          <h2 className="text-2xl md:text-3xl font-semibold text-foreground mb-6">
            Wat hebben wij van je nodig?
          </h2>
          <p className="text-foreground/90 leading-relaxed mb-6">
            Voor een correcte vaststelling van de BPM hebben wij vooraf volledige en juiste voertuiggegevens nodig. Dit betreft onder meer:
          </p>
          <ul className="space-y-2 text-foreground/90 mb-6">
            <li className="flex items-start gap-2">
              <span className="text-primary mt-1">•</span>
              <span>het buitenlandse kenteken of chassisnummer</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-primary mt-1">•</span>
              <span>de aankoopfactuur</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-primary mt-1">•</span>
              <span>de actuele kilometerstand</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-primary mt-1">•</span>
              <span>informatie over staat, gebruik en eventuele schade</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-primary mt-1">•</span>
              <span>buitenlandse documenten (indien van toepassing)</span>
            </li>
          </ul>
          <p className="text-foreground/90 leading-relaxed">
            Volledige informatie is noodzakelijk om het BPM-dossier zorgvuldig en verdedigbaar op te bouwen. Onvolledige of onjuiste gegevens kunnen leiden tot vertraging of aanvullende vragen bij de aangifte.
          </p>
        </div>
      </section>

      {/* Belangrijk om te weten */}
      <section className="section-padding bg-muted/30">
        <div className="container-narrow">
          <h2 className="text-2xl md:text-3xl font-semibold text-foreground mb-6">
            Belangrijk om te weten vóór de BPM-aangifte
          </h2>
          <p className="text-foreground/90 leading-relaxed mb-4">
            De staat van de camper op het moment van taxatie is bepalend voor de vastgestelde afschrijving. Werkzaamheden of herstel die nog gepland staan, moeten daarom vóór de taxatiedatum zijn uitgevoerd.
          </p>
          <p className="text-foreground/90 leading-relaxed mb-4">
            Een BPM-taxatierapport heeft een beperkte geldigheidsduur. Het rapport moet actueel zijn op het moment van de aangifte. Bij twijfel informeren wij je hierover vooraf.
          </p>
          <p className="text-foreground/90 leading-relaxed mb-4">
            Juiste aankoopgegevens zijn essentieel. De aankoopfactuur en eventuele buitenlandse documenten vormen een belangrijk onderdeel van het dossier.
          </p>
          <p className="text-foreground/90 leading-relaxed">
            Houd er rekening mee dat de Belastingdienst BPM-aangiftes kan controleren. Een zorgvuldig en transparant opgebouwd dossier verkleint het risico op discussie achteraf.
          </p>
        </div>
      </section>

      {/* Onafhankelijkheid, expertise en juridische borging */}
      <section className="section-padding bg-background">
        <div className="container-narrow">
          <h2 className="text-2xl md:text-3xl font-semibold text-foreground mb-6">
            Onafhankelijkheid, expertise en juridische borging
          </h2>
          <p className="text-foreground/90 leading-relaxed mb-4">
            Automobiel Taxaties werkt als onafhankelijk taxateur. De taxaties worden uitgevoerd door een taxateur die is geregistreerd bij de Vereniging van Register-Taxateurs (VRT) en is aangesloten bij de Taxateursvereniging voor Motorvoertuigen (TMV).
          </p>
          <p className="text-foreground/90 leading-relaxed mb-4">
            Voor specialistische voertuigwaarderingen, zoals campers met bijzondere opbouw of inrichting, wordt gewerkt binnen de richtlijnen van de FEHAC. De vakkennis wordt actief onderhouden en toegepast bij iedere taxatie.
          </p>
          <p className="text-foreground/90 leading-relaxed mb-4">
            De rapportages zijn zorgvuldig opgebouwd, transparant en inhoudelijk verdedigbaar. Wanneer er vragen ontstaan of een inhoudelijke discussie volgt, werken wij samen met een jurist die is gespecialiseerd in BPM- en fiscale voertuigwaarderingen.
          </p>
          <p className="text-foreground/90 leading-relaxed">
            Er worden geen vooraf afgesproken uitkomsten of wensbedragen gehanteerd.
          </p>
        </div>
      </section>

      {/* Form section */}
      <section className="section-padding bg-muted/30" ref={formRef}>
        <div className="container-narrow">
          <div className="text-center mb-8">
            <h2 className="text-2xl md:text-3xl font-semibold text-foreground mb-4">
              BPM-taxatie voor campers aanvragen
            </h2>
            <p className="text-foreground/90 leading-relaxed">
              Wil je de BPM bij import van een camper zorgvuldig laten vaststellen, dan kun je hieronder een aanvraag indienen. Op basis van de aangeleverde gegevens beoordelen wij welke BPM-methode passend is.
            </p>
          </div>
          <IntakeForm 
            serviceType="bpm-taxatie camper" 
            formTitle="BPM-taxatie camper aanvragen"
            toelichtingPlaceholder="Geef hier de beschikbare informatie over de camper en de import."
            submitButtonText="BPM-taxatie camper aanvragen"
          />
        </div>
      </section>

      {/* Terug naar overzicht */}
      <section className="section-padding bg-background">
        <div className="container-narrow text-center">
          <Button variant="secondary-action" size="sm" asChild>
            <Link to="/bpm-taxatie" className="inline-flex items-center gap-2">
              Terug naar BPM-taxatie overzicht
              <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
            </Link>
          </Button>
        </div>
      </section>
      <SiteFooter />
      <WhatsAppButton />
    </div>
  );
};

export default BpmCamperTaxatie;
