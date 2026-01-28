import { useRef } from "react";
import LandingHero from "@/components/LandingHero";
import IntakeForm from "@/components/IntakeForm";
import { FileText, Users, Shield, ClipboardCheck } from "lucide-react";

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
        description="Importeer je een voertuig en wil je vooraf duidelijkheid over hoeveel BPM daarbij hoort? Met een onafhankelijke BPM-taxatie krijg je inzicht in het juiste BPM-bedrag en voorkom je discussie achteraf met de Belastingdienst."
        ctaText="Vraag een BPM-taxatie aan"
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
              <h2 className="text-2xl md:text-3xl font-semibold mb-4">
                Voor wie is een BPM-taxatie bedoeld?
              </h2>
            </div>
          </div>
          <div className="prose prose-lg max-w-none text-muted-foreground">
            <p>
              Een BPM-taxatie is bedoeld voor ondernemers en particulieren die een voertuig importeren 
              en zekerheid willen over de juiste BPM-heffing. Dit geldt vooral in situaties waarin 
              standaardtabellen of koerslijsten geen goed beeld geven van de werkelijke waarde en 
              staat van het voertuig.
            </p>
            <p>
              Denk aan voertuigen met bijzondere uitvoeringen, schade, hoge kilometerstanden of 
              specifieke opties die de waarde beïnvloeden. In die gevallen biedt een taxatie 
              meer duidelijkheid dan een algemene berekening.
            </p>
          </div>
        </div>
      </section>

      {/* BPM binnen fiscale kaders */}
      <section className="section-padding bg-secondary/30">
        <div className="container-narrow">
          <div className="flex items-start gap-4 mb-6">
            <div className="flex-shrink-0 w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center">
              <FileText className="w-6 h-6 text-primary" />
            </div>
            <div>
              <h2 className="text-2xl md:text-3xl font-semibold mb-4">
                BPM binnen fiscale kaders
              </h2>
            </div>
          </div>
          <div className="prose prose-lg max-w-none text-muted-foreground">
            <p>
              BPM is een belastingaangifte die je doet bij de import van een voertuig. De Belastingdienst 
              kent meerdere manieren om het BPM-bedrag vast te stellen. Een taxatie is één van de 
              toegestane methodes, mits deze zorgvuldig, controleerbaar en goed onderbouwd is.
            </p>
            <p>
              Een correcte taxatie helpt om naheffingen en discussie achteraf te voorkomen. Het rapport 
              moet helder zijn over hoe het bedrag tot stand is gekomen en welke factoren daarbij 
              zijn meegewogen.
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
              <h2 className="text-2xl md:text-3xl font-semibold mb-4">
                Waarom een onafhankelijke BPM-taxatie?
              </h2>
            </div>
          </div>
          <div className="prose prose-lg max-w-none text-muted-foreground">
            <p>
              Een onafhankelijke taxatie zorgt voor een realistische vaststelling van het BPM-bedrag. 
              Het rapport voldoet aan de fiscale richtlijnen en is opgesteld om stand te kunnen houden 
              bij een eventuele controle.
            </p>
            <p>
              Bij Automobiel Taxaties werken we zonder standaardlijstjes. Elk voertuig wordt afzonderlijk 
              beoordeeld op basis van de werkelijke staat, uitvoering en marktpositie. Zo krijg je een 
              taxatie die past bij jouw specifieke situatie.
            </p>
          </div>
        </div>
      </section>

      {/* Werkwijze in hoofdlijnen */}
      <section className="section-padding bg-secondary/30">
        <div className="container-narrow">
          <div className="flex items-start gap-4 mb-6">
            <div className="flex-shrink-0 w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center">
              <ClipboardCheck className="w-6 h-6 text-primary" />
            </div>
            <div>
              <h2 className="text-2xl md:text-3xl font-semibold mb-4">
                Werkwijze in hoofdlijnen
              </h2>
            </div>
          </div>
          <div className="prose prose-lg max-w-none text-muted-foreground">
            <p className="mb-6">
              De aanpak is overzichtelijk en persoonlijk:
            </p>
            <div className="space-y-4">
              <div className="flex items-start gap-4">
                <span className="flex-shrink-0 w-8 h-8 rounded-full bg-accent/20 text-accent-foreground flex items-center justify-center font-medium text-sm">1</span>
                <div>
                  <p className="font-medium text-foreground mb-1">Intake van voertuig en situatie</p>
                  <p className="text-muted-foreground">We bespreken samen welk voertuig je wilt importeren en wat de context is.</p>
                </div>
              </div>
              <div className="flex items-start gap-4">
                <span className="flex-shrink-0 w-8 h-8 rounded-full bg-accent/20 text-accent-foreground flex items-center justify-center font-medium text-sm">2</span>
                <div>
                  <p className="font-medium text-foreground mb-1">Beoordeling van uitvoering, staat en marktpositie</p>
                  <p className="text-muted-foreground">Het voertuig wordt grondig bekeken op alle relevante aspecten.</p>
                </div>
              </div>
              <div className="flex items-start gap-4">
                <span className="flex-shrink-0 w-8 h-8 rounded-full bg-accent/20 text-accent-foreground flex items-center justify-center font-medium text-sm">3</span>
                <div>
                  <p className="font-medium text-foreground mb-1">Vaststelling van het BPM-bedrag</p>
                  <p className="text-muted-foreground">Op basis van de beoordeling wordt het juiste BPM-bedrag bepaald.</p>
                </div>
              </div>
              <div className="flex items-start gap-4">
                <span className="flex-shrink-0 w-8 h-8 rounded-full bg-accent/20 text-accent-foreground flex items-center justify-center font-medium text-sm">4</span>
                <div>
                  <p className="font-medium text-foreground mb-1">Oplevering van een zorgvuldig onderbouwd taxatierapport</p>
                  <p className="text-muted-foreground">Je ontvangt een rapport dat compleet en controleerbaar is.</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Vertrouwen en deskundigheid */}
      <section className="section-padding bg-background">
        <div className="container-narrow">
          <h2 className="text-2xl md:text-3xl font-semibold mb-6">
            Vertrouwen en deskundigheid
          </h2>
          <div className="prose prose-lg max-w-none text-muted-foreground">
            <p>
              Automobiel Taxaties werkt onafhankelijk en met jarenlange ervaring in voertuigtaxaties. 
              Elk rapport wordt met persoonlijke betrokkenheid opgesteld en is bedoeld voor gebruik 
              richting de Belastingdienst en andere betrokken partijen.
            </p>
            <p>
              Zorgvuldigheid staat centraal. Dat betekent heldere communicatie, een gedegen onderbouwing 
              en een rapport waar je op kunt vertrouwen.
            </p>
          </div>
        </div>
      </section>

      {/* Afsluitende CTA en formulier */}
      <section className="section-padding bg-secondary/30" ref={formRef}>
        <div className="container-narrow">
          <div className="text-center mb-10">
            <h2 className="text-2xl md:text-3xl font-semibold mb-4">
              Vraag een BPM-taxatie aan
            </h2>
            <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
              Vul het formulier in en we nemen contact met je op om je situatie te bespreken.
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
