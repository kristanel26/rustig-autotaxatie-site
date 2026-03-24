import WhatsAppButton from "@/components/WhatsAppButton";
import { Link } from "react-router-dom";
import { Phone, Mail, ChevronDown } from "lucide-react";
import heroFaq from "@/assets/hero-faq.jpg";
import UspBar from "@/components/UspBar";
import SiteHeader from "@/components/SiteHeader";
import SiteFooter from "@/components/SiteFooter";
import PageMeta from "@/components/PageMeta";
import { Button } from "@/components/ui/button";
import { useState, useRef } from "react";

const faqItems = [
  {
    category: "BPM en import",
    questions: [
      { q: "Wat valt er onder motorvoertuigen?", a: "Onder motorvoertuigen vallen personenauto's, bestelauto's, vrachtwagens, bussen, kampeerauto's, motorfietsen en bromfietsen." },
      { q: "Wat is het verschil tussen een btw-auto en een marge-auto?", a: "Een marge-auto is een auto waarover al btw is betaald. Bij een btw-auto moet de volgende koper btw betalen. Is dat een ondernemer, dan kan die de btw terugvorderen. Is het een particulier, dan wordt het opnieuw een marge-auto." },
      { q: "Welke manieren van BPM-aangifte zijn er?", a: "Als je een auto, motor, camper of bedrijfswagen importeert, moet je BPM-aangifte doen. Je mag de methode kiezen die het meest gunstig is. Er zijn drie opties: de forfaitaire afschrijvingstabel, de koerslijst en het taxatierapport via de tegenbewijsregeling." },
      { q: "Kan ik vooraf bepalen welke methode het meest gunstig is?", a: "Ja. Op basis van de staat en gegevens van het voertuig bepalen wij binnen één werkdag welke methode voor jou het meest voordelig is. Dat advies is gratis en vrijblijvend." },
      { q: "Wanneer gebruik je welke methode?", a: "De forfaitaire tabel rekent alleen met leeftijd en CO2-uitstoot. Is je auto minder waard dan de tabel aangeeft? Dan komen koerslijst of taxatie in beeld. Is de auto in goede staat zonder bijzonderheden? Dan volstaat een koerslijst. Heeft de auto schade, hoge kilometerstand of technische gebreken? Dan is een taxatierapport de beste keuze." },
      { q: "Kan ik vooraf weten of een taxatierapport loont?", a: "Ja. Factoren als het type voertuig, de staat, de kilometerstand en de CO2-uitstoot spelen allemaal een rol. Neem contact op voor een vrijblijvende berekening." },
      { q: "Is een taxatierapport ook interessant bij lichte schade?", a: "Ja. Zelfs lichte schade kan de handelsinkoopwaarde aanzienlijk verlagen. Wij beoordelen bij de fysieke inspectie of de schade past bij de leeftijd en kilometerstand van het voertuig." },
      { q: "Is een taxatie alleen interessant bij schadeauto's?", a: "Nee. Veel importeurs doen aangifte via de forfaitaire tabel, maar die houdt geen rekening met merk, staat of kilometerstand. Daardoor betaal je soms meer dan nodig. Een koerslijstaangifte of taxatie kan voordeliger zijn, ook zonder schade." },
      { q: "Kan een voertuig zonder schade alleen via de forfaitaire tabel worden aangegeven?", a: "Nee. Ook zonder schade kan een koerslijstaangifte gunstiger zijn. Of dat zo is hangt af van merk, leeftijd, kilometerstand en CO2-uitstoot. Neem contact op om de mogelijkheden te bespreken." },
      { q: "Kan ik voor een auto met WOK-schade BPM-aangifte doen?", a: "Ja, maar de auto krijgt dan een WOK I of WOK II status. Die verdwijnt pas nadat de schade volledig is hersteld. Ons advies is de WOK-schade te herstellen vóór de RDW-keuring." },
      { q: "Heeft taxatie voor de BPM alleen zin bij jonge auto's?", a: "Nee. Ook bij oudere voertuigen kan een taxatie voordelig zijn. Dit verschilt per auto, laat ons een vrijblijvende berekening maken." },
      { q: "Mijn auto heeft geen schade maar wel veel kilometers. Kan ik daar iets mee?", a: "Ja. Een koerslijstaangifte is in veel gevallen voordeliger dan de forfaitaire tabel. Soms loont zelfs een taxatierapport. Wij berekenen dit kosteloos voor je." },
      { q: "Heeft het importeren van ex-huurauto's voordelen?", a: "Ja. Een voormalige huurauto heeft doorgaans een intensief gebruikspatroon, wat de handelsinkoopwaarde drukt. Bij een taxatierapport wordt dit meegenomen, wat kan resulteren in een lagere BPM-afdracht." },
      { q: "Kan een BPM-taxatie van een hybride auto interessant zijn?", a: "Ja, dat kan. Of het loont hangt af van de specifieke gegevens van het voertuig. Neem contact op voor een vrijblijvende berekening." },
      { q: "Waar staat de CO2-uitstoot op een Duits kenteken?", a: "Op een Duits kenteken staat de CO2-uitstoot vermeld in veld 49. Het staat ook op het Certificaat van Overeenstemming (CVO)." },
      { q: "Autolex Pro geeft aan dat mijn auto als nieuw wordt aangemerkt. Klopt dat?", a: "Niet per se. Je ziet die melding als de datum eerste toelating binnen 12 maanden ligt of als de auto minder dan 3.000 km heeft gereden. Heeft de auto een eerste registratie in het buitenland? Dan is er in beginsel sprake van een gebruikte auto. Bel ons voor advies." },
      { q: "Wanneer beoordeelt de Belastingdienst een geïmporteerde auto als nieuw voor de btw?", a: "Een voertuig geldt als nieuw voor de btw als het jonger is dan 6 maanden of minder dan 6.000 km heeft gereden. In dat geval betaal je in Nederland 21% btw over de netto aanschafprijs." },
      { q: "Moet ik btw betalen bij het importeren van een auto uit een ander EU-land?", a: "Nee, tenzij de auto jonger is dan 6 maanden of minder dan 6.000 km heeft gereden." },
      { q: "Wat betekent MwSt ausweisbar?", a: "Dit staat op een Duitse factuur en betekent dat de btw apart wordt vermeld. De auto is dan een btw-auto." },
      { q: "Wat betekent MwSt nicht ausweisbar?", a: "Dit betekent dat de btw niet apart op de factuur staat. De auto is dan een marge-auto, er is al btw over betaald." },
      { q: "Mag je voor auto's van buiten de EU ook BPM aangeven met een taxatierapport?", a: "Ja. De RDW-procedure verloopt voor niet-EU voertuigen anders: de auto moet volledig APK-keurbaar zijn voordat je naar de Belastingdienst kunt. Neem contact op voor advies over jouw specifieke situatie." },
      { q: "Wat is de Scandinavische rekenmethode?", a: "Als de CO2-uitstoot onbekend is, kan die worden berekend via de Scandinavische rekenmethode, conform EU-richtlijn 80/1268. De berekening is gebaseerd op gewicht, vermogen, transmissie en brandstofsoort. Neem contact op als je hier vragen over hebt." },
      { q: "Is een taxatierapport altijd bindend voor de Belastingdienst?", a: "Nee. De Belastingdienst kan de waarde betwisten en een contrataxatie uitvoeren. Daarom is het essentieel dat het rapport fysiek onderbouwd en controleerbaar is." },
      { q: "Ik heb aangifte gedaan. Hoe lang moet ik wachten met het herstellen van de auto?", a: "Je moet het voertuig 6 werkdagen in de staat laten zoals het bij de taxatie is opgenomen. De termijn gaat in op de dag dat de Belastingdienst de aangifte ontvangt." },
      { q: "Waarom kan het importeren van auto's interessant zijn?", a: "In het buitenland zijn vergelijkbare auto's vaak goedkoper dan in Nederland. Het prijsverschil kan groter zijn dan de BPM en transportkosten. Wij berekenen vooraf of import voor jou financieel interessant is." },
    ],
  },
  {
    category: "Het taxatierapport",
    questions: [
      { q: "Moet de taxateur de auto altijd in het echt zien?", a: "Ja, altijd. Zonder fysieke inspectie is de staat niet aantoonbaar en houdt het rapport bij een geschil niet stand." },
      { q: "Wat heb ik nodig voor een fysieke taxatie?", a: "De buitenlandse kentekenpapieren (deel I en deel II), de aankoopfactuur en het Certificaat van Overeenstemming (CVO). Een schone en droge auto met voldoende ruimte om foto's te maken. Bij technische schade ook een diagnose van een dealer of specialist. Let op: technische schade wordt alleen meegenomen als het geen essentieel gebrek betreft." },
      { q: "Moet ik met mijn auto naar jullie toe komen?", a: "Nee. Erik komt op locatie bij het voertuig, door heel Nederland. Taxeren op ons kantoor in Druten is ook mogelijk." },
      { q: "Hoe lang duurt het voor ik mijn rapport ontvang?", a: "Binnen drie werkdagen na de fysieke inspectie ontvang je het rapport digitaal." },
      { q: "Hoe lang is een taxatierapport geldig?", a: "Voor de BPM-aangifte is het rapport één maand geldig. Voor verzekeringen geldt doorgaans twee tot drie jaar, vraag dit na bij je verzekeraar." },
      { q: "Wat moet ik doen na ontvangst van het rapport?", a: "Print het rapport in kleur, vul de datum van de RDW-keuring in, onderteken het en voeg de aankoopfactuur toe. Stuur alles op naar: Belastingdienst, Postbus 2710, 6401 DE Heerlen." },
      { q: "Ik heb mijn BPM-aangifte digitaal ontvangen. Wat nu?", a: "Het is niet meer mogelijk om de aangifte fysiek af te geven bij de Belastingdienst. Stuur de aangifte met de bijbehorende documenten op naar: Belastingdienst, Postbus 2710, 6401 DE Heerlen." },
      { q: "Hoe herken ik een goede taxateur?", a: "Een erkende taxateur is geregistreerd bij VRT of TMV en werkt volgens vaste richtlijnen. Erik Elderson is bij beide registers ingeschreven en staat goed aangeschreven bij de Belastingdienst, RDW en verzekeraars." },
    ],
  },
  {
    category: "Campers",
    questions: [
      { q: "Kan ik voor mijn camper BPM-aangifte doen tegen de werkelijke waarde?", a: "Ja. Koerslijsten worden door de Belastingdienst niet geaccepteerd voor campers. Alleen de forfaitaire tabel of een taxatierapport zijn mogelijk. Met een taxatierapport wordt de werkelijke waarde vastgelegd." },
      { q: "Hoe werkt de BPM-berekening voor een camper?", a: "De bruto BPM wordt berekend op basis van de nieuwprijs van het onderstel, doorgaans een bestelwagen zoals een Fiat Ducato of Mercedes Sprinter. Afschrijving wordt berekend over zowel het onderstel als de opbouw." },
      { q: "Wat betekent een vaste taxatiewaarde voor mijn campertaxatie?", a: "Bij schade of total loss keert de verzekeraar de vooraf vastgestelde waarde uit in plaats van de dagwaarde. Dat geeft zekerheid, zeker bij een zelfbouwcamper of een camper met dure inbouw." },
      { q: "Ik wil mijn zelfbouwcamper laten taxeren. Waar moet ik op letten?", a: "Zorg dat alle facturen van de inbouw beschikbaar zijn. De taxateur beoordeelt de inbouw apart van het onderstel." },
      { q: "Moet ik met mijn camper naar jullie toe komen?", a: "Nee. Erik komt op locatie, door heel Nederland." },
    ],
  },
  {
    category: "Motoren",
    questions: [
      { q: "Waarom mijn motor laten taxeren?", a: "De standaard dagwaarde doet bij bijzondere of goed onderhouden motoren vaak geen recht aan de werkelijke waarde. Met een taxatierapport leg je de waarde vooraf vast." },
      { q: "Moet mijn motor WA-verzekerd worden getaxeerd?", a: "Ja, dat is verstandig. Een WA-verzekering dekt geen schade aan je eigen motor. Zonder taxatierapport heb je bij diefstal of total loss geen recht op een uitkering op basis van de werkelijke waarde." },
      { q: "Hoe vaak moet ik mijn motor laten taxeren?", a: "Doorgaans elke twee tot drie jaar. Vraag dit na bij je verzekeraar." },
      { q: "Is het nodig tijdens de restauratieperiode al een rapport te laten maken?", a: "Nee. Wacht tot de restauratie klaar is. De staat op de dag van taxatie is het uitgangspunt." },
    ],
  },
  {
    category: "Oldtimers en youngtimers",
    questions: [
      { q: "Waarom mijn oldtimer laten taxeren?", a: "Zonder taxatierapport keert de verzekeraar bij schade of diefstal de dagwaarde uit. Bij oldtimers ligt die vaak ver onder de werkelijke marktwaarde. Met een rapport stel je de waarde vooraf vast conform Artikel 7:960 BW." },
      { q: "Wat is een patinalook bij een oldtimer?", a: "Patina is de natuurlijke veroudering van lak en materialen door gebruik en leeftijd. Een oldtimer met authentieke patina kan juist meer waard zijn dan een volledig gerestaureerde auto. Dit wordt meegenomen in de taxatie." },
      { q: "Ik heb mijn oldtimer WA-verzekerd. Is taxeren toch zinvol?", a: "Ja. Een WA-verzekering dekt geen schade aan je eigen voertuig. Zonder rapport heb je bij eigen schade of diefstal geen recht op een uitkering op basis van de werkelijke waarde." },
      { q: "Wat is een youngtimer?", a: "Een youngtimer is een auto tussen de 15 en 30 jaar oud. Zakelijk interessant omdat je 35% bijtelling betaalt over de dagwaarde in plaats van de catalogusprijs." },
      { q: "Waarom is rijden in een youngtimer zakelijk interessant?", a: "Je betaalt 35% bijtelling over de werkelijke dagwaarde in plaats van de oorspronkelijke catalogusprijs. Bij een hoge catalogusprijs maar lage dagwaarde levert dat een aanzienlijke belastingbesparing op." },
      { q: "Hoe vaak moet ik mijn youngtimer laten taxeren?", a: "Doorgaans elke twee tot drie jaar voor de verzekering. Voor de bijtelling zodra de waarde significant veranderd is." },
    ],
  },
  {
    category: "WEV-taxatie",
    questions: [
      { q: "Wat is een WEV-taxatie?", a: "WEV staat voor Werkelijke Economische Waarde. Het is de marktwaarde van een voertuig op een specifiek moment, vastgesteld door een erkend taxateur. Wordt gebruikt als grondslag voor bijtelling, overgang zakelijk/privé, erfenis of echtscheiding." },
      { q: "Wanneer heb ik een WEV-taxatierapport nodig?", a: "Bij overgang van een voertuig van zakelijk naar privé of andersom, bij inbreng in een onderneming, bij erfenis of boedelverdeling, of voor de bijtelling van een youngtimer." },
      { q: "Kan mijn boekhouder de WEV ook vaststellen?", a: "Nee. Je boekhouder verwerkt de cijfers, maar is niet bevoegd om de waarde vast te stellen. Dat is een taak voor een erkend registertaxateur." },
    ],
  },
  {
    category: "Foodtrucks en caravans",
    questions: [
      { q: "Waarom mijn foodtruck laten taxeren?", a: "Bij schade of total loss wil je geen discussie met de verzekeraar over de uitkeringshoogte. Een taxatierapport legt de waarde vooraf vast, inclusief verbouwingen en inbouw." },
      { q: "Moet ik tijdens de restauratieperiode al een rapport laten maken?", a: "Nee. Wacht tot de foodtruck of caravan klaar is. De staat op de dag van taxatie is het uitgangspunt." },
      { q: "Waarom mijn oldtimer caravan laten taxeren?", a: "Bijzondere caravans stijgen in waarde, terwijl de dagwaarde in de verzekeringsadministratie achterloopt. Met een rapport verzeker je je voor de werkelijke waarde." },
    ],
  },
  {
    category: "Na de taxatie en controle",
    questions: [
      { q: "Betekent een betaalbericht dat de BPM akkoord is?", a: "Niet per definitie. De Belastingdienst is verplicht een betaalbericht te sturen voor het aangegeven bedrag. Na betaling heeft de Belastingdienst nog zes werkdagen om de auto op te roepen voor hertaxatie." },
      { q: "Ik heb een oproep gekregen van de Dienst Domeinen. Wat moet ik doen?", a: "De Belastingdienst kan BPM-aangiftes steekproefsgewijs controleren via de Dienst Domeinen. Een oproep is willekeurig en zegt niets over de kwaliteit van het rapport. Neem contact op, wij leggen de procedure uit." },
      { q: "Wat is een naheffingsaanslag BPM?", a: "Als de Belastingdienst het niet eens is met de aangegeven waarde, kan hij een naheffingsaanslag opleggen. Daartegen kun je binnen zes weken bezwaar maken. Waar nodig verwijzen wij je door naar gespecialiseerde juristen." },
      { q: "Tot wanneer kan ik een naheffingsaanslag krijgen?", a: "De Belastingdienst kan tot vijf jaar na je aangifte navorderen. In de praktijk gebeurt dit meestal binnen zes maanden na de inschrijving van het voertuig." },
      { q: "Kan de Belastingdienst een naheffing opleggen zonder de auto gezien te hebben?", a: "Ja. De Belastingdienst kan een naheffing opleggen of de auto oproepen voor hertaxatie zonder hem fysiek gezien te hebben. Bezwaar is mogelijk binnen zes weken na de dagtekening op het aanslagbiljet." },
      { q: "Komt er bij een naheffing altijd een boete?", a: "Niet automatisch. Een boete volgt alleen bij opzet of grove schuld." },
      { q: "Waarom staat er op het kenteken een ander BPM-bedrag dan ik betaald heb?", a: "Alleen bij nieuwe voertuigen staat het werkelijk betaalde bedrag in het kentekenregister. Bij gebruikte voertuigen wordt een herrekend bedrag op basis van de leeftijdskorting opgenomen." },
      { q: "Wat doe ik als de contrataxatie hoger uitvalt?", a: "Neem direct contact op. We kijken samen naar de onderbouwing en bepalen of bezwaar zinvol is. Waar nodig schakelen wij onze juridisch adviseur mr. Sascha Bothof in." },
      { q: "Heb je nog een vraag die hier niet tussen staat?", a: "Bel ons op 085 483 2461 of stuur een bericht via het contactformulier op automobieltaxaties.nl." },
    ],
  },
];

const categoryIds = faqItems.map((c) => c.category.toLowerCase().replace(/[^a-z]/g, "-"));

const FAQ = () => {
  const [openItems, setOpenItems] = useState<Record<string, boolean>>({});
  const [activeCategory, setActiveCategory] = useState(0);
  const sectionRefs = useRef<(HTMLDivElement | null)[]>([]);

  const toggleItem = (key: string) => {
    setOpenItems((prev) => ({ ...prev, [key]: !prev[key] }));
  };

  const scrollToCategory = (index: number) => {
    setActiveCategory(index);
    sectionRefs.current[index]?.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  return (
    <div className="min-h-screen bg-background">
      <PageMeta
        title="Veelgestelde Vragen over BPM en Taxaties | Automobiel Taxaties"
        description="Antwoorden op de meest gestelde vragen over BPM-aangifte, taxatierapporten, oldtimers, kosten en levertijden."
      />
      <SiteHeader />

      {/* Hero */}
      <section className="relative overflow-hidden flex items-center" style={{ height: 420, minHeight: 420, maxHeight: 420 }}>
        <div className="absolute inset-0">
          <img src={heroFaq} alt="" className="w-full h-full object-cover" />
          <div className="absolute inset-0" style={{ background: 'rgba(29,60,113,0.60)' }} />
        </div>
        <div className="max-w-7xl mx-auto px-6 lg:px-8 relative z-10 w-full">
          <div style={{ width: 32, height: 2, background: '#ff751f', marginBottom: 12 }} />
          <span
            className="inline-block mb-3"
            style={{ fontFamily: "'Inter', sans-serif", fontSize: 12, fontWeight: 500, letterSpacing: '0.1em', textTransform: 'uppercase', color: '#ff751f' }}
          >
            FAQ
          </span>
          <h1
            style={{ fontFamily: "'Playfair Display', serif", fontSize: 'clamp(32px, 4vw, 48px)', fontWeight: 700, lineHeight: 1.15, color: '#ffffff', maxWidth: 700 }}
          >
            Veelgestelde vragen
          </h1>
          <p style={{ fontFamily: "'Inter', sans-serif", fontSize: 17, color: 'rgba(255,255,255,0.9)', lineHeight: 1.7, maxWidth: 600, marginTop: 16 }}>
            Alles wat je wilt weten over BPM, verzekeringstaxatie, WEV en schadevaststelling.
          </p>
        </div>
      </section>

      <UspBar />
      <div style={{ height: 4, background: '#ff751f', width: '100%' }} />

      {/* FAQ two-column layout */}
      <section style={{ background: '#f7f8fa', padding: '80px 40px' }}>
        <div className="flex flex-col lg:flex-row" style={{ maxWidth: 1100, margin: '0 auto', gap: 32 }}>

          {/* Sidebar */}
          <aside className="lg:sticky lg:top-8 self-start shrink-0" style={{ flex: '0 0 28%' }}>
            <div style={{ background: '#ffffff', borderRadius: 10, boxShadow: '0 2px 10px rgba(0,0,0,0.07)', padding: 24 }}>
              <span
                className="block mb-4 font-bold uppercase"
                style={{ fontFamily: "'Inter', sans-serif", fontSize: 11, letterSpacing: '0.12em', color: '#8a9bb5' }}
              >
                Categorieën
              </span>
              <div className="space-y-1">
                {faqItems.map((cat, i) => (
                  <button
                    key={i}
                    onClick={() => scrollToCategory(i)}
                    className="block w-full text-left px-3 py-2.5 rounded-md text-sm transition-all"
                    style={{
                      fontFamily: "'Inter', sans-serif",
                      fontSize: 14,
                      fontWeight: activeCategory === i ? 600 : 400,
                      color: activeCategory === i ? '#ff751f' : '#4a5568',
                      borderLeft: activeCategory === i ? '3px solid #ff751f' : '3px solid transparent',
                      background: activeCategory === i ? 'rgba(255,117,31,0.06)' : 'transparent',
                    }}
                  >
                    {cat.category}
                  </button>
                ))}
              </div>

              <div style={{ height: 1, background: '#eef0f3', margin: '20px 0' }} />

              <div style={{ background: '#1d3c71', borderRadius: 8, padding: 20 }}>
                <p className="text-white font-semibold text-sm mb-3" style={{ fontFamily: "'Inter', sans-serif" }}>
                  Staat je vraag er niet bij?
                </p>
                <a href="tel:+31854832461" className="block">
                  <button
                    className="w-full inline-flex items-center justify-center gap-2 font-semibold text-sm rounded-md transition-colors"
                    style={{ height: 40, background: '#ff751f', color: '#ffffff', border: 'none', cursor: 'pointer' }}
                  >
                    <Phone className="w-4 h-4" />
                    Bel 085 483 2461
                  </button>
                </a>
              </div>
            </div>
          </aside>

          {/* Accordion content */}
          <div className="flex-1 min-w-0">
            {faqItems.map((category, catIndex) => (
              <div
                key={catIndex}
                ref={(el) => { sectionRefs.current[catIndex] = el; }}
                style={{ marginTop: catIndex === 0 ? 0 : 56 }}
              >
                {/* Category pill */}
                <div className="flex justify-center mb-6">
                  <span
                    className="inline-block font-bold text-white"
                    style={{
                      fontFamily: "'Playfair Display', serif",
                      fontSize: 18,
                      background: '#1d3c71',
                      borderRadius: 30,
                      padding: '10px 32px',
                    }}
                  >
                    {category.category}
                  </span>
                </div>

                {/* Question cards */}
                <div className="space-y-2">
                  {category.questions.map((item, qIndex) => {
                    const key = `${catIndex}-${qIndex}`;
                    const isOpen = openItems[key] || false;
                    return (
                      <div
                        key={qIndex}
                        style={{
                          background: '#ffffff',
                          borderRadius: 8,
                          boxShadow: '0 2px 8px rgba(0,0,0,0.06)',
                          borderLeft: isOpen ? '3px solid #ff751f' : '3px solid transparent',
                          transition: 'border-color 200ms ease',
                          overflow: 'hidden',
                        }}
                      >
                        <button
                          onClick={() => toggleItem(key)}
                          className="w-full flex items-center justify-between text-left gap-4"
                          style={{ padding: '20px 24px', cursor: 'pointer', background: 'none', border: 'none' }}
                        >
                          <span
                            className="font-semibold"
                            style={{ fontFamily: "'Inter', sans-serif", fontSize: 15, color: '#1d3c71', lineHeight: 1.5 }}
                          >
                            {item.q}
                          </span>
                          <ChevronDown
                            className="shrink-0 transition-transform duration-300"
                            style={{
                              width: 18,
                              height: 18,
                              color: '#698db3',
                              transform: isOpen ? 'rotate(180deg)' : 'rotate(0deg)',
                            }}
                          />
                        </button>
                        <div
                          style={{
                            maxHeight: isOpen ? 500 : 0,
                            opacity: isOpen ? 1 : 0,
                            overflow: 'hidden',
                            transition: 'max-height 300ms ease, opacity 200ms ease',
                          }}
                        >
                          <div style={{ padding: '0 24px 20px 24px' }}>
                            <p style={{ fontFamily: "'Inter', sans-serif", fontSize: 14, color: '#4a5568', lineHeight: 1.7 }}>
                              {item.a}
                            </p>
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA block */}
      <section className="py-16 md:py-20 px-6 md:px-8" style={{ background: '#1d3c71' }}>
        <div className="max-w-3xl mx-auto text-center">
          <h2
            className="font-bold text-white mb-4"
            style={{ fontFamily: "'Playfair Display', serif", fontSize: 'clamp(24px, 3vw, 36px)' }}
          >
            Staat je vraag er niet bij?
          </h2>
          <p className="mb-8" style={{ fontFamily: "'Inter', sans-serif", fontSize: 17, color: 'rgba(255,255,255,0.75)', lineHeight: 1.65 }}>
            Bel ons of stuur een bericht. Wij reageren binnen één werkdag.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link to="/contact">
              <Button variant="cta" size="lg">
                Contact opnemen
              </Button>
            </Link>
            <a href="tel:+31854832461">
              <button className="btn-outline-white">
                <Phone className="w-4 h-4" />
                085 483 2461
              </button>
            </a>
          </div>
        </div>
      </section>

      <SiteFooter />
      <WhatsAppButton />
    </div>
  );
};

export default FAQ;