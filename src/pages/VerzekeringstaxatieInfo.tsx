import { useRef } from "react";
import { Link } from "react-router-dom";
import LandingHero from "@/components/LandingHero";
import IntakeForm from "@/components/IntakeForm";
import TrustIndicators from "@/components/TrustIndicators";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";

const VerzekeringstaxatieInfo = () => {
  const formRef = useRef<HTMLDivElement>(null);

  const scrollToForm = () => {
    formRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <div className="min-h-screen bg-background">
      <LandingHero
        subtitle="Verzekeringstaxatie"
        title="Wanneer is een verzekeringstaxatie nodig?"
        description="Vooraf duidelijkheid over de waarde van je voertuig. Zodat bij schade of diefstal geen discussie ontstaat."
        ctaText="Vraag een taxatie aan"
        onCtaClick={scrollToForm}
      />

      <section className="section-padding bg-background">
        <div className="container-narrow">
          <div className="prose prose-lg max-w-none">
            <div className="space-y-6 text-foreground/90 leading-relaxed">
              <p>
                Een verzekeringstaxatie is er voor wie vooraf duidelijkheid wil over de waarde van zijn voertuig. Zodat bij schade of diefstal geen discussie ontstaat over wat het voertuig waard was.
              </p>
              
              <p>
                Dat is vooral prettig wanneer je niet wilt dat er wordt gekeken naar een dagwaarde, maar naar een waarde die vooraf is vastgesteld en vastgelegd in een taxatierapport. Die waarde vormt de basis voor de verzekering.
              </p>
              
              <p>
                Veel mensen kiezen daarom voor een verzekeringstaxatie wanneer zij hun voertuig met een gerust gevoel willen gebruiken. Omdat ze weten dat de waarde klopt en goed is vastgelegd, ongeacht wat er gebeurt.
              </p>
              
              <p>
                Dat kan gaan om een camper, een oldtimer, een motor of een ander voertuig waarvan de waarde niet zomaar vanzelf spreekt.
              </p>
              
              <p>
                Met een verzekeringstaxatie is die waarde vooraf helder. Zo weet je waar je aan toe bent en wordt bij schade of diefstal uitgekeerd op basis van de getaxeerde waarde.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="section-padding bg-secondary/30">
        <div className="container-narrow">
          <div className="prose prose-lg max-w-none">
            <h2 className="text-2xl md:text-3xl font-semibold text-foreground mb-8">
              Wat kun je verwachten van een verzekeringstaxatie?
            </h2>
            <div className="space-y-6 text-foreground/90 leading-relaxed">
              <p>
                Een verzekeringstaxatie legt de waarde van het voertuig vast op basis van de werkelijke staat en uitvoering op het moment van taxeren. Die waarde wordt vastgelegd in een taxatierapport dat wordt gebruikt voor de verzekering.
              </p>
              
              <p>
                In het rapport wordt onder andere gekeken naar de staat van het voertuig, de uitvoering, eventuele bijzonderheden en de onderbouwing van de waarde. Alles wordt overzichtelijk vastgelegd, zodat duidelijk is hoe de waarde tot stand is gekomen.
              </p>
              
              <p>
                Het doel van een verzekeringstaxatie is niet alleen een bedrag op papier, maar vooral duidelijkheid vooraf. Zodat er bij schade of diefstal geen onduidelijkheid ontstaat over de verzekerde waarde.
              </p>
            </div>

            <div className="mt-12 flex flex-col sm:flex-row gap-4">
              <Button variant="cta" size="lg" onClick={scrollToForm}>
                Vraag een taxatie aan
                <ArrowRight className="w-4 h-4 ml-2" />
              </Button>
              <Button variant="outline" size="lg" asChild>
                <Link to="/camper-taxatie">
                  Bekijk campertaxaties
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      <section className="section-padding bg-background">
        <div className="container-narrow">
          <div className="prose prose-lg max-w-none">
            <h2 className="text-2xl md:text-3xl font-semibold text-foreground mb-4">
              Onze werkwijze bij een verzekeringstaxatie
            </h2>
            <div className="space-y-6 text-foreground/90 leading-relaxed mb-10">
              <p>
                Een verzekeringstaxatie verloopt bij ons volgens een vaste en overzichtelijke werkwijze. Zo weet je vooraf waar je aan toe bent en wordt de waarde van het voertuig zorgvuldig vastgelegd.
              </p>
              <p>
                De verzekeringstaxaties worden uitgevoerd door een geregistreerd taxateur die zijn vakkennis actief onderhoudt. Dat zie je terug in de manier waarop het voertuig wordt beoordeeld en het rapport wordt opgebouwd.
              </p>
            </div>

            <div className="space-y-8">
              <div className="flex gap-4">
                <div className="flex-shrink-0 w-10 h-10 rounded-full bg-primary text-primary-foreground flex items-center justify-center font-semibold">
                  1
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-foreground mb-2">Aanleveren van basisgegevens</h3>
                  <p className="text-foreground/90">
                    Je levert de beschikbare gegevens over het voertuig aan, zoals het type, bouwjaar en het gebruik. Deze informatie vormt de basis voor de taxatie en de verdere planning.
                  </p>
                </div>
              </div>

              <div className="flex gap-4">
                <div className="flex-shrink-0 w-10 h-10 rounded-full bg-primary text-primary-foreground flex items-center justify-center font-semibold">
                  2
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-foreground mb-2">Fysieke inspectie van het voertuig</h3>
                  <p className="text-foreground/90">
                    Het voertuig wordt fysiek geïnspecteerd. Tijdens deze inspectie wordt gekeken naar de staat, de uitvoering, aanwezige opties en eventuele bijzonderheden. Dit is een essentieel onderdeel van een verzekeringstaxatie.
                  </p>
                </div>
              </div>

              <div className="flex gap-4">
                <div className="flex-shrink-0 w-10 h-10 rounded-full bg-primary text-primary-foreground flex items-center justify-center font-semibold">
                  3
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-foreground mb-2">Vaststellen van de waarde</h3>
                  <p className="text-foreground/90">
                    Op basis van de inspectie en relevante marktgegevens wordt de waarde van het voertuig vastgesteld. Deze waarde wordt zorgvuldig onderbouwd en afgestemd op het doel van de taxatie.
                  </p>
                </div>
              </div>

              <div className="flex gap-4">
                <div className="flex-shrink-0 w-10 h-10 rounded-full bg-primary text-primary-foreground flex items-center justify-center font-semibold">
                  4
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-foreground mb-2">Opstellen van het taxatierapport</h3>
                  <p className="text-foreground/90">
                    De bevindingen en de vastgestelde waarde worden vastgelegd in een verzekeringstaxatierapport. In het rapport is duidelijk te volgen hoe de waarde tot stand is gekomen.
                  </p>
                </div>
              </div>

              <div className="flex gap-4">
                <div className="flex-shrink-0 w-10 h-10 rounded-full bg-primary text-primary-foreground flex items-center justify-center font-semibold">
                  5
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-foreground mb-2">Oplevering van het rapport</h3>
                  <p className="text-foreground/90">
                    Je ontvangt het taxatierapport en kunt dit gebruiken voor de verzekering. De waarde is daarmee vooraf vastgelegd, zodat hierover later geen onduidelijkheid ontstaat.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="section-padding bg-secondary/30">
        <div className="container-wide">
          <TrustIndicators />
        </div>
      </section>

      <section className="section-padding bg-background" ref={formRef}>
        <div className="container-narrow">
          <IntakeForm 
            serviceType="verzekeringstaxatie"
            formTitle="Vraag een verzekeringstaxatie aan"
            formSubtext="Vul onderstaand formulier in en we nemen binnen één werkdag contact met je op."
            toelichtingPlaceholder="Vertel kort over je voertuig en waarom je een taxatie wilt..."
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

export default VerzekeringstaxatieInfo;
