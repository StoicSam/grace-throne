import { useMemo } from "react";

/** Floating dust motes in the heavenly light beam. Pure CSS, no JS frame loop. */
export function Dust({ count = 28 }: { count?: number }) {
  const particles = useMemo(
    () =>
      Array.from({ length: count }, (_, i) => ({
        left: Math.random() * 100,
        bottom: Math.random() * 60,
        size: 1 + Math.random() * 2.5,
        delay: Math.random() * 9,
        duration: 7 + Math.random() * 6,
        opacity: 0.4 + Math.random() * 0.5,
      })),
    [count],
  );
  return (
    <div aria-hidden className="pointer-events-none absolute inset-0 overflow-hidden">
      {particles.map((p, i) => (
        <span
          key={i}
          className="dust-particle absolute rounded-full bg-[color:var(--gold-soft)]"
          style={{
            left: `${p.left}%`,
            bottom: `${p.bottom}%`,
            width: p.size,
            height: p.size,
            opacity: p.opacity,
            animationDelay: `-${p.delay}s`,
            animationDuration: `${p.duration}s`,
            filter: "blur(0.4px)",
          }}
        />
      ))}
    </div>
  );
}