import { Building2, FlaskConical, Image, ShieldCheck } from "lucide-react";
import { allLessons } from "../data/lessons";
import { refById } from "../data/references";

// This page is generated from the content itself. It surfaces everything a
// faculty reviewer should confirm before the portal is used for teaching:
// content that varies by institution, anything tied to a guideline that
// updates, and figure slots that need a real, approved image.

export function FacultyReview({ onNavigate }: { onNavigate: (route: string) => void }) {
  const institutionFlags: { lessonId: string; title: string; note: string }[] = [];
  const currentFlags: { lessonId: string; title: string; refLabel: string }[] = [];
  const figureFlags: { lessonId: string; title: string; describe: string }[] = [];

  for (const l of allLessons) {
    for (const b of l.blocks) {
      if (b.variesByInstitution) {
        institutionFlags.push({
          lessonId: l.id,
          title: l.title,
          note: b.body ?? b.heading ?? "Institution-variable content",
        });
      }
      if (b.figure) {
        figureFlags.push({
          lessonId: l.id,
          title: l.title,
          describe: b.figure.describe,
        });
      }
    }
    for (const id of l.refIds) {
      const r = refById[id];
      if (r?.verifyCurrent) {
        currentFlags.push({ lessonId: l.id, title: l.title, refLabel: r.label });
      }
    }
  }

  return (
    <div>
      <div className="mono-label mb-2 text-muted">Quality & safety</div>
      <h1 className="mb-2 font-serif text-3xl font-semibold">Faculty review queue</h1>
      <p className="mb-6 max-w-reading text-muted">
        The portal is built to be honest about its limits. This page lists what a
        faculty reviewer should confirm before it is used for teaching. It is
        assembled automatically from the content, so it stays current as lessons
        are added.
      </p>

      <div className="mb-8 grid gap-4 sm:grid-cols-3">
        <Stat Icon={Building2} label="Institution-variable" n={institutionFlags.length} token="critical" />
        <Stat Icon={FlaskConical} label="Confirm current version" n={currentFlags.length} token="landmark" />
        <Stat Icon={Image} label="Figures to supply" n={figureFlags.length} token="primary" />
      </div>

      <Group
        Icon={Building2}
        title="Confirm against your institution"
        blurb="These points vary by center. Replace with your local protocol values."
        empty="No institution-variable flags."
        items={institutionFlags.map((f) => ({
          lessonId: f.lessonId,
          title: f.title,
          detail: f.note,
        }))}
        onNavigate={onNavigate}
      />

      <Group
        Icon={FlaskConical}
        title="Confirm the current guideline version"
        blurb="These lessons rely on guidelines that update on a cycle."
        empty="No current-version flags."
        items={currentFlags.map((f) => ({
          lessonId: f.lessonId,
          title: f.title,
          detail: `Tied to: ${f.refLabel}`,
        }))}
        onNavigate={onNavigate}
      />

      <Group
        Icon={Image}
        title="Figures to supply"
        blurb="No images are fabricated. Add faculty-approved figures in these slots."
        empty="No figure placeholders."
        items={figureFlags.map((f) => ({
          lessonId: f.lessonId,
          title: f.title,
          detail: f.describe,
        }))}
        onNavigate={onNavigate}
      />

      <div className="mt-8 flex items-start gap-2 rounded-lg border border-success/30 bg-success/10 p-4 text-sm">
        <ShieldCheck className="mt-0.5 h-4 w-4 shrink-0 text-success" />
        <span>
          Seeded clinical content reflects standard teaching tied to the named
          society or trial. It is a starting point for your review, not a
          substitute for it. Uploaded institutional material always takes
          precedence for local practice.
        </span>
      </div>
    </div>
  );
}

function Stat({
  Icon,
  label,
  n,
  token,
}: {
  Icon: typeof Building2;
  label: string;
  n: number;
  token: string;
}) {
  return (
    <div className={`card p-4 border-${token}/30`}>
      <div className={`mono-label flex items-center gap-1.5 text-${token}`}>
        <Icon className="h-3.5 w-3.5" /> {label}
      </div>
      <div className="mt-1 text-3xl font-semibold">{n}</div>
    </div>
  );
}

function Group({
  Icon,
  title,
  blurb,
  empty,
  items,
  onNavigate,
}: {
  Icon: typeof Building2;
  title: string;
  blurb: string;
  empty: string;
  items: { lessonId: string; title: string; detail: string }[];
  onNavigate: (route: string) => void;
}) {
  return (
    <section className="mt-8">
      <h2 className="mb-1 flex items-center gap-2 text-lg font-semibold">
        <Icon className="h-5 w-5 text-muted" /> {title}
      </h2>
      <p className="mb-3 text-sm text-muted">{blurb}</p>
      {items.length === 0 ? (
        <div className="card p-4 text-sm text-muted">{empty}</div>
      ) : (
        <div className="space-y-2">
          {items.map((it, i) => (
            <button
              key={i}
              onClick={() => onNavigate(`#/lesson/${it.lessonId}`)}
              className="card block w-full p-3 text-left transition hover:border-primary"
            >
              <div className="text-sm font-medium">{it.title}</div>
              <div className="mt-0.5 text-sm text-muted">{it.detail}</div>
            </button>
          ))}
        </div>
      )}
    </section>
  );
}
