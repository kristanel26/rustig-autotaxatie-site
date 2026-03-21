import WhatsAppButton from "@/components/WhatsAppButton";
import SiteHeader from "@/components/SiteHeader";
import SiteFooter from "@/components/SiteFooter";
import PageMeta from "@/components/PageMeta";
import UspBar from "@/components/UspBar";
import { Link } from "react-router-dom";
import { ArrowRight, Info, Phone } from "lucide-react";
import heroImage from "@/assets/hero-verzekeringstaxatie.png";
import stepAanvraag from "@/assets/step-aanvraag.jpg";
import stepAdvies from "@/assets/step-advies.png";
import stepInspectie from "@/assets/step-inspectie.png";
import stepRapport from "@/assets/step-rapport.png";
import stepWaarde from "@/assets/step-camper-waarde.jpg";
import stepRegelen from "@/assets/step-regelen.png";

const steps: { number: number; title: string; image: string; content: React.ReactNode }[] = [
  {
    number: 1,
    image: stepAanvraag,
    title: "Aanvraag indienen",
    content: (
      <p>Vul het aanvraagformulier in op de website of bel ons. Geef het type voertuig, bouwjaar en het doel van de taxatie door. Wij nemen binnen één werkdag contact met je op om een afspraak in te plannen.</p>
    ),
  },
  {
    number: 2,
    image: stepAdvies,
    title: "Advies en bevestiging",
    content: (
      <p>Erik beoordeelt de aanvraag en geeft direct advies over de taxatiewaarde en de beste aanpak. Na bevestiging ontvang je een afspraakbevestiging per e-mail met alle details.</p>
    ),
  },
  {
    number: 3,
    image: stepInspectie,
    title: "Fysieke inspectie op locatie",
    content: (
      <p>Erik komt naar jouw voertuig toe. Tijdens de inspectie worden de staat, uitvoering, aanpassingen en bijzonderheden opgenomen. Lakdiktemetingen worden uitgevoerd en er wordt een uitgebreid fotodossier aangelegd.</p>
    ),
  },
  {
    number: 4,
    image: stepWaarde,
    title: "Waarde vaststellen",
    content: (
      <p>Op basis van de inspectie, marktgegevens en de staat van het voertuig wordt de taxatiewaarde vastgesteld. Aanpassingen, restauraties en bijzonderheden worden meegenomen in de waardering.</p>
    ),
  },
  {
    number: 5,
    image: stepRapport,
    title: "Rapport digitaal ontvangen",
    content: (
      <p>Het taxatierapport wordt digitaal opgesteld en per e-mail toegestuurd. Het rapport bevat de vastgestelde waarde, een fotodossier, lakdiktemeting en een beschrijving van de staat. Opgesteld door een erkend taxateur, geaccepteerd door verzekeraars.</p>
    ),
  },
  {
    number: 6,
    image: stepRegelen,
    title: "Verzekering regelen",
    content: (
      <p>Met het taxatierapport ga je naar je verzekeraar. De verzekering wordt afgesloten op de getaxeerde waarde. Zo ben je bij schade of diefstal verzekerd voor de werkelijke waarde van je voertuig.</p>
    ),
  },
];

const VerzekeringstaxatieStappenplan = () => {
  return (
    <>
      <PageMeta
        title="Stappenplan Verzekeringstaxatie | Automobiel Taxaties"
        description="Van aanvraag tot rapport. Zo verloopt de verzekeringstaxatie. Bekijk het volledige stappenplan."
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
            VERZEKERINGSTAXATIE
          </p>
          <h1
            className="text-white font-bold mb-6"
            style={{ fontFamily: "'Playfair Display', serif", fontSize: 'clamp(2rem, 4vw, 3.2rem)', lineHeight: 1.15 }}
          >
            Zo verloopt de verzekeringstaxatie
          </h1>
          <p className="text-white/80 text-lg max-w-[550px] mb-8" style={{ lineHeight: 1.7 }}>
            Van aanvraag tot rapport.<br />Wij regelen het op locatie bij jou.
          </p>
          <div className="flex flex-col sm:flex-row gap-3">
            <Link to="/verzekeringstaxatie-info">
              <button className="btn-cta flex items-center gap-2">
                Verzekeringstaxatie aanvragen
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

      {/* Steps label */}
      <div className="max-w-5xl mx-auto px-6 lg:px-8 pt-16 pb-4">
        <p className="uppercase text-[11px] font-semibold tracking-[0.15em] mb-2" style={{ color: '#ff751f' }}>STAPPENPLAN</p>
        <h2 className="text-[28px] md:text-[32px] font-bold" style={{ color: '#1d3c71', fontFamily: "'Playfair Display', serif" }}>
          Van aanvraag tot rapport
        </h2>
      </div>

      {/* Steps Timeline */}
      {steps.map((step, i) => (
        <section
          key={step.number}
          className="py-12 md:py-16"
          style={{ background: i % 2 === 1 ? '#f7f8fa' : '#ffffff' }}
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

      {/* Info block */}
      <div className="max-w-5xl mx-auto px-6 lg:px-8 py-8">
        <div
          className="rounded-xl p-6 flex gap-4 items-start"
          style={{ background: '#EBF2FB', borderLeft: '4px solid #1d3c71' }}
        >
          <Info className="w-6 h-6 shrink-0 mt-0.5" style={{ color: '#1d3c71' }} />
          <div className="text-sm leading-relaxed" style={{ color: '#1d3c71' }}>
            <p className="mb-2">Het taxatierapport is 2 tot 3 jaar geldig. Check bij jouw verzekeraar naar de exacte geldigheidsduur.</p>
            <p className="mb-2">Aanpassingen en restauraties worden alleen meegenomen als je de facturen of documentatie kunt overleggen.</p>
            <p>Wil je zekerheid over de waarde? Plan de taxatie voordat je de verzekering afsluit.</p>
          </div>
        </div>
      </div>

      {/* Dark blue CTA block */}
      <section className="py-16 md:py-20" style={{ background: '#1d3c71' }}>
        <div className="max-w-3xl mx-auto px-6 lg:px-8 text-center">
          <h2
            className="text-white font-bold mb-6"
            style={{ fontFamily: "'Playfair Display', serif", fontSize: 'clamp(1.5rem, 3vw, 2.2rem)' }}
          >
            Zekerheid over de waarde van je voertuig?
          </h2>
          <p className="text-white/80 text-lg mb-8">
            Vraag vrijblijvend een verzekeringstaxatie aan.
          </p>
          <Link to="/verzekeringstaxatie-info">
            <button className="btn-cta flex items-center gap-2 mx-auto">
              Verzekeringstaxatie aanvragen
              <ArrowRight className="w-4 h-4" />
            </button>
          </Link>
        </div>
      </section>

      <SiteFooter />
      <WhatsAppButton />
    </>
  );
};

export default VerzekeringstaxatieStappenplan;
