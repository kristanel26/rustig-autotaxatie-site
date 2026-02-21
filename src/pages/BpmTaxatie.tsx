import { useRef } from "react";
import LandingHero from "@/components/LandingHero";
import IntakeForm from "@/components/IntakeForm";
import SiteHeader from "@/components/SiteHeader";
import { Users, FileText, Shield, ClipboardCheck, List, AlertTriangle } from "lucide-react";
import heroBpm from "@/assets/hero-bpm.jpg";
const BpmTaxatie = () => {
  const formRef = useRef<HTMLDivElement>(null);

  const scrollToForm = () => {
    formRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <div className="min-h-screen bg-background">
      <SiteHeader />
      <LandingHero
        subtitle="BPM-taxatie"
        title="BPM-taxatie bij import van voertuigen"
        description="Wanneer je een voertuig uit het buitenland importeert en in Nederland wilt registreren, moet er BPM worden aangegeven. De manier waarop de BPM wordt vastgesteld, verschilt per situatie en heeft direct invloed op de onderbouwing richting de Belastingdienst."
        ctaText="BPM-aangifte aanvragen"
        onCtaClick={scrollToForm}
        heroImage={heroBpm}
      />

      {/* Inleidende uitleg: BPM bij import van voertuigen */}
      <section className="section-padding bg-muted/30">
        <div className="container-narrow">
          <h2 className="text-2xl md:text-3xl font-semibold text-foreground mb-6">
            BPM bij import van voertuigen
          </h2>
          <p className="text-foreground/90 leading-relaxed mb-4">
            Wanneer je een voertuig uit het buitenland importeert en in Nederland wilt registreren, krijg je te maken met BPM. Dit is een belasting die je betaalt voordat het voertuig op Nederlands kenteken kan worden gezet.
          </p>
          <p className="text-foreground/90 leading-relaxed">
            Automobiel Taxaties beoordeelt per voertuig welke methode fiscaal logisch en verdedigbaar is. Die keuze heeft direct invloed op de BPM-aangifte en de onderbouwing richting de Belastingdienst.
          </p>
        </div>
      </section>

      {/* Voor wie is deze BPM-pagina bedoeld */}
      <section className="section-padding bg-background">
        <div className="container-narrow">
          <div className="flex items-start gap-4 mb-6">
            <div className="flex-shrink-0 w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center">
              <Users className="w-6 h-6 text-primary" />
            </div>
            <div>
              <h2 className="text-2xl md:text-3xl font-semibold">
                Voor wie is deze BPM-pagina bedoeld?
              </h2>
            </div>
          </div>
          <div className="prose prose-lg max-w-none text-muted-foreground">
            <p>
              Deze pagina is bedoeld voor ondernemers die voertuigen importeren, zoals autobedrijven, handelaren en importeurs. Zij willen het BPM-traject correct laten uitvoeren, met een onderbouwing die klopt en verdedigbaar is bij controle.
            </p>
            <p className="mt-4">
              Ook particulieren kunnen bij ons terecht wanneer zij een voertuig importeren en zekerheid willen over de gekozen methode en de onderbouwing daarvan.
            </p>
          </div>
        </div>
      </section>

      {/* Wat is BPM en hoe kan deze worden vastgesteld */}
      <section className="section-padding bg-muted/30">
        <div className="container-narrow">
          <div className="flex items-start gap-4 mb-6">
            <div className="flex-shrink-0 w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center">
              <FileText className="w-6 h-6 text-primary" />
            </div>
            <div>
              <h2 className="text-2xl md:text-3xl font-semibold">
                Wat is BPM en hoe kan deze worden vastgesteld?
              </h2>
            </div>
          </div>
          <div className="prose prose-lg max-w-none text-muted-foreground">
            <p>
              BPM is een belasting die je betaalt wanneer je een voertuig uit het buitenland in Nederland op kenteken zet. De hoogte van de BPM hangt af van de afschrijving die op het voertuig van toepassing is.
            </p>
            <p className="mt-4">
              De Belastingdienst staat meerdere methodes toe om de afschrijving vast te stellen. Welke methode van toepassing is, hangt af van het voertuig en de staat waarin het verkeert.
            </p>
          </div>
        </div>
      </section>

      {/* Welke BPM-methodes zijn mogelijk */}
      <section className="section-padding bg-background">
        <div className="container-narrow">
          <div className="flex items-start gap-4 mb-6">
            <div className="flex-shrink-0 w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center">
              <List className="w-6 h-6 text-primary" />
            </div>
            <div>
              <h2 className="text-2xl md:text-3xl font-semibold">
                Welke BPM-methodes zijn mogelijk?
              </h2>
            </div>
          </div>
          <div className="prose prose-lg max-w-none text-muted-foreground">
            <p>
              Er zijn drie methodes waarmee de afschrijving kan worden vastgesteld:
            </p>
            <p className="mt-4">
              <strong>Afschrijvingstabel</strong><br />
              Een forfaitaire tabel op basis van de leeftijd van het voertuig. Deze methode houdt geen rekening met de werkelijke staat of specifieke kenmerken van het voertuig.
            </p>
            <p className="mt-4">
              <strong>Koerslijst</strong><br />
              Een gestandaardiseerde waardebepaling op basis van merk, model en uitvoering. Ook hier wordt de werkelijke staat van het voertuig niet individueel beoordeeld.
            </p>
            <p className="mt-4">
              <strong>BPM-taxatierapport</strong><br />
              Een onderbouwing op basis van een fysieke inspectie door een geregistreerd taxateur. De werkelijke staat van het voertuig vormt het uitgangspunt voor de afschrijving.
            </p>
            <p className="mt-6">
              Wanneer de BPM niet op een realistische en verdedigbare manier kan worden vastgesteld met een afschrijvingstabel of koerslijst, is een onafhankelijke BPM-taxatie noodzakelijk. Alleen met een fysieke inspectie en een zorgvuldig opgebouwd BPM-taxatierapport kan de afschrijving dan correct worden onderbouwd.
            </p>
          </div>
        </div>
      </section>

      {/* Onze werkwijze bij het vaststellen en aangeven van BPM */}
      <section className="section-padding bg-muted/30">
        <div className="container-narrow">
          <div className="flex items-start gap-4 mb-6">
            <div className="flex-shrink-0 w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center">
              <ClipboardCheck className="w-6 h-6 text-primary" />
            </div>
            <div>
              <h2 className="text-2xl md:text-3xl font-semibold">
                Onze werkwijze bij het vaststellen en aangeven van BPM
              </h2>
            </div>
          </div>
          <div className="prose prose-lg max-w-none text-muted-foreground mb-8">
            <p>
              De BPM-taxaties en aangiften worden uitgevoerd door een geregistreerd taxateur. Zo weet je dat de onderbouwing niet alleen klopt op papier, maar ook inhoudelijk zorgvuldig is opgebouwd.
            </p>
          </div>
          <div className="space-y-6">
            <div className="flex items-start gap-4">
              <span className="flex-shrink-0 w-8 h-8 rounded-full bg-primary text-primary-foreground flex items-center justify-center font-medium text-sm">1</span>
              <div>
                <p className="font-medium text-foreground mb-1">Aanleveren van voertuiggegevens</p>
                <p className="text-muted-foreground">Je levert de beschikbare voertuiggegevens aan, zoals het buitenlandse kenteken of chassisnummer, de aankoopfactuur en eventuele buitenlandse documenten.</p>
              </div>
            </div>
            <div className="flex items-start gap-4">
              <span className="flex-shrink-0 w-8 h-8 rounded-full bg-primary text-primary-foreground flex items-center justify-center font-medium text-sm">2</span>
              <div>
                <p className="font-medium text-foreground mb-1">Beoordelen van de juiste methode</p>
                <p className="text-muted-foreground">Per voertuig wordt beoordeeld welke BPM-methode fiscaal logisch en verdedigbaar is. Dit kan een afschrijvingstabel of koerslijst zijn, of een BPM-taxatie wanneer de staat van het voertuig daartoe aanleiding geeft.</p>
              </div>
            </div>
            <div className="flex items-start gap-4">
              <span className="flex-shrink-0 w-8 h-8 rounded-full bg-primary text-primary-foreground flex items-center justify-center font-medium text-sm">3</span>
              <div>
                <p className="font-medium text-foreground mb-1">Uitvoering van de gekozen methode</p>
                <p className="text-muted-foreground">De gekozen methode wordt volledig uitgevoerd. Bij een afschrijvingstabel of koerslijst verzorgen wij de volledige BPM-aangifte. Wanneer een taxatie nodig is, voeren wij een fysieke inspectie op locatie uit en stellen wij een zorgvuldig onderbouwd BPM-taxatierapport op.</p>
              </div>
            </div>
            <div className="flex items-start gap-4">
              <span className="flex-shrink-0 w-8 h-8 rounded-full bg-primary text-primary-foreground flex items-center justify-center font-medium text-sm">4</span>
              <div>
                <p className="font-medium text-foreground mb-1">Opstellen van de BPM-aangifte</p>
                <p className="text-muted-foreground">De BPM-aangifte wordt volledig uitgewerkt. Alle onderbouwingen worden hierin verwerkt, zodat de aangifte compleet en controleerbaar is opgebouwd.</p>
              </div>
            </div>
            <div className="flex items-start gap-4">
              <span className="flex-shrink-0 w-8 h-8 rounded-full bg-primary text-primary-foreground flex items-center justify-center font-medium text-sm">5</span>
              <div>
                <p className="font-medium text-foreground mb-1">Oplevering per e-mail</p>
                <p className="text-muted-foreground">Je ontvangt per e-mail de complete BPM-aangifte en eventuele bijlagen. Je hoeft deze alleen nog te ondertekenen en op te sturen naar de Belastingdienst.</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Wat kun je van ons verwachten */}
      <section className="section-padding bg-background">
        <div className="container-narrow">
          <h2 className="text-2xl md:text-3xl font-semibold text-foreground mb-6">
            Wat kun je van ons verwachten?
          </h2>
          <div className="prose prose-lg max-w-none text-muted-foreground">
            <p>
              Bij Automobiel Taxaties begeleiden wij het BPM-traject zorgvuldig en inhoudelijk onderbouwd. Per voertuig beoordelen wij welke methode fiscaal logisch en verdedigbaar is om de BPM vast te stellen.
            </p>
            <p className="mt-4">
              Wanneer standaardmethodes zoals een afschrijvingstabel of koerslijst geen realistisch beeld geven, stellen wij een BPM-taxatierapport op op basis van een fysieke inspectie en de werkelijke staat van het voertuig.
            </p>
            <p className="mt-4">
              Je kunt rekenen op een onafhankelijke beoordeling, duidelijke uitleg over de gekozen methode en een onderbouwing die is ingericht om ook bij controle door de Belastingdienst inzichtelijk en uitlegbaar te zijn. Wij werken zonder wensbedragen en zonder vooraf vastgestelde uitkomsten.
            </p>
          </div>
        </div>
      </section>

      {/* Wat hebben wij van je nodig */}
      <section className="section-padding bg-muted/30">
        <div className="container-narrow">
          <h2 className="text-2xl md:text-3xl font-semibold text-foreground mb-6">
            Wat hebben wij van je nodig?
          </h2>
          <div className="prose prose-lg max-w-none text-muted-foreground">
            <p>
              Voor een correcte vaststelling van de BPM hebben wij vooraf volledige en juiste voertuiggegevens nodig. Dit betreft onder meer het buitenlandse kenteken of chassisnummer, de aankoopfactuur, de actuele kilometerstand en beschikbare informatie over schade, gebruik en onderhoud.
            </p>
            <p className="mt-4">
              Deze gegevens zijn noodzakelijk om te kunnen beoordelen welke BPM-methode van toepassing is en om, indien nodig, de taxatie en fysieke inspectie zorgvuldig voor te bereiden. Onvolledige of onjuiste informatie kan leiden tot vertraging of aanvullende vragen bij de BPM-aangifte.
            </p>
          </div>
        </div>
      </section>

      {/* Belangrijk om te weten vóór de BPM-aangifte */}
      <section className="section-padding bg-background">
        <div className="container-narrow">
          <div className="flex items-start gap-4 mb-6">
            <div className="flex-shrink-0 w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center">
              <AlertTriangle className="w-6 h-6 text-primary" />
            </div>
            <div>
              <h2 className="text-2xl md:text-3xl font-semibold">
                Belangrijk om te weten vóór de BPM-aangifte
              </h2>
            </div>
          </div>
          <div className="prose prose-lg max-w-none text-muted-foreground">
            <p>
              De wijze waarop de BPM wordt vastgesteld, heeft direct invloed op de BPM-aangifte en de onderbouwing richting de Belastingdienst. Daarom is het belangrijk om vooraf rekening te houden met een aantal uitgangspunten.
            </p>
            <p className="mt-4">
              De BPM wordt vastgesteld op basis van de staat van het voertuig op het moment waarop de aangifte wordt voorbereid. Wanneer gebruik wordt gemaakt van een BPM-taxatie, is een fysieke inspectie vereist en vormt de werkelijke staat van het voertuig het uitgangspunt voor de afschrijving.
            </p>
            <p className="mt-4">
              Een BPM-taxatierapport heeft een beperkte geldigheid en is bedoeld als onderbouwing bij de BPM-aangifte. Het voertuig dient daarom in de getaxeerde staat te blijven totdat de aangifte is ingediend en verwerkt, zodat de onderbouwing ook bij een eventuele controle inzichtelijk blijft.
            </p>
            <p className="mt-4">
              Voor een correcte BPM-aangifte is het essentieel dat de aankoopgegevens volledig en juist zijn vastgelegd. Ontbrekende of onjuiste informatie kan leiden tot vragen of afwijzing van de aangifte door de Belastingdienst.
            </p>
          </div>
        </div>
      </section>

      {/* Onafhankelijkheid, expertise en juridische borging */}
      <section className="section-padding bg-muted/30">
        <div className="container-narrow">
          <div className="flex items-start gap-4 mb-6">
            <div className="flex-shrink-0 w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center">
              <Shield className="w-6 h-6 text-primary" />
            </div>
            <div>
              <h2 className="text-2xl md:text-3xl font-semibold">
                Onafhankelijkheid, expertise en juridische borging
              </h2>
            </div>
          </div>
          <div className="prose prose-lg max-w-none text-muted-foreground">
            <p>
              Automobiel Taxaties werkt als onafhankelijk taxateur. De taxaties worden uitgevoerd door een taxateur die is geregistreerd bij de Vereniging van Register-Taxateurs (VRT) en is aangesloten bij de Taxateursvereniging voor Motorvoertuigen (TMV).
            </p>
            <p className="mt-4">
              De vakkennis wordt actief onderhouden en toegepast bij iedere taxatie. Er worden geen vooraf afgesproken uitkomsten of wensbedragen gehanteerd.
            </p>
            <p className="mt-4">
              BPM-taxaties en onderbouwingen worden zorgvuldig opgebouwd met het oog op controle achteraf door de Belastingdienst. De rapportages zijn transparant, controleerbaar en inhoudelijk verdedigbaar opgesteld.
            </p>
            <p className="mt-4">
              Wanneer er vragen ontstaan of een inhoudelijke discussie volgt, werken wij samen met een jurist die is gespecialiseerd in BPM- en fiscale voertuigwaarderingen, zodat de onderbouwing ook juridisch standhoudt.
            </p>
          </div>
        </div>
      </section>

      {/* Afsluitende CTA en formulier */}
      <section className="section-padding bg-background" ref={formRef}>
        <div className="container-narrow">
          <div className="text-center mb-10">
            <h2 className="text-2xl md:text-3xl font-semibold mb-4">
              BPM-aangifte laten uitvoeren
            </h2>
            <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
              Wil je dat de BPM netjes en onafhankelijk wordt geregeld, dan kun je hieronder een aanvraag indienen. Aan de hand van de gegevens bekijken wij wat in jouw situatie de juiste aanpak is.
            </p>
          </div>
          <IntakeForm 
            serviceType="BPM-aangifte"
            formTitle="Aanvraag BPM-aangifte"
            formSubtext="Vul onderstaand formulier zo volledig mogelijk in. Op basis hiervan bepalen wij de juiste aanpak en voeren wij de BPM-aangifte voor je uit."
            toelichtingPlaceholder="Geef hier de beschikbare informatie over het voertuig en de import."
            submitButtonText="Aanvraag indienen"
            showVoertuigType={true}
          />
        </div>
      </section>

      <footer className="py-8 px-6 border-t border-border">
        <div className="container-wide text-center text-sm text-muted-foreground">
          <p>© 2024 Automobiel Taxaties. Alle rechten voorbehouden.</p>
        </div>
      </footer>
    </div>
  );
};

export default BpmTaxatie;
