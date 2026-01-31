import { useRef } from "react";
import { Link } from "react-router-dom";
import LandingHero from "@/components/LandingHero";
import IntakeForm from "@/components/IntakeForm";
import TrustIndicators from "@/components/TrustIndicators";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";

const CamperTaxatie = () => {
  const formRef = useRef<HTMLDivElement>(null);

  const scrollToForm = () => {
    formRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <div className="min-h-screen bg-background">
      <LandingHero
        subtitle="Camperverzekeringstaxatie"
        title="Weet wat je camper waard is en verzeker hem goed"
        description="Een camper is meer dan een voertuig. Vaak zit er veel tijd, geld en aandacht in, en soms ook emotionele waarde. Met een verzekeringstaxatie leg je vast wat je camper op dit moment werkelijk waard is. Die waarde vormt de basis voor de verzekering, zodat je bij schade of diefstal niet afhankelijk bent van een dagwaarde. Een taxatierapport geeft vooraf duidelijkheid. Voor jezelf én voor de verzekeraar."
        ctaText="Verzekeringstaxatie aanvragen"
        onCtaClick={scrollToForm}
      />

      {/* Waarom een verzekeringstaxatie */}
      <section className="section-padding bg-secondary/30">
        <div className="container-narrow">
          <h2 className="text-2xl md:text-3xl font-semibold text-foreground mb-6">
            Waarom een verzekeringstaxatie voor je camper?
          </h2>
          <p className="text-foreground/90 leading-relaxed mb-6">
            Bij veel verzekeraars is een taxatierapport vereist wanneer de waarde van een camper afwijkt van standaard verzekeringsbedragen. Dat speelt vooral bij campers waarbij de waarde niet vanzelfsprekend is.
          </p>
          <p className="text-foreground/90 leading-relaxed mb-4">
            Een camperverzekeringstaxatie is daarom vaak nodig:
          </p>
          <ul className="space-y-2 text-foreground/90 mb-6">
            <li className="flex items-start gap-2">
              <span className="text-primary mt-1">•</span>
              <span>bij campers met aanpassingen of extra accessoires</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-primary mt-1">•</span>
              <span>bij zelfbouwcampers</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-primary mt-1">•</span>
              <span>wanneer de waarde afwijkt van gebruikelijke verzekeringsbedragen</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-primary mt-1">•</span>
              <span>bij campers met een bijzondere uitvoering of staat</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-primary mt-1">•</span>
              <span>wanneer de verzekeraar vooraf zekerheid wil over de waarde</span>
            </li>
          </ul>
          <p className="text-foreground/90 leading-relaxed">
            In deze situaties legt een taxatierapport de waarde vooraf vast. Zo is helder welke waarde wordt verzekerd en ontstaat er bij schade of diefstal geen discussie over de uitkering.
          </p>
        </div>
      </section>

      {/* Wat kun je verwachten */}
      <section className="section-padding bg-background">
        <div className="container-narrow">
          <h2 className="text-2xl md:text-3xl font-semibold text-foreground mb-6">
            Wat kun je verwachten van een camperverzekeringstaxatie?
          </h2>
          <p className="text-foreground/90 leading-relaxed mb-6">
            Een verzekeringstaxatie legt de waarde van de camper vast op basis van de werkelijke staat en uitvoering op het moment van taxeren. Daarbij wordt onder andere gekeken naar:
          </p>
          <ul className="space-y-2 text-foreground/90 mb-6">
            <li className="flex items-start gap-2">
              <span className="text-primary mt-1">•</span>
              <span>de technische en cosmetische staat van de camper</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-primary mt-1">•</span>
              <span>de uitvoering en aanwezige opties</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-primary mt-1">•</span>
              <span>aanpassingen, accessoires of zelfbouw</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-primary mt-1">•</span>
              <span>de marktpositie van vergelijkbare campers</span>
            </li>
          </ul>
          <p className="text-foreground/90 leading-relaxed">
            De vastgestelde waarde wordt opgenomen in een taxatierapport dat wordt gebruikt voor de verzekering. Het doel is niet alleen een bedrag op papier, maar vooral duidelijkheid vooraf.
          </p>
        </div>
      </section>

      {/* Werkwijze */}
      <section className="section-padding bg-secondary/30">
        <div className="container-narrow">
          <h2 className="text-2xl md:text-3xl font-semibold text-foreground mb-4">
            Onze werkwijze bij een camperverzekeringstaxatie
          </h2>
          <div className="space-y-6 text-foreground/90 leading-relaxed mb-10">
            <p>
              Een camperverzekeringstaxatie verloopt bij ons volgens een vaste en overzichtelijke werkwijze. Zo weet je vooraf waar je aan toe bent en wordt de waarde zorgvuldig vastgelegd.
            </p>
            <p>
              De taxaties worden uitgevoerd door een geregistreerd taxateur die zijn vakkennis actief onderhoudt.
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
                  Je dient een aanvraag in en levert de beschikbare gegevens over de camper aan.
                </p>
              </div>
            </div>

            <div className="flex gap-4">
              <div className="flex-shrink-0 w-10 h-10 rounded-full bg-primary text-primary-foreground flex items-center justify-center font-semibold">
                2
              </div>
              <div>
                <h3 className="text-lg font-semibold text-foreground mb-2">Fysieke inspectie van de camper</h3>
                <p className="text-foreground/90">
                  De camper wordt op locatie geïnspecteerd. Daarbij wordt gekeken naar staat, uitvoering en eventuele aanpassingen.
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
                  Op basis van de inspectie en relevante marktgegevens wordt een realistische en verdedigbare waarde vastgesteld.
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
                  De bevindingen en de vastgestelde waarde worden overzichtelijk vastgelegd in een taxatierapport.
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
                  Je ontvangt het taxatierapport en kunt dit gebruiken voor de verzekering.
                </p>
              </div>
          </div>
          </div>

          {/* Belangrijk om te weten */}
          <div className="mt-10 border-l-2 border-muted pl-6">
            <h3 className="text-lg font-semibold text-foreground mb-3">
              Belangrijk om te weten vóór de taxatie
            </h3>
            <p className="text-foreground/90 leading-relaxed">
              De waarde van de camper wordt vastgesteld op basis van de staat op de dag van de taxatie. Eventuele werkzaamheden, reparaties of aanpassingen moeten dus vooraf zijn afgerond. Alleen wat op dat moment aanwezig en zichtbaar is, kan worden meegenomen in de waardebepaling.
            </p>
          </div>

          {/* Wat hebben wij nodig */}
          <div className="mt-8 border-l-2 border-muted pl-6">
            <h3 className="text-lg font-semibold text-foreground mb-3">
              Wat hebben wij van je nodig?
            </h3>
            <p className="text-foreground/90 mb-3">
              Om de taxatie goed te kunnen voorbereiden, vragen wij je het volgende aan te leveren:
            </p>
            <ol className="list-decimal list-inside space-y-1 text-foreground/90">
              <li>Je naam en contactgegevens</li>
              <li>De kentekencard van de camper</li>
              <li>Eventueel onderhoudsboekje of servicehistorie</li>
              <li>Facturen van aanpassingen, accessoires of zelfbouw</li>
            </ol>
          </div>

          <p className="text-foreground/90 leading-relaxed mt-8">
            De taxaties worden uitgevoerd door een geregistreerd taxateur die zijn vakkennis actief onderhoudt.
          </p>
        </div>
      </section>

      {/* Acceptatie en geldigheid */}
      <section className="section-padding bg-background">
        <div className="container-narrow">
          <h2 className="text-2xl md:text-3xl font-semibold text-foreground mb-6">
            Acceptatie door verzekeraars en geldigheid van het rapport
          </h2>
          <p className="text-foreground/90 leading-relaxed mb-6">
            De taxaties worden uitgevoerd door een geregistreerd taxateur die is aangesloten bij erkende registers, waaronder VRT en TMV. Daarnaast wordt gewerkt volgens de richtlijnen die binnen de branche worden gehanteerd, zoals die van FEHAC.
          </p>
          <p className="text-foreground/90 leading-relaxed mb-6">
            Deze registraties en richtlijnen zijn voor verzekeraars een belangrijk uitgangspunt bij het accepteren van taxatierapporten.
          </p>
          <p className="text-foreground/90 leading-relaxed mb-6">
            Onze taxatierapporten worden door verzekeraars gebruikt om de verzekerde waarde van campers vast te leggen. De rapporten zijn zorgvuldig opgebouwd en laten duidelijk zien hoe de waarde tot stand is gekomen.
          </p>
          <p className="text-foreground/90 leading-relaxed">
            Een verzekeringstaxatierapport is doorgaans drie tot vijf jaar geldig. De exacte geldigheid verschilt per verzekeraar en polis. Het is daarom altijd verstandig om dit vooraf even te controleren bij je verzekeraar.
          </p>
        </div>
      </section>

      {/* Trust indicators */}
      <section className="section-padding bg-secondary/30">
        <div className="container-wide">
          <TrustIndicators />
        </div>
      </section>

      {/* Form section */}
      <section className="section-padding bg-background" ref={formRef}>
        <div className="container-narrow">
          <div className="text-center mb-8">
            <h2 className="text-2xl md:text-3xl font-semibold text-foreground mb-4">
              Camperverzekeringstaxatie aanvragen
            </h2>
            <p className="text-foreground/90 leading-relaxed">
              Wil je een verzekeringstaxatie voor je camper laten uitvoeren, dan kun je hieronder een aanvraag indienen. Na ontvangst nemen wij contact met je op om de taxatie in te plannen.
            </p>
          </div>
          <IntakeForm 
            serviceType="camperverzekeringstaxatie" 
            formTitle="Verzekeringstaxatie aanvragen"
            submitButtonText="Verzekeringstaxatie aanvragen"
          />
        </div>
      </section>

      {/* Terug naar overzicht */}
      <section className="section-padding bg-secondary/30">
        <div className="container-narrow text-center">
          <div className="inline-block bg-[#ADAFC7]/15 p-2 rounded-lg">
            <Button variant="secondary-action" size="sm" asChild>
              <Link to="/verzekeringstaxatie-info" className="inline-flex items-center gap-2">
                Terug naar verzekeringstaxatie overzicht
                <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
              </Link>
            </Button>
          </div>
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
