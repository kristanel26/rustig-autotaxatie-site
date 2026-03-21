import WhatsAppButton from "@/components/WhatsAppButton";
import { Link } from "react-router-dom";
import { ArrowLeft, Phone, Mail, MessageCircle } from "lucide-react";
import UspBar from "@/components/UspBar";
import SiteHeader from "@/components/SiteHeader";
import SiteFooter from "@/components/SiteFooter";
import PageMeta from "@/components/PageMeta";
import { Button } from "@/components/ui/button";
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
        a: "Een erkend taxateur is geregistreerd bij een erkende beroepsorganisatie. Erik Elderson is aangesloten bij Federatie TMV, VRT Register en FEHAC.",
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
      <PageMeta
        title="Veelgestelde Vragen over BPM en Taxaties | Automobiel Taxaties"
        description="Antwoorden op de meest gestelde vragen over BPM-aangifte, taxatierapporten, oldtimers, kosten en levertijden."
      />
      <SiteHeader />

      {/* Hero */}
      <section className="hero-section py-16 md:py-24 px-6 md:px-8">
        <div className="container-wide">
          <Link to="/" className="inline-flex items-center gap-2 text-primary-foreground/70 hover:text-primary-foreground transition-colors mb-6">
            <ArrowLeft className="w-4 h-4" />
            Terug naar home
          </Link>
          <p className="uppercase text-[11px] font-semibold tracking-[0.12em] mb-3" style={{ color: '#ff751f' }}>FAQ</p>
          <h1 className="heading-display text-4xl md:text-5xl text-primary-foreground mb-4">
            Veelgestelde vragen
          </h1>
          <p className="text-lg max-w-2xl" style={{ color: 'rgba(255,255,255,0.75)' }}>
            Hier vind je antwoorden op de meest gestelde vragen. Staat jouw vraag er niet bij? Neem gerust contact op.
          </p>
          <a href="tel:+31854832461" className="inline-block mt-4">
            <button className="btn-outline-white">
              <Phone className="w-5 h-5" />
              085 483 2461
            </button>
          </a>
        </div>
      </section>
      <UspBar />

      {/* FAQ content */}
      <section className="py-12 md:py-16 px-6 md:px-8 bg-background">
        <div className="max-w-3xl mx-auto">
          <div className="space-y-10">
            {faqItems.map((category, catIndex) => (
              <div key={catIndex}>
                <div className="flex items-center gap-3 mb-4">
                  <div className="accent-line" />
                  <h2 className="text-xl md:text-2xl font-semibold">{category.category}</h2>
                </div>
                <Accordion type="single" collapsible className="w-full">
                  {category.questions.map((item, qIndex) => (
                    <AccordionItem key={qIndex} value={`${catIndex}-${qIndex}`}>
                      <AccordionTrigger className="text-left font-medium text-[15px]">
                        {item.q}
                      </AccordionTrigger>
                      <AccordionContent className="text-sm leading-relaxed" style={{ color: '#4a5568' }}>
                        {item.a}
                      </AccordionContent>
                    </AccordionItem>
                  ))}
                </Accordion>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA donkerblauw */}
      <section className="py-14 md:py-20 px-6 md:px-8" style={{ background: '#1d3c71' }}>
        <div className="container-wide text-center">
          <h2 className="text-2xl md:text-3xl font-semibold text-white mb-3">Staat jouw vraag er niet bij?</h2>
          <p className="mb-8 max-w-lg mx-auto" style={{ color: 'rgba(255,255,255,0.75)' }}>
            Neem contact op. We helpen je graag verder.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a href="tel:+31854832461">
              <Button variant="cta" size="lg">
                <Phone className="w-4 h-4 mr-2" />
                085 483 2461
              </Button>
            </a>
            <Link to="/contact">
              <button className="btn-outline-white">
                <Mail className="w-4 h-4" />
                Contactpagina
              </button>
            </Link>
          </div>
        </div>
      </section>

      <SiteFooter />
      <WhatsAppButton />
    </div>
  );
};

export default FAQ;
