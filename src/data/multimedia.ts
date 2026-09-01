import type { MultimediaLesson } from "../types";

// ---------------------------------------------------------------------------
// Multimedia lessons turn an uploaded lecture into an interactive module:
// chapters, a searchable transcript, and quiz checkpoints that pause the video.
//
// No real lecture has been uploaded yet, so the entry below is a labeled DEMO.
// It shows exactly how a lecture will render. The transcript lines are
// placeholders describing the feature, NOT a transcript of any real talk. The
// checkpoints use real, cited teaching so the checkpoint UI is meaningful.
//
// To turn this into a real lesson: drop the video file in /public/media, set
// videoSrc, replace the chapters/transcript/checkpoints with the real content,
// and set status to "seeded". See README for the step-by-step.
// ---------------------------------------------------------------------------

export const multimediaLessons: MultimediaLesson[] = [
  {
    id: "mm-demo-ards",
    moduleId: "mod-critical",
    domain: "critical-care",
    title: "Lecture player demo — how an uploaded talk becomes a module",
    presenter: "Template (awaiting your upload)",
    videoSrc: "", // empty = awaiting upload; the player shows an upload prompt
    status: "planned",
    objectives: [
      "See how chapters let a learner jump to a section.",
      "See how the transcript becomes searchable and clickable.",
      "See how a checkpoint pauses the video to check understanding.",
    ],
    chapters: [
      { label: "Introduction & objectives", startSec: 0 },
      { label: "Definitions and framework", startSec: 120 },
      { label: "Core evidence", startSec: 420 },
      { label: "Bedside application", startSec: 900 },
      { label: "Summary & questions", startSec: 1500 },
    ],
    transcript: [
      { startSec: 0, text: "[Placeholder] This line represents a transcript cue. Once a lecture is uploaded, real transcript text appears here and becomes searchable." },
      { startSec: 120, text: "[Placeholder] Clicking any transcript line jumps the video to that moment." },
      { startSec: 420, text: "[Placeholder] Transcript search lets a learner find every mention of a term across the talk." },
      { startSec: 900, text: "[Placeholder] Annotations and slides can be shown alongside the video at the matching timestamp." },
      { startSec: 1500, text: "[Placeholder] The closing section can link straight into the related quiz and flashcards." },
    ],
    checkpoints: [
      {
        atSec: 300,
        question: "Checkpoint: which P/F range with PEEP >= 5 defines moderate ARDS by the Berlin definition?",
        options: ["200-300", "100-200", "<= 100", "> 300"],
        answerIndex: 1,
        explanation: "Moderate ARDS is a P/F of 100-200. This is a real checkpoint example; a real lecture's checkpoints are authored the same way.",
      },
      {
        atSec: 1200,
        question: "Checkpoint: tidal volume in lung-protective ventilation is dosed to which weight?",
        options: ["Actual body weight", "Predicted body weight", "Adjusted body weight", "Ideal weight by BMI"],
        answerIndex: 1,
        explanation: "Predicted body weight, from height and sex. Dosing to actual weight overshoots the protective target.",
      },
    ],
    source: "supplemental",
  },
];

export const multimediaById: Record<string, MultimediaLesson> = Object.fromEntries(
  multimediaLessons.map((m) => [m.id, m])
);
