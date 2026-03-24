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
          <>
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
            <div>
              <p className="text-[13px] mb-2" style={{ color: '#1a1a1a' }}>Kenteken bekend? Vul hem alvast in.</p>
              <div 
                className="flex items-stretch overflow-hidden w-full"
                style={{ 
                  height: 48, 
                  borderRadius: 2,
                  border: '1px solid #CCA800',
                }}
              >
                <div 
                  className="flex flex-col items-center justify-center shrink-0"
                  style={{ 
                    background: '#003DA5', 
                    width: 36,
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
                  className="outline-none px-4"
                  style={{
                    background: '#FFD700',
                    color: '#000000',
                    fontWeight: 700,
                    fontSize: 18,
                    letterSpacing: '0.2em',
                    textTransform: 'uppercase',
                    width: '100%',
                    fontFamily: "'Courier New', 'Consolas', monospace",
                  }}
                />
              </div>
              <p className="text-xs text-muted-foreground ml-1 mt-1.5">(optioneel)</p>
            </div>
          </>
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

        <Button
          type="submit"
          variant="cta"
          size="xl"
          className="w-full"
          style={compact ? { height: 44 } : undefined}
        >
          {submitButtonText || "Verstuur aanvraag"}
        </Button>

        <p className="text-sm text-muted-foreground text-center">
          {footerText || "We gaan zorgvuldig om met je gegevens en gebruiken deze alleen voor het verwerken van je aanvraag."}
        </p>
      </div>
    </form>
  );
};

export default IntakeForm;
