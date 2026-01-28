import { useRef } from "react";
import LandingHero from "@/components/LandingHero";
import FeatureBlock from "@/components/FeatureBlock";
import IntakeForm from "@/components/IntakeForm";
import TrustIndicators from "@/components/TrustIndicators";
import { Scale, Building, FileText } from "lucide-react";

const WevTaxatie = () => {
  const formRef = useRef<HTMLDivElement>(null);

  const scrollToForm = () => {
    formRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  const features = [
    {
      icon: Scale,
      title: "Objectieve waardebepaling",
      description:
        "De Waarde in het Economisch Verkeer (WEV) is de prijs die je voertuig zou opbrengen op de vrije markt. Objectief en onderbouwd.",
    },
    {
      icon: Building,
      title: "Zakelijk en fiscaal erkend",
      description:
        "Onze WEV taxaties worden geaccepteerd door de Belastingdienst, accountants en financiële instellingen.",
    },
    {
      icon: FileText,
      title: "Uitgebreid rapport",
      description:
        "Je ontvangt een volledig onderbouwd taxatierapport met foto's, specificaties en een heldere waardebepaling.",
    },
  ];

  return (
    <div className="min-h-screen bg-background">
      <LandingHero
        subtitle="WEV taxatie"
        title="Ken de werkelijke economische waarde van je voertuig"
        description="Of het nu gaat om een bedrijfsoverdracht, fiscale aangifte of financiering: met een WEV taxatie heb je een betrouwbare, objectieve waardebepaling in handen."
        ctaText="Vraag een WEV taxatie aan"
        onCtaClick={scrollToForm}
      />

      <FeatureBlock
        title="Wanneer heb je een WEV taxatie nodig?"
        subtitle="Een WEV taxatie is onmisbaar bij zakelijke en fiscale vraagstukken."
        features={features}
      />

      <section className="section-padding bg-secondary/30">
        <div className="container-wide">
          <TrustIndicators />
        </div>
      </section>

      <section className="section-padding bg-background" ref={formRef}>
        <div className="container-narrow">
          <IntakeForm serviceType="WEV taxatie" />
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

export default WevTaxatie;
