import { useRef } from "react";
import { Link } from "react-router-dom";
import LandingHero from "@/components/LandingHero";
import IntakeForm from "@/components/IntakeForm";
import SiteHeader from "@/components/SiteHeader";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";

const BpmMotorTaxatie = () => {
  const formRef = useRef<HTMLDivElement>(null);

  const scrollToForm = () => {
    formRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <div className="min-h-screen bg-background">
      <SiteHeader />
      <LandingHero
        subtitle="BPM-TAXATIE MOTOR"
        title="Zorgvuldig vastgestelde BPM bij import van een motor"
        description="Wanneer je een motor uit het buitenland importeert, moet er BPM worden aangegeven. De hoogte van dat bedrag hangt af van de manier waarop de afschrijving wordt vastgesteld. Juist bij motoren kan dat verschil aanzienlijk zijn."
        ctaText="BPM-taxatie motor aanvragen"
        onCtaClick={scrollToForm}
      />

      {/* Uitleg BPM bij motorimport */}
      <section className="section-padding bg-muted/30">
        <div className="container-narrow">
          <p className="text-foreground/90 leading-relaxed">
            Bij het importeren van een motor krijg je te maken met BPM. De manier waarop deze BPM wordt vastgesteld, verschilt per situatie en heeft direct invloed op de aangifte en de onderbouwing richting de Belastingdienst.
          </p>
        </div>
      </section>

      {/* Wanneer is een BPM-taxatie nodig */}
      <section className="section-padding bg-background">
        <div className="container-narrow">
          <h2 className="text-2xl md:text-3xl font-semibold text-foreground mb-6">
            Wanneer is een BPM-taxatie voor een motor nodig?
          </h2>
          <p className="text-foreground/90 leading-relaxed mb-6">
            In veel gevallen kan de BPM worden vastgesteld op basis van een afschrijvingstabel of koerslijst. Soms geven deze methodes echter geen realistisch beeld van de werkelijke staat van de motor.
          </p>
          <p className="text-foreground/90 leading-relaxed mb-4">
            Een BPM-taxatie is noodzakelijk wanneer:
          </p>
          <ul className="space-y-2 text-foreground/90 mb-6">
            <li className="flex items-start gap-2">
              <span className="text-primary mt-1">•</span>
              <span>de motor schade heeft of heeft gehad</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-primary mt-1">•</span>
              <span>de staat afwijkt van wat gangbaar is voor dit type motor</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-primary mt-1">•</span>
              <span>het gaat om bijzondere uitvoeringen of aangepaste motoren</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-primary mt-1">•</span>
              <span>een tabel- of koerslijstaangifte geen realistisch en verdedigbaar beeld geeft</span>
            </li>
          </ul>
          <p className="text-foreground/90 leading-relaxed">
            In deze situaties is een BPM-taxatierapport de enige manier om de afschrijving correct en inhoudelijk verdedigbaar vast te stellen.
          </p>
        </div>
      </section>

      {/* Welke methodes */}
      <section className="section-padding bg-muted/30">
        <div className="container-narrow">
          <h2 className="text-2xl md:text-3xl font-semibold text-foreground mb-6">
            Welke BPM-methodes zijn mogelijk bij motoren?
          </h2>
          <p className="text-foreground/90 leading-relaxed mb-6">
            De Belastingdienst staat meerdere methodes toe om de BPM bij import vast te stellen:
          </p>
          
          <div className="space-y-6">
            <div>
              <h3 className="text-lg font-semibold text-foreground mb-2">Afschrijvingstabel</h3>
              <p className="text-foreground/90">
                De BPM wordt vastgesteld op basis van vaste tabellen. De werkelijke staat van de motor speelt hierbij geen rol.
              </p>
            </div>
            <div>
              <h3 className="text-lg font-semibold text-foreground mb-2">Koerslijst</h3>
              <p className="text-foreground/90">
                De BPM wordt gebaseerd op marktgegevens van vergelijkbare motoren. Ook hier wordt de individuele staat niet meegewogen.
              </p>
            </div>
            <div>
              <h3 className="text-lg font-semibold text-foreground mb-2">BPM-taxatierapport</h3>
              <p className="text-foreground/90">
                Bij een taxatie wordt de motor fysiek geïnspecteerd en wordt de afschrijving vastgesteld op basis van de werkelijke staat. Dit resulteert in een onderbouwd BPM-taxatierapport.
              </p>
            </div>
          </div>

          <p className="text-foreground/90 leading-relaxed mt-8">
            Wanneer de BPM bij import van een motor niet realistisch kan worden vastgesteld via een afschrijvingstabel of koerslijst, is een BPM-taxatie de meest logische en verdedigbare methode. Automobiel Taxaties stelt in die gevallen een BPM-taxatierapport op, gebaseerd op een fysieke inspectie en de werkelijke staat van de motor.
          </p>
        </div>
      </section>

      {/* Werkwijze */}
      <section className="section-padding bg-background">
        <div className="container-narrow">
          <h2 className="text-2xl md:text-3xl font-semibold text-foreground mb-4">
            Onze werkwijze bij een BPM-taxatie voor motoren
          </h2>
          <p className="text-foreground/90 leading-relaxed mb-10">
            Een BPM-taxatie bestaat uit meerdere stappen. Wij zorgen ervoor dat dit proces overzichtelijk verloopt en correct wordt uitgevoerd.
          </p>

          <div className="space-y-8">
            <div className="flex gap-4">
              <div className="flex-shrink-0 w-10 h-10 rounded-full bg-primary text-primary-foreground flex items-center justify-center font-semibold">
                1
              </div>
              <div>
                <h3 className="text-lg font-semibold text-foreground mb-2">Aanleveren van gegevens</h3>
                <p className="text-foreground/90">
                  Je levert de beschikbare voertuiggegevens aan, waaronder het buitenlandse kenteken of chassisnummer, de aankoopfactuur, de actuele kilometerstand, recente foto's van de motor en beschikbare informatie over schade, gebruik en onderhoud.
                </p>
              </div>
            </div>

            <div className="flex gap-4">
              <div className="flex-shrink-0 w-10 h-10 rounded-full bg-primary text-primary-foreground flex items-center justify-center font-semibold">
                2
              </div>
              <div>
                <h3 className="text-lg font-semibold text-foreground mb-2">Beoordeling en voorbereiding</h3>
                <p className="text-foreground/90">
                  Wij beoordelen de aangeleverde gegevens en bereiden de fysieke inspectie voor. Zo weten we vooraf waar we op moeten letten.
                </p>
              </div>
            </div>

            <div className="flex gap-4">
              <div className="flex-shrink-0 w-10 h-10 rounded-full bg-primary text-primary-foreground flex items-center justify-center font-semibold">
                3
              </div>
              <div>
                <h3 className="text-lg font-semibold text-foreground mb-2">Fysieke inspectie</h3>
                <p className="text-foreground/90">
                  De motor wordt op locatie geïnspecteerd. De werkelijke staat wordt vastgelegd, inclusief eventuele schade, slijtage of bijzonderheden.
                </p>
              </div>
            </div>

            <div className="flex gap-4">
              <div className="flex-shrink-0 w-10 h-10 rounded-full bg-primary text-primary-foreground flex items-center justify-center font-semibold">
                4
              </div>
              <div>
                <h3 className="text-lg font-semibold text-foreground mb-2">Opstellen BPM-taxatierapport</h3>
                <p className="text-foreground/90">
                  Op basis van de inspectie stellen wij een BPM-taxatierapport op waarin de afschrijving wordt onderbouwd. Dit rapport vormt de basis voor de BPM-aangifte.
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
                  Je ontvangt het BPM-taxatierapport per e-mail. Dit rapport kan worden gebruikt voor de BPM-aangifte bij de Belastingdienst.
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
            Bij Automobiel Taxaties begeleiden wij het BPM-traject voor motoren zorgvuldig en inhoudelijk onderbouwd. Per voertuig beoordelen wij welke methode fiscaal logisch en verdedigbaar is.
          </p>
          <ul className="space-y-2 text-foreground/90 mb-6">
            <li className="flex items-start gap-2">
              <span className="text-primary mt-1">•</span>
              <span>een onafhankelijke beoordeling per motor</span>
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
              <span>recente foto's van de motor</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-primary mt-1">•</span>
              <span>informatie over staat, schade en onderhoud</span>
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
            De staat van de motor op het moment van taxatie is bepalend voor de vastgestelde afschrijving. Werkzaamheden of herstel die nog gepland staan, moeten daarom vóór de taxatiedatum zijn uitgevoerd.
          </p>
          <p className="text-foreground/90 leading-relaxed mb-4">
            Een BPM-taxatierapport heeft een beperkte geldigheidsduur. Het rapport moet actueel zijn op het moment van de aangifte.
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
            De vakkennis wordt actief onderhouden en toegepast bij iedere taxatie. Er worden geen vooraf afgesproken uitkomsten of wensbedragen gehanteerd.
          </p>
          <p className="text-foreground/90 leading-relaxed mb-4">
            BPM-taxaties en onderbouwingen worden zorgvuldig opgebouwd met het oog op controle achteraf door de Belastingdienst. De rapportages zijn transparant, controleerbaar en inhoudelijk verdedigbaar opgesteld.
          </p>
          <p className="text-foreground/90 leading-relaxed">
            Wanneer er vragen ontstaan of een inhoudelijke discussie volgt, werken wij samen met een jurist die is gespecialiseerd in BPM- en fiscale voertuigwaarderingen, zodat de onderbouwing ook juridisch standhoudt.
          </p>
        </div>
      </section>

      {/* Form section */}
      <section className="section-padding bg-muted/30" ref={formRef}>
        <div className="container-narrow">
          <div className="text-center mb-8">
            <h2 className="text-2xl md:text-3xl font-semibold text-foreground mb-4">
              BPM-taxatie voor motoren aanvragen
            </h2>
            <p className="text-foreground/90 leading-relaxed">
              Wil je de BPM bij import van een motor zorgvuldig laten vaststellen, dan kun je hieronder een aanvraag indienen. Op basis van de aangeleverde gegevens beoordelen wij of een BPM-taxatie noodzakelijk is.
            </p>
          </div>
          <IntakeForm 
            serviceType="bpm-taxatie motor" 
            formTitle="BPM-taxatie motor aanvragen"
            toelichtingPlaceholder="Geef hier de beschikbare informatie over de motor en de import."
            submitButtonText="BPM-taxatie motor aanvragen"
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
    </div>
  );
};

export default BpmMotorTaxatie;
