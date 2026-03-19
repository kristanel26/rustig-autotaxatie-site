import { useRef } from "react";
import { Link } from "react-router-dom";
import LandingHero from "@/components/LandingHero";
import IntakeForm from "@/components/IntakeForm";
import SiteHeader from "@/components/SiteHeader";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import heroMotor from "@/assets/hero-motor.jpg";

const MotorTaxatie = () => {
  const formRef = useRef<HTMLDivElement>(null);

  const scrollToForm = () => {
    formRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <div className="min-h-screen bg-background">
      <SiteHeader />
      <LandingHero
        subtitle="VERZEKERINGSTAXATIE MOTOR"
        title="Zekerheid over de waarde van je motor"
        description="Je motor is meer dan alleen een voertuig. Met een verzekeringstaxatie leg je vast wat het op dit moment werkelijk waard is. Die waarde vormt de basis voor de verzekering, zodat je bij schade of diefstal niet afhankelijk bent van een dagwaarde."
        ctaText="Verzekeringstaxatie aanvragen"
        onCtaClick={scrollToForm}
        heroImage={heroMotor}
      />

      {/* Waarom een verzekeringstaxatie */}
      <section className="section-padding bg-muted/30">
        <div className="container-narrow">
          <h2 className="text-2xl md:text-3xl font-semibold text-foreground mb-6">
            Waarom een verzekeringstaxatie voor je motor?
          </h2>
          <p className="text-foreground/90 leading-relaxed mb-6">
            Bij veel verzekeraars is een taxatierapport vereist wanneer de waarde van een motor afwijkt van standaard verzekeringsbedragen. Dat is vaak het geval wanneer de waarde niet vanzelfsprekend is.
          </p>
          <ul className="space-y-2 text-foreground/90 mb-6">
            <li className="flex items-start gap-2">
              <span className="text-primary mt-1">•</span>
              <span>bij motoren met aanpassingen of extra accessoires</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-primary mt-1">•</span>
              <span>bij zelfbouw of bijzondere uitvoeringen</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-primary mt-1">•</span>
              <span>wanneer de waarde afwijkt van gebruikelijke verzekeringsbedragen</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-primary mt-1">•</span>
              <span>wanneer de verzekeraar vooraf zekerheid wil over de waarde</span>
            </li>
          </ul>
          <p className="text-foreground/90 leading-relaxed">
            Met een taxatierapport wordt de waarde vooraf vastgelegd. Zo is duidelijk welke waarde wordt verzekerd en ontstaat er bij schade of diefstal geen discussie achteraf.
          </p>
        </div>
      </section>

      {/* Wat kun je verwachten */}
      <section className="section-padding bg-background">
        <div className="container-narrow">
          <h2 className="text-2xl md:text-3xl font-semibold text-foreground mb-6">
            Wat kun je verwachten van een verzekeringstaxatie?
          </h2>
          <p className="text-foreground/90 leading-relaxed mb-6">
            Een verzekeringstaxatie legt de waarde van het voertuig vast op basis van de werkelijke staat en uitvoering op het moment van taxeren.
          </p>
          <ul className="space-y-2 text-foreground/90 mb-6">
            <li className="flex items-start gap-2">
              <span className="text-primary mt-1">•</span>
              <span>de technische en cosmetische staat van het voertuig</span>
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
              <span>de marktpositie van vergelijkbare voertuigen</span>
            </li>
          </ul>
          <p className="text-foreground/90 leading-relaxed">
            De vastgestelde waarde wordt opgenomen in een taxatierapport dat wordt gebruikt voor de verzekering. Het doel is duidelijkheid vooraf, zodat later geen onduidelijkheid ontstaat over de verzekerde waarde.
          </p>
        </div>
      </section>

      {/* Werkwijze */}
      <section className="section-padding bg-muted/30">
        <div className="container-narrow">
          <h2 className="text-2xl md:text-3xl font-semibold text-foreground mb-4">
            Onze werkwijze bij een verzekeringstaxatie
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
                  Je dient een aanvraag in en levert de beschikbare gegevens over het voertuig aan.
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
                  Het voertuig wordt op locatie of bij ons geïnspecteerd. Daarbij kijken we naar staat, uitvoering en bijzonderheden.
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

          <p className="text-foreground/90 leading-relaxed mt-10">
            De taxaties worden uitgevoerd door een geregistreerd taxateur die zijn vakkennis actief onderhoudt.
          </p>
        </div>
      </section>

      {/* Belangrijk om te weten */}
      <section className="section-padding bg-background">
        <div className="container-narrow">
          <h3 className="text-xl md:text-2xl font-semibold text-foreground mb-4">
            Belangrijk om te weten vóór de taxatie
          </h3>
          <p className="text-foreground/90 leading-relaxed mb-4">
            De waarde van het voertuig wordt vastgesteld op basis van de staat op de dag van taxatie. Werkzaamheden zoals herstel, afbouw of aanpassingen moeten daarom vóór de taxatiedatum zijn afgerond.
          </p>
          <p className="text-foreground/90 leading-relaxed">
            Alleen wat op dat moment aanwezig en zichtbaar is, wordt meegenomen in de waardebepaling. Dit voorkomt discussie of teleurstelling achteraf, voor jou én voor de verzekeraar.
          </p>
        </div>
      </section>

      {/* Wat hebben wij van je nodig */}
      <section className="section-padding bg-muted/30">
        <div className="container-narrow">
          <h3 className="text-xl md:text-2xl font-semibold text-foreground mb-4">
            Wat hebben wij van je nodig?
          </h3>
          <p className="text-foreground/90 leading-relaxed mb-4">
            Om de taxatie goed te kunnen uitvoeren, vragen wij je het volgende aan te leveren:
          </p>
          <ul className="list-disc list-inside space-y-2 text-foreground/90">
            <li>je naam en contactgegevens</li>
            <li>de kentekencard van het voertuig</li>
            <li>onderhoudsboekje of servicehistorie (indien aanwezig)</li>
            <li>facturen van aanpassingen, accessoires of zelfbouw</li>
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
            Automobiel Taxaties werkt als onafhankelijk taxateur. De taxaties worden uitgevoerd door een taxateur die is geregistreerd bij de Vereniging van Register-Taxateurs (VRT) en is aangesloten bij de Taxateursvereniging voor Motorvoertuigen (TMV).
          </p>
          <p className="text-foreground/90 leading-relaxed mb-6">
            De vakkennis wordt actief onderhouden en toegepast bij iedere taxatie. Rapportages zijn zorgvuldig opgebouwd, controleerbaar en bedoeld voor gebruik in fiscale, administratieve en verzekeringscontext.
          </p>
          <p className="text-foreground/90 leading-relaxed mb-6">
            Deze registraties zijn voor verzekeraars een belangrijk uitgangspunt bij het accepteren van taxatierapporten. Onze taxatierapporten worden door verzekeraars gebruikt om de verzekerde waarde van motoren vast te leggen.
          </p>
          <p className="text-foreground/90 leading-relaxed">
            Een verzekeringstaxatierapport is doorgaans 2 tot 3 jaar geldig. De exacte geldigheid verschilt per verzekeraar en polis. Informeer hier altijd naar bij je verzekeraar.
          </p>
        </div>
      </section>

      {/* Form section */}
      <section className="section-padding bg-muted/30" ref={formRef}>
        <div className="container-narrow">
          <div className="text-center mb-8">
            <p className="text-foreground/90 leading-relaxed">
              Wil je een verzekeringstaxatie laten uitvoeren, dan kun je hieronder eenvoudig een aanvraag indienen.
            </p>
          </div>
          <IntakeForm 
            serviceType="motorverzekeringstaxatie" 
            formTitle="Verzekeringstaxatie aanvragen"
            submitButtonText="Verzekeringstaxatie aanvragen"
          />
        </div>
      </section>

      {/* Terug naar overzicht */}
      <section className="section-padding bg-background">
        <div className="container-narrow text-center">
          <Button variant="secondary-action" size="sm" asChild>
            <Link to="/verzekeringstaxatie-info" className="inline-flex items-center gap-2">
              Terug naar verzekeringstaxatie overzicht
              <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
            </Link>
          </Button>
        </div>
      </section>
      <SiteFooter />
      <WhatsAppButton />
    </div>
  );
};

export default MotorTaxatie;
