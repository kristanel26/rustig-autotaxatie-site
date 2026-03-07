import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import {
  LayoutDashboard,
  FileText,
  FilePlus,
  Bell,
  Users,
  LogOut,
  Menu,
  X,
  Plus,
  BarChart3,
} from 'lucide-react';
import { useState } from 'react';
import { cn } from '@/lib/utils';
import TaxarisLogo from '@/components/TaxarisLogo';

interface InternalLayoutProps {
  children: React.ReactNode;
  title?: string;
}

const InternalLayout: React.FC<InternalLayoutProps> = ({ children, title }) => {
  const { user, signOut } = useAuth();
  const location = useLocation();
  const navigate = useNavigate();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const handleSignOut = async () => {
    await signOut();
    navigate('/intern/login');
  };

  const navItems = [
    { path: '/intern/dashboard', label: 'Dashboard', icon: LayoutDashboard },
    { path: '/intern/klanten', label: 'Klanten', icon: Users },
    { path: '/intern/rapportage', label: 'Rapportage', icon: BarChart3 },
    { path: '/intern/herinneringen', label: 'Herinneringen', icon: Bell },
    { path: '/intern/rapporten', label: 'Rapporten', icon: FileText },
  ];

  const isActive = (path: string) => location.pathname === path;

  // User initials for avatar
  const initials = user?.email
    ? user.email.substring(0, 2).toUpperCase()
    : 'AT';

  return (
    <div className="intern-theme min-h-screen bg-background font-intern-sans">
      {/* ── NAVBAR ── */}
      <nav className="sticky top-0 z-50 h-[60px] flex items-center px-7 border-b border-primary/15 bg-background/[0.92] backdrop-blur-xl">
        {/* Logo */}
        <Link to="/intern/dashboard" className="flex items-center mr-10 no-underline group">
          <TaxarisLogo variant="white" size="md" className="hidden md:block" />
          <TaxarisLogo variant="icon" size="sm" className="block md:hidden" />
        </Link>

        {/* Separator */}
        <div className="w-px h-[18px] bg-[hsl(var(--s700))] mr-6 hidden md:block" />

        {/* Nav links */}
        <div className="hidden md:flex items-center gap-0.5 flex-1">
          {/* CTA button — first in visual order */}
          <Link
            to="/intern/nieuw-rapport"
            className={cn(
              "flex items-center gap-[7px] px-[17px] py-[7px] rounded-md text-[13px] font-semibold transition-all duration-150 no-underline",
              "bg-gradient-to-br from-[hsl(var(--gold))] to-[hsl(var(--gold-lt))] text-background",
              "shadow-[0_2px_10px_hsl(var(--gold)/0.25)] hover:brightness-110"
            )}
          >
            <Plus className="w-3.5 h-3.5 flex-shrink-0" strokeWidth={2.2} />
            Nieuw Rapport
          </Link>

          {navItems.map((item) => {
            const Icon = item.icon;
            const active = isActive(item.path);
            return (
              <Link
                key={item.path}
                to={item.path}
                className={cn(
                  "flex items-center gap-[7px] px-[14px] py-[7px] rounded-md text-[13px] font-medium transition-all duration-150 no-underline",
                  active
                    ? "text-white"
                    : "text-[hsl(var(--s400))] hover:text-white hover:bg-[hsl(var(--s800))]"
                )}
              >
                <Icon className="w-3.5 h-3.5 flex-shrink-0" />
                {item.label}
              </Link>
            );
          })}
        </div>

        {/* Right side */}
        <div className="hidden md:flex items-center gap-3 ml-auto">
          <span className="text-[12.5px] text-[hsl(var(--s500))]">
            {user?.email}
          </span>
          <div className="w-[31px] h-[31px] rounded-full bg-[hsl(var(--s800))] border-[1.5px] border-[hsl(var(--gold))] flex items-center justify-center font-intern-mono text-[10px] font-bold text-[hsl(var(--gold-lt))]">
            {initials}
          </div>
          <button
            onClick={handleSignOut}
            className="text-[hsl(var(--s400))] hover:text-white transition-colors p-1.5 rounded-md hover:bg-[hsl(var(--s800))]"
            title="Uitloggen"
          >
            <LogOut className="w-4 h-4" />
          </button>
        </div>

        {/* Mobile menu button */}
        <button
          className="md:hidden ml-auto p-2 text-[hsl(var(--s400))]"
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
        >
          {mobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </button>
      </nav>

      {/* Mobile menu */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-[hsl(var(--s900))] border-b border-[hsl(var(--s800))] px-4 py-3 space-y-1">
          {navItems.map((item) => {
            const Icon = item.icon;
            const active = isActive(item.path);
            return (
              <Link
                key={item.path}
                to={item.path}
                onClick={() => setMobileMenuOpen(false)}
                className={cn(
                  "flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-medium transition-colors no-underline",
                  active
                    ? "text-white bg-[hsl(var(--s800))]"
                    : "text-[hsl(var(--s400))] hover:text-white hover:bg-[hsl(var(--s800))]"
                )}
              >
                <Icon className="h-4 w-4" />
                {item.label}
              </Link>
            );
          })}
          <Link
            to="/intern/nieuw-rapport"
            onClick={() => setMobileMenuOpen(false)}
            className="flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-semibold no-underline bg-gradient-to-br from-[hsl(var(--gold))] to-[hsl(var(--gold-lt))] text-background"
          >
            <Plus className="h-4 w-4" />
            Nieuw Rapport
          </Link>
          <div className="border-t border-[hsl(var(--s800))] pt-3 mt-3">
            <p className="px-4 text-xs text-[hsl(var(--s500))] mb-2">{user?.email}</p>
            <button
              onClick={handleSignOut}
              className="flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-medium text-destructive hover:bg-destructive/10 w-full"
            >
              <LogOut className="h-4 w-4" />
              Uitloggen
            </button>
          </div>
        </div>
      )}

      {/* ── MAIN CONTENT ── */}
      <main className="max-w-[1180px] mx-auto px-8 py-8">
        {title && (
          <h1 className="font-display text-[2rem] text-white font-normal mb-1.5 tracking-normal">
            {title}
          </h1>
        )}
        {children}
      </main>
    </div>
  );
};

export default InternalLayout;
