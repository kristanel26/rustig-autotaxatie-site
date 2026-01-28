import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { CheckCircle } from "lucide-react";

interface IntakeFormProps {
  serviceType: string;
  onSuccess?: () => void;
}

const IntakeForm = ({ serviceType, onSuccess }: IntakeFormProps) => {
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [formData, setFormData] = useState({
    naam: "",
    email: "",
    telefoon: "",
    kenteken: "",
    bericht: "",
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // In a real app, this would send to a backend
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

  if (isSubmitted) {
    return (
      <div className="card-elevated p-8 md:p-12 text-center animate-fade-in">
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
    <form onSubmit={handleSubmit} className="card-elevated p-8 md:p-12 animate-slide-up">
      <div className="mb-8">
        <h3 className="text-2xl font-semibold mb-2">Vraag een {serviceType} aan</h3>
        <p className="text-muted-foreground">
          Vul onderstaand formulier in en we nemen binnen één werkdag contact met je op.
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
              className="h-12"
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
              className="h-12"
            />
          </div>
        </div>

        <div className="grid md:grid-cols-2 gap-6">
          <div className="space-y-2">
            <Label htmlFor="email">E-mailadres</Label>
            <Input
              id="email"
              name="email"
              type="email"
              placeholder="je@email.nl"
              value={formData.email}
              onChange={handleChange}
              required
              className="h-12"
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="kenteken">Kenteken (optioneel)</Label>
            <Input
              id="kenteken"
              name="kenteken"
              placeholder="AB-123-CD"
              value={formData.kenteken}
              onChange={handleChange}
              className="h-12"
            />
          </div>
        </div>

        <div className="space-y-2">
          <Label htmlFor="bericht">Toelichting</Label>
          <Textarea
            id="bericht"
            name="bericht"
            placeholder="Vertel kort over je situatie en wat je nodig hebt..."
            value={formData.bericht}
            onChange={handleChange}
            rows={4}
            className="resize-none"
          />
        </div>

        <Button type="submit" variant="cta" size="xl" className="w-full">
          Verstuur aanvraag
        </Button>

        <p className="text-sm text-muted-foreground text-center">
          We gaan zorgvuldig om met je gegevens en gebruiken deze alleen voor het verwerken van je aanvraag.
        </p>
      </div>
    </form>
  );
};

export default IntakeForm;
