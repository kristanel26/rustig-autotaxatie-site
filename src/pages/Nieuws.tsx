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
      <UspBar />
      <div style={{ height: 4, background: '#ff751f', width: '100%' }} />

      {/* Compact Hero */}
      <section style={{ background: '#1d3c71' }} className="py-14 md:py-16 px-6 lg:px-8 text-center">
        <span
          className="inline-block mb-3 font-semibold uppercase"
          style={{ fontFamily: "'Inter', sans-serif", fontSize: 11, letterSpacing: '0.15em', color: '#ff751f' }}
        >
          NIEUWS
        </span>
        <h1
          className="font-bold mb-3"
          style={{ fontFamily: "'Playfair Display', serif", fontSize: 'clamp(28px, 3.5vw, 42px)', lineHeight: 1.2, color: '#ffffff' }}
        >
          BPM nieuws en jurisprudentie
        </h1>
        <p style={{ fontFamily: "'Inter', sans-serif", fontSize: 'clamp(15px, 1.5vw, 17px)', color: 'rgba(255,255,255,0.7)', lineHeight: 1.65, maxWidth: 560 }} className="mx-auto">
          Actuele berichten over wijzigingen in wet- en regelgeving, uitspraken en BPM-tarieven.
        </p>
      </section>

      {/* Content */}
      <section className="py-14 md:py-20 px-6 lg:px-8 bg-white">
        <div className="max-w-6xl mx-auto flex flex-col lg:flex-row gap-12">

          {/* Main list */}
          <div className="flex-1 min-w-0">
            {loading ? (
              <div className="space-y-4">
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
                    <div className="flex items-center gap-0 py-4">
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
                      <div style={{ height: 1, background: '#eef1f5' }} />
                    )}
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Sidebar */}
          <aside className="lg:w-[240px] shrink-0">
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
