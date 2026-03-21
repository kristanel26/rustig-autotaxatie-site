import WhatsAppButton from "@/components/WhatsAppButton";
import PageMeta from "@/components/PageMeta";
import UspBar from "@/components/UspBar";
import { Link } from "react-router-dom";
import { Phone, Car, Shield, Scale, Wrench, ArrowRight } from "lucide-react";
import SiteHeader from "@/components/SiteHeader";
import SiteFooter from "@/components/SiteFooter";
import erikPhoto from "@/assets/erik-over-ons.png";
import heroOverOns from "@/assets/hero-overons.png";
import stepAanvraag from "@/assets/erik-aanvraag.png";
import stepAdvies from "@/assets/step-advies.png";
import stepInspectie from "@/assets/step-inspectie.png";
import stepRapport from "@/assets/step-rapport.png";
import stepAfhandeling from "@/assets/step-regelen.png";

const diensten = [
  {
    icon: Car,
    title: "BPM Taxatie",
    text: "Voor importeurs, dealers en particulieren die een gebruikt voertuig uit het buitenland invoeren. Wij stellen de laagst haalbare rest-BPM vast.",
  },
  {
    icon: Shield,
    title: "Verzekeringstaxatie",
    text: "Voor campers, oldtimers, youngtimers, motors en foodtrucks. De waarde wordt vooraf vastgelegd zodat je bij schade of diefstal correct wordt uitbetaald.",
  },
  {
    icon: Scale,
    title: "WEV Taxatie",
    text: "Werkelijke economische waardebepaling voor zakelijke doeleinden, aankoop, verkoop of geschillen. Onafhankelijk en officieel erkend.",
  },
  {
    icon: Wrench,
    title: "Schadevaststelling",
    text: "Onafhankelijke vaststelling van schade aan voertuigen. Bruikbaar bij verzekeringsclaims, geschillen of aankoop van een voertuig met schade.",
  },
];

const stappen = [
  {
    image: stepAanvraag,
    title: "Aanvraag indienen",
    text: "Vul het aanvraagformulier in of bel ons. Geef het type voertuig en het doel van de taxatie door, of het nu gaat om BPM, verzekering, WEV of schadevaststelling. Wij nemen binnen één werkdag contact op.",
  },
  {
    image: stepAdvies,
    title: "Advies binnen één werkdag",
    text: "Erik beoordeelt de aanvraag en geeft direct advies over de beste aanpak. Bij BPM-taxaties berekenen wij vooraf wat de laagst haalbare BPM is. Bij verzekeringstaxaties, WEV en schadevaststelling denken wij mee over de juiste methode voor jouw voertuig.",
  },
  {
    image: stepInspectie,
    title: "Fysieke inspectie op locatie",
    text: "Erik komt naar het voertuig toe, in het grootste gedeelte van Nederland. De inspectie omvat lakdiktemetingen, staat- en schade-opname en een uitgebreid fotodossier. Voor elk type taxatie wordt de inspectie afgestemd op het doel.",
  },
  {
    image: stepRapport,
    title: "Rapport digitaal",
    text: "Na de inspectie ontvang je het taxatierapport per e-mail. Het rapport is officieel erkend, juridisch verdedigbaar en geschikt voor de Belastingdienst, verzekeraar of andere partijen.",
  },
  {
    image: stepAfhandeling,
    title: "Aangifte of verzekering regelen",
    text: "Met het rapport regel je de BPM-aangifte, sluit je de verzekering af op de getaxeerde waarde of gebruik je het rapport bij een geschil of aankoop. Wij helpen je hier desgewenst bij.",
  },
];

const OverOns = () => {
  return (
    <div className="min-h-screen bg-white">
      <PageMeta
        title="Over ons | Automobiel Taxaties"
        description="Automobiel Taxaties is Erik Elderson. Erkend taxateur voor BPM, verzekeringstaxatie, WEV-taxatie en schadevaststelling, werkzaam in het grootste gedeelte van Nederland."
      />
      <SiteHeader />

      {/* ── HERO with background image ── */}
      <section className="relative overflow-hidden flex items-center" style={{ height: 420, minHeight: 420, maxHeight: 420 }}>
        <div className="absolute inset-0 bg-cover bg-center" style={{ backgroundImage: `url(${heroOverOns})`, objectPosition: 'center top' }} />
        <div className="absolute inset-0" style={{ background: 'rgba(29,60,113,0.75)' }} />
        <div className="max-w-7xl mx-auto px-6 lg:px-8 relative z-10 w-full">
          <div style={{ width: 32, height: 2, background: '#ff751f', marginBottom: 12 }} />
          <span
            className="inline-block mb-3"
            style={{ fontFamily: "'Inter', sans-serif", fontSize: 12, fontWeight: 500, letterSpacing: '0.1em', textTransform: 'uppercase', color: '#ff751f' }}
          >
            OVER ONS
          </span>
          <h1
            style={{ fontFamily: "'Playfair Display', serif", fontSize: 'clamp(32px, 4vw, 56px)', fontWeight: 700, lineHeight: 1.15, color: '#ffffff', maxWidth: 700 }}
          >
            Automobiel Taxaties
          </h1>
          <p style={{ fontFamily: "'Inter', sans-serif", fontSize: 17, color: 'rgba(255,255,255,0.9)', lineHeight: 1.7, maxWidth: 560, marginTop: 16 }}>
            Automobiel Taxaties is Erik Elderson. Erkend taxateur voor BPM, verzekeringstaxatie, WEV-taxatie en schadevaststelling, werkzaam in het grootste gedeelte van Nederland.
          </p>
          <div className="flex flex-col sm:flex-row gap-3">
            <Link to="/contact">
              <button
                className="inline-flex items-center gap-2 font-semibold text-white text-sm rounded-md transition-colors"
                style={{ height: 48, padding: '0 28px', background: '#ff751f', boxShadow: '0 3px 12px rgba(255,117,31,0.35)' }}
                onMouseEnter={(e) => (e.currentTarget.style.background = '#e8651a')}
                onMouseLeave={(e) => (e.currentTarget.style.background = '#ff751f')}
              >
                Taxatie aanvragen
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

      {/* USP Bar */}
      <UspBar />

      {/* Orange accent bar */}
      <div style={{ height: 4, background: '#ff751f', width: '100%' }} />

      {/* ── ERIK SECTIE ── */}
      <section className="relative py-20 md:py-24 overflow-hidden" style={{ background: '#1d3c71' }}>
        <div className="absolute pointer-events-none" style={{ top: -120, right: -120, width: 480, height: 480, borderRadius: '50%', background: 'radial-gradient(circle, rgba(105,141,179,0.18) 0%, transparent 70%)' }} />

        <div className="max-w-[1100px] mx-auto px-6 lg:px-10 grid md:grid-cols-[420px_1fr] gap-16 items-center">
          {/* Photo */}
          <div className="relative hidden md:block">
            <div className="absolute rounded-sm" style={{ left: -20, top: 40, bottom: 40, width: 4, background: 'linear-gradient(to bottom, #ff751f 0%, rgba(255,117,31,0.20) 100%)' }} />
            <div className="rounded-2xl overflow-hidden relative" style={{ marginTop: -40, boxShadow: '0 24px 64px rgba(0,0,0,0.35), 0 8px 24px rgba(0,0,0,0.20)' }}>
              <img
                src={erikPhoto}
                alt="Erik Elderson, Automobiel Taxaties"
                className="w-full block"
                style={{ height: 520, objectFit: 'cover', objectPosition: 'center top', filter: 'contrast(1.05) brightness(0.98)' }}
                loading="lazy"
              />
            </div>
            <div
              className="absolute flex flex-col items-center rounded-[10px]"
              style={{
                bottom: 24,
                left: 24,
                background: 'rgba(29,60,113,0.92)',
                backdropFilter: 'blur(8px)',
                border: '1px solid rgba(255,255,255,0.15)',
                padding: '12px 18px',
              }}
            >
              <span style={{ fontFamily: "'Playfair Display', serif", fontSize: 28, fontWeight: 700, color: '#ff751f', lineHeight: 1 }}>2013</span>
              <span style={{ fontFamily: "'Inter', sans-serif", fontSize: 10, fontWeight: 600, letterSpacing: '0.10em', textTransform: 'uppercase', color: 'rgba(255,255,255,0.65)', marginTop: 4 }}>Opgericht</span>
            </div>
          </div>

          {/* Text */}
          <div>
            <span
              className="flex items-center gap-2.5 mb-4"
              style={{ fontFamily: "'Inter', sans-serif", fontSize: 11, fontWeight: 700, letterSpacing: '0.14em', textTransform: 'uppercase', color: '#ff751f' }}
            >
              <span style={{ display: 'inline-block', width: 28, height: 2, background: '#ff751f', flexShrink: 0 }} />
              Jouw taxateur
            </span>

            <h2 className="font-bold mb-2.5" style={{ fontFamily: "'Playfair Display', serif", fontSize: 'clamp(36px, 4vw, 52px)', lineHeight: 1.05, letterSpacing: '-0.02em', color: '#ffffff' }}>
              Erik Elderson
            </h2>

            <p style={{ fontFamily: "'Inter', sans-serif", fontSize: 13, fontWeight: 400, color: '#698db3', lineHeight: 1.6 }} className="mb-4">
              Eigenaar — Notarieel Beëdigd TMV Register-Taxateur — Register-Taxateur VRT
            </p>

            {/* Certification badges */}
            <div className="flex flex-wrap gap-2 mb-7">
              {["Federatie TMV", "VRT Register", "FEHAC"].map((badge) => (
                <span
                  key={badge}
                  className="text-[11px] font-semibold"
                  style={{
                    letterSpacing: '0.06em',
                    color: '#1d3c71',
                    background: '#EBF2FB',
                    padding: '6px 14px',
                    borderRadius: 6,
                  }}
                >
                  {badge}
                </span>
              ))}
            </div>

            <div className="space-y-3.5 mb-7">
              <p style={{ fontFamily: "'Inter', sans-serif", fontSize: 15, fontWeight: 400, lineHeight: 1.75, color: 'rgba(255,255,255,0.78)' }}>
                In 2013 startte Erik Elderson Automobiel Taxaties vanuit een eenvoudige overtuiging: een taxatierapport moet kloppen, en de klant verdient eerlijk advies.
              </p>
              <p style={{ fontFamily: "'Inter', sans-serif", fontSize: 15, fontWeight: 400, lineHeight: 1.75, color: 'rgba(255,255,255,0.78)' }}>
                Na jarenlange ervaring in de taxatiebranche wist Erik precies wat hij anders wilde doen. Geen aannames, geen haastwerk. Elk voertuig verdient een grondige fysieke inspectie, met lakdiktemetingen, schadecalculatie en een volledig fotodossier als basis.
              </p>
              <p style={{ fontFamily: "'Inter', sans-serif", fontSize: 15, fontWeight: 400, lineHeight: 1.75, color: 'rgba(255,255,255,0.78)' }}>
                Je krijgt altijd direct contact met Erik zelf. Geen callcenter, geen tussenpersoon.
              </p>
            </div>

            <a href="tel:+31854832461">
              <button
                className="inline-flex items-center gap-2 font-semibold text-white text-sm rounded-md transition-colors"
                style={{ height: 46, padding: '0 24px', background: '#ff751f', boxShadow: '0 3px 12px rgba(255,117,31,0.35)' }}
                onMouseEnter={(e) => (e.currentTarget.style.background = '#e8651a')}
                onMouseLeave={(e) => (e.currentTarget.style.background = '#ff751f')}
              >
                <Phone className="w-4 h-4" />
                085 483 2461
              </button>
            </a>
          </div>
        </div>
      </section>

      {/* ── DIENSTEN BLOK ── */}
      <section className="py-16 md:py-24" style={{ background: '#f7f8fa' }}>
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="text-center mb-12">
            <div className="mx-auto mb-3" style={{ width: 40, height: 3, background: '#ff751f' }} />
            <p
              className="mb-3"
              style={{
                fontFamily: "'Inter', sans-serif",
                fontSize: 11,
                fontWeight: 700,
                letterSpacing: '0.15em',
                textTransform: 'uppercase',
                color: '#ff751f',
              }}
            >
              ONZE DIENSTEN
            </p>
            <h2
              className="font-bold"
              style={{ fontFamily: "'Playfair Display', serif", fontSize: 'clamp(28px, 3.5vw, 40px)', lineHeight: 1.15, color: '#1d3c71' }}
            >
              Waarvoor kun je bij ons terecht?
            </h2>
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            {diensten.map((d, i) => (
              <div
                key={i}
                className="bg-white rounded-[10px] p-6 transition-all duration-200 hover:-translate-y-1"
                style={{ boxShadow: '0 2px 12px rgba(0,0,0,0.07)' }}
              >
                <div className="flex items-start gap-4">
                  <div
                    className="flex-shrink-0 w-12 h-12 rounded-lg flex items-center justify-center"
                    style={{ background: '#EBF2FB' }}
                  >
                    <d.icon className="w-6 h-6" style={{ color: '#1d3c71' }} />
                  </div>
                  <div>
                    <h3 className="font-semibold text-lg mb-1.5" style={{ color: '#1d3c71' }}>{d.title}</h3>
                    <p style={{ fontFamily: "'Inter', sans-serif", fontSize: 14, lineHeight: 1.7, color: '#4a5568' }}>
                      {d.text}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── WERKWIJZE — Premium BPM-stijl met foto's ── */}
      <section className="bg-white">
        <div className="max-w-5xl mx-auto px-6 lg:px-8 pt-16 pb-4">
          <div className="mx-auto mb-3 text-center" style={{ width: 40, height: 3, background: '#ff751f' }} />
          <p className="uppercase text-[11px] font-semibold tracking-[0.15em] mb-2 text-center" style={{ color: '#ff751f' }}>
            ONZE WERKWIJZE
          </p>
          <h2 className="text-[28px] md:text-[36px] font-bold text-center" style={{ color: '#1d3c71', fontFamily: "'Playfair Display', serif" }}>
            Hoe werkt een taxatie?
          </h2>
        </div>

        {stappen.map((stap, i) => (
          <section
            key={i}
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
                      {i + 1}
                    </div>
                  </div>
                  <div className="flex-1">
                    <h3 className="text-xl md:text-[22px] font-bold mb-4" style={{ color: '#1d3c71', fontFamily: "'Playfair Display', serif" }}>
                      {stap.title}
                    </h3>
                    <p style={{ fontFamily: "'Inter', sans-serif", fontSize: 15, lineHeight: 1.75, color: '#4a5568' }}>
                      {stap.text}
                    </p>
                  </div>
                </div>
                {/* Image */}
                <div className="shrink-0 md:w-[360px] h-[240px]">
                  <img
                    src={stap.image}
                    alt={stap.title}
                    className="w-full h-full rounded-lg object-cover"
                    style={{ boxShadow: '0 2px 12px rgba(0,0,0,0.10)', borderRadius: 8 }}
                    loading="lazy"
                  />
                </div>
              </div>
            </div>
          </section>
        ))}
      </section>

      {/* ── QUOTE BLOK ── */}
      <section className="py-16 md:py-20" style={{ background: '#1d3c71' }}>
        <div className="max-w-3xl mx-auto px-6 lg:px-8 text-center">
          <span style={{ fontFamily: "'Playfair Display', serif", fontSize: 64, color: '#ff751f', lineHeight: 1 }}>"</span>
          <p
            className="italic mb-6"
            style={{
              fontFamily: "'Playfair Display', serif",
              fontSize: 'clamp(18px, 2.5vw, 24px)',
              lineHeight: 1.6,
              color: '#ffffff',
              marginTop: -20,
            }}
          >
            Ik wil alleen tevreden klanten. Dat bereik ik door eerlijk te zijn, afspraken na te komen en echt te luisteren.
          </p>
          <p className="font-bold text-white text-sm" style={{ fontFamily: "'Inter', sans-serif" }}>
            Erik Elderson — Eigenaar Automobiel Taxaties
          </p>
        </div>
      </section>

      {/* ── CTA ── */}
      <section className="py-16 md:py-20" style={{ background: '#f7f8fa' }}>
        <div className="max-w-7xl mx-auto px-6 lg:px-8 text-center">
          <h2 className="font-bold mb-4" style={{ fontFamily: "'Playfair Display', serif", fontSize: 'clamp(28px, 3.5vw, 40px)', lineHeight: 1.15, color: '#1d3c71' }}>
            Taxatie nodig?
          </h2>
          <p style={{ fontFamily: "'Inter', sans-serif", fontSize: 16, color: '#4a5568', lineHeight: 1.7, maxWidth: 480 }} className="mx-auto mb-8">
            Neem contact op voor een vrijblijvend gesprek of vraag direct een taxatie aan.
          </p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <Link to="/contact">
              <button
                className="inline-flex items-center justify-center gap-2 font-semibold text-white text-sm rounded-md transition-colors"
                style={{ height: 48, padding: '0 28px', background: '#ff751f', boxShadow: '0 3px 12px rgba(255,117,31,0.35)' }}
                onMouseEnter={(e) => (e.currentTarget.style.background = '#e8651a')}
                onMouseLeave={(e) => (e.currentTarget.style.background = '#ff751f')}
              >
                Contact opnemen
                <ArrowRight className="w-4 h-4" />
              </button>
            </Link>
            <a href="tel:+31854832461">
              <button className="btn-outline-white" style={{ color: '#1d3c71', borderColor: '#1d3c71' }}>
                <Phone className="w-5 h-5" />
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

export default OverOns;
