import { Link } from "react-router-dom";
import { ArrowLeft } from "lucide-react";
import SiteHeader from "@/components/SiteHeader";
import SiteFooter from "@/components/SiteFooter";
import WhatsAppButton from "@/components/WhatsAppButton";
import { Button } from "@/components/ui/button";
import { Phone, Mail } from "lucide-react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

const faqItems = [
  {
    category: "BPM-aangifte",
    questions: [
      {
        q: "Hoe verloopt een BPM-aangifte?",
        a: "Je levert de basisgegevens aan via ons formulier of per mail. Wij bepalen de meest gunstige wijze van afdracht en maken, indien nodig, een taxatierapport op na een opname op locatie. Het rapport ontvang je digitaal, waarna je de aangifte kunt doen.",
      },
      {
        q: "Moet ik BPM-aangifte doen voor een bestelauto?",
        a: "Dat hangt af van het type bestelauto en het gebruik. Sommige bedrijfsvoertuigen zijn vrijgesteld van BPM. Neem contact met ons op, dan kijken we samen naar jouw situatie.",
      },
      {
        q: "Welke gegevens hebben jullie nodig voor een BPM-aangifte?",
        a: "We hebben het kentekenbewijs (of buitenlands registratiebewijs), de aankoopfactuur en eventuele schadedocumentatie nodig. Via ons formulier kun je deze eenvoudig aanleveren.",
      },
      {
        q: "Kunnen jullie de beste wijze van afdracht vooraf bepalen?",
        a: "Ja, dat doen we standaard. Op basis van de voertuiggegevens berekenen we welke methode voor jou het voordeligst is: de afschrijvingstabel, een koerslijst of een taxatierapport.",
      },
      {
        q: "Hoeveel scheelt het als ik aangifte doe met een taxatierapport?",
        a: "Dat verschilt per voertuig. Bij auto's met schade, hoge kilometerstand of specifieke kenmerken kan een taxatierapport aanzienlijk voordeliger zijn dan de standaard afschrijvingstabel. We berekenen het verschil graag vooraf voor je.",
      },
      {
        q: "Wat doe ik als de contrataxatie hoger uitvalt?",
        a: "In dat geval kun je bezwaar maken. Wij ondersteunen je daarbij en onze jurist kan het rapport verdedigen als dat nodig is.",
      },
      {
        q: "Voert de Belastingdienst weleens een hertaxatie uit?",
        a: "Ja, de Belastingdienst heeft het recht om binnen vijf jaar een hertaxatie uit te voeren. Daarom zorgen wij ervoor dat elk rapport zorgvuldig onderbouwd is en verdedigbaar blijft.",
      },
      {
        q: "Hoe lang is een taxatierapport geldig?",
        a: "Een BPM-taxatierapport is één maand geldig na de opnamedatum. Zorg ervoor dat de aangifte binnen die periode wordt gedaan.",
      },
    ],
  },
  {
    category: "Verzekeringstaxaties",
    questions: [
      {
        q: "Hoe lang is een youngtimer- of oldtimer-taxatierapport geldig?",
        a: "Een verzekeringstaxatierapport is doorgaans drie jaar geldig. Check bij je verzekeraar of zij andere voorwaarden hanteren.",
      },
      {
        q: "Kunnen jullie taxeren op afstand?",
        a: "Voor verzekeringstaxaties is een fysieke inspectie noodzakelijk. Alleen zo kunnen wij de werkelijke staat van het voertuig beoordelen en een betrouwbare waarde vaststellen.",
      },
    ],
  },
  {
    category: "WEV-taxatie",
    questions: [
      {
        q: "Hoe wordt de waarde bepaald bij een WEV-taxatie?",
        a: "Bij een WEV-taxatie bepalen we de waarde in het economisch verkeer op een specifieke peildatum. We gebruiken marktgegevens, vergelijkbare voertuigen en onze vakkennis om tot een objectieve waarde te komen.",
      },
    ],
  },
  {
    category: "Algemeen",
    questions: [
      {
        q: "Is een taxatierapport ook interessant bij jonge auto's?",
        a: "Zeker. Ook bij relatief nieuwe auto's kan een taxatierapport relevant zijn, bijvoorbeeld bij BPM-import of bij verzekering van een bijzondere uitvoering.",
      },
      {
        q: "Is een taxatierapport ook interessant bij lichte schade?",
        a: "Ja. Zelfs kleine beschadigingen zoals krassen of deuken kunnen de waarde beïnvloeden en daarmee de BPM-afdracht verlagen.",
      },
      {
        q: "Wanneer ben je erkend taxateur?",
        a: "Een erkend taxateur is geregistreerd bij een erkende beroepsorganisatie zoals het TMV of VRT. Erik Elderson is notarieel beëdigd TMV Register-Taxateur en Register-Taxateur VRT.",
      },
      {
        q: "Welke stappen moet ik nemen na ontvangst van het taxatierapport?",
        a: "Na ontvangst controleer je het rapport en onderteken je het. Vervolgens kun je de aangifte doen bij de Belastingdienst. Wij begeleiden je graag bij het verdere proces.",
      },
    ],
  },
];

const FAQ = () => {
  return (
    <div className="min-h-screen bg-background">
      <SiteHeader />

      {/* Hero */}
      <section className="hero-section py-16 md:py-24 px-6 md:px-8">
        <div className="container-wide">
          <Link to="/" className="inline-flex items-center gap-2 text-primary-foreground/70 hover:text-primary-foreground transition-colors mb-6">
            <ArrowLeft className="w-4 h-4" />
            Terug naar home
          </Link>
          <h1 className="text-4xl md:text-5xl font-bold text-primary-foreground mb-4">
            Veelgestelde vragen
          </h1>
          <p className="text-lg text-primary-foreground/80 max-w-2xl">
            Hier vind je antwoorden op de meest gestelde vragen over onze taxaties. Staat jouw vraag er niet bij? Neem dan gerust contact met ons op.
          </p>
        </div>
      </section>

      {/* FAQ content */}
      <section className="section-padding bg-background">
        <div className="container-narrow">
          <div className="space-y-10">
            {faqItems.map((category, catIndex) => (
              <div key={catIndex}>
                <h2 className="text-2xl font-semibold mb-4">{category.category}</h2>
                <Accordion type="single" collapsible className="w-full">
                  {category.questions.map((item, qIndex) => (
                    <AccordionItem key={qIndex} value={`${catIndex}-${qIndex}`}>
                      <AccordionTrigger className="text-left font-medium">
                        {item.q}
                      </AccordionTrigger>
                      <AccordionContent className="text-muted-foreground leading-relaxed">
                        {item.a}
                      </AccordionContent>
                    </AccordionItem>
                  ))}
                </Accordion>
              </div>
            ))}
          </div>

          {/* CTA */}
          <div className="mt-16 card-elevated p-8 text-center">
            <h3 className="text-xl font-semibold mb-2">Staat jouw vraag er niet bij?</h3>
            <p className="text-muted-foreground mb-6">
              Neem contact met ons op. We helpen je graag verder.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a href="tel:+31854832461">
                <Button variant="default" size="lg">
                  <Phone className="w-4 h-4 mr-2" />
                  085 483 2461
                </Button>
              </a>
              <Link to="/contact">
                <Button variant="outline" size="lg">
                  <Mail className="w-4 h-4 mr-2" />
                  Contactpagina
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12 px-6 border-t border-border">
        <div className="container-wide">
          <div className="pt-0 text-center text-sm text-muted-foreground">
            <p>© {new Date().getFullYear()} Automobiel Taxaties · KvK 71468889 · BTW NL858727493B01</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default FAQ;
