import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { CheckCircle } from "lucide-react";

interface IntakeFormProps {
  serviceType: string;
  formTitle?: string;
  formSubtext?: string;
  toelichtingLabel?: string;
  toelichtingPlaceholder?: string;
  submitButtonText?: string;
  footerText?: string;
  showVoertuigType?: boolean;
  hideKenteken?: boolean;
  styledKenteken?: boolean;
  compact?: boolean;
  onSuccess?: () => void;
}

const IntakeForm = ({ 
  serviceType, 
  formTitle,
  formSubtext,
  toelichtingLabel,
  toelichtingPlaceholder,
  submitButtonText,
  footerText,
  showVoertuigType = false,
  hideKenteken = false,
  styledKenteken = false,
  compact = false,
  onSuccess 
}: IntakeFormProps) => {
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [formData, setFormData] = useState({
    naam: "",
    email: "",
    telefoon: "",
    voertuigType: "",
    kenteken: "",
    bericht: "",
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitted(true);
    onSuccess?.();
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const inputHeight = compact ? "h-10" : "h-12";
  const padding = compact ? "p-6" : "p-8 md:p-12";

  if (isSubmitted) {
    return (
      <div className={`card-elevated ${padding} text-center animate-fade-in`}>
        <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-accent/10 mb-6">
          <CheckCircle className="w-8 h-8 text-accent" />
        </div>
        <h3 className="text-2xl font-semibold mb-3">Bedankt voor je aanvraag</h3>
        <p className="text-muted-foreground max-w-md mx-auto">
          We nemen zo snel mogelijk contact met je op om de details te bespreken 
          en een afspraak in te plannen.
        </p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className={`card-elevated ${padding} animate-slide-up`}>
      <div className="mb-8">
        <h3 className="text-2xl font-semibold mb-2">{formTitle || `Vraag een ${serviceType} aan`}</h3>
        <p className="text-muted-foreground">
          {formSubtext || "Vul onderstaand formulier in en we nemen binnen één werkdag contact met je op."}
        </p>
      </div>

      <div className="space-y-6">
        <div className="grid md:grid-cols-2 gap-6">
          <div className="space-y-2">
            <Label htmlFor="naam">Naam</Label>
            <Input
              id="naam"
              name="naam"
              placeholder="Je volledige naam"
              value={formData.naam}
              onChange={handleChange}
              required
              className={inputHeight}
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="telefoon">Telefoonnummer</Label>
            <Input
              id="telefoon"
              name="telefoon"
              type="tel"
              placeholder="06 12345678"
              value={formData.telefoon}
              onChange={handleChange}
              required
              className={inputHeight}
            />
          </div>
        </div>

        {hideKenteken ? (
          <div className="space-y-2">
            <Label htmlFor="email">E-mailadres</Label>
            <Input
              id="email"
              name="email"
              type="email"
              placeholder="je@emailadres.nl"
              value={formData.email}
              onChange={handleChange}
              required
              className={inputHeight}
            />
          </div>
        ) : styledKenteken ? (
          <div className="grid md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <Label htmlFor="email">E-mailadres</Label>
              <Input
                id="email"
                name="email"
                type="email"
                placeholder="je@emailadres.nl"
                value={formData.email}
                onChange={handleChange}
                required
                className={inputHeight}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="kenteken">Kenteken (optioneel)</Label>
              <div 
                className="flex items-stretch overflow-hidden"
                style={{ 
                  height: 52, 
                  maxWidth: 220,
                  borderRadius: 2,
                  border: '1px solid #CCA800',
                }}
              >
                <div 
                  className="flex flex-col items-center justify-center shrink-0"
                  style={{ 
                    background: '#003DA5', 
                    width: 40,
                    padding: '4px 0',
                    gap: 1,
                  }}
                >
                  <svg width="18" height="18" viewBox="0 0 18 18" style={{ display: 'block' }}>
                    <circle cx="9" cy="9" r="7" fill="none" stroke="#FFD700" strokeWidth="0.7" />
                    {[...Array(12)].map((_, i) => {
                      const angle = (i * 30 - 90) * (Math.PI / 180);
                      const x = 9 + 5.6 * Math.cos(angle);
                      const y = 9 + 5.6 * Math.sin(angle);
                      return (
                        <text key={i} x={x} y={y} fill="#FFD700" fontSize="3.2" textAnchor="middle" dominantBaseline="central">★</text>
                      );
                    })}
                  </svg>
                  <span className="text-white leading-none" style={{ fontSize: 12, fontWeight: 700, letterSpacing: '0.02em' }}>NL</span>
                </div>
                <input
                  id="kenteken"
                  name="kenteken"
                  placeholder="XX-000-X"
                  value={formData.kenteken}
                  onChange={handleChange}
                  className="outline-none px-3 flex items-center"
                  style={{
                    background: '#FFD700',
                    color: '#000000',
                    fontWeight: 800,
                    fontSize: 24,
                    letterSpacing: '0.25em',
                    textTransform: 'uppercase',
                    width: '100%',
                    fontFamily: "'Courier New', 'Consolas', monospace",
                    lineHeight: '52px',
                  }}
                />
              </div>
            </div>
          </div>
        ) : (
          <div className="grid md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <Label htmlFor="email">E-mailadres</Label>
              <Input
                id="email"
                name="email"
                type="email"
                placeholder="je@emailadres.nl"
                value={formData.email}
                onChange={handleChange}
                required
                className={inputHeight}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="kenteken">Kenteken (optioneel)</Label>
              <Input
                id="kenteken"
                name="kenteken"
                placeholder="Indien bekend"
                value={formData.kenteken}
                onChange={handleChange}
                className={inputHeight}
              />
            </div>
          </div>
        )}

        {showVoertuigType && (
          <div className="space-y-2">
            <Label htmlFor="voertuigType">Type voertuig</Label>
            <Input
              id="voertuigType"
              name="voertuigType"
              placeholder="Personenauto, bedrijfsauto, camper, motor"
              value={formData.voertuigType}
              onChange={handleChange}
              className={inputHeight}
            />
          </div>
        )}

        <div className="space-y-2">
          <Label htmlFor="bericht">{toelichtingLabel || "Toelichting"}</Label>
          <Textarea
            id="bericht"
            name="bericht"
            placeholder={toelichtingPlaceholder || "Vertel kort over je situatie en wat je nodig hebt..."}
            value={formData.bericht}
            onChange={handleChange}
            rows={4}
            className="resize-none"
          />
        </div>

        <div className="flex flex-col sm:flex-row gap-3">
          <Button
            type="submit"
            variant="cta"
            size="xl"
            className="w-full sm:flex-1"
            style={compact ? { height: 44 } : undefined}
          >
            {submitButtonText || "Verstuur aanvraag"}
          </Button>
          <a
            href="https://wa.me/31650694978"
            target="_blank"
            rel="noopener noreferrer"
            className="w-full sm:flex-1 inline-flex items-center justify-center gap-2 rounded-xl px-10 text-lg font-semibold text-white transition-all duration-200 hover:opacity-90 hover:-translate-y-0.5 shadow-lg"
            style={{ background: '#25D366', height: compact ? 44 : 56 }}
          >
            <svg viewBox="0 0 24 24" className="w-5 h-5 fill-white shrink-0">
              <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
            </svg>
            App ons direct
          </a>
        </div>

        <p className="text-sm text-muted-foreground text-center">
          {footerText || "We gaan zorgvuldig om met je gegevens en gebruiken deze alleen voor het verwerken van je aanvraag."}
        </p>
      </div>
    </form>
  );
};

export default IntakeForm;
