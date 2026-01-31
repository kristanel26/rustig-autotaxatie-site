import { useRef } from "react";
import { Link } from "react-router-dom";
import LandingHero from "@/components/LandingHero";
import IntakeForm from "@/components/IntakeForm";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";

const OldtimerTaxatie = () => {
  const formRef = useRef<HTMLDivElement>(null);

  const scrollToForm = () => {
    formRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <div className="min-h-screen bg-background">
      <LandingHero
        subtitle="Oldtimerverzekeringstaxatie"
        title="Zekerheid over de waarde van je oldtimer"
        description="Bij een oldtimer speelt de waarde vaak een grotere rol dan bij reguliere voertuigen. De staat, originaliteit en het gebruik bepalen in sterke mate wat een oldtimer werkelijk waard is. Met een verzekeringstaxatie leg je die waarde vooraf vast, zodat je bij schade of diefstal niet afhankelijk bent van een dagwaarde. Een taxatierapport geeft vooraf duidelijkheid. Voor jou en voor de verzekeraar."
        ctaText="Oldtimerverzekeringstaxatie aanvragen"
        onCtaClick={scrollToForm}
      />

      {/* Waarom een oldtimerverzekeringstaxatie */}
      <section className="section-padding bg-secondary/30">
        <div className="container-narrow">
          <h2 className="text-2xl md:text-3xl font-semibold text-foreground mb-6">
            Waarom een oldtimerverzekeringstaxatie?
          </h2>
          <p className="text-foreground/90 leading-relaxed mb-6">
            Bij oldtimers sluit een standaard verzekering op basis van dagwaarde vaak niet aan. Veel oldtimers hebben een bijzondere staat, zijn zorgvuldig onderhouden of hebben een waarde die sterk afwijkt van reguliere voertuigen.
          </p>
          <p className="text-foreground/90 leading-relaxed mb-6">
            Verzekeraars vragen daarom regelmatig om een taxatierapport bij het verzekeren van een oldtimer. Met een oldtimerverzekeringstaxatie wordt de waarde objectief vastgesteld en vastgelegd, zodat vooraf duidelijk is welke waarde wordt verzekerd.
          </p>
          <p className="text-foreground/90 leading-relaxed">
            Een verzekeringstaxatie is met name van belang bij oldtimers met een goede of gerestaureerde staat, bij voertuigen waarbij originaliteit een belangrijke rol speelt en bij oldtimers die beperkt of juist selectief worden gebruikt. Ook wanneer je zekerheid wilt over de uitkering bij schade of diefstal, biedt een taxatierapport rust en duidelijkheid.
          </p>
        </div>
      </section>

      {/* Wat kun je verwachten */}
      <section className="section-padding bg-background">
        <div className="container-narrow">
          <h2 className="text-2xl md:text-3xl font-semibold text-foreground mb-6">
            Wat kun je verwachten van een oldtimerverzekeringstaxatie?
          </h2>
          <p className="text-foreground/90 leading-relaxed mb-6">
            Tijdens een oldtimerverzekeringstaxatie wordt de waarde vastgesteld op basis van de werkelijke staat van het voertuig op het moment van taxeren. Daarbij wordt gekeken naar onder andere de technische en cosmetische staat, de mate van originaliteit, eventuele restauraties en relevante marktgegevens.
          </p>
          <p className="text-foreground/90 leading-relaxed">
            De vastgestelde waarde wordt vastgelegd in een taxatierapport dat door verzekeraars wordt gebruikt als basis voor de verzekering. Het doel is duidelijkheid vooraf over de verzekerde waarde, zodat hierover later geen discussie ontstaat.
          </p>
        </div>
      </section>

      {/* Werkwijze */}
      <section className="section-padding bg-secondary/30">
        <div className="container-narrow">
          <h2 className="text-2xl md:text-3xl font-semibold text-foreground mb-4">
            Onze werkwijze bij een oldtimerverzekeringstaxatie
          </h2>
          <p className="text-foreground/90 leading-relaxed mb-10">
            Een oldtimerverzekeringstaxatie verloopt bij ons volgens een vaste en overzichtelijke werkwijze. Zo weet je vooraf waar je aan toe bent.
          </p>

          <div className="space-y-8">
            <div className="flex gap-4">
              <div className="flex-shrink-0 w-10 h-10 rounded-full bg-primary text-primary-foreground flex items-center justify-center font-semibold">
                1
              </div>
              <div>
                <h3 className="text-lg font-semibold text-foreground mb-2">Aanleveren van basisgegevens</h3>
                <p className="text-foreground/90">
                  Je dient een aanvraag in en levert de beschikbare gegevens over de oldtimer aan.
                </p>
              </div>
            </div>

            <div className="flex gap-4">
              <div className="flex-shrink-0 w-10 h-10 rounded-full bg-primary text-primary-foreground flex items-center justify-center font-semibold">
                2
              </div>
              <div>
                <h3 className="text-lg font-semibold text-foreground mb-2">Fysieke inspectie van de oldtimer</h3>
                <p className="text-foreground/90">
                  De oldtimer wordt op locatie of bij ons geïnspecteerd. Daarbij kijken we naar staat, uitvoering en bijzonderheden.
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
            De waarde van de oldtimer wordt vastgesteld op basis van de staat op de dag van taxatie. Werkzaamheden zoals herstel, restauratie of aanpassingen moeten daarom vóór de taxatiedatum zijn afgerond.
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
            <li>de kentekencard van de oldtimer</li>
            <li>onderhoudsboekje of servicehistorie (indien aanwezig)</li>
            <li>facturen van restauratie, onderhoud of revisiewerkzaamheden</li>
            <li>eventuele bijzonderheden in de historie</li>
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
            Onze taxatierapporten worden door verzekeraars gebruikt om de verzekerde waarde van de oldtimer vast te leggen. Het rapport laat helder zien hoe de waarde is onderbouwd.
          </p>
          <p className="text-foreground/90 leading-relaxed">
            Een oldtimerverzekeringstaxatierapport is doorgaans 3 tot 5 jaar geldig. De exacte geldigheid verschilt per verzekeraar en polis. Informeer hier altijd naar bij je verzekeraar.
          </p>
        </div>
      </section>

      {/* Form section */}
      <section className="section-padding bg-background" ref={formRef}>
        <div className="container-narrow">
          <div className="text-center mb-8">
            <h2 className="text-2xl md:text-3xl font-semibold text-foreground mb-4">
              Oldtimerverzekeringstaxatie aanvragen
            </h2>
            <p className="text-foreground/90 leading-relaxed">
              Wil je een verzekeringstaxatie voor je oldtimer laten uitvoeren, dan kun je hieronder een aanvraag indienen. Na ontvangst plannen wij de taxatie in.
            </p>
          </div>
          <IntakeForm 
            serviceType="oldtimerverzekeringstaxatie" 
            formTitle="Oldtimerverzekeringstaxatie aanvragen"
            submitButtonText="Oldtimerverzekeringstaxatie aanvragen"
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

export default OldtimerTaxatie;
