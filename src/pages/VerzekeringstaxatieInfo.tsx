import { useRef } from "react";
import { Link } from "react-router-dom";
import LandingHero from "@/components/LandingHero";
import IntakeForm from "@/components/IntakeForm";
import SiteHeader from "@/components/SiteHeader";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import heroCarInspection from "@/assets/hero-car-inspection.jpg";

const VerzekeringstaxatieInfo = () => {
  const formRef = useRef<HTMLDivElement>(null);

  const scrollToForm = () => {
    formRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <div className="min-h-screen bg-background">
      <SiteHeader />
      <LandingHero
        subtitle="Verzekeringstaxatie"
        title="Wanneer is een verzekeringstaxatie nodig?"
        description="Vooraf duidelijkheid over de waarde van je voertuig. Zodat bij schade of diefstal geen discussie ontstaat."
        ctaText="Verzekeringstaxatie aanvragen"
        onCtaClick={scrollToForm}
        heroImage={heroCarInspection}
      />

      <section className="section-padding bg-background">
        <div className="container-narrow">
          <div className="prose prose-lg max-w-none">
            <h2 className="text-2xl md:text-3xl font-semibold text-foreground mb-8">
              Zekerheid over de waarde van je voertuig
            </h2>
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
            <h2 className="text-2xl md:text-3xl font-semibold text-foreground mb-6">
              Wat kun je verwachten van een verzekeringstaxatie?
            </h2>
            <div className="space-y-6 text-foreground/90 leading-relaxed">
              <p>
                Een verzekeringstaxatie legt de waarde van het voertuig vast op basis van de werkelijke staat en uitvoering op het moment van taxeren.
              </p>
              <p>
                Die waarde wordt vastgelegd in een taxatierapport dat wordt gebruikt voor de verzekering, zodat bij schade of diefstal geen discussie ontstaat over de verzekerde waarde.
              </p>
            </div>

            <div className="mt-12">
              <h2 className="text-2xl md:text-3xl font-semibold text-foreground mb-4">
                Verzekeringstaxatie per voertuigtype
              </h2>
              <p className="text-foreground/90 leading-relaxed mb-8">
                Een verzekeringstaxatie wordt uitgevoerd voor verschillende typen voertuigen. De werkwijze is in de basis gelijk, maar de aandachtspunten verschillen per voertuig.
              </p>
              <div className="space-y-6">
                <div>
                  <h3 className="text-lg font-semibold text-foreground">Camper verzekeringstaxatie</h3>
                  <p className="text-foreground/90 mt-1 mb-3">
                    Voor campers waarbij zekerheid gewenst is over de waarde, bijvoorbeeld bij aanpassingen of zelfbouw.
                  </p>
                  <div className="inline-block bg-[#ADAFC7]/15 p-2 rounded-lg">
                    <Button variant="secondary-action" size="sm" asChild>
                      <Link to="/camper-taxatie" className="inline-flex items-center gap-2">
                        Camperverzekeringstaxatie bekijken
                        <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
                      </Link>
                    </Button>
                  </div>
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-foreground">Oldtimer verzekeringstaxatie</h3>
                  <p className="text-foreground/90 mt-1 mb-3">
                    Voor oldtimers waarbij originaliteit, staat en gebruik een belangrijke rol spelen.
                  </p>
                  <div className="inline-block bg-[#ADAFC7]/15 p-2 rounded-lg">
                    <Button variant="secondary-action" size="sm" asChild>
                      <Link to="/oldtimer-taxatie" className="inline-flex items-center gap-2">
                        Oldtimerverzekeringstaxatie bekijken
                        <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
                      </Link>
                    </Button>
                  </div>
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-foreground">Youngtimer verzekeringstaxatie</h3>
                  <p className="text-foreground/90 mt-1 mb-3">
                    Voor youngtimers waarvan de waarde afwijkt van standaard verzekeringsbedragen.
                  </p>
                  <div className="inline-block bg-[#ADAFC7]/15 p-2 rounded-lg">
                    <Button variant="secondary-action" size="sm" asChild>
                      <Link to="/youngtimer-taxatie" className="inline-flex items-center gap-2">
                        Youngtimerverzekeringstaxatie bekijken
                        <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
                      </Link>
                    </Button>
                  </div>
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-foreground">Motor verzekeringstaxatie</h3>
                  <p className="text-foreground/90 mt-1 mb-3">
                    Voor motoren waarbij de verzekerde waarde vooraf duidelijk moet zijn vastgelegd.
                  </p>
                  <div className="inline-block bg-[#ADAFC7]/15 p-2 rounded-lg">
                    <Button variant="secondary-action" size="sm" asChild>
                      <Link to="/motor-taxatie" className="inline-flex items-center gap-2">
                        Motorverzekeringstaxatie bekijken
                        <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
                      </Link>
                    </Button>
                  </div>
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-foreground">Foodtruck verzekeringstaxatie</h3>
                  <p className="text-foreground/90 mt-1 mb-3">
                    Voor foodtrucks waarbij de inrichting, apparatuur en opbouw de waarde bepalen.
                  </p>
                  <div className="inline-block bg-[#ADAFC7]/15 p-2 rounded-lg">
                    <Button variant="secondary-action" size="sm" asChild>
                      <Link to="/foodtruck-taxatie" className="inline-flex items-center gap-2">
                        Foodtruckverzekeringstaxatie bekijken
                        <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
                      </Link>
                    </Button>
                  </div>
                </div>
              </div>
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
                <div className="step-badge flex-shrink-0">
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
                <div className="step-badge flex-shrink-0">
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
                <div className="step-badge flex-shrink-0">
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
                <div className="step-badge flex-shrink-0">
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
                <div className="step-badge flex-shrink-0">
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
        <div className="container-narrow">
          <h2 className="text-2xl md:text-3xl font-semibold text-foreground mb-6">
            Acceptatie door verzekeraars en geldigheid van het rapport
          </h2>
          <p className="text-foreground/90 leading-relaxed mb-6">
            Automobiel Taxaties werkt als onafhankelijk taxateur. De taxaties worden uitgevoerd door een taxateur die is geregistreerd bij de Vereniging van Register-Taxateurs (VRT) en is aangesloten bij de Taxateursvereniging voor Motorvoertuigen (TMV).
          </p>
          <p className="text-foreground/90 leading-relaxed mb-6">
            Voor specialistische voertuigwaarderingen, zoals oldtimers en klassiekers, wordt gewerkt binnen de richtlijnen van de FEHAC. De vakkennis wordt actief onderhouden en toegepast bij iedere taxatie. Rapportages zijn zorgvuldig opgebouwd, controleerbaar en bedoeld voor gebruik in fiscale, administratieve en verzekeringscontext.
          </p>
          <p className="text-foreground/90 leading-relaxed mb-6">
            Deze registraties zijn voor verzekeraars een belangrijk uitgangspunt bij het accepteren van taxatierapporten. Onze taxatierapporten worden door verzekeraars gebruikt om de verzekerde waarde van voertuigen vast te leggen.
          </p>
          <p className="text-foreground/90 leading-relaxed">
            Een verzekeringstaxatierapport is doorgaans 3 tot 5 jaar geldig. De exacte geldigheid verschilt per verzekeraar en polis. Informeer hier altijd naar bij je verzekeraar.
          </p>
        </div>
      </section>

      <section className="section-padding bg-secondary/30">
        <div className="container-narrow text-center">
          <p className="text-lg text-foreground/90 mb-6">
            Wil je een verzekeringstaxatie laten uitvoeren, dan kun je hieronder eenvoudig een aanvraag indienen.
          </p>
          <Button variant="cta" size="lg" onClick={scrollToForm}>
            Verzekeringstaxatie aanvragen
            <ArrowRight className="w-4 h-4 ml-2" />
          </Button>
        </div>
      </section>

      <section className="section-padding bg-background" ref={formRef}>
        <div className="container-narrow">
          <IntakeForm 
            serviceType="verzekeringstaxatie"
            formTitle="Verzekeringstaxatie aanvragen"
            formSubtext="Vul onderstaand formulier in en we nemen binnen één werkdag contact met je op."
            toelichtingPlaceholder="Geef hier de beschikbare informatie over het voertuig."
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
