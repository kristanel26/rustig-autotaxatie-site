import { ReactNode } from "react";
import { Button } from "@/components/ui/button";
import { ArrowDown, Phone } from "lucide-react";

interface LandingHeroProps {
  title: string;
  subtitle: string;
  description: string | ReactNode;
  ctaText: string;
  onCtaClick: () => void;
  heroAlt?: string;
  children?: ReactNode;
  heroImage?: string;
  heroImagePosition?: string;
  showPhoneButton?: boolean;
  compact?: boolean;
}

const LandingHero = ({
  title,
  subtitle,
  description,
  ctaText,
  onCtaClick,
  heroImage,
  heroImagePosition,
  children,
  showPhoneButton = true,
  compact = false,
}: LandingHeroProps) => {
  return (
    <section className={`relative flex items-center overflow-hidden ${compact ? '' : 'min-h-[85vh]'}`} style={compact ? { height: 420, minHeight: 420, maxHeight: 420 } : undefined}>
      {/* Background: image or gradient */}
      {heroImage ? (
        <div className="absolute inset-0">
          <img
            src={heroImage}
            alt={heroAlt || ""}
            className="w-full h-full object-cover"
            style={heroImagePosition ? { objectPosition: heroImagePosition } : undefined}
          />
          <div className="absolute inset-0" style={{ background: 'linear-gradient(to right, rgba(29,60,113,0.85) 0%, rgba(29,60,113,0.85) 40%, rgba(29,60,113,0.55) 70%, rgba(29,60,113,0.25) 100%)' }} />
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
          <div className="mb-6 animate-fade-in">
            <div style={{ width: 32, height: 2, background: '#ff751f', marginBottom: 12 }} />
            <p style={{ fontFamily: "'Inter', sans-serif", fontSize: 12, fontWeight: 500, letterSpacing: '0.1em', textTransform: 'uppercase' as const, color: '#ff751f' }}>
              {subtitle}
            </p>
          </div>
          <h1 style={{ fontFamily: "'Playfair Display', serif", fontSize: 'clamp(36px, 4.5vw, 56px)', fontWeight: 700, lineHeight: 1.1, color: '#ffffff', maxWidth: 700 }} className="mb-6 animate-slide-up text-balance">
            {title}
          </h1>
          <div style={{ fontFamily: "'Inter', sans-serif", fontSize: 17, color: 'rgba(255,255,255,0.9)', lineHeight: 1.7, maxWidth: 560 }} className="mb-10 animate-slide-up" >
            {description}
          </div>
          <div className="flex flex-col sm:flex-row gap-4 animate-slide-up" style={{ animationDelay: "200ms", marginBottom: 40 }}>
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

      {/* Straight bottom edge removed — USP bar connects seamlessly */}
    </section>
  );
};

export default LandingHero;