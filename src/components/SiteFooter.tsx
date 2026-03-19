import { Link } from "react-router-dom";
import { Phone, Mail, MapPin, Clock } from "lucide-react";
import { useState } from "react";
import logo from "@/assets/logo-automobiel-taxaties.png";
import logoFehac from "@/assets/logo-fehac.png";
import logoTmv from "@/assets/logo-tmv.png";
import logoVrt from "@/assets/logo-vrt.png";
import logoHobeon from "@/assets/logo-hobeon.webp";

const dienstenLinks = [
  { label: "BPM Taxatie", href: "/bpm-taxatie" },
  { label: "Verzekeringstaxatie", href: "/verzekeringstaxatie-info" },
  { label: "WEV Taxatie", href: "/wev-taxatie" },
  { label: "Werkwijze", href: "/werkwijze" },
  { label: "Over ons", href: "/over-ons" },
  { label: "FAQ", href: "/faq" },
  { label: "Nieuws", href: "/nieuws" },
  { label: "Contact", href: "/contact" },
];

/* SVG social icons */
const SocialIcon = ({ type }: { type: string }) => {
  const icons: Record<string, JSX.Element> = {
    facebook: (
      <svg viewBox="0 0 24 24" className="w-4 h-4 fill-current"><path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/></svg>
    ),
    instagram: (
      <svg viewBox="0 0 24 24" className="w-4 h-4 fill-current"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z"/></svg>
    ),
    linkedin: (
      <svg viewBox="0 0 24 24" className="w-4 h-4 fill-current"><path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/></svg>
    ),
    youtube: (
      <svg viewBox="0 0 24 24" className="w-4 h-4 fill-current"><path d="M23.498 6.186a3.016 3.016 0 00-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 00.502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 002.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 002.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/></svg>
    ),
  };
  return icons[type] || null;
};

const SiteFooter = () => {
  const [email, setEmail] = useState("");

  const handleNewsletter = (e: React.FormEvent) => {
    e.preventDefault();
    setEmail("");
    alert("Bedankt voor je aanmelding.");
  };

  return (
    <>
      {/* Newsletter bar */}
      <section className="py-10 px-6" style={{ background: '#f0f4f8' }}>
        <div className="max-w-2xl mx-auto text-center">
          <p className="text-foreground font-medium mb-4">
            Blijf op de hoogte van BPM-nieuws en wijzigingen in de regelgeving.
          </p>
          <form onSubmit={handleNewsletter} className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto">
            <input
              type="email"
              placeholder="Je e-mailadres"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="flex-1 px-4 py-2.5 rounded-md border border-border text-sm focus:outline-none focus:ring-2 focus:ring-[hsl(var(--primary))] focus:border-transparent"
            />
            <button
              type="submit"
              className="btn-cta !py-2.5 !px-6 !text-sm"
            >
              Aanmelden
            </button>
          </form>
        </div>
      </section>

      {/* Main footer */}
      <footer className="bg-[hsl(var(--primary))] text-white py-14 px-6 lg:px-8">
        <div className="max-w-[1100px] mx-auto px-0">
          {/* Orange accent bar above logo */}
          <div className="grid md:grid-cols-3 gap-10 mb-10">
            {/* Column 1 - About */}
            <div className="border-b border-white/10 pb-8 md:border-0 md:pb-0 flex flex-col items-start">
              <img src={logo} alt="Automobiel Taxaties" className="h-12 w-auto mb-4 brightness-0 invert" />
              <p className="text-white/70 text-sm leading-relaxed mb-6 text-left">
                Erkend taxatiebureau voor BPM, verzekering en waardebepaling. Landelijk actief vanuit Druten.
              </p>
              <div className="flex items-center gap-3 justify-start">
                {(["facebook", "instagram", "linkedin", "youtube"] as const).map((social) => (
                  <a
                    key={social}
                    href={`https://${social}.com`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center hover:bg-white/20 transition-colors"
                  >
                    <SocialIcon type={social} />
                  </a>
                ))}
              </div>
            </div>

            {/* Column 2 - Diensten */}
            <div className="border-b border-white/10 pb-8 md:border-0 md:pb-0">
              <h3 className="font-semibold text-base mb-4">Diensten</h3>
              <ul className="space-y-2.5">
                {dienstenLinks.map((link) => (
                  <li key={link.href}>
                    <Link to={link.href} className="text-white/70 text-sm hover:text-white transition-colors">
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Column 3 - Contact */}
            <div>
              <h3 className="font-semibold text-base mb-4">Contact</h3>
              <ul className="space-y-3 text-sm text-white/70">
                <li className="flex items-start gap-2.5">
                  <MapPin className="w-4 h-4 mt-0.5 shrink-0" />
                  <span>Van Heemstraweg 123<br />6651 KH Druten</span>
                </li>
                <li>
                  <a href="tel:+31854832461" className="flex items-center gap-2.5 hover:text-white transition-colors">
                    <Phone className="w-4 h-4 shrink-0" />
                    085 483 2461
                  </a>
                </li>
                <li>
                  <a href="https://wa.me/31629182258" className="flex items-center gap-2.5 hover:text-white transition-colors">
                    <Phone className="w-4 h-4 shrink-0" />
                    WhatsApp: 06 29182258
                  </a>
                </li>
                <li>
                  <a href="mailto:algemeen@automobieltaxaties.nl" className="flex items-center gap-2.5 hover:text-white transition-colors">
                    <Mail className="w-4 h-4 shrink-0" />
                    algemeen@automobieltaxaties.nl
                  </a>
                </li>
                <li className="flex items-center gap-2.5">
                  <Clock className="w-4 h-4 shrink-0" />
                  ma-vr 8:30 - 17:00
                </li>
              </ul>
            </div>
          </div>
        </div>
      </footer>

      {/* Certifications bar */}
      <div className="bg-[hsl(216,58%,22%)] py-6 px-6 border-t border-white/10">
        <div className="max-w-[1100px] mx-auto flex flex-wrap items-center justify-center gap-10">
          <img src={logoTmv} alt="TMV Federatie" className="h-10 w-auto brightness-0 invert opacity-75 hover:opacity-100 transition-opacity" />
          <img src={logoVrt} alt="VRT Register" className="h-10 w-auto brightness-0 invert opacity-75 hover:opacity-100 transition-opacity" />
          <img src={logoFehac} alt="FEHAC" className="h-10 w-auto brightness-0 invert opacity-75 hover:opacity-100 transition-opacity" />
          <img src={logoHobeon} alt="Hobeon" className="h-10 w-auto brightness-0 invert opacity-75 hover:opacity-100 transition-opacity" />
        </div>
      </div>

      {/* Copyright */}
      <div className="bg-[hsl(216,58%,18%)] py-4 px-6">
        <p className="text-center text-white/50 text-xs">
          &copy; {new Date().getFullYear()} Automobieltaxaties.nl &mdash; KvK 71468889 &mdash; BTW NL858727493B01
        </p>
      </div>
    </>
  );
};

export default SiteFooter;
