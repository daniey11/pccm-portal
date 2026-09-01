import { useEffect, useMemo, useRef, useState } from "react";
import { Search as SearchIcon, FileText, Layers, GraduationCap, BookOpen, Landmark, Boxes } from "lucide-react";
import { search, groupResults, type SearchKind } from "../lib/search";
import { domainMeta } from "../components/ui";

const kindMeta: Record<SearchKind, { label: string; Icon: typeof FileText }> = {
  lesson: { label: "Lessons", Icon: BookOpen },
  topic: { label: "Topics", Icon: Boxes },
  question: { label: "Questions", Icon: GraduationCap },
  flashcard: { label: "Flashcards", Icon: Layers },
  case: { label: "Cases", Icon: FileText },
  reference: { label: "References", Icon: Landmark },
};

const ORDER: SearchKind[] = ["lesson", "topic", "question", "flashcard", "case", "reference"];

export function SearchPage({
  initialQuery,
  onNavigate,
}: {
  initialQuery?: string;
  onNavigate: (route: string) => void;
}) {
  const [q, setQ] = useState(initialQuery ?? "");
  const inputRef = useRef<HTMLInputElement | null>(null);

  useEffect(() => {
    inputRef.current?.focus();
  }, []);

  const results = useMemo(() => (q.trim() ? search(q) : []), [q]);
  const grouped = useMemo(() => groupResults(results), [results]);

  const examples = [
    "ARDS proning",
    "restrictive allograft syndrome",
    "bronchus intermedius",
    "driving pressure",
    "tacrolimus interaction",
  ];

  return (
    <div>
      <div className="mono-label mb-2 text-muted">Knowledge base</div>
      <h1 className="mb-4 font-serif text-3xl font-semibold">Search everything</h1>

      <div className="relative">
        <SearchIcon className="pointer-events-none absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-muted" />
        <input
          ref={inputRef}
          value={q}
          onChange={(e) => setQ(e.target.value)}
          placeholder="Search lessons, questions, references, transplant, bronchoscopy..."
          className="w-full rounded-xl border border-line bg-surface py-3.5 pl-12 pr-4 text-base outline-none focus:border-primary"
        />
      </div>

      {!q.trim() && (
        <div className="mt-4 flex flex-wrap gap-2">
          <span className="text-sm text-muted">Try:</span>
          {examples.map((ex) => (
            <button
              key={ex}
              onClick={() => setQ(ex)}
              className="rounded-full border border-line bg-surface px-3 py-1 text-sm text-muted hover:border-primary hover:text-text"
            >
              {ex}
            </button>
          ))}
        </div>
      )}

      {q.trim() && (
        <p className="mt-4 text-sm text-muted">
          {results.length} result{results.length === 1 ? "" : "s"}
        </p>
      )}

      <div className="mt-4 space-y-6">
        {ORDER.map((kind) => {
          const items = grouped[kind];
          if (!items || items.length === 0) return null;
          const { label, Icon } = kindMeta[kind];
          return (
            <section key={kind}>
              <div className="mono-label mb-2 flex items-center gap-1.5 text-muted">
                <Icon className="h-3.5 w-3.5" /> {label} ({items.length})
              </div>
              <div className="space-y-2">
                {items.slice(0, 8).map((r) => (
                  <button
                    key={`${r.kind}-${r.id}`}
                    onClick={() => onNavigate(r.route)}
                    className="card block w-full p-3 text-left transition hover:border-primary"
                  >
                    <div className="flex items-center gap-2">
                      {r.domain && (
                        <span
                          className={`mono-label rounded px-1.5 py-0.5 text-[0.58rem] bg-${domainMeta[r.domain].token}/10 text-${domainMeta[r.domain].token}`}
                        >
                          {domainMeta[r.domain].short}
                        </span>
                      )}
                      <span className="font-medium">{r.title}</span>
                    </div>
                    {r.subtitle && (
                      <div className="mt-0.5 text-sm text-muted line-clamp-2">
                        {r.subtitle}
                      </div>
                    )}
                  </button>
                ))}
              </div>
            </section>
          );
        })}

        {q.trim() && results.length === 0 && (
          <div className="card p-6 text-center text-muted">
            No matches. Try a broader term, or a society, trial, or anatomy name.
          </div>
        )}
      </div>
    </div>
  );
}
