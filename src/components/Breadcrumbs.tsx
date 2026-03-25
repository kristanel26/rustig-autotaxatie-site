import { Link } from "react-router-dom";

export interface BreadcrumbItem {
  label: string;
  href?: string;
}

interface BreadcrumbsProps {
  items: BreadcrumbItem[];
}

const Breadcrumbs = ({ items }: BreadcrumbsProps) => {
  const allItems: BreadcrumbItem[] = [{ label: "Home", href: "/" }, ...items];
  const parent = allItems.length >= 2 ? allItems[allItems.length - 2] : null;

  return (
    <nav className="bg-white w-full" style={{ padding: '8px 0' }}>
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        {/* Desktop */}
        <ol className="hidden md:flex items-center gap-1.5 list-none m-0 p-0" style={{ fontSize: 13 }}>
          {allItems.map((item, i) => {
            const isLast = i === allItems.length - 1;
            return (
              <li key={i} className="flex items-center gap-1.5">
                {i > 0 && <span style={{ color: '#aaa' }}>›</span>}
                {isLast ? (
                  <span style={{ color: '#1d3c71', fontWeight: 500 }}>{item.label}</span>
                ) : (
                  <Link
                    to={item.href || "/"}
                    className="no-underline hover:underline"
                    style={{ color: '#698db3' }}
                  >
                    {item.label}
                  </Link>
                )}
              </li>
            );
          })}
        </ol>
        {/* Mobile: show parent link only */}
        {parent && parent.href && (
          <div className="md:hidden">
            <Link
              to={parent.href}
              className="no-underline hover:underline inline-flex items-center gap-1"
              style={{ color: '#698db3', fontSize: 13 }}
            >
              <span>‹</span> {parent.label}
            </Link>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Breadcrumbs;
