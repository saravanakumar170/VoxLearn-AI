import { useState } from "react";
import { Icon, Card, Badge, ProgressBar, ProgressRing, PrimaryBtn, SecondaryBtn, GhostBtn, SectionLabel, Toggle, COURSES } from "../lib";
import type { CourseId, StudentScreen } from "../lib";

// ─── Dashboard ────────────────────────────────────────────────────────────────
export function Dashboard({ onNav }: { onNav: (s: StudentScreen) => void }) {
  const masteryData = [
    { label: "SQL Basics", value: 92, color: "#10B981" },
    { label: "JOINs", value: 85, color: "#10B981" },
    { label: "GROUP BY", value: 78, color: "#0EA5E9" },
    { label: "Subqueries", value: 54, color: "#F59E0B" },
    { label: "Window Fns", value: 38, color: "#F43F5E" },
  ];
  const xpData = [120, 80, 200, 160, 240, 180, 320];
  const days = ["M", "T", "W", "T", "F", "S", "S"];

  return (
    <div className="p-4 sm:p-6 space-y-5 max-w-[1200px] mx-auto">
      {/* Risk nudge */}
      <Card className="p-4 border-amber-200" style={{ background: "linear-gradient(135deg,#FFFBEB,#FEF3C7)", boxShadow: "none" }}>
        <div className="flex items-start gap-3">
          <span className="text-xl flex-shrink-0">💛</span>
          <div className="flex-1 min-w-0">
            <div className="text-sm font-semibold text-amber-900">Let's get back on track — you missed 2 sessions and DBMS quiz scores dipped.</div>
            <div className="flex flex-wrap gap-1.5 mt-2">
              {["2 missed sessions", "quiz 3/5", "prereq gap: JOINs"].map(f => (
                <span key={f} className="px-2 py-0.5 rounded-full text-[11px] bg-amber-100 text-amber-800 font-medium">{f}</span>
              ))}
            </div>
          </div>
          <div className="flex gap-2 flex-shrink-0 flex-wrap">
            <button className="px-3 py-1.5 rounded-[8px] text-xs font-semibold bg-amber-500 text-white hover:bg-amber-600 whitespace-nowrap">15-min catch-up</button>
            <button className="px-3 py-1.5 rounded-[8px] text-xs font-medium bg-white border border-amber-200 text-amber-700 hover:bg-amber-50">Ask tutor</button>
          </div>
        </div>
      </Card>

      {/* Greeting */}
      <div className="flex items-start justify-between flex-wrap gap-3">
        <div>
          <h1 className="text-xl sm:text-2xl font-bold text-slate-900 tracking-tight">Good morning, Aarav 👋</h1>
          <p className="text-slate-500 text-sm mt-1">You have 3 tasks due today. Keep up the momentum.</p>
        </div>
        <div className="flex items-center gap-2 flex-wrap">
          <span className="px-3 py-1.5 rounded-full text-xs font-semibold" style={{ background: "#EEF0FF", color: "#4F46E5" }}>Lv 7 · 2,480 XP</span>
          <span className="px-3 py-1.5 rounded-full text-xs font-semibold bg-amber-50 text-amber-700">🔥 12-day streak</span>
        </div>
      </div>

      {/* Main grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {/* Continue Learning */}
        <Card className="sm:col-span-2 p-5">
          <div className="flex items-start justify-between mb-4 flex-wrap gap-3">
            <div>
              <SectionLabel>Continue Learning</SectionLabel>
              <h3 className="text-base font-semibold text-slate-900">Database Management Systems</h3>
              <p className="text-sm text-slate-500 mt-0.5 flex items-center gap-1">
                <Icon name="chevronRight" stroke="#94A3B8" size={14} /> SQL Subqueries · Module 4
              </p>
            </div>
            <PrimaryBtn onClick={() => onNav("courses")}>Resume →</PrimaryBtn>
          </div>
          <div className="mb-3">
            <div className="flex justify-between text-xs text-slate-500 mb-1.5"><span>Progress</span><span className="tabular font-medium text-slate-700">60%</span></div>
            <ProgressBar value={60} height={8} />
          </div>
          <div className="flex items-center gap-2 mt-4 flex-wrap">
            <span className="text-xs text-slate-400 font-medium">Style:</span>
            {["Lesson", "Conversational", "Interactive", "Game"].map((s, i) => (
              <button key={s} className={`px-2.5 py-1 rounded-full text-xs font-medium transition-colors ${i === 2 ? "text-indigo-600" : "text-slate-500 hover:text-slate-700"}`}
                style={i === 2 ? { background: "#EEF0FF" } : { background: "#F1F5F9" }}>
                {s}
              </button>
            ))}
          </div>
        </Card>

        {/* Streak / XP */}
        <Card className="p-5">
          <SectionLabel>Weekly XP</SectionLabel>
          <div className="flex items-end gap-1 h-14 mb-3">
            {xpData.map((xp, i) => (
              <div key={`xp-${i}`} className="flex-1 flex flex-col items-center gap-1">
                <div className="w-full rounded-t" style={{ height: `${(xp / 320) * 100}%`, background: i === 6 ? "linear-gradient(135deg,#6366F1,#8B5CF6)" : "#EEF0FF" }} />
                <span className="text-[9px] text-slate-400">{days[i]}</span>
              </div>
            ))}
          </div>
          <div className="flex justify-between pt-3 border-t border-slate-100">
            <div><div className="text-[11px] text-slate-400">This week</div><div className="text-lg font-bold text-slate-900 tabular">+1,300 XP</div></div>
            <div className="text-right"><div className="text-[11px] text-slate-400">To level 8</div><div className="text-lg font-bold tabular" style={{ color: "#6366F1" }}>520 XP</div></div>
          </div>
          <ProgressBar value={83} className="mt-2" />
        </Card>

        {/* Knowledge Health */}
        <Card className="p-5">
          <SectionLabel>Knowledge Health</SectionLabel>
          <div className="flex items-center gap-4 mb-4">
            <ProgressRing value={68} size={64} stroke={7} color="#6366F1" label="68%" />
            <div>
              <div className="text-sm font-semibold text-slate-900">Overall Mastery</div>
              <div className="flex items-center gap-1.5 mt-2 px-2.5 py-1.5 rounded-[8px] bg-amber-50 border border-amber-100">
                <Icon name="alertTriangle" stroke="#F59E0B" size={13} />
                <span className="text-xs text-amber-700 font-medium">Subqueries — 54%</span>
              </div>
            </div>
          </div>
          <div className="space-y-2">
            {masteryData.map(m => (
              <div key={m.label}>
                <div className="flex justify-between text-xs mb-1">
                  <span className="text-slate-500">{m.label}</span>
                  <span className="tabular font-semibold" style={{ color: m.color }}>{m.value}%</span>
                </div>
                <ProgressBar value={m.value} color={m.color} height={4} />
              </div>
            ))}
          </div>
        </Card>

        {/* Goal Roadmap mini */}
        <Card className="p-5">
          <div className="flex items-start justify-between mb-3">
            <SectionLabel>Goal Roadmap</SectionLabel>
            <button onClick={() => onNav("goal-roadmap")} className="text-xs text-indigo-500 hover:text-indigo-700 font-medium">View →</button>
          </div>
          <div className="text-sm font-semibold text-slate-900 mb-3">Become an AI Engineer</div>
          <div className="space-y-2">
            {[
              { label: "Foundations", done: true },
              { label: "Math & Stats", done: true },
              { label: "ML Core", current: true },
              { label: "Deep Learning", done: false },
              { label: "Interview Prep", done: false },
            ].map((m, i) => (
              <div key={i} className="flex items-center gap-3">
                <div className={`w-5 h-5 rounded-full flex items-center justify-center flex-shrink-0 text-[10px] font-bold ${m.done ? "bg-emerald-400" : ""}`}
                  style={m.done ? {} : m.current ? { background: "linear-gradient(135deg,#6366F1,#8B5CF6)" } : { background: "#F1F5F9", color: "#94A3B8" }}>
                  {m.done ? <Icon name="check" stroke="white" size={10} /> : <span className="text-white">{i + 1}</span>}
                </div>
                <span className={`text-xs flex-1 ${m.done ? "text-slate-400 line-through" : m.current ? "text-indigo-700 font-semibold" : "text-slate-500"}`}>{m.label}</span>
                {m.current && <Badge label="Now" color="indigo" />}
              </div>
            ))}
          </div>
          <ProgressBar value={42} className="mt-4" />
          <div className="text-right text-xs text-slate-400 mt-1">42% complete</div>
        </Card>

        {/* Today's Tasks */}
        <Card className="p-5">
          <SectionLabel>Today's Tasks</SectionLabel>
          <div className="space-y-2.5">
            {[
              { title: "Subqueries Assessment", tag: "Assessment", tagColor: "rose" as const, due: "Due today", done: false },
              { title: "Movie Recommender checkpoint", tag: "Project", tagColor: "violet" as const, due: "Due Fri", done: false },
              { title: "Review Mentor suggestion", tag: "Mentor", tagColor: "sky" as const, due: "Optional", done: true },
            ].map((task, i) => (
              <div key={i} className={`flex items-start gap-3 p-2.5 rounded-[10px] ${task.done ? "opacity-50" : "hover:bg-slate-50"}`}>
                <div className={`w-5 h-5 rounded-full border-2 flex-shrink-0 mt-0.5 flex items-center justify-center ${task.done ? "border-emerald-400 bg-emerald-400" : "border-slate-300"}`}>
                  {task.done && <Icon name="check" stroke="white" size={10} />}
                </div>
                <div className="flex-1 min-w-0">
                  <div className={`text-xs font-medium ${task.done ? "line-through text-slate-400" : "text-slate-800"}`}>{task.title}</div>
                  <div className="flex items-center gap-2 mt-1">
                    <Badge label={task.tag} color={task.tagColor} />
                    <span className="text-[11px] text-slate-400">{task.due}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </Card>

        {/* Recommended */}
        <Card className="sm:col-span-2 lg:col-span-3 p-5">
          <div className="flex items-center justify-between mb-4">
            <SectionLabel>Recommended Next</SectionLabel>
            <GhostBtn onClick={() => onNav("courses")}>See all</GhostBtn>
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
            {[
              { title: "Correlated Subqueries", color: "from-indigo-500 to-violet-500", time: "25 min", hot: true },
              { title: "Window Functions Deep Dive", color: "from-rose-400 to-pink-500", time: "40 min", hot: false },
              { title: "ML Math Foundations", color: "from-sky-400 to-blue-500", time: "60 min", hot: false },
              { title: "Python for Data Science", color: "from-emerald-400 to-teal-500", time: "45 min", hot: false },
            ].map((c, i) => (
              <button key={i} onClick={() => onNav("courses")} className="text-left rounded-[12px] overflow-hidden border border-slate-100 hover:shadow-md transition-shadow group">
                <div className={`h-16 sm:h-20 bg-gradient-to-br ${c.color} relative`}>
                  {c.hot && <span className="absolute top-2 left-2 px-2 py-0.5 rounded-full text-[10px] font-semibold bg-white/20 text-white">🔥 For you</span>}
                </div>
                <div className="p-2.5">
                  <div className="text-xs font-semibold text-slate-800 leading-snug group-hover:text-indigo-700">{c.title}</div>
                  <div className="text-[10px] text-slate-400 mt-1 flex items-center gap-1"><Icon name="clock" stroke="#94A3B8" size={10} />{c.time}</div>
                </div>
              </button>
            ))}
          </div>
        </Card>
      </div>
    </div>
  );
}

// ─── AI Tutor ─────────────────────────────────────────────────────────────────
export function AITutor() {
  const [input, setInput] = useState("");
  const [voiceMode, setVoiceMode] = useState(false);
  const [socraticMode, setSocraticMode] = useState(false);
  const [showContext, setShowContext] = useState(false);
  const [messages, setMessages] = useState([
    { role: "ai", text: "Ask me anything about your DBMS course. I pull from your lecture notes, textbooks, PDFs, and past papers.", time: "9:00 AM", sources: [] as string[] },
    { role: "user", text: "Explain SQL subqueries with an example", time: "9:02 AM", sources: [] as string[] },
    {
      role: "ai",
      text: "**SQL Subqueries** are queries nested inside another SQL query.\n\n```sql\nSELECT name, salary\nFROM employees\nWHERE salary > (\n  SELECT AVG(salary)\n  FROM employees\n);\n```\n\nThis fetches employees earning above the company average — the inner query computes the average, the outer query filters rows.",
      time: "9:02 AM",
      sources: ["Lecture 7.pdf", "Textbook Ch.4", "2022 QP Q3"],
    },
  ]);

  const sendMsg = () => {
    if (!input.trim()) return;
    setMessages(m => [...m, { role: "user", text: input, time: "now", sources: [] }]);
    setInput("");
    setTimeout(() => {
      setMessages(m => [...m, { role: "ai", text: "Great question! Let me explain that step by step with an example from your DBMS syllabus...", time: "now", sources: [] }]);
    }, 800);
  };

  return (
    <div className="flex h-full overflow-hidden relative">
      {/* Context panel — desktop left, mobile slide */}
      <div className={`${showContext ? "flex" : "hidden"} md:flex w-56 lg:w-64 border-r border-slate-200 bg-white flex-col flex-shrink-0`}>
        <div className="p-4 border-b border-slate-100">
          <div className="text-[10px] font-semibold uppercase tracking-widest text-slate-400 mb-2">Active Context</div>
          <div className="rounded-[10px] p-3" style={{ background: "#EEF0FF" }}>
            <div className="text-xs font-bold text-indigo-700">DBMS · SQL</div>
            <div className="text-[11px] text-indigo-500 mt-0.5">Sem IV — Module 4</div>
            <div className="text-[11px] text-indigo-600 mt-2 font-medium">📄 8 sources indexed</div>
          </div>
        </div>
        <div className="p-4 border-b border-slate-100">
          <div className="text-[10px] font-semibold uppercase tracking-widest text-slate-400 mb-2">Sources</div>
          {["Lecture 1–8.pdf", "Textbook Ch.1–6", "2022 QP.pdf", "2023 QP.pdf"].map(s => (
            <div key={s} className="flex items-center gap-2 text-xs text-slate-600 p-1.5 hover:bg-slate-50 rounded-[8px] cursor-pointer">📄 {s}</div>
          ))}
        </div>
        <div className="p-4">
          <div className="text-[10px] font-semibold uppercase tracking-widest text-slate-400 mb-2">Socratic Mode</div>
          <div className="flex items-center justify-between p-3 rounded-[10px] bg-slate-50 border border-slate-200">
            <span className="text-xs font-medium text-slate-700">Guide via questions</span>
            <Toggle value={socraticMode} onChange={setSocraticMode} />
          </div>
        </div>
      </div>

      {/* Chat */}
      <div className="flex-1 flex flex-col bg-slate-50 min-w-0">
        {/* Mobile context toggle */}
        <div className="md:hidden flex items-center px-4 py-2 bg-white border-b border-slate-200 gap-3">
          <button onClick={() => setShowContext(!showContext)} className="flex items-center gap-1.5 text-xs font-medium text-slate-600 hover:text-slate-900">
            <Icon name="book" stroke="currentColor" size={14} /> DBMS · SQL Context
          </button>
          <span className="ml-auto text-xs text-indigo-600 font-medium">{socraticMode ? "🔮 Socratic" : ""}</span>
        </div>

        <div className="flex-1 overflow-y-auto p-4 space-y-4">
          {messages.map((m, i) => (
            <div key={i} className={`flex ${m.role === "user" ? "justify-end" : "justify-start"} gap-2.5 fade-in`}>
              {m.role === "ai" && (
                <div className="w-7 h-7 rounded-full flex-shrink-0 flex items-center justify-center text-white text-[10px] font-bold mt-1" style={{ background: "linear-gradient(135deg,#6366F1,#8B5CF6)" }}>AI</div>
              )}
              <div className="max-w-[85%] sm:max-w-lg">
                <div className={`rounded-2xl px-4 py-3 text-sm leading-relaxed ${m.role === "user" ? "text-white" : "bg-white text-slate-800 border border-slate-200 shadow-sm"}`}
                  style={m.role === "user" ? { background: "linear-gradient(135deg,#6366F1,#8B5CF6)", borderRadius: "18px 18px 4px 18px" } : { borderRadius: "4px 18px 18px 18px" }}>
                  {m.text.split("```").map((part, j) =>
                    j % 2 === 1
                      ? <pre key={j} className="mono text-xs p-3 bg-slate-900 text-emerald-400 overflow-x-auto rounded-[8px] my-2">{part.replace(/^sql\n/, "")}</pre>
                      : <span key={j} style={{ whiteSpace: "pre-wrap" }}>{part.replace(/\*\*(.*?)\*\*/g, "$1")}</span>
                  )}
                  {m.sources.length > 0 && (
                    <div className="mt-3 pt-3 border-t border-slate-100">
                      <div className="text-[10px] text-slate-400 mb-1.5 font-medium uppercase tracking-wide">Sources</div>
                      <div className="flex flex-wrap gap-1.5">
                        {m.sources.map(s => <span key={s} className="px-2 py-0.5 rounded-full text-[11px] bg-slate-100 text-slate-600 font-medium cursor-pointer hover:bg-indigo-50 hover:text-indigo-600">{s}</span>)}
                      </div>
                    </div>
                  )}
                </div>
                {m.role === "ai" && i === messages.length - 1 && (
                  <div className="flex flex-wrap gap-1.5 mt-2">
                    {["Show as diagram", "Quiz me on this", "Explain simpler"].map(a => (
                      <button key={a} className="px-2.5 py-1 rounded-full text-[11px] bg-white border border-slate-200 text-slate-600 hover:border-indigo-300 hover:text-indigo-600 font-medium">{a}</button>
                    ))}
                  </div>
                )}
                <div className="text-[10px] text-slate-400 mt-1 px-1">{m.time}</div>
              </div>
              {m.role === "user" && (
                <div className="w-7 h-7 rounded-full flex-shrink-0 flex items-center justify-center text-white text-[10px] font-semibold mt-1" style={{ background: "linear-gradient(135deg,#6366F1,#8B5CF6)" }}>AS</div>
              )}
            </div>
          ))}
        </div>

        <div className="p-3 bg-white border-t border-slate-200">
          <div className="flex items-end gap-2 bg-white rounded-2xl border border-slate-200 p-2.5 shadow-sm">
            <textarea value={input} onChange={e => setInput(e.target.value)}
              onKeyDown={e => { if (e.key === "Enter" && !e.shiftKey) { e.preventDefault(); sendMsg(); } }}
              placeholder="Ask about SQL subqueries, past papers…" rows={1}
              className="flex-1 text-sm text-slate-800 outline-none resize-none placeholder:text-slate-400 min-w-0" />
            <div className="flex items-center gap-1.5 flex-shrink-0">
              <button onClick={() => setVoiceMode(true)} className="p-2 rounded-[8px] hover:bg-slate-100"><Icon name="mic" stroke="#64748B" size={17} /></button>
              <button className="p-2 rounded-[8px] hover:bg-slate-100"><Icon name="attach" stroke="#64748B" size={17} /></button>
              <button onClick={sendMsg} className="p-2 rounded-[8px] text-white" style={{ background: "linear-gradient(135deg,#6366F1,#8B5CF6)" }}>
                <Icon name="send" stroke="white" size={17} />
              </button>
            </div>
          </div>
          {socraticMode && <p className="text-[11px] text-indigo-500 mt-1.5 text-center">🔮 Socratic mode — I'll guide you with questions.</p>}
        </div>
      </div>

      {/* Voice overlay */}
      {voiceMode && (
        <div className="absolute inset-0 flex flex-col items-center justify-center z-50" style={{ background: "rgba(15,23,42,0.92)" }}>
          <div className="text-white text-2xl font-bold mb-2">Listening…</div>
          <p className="text-slate-400 text-sm mb-8">Speak naturally</p>
          <div className="flex items-end gap-1 h-14 mb-10">
            {Array.from({ length: 20 }).map((_, i) => (
              <div key={i} className="w-1.5 rounded-full bg-indigo-400"
                style={{ height: `${16 + Math.sin(i * 0.8) * 12}px`, animation: `wave ${0.5 + (i % 4) * 0.15}s ease-in-out infinite alternate` }} />
            ))}
          </div>
          <button onClick={() => setVoiceMode(false)} className="px-6 py-3 rounded-full bg-rose-500 text-white font-semibold hover:bg-rose-600">End Session</button>
        </div>
      )}
    </div>
  );
}

// ─── Course Catalog ───────────────────────────────────────────────────────────
export function CourseCatalog({ onEnter }: { onEnter: (id: CourseId) => void }) {
  const [filter, setFilter] = useState<"all" | "active" | "new">("all");
  const [search, setSearch] = useState("");

  const filtered = COURSES.filter(c => {
    const match = c.title.toLowerCase().includes(search.toLowerCase()) || c.tags.some(t => t.toLowerCase().includes(search.toLowerCase()));
    if (filter === "active") return c.progress > 0 && match;
    if (filter === "new") return c.progress === 0 && match;
    return match;
  });

  const active = filtered.filter(c => c.progress > 0);
  const newCourses = filtered.filter(c => c.progress === 0);

  return (
    <div className="p-4 sm:p-6 max-w-[1100px] mx-auto space-y-6">
      <div className="flex items-start justify-between flex-wrap gap-3">
        <div>
          <h1 className="text-xl sm:text-2xl font-bold text-slate-900 tracking-tight">My Courses</h1>
          <p className="text-slate-500 text-sm mt-1">Click any course to start learning.</p>
        </div>
        <PrimaryBtn>+ Generate New Course</PrimaryBtn>
      </div>

      <div className="flex items-center gap-3 flex-wrap">
        <div className="flex items-center gap-1 bg-slate-100 rounded-[10px] p-1">
          {(["all", "active", "new"] as const).map(f => (
            <button key={f} onClick={() => setFilter(f)}
              className={`px-3 py-1.5 rounded-[8px] text-xs font-semibold capitalize transition-all ${filter === f ? "bg-white text-slate-900 shadow-sm" : "text-slate-500"}`}>
              {f === "all" ? "All" : f === "active" ? "In Progress" : "Not Started"}
            </button>
          ))}
        </div>
        <div className="flex items-center gap-2 px-3 py-2 rounded-[10px] bg-white border border-slate-200 flex-1 max-w-xs min-w-[160px]">
          <Icon name="search" stroke="#94A3B8" size={14} />
          <input value={search} onChange={e => setSearch(e.target.value)}
            placeholder="Search courses…" className="flex-1 text-xs bg-transparent outline-none text-slate-600 placeholder:text-slate-400" />
        </div>
      </div>

      {/* Active / in-progress */}
      {(filter === "all" || filter === "active") && active.length > 0 && (
        <div>
          <SectionLabel>Continue Learning</SectionLabel>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {active.map(course => (
              <Card key={course.id} className="overflow-hidden hover:shadow-md hover:-translate-y-0.5 transition-all" onClick={() => onEnter(course.id)}>
                <div className={`h-2 bg-gradient-to-r ${course.gradient}`} />
                <div className="p-5">
                  <div className="flex items-start justify-between gap-3 mb-3">
                    <div>
                      <div className="text-[10px] font-semibold uppercase tracking-widest text-slate-400 mb-1">{course.subject}</div>
                      <h3 className="text-sm font-bold text-slate-900 leading-snug hover:text-indigo-700 transition-colors">{course.title}</h3>
                    </div>
                    <div className={`w-11 h-11 rounded-full bg-gradient-to-br ${course.gradient} flex items-center justify-center text-white font-bold text-xs tabular flex-shrink-0`}>{course.progress}%</div>
                  </div>
                  <div className="flex justify-between text-xs text-slate-500 mb-1.5"><span>Progress</span><span className="tabular font-medium text-slate-700">{course.progress}%</span></div>
                  <ProgressBar value={course.progress} height={6} />
                  <div className="flex items-center justify-between mt-3">
                    <div className="flex gap-1.5 flex-wrap">
                      <Badge label={course.difficulty} color={course.diffColor} />
                      <span className="text-[11px] text-slate-400">{course.modules} modules</span>
                    </div>
                    <span className="text-xs font-semibold text-indigo-600 flex items-center gap-0.5">Resume <Icon name="chevronRight" stroke="currentColor" size={12} /></span>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </div>
      )}

      {/* New courses */}
      {(filter === "all" || filter === "new") && newCourses.length > 0 && (
        <div>
          <SectionLabel>{filter === "new" ? "Not Started" : "Explore More Courses"}</SectionLabel>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {newCourses.map(course => (
              <Card key={course.id} className="overflow-hidden hover:shadow-md hover:-translate-y-0.5 transition-all" onClick={() => onEnter(course.id)}>
                <div className={`h-24 bg-gradient-to-br ${course.gradient} flex items-end p-4`}>
                  <div className="text-white">
                    <div className="text-[10px] font-medium text-white/70 uppercase tracking-widest">{course.subject}</div>
                    <div className="text-xs font-semibold text-white/90 flex items-center gap-2 mt-0.5">
                      <Icon name="clock" stroke="rgba(255,255,255,0.7)" size={11} />{course.duration}
                      <span className="opacity-50">·</span>
                      {course.modules} modules
                    </div>
                  </div>
                </div>
                <div className="p-4">
                  <h3 className="text-sm font-bold text-slate-900 leading-snug mb-1 hover:text-indigo-700 transition-colors">{course.title}</h3>
                  <p className="text-[11px] text-slate-500 leading-relaxed mb-3">{course.description}</p>
                  <div className="flex flex-wrap gap-1 mb-3">
                    {course.tags.slice(0, 3).map(t => <span key={t} className="px-2 py-0.5 rounded-full text-[10px] font-medium bg-slate-100 text-slate-500">{t}</span>)}
                  </div>
                  <div className="flex items-center justify-between">
                    <Badge label={course.difficulty} color={course.diffColor} />
                    <span className="text-[11px] font-semibold text-indigo-600 flex items-center gap-0.5">Start <Icon name="chevronRight" stroke="currentColor" size={12} /></span>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </div>
      )}

      {filtered.length === 0 && (
        <div className="text-center py-16 text-slate-400">
          <div className="text-4xl mb-3">📚</div>
          <div className="text-sm font-medium">No courses match</div>
          <div className="text-xs mt-1">Try a different filter or generate a new course</div>
        </div>
      )}
    </div>
  );
}

// ─── Course Player ────────────────────────────────────────────────────────────
export function CoursePlayer({ course, onBack }: { course: typeof COURSES[number]; onBack: () => void }) {
  const [marked, setMarked] = useState(false);
  const [showOutline, setShowOutline] = useState(false);

  const modules = [
    { label: "1. SQL Basics", done: true },
    { label: "2. JOINs", done: true },
    { label: "3. Aggregations", done: true },
    { label: "4. Subqueries", current: true },
    { label: "5. Window Functions", done: false },
  ];

  return (
    <div className="flex h-full overflow-hidden">
      {/* Left outline — hidden on mobile unless toggled */}
      <div className={`${showOutline ? "flex" : "hidden"} md:flex w-56 lg:w-64 bg-white border-r border-slate-200 flex-col flex-shrink-0 overflow-y-auto`}>
        <div className="p-4 border-b border-slate-100">
          <div className="text-xs font-semibold text-slate-800 truncate">{course.title}</div>
          <div className="text-[11px] text-slate-400 mt-0.5">Module progress · {course.progress}%</div>
          <ProgressBar value={course.progress} className="mt-2" height={4} />
        </div>
        <div className="p-3 space-y-1">
          {modules.map(m => (
            <div key={m.label} className={`flex items-center gap-2 p-2.5 rounded-[8px] text-xs font-semibold ${(m as any).current ? "text-indigo-700" : m.done ? "text-emerald-700" : "text-slate-500"}`}
              style={(m as any).current ? { background: "#EEF0FF" } : m.done ? { background: "#ECFDF5" } : {}}>
              <Icon name={(m as any).current ? "play" : m.done ? "check" : "lock"}
                stroke={(m as any).current ? "#4F46E5" : m.done ? "#10B981" : "#94A3B8"} size={13} />
              {m.label}
            </div>
          ))}
        </div>
      </div>

      {/* Main content */}
      <div className="flex-1 flex flex-col overflow-hidden min-w-0">
        {/* Breadcrumb */}
        <div className="bg-white border-b border-slate-200 px-4 py-2.5 flex items-center justify-between flex-shrink-0">
          <div className="text-xs text-slate-500 flex items-center gap-1.5 min-w-0">
            <button onClick={() => setShowOutline(!showOutline)} className="md:hidden p-1 mr-1 hover:bg-slate-100 rounded">
              <Icon name="menu" stroke="#64748B" size={16} />
            </button>
            <button onClick={onBack} className="text-indigo-500 hover:text-indigo-700 font-medium whitespace-nowrap">Courses</button>
            <Icon name="chevronRight" stroke="#94A3B8" size={12} />
            <span className="truncate max-w-[120px]">{course.title}</span>
            <Icon name="chevronRight" stroke="#94A3B8" size={12} />
            <span className="text-indigo-600 font-medium whitespace-nowrap">Subqueries</span>
          </div>
          <Badge label="Difficulty: adapted" color="sky" />
        </div>

        {/* Content */}
        <div className="flex-1 overflow-y-auto">
          <div className="max-w-2xl mx-auto p-4 sm:p-6 space-y-5">
            <div>
              <h1 className="text-xl sm:text-2xl font-bold text-slate-900 tracking-tight">SQL Subqueries</h1>
              <p className="text-slate-500 text-sm mt-1">Module 4 · Lesson 3 of 3 · Est. 20 min</p>
              <ProgressBar value={60} className="mt-3" height={5} />
            </div>

            <div className="text-sm text-slate-700 leading-relaxed space-y-3">
              <p>A <strong>subquery</strong> is a query embedded within another SQL query. They allow you to use the result of one query as an input to another.</p>
              <p>Subqueries can appear in SELECT, FROM, WHERE, and HAVING clauses.</p>
            </div>

            <div className="rounded-[12px] border-l-4 border-indigo-400 pl-4 pr-4 py-3" style={{ background: "#EEF0FF" }}>
              <div className="text-xs font-semibold text-indigo-600 uppercase tracking-widest mb-1">Key Concept</div>
              <p className="text-sm text-indigo-900">A <strong>correlated subquery</strong> references a column from the outer query — it runs once for each row.</p>
            </div>

            <div className="rounded-[12px] overflow-hidden border border-slate-200">
              <div className="bg-slate-800 px-4 py-2 flex items-center justify-between">
                <span className="text-[11px] text-slate-400 mono">sql</span>
                <button className="text-[11px] text-slate-400 hover:text-white">Copy</button>
              </div>
              <pre className="mono text-xs sm:text-sm p-4 bg-slate-900 text-emerald-300 overflow-x-auto leading-relaxed">{`SELECT name, salary
FROM employees
WHERE salary > (
  SELECT AVG(salary)
  FROM employees
);`}</pre>
            </div>

            <Card className="p-4">
              <div className="flex items-center gap-2 mb-3">
                <Icon name="cpu" stroke="#6366F1" size={16} />
                <span className="text-sm font-semibold text-slate-800">Try it — SQL Sandbox</span>
                <Badge label="Interactive" color="indigo" />
              </div>
              <textarea defaultValue="SELECT name, salary FROM employees WHERE salary > (SELECT AVG(salary) FROM employees);" rows={3}
                className="w-full mono text-xs sm:text-sm p-3 rounded-[8px] border border-slate-200 bg-slate-50 text-slate-800 outline-none resize-none focus:border-indigo-300" />
              <button className="mt-2 px-3 py-1.5 rounded-[8px] bg-emerald-600 text-white text-xs font-semibold hover:bg-emerald-700 flex items-center gap-1.5">
                <Icon name="play" stroke="white" size={12} /> Run
              </button>
            </Card>

            <div className="flex items-center justify-between pt-2 border-t border-slate-200 flex-wrap gap-3">
              <div className="flex gap-1.5 flex-wrap">
                {["Lesson", "Conversational", "Game", "Video"].map((s, i) => (
                  <button key={s} className={`px-2.5 py-1 rounded-full text-xs font-medium ${i === 0 ? "text-indigo-600" : "text-slate-500"}`}
                    style={i === 0 ? { background: "#EEF0FF" } : { background: "#F1F5F9" }}>{s}</button>
                ))}
              </div>
              <PrimaryBtn onClick={() => setMarked(!marked)}>
                {marked ? "✓ Completed" : "Mark Complete →"}
              </PrimaryBtn>
            </div>
          </div>
        </div>
      </div>

      {/* AI Rail — desktop only */}
      <div className="hidden lg:flex w-56 bg-white border-l border-slate-200 flex-col flex-shrink-0">
        <div className="p-4 border-b border-slate-100">
          <SectionLabel>AI Helper</SectionLabel>
          <div className="rounded-[10px] p-3" style={{ background: "#EEF0FF" }}>
            <p className="text-xs text-indigo-700 font-medium leading-relaxed">Stuck? Ask me anything about subqueries.</p>
          </div>
        </div>
        <div className="p-4 space-y-2">
          <SectionLabel>Quick Actions</SectionLabel>
          {["Summarize this lesson", "Quiz me on subqueries", "Explain with analogy", "More examples"].map(a => (
            <button key={a} className="w-full text-left px-3 py-2 rounded-[8px] text-xs text-slate-700 hover:bg-slate-50 border border-slate-200 hover:border-indigo-200 hover:text-indigo-700 font-medium">{a}</button>
          ))}
        </div>
        <div className="p-4 border-t border-slate-100 mt-auto">
          <SectionLabel>Mastery</SectionLabel>
          <div className="flex justify-between text-xs mb-1"><span className="text-slate-600">Subqueries</span><span className="text-amber-600 font-semibold">54%</span></div>
          <ProgressBar value={54} color="#F59E0B" height={5} />
        </div>
      </div>
    </div>
  );
}

// ─── Knowledge Graph ──────────────────────────────────────────────────────────
export function KnowledgeGraph() {
  const [selected, setSelected] = useState("Subqueries");
  const nodes = [
    { id: "SQL Basics", x: 200, y: 110, mastery: 92, color: "#10B981", status: "Mastered" },
    { id: "JOINs", x: 380, y: 70, mastery: 85, color: "#10B981", status: "Strong" },
    { id: "GROUP BY", x: 330, y: 220, mastery: 78, color: "#0EA5E9", status: "Developing" },
    { id: "Subqueries", x: 210, y: 280, mastery: 54, color: "#F59E0B", status: "Weak" },
    { id: "Window Fns", x: 460, y: 270, mastery: 38, color: "#F43F5E", status: "At-risk" },
    { id: "Indexes", x: 560, y: 150, mastery: 70, color: "#0EA5E9", status: "Developing" },
    { id: "Normalization", x: 80, y: 200, mastery: 88, color: "#10B981", status: "Strong" },
  ];
  const edges = [["SQL Basics","JOINs"],["SQL Basics","GROUP BY"],["SQL Basics","Subqueries"],["JOINs","GROUP BY"],["GROUP BY","Window Fns"],["JOINs","Window Fns"],["Subqueries","Window Fns"],["JOINs","Indexes"],["SQL Basics","Normalization"]];
  const selNode = nodes.find(n => n.id === selected)!;
  const getPos = (id: string) => nodes.find(n => n.id === id) || { x: 0, y: 0 };

  return (
    <div className="flex flex-col lg:flex-row h-full overflow-hidden">
      {/* Canvas */}
      <div className="flex-1 relative bg-slate-50 overflow-hidden min-h-[300px]">
        <div className="absolute top-3 left-3 flex items-center gap-2 z-10 flex-wrap">
          <span className="px-3 py-1.5 rounded-[10px] bg-white border border-slate-200 text-xs font-medium text-slate-700 shadow-sm">DBMS · SQL</span>
          <button className="px-3 py-1.5 rounded-[10px] bg-white border border-slate-200 text-xs font-medium text-slate-500 shadow-sm flex items-center gap-1.5">
            <Icon name="filter" stroke="#64748B" size={13} /> Filter
          </button>
        </div>
        <div className="absolute top-3 right-3 z-10 max-w-[200px] sm:max-w-xs">
          <div className="bg-amber-50 border border-amber-200 rounded-[12px] p-3 shadow-sm">
            <div className="flex items-start gap-2">
              <Icon name="alertTriangle" stroke="#F59E0B" size={14} />
              <div>
                <div className="text-xs font-semibold text-amber-800">Weakness Detected</div>
                <div className="text-[11px] text-amber-700 mt-0.5">Subqueries (54%)</div>
                <button className="mt-1.5 text-[11px] font-semibold px-2 py-1 rounded-full bg-amber-100 text-amber-800">Auto-remediate →</button>
              </div>
            </div>
          </div>
        </div>
        <div className="absolute bottom-3 left-3 flex items-center gap-3 bg-white border border-slate-200 rounded-[10px] px-3 py-2 shadow-sm z-10 flex-wrap">
          {[{ l: "Mastered", c: "#10B981" }, { l: "Developing", c: "#0EA5E9" }, { l: "Weak", c: "#F59E0B" }, { l: "At-risk", c: "#F43F5E" }].map(l => (
            <div key={l.l} className="flex items-center gap-1.5"><div className="w-2.5 h-2.5 rounded-full" style={{ background: l.c }} /><span className="text-xs text-slate-500">{l.l}</span></div>
          ))}
        </div>
        <svg className="w-full h-full" viewBox="0 0 660 360" preserveAspectRatio="xMidYMid meet">
          {edges.map(([a, b], i) => {
            const pa = getPos(a); const pb = getPos(b);
            return <line key={i} x1={pa.x} y1={pa.y} x2={pb.x} y2={pb.y} stroke="#E2E8F0" strokeWidth="1.5" strokeDasharray="4,3" />;
          })}
          {nodes.map(n => (
            <g key={n.id} onClick={() => setSelected(n.id)} className="cursor-pointer" transform={`translate(${n.x},${n.y})`}>
              <circle r={n.id === selected ? 34 : 26} fill={n.color} opacity="0.12" />
              <circle r={n.id === selected ? 26 : 20} fill={n.color} opacity={n.id === selected ? 1 : 0.8}
                stroke={n.id === selected ? "white" : "transparent"} strokeWidth={3}
                style={{ filter: n.id === selected ? `drop-shadow(0 0 6px ${n.color})` : "none" }} />
              <text textAnchor="middle" dy="4" fontSize="9" fontWeight="700" fill="white" fontFamily="Inter">{n.mastery}%</text>
              <text textAnchor="middle" dy="40" fontSize="10" fontWeight="600" fill="#334155" fontFamily="Inter">{n.id}</text>
            </g>
          ))}
        </svg>
      </div>

      {/* Side panel */}
      <div className="w-full lg:w-68 bg-white border-t lg:border-t-0 lg:border-l border-slate-200 flex flex-col" style={{ minWidth: 0 }}>
        <div className="p-4 border-b border-slate-100">
          <SectionLabel>Selected Concept</SectionLabel>
          <div className="flex items-center gap-3 mb-3">
            <div className="w-12 h-12 rounded-[12px] flex items-center justify-center" style={{ background: selNode?.color + "20" }}>
              <span className="text-sm font-bold tabular" style={{ color: selNode?.color }}>{selNode?.mastery}%</span>
            </div>
            <div>
              <div className="text-sm font-bold text-slate-900">{selected}</div>
              <Badge label={selNode?.status || ""} color={selNode?.status === "Mastered" || selNode?.status === "Strong" ? "emerald" : selNode?.status === "Developing" ? "sky" : selNode?.status === "Weak" ? "amber" : "rose"} />
            </div>
          </div>
          <ProgressBar value={selNode?.mastery || 0} color={selNode?.color} height={6} />
          <div className="grid grid-cols-2 gap-2 mt-3 text-xs">
            <div className="bg-slate-50 rounded-[8px] p-2"><div className="text-slate-400">Last practiced</div><div className="font-semibold text-slate-800 mt-0.5">2 days ago</div></div>
            <div className="bg-slate-50 rounded-[8px] p-2"><div className="text-slate-400">Time spent</div><div className="font-semibold text-slate-800 mt-0.5">3.5 hours</div></div>
          </div>
        </div>
        <div className="p-4 flex-1 overflow-y-auto">
          <SectionLabel>All Topics</SectionLabel>
          <div className="space-y-1.5">
            {nodes.map(n => (
              <div key={n.id} className={`flex items-center gap-2 p-2 rounded-[8px] cursor-pointer hover:bg-slate-50 ${n.id === selected ? "bg-slate-50" : ""}`} onClick={() => setSelected(n.id)}>
                <div className="w-2 h-2 rounded-full flex-shrink-0" style={{ background: n.color }} />
                <span className="text-xs text-slate-700 flex-1">{n.id}</span>
                <span className="text-xs tabular font-semibold" style={{ color: n.color }}>{n.mastery}%</span>
              </div>
            ))}
          </div>
        </div>
        <div className="p-4 border-t border-slate-100 space-y-2">
          <PrimaryBtn className="w-full">Start Remedial Course</PrimaryBtn>
          <SecondaryBtn className="w-full">Practice Questions</SecondaryBtn>
        </div>
      </div>
    </div>
  );
}

// ─── Assessment ───────────────────────────────────────────────────────────────
export function Assessment({ onNav }: { onNav: (s: StudentScreen) => void }) {
  const [q, setQ] = useState(1);
  const [selected, setSelected] = useState<number | null>(null);
  const [sqlAnswer, setSqlAnswer] = useState("");
  const [hintShown, setHintShown] = useState(false);
  const total = 5;

  const isSql = q === 2;

  return (
    <div className="min-h-full bg-slate-50">
      <div className="bg-white border-b border-slate-200 px-4 sm:px-6 py-4">
        <div className="max-w-2xl mx-auto">
          <div className="flex items-center justify-between mb-3 flex-wrap gap-2">
            <div>
              <div className="text-xs text-slate-400 font-medium mb-0.5">Assessment · SQL Subqueries · Adaptive</div>
              <div className="flex items-center gap-2 flex-wrap">
                <span className="text-sm font-bold text-slate-900">Q{q} of {total}</span>
                <Badge label="Adaptive" color="indigo" />
                <Badge label="Intermediate" color="sky" />
              </div>
            </div>
            <div className="flex items-center gap-1.5 text-sm tabular font-semibold text-slate-600 bg-slate-100 px-3 py-1.5 rounded-[8px]">
              <Icon name="clock" stroke="#64748B" size={14} /> 4:32
            </div>
          </div>
          <ProgressBar value={(q / total) * 100} height={5} />
        </div>
      </div>

      <div className="max-w-2xl mx-auto p-4 sm:p-6 space-y-4 fade-in">
        <Card className="p-5 sm:p-6">
          <SectionLabel>Question {q}</SectionLabel>
          <p className="text-sm sm:text-base font-medium text-slate-900 leading-relaxed mb-5">
            {isSql
              ? "Write an SQL query to find all departments that have at least one employee earning more than $80,000 using a subquery."
              : "Which SQL query correctly uses a subquery to find employees earning above the average salary?"}
          </p>

          {!isSql && (
            <div className="space-y-2.5">
              {["SELECT name FROM emp WHERE salary > AVG(salary);",
                "SELECT name FROM emp WHERE salary > (SELECT AVG(salary) FROM emp);",
                "SELECT name FROM emp HAVING salary > AVG(salary);",
                "SELECT name FROM emp WHERE AVG(salary) < salary;"].map((opt, i) => (
                <button key={`opt-${i}`} onClick={() => setSelected(i)}
                  className={`w-full text-left p-3.5 rounded-[10px] border-2 transition-all flex items-start gap-3 text-sm ${selected === i ? "border-indigo-400" : "border-slate-200 hover:border-slate-300"}`}
                  style={selected === i ? { background: "#EEF0FF" } : {}}>
                  <span className={`w-6 h-6 rounded-full border-2 flex-shrink-0 flex items-center justify-center text-xs font-bold mt-0.5 ${selected === i ? "border-indigo-500 bg-indigo-500 text-white" : "border-slate-300 text-slate-400"}`}>
                    {String.fromCharCode(65 + i)}
                  </span>
                  <span className="mono text-xs sm:text-sm">{opt}</span>
                </button>
              ))}
            </div>
          )}

          {isSql && (
            <div>
              <div className="rounded-[10px] overflow-hidden border border-slate-200">
                <div className="bg-slate-800 px-4 py-2 flex items-center gap-2">
                  <div className="flex gap-1.5"><div className="w-2.5 h-2.5 rounded-full bg-red-400" /><div className="w-2.5 h-2.5 rounded-full bg-amber-400" /><div className="w-2.5 h-2.5 rounded-full bg-emerald-400" /></div>
                  <span className="text-[11px] text-slate-400 mono ml-2">SQL Editor</span>
                </div>
                <textarea value={sqlAnswer} onChange={e => setSqlAnswer(e.target.value)}
                  placeholder="-- Write your SQL query here&#10;SELECT ..." rows={7}
                  className="w-full p-4 mono text-sm text-emerald-400 bg-slate-900 outline-none resize-none placeholder:text-slate-600" />
              </div>
              <button className="mt-2 px-4 py-2 rounded-[10px] bg-emerald-600 text-white text-xs font-semibold hover:bg-emerald-700 flex items-center gap-2">
                <Icon name="play" stroke="white" size={13} /> Run Query
              </button>
            </div>
          )}

          {hintShown && (
            <div className="mt-4 p-3 rounded-[10px] bg-violet-50 border border-violet-100 fade-in">
              <div className="text-xs font-semibold text-violet-700 mb-1">🔮 Socratic Hint</div>
              <p className="text-xs text-violet-700">Think: what does AVG(salary) return — a single value or many? How does a subquery isolate that?</p>
            </div>
          )}
        </Card>

        <div className="flex items-center justify-between flex-wrap gap-3">
          <button onClick={() => setHintShown(!hintShown)} className="text-sm text-indigo-500 hover:text-indigo-700 font-medium">🔮 Need a hint (Socratic)</button>
          <div className="flex gap-2">
            <SecondaryBtn onClick={() => setQ(Math.max(1, q - 1))}>← Prev</SecondaryBtn>
            {q < total
              ? <PrimaryBtn onClick={() => { setQ(q + 1); setSelected(null); }}>Next →</PrimaryBtn>
              : <PrimaryBtn onClick={() => onNav("assessment-results")}>Submit</PrimaryBtn>}
          </div>
        </div>
      </div>
    </div>
  );
}

// ─── Assessment Results ───────────────────────────────────────────────────────
export function AssessmentResults({ onNav }: { onNav: (s: StudentScreen) => void }) {
  const concepts = [
    { label: "Single-row subqueries", mastery: 90, color: "#10B981", badge: "emerald" as const, status: "Mastered" },
    { label: "Multi-row subqueries", mastery: 75, color: "#0EA5E9", badge: "sky" as const, status: "Good" },
    { label: "Correlated subqueries", mastery: 40, color: "#F43F5E", badge: "rose" as const, status: "Needs work" },
    { label: "EXISTS vs IN", mastery: 35, color: "#F43F5E", badge: "rose" as const, status: "Needs work" },
    { label: "Scalar subqueries", mastery: 80, color: "#0EA5E9", badge: "sky" as const, status: "Good" },
  ];
  return (
    <div className="p-4 sm:p-6 max-w-[800px] mx-auto space-y-5">
      <Card className="p-6 sm:p-8 text-center">
        <div className="flex flex-col items-center">
          <ProgressRing value={60} size={100} stroke={10} color="#6366F1" label="3/5" />
          <h2 className="text-xl sm:text-2xl font-bold text-slate-900 mt-4 tracking-tight">Good — let's close the gaps</h2>
          <p className="text-slate-500 text-sm mt-2">SQL Subqueries · Adaptive Assessment</p>
          <div className="flex flex-wrap justify-center items-center gap-2 mt-3">
            <Badge label="Intermediate" color="sky" />
            <Badge label="+120 XP earned" color="indigo" />
          </div>
        </div>
      </Card>

      <Card className="p-5" style={{ background: "linear-gradient(135deg,rgba(99,102,241,0.06),rgba(139,92,246,0.06))", borderColor: "#C7D2FE" }}>
        <div className="flex items-start gap-3">
          <div className="w-9 h-9 rounded-full flex-shrink-0 flex items-center justify-center text-white text-xs font-bold" style={{ background: "linear-gradient(135deg,#6366F1,#8B5CF6)" }}>AI</div>
          <div>
            <div className="text-xs font-semibold text-indigo-700 mb-1">AI Insight</div>
            <p className="text-sm text-slate-800 leading-relaxed">You grasp single-row subqueries but confuse correlated subqueries with joins. A 25-minute focused session should close this gap completely.</p>
          </div>
        </div>
      </Card>

      <Card className="p-5">
        <SectionLabel>Concept Breakdown</SectionLabel>
        <div className="space-y-3.5">
          {concepts.map(c => (
            <div key={c.label} className="flex items-center gap-4">
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2 mb-1.5 flex-wrap">
                  <span className="text-sm font-medium text-slate-800">{c.label}</span>
                  <Badge label={c.status} color={c.badge} />
                </div>
                <ProgressBar value={c.mastery} color={c.color} height={6} />
              </div>
              <span className="text-sm tabular font-bold flex-shrink-0" style={{ color: c.color }}>{c.mastery}%</span>
            </div>
          ))}
        </div>
      </Card>

      <div className="flex flex-wrap gap-3">
        <PrimaryBtn className="flex-1" onClick={() => onNav("course-player")}>Start Remedial Course →</PrimaryBtn>
        <SecondaryBtn>Review Answers</SecondaryBtn>
        <SecondaryBtn onClick={() => onNav("assessment")}>Re-attempt</SecondaryBtn>
      </div>
    </div>
  );
}

// ─── Gamification ─────────────────────────────────────────────────────────────
export function Gamification() {
  const badges = [
    { label: "7-Day Streak", icon: "🔥", earned: true }, { label: "SQL Starter", icon: "🎯", earned: true },
    { label: "First Course", icon: "📚", earned: true }, { label: "Quiz Master", icon: "⚡", earned: true },
    { label: "Concept Crusher", icon: "💡", earned: true }, { label: "Deep Dive", icon: "🔬", earned: false },
    { label: "Window Wizard", icon: "🪄", earned: false }, { label: "Speed Learner", icon: "🚀", earned: false },
  ];
  const leaderboard = [
    { rank: 1, name: "Keerthana R.", xp: 3180, avatar: "KR" },
    { rank: 2, name: "Dev Patel", xp: 2890, avatar: "DP" },
    { rank: 3, name: "Aarav Sharma", xp: 2480, avatar: "AS", isMe: true },
    { rank: 4, name: "Priya Nair", xp: 2240, avatar: "PN" },
    { rank: 5, name: "Arjun M.", xp: 2100, avatar: "AM" },
  ];
  const cal = Array.from({ length: 4 }, () => Array.from({ length: 7 }, () => ({ intensity: Math.random() > 0.3 ? Math.floor(Math.random() * 3) + 1 : 0 })));
  const iBg = ["bg-slate-100", "bg-indigo-100", "bg-indigo-300", "bg-indigo-500"];

  return (
    <div className="p-4 sm:p-6 space-y-5 max-w-[1200px] mx-auto">
      {/* Level hero */}
      <div className="rounded-[16px] p-5 sm:p-6 text-white" style={{ background: "linear-gradient(135deg,#6366F1,#8B5CF6)" }}>
        <div className="flex items-center justify-between mb-4 flex-wrap gap-3">
          <div>
            <div className="text-sm font-medium text-white/70">Current Level</div>
            <div className="text-3xl sm:text-4xl font-bold tracking-tight mt-1">Level 7</div>
            <div className="text-sm text-white/80 mt-1">AI Builders — Coimbatore · Rank #3</div>
          </div>
          <div className="text-right">
            <div className="text-2xl sm:text-3xl font-bold tabular">2,480</div>
            <div className="text-sm text-white/70">/ 3,000 XP</div>
          </div>
        </div>
        <div className="bg-white/20 rounded-full h-3 overflow-hidden">
          <div className="h-full bg-white rounded-full" style={{ width: "82.7%" }} />
        </div>
        <div className="text-xs text-white/60 mt-2">Next reward at Level 8: 🏆 Deep Dive Badge + 500 XP Bonus</div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {/* Streak */}
        <Card className="p-5">
          <div className="flex items-start justify-between mb-3">
            <div>
              <SectionLabel>Streak</SectionLabel>
              <div className="text-3xl font-bold text-amber-500 tabular">🔥 12</div>
              <div className="text-sm text-slate-500 mt-0.5">days in a row · Best: 18</div>
            </div>
          </div>
          <SectionLabel>Last 4 weeks</SectionLabel>
          <div className="grid gap-1" style={{ gridTemplateColumns: "repeat(7,1fr)" }}>
            {["M","T","W","T","F","S","S"].map((d, i) => <div key={`hd-${i}`} className="text-center text-[9px] text-slate-400">{d}</div>)}
            {cal.flatMap((week, wi) => week.map((day, di) => (
              <div key={`${wi}-${di}`} className={`aspect-square rounded-sm ${iBg[day.intensity]}`} />
            )))}
          </div>
        </Card>

        {/* Badges */}
        <Card className="p-5">
          <SectionLabel>Badges — 5/8 earned</SectionLabel>
          <div className="grid grid-cols-4 gap-2">
            {badges.map(b => (
              <div key={b.label} className={`flex flex-col items-center gap-1 p-2 rounded-[10px] ${b.earned ? "hover:bg-slate-50" : "opacity-40"}`}>
                <div className={`w-9 h-9 rounded-full flex items-center justify-center text-lg bg-slate-50 ${!b.earned ? "grayscale" : ""}`}>{b.icon}</div>
                <span className="text-[9px] text-center text-slate-500 font-medium leading-tight">{b.label}</span>
              </div>
            ))}
          </div>
        </Card>

        {/* Daily Challenges */}
        <Card className="p-5">
          <SectionLabel>Daily Challenges</SectionLabel>
          <div className="space-y-2.5">
            {[{ title: "Complete 1 quiz", xp: 50, done: true }, { title: "Study 30 minutes", xp: 80, done: true }, { title: "Answer a peer's question", xp: 120, done: false }].map((c, i) => (
              <div key={i} className={`flex items-center gap-3 p-3 rounded-[10px] ${c.done ? "bg-emerald-50 border border-emerald-100" : "bg-slate-50 border border-slate-200"}`}>
                <div className={`w-5 h-5 rounded-full flex items-center justify-center flex-shrink-0 ${c.done ? "bg-emerald-400" : "bg-slate-200"}`}>
                  {c.done ? <Icon name="check" stroke="white" size={10} /> : <span className="text-[10px] font-bold text-slate-400">{i+1}</span>}
                </div>
                <span className={`text-xs flex-1 font-medium ${c.done ? "text-emerald-700 line-through" : "text-slate-700"}`}>{c.title}</span>
                <span className={`text-xs font-bold tabular ${c.done ? "text-emerald-600" : "text-indigo-600"}`}>+{c.xp}</span>
              </div>
            ))}
          </div>
        </Card>

        {/* Leaderboard */}
        <Card className="sm:col-span-2 p-5">
          <div className="flex items-center justify-between mb-4"><SectionLabel>Leaderboard · AI Builders</SectionLabel><Badge label="You: #3" color="indigo" /></div>
          <div className="space-y-2">
            {leaderboard.map((p, i) => (
              <div key={i} className={`flex items-center gap-3 p-3 rounded-[10px] ${p.isMe ? "border border-indigo-200" : "hover:bg-slate-50"}`} style={p.isMe ? { background: "#EEF0FF" } : {}}>
                <span className="text-sm font-bold tabular w-5 text-center">{p.rank <= 3 ? ["🥇","🥈","🥉"][p.rank-1] : p.rank}</span>
                <div className="w-8 h-8 rounded-full flex items-center justify-center text-xs font-semibold" style={{ background: p.isMe ? "linear-gradient(135deg,#6366F1,#8B5CF6)" : "#E2E8F0", color: p.isMe ? "white" : "#64748B" }}>{p.avatar}</div>
                <span className={`flex-1 text-sm font-medium ${p.isMe ? "text-indigo-800 font-semibold" : "text-slate-700"}`}>{p.name}{p.isMe ? " (You)" : ""}</span>
                <span className="tabular text-sm font-bold text-slate-800">{p.xp.toLocaleString()}</span>
              </div>
            ))}
          </div>
        </Card>

        {/* Mastery bars */}
        <Card className="p-5">
          <SectionLabel>Topic Mastery</SectionLabel>
          <div className="space-y-3">
            {[{ label: "SQL Basics", value: 92, color: "#10B981" }, { label: "JOINs", value: 85, color: "#10B981" }, { label: "GROUP BY", value: 78, color: "#0EA5E9" }, { label: "Subqueries", value: 54, color: "#F59E0B" }, { label: "Window Fns", value: 38, color: "#F43F5E" }].map(m => (
              <div key={m.label}>
                <div className="flex justify-between text-xs mb-1"><span className="text-slate-600">{m.label}</span><span className="tabular font-semibold" style={{ color: m.color }}>{m.value}%</span></div>
                <ProgressBar value={m.value} color={m.color} height={5} />
              </div>
            ))}
          </div>
        </Card>
      </div>
    </div>
  );
}

// ─── Goal Roadmap ─────────────────────────────────────────────────────────────
export function GoalRoadmap() {
  const [expanded, setExpanded] = useState<number | null>(2);
  const phases = [
    { id: 0, label: "Foundations", status: "done", skills: ["Python Basics", "Linux CLI", "Git"], courses: ["Python Crash Course"] },
    { id: 1, label: "Math & Statistics", status: "done", skills: ["Linear Algebra", "Probability", "Stats"], courses: ["Math for ML"] },
    { id: 2, label: "ML Core", status: "current", skills: ["Supervised Learning", "Model Evaluation", "Feature Eng."], courses: ["Machine Learning Foundations (6 weeks)"] },
    { id: 3, label: "Deep Learning", status: "locked", skills: ["Neural Networks", "CNNs", "Transformers"], courses: ["Deep Learning Specialization"] },
    { id: 4, label: "Projects & Portfolio", status: "locked", skills: ["End-to-end ML", "MLOps", "GitHub"], courses: ["Build 5 real-world projects"] },
    { id: 5, label: "Interview Prep", status: "locked", skills: ["DSA for ML", "System Design", "Behavioural"], courses: ["ML Interview Mastery"] },
  ];
  const cfg: Record<string, any> = {
    done: { color: "#10B981", bg: "#ECFDF5", icon: "check" },
    current: { color: "#6366F1", bg: "#EEF0FF", icon: "play" },
    locked: { color: "#94A3B8", bg: "#F1F5F9", icon: "lock" },
  };
  return (
    <div className="p-4 sm:p-6 max-w-[800px] mx-auto">
      <div className="flex items-start justify-between mb-8 flex-wrap gap-4">
        <div>
          <SectionLabel>Goal Roadmap</SectionLabel>
          <h1 className="text-xl sm:text-2xl font-bold text-slate-900 tracking-tight">Become an AI Engineer</h1>
          <div className="flex items-center gap-3 mt-2 flex-wrap">
            <Badge label="42% complete" color="indigo" />
            <span className="text-sm text-slate-500">ETA: ~8 months at current pace</span>
          </div>
        </div>
        <ProgressRing value={42} size={64} stroke={7} color="#6366F1" label="42%" />
      </div>

      <div className="relative">
        <div className="absolute left-6 top-0 bottom-0 w-0.5 bg-slate-200" />
        <div className="space-y-4">
          {phases.map(phase => {
            const c = cfg[phase.status];
            const isExpanded = expanded === phase.id;
            return (
              <div key={phase.id} className="relative pl-16">
                <div className="absolute left-0 top-4 w-12 h-12 rounded-full flex items-center justify-center border-4 border-white shadow-sm z-10" style={{ background: c.bg }}>
                  <Icon name={c.icon} stroke={c.color} size={17} />
                </div>
                <Card className={`overflow-hidden ${phase.status === "locked" ? "opacity-60" : ""}`}>
                  <button className="w-full text-left p-4 sm:p-5 flex items-center gap-4"
                    onClick={() => setExpanded(isExpanded ? null : phase.id)} disabled={phase.status === "locked"}>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 flex-wrap">
                        <span className="text-xs text-slate-400 font-medium">Phase {phase.id + 1}</span>
                        <Badge label={phase.status === "done" ? "Completed" : phase.status === "current" ? "In Progress" : "Locked"} color={phase.status === "done" ? "emerald" : phase.status === "current" ? "indigo" : "slate"} />
                      </div>
                      <div className="text-sm sm:text-base font-semibold text-slate-900 mt-0.5">{phase.label}</div>
                    </div>
                    <Icon name={isExpanded ? "chevronDown" : "chevronRight"} stroke="#94A3B8" size={18} />
                  </button>
                  {isExpanded && (
                    <div className="border-t border-slate-100 px-4 sm:px-5 pb-5 fade-in">
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-4">
                        <div>
                          <SectionLabel>Skills</SectionLabel>
                          <div className="flex flex-wrap gap-1.5">{phase.skills.map(s => <Badge key={s} label={s} color="indigo" />)}</div>
                        </div>
                        <div>
                          <SectionLabel>Courses</SectionLabel>
                          {phase.courses.map(c => (
                            <div key={c} className="flex items-center gap-2 text-xs text-slate-700"><Icon name="book" stroke="#6366F1" size={12} />{c}</div>
                          ))}
                        </div>
                      </div>
                      {phase.status === "current" && (
                        <div className="mt-4 flex gap-2 flex-wrap">
                          <PrimaryBtn>Continue Learning →</PrimaryBtn>
                          <SecondaryBtn>View Knowledge Graph</SecondaryBtn>
                        </div>
                      )}
                    </div>
                  )}
                </Card>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}

// ─── Projects ─────────────────────────────────────────────────────────────────
export function Projects() {
  const milestones = [
    { label: "Set up project repo", done: true },
    { label: "Load and explore MovieLens dataset", done: true },
    { label: "Build collaborative filtering model", done: false },
    { label: "Evaluate with RMSE & precision", done: false },
    { label: "Deploy as simple API", done: false },
  ];
  const rubric = [
    { label: "Functionality", weight: 30, score: 22 },
    { label: "ML Approach", weight: 30, score: 25 },
    { label: "Code Quality", weight: 20, score: 0 },
    { label: "Documentation", weight: 20, score: 0 },
  ];
  return (
    <div className="p-4 sm:p-6 max-w-[1100px] mx-auto space-y-5">
      <h1 className="text-xl sm:text-2xl font-bold text-slate-900 tracking-tight">Projects</h1>
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-5">
        {/* Hero project */}
        <Card className="lg:col-span-2 overflow-hidden">
          <div className="h-2 bg-gradient-to-r from-indigo-500 to-violet-500" />
          <div className="p-5">
            <div className="flex items-start justify-between flex-wrap gap-3">
              <div>
                <Badge label="Current Project" color="indigo" />
                <h2 className="text-base sm:text-lg font-bold text-slate-900 mt-2 leading-snug">Build a Movie Recommender</h2>
                <p className="text-xs text-slate-500 mt-1">Calibrated to your level · Collaborative Filtering</p>
              </div>
              <Badge label="In Progress" color="sky" />
            </div>
            <div className="mt-4 text-sm text-slate-700 leading-relaxed">
              Build a personalised movie recommendation system using collaborative filtering on the MovieLens dataset. Implement, evaluate, and deploy as a REST API.
            </div>
            <div className="flex flex-wrap gap-1.5 mt-3">
              {["Python", "Pandas", "Scikit-learn", "Collaborative Filtering", "FastAPI"].map(t => (
                <span key={t} className="px-2 py-0.5 rounded-full text-[10px] font-medium bg-slate-100 text-slate-500">{t}</span>
              ))}
            </div>
            <div className="mt-5">
              <SectionLabel>Milestones</SectionLabel>
              <div className="space-y-2">
                {milestones.map((m, i) => (
                  <div key={i} className="flex items-center gap-3">
                    <div className={`w-5 h-5 rounded-full border-2 flex-shrink-0 flex items-center justify-center ${m.done ? "border-emerald-400 bg-emerald-400" : "border-slate-300"}`}>
                      {m.done && <Icon name="check" stroke="white" size={10} />}
                    </div>
                    <span className={`text-sm ${m.done ? "line-through text-slate-400" : "text-slate-700"}`}>{m.label}</span>
                  </div>
                ))}
              </div>
            </div>
            <div className="mt-5 pt-4 border-t border-slate-100">
              <SectionLabel>Submit / Upload</SectionLabel>
              <div className="border-2 border-dashed border-slate-200 rounded-[12px] p-6 text-center hover:border-indigo-300 transition-colors cursor-pointer">
                <Icon name="upload" stroke="#94A3B8" size={24} className="mx-auto mb-2" />
                <div className="text-sm font-medium text-slate-600">Drop files or click to upload</div>
                <div className="text-xs text-slate-400 mt-1">.py, .ipynb, .zip — max 50MB</div>
              </div>
            </div>
          </div>
        </Card>

        {/* AI Rubric */}
        <Card className="p-5">
          <SectionLabel>AI Rubric</SectionLabel>
          <div className="space-y-4">
            {rubric.map(r => (
              <div key={r.label}>
                <div className="flex justify-between text-xs mb-1.5">
                  <span className="font-medium text-slate-700">{r.label}</span>
                  <span className="text-slate-400">{r.weight}%</span>
                </div>
                <ProgressBar value={r.weight} color="#E2E8F0" height={6} />
                {r.score > 0 && (
                  <div className="flex justify-between text-xs mt-1">
                    <span className="text-emerald-600 font-medium">Score: {r.score}/{r.weight}</span>
                    <span className="text-emerald-500">{Math.round((r.score/r.weight)*100)}%</span>
                  </div>
                )}
              </div>
            ))}
          </div>
          <div className="mt-5 p-3 rounded-[10px]" style={{ background: "#EEF0FF" }}>
            <div className="text-xs font-semibold text-indigo-700">Current score: 47 / 100</div>
            <ProgressBar value={47} className="mt-2" />
          </div>
          <PrimaryBtn className="w-full mt-4">Request AI Review</PrimaryBtn>
          <p className="text-[10px] text-slate-400 text-center mt-2">AI will analyse your code and give per-criterion feedback.</p>
        </Card>
      </div>
    </div>
  );
}

// ─── AI Mentor ────────────────────────────────────────────────────────────────
export function Mentor() {
  const insights = [
    { emoji: "📈", text: "You're strongest in JOINs — 85% mastery, consistently accurate." },
    { emoji: "⚠️", text: "Subqueries are slowing you down — correlated queries need attention." },
    { emoji: "💡", text: "Try learning interactively — you retain 28% more in that mode." },
    { emoji: "⏰", text: "You focus best 7–9pm. Schedule tough topics then." },
    { emoji: "🎯", text: "On track for your AI Engineer goal — 2 milestones left." },
  ];
  return (
    <div className="p-4 sm:p-6 max-w-[800px] mx-auto space-y-5">
      <Card className="p-5">
        <div className="flex items-center gap-4">
          <div className="w-14 h-14 rounded-full flex items-center justify-center text-2xl flex-shrink-0" style={{ background: "linear-gradient(135deg,#6366F1,#8B5CF6)" }}>🤖</div>
          <div>
            <div className="text-[10px] font-semibold uppercase tracking-widest text-slate-400 mb-0.5">Your Mentor</div>
            <div className="text-base font-bold text-slate-900">LearnOS AI Coach</div>
            <div className="text-xs text-slate-400 mt-0.5">Weekly report · Updated today</div>
          </div>
        </div>
      </Card>

      <Card className="p-5">
        <SectionLabel>This Week's Insights</SectionLabel>
        <div className="space-y-3">
          {insights.map((ins, i) => (
            <div key={i} className="flex items-start gap-3 p-3.5 rounded-[12px] bg-slate-50 border border-slate-200 hover:border-indigo-200 hover:bg-indigo-50/50 transition-colors">
              <span className="text-xl flex-shrink-0">{ins.emoji}</span>
              <p className="text-sm text-slate-700 leading-relaxed">{ins.text}</p>
            </div>
          ))}
        </div>
      </Card>

      <Card className="p-5">
        <SectionLabel>Summary</SectionLabel>
        <p className="text-sm text-slate-700 leading-relaxed">You're making solid progress toward becoming an AI Engineer. Your SQL fundamentals are strong, but correlated subqueries and window functions need focused remediation. Given your 7–9pm focus window and preference for interactive learning, I've scheduled a 25-minute interactive session on correlated subqueries for tonight. Keep that streak going — 12 days is great!</p>
      </Card>

      <div>
        <PrimaryBtn className="w-full sm:w-auto">Start Tonight's Recommended Session →</PrimaryBtn>
      </div>
    </div>
  );
}

// ─── Peer Learning ────────────────────────────────────────────────────────────
export function PeerLearning() {
  const members = ["AS", "KR", "DP", "PN", "AM", "RK"];
  return (
    <div className="p-4 sm:p-6 max-w-[1100px] mx-auto space-y-6">
      <h1 className="text-xl sm:text-2xl font-bold text-slate-900 tracking-tight">Peer Learning</h1>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
        {/* My Group */}
        <Card className="p-5">
          <SectionLabel>My Group</SectionLabel>
          <div className="flex items-center justify-between mb-3">
            <div className="font-semibold text-slate-900 text-sm">AI Builders — Coimbatore</div>
            <Badge label="6 members" color="indigo" />
          </div>
          <div className="flex -space-x-2 mb-3">
            {members.map((m, i) => (
              <div key={i} className="w-8 h-8 rounded-full border-2 border-white flex items-center justify-center text-[10px] font-semibold text-white" style={{ background: `hsl(${i*50+200},70%,55%)` }}>{m}</div>
            ))}
          </div>
          <div className="text-xs text-slate-500 mb-4">Shared goal: Crack placements & build AI projects</div>
          <div className="space-y-2">
            <div className="flex justify-between text-xs"><span className="text-slate-600">Group mastery</span><span className="text-indigo-600 font-semibold">68%</span></div>
            <ProgressBar value={68} />
          </div>
          <SecondaryBtn className="w-full mt-4">Open Group Chat</SecondaryBtn>
        </Card>

        {/* Collaborative Challenge */}
        <Card className="p-5" style={{ background: "linear-gradient(135deg,rgba(99,102,241,0.05),rgba(139,92,246,0.05))", borderColor: "#C7D2FE" }}>
          <SectionLabel>Active Challenge</SectionLabel>
          <div className="font-bold text-slate-900 text-sm mb-1">Build a SQL analytics dashboard together</div>
          <div className="flex items-center gap-2 mb-4 flex-wrap">
            <Badge label="Group project" color="indigo" />
            <span className="text-xs text-slate-400 flex items-center gap-1"><Icon name="clock" stroke="#94A3B8" size={11} />Due in 3 days</span>
          </div>
          <div className="mb-1 flex justify-between text-xs text-slate-500"><span>Group progress</span><span>42%</span></div>
          <ProgressBar value={42} />
          <PrimaryBtn className="w-full mt-4">Join Session →</PrimaryBtn>
        </Card>

        {/* Suggested matches */}
        <Card className="p-5">
          <SectionLabel>Suggested Study Partners</SectionLabel>
          <div className="space-y-3">
            {[
              { name: "Priya Nair", strong: "Window Functions", avatar: "PN" },
              { name: "Dev Patel", strong: "Indexes & Transactions", avatar: "DP" },
              { name: "Keerthana R.", strong: "JOINs & GROUP BY", avatar: "KR" },
            ].map(p => (
              <div key={p.name} className="flex items-center gap-3 p-3 rounded-[10px] bg-slate-50 border border-slate-200">
                <div className="w-9 h-9 rounded-full flex items-center justify-center text-xs font-bold text-white" style={{ background: "linear-gradient(135deg,#10B981,#0EA5E9)" }}>{p.avatar}</div>
                <div className="flex-1 min-w-0">
                  <div className="text-sm font-semibold text-slate-900">{p.name}</div>
                  <div className="text-[11px] text-slate-400">Strong in: {p.strong}</div>
                </div>
                <SecondaryBtn className="text-xs px-3 py-1.5">Connect</SecondaryBtn>
              </div>
            ))}
          </div>
        </Card>

        {/* Group leaderboard */}
        <Card className="p-5">
          <SectionLabel>Group Leaderboard</SectionLabel>
          <div className="space-y-2">
            {[{ rank: 1, name: "Keerthana R.", xp: 3180, avatar: "KR" }, { rank: 2, name: "Dev Patel", xp: 2890, avatar: "DP" }, { rank: 3, name: "Aarav Sharma", xp: 2480, avatar: "AS", isMe: true }, { rank: 4, name: "Priya Nair", xp: 2240, avatar: "PN" }].map(p => (
              <div key={p.rank} className={`flex items-center gap-3 p-3 rounded-[10px] ${p.isMe ? "border border-indigo-200" : "hover:bg-slate-50"}`} style={p.isMe ? { background: "#EEF0FF" } : {}}>
                <span className="text-sm w-4 text-center">{p.rank <= 3 ? ["🥇","🥈","🥉"][p.rank-1] : p.rank}</span>
                <div className="w-7 h-7 rounded-full flex items-center justify-center text-[10px] font-bold text-white" style={{ background: p.isMe ? "linear-gradient(135deg,#6366F1,#8B5CF6)" : "#CBD5E1", color: p.isMe ? "white" : "#64748B" }}>{p.avatar}</div>
                <span className={`flex-1 text-xs font-medium ${p.isMe ? "text-indigo-800" : "text-slate-700"}`}>{p.name}</span>
                <span className="tabular text-xs font-bold text-slate-800">{p.xp.toLocaleString()} XP</span>
              </div>
            ))}
          </div>
        </Card>
      </div>
    </div>
  );
}

// ─── Profile / Settings ───────────────────────────────────────────────────────
export function Profile() {
  const [tab, setTab] = useState<"profile" | "memory" | "notifications" | "account" | "privacy">("profile");
  const [memToggles, setMemToggles] = useState({ strengths: true, weaknesses: true, pace: true, focusTimes: true, mistakes: true });
  const tabs = ["profile", "memory", "notifications", "account", "privacy"] as const;

  return (
    <div className="p-4 sm:p-6 max-w-[800px] mx-auto space-y-5">
      {/* Profile header */}
      <Card className="p-5">
        <div className="flex items-center gap-4">
          <div className="w-16 h-16 rounded-full flex items-center justify-center text-xl font-bold text-white flex-shrink-0" style={{ background: "linear-gradient(135deg,#6366F1,#8B5CF6)" }}>AS</div>
          <div className="flex-1 min-w-0">
            <div className="text-base font-bold text-slate-900">Aarav Sharma</div>
            <div className="text-sm text-slate-500">2nd Year B.E. CSE · Coimbatore</div>
            <div className="flex items-center gap-2 mt-2 flex-wrap">
              <Badge label="Level 7" color="indigo" />
              <Badge label="2,480 XP" color="violet" />
              <Badge label="🔥 12-day streak" color="amber" />
            </div>
          </div>
          <SecondaryBtn>Edit</SecondaryBtn>
        </div>
      </Card>

      {/* Tabs */}
      <div className="flex gap-1 overflow-x-auto scrollbar-hide bg-slate-100 rounded-[10px] p-1">
        {tabs.map(t => (
          <button key={t} onClick={() => setTab(t)}
            className={`px-3 py-1.5 rounded-[8px] text-xs font-semibold capitalize whitespace-nowrap transition-all ${tab === t ? "bg-white text-slate-900 shadow-sm" : "text-slate-500"}`}>
            {t === "privacy" ? "Data & Privacy" : t === "memory" ? "Learning Memory" : t.charAt(0).toUpperCase() + t.slice(1)}
          </button>
        ))}
      </div>

      {tab === "profile" && (
        <Card className="p-5 space-y-4">
          <SectionLabel>Learning Profile</SectionLabel>
          {[
            { label: "Goal", value: "Become an AI Engineer" },
            { label: "Role", value: "Student — 2nd Year B.E. CSE" },
            { label: "Preferred styles", value: "Interactive, Conversational, Game" },
            { label: "Focus window", value: "7–9pm" },
          ].map(f => (
            <div key={f.label} className="flex items-start justify-between gap-3 py-3 border-b border-slate-100 last:border-0">
              <div className="text-sm text-slate-500 font-medium flex-shrink-0">{f.label}</div>
              <div className="text-sm text-slate-900 font-semibold text-right">{f.value}</div>
            </div>
          ))}
          <SecondaryBtn>Edit Learning Profile</SecondaryBtn>
        </Card>
      )}

      {tab === "memory" && (
        <Card className="p-5 space-y-3">
          <SectionLabel>What LearnOS Remembers About You</SectionLabel>
          {Object.entries(memToggles).map(([k, v]) => (
            <div key={k} className="flex items-center justify-between py-2.5 border-b border-slate-100 last:border-0">
              <div>
                <div className="text-sm font-medium text-slate-800 capitalize">{k.replace(/([A-Z])/g, " $1").trim()}</div>
                <div className="text-xs text-slate-400">Helps LearnOS personalise your experience</div>
              </div>
              <Toggle value={v} onChange={nv => setMemToggles(m => ({ ...m, [k]: nv }))} />
            </div>
          ))}
          <button className="text-xs text-rose-500 hover:text-rose-700 font-medium mt-2">Clear all learning memory</button>
        </Card>
      )}

      {tab === "notifications" && (
        <Card className="p-5 space-y-3">
          <SectionLabel>Notifications</SectionLabel>
          {["Daily streak reminder", "Assessment reminders", "Mentor weekly report", "Peer group activity", "New course recommendations"].map(n => (
            <div key={n} className="flex items-center justify-between py-2.5 border-b border-slate-100 last:border-0">
              <div className="text-sm font-medium text-slate-800">{n}</div>
              <Toggle value={true} onChange={() => {}} />
            </div>
          ))}
        </Card>
      )}

      {tab === "account" && (
        <Card className="p-5 space-y-4">
          <SectionLabel>Account</SectionLabel>
          {[{ label: "Email", value: "aarav@learnosdemo.ai" }, { label: "Password", value: "••••••••" }, { label: "Institution", value: "Sri Venkateswara College of Engineering" }].map(f => (
            <div key={f.label} className="flex items-center justify-between py-2.5 border-b border-slate-100 last:border-0">
              <div className="text-sm text-slate-500 font-medium">{f.label}</div>
              <div className="flex items-center gap-3"><span className="text-sm text-slate-900">{f.value}</span><button className="text-xs text-indigo-500 hover:text-indigo-700 font-medium">Edit</button></div>
            </div>
          ))}
        </Card>
      )}

      {tab === "privacy" && (
        <Card className="p-5 space-y-3">
          <SectionLabel>Data & Privacy</SectionLabel>
          {["Share learning data with institution", "Allow AI to use chat history for personalisation", "Allow peer visibility of my mastery stats"].map(n => (
            <div key={n} className="flex items-center justify-between py-2.5 border-b border-slate-100 last:border-0">
              <div className="text-sm text-slate-800">{n}</div>
              <Toggle value={true} onChange={() => {}} />
            </div>
          ))}
          <div className="pt-2 space-y-2">
            <button className="text-xs text-slate-500 hover:text-slate-700 font-medium block">Download my data</button>
            <button className="text-xs text-rose-500 hover:text-rose-700 font-medium block">Delete account</button>
          </div>
        </Card>
      )}
    </div>
  );
}

// ─── Design System ────────────────────────────────────────────────────────────
export function DesignSystem() {
  const colorGroups = [
    { label: "Primary", colors: [{ name: "Indigo Brand", hex: "#6366F1" }, { name: "Indigo Hover", hex: "#4F46E5" }, { name: "Violet Brand", hex: "#8B5CF6" }, { name: "Indigo Tint", hex: "#EEF0FF" }] },
    { label: "Semantic", colors: [{ name: "Mastery", hex: "#10B981" }, { name: "Info", hex: "#0EA5E9" }, { name: "Streak", hex: "#F59E0B" }, { name: "Risk", hex: "#F43F5E" }] },
    { label: "Neutrals", colors: [{ name: "Text", hex: "#0F172A" }, { name: "Secondary", hex: "#334155" }, { name: "Muted", hex: "#64748B" }, { name: "Border", hex: "#E2E8F0" }, { name: "Surface", hex: "#F1F5F9" }, { name: "App BG", hex: "#F8FAFC" }] },
    { label: "Dark Mode", colors: [{ name: "BG", hex: "#0B0F1A" }, { name: "Card", hex: "#111726" }, { name: "Border", hex: "#1E293B" }, { name: "Text", hex: "#F8FAFC" }] },
  ];
  return (
    <div className="p-4 sm:p-8 max-w-[1100px] mx-auto space-y-12">
      <div className="flex items-center gap-4">
        <div className="w-14 h-14 rounded-2xl flex items-center justify-center" style={{ background: "linear-gradient(135deg,#6366F1,#8B5CF6)" }}>
          <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5"/></svg>
        </div>
        <div>
          <div className="text-2xl font-extrabold gradient-text tracking-tight">LearnOS AI</div>
          <div className="text-sm text-slate-400">Design System · Foundations</div>
        </div>
      </div>

      <section>
        <h2 className="text-xs font-semibold uppercase tracking-widest text-slate-400 mb-5">Color System</h2>
        <div className="space-y-6">
          {colorGroups.map(g => (
            <div key={g.label}>
              <div className="text-[11px] font-semibold text-slate-500 mb-3 uppercase tracking-wider">{g.label}</div>
              <div className="flex flex-wrap gap-4">
                {g.colors.map(c => (
                  <div key={c.hex} className="flex flex-col items-center gap-1.5">
                    <div className="w-14 h-14 rounded-[12px] border border-slate-200" style={{ background: c.hex }} />
                    <div className="text-[10px] text-slate-500 text-center leading-tight">{c.name}</div>
                    <div className="text-[10px] mono text-slate-400">{c.hex}</div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </section>

      <section>
        <h2 className="text-xs font-semibold uppercase tracking-widest text-slate-400 mb-5">Typography</h2>
        <Card className="p-5 sm:p-6 space-y-5">
          <div><div className="text-[11px] text-slate-400 mono mb-1">Display · 36px · 800</div><div className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tighter">Become an AI Engineer</div></div>
          <div><div className="text-[11px] text-slate-400 mono mb-1">H1 · 24px · 700</div><div className="text-2xl font-bold text-slate-900 tracking-tight">Good morning, Aarav 👋</div></div>
          <div><div className="text-[11px] text-slate-400 mono mb-1">H2 · 18px · 600</div><div className="text-lg font-semibold text-slate-800">Database Management Systems</div></div>
          <div><div className="text-[11px] text-slate-400 mono mb-1">Body · 14px · 400</div><div className="text-sm text-slate-700 leading-relaxed">A subquery is a query nested inside another SQL query. They allow complex filtering with elegance.</div></div>
          <div><div className="text-[11px] text-slate-400 mono mb-1">Label · 11px · uppercase</div><div className="text-[11px] font-semibold uppercase tracking-widest text-slate-400">Active Context · DBMS · SQL</div></div>
          <div><div className="text-[11px] text-slate-400 mono mb-1">Numeric · 28px · tabular</div><div className="text-3xl font-bold tabular" style={{ color: "#6366F1" }}>2,480 XP</div></div>
          <div><div className="text-[11px] text-slate-400 mono mb-1">Mono · JetBrains Mono</div><div className="mono text-sm text-emerald-400 bg-slate-900 rounded-[8px] px-4 py-2 inline-block">SELECT * FROM employees WHERE salary &gt; 80000;</div></div>
        </Card>
      </section>

      <section>
        <h2 className="text-xs font-semibold uppercase tracking-widest text-slate-400 mb-5">Components</h2>
        <div className="space-y-5">
          <Card className="p-5">
            <SectionLabel>Buttons</SectionLabel>
            <div className="flex flex-wrap gap-3 items-center">
              <PrimaryBtn>Primary Action</PrimaryBtn>
              <SecondaryBtn>Secondary</SecondaryBtn>
              <GhostBtn>Ghost</GhostBtn>
              <button className="px-4 py-2 rounded-[10px] text-sm font-medium text-rose-600 bg-rose-50 border border-rose-200">Danger</button>
            </div>
          </Card>
          <Card className="p-5">
            <SectionLabel>Badges & Pills</SectionLabel>
            <div className="flex flex-wrap gap-2">
              <Badge label="Mastered" color="emerald" /><Badge label="Developing" color="sky" /><Badge label="Weak" color="amber" /><Badge label="At-risk" color="rose" /><Badge label="Level 7" color="indigo" /><Badge label="Inactive" color="slate" />
            </div>
          </Card>
          <Card className="p-5">
            <SectionLabel>Progress</SectionLabel>
            <div className="space-y-3">
              <div className="flex items-center gap-4">
                <ProgressRing value={92} size={60} stroke={6} color="#10B981" label="92%" />
                <ProgressRing value={54} size={60} stroke={6} color="#F59E0B" label="54%" />
                <ProgressRing value={38} size={60} stroke={6} color="#F43F5E" label="38%" />
              </div>
              <ProgressBar value={92} color="#10B981" />
              <ProgressBar value={54} color="#F59E0B" />
              <ProgressBar value={38} color="#F43F5E" />
            </div>
          </Card>
        </div>
      </section>
    </div>
  );
}
