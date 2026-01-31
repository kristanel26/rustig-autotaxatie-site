import { useRef } from "react";
import { Link } from "react-router-dom";
import LandingHero from "@/components/LandingHero";
import IntakeForm from "@/components/IntakeForm";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";

const YoungtimerTaxatie = () => {
  const formRef = useRef<HTMLDivElement>(null);

  const scrollToForm = () => {
    formRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <div className="min-h-screen bg-background">
      <LandingHero
        subtitle="Youngtimerverzekeringstaxatie"
        title="Zekerheid over de waarde van je youngtimer"
        description="Een youngtimer is vaak meer dan zomaar een auto. De waarde wijkt regelmatig af van standaard verzekeringsbedragen, bijvoorbeeld door staat, uitvoering of onderhoud. Met een verzekeringstaxatie leg je die waarde vooraf vast, zodat je bij schade of diefstal niet afhankelijk bent van de dagwaarde. Een taxatierapport geeft duidelijkheid. Voor jezelf én voor de verzekeraar."
        ctaText="Youngtimerverzekeringstaxatie aanvragen"
        onCtaClick={scrollToForm}
      />

      {/* Waarom een youngtimerverzekeringstaxatie */}
      <section className="section-padding bg-secondary/30">
        <div className="container-narrow">
          <h2 className="text-2xl md:text-3xl font-semibold text-foreground mb-6">
            Waarom een verzekeringstaxatie voor je youngtimer?
          </h2>
          <p className="text-foreground/90 leading-relaxed mb-6">
            Bij veel verzekeraars is een taxatierapport vereist wanneer de waarde van een youngtimer niet vanzelfsprekend is. Dat geldt met name wanneer de auto beter is onderhouden, in bijzondere staat verkeert of afwijkt van gangbare uitvoeringen.
          </p>
          <p className="text-foreground/90 leading-relaxed mb-4">
            Een youngtimerverzekeringstaxatie is daarom vaak nodig:
          </p>
          <ul className="list-disc list-inside space-y-2 text-foreground/90 mb-6">
            <li>wanneer de waarde afwijkt van standaard verzekeringsbedragen</li>
            <li>bij youngtimers in bovengemiddelde of originele staat</li>
            <li>bij auto's met aantoonbaar onderhoud of revisies</li>
            <li>wanneer je vooraf zekerheid wilt over de uitkering bij schade of diefstal</li>
          </ul>
          <p className="text-foreground/90 leading-relaxed">
            In deze situaties legt een taxatierapport de waarde vooraf vast. Zo ontstaat er later geen discussie over de verzekerde waarde.
          </p>
        </div>
      </section>

      {/* Wat kun je verwachten */}
      <section className="section-padding bg-background">
        <div className="container-narrow">
          <h2 className="text-2xl md:text-3xl font-semibold text-foreground mb-6">
            Wat kun je verwachten van een youngtimerverzekeringstaxatie?
          </h2>
          <p className="text-foreground/90 leading-relaxed mb-6">
            Tijdens de taxatie wordt de waarde van de youngtimer vastgesteld op basis van de werkelijke staat en uitvoering op het moment van taxeren. Daarbij wordt onder andere gekeken naar:
          </p>
          <ul className="list-disc list-inside space-y-2 text-foreground/90 mb-6">
            <li>de technische en cosmetische staat</li>
            <li>de uitvoering en aanwezige opties</li>
            <li>onderhoudshistorie en eventuele revisies</li>
            <li>de marktpositie van vergelijkbare voertuigen</li>
          </ul>
          <p className="text-foreground/90 leading-relaxed">
            De vastgestelde waarde wordt vastgelegd in een taxatierapport dat wordt gebruikt voor de verzekering. Het doel is duidelijkheid vooraf, niet alleen een bedrag op papier.
          </p>
        </div>
      </section>

      {/* Werkwijze */}
      <section className="section-padding bg-secondary/30">
        <div className="container-narrow">
          <h2 className="text-2xl md:text-3xl font-semibold text-foreground mb-4">
            Onze werkwijze bij een youngtimerverzekeringstaxatie
          </h2>
          <p className="text-foreground/90 leading-relaxed mb-10">
            Een verzekeringstaxatie verloopt bij ons volgens een vaste en overzichtelijke werkwijze. Zo weet je vooraf waar je aan toe bent.
          </p>

          <div className="space-y-8">
            <div className="flex gap-4">
              <div className="flex-shrink-0 w-10 h-10 rounded-full bg-primary text-primary-foreground flex items-center justify-center font-semibold">
                1
              </div>
              <div>
                <h3 className="text-lg font-semibold text-foreground mb-2">Aanleveren van basisgegevens</h3>
                <p className="text-foreground/90">
                  Je dient een aanvraag in en levert de beschikbare gegevens over de youngtimer aan.
                </p>
              </div>
            </div>

            <div className="flex gap-4">
              <div className="flex-shrink-0 w-10 h-10 rounded-full bg-primary text-primary-foreground flex items-center justify-center font-semibold">
                2
              </div>
              <div>
                <h3 className="text-lg font-semibold text-foreground mb-2">Fysieke inspectie van het voertuig</h3>
                <p className="text-foreground/90">
                  De youngtimer wordt fysiek geïnspecteerd, op locatie of bij ons op kantoor. Hierbij beoordelen wij onder andere staat, uitvoering en bijzonderheden.
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
                  De bevindingen en de vastgestelde waarde worden overzichtelijk vastgelegd in een verzekeringstaxatierapport.
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
                  Je ontvangt het taxatierapport digitaal en kunt dit gebruiken voor de verzekering.
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
            De staat van de youngtimer op de dag van taxatie is bepalend voor de vastgestelde waarde. Werkzaamheden zoals herstel, onderhoud of aanpassingen moeten daarom vóór de taxatiedatum zijn afgerond.
          </p>
          <p className="text-foreground/90 leading-relaxed">
            Alleen wat op dat moment aanwezig en zichtbaar is, kan worden meegenomen in de waardebepaling. Dit voorkomt onduidelijkheid achteraf.
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
            Om de taxatie goed te kunnen voorbereiden, vragen wij je het volgende aan te leveren:
          </p>
          <ul className="list-disc list-inside space-y-2 text-foreground/90">
            <li>je naam en contactgegevens</li>
            <li>de kentekencard van de youngtimer</li>
            <li>indien aanwezig: onderhoudsboekje of servicehistorie</li>
            <li>facturen van onderhoud, revisies of aanpassingen</li>
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
            Onze taxatierapporten worden door verzekeraars gebruikt om de verzekerde waarde van de youngtimer vast te leggen. Het rapport laat helder zien hoe de waarde is onderbouwd.
          </p>
          <p className="text-foreground/90 leading-relaxed">
            Een youngtimerverzekeringstaxatierapport is doorgaans 2 tot 3 jaar geldig. De exacte geldigheid verschilt per verzekeraar en polis. Informeer hier altijd naar bij je verzekeraar.
          </p>
        </div>
      </section>

      {/* Form section */}
      <section className="section-padding bg-secondary/30" ref={formRef}>
        <div className="container-narrow">
          <div className="text-center mb-8">
            <h2 className="text-2xl md:text-3xl font-semibold text-foreground mb-4">
              Youngtimerverzekeringstaxatie aanvragen
            </h2>
            <p className="text-foreground/90 leading-relaxed">
              Wil je een verzekeringstaxatie laten uitvoeren, dan kun je hieronder een aanvraag indienen. Wij plannen vervolgens de taxatie in en zorgen voor een zorgvuldige vastlegging van de waarde.
            </p>
          </div>
          <IntakeForm 
            serviceType="youngtimerverzekeringstaxatie" 
            formTitle="Youngtimerverzekeringstaxatie aanvragen"
            submitButtonText="Youngtimerverzekeringstaxatie aanvragen"
          />
        </div>
      </section>

      {/* Terug naar overzicht */}
      <section className="section-padding bg-background">
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

export default YoungtimerTaxatie;
