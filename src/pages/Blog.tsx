import { useState } from "react";
import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import SiteHeader from "@/components/SiteHeader";
import SiteFooter from "@/components/SiteFooter";
import WhatsAppButton from "@/components/WhatsAppButton";
import PageMeta from "@/components/PageMeta";

const categories = ["Alle artikelen", "BPM & Import", "Oldtimers & Youngtimers", "Verzekeringstaxatie", "Wetgeving", "Tips & Uitleg"];

const articles = [
  {
    category: "BPM & Import",
    title: "Nieuwe BPM-tarieven per 1 april 2026",
    intro: "De Belastingdienst heeft de nieuwe forfaitaire tabel gepubliceerd. Wat betekent dit voor importeurs en particulieren?",
    date: "18 maart 2026",
    featured: true,
  },
  {
    category: "Wetgeving",
    title: "Rechtbank bevestigt: fysieke inspectie als grondslag voor BPM-aangifte",
    intro: "Een recente uitspraak bevestigt dat een taxatierapport op basis van fysieke inspectie zwaarder weegt dan een koerslijstberekening.",
    date: "10 maart 2026",
  },
  {
    category: "Verzekeringstaxatie",
    title: "Waarom een vastgestelde waarde polis slim is voor je oldtimer",
    intro: "Bij een oldtimer is de dagwaarde vaak lager dan de werkelijke waarde. Een verzekeringstaxatie voorkomt onderverzekering.",
    date: "2 maart 2026",
  },
  {
    category: "Tips & Uitleg",
    title: "NEDC of WLTP: welke CO2-waarde gebruik je voor de BPM-aangifte?",
    intro: "Veel importeurs weten niet welke CO2-waarde ze moeten gebruiken. We leggen het verschil uit.",
    date: "22 februari 2026",
  },
  {
    category: "Oldtimers & Youngtimers",
    title: "Vanaf wanneer is een auto een youngtimer voor de BPM?",
    intro: "Een voertuig van 15 jaar of ouder valt onder de youngtimer-regeling. Maar er zijn nuances die je moet kennen.",
    date: "14 februari 2026",
  },
  {
    category: "BPM & Import",
    title: "Wat is het verschil tussen een koerslijst en een taxatierapport?",
    intro: "De Belastingdienst accepteert twee methoden voor BPM-aangifte. Welke het meest oplevert hangt af van het voertuig.",
    date: "5 februari 2026",
  },
];

const Blog = () => {
  const [activeCategory, setActiveCategory] = useState("Alle artikelen");

  const filtered = activeCategory === "Alle artikelen"
    ? articles
    : articles.filter((a) => a.category === activeCategory);

  const featured = filtered.find((a) => a.featured) || filtered[0];
  const rest = filtered.filter((a) => a !== featured);

  return (
    <div className="min-h-screen bg-white">
      <PageMeta
        title="Blog & Kennisbank | BPM Nieuws en Tips | Automobiel Taxaties"
        description="Praktische informatie over BPM, taxaties en voertuigwaardering. Nieuws over wetgeving, jurisprudentie en belastingwijzigingen."
      />
      <SiteHeader />

      {/* Hero */}
      <section
        className="py-20 md:py-28 px-6 lg:px-8 text-center"
        style={{ background: '#1d3c71' }}
      >
        <h1
          className="heading-display font-bold mb-4"
          style={{ fontSize: 'clamp(36px, 4vw, 52px)', lineHeight: 1.15, letterSpacing: '-0.02em', color: '#ffffff' }}
        >
          Blog & Kennisbank
        </h1>
        <p style={{ fontFamily: "'Inter', sans-serif", fontSize: 'clamp(16px, 1.8vw, 19px)', color: 'rgba(255,255,255,0.72)', lineHeight: 1.70, maxWidth: 540 }} className="mx-auto">
          Praktische informatie over BPM, taxaties en voertuigwaardering.
        </p>
      </section>

      {/* Category filter */}
      <section className="bg-white border-b" style={{ borderColor: '#e2e8f0' }}>
        <div className="max-w-7xl mx-auto px-6 lg:px-8 py-5 flex flex-wrap gap-2">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className="px-4 py-2 rounded-full text-sm font-medium transition-all"
              style={{
                background: activeCategory === cat ? '#1d3c71' : 'transparent',
                color: activeCategory === cat ? '#ffffff' : '#4a5568',
                border: activeCategory === cat ? 'none' : '1px solid #e2e8f0',
              }}
            >
              {cat}
            </button>
          ))}
        </div>
      </section>

      {/* Articles */}
      <section className="py-16 md:py-24 px-6 lg:px-8" style={{ background: '#f0f4f8' }}>
        <div className="max-w-7xl mx-auto">

          {/* Featured article */}
          {featured && (
            <div
              className="rounded-[14px] overflow-hidden mb-10 bg-white transition-all duration-200 hover:-translate-y-1"
              style={{ boxShadow: '0 4px 24px rgba(29,60,113,0.08)' }}
            >
              <div className="grid md:grid-cols-2">
                <div
                  className="h-[260px] md:h-auto relative"
                  style={{ background: '#1d3c71', minHeight: 280 }}
                >
                  <span
                    className="absolute top-4 left-4 text-xs font-bold uppercase rounded-full px-3 py-1"
                    style={{ background: '#ff751f', color: '#ffffff', letterSpacing: '0.06em' }}
                  >
                    {featured.category}
                  </span>
                </div>
                <div className="p-8 md:p-10 flex flex-col justify-center">
                  <p className="text-xs mb-2" style={{ color: '#698db3' }}>{featured.date}</p>
                  <h2 className="heading-display font-bold mb-3" style={{ fontSize: 24, color: '#1a1a1a', lineHeight: 1.3 }}>
                    {featured.title}
                  </h2>
                  <p style={{ fontFamily: "'Inter', sans-serif", fontSize: 15, color: '#4a5568', lineHeight: 1.70 }} className="mb-5">
                    {featured.intro}
                  </p>
                  <span className="text-sm font-semibold inline-flex items-center gap-1.5 hover:gap-2.5 transition-all cursor-pointer" style={{ color: '#ff751f' }}>
                    Lees meer <ArrowRight className="w-4 h-4" />
                  </span>
                </div>
              </div>
            </div>
          )}

          {/* Grid */}
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {rest.map((article, i) => (
              <div
                key={i}
                className="rounded-[14px] overflow-hidden bg-white transition-all duration-200 hover:-translate-y-1 cursor-pointer"
                style={{ boxShadow: '0 4px 24px rgba(29,60,113,0.08)' }}
              >
                <div className="relative h-[180px]" style={{ background: '#1d3c71' }}>
                  <span
                    className="absolute top-4 left-4 text-xs font-bold uppercase rounded-full px-3 py-1"
                    style={{ background: '#ff751f', color: '#ffffff', letterSpacing: '0.06em' }}
                  >
                    {article.category}
                  </span>
                </div>
                <div className="p-6">
                  <p className="text-xs mb-2" style={{ color: '#698db3' }}>{article.date}</p>
                  <h3 className="heading-display font-semibold mb-2" style={{ fontSize: 18, color: '#1a1a1a', lineHeight: 1.3 }}>
                    {article.title}
                  </h3>
                  <p style={{ fontFamily: "'Inter', sans-serif", fontSize: 14, color: '#4a5568', lineHeight: 1.65 }} className="mb-4 line-clamp-3">
                    {article.intro}
                  </p>
                  <span className="text-sm font-semibold inline-flex items-center gap-1.5 hover:gap-2.5 transition-all" style={{ color: '#ff751f' }}>
                    Lees meer <ArrowRight className="w-3.5 h-3.5" />
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <SiteFooter />
      <WhatsAppButton />
    </div>
  );
};

export default Blog;
