import WhatsAppButton from "@/components/WhatsAppButton";
import { Link } from "react-router-dom";
import { Phone, Mail, Clock } from "lucide-react";
import UspBar from "@/components/UspBar";
import SiteHeader from "@/components/SiteHeader";
import SiteFooter from "@/components/SiteFooter";
import BookingWizard from "@/components/BookingWizard";
import PageMeta from "@/components/PageMeta";
import erikPhoto from "@/assets/erik-elderson.png";
import heroContact from "@/assets/hero-contact.png";

const Contact = () => {
  return (
    <div className="min-h-screen bg-white">
      <PageMeta
        title="Contact | Automobiel Taxaties | 085 483 2461"
        description="Neem contact op met Automobiel Taxaties. Bel 085 483 2461 of stuur een bericht. Erik reageert binnen één werkdag. Locatie: Druten."
      />
      <SiteHeader />

      {/* Hero */}
      <section className="relative overflow-hidden flex items-center" style={{ height: 420, minHeight: 420, maxHeight: 420 }}>
        <div className="absolute inset-0">
          <img src={heroContact} alt="" className="w-full h-full object-cover" style={{ objectPosition: 'center 20%' }} />
          <div className="absolute inset-0" style={{ background: 'rgba(29,60,113,0.60)' }} />
        </div>
        <div className="max-w-7xl mx-auto px-6 lg:px-8 relative z-10 w-full">
          <div style={{ width: 32, height: 2, background: '#ff751f', marginBottom: 12 }} />
          <span
            className="inline-block mb-3"
            style={{ fontFamily: "'Inter', sans-serif", fontSize: 12, fontWeight: 500, letterSpacing: '0.1em', textTransform: 'uppercase', color: '#ff751f' }}
          >
            CONTACT
          </span>
          <h1
            style={{ fontFamily: "'Playfair Display', serif", fontSize: 'clamp(32px, 4vw, 48px)', fontWeight: 700, lineHeight: 1.15, color: '#ffffff', maxWidth: 700 }}
          >
            Taxatie aanvragen
          </h1>
          <p style={{ fontFamily: "'Inter', sans-serif", fontSize: 17, color: 'rgba(255,255,255,0.9)', lineHeight: 1.7, maxWidth: 600, marginTop: 16 }}>
            Vul het formulier in en wij nemen binnen één werkdag contact met je op.
          </p>
        </div>
      </section>
      <UspBar />

      {/* Wizard + sidebar */}
      <section className="py-16 md:py-24 px-6 lg:px-8 bg-white">
        <div className="max-w-7xl mx-auto grid lg:grid-cols-[340px_1fr] gap-10 items-start">
          {/* Sidebar — one unified blue card */}
          <div
            className="rounded-[12px] p-8 text-white"
            style={{
              background: '#1d3c71',
              backgroundImage: 'radial-gradient(ellipse at 20% 50%, rgba(105,141,179,0.15) 0%, transparent 60%)',
            }}
          >
            {/* Erik profile */}
            <div className="flex items-center gap-4 mb-5">
              <img src={erikPhoto} alt="Erik Elderson" className="w-[72px] h-[72px] rounded-full object-cover" loading="lazy" />
              <div>
                <p className="font-bold text-[18px]">Erik Elderson</p>
                <p style={{ fontSize: 13, opacity: 0.8, lineHeight: 1.5, marginTop: 2 }}>Eigenaar — Notarieel Beëdigd TMV Register-Taxateur — Register-Taxateur VRT</p>
              </div>
            </div>

            <div style={{ height: 1, background: 'rgba(255,255,255,0.15)', margin: '20px 0' }} />

            {/* Contact details */}
            <div className="space-y-3" style={{ fontSize: 15 }}>
              <a href="tel:+31854832461" className="flex items-center gap-3 hover:opacity-80 transition-opacity">
                <Phone className="w-4 h-4" style={{ opacity: 0.7 }} />
                <span className="font-bold">085 483 2461</span>
              </a>
              <a href="tel:+31650694978" className="flex items-center gap-3 hover:opacity-80 transition-opacity">
                <Phone className="w-4 h-4" style={{ opacity: 0.7 }} />
                <span>06 50694978</span>
              </a>
              <a href="mailto:erik@automobieltaxaties.nl" className="flex items-center gap-3 hover:opacity-80 transition-opacity">
                <Mail className="w-4 h-4" style={{ opacity: 0.7 }} />
                <span>erik@automobieltaxaties.nl</span>
              </a>
              <div className="flex items-center gap-3">
                <Clock className="w-4 h-4" style={{ opacity: 0.7 }} />
                <span>ma-vr 8:30 – 17:00</span>
              </div>
            </div>

            <div style={{ height: 1, background: 'rgba(255,255,255,0.15)', margin: '20px 0' }} />

            {/* Business details */}
            <p className="uppercase mb-2" style={{ fontSize: 11, letterSpacing: '0.1em', opacity: 0.6 }}>BEDRIJFSGEGEVENS</p>
            <div className="space-y-1" style={{ fontSize: 13, opacity: 0.75 }}>
              <p>KvK: 71468889</p>
              <p>BTW: NL858727493B01</p>
            </div>

            {/* CTA button */}
            <a href="tel:+31854832461" className="block mt-6">
              <button
                className="w-full font-bold text-[15px] rounded-lg transition-colors"
                style={{ background: '#ff751f', color: '#fff', height: 48, border: 'none', cursor: 'pointer', boxShadow: '0 3px 12px rgba(255,117,31,0.35)' }}
                onMouseEnter={e => e.currentTarget.style.background = '#e8651a'}
                onMouseLeave={e => e.currentTarget.style.background = '#ff751f'}
              >
                Bel direct: 085 483 2461
              </button>
            </a>
          </div>

          {/* Wizard card */}
          <div
            className="rounded-2xl p-8 sm:p-12 bg-white"
            style={{
              boxShadow: '0 4px 32px rgba(29,60,113,0.09), 0 1px 8px rgba(0,0,0,0.04)',
            }}
          >
            <BookingWizard />
          </div>
        </div>
      </section>

      <SiteFooter />
      <WhatsAppButton />
    </div>
  );
};

export default Contact;
