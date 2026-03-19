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

const SiteFooter = () => {
  const [email, setEmail] = useState("");

  const handleNewsletter = (e: React.FormEvent) => {
    e.preventDefault();
    // placeholder - could connect to an email service later
    setEmail("");
    alert("Bedankt voor je aanmelding.");
  };

  return (
    <>
      {/* Newsletter bar */}
      <section className="bg-[#f7f8fa] py-10 px-6">
        <div className="max-w-2xl mx-auto text-center">
          <p className="text-[#1a1a1a] font-medium mb-4">
            Blijf op de hoogte van BPM-nieuws en wijzigingen in de regelgeving.
          </p>
          <form onSubmit={handleNewsletter} className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto">
            <input
              type="email"
              placeholder="Je e-mailadres"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="flex-1 px-4 py-2.5 rounded-lg border border-[#adafc7] text-sm focus:outline-none focus:ring-2 focus:ring-[#1d3c71] focus:border-transparent"
            />
            <button
              type="submit"
              className="bg-[#ff751f] text-white font-semibold text-sm px-6 py-2.5 rounded-lg hover:bg-[#e5681b] transition-colors"
            >
              Aanmelden
            </button>
          </form>
        </div>
      </section>

      {/* Main footer */}
      <footer className="bg-[#1d3c71] text-white py-14 px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="grid md:grid-cols-3 gap-10 mb-10">
            {/* Column 1 - About */}
            <div>
              <img src={logo} alt="Automobiel Taxaties" className="h-10 w-auto mb-4 brightness-0 invert" />
              <p className="text-white/70 text-sm leading-relaxed mb-6">
                Erkend taxatiebureau voor BPM, verzekering en waardebepaling. Landelijk actief vanuit Druten.
              </p>
              <div className="flex items-center gap-4">
                <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" className="w-9 h-9 rounded-full bg-white/10 flex items-center justify-center hover:bg-white/20 transition-colors text-xs font-bold">
                  FB
                </a>
                <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="w-9 h-9 rounded-full bg-white/10 flex items-center justify-center hover:bg-white/20 transition-colors text-xs font-bold">
                  IG
                </a>
                <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" className="w-9 h-9 rounded-full bg-white/10 flex items-center justify-center hover:bg-white/20 transition-colors text-xs font-bold">
                  LI
                </a>
                <a href="https://youtube.com" target="_blank" rel="noopener noreferrer" className="w-9 h-9 rounded-full bg-white/10 flex items-center justify-center hover:bg-white/20 transition-colors text-xs font-bold">
                  YT
                </a>
              </div>
            </div>

            {/* Column 2 - Diensten */}
            <div>
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
      <div className="bg-[#162f5c] py-5 px-6 border-t border-white/10">
        <div className="max-w-7xl mx-auto flex flex-wrap items-center justify-center gap-8">
          <img src={logoTmv} alt="TMV Federatie" className="h-8 w-auto brightness-0 invert opacity-70 hover:opacity-100 transition-opacity" />
          <img src={logoVrt} alt="VRT Register" className="h-8 w-auto brightness-0 invert opacity-70 hover:opacity-100 transition-opacity" />
          <img src={logoFehac} alt="FEHAC" className="h-8 w-auto brightness-0 invert opacity-70 hover:opacity-100 transition-opacity" />
          <img src={logoHobeon} alt="Hobeon" className="h-8 w-auto brightness-0 invert opacity-70 hover:opacity-100 transition-opacity" />
        </div>
      </div>

      {/* Copyright */}
      <div className="bg-[#142a52] py-4 px-6">
        <p className="text-center text-white/50 text-xs">
          &copy; {new Date().getFullYear()} Automobieltaxaties.nl &mdash; KvK 71468889 &mdash; BTW NL858727493B01
        </p>
      </div>
    </>
  );
};

export default SiteFooter;
