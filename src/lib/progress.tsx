import {
  createContext,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from "react";
import type { Level, ProgressState, SRSCard } from "../types";
import { flashcards } from "../data/flashcards";

// ---------------------------------------------------------------------------
// Progress + adaptive learning. All state persists in localStorage under a
// versioned key. Spaced repetition uses a Leitner box scheme: a correct review
// promotes a card to a longer interval, a miss sends it back to box 1.
// ---------------------------------------------------------------------------

const STORAGE_KEY = "pccm-portal:v1";
const DAY = 24 * 60 * 60 * 1000;
// Interval in days for each Leitner box (index 0 unused).
const BOX_INTERVALS = [0, 1, 3, 7, 16];

function prefersDark(): boolean {
  if (typeof window === "undefined") return true;
  return !window.matchMedia?.("(prefers-color-scheme: light)").matches;
}

function defaultState(): ProgressState {
  return {
    version: 1,
    theme: prefersDark() ? "dark" : "light",
    level: "beginner",
    visitedLessons: [],
    bookmarks: [],
    quizAttempts: [],
    questionResults: {},
    srs: {},
  };
}

function load(): ProgressState {
  if (typeof window === "undefined") return defaultState();
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    if (!raw) return defaultState();
    const parsed = JSON.parse(raw) as Partial<ProgressState>;
    return { ...defaultState(), ...parsed };
  } catch {
    return defaultState();
  }
}

interface ProgressContextValue {
  state: ProgressState;
  setLevel: (level: Level) => void;
  toggleTheme: () => void;
  visitLesson: (id: string) => void;
  toggleBookmark: (id: string) => void;
  isBookmarked: (id: string) => boolean;
  recordQuiz: (quizTopicId: string, correct: number, total: number) => void;
  recordQuestion: (questionId: string, correct: boolean) => void;
  ensureCards: (ids: string[]) => void;
  reviewCard: (id: string, remembered: boolean) => void;
  dueCards: () => string[];
  weakTopics: () => { topicId: string; correct: number; total: number }[];
  resetAll: () => void;
}

const ProgressContext = createContext<ProgressContextValue | null>(null);

export function ProgressProvider({ children }: { children: ReactNode }) {
  const [state, setState] = useState<ProgressState>(load);

  // Persist on every change.
  useEffect(() => {
    try {
      window.localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
    } catch {
      /* storage may be unavailable; app still works in-session */
    }
  }, [state]);

  // Reflect theme on <html> so CSS variables switch.
  useEffect(() => {
    const root = document.documentElement;
    if (state.theme === "dark") root.classList.add("dark");
    else root.classList.remove("dark");
  }, [state.theme]);

  const value = useMemo<ProgressContextValue>(() => {
    const setLevel = (level: Level) => setState((s) => ({ ...s, level }));

    const toggleTheme = () =>
      setState((s) => ({ ...s, theme: s.theme === "dark" ? "light" : "dark" }));

    const visitLesson = (id: string) =>
      setState((s) =>
        s.visitedLessons.includes(id)
          ? s
          : { ...s, visitedLessons: [...s.visitedLessons, id] }
      );

    const toggleBookmark = (id: string) =>
      setState((s) => ({
        ...s,
        bookmarks: s.bookmarks.includes(id)
          ? s.bookmarks.filter((b) => b !== id)
          : [...s.bookmarks, id],
      }));

    const recordQuiz = (quizTopicId: string, correct: number, total: number) =>
      setState((s) => ({
        ...s,
        quizAttempts: [
          ...s.quizAttempts,
          { quizTopicId, correct, total, at: Date.now() },
        ],
      }));

    const recordQuestion = (questionId: string, correct: boolean) =>
      setState((s) => ({
        ...s,
        questionResults: { ...s.questionResults, [questionId]: correct },
      }));

    const ensureCards = (ids: string[]) =>
      setState((s) => {
        const srs = { ...s.srs };
        let changed = false;
        for (const id of ids) {
          if (!srs[id]) {
            srs[id] = { id, box: 1, due: Date.now(), lapses: 0 };
            changed = true;
          }
        }
        return changed ? { ...s, srs } : s;
      });

    const reviewCard = (id: string, remembered: boolean) =>
      setState((s) => {
        const existing: SRSCard = s.srs[id] ?? {
          id,
          box: 1,
          due: Date.now(),
          lapses: 0,
        };
        const box = remembered
          ? Math.min(existing.box + 1, BOX_INTERVALS.length - 1)
          : 1;
        const next: SRSCard = {
          id,
          box,
          due: Date.now() + BOX_INTERVALS[box] * DAY,
          lapses: remembered ? existing.lapses : existing.lapses + 1,
        };
        return { ...s, srs: { ...s.srs, [id]: next } };
      });

    const dueCards = () => {
      const now = Date.now();
      return Object.values(state.srs)
        .filter((c) => c.due <= now)
        .map((c) => c.id);
    };

    const weakTopics = () => {
      // Aggregate the most recent attempt per topic into a simple accuracy view.
      const byTopic: Record<string, { correct: number; total: number }> = {};
      for (const a of state.quizAttempts) {
        byTopic[a.quizTopicId] = { correct: a.correct, total: a.total };
      }
      return Object.entries(byTopic)
        .map(([topicId, v]) => ({ topicId, ...v }))
        .filter((t) => t.total > 0 && t.correct / t.total < 0.7)
        .sort((a, b) => a.correct / a.total - b.correct / b.total);
    };

    const resetAll = () => setState(defaultState());

    return {
      state,
      setLevel,
      toggleTheme,
      visitLesson,
      toggleBookmark,
      isBookmarked: (id: string) => state.bookmarks.includes(id),
      recordQuiz,
      recordQuestion,
      ensureCards,
      reviewCard,
      dueCards,
      weakTopics,
      resetAll,
    };
  }, [state]);

  return (
    <ProgressContext.Provider value={value}>{children}</ProgressContext.Provider>
  );
}

export function useProgress(): ProgressContextValue {
  const ctx = useContext(ProgressContext);
  if (!ctx) throw new Error("useProgress must be used within ProgressProvider");
  return ctx;
}

// Convenience: total cards available in the deck (for dashboards).
export const totalFlashcards = flashcards.length;
