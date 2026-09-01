import { useMemo, useRef, useState } from "react";
import { Play, Upload, ListVideo, Search, CircleHelp, Check, X } from "lucide-react";
import type { MultimediaLesson } from "../types";
import { domainMeta } from "./ui";

function fmt(sec: number): string {
  const m = Math.floor(sec / 60);
  const s = Math.floor(sec % 60);
  return `${m}:${s.toString().padStart(2, "0")}`;
}

export function VideoLesson({ lesson }: { lesson: MultimediaLesson }) {
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const [current, setCurrent] = useState(0);
  const [query, setQuery] = useState("");
  const [openCheckpoint, setOpenCheckpoint] = useState<number | null>(null);
  const [picked, setPicked] = useState<number | null>(null);

  const hasVideo = Boolean(lesson.videoSrc);

  const filteredTranscript = useMemo(() => {
    const q = query.toLowerCase().trim();
    if (!q) return lesson.transcript;
    return lesson.transcript.filter((t) => t.text.toLowerCase().includes(q));
  }, [query, lesson.transcript]);

  function seek(sec: number) {
    setCurrent(sec);
    if (videoRef.current) {
      videoRef.current.currentTime = sec;
      videoRef.current.play().catch(() => undefined);
    }
  }

  return (
    <div>
      <div className="mb-4">
        <div className="mono-label text-muted">
          {domainMeta[lesson.domain].label} · Multimedia lesson
        </div>
        <h1 className="mt-1 font-serif text-2xl font-semibold">{lesson.title}</h1>
        {lesson.presenter && (
          <p className="text-sm text-muted">{lesson.presenter}</p>
        )}
      </div>

      {lesson.status === "planned" && (
        <div className="mb-4 rounded-lg border border-highyield/30 bg-highyield/10 p-3 text-sm">
          <span className="mono-label text-highyield">Demo </span>
          This is a template showing how an uploaded lecture becomes an
          interactive module. The transcript lines are placeholders. Add a video
          to <code className="seg-code">/public/media</code>, set the source, and
          replace the chapters, transcript, and checkpoints with the real talk.
        </div>
      )}

      <div className="grid gap-5 lg:grid-cols-[1.6fr_1fr]">
        {/* Player column */}
        <div>
          <div className="relative aspect-video overflow-hidden rounded-xl border border-line bg-black/40">
            {hasVideo ? (
              <video
                ref={videoRef}
                src={lesson.videoSrc}
                controls
                className="h-full w-full"
                onTimeUpdate={(e) =>
                  setCurrent((e.target as HTMLVideoElement).currentTime)
                }
              />
            ) : (
              <div className="flex h-full flex-col items-center justify-center gap-3 text-center text-muted">
                <Upload className="h-8 w-8" />
                <div className="text-sm">
                  No video attached yet.
                  <br />
                  Chapters, transcript, and checkpoints are shown so you can see
                  the layout.
                </div>
              </div>
            )}
          </div>

          {/* Checkpoints as a timeline */}
          <div className="mt-4">
            <div className="mono-label mb-2 flex items-center gap-1.5 text-muted">
              <CircleHelp className="h-3.5 w-3.5" /> Checkpoints
            </div>
            <div className="flex flex-wrap gap-2">
              {lesson.checkpoints.map((cp, i) => (
                <button
                  key={i}
                  onClick={() => {
                    setOpenCheckpoint(i);
                    setPicked(null);
                    seek(cp.atSec);
                  }}
                  className="inline-flex items-center gap-1.5 rounded-lg border border-line bg-surface px-3 py-1.5 text-sm hover:border-primary"
                >
                  <Play className="h-3.5 w-3.5" /> {fmt(cp.atSec)}
                </button>
              ))}
            </div>

            {openCheckpoint !== null && (
              <div className="mt-3 rounded-xl border border-primary/30 bg-primary/5 p-4">
                <p className="font-medium">
                  {lesson.checkpoints[openCheckpoint].question}
                </p>
                <div className="mt-3 space-y-2">
                  {lesson.checkpoints[openCheckpoint].options.map((opt, oi) => {
                    const ans = lesson.checkpoints[openCheckpoint].answerIndex;
                    const reveal = picked !== null;
                    let cls = "border-line bg-surface hover:border-primary";
                    if (reveal) {
                      if (oi === ans) cls = "border-success bg-success/10";
                      else if (oi === picked) cls = "border-safety bg-safety/10";
                      else cls = "border-line opacity-70";
                    }
                    return (
                      <button
                        key={oi}
                        onClick={() => setPicked(oi)}
                        disabled={reveal}
                        className={`flex w-full items-center justify-between rounded-lg border px-3 py-2 text-left text-sm ${cls}`}
                      >
                        <span>{opt}</span>
                        {reveal && oi === ans && (
                          <Check className="h-4 w-4 text-success" />
                        )}
                        {reveal && oi === picked && oi !== ans && (
                          <X className="h-4 w-4 text-safety" />
                        )}
                      </button>
                    );
                  })}
                </div>
                {picked !== null && (
                  <p className="mt-3 text-sm text-muted">
                    {lesson.checkpoints[openCheckpoint].explanation}
                  </p>
                )}
              </div>
            )}
          </div>
        </div>

        {/* Chapters + transcript column */}
        <div className="space-y-5">
          <div className="rounded-xl border border-line bg-surface p-4">
            <div className="mono-label mb-2 flex items-center gap-1.5 text-muted">
              <ListVideo className="h-3.5 w-3.5" /> Chapters
            </div>
            <ul className="space-y-1">
              {lesson.chapters.map((c, i) => {
                const active =
                  current >= c.startSec &&
                  (i === lesson.chapters.length - 1 ||
                    current < lesson.chapters[i + 1].startSec);
                return (
                  <li key={i}>
                    <button
                      onClick={() => seek(c.startSec)}
                      className={`flex w-full items-center justify-between rounded-lg px-2 py-1.5 text-left text-sm hover:bg-surface2 ${
                        active ? "text-primary" : ""
                      }`}
                    >
                      <span>{c.label}</span>
                      <span className="mono-label text-muted">{fmt(c.startSec)}</span>
                    </button>
                  </li>
                );
              })}
            </ul>
          </div>

          <div className="rounded-xl border border-line bg-surface p-4">
            <div className="mono-label mb-2 flex items-center gap-1.5 text-muted">
              <Search className="h-3.5 w-3.5" /> Transcript
            </div>
            <input
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search transcript..."
              className="mb-3 w-full rounded-lg border border-line bg-surface2 px-3 py-2 text-sm"
            />
            <div className="max-h-72 space-y-2 overflow-y-auto pr-1">
              {filteredTranscript.map((t, i) => (
                <button
                  key={i}
                  onClick={() => seek(t.startSec)}
                  className="flex w-full gap-2 rounded-lg px-2 py-1.5 text-left text-sm hover:bg-surface2"
                >
                  <span className="mono-label shrink-0 text-muted">
                    {fmt(t.startSec)}
                  </span>
                  <span className="text-muted">{t.text}</span>
                </button>
              ))}
              {filteredTranscript.length === 0 && (
                <p className="text-sm text-muted">No transcript lines match.</p>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
