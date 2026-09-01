import { BookOpen, AlertTriangle } from "lucide-react";
import { references } from "../data/references";

const kindLabel: Record<string, string> = {
  guideline: "Guidelines",
  consensus: "Consensus statements",
  trial: "Landmark trials",
  review: "Reviews",
  textbook: "Texts",
};

export function ReferencesPage() {
  const byKind = references.reduce(
    (acc, r) => {
      (acc[r.kind] ||= []).push(r);
      return acc;
    },
    {} as Record<string, typeof references>
  );

  const order = ["guideline", "consensus", "trial", "review", "textbook"];

  return (
    <div>
      <div className="mono-label mb-2 text-muted">Evidence base</div>
      <h1 className="mb-2 font-serif text-3xl font-semibold">References</h1>
      <p className="mb-6 max-w-reading text-muted">
        Every seeded lesson cites from this list. Living guidelines are marked so
        you always confirm the current published version before relying on
        specifics.
      </p>

      <div className="mb-6 flex items-center gap-2 rounded-lg border border-highyield/30 bg-highyield/10 p-3 text-sm">
        <AlertTriangle className="h-4 w-4 shrink-0 text-highyield" />
        <span>
          Items flagged{" "}
          <span className="mono-label text-highyield">confirm current</span>{" "}
          update on a cycle. Check the society's latest release before teaching
          the specifics.
        </span>
      </div>

      <div className="space-y-8">
        {order.map((kind) => {
          const items = byKind[kind];
          if (!items) return null;
          return (
            <section key={kind}>
              <h2 className="mono-label mb-3 text-primary">
                {kindLabel[kind] ?? kind}
              </h2>
              <div className="space-y-3">
                {items.map((r) => (
                  <div key={r.id} className="card p-4">
                    <div className="flex items-start gap-2">
                      <BookOpen className="mt-0.5 h-4 w-4 shrink-0 text-muted" />
                      <div>
                        <div className="flex flex-wrap items-center gap-2">
                          <span className="font-medium">{r.label}</span>
                          {r.society && (
                            <span className="mono-label rounded border border-line px-1.5 py-0.5 text-[0.6rem] text-muted">
                              {r.society}
                            </span>
                          )}
                          {r.verifyCurrent && (
                            <span className="mono-label rounded border border-highyield/30 bg-highyield/10 px-1.5 py-0.5 text-[0.6rem] text-highyield">
                              confirm current
                            </span>
                          )}
                        </div>
                        <p className="mt-1 text-sm text-muted">{r.citation}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </section>
          );
        })}
      </div>
    </div>
  );
}
