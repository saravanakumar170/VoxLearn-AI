// ─── Types ────────────────────────────────────────────────────────────────────
export type Role = "student" | "teacher" | "admin";

export type AuthState = "landing" | "login" | "register" | "onboarding" | "diagnosis" | "app";

export type StudentScreen =
  | "dashboard" | "tutor" | "courses" | "course-player"
  | "knowledge-graph" | "assessment" | "assessment-results"
  | "gamification" | "goal-roadmap" | "projects"
  | "mentor" | "peers" | "profile" | "design-system";

export type TeacherScreen =
  | "t-dashboard" | "t-students" | "t-curriculum" | "t-assessments" | "t-analytics";

export type AdminScreen =
  | "a-dashboard" | "a-cohorts" | "a-curriculum" | "a-users" | "a-integrations";

export type Screen = StudentScreen | TeacherScreen | AdminScreen;

// ─── Icons ────────────────────────────────────────────────────────────────────
export const IconPaths = {
  home: "M3 9l9-7 9 7v11a2 2 0 01-2 2H5a2 2 0 01-2-2z M9 22V12h6v10",
  tutor: "M21 15a2 2 0 01-2 2H7l-4 4V5a2 2 0 012-2h14a2 2 0 012 2z",
  book: "M2 3h6a4 4 0 014 4v14a3 3 0 00-3-3H2z M22 3h-6a4 4 0 00-4 4v14a3 3 0 013-3h7z",
  brain: "M12 2a5 5 0 015 5v1a5 5 0 01-5 5 5 5 0 01-5-5V7a5 5 0 015-5z M12 13v9",
  assess: "M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4",
  trophy: "M6 9H4.5a2.5 2.5 0 010-5H6 M18 9h1.5a2.5 2.5 0 000-5H18 M4 22h16 M10 14.66V17c0 .55-.47.98-.97 1.21C7.85 18.75 7 20.24 7 22 M14 14.66V17c0 .55.47.98.97 1.21C16.15 18.75 17 20.24 17 22 M18 2H6v7a6 6 0 0012 0V2z",
  map: "M1 6v16l7-4 8 4 7-4V2l-7 4-8-4-7 4z M8 2v16 M16 6v16",
  folder: "M3 7v10a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-6l-2-2H5a2 2 0 00-2 2z",
  users: "M17 21v-2a4 4 0 00-4-4H5a4 4 0 00-4 4v2 M23 21v-2a4 4 0 00-3-3.87 M16 3.13a4 4 0 010 7.75",
  user: "M20 21v-2a4 4 0 00-4-4H8a4 4 0 00-4 4v2 M12 11a4 4 0 100-8 4 4 0 000 8z",
  settings: "M12 15a3 3 0 100-6 3 3 0 000 6z M19.4 15a1.65 1.65 0 00.33 1.82l.06.06a2 2 0 010 2.83 2 2 0 01-2.83 0l-.06-.06a1.65 1.65 0 00-1.82-.33 1.65 1.65 0 00-1 1.51V21a2 2 0 01-4 0v-.09A1.65 1.65 0 009 19.4a1.65 1.65 0 00-1.82.33l-.06.06a2 2 0 01-2.83-2.83l.06-.06A1.65 1.65 0 004.68 15a1.65 1.65 0 00-1.51-1H3a2 2 0 010-4h.09A1.65 1.65 0 004.6 9a1.65 1.65 0 00-.33-1.82l-.06-.06a2 2 0 012.83-2.83l.06.06A1.65 1.65 0 009 4.68a1.65 1.65 0 001-1.51V3a2 2 0 014 0v.09a1.65 1.65 0 001 1.51 1.65 1.65 0 001.82-.33l.06-.06a2 2 0 012.83 2.83l-.06.06A1.65 1.65 0 0019.4 9a1.65 1.65 0 001.51 1H21a2 2 0 010 4h-.09a1.65 1.65 0 00-1.51 1z",
  bell: "M18 8A6 6 0 006 8c0 7-3 9-3 9h18s-3-2-3-9 M13.73 21a2 2 0 01-3.46 0",
  search: "M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z",
  mic: "M12 1a3 3 0 00-3 3v8a3 3 0 006 0V4a3 3 0 00-3-3z M19 10v2a7 7 0 01-14 0v-2 M12 19v4 M8 23h8",
  send: "M22 2L11 13 M22 2L15 22l-4-9-9-4 22-7z",
  attach: "M21.44 11.05l-9.19 9.19a6 6 0 01-8.49-8.49l9.19-9.19a4 4 0 015.66 5.66l-9.2 9.19a2 2 0 01-2.83-2.83l8.49-8.48",
  zap: "M13 2L3 14h9l-1 8 10-12h-9l1-8z",
  check: "M20 6L9 17l-5-5",
  chevronRight: "M9 18l6-6-6-6",
  chevronLeft: "M15 18l-6-6 6-6",
  chevronDown: "M6 9l6 6 6-6",
  x: "M18 6L6 18M6 6l12 12",
  plus: "M12 5v14M5 12h14",
  play: "M5 3l14 9-14 9V3z",
  clock: "M12 22a10 10 0 100-20 10 10 0 000 20z M12 6v6l4 2",
  star: "M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z",
  layers: "M12 2L2 7l10 5 10-5-10-5z M2 17l10 5 10-5 M2 12l10 5 10-5",
  alertTriangle: "M10.29 3.86L1.82 18a2 2 0 001.71 3h16.94a2 2 0 001.71-3L13.71 3.86a2 2 0 00-3.42 0z M12 9v4 M12 17h.01",
  trendUp: "M23 6l-9.5 9.5-5-5L1 18 M17 6h6v6",
  shield: "M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z",
  cpu: "M18 4H6a2 2 0 00-2 2v12a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2z M9 9h6v6H9z M9 1v3M15 1v3M9 20v3M15 20v3M20 9h3M20 15h3M1 9h3M1 15h3",
  code: "M16 18l6-6-6-6 M8 6l-6 6 6 6",
  refresh: "M23 4v6h-6 M1 20v-6h6 M3.51 9a9 9 0 0114.85-3.36L23 10M1 14l4.64 4.36A9 9 0 0020.49 15",
  download: "M21 15v4a2 2 0 01-2 2H5a2 2 0 01-2-2v-4 M7 10l5 5 5-5 M12 15V3",
  upload: "M21 15v4a2 2 0 01-2 2H5a2 2 0 01-2-2v-4 M17 8l-5-5-5 5 M12 3v12",
  filter: "M22 3H2l8 9.46V19l4 2v-8.54L22 3z",
  award: "M12 15a7 7 0 100-14 7 7 0 000 14z M8.21 13.89L7 23l5-3 5 3-1.21-9.12",
  target: "M12 22a10 10 0 100-20 10 10 0 000 20z M12 18a6 6 0 100-12 6 6 0 000 12z M12 14a2 2 0 100-4 2 2 0 000 4z",
  barChart: "M18 20V10 M12 20V4 M6 20v-6",
  database: "M12 2a9 3 0 019 3v14a9 3 0 01-18 0V5a9 3 0 019-3z M3 5c0 1.657 4.03 3 9 3s9-1.343 9-3",
  lock: "M19 11H5a2 2 0 00-2 2v7a2 2 0 002 2h14a2 2 0 002-2v-7a2 2 0 00-2-2z M7 11V7a5 5 0 0110 0v4",
  eye: "M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z M12 12m-3 0a3 3 0 106 0 3 3 0 00-6 0",
  eyeOff: "M17.94 17.94A10.07 10.07 0 0112 20c-7 0-11-8-11-8a18.45 18.45 0 015.06-5.94M9.9 4.24A9.12 9.12 0 0112 4c7 0 11 8 11 8a18.5 18.5 0 01-2.16 3.19m-6.72-1.07a3 3 0 11-4.24-4.24 M1 1l22 22",
  mail: "M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z M22 6l-10 7L2 6",
  menu: "M3 12h18 M3 6h18 M3 18h18",
  sparkles: "M12 3l1.5 4.5h4.5l-3.75 2.7 1.5 4.5L12 12l-3.75 2.7 1.5-4.5L6 7.5h4.5z",
  globe: "M12 22a10 10 0 100-20 10 10 0 000 20z M2 12h20 M12 2a15.3 15.3 0 014 10 15.3 15.3 0 01-4 10 15.3 15.3 0 01-4-10 15.3 15.3 0 014-10z",
  link: "M10 13a5 5 0 007.54.54l3-3a5 5 0 00-7.07-7.07l-1.72 1.71 M14 11a5 5 0 00-7.54-.54l-3 3a5 5 0 007.07 7.07l1.71-1.71",
  checkCircle: "M22 11.08V12a10 10 0 11-5.93-9.14 M22 4L12 14.01l-3-3",
  info: "M12 22a10 10 0 100-20 10 10 0 000 20z M12 8v4 M12 16h.01",
  arrowRight: "M5 12h14 M12 5l7 7-7 7",
  gitBranch: "M6 3v12 M18 9a3 3 0 100-6 3 3 0 000 6z M6 21a3 3 0 100-6 3 3 0 000 6z M18 9a9 9 0 01-9 9",
  graduationCap: "M22 10v6M2 10l10-5 10 5-10 5z M6 12v5c0 2 6 2 6 2s6 0 6-2v-5",
  flame: "M8.5 14.5A2.5 2.5 0 0011 12c0-1.38-.5-2-1-3-1.072-2.143-.224-4.054 2-6 .5 2.5 2 4.9 4 6.5 2 1.6 3 3.5 3 5.5a7 7 0 11-14 0c0-1.153.433-2.294 1-3a2.5 2.5 0 002.5 2.5z",
  heart: "M20.84 4.61a5.5 5.5 0 00-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 00-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 000-7.78z",
  building: "M6 22V4a2 2 0 012-2h8a2 2 0 012 2v18 M6 12h12 M6 16h12 M9 6h2 M13 6h2",
  bot: "M12 2a2 2 0 012 2v2h4a2 2 0 012 2v8a2 2 0 01-2 2H6a2 2 0 01-2-2V8a2 2 0 012-2h4V4a2 2 0 012-2z",
  fileText: "M14 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V8z M14 2v6h6 M16 13H8 M16 17H8 M10 9H8",
  wand: "M15 4l5 5 M2 22l10-10 M17 2l2 2 M19 9l2 2 M4 15l2 2",
  crystalBall: "M12 2a8 8 0 00-8 8c0 3.5 2.2 6.5 5.3 7.6L9 22h6l-.3-4.4C17.8 16.5 20 13.5 20 10a8 8 0 00-8-8z",
  gamepad: "M6 11h4M8 9v4M15 10h.01M18 12h.01 M17 6H7a5 5 0 00-5 5v3a5 5 0 005 5h10a5 5 0 005-5v-3a5 5 0 00-5-5z",
  puzzle: "M19.439 7.85c-.049-.322.059-.648.289-.878l1.568-1.568a2.5 2.5 0 00-3.535-3.535l-1.568 1.568a.747.747 0 01-.878.289c-.588-.228-1.1-.64-1.464-1.189A3.5 3.5 0 008 4v.5",
} as const;

export type IconName = keyof typeof IconPaths;

export function Icon({ name, size = 20, stroke = "#64748B", className = "", fill = "none" }: {
  name: IconName; size?: number; stroke?: string; className?: string; fill?: string;
}) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill={fill} stroke={stroke}
      strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className={className}>
      <path d={IconPaths[name]} />
    </svg>
  );
}

// ─── Logo ─────────────────────────────────────────────────────────────────────
export function Logo({ size = 32, showText = true, collapsed = false }: { size?: number; showText?: boolean; collapsed?: boolean }) {
  return (
    <div className="flex items-center gap-2.5">
      <div className="rounded-[10px] flex items-center justify-center flex-shrink-0"
        style={{ width: size, height: size, background: "linear-gradient(135deg,#6366F1,#8B5CF6)" }}>
        <svg width={size * 0.55} height={size * 0.55} viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5" />
        </svg>
      </div>
      {showText && !collapsed && (
        <div>
          <div className="text-sm font-bold text-slate-900 tracking-tight leading-none">LearnOS AI</div>
          <div className="text-[10px] text-slate-400 font-medium tracking-wide uppercase mt-0.5">Personalized Learning</div>
        </div>
      )}
    </div>
  );
}

// ─── UI Primitives ────────────────────────────────────────────────────────────
export function Card({ children, className = "", style = {}, onClick }: {
  children: React.ReactNode; className?: string; style?: React.CSSProperties; onClick?: () => void;
}) {
  return (
    <div className={`bg-white rounded-[14px] border border-slate-200 ${onClick ? "cursor-pointer hover:shadow-md transition-shadow" : ""} ${className}`}
      style={{ boxShadow: "0 1px 3px rgba(15,23,42,0.06)", ...style }} onClick={onClick}>
      {children}
    </div>
  );
}

export function Badge({ label, color = "indigo" }: { label: string; color?: "indigo" | "emerald" | "sky" | "amber" | "rose" | "violet" | "slate" | "orange" }) {
  const colors: Record<string, string> = {
    indigo: "bg-[#EEF0FF] text-[#4F46E5]",
    emerald: "bg-emerald-50 text-emerald-700",
    sky: "bg-sky-50 text-sky-700",
    amber: "bg-amber-50 text-amber-700",
    rose: "bg-rose-50 text-rose-700",
    violet: "bg-violet-50 text-violet-700",
    slate: "bg-slate-100 text-slate-600",
    orange: "bg-orange-50 text-orange-700",
  };
  return <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${colors[color]}`}>{label}</span>;
}

export function ProgressBar({ value, color = "#6366F1", height = 6, className = "" }: {
  value: number; color?: string; height?: number; className?: string;
}) {
  return (
    <div className={`w-full rounded-full overflow-hidden bg-slate-100 ${className}`} style={{ height }}>
      <div className="h-full rounded-full transition-all duration-500" style={{ width: `${Math.min(value, 100)}%`, background: color }} />
    </div>
  );
}

export function ProgressRing({ value, size = 80, stroke = 8, color = "#6366F1", label }: {
  value: number; size?: number; stroke?: number; color?: string; label?: string;
}) {
  const r = (size - stroke) / 2;
  const circ = 2 * Math.PI * r;
  const offset = circ - (value / 100) * circ;
  return (
    <div className="relative inline-flex items-center justify-center" style={{ width: size, height: size }}>
      <svg width={size} height={size} style={{ transform: "rotate(-90deg)" }}>
        <circle cx={size / 2} cy={size / 2} r={r} fill="none" stroke="#E2E8F0" strokeWidth={stroke} />
        <circle cx={size / 2} cy={size / 2} r={r} fill="none" stroke={color} strokeWidth={stroke}
          strokeDasharray={circ} strokeDashoffset={offset} strokeLinecap="round"
          style={{ transition: "stroke-dashoffset 0.6s ease" }} />
      </svg>
      {label && <span className="absolute text-sm font-semibold text-slate-800 tabular">{label}</span>}
    </div>
  );
}

export function PrimaryBtn({ children, onClick, className = "", type = "button", disabled = false }: {
  children: React.ReactNode; onClick?: () => void; className?: string; type?: "button" | "submit"; disabled?: boolean;
}) {
  return (
    <button type={type} onClick={onClick} disabled={disabled}
      className={`px-4 py-2.5 rounded-[10px] text-sm font-semibold text-white transition-all flex items-center justify-center gap-2 disabled:opacity-50 ${className}`}
      style={{ background: disabled ? "#94A3B8" : "linear-gradient(135deg,#6366F1,#8B5CF6)" }}>
      {children}
    </button>
  );
}

export function SecondaryBtn({ children, onClick, className = "", type = "button" }: {
  children: React.ReactNode; onClick?: () => void; className?: string; type?: "button" | "submit";
}) {
  return (
    <button type={type} onClick={onClick}
      className={`px-4 py-2.5 rounded-[10px] text-sm font-medium text-slate-700 bg-white border border-slate-200 hover:bg-slate-50 transition-colors flex items-center justify-center gap-2 ${className}`}>
      {children}
    </button>
  );
}

export function GhostBtn({ children, onClick, className = "" }: {
  children: React.ReactNode; onClick?: () => void; className?: string;
}) {
  return (
    <button onClick={onClick}
      className={`px-3 py-1.5 rounded-[10px] text-sm font-medium text-slate-600 hover:bg-slate-100 transition-colors flex items-center gap-1.5 ${className}`}>
      {children}
    </button>
  );
}

export function SectionLabel({ children }: { children: React.ReactNode }) {
  return <div className="text-[10px] font-semibold uppercase tracking-widest text-slate-400 mb-3">{children}</div>;
}

export function Toggle({ value, onChange }: { value: boolean; onChange: (v: boolean) => void }) {
  return (
    <button onClick={() => onChange(!value)}
      className={`w-10 h-5 rounded-full transition-colors relative flex-shrink-0 ${value ? "bg-indigo-500" : "bg-slate-200"}`}>
      <span className={`absolute top-0.5 w-4 h-4 rounded-full bg-white shadow transition-all ${value ? "left-5" : "left-0.5"}`} />
    </button>
  );
}

// ─── Course Data ──────────────────────────────────────────────────────────────
export const COURSES = [
  {
    id: "dbms",
    title: "Database Management Systems",
    subject: "DBMS · Sem IV",
    modules: 5,
    duration: "8 weeks",
    progress: 60,
    difficulty: "Intermediate",
    diffColor: "sky" as const,
    gradient: "from-indigo-500 to-violet-500",
    tags: ["SQL", "Subqueries", "Indexes", "Transactions"],
    description: "Master relational databases, SQL, and query optimization through adaptive lessons tailored to your mastery level.",
    active: true,
    instructor: "AI-generated · aligned to Anna University syllabus",
  },
  {
    id: "ml",
    title: "Machine Learning Foundations",
    subject: "AI / ML",
    modules: 6,
    duration: "6 weeks",
    progress: 33,
    difficulty: "Intermediate",
    diffColor: "sky" as const,
    gradient: "from-sky-500 to-blue-600",
    tags: ["Python", "Supervised Learning", "Model Evaluation", "Scikit-learn"],
    description: "Build ML intuition from math fundamentals to hands-on model training — tied to your AI Engineer goal.",
    active: true,
    instructor: "AI-generated · Goal: Become an AI Engineer",
  },
  {
    id: "dsa",
    title: "DSA for Placements",
    subject: "Computer Science",
    modules: 8,
    duration: "10 weeks",
    progress: 0,
    difficulty: "Advanced",
    diffColor: "rose" as const,
    gradient: "from-rose-500 to-pink-600",
    tags: ["Arrays", "Trees", "Graphs", "Dynamic Programming"],
    description: "Crack FAANG-style coding interviews with structured problem-solving, patterns, and timed challenges.",
    active: false,
    instructor: "AI-generated · Placement prep track",
  },
  {
    id: "python",
    title: "Python for Data Science",
    subject: "Python",
    modules: 5,
    duration: "4 weeks",
    progress: 0,
    difficulty: "Beginner",
    diffColor: "emerald" as const,
    gradient: "from-emerald-500 to-teal-500",
    tags: ["NumPy", "Pandas", "Matplotlib", "Data Wrangling"],
    description: "Go from Python basics to full data manipulation and visualization — prerequisite for ML Core.",
    active: false,
    instructor: "AI-generated · Prerequisite: ML Foundations",
  },
  {
    id: "os",
    title: "Operating Systems",
    subject: "Systems · Sem IV",
    modules: 6,
    duration: "7 weeks",
    progress: 0,
    difficulty: "Intermediate",
    diffColor: "sky" as const,
    gradient: "from-amber-500 to-orange-500",
    tags: ["Processes", "Memory", "Scheduling", "File Systems"],
    description: "Deep-dive into OS internals: process scheduling, memory management, and concurrency.",
    active: false,
    instructor: "AI-generated · Anna University Sem IV",
  },
  {
    id: "system-design",
    title: "System Design Fundamentals",
    subject: "Engineering",
    modules: 7,
    duration: "6 weeks",
    progress: 0,
    difficulty: "Advanced",
    diffColor: "rose" as const,
    gradient: "from-violet-500 to-purple-600",
    tags: ["Scalability", "CAP Theorem", "Caching", "Databases"],
    description: "Design large-scale distributed systems — essential for senior engineering and AI infrastructure roles.",
    active: false,
    instructor: "AI-generated · Goal: Become an AI Engineer",
  },
] as const;

export type CourseId = typeof COURSES[number]["id"] | string;
