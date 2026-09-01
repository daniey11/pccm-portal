import { useEffect, useMemo, useState } from "react";
import { RotateCcw, Check, X, Layers } from "lucide-react";
import { flashcards } from "../data/flashcards";
import { RefChips, domainMeta } from "./ui";
import { useProgress } from "../lib/progress";

export function Flashcards({
  topicFilter,
  dueOnly = false,
}: {
  topicFilter?: string;
  dueOnly?: boolean;
}) {
  const { ensureCards, reviewCard, state } = useProgress();

  const deck = useMemo(() => {
    let d = topicFilter
      ? flashcards.filter((f) => f.topic === topicFilter)
      : flashcards;
    if (dueOnly) {
      const now = Date.now();
      d = d.filter((f) => {
        const c = state.srs[f.id];
        return !c || c.due <= now;
      });
    }
    return d;
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [topicFilter, dueOnly]);

  const [idx, setIdx] = useState(0);
  const [flipped, setFlipped] = useState(false);
  const [done, setDone] = useState(false);

  useEffect(() => {
    ensureCards(deck.map((c) => c.id));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [deck]);

  if (deck.length === 0) {
    return (
      <div className="rounded-xl border border-line bg-surface p-6 text-center text-muted">
        {dueOnly
          ? "Nothing is due for review right now. Come back later, or study a topic deck."
          : "No cards are seeded for this topic yet."}
      </div>
    );
  }

  if (done) {
    return (
      <div className="rounded-xl border border-line bg-surface p-6 text-center">
        <div className="mono-label text-muted">Deck complete</div>
        <p className="mx-auto mt-2 max-w-md text-sm text-muted">
          Your grades updated the spaced-repetition schedule. Cards you missed
          will come back sooner.
        </p>
        <button
          onClick={() => {
            setIdx(0);
            setFlipped(false);
            setDone(false);
          }}
          className="mt-4 inline-flex items-center gap-1.5 rounded-lg border border-line bg-surface2 px-4 py-2 text-sm hover:border-primary"
        >
          <RotateCcw className="h-4 w-4" /> Study again
        </button>
      </div>
    );
  }

  const card = deck[idx];

  function grade(remembered: boolean) {
    reviewCard(card.id, remembered);
    if (idx + 1 >= deck.length) {
      setDone(true);
      return;
    }
    setIdx((i) => i + 1);
    setFlipped(false);
  }

  return (
    <div>
      <div className="mb-3 flex items-center justify-between text-sm text-muted">
        <span className="mono-label flex items-center gap-1.5">
          <Layers className="h-3.5 w-3.5" />
          {card.topic}
        </span>
        <span className="mono-label">
          {idx + 1} / {deck.length}
        </span>
      </div>

      <button
        onClick={() => setFlipped((f) => !f)}
        className="flex min-h-[220px] w-full flex-col items-center justify-center rounded-2xl border border-line bg-surface p-8 text-center transition hover:border-primary"
      >
        <span className="mono-label mb-3 text-muted">
          {domainMeta[card.domain].label} · {flipped ? "Answer" : "Prompt"}
        </span>
        <span className="font-serif text-xl leading-snug">
          {flipped ? card.back : card.front}
        </span>
        {!flipped && (
          <span className="mt-4 text-xs text-muted">Click to reveal</span>
        )}
        {flipped && <RefChips refIds={card.refIds} />}
      </button>

      {flipped && (
        <div className="mt-4 flex justify-center gap-3">
          <button
            onClick={() => grade(false)}
            className="inline-flex items-center gap-1.5 rounded-lg border border-safety/40 bg-safety/10 px-5 py-2.5 text-sm text-safety hover:border-safety"
          >
            <X className="h-4 w-4" /> Missed it
          </button>
          <button
            onClick={() => grade(true)}
            className="inline-flex items-center gap-1.5 rounded-lg border border-success/40 bg-success/10 px-5 py-2.5 text-sm text-success hover:border-success"
          >
            <Check className="h-4 w-4" /> Got it
          </button>
        </div>
      )}
    </div>
  );
}
