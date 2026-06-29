import Breadcrumbs from "@/components/Breadcrumbs";
import WhatsAppButton from "@/components/WhatsAppButton";
import SiteHeader from "@/components/SiteHeader";
import SiteFooter from "@/components/SiteFooter";
import PageMeta from "@/components/PageMeta";
import UspBar from "@/components/UspBar";
import { Link } from "react-router-dom";
import { ArrowRight, Info, Phone, CheckCircle } from "lucide-react";
import heroOldtimerAsset from "@/assets/hero-oldtimer.png.asset.json";
const heroOldtimer = heroOldtimerAsset.url;
import stepOldtimerAanvraag from "@/assets/step-oldtimer-aanvraag.png";
import stepOldtimerAdvies from "@/assets/step-advies.png";
import stepOldtimerInspectie from "@/assets/step-oldtimer-inspectie.png";
import stepOldtimerWaarde from "@/assets/step-oldtimer-marktwaarde.png";
import stepOldtimerRapportAsset from "@/assets/step-oldtimer-rapport.png.asset.json";
const stepOldtimerRapport = stepOldtimerRapportAsset.url;
import stepOldtimerRegelen from "@/assets/step-oldtimer-verzekering.png";

const steps: { number: number; title: string; image: string; content: React.ReactNode }[] = [
  {
    number: 1,
    image: stepOldtimerAanvraag,
    title: "Aanvraag indienen",
    content: (
      <p>Vul het aanvraagformulier in of bel ons. Geef merk, type, bouwjaar en de bijzonderheden van jouw klassieker door, samen met het doel van de taxatie. Wij plannen binnen één werkdag een afspraak in.</p>
    ),
  },
  {
    number: 2,
    image: stepOldtimerAdvies,
    title: "Advies en bevestiging",
    content: (
      <p>Erik beoordeelt de aanvraag en bespreekt vooraf de belangrijke aandachtspunten van jouw oldtimer: originaliteit, restauratiehistorie en eventuele matching numbers. Na bevestiging ontvang je de afspraakbevestiging per e-mail.</p>
    ),
  },
  {
    number: 3,
    image: stepOldtimerInspectie,
    title: "Fysieke inspectie op locatie",
    content: (
      <p>Erik komt naar jouw klassieker toe. Originaliteit, lakkwaliteit, plaatwerk en technische staat worden beoordeeld. Er worden lakdiktemetingen uitgevoerd en een uitgebreid fotodossier aangelegd, inclusief detailfoto's van typenummers en bijzonderheden.</p>
    ),
  },
  {
    number: 4,
    image: stepOldtimerWaarde,
    title: "Marktwaarde bepalen",
    content: (
      <p>De waarde van jouw oldtimer wordt bepaald op basis van marktdata uit binnen- en buitenland, vergelijkbare verkopen, zeldzaamheid en de werkelijke staat. Originaliteit en uitgevoerde restauraties wegen zwaar mee in de uiteindelijke marktwaarde.</p>
    ),
  },
  {
    number: 5,
    image: stepOldtimerRapport,
    title: "FEHAC-erkend rapport digitaal ontvangen",
    content: (
      <p>Het taxatierapport wordt digitaal opgesteld en per e-mail toegestuurd. Het is een FEHAC-erkend rapport, geaccepteerd door alle klassiekerverzekeraars en voorzien van fotodossier, lakdiktemeting en een onderbouwde beschrijving van de staat.</p>
    ),
  },
  {
    number: 6,
    image: stepOldtimerRegelen,
    title: "Verzekering regelen",
    content: (
      <p>Met het rapport sluit je bij jouw klassiekerverzekeraar een polis af op de getaxeerde waarde. Bij schade of diefstal ben je verzekerd voor de werkelijke marktwaarde van jouw oldtimer, niet voor een lage dagwaarde.</p>
    ),
  },
];

const OldtimerTaxatieStappenplan = () => {
  return (
    <>
      <PageMeta
        title="Oldtimertaxatie stappenplan | Automobiel Taxaties"
        description="Zo verloopt de taxatie van jouw klassieker, van aanvraag tot erkend rapport. Erik komt op locatie voor een fysieke inspectie."
      />
      <SiteHeader />
      <Breadcrumbs items={[{ label: "Oldtimertaxatie", href: "/oldtimer-taxatie" }, { label: "Stappenplan" }]} />

      <section className="relative overflow-hidden flex items-center" style={{ height: 420, minHeight: 420, maxHeight: 420 }}>
        <div className="absolute inset-0">
          <img src={heroOldtimer} alt="Stappenplan oldtimertaxatie aanvragen" className="w-full h-full object-cover" />
          <div className="absolute inset-0" style={{ background: 'linear-gradient(to right, rgba(29,60,113,0.85) 0%, rgba(29,60,113,0.85) 40%, rgba(29,60,113,0.55) 70%, rgba(29,60,113,0.25) 100%)' }} />
        </div>
        <div className="max-w-7xl mx-auto px-6 lg:px-8 py-20 md:py-28 relative z-10">
          <div style={{ width: 32, height: 2, background: '#ff751f', marginBottom: 12 }} />
          <p style={{ fontFamily: "'Inter', sans-serif", fontSize: 12, fontWeight: 500, letterSpacing: '0.1em', textTransform: 'uppercase', color: '#ff751f' }} className="mb-4">
            OLDTIMERTAXATIE
          </p>
          <h1 className="text-white font-bold mb-6" style={{ fontFamily: "'Playfair Display', serif", fontSize: 'clamp(2rem, 4vw, 3.2rem)', lineHeight: 1.15 }}>
            Zo verloopt de oldtimertaxatie
          </h1>
          <p className="text-white/80 text-lg max-w-[550px] mb-8" style={{ lineHeight: 1.7 }}>
            Van aanvraag tot FEHAC-erkend rapport.<br />Erik komt op locatie bij jou.
          </p>
          <div className="flex flex-col sm:flex-row gap-3">
            <Link to="/oldtimer-taxatie">
              <button className="btn-cta flex items-center gap-2">
                Oldtimertaxatie aanvragen
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

      <div className="max-w-5xl mx-auto px-6 lg:px-8 pt-16 pb-4">
        <p className="uppercase text-[11px] font-semibold tracking-[0.15em] mb-2" style={{ color: '#ff751f' }}>STAPPENPLAN</p>
        <h2 className="text-[28px] md:text-[32px] font-bold" style={{ color: '#1d3c71', fontFamily: "'Playfair Display', serif" }}>
          Van aanvraag tot erkend rapport
        </h2>
      </div>

      {steps.map((step, i) => (
        <section key={step.number} className="py-12 md:py-16" style={{ background: i % 2 === 1 ? '#f7f8fa' : '#ffffff' }}>
          <div className="max-w-5xl mx-auto px-6 lg:px-8">
            <div className="flex flex-col md:flex-row md:items-start gap-6 md:gap-10">
              <div className="flex gap-5 md:gap-6 flex-1 min-w-0">
                <div className="shrink-0">
                  <div className="w-12 h-12 rounded-full flex items-center justify-center text-white font-bold text-lg" style={{ background: '#1d3c71' }}>
                    {step.number}
                  </div>
                </div>
                <div className="flex-1">
                  <h2 className="text-xl md:text-2xl font-bold mb-4" style={{ color: '#1d3c71', fontFamily: "'Playfair Display', serif" }}>
                    {step.title}
                  </h2>
                  <div className="text-foreground/80 leading-relaxed">{step.content}</div>
                </div>
              </div>
              <div className="shrink-0 md:w-[360px] h-[240px]">
                <img src={step.image} alt={step.title} className="w-full h-full rounded-lg shadow-md object-cover" loading="lazy" />
              </div>
            </div>
          </div>
        </section>
      ))}

      <section className="py-14 md:py-16 px-6 md:px-8 bg-white">
        <div className="max-w-5xl mx-auto">
          <div className="grid md:grid-cols-2 gap-12">
            <div>
              <div className="mb-3" style={{ width: 40, height: 4, background: '#ff751f', borderRadius: 2 }} />
              <h3 className="font-bold mb-6" style={{ fontFamily: 'Playfair Display, serif', fontSize: 20, color: '#1d3c71', fontWeight: 700 }}>Wat kun je verwachten?</h3>
              <div className="flex flex-col gap-[10px]">
                {[
                  "Originaliteit en staat worden grondig beoordeeld",
                  "Restauraties en matching numbers worden gewogen",
                  "Marktwaarde wordt onderbouwd met vergelijkbare verkopen",
                  "FEHAC-erkend rapport, geaccepteerd door klassiekerverzekeraars",
                ].map((item, i) => (
                  <div key={i} className="flex items-center gap-4 bg-white" style={{ borderRadius: 10, padding: '16px 20px', boxShadow: '0 2px 12px rgba(0,0,0,0.06)' }}>
                    <CheckCircle className="w-[22px] h-[22px] flex-shrink-0" style={{ color: '#ff751f' }} />
                    <span className="text-[15px] leading-normal" style={{ fontFamily: 'Inter, sans-serif', color: '#1a1a1a' }}>{item}</span>
                  </div>
                ))}
              </div>
            </div>
            <div>
              <div className="mb-3" style={{ width: 40, height: 4, background: '#ff751f', borderRadius: 2 }} />
              <h3 className="font-bold mb-6" style={{ fontFamily: 'Playfair Display, serif', fontSize: 20, color: '#1d3c71', fontWeight: 700 }}>Wat hebben wij nodig?</h3>
              <div className="flex flex-col gap-[10px]">
                {[
                  "Jouw naam en contactgegevens",
                  "De kentekencard van de oldtimer",
                  "Restauratiehistorie en facturen (indien aanwezig)",
                  "Bijzonderheden zoals matching numbers of zeldzame opties",
                ].map((item, i) => (
                  <div key={i} className="flex items-center gap-4 bg-white" style={{ borderRadius: 10, padding: '16px 20px', boxShadow: '0 2px 12px rgba(0,0,0,0.06)' }}>
                    <CheckCircle className="w-[22px] h-[22px] flex-shrink-0" style={{ color: '#ff751f' }} />
                    <span className="text-[15px] leading-normal" style={{ fontFamily: 'Inter, sans-serif', color: '#1a1a1a' }}>{item}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      <div className="max-w-5xl mx-auto px-6 lg:px-8 py-8">
        <div className="rounded-xl p-6 flex gap-4 items-start" style={{ background: '#EBF2FB', borderLeft: '4px solid #1d3c71' }}>
          <Info className="w-6 h-6 shrink-0 mt-0.5" style={{ color: '#1d3c71' }} />
          <div className="text-sm leading-relaxed" style={{ color: '#1d3c71' }}>
            <p className="mb-2">Het taxatierapport is doorgaans 2 tot 3 jaar geldig. Check bij jouw verzekeraar de exacte geldigheidsduur.</p>
            <p className="mb-2">Originaliteit en restauratiehistorie tellen alleen mee als ze tijdens de inspectie aangetoond of gedocumenteerd kunnen worden.</p>
            <p>Wil je zekerheid over de waarde van jouw klassieker? Plan de taxatie voordat je de verzekering afsluit of vernieuwt.</p>
          </div>
        </div>
      </div>

      <section className="py-16 md:py-20" style={{ background: '#1d3c71' }}>
        <div className="max-w-3xl mx-auto px-6 lg:px-8 text-center">
          <h2 className="text-white font-bold mb-6" style={{ fontFamily: "'Playfair Display', serif", fontSize: 'clamp(1.5rem, 3vw, 2.2rem)' }}>
            Zekerheid over de waarde van jouw oldtimer?
          </h2>
          <p className="text-white/80 text-lg mb-8">Vraag vrijblijvend een FEHAC-erkende oldtimertaxatie aan.</p>
          <Link to="/oldtimer-taxatie">
            <button className="btn-cta flex items-center gap-2 mx-auto">
              Oldtimertaxatie aanvragen
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

export default OldtimerTaxatieStappenplan;
