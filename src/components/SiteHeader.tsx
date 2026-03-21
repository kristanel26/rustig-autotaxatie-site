import { Link, useLocation } from "react-router-dom";
import { Phone, Menu, X, ChevronDown, Mail, MapPin } from "lucide-react";
import { useState, useEffect, useRef } from "react";
import logo from "@/assets/logo-automobiel-taxaties.png";

const bpmSubLinks = [
  { label: "Stappenplan BPM aangifte", href: "/stappenplan-bpm-aangifte" },
];

const verzekeringSubLinks = [
  { label: "Camper", href: "/camper-taxatie" },
  { label: "Oldtimer", href: "/oldtimer-taxatie" },
  { label: "Youngtimer", href: "/youngtimer-taxatie" },
  { label: "Motor", href: "/motor-taxatie" },
  { label: "Foodtruck", href: "/foodtruck-taxatie" },
  { label: "Schadevaststelling", href: "/schadevaststelling" },
];

const navLinks = [
  { label: "Home", href: "/" },
  { label: "BPM Taxatie", href: "/bpm-taxatie", dropdown: "bpm" },
  { label: "Verzekeringstaxatie", href: "/verzekeringstaxatie-info", dropdown: "verzekering" },
  { label: "WEV Taxatie", href: "/wev-taxatie" },
  { label: "Werkwijze", href: "/werkwijze" },
  { label: "Over ons", href: "/over-ons" },
  { label: "FAQ", href: "/faq" },
  { label: "Nieuws", href: "/nieuws" },
  { label: "Blog", href: "/blog" },
  { label: "Contact", href: "/contact" },
];

const SiteHeader = () => {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [openDropdown, setOpenDropdown] = useState<string | null>(null);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const bpmDropdownRef = useRef<HTMLDivElement>(null);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (
        dropdownRef.current && !dropdownRef.current.contains(e.target as Node) &&
        bpmDropdownRef.current && !bpmDropdownRef.current.contains(e.target as Node)
      ) {
        setOpenDropdown(null);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  useEffect(() => {
    setMobileOpen(false);
    setOpenDropdown(null);
  }, [location.pathname]);

  const isActive = (href: string) => location.pathname === href;
  const isVerzekeringActive = verzekeringSubLinks.some(s => location.pathname === s.href);
  const isBpmActive = bpmSubLinks.some(s => location.pathname === s.href);

  return (
    <>
      {/* Top bar */}
      <div className="bg-[hsl(var(--primary))] text-white text-[13px] hidden md:block">
        <div className="max-w-7xl mx-auto px-6 lg:px-8 h-9 flex items-center justify-between">
          <span className="flex items-center gap-1.5">
            <MapPin className="w-3.5 h-3.5" />
            Leigraaf 160, Druten
          </span>
          <a href="mailto:algemeen@automobieltaxaties.nl" className="hover:text-white/80 transition-colors">
            algemeen@automobieltaxaties.nl
          </a>
          <a href="tel:+31854832461" className="hover:text-white/80 transition-colors flex items-center gap-1.5">
            <Phone className="w-3.5 h-3.5" />
            085 483 2461
          </a>
        </div>
      </div>

      {/* Main navigation */}
      <header
        className={`sticky top-0 z-50 transition-all duration-300 px-6 lg:px-8 ${
          scrolled
            ? "glass-header py-2 shadow-[0_2px_16px_rgba(0,0,0,0.08)]"
            : "bg-white py-3"
        }`}
      >
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <Link to="/" className="flex items-center group">
            <img
              src={logo}
              alt="Automobiel Taxaties"
              style={{ width: 140, height: 'auto' }}
              className="transition-all duration-300 group-hover:opacity-80"
            />
          </Link>

          {/* Desktop nav */}
          <nav className="hidden xl:flex items-center gap-0.5">
            {navLinks.map((link) => {
              const subLinks = link.dropdown === "verzekering" ? verzekeringSubLinks : link.dropdown === "bpm" ? bpmSubLinks : null;
              const isDropdownActive = link.dropdown === "verzekering" ? isVerzekeringActive : link.dropdown === "bpm" ? isBpmActive : false;
              const ref = link.dropdown === "bpm" ? bpmDropdownRef : link.dropdown === "verzekering" ? dropdownRef : undefined;

              return subLinks ? (
                <div key={link.href} className="relative" ref={ref}>
                  <button
                    onClick={() => setOpenDropdown(openDropdown === link.dropdown ? null : (link.dropdown as string))}
                    className={`nav-link px-3 py-2 flex items-center gap-1 ${
                      isActive(link.href) || isDropdownActive ? "active" : ""
                    }`}
                  >
                    {link.label}
                    <ChevronDown className={`w-3.5 h-3.5 transition-transform ${openDropdown === link.dropdown ? "rotate-180" : ""}`} />
                  </button>
                  {openDropdown === link.dropdown && (
                    <div className="absolute top-full left-0 mt-2 bg-white rounded-[14px] shadow-[0_8px_30px_rgba(0,0,0,0.12)] border border-border py-2 min-w-[220px] z-50">
                      <Link
                        to={link.href}
                        className="block px-4 py-2.5 text-sm font-semibold text-[hsl(var(--primary))] hover:bg-secondary transition-colors"
                      >
                        Overzicht
                      </Link>
                      <div className="h-px bg-border mx-3 my-1" />
                      {subLinks.map((sub) => (
                        <Link
                          key={sub.href}
                          to={sub.href}
                          className={`block px-4 py-2.5 text-sm transition-colors ${
                            isActive(sub.href)
                              ? "text-[hsl(var(--primary))] bg-secondary font-medium"
                              : "text-foreground/70 hover:text-[hsl(var(--primary))] hover:bg-secondary"
                          }`}
                        >
                          {sub.label}
                        </Link>
                      ))}
                    </div>
                  )}
                </div>
              ) : (
                <Link
                  key={link.href}
                  to={link.href}
                  className={`nav-link px-3 py-2 ${isActive(link.href) ? "active" : ""}`}
                >
                  {link.label}
                </Link>
              );
            })}
          </nav>

          <div className="hidden xl:flex items-center gap-3">
            {/* Google Reviews badge */}
            <div className="flex items-center gap-2 px-3.5 py-1.5 rounded-md" style={{ border: '1px solid #e2e8f0' }}>
              <span style={{ color: '#ff751f', fontSize: 13, letterSpacing: -1 }}>★★★★★</span>
              <div>
                <span className="block text-sm font-bold" style={{ color: '#1a1a1a', lineHeight: 1 }}>4,9</span>
                <span className="block" style={{ fontSize: 10, color: '#9aa5b4', lineHeight: 1, marginTop: 2 }}>Google Reviews</span>
              </div>
            </div>
            <Link to="/contact">
              <button className="btn-cta !py-[10px] !px-[22px] !text-sm">
                Taxatie aanvragen
              </button>
            </Link>
          </div>

          {/* Mobile menu button */}
          <button
            className="xl:hidden p-2 rounded-lg text-foreground/70 hover:text-[hsl(var(--primary))] hover:bg-secondary transition-colors"
            onClick={() => setMobileOpen(!mobileOpen)}
            aria-label="Menu"
          >
            {mobileOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>

        {/* Mobile nav */}
        {mobileOpen && (
          <nav className="xl:hidden mt-3 pb-4 border-t border-border pt-4 space-y-1">
            {navLinks.map((link) => {
              const subLinks = link.dropdown === "verzekering" ? verzekeringSubLinks : link.dropdown === "bpm" ? bpmSubLinks : null;
              return subLinks ? (
                <div key={link.href}>
                  <Link
                    to={link.href}
                    className={`block px-4 py-2.5 rounded-lg text-sm font-medium transition-colors ${
                      isActive(link.href)
                        ? "text-[hsl(var(--primary))] bg-secondary"
                        : "text-foreground/70 hover:text-[hsl(var(--primary))] hover:bg-secondary"
                    }`}
                  >
                    {link.label}
                  </Link>
                  <div className="ml-4 space-y-0.5">
                    {subLinks.map((sub) => (
                      <Link
                        key={sub.href}
                        to={sub.href}
                        className={`block px-4 py-2 rounded-lg text-sm transition-colors ${
                          isActive(sub.href)
                            ? "text-[hsl(var(--primary))] font-medium"
                            : "text-foreground/50 hover:text-[hsl(var(--primary))]"
                        }`}
                      >
                        {sub.label}
                      </Link>
                    ))}
                  </div>
                </div>
              ) : (
                <Link
                  key={link.href}
                  to={link.href}
                  className={`block px-4 py-2.5 rounded-lg text-sm font-medium transition-colors ${
                    isActive(link.href)
                      ? "text-[hsl(var(--primary))] bg-secondary"
                      : "text-foreground/70 hover:text-[hsl(var(--primary))] hover:bg-secondary"
                  }`}
                >
                  {link.label}
                </Link>
              );
            })}
            <div className="pt-3 px-4">
              <Link to="/contact" className="block">
                <button className="btn-cta w-full !text-sm">
                  Taxatie aanvragen
                </button>
              </Link>
            </div>
            <div className="pt-2 px-4 space-y-2 text-sm text-foreground/60">
              <a href="tel:+31854832461" className="flex items-center gap-2 hover:text-[hsl(var(--primary))]">
                <Phone className="w-4 h-4" /> 085 483 2461
              </a>
              <a href="mailto:algemeen@automobieltaxaties.nl" className="flex items-center gap-2 hover:text-[hsl(var(--primary))]">
                <Mail className="w-4 h-4" /> algemeen@automobieltaxaties.nl
              </a>
            </div>
          </nav>
        )}
      </header>
    </>
  );
};

export default SiteHeader;
