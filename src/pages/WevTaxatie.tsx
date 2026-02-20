import { useRef } from "react";
import { Link } from "react-router-dom";
import LandingHero from "@/components/LandingHero";
import IntakeForm from "@/components/IntakeForm";
import SiteHeader from "@/components/SiteHeader";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";

const WevTaxatie = () => {
  const formRef = useRef<HTMLDivElement>(null);

  const scrollToForm = () => {
    formRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <div className="min-h-screen bg-background">
      <SiteHeader />
      <LandingHero
        subtitle="WEV-TAXATIE"
        title="Een zorgvuldig vastgestelde waarde voor fiscale doeleinden"
        description="Een WEV-taxatie wordt gebruikt wanneer de waarde van een voertuig fiscaal moet worden vastgesteld. Dat speelt bijvoorbeeld bij het overbrengen van een voertuig van zakelijk naar privé, van privé naar zakelijk of bij andere fiscale momenten waarbij de Belastingdienst een onderbouwde waarde verlangt."
        ctaText="WEV-taxatie aanvragen"
        onCtaClick={scrollToForm}
      />


      {/* Wanneer is een WEV-taxatie nodig */}
      <section className="section-padding bg-background">
        <div className="container-narrow">
          <h2 className="text-2xl md:text-3xl font-semibold text-foreground mb-6">
            Wanneer is een WEV-taxatie nodig?
          </h2>
          <p className="text-foreground/90 leading-relaxed mb-6">
            Een WEV-taxatie is nodig wanneer de waarde van een voertuig fiscaal moet worden vastgesteld en niet kan worden gebaseerd op een willekeurige verkoopprijs of globale schatting.
          </p>
          <p className="text-foreground/90 leading-relaxed mb-4">
            Dat is onder andere het geval:
          </p>
          <ul className="space-y-2 text-foreground/90 mb-6">
            <li className="flex items-start gap-2">
              <span className="text-primary mt-1">•</span>
              <span>bij overgang van een voertuig van zakelijk naar privé</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-primary mt-1">•</span>
              <span>bij inbreng van een privévoertuig in de onderneming</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-primary mt-1">•</span>
              <span>bij beëindiging of wijziging van ondernemingsvorm</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-primary mt-1">•</span>
              <span>bij fiscale herstructurering of administratiecorrecties</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-primary mt-1">•</span>
              <span>wanneer de Belastingdienst om een onderbouwde waardevaststelling vraagt</span>
            </li>
          </ul>
          <p className="text-foreground/90 leading-relaxed">
            In deze situaties is een objectieve en goed onderbouwde WEV-taxatie essentieel om discussie achteraf te voorkomen.
          </p>
        </div>
      </section>

      {/* Wat houdt een WEV-taxatie in */}
      <section className="section-padding bg-muted/30">
        <div className="container-narrow">
          <h2 className="text-2xl md:text-3xl font-semibold text-foreground mb-6">
            Wat houdt een WEV-taxatie in?
          </h2>
          <p className="text-foreground/90 leading-relaxed mb-6">
            WEV staat voor Waarde in het Economisch Verkeer. Dat is de waarde die een voertuig zou hebben bij verkoop op de vrije markt, tussen onafhankelijke partijen, rekening houdend met de staat van het voertuig op dat moment.
          </p>
          <p className="text-foreground/90 leading-relaxed mb-4">
            Bij een WEV-taxatie wordt onder andere gekeken naar:
          </p>
          <ul className="space-y-2 text-foreground/90 mb-6">
            <li className="flex items-start gap-2">
              <span className="text-primary mt-1">•</span>
              <span>de technische en cosmetische staat van het voertuig</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-primary mt-1">•</span>
              <span>kilometerstand, uitvoering en opties</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-primary mt-1">•</span>
              <span>onderhoud en gebruik</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-primary mt-1">•</span>
              <span>marktgegevens van vergelijkbare voertuigen</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-primary mt-1">•</span>
              <span>de context waarin de waarde fiscaal wordt toegepast</span>
            </li>
          </ul>
          <p className="text-foreground/90 leading-relaxed mb-4">
            De uitkomst wordt vastgelegd in een taxatierapport dat controleerbaar en uitlegbaar is.
          </p>
          <p className="text-foreground/90 leading-relaxed">
            Het WEV-taxatierapport dient als onderbouwing voor je eigen administratie en kan bij een eventuele controle door de Belastingdienst worden overlegd om de gehanteerde waarde te verantwoorden.
          </p>
        </div>
      </section>

      {/* Werkwijze */}
      <section className="section-padding bg-background">
        <div className="container-narrow">
          <h2 className="text-2xl md:text-3xl font-semibold text-foreground mb-4">
            Onze werkwijze bij een WEV-taxatie
          </h2>
          <p className="text-foreground/90 leading-relaxed mb-10">
            Een WEV-taxatie verloopt bij ons volgens een vaste en zorgvuldige werkwijze, zodat de vastgestelde waarde goed verdedigbaar is.
          </p>

          <div className="space-y-8">
            <div className="flex gap-4">
              <div className="flex-shrink-0 w-10 h-10 rounded-full bg-primary text-primary-foreground flex items-center justify-center font-semibold">
                1
              </div>
              <div>
                <h3 className="text-lg font-semibold text-foreground mb-2">Aanleveren van gegevens</h3>
                <p className="text-foreground/90">
                  Je levert de voertuiggegevens aan, zoals kenteken, merk, type, bouwjaar en kilometerstand. Daarnaast geef je aan in welke fiscale context de WEV-taxatie wordt gebruikt, bijvoorbeeld bij overgang van zakelijk naar privé of bij inbreng in de onderneming.
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
                  Het voertuig wordt fysiek geïnspecteerd. De staat op dat moment is bepalend voor de vastgestelde waarde.
                </p>
              </div>
            </div>

            <div className="flex gap-4">
              <div className="flex-shrink-0 w-10 h-10 rounded-full bg-primary text-primary-foreground flex items-center justify-center font-semibold">
                3
              </div>
              <div>
                <h3 className="text-lg font-semibold text-foreground mb-2">Vaststellen van de WEV</h3>
                <p className="text-foreground/90">
                  Op basis van inspectie en marktgegevens bepalen wij de Waarde in het Economisch Verkeer.
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
                  De waardebepaling en onderbouwing worden vastgelegd in een helder en controleerbaar taxatierapport.
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
                  Je ontvangt het WEV-taxatierapport digitaal en kunt dit gebruiken voor je administratie of richting de Belastingdienst.
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
      <section className="section-padding bg-muted/30">
        <div className="container-narrow">
          <h3 className="text-xl md:text-2xl font-semibold text-foreground mb-4">
            Belangrijk om te weten vóór een WEV-taxatie
          </h3>
          <p className="text-foreground/90 leading-relaxed mb-4">
            De staat van het voertuig op de dag van taxatie is bepalend voor de vastgestelde waarde. Werkzaamheden, herstel of aanpassingen die nog gepland staan, moeten daarom vóór de taxatiedatum zijn uitgevoerd.
          </p>
          <p className="text-foreground/90 leading-relaxed">
            Zo wordt de waarde vastgesteld op basis van de daadwerkelijke situatie en blijft de taxatie fiscaal verdedigbaar.
          </p>
        </div>
      </section>

      {/* Wat hebben wij van je nodig */}
      <section className="section-padding bg-background">
        <div className="container-narrow">
          <h3 className="text-xl md:text-2xl font-semibold text-foreground mb-4">
            Wat hebben wij van je nodig?
          </h3>
          <p className="text-foreground/90 leading-relaxed mb-6">
            Om een WEV-taxatie zorgvuldig te kunnen uitvoeren, ontvangen wij graag de volgende gegevens:
          </p>
          <ol className="space-y-3 text-foreground/90">
            <li className="flex items-start gap-3">
              <span className="font-semibold text-primary min-w-[24px]">1.</span>
              <span>Naam en contactgegevens</span>
            </li>
            <li className="flex items-start gap-3">
              <span className="font-semibold text-primary min-w-[24px]">2.</span>
              <span>Voertuiggegevens (kenteken, merk, type, bouwjaar, kilometerstand)</span>
            </li>
            <li className="flex items-start gap-3">
              <span className="font-semibold text-primary min-w-[24px]">3.</span>
              <span>Fiscale context (bijv. overgang zakelijk naar privé, inbreng in onderneming)</span>
            </li>
            <li className="flex items-start gap-3">
              <span className="font-semibold text-primary min-w-[24px]">4.</span>
              <span>Relevante documentatie (onderhoudsboekje, facturen van uitgevoerde werkzaamheden)</span>
            </li>
          </ol>
        </div>
      </section>

      {/* Onafhankelijk en fiscaal verdedigbaar */}
      <section className="section-padding bg-muted/30">
        <div className="container-narrow">
          <h2 className="text-2xl md:text-3xl font-semibold text-foreground mb-6">
            Onafhankelijk en fiscaal verdedigbaar
          </h2>
          <p className="text-foreground/90 leading-relaxed mb-4">
            Automobiel Taxaties werkt als onafhankelijk taxateur. De taxaties worden uitgevoerd door een taxateur die is geregistreerd bij de Vereniging van Register-Taxateurs (VRT) en is aangesloten bij de Taxateursvereniging voor Motorvoertuigen (TMV).
          </p>
          <p className="text-foreground/90 leading-relaxed mb-4">
            De vakkennis wordt actief onderhouden en toegepast bij iedere taxatie. Rapportages zijn zorgvuldig opgebouwd, controleerbaar en bedoeld voor gebruik in fiscale, administratieve en verzekeringscontext. Er worden geen vooraf afgesproken uitkomsten of wensbedragen gehanteerd.
          </p>
          <p className="text-foreground/90 leading-relaxed">
            Die onafhankelijkheid is essentieel bij fiscale waarderingen en voorkomt discussie bij controle achteraf.
          </p>
        </div>
      </section>

      {/* Form section */}
      <section className="section-padding bg-muted/30" ref={formRef}>
        <div className="container-narrow">
          <div className="text-center mb-8">
            <h2 className="text-2xl md:text-3xl font-semibold text-foreground mb-4">
              WEV-taxatie aanvragen
            </h2>
            <p className="text-foreground/90 leading-relaxed">
              Heb je een WEV-taxatie nodig voor een fiscale of administratieve situatie, dan kun je hieronder een aanvraag indienen. Op basis van de aangeleverde informatie plannen wij de taxatie in.
            </p>
          </div>
          <IntakeForm 
            serviceType="WEV-taxatie" 
            formTitle="WEV-taxatie aanvragen"
            toelichtingPlaceholder="Geef hier de beschikbare informatie over het voertuig en de fiscale context."
            submitButtonText="WEV-taxatie aanvragen"
          />
        </div>
      </section>

      {/* Terug naar overzicht */}
      <section className="section-padding bg-background">
        <div className="container-narrow text-center">
          <Button variant="secondary-action" size="sm" asChild>
            <Link to="/" className="inline-flex items-center gap-2">
              Terug naar homepage
              <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
            </Link>
          </Button>
        </div>
      </section>
    </div>
  );
};

export default WevTaxatie;
