import WhatsAppButton from "@/components/WhatsAppButton";
import { Link } from "react-router-dom";
import { Phone, Mail, MapPin, Clock, ArrowLeft } from "lucide-react";
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
      <section className="relative overflow-hidden flex items-center" style={{ height: 320, minHeight: 320, maxHeight: 320 }}>
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
          {/* Sidebar */}
          <div className="space-y-6">
            <div
              className="rounded-[14px] p-8 text-white"
              style={{
                background: '#1d3c71',
                backgroundImage: 'radial-gradient(ellipse at 20% 50%, rgba(105,141,179,0.20) 0%, transparent 60%)',
              }}
            >
              <h3 className="heading-display text-xl font-semibold mb-3">Liever direct bellen?</h3>
              <p style={{ color: 'rgba(255,255,255,0.72)', fontSize: 14, lineHeight: 1.7 }} className="mb-1">
                Erik staat klaar voor persoonlijk advies.
              </p>
              <a href="tel:+31854832461" className="text-white font-bold text-lg block mt-4 hover:underline">
                <Phone className="w-4 h-4 inline mr-2" />
                085 483 2461
              </a>
            </div>

            <div className="rounded-[14px] p-8" style={{ background: '#f0f4f8' }}>
              <div className="flex gap-4 mb-4">
                <img src={erikPhoto} alt="Erik Elderson" className="w-14 h-14 rounded-full object-cover" loading="lazy" />
                <div>
                  <p className="font-semibold text-sm" style={{ color: '#1a1a1a' }}>Erik Elderson</p>
                  <p className="text-xs leading-relaxed" style={{ color: '#698db3' }}>Eigenaar — Notarieel Beëdigd TMV Register-Taxateur — Register-Taxateur VRT</p>
                </div>
              </div>
              <div className="space-y-3 text-sm" style={{ color: '#4a5568' }}>
                <a href="tel:+31650694978" className="flex items-center gap-2 hover:text-[#1d3c71] transition-colors">
                  <Phone className="w-4 h-4" style={{ color: '#698db3' }} />
                  06 50694978
                </a>
                <a href="mailto:erik@automobieltaxaties.nl" className="flex items-center gap-2 hover:text-[#1d3c71] transition-colors">
                  <Mail className="w-4 h-4" style={{ color: '#698db3' }} />
                  erik@automobieltaxaties.nl
                </a>
                <div className="flex items-start gap-2">
                  <MapPin className="w-4 h-4 mt-0.5" style={{ color: '#698db3' }} />
                  <span>Leigraaf 160, 6651 GJ Druten</span>
                </div>
                <div className="flex items-start gap-2">
                  <Clock className="w-4 h-4 mt-0.5" style={{ color: '#698db3' }} />
                  <span>ma-vr 8:30 – 17:00</span>
                </div>
              </div>
            </div>

            <div className="rounded-[14px] p-6" style={{ border: '1px solid #e2e8f0' }}>
              <h4 className="text-sm font-semibold mb-2" style={{ color: '#1a1a1a' }}>Bedrijfsgegevens</h4>
              <div className="space-y-1 text-xs" style={{ color: '#698db3' }}>
                <p>KvK: 71468889</p>
                <p>BTW: NL858727493B01</p>
                
              </div>
            </div>
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
