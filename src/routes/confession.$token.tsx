import { createFileRoute, Link, useRouter } from "@tanstack/react-router";
import { useEffect, useMemo, useState } from "react";
import {
  ArrowLeft,
  CheckCircle2,
  Copy,
  HandHeart,
  MailOpen,
  Sparkles,
} from "lucide-react";
import { Header } from "@/components/sanctuary/Header";
import { Footer } from "@/components/sanctuary/Footer";
import { Dust } from "@/components/sanctuary/Dust";
import { CrisisBar } from "@/components/sanctuary/CrisisBar";
import { Button } from "@/components/ui/button";
import {
  CONFESSION_CATEGORIES,
  type Confession,
  getConfession,
  statusLabel,
} from "@/lib/confession-store";

export const Route = createFileRoute("/confession/$token")({
  head: ({ params }) => ({
    meta: [
      { title: `Confession ${params.token} — The Throne Room` },
      { name: "robots", content: "noindex,nofollow" },
    ],
  }),
  component: ConfessionTokenPage,
});

function ConfessionTokenPage() {
  const { token } = Route.useParams();
  const router = useRouter();
  const [hydrated, setHydrated] = useState(false);
  const [confession, setConfession] = useState<Confession | null>(null);
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    setHydrated(true);
    setConfession(getConfession(token));
  }, [token]);

  // Re-read after router invalidations (e.g., right after submission).
  useEffect(() => {
    if (!hydrated) return;
    setConfession(getConfession(token));
  }, [hydrated, token, router.state.location.href]);

  const categoryLabel = useMemo(() => {
    const cat = CONFESSION_CATEGORIES.find((c) => c.value === confession?.category);
    return cat?.label ?? "—";
  }, [confession?.category]);

  async function copyToken() {
    try {
      await navigator.clipboard.writeText(token);
      setCopied(true);
      setTimeout(() => setCopied(false), 1800);
    } catch {
      /* clipboard unavailable */
    }
  }

  return (
    <div className="relative min-h-screen overflow-hidden bg-background">
      <Dust />
      <Header />
      <main className="relative z-10 mx-auto max-w-3xl px-6 pt-32 pb-40">
        <Link
          to="/confession"
          className="inline-flex items-center gap-1.5 text-sm text-muted-foreground hover:text-gold"
        >
          <ArrowLeft className="h-3.5 w-3.5" aria-hidden />
          Back to the altar
        </Link>

        {!hydrated ? (
          <p className="mt-12 text-muted-foreground">Opening the scroll…</p>
        ) : !confession ? (
          <NotFoundOnDevice token={token} />
        ) : (
          <article className="mt-8">
            <p className="text-xs uppercase tracking-[0.32em] text-gold/80">
              Your tracking token
            </p>
            <div className="mt-2 flex flex-wrap items-center gap-3">
              <code className="rounded-md border border-gold/40 bg-card/60 px-3 py-2 font-mono text-lg tracking-wider text-gold">
                {confession.token}
              </code>
              <Button
                type="button"
                onClick={copyToken}
                variant="ghost"
                className="min-h-11 text-sm text-muted-foreground hover:text-gold"
              >
                {copied ? (
                  <>
                    <CheckCircle2 className="mr-1.5 h-4 w-4" aria-hidden /> Copied
                  </>
                ) : (
                  <>
                    <Copy className="mr-1.5 h-4 w-4" aria-hidden /> Copy
                  </>
                )}
              </Button>
            </div>
            <p className="mt-2 max-w-xl text-sm text-muted-foreground">
              Store this somewhere safe. It is the <em>only</em> key back to
              this confession. We never email it — there is no email on file.
            </p>

            <section
              aria-labelledby="status-heading"
              className="mt-10 rounded-lg border border-border/60 bg-card/40 p-6"
            >
              <div className="flex items-center justify-between gap-4">
                <div>
                  <h2 id="status-heading" className="font-serif text-2xl text-ivory">
                    {statusLabel(confession.status)}
                  </h2>
                  <p className="mt-1 text-sm text-muted-foreground">
                    Category: <span className="text-ivory/90">{categoryLabel}</span>
                    {" · "}Laid down{" "}
                    {new Date(confession.createdAt).toLocaleString()}
                  </p>
                </div>
                <Sparkles className="h-6 w-6 text-gold/70" aria-hidden />
              </div>

              <ol className="mt-6 space-y-3 text-sm">
                {(
                  [
                    "submitted",
                    "received",
                    "in_prayer",
                    "responded",
                    "closed",
                  ] as const
                ).map((stage) => {
                  const reached =
                    stageOrder(confession.status) >= stageOrder(stage);
                  return (
                    <li
                      key={stage}
                      className={`flex items-center gap-3 ${
                        reached ? "text-ivory" : "text-muted-foreground/60"
                      }`}
                    >
                      <span
                        aria-hidden
                        className={`h-2 w-2 rounded-full ${
                          reached ? "bg-gold shadow-[0_0_8px_oklch(0.78_0.135_86)]" : "bg-border"
                        }`}
                      />
                      {statusLabel(stage)}
                    </li>
                  );
                })}
              </ol>
            </section>

            <section aria-labelledby="words-heading" className="mt-10">
              <h2 id="words-heading" className="font-serif text-2xl text-ivory">
                What you laid down
              </h2>
              <blockquote className="mt-3 whitespace-pre-wrap rounded-md border-l-2 border-gold/60 bg-card/30 p-5 font-serif text-lg leading-relaxed text-ivory/95">
                {confession.body}
              </blockquote>
            </section>

            <section aria-labelledby="response-heading" className="mt-10">
              <h2 id="response-heading" className="flex items-center gap-2 font-serif text-2xl text-ivory">
                <MailOpen className="h-5 w-5 text-gold" aria-hidden />
                Pastoral response
              </h2>
              {confession.responses.length === 0 ? (
                <div className="mt-3 rounded-md border border-dashed border-border/60 bg-card/20 p-6 text-sm text-muted-foreground">
                  <p className="flex items-center gap-2 text-ivory/90">
                    <HandHeart className="h-4 w-4 text-gold" aria-hidden />
                    No response yet.
                  </p>
                  <p className="mt-2">
                    In the production sanctuary, a shepherd will read your words
                    and write back here. Check in by re-entering your token any
                    time. This local prototype does not transmit your confession.
                  </p>
                </div>
              ) : (
                <ul className="mt-3 space-y-4">
                  {confession.responses.map((r) => (
                    <li
                      key={r.id}
                      className="rounded-md border border-gold/30 bg-card/40 p-5"
                    >
                      <p className="text-xs uppercase tracking-[0.24em] text-gold/80">
                        {r.author} &middot;{" "}
                        {new Date(r.createdAt).toLocaleString()}
                      </p>
                      <p className="mt-2 whitespace-pre-wrap text-ivory/95">
                        {r.message}
                      </p>
                    </li>
                  ))}
                </ul>
              )}
            </section>
          </article>
        )}
      </main>
      <Footer />
      <CrisisBar />
    </div>
  );
}

function stageOrder(s: Confession["status"]): number {
  return ["submitted", "received", "in_prayer", "responded", "closed"].indexOf(s);
}

function NotFoundOnDevice({ token }: { token: string }) {
  return (
    <div className="mt-12 rounded-lg border border-destructive/40 bg-card/40 p-6">
      <h1 className="font-serif text-3xl text-ivory">No scroll found</h1>
      <p className="mt-3 text-muted-foreground">
        We could not find a confession with token{" "}
        <code className="rounded bg-background/60 px-1.5 py-0.5 font-mono text-gold">
          {token}
        </code>{" "}
        on this device.
      </p>
      <p className="mt-3 text-sm text-muted-foreground">
        This prototype stores confessions in your browser only. If you
        submitted from a different device or cleared your browser data, the
        record cannot be recovered locally. The full Cloud version will let
        you return from anywhere with your token.
      </p>
      <Link
        to="/confession"
        className="mt-6 inline-flex min-h-11 items-center rounded-md border border-gold/50 px-4 text-sm text-gold hover:bg-gold/10"
      >
        Back to the altar
      </Link>
    </div>
  );
}
