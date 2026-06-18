// Local-only prototype store for Anonymous Confessions.
// NOTE: This is a UI-flow validation prototype. Data lives in the visitor's
// browser via localStorage — it is NOT shared across devices and is NOT
// pastorally reviewed. Replace with Lovable Cloud once credits are restored.

export type ConfessionStatus =
  | "submitted"
  | "received"
  | "in_prayer"
  | "responded"
  | "closed";

export interface PastoralResponse {
  id: string;
  author: string; // e.g. "Pastor (demo)"
  message: string;
  createdAt: string;
}

export interface Confession {
  token: string;
  body: string;
  category: string;
  createdAt: string;
  status: ConfessionStatus;
  responses: PastoralResponse[];
}

const STORAGE_KEY = "throne-room:confessions:v1";

const isBrowser = () => typeof window !== "undefined";

function readAll(): Record<string, Confession> {
  if (!isBrowser()) return {};
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    if (!raw) return {};
    return JSON.parse(raw) as Record<string, Confession>;
  } catch {
    return {};
  }
}

function writeAll(map: Record<string, Confession>) {
  if (!isBrowser()) return;
  window.localStorage.setItem(STORAGE_KEY, JSON.stringify(map));
}

function randomSegment(length = 4): string {
  // Cryptographically strong, unambiguous alphabet (no 0/O/1/I).
  const alphabet = "ABCDEFGHJKLMNPQRSTUVWXYZ23456789";
  const out: string[] = [];
  const buf = new Uint32Array(length);
  if (isBrowser() && window.crypto?.getRandomValues) {
    window.crypto.getRandomValues(buf);
  } else {
    for (let i = 0; i < length; i++) buf[i] = Math.floor(Math.random() * 0xffffffff);
  }
  for (let i = 0; i < length; i++) {
    out.push(alphabet[buf[i] % alphabet.length]);
  }
  return out.join("");
}

export function generateToken(): string {
  return `THRONE-${randomSegment()}-${randomSegment()}-${randomSegment()}`;
}

export function normalizeToken(input: string): string {
  return input.trim().toUpperCase().replace(/\s+/g, "");
}

export function createConfession(input: {
  body: string;
  category: string;
}): Confession {
  const all = readAll();
  let token = generateToken();
  // Ensure no collision (extremely unlikely, but cheap to check).
  while (all[token]) token = generateToken();

  const confession: Confession = {
    token,
    body: input.body.trim(),
    category: input.category,
    createdAt: new Date().toISOString(),
    status: "submitted",
    responses: [],
  };
  all[token] = confession;
  writeAll(all);
  return confession;
}

export function getConfession(token: string): Confession | null {
  const all = readAll();
  return all[normalizeToken(token)] ?? null;
}

export function listLocalTokens(): string[] {
  return Object.keys(readAll()).sort();
}

export function statusLabel(status: ConfessionStatus): string {
  switch (status) {
    case "submitted":
      return "Laid at the altar";
    case "received":
      return "Received by a shepherd";
    case "in_prayer":
      return "Held in prayer";
    case "responded":
      return "Response written";
    case "closed":
      return "Sealed";
  }
}

export const CONFESSION_CATEGORIES: { value: string; label: string }[] = [
  { value: "sin_struggle", label: "A sin or recurring struggle" },
  { value: "relationship", label: "A relationship wound" },
  { value: "doubt", label: "Doubt or wrestling with faith" },
  { value: "grief", label: "Grief or loss" },
  { value: "addiction", label: "Addiction or compulsion" },
  { value: "other", label: "Something else" },
];
