import { createFileRoute } from "@tanstack/react-router";
import { Link } from "@tanstack/react-router";
import {
  BookOpenText,
  Flame,
  HandHeart,
  KeyRound,
  Lock,
  MessagesSquare,
  ScrollText,
  ShieldCheck,
  Sparkles,
  UsersRound,
} from "lucide-react";
import heroImage from "@/assets/sanctuary-hero.jpg";
import { Header } from "@/components/sanctuary/Header";
import { Footer } from "@/components/sanctuary/Footer";
import { Dust } from "@/components/sanctuary/Dust";
import { CrisisBar } from "@/components/sanctuary/CrisisBar";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "The Throne Room — A Sacred Sanctuary for Confession, Prayer & Restoration" },
      {
        name: "description",
        content:
          "A confidential digital sanctuary where you can confess, request prayer, seek pastoral counsel, share testimony, and walk in supervised restoration.",
      },
      { property: "og:title", content: "The Throne Room" },
      {
        property: "og:description",
        content: "Enter holy ground. A confidential sanctuary for confession, prayer and pastoral care.",
      },
    ],
  }),
  component: Sanctuary,
});

const chambers = [
  {
    icon: ScrollText,
    name: "The Confession",
    verse: "1 John 1:9",
    body:
      "Lay it down in confidence. Submit anonymously and receive a sealed token to follow your pastoral response — no account required.",
  },
  {
    icon: HandHeart,
    name: "The Prayer Altar",
    verse: "James 5:16",
    body:
      "Bring petitions for health, family, finances, or your walk. Each request is received by a prayer team and shepherded to resolution.",
  },
  {
    icon: MessagesSquare,
    name: "The Counsel",
    verse: "Proverbs 11:14",
    body:
      "Request marriage, family, grief, addiction or spiritual counseling. A pastor will be assigned and a meeting scheduled.",
  },
  {
    icon: BookOpenText,
    name: "The Testimony",
    verse: "Revelation 12:11",
    body:
      "Share the story of your restoration. Every testimony is reviewed by pastoral leadership before it is offered as a light to others.",
  },
  {
    icon: UsersRound,
    name: "Restoration Chambers",
    verse: "Galatians 6:1",
    body:
      "Pastor-led support communities for healing, recovery, marriage and faithfulness. Every chamber is shepherded — never unsupervised.",
  },
  {
    icon: Flame,
    name: "Prayer Partners",
    verse: "Matthew 18:20",
    body:
      "Anonymous one-to-one prayer matching. Pastor-supervised, confidential, and built on mutual covenant.",
  },
];

const covenants = [
  {
    icon: Lock,
    title: "Sealed in Confidence",
    body:
      "Submissions are encrypted at rest and never shared beyond ordained pastoral oversight. Confession content is never included in notifications or exports.",
  },
  {
    icon: KeyRound,
    title: "Anonymous by Design",
    body:
      "You may walk in without name or email. A secure tracking token — like THRONE-7A2K-L91D-Q5P8 — lets you follow your pastoral response in private.",
  },
  {
    icon: ShieldCheck,
    title: "Shepherded, Not Automated",
    body:
      "Every peer message and chamber is supervised by a pastor. There are no unmoderated rooms and no anonymous public forums.",
  },
];

function Sanctuary() {
  return (
    <main id="main" className="relative">
      {/* HERO — the throne room itself */}
      <section
        id="sanctuary"
        className="relative isolate flex min-h-dvh items-center overflow-hidden"
        aria-label="The Throne Room sanctuary entrance"
      >
        {/* Background painting */}
        <img
          src={heroImage}
          alt=""
          aria-hidden
          width={1920}
          height={1280}
          className="absolute inset-0 -z-20 h-full w-full object-cover opacity-70"
        />
        {/* Veils & vignettes */}
        <div
          aria-hidden
          className="absolute inset-0 -z-10"
          style={{
            background:
              "radial-gradient(ellipse 60% 50% at 50% 35%, transparent 0%, oklch(0.09 0.008 260 / 0.65) 60%, oklch(0.07 0.005 260) 100%)",
          }}
        />
        <div
          aria-hidden
          className="heavenly-glow absolute left-1/2 top-0 -z-10 h-full w-[60vw] -translate-x-1/2"
          style={{
            background:
              "radial-gradient(ellipse 30% 70% at 50% 0%, oklch(0.78 0.135 86 / 0.30), transparent 60%)",
          }}
        />
        <Dust count={36} />
        <Header />

        <div className="mx-auto w-full max-w-5xl px-6 pb-24 pt-40 text-center">
          <p className="mb-6 inline-flex items-center gap-2 rounded-full border border-gold/30 bg-card/40 px-4 py-1.5 text-[11px] uppercase tracking-[0.32em] text-gold/90 shadow-engraved">
            <Sparkles className="h-3 w-3" aria-hidden /> Enter Holy Ground
          </p>
          <h1 className="font-serif text-5xl leading-[1.05] tracking-tight text-ivory sm:text-7xl md:text-[5.5rem]">
            Approach the
            <span className="block bg-gradient-to-b from-[oklch(0.92_0.10_88)] via-[oklch(0.78_0.135_86)] to-[oklch(0.52_0.10_60)] bg-clip-text italic text-transparent">
              Throne of Grace.
            </span>
          </h1>
          <p className="mx-auto mt-8 max-w-2xl text-base leading-relaxed text-muted-foreground sm:text-lg">
            A confidential digital sanctuary for confession, prayer, pastoral counsel and
            quiet restoration. Come as you are — heard, held, and shepherded by ordained
            pastoral care.
          </p>
          <div id="enter" className="mt-10 flex flex-col items-center justify-center gap-3 sm:flex-row sm:gap-4">
            <Link
              to="/confession"
              className="group inline-flex min-h-12 items-center justify-center gap-2 rounded-md border border-gold/60 bg-gradient-to-b from-[oklch(0.78_0.135_86/0.25)] to-[oklch(0.48_0.08_60/0.15)] px-7 text-sm font-medium tracking-wide text-ivory shadow-relic transition hover:from-[oklch(0.78_0.135_86/0.40)]"
            >
              <Flame className="h-4 w-4 text-gold candle-flicker" aria-hidden />
              Lay it down at the Altar
            </Link>
            <a
              href="#covenant"
              className="inline-flex min-h-12 items-center justify-center rounded-md px-5 text-sm text-muted-foreground underline-offset-4 hover:text-gold hover:underline"
            >
              Read our Covenant of Confidence
            </a>
          </div>
          <p className="mx-auto mt-12 max-w-md font-serif text-sm italic text-muted-foreground/80">
            &ldquo;Let us then approach the throne of grace with confidence, so that we may
            receive mercy and find grace to help us in our time of need.&rdquo;
            <span className="mt-1 block text-[11px] not-italic uppercase tracking-[0.3em] text-gold/70">
              Hebrews 4:16
            </span>
          </p>
        </div>
      </section>

      {/* CHAMBERS */}
      <section id="chambers" className="relative bg-altar py-28">
        <div className="mx-auto max-w-7xl px-6">
          <div className="mx-auto max-w-2xl text-center">
            <p className="text-xs uppercase tracking-[0.32em] text-gold/80">The Sanctuary</p>
            <h2 className="mt-4 font-serif text-4xl text-ivory sm:text-5xl">
              Six chambers. One quiet sanctuary.
            </h2>
            <p className="mt-5 text-muted-foreground">
              Every chamber is shepherded by ordained pastoral leadership. Enter the one that
              meets you where you are tonight.
            </p>
          </div>

          <ul className="mt-16 grid gap-px overflow-hidden rounded-xl border border-gold/20 bg-gold/10 sm:grid-cols-2 lg:grid-cols-3">
            {chambers.map(({ icon: Icon, name, verse, body }) => (
              <li
                key={name}
                className="group relative bg-card/85 p-8 transition hover:bg-card"
              >
                <div className="flex items-start justify-between">
                  <span className="grid h-11 w-11 place-items-center rounded-md border border-gold/40 bg-background/60 text-gold shadow-engraved">
                    <Icon className="h-5 w-5" aria-hidden />
                  </span>
                  <span className="text-[10px] uppercase tracking-[0.28em] text-gold/70">
                    {verse}
                  </span>
                </div>
                <h3 className="mt-6 font-serif text-2xl text-ivory">{name}</h3>
                <p className="mt-3 text-sm leading-relaxed text-muted-foreground">{body}</p>
                <span
                  aria-hidden
                  className="pointer-events-none absolute inset-x-8 bottom-0 h-px bg-gradient-to-r from-transparent via-gold/40 to-transparent opacity-0 transition group-hover:opacity-100"
                />
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* COVENANT */}
      <section id="covenant" className="relative overflow-hidden py-28">
        <div
          aria-hidden
          className="absolute inset-0 -z-10"
          style={{
            background:
              "radial-gradient(ellipse 40% 60% at 50% 50%, oklch(0.78 0.135 86 / 0.06), transparent 70%)",
          }}
        />
        <div className="mx-auto max-w-6xl px-6">
          <div className="grid items-start gap-16 lg:grid-cols-[1fr_2fr]">
            <div>
              <p className="text-xs uppercase tracking-[0.32em] text-gold/80">Our Covenant</p>
              <h2 className="mt-4 font-serif text-4xl text-ivory sm:text-5xl">
                Held in confidence. Shepherded in love.
              </h2>
              <p className="mt-6 text-muted-foreground">
                The Throne Room is not a forum, not a social network, and not therapy. It is
                a ministry sanctuary built on three quiet promises.
              </p>
            </div>
            <ul className="grid gap-6 sm:grid-cols-1">
              {covenants.map(({ icon: Icon, title, body }) => (
                <li
                  key={title}
                  className="relative rounded-lg border border-gold/20 bg-card/70 p-6 shadow-engraved"
                >
                  <div className="flex items-start gap-4">
                    <span className="mt-1 grid h-10 w-10 shrink-0 place-items-center rounded-md border border-gold/40 bg-background/50 text-gold">
                      <Icon className="h-4 w-4" aria-hidden />
                    </span>
                    <div>
                      <h3 className="font-serif text-xl text-ivory">{title}</h3>
                      <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{body}</p>
                    </div>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      {/* INVITATION */}
      <section className="relative overflow-hidden bg-[oklch(0.09_0.008_260)] py-28">
        <div
          aria-hidden
          className="heavenly-glow absolute left-1/2 top-0 h-full w-[40vw] -translate-x-1/2"
          style={{
            background:
              "radial-gradient(ellipse 50% 60% at 50% 0%, oklch(0.78 0.135 86 / 0.18), transparent 70%)",
          }}
        />
        <div className="relative mx-auto max-w-3xl px-6 text-center">
          <h2 className="font-serif text-4xl text-ivory sm:text-5xl">
            You don&rsquo;t have to carry it another night.
          </h2>
          <p className="mx-auto mt-6 max-w-xl text-muted-foreground">
            Whether you arrive in confession, in petition, or simply weary — there is a chair
            waiting for you here, and a shepherd ready to hear.
          </p>
          <Link
            to="/confession"
            className="mt-10 inline-flex min-h-12 items-center justify-center gap-2 rounded-md border border-gold/60 bg-gradient-to-b from-[oklch(0.78_0.135_86/0.3)] to-[oklch(0.48_0.08_60/0.15)] px-8 text-sm font-medium tracking-wide text-ivory shadow-relic transition hover:from-[oklch(0.78_0.135_86/0.45)]"
          >
            <Flame className="h-4 w-4 text-gold candle-flicker" aria-hidden />
            Enter the Sanctuary
          </Link>
        </div>
      </section>

      <Footer />
      <CrisisBar />
    </main>
  );
}
