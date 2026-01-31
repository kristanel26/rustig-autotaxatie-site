import { ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import LandingHero from "@/components/LandingHero";
import IntakeForm from "@/components/IntakeForm";

const FoodtruckTaxatie = () => {
  const scrollToForm = () => {
    document.getElementById("aanvragen")?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <div className="min-h-screen bg-background">
      <LandingHero
        title="Zekerheid over de waarde van je foodtruck"
        subtitle="Foodtruckverzekeringstaxatie"
        description="Een foodtruck is vaak meer dan alleen een voertuig. De inrichting, apparatuur en staat bepalen in grote mate de waarde. Die waarde sluit lang niet altijd aan bij standaard verzekeringsbedragen. Met een verzekeringstaxatie leg je de waarde van je foodtruck vooraf vast. Zo weet je waar je aan toe bent en voorkom je discussie met de verzekeraar bij schade of diefstal."
        ctaText="Foodtruckverzekeringstaxatie aanvragen"
        onCtaClick={scrollToForm}
      />

      {/* Waarom sectie */}
      <section className="section-padding bg-muted/30">
        <div className="container-narrow">
          <h2 className="text-2xl md:text-3xl font-semibold mb-6">
            Waarom een verzekeringstaxatie voor je foodtruck?
          </h2>
          <p className="text-muted-foreground mb-6">
            Bij foodtrucks wijkt de werkelijke waarde vaak af van wat een verzekeraar standaard hanteert. Denk aan professionele keukenapparatuur, vaste inbouw, aanpassingen of een specifieke staat van onderhoud.
          </p>
          <p className="text-muted-foreground mb-6">
            Een verzekeringstaxatie is daarom in veel gevallen noodzakelijk, en vaak ook een vereiste van de verzekeraar, bijvoorbeeld:
          </p>
          <ul className="space-y-3 text-muted-foreground mb-6">
            <li className="flex items-start gap-3">
              <span className="w-1.5 h-1.5 rounded-full bg-primary mt-2 shrink-0" />
              <span>wanneer de foodtruck is opgebouwd of aangepast</span>
            </li>
            <li className="flex items-start gap-3">
              <span className="w-1.5 h-1.5 rounded-full bg-primary mt-2 shrink-0" />
              <span>bij vaste keukeninrichting en apparatuur</span>
            </li>
            <li className="flex items-start gap-3">
              <span className="w-1.5 h-1.5 rounded-full bg-primary mt-2 shrink-0" />
              <span>wanneer de waarde niet past binnen standaard verzekeringsbedragen</span>
            </li>
            <li className="flex items-start gap-3">
              <span className="w-1.5 h-1.5 rounded-full bg-primary mt-2 shrink-0" />
              <span>wanneer je zekerheid wilt over de uitkering bij schade of diefstal</span>
            </li>
          </ul>
          <p className="text-muted-foreground">
            Met een taxatierapport wordt de waarde vooraf vastgelegd. Dat geeft rust en duidelijkheid, ook als het er echt toe doet.
          </p>
        </div>
      </section>

      {/* Wat kun je verwachten */}
      <section className="section-padding">
        <div className="container-narrow">
          <h2 className="text-2xl md:text-3xl font-semibold mb-6">
            Wat kun je verwachten van een foodtruckverzekeringstaxatie?
          </h2>
          <p className="text-muted-foreground mb-6">
            Tijdens de taxatie wordt gekeken naar de foodtruck zoals deze op dat moment wordt gebruikt. De waardebepaling is gebaseerd op de werkelijke staat en uitvoering.
          </p>
          <p className="text-muted-foreground mb-4">Daarbij wordt onder andere gekeken naar:</p>
          <ul className="space-y-3 text-muted-foreground">
            <li className="flex items-start gap-3">
              <span className="w-1.5 h-1.5 rounded-full bg-primary mt-2 shrink-0" />
              <span>de staat van het voertuig</span>
            </li>
            <li className="flex items-start gap-3">
              <span className="w-1.5 h-1.5 rounded-full bg-primary mt-2 shrink-0" />
              <span>de opbouw en vaste inrichting</span>
            </li>
            <li className="flex items-start gap-3">
              <span className="w-1.5 h-1.5 rounded-full bg-primary mt-2 shrink-0" />
              <span>aanwezige keukenapparatuur en installaties</span>
            </li>
            <li className="flex items-start gap-3">
              <span className="w-1.5 h-1.5 rounded-full bg-primary mt-2 shrink-0" />
              <span>onderhoud en algemene conditie</span>
            </li>
            <li className="flex items-start gap-3">
              <span className="w-1.5 h-1.5 rounded-full bg-primary mt-2 shrink-0" />
              <span>de marktpositie van vergelijkbare foodtrucks</span>
            </li>
          </ul>
          <p className="text-muted-foreground mt-6">
            De vastgestelde waarde wordt zorgvuldig vastgelegd in een taxatierapport dat wordt gebruikt voor de verzekering.
          </p>
        </div>
      </section>

      {/* Werkwijze */}
      <section className="section-padding bg-muted/30">
        <div className="container-narrow">
          <h2 className="text-2xl md:text-3xl font-semibold mb-8">
            Onze werkwijze bij een foodtruckverzekeringstaxatie
          </h2>
          <p className="text-muted-foreground mb-8">
            Een verzekeringstaxatie verloopt bij ons volgens een vaste en overzichtelijke werkwijze.
          </p>
          <div className="space-y-6">
            <div className="flex gap-4">
              <div className="flex-shrink-0 w-8 h-8 rounded-full bg-primary text-primary-foreground flex items-center justify-center font-semibold text-sm">
                1
              </div>
              <div>
                <h3 className="font-semibold mb-1">Aanvraag indienen</h3>
                <p className="text-muted-foreground">
                  Je dient een aanvraag in voor een foodtruckverzekeringstaxatie.
                </p>
              </div>
            </div>
            <div className="flex gap-4">
              <div className="flex-shrink-0 w-8 h-8 rounded-full bg-primary text-primary-foreground flex items-center justify-center font-semibold text-sm">
                2
              </div>
              <div>
                <h3 className="font-semibold mb-1">Fysieke inspectie van de foodtruck</h3>
                <p className="text-muted-foreground">
                  De foodtruck wordt fysiek geïnspecteerd, op locatie of bij ons op kantoor. Daarbij bekijken wij zowel het voertuig als de vaste inrichting.
                </p>
              </div>
            </div>
            <div className="flex gap-4">
              <div className="flex-shrink-0 w-8 h-8 rounded-full bg-primary text-primary-foreground flex items-center justify-center font-semibold text-sm">
                3
              </div>
              <div>
                <h3 className="font-semibold mb-1">Vaststellen van de waarde</h3>
                <p className="text-muted-foreground">
                  Op basis van de inspectie en relevante marktinformatie wordt een realistische en verdedigbare waarde vastgesteld.
                </p>
              </div>
            </div>
            <div className="flex gap-4">
              <div className="flex-shrink-0 w-8 h-8 rounded-full bg-primary text-primary-foreground flex items-center justify-center font-semibold text-sm">
                4
              </div>
              <div>
                <h3 className="font-semibold mb-1">Opstellen van het taxatierapport</h3>
                <p className="text-muted-foreground">
                  Alle bevindingen en de vastgestelde waarde worden overzichtelijk vastgelegd in een taxatierapport.
                </p>
              </div>
            </div>
            <div className="flex gap-4">
              <div className="flex-shrink-0 w-8 h-8 rounded-full bg-primary text-primary-foreground flex items-center justify-center font-semibold text-sm">
                5
              </div>
              <div>
                <h3 className="font-semibold mb-1">Oplevering van het rapport</h3>
                <p className="text-muted-foreground">
                  Je ontvangt het taxatierapport digitaal en kunt dit gebruiken voor de verzekering.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Belangrijk om te weten */}
      <section className="section-padding">
        <div className="container-narrow">
          <div className="border-l-4 border-primary/20 pl-6 py-2">
            <h2 className="text-xl font-semibold mb-3">Belangrijk om te weten vóór de taxatie</h2>
            <p className="text-muted-foreground">
              De staat van de foodtruck op de dag van taxatie is bepalend voor de vastgestelde waarde. Werkzaamheden zoals afbouw, aanpassingen of vervanging van apparatuur moeten daarom vóór de taxatiedatum zijn afgerond.
            </p>
            <p className="text-muted-foreground mt-3">
              Alleen wat op dat moment aanwezig en in gebruik is, kan worden meegenomen in de waardebepaling. Dit voorkomt onduidelijkheid achteraf.
            </p>
          </div>
        </div>
      </section>

      {/* Wat hebben wij nodig */}
      <section className="section-padding bg-muted/30">
        <div className="container-narrow">
          <div className="border-l-4 border-primary/20 pl-6 py-2">
            <h2 className="text-xl font-semibold mb-3">Wat hebben wij van je nodig?</h2>
            <p className="text-muted-foreground mb-4">
              Om de taxatie goed te kunnen voorbereiden, vragen wij je het volgende aan te leveren:
            </p>
            <ol className="space-y-2 text-muted-foreground list-decimal list-inside">
              <li>je naam en contactgegevens</li>
              <li>kenteken- en voertuiggegevens</li>
              <li>indien beschikbaar: documentatie van opbouw of inrichting</li>
              <li>facturen van vaste apparatuur of aanpassingen</li>
            </ol>
          </div>
        </div>
      </section>

      {/* Acceptatie */}
      <section className="section-padding">
        <div className="container-narrow">
          <h2 className="text-2xl md:text-3xl font-semibold mb-6">
            Acceptatie van het taxatierapport
          </h2>
          <p className="text-muted-foreground mb-4">
            De taxaties worden uitgevoerd door een geregistreerd taxateur die is aangesloten bij erkende registers, waaronder VRT en TMV. Daarnaast wordt gewerkt volgens de richtlijnen die binnen de branche worden gehanteerd, zoals die van FEHAC. Deze registraties en richtlijnen zijn voor verzekeraars een belangrijk uitgangspunt bij het accepteren van taxatierapporten.
          </p>
          <p className="text-muted-foreground mb-4">
            Onze taxatierapporten worden door verzekeraars gebruikt om de verzekerde waarde van foodtrucks vast te leggen. Het rapport laat helder zien hoe de waarde is onderbouwd.
          </p>
          <p className="text-muted-foreground">
            De geldigheid van een verzekeringstaxatie is doorgaans 2 tot 3 jaar. Informeer hierover altijd bij je eigen verzekeraar, aangezien voorwaarden kunnen verschillen.
          </p>
        </div>
      </section>

      {/* Aanvraagformulier */}
      <section id="aanvragen" className="section-padding bg-muted/30">
        <div className="container-narrow">
          <div className="mb-8">
            <h2 className="text-2xl md:text-3xl font-semibold mb-4">
              Foodtruckverzekeringstaxatie aanvragen
            </h2>
            <p className="text-muted-foreground">
              Wil je een verzekeringstaxatie laten uitvoeren, dan kun je hieronder een aanvraag indienen. Wij plannen vervolgens de taxatie in en zorgen voor een zorgvuldige vastlegging van de waarde.
            </p>
          </div>
          <IntakeForm 
            serviceType="foodtruckverzekeringstaxatie"
            formTitle="Foodtruckverzekeringstaxatie aanvragen"
            formSubtext="Vul onderstaand formulier in en we nemen binnen één werkdag contact met je op."
            toelichtingPlaceholder="Beschrijf je foodtruck, de opbouw, inrichting en eventuele bijzonderheden..."
            submitButtonText="Aanvraag versturen"
          />
        </div>
      </section>

      {/* Terug link */}
      <section className="section-padding">
        <div className="container-narrow">
          <Link to="/verzekeringstaxatie-info">
            <Button variant="secondary-action" className="gap-2">
              <ArrowLeft className="w-4 h-4" />
              Terug naar verzekeringstaxatie overzicht
            </Button>
          </Link>
        </div>
      </section>
    </div>
  );
};

export default FoodtruckTaxatie;
