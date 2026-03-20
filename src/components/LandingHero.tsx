import { ReactNode } from "react";
import { Button } from "@/components/ui/button";
import { ArrowDown, Phone } from "lucide-react";

interface LandingHeroProps {
  title: string;
  subtitle: string;
  description: string | ReactNode;
  ctaText: string;
  onCtaClick: () => void;
  children?: ReactNode;
  heroImage?: string;
  showPhoneButton?: boolean;
}

const LandingHero = ({
  title,
  subtitle,
  description,
  ctaText,
  onCtaClick,
  heroImage,
  children,
  showPhoneButton = true,
}: LandingHeroProps) => {
  return (
    <section className="relative min-h-[85vh] flex items-center overflow-hidden">
      {/* Background: image or gradient */}
      {heroImage ? (
        <div className="absolute inset-0">
          <img
            src={heroImage}
            alt=""
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0" style={{ background: 'rgba(29,60,113,0.55)' }} />
        </div>
      ) : (
        <div className="absolute inset-0 hero-section" />
      )}

      {/* Subtle dot pattern */}
      <div className="absolute inset-0 opacity-[0.04]">
        <div
          className="absolute inset-0"
          style={{
            backgroundImage: `radial-gradient(circle at 1.5px 1.5px, white 1px, transparent 0)`,
            backgroundSize: "32px 32px",
          }}
        />
      </div>

      {/* Decorative glow orbs */}
      <div className="absolute top-20 right-[10%] w-[500px] h-[500px] rounded-full opacity-[0.08]"
        style={{ background: 'radial-gradient(circle, hsl(175 50% 50%) 0%, transparent 70%)' }}
      />
      <div className="absolute bottom-20 left-[5%] w-[300px] h-[300px] rounded-full opacity-[0.06]"
        style={{ background: 'radial-gradient(circle, hsl(21 100% 56%) 0%, transparent 70%)' }}
      />

      <div className="container-wide w-full px-6 md:px-8 py-16 md:py-24 relative z-10">
        <div className="max-w-3xl">
          <div className="flex items-center gap-3 mb-6 animate-fade-in">
            <div className="accent-line" />
            <p className="text-white/80 font-semibold uppercase tracking-widest text-xs">
              {subtitle}
            </p>
          </div>
          <h1 className="heading-display text-white mb-6 leading-[1.1] animate-slide-up text-balance" style={{ fontSize: 'clamp(36px, 4.5vw, 56px)', fontWeight: 700 }}>
            {title}
          </h1>
          <div className="text-lg md:text-xl text-white/75 mb-10 max-w-2xl animate-slide-up leading-relaxed" style={{ animationDelay: "100ms" }}>
            {description}
          </div>
          <div className="flex flex-col sm:flex-row gap-4 animate-slide-up" style={{ animationDelay: "200ms" }}>
            <Button variant="hero" size="xl" onClick={onCtaClick}>
              {ctaText}
              <ArrowDown className="w-5 h-5 ml-2" />
            </Button>
            {showPhoneButton && (
              <a href="tel:+31854832461">
                <button className="btn-outline-white">
                  <Phone className="w-5 h-5" />
                  085 483 2461
                </button>
              </a>
            )}
          </div>
          {children && (
            <div className="animate-slide-up mt-5" style={{ animationDelay: "300ms" }}>
              {children}
            </div>
          )}
        </div>
      </div>

      {/* Straight bottom edge */}
      <div className="absolute bottom-0 left-0 right-0 h-1 bg-background" />
    </section>
  );
};

export default LandingHero;