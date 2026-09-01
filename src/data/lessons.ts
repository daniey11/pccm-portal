import type { Lesson } from "../types";
import { foundationsLessons } from "./foundations/lessons";
import { pulmonaryLessons } from "./pulmonary/lessons";
import { criticalCareLessons } from "./criticalcare/lessons";
import { transplantLessons } from "./transplant/lessons";
import { bronchoscopyLessons } from "./bronchoscopy/lessons";

// Single source of truth for every seeded lesson. Adding a lesson to any domain
// file surfaces it in the module map, search index, and progress system with no
// other wiring.
export const allLessons: Lesson[] = [
  ...foundationsLessons,
  ...pulmonaryLessons,
  ...criticalCareLessons,
  ...transplantLessons,
  ...bronchoscopyLessons,
];

export const lessonById: Record<string, Lesson> = Object.fromEntries(
  allLessons.map((l) => [l.id, l])
);

export const lessonsByTopic: Record<string, Lesson[]> = allLessons.reduce(
  (acc, l) => {
    (acc[l.topicId] ||= []).push(l);
    return acc;
  },
  {} as Record<string, Lesson[]>
);
