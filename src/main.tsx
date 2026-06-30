import { Suspense, lazy } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";

// Auto-recover from stale dynamic chunk references after a new deploy.
// When the browser holds an old index.html that references chunk filenames
// which no longer exist, dynamic imports throw. Reload once to fetch fresh assets.
const RELOAD_FLAG = "__chunk_reload__";
const isChunkLoadError = (reason: unknown) => {
  const msg = reason instanceof Error ? reason.message : String(reason ?? "");
  return /dynamically imported module|Failed to fetch dynamically imported module|Importing a module script failed|ChunkLoadError/i.test(msg);
};
const tryReloadOnce = () => {
  if (typeof window === "undefined") return;
  if (sessionStorage.getItem(RELOAD_FLAG)) return;
  sessionStorage.setItem(RELOAD_FLAG, "1");
  window.location.reload();
};
if (typeof window !== "undefined") {
  window.addEventListener("error", (e) => {
    if (isChunkLoadError(e.error ?? e.message)) tryReloadOnce();
  });
  window.addEventListener("unhandledrejection", (e) => {
    if (isChunkLoadError(e.reason)) tryReloadOnce();
  });
  // Clear the flag after a successful load so future genuine errors can still trigger one reload.
  window.addEventListener("load", () => {
    setTimeout(() => sessionStorage.removeItem(RELOAD_FLAG), 2000);
  });
}

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
