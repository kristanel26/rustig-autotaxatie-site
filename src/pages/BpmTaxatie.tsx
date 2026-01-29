import { useRef } from "react";
import LandingHero from "@/components/LandingHero";
import IntakeForm from "@/components/IntakeForm";
import { Users, FileText, Shield, ClipboardCheck, Heart } from "lucide-react";

const BpmTaxatie = () => {
  const formRef = useRef<HTMLDivElement>(null);

  const scrollToForm = () => {
    formRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <div className="min-h-screen bg-background">
      <LandingHero
        subtitle="BPM-taxatie"
        title="BPM-taxatie bij import van voertuigen"
        description={
          <>
            <p className="text-lg md:text-xl text-muted-foreground mb-4">
              Importeer je een auto of motor uit het buitenland en wil je deze in Nederland registreren, dan moet je BPM betalen. De manier waarop de BPM wordt vastgesteld, heeft direct invloed op het te betalen bedrag.
            </p>
            <p className="text-base md:text-lg text-muted-foreground mb-4">
              Wij verzorgen de BPM-vaststelling voor ondernemers en particulieren. Dat doen wij door de juiste methode toe te passen én uit te voeren: via een afschrijvingstabel, een koerslijst of een BPM-taxatierapport. Per voertuig beoordelen wij welke methode het meest voordelig én verdedigbaar is en zorgen wij voor de volledige onderbouwing voor de BPM-aangifte.
            </p>
            <p className="text-base md:text-lg text-muted-foreground">
              Wanneer een BPM-taxatierapport nodig is, stellen wij dit op basis van de werkelijke staat van het voertuig op. Het rapport is zo opgebouwd dat het ook bij controle duidelijk en uitlegbaar is.
            </p>
          </>
        }
        ctaText="Neem contact op"
        onCtaClick={scrollToForm}
      />

      {/* Voor wie is een BPM-taxatie bedoeld */}
      <section className="section-padding bg-background">
        <div className="container-narrow">
          <div className="flex items-start gap-4 mb-6">
            <div className="flex-shrink-0 w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center">
              <Users className="w-6 h-6 text-primary" />
            </div>
            <div>
              <h2 className="text-2xl md:text-3xl font-semibold">
                Voor wie is een BPM-taxatie bedoeld?
              </h2>
            </div>
          </div>
          <div className="prose prose-lg max-w-none text-muted-foreground">
            <p>
              Onze BPM-werkzaamheden zijn bedoeld voor ondernemers die voertuigen importeren, zoals autobedrijven, handelaren en importeurs. Zij willen het BPM-traject correct laten uitvoeren, met een onderbouwing die klopt.
            </p>
            <p className="mt-4">
              Ook particulieren kunnen bij ons terecht wanneer zij een voertuig importeren en zekerheid willen over de gekozen methode en de onderbouwing daarvan.
            </p>
          </div>
        </div>
      </section>

      {/* Wat is BPM */}
      <section className="section-padding bg-secondary/30">
        <div className="container-narrow">
          <div className="flex items-start gap-4 mb-6">
            <div className="flex-shrink-0 w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center">
              <FileText className="w-6 h-6 text-primary" />
            </div>
            <div>
              <h2 className="text-2xl md:text-3xl font-semibold">
                Wat is BPM?
              </h2>
            </div>
          </div>
          <div className="prose prose-lg max-w-none text-muted-foreground">
            <p>
              BPM is een belasting die je betaalt wanneer je een voertuig uit het buitenland in Nederland op kenteken zet. De Belastingdienst staat meerdere methodes toe om het BPM-bedrag vast te stellen.
            </p>
            <p className="mt-4">
              De meest gebruikte methodes zijn:
            </p>
            <ul className="mt-2 space-y-1 list-disc list-inside">
              <li>een afschrijvingstabel</li>
              <li>een koerslijst</li>
              <li>een BPM-taxatierapport</li>
            </ul>
            <p className="mt-4">
              Welke methode het meest geschikt is, hangt af van het voertuig en de staat waarin het verkeert.
            </p>
          </div>
        </div>
      </section>

      {/* Waarom een onafhankelijke BPM-taxatie */}
      <section className="section-padding bg-background">
        <div className="container-narrow">
          <div className="flex items-start gap-4 mb-6">
            <div className="flex-shrink-0 w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center">
              <Shield className="w-6 h-6 text-primary" />
            </div>
            <div>
              <h2 className="text-2xl md:text-3xl font-semibold">
                Waarom een onafhankelijke BPM-taxatie?
              </h2>
            </div>
          </div>
          <div className="prose prose-lg max-w-none text-muted-foreground">
            <p>
              Een BPM-taxatie heeft alleen waarde wanneer deze onafhankelijk wordt uitgevoerd. Daarom werken wij niet met vooraf afgesproken uitkomsten, vaste afschrijvingen of belangen bij aankoop of verkoop.
            </p>
            <p className="mt-4">
              Die onafhankelijkheid zorgt ervoor dat de onderbouwing klopt en dat ook later nog duidelijk is hoe de BPM tot stand is gekomen.
            </p>
          </div>
        </div>
      </section>

      {/* Onze werkwijze bij een BPM-aangifte */}
      <section className="section-padding bg-secondary/30">
        <div className="container-narrow">
          <div className="flex items-start gap-4 mb-6">
            <div className="flex-shrink-0 w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center">
              <ClipboardCheck className="w-6 h-6 text-primary" />
            </div>
            <div>
              <h2 className="text-2xl md:text-3xl font-semibold">
                Onze werkwijze bij een BPM-aangifte
              </h2>
            </div>
          </div>
          <div className="prose prose-lg max-w-none text-muted-foreground mb-8">
            <p>
              De BPM-taxaties en aangiften worden uitgevoerd door een geregistreerd taxateur die zijn vakkennis actief onderhoudt. Zo weet je dat de onderbouwing niet alleen klopt op papier, maar ook inhoudelijk goed is doordacht.
            </p>
            <p className="mt-4">
              Een BPM-aangifte bestaat uit meerdere stappen. Wij zorgen ervoor dat dit proces overzichtelijk verloopt en dat alles zorgvuldig wordt uitgewerkt.
            </p>
          </div>
          <div className="space-y-6">
            <div className="flex items-start gap-4">
              <span className="flex-shrink-0 w-8 h-8 rounded-full bg-accent/20 text-accent-foreground flex items-center justify-center font-medium text-sm">1</span>
              <div>
                <p className="font-medium text-foreground mb-1">Aanleveren van voertuiggegevens</p>
                <p className="text-muted-foreground">Je levert de voertuiggegevens aan die op dat moment beschikbaar zijn, zoals voertuiggegevens, aankoopinformatie en eventuele buitenlandse documenten. Dat vormt de basis voor de verdere uitwerking.</p>
              </div>
            </div>
            <div className="flex items-start gap-4">
              <span className="flex-shrink-0 w-8 h-8 rounded-full bg-accent/20 text-accent-foreground flex items-center justify-center font-medium text-sm">2</span>
              <div>
                <p className="font-medium text-foreground mb-1">Berekenen van het voertuig</p>
                <p className="text-muted-foreground">Wij berekenen het voertuig en bepalen welke methode het beste past bij jouw voertuig en financieel voor jou het meest gunstig uitpakt. Dat kan een afschrijvingstabel zijn, een koerslijst of een BPM-taxatierapport.</p>
              </div>
            </div>
            <div className="flex items-start gap-4">
              <span className="flex-shrink-0 w-8 h-8 rounded-full bg-accent/20 text-accent-foreground flex items-center justify-center font-medium text-sm">3</span>
              <div>
                <p className="font-medium text-foreground mb-1">Uitvoering van de gekozen methode</p>
                <p className="text-muted-foreground">De gekozen methode voeren wij volledig uit. Bij een afschrijvingstabel of koerslijst verzorgen wij de volledige BPM-aangifte. Wanneer een taxatie nodig is, voeren wij een fysieke inspectie op locatie uit en stellen wij een zorgvuldig onderbouwd BPM-taxatierapport op.</p>
              </div>
            </div>
            <div className="flex items-start gap-4">
              <span className="flex-shrink-0 w-8 h-8 rounded-full bg-accent/20 text-accent-foreground flex items-center justify-center font-medium text-sm">4</span>
              <div>
                <p className="font-medium text-foreground mb-1">Opstellen van de BPM-aangifte</p>
                <p className="text-muted-foreground">Wij werken de BPM-aangifte volledig voor je uit. Alle berekeningen en onderbouwingen worden hierin verwerkt, zodat de aangifte compleet is opgebouwd.</p>
              </div>
            </div>
            <div className="flex items-start gap-4">
              <span className="flex-shrink-0 w-8 h-8 rounded-full bg-accent/20 text-accent-foreground flex items-center justify-center font-medium text-sm">5</span>
              <div>
                <p className="font-medium text-foreground mb-1">Oplevering per e-mail</p>
                <p className="text-muted-foreground">Je ontvangt per e-mail de complete BPM-aangifte. Je hoeft deze alleen nog te ondertekenen en op te sturen naar de Belastingdienst.</p>
              </div>
            </div>
          </div>
          <p className="text-muted-foreground mt-6">
            Zo blijft het proces overzichtelijk en hoef je zelf niets samen te stellen of uit te zoeken.
          </p>
        </div>
      </section>

      {/* Vertrouwen en deskundigheid */}
      <section className="section-padding bg-background">
        <div className="container-narrow">
          <div className="flex items-start gap-4 mb-6">
            <div className="flex-shrink-0 w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center">
              <Heart className="w-6 h-6 text-primary" />
            </div>
            <div>
              <h2 className="text-2xl md:text-3xl font-semibold">
                Vertrouwen en deskundigheid
              </h2>
            </div>
          </div>
          <div className="prose prose-lg max-w-none text-muted-foreground">
            <p>
              Automobiel Taxaties werkt als onafhankelijk en geregistreerd taxateur. De vakkennis wordt actief onderhouden en toegepast in iedere BPM-aangifte en taxatie.
            </p>
            <p className="mt-4">
              Zo weet je dat de onderbouwing niet alleen klopt op papier, maar ook inhoudelijk zorgvuldig is opgebouwd voor gebruik bij de Belastingdienst.
            </p>
          </div>
        </div>
      </section>

      {/* Afsluitende CTA en formulier */}
      <section className="section-padding bg-secondary/30" ref={formRef}>
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
