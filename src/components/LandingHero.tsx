import { ReactNode } from "react";
import { Button } from "@/components/ui/button";
import { ArrowDown } from "lucide-react";

interface LandingHeroProps {
  title: string;
  subtitle: string;
  description: string | ReactNode;
  ctaText: string;
  onCtaClick: () => void;
  children?: ReactNode;
}

const LandingHero = ({
  title,
  subtitle,
  description,
  ctaText,
  onCtaClick,
}: LandingHeroProps) => {
  return (
    <section className="hero-section min-h-[85vh] flex items-center relative overflow-hidden">
      {/* Subtle pattern overlay */}
      <div className="absolute inset-0 opacity-5">
        <div
          className="absolute inset-0"
          style={{
            backgroundImage: `radial-gradient(circle at 2px 2px, white 1px, transparent 0)`,
            backgroundSize: "40px 40px",
          }}
        />
      </div>

      <div className="container-wide w-full px-6 md:px-8 py-16 md:py-24 relative z-10">
        <div className="max-w-3xl">
          <p className="text-accent-foreground/80 font-medium mb-4 animate-fade-in uppercase tracking-wider text-sm">
            {subtitle}
          </p>
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-primary-foreground mb-6 leading-tight animate-slide-up text-balance">
            {title}
          </h1>
          <div className="text-lg md:text-xl text-primary-foreground/80 mb-10 max-w-2xl animate-slide-up leading-relaxed" style={{ animationDelay: "100ms" }}>
            {description}
          </div>
          <div className="flex flex-col sm:flex-row gap-4 animate-slide-up" style={{ animationDelay: "200ms" }}>
            <Button variant="hero" size="xl" onClick={onCtaClick}>
              {ctaText}
              <ArrowDown className="w-5 h-5 ml-2" />
            </Button>
          </div>
        </div>
      </div>

      {/* Bottom wave decoration */}
      <div className="absolute bottom-0 left-0 right-0">
        <svg
          viewBox="0 0 1440 120"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="w-full h-auto"
          preserveAspectRatio="none"
        >
          <path
            d="M0 120L48 110C96 100 192 80 288 70C384 60 480 60 576 65C672 70 768 80 864 85C960 90 1056 90 1152 85C1248 80 1344 70 1392 65L1440 60V120H1392C1344 120 1248 120 1152 120C1056 120 960 120 864 120C768 120 672 120 576 120C480 120 384 120 288 120C192 120 96 120 48 120H0Z"
            fill="hsl(var(--background))"
          />
        </svg>
      </div>
    </section>
  );
};

export default LandingHero;
