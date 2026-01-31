import { useRef } from "react";
import { Link } from "react-router-dom";
import LandingHero from "@/components/LandingHero";
import IntakeForm from "@/components/IntakeForm";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";

const MotorTaxatie = () => {
  const formRef = useRef<HTMLDivElement>(null);

  const scrollToForm = () => {
    formRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <div className="min-h-screen bg-background">
      <LandingHero
        subtitle="Motorverzekeringstaxatie"
        title="Zekerheid over de waarde van je motor"
        description="Met een motorverzekeringstaxatie leg je vast wat je motor op dit moment werkelijk waard is. Die waarde vormt de basis voor de verzekering, zodat je bij schade of diefstal niet afhankelijk bent van een dagwaarde. Een taxatierapport zorgt voor duidelijkheid vooraf. Voor jou en voor de verzekeraar."
        ctaText="Motorverzekeringstaxatie aanvragen"
        onCtaClick={scrollToForm}
      />

      {/* Waarom een motorverzekeringstaxatie */}
      <section className="section-padding bg-secondary/30">
        <div className="container-narrow">
          <h2 className="text-2xl md:text-3xl font-semibold text-foreground mb-6">
            Waarom een motorverzekeringstaxatie?
          </h2>
          <p className="text-foreground/90 leading-relaxed mb-6">
            Bij motoren is de verzekerde waarde niet altijd vanzelfsprekend. Veel motoren wijken af van standaarduitvoeringen door accessoires, aanpassingen, bijzondere staat of beperkte beschikbaarheid. In die gevallen sluit een verzekering op basis van dagwaarde vaak niet goed aan.
          </p>
          <p className="text-foreground/90 leading-relaxed mb-6">
            Verzekeraars vragen daarom regelmatig om een taxatierapport wanneer zij vooraf zekerheid willen over de waarde die wordt verzekerd. Met een motorverzekeringstaxatie wordt deze waarde objectief vastgesteld en vastgelegd.
          </p>
          <p className="text-foreground/90 leading-relaxed">
            Een motorverzekeringstaxatie is met name van belang bij motoren met accessoires of aanpassingen, bij bijzondere of zeldzame uitvoeringen, bij motoren in uitzonderlijke staat en wanneer de waarde afwijkt van gangbare dagwaarden. Ook wanneer je vooraf duidelijkheid wilt over de uitkering bij schade of diefstal, biedt een taxatierapport zekerheid.
          </p>
        </div>
      </section>

      {/* Wat kun je verwachten */}
      <section className="section-padding bg-background">
        <div className="container-narrow">
          <h2 className="text-2xl md:text-3xl font-semibold text-foreground mb-6">
            Wat kun je verwachten van een motorverzekeringstaxatie?
          </h2>
          <p className="text-foreground/90 leading-relaxed mb-6">
            Tijdens een motorverzekeringstaxatie wordt de waarde vastgesteld op basis van de werkelijke staat en uitvoering van de motor op het moment van taxeren. Daarbij wordt gekeken naar technische en cosmetische aspecten, aanwezige accessoires en relevante marktgegevens.
          </p>
          <p className="text-foreground/90 leading-relaxed">
            De vastgestelde waarde wordt vastgelegd in een taxatierapport dat wordt gebruikt voor de verzekering. Het doel is duidelijkheid vooraf, zodat bij schade of diefstal wordt uitgekeerd op basis van de vastgestelde waarde.
          </p>
        </div>
      </section>

      {/* Werkwijze */}
      <section className="section-padding bg-secondary/30">
        <div className="container-narrow">
          <h2 className="text-2xl md:text-3xl font-semibold text-foreground mb-4">
            Onze werkwijze bij een motorverzekeringstaxatie
          </h2>
          <p className="text-foreground/90 leading-relaxed mb-10">
            Een motorverzekeringstaxatie verloopt bij ons volgens een vaste en overzichtelijke werkwijze. Zo weet je vooraf waar je aan toe bent.
          </p>

          <div className="space-y-8">
            <div className="flex gap-4">
              <div className="flex-shrink-0 w-10 h-10 rounded-full bg-primary text-primary-foreground flex items-center justify-center font-semibold">
                1
              </div>
              <div>
                <h3 className="text-lg font-semibold text-foreground mb-2">Aanleveren van basisgegevens</h3>
                <p className="text-foreground/90">
                  Je dient een aanvraag in en levert de beschikbare gegevens over de motor aan.
                </p>
              </div>
            </div>

            <div className="flex gap-4">
              <div className="flex-shrink-0 w-10 h-10 rounded-full bg-primary text-primary-foreground flex items-center justify-center font-semibold">
                2
              </div>
              <div>
                <h3 className="text-lg font-semibold text-foreground mb-2">Fysieke inspectie van de motor</h3>
                <p className="text-foreground/90">
                  De motor wordt op locatie of bij ons geïnspecteerd. Daarbij kijken we naar staat, uitvoering en bijzonderheden.
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
                  Op basis van inspectie en marktgegevens wordt een realistische en verdedigbare waarde vastgesteld.
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
                  De bevindingen en waarde worden overzichtelijk vastgelegd in een taxatierapport.
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
                  Je ontvangt het rapport digitaal en kunt dit gebruiken voor de verzekering.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Belangrijk om te weten */}
      <section className="section-padding bg-background">
        <div className="container-narrow">
          <h3 className="text-xl md:text-2xl font-semibold text-foreground mb-4">
            Belangrijk om te weten vóór de taxatie
          </h3>
          <p className="text-foreground/90 leading-relaxed mb-4">
            De waarde van de motor wordt vastgesteld op basis van de staat op de dag van taxatie. Werkzaamheden zoals herstel of aanpassingen moeten daarom vóór de taxatiedatum zijn afgerond.
          </p>
          <p className="text-foreground/90 leading-relaxed">
            Alleen wat op dat moment aanwezig en zichtbaar is, wordt meegenomen in de waardebepaling. Dit voorkomt discussie of teleurstelling achteraf, voor jou én voor de verzekeraar.
          </p>
        </div>
      </section>

      {/* Wat hebben wij van je nodig */}
      <section className="section-padding bg-secondary/30">
        <div className="container-narrow">
          <h3 className="text-xl md:text-2xl font-semibold text-foreground mb-4">
            Wat hebben wij van je nodig?
          </h3>
          <p className="text-foreground/90 leading-relaxed mb-4">
            Om de taxatie goed te kunnen uitvoeren, vragen wij je het volgende aan te leveren:
          </p>
          <ul className="list-disc list-inside space-y-2 text-foreground/90">
            <li>je naam en contactgegevens</li>
            <li>de kentekencard van de motor</li>
            <li>onderhoudsboekje of servicehistorie (indien aanwezig)</li>
            <li>facturen van aanpassingen of accessoires</li>
            <li>eventuele bijzonderheden in de historie (revisie, restauratie)</li>
          </ul>
        </div>
      </section>

      {/* Acceptatie en geldigheid */}
      <section className="section-padding bg-background">
        <div className="container-narrow">
          <h2 className="text-2xl md:text-3xl font-semibold text-foreground mb-6">
            Acceptatie door verzekeraars en geldigheid van het rapport
          </h2>
          <p className="text-foreground/90 leading-relaxed mb-6">
            De taxaties worden uitgevoerd door een geregistreerd taxateur, aangesloten bij VRT, TMV en FEHAC. Deze registraties zijn voor verzekeraars een belangrijk uitgangspunt bij het accepteren van taxatierapporten.
          </p>
          <p className="text-foreground/90 leading-relaxed mb-6">
            Onze taxatierapporten worden door verzekeraars gebruikt om de verzekerde waarde van de motor vast te leggen. Het rapport laat helder zien hoe de waarde is onderbouwd.
          </p>
          <p className="text-foreground/90 leading-relaxed">
            Een motorverzekeringstaxatierapport is doorgaans 2 tot 3 jaar geldig. De exacte geldigheid verschilt per verzekeraar en polis. Informeer hier altijd naar bij je verzekeraar.
          </p>
        </div>
      </section>


      {/* Form section */}
      <section className="section-padding bg-background" ref={formRef}>
        <div className="container-narrow">
          <div className="text-center mb-8">
            <h2 className="text-2xl md:text-3xl font-semibold text-foreground mb-4">
              Motorverzekeringstaxatie aanvragen
            </h2>
            <p className="text-foreground/90 leading-relaxed">
              Wil je een motorverzekeringstaxatie laten uitvoeren, dan kun je hieronder een aanvraag indienen. Na ontvangst plannen wij de taxatie in.
            </p>
          </div>
          <IntakeForm 
            serviceType="motorverzekeringstaxatie" 
            formTitle="Motorverzekeringstaxatie aanvragen"
            submitButtonText="Motorverzekeringstaxatie aanvragen"
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

export default MotorTaxatie;
