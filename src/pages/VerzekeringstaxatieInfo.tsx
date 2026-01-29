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
