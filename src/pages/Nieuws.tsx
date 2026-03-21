import SiteHeader from "@/components/SiteHeader";
import SiteFooter from "@/components/SiteFooter";
import UspBar from "@/components/UspBar";
import PageMeta from "@/components/PageMeta";
import WhatsAppButton from "@/components/WhatsAppButton";
import { ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import heroNieuws from "@/assets/hero-nieuws.jpg";
import { supabase } from "@/integrations/supabase/client";
import { format } from "date-fns";
import { nl } from "date-fns/locale";

const filterCategories = [
  "Alle berichten", "BPM", "Wetgeving", "Jurisprudentie",
  "Verzekeringstaxatie", "Oldtimers", "Tips",
];

interface Article {
  id: string;
  title: string;
  slug: string;
  category: string;
  published_at: string | null;
}

const getCategoryLabel = (cat: string) => {
  const map: Record<string, string> = {
    "BPM & Import": "BPM",
    "Oldtimers & Youngtimers": "OLDTIMERS",
    "Verzekeringstaxatie": "VERZEKERING",
    "Wetgeving": "WETGEVING",
    "Tips & Uitleg": "TIPS",
  };
  return map[cat] || cat.toUpperCase();
};

const Nieuws = () => {
  const [articles, setArticles] = useState<Article[]>([]);
  const [loading, setLoading] = useState(true);
  const [activeFilter, setActiveFilter] = useState("Alle berichten");

  useEffect(() => {
    const fetchArticles = async () => {
      const { data, error } = await supabase
        .from("articles")
        .select("id, title, slug, category, published_at")
        .eq("status", "published")
        .order("published_at", { ascending: false });
      if (!error && data) setArticles(data);
      setLoading(false);
    };
    fetchArticles();
  }, []);

  const filtered = articles.filter((a) => {
    if (activeFilter === "Alle berichten") return true;
    const label = getCategoryLabel(a.category);
    return label === activeFilter.toUpperCase();
  });

  const formatDate = (dateStr: string | null) => {
    if (!dateStr) return "";
    return format(new Date(dateStr), "d MMM yyyy", { locale: nl });
  };

  return (
    <>
      <PageMeta
        title="BPM Nieuws en Jurisprudentie | Taxaris"
        description="Actuele berichten over wijzigingen in wet- en regelgeving, uitspraken en BPM-tarieven."
      />
      <SiteHeader />

      {/* Hero */}
      <section className="relative overflow-hidden flex items-center justify-center px-6 lg:px-8 text-center" style={{ minHeight: 320 }}>
        <div className="absolute inset-0">
          <img src={heroNieuws} alt="" className="w-full h-full object-cover" />
          <div className="absolute inset-0" style={{ background: 'rgba(29,60,113,0.60)' }} />
        </div>
        <div className="relative z-10">
          <span
            className="inline-block mb-3 font-semibold uppercase"
            style={{ fontFamily: "'Inter', sans-serif", fontSize: 11, letterSpacing: '0.15em', color: '#ff751f' }}
          >
            NIEUWS
          </span>
          <h1
            className="font-bold mb-3"
            style={{ fontFamily: "'Playfair Display', serif", fontSize: 'clamp(30px, 4vw, 44px)', lineHeight: 1.2, color: '#ffffff' }}
          >
            BPM nieuws en jurisprudentie
          </h1>
          <p style={{ fontFamily: "'Inter', sans-serif", fontSize: 18, color: 'rgba(255,255,255,0.7)', lineHeight: 1.65, maxWidth: 600 }} className="mx-auto">
            Actuele berichten over wijzigingen in wet- en regelgeving, uitspraken en BPM-tarieven.
          </p>
        </div>
      </section>

      <UspBar />
      <div style={{ height: 4, background: '#ff751f', width: '100%' }} />

      {/* News cards */}
      <section style={{ background: '#f7f8fa', padding: '80px 40px' }}>
        <div style={{ maxWidth: 960, margin: '0 auto' }}>

          {/* Category filter pills */}
          <div className="flex flex-wrap justify-center gap-2 mb-12">
            {filterCategories.map((cat) => {
              const isActive = activeFilter === cat;
              return (
                <button
                  key={cat}
                  onClick={() => setActiveFilter(cat)}
                  style={{
                    fontFamily: "'Inter', sans-serif",
                    fontSize: 13,
                    fontWeight: isActive ? 600 : 400,
                    padding: '8px 20px',
                    borderRadius: 30,
                    border: isActive ? 'none' : '1px solid #dde3ea',
                    background: isActive ? '#1d3c71' : '#f7f8fa',
                    color: isActive ? '#ffffff' : '#1d3c71',
                    cursor: 'pointer',
                    transition: 'all 200ms ease',
                  }}
                >
                  {cat}
                </button>
              );
            })}
          </div>

          {/* Article cards */}
          {loading ? (
            <div className="space-y-4">
              {[1, 2, 3, 4].map((i) => (
                <div key={i} className="h-20 rounded-lg animate-pulse" style={{ background: '#e8ebf0' }} />
              ))}
            </div>
          ) : filtered.length === 0 ? (
            <p className="text-center py-16" style={{ fontFamily: "'Inter', sans-serif", fontSize: 16, color: '#698db3' }}>
              Geen nieuwsberichten gevonden.
            </p>
          ) : (
            <div className="flex flex-col gap-4">
              {filtered.map((article) => (
                <Link
                  key={article.id}
                  to={`/blog/${article.slug}`}
                  className="group flex items-start gap-0 no-underline"
                  style={{
                    background: '#ffffff',
                    borderRadius: 10,
                    boxShadow: '0 2px 10px rgba(0,0,0,0.06)',
                    padding: '28px 32px',
                    borderLeft: '3px solid transparent',
                    transition: 'all 200ms ease',
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.boxShadow = '0 4px 20px rgba(0,0,0,0.10)';
                    e.currentTarget.style.borderLeftColor = '#ff751f';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.boxShadow = '0 2px 10px rgba(0,0,0,0.06)';
                    e.currentTarget.style.borderLeftColor = 'transparent';
                  }}
                >
                  {/* Date */}
                  <span
                    className="shrink-0"
                    style={{ width: 100, fontFamily: "'Inter', sans-serif", fontSize: 13, color: '#8a9bb5', paddingTop: 2 }}
                  >
                    {formatDate(article.published_at)}
                  </span>

                  {/* Badge + Title */}
                  <div className="flex-1 min-w-0 px-4">
                    <span
                      className="inline-block mb-1.5 uppercase font-semibold"
                      style={{
                        fontFamily: "'Inter', sans-serif",
                        fontSize: 11,
                        letterSpacing: '0.06em',
                        background: '#EBF2FB',
                        color: '#1d3c71',
                        borderRadius: 20,
                        padding: '3px 12px',
                      }}
                    >
                      {getCategoryLabel(article.category)}
                    </span>
                    <p
                      className="font-semibold"
                      style={{ fontFamily: "'Inter', sans-serif", fontSize: 17, color: '#1d3c71', lineHeight: 1.5, margin: 0 }}
                    >
                      {article.title}
                    </p>
                  </div>

                  {/* Read more */}
                  <span
                    className="shrink-0 inline-flex items-center gap-1 font-semibold group-hover:gap-2 transition-all self-center"
                    style={{ fontFamily: "'Inter', sans-serif", fontSize: 13, color: '#ff751f', whiteSpace: 'nowrap' }}
                  >
                    Lees meer <ArrowRight className="w-3.5 h-3.5" />
                  </span>
                </Link>
              ))}
            </div>
          )}
        </div>
      </section>

      <SiteFooter />
      <WhatsAppButton />
    </>
  );
};

export default Nieuws;
