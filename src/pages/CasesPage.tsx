import { useState } from "react";
import { Check, X, ArrowRight, Stethoscope, RotateCcw } from "lucide-react";
import type { ClinicalCase } from "../types";
import { cases } from "../data/cases";
import { RefChips, LevelBadge, domainMeta } from "../components/ui";

export function CasesPage() {
  const [activeId, setActiveId] = useState<string | null>(null);
  const active = cases.find((c) => c.id === activeId);

  if (active) {
    return <CaseRunner c={active} onBack={() => setActiveId(null)} />;
  }

  return (
    <div>
      <div className="mono-label mb-2 text-muted">Case-based learning</div>
      <h1 className="mb-6 font-serif text-3xl font-semibold">Clinical cases</h1>
      <div className="grid gap-4 md:grid-cols-2">
        {cases.map((c) => (
          <button
            key={c.id}
            onClick={() => setActiveId(c.id)}
            className="card p-5 text-left transition hover:border-primary"
          >
            <div className="mono-label mb-2 flex items-center gap-2 text-muted">
              <span className={`text-${domainMeta[c.domain].token}`}>
                {domainMeta[c.domain].label}
              </span>
              <LevelBadge level={c.level} />
            </div>
            <h3 className="flex items-center gap-2 font-semibold">
              <Stethoscope className="h-4 w-4 text-primary" /> {c.title}
            </h3>
            <p className="mt-2 text-sm text-muted line-clamp-3">{c.presentation}</p>
            <div className="mt-3 text-sm text-primary">Start case →</div>
          </button>
        ))}
      </div>
    </div>
  );
}

function CaseRunner({ c, onBack }: { c: ClinicalCase; onBack: () => void }) {
  const [step, setStep] = useState(0);
  const [picked, setPicked] = useState<number | null>(null);
  const [done, setDone] = useState(false);

  const current = c.steps[step];

  function next() {
    if (step + 1 >= c.steps.length) {
      setDone(true);
      return;
    }
    setStep((s) => s + 1);
    setPicked(null);
  }

  return (
    <div>
      <button
        onClick={onBack}
        className="mb-4 text-sm text-muted hover:text-primary"
      >
        ← All cases
      </button>

      <div className="mono-label mb-1 text-muted">{domainMeta[c.domain].label} case</div>
      <h1 className="mb-3 font-serif text-2xl font-semibold">{c.title}</h1>

      <div className="card mb-5 p-4">
        <div className="mono-label mb-1 text-primary">Presentation</div>
        <p className="text-sm leading-relaxed">{c.presentation}</p>
      </div>

      {!done ? (
        <div className="card p-5">
          <div className="mono-label mb-2 text-muted">
            Step {step + 1} of {c.steps.length}
          </div>
          <p className="font-serif text-lg leading-snug">{current.prompt}</p>
          <div className="mt-4 space-y-2">
            {current.options.map((opt, i) => {
              const reveal = picked !== null;
              const correct = i === current.answerIndex;
              let cls = "border-line bg-surface2/40 hover:border-primary";
              if (reveal) {
                if (correct) cls = "border-success bg-success/10";
                else if (i === picked) cls = "border-safety bg-safety/10";
                else cls = "border-line opacity-70";
              }
              return (
                <button
                  key={i}
                  onClick={() => picked === null && setPicked(i)}
                  disabled={reveal}
                  className={`flex w-full items-center justify-between rounded-lg border px-4 py-3 text-left text-sm ${cls}`}
                >
                  <span>{opt}</span>
                  {reveal && correct && <Check className="h-4 w-4 text-success" />}
                  {reveal && i === picked && !correct && (
                    <X className="h-4 w-4 text-safety" />
                  )}
                </button>
              );
            })}
          </div>
          {picked !== null && (
            <div className="mt-4 rounded-lg border border-line bg-surface2/60 p-4 text-sm">
              <span className="mono-label text-primary">Explanation </span>
              {current.explanation}
            </div>
          )}
          <div className="mt-4 flex justify-end">
            <button
              onClick={next}
              disabled={picked === null}
              className="inline-flex items-center gap-1.5 rounded-lg bg-primary px-4 py-2 text-sm font-medium text-white disabled:opacity-40"
            >
              {step + 1 >= c.steps.length ? "Finish" : "Next"}
              <ArrowRight className="h-4 w-4" />
            </button>
          </div>
        </div>
      ) : (
        <div className="card p-5">
          <div className="mono-label mb-2 text-success">Case complete</div>
          <div className="mb-4">
            <h3 className="mb-1 font-semibold">Key points</h3>
            <ul className="ml-4 list-disc space-y-1 text-sm">
              {c.keyPoints.map((k, i) => (
                <li key={i}>{k}</li>
              ))}
            </ul>
          </div>
          {c.commonMistakes.length > 0 && (
            <div className="mb-4">
              <h3 className="mb-1 font-semibold">Common mistakes</h3>
              <ul className="ml-4 list-disc space-y-1 text-sm">
                {c.commonMistakes.map((k, i) => (
                  <li key={i}>{k}</li>
                ))}
              </ul>
            </div>
          )}
          <RefChips refIds={c.refIds} />
          <button
            onClick={() => {
              setStep(0);
              setPicked(null);
              setDone(false);
            }}
            className="mt-4 inline-flex items-center gap-1.5 rounded-lg border border-line bg-surface2 px-4 py-2 text-sm hover:border-primary"
          >
            <RotateCcw className="h-4 w-4" /> Restart case
          </button>
        </div>
      )}
    </div>
  );
}
