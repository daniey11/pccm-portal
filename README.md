# PCCM Fellowship Learning Portal

A living, interactive learning platform for Pulmonary and Critical Care Medicine
fellowship. It brings the curriculum, board-style questions, flashcards with
spaced repetition, clinical cases, teaching tools, and an evidence-based
reference base into one searchable place. It is built to grow as you add your
own lectures, protocols, and images.

## What this is (and is not)

This is a working, honest scaffold, not a finished textbook.

- The full curriculum is mapped. Every module and topic is visible, including
  Pulmonary, Critical Care, Bronchoscopy, Lung Transplant, and Foundations.
- Topics are marked either **seeded** (real, cited teaching content is in place)
  or **planned** (the scaffold is ready and waiting for your material).
- Seeded clinical content is standard teaching tied to a named society or
  landmark trial (ATS, CHEST, ISHLT, SCCM, ERS, and the trials behind them). It
  is a starting point for faculty review, not a replacement for it.
- Nothing is fabricated. No invented citations, no made-up figures. Figure slots
  are placeholders that describe what image belongs there. Guideline specifics
  that change over time are flagged to confirm against the current version.
- Anything that varies by institution is flagged as such.

The **Faculty review** page compiles all of these flags automatically so a
reviewer can see exactly what to confirm before the portal is used for teaching.

## Tech stack

- React 18 + TypeScript
- Vite build
- Tailwind CSS (dark mode first, with a light mode toggle)
- lucide-react icons
- No backend. Progress is stored locally in the browser (localStorage).

## Getting started

You need Node.js 18 or newer.

```bash
npm install
npm run dev      # start the dev server (hot reload)
npm run build    # type-check and build for production into dist/
npm run preview  # serve the production build locally
```

Open the URL Vite prints (usually http://localhost:5173).

## How it is organized

```
src/
  data/               All content lives here as plain data files.
    references.ts     The single source of truth for citations.
    foundations/      Seeded lessons per domain.
    criticalcare/
    pulmonary/
    transplant/
    bronchoscopy/
    lessons.ts        Aggregates all lessons.
    modules.ts        The curriculum map: modules, topics, seeded vs planned.
    quiz.ts           Question bank.
    flashcards.ts     Flashcard decks.
    cases.ts          Clinical cases.
    multimedia.ts     Lecture-player lessons (video + transcript + checkpoints).
  components/         Reusable UI and the interactive engines.
  pages/             One file per screen.
  lib/               Progress/spaced-repetition state and the search index.
  types/             Shared TypeScript types.
```

The key idea: **content is data**. Adding material means editing a data file,
not touching components. New content shows up across the portal automatically,
including in search.

## Adding your material

The in-app **Add material** page covers this too. Quick version:

### Add a lesson
Edit the domain file in `src/data/<domain>/lessons.ts`. Add a lesson object and
give it a `topicId` that matches a topic in `modules.ts`. The topic flips from
planned to seeded automatically. Build the lesson from content blocks (prose,
key points, tables, pearls, pitfalls, board pearls, landmark trials, guidelines,
callouts, figure placeholders). Tag each block with its `source`:
- `uploaded` for content from your own lectures or documents
- `institution` for local protocol or operational detail
- `supplemental` for standard published teaching

Cite by adding reference IDs from `references.ts`.

### Add quiz questions
Edit `src/data/quiz.ts`. Add a question with a `topicId` that matches a lesson's
`quizTopicId`. Include the stem, options, correct index, explanation, and an
optional hint. It appears in the question bank and on the matching lesson.

### Add flashcards
Edit `src/data/flashcards.ts`. Add cards with a `topic` matching a lesson's
`flashcardTopic`. Cards join the spaced-repetition scheduler automatically.

### Turn an uploaded lecture into an interactive module
1. Put the video file in `public/media/`.
2. In `src/data/multimedia.ts`, set `videoSrc` to that path.
3. Add chapters (label + start time), transcript cues (time + text), and
   checkpoints (a question that pauses the video).
4. Set `status` to `seeded`.

You get chapter navigation, a searchable transcript, and checkpoint questions
with no extra work. There is a labeled demo module in place so you can see the
layout before uploading anything.

### Add a topic or a whole module
Edit `src/data/modules.ts`. Add a topic to a module's list, or add a new module.
Topics with no lessons render as planned scaffolds until you author into them.

## Adding references

Add an entry to `src/data/references.ts` with a stable `id`, a short `label`, the
society, year, kind, and full citation. Set `verifyCurrent: true` for living
guidelines so the portal reminds everyone to confirm the current version. Then
reference the `id` from any lesson, question, flashcard, or case.

## A note on safety and review

Before using this for teaching, walk the **Faculty review** page. It lists:
- Content that varies by institution (confirm against your center)
- Content tied to guidelines that update (confirm the current version)
- Figure placeholders that need a real, approved image

Uploaded institutional material always takes precedence over supplemental
teaching content for local practice.
