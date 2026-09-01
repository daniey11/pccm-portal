import { useEffect } from "react";
import { Bookmark, BookmarkCheck, GraduationCap, Layers, BookOpen } from "lucide-react";
import type { Lesson } from "../types";
import { BlockRenderer, LevelBadge, SourceTag, Waveform, domainMeta, domainToken } from "./ui";
import { refById } from "../data/references";
import { useProgress } from "../lib/progress";

export function LessonView({
  lesson,
  onNavigate,
}: {
  lesson: Lesson;
  onNavigate: (route: string) => void;
}) {
  const { visitLesson, toggleBookmark, isBookmarked } = useProgress();
  const token = domainToken(lesson.domain);

  useEffect(() => {
    visitLesson(lesson.id);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [lesson.id]);

  const bookmarked = isBookmarked(lesson.id);

  return (
    <article className="relative">
      {/* Domain-tinted header band with the signature waveform */}
      <div className={`relative overflow-hidden rounded-xl border border-${token}/30 bg-${token}/10 p-6`}>
        <div className="pointer-events-none absolute inset-x-0 bottom-0 opacity-40">
          <Waveform token={token} height={30} />
        </div>
        <div className="relative">
          <div className="mono-label mb-2 flex items-center gap-2 text-muted">
            <span className={`text-${token}`}>{domainMeta[lesson.domain].label}</span>
            <span>·</span>
            <LevelBadge level={lesson.level} />
            <SourceTag source={lesson.source} />
          </div>
          <h1 className="max-w-reading font-serif text-3xl font-semibold leading-tight">
            {lesson.title}
          </h1>
          <p className="mt-2 max-w-reading text-muted">{lesson.summary}</p>
          <div className="mt-4 flex flex-wrap gap-2">
            <button
              onClick={() => toggleBookmark(lesson.id)}
              className="inline-flex items-center gap-1.5 rounded-lg border border-line bg-surface px-3 py-1.5 text-sm hover:border-primary"
            >
              {bookmarked ? (
                <>
                  <BookmarkCheck className="h-4 w-4 text-primary" /> Bookmarked
                </>
              ) : (
                <>
                  <Bookmark className="h-4 w-4" /> Bookmark
                </>
              )}
            </button>
            {lesson.quizTopicId && (
              <button
                onClick={() => onNavigate(`#/quiz?topic=${lesson.quizTopicId}`)}
                className="inline-flex items-center gap-1.5 rounded-lg border border-line bg-surface px-3 py-1.5 text-sm hover:border-primary"
              >
                <GraduationCap className="h-4 w-4" /> Practice questions
              </button>
            )}
            {lesson.flashcardTopic && (
              <button
                onClick={() => onNavigate(`#/flashcards?topic=${encodeURIComponent(lesson.flashcardTopic ?? "")}`)}
                className="inline-flex items-center gap-1.5 rounded-lg border border-line bg-surface px-3 py-1.5 text-sm hover:border-primary"
              >
                <Layers className="h-4 w-4" /> Flashcards
              </button>
            )}
            <button
              onClick={() => onNavigate(`#/teaching?lesson=${lesson.id}`)}
              className="inline-flex items-center gap-1.5 rounded-lg border border-line bg-surface px-3 py-1.5 text-sm hover:border-primary"
            >
              <BookOpen className="h-4 w-4" /> Teaching handout
            </button>
          </div>
        </div>
      </div>

      {/* Objectives */}
      <div className="mt-6 rounded-lg border border-line bg-surface2/60 p-4">
        <div className="mono-label mb-2 flex items-center gap-1.5 text-primary">
          <GraduationCap className="h-3.5 w-3.5" /> Learning objectives
        </div>
        <ul className="ml-4 list-disc space-y-1 text-sm">
          {lesson.objectives.map((o, i) => (
            <li key={i}>{o}</li>
          ))}
        </ul>
      </div>

      {/* Body blocks */}
      <div className="mt-2">
        {lesson.blocks.map((b, i) => (
          <BlockRenderer key={i} block={b} />
        ))}
      </div>

      {/* References */}
      {lesson.refIds.length > 0 && (
        <div className="mt-8 border-t border-line pt-4">
          <div className="mono-label mb-2 text-muted">References</div>
          <ol className="space-y-2 text-sm text-muted">
            {lesson.refIds.map((id) => {
              const r = refById[id];
              if (!r) return null;
              return (
                <li key={id} className="leading-relaxed">
                  {r.citation}
                  {r.verifyCurrent && (
                    <span className="ml-1 text-highyield">
                      (confirm current version)
                    </span>
                  )}
                </li>
              );
            })}
          </ol>
        </div>
      )}
    </article>
  );
}
