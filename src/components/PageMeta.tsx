import { useEffect } from "react";
import { useLocation } from "react-router-dom";

interface PageMetaProps {
  title: string;
  description: string;
}

const PageMeta = ({ title, description }: PageMetaProps) => {
  const { pathname } = useLocation();

  useEffect(() => {
    document.title = title;

    const setMeta = (name: string, content: string, isProperty = false) => {
      const attr = isProperty ? "property" : "name";
      let el = document.querySelector(`meta[${attr}="${name}"]`);
      if (!el) {
        el = document.createElement("meta");
        el.setAttribute(attr, name);
        document.head.appendChild(el);
      }
      el.setAttribute("content", content);
    };

    setMeta("description", description);
    setMeta("og:title", title, true);
    setMeta("og:description", description, true);
    setMeta("og:type", "website", true);
    setMeta("og:url", `https://www.automobieltaxaties.nl${pathname}`, true);
    setMeta("og:site_name", "Automobiel Taxaties", true);
    setMeta("og:locale", "nl_NL", true);

    return () => {
      document.title = "Automobiel Taxaties, Erkend taxatiebureau";
    };
  }, [title, description, pathname]);

  return null;
};

export default PageMeta;
