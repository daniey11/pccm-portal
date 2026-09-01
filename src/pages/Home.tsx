import {
  Activity,
  Wind,
  HeartPulse,
  Stethoscope,
  Replace,
  ArrowRight,
  Layers,
  GraduationCap,
  BookMarked,
  type LucideIcon,
} from "lucide-react";
import { modules, curriculumStats } from "../data/modules";
import { Waveform, domainMeta, StatusDot } from "../components/ui";
import { useProgress, totalFlashcards } from "../lib/progress";

const icons: Record<string, LucideIcon> = {
  Activity,
  Wind,
  HeartPulse,
  Stethoscope,
  Replace,
};

export function Home({ onNavigate }: { onNavigate: (route: string) => void }) {
  const stats = curriculumStats();
  const { state, dueCards } = useProgress();
  const due = dueCards().length;
  const visited = state.visitedLessons.length;

  return (
    <div>
      {/* Hero */}
      <section className="relative overflow-hidden rounded-2xl border border-line bg-surface">
        <div className="pointer-events-none absolute inset-0 opacity-[0.18]">
          <div className="absolute inset-x-0 top-1/2 -translate-y-1/2">
            <Waveform token="primary" height={180} />
          </div>
        </div>
        <div className="relative px-6 py-12 sm:px-10 sm:py-16">
          <div className="mono-label mb-3 text-primary">
            Pulmonary & Critical Care · Fellowship Learning Portal
          </div>
          <h1 className="max-w-3xl font-serif text-4xl font-semibold leading-tight sm:text-5xl">
            One place to learn the lung and the ICU, from day one through
            graduation.
          </h1>
          <p className="mt-4 max-w-2xl text-lg text-muted">
            A living curriculum that combines conference lectures, bronchoscopy
            and transplant teaching, board review, and evidence-based reference
            into a single searchable platform. Built to grow as you add material.
          </p>
          <div className="mt-6 flex flex-wrap gap-3">
            <button
              onClick={() => onNavigate("#/module/mod-critical")}
              className="inline-flex items-center gap-2 rounded-lg bg-primary px-5 py-2.5 font-medium text-white hover:opacity-90"
            >
              Start learning <ArrowRight className="h-4 w-4" />
            </button>
            <button
              onClick={() => onNavigate("#/search")}
              className="inline-flex items-center gap-2 rounded-lg border border-line bg-surface px-5 py-2.5 font-medium hover:border-primary"
            >
              Search the knowledge base
            </button>
          </div>
        </div>
      </section>

      {/* Dashboard strip */}
      <section className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <Stat label="Modules" value={stats.modules} sub={`${stats.topics} topics mapped`} />
        <Stat label="Lessons seeded" value={stats.lessons} sub={`${stats.seededTopics} topics with content`} />
        <button
          onClick={() => onNavigate("#/flashcards?due=1")}
          className="card p-4 text-left transition hover:border-primary"
        >
          <div className="mono-label text-muted">Due for review</div>
          <div className="mt-1 text-3xl font-semibold">{due}</div>
          <div className="mt-1 flex items-center gap-1 text-xs text-muted">
            <Layers className="h-3.5 w-3.5" /> of {totalFlashcards} cards
          </div>
        </button>
        <Stat label="Lessons opened" value={visited} sub="tracked on this device" />
      </section>

      {/* Modules */}
      <section className="mt-10">
        <div className="mb-4 flex items-end justify-between">
          <div>
            <div className="mono-label text-muted">Curriculum</div>
            <h2 className="text-2xl font-semibold">Core modules</h2>
          </div>
          <button
            onClick={() => onNavigate("#/faculty")}
            className="hidden text-sm text-muted hover:text-primary sm:inline"
          >
            Faculty review queue →
          </button>
        </div>

        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {modules.map((m) => {
            const Icon = icons[m.icon] ?? Activity;
            const token = domainMeta[m.domain].token;
            const seeded = m.topics.filter((t) => t.status === "seeded").length;
            return (
              <button
                key={m.id}
                onClick={() => onNavigate(`#/module/${m.id}`)}
                className={`group card overflow-hidden p-0 text-left transition hover:border-${token}`}
              >
                <div className={`flex items-center gap-3 border-b border-line bg-${token}/10 px-5 py-4`}>
                  <span className={`grid h-10 w-10 place-items-center rounded-lg bg-${token}/20 text-${token}`}>
                    <Icon className="h-5 w-5" />
                  </span>
                  <div>
                    <div className="font-semibold">{m.title}</div>
                    <div className="mono-label text-muted">
                      {m.topics.length} topics · {seeded} seeded
                    </div>
                  </div>
                </div>
                <div className="px-5 py-4">
                  <p className="text-sm text-muted">{m.blurb}</p>
                  <div className="mt-3 flex flex-wrap gap-1.5">
                    {m.topics.slice(0, 4).map((t) => (
                      <span
                        key={t.id}
                        className="inline-flex items-center gap-1 rounded border border-line px-1.5 py-0.5 text-[0.68rem] text-muted"
                      >
                        <StatusDot seeded={t.status === "seeded"} />
                        {t.title}
                      </span>
                    ))}
                    {m.topics.length > 4 && (
                      <span className="text-[0.68rem] text-muted">
                        +{m.topics.length - 4} more
                      </span>
                    )}
                  </div>
                </div>
              </button>
            );
          })}
        </div>
      </section>

      {/* Quick access */}
      <section className="mt-10 grid gap-4 sm:grid-cols-3">
        <Quick
          onClick={() => onNavigate("#/quiz")}
          Icon={GraduationCap}
          title="Question bank"
          blurb="Learn, practice, and test modes with explanations."
        />
        <Quick
          onClick={() => onNavigate("#/teaching")}
          Icon={BookMarked}
          title="Teaching mode"
          blurb="Generate a handout or chalk-talk from any lesson."
        />
        <Quick
          onClick={() => onNavigate("#/multimedia")}
          Icon={Wind}
          title="Lecture player"
          blurb="Turn uploaded talks into interactive modules."
        />
      </section>
    </div>
  );
}

function Stat({ label, value, sub }: { label: string; value: number; sub: string }) {
  return (
    <div className="card p-4">
      <div className="mono-label text-muted">{label}</div>
      <div className="mt-1 text-3xl font-semibold">{value}</div>
      <div className="mt-1 text-xs text-muted">{sub}</div>
    </div>
  );
}

function Quick({
  onClick,
  Icon,
  title,
  blurb,
}: {
  onClick: () => void;
  Icon: LucideIcon;
  title: string;
  blurb: string;
}) {
  return (
    <button
      onClick={onClick}
      className="card flex items-start gap-3 p-4 text-left transition hover:border-primary"
    >
      <span className="grid h-9 w-9 shrink-0 place-items-center rounded-lg bg-primary/10 text-primary">
        <Icon className="h-4.5 w-4.5" />
      </span>
      <div>
        <div className="font-medium">{title}</div>
        <div className="text-sm text-muted">{blurb}</div>
      </div>
    </button>
  );
}
