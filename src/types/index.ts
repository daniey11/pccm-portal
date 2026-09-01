// ---------------------------------------------------------------------------
// Content model for the PCCM Learning Portal.
//
// Everything the learner sees is data. Components render these types, so new
// lectures, topics, quiz questions, and guidelines are added by editing data
// files, never by rewriting components. That is what keeps the portal modular
// and expandable across a fellowship.
// ---------------------------------------------------------------------------

export type Domain =
  | "foundations"
  | "pulmonary"
  | "critical-care"
  | "bronchoscopy"
  | "transplant";

export type Level = "beginner" | "intermediate" | "advanced";

/**
 * Provenance. Every content item declares where it came from so a learner can
 * always tell institutional material apart from external evidence.
 *  - uploaded:     from a lecture/document the fellow uploaded
 *  - institution:  local protocol or operational detail
 *  - supplemental: standard published teaching, carrying real references
 */
export type Source = "uploaded" | "institution" | "supplemental";

/**
 * Authoring status. "seeded" topics carry real content today. "planned" topics
 * are scaffolded slots in the curriculum map, waiting on an upload or authoring
 * pass. The UI shows this honestly rather than faking completeness.
 */
export type ContentStatus = "seeded" | "planned";

export type RefKind = "guideline" | "trial" | "review" | "textbook" | "consensus";

export interface Reference {
  id: string;
  label: string; // short human label, e.g. "ARDSNet ARMA (2000)"
  kind: RefKind;
  society?: string; // ATS, CHEST, ISHLT, SCCM, ERS, Fleischner, GOLD, GINA...
  year?: number;
  citation: string; // full text citation
  url?: string;
  /** True when the reader must confirm they are looking at the current version
   *  (guidelines that update on a cycle). */
  verifyCurrent?: boolean;
}

// ---- Content blocks -------------------------------------------------------
// A lesson is an ordered list of blocks. Block types map to distinct visual
// treatments (pearls vs pitfalls vs landmark trials, etc).

export type BlockType =
  | "prose"
  | "objectives"
  | "keypoints"
  | "list"
  | "table"
  | "pearls"
  | "pitfalls"
  | "boardPearls"
  | "landmark"
  | "guideline"
  | "callout"
  | "figure";

export type CalloutTone =
  | "safety"
  | "highYield"
  | "info"
  | "institution"
  | "evidence";

export interface TableData {
  caption?: string;
  headers: string[];
  rows: string[][];
}

export interface FigurePlaceholder {
  /** Names the exact image/diagram a faculty-approved figure should show.
   *  No real patient images are fabricated. */
  describe: string;
  kind: "diagram" | "endoscopic" | "imaging" | "waveform" | "chart";
}

export interface ContentBlock {
  type: BlockType;
  heading?: string;
  /** For prose/callout: paragraph text. */
  body?: string;
  /** For list/objectives/keypoints/pearls/pitfalls/boardPearls: bullet items. */
  items?: string[];
  /** For landmark: a trial highlight. */
  trial?: { name: string; takeaway: string; refId?: string };
  /** For guideline: a society recommendation summary. */
  guideline?: { society: string; summary: string; refId?: string };
  table?: TableData;
  figure?: FigurePlaceholder;
  callout?: CalloutTone;
  source: Source;
  /** Flags shown as chips on the block. */
  variesByInstitution?: boolean;
  refIds?: string[];
}

// ---- Lessons, topics, modules --------------------------------------------

export interface Lesson {
  id: string;
  moduleId: string;
  topicId: string;
  title: string;
  summary: string;
  level: Level;
  domain: Domain;
  status: ContentStatus;
  source: Source;
  objectives: string[];
  blocks: ContentBlock[];
  refIds: string[];
  /** Optional links into the practice systems. */
  quizTopicId?: string;
  flashcardTopic?: string;
  /** Free-text keywords to strengthen search. */
  keywords?: string[];
}

export interface Topic {
  id: string;
  moduleId: string;
  title: string;
  blurb: string;
  level: Level;
  status: ContentStatus;
  lessonIds: string[];
}

export interface Module {
  id: string;
  domain: Domain;
  title: string;
  blurb: string;
  /** lucide icon name resolved in the module registry component. */
  icon: string;
  topics: Topic[];
}

// ---- Practice systems -----------------------------------------------------

export type QuizMode = "learn" | "practice" | "test";

export interface QuizQuestion {
  id: string;
  domain: Domain;
  topicId: string; // groups questions by teaching topic
  level: Level;
  stem: string;
  options: string[];
  answerIndex: number;
  explanation: string;
  hint?: string; // shown in Learn mode
  source: Source;
  refIds?: string[];
}

export interface Flashcard {
  id: string;
  domain: Domain;
  topic: string;
  front: string;
  back: string;
  source: Source;
  refIds?: string[];
}

export interface CaseStep {
  prompt: string;
  options: string[];
  answerIndex: number;
  explanation: string;
}

export interface ClinicalCase {
  id: string;
  domain: Domain;
  title: string;
  level: Level;
  presentation: string;
  steps: CaseStep[];
  keyPoints: string[];
  commonMistakes: string[];
  source: Source;
  refIds?: string[];
}

// ---- Multimedia (uploaded lectures) --------------------------------------

export interface VideoChapter {
  label: string;
  startSec: number;
}

export interface TranscriptCue {
  startSec: number;
  text: string;
}

export interface VideoCheckpoint {
  atSec: number;
  question: string;
  options: string[];
  answerIndex: number;
  explanation: string;
}

export interface MultimediaLesson {
  id: string;
  moduleId: string;
  domain: Domain;
  title: string;
  presenter?: string;
  /** Path under /media once a lecture is uploaded. Empty = awaiting upload. */
  videoSrc?: string;
  status: ContentStatus;
  chapters: VideoChapter[];
  transcript: TranscriptCue[];
  checkpoints: VideoCheckpoint[];
  objectives: string[];
  source: Source;
}

// ---- Progress / adaptive learning ----------------------------------------

export interface QuizAttempt {
  quizTopicId: string;
  correct: number;
  total: number;
  at: number; // epoch ms
}

/** Leitner spaced-repetition state per flashcard. */
export interface SRSCard {
  id: string;
  box: number; // 1..5
  due: number; // epoch ms
  lapses: number;
}

export interface ProgressState {
  version: number;
  theme: "light" | "dark";
  level: Level;
  visitedLessons: string[];
  bookmarks: string[];
  quizAttempts: QuizAttempt[];
  questionResults: Record<string, boolean>; // questionId -> lastCorrect
  srs: Record<string, SRSCard>;
}
