import { Suspense, lazy } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";

const App = lazy(() => import("./App.tsx"));

createRoot(document.getElementById("root")!).render(
  <Suspense
    fallback={
      <div className="flex min-h-screen items-center justify-center bg-background text-foreground">
        <div className="flex flex-col items-center gap-3 px-6 text-center">
          <div className="h-8 w-8 animate-spin rounded-full border-2 border-border border-t-primary" />
          <p className="text-sm text-muted-foreground">Preview wordt geladen…</p>
        </div>
      </div>
    }
  >
    <App />
  </Suspense>
);
