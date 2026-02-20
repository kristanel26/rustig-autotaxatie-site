import { Link, useLocation } from "react-router-dom";
import { Phone, Mail, Menu, X } from "lucide-react";
import { useState } from "react";
import { Button } from "@/components/ui/button";

const navLinks = [
  { label: "Home", href: "/" },
  { label: "BPM-taxatie", href: "/bpm-taxatie" },
  { label: "Verzekeringstaxatie", href: "/verzekeringstaxatie-info" },
  { label: "WEV-taxatie", href: "/wev-taxatie" },
  { label: "FAQ", href: "/faq" },
  { label: "Contact", href: "/contact" },
];

const SiteHeader = () => {
  const [mobileOpen, setMobileOpen] = useState(false);
  const location = useLocation();

  return (
    <header className="py-4 px-6 md:px-8 border-b border-border bg-background sticky top-0 z-50">
      <div className="container-wide flex items-center justify-between">
        <Link to="/" className="text-xl font-bold text-foreground hover:text-foreground/80 transition-colors">
          Automobiel Taxaties
        </Link>

        {/* Desktop nav */}
        <nav className="hidden lg:flex items-center gap-1">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              to={link.href}
              className={`px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                location.pathname === link.href
                  ? "text-foreground bg-secondary"
                  : "text-muted-foreground hover:text-foreground hover:bg-secondary/50"
              }`}
            >
              {link.label}
            </Link>
          ))}
        </nav>

        <div className="hidden md:flex items-center gap-4 text-sm text-muted-foreground">
          <a href="tel:+31854832461" className="flex items-center gap-2 hover:text-foreground transition-colors">
            <Phone className="w-4 h-4" />
            085 483 2461
          </a>
        </div>

        {/* Mobile menu button */}
        <button
          className="lg:hidden p-2 text-muted-foreground hover:text-foreground"
          onClick={() => setMobileOpen(!mobileOpen)}
          aria-label="Menu"
        >
          {mobileOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </div>

      {/* Mobile nav */}
      {mobileOpen && (
        <nav className="lg:hidden mt-4 pb-4 border-t border-border pt-4 space-y-1">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              to={link.href}
              onClick={() => setMobileOpen(false)}
              className={`block px-4 py-2 rounded-md text-sm font-medium transition-colors ${
                location.pathname === link.href
                  ? "text-foreground bg-secondary"
                  : "text-muted-foreground hover:text-foreground hover:bg-secondary/50"
              }`}
            >
              {link.label}
            </Link>
          ))}
          <div className="pt-3 px-4 space-y-2 text-sm text-muted-foreground">
            <a href="tel:+31854832461" className="flex items-center gap-2 hover:text-foreground transition-colors">
              <Phone className="w-4 h-4" />
              085 483 2461
            </a>
            <a href="mailto:erik@automobieltaxaties.nl" className="flex items-center gap-2 hover:text-foreground transition-colors">
              <Mail className="w-4 h-4" />
              erik@automobieltaxaties.nl
            </a>
          </div>
        </nav>
      )}
    </header>
  );
};

export default SiteHeader;
