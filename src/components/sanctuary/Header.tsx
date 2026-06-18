import { Crown } from "lucide-react";
import { Link } from "@tanstack/react-router";

export function Header() {
  return (
    <header className="absolute inset-x-0 top-0 z-30">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-5">
        <Link to="/" className="group flex items-center gap-3" aria-label="The Throne Room — Home">
          <span className="relative grid h-9 w-9 place-items-center rounded-full border border-gold/40 bg-card/40 shadow-engraved">
            <Crown className="h-4 w-4 text-gold candle-flicker" aria-hidden />
          </span>
          <span className="flex flex-col leading-none">
            <span className="font-serif text-lg tracking-wide text-ivory">The Throne Room</span>
            <span className="text-[10px] uppercase tracking-[0.28em] text-muted-foreground">
              Sanctuary &middot; Grace &middot; Restoration
            </span>
          </span>
        </Link>
        <nav aria-label="Primary" className="hidden items-center gap-8 text-sm text-muted-foreground md:flex">
          <a href="#sanctuary" className="hover:text-gold">Sanctuary</a>
          <a href="#chambers" className="hover:text-gold">Chambers</a>
          <a href="#covenant" className="hover:text-gold">Our Covenant</a>
        </nav>
        <Link
          to="/confession"
          className="inline-flex min-h-11 items-center justify-center rounded-md border border-gold/50 bg-gradient-to-b from-[oklch(0.78_0.135_86/0.18)] to-[oklch(0.48_0.08_60/0.10)] px-4 text-sm font-medium text-gold transition hover:from-[oklch(0.78_0.135_86/0.28)] hover:to-[oklch(0.48_0.08_60/0.18)]"
        >
          Enter the Sanctuary
        </Link>
      </div>
    </header>
  );
}