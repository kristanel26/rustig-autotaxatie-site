import Breadcrumbs from "@/components/Breadcrumbs";
import WhatsAppButton from "@/components/WhatsAppButton";
import PageMeta from "@/components/PageMeta";
import UspBar from "@/components/UspBar";
import CertificationBar from "@/components/CertificationBar";
import { Link } from "react-router-dom";
import { Phone, Car, Shield, Scale, Wrench, ArrowRight } from "lucide-react";
import SiteHeader from "@/components/SiteHeader";
import SiteFooter from "@/components/SiteFooter";
import erikPhoto from "@/assets/erik-over-ons.png";

import heroOverOns from "@/assets/hero-overons.png";

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

const OverOns = () => {
  return (
    <div className="min-h-screen bg-white">
      <PageMeta
        title="Over ons | Erik Elderson | Automobiel Taxaties"
        description="Automobiel Taxaties is opgericht door Erik Elderson. Notarieel Beëdigd TMV Register-Taxateur en Register-Taxateur VRT. Werkzaam in het grootste gedeelte van Nederland."
      />
      <SiteHeader />
      <Breadcrumbs items={[{ label: "Over ons" }]} />

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
          <div className="relative hidden md:flex flex-col gap-6">
            <div className="relative">
              <div className="absolute rounded-sm" style={{ left: -20, top: 40, bottom: 40, width: 4, background: 'linear-gradient(to bottom, #ff751f 0%, rgba(255,117,31,0.20) 100%)' }} />
              <div className="rounded-2xl overflow-hidden relative" style={{ marginTop: -40, boxShadow: '0 24px 64px rgba(0,0,0,0.35), 0 8px 24px rgba(0,0,0,0.20)' }}>
                <img
                  src={erikPhoto}
                  alt="Erik Elderson, eigenaar en taxateur van Automobiel Taxaties"
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
              Eigenaar, Notarieel Beëdigd TMV Register-Taxateur, Register-Taxateur VRT
            </p>

            {/* Certification logos */}
            <CertificationBar variant="inline" />

            <div className="space-y-3.5 mb-7">
              <p style={{ fontFamily: "'Inter', sans-serif", fontSize: 15, fontWeight: 400, lineHeight: 1.75, color: 'rgba(255,255,255,0.78)' }}>
                Automobiel Taxaties is in 2013 opgericht door Erik Elderson vanuit één duidelijke overtuiging: een taxatierapport moet niet alleen kloppen, maar ook standhouden wanneer het wordt beoordeeld.
              </p>
              <p style={{ fontFamily: "'Inter', sans-serif", fontSize: 15, fontWeight: 400, lineHeight: 1.75, color: 'rgba(255,255,255,0.78)' }}>
                Die overtuiging komt voort uit jarenlange ervaring in de taxatiebranche. Geen aannames of snelle conclusies, maar zorgvuldig werk dat onderbouwd en controleerbaar is.
              </p>
              <p style={{ fontFamily: "'Inter', sans-serif", fontSize: 15, fontWeight: 400, lineHeight: 1.75, color: 'rgba(255,255,255,0.78)' }}>
                Erik rijdt dagelijks door het land om voertuigen op te nemen. Met oog voor detail en aandacht voor het geheel. Van lakdiktemetingen tot schades en gebruikssporen, alles wordt vastgelegd in een compleet en verdedigbaar rapport.
              </p>
              <p style={{ fontFamily: "'Inter', sans-serif", fontSize: 15, fontWeight: 400, lineHeight: 1.75, color: 'rgba(255,255,255,0.78)' }}>
                De rapporten worden opgesteld met het oog op gebruik richting Belastingdienst, RDW, verzekeraars en andere betrokken partijen. Daarbij wordt gewerkt binnen de geldende richtlijnen, met onderbouwingen die controleerbaar zijn.
              </p>
              <p style={{ fontFamily: "'Inter', sans-serif", fontSize: 15, fontWeight: 400, lineHeight: 1.75, color: 'rgba(255,255,255,0.78)' }}>
                In de praktijk betekent dit dat opdrachtgevers weten waar ze aan toe zijn, vooraf en achteraf.
              </p>
              <p style={{ fontFamily: "'Inter', sans-serif", fontSize: 15, fontWeight: 400, lineHeight: 1.75, color: 'rgba(255,255,255,0.78)' }}>
                Veel klanten werken daarom langdurig met Automobiel Taxaties samen. Niet alleen vanwege snelheid of uitkomst, maar omdat de werkwijze duidelijk is en de rapportages consequent op dezelfde zorgvuldige manier worden opgebouwd.
              </p>
              <p style={{ fontFamily: "'Inter', sans-serif", fontSize: 15, fontWeight: 400, lineHeight: 1.75, color: 'rgba(255,255,255,0.78)' }}>
                Je hebt altijd direct contact met Erik zelf. Hij verzorgt de opname, stelt het rapport op en is jouw aanspreekpunt. Zonder tussenpersonen, zodat er geen ruis ontstaat en je snel duidelijkheid hebt.
              </p>
              <p style={{ fontFamily: "'Inter', sans-serif", fontSize: 15, fontWeight: 400, lineHeight: 1.75, color: 'rgba(255,255,255,0.78)' }}>
                Uiteindelijk gaat het niet alleen om de waarde van een voertuig. Het gaat erom dat die waarde klopt, en dat je daarop kunt vertrouwen wanneer het ertoe doet.
              </p>
              <p style={{ fontFamily: "'Inter', sans-serif", fontSize: 15, fontWeight: 400, lineHeight: 1.75, color: 'rgba(255,255,255,0.78)' }}>
                Wil je vooraf weten waar je aan toe bent? Dan kun je eenvoudig een taxatie aanvragen. Je krijgt altijd persoonlijk reactie, zodat je direct duidelijkheid hebt.
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
            Een taxatierapport is pas goed als het ook bij controle overeind blijft. Daar teken ik voor.
          </p>
          <p className="font-bold text-white text-sm" style={{ fontFamily: "'Inter', sans-serif" }}>
            Erik Elderson, Eigenaar Automobiel Taxaties
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
