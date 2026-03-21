import SiteHeader from "@/components/SiteHeader";
import SiteFooter from "@/components/SiteFooter";
import UspBar from "@/components/UspBar";
import PageMeta from "@/components/PageMeta";
import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

const articles = [
  {
    date: "10 maart 2026",
    title: "BPM-tarieven 2026: wat verandert er voor importeurs?",
    excerpt: "Per 1 januari 2026 zijn de BPM-tarieven opnieuw aangepast. Wij zetten de belangrijkste wijzigingen voor je op een rij.",
  },
  {
    date: "18 februari 2026",
    title: "Uitspraak rechtbank: taxatierapport wint van forfaitaire berekening",
    excerpt: "Een recente uitspraak bevestigt dat een onderbouwd taxatierapport zwaarder weegt dan de standaard afschrijvingstabel van de Belastingdienst.",
  },
  {
    date: "4 februari 2026",
    title: "Wanneer is een koerslijst niet voldoende?",
    excerpt: "Voor voertuigen met schade, hoge kilometerstand of bijzondere uitvoering biedt een koerslijst onvoldoende onderbouwing bij bezwaar.",
  },
];

const Nieuws = () => {
  return (
    <>
      <PageMeta
        title="BPM Nieuws en Jurisprudentie | Taxaris"
        description="Blijf op de hoogte van wijzigingen in de BPM-regelgeving en recente uitspraken."
      />
      <SiteHeader />
      <UspBar />

      {/* Hero */}
      <section className="bg-[hsl(var(--navy))] py-20 text-white">
        <div className="container mx-auto max-w-5xl px-4 text-center">
          <span className="mb-4 inline-block font-inter text-[11px] font-semibold uppercase tracking-[0.15em] text-[hsl(var(--cta))]">
            NIEUWS
          </span>
          <h1 className="font-playfair text-4xl font-bold leading-tight md:text-5xl">
            BPM nieuws en jurisprudentie
          </h1>
          <p className="mx-auto mt-4 max-w-2xl font-inter text-base leading-relaxed text-white/80 md:text-lg">
            Blijf op de hoogte van wijzigingen in de BPM-regelgeving en recente uitspraken.
          </p>
        </div>
      </section>

      {/* Articles */}
      <section className="bg-background py-20">
        <div className="container mx-auto max-w-5xl px-4">
          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
            {articles.map((article, i) => (
              <div
                key={i}
                className="rounded-[10px] bg-card p-6 shadow-[0_2px_10px_rgba(0,0,0,0.07)] transition-shadow hover:shadow-md"
              >
                <span className="font-inter text-sm text-muted-foreground">{article.date}</span>
                <h3 className="mt-2 font-inter text-lg font-bold text-[hsl(var(--navy))]">
                  {article.title}
                </h3>
                <p className="mt-2 line-clamp-2 font-inter text-[15px] leading-relaxed text-muted-foreground">
                  {article.excerpt}
                </p>
                <span className="mt-4 inline-flex items-center gap-1 font-inter text-sm font-semibold text-[hsl(var(--cta))] hover:underline cursor-pointer">
                  Lees meer <ArrowRight className="h-4 w-4" />
                </span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="bg-[hsl(var(--navy))] py-16">
        <div className="container mx-auto max-w-3xl px-4 text-center">
          <h2 className="font-playfair text-3xl font-bold text-white">
            Vragen over uw BPM-aangifte?
          </h2>
          <p className="mt-3 font-inter text-base text-white/80">
            Neem contact op voor een vrijblijvend gesprek.
          </p>
          <Button variant="cta" size="lg" className="mt-6" asChild>
            <Link to="/contact">Contact opnemen</Link>
          </Button>
        </div>
      </section>

      <SiteFooter />
    </>
  );
};

export default Nieuws;
