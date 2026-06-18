import { createFileRoute, Link, useNavigate, useRouter } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { Copy, KeyRound, Lock, ScrollText, ShieldCheck } from "lucide-react";
import { Header } from "@/components/sanctuary/Header";
import { Footer } from "@/components/sanctuary/Footer";
import { Dust } from "@/components/sanctuary/Dust";
import { CrisisBar } from "@/components/sanctuary/CrisisBar";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import {
  CONFESSION_CATEGORIES,
  createConfession,
  normalizeToken,
} from "@/lib/confession-store";

export const Route = createFileRoute("/confession")({
  head: () => ({
    meta: [
      { title: "Anonymous Confession — The Throne Room" },
      {
        name: "description",
        content:
          "Lay it down at the altar. Submit an anonymous confession and receive a private tracking token to follow its journey.",
      },
      { name: "robots", content: "noindex" },
    ],
  }),
  component: ConfessionPage,
});

function ConfessionPage() {
  const router = useRouter();
  const navigate = useNavigate();
  const [hydrated, setHydrated] = useState(false);
  const [category, setCategory] = useState(CONFESSION_CATEGORIES[0].value);
  const [body, setBody] = useState("");
  const [acknowledged, setAcknowledged] = useState(false);
  const [lookup, setLookup] = useState("");
  const [lookupError, setLookupError] = useState<string | null>(null);
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => setHydrated(true), []);

  const charCount = body.trim().length;
  const canSubmit = hydrated && acknowledged && charCount >= 20 && !submitting;

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!canSubmit) return;
    setSubmitting(true);
    const confession = createConfession({ body, category });
    void router.invalidate();
    navigate({ to: "/confession/$token", params: { token: confession.token } });
  }

  function handleLookup(e: React.FormEvent) {
    e.preventDefault();
    const token = normalizeToken(lookup);
    if (!/^THRONE-[A-Z0-9]{4}-[A-Z0-9]{4}-[A-Z0-9]{4}$/.test(token)) {
      setLookupError("That doesn't look like a Throne Room token.");
      return;
    }
    setLookupError(null);
    navigate({ to: "/confession/$token", params: { token } });
  }

  return (
    <div className="relative min-h-screen overflow-hidden bg-background">
      <Dust />
      <Header />
      <main className="relative z-10 mx-auto max-w-3xl px-6 pt-32 pb-40">
        <p className="mb-3 text-xs uppercase tracking-[0.32em] text-gold/80">
          The Altar &middot; Anonymous Confession
        </p>
        <h1 className="font-serif text-4xl leading-tight text-ivory sm:text-5xl">
          Lay it down. No name. No record on your soul.
        </h1>
        <p className="mt-4 max-w-2xl text-base text-muted-foreground">
          What you write here is held in confidence. You will receive a private
          tracking token — keep it safe. It is the only way to return and read a
          pastoral response.
        </p>

        <div
          role="note"
          className="mt-6 flex items-start gap-3 rounded-md border border-gold/30 bg-card/40 p-4 text-sm text-ivory/90"
        >
          <ShieldCheck className="mt-0.5 h-4 w-4 shrink-0 text-gold" aria-hidden />
          <p>
            <span className="font-medium text-gold">Prototype notice.</span>{" "}
            This sanctuary is currently in <em>local-only</em> mode. Your
            confession is stored privately in this browser's memory and is{" "}
            <strong>not</strong> transmitted or reviewed by a real pastor yet.
            The full pastoral loop activates when Lovable Cloud is enabled.
          </p>
        </div>

        <form onSubmit={handleSubmit} className="mt-10 space-y-8">
          <fieldset className="space-y-3">
            <legend className="font-serif text-xl text-ivory">
              What weighs on you?
            </legend>
            <div
              role="radiogroup"
              aria-label="Category"
              className="flex flex-wrap gap-2"
            >
              {CONFESSION_CATEGORIES.map((c) => {
                const active = category === c.value;
                return (
                  <button
                    key={c.value}
                    type="button"
                    role="radio"
                    aria-checked={active}
                    onClick={() => setCategory(c.value)}
                    className={`min-h-11 rounded-full border px-4 text-sm transition ${
                      active
                        ? "border-gold/70 bg-gold/15 text-gold"
                        : "border-border/60 bg-card/40 text-muted-foreground hover:border-gold/40 hover:text-ivory"
                    }`}
                  >
                    {c.label}
                  </button>
                );
              })}
            </div>
          </fieldset>

          <div className="space-y-2">
            <Label htmlFor="confession-body" className="font-serif text-xl text-ivory">
              Speak freely
            </Label>
            <Textarea
              id="confession-body"
              value={body}
              onChange={(e) => setBody(e.target.value)}
              required
              minLength={20}
              maxLength={6000}
              rows={10}
              placeholder="There is nothing too dark for grace. Write what you cannot say aloud…"
              className="min-h-[14rem] resize-y border-border/60 bg-card/40 text-base text-ivory placeholder:text-muted-foreground/70 focus-visible:ring-gold/40"
            />
            <div className="flex items-center justify-between text-xs text-muted-foreground">
              <span className="inline-flex items-center gap-1.5">
                <Lock className="h-3 w-3 text-gold/70" aria-hidden /> Stored only in this browser
              </span>
              <span aria-live="polite">{charCount} / 6000</span>
            </div>
          </div>

          <label className="flex cursor-pointer items-start gap-3 rounded-md border border-border/60 bg-card/30 p-4 text-sm text-ivory/90">
            <input
              type="checkbox"
              checked={acknowledged}
              onChange={(e) => setAcknowledged(e.target.checked)}
              className="mt-1 h-4 w-4 accent-[oklch(0.78_0.135_86)]"
            />
            <span>
              I understand my tracking token is the <strong>only</strong> way to
              return to this confession. If I lose it, it cannot be recovered.
            </span>
          </label>

          <div className="flex flex-wrap items-center gap-4">
            <Button
              type="submit"
              disabled={!canSubmit}
              className="min-h-11 rounded-md border border-gold/60 bg-gold/15 px-6 font-medium text-gold hover:bg-gold/25"
            >
              <ScrollText className="mr-2 h-4 w-4" aria-hidden />
              Lay it at the altar
            </Button>
            <Link
              to="/"
              className="text-sm text-muted-foreground underline-offset-4 hover:text-gold hover:underline"
            >
              Return to the sanctuary
            </Link>
          </div>
        </form>

        <section
          aria-labelledby="lookup-heading"
          className="mt-20 rounded-lg border border-border/60 bg-card/30 p-6"
        >
          <h2 id="lookup-heading" className="font-serif text-2xl text-ivory">
            Return to a confession
          </h2>
          <p className="mt-1 text-sm text-muted-foreground">
            Enter your tracking token to see its status and any pastoral response.
          </p>
          <form onSubmit={handleLookup} className="mt-4 flex flex-col gap-3 sm:flex-row">
            <div className="relative flex-1">
              <KeyRound
                className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gold/70"
                aria-hidden
              />
              <Input
                value={lookup}
                onChange={(e) => setLookup(e.target.value)}
                placeholder="THRONE-XXXX-XXXX-XXXX"
                aria-label="Tracking token"
                className="h-11 border-border/60 bg-background/60 pl-9 font-mono uppercase tracking-wider text-ivory"
              />
            </div>
            <Button
              type="submit"
              className="h-11 rounded-md border border-gold/50 bg-transparent px-5 text-gold hover:bg-gold/10"
            >
              Open
            </Button>
          </form>
          {lookupError && (
            <p role="alert" className="mt-2 text-sm text-destructive">
              {lookupError}
            </p>
          )}
        </section>
      </main>
      <Footer />
      <CrisisBar />
    </div>
  );
}

// Keep Copy in the import graph for the success page sibling — avoids tree-shake warnings.
void Copy;
