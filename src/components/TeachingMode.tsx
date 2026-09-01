import { useMemo, useState } from "react";
import { Printer, Presentation, FileText } from "lucide-react";
import type { ContentBlock, Lesson } from "../types";
import { allLessons } from "../data/lessons";
import { refById } from "../data/references";
import { domainMeta } from "./ui";

// Teaching mode reuses the structured lesson data to assemble ready-to-use
// teaching artifacts. Nothing new is invented: it reorganizes objectives,
// pearls, pitfalls, board pearls, landmark trials, and references into a
// handout or a chalk-talk outline.

function collectItems(lesson: Lesson, type: ContentBlock["type"]): string[] {
  return lesson.blocks
    .filter((b) => b.type === type)
    .flatMap((b) => b.items ?? []);
}

function collectKeyLines(lesson: Lesson): string[] {
  return lesson.blocks
    .filter((b) => b.type === "keypoints" || b.type === "list")
    .flatMap((b) => b.items ?? []);
}

export function TeachingMode({ lessonId }: { lessonId?: string }) {
  const [selectedId, setSelectedId] = useState<string>(
    lessonId ?? allLessons[0]?.id ?? ""
  );
  const [format, setFormat] = useState<"handout" | "chalk">("handout");

  const lesson = useMemo(
    () => allLessons.find((l) => l.id === selectedId),
    [selectedId]
  );

  if (!lesson) return null;

  const pearls = collectItems(lesson, "pearls");
  const pitfalls = collectItems(lesson, "pitfalls");
  const boardPearls = collectItems(lesson, "boardPearls");
  const keyLines = collectKeyLines(lesson);
  const landmarks = lesson.blocks
    .filter((b) => b.type === "landmark")
    .map((b) => b.trial)
    .filter(Boolean);

  return (
    <div>
      <div className="mb-5 flex flex-wrap items-center gap-3 print:hidden">
        <select
          value={selectedId}
          onChange={(e) => setSelectedId(e.target.value)}
          className="rounded-lg border border-line bg-surface px-3 py-2 text-sm"
        >
          {allLessons.map((l) => (
            <option key={l.id} value={l.id}>
              {domainMeta[l.domain].label} — {l.title}
            </option>
          ))}
        </select>

        <div className="inline-flex overflow-hidden rounded-lg border border-line">
          <button
            onClick={() => setFormat("handout")}
            className={`inline-flex items-center gap-1.5 px-3 py-2 text-sm ${
              format === "handout" ? "bg-primary text-white" : "bg-surface"
            }`}
          >
            <FileText className="h-4 w-4" /> Handout
          </button>
          <button
            onClick={() => setFormat("chalk")}
            className={`inline-flex items-center gap-1.5 px-3 py-2 text-sm ${
              format === "chalk" ? "bg-primary text-white" : "bg-surface"
            }`}
          >
            <Presentation className="h-4 w-4" /> Chalk talk
          </button>
        </div>

        <button
          onClick={() => window.print()}
          className="ml-auto inline-flex items-center gap-1.5 rounded-lg border border-line bg-surface px-3 py-2 text-sm hover:border-primary"
        >
          <Printer className="h-4 w-4" /> Print / PDF
        </button>
      </div>

      <div className="rounded-xl border border-line bg-surface p-6">
        <div className="mono-label mb-1 text-muted">
          {format === "handout" ? "Fellow handout" : "Chalk-talk outline"} ·{" "}
          {domainMeta[lesson.domain].label}
        </div>
        <h1 className="font-serif text-2xl font-semibold">{lesson.title}</h1>
        <p className="mt-1 text-muted">{lesson.summary}</p>

        <Section title="Objectives">
          <ul className="ml-4 list-disc space-y-1 text-sm">
            {lesson.objectives.map((o, i) => (
              <li key={i}>{o}</li>
            ))}
          </ul>
        </Section>

        {format === "chalk" ? (
          <>
            <Section title="Talk flow">
              <ol className="ml-4 list-decimal space-y-1.5 text-sm">
                <li>Open with the framing question and why it matters at the bedside.</li>
                <li>Walk the key points below, drawing the framework as you go.</li>
                {landmarks.length > 0 && (
                  <li>Anchor with the landmark evidence, then bring it back to practice.</li>
                )}
                <li>Close with pearls and the traps to avoid.</li>
                <li>Check understanding with the linked questions.</li>
              </ol>
            </Section>
            {keyLines.length > 0 && (
              <Section title="Board to draw / talking points">
                <ul className="ml-4 list-disc space-y-1 text-sm">
                  {keyLines.map((k, i) => (
                    <li key={i}>{k}</li>
                  ))}
                </ul>
              </Section>
            )}
          </>
        ) : (
          keyLines.length > 0 && (
            <Section title="Key points">
              <ul className="ml-4 list-disc space-y-1 text-sm">
                {keyLines.map((k, i) => (
                  <li key={i}>{k}</li>
                ))}
              </ul>
            </Section>
          )
        )}

        {landmarks.length > 0 && (
          <Section title="Landmark evidence">
            <ul className="space-y-2 text-sm">
              {landmarks.map((t, i) => (
                <li key={i}>
                  <span className="font-medium">{t!.name}:</span> {t!.takeaway}
                </li>
              ))}
            </ul>
          </Section>
        )}

        {pearls.length > 0 && (
          <Section title="Clinical pearls">
            <ul className="ml-4 list-disc space-y-1 text-sm">
              {pearls.map((p, i) => (
                <li key={i}>{p}</li>
              ))}
            </ul>
          </Section>
        )}

        {pitfalls.length > 0 && (
          <Section title="Pitfalls">
            <ul className="ml-4 list-disc space-y-1 text-sm">
              {pitfalls.map((p, i) => (
                <li key={i}>{p}</li>
              ))}
            </ul>
          </Section>
        )}

        {boardPearls.length > 0 && (
          <Section title="Board pearls">
            <ul className="ml-4 list-disc space-y-1 text-sm">
              {boardPearls.map((p, i) => (
                <li key={i}>{p}</li>
              ))}
            </ul>
          </Section>
        )}

        {lesson.refIds.length > 0 && (
          <Section title="References">
            <ol className="space-y-1.5 text-xs text-muted">
              {lesson.refIds.map((id) => {
                const r = refById[id];
                return r ? <li key={id}>{r.citation}</li> : null;
              })}
            </ol>
          </Section>
        )}
      </div>
    </div>
  );
}

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <section className="mt-5 border-t border-line pt-4">
      <h2 className="mono-label mb-2 text-primary">{title}</h2>
      {children}
    </section>
  );
}
