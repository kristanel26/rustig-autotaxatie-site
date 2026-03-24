import SiteHeader from "@/components/SiteHeader";
import SiteFooter from "@/components/SiteFooter";
import UspBar from "@/components/UspBar";
import PageMeta from "@/components/PageMeta";
import WhatsAppButton from "@/components/WhatsAppButton";
import { ArrowRight } from "lucide-react";
import { useState, useEffect } from "react";
import heroNieuws from "@/assets/hero-nieuws.jpg";
import { supabase } from "@/integrations/supabase/client";
import { format } from "date-fns";
import { nl } from "date-fns/locale";

const categories = ["Alle berichten", "BPM & Import", "Oldtimers & Youngtimers", "Verzekeringstaxatie", "Wetgeving", "Tips & Uitleg"];

interface Article {
  id: string;
  title: string;
  slug: string;
  category: string;
  excerpt: string | null;
  published_at: string | null;
  featured: boolean;
}

const Nieuws = () => {
  const [activeCategory, setActiveCategory] = useState("Alle berichten");
  const [articles, setArticles] = useState<Article[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchArticles = async () => {
      const { data, error } = await supabase
        .from("articles")
        .select("id, title, slug, category, excerpt, published_at, featured")
        .eq("status", "published")
        .order("published_at", { ascending: false });

      if (!error && data) {
        setArticles(data);
      }
      setLoading(false);
    };
    fetchArticles();
  }, []);

  const filtered = activeCategory === "Alle berichten"
    ? articles
    : articles.filter((a) => a.category === activeCategory);

  const featured = filtered.find((a) => a.featured) || filtered[0];
  const rest = filtered.filter((a) => a !== featured);

  const formatDate = (dateStr: string | null) => {
    if (!dateStr) return "";
    return format(new Date(dateStr), "d MMMM yyyy", { locale: nl });
  };

  return (
    <div className="min-h-screen bg-white">
      <PageMeta
        title="Nieuws & Kennisbank | BPM, Taxaties en Wetgeving | Automobiel Taxaties"
        description="Praktische informatie over BPM, taxaties en voertuigwaardering. Nieuws over wetgeving, jurisprudentie en belastingwijzigingen."
      />
      <SiteHeader />

      {/* Hero */}
      <section className="relative overflow-hidden flex items-center" style={{ height: 420, minHeight: 420, maxHeight: 420 }}>
        <div className="absolute inset-0">
          <img src={heroNieuws} alt="" className="w-full h-full object-cover" />
          <div className="absolute inset-0" style={{ background: 'rgba(29,60,113,0.60)' }} />
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
            Nieuws & Kennisbank
          </h1>
          <p style={{ fontFamily: "'Inter', sans-serif", fontSize: 17, color: 'rgba(255,255,255,0.9)', lineHeight: 1.7, maxWidth: 600, marginTop: 16 }}>
            Praktische informatie over BPM, taxaties en voertuigwaardering.
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

          {loading ? (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {[1, 2, 3].map((i) => (
                <div key={i} className="rounded-[14px] bg-white animate-pulse h-[280px]" />
              ))}
            </div>
          ) : filtered.length === 0 ? (
            <p className="text-center py-16" style={{ color: '#698db3', fontSize: 17 }}>
              Geen artikelen gevonden in deze categorie.
            </p>
          ) : (
            <>
              {/* Featured article */}
              {featured && (
                <div
                  className="rounded-[14px] overflow-hidden mb-10 bg-white transition-all duration-200 hover:-translate-y-1"
                  style={{ boxShadow: '0 4px 24px rgba(29,60,113,0.08)' }}
                >
                  <div className="grid md:grid-cols-2">
                    <div
                      className="h-[240px] md:h-auto relative"
                      style={{ background: '#1d3c71', minHeight: 260 }}
                    >
                      <span
                        className="absolute top-4 left-4 text-xs font-bold uppercase rounded-full px-3 py-1"
                        style={{ background: '#ff751f', color: '#ffffff', letterSpacing: '0.06em' }}
                      >
                        {featured.category}
                      </span>
                    </div>
                    <div className="p-8 md:p-10 flex flex-col justify-center">
                      <p className="text-xs mb-2" style={{ color: '#698db3' }}>{formatDate(featured.published_at)}</p>
                      <h2 className="heading-display font-bold mb-3" style={{ fontSize: 24, color: '#1a1a1a', lineHeight: 1.3 }}>
                        {featured.title}
                      </h2>
                      <p style={{ fontFamily: "'Inter', sans-serif", fontSize: 15, color: '#4a5568', lineHeight: 1.70 }} className="mb-5">
                        {featured.excerpt}
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
                {rest.map((article) => (
                  <div
                    key={article.id}
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
                      <p className="text-xs mb-2" style={{ color: '#698db3' }}>{formatDate(article.published_at)}</p>
                      <h3 className="heading-display font-semibold mb-2" style={{ fontSize: 18, color: '#1a1a1a', lineHeight: 1.3 }}>
                        {article.title}
                      </h3>
                      <p style={{ fontFamily: "'Inter', sans-serif", fontSize: 14, color: '#4a5568', lineHeight: 1.65 }} className="mb-4 line-clamp-3">
                        {article.excerpt}
                      </p>
                      <span className="text-sm font-semibold inline-flex items-center gap-1.5 hover:gap-2.5 transition-all" style={{ color: '#ff751f' }}>
                        Lees meer <ArrowRight className="w-3.5 h-3.5" />
                      </span>
                    </div>
                  </div>
                ))}
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
