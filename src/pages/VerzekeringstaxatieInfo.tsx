import Breadcrumbs from "@/components/Breadcrumbs";
import WhatsAppButton from "@/components/WhatsAppButton";
import { useRef } from "react";
import { Link } from "react-router-dom";
import LandingHero from "@/components/LandingHero";
import IntakeForm from "@/components/IntakeForm";
import SiteHeader from "@/components/SiteHeader";
import SiteFooter from "@/components/SiteFooter";
import PageMeta from "@/components/PageMeta";
import UspBar from "@/components/UspBar";
import StatsBar from "@/components/StatsBar";
import { Button } from "@/components/ui/button";
import {
  ArrowRight, ArrowDown, Shield, BadgeCheck, ClipboardCheck, ThumbsUp,
  Bus, Car, Bike, UtensilsCrossed, Clock, MapPin, Award, CheckCircle, Calendar, AlertTriangle, Star,
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
    { icon: CheckCircle, title: "Uitkering op werkelijke waarde", desc: "Niet op dagwaarde, maar op de getaxeerde waarde." },
    { icon: ClipboardCheck, title: "Waarde vastgelegd op basis van staat", desc: "Inclusief aanpassingen, opties en gebruik." },
    { icon: ThumbsUp, title: "Geaccepteerd door verzekeraars", desc: "Ons rapport voldoet aan de eisen van alle grote verzekeraars." },
  ];

  const voertuigTypes = [
    { icon: Bus, title: "Camper", desc: "Bij aanpassingen of zelfbouw", link: "/camper-taxatie" },
    { icon: Car, title: "Oldtimer", desc: "Originaliteit, staat en gebruik", link: "/oldtimer-taxatie" },
    { icon: Clock, title: "Youngtimer", desc: "Afwijkende waarde t.o.v. standaard", link: "/youngtimer-taxatie" },
    { icon: Bike, title: "Motor", desc: "Verzekerde waarde vooraf vastleggen", link: "/motor-taxatie" },
    { icon: UtensilsCrossed, title: "Foodtruck", desc: "Inrichting en apparatuur meegerekend", link: "/foodtruck-taxatie" },
    { icon: AlertTriangle, title: "Schadevaststelling", desc: "Na een incident", link: "/schadevaststelling" },
  ];

  const acceptatieCards = [
    { icon: Award, title: "Federatie TMV, VRT Register en FEHAC", desc: "Aangesloten bij de erkende brancheorganisaties" },
    { icon: CheckCircle, title: "Geaccepteerd door verzekeraars", desc: "Ons rapport voldoet aan de eisen van alle grote verzekeraars" },
    { icon: Calendar, title: "Geldigheid 2 tot 3 jaar", desc: "Informeer bij jouw verzekeraar naar de exacte geldigheidsduur" },
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
        description="Professionele verzekeringstaxatie voor oldtimers, youngtimers, campers en motoren. Erkend rapport voor jou verzekeringspolis. Op locatie in het grootste gedeelte van Nederland."
      />
      <SiteHeader />
      <Breadcrumbs items={[{ label: "Verzekeringstaxatie" }]} />

      {/* HERO */}
      <LandingHero
        subtitle="Automobiel Taxaties"
        title="Verzekeringstaxatie"
        description={<>Zorg dat jouw voertuig voor de juiste waarde verzekerd is.<br />Wij taxeren op locatie, in het grootste gedeelte van Nederland.</>}
        ctaText="Verzekeringstaxatie aanvragen"
        onCtaClick={scrollToForm}
        heroImage={heroVerzekeringstaxatie}
        compact
      >
        <p className="flex items-center gap-2 text-white/60 text-sm">
          <MapPin className="w-4 h-4" />
          Werkzaam in het grootste gedeelte van Nederland, op locatie bij jou
        </p>
      </LandingHero>
      <UspBar />

      {/* WAAROM TAXEREN — 2×2 kaartjes */}
      <section className="py-14 md:py-20 px-6 md:px-8" style={{ background: '#f7f8fa' }}>
        <div className="container-wide">
          <div className="text-center mb-10">
            <p className="uppercase text-[11px] font-semibold tracking-[0.15em] mb-3" style={{ color: '#ff751f', fontFamily: 'Inter, sans-serif' }}>
              Waarom taxeren
            </p>
            <h2 className="font-playfair text-[28px] md:text-[36px] font-bold" style={{ color: '#1d3c71' }}>
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
                className="bg-white rounded-xl transition-all duration-200 hover:-translate-y-[3px]"
                style={{ boxShadow: '0 4px 20px rgba(0,0,0,0.08)', padding: '28px' }}
                onMouseEnter={(e) => { (e.currentTarget as HTMLElement).style.boxShadow = '0 8px 32px rgba(0,0,0,0.13)'; }}
                onMouseLeave={(e) => { (e.currentTarget as HTMLElement).style.boxShadow = '0 4px 20px rgba(0,0,0,0.08)'; }}
              >
                <div
                  className="flex items-center justify-center rounded-full mb-4"
                  style={{ width: 56, height: 56, background: '#EBF2FB' }}
                >
                  <card.icon className="w-6 h-6" style={{ color: '#1d3c71' }} />
                </div>
                <h3 className="font-bold mb-1.5" style={{ fontFamily: 'Inter, sans-serif', fontSize: 17, color: '#1d3c71' }}>{card.title}</h3>
                <p style={{ fontFamily: 'Inter, sans-serif', fontSize: 14, lineHeight: 1.65, color: '#555' }}>{card.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* VOERTUIGTYPES GRID */}
      <section className="py-14 md:py-20 px-6 md:px-8 bg-background">
        <div className="container-wide">
          <div className="text-center mb-10">
            <p className="uppercase text-[11px] font-semibold tracking-[0.15em] mb-3" style={{ color: '#ff751f', fontFamily: 'Inter, sans-serif' }}>
              Per voertuigtype
            </p>
            <h2 className="font-playfair text-[28px] md:text-[36px] font-bold" style={{ color: '#1d3c71' }}>
              Verzekeringstaxatie per voertuigtype
            </h2>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {voertuigTypes.map((item, i) => (
              <Link
                key={i}
                to={item.link}
                className="group relative overflow-hidden rounded-xl transition-all duration-200 hover:-translate-y-[3px]"
                style={{
                  background: '#1d3c71',
                  boxShadow: '0 4px 20px rgba(0,0,0,0.15)',
                  padding: '32px 24px',
                }}
                onMouseEnter={(e) => { (e.currentTarget as HTMLElement).style.background = '#2a4f8a'; (e.currentTarget as HTMLElement).style.boxShadow = '0 8px 32px rgba(0,0,0,0.22)'; }}
                onMouseLeave={(e) => { (e.currentTarget as HTMLElement).style.background = '#1d3c71'; (e.currentTarget as HTMLElement).style.boxShadow = '0 4px 20px rgba(0,0,0,0.15)'; }}
              >
                <div className="absolute -bottom-6 -right-6 w-24 h-24 rounded-full" style={{ background: 'rgba(255,255,255,0.05)' }} />
                <item.icon style={{ width: 40, height: 40, color: '#ffffff' }} className="mb-4" />
                <h3 className="font-bold mb-1.5" style={{ fontFamily: 'Inter, sans-serif', fontSize: 18, color: '#ffffff' }}>{item.title}</h3>
                <p className="mb-2" style={{ fontFamily: 'Inter, sans-serif', fontSize: 13, lineHeight: 1.6, color: '#adafc7' }}>{item.desc}</p>
                <span className="inline-flex items-center gap-1.5 group-hover:gap-2.5 transition-all font-semibold opacity-0 group-hover:opacity-100 duration-200" style={{ fontFamily: 'Inter, sans-serif', fontSize: 14, color: '#ff751f' }}>
                  Bekijken <ArrowRight className="w-3.5 h-3.5" />
                </span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* STAPPENPLAN met verbindingslijn */}
      <section className="py-14 md:py-20 px-6 md:px-8" style={{ background: '#f7f8fa' }}>
        <div className="container-wide">
          <div className="text-center mb-10">
            <p className="uppercase text-[11px] font-semibold tracking-[0.15em] mb-3" style={{ color: '#ff751f', fontFamily: 'Inter, sans-serif' }}>
              Werkwijze
            </p>
            <h2 className="font-playfair text-[28px] md:text-[36px] font-bold" style={{ color: '#1d3c71' }}>
              Onze werkwijze in 5 stappen
            </h2>
          </div>

          {/* Desktop: horizontal with connecting line */}
          <div className="hidden md:block">
            <div className="relative">
              <div
                className="absolute top-[26px] left-[10%] right-[10%] h-[2px]"
                style={{ background: '#ff751f' }}
              />
              <div className="grid grid-cols-5 gap-6 relative">
                {stappen.map((s) => (
                  <div key={s.step} className="text-center">
                    <div
                      className="relative z-10 mx-auto mb-5 flex items-center justify-center rounded-full text-white font-bold"
                      style={{ width: 52, height: 52, background: '#1d3c71', fontSize: 20 }}
                    >
                      {s.step}
                    </div>
                    <h4 className="font-bold text-[15px] mb-1" style={{ fontFamily: 'Inter, sans-serif', color: '#1d3c71' }}>
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
              <div
                className="absolute left-[23px] top-0 bottom-0 w-[2px]"
                style={{ background: '#ff751f' }}
              />
              <div className="space-y-8">
                {stappen.map((s) => (
                  <div key={s.step} className="relative flex gap-5">
                    <div
                      className="relative z-10 flex-shrink-0 flex items-center justify-center rounded-full text-white font-bold"
                      style={{ width: 52, height: 52, background: '#1d3c71', fontSize: 20, marginLeft: '-27px' }}
                    >
                      {s.step}
                    </div>
                    <div className="pt-2">
                      <h4 className="font-bold text-[15px] mb-1" style={{ color: '#1d3c71' }}>{s.title}</h4>
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
      <section className="py-14 md:py-20 px-6 md:px-8" style={{ background: '#1d3c71' }}>
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

      <StatsBar />

      {/* ACCEPTATIE — 3 kaartjes */}
      <section className="py-14 md:py-20 px-6 md:px-8 bg-background">
        <div className="container-wide">
          <div className="text-center mb-10">
            <p className="uppercase text-[11px] font-semibold tracking-[0.15em] mb-3" style={{ color: '#ff751f', fontFamily: 'Inter, sans-serif' }}>
              Acceptatie
            </p>
            <h2 className="font-playfair text-[28px] md:text-[36px] font-bold" style={{ color: '#1d3c71' }}>
              Acceptatie en geldigheid
            </h2>
          </div>
          <div className="grid sm:grid-cols-3 gap-5 max-w-4xl mx-auto">
            {acceptatieCards.map((card, i) => (
              <div
                key={i}
                className="bg-white rounded-xl text-center transition-all duration-200 hover:-translate-y-[3px]"
                style={{ boxShadow: '0 4px 20px rgba(0,0,0,0.08)', padding: '28px' }}
                onMouseEnter={(e) => { (e.currentTarget as HTMLElement).style.boxShadow = '0 8px 32px rgba(0,0,0,0.13)'; }}
                onMouseLeave={(e) => { (e.currentTarget as HTMLElement).style.boxShadow = '0 4px 20px rgba(0,0,0,0.08)'; }}
              >
                <div
                  className="flex items-center justify-center rounded-full mx-auto mb-4"
                  style={{ width: 56, height: 56, background: '#EBF2FB' }}
                >
                  <card.icon className="w-6 h-6" style={{ color: '#1d3c71' }} />
                </div>
                <h3 className="font-bold mb-1.5" style={{ fontFamily: 'Inter, sans-serif', fontSize: 17, color: '#1d3c71' }}>{card.title}</h3>
                <p style={{ fontFamily: 'Inter, sans-serif', fontSize: 14, lineHeight: 1.65, color: '#555' }}>{card.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FORMULIER — 65/35 layout */}
      <section className="py-14 md:py-20 px-6 md:px-8" style={{ background: '#f7f8fa' }} ref={formRef}>
        <div className="container-wide">
          <div className="text-center mb-10">
            <p className="uppercase text-[11px] font-semibold tracking-[0.15em] mb-3" style={{ color: '#ff751f', fontFamily: 'Inter, sans-serif' }}>
              Aanvragen
            </p>
            <h2 className="font-playfair text-[28px] md:text-[36px] font-bold mb-3" style={{ color: '#1d3c71' }}>
              Verzekeringstaxatie aanvragen
            </h2>
            <p className="text-[15px] max-w-2xl mx-auto" style={{ color: '#4a5568' }}>
              Vul het formulier in en we nemen binnen één werkdag contact met jou op.
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
                styledKenteken
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