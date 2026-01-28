import { useRef } from "react";
import LandingHero from "@/components/LandingHero";
import FeatureBlock from "@/components/FeatureBlock";
import IntakeForm from "@/components/IntakeForm";
import TrustIndicators from "@/components/TrustIndicators";
import { Caravan, FileCheck, ShieldCheck } from "lucide-react";

const CamperTaxatie = () => {
  const formRef = useRef<HTMLDivElement>(null);

  const scrollToForm = () => {
    formRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  const features = [
    {
      icon: Caravan,
      title: "Specifieke camper expertise",
      description:
        "Wij kennen de campermarkt door en door. Van klassieke campers tot de nieuwste modellen, we weten precies wat jouw camper waard is.",
    },
    {
      icon: FileCheck,
      title: "Erkend taxatierapport",
      description:
        "Ons rapport wordt geaccepteerd door alle grote verzekeraars in Nederland. Zo weet je zeker dat je goed verzekerd bent.",
    },
    {
      icon: ShieldCheck,
      title: "Zekerheid bij schade",
      description:
        "Bij total loss of diefstal krijg je de getaxeerde waarde uitgekeerd. Geen discussie met de verzekeraar over de waarde.",
    },
  ];

  return (
    <div className="min-h-screen bg-background">
      <LandingHero
        subtitle="Verzekeringstaxatie camper"
        title="Weet wat je camper waard is en verzeker hem goed"
        description="Een officiële taxatie zorgt ervoor dat je bij schade of diefstal de werkelijke waarde krijgt uitgekeerd. Geen verrassingen, geen discussies. Gewoon zekerheid."
        ctaText="Vraag een taxatie aan"
        onCtaClick={scrollToForm}
      />

      <FeatureBlock
        title="Waarom een verzekeringstaxatie?"
        subtitle="Je camper is een waardevolle bezitting. Met een taxatierapport weet je precies wat hij waard is."
        features={features}
      />

      <section className="section-padding bg-secondary/30">
        <div className="container-wide">
          <TrustIndicators />
        </div>
      </section>

      <section className="section-padding bg-background" ref={formRef}>
        <div className="container-narrow">
          <IntakeForm serviceType="verzekeringstaxatie" />
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

export default CamperTaxatie;
