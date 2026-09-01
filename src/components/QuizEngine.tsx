import { useMemo, useState } from "react";
import { Check, X, Lightbulb, RotateCcw, ArrowRight } from "lucide-react";
import type { QuizMode, QuizQuestion } from "../types";
import { quiz } from "../data/quiz";
import { RefChips, domainMeta } from "./ui";
import { useProgress } from "../lib/progress";

const MODES: { id: QuizMode; label: string; blurb: string }[] = [
  { id: "learn", label: "Learn", blurb: "Immediate feedback and hints" },
  { id: "practice", label: "Practice", blurb: "Feedback after each answer" },
  { id: "test", label: "Test", blurb: "Feedback held to the end" },
];

function shuffle<T>(arr: T[]): T[] {
  const a = [...arr];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

export function QuizEngine({ topicFilter }: { topicFilter?: string }) {
  const { recordQuiz, recordQuestion } = useProgress();
  const [mode, setMode] = useState<QuizMode>("learn");
  const [started, setStarted] = useState(false);
  const [questions, setQuestions] = useState<QuizQuestion[]>([]);
  const [idx, setIdx] = useState(0);
  const [picked, setPicked] = useState<number | null>(null);
  const [answers, setAnswers] = useState<Record<string, number>>({});
  const [showHint, setShowHint] = useState(false);
  const [finished, setFinished] = useState(false);

  const pool = useMemo(
    () => (topicFilter ? quiz.filter((q) => q.topicId === topicFilter) : quiz),
    [topicFilter]
  );

  function start(selected: QuizMode) {
    setMode(selected);
    setQuestions(shuffle(pool));
    setIdx(0);
    setPicked(null);
    setAnswers({});
    setShowHint(false);
    setFinished(false);
    setStarted(true);
  }

  if (!started) {
    return (
      <div>
        <p className="mb-4 text-muted">
          {pool.length} question{pool.length === 1 ? "" : "s"}
          {topicFilter ? " in this topic" : " across the portal"}. Pick a mode.
        </p>
        <div className="grid gap-3 sm:grid-cols-3">
          {MODES.map((m) => (
            <button
              key={m.id}
              onClick={() => start(m.id)}
              className="rounded-xl border border-line bg-surface p-4 text-left transition hover:border-primary"
            >
              <div className="font-semibold">{m.label}</div>
              <div className="mt-1 text-sm text-muted">{m.blurb}</div>
            </button>
          ))}
        </div>
        {pool.length === 0 && (
          <p className="mt-4 text-sm text-muted">
            No questions are seeded for this topic yet. Add questions to the quiz
            data file and they appear here automatically.
          </p>
        )}
      </div>
    );
  }

  const q = questions[idx];
  const reveal =
    mode === "learn"
      ? picked !== null
      : mode === "practice"
      ? picked !== null
      : false; // test mode holds feedback

  function choose(optIdx: number) {
    if (picked !== null && mode !== "test") return;
    setPicked(optIdx);
    setAnswers((a) => ({ ...a, [q.id]: optIdx }));
    if (mode !== "test") {
      recordQuestion(q.id, optIdx === q.answerIndex);
    }
  }

  function next() {
    if (idx + 1 >= questions.length) {
      // tally
      const finalAnswers =
        picked !== null ? { ...answers, [q.id]: picked } : answers;
      const correct = questions.filter(
        (qq) => finalAnswers[qq.id] === qq.answerIndex
      ).length;
      if (mode === "test") {
        for (const qq of questions) {
          recordQuestion(qq.id, finalAnswers[qq.id] === qq.answerIndex);
        }
      }
      recordQuiz(topicFilter ?? "all", correct, questions.length);
      setFinished(true);
      return;
    }
    setIdx((i) => i + 1);
    setPicked(null);
    setShowHint(false);
  }

  if (finished) {
    const correct = questions.filter((qq) => answers[qq.id] === qq.answerIndex)
      .length;
    const pct = Math.round((correct / questions.length) * 100);
    return (
      <div className="rounded-xl border border-line bg-surface p-6 text-center">
        <div className="mono-label text-muted">Session complete</div>
        <div className="my-3 text-4xl font-semibold">
          {correct}/{questions.length}
        </div>
        <div className={`text-lg ${pct >= 70 ? "text-success" : "text-highyield"}`}>
          {pct}%
        </div>
        <p className="mx-auto mt-3 max-w-md text-sm text-muted">
          {pct >= 70
            ? "Solid. Missed items are logged so weak topics surface on your progress page."
            : "This topic is flagged as weak on your progress page, and missed items feed spaced repetition."}
        </p>
        <button
          onClick={() => start(mode)}
          className="mt-5 inline-flex items-center gap-1.5 rounded-lg border border-line bg-surface2 px-4 py-2 text-sm hover:border-primary"
        >
          <RotateCcw className="h-4 w-4" /> Retry
        </button>
      </div>
    );
  }

  return (
    <div>
      <div className="mb-4 flex items-center justify-between text-sm text-muted">
        <span className="mono-label">
          {domainMeta[q.domain].label} · Q{idx + 1} of {questions.length}
        </span>
        <span className="mono-label capitalize">{mode} mode</span>
      </div>

      <div className="rounded-xl border border-line bg-surface p-5">
        <p className="font-serif text-lg leading-snug">{q.stem}</p>

        {mode === "learn" && q.hint && (
          <div className="mt-3">
            {showHint ? (
              <div className="rounded-lg border border-highyield/30 bg-highyield/10 p-3 text-sm">
                <span className="mono-label text-highyield">Hint </span>
                {q.hint}
              </div>
            ) : (
              <button
                onClick={() => setShowHint(true)}
                className="inline-flex items-center gap-1.5 text-sm text-highyield hover:underline"
              >
                <Lightbulb className="h-4 w-4" /> Show hint
              </button>
            )}
          </div>
        )}

        <div className="mt-4 space-y-2">
          {q.options.map((opt, i) => {
            const isPicked = (mode === "test" ? answers[q.id] : picked) === i;
            const isCorrect = i === q.answerIndex;
            let cls = "border-line bg-surface2/40 hover:border-primary";
            if (reveal) {
              if (isCorrect) cls = "border-success bg-success/10";
              else if (isPicked) cls = "border-safety bg-safety/10";
              else cls = "border-line opacity-70";
            } else if (isPicked) {
              cls = "border-primary bg-primary/10";
            }
            return (
              <button
                key={i}
                onClick={() => choose(i)}
                disabled={reveal && mode !== "test"}
                className={`flex w-full items-center justify-between gap-2 rounded-lg border px-4 py-3 text-left text-sm transition ${cls}`}
              >
                <span>{opt}</span>
                {reveal && isCorrect && <Check className="h-4 w-4 text-success" />}
                {reveal && isPicked && !isCorrect && (
                  <X className="h-4 w-4 text-safety" />
                )}
              </button>
            );
          })}
        </div>

        {reveal && (
          <div className="mt-4 rounded-lg border border-line bg-surface2/60 p-4 text-sm leading-relaxed">
            <span className="mono-label text-primary">Explanation </span>
            {q.explanation}
            <RefChips refIds={q.refIds} />
          </div>
        )}

        <div className="mt-4 flex justify-end">
          <button
            onClick={next}
            disabled={mode !== "test" && picked === null}
            className="inline-flex items-center gap-1.5 rounded-lg bg-primary px-4 py-2 text-sm font-medium text-white disabled:opacity-40"
          >
            {idx + 1 >= questions.length ? "Finish" : "Next"}
            <ArrowRight className="h-4 w-4" />
          </button>
        </div>
      </div>
    </div>
  );
}
