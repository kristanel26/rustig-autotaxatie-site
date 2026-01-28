import { Shield, Clock, Award, Users } from "lucide-react";

const indicators = [
  {
    icon: Shield,
    title: "Gecertificeerd",
    description: "Erkend door alle grote verzekeraars",
  },
  {
    icon: Clock,
    title: "Zorgvuldige afstemming",
    description: "Duidelijke communicatie over het proces",
  },
  {
    icon: Award,
    title: "15+ jaar ervaring",
    description: "Duizenden taxaties uitgevoerd",
  },
  {
    icon: Users,
    title: "Persoonlijk contact",
    description: "Altijd een vaste contactpersoon",
  },
];

const TrustIndicators = () => {
  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-8">
      {indicators.map((indicator, index) => (
        <div
          key={index}
          className="text-center animate-fade-in"
          style={{ animationDelay: `${index * 100}ms` }}
        >
          <div className="inline-flex items-center justify-center w-12 h-12 rounded-xl bg-accent/10 mb-4">
            <indicator.icon className="w-6 h-6 text-accent" />
          </div>
          <h4 className="font-semibold mb-1">{indicator.title}</h4>
          <p className="text-sm text-muted-foreground">{indicator.description}</p>
        </div>
      ))}
    </div>
  );
};

export default TrustIndicators;
