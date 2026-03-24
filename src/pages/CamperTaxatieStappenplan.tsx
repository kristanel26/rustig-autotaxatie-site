import WhatsAppButton from "@/components/WhatsAppButton";
import SiteHeader from "@/components/SiteHeader";
import SiteFooter from "@/components/SiteFooter";
import PageMeta from "@/components/PageMeta";
import UspBar from "@/components/UspBar";
import { Link } from "react-router-dom";
import { ArrowRight, Info, Phone } from "lucide-react";
import heroCamperStappenplan from "@/assets/hero-camper-stappenplan.jpg";
import stepAanvraag from "@/assets/step-camper-aanvraag.jpg";
import stepFormulier from "@/assets/step-camper-formulier.jpg";
import stepInspectie from "@/assets/step-camper-inspectie.jpg";
import stepWaarde from "@/assets/step-camper-waarde.jpg";
import stepRapport from "@/assets/step-camper-rapport.jpg";
import stepVerzekering from "@/assets/step-camper-verzekering.jpg";

const steps: { number: number; title: string; image: string; content: React.ReactNode; cta?: { label: string; href: string } }[] = [
  {
    number: 1,
    image: stepAanvraag,
    title: "Aanvraag indienen",
    content: (
      <p>Vul het aanvraagformulier in op de website of bel ons op 085 483 2461. Geef het type camper, bouwjaar en het doel van de taxatie door. Wij nemen binnen één werkdag contact met jou op om een afspraak in te plannen.</p>
    ),
  },
  {
    number: 2,
    image: stepFormulier,
    title: "Online informatieformulier invullen",
    content: (
      <p>Jij kent jouw camper van binnen en buiten. Om een zo volledig en compleet mogelijk taxatierapport te maken, vragen wij je vooraf een online informatieformulier in te vullen. Hierin geef je informatie over de technische staat, aanpassingen, accessoires, beveiliging en eventuele verbouwingen. Heb je facturen van aangebrachte accessoires of uitgevoerde reparaties? Upload deze dan via het formulier. Lukt dit niet? Geen probleem, de taxateur bespreekt dit tijdens de inspectie met je door.</p>
    ),
    cta: { label: "Vul het informatieformulier in", href: "/camper-informatieformulier" },
  },
  {
    number: 3,
    image: stepInspectie,
    title: "Inspectie op locatie",
    content: (
      <p>Erik komt naar jouw camper toe, in het grootste gedeelte van Nederland. Tijdens de inspectie worden de staat, uitvoering, aanpassingen, zelfbouw en bijzonderheden opgenomen. Lakdiktemetingen worden uitgevoerd en er wordt een uitgebreid fotodossier aangelegd.</p>
    ),
  },
  {
    number: 4,
    image: stepWaarde,
    title: "Waarde vaststellen",
    content: (
      <p>Op basis van de inspectie, marktgegevens en de staat van de camper wordt de taxatiewaarde vastgesteld. Aanpassingen, accessoires en zelfbouw worden meegenomen in de waardering.</p>
    ),
  },
  {
    number: 5,
    image: stepRapport,
    title: "Rapport opstellen",
    content: (
      <p>Het taxatierapport wordt digitaal opgesteld. Het rapport bevat de vastgestelde waarde, een fotodossier, lakdiktemeting en een beschrijving van de staat van de camper. Het rapport is opgesteld door een erkend taxateur.</p>
    ),
  },
  {
    number: 6,
    image: stepVerzekering,
    title: "Verzekering regelen",
    content: (
      <p>Met het taxatierapport ga je naar jouw verzekeraar. De verzekering wordt afgesloten op de getaxeerde waarde. Zo ben je bij schade of diefstal verzekerd voor de werkelijke waarde van jouw camper, niet de dagwaarde.</p>
    ),
  },
];
const CamperTaxatieStappenplan = () => {
  return (
    <>
      <PageMeta
        title="Stappenplan Campertaxatie | Automobiel Taxaties"
        description="Van aanvraag tot rapport. Zo verloopt de verzekeringstaxatie van jouw camper. Bekijk het volledige stappenplan."
      />
      <SiteHeader />

      {/* Hero */}
      <section className="relative overflow-hidden flex items-center" style={{ height: 420, minHeight: 420, maxHeight: 420 }}>
        <div className="absolute inset-0">
          <img src={heroCamperStappenplan} alt="" className="w-full h-full object-cover" />
          <div className="absolute inset-0" style={{ background: 'rgba(29,60,113,0.60)' }} />
        </div>
        <div className="max-w-7xl mx-auto px-6 lg:px-8 py-20 md:py-28 relative z-10">
          <p className="text-white/70 text-sm font-medium tracking-wider uppercase mb-4">VERZEKERINGSTAXATIE CAMPER</p>
          <h1
            className="text-white font-bold mb-6"
            style={{ fontFamily: "'Playfair Display', serif", fontSize: 'clamp(2rem, 4vw, 3.2rem)', lineHeight: 1.15 }}
          >
            Zo verloopt de campertaxatie
          </h1>
          <p className="text-white/80 text-lg max-w-[550px] mb-8" style={{ lineHeight: 1.7 }}>
            Van aanvraag tot rapport. Wij regelen het op locatie bij jou.
          </p>
          <div className="flex flex-col sm:flex-row gap-3">
            <Link to="/camper-taxatie">
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
              {/* Step number + text */}
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
                  {step.cta && (
                    <Link to={step.cta.href} className="inline-block mt-4">
                      <button
                        className="flex items-center gap-2 rounded-lg border-2 px-5 py-2.5 text-sm font-semibold transition-colors"
                        style={{ borderColor: '#ff751f', color: '#ff751f' }}
                        onMouseEnter={e => { e.currentTarget.style.background = '#ff751f'; e.currentTarget.style.color = '#fff'; }}
                        onMouseLeave={e => { e.currentTarget.style.background = 'transparent'; e.currentTarget.style.color = '#ff751f'; }}
                      >
                        {step.cta.label}
                        <ArrowRight className="w-4 h-4" />
                      </button>
                    </Link>
                  )}
                </div>
              </div>
              {/* Image */}
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
            <p className="mb-2">Aanpassingen en zelfbouw worden alleen meegenomen als je de facturen of documentatie kunt overleggen.</p>
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
            Zekerheid over de waarde van jouw camper?
          </h2>
          <p className="text-white/80 text-lg mb-8">
            Vraag vrijblijvend een verzekeringstaxatie aan.
          </p>
          <Link to="/camper-taxatie">
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

export default CamperTaxatieStappenplan;