import { Moon, Sun } from 'lucide-react';
import { useTheme } from 'next-themes';
import { useEffect, useState } from 'react';

interface ThemeToggleProps {
  scrolled?: boolean;
}

const ThemeToggle: React.FC<ThemeToggleProps> = ({ scrolled = true }) => {
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => setMounted(true), []);
  if (!mounted) return null;

  const isDark = theme === 'dark';

  return (
    <button
      onClick={() => setTheme(isDark ? 'light' : 'dark')}
      className={`p-2 rounded-lg transition-colors ${
        scrolled
          ? 'text-muted-foreground hover:text-foreground hover:bg-secondary/80'
          : 'text-primary-foreground/70 hover:text-primary-foreground hover:bg-white/10'
      }`}
      aria-label={isDark ? 'Licht thema' : 'Donker thema'}
      title={isDark ? 'Licht thema' : 'Donker thema'}
    >
      {isDark ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
    </button>
  );
};

export default ThemeToggle;
