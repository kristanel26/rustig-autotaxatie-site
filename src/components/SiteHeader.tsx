import { Link, useLocation } from "react-router-dom";
import { Phone, Menu, X } from "lucide-react";
import { useState, useEffect } from "react";
import logo from "@/assets/logo-automobiel-taxaties.png";
import ThemeToggle from "@/components/ThemeToggle";

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
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header
      className={`sticky top-0 z-50 transition-all duration-300 ${
        scrolled
          ? "glass-header py-3"
          : "bg-transparent py-4 border-b border-transparent"
      } px-6 md:px-8`}
    >
      <div className="container-wide flex items-center justify-between">
        <Link to="/" className="flex items-center group">
          <img
            src={logo}
            alt="Automobiel Taxaties"
            className="h-14 w-auto transition-all duration-300 group-hover:opacity-80"
          />
        </Link>

        {/* Desktop nav */}
        <nav className="hidden lg:flex items-center gap-1">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              to={link.href}
              className={`px-3 py-2 rounded-lg text-sm font-medium transition-all duration-200 ${
                location.pathname === link.href
                  ? scrolled
                    ? "text-foreground bg-secondary"
                    : "text-primary-foreground bg-white/15"
                  : scrolled
                    ? "text-muted-foreground hover:text-foreground hover:bg-secondary/80"
                    : "text-primary-foreground/70 hover:text-primary-foreground hover:bg-white/10"
              }`}
            >
              {link.label}
            </Link>
          ))}
        </nav>

        <div className="hidden md:flex items-center gap-3">
          <a
            href="tel:+31854832461"
            className={`flex items-center gap-2 text-sm font-medium px-4 py-2 rounded-lg transition-all duration-200 ${
              scrolled
                ? "text-muted-foreground hover:text-foreground hover:bg-secondary/80"
                : "text-primary-foreground/70 hover:text-primary-foreground hover:bg-white/10"
            }`}
          >
            <Phone className="w-4 h-4" />
            085 483 2461
          </a>
          <ThemeToggle scrolled={scrolled} />
        </div>

        {/* Mobile menu button */}
        <button
          className={`lg:hidden p-2 rounded-lg transition-colors ${
            scrolled ? "text-muted-foreground hover:text-foreground" : "text-primary-foreground/70 hover:text-primary-foreground"
          }`}
          onClick={() => setMobileOpen(!mobileOpen)}
          aria-label="Menu"
        >
          {mobileOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </div>

      {/* Mobile nav */}
      {mobileOpen && (
        <nav className="lg:hidden mt-4 pb-4 border-t border-border/50 pt-4 space-y-1 bg-background rounded-b-xl">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              to={link.href}
              onClick={() => setMobileOpen(false)}
              className={`block px-4 py-2.5 rounded-lg text-sm font-medium transition-colors ${
                location.pathname === link.href
                  ? "text-foreground bg-secondary"
                  : "text-muted-foreground hover:text-foreground hover:bg-secondary/50"
              }`}
            >
              {link.label}
            </Link>
          ))}
          <div className="pt-3 px-4">
            <a
              href="tel:+31854832461"
              className="flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors"
            >
              <Phone className="w-4 h-4" />
              085 483 2461
            </a>
          </div>
        </nav>
      )}
    </header>
  );
};

export default SiteHeader;
