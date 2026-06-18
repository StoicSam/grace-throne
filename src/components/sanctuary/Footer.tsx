export function Footer() {
  return (
    <footer className="relative border-t border-gold/15 bg-[oklch(0.10_0.008_260)] pb-20 pt-16">
      <div className="mx-auto grid max-w-7xl gap-10 px-6 md:grid-cols-3">
        <div>
          <p className="font-serif text-2xl text-ivory">The Throne Room</p>
          <p className="mt-3 max-w-sm text-sm text-muted-foreground">
            A confidential digital sanctuary. Every word offered here is held in
            confidence and shepherded by ordained pastoral care.
          </p>
        </div>
        <div className="text-sm">
          <p className="mb-3 text-xs uppercase tracking-[0.28em] text-gold/80">The Sanctuary</p>
          <ul className="space-y-2 text-muted-foreground">
            <li>Confession</li>
            <li>Prayer Requests</li>
            <li>Pastoral Counseling</li>
            <li>Testimony</li>
          </ul>
        </div>
        <div className="text-sm">
          <p className="mb-3 text-xs uppercase tracking-[0.28em] text-gold/80">Our Covenant</p>
          <ul className="space-y-2 text-muted-foreground">
            <li>Confidentiality &amp; Privacy</li>
            <li>Safeguarding Policy</li>
            <li>Pastoral Oversight</li>
            <li>Terms of Sanctuary</li>
          </ul>
        </div>
      </div>
      <p className="mx-auto mt-12 max-w-7xl px-6 text-xs text-muted-foreground/70">
        &copy; {new Date().getFullYear()} The Throne Room. &ldquo;Let us then approach the throne of grace with confidence.&rdquo; — Hebrews 4:16
      </p>
    </footer>
  );
}