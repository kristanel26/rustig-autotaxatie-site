import SiteHeader from "@/components/SiteHeader";
import SiteFooter from "@/components/SiteFooter";
import UspBar from "@/components/UspBar";
import PageMeta from "@/components/PageMeta";
import WhatsAppButton from "@/components/WhatsAppButton";
import { ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";
import { format } from "date-fns";
import { nl } from "date-fns/locale";

const sidebarCategories = ["BPM", "Wetgeving", "Jurisprudentie", "Verzekeringstaxatie"];
const archiveYears = ["2026", "2025"];

interface Article {
  id: string;
  title: string;
  slug: string;
  category: string;
  published_at: string | null;
}

const Nieuws = () => {
  const [articles, setArticles] = useState<Article[]>([]);
  const [loading, setLoading] = useState(true);
  const [activeCategory, setActiveCategory] = useState<string | null>(null);
  const [activeYear, setActiveYear] = useState<string | null>(null);

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
    if (activeCategory && a.category !== activeCategory) return false;
    if (activeYear && a.published_at && !a.published_at.startsWith(activeYear)) return false;
    return true;
  });

  const formatDate = (dateStr: string | null) => {
    if (!dateStr) return "";
    return format(new Date(dateStr), "d MMM yyyy", { locale: nl });
  };

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

  return (
    <>
      <PageMeta
        title="BPM Nieuws en Jurisprudentie | Taxaris"
        description="Actuele berichten over wijzigingen in wet- en regelgeving, uitspraken en BPM-tarieven."
      />
      <SiteHeader />

      {/* Hero */}
      <section
        className="flex items-center justify-center px-6 lg:px-8 text-center"
        style={{ background: '#1d3c71', minHeight: 280 }}
      >
        <div>
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

      {/* Content */}
      <section className="py-14 md:py-20 px-6 lg:px-8" style={{ background: '#f7f8fa' }}>
        <div className="mx-auto flex flex-col lg:flex-row" style={{ maxWidth: 1200, padding: '0 40px', gap: '2%' }}>

          {/* Main list */}
          <div style={{ flex: '0 0 70%', minWidth: 0 }}>
            {loading ? (
              <div className="space-y-4 py-4">
                {[1, 2, 3, 4].map((i) => (
                  <div key={i} className="h-14 bg-gray-100 rounded animate-pulse" />
                ))}
              </div>
            ) : filtered.length === 0 ? (
              <p style={{ color: '#698db3', fontSize: 16, fontFamily: "'Inter', sans-serif" }} className="py-10 text-center">
                Geen nieuwsberichten gevonden.
              </p>
            ) : (
              <div>
                {filtered.map((article, i) => (
                  <div key={article.id}>
                    <div className="flex items-center gap-0" style={{ padding: '20px 0' }}>
                      {/* Date */}
                      <span
                        className="shrink-0 text-right pr-4"
                        style={{ width: 120, fontFamily: "'Inter', sans-serif", fontSize: 13, color: '#8a9bb5' }}
                      >
                        {formatDate(article.published_at)}
                      </span>

                      {/* Vertical divider */}
                      <div className="shrink-0 self-stretch" style={{ width: 1, background: '#dde3ea' }} />

                      {/* Category badge */}
                      <span
                        className="shrink-0 ml-4 mr-4 inline-block rounded-full px-2.5 py-0.5 font-bold uppercase"
                        style={{ fontSize: 10, letterSpacing: '0.08em', background: 'rgba(255,117,31,0.12)', color: '#ff751f' }}
                      >
                        {getCategoryLabel(article.category)}
                      </span>

                      {/* Title */}
                      <Link
                        to={`/blog/${article.slug}`}
                        className="flex-1 min-w-0 font-semibold hover:underline truncate"
                        style={{ fontFamily: "'Inter', sans-serif", fontSize: 15, color: '#1d3c71', lineHeight: 1.4 }}
                      >
                        {article.title}
                      </Link>

                      {/* Read more */}
                      <Link
                        to={`/blog/${article.slug}`}
                        className="shrink-0 ml-4 inline-flex items-center gap-1 font-semibold hover:gap-2 transition-all"
                        style={{ fontFamily: "'Inter', sans-serif", fontSize: 13, color: '#ff751f' }}
                      >
                        Lees meer <ArrowRight className="w-3.5 h-3.5" />
                      </Link>
                    </div>
                    {i < filtered.length - 1 && (
                      <div style={{ height: 1, background: '#eef0f3' }} />
                    )}
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Sidebar */}
          <aside
            className="lg:w-[260px] shrink-0 self-start"
            style={{ background: '#ffffff', borderRadius: 8, boxShadow: '0 2px 10px rgba(0,0,0,0.07)', padding: 24 }}
          >
            {/* Categories */}
            <div className="mb-8">
              <span
                className="block mb-3 font-bold uppercase"
                style={{ fontFamily: "'Inter', sans-serif", fontSize: 11, letterSpacing: '0.12em', color: '#1d3c71' }}
              >
                Categorieën
              </span>
              <div className="space-y-1">
                {sidebarCategories.map((cat) => (
                  <button
                    key={cat}
                    onClick={() => setActiveCategory(activeCategory === cat ? null : cat)}
                    className="block w-full text-left px-3 py-2 rounded-md text-sm transition-colors"
                    style={{
                      fontFamily: "'Inter', sans-serif",
                      fontSize: 14,
                      color: activeCategory === cat ? '#ff751f' : '#4a5568',
                      background: activeCategory === cat ? 'rgba(255,117,31,0.08)' : 'transparent',
                      fontWeight: activeCategory === cat ? 600 : 400,
                    }}
                  >
                    {cat}
                  </button>
                ))}
              </div>
            </div>

            {/* Archive */}
            <div>
              <span
                className="block mb-3 font-bold uppercase"
                style={{ fontFamily: "'Inter', sans-serif", fontSize: 11, letterSpacing: '0.12em', color: '#1d3c71' }}
              >
                Archief
              </span>
              <div className="space-y-1">
                {archiveYears.map((year) => (
                  <button
                    key={year}
                    onClick={() => setActiveYear(activeYear === year ? null : year)}
                    className="block w-full text-left px-3 py-2 rounded-md text-sm transition-colors"
                    style={{
                      fontFamily: "'Inter', sans-serif",
                      fontSize: 14,
                      color: activeYear === year ? '#ff751f' : '#4a5568',
                      background: activeYear === year ? 'rgba(255,117,31,0.08)' : 'transparent',
                      fontWeight: activeYear === year ? 600 : 400,
                    }}
                  >
                    {year}
                  </button>
                ))}
              </div>
            </div>
          </aside>
        </div>
      </section>

      <SiteFooter />
      <WhatsAppButton />
    </>
  );
};

export default Nieuws;
