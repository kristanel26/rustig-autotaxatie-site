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
        a: "Plan een afspraak bij de RDW en laat het voertuig identificeren of keuren. Na de keuring ontvang je een formulier voor de aangifte van de RDW. Dit stuur je met de BPM-berekening op via de post, of laat beide documenten achter in de aangiftezuil van de Belastingdienst op het keuringsstation. Binnen een aantal dagen ontvang je een betaalbericht. Na betaling geeft de RDW het kentekenbewijs af. Het enige dat dan nog rest is het maken van een kentekenplaat.",
      },
      {
        q: "Moet ik BPM-aangifte doen voor een bestelauto?",
        a: "Ja. Voor een bestelauto tot 3.500 kg moet er ook BPM-aangifte worden gedaan. Ben je ondernemer en gebruik je de auto voor meer dan 10% van de kilometers voor je onderneming, dan betaal je geen BPM als de auto jonger is dan 5 jaar. Ben je geen ondernemer en is de auto jonger dan 5 jaar, dan betaal je wel BPM. Na 5 jaar is het te betalen BPM-bedrag € 0. Deze 5 jaar gaat in op de datum eerste toelating in welk land dan ook.",
      },
      {
        q: "Welke gegevens hebben jullie nodig voor een BPM-aangifte?",
        a: "Wij hebben je NAW-gegevens nodig, een kopie van de buitenlandse kentekenpapieren, het Certificaat van Overeenstemming (CvO) en de aankoopfactuur.",
      },
      {
        q: "Kunnen jullie de beste wijze van afdracht vooraf bepalen?",
        a: "Ja. Wij berekenen vooraf of de forfaitaire tabel, een koerslijst of een taxatierapport de laagste BPM oplevert voor jouw voertuig.",
      },
      {
        q: "Hoeveel scheelt het als ik de aangifte doe met een taxatierapport?",
        a: "Dit verschilt per voertuig. Bij schade, hoge kilometerstand of bovengemiddelde slijtage kan een taxatierapport aanzienlijk voordeliger zijn dan de forfaitaire tabel. Wij berekenen dit gratis vooraf.",
      },
      {
        q: "Is een taxatierapport ook interessant bij jonge én oude auto's?",
        a: "Ja. Bij jonge auto's is de BPM nog hoog, waardoor schade of slijtage relatief meer oplevert. Bij oudere auto's kan de werkelijke marktwaarde lager liggen dan de forfaitaire berekening suggereert.",
      },
      {
        q: "Is een taxatierapport ook interessant bij lichte schade, zoals krassen en deuken?",
        a: "Zeker. Ook lichte schade kan de waarde van het voertuig merkbaar verlagen. Wij beoordelen vooraf of een taxatierapport in jouw situatie zinvol is.",
      },
      {
        q: "Geen schade, maar wel veel kilometers op de teller. Wat te doen?",
        a: "Een hoge kilometerstand kan de waarde drukken ten opzichte van de forfaitaire tabel. Een koerslijst of taxatierapport kan dan voordeliger uitpakken. Neem contact op voor een gratis voorberekening.",
      },
      {
        q: "Hoe werkt de BPM-aangifte op basis van een taxatierapport?",
        a: "Na de fysieke inspectie stellen wij de rest-BPM vast op basis van de werkelijke staat van het voertuig. Dit rapport dien je in bij de Belastingdienst als onderbouwing van de aangifte. Het rapport is juridisch verdedigbaar.",
      },
      {
        q: "Wat is belangrijk bij aangifte op basis van een koerslijst?",
        a: "De koerslijst moet op de dag van de RDW-keuring geldig zijn. Wij controleren welke koerslijst het meest gunstig is voor jouw voertuig en zorgen dat alles correct wordt ingediend.",
      },
      {
        q: "Hoe gaat de aangifte via de afschrijvingstabel van de Belastingdienst in zijn werk?",
        a: "De Belastingdienst hanteert een vaste tabel die de afschrijving berekent op basis van de leeftijd van het voertuig. Dit is de eenvoudigste methode, maar niet altijd de voordeligste.",
      },
      {
        q: "Wat doe ik als de contrataxatie hoger uitvalt?",
        a: "Je kunt bezwaar maken. Ons rapport is juridisch verdedigbaar en wij ondersteunen je bij bezwaarprocedures.",
      },
      {
        q: "Voert de Belastingdienst weleens een hertaxatie uit?",
        a: "Ja. De Belastingdienst kan tot 5 jaar navorderen en een hertaxatie uitvoeren. Bij een hertaxatie ben je verplicht te verschijnen. Zonder aanwezigheid wordt geen fiscaal akkoord verleend.",
      },
      {
        q: "Hoe zit het met een naheffingsaanslag?",
        a: "Als de Belastingdienst van mening is dat er te weinig BPM is betaald, kan zij een naheffingsaanslag opleggen. Dit kan tot 5 jaar na de aangifte. Een goed onderbouwd taxatierapport verkleint dit risico.",
      },
      {
        q: "Wat verstaat de Belastingdienst onder nieuwe of bijna nieuwe voertuigen?",
        a: "Voertuigen met minder dan 3.000 km op de teller worden door de Belastingdienst als nieuw beschouwd. Op nieuwe voertuigen mag geen afschrijving worden toegepast.",
      },
      {
        q: "Mag je op auto's van buiten de EU ook aangifte doen met een taxatierapport?",
        a: "Ja, dat mag. Voor voertuigen van buiten de EU gelden aanvullende eisen. Neem contact op voor advies over jouw specifieke situatie.",
      },
      {
        q: "Hoe bepaalt de RDW de CO2-uitstoot van een auto buiten de EU?",
        a: "De RDW hanteert een eigen meetmethode voor voertuigen zonder Europees typegoedkeuring. Dit kan invloed hebben op de BPM-berekening.",
      },
      {
        q: "Zijn er aanpassingen nodig aan het voertuig bij import binnen de EU?",
        a: "In principe niet, mits het voertuig al voldoet aan Europese typegoedkeuring. Bij twijfel raden wij aan dit vooraf te controleren bij de RDW.",
      },
      {
        q: "Hoe kan ik het transport regelen van een import binnen de EU?",
        a: "Je kunt de auto zelf ophalen of laten transporteren. Automobiel Taxaties heeft connecties die dit voor je kunnen verzorgen.",
      },
      {
        q: "Welke stappen moet ik nemen na ontvangst van het taxatierapport?",
        a: "Print het rapport in kleur. Ben je particulier, vul dan je BSN in. Vul de datum van de RDW-keuring in, onderteken het rapport en voeg de aankoopfactuur toe. Stuur alles op naar: Belastingdienst, Postbus 2710, 6401 DE Heerlen.",
      },
    ],
  },
  {
    category: "Verzekeringstaxaties",
    questions: [
      {
        q: "Hoe lang is een youngtimer- of oldtimer-taxatierapport geldig?",
        a: "Verzekeringstaxatierapporten zijn doorgaans 2 tot 3 jaar geldig. Check bij jouw verzekeraar naar de exacte geldigheidsduur, want dit verschilt per verzekeraar.",
      },
      {
        q: "Kunnen jullie taxeren op afstand?",
        a: "Nee. Wij voeren altijd een fysieke inspectie uit op locatie bij het voertuig. Een taxatie op afstand of op basis van foto's is niet mogelijk en niet erkend.",
      },
    ],
  },
  {
    category: "WEV-taxatie",
    questions: [
      {
        q: "Hoe wordt de waarde bepaald bij een WEV-taxatie?",
        a: "De werkelijke economische waarde wordt bepaald op basis van een fysieke inspectie, actuele marktgegevens en de staat van het voertuig. Het rapport is onafhankelijk en officieel erkend.",
      },
    ],
  },
  {
    category: "Algemeen",
    questions: [
      {
        q: "Wanneer ben je erkend taxateur?",
        a: "Een erkend taxateur is geregistreerd bij een erkende brancheorganisatie zoals Federatie TMV of VRT Register. Erik Elderson is notarieel beëdigd TMV Register Taxateur en Register Taxateur VRT.",
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
              <div key={catIndex} style={{ marginTop: catIndex === 0 ? 0 : 56 }}>
                <div className="flex justify-center mb-5">
                  <span
                    className="inline-block font-bold text-white"
                    style={{
                      fontFamily: "'Playfair Display', serif",
                      fontSize: 20,
                      background: '#1d3c71',
                      borderRadius: 30,
                      padding: '10px 32px',
                    }}
                  >
                    {category.category}
                  </span>
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
