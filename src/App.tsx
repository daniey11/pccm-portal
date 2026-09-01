import { useEffect, useState } from "react";
import {
  Activity,
  Wind,
  HeartPulse,
  Stethoscope,
  Replace,
  Search,
  GraduationCap,
  Layers,
  Stethoscope as CaseIcon,
  BookMarked,
  Video,
  TrendingUp,
  BookOpen,
  ShieldCheck,
  UploadCloud,
  Moon,
  Sun,
  Menu,
  X,
  type LucideIcon,
} from "lucide-react";
import { modules } from "./data/modules";
import { lessonById } from "./data/lessons";
import { multimediaLessons, multimediaById } from "./data/multimedia";
import { useProgress } from "./lib/progress";
import { Waveform, domainMeta } from "./components/ui";
import { LessonView } from "./components/LessonView";
import { QuizEngine } from "./components/QuizEngine";
import { Flashcards } from "./components/Flashcards";
import { TeachingMode } from "./components/TeachingMode";
import { VideoLesson } from "./components/VideoLesson";
import { Home } from "./pages/Home";
import { ModuleView } from "./pages/ModuleView";
import { SearchPage } from "./pages/SearchPage";
import { ProgressPage } from "./pages/ProgressPage";
import { ReferencesPage } from "./pages/ReferencesPage";
import { FacultyReview } from "./pages/FacultyReview";
import { CasesPage } from "./pages/CasesPage";
import { AuthoringGuide } from "./pages/AuthoringGuide";

const moduleIcons: Record<string, LucideIcon> = {
  Activity,
  Wind,
  HeartPulse,
  Stethoscope,
  Replace,
};

// ---- Tiny hash router -----------------------------------------------------
interface Route {
  path: string; // e.g. "lesson", "module", ""
  param?: string; // e.g. lesson id
  query: URLSearchParams;
}

function parseHash(): Route {
  const raw = window.location.hash.replace(/^#\/?/, "");
  const [pathPart, queryPart] = raw.split("?");
  const segments = pathPart.split("/").filter(Boolean);
  return {
    path: segments[0] ?? "",
    param: segments[1],
    query: new URLSearchParams(queryPart ?? ""),
  };
}

export default function App() {
  const [route, setRoute] = useState<Route>(parseHash());
  const [menuOpen, setMenuOpen] = useState(false);
  const { state, toggleTheme } = useProgress();

  useEffect(() => {
    const onHash = () => {
      setRoute(parseHash());
      setMenuOpen(false);
      window.scrollTo({ top: 0 });
    };
    window.addEventListener("hashchange", onHash);
    return () => window.removeEventListener("hashchange", onHash);
  }, []);

  const navigate = (to: string) => {
    if (to.startsWith("#")) window.location.hash = to.slice(1);
    else window.location.hash = to;
  };

  return (
    <div className="relative z-10 flex min-h-screen">
      <a
        href="#main"
        className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:z-50 focus:rounded focus:bg-primary focus:px-3 focus:py-2 focus:text-white"
      >
        Skip to content
      </a>

      {/* Sidebar */}
      <Sidebar
        route={route}
        navigate={navigate}
        open={menuOpen}
        onClose={() => setMenuOpen(false)}
        theme={state.theme}
        toggleTheme={toggleTheme}
      />

      {/* Main column */}
      <div className="flex min-w-0 flex-1 flex-col">
        {/* Mobile top bar */}
        <header className="sticky top-0 z-30 flex items-center justify-between border-b border-line bg-ink/80 px-4 py-3 backdrop-blur lg:hidden">
          <button
            onClick={() => setMenuOpen(true)}
            className="inline-flex items-center gap-2 text-sm"
            aria-label="Open menu"
          >
            <Menu className="h-5 w-5" /> Menu
          </button>
          <span className="font-serif font-semibold">PCCM Portal</span>
          <button onClick={toggleTheme} aria-label="Toggle theme">
            {state.theme === "dark" ? (
              <Sun className="h-5 w-5" />
            ) : (
              <Moon className="h-5 w-5" />
            )}
          </button>
        </header>

        <main id="main" className="mx-auto w-full max-w-5xl flex-1 px-4 py-8 sm:px-6 lg:px-10">
          <PageBody route={route} navigate={navigate} />
        </main>

        <footer className="border-t border-line px-4 py-6 text-center text-xs text-muted sm:px-10">
          PCCM Fellowship Learning Portal · A living curriculum. Seeded content is
          standard teaching for faculty review, not a substitute for it. Confirm
          guidelines and local protocols before clinical use.
        </footer>
      </div>
    </div>
  );
}

// ---- Sidebar --------------------------------------------------------------

function Sidebar({
  route,
  navigate,
  open,
  onClose,
  theme,
  toggleTheme,
}: {
  route: Route;
  navigate: (to: string) => void;
  open: boolean;
  onClose: () => void;
  theme: "light" | "dark";
  toggleTheme: () => void;
}) {
  const tools: { icon: LucideIcon; label: string; route: string; key: string }[] = [
    { icon: Search, label: "Search", route: "#/search", key: "search" },
    { icon: GraduationCap, label: "Question bank", route: "#/quiz", key: "quiz" },
    { icon: Layers, label: "Flashcards", route: "#/flashcards", key: "flashcards" },
    { icon: CaseIcon, label: "Cases", route: "#/cases", key: "cases" },
    { icon: BookMarked, label: "Teaching mode", route: "#/teaching", key: "teaching" },
    { icon: Video, label: "Lecture player", route: "#/multimedia", key: "multimedia" },
    { icon: TrendingUp, label: "Progress", route: "#/progress", key: "progress" },
    { icon: BookOpen, label: "References", route: "#/references", key: "references" },
    { icon: ShieldCheck, label: "Faculty review", route: "#/faculty", key: "faculty" },
    { icon: UploadCloud, label: "Add material", route: "#/upload", key: "upload" },
  ];

  const isActive = (key: string, param?: string) => {
    if (key === "module") return route.path === "module" && route.param === param;
    return route.path === key;
  };

  return (
    <>
      {open && (
        <div
          className="fixed inset-0 z-40 bg-black/50 lg:hidden"
          onClick={onClose}
          aria-hidden="true"
        />
      )}
      <aside
        className={`fixed inset-y-0 left-0 z-50 flex w-72 flex-col border-r border-line bg-surface transition-transform lg:sticky lg:top-0 lg:z-auto lg:h-screen lg:translate-x-0 ${
          open ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <div className="flex items-center justify-between px-5 pb-3 pt-5">
          <button
            onClick={() => navigate("#/")}
            className="text-left"
          >
            <div className="font-serif text-lg font-semibold leading-tight">
              PCCM Portal
            </div>
            <div className="mono-label text-muted">Fellowship Learning</div>
          </button>
          <button className="lg:hidden" onClick={onClose} aria-label="Close menu">
            <X className="h-5 w-5" />
          </button>
        </div>
        <div className="px-5">
          <Waveform token="primary" height={18} />
        </div>

        <nav className="mt-3 flex-1 space-y-6 overflow-y-auto px-3 pb-6">
          <div>
            <div className="mono-label px-2 pb-2 text-muted">Modules</div>
            <ul className="space-y-0.5">
              {modules.map((m) => {
                const Icon = moduleIcons[m.icon] ?? Activity;
                const token = domainMeta[m.domain].token;
                const active = isActive("module", m.id);
                return (
                  <li key={m.id}>
                    <button
                      onClick={() => navigate(`#/module/${m.id}`)}
                      className={`flex w-full items-center gap-2.5 rounded-lg px-2.5 py-2 text-sm transition ${
                        active
                          ? `bg-${token}/10 text-${token}`
                          : "hover:bg-surface2"
                      }`}
                    >
                      <Icon className={`h-4 w-4 text-${token}`} />
                      <span className="truncate">{m.title}</span>
                    </button>
                  </li>
                );
              })}
            </ul>
          </div>

          <div>
            <div className="mono-label px-2 pb-2 text-muted">Study & tools</div>
            <ul className="space-y-0.5">
              {tools.map((t) => {
                const active = isActive(t.key);
                return (
                  <li key={t.key}>
                    <button
                      onClick={() => navigate(t.route)}
                      className={`flex w-full items-center gap-2.5 rounded-lg px-2.5 py-2 text-sm transition ${
                        active ? "bg-primary/10 text-primary" : "hover:bg-surface2"
                      }`}
                    >
                      <t.icon className="h-4 w-4" />
                      <span>{t.label}</span>
                    </button>
                  </li>
                );
              })}
            </ul>
          </div>
        </nav>

        <div className="hidden border-t border-line p-3 lg:block">
          <button
            onClick={toggleTheme}
            className="flex w-full items-center gap-2.5 rounded-lg px-2.5 py-2 text-sm hover:bg-surface2"
          >
            {theme === "dark" ? (
              <>
                <Sun className="h-4 w-4" /> Light mode
              </>
            ) : (
              <>
                <Moon className="h-4 w-4" /> Dark mode
              </>
            )}
          </button>
        </div>
      </aside>
    </>
  );
}

// ---- Page body dispatch ---------------------------------------------------

function PageBody({ route, navigate }: { route: Route; navigate: (to: string) => void }) {
  switch (route.path) {
    case "":
      return <Home onNavigate={navigate} />;

    case "module":
      return <ModuleView moduleId={route.param ?? ""} onNavigate={navigate} />;

    case "lesson": {
      const lesson = route.param ? lessonById[route.param] : undefined;
      if (!lesson) return <NotFound navigate={navigate} />;
      return <LessonView lesson={lesson} onNavigate={navigate} />;
    }

    case "quiz": {
      const topic = route.query.get("topic") ?? undefined;
      return (
        <div>
          <div className="mono-label mb-2 text-muted">Question bank</div>
          <h1 className="mb-6 font-serif text-3xl font-semibold">
            {topic ? "Topic questions" : "Practice questions"}
          </h1>
          <QuizEngine topicFilter={topic} />
        </div>
      );
    }

    case "flashcards": {
      const topic = route.query.get("topic") ?? undefined;
      const dueOnly = route.query.get("due") === "1";
      return (
        <div>
          <div className="mono-label mb-2 text-muted">Spaced repetition</div>
          <h1 className="mb-6 font-serif text-3xl font-semibold">
            {dueOnly ? "Due for review" : topic ? `${topic} cards` : "Flashcards"}
          </h1>
          <Flashcards topicFilter={topic} dueOnly={dueOnly} />
        </div>
      );
    }

    case "cases":
      return <CasesPage />;

    case "teaching": {
      const lessonParam = route.query.get("lesson") ?? undefined;
      return (
        <div>
          <div className="mono-label mb-2 text-muted">Teaching mode</div>
          <h1 className="mb-6 font-serif text-3xl font-semibold">
            Handouts & chalk talks
          </h1>
          <TeachingMode lessonId={lessonParam} />
        </div>
      );
    }

    case "multimedia": {
      if (route.param) {
        const mm = multimediaById[route.param];
        if (!mm) return <NotFound navigate={navigate} />;
        return <VideoLesson lesson={mm} />;
      }
      return (
        <div>
          <div className="mono-label mb-2 text-muted">Multimedia</div>
          <h1 className="mb-6 font-serif text-3xl font-semibold">Lecture player</h1>
          <div className="grid gap-4 md:grid-cols-2">
            {multimediaLessons.map((mm) => (
              <button
                key={mm.id}
                onClick={() => navigate(`#/multimedia/${mm.id}`)}
                className="card p-5 text-left transition hover:border-primary"
              >
                <div className="mono-label mb-1 text-muted">
                  {domainMeta[mm.domain].label}
                </div>
                <h3 className="font-semibold">{mm.title}</h3>
                {mm.presenter && (
                  <p className="mt-1 text-sm text-muted">{mm.presenter}</p>
                )}
                <p className="mt-2 text-sm text-primary">Open player →</p>
              </button>
            ))}
          </div>
        </div>
      );
    }

    case "search":
      return (
        <SearchPage initialQuery={route.query.get("q") ?? ""} onNavigate={navigate} />
      );

    case "progress":
      return <ProgressPage onNavigate={navigate} />;

    case "references":
      return <ReferencesPage />;

    case "faculty":
      return <FacultyReview onNavigate={navigate} />;

    case "upload":
      return <AuthoringGuide />;

    default:
      return <NotFound navigate={navigate} />;
  }
}

function NotFound({ navigate }: { navigate: (to: string) => void }) {
  return (
    <div className="py-16 text-center">
      <h1 className="font-serif text-2xl font-semibold">Page not found</h1>
      <p className="mt-2 text-muted">That link does not point anywhere yet.</p>
      <button
        onClick={() => navigate("#/")}
        className="mt-4 rounded-lg bg-primary px-4 py-2 text-sm font-medium text-white"
      >
        Back to home
      </button>
    </div>
  );
}
