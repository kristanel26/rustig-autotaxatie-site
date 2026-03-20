import { useState } from "react";
import { Link } from "react-router-dom";
import SiteHeader from "@/components/SiteHeader";
import SiteFooter from "@/components/SiteFooter";
import WhatsAppButton from "@/components/WhatsAppButton";
import PageMeta from "@/components/PageMeta";
import UspBar from "@/components/UspBar";
import { Button } from "@/components/ui/button";
import { Phone, FileCheck, MapPin, Wrench, ChevronDown } from "lucide-react";
import heroCamper from "@/assets/hero-camper.jpg";

const steps = [
  {
    number: 1,
    title: "Aanvraag indienen",
    content: "Vul het formulier in of bel ons op 085 483 2461. We bespreken je situatie en plannen de inspectie op een moment dat jou past.",
  },
  {
    number: 2,
    title: "Inspectie op locatie",
    content: "Erik komt naar jouw camper toe. Staat, uitvoering, aanpassingen en zelfbouw worden beoordeeld. Je hoeft nergens naartoe.",
  },
  {
    number: 3,
    title: "Waarde vaststellen",
    content: "Op basis van marktgegevens, staat en bijzonderheden stellen we de verzekeringswaarde vast. Volledig onafhankelijk en onderbouwd.",
  },
  {
    number: 4,
    title: "Rapport opstellen",
    content: "Je ontvangt een volledig onderbouwd taxatierapport, inclusief fotodossier. Klaar voor gebruik bij je verzekeraar.",
  },
  {
    number: 5,
    title: "Verzekering regelen",
    content: "Het rapport lever je aan bij je verzekeraar. Geldigheid doorgaans 3 tot 5 jaar — informeer bij jouw verzekeraar.",
  },
];

const infoCards = [
  { icon: FileCheck, title: "Rapport geldig 3 tot 5 jaar", desc: "Informeer bij jouw verzekeraar naar de exacte geldigheidsduur" },
  { icon: MapPin, title: "Taxatie op locatie bij jou", desc: "Erik komt naar jouw camper toe, door heel Nederland" },
  { icon: Wrench, title: "Aanpassingen meegerekend", desc: "Zelfbouw, accessoires en inbouw worden meegenomen in de waarde" },
];

const CamperTaxatieStappenplan = () => {
  const [openStep, setOpenStep] = useState<number | null>(null);

  const toggleStep = (n: number) => {
    setOpenStep(openStep === n ? null : n);
  };

  return (
    <div className="min-h-screen bg-background">
      <PageMeta
        title="Stappenplan Campertaxatie | Automobiel Taxaties"
        description="Van aanvraag tot rapport. Zo verloopt de verzekeringstaxatie van je camper. Bekijk het volledige stappenplan."
      />
      <SiteHeader />

      {/* Hero */}
      <section className="relative min-h-[420px] md:min-h-[480px] flex items-center">
        <div className="absolute inset-0">
          <img src={heroCamper} alt="Camper taxatie" className="w-full h-full object-cover" />
          <div className="absolute inset-0" style={{ background: 'linear-gradient(90deg, rgba(29,60,113,0.88) 0%, rgba(29,60,113,0.55) 100%)' }} />
        </div>
        <div className="relative z-10 w-full px-6 md:px-8 py-16 md:py-20">
          <div className="container-wide max-w-3xl">
            <p
              className="uppercase font-semibold mb-3"
              style={{ fontSize: 11, letterSpacing: '0.15em', color: '#ff751f' }}
            >
              VERZEKERINGSTAXATIE CAMPER
            </p>
            <h1
              className="heading-display font-bold text-white mb-4"
              style={{ fontSize: 'clamp(32px, 4vw, 48px)', lineHeight: 1.15, letterSpacing: '-0.02em' }}
            >
              Zo verloopt de campertaxatie
            </h1>
            <p className="text-white/75 mb-8" style={{ fontSize: 'clamp(15px, 1.6vw, 18px)', lineHeight: 1.7, maxWidth: 520 }}>
              Van aanvraag tot rapport. Wij regelen het op locatie bij jou.
            </p>
            <div className="flex flex-col sm:flex-row gap-3">
              <Link to="/camper-taxatie">
                <Button variant="cta" size="lg">
                  Verzekeringstaxatie aanvragen
                </Button>
              </Link>
              <a href="tel:0854832461">
                <Button
                  variant="outline"
                  size="lg"
                  className="border-2 border-white text-white hover:bg-white/10 font-medium"
                >
                  <Phone className="w-4 h-4 mr-2" />
                  085 483 2461
                </Button>
              </a>
            </div>
          </div>
        </div>
      </section>
      <UspBar />

      {/* Stappenplan */}
      <section className="py-16 md:py-20 px-6 md:px-8" style={{ background: '#f7f8fa' }}>
        <div className="container-wide max-w-3xl">
          <div className="text-center mb-12">
            <p className="uppercase text-[11px] font-semibold tracking-[0.15em] mb-2" style={{ color: '#ff751f' }}>Stappenplan</p>
            <h2 className="heading-display text-[28px] md:text-[32px] font-bold" style={{ color: '#1d3c71' }}>
              Van aanvraag tot rapport
            </h2>
          </div>

          <div className="relative">
            {/* Verbindingslijn */}
            <div
              className="absolute left-[26px] top-[26px] bottom-[26px] w-[2px]"
              style={{ background: '#ff751f' }}
            />

            <div className="space-y-0">
              {steps.map((step) => (
                <div key={step.number} className="relative pl-16">
                  {/* Cirkel */}
                  <div
                    className="absolute left-0 top-0 w-[52px] h-[52px] rounded-full flex items-center justify-center text-white font-bold text-[20px] z-10"
                    style={{ background: '#1d3c71' }}
                  >
                    {step.number}
                  </div>

                  {/* Content */}
                  <button
                    onClick={() => toggleStep(step.number)}
                    className="w-full text-left bg-white rounded-[12px] mb-4 transition-all duration-200 hover:-translate-y-[2px]"
                    style={{ boxShadow: '0 2px 12px rgba(0,0,0,0.06)' }}
                  >
                    <div className="flex items-center justify-between px-6 py-5">
                      <h3 className="font-bold text-[16px]" style={{ fontFamily: "'Inter', sans-serif", color: '#1d3c71' }}>
                        {step.title}
                      </h3>
                      <ChevronDown
                        className="w-5 h-5 transition-transform duration-200 flex-shrink-0"
                        style={{
                          color: '#698db3',
                          transform: openStep === step.number ? 'rotate(180deg)' : 'rotate(0deg)',
                        }}
                      />
                    </div>
                    {openStep === step.number && (
                      <div className="px-6 pb-5 pt-0">
                        <p style={{ fontFamily: "'Inter', sans-serif", fontSize: 14, color: '#555', lineHeight: 1.7 }}>
                          {step.content}
                        </p>
                      </div>
                    )}
                  </button>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Drie infokaartjes */}
      <section className="py-14 md:py-16 px-6 md:px-8 bg-white">
        <div className="container-wide">
          <div className="grid md:grid-cols-3 gap-6 max-w-4xl mx-auto">
            {infoCards.map((card, i) => (
              <div
                key={i}
                className="bg-white rounded-[12px] p-7 text-center transition-all duration-200 hover:-translate-y-[3px]"
                style={{ boxShadow: '0 4px 20px rgba(0,0,0,0.08)' }}
              >
                <div
                  className="w-[56px] h-[56px] rounded-full flex items-center justify-center mx-auto mb-4"
                  style={{ background: '#EBF2FB' }}
                >
                  <card.icon className="w-6 h-6" style={{ color: '#1d3c71' }} />
                </div>
                <h3 className="font-bold text-[17px] mb-2" style={{ fontFamily: "'Inter', sans-serif", color: '#1d3c71' }}>{card.title}</h3>
                <p style={{ fontFamily: "'Inter', sans-serif", fontSize: 14, color: '#555', lineHeight: 1.65 }}>{card.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA blok */}
      <section className="py-14 md:py-16 px-6 md:px-8" style={{ background: '#1d3c71' }}>
        <div className="container-wide text-center">
          <h2 className="heading-display text-[24px] md:text-[28px] font-bold text-white mb-3">
            Zekerheid over de waarde van je camper?
          </h2>
          <p className="text-[15px] mb-8 max-w-lg mx-auto" style={{ color: 'rgba(255,255,255,0.75)' }}>
            Vraag vrijblijvend een verzekeringstaxatie aan.
          </p>
          <Link to="/camper-taxatie">
            <Button variant="cta" size="lg">
              Verzekeringstaxatie aanvragen
            </Button>
          </Link>
        </div>
      </section>

      <SiteFooter />
      <WhatsAppButton />
    </div>
  );
};

export default CamperTaxatieStappenplan;
