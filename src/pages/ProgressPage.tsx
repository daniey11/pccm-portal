import { AlertCircle, Layers, BookmarkCheck, RotateCcw, TrendingUp, Trash2 } from "lucide-react";
import { useProgress, totalFlashcards } from "../lib/progress";
import { lessonById } from "../data/lessons";
import { topicById } from "../data/modules";
import { quiz } from "../data/quiz";

// Map a quiz topic id back to a human label via any question in that topic.
function topicLabel(quizTopicId: string): string {
  if (quizTopicId === "all") return "Mixed question bank";
  const q = quiz.find((qq) => qq.topicId === quizTopicId);
  return q ? q.stem.slice(0, 48) + "..." : quizTopicId;
}

export function ProgressPage({ onNavigate }: { onNavigate: (route: string) => void }) {
  const { state, dueCards, weakTopics, resetAll } = useProgress();
  const due = dueCards().length;
  const weak = weakTopics();
  const recent = [...state.quizAttempts].reverse().slice(0, 6);

  return (
    <div>
      <div className="mono-label mb-2 text-muted">Adaptive learning</div>
      <h1 className="mb-6 font-serif text-3xl font-semibold">Your progress</h1>

      <div className="grid gap-4 sm:grid-cols-3">
        <button
          onClick={() => onNavigate("#/flashcards?due=1")}
          className="card p-4 text-left transition hover:border-primary"
        >
          <div className="mono-label flex items-center gap-1.5 text-muted">
            <Layers className="h-3.5 w-3.5" /> Due for review
          </div>
          <div className="mt-1 text-3xl font-semibold">{due}</div>
          <div className="text-xs text-muted">of {totalFlashcards} cards</div>
        </button>
        <div className="card p-4">
          <div className="mono-label flex items-center gap-1.5 text-muted">
            <TrendingUp className="h-3.5 w-3.5" /> Lessons opened
          </div>
          <div className="mt-1 text-3xl font-semibold">
            {state.visitedLessons.length}
          </div>
          <div className="text-xs text-muted">tracked on this device</div>
        </div>
        <div className="card p-4">
          <div className="mono-label flex items-center gap-1.5 text-muted">
            <BookmarkCheck className="h-3.5 w-3.5" /> Bookmarks
          </div>
          <div className="mt-1 text-3xl font-semibold">
            {state.bookmarks.length}
          </div>
          <div className="text-xs text-muted">saved lessons</div>
        </div>
      </div>

      {/* Weak topics */}
      <section className="mt-8">
        <h2 className="mb-3 flex items-center gap-2 text-lg font-semibold">
          <AlertCircle className="h-5 w-5 text-highyield" /> Recommended review
        </h2>
        {weak.length === 0 ? (
          <div className="card p-4 text-sm text-muted">
            No weak topics yet. After a few quiz sessions, topics scoring under
            70% show up here so you know where to focus.
          </div>
        ) : (
          <div className="space-y-2">
            {weak.map((w) => (
              <button
                key={w.topicId}
                onClick={() => onNavigate(`#/quiz?topic=${w.topicId}`)}
                className="card flex w-full items-center justify-between p-3 text-left transition hover:border-primary"
              >
                <span className="text-sm">{topicLabel(w.topicId)}</span>
                <span className="mono-label text-safety">
                  {Math.round((w.correct / w.total) * 100)}%
                </span>
              </button>
            ))}
          </div>
        )}
      </section>

      {/* Recent quizzes */}
      <section className="mt-8">
        <h2 className="mb-3 text-lg font-semibold">Recent quiz sessions</h2>
        {recent.length === 0 ? (
          <div className="card p-4 text-sm text-muted">
            No sessions yet.{" "}
            <button
              onClick={() => onNavigate("#/quiz")}
              className="text-primary hover:underline"
            >
              Start a quiz
            </button>
            .
          </div>
        ) : (
          <div className="space-y-2">
            {recent.map((a, i) => {
              const pct = Math.round((a.correct / a.total) * 100);
              return (
                <div key={i} className="card flex items-center justify-between p-3">
                  <span className="text-sm">{topicLabel(a.quizTopicId)}</span>
                  <span
                    className={`mono-label ${pct >= 70 ? "text-success" : "text-highyield"}`}
                  >
                    {a.correct}/{a.total} · {pct}%
                  </span>
                </div>
              );
            })}
          </div>
        )}
      </section>

      {/* Bookmarks */}
      {state.bookmarks.length > 0 && (
        <section className="mt-8">
          <h2 className="mb-3 text-lg font-semibold">Bookmarked lessons</h2>
          <div className="space-y-2">
            {state.bookmarks.map((id) => {
              const l = lessonById[id];
              if (!l) return null;
              const topic = topicById[l.topicId];
              return (
                <button
                  key={id}
                  onClick={() => onNavigate(`#/lesson/${id}`)}
                  className="card flex w-full items-center justify-between p-3 text-left transition hover:border-primary"
                >
                  <span className="text-sm">{l.title}</span>
                  <span className="mono-label text-muted">{topic?.title}</span>
                </button>
              );
            })}
          </div>
        </section>
      )}

      {/* Reset */}
      <section className="mt-10 border-t border-line pt-6">
        <div className="flex items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 font-medium">
              <RotateCcw className="h-4 w-4" /> Reset progress
            </div>
            <p className="mt-1 text-sm text-muted">
              Clears visited lessons, bookmarks, quiz history, and review
              schedule on this device. This cannot be undone.
            </p>
          </div>
          <button
            onClick={() => {
              if (confirm("Reset all saved progress on this device?")) resetAll();
            }}
            className="inline-flex shrink-0 items-center gap-1.5 rounded-lg border border-safety/40 bg-safety/10 px-4 py-2 text-sm text-safety hover:border-safety"
          >
            <Trash2 className="h-4 w-4" /> Reset
          </button>
        </div>
      </section>
    </div>
  );
}
