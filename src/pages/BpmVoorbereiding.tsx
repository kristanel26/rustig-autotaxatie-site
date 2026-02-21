import { useRef } from "react";
import LandingHero from "@/components/LandingHero";
import FeatureBlock from "@/components/FeatureBlock";
import IntakeForm from "@/components/IntakeForm";
import TrustIndicators from "@/components/TrustIndicators";
import SiteHeader from "@/components/SiteHeader";
import { Calculator, FileSearch, Clock } from "lucide-react";
import heroBpm from "@/assets/hero-bpm.jpg";

const BpmVoorbereiding = () => {
  const formRef = useRef<HTMLDivElement>(null);

  const scrollToForm = () => {
    formRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  const features = [
    {
      icon: Calculator,
      title: "Exacte BPM berekening",
      description:
        "Voordat je een voertuig importeert, weet je precies hoeveel BPM je moet betalen. Geen verrassingen bij de RDW.",
    },
    {
      icon: FileSearch,
      title: "Voertuig analyse",
      description:
        "We analyseren het voertuig op basis van merk, model, bouwjaar, brandstof en meer om de juiste BPM te bepalen.",
    },
    {
      icon: Clock,
      title: "Snelle doorlooptijd",
      description:
        "Binnen 24 uur ontvang je een duidelijk overzicht van de verwachte BPM-kosten voor jouw importvoertuig.",
    },
  ];

  return (
    <div className="min-h-screen bg-background">
      <SiteHeader />
      <LandingHero
        subtitle="BPM voorbereiding"
        title="Weet wat je gaat betalen vóórdat je koopt"
        description="Overweeg je een auto te importeren? Met een BPM voorbereiding weet je vooraf precies wat de totale kosten zijn. Zo voorkom je verrassingen en kun je een goede beslissing nemen."
        ctaText="Start je BPM berekening"
        onCtaClick={scrollToForm}
        heroImage={heroBpm}
      />

      <FeatureBlock
        title="Wat houdt BPM voorbereiding in?"
        subtitle="Een complete analyse van alle kosten voordat je de auto koopt."
        features={features}
      />

      <section className="section-padding bg-secondary/30">
        <div className="container-wide">
          <TrustIndicators />
        </div>
      </section>

      <section className="section-padding bg-background" ref={formRef}>
        <div className="container-narrow">
          <IntakeForm serviceType="BPM voorbereiding" />
        </div>
      </section>

      <footer className="py-8 px-6 border-t border-border">
        <div className="container-wide text-center text-sm text-muted-foreground">
          <p>© {new Date().getFullYear()} Automobiel Taxaties. Alle rechten voorbehouden.</p>
        </div>
      </footer>
    </div>
  );
};

export default BpmVoorbereiding;
