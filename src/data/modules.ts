import type { Module, Topic, ContentStatus, Level } from "../types";
import { lessonsByTopic } from "./lessons";

// ---------------------------------------------------------------------------
// The curriculum map. This lays out the whole portal the way the fellowship
// spec describes it. Topics that carry real lessons today are "seeded". The
// rest are "planned": honest scaffold slots waiting on an uploaded lecture or
// an authoring pass. The UI shows the difference rather than faking coverage.
//
// A planned topic becomes seeded the moment a lesson is added to it in a domain
// file. Nothing else needs to change.
// ---------------------------------------------------------------------------

type TopicSeed = {
  id: string;
  title: string;
  blurb: string;
  level: Level;
  /** Omit when the topic should derive its status from whether lessons exist. */
  status?: ContentStatus;
};

function buildTopics(moduleId: string, seeds: TopicSeed[]): Topic[] {
  return seeds.map((s) => {
    const lessons = lessonsByTopic[s.id] ?? [];
    const status: ContentStatus =
      s.status ?? (lessons.length > 0 ? "seeded" : "planned");
    return {
      id: s.id,
      moduleId,
      title: s.title,
      blurb: s.blurb,
      level: s.level,
      status,
      lessonIds: lessons.map((l) => l.id),
    };
  });
}

export const modules: Module[] = [
  {
    id: "mod-foundations",
    domain: "foundations",
    title: "Foundations & Physiology",
    blurb:
      "The shared physiology the rest of the portal builds on: gas exchange, oxygen delivery, acid-base, and mechanics.",
    icon: "Activity",
    topics: buildTopics("mod-foundations", [
      { id: "topic-gas-exchange", title: "Gas exchange & hypoxemia", blurb: "The five mechanisms and how to separate them.", level: "beginner" },
      { id: "topic-oxygen-delivery", title: "Oxygen delivery", blurb: "Flow, hemoglobin, and saturation as the three levers.", level: "beginner" },
      { id: "topic-acid-base", title: "Acid-base disorders", blurb: "A stepwise approach to primary disorders and compensation.", level: "beginner" },
      { id: "topic-resp-mechanics", title: "Respiratory mechanics", blurb: "Compliance, resistance, and the pressure-volume relationship.", level: "intermediate" },
      { id: "topic-exercise-phys", title: "Exercise physiology", blurb: "The integrated response and cardiopulmonary exercise testing.", level: "advanced" },
    ]),
  },
  {
    id: "mod-pulmonary",
    domain: "pulmonary",
    title: "Pulmonary Medicine",
    blurb:
      "Airways, parenchyma, pleura, vasculature, and sleep, from clinic to the reading room.",
    icon: "Wind",
    topics: buildTopics("mod-pulmonary", [
      { id: "topic-nodules", title: "Lung nodules", blurb: "A structured approach to the incidental nodule.", level: "intermediate" },
      { id: "topic-copd", title: "COPD", blurb: "Diagnosis and the GOLD framework.", level: "beginner" },
      { id: "topic-pft", title: "Pulmonary function testing", blurb: "Reading obstruction, restriction, and diffusion.", level: "intermediate" },
      { id: "topic-asthma", title: "Asthma", blurb: "Diagnosis, control, and the GINA approach.", level: "beginner" },
      { id: "topic-ild", title: "Interstitial lung disease", blurb: "Pattern-based diagnosis and the multidisciplinary discussion.", level: "advanced" },
      { id: "topic-ph", title: "Pulmonary hypertension", blurb: "Classification, workup, and group-specific management.", level: "advanced" },
      { id: "topic-lung-cancer", title: "Lung cancer", blurb: "Diagnosis, staging, and treatment overview.", level: "intermediate" },
      { id: "topic-pleural", title: "Pleural disease", blurb: "Effusions, the diagnostic tap, and pneumothorax.", level: "intermediate" },
      { id: "topic-sleep", title: "Sleep medicine", blurb: "Sleep-disordered breathing and testing.", level: "beginner" },
      { id: "topic-pulm-infection", title: "Pulmonary infections", blurb: "Pneumonia, TB, and non-tuberculous mycobacteria.", level: "beginner" },
      { id: "topic-thoracic-imaging", title: "Thoracic imaging", blurb: "A systematic read of the chest radiograph and CT.", level: "beginner" },
    ]),
  },
  {
    id: "mod-critical",
    domain: "critical-care",
    title: "Critical Care",
    blurb:
      "The ICU curriculum: resuscitation, organ support, and the syndromes that fill the unit.",
    icon: "HeartPulse",
    topics: buildTopics("mod-critical", [
      { id: "topic-ards", title: "ARDS", blurb: "Definition and lung-protective management.", level: "intermediate" },
      { id: "topic-shock", title: "Shock", blurb: "Four categories and their hemodynamic profiles.", level: "intermediate" },
      { id: "topic-mech-vent", title: "Mechanical ventilation", blurb: "Modes and the first settings.", level: "beginner" },
      { id: "topic-sepsis", title: "Sepsis", blurb: "Sepsis-3 definitions and bundle-based care.", level: "beginner" },
      { id: "topic-ecmo", title: "ECMO", blurb: "Configurations, indications, and management principles.", level: "advanced" },
      { id: "topic-sedation", title: "Sedation & analgesia", blurb: "Light sedation, delirium, and daily awakening.", level: "beginner" },
      { id: "topic-icu-us", title: "ICU ultrasound", blurb: "Focused cardiac, lung, and vascular assessment.", level: "intermediate" },
      { id: "topic-procedures", title: "ICU procedures", blurb: "Lines, airways, and drains with safety checks.", level: "beginner" },
      { id: "topic-hemodynamics", title: "Hemodynamics", blurb: "Monitoring and interpretation at the bedside.", level: "intermediate" },
      { id: "topic-aki", title: "Acute kidney injury", blurb: "Recognition, causes, and renal support.", level: "intermediate" },
      { id: "topic-acid-base-icu", title: "ICU acid-base", blurb: "Complex disorders in the critically ill.", level: "advanced" },
      { id: "topic-nutrition", title: "Nutrition", blurb: "Timing, route, and targets in critical illness.", level: "beginner" },
      { id: "topic-icu-infection", title: "ICU infections", blurb: "Nosocomial infection and stewardship.", level: "intermediate" },
      { id: "topic-neuro-cc", title: "Neurologic critical care", blurb: "Brain injury, status, and neuroprognostication.", level: "advanced" },
      { id: "topic-tox", title: "Toxicology", blurb: "Common poisonings and antidotes.", level: "intermediate" },
    ]),
  },
  {
    id: "mod-bronchoscopy",
    domain: "bronchoscopy",
    title: "Bronchoscopy",
    blurb:
      "A full airway curriculum: anatomy, the systematic exam, sampling, EBUS, and pathology. Pairs with the interactive airway atlas.",
    icon: "Stethoscope",
    topics: buildTopics("mod-bronchoscopy", [
      { id: "topic-airway-anatomy", title: "Airway anatomy", blurb: "The tree in the order you see it.", level: "beginner" },
      { id: "topic-systematic-exam", title: "Systematic exam", blurb: "A repeatable airway survey.", level: "beginner" },
      { id: "topic-bal", title: "Bronchoalveolar lavage", blurb: "Technique and interpretation.", level: "intermediate" },
      { id: "topic-ebus", title: "EBUS-TBNA", blurb: "Staging and diagnosis with ultrasound.", level: "advanced" },
      { id: "topic-scope-orientation", title: "Scope orientation", blurb: "Handling, torque, and staying oriented.", level: "beginner" },
      { id: "topic-biopsy", title: "Biopsy techniques", blurb: "Transbronchial and endobronchial sampling.", level: "intermediate" },
      { id: "topic-cryo", title: "Cryobiopsy overview", blurb: "Where cryobiopsy fits and its trade-offs.", level: "advanced" },
      { id: "topic-bronch-path", title: "Common pathology", blurb: "Recognizing findings on inspection.", level: "intermediate" },
      { id: "topic-bronch-cases", title: "Case-based interpretation", blurb: "Reasoning through real airway scenarios.", level: "intermediate" },
    ]),
  },
  {
    id: "mod-transplant",
    domain: "transplant",
    title: "Lung Transplant Medicine",
    blurb:
      "A dedicated curriculum from candidate selection through long-term allograft care, organized by fellow level.",
    icon: "Replace",
    topics: buildTopics("mod-transplant", [
      { id: "topic-candidate", title: "Candidate evaluation & referral", blurb: "Who and when to refer, and the evaluation.", level: "beginner" },
      { id: "topic-pgd", title: "Primary graft dysfunction", blurb: "Early allograft injury and its grading.", level: "intermediate" },
      { id: "topic-clad", title: "Chronic lung allograft dysfunction", blurb: "BOS and RAS phenotypes.", level: "advanced" },
      { id: "topic-immunosuppression", title: "Immunosuppression", blurb: "The maintenance backbone and its toxicities.", level: "intermediate" },
      { id: "topic-rejection", title: "Acute rejection & surveillance", blurb: "Grading and the role of bronchoscopy.", level: "advanced" },
      { id: "topic-operative", title: "Operative principles", blurb: "Single vs bilateral, donor selection, size matching.", level: "beginner" },
      { id: "topic-post-tx-icu", title: "Immediate post-transplant ICU", blurb: "Early management and complications.", level: "intermediate" },
      { id: "topic-tx-infection", title: "Opportunistic infection", blurb: "Prophylaxis and the timeline of risk.", level: "advanced" },
      { id: "topic-tx-airway", title: "Airway complications", blurb: "Anastomotic problems and their management.", level: "advanced" },
      { id: "topic-longterm", title: "Long-term follow-up", blurb: "Surveillance, vaccination, and malignancy screening.", level: "intermediate" },
    ]),
  },
];

export const moduleById: Record<string, Module> = Object.fromEntries(
  modules.map((m) => [m.id, m])
);

export const topicById: Record<string, Topic> = Object.fromEntries(
  modules.flatMap((m) => m.topics).map((t) => [t.id, t])
);

// Simple portal-wide counts for the home dashboard.
export function curriculumStats() {
  const topics = modules.flatMap((m) => m.topics);
  const seededTopics = topics.filter((t) => t.status === "seeded");
  const lessons = topics.flatMap((t) => t.lessonIds);
  return {
    modules: modules.length,
    topics: topics.length,
    seededTopics: seededTopics.length,
    lessons: lessons.length,
  };
}
