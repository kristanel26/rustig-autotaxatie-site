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
              BPM is een belasting die je betaalt wanneer je een voertuig uit het buitenland 
              in Nederland registreert. De Belastingdienst kent meerdere toegestane methodes 
              om het BPM-bedrag vast te stellen.
            </p>
            <p className="mt-4">
              Een taxatie is één van die methodes. Voorwaarde is dat het rapport zorgvuldig 
              is opgebouwd en controleerbaar is. Daar zorgen wij voor.
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
              Een onafhankelijke taxatie geeft je een rapport dat je kunt gebruiken 
              bij je BPM-aangifte. Het voertuig wordt zorgvuldig beoordeeld op staat, 
              uitvoering en marktpositie.
            </p>
            <p className="mt-4">
              Het rapport bevat een duidelijke onderbouwing, zodat het ook bij 
              eventuele controle achteraf stand kan houden.
            </p>
          </div>
        </div>
      </section>

      {/* Werkwijze */}
      <section className="section-padding bg-secondary/30">
        <div className="container-narrow">
          <div className="flex items-start gap-4 mb-6">
            <div className="flex-shrink-0 w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center">
              <ClipboardCheck className="w-6 h-6 text-primary" />
            </div>
            <div>
              <h2 className="text-2xl md:text-3xl font-semibold">
                Werkwijze
              </h2>
            </div>
          </div>
          <div className="space-y-4">
            <div className="flex items-start gap-4">
              <span className="flex-shrink-0 w-8 h-8 rounded-full bg-accent/20 text-accent-foreground flex items-center justify-center font-medium text-sm">1</span>
              <div>
                <p className="font-medium text-foreground">Intake: we bespreken het voertuig en je situatie</p>
              </div>
            </div>
            <div className="flex items-start gap-4">
              <span className="flex-shrink-0 w-8 h-8 rounded-full bg-accent/20 text-accent-foreground flex items-center justify-center font-medium text-sm">2</span>
              <div>
                <p className="font-medium text-foreground">Beoordeling van staat, uitvoering en marktpositie</p>
              </div>
            </div>
            <div className="flex items-start gap-4">
              <span className="flex-shrink-0 w-8 h-8 rounded-full bg-accent/20 text-accent-foreground flex items-center justify-center font-medium text-sm">3</span>
              <div>
                <p className="font-medium text-foreground">Oplevering van het taxatierapport</p>
              </div>
            </div>
            <div className="flex items-start gap-4">
              <span className="flex-shrink-0 w-8 h-8 rounded-full bg-accent/20 text-accent-foreground flex items-center justify-center font-medium text-sm">4</span>
              <div>
                <p className="font-medium text-foreground">Gebruik bij je BPM-aangifte</p>
              </div>
            </div>
          </div>
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
              Automobiel Taxaties werkt onafhankelijk en met jarenlange ervaring. 
              Elk rapport wordt met zorg opgesteld en is bedoeld voor gebruik 
              bij de Belastingdienst.
            </p>
          </div>
        </div>
      </section>

      {/* Afsluitende CTA en formulier */}
      <section className="section-padding bg-secondary/30" ref={formRef}>
        <div className="container-narrow">
          <div className="text-center mb-10">
            <h2 className="text-2xl md:text-3xl font-semibold mb-4">
              BPM-taxatie nodig?
            </h2>
            <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
              Neem gerust contact met ons op. We bespreken je situatie en geven aan wat je kunt verwachten.
            </p>
          </div>
          <IntakeForm serviceType="BPM-taxatie" />
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
