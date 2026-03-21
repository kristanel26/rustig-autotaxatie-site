import WhatsAppButton from "@/components/WhatsAppButton";
import { useRef } from "react";
import LandingHero from "@/components/LandingHero";
import IntakeForm from "@/components/IntakeForm";
import ContactSidebar from "@/components/ContactSidebar";
import SiteHeader from "@/components/SiteHeader";
import SiteFooter from "@/components/SiteFooter";
import PageMeta from "@/components/PageMeta";
import UspBar from "@/components/UspBar";
import { Button } from "@/components/ui/button";
import { ArrowDown, CheckCircle, Star } from "lucide-react";
import heroBpm from "@/assets/hero-bpm.jpg";

const BpmVoorbereiding = () => {
  const formRef = useRef<HTMLDivElement>(null);
  const scrollToForm = () => formRef.current?.scrollIntoView({ behavior: "smooth" });

  return (
    <div className="min-h-screen bg-background">
      <PageMeta title="BPM Voorbereiding | Vooraf Weten Wat Je Betaalt | Automobiel Taxaties" description="Overweeg je een auto te importeren? Met een BPM voorbereiding weet je vooraf precies wat de totale kosten zijn." />
      <SiteHeader />
      <LandingHero subtitle="BPM voorbereiding" title="Weet wat je gaat betalen vóórdat je koopt" description="Overweeg je een auto te importeren? Met een BPM voorbereiding weet je vooraf precies wat de totale kosten zijn. Zo voorkom je verrassingen en kun je een goede beslissing nemen." ctaText="Start je BPM berekening" onCtaClick={scrollToForm} heroImage={heroBpm} />
      <UspBar />

      <section className="py-10 md:py-12 px-6 md:px-8" style={{ background: '#f0f4f8' }}>
        <div className="container-wide"><div className="max-w-3xl mx-auto text-center">
          <h2 className="text-2xl md:text-3xl font-semibold mb-3">Wat houdt BPM voorbereiding in?</h2>
          <p className="text-[15px] leading-relaxed" style={{ color: '#4a5568' }}>Een complete analyse van alle kosten voordat je de auto koopt. Zo weet je vooraf precies hoeveel BPM je moet betalen en zijn er geen verrassingen bij de RDW.</p>
        </div></div>
      </section>

      <section className="py-10 md:py-12 px-6 md:px-8 bg-background">
        <div className="container-wide">
          <div className="grid md:grid-cols-3 gap-6">
            {[
              { title: "Exacte BPM berekening", desc: "Voordat je een voertuig importeert, weet je precies hoeveel BPM je moet betalen." },
              { title: "Voertuig analyse", desc: "We analyseren het voertuig op basis van merk, model, bouwjaar, brandstof en meer." },
              { title: "Snelle doorlooptijd", desc: "Binnen 24 uur ontvang je een duidelijk overzicht van de verwachte BPM-kosten." },
            ].map((item, i) => (
              <div key={i} className="card-elevated p-6">
                <h3 className="text-lg font-semibold mb-2">{item.title}</h3>
                <p className="text-sm leading-relaxed" style={{ color: '#4a5568' }}>{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-10 md:py-12 px-6 md:px-8" style={{ background: '#f0f4f8' }}>
        <div className="container-wide"><div className="text-center mb-8">
          <p className="uppercase text-[11px] font-semibold tracking-[0.12em] text-cta mb-2">Werkwijze</p>
          <h2 className="text-2xl md:text-3xl font-semibold">Onze werkwijze in 5 stappen</h2>
        </div>
        <div className="grid md:grid-cols-5 gap-5">
          {[{ step: 1, title: "Gegevens aanleveren", desc: "Kenteken of chassisnummer en voertuiginfo" }, { step: 2, title: "Voertuig analyseren", desc: "Merk, model, bouwjaar en specificaties" }, { step: 3, title: "BPM berekenen", desc: "Alle methodes doorrekenen" }, { step: 4, title: "Overzicht opstellen", desc: "Duidelijk en begrijpelijk" }, { step: 5, title: "Oplevering", desc: "Binnen 24 uur per e-mail" }].map((s) => (
            <div key={s.step} className="text-center"><div className="step-badge mx-auto mb-3">{s.step}</div><h4 className="font-semibold text-sm mb-1 text-foreground">{s.title}</h4><p className="text-xs leading-relaxed" style={{ color: '#4a5568' }}>{s.desc}</p></div>
          ))}
        </div></div>
      </section>

      <section className="py-12 md:py-14 px-6 md:px-8" style={{ background: '#1d3c71' }}>
        <div className="container-wide text-center">
          <h2 className="text-2xl md:text-3xl font-semibold text-white mb-3">Vooraf weten wat je betaalt?</h2>
          <p className="text-[15px] mb-6 max-w-xl mx-auto" style={{ color: 'rgba(255,255,255,0.75)' }}>Vraag vrijblijvend een BPM voorbereiding aan.</p>
          <Button variant="cta" size="lg" onClick={scrollToForm}>BPM voorbereiding aanvragen<ArrowDown className="w-4 h-4 ml-2" /></Button>
        </div>
      </section>

      <section className="py-6 px-6 md:px-8 bg-background">
        <div className="container-wide"><div className="flex flex-wrap justify-center gap-6 md:gap-14 items-center">
          <div className="flex items-center gap-2"><div className="flex">{[...Array(5)].map((_, i) => <Star key={i} className="w-3.5 h-3.5 fill-cta text-cta" />)}</div><span className="text-sm font-semibold text-foreground">4.9 / 5</span><span className="text-xs" style={{ color: '#4a5568' }}>Google Reviews</span></div>
          <div className="text-center"><span className="text-lg font-bold text-foreground">25.000+</span><span className="text-xs ml-1" style={{ color: '#4a5568' }}>voertuigen getaxeerd</span></div>
          <div className="text-center"><span className="text-lg font-bold text-foreground">13 jaar</span><span className="text-xs ml-1" style={{ color: '#4a5568' }}>ervaring</span></div>
          <div className="text-center"><span className="text-lg font-bold text-foreground">Landelijk</span><span className="text-xs ml-1" style={{ color: '#4a5568' }}>werkzaam in groot deel van NL</span></div>
        </div></div>
      </section>

      <section className="py-10 md:py-12 px-6 md:px-8" style={{ background: '#f0f4f8' }}>
        <div className="container-wide"><div className="grid md:grid-cols-2 gap-8">
          <div><h2 className="text-xl md:text-2xl font-semibold mb-5">Wat kun je verwachten?</h2><div className="space-y-3">{["Exacte berekening per methode", "Duidelijke uitleg welke het gunstigst is", "Overzicht binnen 24 uur", "Persoonlijk advies over je situatie"].map((item, i) => (<div key={i} className="flex items-center gap-4 bg-white rounded-[10px] px-5 py-4" style={{ boxShadow: '0 2px 8px rgba(0,0,0,0.06)' }}><div className="w-8 h-8 rounded-full flex-shrink-0 flex items-center justify-center" style={{ background: 'rgba(255,117,31,0.12)' }}><CheckCircle className="w-4 h-4 text-cta" /></div><span className="text-[15px]" style={{ color: '#4a5568' }}>{item}</span></div>))}</div></div>
          <div><h2 className="text-xl md:text-2xl font-semibold mb-5">Wat hebben wij nodig?</h2><div className="space-y-3">{["Buitenlands kenteken of chassisnummer", "Merk, model en bouwjaar", "Brandstoftype en CO2-waarde", "Eventuele schade-informatie"].map((item, i) => (<div key={i} className="flex items-center gap-4 bg-white rounded-[10px] px-5 py-4" style={{ boxShadow: '0 2px 8px rgba(0,0,0,0.06)' }}><div className="w-8 h-8 rounded-full flex-shrink-0 flex items-center justify-center" style={{ background: 'rgba(29,60,113,0.08)' }}><CheckCircle className="w-4 h-4 text-primary" /></div><span className="text-[15px]" style={{ color: '#4a5568' }}>{item}</span></div>))}</div></div>
        </div></div>
      </section>

      <section className="py-10 md:py-14 px-6 md:px-8 bg-background" ref={formRef}>
        <div className="container-wide"><div className="text-center mb-8"><h2 className="text-2xl md:text-3xl font-semibold mb-2">BPM voorbereiding aanvragen</h2><p className="text-[15px] max-w-2xl mx-auto" style={{ color: '#4a5568' }}>Vul het formulier in en wij nemen binnen één werkdag contact met je op.</p></div>
        <div className="grid md:grid-cols-[1fr_380px] gap-8"><div><IntakeForm serviceType="BPM voorbereiding" formTitle="BPM voorbereiding aanvragen" formSubtext="Vul onderstaand formulier zo volledig mogelijk in." submitButtonText="BPM voorbereiding aanvragen" showVoertuigType={true} /></div><ContactSidebar /></div></div>
      </section>

      <SiteFooter />
      <WhatsAppButton />
    </div>
  );
};

export default BpmVoorbereiding;
