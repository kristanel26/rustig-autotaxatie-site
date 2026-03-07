import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import { useToast } from '@/hooks/use-toast';
import { z } from 'zod';
import { ArrowRight } from 'lucide-react';

import logoFull from '@/assets/taxaris-logo-full.svg';

const loginSchema = z.object({
  email: z.string().trim().email({ message: 'Voer een geldig e-mailadres in' }),
  password: z.string().min(6, { message: 'Wachtwoord moet minimaal 6 tekens bevatten' }),
});

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [errors, setErrors] = useState<{ email?: string; password?: string }>({});

  const { signIn, user, loading } = useAuth();
  const navigate = useNavigate();
  const { toast } = useToast();

  useEffect(() => {
    if (!loading && user) {
      navigate('/intern/nieuw-rapport');
    }
  }, [user, loading, navigate]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrors({});

    const result = loginSchema.safeParse({ email, password });
    if (!result.success) {
      const fieldErrors: { email?: string; password?: string } = {};
      result.error.errors.forEach((err) => {
        if (err.path[0] === 'email') fieldErrors.email = err.message;
        if (err.path[0] === 'password') fieldErrors.password = err.message;
      });
      setErrors(fieldErrors);
      return;
    }

    setIsLoading(true);
    try {
      const { error } = await signIn(email, password);
      if (error) {
        if (error.message.includes('Invalid login credentials')) {
          toast({
            title: 'Ongeldige inloggegevens',
            description: 'Controleer je e-mailadres en wachtwoord.',
            variant: 'destructive',
          });
        } else {
          toast({
            title: 'Inloggen mislukt',
            description: error.message,
            variant: 'destructive',
          });
        }
      }
    } finally {
      setIsLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center" style={{ background: '#07090f' }}>
        <div className="animate-spin rounded-full h-8 w-8 border-b-2" style={{ borderColor: '#c9a84c' }} />
      </div>
    );
  }

  return (
    <div
      className="min-h-screen grid"
      style={{
        gridTemplateColumns: '1fr 420px',
        background: '#07090f',
      }}
    >
      {/* ── LEFT COLUMN — Brand Panel ── */}
      <div
        className="relative flex flex-col justify-center p-12 overflow-hidden"
        style={{
          background: `
            linear-gradient(rgba(201,168,76,0.03) 1px, transparent 1px),
            linear-gradient(90deg, rgba(201,168,76,0.03) 1px, transparent 1px),
            #07090f
          `,
          backgroundSize: '60px 60px',
        }}
      >
        {/* Watermark — inline SVG magnifying glass */}
        <div
          className="absolute inset-0 flex items-center justify-center pointer-events-none"
        >
          <svg
            width="500"
            height="500"
            viewBox="0 0 500 500"
            fill="none"
            aria-hidden="true"
            style={{ opacity: 0.07 }}
          >
            <circle cx="220" cy="220" r="160" stroke="#C9A84C" strokeWidth="32" fill="none" />
            <line x1="340" y1="340" x2="460" y2="460" stroke="#C9A84C" strokeWidth="36" strokeLinecap="round" />
          </svg>
        </div>

        {/* Top-left logo */}
        <div className="absolute top-8 left-12 z-20">
          <img
            src={logoFull}
            alt="Taxaris"
            style={{
              height: 40,
              width: 'auto',
              filter: 'brightness(0) invert(0.78) sepia(1) saturate(3) hue-rotate(10deg)',
            }}
          />
        </div>

        <div className="relative z-10">
          {/* Tagline */}
          <h1
            style={{
              fontFamily: '"Cormorant Garamond", serif',
              fontWeight: 300,
              fontSize: '2.25rem',
              lineHeight: 1.3,
              color: '#e8dcc8',
              marginBottom: 16,
            }}
          >
            Professionele voertuigtaxaties{' '}
            <em style={{ color: '#c9a84c', fontStyle: 'italic' }}>op orde</em>
          </h1>

          <p
            style={{
              fontFamily: '"DM Sans", sans-serif',
              fontSize: '0.925rem',
              lineHeight: 1.7,
              color: '#8a9bb5',
              maxWidth: 460,
            }}
          >
            Software voor erkende taxateurs. Klassiekers, campers en
            WEV-bepalingen, volledig conform art.&nbsp;7:960 BW en fiscale
            regelgeving.
          </p>
        </div>

        {/* Vertical separator on right edge */}
        <div
          className="absolute right-0 top-0 bottom-0 w-px"
          style={{
            background: 'linear-gradient(to bottom, transparent, rgba(201,168,76,0.2), transparent)',
          }}
        />
      </div>

      {/* ── RIGHT COLUMN — Login Panel ── */}
      <div
        className="flex flex-col justify-center px-12"
        style={{
          background: '#0d1018',
          borderLeft: '1px solid rgba(201,168,76,0.08)',
        }}
      >
        <div className="w-full max-w-[320px] mx-auto">
          <h2
            style={{
              fontFamily: '"Cormorant Garamond", serif',
              fontWeight: 400,
              fontSize: '1.75rem',
              color: '#e8dcc8',
              marginBottom: 6,
            }}
          >
            Welkom terug
          </h2>
          <p
            style={{
              fontFamily: '"DM Sans", sans-serif',
              fontSize: '0.875rem',
              color: '#8a9bb5',
              marginBottom: 32,
            }}
          >
            Log in op uw Taxaris-account
          </p>

          <form onSubmit={handleSubmit} className="space-y-5">
            {/* Email */}
            <div>
              <label
                htmlFor="email"
                style={{
                  fontFamily: '"DM Sans", sans-serif',
                  fontSize: '0.8rem',
                  color: '#8a9bb5',
                  display: 'block',
                  marginBottom: 6,
                }}
              >
                E-mailadres
              </label>
              <input
                id="email"
                type="email"
                placeholder="naam@voorbeeld.nl"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                disabled={isLoading}
                style={{
                  width: '100%',
                  fontFamily: '"DM Sans", sans-serif',
                  fontSize: '0.875rem',
                  padding: '10px 14px',
                  borderRadius: 6,
                  border: errors.email ? '1px solid #ef4444' : '1px solid #253047',
                  background: '#111827',
                  color: '#e8dcc8',
                  outline: 'none',
                }}
                onFocus={(e) => (e.target.style.borderColor = '#c9a84c')}
                onBlur={(e) => (e.target.style.borderColor = errors.email ? '#ef4444' : '#253047')}
              />
              {errors.email && (
                <p style={{ fontSize: '0.75rem', color: '#ef4444', marginTop: 4 }}>{errors.email}</p>
              )}
            </div>

            {/* Password */}
            <div>
              <label
                htmlFor="password"
                style={{
                  fontFamily: '"DM Sans", sans-serif',
                  fontSize: '0.8rem',
                  color: '#8a9bb5',
                  display: 'block',
                  marginBottom: 6,
                }}
              >
                Wachtwoord
              </label>
              <input
                id="password"
                type="password"
                placeholder="••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                disabled={isLoading}
                style={{
                  width: '100%',
                  fontFamily: '"DM Sans", sans-serif',
                  fontSize: '0.875rem',
                  padding: '10px 14px',
                  borderRadius: 6,
                  border: errors.password ? '1px solid #ef4444' : '1px solid #253047',
                  background: '#111827',
                  color: '#e8dcc8',
                  outline: 'none',
                }}
                onFocus={(e) => (e.target.style.borderColor = '#c9a84c')}
                onBlur={(e) => (e.target.style.borderColor = errors.password ? '#ef4444' : '#253047')}
              />
              {errors.password && (
                <p style={{ fontSize: '0.75rem', color: '#ef4444', marginTop: 4 }}>{errors.password}</p>
              )}
            </div>

            {/* Forgot password link */}
            <div className="flex justify-end">
              <button
                type="button"
                style={{
                  fontFamily: '"DM Sans", sans-serif',
                  fontSize: '0.775rem',
                  color: '#c9a84c',
                  background: 'none',
                  border: 'none',
                  cursor: 'pointer',
                  opacity: 0.8,
                }}
              >
                Wachtwoord vergeten?
              </button>
            </div>

            {/* Submit */}
            <button
              type="submit"
              disabled={isLoading}
              className="flex items-center justify-center gap-2 w-full transition-opacity"
              style={{
                fontFamily: '"DM Sans", sans-serif',
                fontWeight: 600,
                fontSize: '0.875rem',
                padding: '11px 0',
                borderRadius: 6,
                background: '#c9a84c',
                color: '#07090f',
                border: 'none',
                cursor: isLoading ? 'not-allowed' : 'pointer',
                opacity: isLoading ? 0.6 : 1,
              }}
            >
              {isLoading ? 'Even geduld...' : 'Inloggen'}
              {!isLoading && <ArrowRight size={16} />}
            </button>
          </form>

          {/* Info block */}
          <div
            className="mt-10 pt-8"
            style={{ borderTop: '1px solid #253047' }}
          >
            <p
              style={{
                fontFamily: '"DM Sans", sans-serif',
                fontSize: '0.75rem',
                color: '#8a9bb5',
                textAlign: 'center',
                lineHeight: 1.6,
              }}
            >
              Automobiel Taxaties&ensp;|&ensp;Leigraaf 160 · Druten
            </p>
          </div>

          {/* Footer */}
          <div className="mt-6 text-center">
            <p
              style={{
                fontFamily: '"DM Sans", sans-serif',
                fontSize: '0.7rem',
                color: '#8a9bb5',
                opacity: 0.6,
                marginBottom: 8,
              }}
            >
              Privacybeleid · Gebruiksvoorwaarden
            </p>
            <span
              style={{
                fontFamily: '"Space Mono", monospace',
                fontSize: '0.6rem',
                letterSpacing: '0.1em',
                color: '#253047',
                textTransform: 'uppercase',
              }}
            >
              TAXARIS PLATFORM · v2.0
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
