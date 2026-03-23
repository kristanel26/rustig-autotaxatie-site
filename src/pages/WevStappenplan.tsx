import WhatsAppButton from "@/components/WhatsAppButton";
import SiteHeader from "@/components/SiteHeader";
import SiteFooter from "@/components/SiteFooter";
import PageMeta from "@/components/PageMeta";
import UspBar from "@/components/UspBar";
import IntakeForm from "@/components/IntakeForm";
import ContactSidebar from "@/components/ContactSidebar";
import { Link } from "react-router-dom";
import { ArrowRight, Info, Phone, CheckCircle, Clock, AlertTriangle, Shield } from "lucide-react";
import heroImage from "@/assets/hero-verzekeringstaxatie.png";
import stepAanvraag from "@/assets/step-aanvraag.png";
import stepAdvies from "@/assets/step-advies.png";
import stepInspectie from "@/assets/step-inspectie.png";
import stepRapport from "@/assets/step-rapport.png";
import stepWaarde from "@/assets/step-camper-waarde.jpg";

const CheckItem = ({ text }: { text: string }) => (
  <li className="flex items-start gap-3">
    <div className="w-[22px] h-[22px] rounded-full flex items-center justify-center flex-shrink-0 mt-0.5" style={{ background: 'rgba(255,117,31,0.12)' }}>
      <CheckCircle className="w-[14px] h-[14px]" style={{ color: '#ff751f' }} />
    </div>
    <span className="text-[15px]" style={{ color: '#4a5568' }}>{text}</span>
  </li>
);

const steps: { number: number; title: string; image: string; content: React.ReactNode }[] = [
  {
    number: 1,
    image: stepAanvraag,
    title: "Je neemt contact op",
    content: (
      <p>Maak een afspraak voor je WEV-taxatie. Dat kan telefonisch via 085 483 2461 of per e-mail via algemeen@automobieltaxaties.nl. We bespreken jouw situatie: gaat het om een overdracht van zaak naar privé, privé naar zaak, of iets anders? Op basis daarvan plannen we de taxatie.</p>
    ),
  },
  {
    number: 2,
    image: stepInspectie,
    title: "Wij taxeren jouw voertuig op locatie",
    content: (
      <div>
        <p className="mb-4">Je laat je voertuig op locatie taxeren. Thuis, op je bedrijfsadres of bij een garage. Onze taxateur beoordeelt het voertuig van binnen en van buiten en maakt een volledig fotodossier. De staat op de dag van taxatie is bepalend voor de waarde.</p>
        <ul className="space-y-2">
          <CheckItem text="Visuele inspectie van carrosserie en interieur" />
          <CheckItem text="Controle op beschadigingen, krassen en deuken" />
          <CheckItem text="Fotodossier van het voertuig" />
        </ul>
      </div>
    ),
  },
  {
    number: 3,
    image: stepAdvies,
    title: "Wat hebben wij van je nodig?",
    content: (
      <div>
        <p className="mb-4">Om de taxatie goed te kunnen uitvoeren hebben we een aantal gegevens nodig. Zorg dat je het volgende bij de hand hebt:</p>
        <ul className="space-y-2">
          <CheckItem text="Je NAW-gegevens (naam, adres, woonplaats)" />
          <CheckItem text="De kentekencard van het voertuig" />
          <CheckItem text="Het onderhoudsboekje (indien aanwezig)" />
          <CheckItem text="Facturen van onderhoud, herstel- of revisiewerkzaamheden (indien aanwezig)" />
          <CheckItem text="Informatie over de fiscale context: bijv. zakelijk naar privé" />
        </ul>
      </div>
    ),
  },
  {
    number: 4,
    image: stepWaarde,
    title: "Onderzoek naar de waarde",
    content: (
      <div>
        <p className="mb-4">Na de inspectie doen wij onderzoek naar de marktwaarde van het voertuig. We raadplegen erkende koerslijsten en wegen de kilometerstand, uitvoering, courantheid en geconstateerde beschadigingen mee. Alle bevindingen worden verwerkt tot een compleet, controleerbaar taxatierapport.</p>
        <div className="rounded-lg p-4 mt-4" style={{ background: '#EBF2FB' }}>
          <p className="text-sm" style={{ color: '#1d3c71' }}>Wij zijn geregistreerd bij Federatie TMV en VRT Register. Dat betekent dat ons rapport erkend en fiscaal verdedigbaar is.</p>
        </div>
      </div>
    ),
  },
  {
    number: 5,
    image: stepRapport,
    title: "Je ontvangt het digitale rapport",
    content: (
      <div>
        <p className="mb-4">Je ontvangt het volledige, ondertekende taxatierapport digitaal binnen 3 werkdagen na de inspectie. Het rapport is direct bruikbaar voor je administratie of aangifte bij de Belastingdienst. Stuur het door naar je accountant of gebruik het als onderbouwing bij de overdracht.</p>
        <ul className="space-y-2">
          <CheckItem text="Rapport digitaal binnen 3 werkdagen" />
          <CheckItem text="Volledig ondertekend door erkend taxateur" />
          <CheckItem text="Direct bruikbaar voor administratie en aangifte" />
        </ul>
      </div>
    ),
  },
];

const WevStappenplan = () => {
  return (
    <>
      <PageMeta
        title="Stappenplan WEV-taxatie | Automobiel Taxaties"
        description="Van aanvraag tot taxatierapport. Zo verloopt de WEV-taxatie. Bekijk het volledige stappenplan."
      />
      <SiteHeader />

      {/* Hero */}
      <section className="relative overflow-hidden flex items-center" style={{ height: 420, minHeight: 420, maxHeight: 420 }}>
        <div className="absolute inset-0">
          <img src={heroImage} alt="" className="w-full h-full object-cover" />
          <div className="absolute inset-0" style={{ background: 'linear-gradient(to right, rgba(29,60,113,0.85) 0%, rgba(29,60,113,0.85) 40%, rgba(29,60,113,0.55) 70%, rgba(29,60,113,0.25) 100%)' }} />
        </div>
        <div className="max-w-7xl mx-auto px-6 lg:px-8 py-20 md:py-28 relative z-10">
          <div style={{ width: 32, height: 2, background: '#ff751f', marginBottom: 12 }} />
          <p style={{ fontFamily: "'Inter', sans-serif", fontSize: 12, fontWeight: 500, letterSpacing: '0.1em', textTransform: 'uppercase', color: '#ff751f' }} className="mb-4">
            WEV TAXATIE
          </p>
          <h1
            className="text-white font-bold mb-6"
            style={{ fontFamily: "'Playfair Display', serif", fontSize: 'clamp(2rem, 4vw, 3.2rem)', lineHeight: 1.15 }}
          >
            Stappenplan WEV-taxatie
          </h1>
          <p className="text-white/80 text-lg max-w-[550px] mb-8" style={{ lineHeight: 1.7 }}>
            Van aanvraag tot taxatierapport.<br />Wij begeleiden je stap voor stap.
          </p>
          <div className="flex flex-col sm:flex-row gap-3">
            <Link to="/wev-taxatie">
              <button className="btn-cta flex items-center gap-2">
                WEV-taxatie aanvragen
                <ArrowRight className="w-4 h-4" />
              </button>
            </Link>
            <a href="tel:+31854832461">
              <button className="btn-outline-white">
                <Phone className="w-5 h-5" />
                085 483 2461
              </button>
            </a>
          </div>
        </div>
      </section>
      <UspBar />

      {/* Intro */}
      <section className="py-14 md:py-16 px-6 md:px-8 bg-background">
        <div className="max-w-3xl mx-auto text-center">
          <p className="uppercase text-[12px] font-semibold tracking-[0.15em] mb-2" style={{ color: '#ff751f', fontFamily: "'Inter', sans-serif" }}>HOE HET WERKT</p>
          <h2 className="text-[28px] md:text-[32px] font-bold mb-4" style={{ color: '#1d3c71', fontFamily: "'Playfair Display', serif" }}>
            Heb je vragen over een WEV-taxatie?
          </h2>
          <p className="text-[15px] max-w-[640px] mx-auto mb-6" style={{ color: '#4a5568' }}>
            Bel ons op 085 483 2461 of stuur een e-mail naar algemeen@automobieltaxaties.nl. We beantwoorden je vraag en plannen de taxatie op een moment dat jou uitkomt.
          </p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <a href="tel:+31854832461">
              <button className="btn-cta flex items-center gap-2">
                <Phone className="w-4 h-4" />
                085 483 2461
              </button>
            </a>
            <a href="mailto:algemeen@automobieltaxaties.nl">
              <button className="px-6 py-3 rounded-[7px] font-semibold text-sm border-2 transition-colors" style={{ borderColor: '#1d3c71', color: '#1d3c71', background: 'transparent' }}>
                algemeen@automobieltaxaties.nl
              </button>
            </a>
          </div>
        </div>
      </section>

      {/* Steps label */}
      <div className="max-w-5xl mx-auto px-6 lg:px-8 pt-16 pb-4" style={{ background: '#f7f8fa' }}>
        <p className="uppercase text-[11px] font-semibold tracking-[0.15em] mb-2" style={{ color: '#ff751f' }}>WERKWIJZE</p>
        <h2 className="text-[28px] md:text-[32px] font-bold" style={{ color: '#1d3c71', fontFamily: "'Playfair Display', serif" }}>
          In 5 stappen naar jouw WEV-taxatierapport
        </h2>
      </div>

      {/* Steps Timeline */}
      {steps.map((step, i) => (
        <section
          key={step.number}
          className="py-12 md:py-16"
          style={{ background: i % 2 === 0 ? '#f7f8fa' : '#ffffff' }}
        >
          <div className="max-w-5xl mx-auto px-6 lg:px-8">
            <div className="flex flex-col md:flex-row md:items-start gap-6 md:gap-10">
              <div className="flex gap-5 md:gap-6 flex-1 min-w-0">
                <div className="shrink-0">
                  <div
                    className="w-12 h-12 rounded-full flex items-center justify-center text-white font-bold text-lg"
                    style={{ background: '#1d3c71' }}
                  >
                    {step.number}
                  </div>
                </div>
                <div className="flex-1">
                  <h2 className="text-xl md:text-2xl font-bold mb-4" style={{ color: '#1d3c71', fontFamily: "'Playfair Display', serif" }}>
                    {step.title}
                  </h2>
                  <div className="text-foreground/80 leading-relaxed">
                    {step.content}
                  </div>
                </div>
              </div>
              <div className="shrink-0 md:w-[360px] h-[240px]">
                <img
                  src={step.image}
                  alt={step.title}
                  className="w-full h-full rounded-lg shadow-md object-cover"
                  loading="lazy"
                />
              </div>
            </div>
          </div>
        </section>
      ))}

      {/* Three info cards */}
      <section className="py-14 md:py-16 px-6 md:px-8 bg-background">
        <div className="max-w-5xl mx-auto">
          <div className="grid sm:grid-cols-3 gap-5">
            {[
              { icon: Clock, title: "Rapport binnen 3 werkdagen", desc: "Na de fysieke inspectie ontvang je het rapport digitaal. Klaar voor gebruik bij je accountant of de Belastingdienst." },
              { icon: AlertTriangle, title: "De staat op taxatiedatum is bepalend", desc: "Werkzaamheden moeten vóór de taxatiedatum zijn uitgevoerd. Zo blijft het rapport fiscaal verdedigbaar." },
              { icon: Shield, title: "Bij geschil staan wij voor je klaar", desc: "Ons rapport is stevig onderbouwd. Bij vragen van de Belastingdienst helpen wij je met de onderbouwing." },
            ].map((card, i) => (
              <div key={i} className="bg-white rounded-[10px] p-6" style={{ boxShadow: '0 4px 16px rgba(0,0,0,0.08)' }}>
                <div className="w-[48px] h-[48px] rounded-full flex items-center justify-center mb-4" style={{ background: '#EBF2FB' }}>
                  <card.icon className="w-[22px] h-[22px]" style={{ color: '#1d3c71' }} />
                </div>
                <h3 className="font-bold text-[15px] mb-2" style={{ fontFamily: "'Inter', sans-serif", color: '#1d3c71' }}>{card.title}</h3>
                <p style={{ fontFamily: "'Inter', sans-serif", fontSize: 13, color: '#666', lineHeight: 1.65 }}>{card.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Dark blue CTA block */}
      <section className="py-16 md:py-20" style={{ background: 'linear-gradient(135deg, #1d3c71 0%, #2a4f8a 100%)' }}>
        <div className="max-w-3xl mx-auto px-6 lg:px-8 text-center">
          <h2
            className="text-white font-bold mb-6"
            style={{ fontFamily: "'Playfair Display', serif", fontSize: 'clamp(1.5rem, 3vw, 2.2rem)' }}
          >
            Klaar om jouw WEV-taxatie aan te vragen?
          </h2>
          <p className="text-white/80 text-lg mb-8">
            Vraag vrijblijvend aan. Wij plannen de taxatie op basis van jouw situatie.
          </p>
          <Link to="/wev-taxatie">
            <button className="btn-cta flex items-center gap-2 mx-auto">
              WEV-taxatie aanvragen
              <ArrowRight className="w-4 h-4" />
            </button>
          </Link>
        </div>
      </section>

      {/* Formulier */}
      <section className="py-14 md:py-16 px-6 md:px-8 bg-background">
        <div className="container-wide">
          <div className="text-center mb-8">
            <p className="uppercase text-[12px] font-semibold tracking-[0.15em] mb-2" style={{ color: '#ff751f', fontFamily: "'Inter', sans-serif" }}>AANVRAGEN</p>
            <h2 className="heading-display text-2xl md:text-3xl font-bold mb-2" style={{ color: '#1d3c71' }}>WEV-taxatie aanvragen</h2>
            <p className="text-[15px] max-w-2xl mx-auto" style={{ color: '#4a5568' }}>
              Vul het formulier in en wij plannen de taxatie op basis van de aangeleverde informatie.
            </p>
          </div>
          <div className="grid md:grid-cols-[1fr_380px] gap-8">
            <div>
              <IntakeForm
                serviceType="WEV-taxatie"
                formTitle="WEV-taxatie aanvragen"
                toelichtingPlaceholder="Geef hier de beschikbare informatie over het voertuig en de fiscale context."
                submitButtonText="WEV-taxatie aanvragen"
              />
            </div>
            <ContactSidebar />
          </div>
        </div>
      </section>

      <SiteFooter />
      <WhatsAppButton />
    </>
  );
};

export default WevStappenplan;
