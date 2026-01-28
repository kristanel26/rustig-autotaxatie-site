import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import TrustIndicators from "@/components/TrustIndicators";
import { Caravan, Calculator, Scale, ArrowRight, Phone, Mail } from "lucide-react";

const services = [
  {
    icon: Caravan,
    title: "Verzekeringstaxatie camper",
    description:
      "Bescherm de waarde van je camper met een officiële taxatie. Zo krijg je bij schade of diefstal de werkelijke waarde uitgekeerd.",
    href: "/camper-taxatie",
    cta: "Meer over campertaxatie",
  },
  {
    icon: Calculator,
    title: "BPM voorbereiding",
    description:
      "Overweeg je een auto te importeren? Weet vooraf precies wat je aan BPM gaat betalen. Geen verrassingen, wel zekerheid.",
    href: "/bpm-voorbereiding",
    cta: "Meer over BPM",
  },
  {
    icon: Scale,
    title: "WEV taxatie",
    description:
      "Een objectieve waardebepaling van je voertuig voor zakelijke of fiscale doeleinden. Erkend door de Belastingdienst.",
    href: "/wev-taxatie",
    cta: "Meer over WEV",
  },
];

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="py-6 px-6 md:px-8 border-b border-border">
        <div className="container-wide flex items-center justify-between">
          <div>
            <h1 className="text-xl font-bold text-foreground">Automobiel Taxaties</h1>
          </div>
          <div className="hidden md:flex items-center gap-6 text-sm text-muted-foreground">
            <a href="tel:+31851234567" className="flex items-center gap-2 hover:text-foreground transition-colors">
              <Phone className="w-4 h-4" />
              085 123 4567
            </a>
            <a href="mailto:info@automobieltaxaties.nl" className="flex items-center gap-2 hover:text-foreground transition-colors">
              <Mail className="w-4 h-4" />
              info@automobieltaxaties.nl
            </a>
          </div>
        </div>
      </header>

      {/* Hero */}
      <section className="hero-section py-20 md:py-32 px-6 md:px-8">
        <div className="container-wide">
          <div className="max-w-3xl">
            <p className="text-accent-foreground/80 font-medium mb-4 animate-fade-in uppercase tracking-wider text-sm">
              Erkend taxateur in Nederland
            </p>
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-primary-foreground mb-6 leading-tight animate-slide-up text-balance">
              Taxaties voor verzekering, BPM en fiscale doeleinden
            </h2>
            <p className="text-lg md:text-xl text-primary-foreground/80 mb-10 animate-slide-up leading-relaxed max-w-2xl" style={{ animationDelay: "100ms" }}>
              Automobiel Taxaties helpt je met betrouwbare waardebepalingen van je voertuig. 
              Of het nu gaat om een verzekeringstaxatie, importberekening of een rapport voor de Belastingdienst.
            </p>
            <a href="#diensten" className="inline-block animate-slide-up" style={{ animationDelay: "200ms" }}>
              <Button variant="hero" size="xl">
                Bekijk onze diensten
              </Button>
            </a>
          </div>
        </div>
      </section>

      {/* Services */}
      <section id="diensten" className="section-padding bg-background scroll-mt-8">
        <div className="container-wide">
          <div className="text-center mb-12 md:mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4 text-balance">
              Onze diensten
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Kies de taxatie die past bij jouw situatie. We staan voor je klaar met persoonlijk advies.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {services.map((service, index) => (
              <div
                key={index}
                className="card-elevated p-8 flex flex-col animate-slide-up"
                style={{ animationDelay: `${index * 100}ms` }}
              >
                <div className="inline-flex items-center justify-center w-14 h-14 rounded-xl bg-accent/10 mb-6 self-start">
                  <service.icon className="w-7 h-7 text-accent" />
                </div>
                <h3 className="text-xl font-semibold mb-3">{service.title}</h3>
                <p className="text-muted-foreground leading-relaxed mb-6 flex-grow">
                  {service.description}
                </p>
                <Link to={service.href}>
                  <Button variant="subtle" className="w-full justify-between group">
                    {service.cta}
                    <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                  </Button>
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Trust indicators */}
      <section className="section-padding bg-secondary/30">
        <div className="container-wide">
          <TrustIndicators />
        </div>
      </section>

      {/* About section */}
      <section className="section-padding bg-background">
        <div className="container-narrow text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-6 text-balance">
            Persoonlijk en deskundig
          </h2>
          <p className="text-lg text-muted-foreground leading-relaxed mb-8">
            Bij Automobiel Taxaties geloven we in persoonlijk contact en vakmanschap. 
            Elke taxatie wordt uitgevoerd door een ervaren taxateur die de tijd neemt 
            om jouw voertuig grondig te beoordelen. Geen haastwerk, wel kwaliteit.
          </p>
          <p className="text-lg text-muted-foreground leading-relaxed">
            We werken transparant en houden je op de hoogte van elke stap. 
            Heb je vragen? Neem gerust contact op, we helpen je graag verder.
          </p>
        </div>
      </section>

      {/* CTA section */}
      <section className="section-padding bg-primary">
        <div className="container-narrow text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-4 text-primary-foreground text-balance">
            Klaar om te beginnen?
          </h2>
          <p className="text-lg text-primary-foreground/80 mb-8 max-w-xl mx-auto">
            Neem contact met ons op voor een vrijblijvend gesprek. 
            We bespreken graag wat we voor je kunnen betekenen.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a href="tel:+31851234567">
              <Button variant="hero" size="xl">
                <Phone className="w-5 h-5 mr-2" />
                Bel ons
              </Button>
            </a>
            <a href="mailto:info@automobieltaxaties.nl">
              <Button variant="subtle" size="xl" className="border-primary-foreground/30 text-primary-foreground hover:bg-primary-foreground/10">
                <Mail className="w-5 h-5 mr-2" />
                Stuur een mail
              </Button>
            </a>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12 px-6 border-t border-border">
        <div className="container-wide">
          <div className="grid md:grid-cols-3 gap-8 mb-8">
            <div>
              <h3 className="font-semibold mb-4">Automobiel Taxaties</h3>
              <p className="text-sm text-muted-foreground leading-relaxed">
                Al meer dan 15 jaar jouw betrouwbare partner voor professionele voertuigtaxaties in Nederland.
              </p>
            </div>
            <div>
              <h3 className="font-semibold mb-4">Diensten</h3>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li><Link to="/camper-taxatie" className="hover:text-foreground transition-colors">Verzekeringstaxatie camper</Link></li>
                <li><Link to="/bpm-voorbereiding" className="hover:text-foreground transition-colors">BPM voorbereiding</Link></li>
                <li><Link to="/wev-taxatie" className="hover:text-foreground transition-colors">WEV taxatie</Link></li>
              </ul>
            </div>
            <div>
              <h3 className="font-semibold mb-4">Contact</h3>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li>
                  <a href="tel:+31851234567" className="hover:text-foreground transition-colors flex items-center gap-2">
                    <Phone className="w-4 h-4" />
                    085 123 4567
                  </a>
                </li>
                <li>
                  <a href="mailto:info@automobieltaxaties.nl" className="hover:text-foreground transition-colors flex items-center gap-2">
                    <Mail className="w-4 h-4" />
                    info@automobieltaxaties.nl
                  </a>
                </li>
              </ul>
            </div>
          </div>
          <div className="pt-8 border-t border-border text-center text-sm text-muted-foreground">
            <p>© 2024 Automobiel Taxaties. Alle rechten voorbehouden.</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;
