import { Link } from "react-router-dom";
import { Phone, Mail, MapPin, Clock, ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import SiteHeader from "@/components/SiteHeader";
import erikPhoto from "@/assets/erik-elderson.png";

const Contact = () => {
  return (
    <div className="min-h-screen bg-background">
      <SiteHeader />

      <section className="hero-section py-16 md:py-24 px-6 md:px-8 relative overflow-hidden">
        <div className="absolute inset-0 opacity-[0.04]">
          <div className="absolute inset-0" style={{
            backgroundImage: `radial-gradient(circle at 1.5px 1.5px, white 1px, transparent 0)`,
            backgroundSize: "32px 32px",
          }} />
        </div>
        <div className="container-wide relative z-10">
          <Link to="/" className="inline-flex items-center gap-2 text-primary-foreground/60 hover:text-primary-foreground transition-colors mb-6">
            <ArrowLeft className="w-4 h-4" />
            Terug naar home
          </Link>
          <div className="flex items-center gap-3 mb-4">
            <div className="accent-line" />
          </div>
          <h1 className="heading-display text-4xl md:text-5xl text-primary-foreground mb-4">
            Contact
          </h1>
          <p className="text-lg text-primary-foreground/70 max-w-2xl">
            Heb je een vraag over een taxatie of wil je weten welke dienst bij jouw situatie past? Neem gerust contact op. We denken graag met je mee.
          </p>
        </div>
      </section>

      {/* Contact content */}
      <section className="section-padding bg-background">
        <div className="container-wide">
          <div className="grid md:grid-cols-2 gap-12 md:gap-16">
            {/* Left: Contact persons */}
            <div className="space-y-10">
              {/* Erik */}
              <div className="flex gap-6">
                <img
                  src={erikPhoto}
                  alt="Erik Elderson"
                  className="w-24 h-24 rounded-xl object-cover flex-shrink-0"
                  loading="lazy"
                />
                <div>
                  <h2 className="text-xl font-semibold mb-1">Erik Elderson</h2>
                  <p className="text-sm text-muted-foreground mb-3">
                    Eigenaar · Notarieel Beëdigd TMV Register-Taxateur · Register-Taxateur VRT
                  </p>
                  <p className="text-sm text-muted-foreground mb-4">
                    Contactpersoon voor de regio Oost: Gelderland, Overijssel, Limburg, Noord-Brabant, Drenthe en Groningen.
                  </p>
                  <div className="flex flex-col gap-2">
                    <a href="tel:+31650694978" className="flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors">
                      <Phone className="w-4 h-4" />
                      +31(0)6 506 949 78
                    </a>
                    <a href="mailto:erik@automobieltaxaties.nl" className="flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors">
                      <Mail className="w-4 h-4" />
                      erik@automobieltaxaties.nl
                    </a>
                  </div>
                </div>
              </div>

            </div>

            {/* Right: General info */}
            <div className="space-y-8">
              <div className="card-elevated p-8">
                <h3 className="text-lg font-semibold mb-6">Algemene gegevens</h3>
                <div className="space-y-4">
                  <a href="tel:+31854832461" className="flex items-center gap-3 text-muted-foreground hover:text-foreground transition-colors">
                    <Phone className="w-5 h-5 text-accent flex-shrink-0" />
                    <span>085 483 2461</span>
                  </a>
                  <a href="mailto:algemeen@automobieltaxaties.nl" className="flex items-center gap-3 text-muted-foreground hover:text-foreground transition-colors">
                    <Mail className="w-5 h-5 text-accent flex-shrink-0" />
                    <span>algemeen@automobieltaxaties.nl</span>
                  </a>
                  <div className="flex items-start gap-3 text-muted-foreground">
                    <MapPin className="w-5 h-5 text-accent flex-shrink-0 mt-0.5" />
                    <span>Van Heemstraweg 123<br />6651 KH Druten</span>
                  </div>
                  <div className="flex items-start gap-3 text-muted-foreground">
                    <Clock className="w-5 h-5 text-accent flex-shrink-0 mt-0.5" />
                    <span>Ma t/m vr: 08:00 – 18:00<br />Za: op afspraak</span>
                  </div>
                </div>
              </div>

              <div className="card-elevated p-8">
                <h3 className="text-lg font-semibold mb-4">Bedrijfsgegevens</h3>
                <div className="space-y-2 text-sm text-muted-foreground">
                  <p>KvK-nummer: 71468889</p>
                  <p>BTW-nummer: NL858727493B01</p>
                  <p>IBAN: NL78RABO0151008833</p>
                </div>
              </div>

              <div className="card-elevated p-8 bg-primary text-primary-foreground">
                <h3 className="text-lg font-semibold mb-2">Direct bellen?</h3>
                <p className="text-primary-foreground/80 text-sm mb-4">
                  We zijn op werkdagen bereikbaar van 08:00 tot 18:00 uur.
                </p>
                <a href="tel:+31854832461">
                  <Button variant="hero" size="lg" className="w-full">
                    <Phone className="w-4 h-4 mr-2" />
                    085 483 2461
                  </Button>
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12 px-6 border-t border-border">
        <div className="container-wide">
          <div className="pt-0 text-center text-sm text-muted-foreground">
            <p>© {new Date().getFullYear()} Automobiel Taxaties · KvK 71468889 · BTW NL858727493B01</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Contact;
