import { Upload, FileCode, Video, HelpCircle, Layers, Boxes } from "lucide-react";

// A plain-language guide to expanding the portal. The point of the modular
// architecture is that adding content never means rewriting components.

export function AuthoringGuide() {
  return (
    <div>
      <div className="mono-label mb-2 text-muted">Grow the portal</div>
      <h1 className="mb-2 font-serif text-3xl font-semibold">Adding your material</h1>
      <p className="mb-6 max-w-reading text-muted">
        The portal is data-driven. Every lesson, question, flashcard, and lecture
        is a plain data file. Adding content means editing data, not rebuilding
        the site. Here is where each type lives.
      </p>

      <Card
        Icon={FileCode}
        title="Add a lesson"
        path="src/data/<domain>/lessons.ts"
      >
        <p>
          Add a lesson object to the domain array (foundations, pulmonary,
          criticalcare, transplant, or bronchoscopy). Give it a{" "}
          <code className="seg-code">topicId</code> that matches a topic in the
          module map. The topic flips from planned to seeded automatically once a
          lesson points to it.
        </p>
        <p className="mt-2">
          Build the lesson from content blocks: prose, key points, tables,
          pearls, pitfalls, board pearls, landmark trials, guidelines, callouts,
          and figure placeholders. Tag each block with its source (uploaded,
          institution, or supplemental) and any references.
        </p>
      </Card>

      <Card
        Icon={HelpCircle}
        title="Add quiz questions"
        path="src/data/quiz.ts"
      >
        <p>
          Add question objects with a <code className="seg-code">topicId</code>{" "}
          that matches a lesson's <code className="seg-code">quizTopicId</code>.
          Include the stem, options, the correct index, an explanation, and an
          optional Learn-mode hint. Questions appear in the bank and on the
          matching lesson automatically.
        </p>
      </Card>

      <Card Icon={Layers} title="Add flashcards" path="src/data/flashcards.ts">
        <p>
          Add cards with a <code className="seg-code">topic</code> matching a
          lesson's <code className="seg-code">flashcardTopic</code>. New cards
          join the spaced-repetition deck the first time they are studied.
        </p>
      </Card>

      <Card
        Icon={Video}
        title="Turn an uploaded lecture into a module"
        path="src/data/multimedia.ts  +  public/media/"
      >
        <ol className="ml-4 list-decimal space-y-1">
          <li>Drop the video file into <code className="seg-code">public/media/</code>.</li>
          <li>
            Set <code className="seg-code">videoSrc</code> to that path in a
            multimedia lesson object.
          </li>
          <li>
            Add chapters (label + start time), transcript cues (time + text), and
            checkpoints (a question that pauses the video).
          </li>
          <li>
            Set <code className="seg-code">status</code> to{" "}
            <code className="seg-code">seeded</code>.
          </li>
        </ol>
        <p className="mt-2">
          The player then gives you chapter jumps, a searchable transcript, and
          checkpoint questions with no extra work.
        </p>
      </Card>

      <Card Icon={Boxes} title="Add a topic or module" path="src/data/modules.ts">
        <p>
          Add a topic seed to a module's list, or add a whole new module object.
          Topics with no lessons show as planned scaffolds until you author into
          them. This is how the full curriculum map stays visible while content
          fills in over time.
        </p>
      </Card>

      <div className="mt-6 flex items-start gap-2 rounded-lg border border-primary/30 bg-primary/10 p-4 text-sm">
        <Upload className="mt-0.5 h-4 w-4 shrink-0 text-primary" />
        <span>
          When you share lecture files, protocols, or images, the fastest path is
          to hand them over with the topic they belong to. Each becomes a lesson
          or a multimedia module in the matching section, tagged as uploaded or
          institutional so it is always distinguishable from external evidence.
        </span>
      </div>
    </div>
  );
}

function Card({
  Icon,
  title,
  path,
  children,
}: {
  Icon: typeof Upload;
  title: string;
  path: string;
  children: React.ReactNode;
}) {
  return (
    <div className="card mb-4 p-5">
      <div className="flex items-center gap-2">
        <Icon className="h-5 w-5 text-primary" />
        <h2 className="font-semibold">{title}</h2>
      </div>
      <div className="mono-label mt-1 text-muted">{path}</div>
      <div className="mt-3 text-sm leading-relaxed text-muted">{children}</div>
    </div>
  );
}
