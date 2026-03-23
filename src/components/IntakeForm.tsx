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
  toelichtingPlaceholder,
  submitButtonText,
  showVoertuigType = false,
  hideKenteken = false,
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
          <Label htmlFor="bericht">Toelichting</Label>
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
          We gaan zorgvuldig om met je gegevens en gebruiken deze alleen voor het verwerken van je aanvraag.
        </p>
      </div>
    </form>
  );
};

export default IntakeForm;
