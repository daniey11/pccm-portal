import type { ReactNode } from "react";
import {
  AlertTriangle,
  Sparkles,
  Info,
  Building2,
  FlaskConical,
  BookOpen,
  Lightbulb,
  XCircle,
  GraduationCap,
  Landmark,
  FileText,
  type LucideIcon,
} from "lucide-react";
import type {
  CalloutTone,
  ContentBlock,
  Domain,
  Level,
  Source,
} from "../types";
import { refById } from "../data/references";

// ---- Domain metadata ------------------------------------------------------
// Color encodes which clinical domain the reader is in. These token names line
// up with the Tailwind color config and the CSS variables.

export const domainMeta: Record<
  Domain,
  { label: string; token: string; short: string }
> = {
  foundations: { label: "Foundations", token: "foundations", short: "FND" },
  pulmonary: { label: "Pulmonary", token: "pulmonary", short: "PUL" },
  "critical-care": { label: "Critical Care", token: "critical", short: "ICU" },
  bronchoscopy: { label: "Bronchoscopy", token: "bronch", short: "BRO" },
  transplant: { label: "Lung Transplant", token: "transplant", short: "TXP" },
};

export function domainToken(d: Domain): string {
  return domainMeta[d].token;
}

// ---- Signature element: vital-signs waveform ------------------------------
// A pulse-oximetry / capnography style trace. Used in the hero and as section
// dividers. This is the one memorable, subject-specific flourish.

export function Waveform({
  className = "",
  height = 40,
  token = "primary",
  animated = true,
}: {
  className?: string;
  height?: number;
  token?: string;
  animated?: boolean;
}) {
  // One period of a pleth-like beat; repeated via pattern for width independence.
  const beat =
    "M0 20 L10 20 L14 19 L18 6 L22 30 L26 16 L30 20 L44 20 L48 19 L52 6 L56 30 L60 16 L64 20 L80 20";
  return (
    <svg
      className={className}
      width="100%"
      height={height}
      viewBox="0 0 80 40"
      preserveAspectRatio="none"
      fill="none"
      aria-hidden="true"
    >
      <defs>
        <linearGradient id="wf-fade" x1="0" x2="1" y1="0" y2="0">
          <stop offset="0" stopColor={`var(--${token})`} stopOpacity="0" />
          <stop offset="0.15" stopColor={`var(--${token})`} stopOpacity="0.9" />
          <stop offset="0.85" stopColor={`var(--${token})`} stopOpacity="0.9" />
          <stop offset="1" stopColor={`var(--${token})`} stopOpacity="0" />
        </linearGradient>
      </defs>
      <path
        d={beat}
        stroke="url(#wf-fade)"
        strokeWidth="1.4"
        strokeLinecap="round"
        strokeLinejoin="round"
        vectorEffect="non-scaling-stroke"
        className={animated ? "waveline" : ""}
        strokeDasharray={animated ? "2 0" : undefined}
      />
    </svg>
  );
}

// ---- Small labels & tags --------------------------------------------------

export function SegCode({ children }: { children: ReactNode }) {
  return <span className="seg-code">{children}</span>;
}

const sourceLabel: Record<Source, { label: string; token: string }> = {
  uploaded: { label: "Uploaded", token: "success" },
  institution: { label: "Institutional", token: "critical" },
  supplemental: { label: "Supplemental", token: "primary" },
};

export function SourceTag({ source }: { source: Source }) {
  const s = sourceLabel[source];
  return (
    <span
      className={`mono-label inline-flex items-center gap-1 rounded px-1.5 py-0.5 text-[0.62rem] bg-${s.token}/10 text-${s.token} border border-${s.token}/30`}
      title={
        source === "supplemental"
          ? "Standard published teaching with references"
          : source === "institution"
          ? "Local protocol or operational detail — confirm against your center"
          : "From an uploaded lecture or document"
      }
    >
      {s.label}
    </span>
  );
}

export function LevelBadge({ level }: { level: Level }) {
  const label = level[0].toUpperCase() + level.slice(1);
  return (
    <span className="mono-label rounded border border-line px-1.5 py-0.5 text-[0.62rem] text-muted">
      {label}
    </span>
  );
}

export function StatusDot({ seeded }: { seeded: boolean }) {
  return (
    <span
      className={`inline-block h-1.5 w-1.5 rounded-full ${
        seeded ? "bg-success" : "bg-muted/50"
      }`}
      aria-hidden="true"
    />
  );
}

// ---- Section header with mono eyebrow -------------------------------------

export function SectionHeader({
  eyebrow,
  title,
  children,
}: {
  eyebrow?: string;
  title: string;
  children?: ReactNode;
}) {
  return (
    <div className="mb-6">
      {eyebrow && (
        <div className="mono-label mb-2 text-muted">{eyebrow}</div>
      )}
      <h2 className="text-2xl font-semibold tracking-tight">{title}</h2>
      {children && <div className="mt-2 text-muted">{children}</div>}
    </div>
  );
}

// ---- Callouts -------------------------------------------------------------

const calloutMeta: Record<
  CalloutTone,
  { token: string; label: string; Icon: LucideIcon }
> = {
  safety: { token: "safety", label: "Safety", Icon: AlertTriangle },
  highYield: { token: "highyield", label: "High yield", Icon: Sparkles },
  info: { token: "primary", label: "Note", Icon: Info },
  institution: { token: "critical", label: "Varies by institution", Icon: Building2 },
  evidence: { token: "landmark", label: "Check current evidence", Icon: FlaskConical },
};

export function Callout({
  tone,
  children,
}: {
  tone: CalloutTone;
  children: ReactNode;
}) {
  const { token, label, Icon } = calloutMeta[tone];
  return (
    <div
      className={`my-4 rounded-lg border-l-4 border-${token} bg-${token}/10 p-4`}
    >
      <div className={`mono-label mb-1 flex items-center gap-1.5 text-${token}`}>
        <Icon className="h-3.5 w-3.5" />
        {label}
      </div>
      <div className="text-sm leading-relaxed">{children}</div>
    </div>
  );
}

// ---- Reference chip -------------------------------------------------------

export function RefChips({ refIds }: { refIds?: string[] }) {
  if (!refIds || refIds.length === 0) return null;
  return (
    <div className="mt-2 flex flex-wrap gap-1.5">
      {refIds.map((id) => {
        const r = refById[id];
        if (!r) return null;
        return (
          <span
            key={id}
            className="mono-label inline-flex items-center gap-1 rounded border border-line bg-surface2 px-1.5 py-0.5 text-[0.6rem] text-muted"
            title={r.citation}
          >
            <BookOpen className="h-3 w-3" />
            {r.label}
            {r.verifyCurrent && <span className="text-highyield">check current</span>}
          </span>
        );
      })}
    </div>
  );
}

// ---- Block renderer -------------------------------------------------------
// Renders a single ContentBlock into its distinct visual treatment.

const listIcon: Partial<Record<ContentBlock["type"], LucideIcon>> = {
  pearls: Lightbulb,
  pitfalls: XCircle,
  boardPearls: GraduationCap,
};

export function BlockRenderer({ block }: { block: ContentBlock }) {
  const chips = (
    <>
      <div className="mt-2 flex flex-wrap items-center gap-2">
        <SourceTag source={block.source} />
        {block.variesByInstitution && (
          <span className="mono-label rounded border border-critical/30 bg-critical/10 px-1.5 py-0.5 text-[0.6rem] text-critical">
            Varies by institution
          </span>
        )}
      </div>
      <RefChips refIds={block.refIds} />
    </>
  );

  switch (block.type) {
    case "prose":
      return (
        <div className="my-5">
          {block.heading && (
            <h3 className="mb-2 font-serif text-lg font-medium">{block.heading}</h3>
          )}
          <div className="prose-reading">
            <p>{block.body}</p>
          </div>
          {chips}
        </div>
      );

    case "objectives":
      return (
        <div className="my-5 rounded-lg border border-line bg-surface2/60 p-4">
          <div className="mono-label mb-2 flex items-center gap-1.5 text-primary">
            <GraduationCap className="h-3.5 w-3.5" /> Learning objectives
          </div>
          <ul className="ml-4 list-disc space-y-1 text-sm">
            {block.items?.map((it, i) => <li key={i}>{it}</li>)}
          </ul>
        </div>
      );

    case "keypoints":
    case "list": {
      return (
        <div className="my-5">
          {block.heading && (
            <h3 className="mb-2 font-serif text-lg font-medium">{block.heading}</h3>
          )}
          <ul className="ml-4 list-disc space-y-1.5 text-[0.95rem] leading-relaxed">
            {block.items?.map((it, i) => <li key={i}>{it}</li>)}
          </ul>
          {chips}
        </div>
      );
    }

    case "pearls":
    case "pitfalls":
    case "boardPearls": {
      const tokens: Record<string, string> = {
        pearls: "success",
        pitfalls: "safety",
        boardPearls: "landmark",
      };
      const labels: Record<string, string> = {
        pearls: "Clinical pearls",
        pitfalls: "Pitfalls",
        boardPearls: "Board pearls",
      };
      const token = tokens[block.type];
      const Icon = listIcon[block.type] ?? Lightbulb;
      return (
        <div className={`my-5 rounded-lg border border-${token}/30 bg-${token}/10 p-4`}>
          <div className={`mono-label mb-2 flex items-center gap-1.5 text-${token}`}>
            <Icon className="h-3.5 w-3.5" /> {labels[block.type]}
          </div>
          <ul className="ml-4 list-disc space-y-1.5 text-sm">
            {block.items?.map((it, i) => <li key={i}>{it}</li>)}
          </ul>
          {chips}
        </div>
      );
    }

    case "table":
      return (
        <div className="my-5 overflow-x-auto">
          {block.table?.caption && (
            <div className="mb-2 text-sm text-muted">{block.table.caption}</div>
          )}
          <table className="w-full border-collapse text-sm">
            <thead>
              <tr>
                {block.table?.headers.map((h, i) => (
                  <th
                    key={i}
                    className="border-b border-line bg-surface2 px-3 py-2 text-left font-semibold"
                  >
                    {h}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {block.table?.rows.map((row, ri) => (
                <tr key={ri} className="align-top">
                  {row.map((cell, ci) => (
                    <td key={ci} className="border-b border-line px-3 py-2">
                      {cell}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
          {chips}
        </div>
      );

    case "landmark":
      return (
        <div className="my-5 rounded-lg border border-landmark/30 bg-landmark/10 p-4">
          <div className="mono-label mb-1 flex items-center gap-1.5 text-landmark">
            <Landmark className="h-3.5 w-3.5" /> Landmark trial
          </div>
          <div className="font-serif text-base font-medium">{block.trial?.name}</div>
          <p className="mt-1 text-sm leading-relaxed">{block.trial?.takeaway}</p>
          <RefChips refIds={block.trial?.refId ? [block.trial.refId] : undefined} />
        </div>
      );

    case "guideline":
      return (
        <div className="my-5 rounded-lg border border-primary/30 bg-primary/10 p-4">
          <div className="mono-label mb-1 flex items-center gap-1.5 text-primary">
            <FileText className="h-3.5 w-3.5" /> Guideline · {block.guideline?.society}
          </div>
          <p className="text-sm leading-relaxed">{block.guideline?.summary}</p>
          <RefChips refIds={block.guideline?.refId ? [block.guideline.refId] : undefined} />
        </div>
      );

    case "callout":
      return (
        <Callout tone={block.callout ?? "info"}>
          {block.heading && <div className="mb-1 font-medium">{block.heading}</div>}
          {block.body}
          <RefChips refIds={block.refIds} />
        </Callout>
      );

    case "figure":
      return (
        <figure className="my-5 rounded-lg border border-dashed border-line bg-surface2/40 p-6 text-center">
          <div className="mono-label mb-2 text-muted">
            Figure placeholder · {block.figure?.kind}
          </div>
          <figcaption className="mx-auto max-w-reading text-sm text-muted">
            {block.figure?.describe}
          </figcaption>
          <div className="mt-2 text-xs text-muted/70">
            No image is fabricated. Add a faculty-approved figure here.
          </div>
        </figure>
      );

    default:
      return null;
  }
}
