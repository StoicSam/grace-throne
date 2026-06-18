import { LifeBuoy, Phone } from "lucide-react";

/**
 * Always-visible crisis resources. Sticky to the bottom of the viewport.
 * Phase 1: no automated detection — surface help unconditionally so anyone
 * in immediate distress can reach a real person fast.
 */
export function CrisisBar() {
  return (
    <div
      role="region"
      aria-label="Crisis support resources"
      className="fixed inset-x-0 bottom-0 z-50 border-t border-gold/30 bg-background/85 backdrop-blur supports-[backdrop-filter]:bg-background/70"
    >
      <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-2 px-4 py-2.5 text-xs text-ivory sm:flex-row sm:text-sm">
        <p className="flex items-center gap-2">
          <LifeBuoy className="h-4 w-4 text-gold" aria-hidden />
          <span>
            <span className="font-medium text-ivory">In immediate danger or crisis?</span>{" "}
            <span className="text-muted-foreground">You are not alone. Please reach out now.</span>
          </span>
        </p>
        <div className="flex flex-wrap items-center justify-center gap-x-4 gap-y-1">
          <a
            href="tel:988"
            className="inline-flex min-h-11 items-center gap-1.5 rounded-md px-2 font-medium text-gold underline-offset-4 hover:underline"
          >
            <Phone className="h-3.5 w-3.5" aria-hidden /> 988 — Suicide &amp; Crisis Lifeline (US)
          </a>
          <a
            href="tel:911"
            className="inline-flex min-h-11 items-center gap-1.5 rounded-md px-2 font-medium text-gold underline-offset-4 hover:underline"
          >
            <Phone className="h-3.5 w-3.5" aria-hidden /> 911 — Emergency
          </a>
        </div>
      </div>
    </div>
  );
}