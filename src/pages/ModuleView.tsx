import { useState } from "react";
import { ChevronRight, Lock, BookOpen } from "lucide-react";
import type { Level } from "../types";
import { moduleById } from "../data/modules";
import { lessonById } from "../data/lessons";
import { Waveform, LevelBadge, StatusDot, domainMeta } from "../components/ui";

const LEVELS: (Level | "all")[] = ["all", "beginner", "intermediate", "advanced"];

export function ModuleView({
  moduleId,
  onNavigate,
}: {
  moduleId: string;
  onNavigate: (route: string) => void;
}) {
  const [level, setLevel] = useState<Level | "all">("all");
  const mod = moduleById[moduleId];

  if (!mod) {
    return <p className="text-muted">Module not found.</p>;
  }

  const token = domainMeta[mod.domain].token;
  const topics =
    level === "all" ? mod.topics : mod.topics.filter((t) => t.level === level);

  return (
    <div>
      <div className={`relative overflow-hidden rounded-xl border border-${token}/30 bg-${token}/10 p-6`}>
        <div className="pointer-events-none absolute inset-x-0 bottom-0 opacity-40">
          <Waveform token={token} height={28} />
        </div>
        <div className="relative">
          <div className={`mono-label text-${token}`}>{domainMeta[mod.domain].label}</div>
          <h1 className="mt-1 font-serif text-3xl font-semibold">{mod.title}</h1>
          <p className="mt-2 max-w-reading text-muted">{mod.blurb}</p>
        </div>
      </div>

      {/* Level filter */}
      <div className="mt-6 flex flex-wrap gap-2">
        {LEVELS.map((lv) => (
          <button
            key={lv}
            onClick={() => setLevel(lv)}
            className={`rounded-lg border px-3 py-1.5 text-sm capitalize ${
              level === lv
                ? "border-primary bg-primary/10 text-primary"
                : "border-line bg-surface hover:border-primary"
            }`}
          >
            {lv}
          </button>
        ))}
      </div>

      {/* Topics */}
      <div className="mt-5 space-y-3">
        {topics.map((t) => {
          const seeded = t.status === "seeded";
          return (
            <div
              key={t.id}
              className="card overflow-hidden"
            >
              <div className="flex items-start justify-between gap-3 px-5 py-4">
                <div>
                  <div className="flex items-center gap-2">
                    <StatusDot seeded={seeded} />
                    <h3 className="font-semibold">{t.title}</h3>
                    <LevelBadge level={t.level} />
                  </div>
                  <p className="mt-1 text-sm text-muted">{t.blurb}</p>
                </div>
                {!seeded && (
                  <span className="mono-label flex shrink-0 items-center gap-1 rounded border border-line px-2 py-1 text-[0.6rem] text-muted">
                    <Lock className="h-3 w-3" /> Planned
                  </span>
                )}
              </div>

              {seeded && (
                <div className="border-t border-line bg-surface2/40">
                  {t.lessonIds.map((lid) => {
                    const l = lessonById[lid];
                    if (!l) return null;
                    return (
                      <button
                        key={lid}
                        onClick={() => onNavigate(`#/lesson/${lid}`)}
                        className="flex w-full items-center justify-between gap-2 px-5 py-3 text-left text-sm hover:bg-surface2"
                      >
                        <span className="flex items-center gap-2">
                          <BookOpen className="h-4 w-4 text-primary" />
                          {l.title}
                        </span>
                        <ChevronRight className="h-4 w-4 text-muted" />
                      </button>
                    );
                  })}
                </div>
              )}

              {!seeded && (
                <div className="border-t border-dashed border-line px-5 py-3 text-xs text-muted">
                  Scaffold ready. Upload a lecture or author a lesson for this
                  topic and it appears here automatically.
                </div>
              )}
            </div>
          );
        })}
        {topics.length === 0 && (
          <p className="text-sm text-muted">No topics at this level.</p>
        )}
      </div>
    </div>
  );
}
