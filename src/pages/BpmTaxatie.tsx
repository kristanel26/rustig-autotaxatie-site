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
              Een zorgvuldig opgesteld BPM-rapport voor ondernemers en particulieren.
              <br className="hidden md:block" />
              Dat standhoudt bij de Belastingdienst.
            </p>
            <p className="text-base md:text-lg text-muted-foreground">
              Importeer je een voertuig en heb je een BPM-taxatie nodig? Wij stellen een onafhankelijk 
              en goed onderbouwd rapport op, gebaseerd op de werkelijke staat en uitvoering van het voertuig. 
              Geen aannames en geen standaardlijsten, maar een taxatie die rust en duidelijkheid geeft.
            </p>
          </>
        }
        ctaText="Neem contact op voor een BPM-taxatie"
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
              Onze BPM-taxaties zijn vooral bedoeld voor ondernemers die voertuigen importeren 
              en zekerheid willen over de fiscale waardering. Ook particulieren die een voertuig 
              importeren en discussie willen voorkomen, kunnen bij ons terecht.
            </p>
            <p className="mt-4">
              Een BPM-taxatie is met name zinvol wanneer:
            </p>
            <ul className="mt-2 space-y-2">
              <li>het voertuig afwijkt van standaard uitvoeringen</li>
              <li>er gebruikssporen of schade aanwezig is</li>
              <li>opties of aanpassingen invloed hebben op de waarde</li>
            </ul>
            <p className="mt-4">
              In deze situaties geeft een taxatie meer houvast dan een algemene berekening.
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
              BPM is een belasting die je betaalt bij de registratie van een geïmporteerd voertuig in Nederland. 
              De Belastingdienst kent meerdere manieren om het BPM-bedrag vast te stellen.
            </p>
            <p>
              Een taxatie is één van de toegestane methodes. Voorwaarde is wel dat het rapport 
              zorgvuldig en controleerbaar is opgesteld.
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
              Een onafhankelijke taxatie zorgt voor een realistische vaststelling van het BPM-bedrag. 
              Je krijgt inzicht in hoe dat bedrag tot stand komt en het rapport is geschikt voor 
              eventuele controle achteraf.
            </p>
            <p>
              Wij werken niet met standaard koerstabellen. Elk voertuig wordt afzonderlijk beoordeeld 
              op basis van de specifieke situatie.
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
                <p className="font-medium text-foreground">Afstemming over voertuig en situatie</p>
              </div>
            </div>
            <div className="flex items-start gap-4">
              <span className="flex-shrink-0 w-8 h-8 rounded-full bg-accent/20 text-accent-foreground flex items-center justify-center font-medium text-sm">2</span>
              <div>
                <p className="font-medium text-foreground">Taxatie op basis van staat, uitvoering en marktpositie</p>
              </div>
            </div>
            <div className="flex items-start gap-4">
              <span className="flex-shrink-0 w-8 h-8 rounded-full bg-accent/20 text-accent-foreground flex items-center justify-center font-medium text-sm">3</span>
              <div>
                <p className="font-medium text-foreground">Oplevering van een zorgvuldig onderbouwd BPM-taxatierapport</p>
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
              Elk rapport wordt met persoonlijke betrokkenheid opgesteld en is bedoeld 
              voor gebruik richting de Belastingdienst.
            </p>
            <p>
              Zorgvuldigheid staat bij ons boven snelheid.
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
