import { Loader2 } from "lucide-react";

const RouteFallback = () => (
  <div
    className="flex min-h-screen items-center justify-center bg-background"
    role="status"
    aria-live="polite"
    aria-label="Pagina laden"
  >
    <div className="flex flex-col items-center gap-3">
      <Loader2
        className="h-8 w-8 animate-spin text-[hsl(var(--cta))]"
        strokeWidth={2.5}
      />
      <p className="text-sm text-muted-foreground">
        Pagina wordt geladen…
      </p>
    </div>
  </div>
);

export default RouteFallback;
