import { useRef } from "react";
import { Link } from "react-router-dom";
import LandingHero from "@/components/LandingHero";
import IntakeForm from "@/components/IntakeForm";
import SiteHeader from "@/components/SiteHeader";
import SiteFooter from "@/components/SiteFooter";
import WhatsAppButton from "@/components/WhatsAppButton";
import PageMeta from "@/components/PageMeta";
import { Button } from "@/components/ui/button";
import { ArrowRight, ArrowDown, CheckCircle, Shield, Truck, Car, Bike, UtensilsCrossed, Clock } from "lucide-react";
import ContactSidebar from "@/components/ContactSidebar";
import heroCarInspection from "@/assets/hero-car-inspection.jpg";

const VerzekeringstaxatieInfo = () => {
  const formRef = useRef<HTMLDivElement>(null);

  const scrollToForm = () => {
    formRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <div className="min-h-screen bg-background">
      <PageMeta
        title="Verzekeringstaxatie | Erkende Waardebepaling | Automobiel Taxaties"
        description="Professionele verzekeringstaxatie voor oldtimers, youngtimers, campers en motoren. Erkend rapport voor je verzekeringspolis. Op locatie door heel Nederland."
      />
      <SiteHeader />
      <LandingHero
        subtitle="Automobiel Taxaties"
        title="Verzekeringstaxatie"
        description="Zorg dat je voertuig voor de juiste waarde verzekerd is. Wij taxeren op locatie, door heel Nederland."
        ctaText="Verzekeringstaxatie aanvragen"
        onCtaClick={scrollToForm}
        heroImage={heroCarInspection}
      />

      {/* Waarom */}
      <section className="py-12 md:py-16 px-6 md:px-8" style={{ background: '#f0f4f8' }}>
        <div className="container-wide">
          <div className="grid md:grid-cols-2 gap-10 items-center">
            <div>
              <p className="uppercase text-[11px] font-semibold tracking-[0.12em] text-cta mb-3">Waarom taxeren</p>
              <h2 className="text-2xl md:text-3xl font-semibold mb-4">Een taxatierapport voorkomt problemen</h2>
              <p className="text-[15px] leading-relaxed mb-4" style={{ color: '#4a5568' }}>
                Met een verzekeringstaxatie wordt de waarde vooraf vastgelegd. Bij schade of diefstal wordt uitgekeerd op basis van de getaxeerde waarde, niet een dagwaarde.
              </p>
              <p className="text-[15px] leading-relaxed" style={{ color: '#4a5568' }}>
                Ideaal voor campers, oldtimers, motoren en andere voertuigen waarvan de waarde niet vanzelf spreekt.
              </p>
            </div>
            <div>
              <ul className="space-y-3">
                {[
                  "Geen discussie achteraf over de waarde",
                  "Uitkering op basis van getaxeerde waarde",
                  "Waarde vastgelegd op basis van werkelijke staat",
                  "Geaccepteerd door verzekeraars",
                ].map((item, i) => (
                  <li key={i} className="flex items-start gap-3">
                    <CheckCircle className="w-5 h-5 text-cta flex-shrink-0 mt-0.5" />
                    <span className="text-[15px]" style={{ color: '#4a5568' }}>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Per voertuigtype */}
      <section className="py-12 md:py-16 px-6 md:px-8 bg-background">
        <div className="container-wide">
          <div className="text-center mb-10">
            <p className="uppercase text-[11px] font-semibold tracking-[0.12em] text-cta mb-3">Per voertuigtype</p>
            <h2 className="text-2xl md:text-3xl font-semibold">Verzekeringstaxatie per voertuigtype</h2>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {[
              { icon: Truck, title: "Camper", desc: "Bij aanpassingen of zelfbouw", link: "/camper-taxatie" },
              { icon: Car, title: "Oldtimer", desc: "Originaliteit, staat en gebruik", link: "/oldtimer-taxatie" },
              { icon: Clock, title: "Youngtimer", desc: "Afwijkende waarde t.o.v. standaard", link: "/youngtimer-taxatie" },
              { icon: Bike, title: "Motor", desc: "Verzekerde waarde vooraf vastleggen", link: "/motor-taxatie" },
              { icon: UtensilsCrossed, title: "Foodtruck", desc: "Inrichting en apparatuur meegerekend", link: "/foodtruck-taxatie" },
            ].map((item, i) => (
              <Link key={i} to={item.link} className="card-elevated p-6 group cursor-pointer">
                <div className="inline-flex items-center justify-center w-10 h-10 rounded-xl mb-3" style={{ background: 'rgba(29,60,113,0.08)' }}>
                  <item.icon className="w-5 h-5 text-primary" />
                </div>
                <h3 className="text-sm font-semibold mb-1">{item.title}</h3>
                <p className="text-xs leading-relaxed mb-3" style={{ color: '#4a5568' }}>{item.desc}</p>
                <span className="text-xs font-semibold text-cta inline-flex items-center gap-1 group-hover:gap-2 transition-all">
                  Bekijken <ArrowRight className="w-3 h-3" />
                </span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Werkwijze */}
      <section className="py-12 md:py-16 px-6 md:px-8" style={{ background: '#f0f4f8' }}>
        <div className="container-wide">
          <div className="text-center mb-10">
            <p className="uppercase text-[11px] font-semibold tracking-[0.12em] text-cta mb-3">Werkwijze</p>
            <h2 className="text-2xl md:text-3xl font-semibold">Onze werkwijze in 5 stappen</h2>
          </div>
          <div className="grid md:grid-cols-5 gap-6">
            {[
              { step: 1, title: "Gegevens aanleveren", desc: "Type, bouwjaar en gebruik van het voertuig" },
              { step: 2, title: "Fysieke inspectie", desc: "Staat, uitvoering, opties en bijzonderheden" },
              { step: 3, title: "Waarde vaststellen", desc: "Op basis van inspectie en marktgegevens" },
              { step: 4, title: "Rapport opstellen", desc: "Duidelijk hoe de waarde tot stand is gekomen" },
              { step: 5, title: "Oplevering", desc: "Klaar voor gebruik bij de verzekering" },
            ].map((s) => (
              <div key={s.step} className="text-center">
                <div className="step-badge mx-auto mb-4">{s.step}</div>
                <h4 className="font-semibold text-sm mb-1 text-foreground">{s.title}</h4>
                <p className="text-xs leading-relaxed" style={{ color: '#4a5568' }}>{s.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA blok */}
      <section className="py-14 md:py-20 px-6 md:px-8" style={{ background: '#1d3c71' }}>
        <div className="container-wide text-center">
          <h2 className="text-2xl md:text-3xl font-semibold text-white mb-3">Verzekeringstaxatie aanvragen?</h2>
          <p className="text-base mb-8" style={{ color: 'rgba(255,255,255,0.75)' }}>
            Vooraf zekerheid over de waarde van je voertuig.
          </p>
          <Button variant="cta" size="lg" onClick={scrollToForm}>
            Verzekeringstaxatie aanvragen
            <ArrowDown className="w-4 h-4 ml-2" />
          </Button>
        </div>
      </section>

      {/* Acceptatie */}
      <section className="py-12 md:py-16 px-6 md:px-8 bg-background">
        <div className="container-wide">
          <div className="card-elevated p-8 md:p-10 max-w-3xl mx-auto">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 rounded-xl flex items-center justify-center" style={{ background: 'rgba(29,60,113,0.08)' }}>
                <Shield className="w-5 h-5 text-primary" />
              </div>
              <h2 className="text-xl font-semibold">Acceptatie en geldigheid</h2>
            </div>
            <ul className="space-y-2 text-sm" style={{ color: '#4a5568' }}>
              <li>• Aangesloten bij Federatie TMV, VRT Register en FEHAC</li>
              <li>• Werkt binnen FEHAC-richtlijnen voor klassiekers</li>
              <li>• Rapporten geaccepteerd door verzekeraars</li>
              <li>• Geldigheid doorgaans 3 tot 5 jaar (check je verzekeraar)</li>
            </ul>
          </div>
        </div>
      </section>

      {/* Formulier — 65/35 layout */}
      <section className="py-12 md:py-16 px-6 md:px-8" style={{ background: '#f0f4f8' }} ref={formRef}>
        <div className="container-wide">
          <div className="text-center mb-10">
            <h2 className="text-2xl md:text-3xl font-semibold mb-3">Verzekeringstaxatie aanvragen</h2>
            <p className="text-[15px] max-w-2xl mx-auto" style={{ color: '#4a5568' }}>
              Vul het formulier in en we nemen binnen één werkdag contact met je op.
            </p>
          </div>
          <div className="grid md:grid-cols-[1fr_380px] gap-8">
            <div>
              <IntakeForm
                serviceType="verzekeringstaxatie"
                formTitle="Verzekeringstaxatie aanvragen"
                formSubtext="Vul onderstaand formulier in."
                toelichtingPlaceholder="Geef hier de beschikbare informatie over het voertuig."
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
