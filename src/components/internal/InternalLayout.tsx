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

  const initials = user?.email
    ? user.email.substring(0, 2).toUpperCase()
    : 'AT';

  return (
    <div className="intern-theme min-h-screen bg-background font-sans">
      {/* ── NAVBAR ── */}
      <nav className="sticky top-0 z-50 h-[60px] flex items-center px-7" style={{ background: '#1d3c71' }}>
        {/* Logo */}
        <Link to="/intern/dashboard" className="flex items-center mr-10 no-underline group">
          <span className="text-white font-bold text-lg tracking-tight">Automobiel Taxaties</span>
        </Link>

        {/* Separator */}
        <div className="w-px h-[18px] bg-white/20 mr-6 hidden md:block" />

        {/* Nav links */}
        <div className="hidden md:flex items-center gap-0.5 flex-1">
          {/* CTA button */}
          <Link
            to="/intern/nieuw-rapport"
            className={cn(
              "flex items-center gap-[7px] px-[17px] py-[7px] rounded-md text-[13px] font-semibold transition-all duration-150 no-underline",
              "bg-[#ff751f] text-white",
              "shadow-[0_2px_10px_rgba(255,117,31,0.3)] hover:bg-[#e8651a]"
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
                    ? "text-white border-b-2 border-[#ff751f]"
                    : "text-white/75 hover:text-white hover:bg-white/10"
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
          <span className="text-[12.5px] text-white/60">
            {user?.email}
          </span>
          <div className="w-[31px] h-[31px] rounded-full bg-white/15 border-[1.5px] border-white/30 flex items-center justify-center text-[10px] font-bold text-white">
            {initials}
          </div>
          <button
            onClick={handleSignOut}
            className="text-white/60 hover:text-white transition-colors p-1.5 rounded-md hover:bg-white/10"
            title="Uitloggen"
          >
            <LogOut className="w-4 h-4" />
          </button>
        </div>

        {/* Mobile menu button */}
        <button
          className="md:hidden ml-auto p-2 text-white/75"
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
        >
          {mobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </button>
      </nav>

      {/* Mobile menu */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-[#1d3c71] border-b border-white/10 px-4 py-3 space-y-1">
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
                    ? "text-white bg-white/10"
                    : "text-white/75 hover:text-white hover:bg-white/10"
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
            className="flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-semibold no-underline bg-[#ff751f] text-white"
          >
            <Plus className="h-4 w-4" />
            Nieuw Rapport
          </Link>
          <div className="border-t border-white/10 pt-3 mt-3">
            <p className="px-4 text-xs text-white/50 mb-2">{user?.email}</p>
            <button
              onClick={handleSignOut}
              className="flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-medium text-red-300 hover:bg-white/5 w-full"
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
          <h1 className="text-[2rem] font-bold mb-1.5 tracking-normal" style={{ color: '#1d3c71' }}>
            {title}
          </h1>
        )}
        {children}
      </main>
    </div>
  );
};

export default InternalLayout;
