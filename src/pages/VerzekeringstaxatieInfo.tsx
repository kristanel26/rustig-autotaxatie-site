import { useRef } from "react";
import { Link } from "react-router-dom";
import LandingHero from "@/components/LandingHero";
import IntakeForm from "@/components/IntakeForm";
import SiteHeader from "@/components/SiteHeader";
import SiteFooter from "@/components/SiteFooter";
import WhatsAppButton from "@/components/WhatsAppButton";
import PageMeta from "@/components/PageMeta";
import UspBar from "@/components/UspBar";
import { Button } from "@/components/ui/button";
import {
  ArrowRight, ArrowDown, Shield, BadgeCheck, ClipboardCheck, ThumbsUp,
  Truck, Car, Bike, UtensilsCrossed, Clock, MapPin,
} from "lucide-react";
import ContactSidebar from "@/components/ContactSidebar";
import heroVerzekeringstaxatie from "@/assets/hero-verzekeringstaxatie.png";

const VerzekeringstaxatieInfo = () => {
  const formRef = useRef<HTMLDivElement>(null);

  const scrollToForm = () => {
    formRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  const waaromCards = [
    { icon: Shield, title: "Geen discussie achteraf", desc: "De waarde staat vooraf vast in het rapport." },
    { icon: BadgeCheck, title: "Uitkering op werkelijke waarde", desc: "Niet op dagwaarde, maar op de getaxeerde waarde." },
    { icon: ClipboardCheck, title: "Waarde vastgelegd op basis van staat", desc: "Inclusief aanpassingen, opties en gebruik." },
    { icon: ThumbsUp, title: "Geaccepteerd door verzekeraars", desc: "Ons rapport voldoet aan de eisen van alle grote verzekeraars." },
  ];

  const voertuigTypes = [
    { icon: Truck, title: "Camper", desc: "Bij aanpassingen of zelfbouw", link: "/camper-taxatie" },
    { icon: Car, title: "Oldtimer", desc: "Originaliteit, staat en gebruik", link: "/oldtimer-taxatie" },
    { icon: Clock, title: "Youngtimer", desc: "Afwijkende waarde t.o.v. standaard", link: "/youngtimer-taxatie" },
    { icon: Bike, title: "Motor", desc: "Verzekerde waarde vooraf vastleggen", link: "/motor-taxatie" },
    { icon: UtensilsCrossed, title: "Foodtruck", desc: "Inrichting en apparatuur meegerekend", link: "/foodtruck-taxatie" },
  ];

  const stappen = [
    { step: 1, title: "Gegevens aanleveren", desc: "Type, bouwjaar en gebruik van het voertuig" },
    { step: 2, title: "Fysieke inspectie", desc: "Staat, uitvoering, opties en bijzonderheden" },
    { step: 3, title: "Waarde vaststellen", desc: "Op basis van inspectie en marktgegevens" },
    { step: 4, title: "Rapport opstellen", desc: "Duidelijk hoe de waarde tot stand is gekomen" },
    { step: 5, title: "Oplevering", desc: "Klaar voor gebruik bij de verzekering" },
  ];

  return (
    <div className="min-h-screen bg-background">
      <PageMeta
        title="Verzekeringstaxatie | Erkende Waardebepaling | Automobiel Taxaties"
        description="Professionele verzekeringstaxatie voor oldtimers, youngtimers, campers en motoren. Erkend rapport voor je verzekeringspolis. Op locatie door heel Nederland."
      />
      <SiteHeader />

      {/* HERO */}
      <LandingHero
        subtitle="Automobiel Taxaties"
        title="Verzekeringstaxatie"
        description="Zorg dat je voertuig voor de juiste waarde verzekerd is. Wij taxeren op locatie, door heel Nederland."
        ctaText="Verzekeringstaxatie aanvragen"
        onCtaClick={scrollToForm}
        heroImage={heroVerzekeringstaxatie}
      >
        <p className="flex items-center gap-2 text-white/60 text-sm">
          <MapPin className="w-4 h-4" />
          Landelijk actief — op locatie bij jou
        </p>
      </LandingHero>

      {/* WAAROM TAXEREN — 2×2 kaartjes */}
      <section className="py-16 md:py-24 px-6 md:px-8" style={{ background: '#f7f8fa' }}>
        <div className="container-wide">
          <div className="text-center mb-12">
            <p className="uppercase text-[11px] font-semibold tracking-[0.15em] mb-3" style={{ color: '#ff751f', fontFamily: 'Inter, sans-serif' }}>
              Waarom taxeren
            </p>
            <h2 className="font-playfair text-[28px] md:text-[36px] font-bold" style={{ color: '#1a1a1a' }}>
              Een taxatierapport voorkomt problemen
            </h2>
          </div>

          <div className="max-w-3xl mx-auto mb-10">
            <p style={{ fontFamily: 'Inter, sans-serif', fontSize: '17px', lineHeight: 1.75, color: '#3a3a3a' }}>
              Met een verzekeringstaxatie wordt de waarde vooraf vastgelegd. Bij schade of diefstal wordt uitgekeerd op basis van de getaxeerde waarde, niet een dagwaarde. Ideaal voor campers, oldtimers, motoren en andere voertuigen waarvan de waarde niet vanzelf spreekt.
            </p>
          </div>

          <div className="grid sm:grid-cols-2 gap-5 max-w-4xl mx-auto">
            {waaromCards.map((card, i) => (
              <div
                key={i}
                className="bg-white rounded-xl p-6 transition-shadow duration-200"
                style={{ boxShadow: '0 4px 16px rgba(0,0,0,0.08)' }}
              >
                <div
                  className="inline-flex items-center justify-center w-11 h-11 rounded-full mb-4"
                  style={{ background: '#EBF2FB' }}
                >
                  <card.icon className="w-5 h-5" style={{ color: '#1d3c71' }} />
                </div>
                <h3 className="font-semibold text-[16px] mb-1.5" style={{ color: '#1d3c71' }}>{card.title}</h3>
                <p className="text-[14px] leading-relaxed" style={{ color: '#666' }}>{card.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* VOERTUIGTYPES GRID */}
      <section className="py-16 md:py-24 px-6 md:px-8 bg-background">
        <div className="container-wide">
          <div className="text-center mb-12">
            <p className="uppercase text-[11px] font-semibold tracking-[0.15em] mb-3" style={{ color: '#ff751f', fontFamily: 'Inter, sans-serif' }}>
              Per voertuigtype
            </p>
            <h2 className="font-playfair text-[28px] md:text-[36px] font-bold" style={{ color: '#1a1a1a' }}>
              Verzekeringstaxatie per voertuigtype
            </h2>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {voertuigTypes.map((item, i) => (
              <Link
                key={i}
                to={item.link}
                className="group rounded-xl p-7 transition-all duration-200 hover:-translate-y-[3px]"
                style={{
                  background: 'linear-gradient(180deg, #ffffff 0%, #f0f5fb 100%)',
                  boxShadow: '0 4px 16px rgba(0,0,0,0.07)',
                  minHeight: '180px',
                }}
                onMouseEnter={(e) => { (e.currentTarget as HTMLElement).style.boxShadow = '0 8px 28px rgba(0,0,0,0.12)'; }}
                onMouseLeave={(e) => { (e.currentTarget as HTMLElement).style.boxShadow = '0 4px 16px rgba(0,0,0,0.07)'; }}
              >
                <div
                  className="inline-flex items-center justify-center w-[52px] h-[52px] rounded-full mb-4"
                  style={{ background: '#EBF2FB' }}
                >
                  <item.icon className="w-6 h-6" style={{ color: '#1d3c71' }} />
                </div>
                <h3 className="font-bold text-[17px] mb-1.5" style={{ color: '#1d3c71' }}>{item.title}</h3>
                <p className="text-[14px] leading-relaxed mb-4" style={{ color: '#666' }}>{item.desc}</p>
                <span className="text-[14px] font-semibold inline-flex items-center gap-1.5 group-hover:gap-2.5 transition-all" style={{ color: '#ff751f' }}>
                  Bekijken <ArrowRight className="w-4 h-4" />
                </span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* STAPPENPLAN met verbindingslijn */}
      <section className="py-16 md:py-24 px-6 md:px-8" style={{ background: '#f7f8fa' }}>
        <div className="container-wide">
          <div className="text-center mb-12">
            <p className="uppercase text-[11px] font-semibold tracking-[0.15em] mb-3" style={{ color: '#ff751f', fontFamily: 'Inter, sans-serif' }}>
              Werkwijze
            </p>
            <h2 className="font-playfair text-[28px] md:text-[36px] font-bold" style={{ color: '#1a1a1a' }}>
              Onze werkwijze in 5 stappen
            </h2>
          </div>

          {/* Desktop: horizontal with connecting line */}
          <div className="hidden md:block">
            <div className="relative">
              {/* Connecting line */}
              <div
                className="absolute top-[24px] left-[10%] right-[10%] h-[2px]"
                style={{ background: '#698db3' }}
              />
              <div className="grid grid-cols-5 gap-6 relative">
                {stappen.map((s) => (
                  <div key={s.step} className="text-center">
                    <div
                      className="relative z-10 mx-auto mb-5 flex items-center justify-center rounded-full text-white font-bold"
                      style={{
                        width: '48px',
                        height: '48px',
                        background: '#1d3c71',
                        fontSize: '18px',
                      }}
                    >
                      {s.step}
                    </div>
                    <h4 className="font-bold text-[15px] mb-1" style={{ fontFamily: 'Inter, sans-serif', color: '#1a1a1a' }}>
                      {s.title}
                    </h4>
                    <p className="text-[13px] leading-[1.6]" style={{ color: '#666' }}>{s.desc}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Mobile: vertical with connecting line */}
          <div className="md:hidden">
            <div className="relative pl-10">
              {/* Vertical line */}
              <div
                className="absolute left-[23px] top-0 bottom-0 w-[2px]"
                style={{ background: '#698db3' }}
              />
              <div className="space-y-8">
                {stappen.map((s) => (
                  <div key={s.step} className="relative flex gap-5">
                    <div
                      className="relative z-10 flex-shrink-0 flex items-center justify-center rounded-full text-white font-bold"
                      style={{
                        width: '48px',
                        height: '48px',
                        background: '#1d3c71',
                        fontSize: '18px',
                        marginLeft: '-25px',
                      }}
                    >
                      {s.step}
                    </div>
                    <div className="pt-2">
                      <h4 className="font-bold text-[15px] mb-1" style={{ color: '#1a1a1a' }}>{s.title}</h4>
                      <p className="text-[13px] leading-[1.6]" style={{ color: '#666' }}>{s.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA BLOK */}
      <section className="py-16 md:py-24 px-6 md:px-8" style={{ background: '#1d3c71' }}>
        <div className="container-wide text-center">
          <h2 className="font-playfair text-[28px] md:text-[36px] font-bold text-white mb-3">
            Verzekeringstaxatie aanvragen?
          </h2>
          <p className="text-[17px] mb-8 max-w-xl mx-auto" style={{ color: 'rgba(255,255,255,0.75)', lineHeight: 1.75 }}>
            Wij stellen de waarde vast op basis van de werkelijke staat van jouw voertuig.
          </p>
          <Button variant="cta" size="lg" onClick={scrollToForm}>
            Verzekeringstaxatie aanvragen
            <ArrowDown className="w-4 h-4 ml-2" />
          </Button>
        </div>
      </section>

      {/* ACCEPTATIE */}
      <section className="py-16 md:py-24 px-6 md:px-8 bg-background">
        <div className="container-wide">
          <div
            className="p-8 md:p-10 max-w-3xl mx-auto rounded-xl"
            style={{ boxShadow: '0 4px 16px rgba(0,0,0,0.08)' }}
          >
            <div className="flex items-center gap-3 mb-5">
              <div
                className="w-11 h-11 rounded-full flex items-center justify-center"
                style={{ background: '#EBF2FB' }}
              >
                <Shield className="w-5 h-5" style={{ color: '#1d3c71' }} />
              </div>
              <h2 className="font-playfair text-[22px] font-bold" style={{ color: '#1a1a1a' }}>
                Acceptatie en geldigheid
              </h2>
            </div>
            <ul className="space-y-2.5 text-[15px]" style={{ color: '#4a5568' }}>
              <li>• Aangesloten bij Federatie TMV, VRT Register en FEHAC</li>
              <li>• Geaccepteerd door verzekeraars</li>
              <li>• Geldigheid 2 tot 3 jaar — informeer bij jouw verzekeraar</li>
            </ul>
          </div>
        </div>
      </section>

      {/* FORMULIER — 65/35 layout */}
      <section className="py-16 md:py-24 px-6 md:px-8" style={{ background: '#f7f8fa' }} ref={formRef}>
        <div className="container-wide">
          <div className="text-center mb-12">
            <h2 className="font-playfair text-[28px] md:text-[36px] font-bold mb-3" style={{ color: '#1a1a1a' }}>
              Verzekeringstaxatie aanvragen
            </h2>
            <p className="text-[15px] max-w-2xl mx-auto" style={{ color: '#4a5568' }}>
              Vul het formulier in en we nemen binnen één werkdag contact met je op.
            </p>
          </div>
          <div className="grid md:grid-cols-[1fr_380px] gap-8 items-stretch">
            <div
              className="rounded-[14px] overflow-hidden"
              style={{ boxShadow: '0 6px 32px rgba(0,0,0,0.09)' }}
            >
              <IntakeForm
                serviceType="verzekeringstaxatie"
                formTitle="Verzekeringstaxatie aanvragen"
                formSubtext="Vul onderstaand formulier in."
                toelichtingPlaceholder="Geef hier de beschikbare informatie over het voertuig."
                submitButtonText="Aanvraag indienen"
              />
            </div>
            <ContactSidebar />
          </div>
        </div>
      </section>

      <SiteFooter />
      <WhatsAppButton />
    </div>
  );
};

export default VerzekeringstaxatieInfo;
