import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import TrustIndicators from "@/components/TrustIndicators";
import { Caravan, Calculator, Scale, ArrowRight, Phone, Mail } from "lucide-react";
import erikPhoto from "@/assets/erik-elderson.png";
import heroImage from "@/assets/hero-homepage.jpg";
import serviceBpm from "@/assets/service-bpm.jpg";
import serviceVerzekering from "@/assets/service-verzekering.jpg";
import serviceWev from "@/assets/service-wev.jpg";
import logo from "@/assets/logo-automobiel-taxaties.png";
import SiteHeader from "@/components/SiteHeader";

const services = [
  {
    icon: Calculator,
    title: "BPM-taxatie bij import",
    description:
      "Importeer je een voertuig en heb je een BPM-taxatie nodig? Wij maken een zorgvuldig onderbouwd taxatierapport dat je kunt gebruiken bij je BPM-aangifte.",
    href: "/bpm-taxatie",
    cta: "Meer over BPM-taxatie",
    image: serviceBpm,
  },
  {
    icon: Caravan,
    title: "Verzekeringstaxatie voertuig",
    description:
      "Wil je je voertuig goed verzekeren? Met een officiële verzekeringstaxatie leg je de juiste waarde vast, zodat je bij schade of diefstal weet waar je aan toe bent.",
    href: "/verzekeringstaxatie-info",
    cta: "Meer over verzekeringstaxatie",
    image: serviceVerzekering,
    subLinks: [
      { label: "Camper", href: "/camper-taxatie" },
      { label: "Oldtimer", href: "/oldtimer-taxatie" },
      { label: "Youngtimer", href: "/youngtimer-taxatie" },
      { label: "Motor", href: "/motor-taxatie" },
      { label: "Foodtruck", href: "/foodtruck-taxatie" },
    ],
  },
  {
    icon: Scale,
    title: "WEV-taxatie",
    description:
      "Een objectieve waardebepaling van je voertuig voor zakelijke of fiscale doeleinden. De WEV-taxatie geeft inzicht in de waarde op een specifiek moment.",
    href: "/wev-taxatie",
    cta: "Meer over WEV-taxatie",
    image: serviceWev,
  },
];

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      <SiteHeader />

      {/* Hero with background image */}
      <section className="relative min-h-[85vh] flex items-center overflow-hidden">
        {/* Background image */}
        <div className="absolute inset-0">
          <img
            src={heroImage}
            alt=""
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-[hsl(var(--primary))]/90 via-[hsl(var(--primary))]/75 to-[hsl(var(--primary))]/40" />
        </div>

        {/* Dot pattern */}
        <div className="absolute inset-0 opacity-[0.04]">
          <div className="absolute inset-0" style={{
            backgroundImage: `radial-gradient(circle at 1.5px 1.5px, white 1px, transparent 0)`,
            backgroundSize: "32px 32px",
          }} />
        </div>

        <div className="container-wide w-full px-6 md:px-8 py-24 md:py-36 relative z-10">
          <div className="max-w-3xl">
            <div className="flex items-center gap-3 mb-6 animate-fade-in">
              <div className="accent-line" />
              <p className="text-white/80 font-semibold uppercase tracking-widest text-xs">
                Meer dan 15 jaar ervaring
              </p>
            </div>
            <h1 className="heading-display text-4xl md:text-5xl lg:text-6xl text-white mb-6 leading-[1.1] animate-slide-up text-balance">
              Onafhankelijke voertuig­waarderingen
            </h1>
            <div className="text-lg md:text-xl text-white/75 mb-10 animate-slide-up leading-relaxed max-w-2xl space-y-4" style={{ animationDelay: "100ms" }}>
              <p>
                Automobiel Taxaties is een onafhankelijk taxatiebureau. We ondersteunen ondernemers en particulieren met zorgvuldig onderbouwde taxaties voor BPM, verzekering en fiscale waarderingen.
              </p>
            </div>
            <a href="#diensten" className="inline-block animate-slide-up" style={{ animationDelay: "200ms" }}>
              <Button variant="hero" size="xl">
                Bekijk onze diensten
              </Button>
            </a>
          </div>
        </div>

        {/* Wave */}
        <div className="absolute bottom-0 left-0 right-0">
          <svg viewBox="0 0 1440 120" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-auto" preserveAspectRatio="none">
            <path d="M0 120L48 110C96 100 192 80 288 70C384 60 480 60 576 65C672 70 768 80 864 85C960 90 1056 90 1152 85C1248 80 1344 70 1392 65L1440 60V120H1392C1344 120 1248 120 1152 120C1056 120 960 120 864 120C768 120 672 120 576 120C480 120 384 120 288 120C192 120 96 120 48 120H0Z" fill="hsl(var(--background))" />
          </svg>
        </div>
      </section>

      {/* Services */}
      <section id="diensten" className="section-padding bg-background scroll-mt-8 section-glow relative">
        <div className="container-wide relative z-10">
          <div className="text-center mb-14 md:mb-20">
            <div className="accent-line mx-auto mb-4" />
            <h2 className="heading-display text-3xl md:text-4xl lg:text-5xl mb-4 text-balance">
              Onze diensten
            </h2>
            <p className="text-muted-foreground text-lg max-w-xl mx-auto">
              Professionele taxaties voor elke situatie
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-6 lg:gap-8">
            {services.map((service, index) => (
              <div
                key={index}
                className="card-elevated overflow-hidden flex flex-col animate-slide-up group"
                style={{ animationDelay: `${index * 120}ms` }}
              >
                {/* Service image */}
                <div className="relative h-48 overflow-hidden">
                  <img
                    src={service.image}
                    alt={service.title}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                    loading="lazy"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent" />
                  <div className="absolute bottom-4 left-4">
                    <div className="inline-flex items-center justify-center w-12 h-12 rounded-xl bg-white/90 backdrop-blur-sm shadow-lg">
                      <service.icon className="w-6 h-6 text-accent" />
                    </div>
                  </div>
                </div>

                <div className="p-8 flex flex-col flex-grow">
                  <h3 className="text-xl font-bold mb-3">{service.title}</h3>
                  <p className="text-muted-foreground leading-relaxed mb-6 flex-grow">
                    {service.description}
                  </p>
                  <Link to={service.href}>
                    <Button variant="secondary-action" className="w-full justify-between group/btn">
                      {service.cta}
                      <ArrowRight className="w-4 h-4 group-hover/btn:translate-x-1 transition-transform" />
                    </Button>
                  </Link>
                  {service.subLinks && (
                    <div className="mt-4 pt-4 border-t border-border/50">
                      <div className="flex flex-wrap gap-x-3 gap-y-1">
                        {service.subLinks.map((subLink, subIndex) => (
                          <Link
                            key={subIndex}
                            to={subLink.href}
                            className="text-sm text-muted-foreground hover:text-accent transition-colors hover:underline underline-offset-2"
                          >
                            {subLink.label}
                          </Link>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Trust indicators */}
      <section className="section-padding bg-secondary/40">
        <div className="container-wide">
          <TrustIndicators />
        </div>
      </section>

      {/* About section */}
      <section className="section-padding bg-background section-glow relative overflow-hidden">
        <div className="container-wide relative z-10">
          <div className="grid md:grid-cols-2 gap-12 md:gap-16 items-center">
            <div className="relative">
              <div className="absolute -inset-4 bg-gradient-to-br from-accent/10 to-transparent rounded-3xl blur-2xl" />
              <img
                src={erikPhoto}
                alt="Erik Elderson – eigenaar Automobiel Taxaties"
                className="relative rounded-2xl w-full max-w-md mx-auto shadow-xl"
                loading="lazy"
              />
            </div>
            <div>
              <div className="accent-line mb-4" />
              <h2 className="heading-display text-3xl md:text-4xl mb-3 text-balance">
                Erik Elderson
              </h2>
              <p className="text-sm font-semibold text-accent uppercase tracking-wider mb-6">
                Eigenaar · Notarieel Beëdigd TMV Register-Taxateur · Register-Taxateur VRT
              </p>
              <p className="text-lg text-muted-foreground leading-relaxed mb-4">
                Automobiel Taxaties werkt onafhankelijk en met meer dan 15 jaar ervaring in voertuigwaarderingen. Ik neem de tijd om een voertuig goed te bekijken en leg vast wat écht van invloed is op de waarde.
              </p>
              <p className="text-lg text-muted-foreground leading-relaxed mb-8">
                Geen aannames, geen haastwerk. Zo ontvang je een duidelijk en zorgvuldig opgesteld taxatierapport waar je op kunt vertrouwen.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <a href="tel:+31650694978" className="flex items-center gap-2 text-muted-foreground hover:text-accent transition-colors">
                  <Phone className="w-4 h-4" />
                  +31(0)6 506 949 78
                </a>
                <a href="mailto:erik@automobieltaxaties.nl" className="flex items-center gap-2 text-muted-foreground hover:text-accent transition-colors">
                  <Mail className="w-4 h-4" />
                  erik@automobieltaxaties.nl
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA section */}
      <section className="hero-section py-20 md:py-28 px-6 md:px-8 relative overflow-hidden">
        <div className="absolute inset-0 opacity-[0.04]">
          <div className="absolute inset-0" style={{
            backgroundImage: `radial-gradient(circle at 1.5px 1.5px, white 1px, transparent 0)`,
            backgroundSize: "32px 32px",
          }} />
        </div>
        <div className="container-narrow text-center relative z-10">
          <h2 className="heading-display text-3xl md:text-4xl mb-4 text-primary-foreground text-balance">
            Vragen of een taxatie nodig?
          </h2>
          <p className="text-lg text-primary-foreground/70 mb-10 max-w-xl mx-auto">
            Neem contact op om je situatie te bespreken.
            We kijken graag mee welke taxatie bij jouw vraag past.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a href="tel:+31854832461">
              <Button variant="hero" size="xl">
                <Phone className="w-5 h-5 mr-2" />
                085 483 2461
              </Button>
            </a>
            <Link to="/contact">
              <Button variant="subtle" size="xl" className="border-primary-foreground/20 text-primary-foreground hover:bg-primary-foreground/10">
                <Mail className="w-5 h-5 mr-2" />
                Contactpagina
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12 px-6 border-t border-border bg-secondary/20">
        <div className="container-wide">
          <div className="grid md:grid-cols-3 gap-8 mb-8">
            <div>
              <div className="flex items-center gap-2 mb-4">
                <img src={logo} alt="Automobiel Taxaties" className="h-10 w-auto" />
              </div>
              <p className="text-sm text-muted-foreground leading-relaxed">
                Al meer dan 15 jaar jouw betrouwbare partner voor professionele voertuigtaxaties in Nederland.
              </p>
            </div>
            <div>
              <h3 className="font-bold mb-4">Diensten</h3>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li><Link to="/bpm-taxatie" className="hover:text-accent transition-colors">BPM-taxaties</Link></li>
                <li><Link to="/verzekeringstaxatie-info" className="hover:text-accent transition-colors">Verzekeringstaxaties</Link></li>
                <li><Link to="/wev-taxatie" className="hover:text-accent transition-colors">WEV-taxatie</Link></li>
                <li><Link to="/faq" className="hover:text-accent transition-colors">Veelgestelde vragen</Link></li>
                <li><Link to="/contact" className="hover:text-accent transition-colors">Contact</Link></li>
              </ul>
            </div>
            <div>
              <h3 className="font-bold mb-4">Contact</h3>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li>
                  <a href="tel:+31854832461" className="hover:text-accent transition-colors flex items-center gap-2">
                    <Phone className="w-4 h-4" />
                    085 483 2461
                  </a>
                </li>
                <li>
                  <a href="mailto:erik@automobieltaxaties.nl" className="hover:text-accent transition-colors flex items-center gap-2">
                    <Mail className="w-4 h-4" />
                    erik@automobieltaxaties.nl
                  </a>
                </li>
              </ul>
            </div>
          </div>
          <div className="pt-8 border-t border-border text-center text-sm text-muted-foreground">
            <p>© {new Date().getFullYear()} Automobiel Taxaties · KvK 71468889 · BTW NL858727493B01</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;