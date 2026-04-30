import { Loader2 } from "lucide-react";

const RouteFallback = () => (
  <div
    className="flex min-h-screen items-center justify-center bg-[#F7F8FA]"
    role="status"
    aria-live="polite"
    aria-label="Pagina laden"
  >
    <div className="flex flex-col items-center gap-3">
      <Loader2
        className="h-8 w-8 animate-spin text-[#FF751F]"
        strokeWidth={2.5}
      />
      <p className="font-['Inter'] text-sm text-[#1D3C71]/70">
        Pagina wordt geladen…
      </p>
    </div>
  </div>
);

export default RouteFallback;
