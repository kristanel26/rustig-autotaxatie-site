import Breadcrumbs from "@/components/Breadcrumbs";
import SiteHeader from "@/components/SiteHeader";
import SiteFooter from "@/components/SiteFooter";
import UspBar from "@/components/UspBar";
import PageMeta from "@/components/PageMeta";
import WhatsAppButton from "@/components/WhatsAppButton";
import { ArrowRight } from "lucide-react";
import { useState, useMemo } from "react";
import heroNieuws from "@/assets/hero-nieuws-new.png";
import nieuwsArtikelen from "@/data/nieuwsArtikelen";

const categoryImages: Record<string, string> = {
  "Jurisprudentie": "https://images.unsplash.com/photo-1589829545856-d10d557cf95f?w=800&q=80",
  "Wetgeving": "https://images.unsplash.com/photo-1450101499163-c8848c66ca85?w=800&q=80",
  "BPM & Import": "https://images.unsplash.com/photo-1494976388531-d1058494cdd8?w=800&q=80",
  "Tips & Uitleg": "https://images.unsplash.com/photo-1560179707-f14e90ef3623?w=800&q=80",
};

const categories = ["Alle berichten", "BPM & Import", "Jurisprudentie", "Wetgeving", "Tips & Uitleg"];

const PAGE_SIZE = 9;

const Nieuws = () => {
  const [activeCategory, setActiveCategory] = useState("Alle berichten");
  const [visibleCount, setVisibleCount] = useState(PAGE_SIZE);

  const filtered = useMemo(() =>
    activeCategory === "Alle berichten"
      ? nieuwsArtikelen
      : nieuwsArtikelen.filter((a) => a.category === activeCategory),
    [activeCategory]
  );

  // Reset visible count when category changes
  const handleCategoryChange = (cat: string) => {
    setActiveCategory(cat);
    setVisibleCount(PAGE_SIZE);
  };

  const featured = filtered[0];
  const rest = filtered.slice(1);
  const visibleRest = rest.slice(0, visibleCount - 1); // -1 because featured counts as 1
  const totalShown = Math.min(visibleCount, filtered.length);
  const allLoaded = totalShown >= filtered.length;

  return (
    <div className="min-h-screen bg-white">
      <PageMeta
        title="BPM nieuws en jurisprudentie | Automobiel Taxaties"
        description="Actuele berichten over BPM-wetgeving, rechtbankuitspraken en wijzigingen in de regelgeving. Blijf op de hoogte van ontwikkelingen die jouw import beïnvloeden."
      />
      <SiteHeader />
      <Breadcrumbs items={[{ label: "Nieuws" }]} />

      {/* Hero */}
      <section className="relative overflow-hidden flex items-center" style={{ height: 420, minHeight: 420, maxHeight: 420 }}>
        <div className="absolute inset-0">
          <img src={heroNieuws} alt="" className="w-full h-full object-cover" style={{ objectPosition: 'center' }} />
          <div className="absolute inset-0" style={{ background: 'linear-gradient(to right, rgba(29,60,113,0.85) 0%, rgba(29,60,113,0.85) 40%, rgba(29,60,113,0.55) 70%, rgba(29,60,113,0.25) 100%)' }} />
        </div>
        <div className="max-w-7xl mx-auto px-6 lg:px-8 relative z-10 w-full">
          <div style={{ width: 32, height: 2, background: '#ff751f', marginBottom: 12 }} />
          <span
            className="inline-block mb-3"
            style={{ fontFamily: "'Inter', sans-serif", fontSize: 12, fontWeight: 500, letterSpacing: '0.1em', textTransform: 'uppercase', color: '#ff751f' }}
          >
            NIEUWS
          </span>
          <h1
            style={{ fontFamily: "'Playfair Display', serif", fontSize: 'clamp(32px, 4vw, 48px)', fontWeight: 700, lineHeight: 1.15, color: '#ffffff', maxWidth: 700 }}
          >
            BPM nieuws en jurisprudentie
          </h1>
          <p style={{ fontFamily: "'Inter', sans-serif", fontSize: 17, color: 'rgba(255,255,255,0.9)', lineHeight: 1.7, maxWidth: 600, marginTop: 16 }}>
            Actuele berichten over wijzigingen in wet- en regelgeving, uitspraken en BPM-tarieven.
          </p>
        </div>
      </section>
      <UspBar />

      {/* Category filter */}
      <section className="bg-white border-b" style={{ borderColor: '#e2e8f0' }}>
        <div className="max-w-7xl mx-auto px-6 lg:px-8 py-5 flex flex-wrap gap-2">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => handleCategoryChange(cat)}
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
          {filtered.length === 0 ? (
            <p className="text-center py-16" style={{ color: '#698db3', fontSize: 17 }}>
              Geen artikelen gevonden in deze categorie.
            </p>
          ) : (
            <>
              {/* Featured article */}
              {featured && (
                <a
                  href={featured.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block rounded-[14px] overflow-hidden mb-10 bg-white transition-all duration-200 hover:-translate-y-1 no-underline"
                  style={{ boxShadow: '0 4px 24px rgba(29,60,113,0.08)' }}
                >
                  <div className="grid md:grid-cols-2">
                    <div
                      className="h-[200px] md:h-auto relative"
                      style={{ background: '#1d3c71', minHeight: 200 }}
                    >
                      <img
                        src={categoryImages[featured.category]}
                        alt=""
                        className="w-full h-full object-cover absolute inset-0"
                        onError={(e) => { e.currentTarget.style.display = 'none'; }}
                      />
                      <span
                        className="absolute top-4 left-4 text-xs font-bold uppercase rounded-full px-3 py-1 z-10"
                        style={{ background: '#ff751f', color: '#ffffff', letterSpacing: '0.06em' }}
                      >
                        {featured.category}
                      </span>
                    </div>
                    <div className="p-8 md:p-10 flex flex-col justify-center">
                      <p className="text-xs mb-2" style={{ color: '#698db3' }}>{featured.dateDisplay}</p>
                      <h2 className="heading-display font-bold mb-3" style={{ fontSize: 24, color: '#1a1a1a', lineHeight: 1.3 }}>
                        {featured.title}
                      </h2>
                      <p style={{ fontFamily: "'Inter', sans-serif", fontSize: 15, color: '#4a5568', lineHeight: 1.70 }} className="mb-5">
                        {featured.excerpt}
                      </p>
                      <span className="text-sm font-semibold inline-flex items-center gap-1.5" style={{ color: '#ff751f' }}>
                        Lees meer <ArrowRight className="w-4 h-4" />
                      </span>
                    </div>
                  </div>
                </a>
              )}

              {/* Grid */}
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">
                {visibleRest.map((article) => (
                  <a
                    key={article.id}
                    href={article.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="block rounded-[14px] overflow-hidden bg-white transition-all duration-200 hover:-translate-y-1 no-underline"
                    style={{ boxShadow: '0 4px 24px rgba(29,60,113,0.08)' }}
                  >
                    <div className="relative h-[120px]" style={{ background: '#1d3c71' }}>
                      <span
                        className="absolute top-4 left-4 text-xs font-bold uppercase rounded-full px-3 py-1 z-10"
                        style={{ background: '#ff751f', color: '#ffffff', letterSpacing: '0.06em' }}
                      >
                        {article.category}
                      </span>
                    </div>
                    <div className="p-4">
                      <p className="text-xs mb-2" style={{ color: '#698db3' }}>{article.dateDisplay}</p>
                      <h3 className="heading-display font-semibold mb-2" style={{ fontSize: 18, color: '#1a1a1a', lineHeight: 1.3 }}>
                        {article.title}
                      </h3>
                      <p style={{ fontFamily: "'Inter', sans-serif", fontSize: 14, color: '#4a5568', lineHeight: 1.65 }} className="mb-4 line-clamp-2">
                        {article.excerpt}
                      </p>
                      <span className="text-sm font-semibold inline-flex items-center gap-1.5" style={{ color: '#ff751f' }}>
                        Lees meer <ArrowRight className="w-3.5 h-3.5" />
                      </span>
                    </div>
                  </a>
                ))}
              </div>

              {/* Load more */}
              <div className="flex flex-col items-center mt-10 gap-3">
                <p style={{ color: '#698db3', fontSize: 13 }}>
                  {totalShown} van {filtered.length} artikelen weergegeven
                </p>
                {!allLoaded && (
                  <button
                    onClick={() => setVisibleCount((prev) => prev + PAGE_SIZE)}
                    className="font-medium transition-all"
                    style={{
                      width: 220,
                      height: 44,
                      borderRadius: 7,
                      border: '1px solid #1d3c71',
                      background: 'transparent',
                      color: '#1d3c71',
                      fontSize: 14,
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.background = '#1d3c71';
                      e.currentTarget.style.color = '#ffffff';
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.background = 'transparent';
                      e.currentTarget.style.color = '#1d3c71';
                    }}
                  >
                    Laad meer artikelen
                  </button>
                )}
              </div>
            </>
          )}
        </div>
      </section>

      <SiteFooter />
      <WhatsAppButton />
    </div>
  );
};

export default Nieuws;
