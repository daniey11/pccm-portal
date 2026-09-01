import type { Domain } from "../types";
import { allLessons } from "../data/lessons";
import { modules } from "../data/modules";
import { references } from "../data/references";
import { quiz } from "../data/quiz";
import { flashcards } from "../data/flashcards";
import { cases } from "../data/cases";

// ---------------------------------------------------------------------------
// A small client-side search index. Everything a learner might search for
// (lessons, topics, references, questions, flashcards, cases) is flattened into
// weighted documents. This is deliberately simple and synchronous: the content
// set is bounded, so a scored substring/token match is fast and predictable.
// ---------------------------------------------------------------------------

export type SearchKind =
  | "lesson"
  | "topic"
  | "reference"
  | "question"
  | "flashcard"
  | "case";

export interface SearchDoc {
  id: string;
  kind: SearchKind;
  title: string;
  subtitle?: string;
  domain?: Domain;
  /** Where the app should navigate on select. */
  route: string;
  /** Lowercased searchable text with weighted repetition of the title. */
  haystack: string;
}

function norm(s: string): string {
  return s.toLowerCase().replace(/\s+/g, " ").trim();
}

const docs: SearchDoc[] = [];

// Lessons (highest-value target)
for (const l of allLessons) {
  const blockText = l.blocks
    .map((b) => [b.heading, b.body, ...(b.items ?? []), b.trial?.name, b.trial?.takeaway, b.guideline?.summary].filter(Boolean).join(" "))
    .join(" ");
  docs.push({
    id: l.id,
    kind: "lesson",
    title: l.title,
    subtitle: l.summary,
    domain: l.domain,
    route: `#/lesson/${l.id}`,
    haystack: norm(
      // weight the title and keywords by repeating them
      [l.title, l.title, l.summary, (l.keywords ?? []).join(" "), (l.keywords ?? []).join(" "), l.objectives.join(" "), blockText].join(" ")
    ),
  });
}

// Topics (including planned scaffolds, so search reflects the whole map)
for (const m of modules) {
  for (const t of m.topics) {
    docs.push({
      id: t.id,
      kind: "topic",
      title: t.title,
      subtitle: `${m.title} · ${t.status === "seeded" ? "content available" : "planned"}`,
      domain: m.domain,
      route: `#/module/${m.id}`,
      haystack: norm([t.title, t.title, t.blurb, m.title].join(" ")),
    });
  }
}

// References
for (const r of references) {
  docs.push({
    id: r.id,
    kind: "reference",
    title: r.label,
    subtitle: [r.society, r.year].filter(Boolean).join(" · "),
    route: `#/references`,
    haystack: norm([r.label, r.label, r.society ?? "", r.citation].join(" ")),
  });
}

// Quiz questions
for (const q of quiz) {
  docs.push({
    id: q.id,
    kind: "question",
    title: q.stem,
    subtitle: "Practice question",
    domain: q.domain,
    route: `#/quiz`,
    haystack: norm([q.stem, q.explanation, ...q.options].join(" ")),
  });
}

// Flashcards
for (const f of flashcards) {
  docs.push({
    id: f.id,
    kind: "flashcard",
    title: f.front,
    subtitle: `Flashcard · ${f.topic}`,
    domain: f.domain,
    route: `#/flashcards`,
    haystack: norm([f.front, f.front, f.back, f.topic].join(" ")),
  });
}

// Cases
for (const c of cases) {
  docs.push({
    id: c.id,
    kind: "case",
    title: c.title,
    subtitle: "Clinical case",
    domain: c.domain,
    route: `#/cases`,
    haystack: norm([c.title, c.title, c.presentation, c.keyPoints.join(" ")].join(" ")),
  });
}

export interface SearchResult extends SearchDoc {
  score: number;
}

export function search(query: string, limit = 40): SearchResult[] {
  const q = norm(query);
  if (!q) return [];
  const terms = q.split(" ").filter(Boolean);

  const scored: SearchResult[] = [];
  for (const doc of docs) {
    let score = 0;
    // whole-phrase match is worth the most
    if (doc.haystack.includes(q)) score += 12;
    for (const term of terms) {
      if (!term) continue;
      // count occurrences (cheap, bounded content)
      let idx = doc.haystack.indexOf(term);
      let hits = 0;
      while (idx !== -1 && hits < 6) {
        score += 2;
        // word-boundary bonus
        const before = idx === 0 ? " " : doc.haystack[idx - 1];
        if (before === " ") score += 1;
        idx = doc.haystack.indexOf(term, idx + term.length);
        hits++;
      }
    }
    if (score > 0) scored.push({ ...doc, score });
  }

  return scored.sort((a, b) => b.score - a.score).slice(0, limit);
}

export function groupResults(results: SearchResult[]): Record<SearchKind, SearchResult[]> {
  const groups = {
    lesson: [],
    topic: [],
    question: [],
    flashcard: [],
    case: [],
    reference: [],
  } as Record<SearchKind, SearchResult[]>;
  for (const r of results) groups[r.kind].push(r);
  return groups;
}
