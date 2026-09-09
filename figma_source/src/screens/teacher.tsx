import { useState } from "react";
import { Icon, Card, Badge, ProgressBar, PrimaryBtn, SecondaryBtn, GhostBtn, SectionLabel, Toggle } from "../lib";
import type { TeacherScreen } from "../lib";

const teacherNav = [
  { id: "t-dashboard", label: "Dashboard", icon: "home" as const },
  { id: "t-students", label: "Students", icon: "users" as const },
  { id: "t-curriculum", label: "Curriculum", icon: "book" as const },
  { id: "t-assessments", label: "Assessments", icon: "assess" as const },
  { id: "t-analytics", label: "Analytics", icon: "barChart" as const },
] as const;

// ─── Teacher Dashboard ────────────────────────────────────────────────────────
export function TeacherDashboard({ onNav }: { onNav: (s: TeacherScreen) => void }) {
  const atRisk = [
    { name: "Ravi Kumar", avatar: "RK", factors: ["2 missed sessions", "quiz 3/5"], mastery: 38 },
    { name: "Sneha Iyer", avatar: "SI", factors: ["prereq gap: JOINs", "low engagement"], mastery: 45 },
    { name: "Aryan Nair", avatar: "AN", factors: ["missed quiz", "low quiz 2/5"], mastery: 52 },
  ];
  const topics = [
    { label: "SQL Basics", avg: 88 }, { label: "JOINs", avg: 76 }, { label: "GROUP BY", avg: 70 },
    { label: "Subqueries", avg: 54 }, { label: "Window Fns", avg: 41 }, { label: "Indexes", avg: 62 },
  ];
  const activity = [
    { time: "2h ago", event: "Priya submitted Assessment 4 — Score: 4/5", type: "assess" },
    { time: "3h ago", event: "Aryan missed DBMS session for 2nd time", type: "risk" },
    { time: "5h ago", event: "Keerthana completed Module 4 with 92%", type: "success" },
    { time: "1d ago", event: "New assignment uploaded: SQL Lab 3", type: "info" },
  ];

  return (
    <div className="p-4 sm:p-6 space-y-5 max-w-[1200px] mx-auto">
      <div className="flex items-start justify-between flex-wrap gap-3">
        <div>
          <div className="text-[10px] font-semibold uppercase tracking-widest text-slate-400 mb-1">Teacher Dashboard</div>
          <h1 className="text-xl sm:text-2xl font-bold text-slate-900 tracking-tight">CSE-B · DBMS (Sem IV)</h1>
          <p className="text-sm text-slate-500 mt-1">Prof. Meera Krishnan · AY 2025–26</p>
        </div>
        <div className="flex gap-2 flex-wrap">
          <SecondaryBtn>Export Report</SecondaryBtn>
          <PrimaryBtn>New Assignment</PrimaryBtn>
        </div>
      </div>

      {/* KPIs */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-5">
        {[
          { label: "Students", value: "42", sub: "38 active this week", color: "#6366F1", icon: "users" as const },
          { label: "Avg Mastery", value: "71%", sub: "+4% vs last month", color: "#10B981", icon: "trendUp" as const },
          { label: "At-Risk", value: "6", sub: "Needs intervention", color: "#F43F5E", icon: "alertTriangle" as const },
          { label: "Assessments Due", value: "3", sub: "Next due: Friday", color: "#F59E0B", icon: "assess" as const },
        ].map((k, i) => (
          <Card key={i} className="p-4">
            <div className="w-9 h-9 rounded-[10px] flex items-center justify-center mb-3" style={{ background: k.color + "15" }}>
              <Icon name={k.icon} stroke={k.color} size={17} />
            </div>
            <div className="text-xl sm:text-2xl font-bold tabular" style={{ color: k.color }}>{k.value}</div>
            <div className="text-xs font-semibold text-slate-600 mt-0.5">{k.label}</div>
            <div className="text-[11px] text-slate-400 mt-0.5">{k.sub}</div>
          </Card>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-5">
        {/* Heatmap */}
        <Card className="lg:col-span-2 p-5">
          <div className="flex items-center justify-between mb-4 flex-wrap gap-2">
            <SectionLabel>Class Mastery by Topic</SectionLabel>
            <select className="text-xs text-slate-600 border border-slate-200 rounded-[8px] px-2 py-1 outline-none">
              <option>All students</option><option>At-risk only</option>
            </select>
          </div>
          <div className="space-y-2.5">
            {topics.map(t => (
              <div key={t.label} className="flex items-center gap-3">
                <span className="text-xs text-slate-600 font-medium w-24 flex-shrink-0">{t.label}</span>
                <div className="flex-1 rounded-[6px] overflow-hidden bg-slate-100" style={{ height: 22 }}>
                  <div style={{ width: `${t.avg}%`, height: "100%", background: t.avg >= 75 ? "#10B981" : t.avg >= 60 ? "#0EA5E9" : t.avg >= 50 ? "#F59E0B" : "#F43F5E", borderRadius: 6, display: "flex", alignItems: "center", paddingLeft: 8 }}>
                    <span className="text-[11px] font-semibold text-white tabular">{t.avg}%</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </Card>

        {/* Activity */}
        <Card className="p-5">
          <SectionLabel>Recent Activity</SectionLabel>
          <div className="space-y-3">
            {activity.map((a, i) => (
              <div key={i} className="flex gap-2.5">
                <div className={`w-1.5 h-1.5 rounded-full mt-1.5 flex-shrink-0 ${a.type === "risk" ? "bg-rose-400" : a.type === "success" ? "bg-emerald-400" : a.type === "assess" ? "bg-indigo-400" : "bg-slate-300"}`} />
                <div>
                  <p className="text-xs text-slate-700 leading-relaxed">{a.event}</p>
                  <span className="text-[10px] text-slate-400">{a.time}</span>
                </div>
              </div>
            ))}
          </div>
        </Card>

        {/* At-risk */}
        <Card className="lg:col-span-3 p-5">
          <div className="flex items-center justify-between mb-4 flex-wrap gap-2">
            <div>
              <SectionLabel>At-Risk Students</SectionLabel>
              <p className="text-xs text-slate-500">Flagged by AI — act early.</p>
            </div>
            <div className="flex gap-2">
              <SecondaryBtn>Send group nudge</SecondaryBtn>
              <PrimaryBtn onClick={() => onNav("t-students")}>View all students</PrimaryBtn>
            </div>
          </div>
          <div className="space-y-3">
            {atRisk.map((s, i) => (
              <div key={i} className="flex items-center gap-4 p-4 rounded-[12px] bg-rose-50 border border-rose-100 flex-wrap">
                <div className="w-10 h-10 rounded-full bg-rose-200 flex items-center justify-center text-sm font-bold text-rose-700 flex-shrink-0">{s.avatar}</div>
                <div className="flex-1 min-w-0">
                  <div className="text-sm font-semibold text-slate-900">{s.name}</div>
                  <div className="flex flex-wrap gap-1.5 mt-1">{s.factors.map(f => <Badge key={f} label={f} color="rose" />)}</div>
                </div>
                <div className="text-right">
                  <div className="text-sm font-bold tabular text-rose-600">{s.mastery}%</div>
                  <div className="text-[10px] text-slate-400">mastery</div>
                </div>
                <div className="flex gap-2 flex-wrap">
                  <SecondaryBtn className="text-xs px-3 py-1.5">Message</SecondaryBtn>
                  <PrimaryBtn className="text-xs px-3 py-1.5" onClick={() => onNav("t-students")}>Assign Remedial</PrimaryBtn>
                </div>
              </div>
            ))}
          </div>
        </Card>
      </div>
    </div>
  );
}

// ─── Student Detail (teacher view) ────────────────────────────────────────────
export function StudentDetail({ onBack }: { onBack: () => void }) {
  const trendData = [52, 58, 54, 60, 63, 57, 68, 71, 65, 72, 68, 74];
  return (
    <div className="p-4 sm:p-6 max-w-[1000px] mx-auto space-y-5">
      <button onClick={onBack} className="flex items-center gap-2 text-sm text-slate-500 hover:text-slate-900 font-medium mb-2">
        <Icon name="chevronLeft" stroke="currentColor" size={16} /> Back to Students
      </button>

      {/* Student header */}
      <Card className="p-5">
        <div className="flex items-start gap-4 flex-wrap">
          <div className="w-14 h-14 rounded-full flex items-center justify-center text-lg font-bold text-white flex-shrink-0" style={{ background: "linear-gradient(135deg,#6366F1,#8B5CF6)" }}>AS</div>
          <div className="flex-1 min-w-0">
            <div className="text-base font-bold text-slate-900">Aarav Sharma</div>
            <div className="text-sm text-slate-500">2nd Year B.E. CSE · DBMS (Sem IV)</div>
            <div className="flex flex-wrap gap-2 mt-2">
              <Badge label="Level 7" color="indigo" /><Badge label="2,480 XP" color="violet" /><Badge label="At-risk" color="amber" />
            </div>
          </div>
          <div className="flex gap-2 flex-wrap">
            <SecondaryBtn>Message Student</SecondaryBtn>
            <PrimaryBtn>Assign Remedial</PrimaryBtn>
          </div>
        </div>
      </Card>

      {/* AI suggestion */}
      <Card className="p-4 border-indigo-200" style={{ background: "#EEF0FF" }}>
        <div className="flex items-start gap-3">
          <span className="text-xl">🤖</span>
          <div>
            <div className="text-xs font-semibold text-indigo-700 mb-0.5">AI Suggested Intervention</div>
            <p className="text-sm text-indigo-800">Send a 15-minute subqueries catch-up session — Aarav confuses correlated subqueries with JOINs. A focused micro-lesson should close this in one session.</p>
          </div>
        </div>
      </Card>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
        {/* Mastery trend */}
        <Card className="p-5">
          <SectionLabel>Mastery Trend (12 weeks)</SectionLabel>
          <div className="flex items-end gap-1 h-20">
            {trendData.map((v, i) => (
              <div key={i} className="flex-1 rounded-t" style={{ height: `${(v / 80) * 100}%`, background: v >= 70 ? "#10B981" : v >= 60 ? "#0EA5E9" : "#F59E0B" }} />
            ))}
          </div>
          <div className="flex justify-between text-[10px] text-slate-400 mt-1"><span>Week 1</span><span>Week 12</span></div>
          <div className="mt-3 flex justify-between text-xs">
            <span className="text-slate-500">Current mastery</span>
            <span className="font-bold text-amber-600">68%</span>
          </div>
        </Card>

        {/* Stats */}
        <Card className="p-5">
          <SectionLabel>Student Stats</SectionLabel>
          <div className="space-y-3">
            {[
              { label: "Time spent", value: "12.4 hrs", color: "text-slate-800" },
              { label: "Assessments completed", value: "4 / 6", color: "text-slate-800" },
              { label: "Average score", value: "3.1 / 5", color: "text-amber-600" },
              { label: "Sessions missed", value: "2", color: "text-rose-600" },
              { label: "Strongest topic", value: "SQL Basics (92%)", color: "text-emerald-700" },
              { label: "Weakest topic", value: "Subqueries (54%)", color: "text-amber-700" },
            ].map(s => (
              <div key={s.label} className="flex justify-between text-xs border-b border-slate-100 pb-2 last:border-0">
                <span className="text-slate-500">{s.label}</span>
                <span className={`font-semibold tabular ${s.color}`}>{s.value}</span>
              </div>
            ))}
          </div>
        </Card>

        {/* Assessment history */}
        <Card className="sm:col-span-2 p-5">
          <SectionLabel>Assessment History</SectionLabel>
          <div className="overflow-x-auto">
            <table className="w-full text-xs min-w-[400px]">
              <thead>
                <tr className="text-slate-400 uppercase tracking-wider">
                  <th className="text-left pb-3 font-semibold">Assessment</th>
                  <th className="text-left pb-3 font-semibold">Score</th>
                  <th className="text-left pb-3 font-semibold">Date</th>
                  <th className="text-left pb-3 font-semibold">Weak Concepts</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {[
                  { name: "SQL Basics Quiz", score: "4/5", date: "Nov 1", weak: ["None"] },
                  { name: "JOINs Assessment", score: "4/5", date: "Nov 8", weak: ["SELF JOIN"] },
                  { name: "GROUP BY Quiz", score: "3/5", date: "Nov 15", weak: ["HAVING", "Window agg."] },
                  { name: "Subqueries Test", score: "3/5", date: "Nov 22", weak: ["Correlated", "EXISTS vs IN"] },
                ].map((a, i) => (
                  <tr key={i}>
                    <td className="py-2.5 text-slate-800 font-medium">{a.name}</td>
                    <td className="py-2.5"><span className={`tabular font-bold ${parseInt(a.score) >= 4 ? "text-emerald-600" : "text-amber-600"}`}>{a.score}</span></td>
                    <td className="py-2.5 text-slate-400">{a.date}</td>
                    <td className="py-2.5"><div className="flex flex-wrap gap-1">{a.weak.map(w => w === "None" ? <Badge key={w} label="No gaps" color="emerald" /> : <Badge key={w} label={w} color="rose" />)}</div></td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </Card>
      </div>
    </div>
  );
}

// ─── Students list ────────────────────────────────────────────────────────────
export function StudentsList({ onViewDetail }: { onViewDetail: () => void }) {
  const students = [
    { name: "Aarav Sharma", avatar: "AS", mastery: 68, risk: true, xp: 2480, streak: 12 },
    { name: "Keerthana R.", avatar: "KR", mastery: 91, risk: false, xp: 3180, streak: 22 },
    { name: "Dev Patel", avatar: "DP", mastery: 80, risk: false, xp: 2890, streak: 9 },
    { name: "Priya Nair", avatar: "PN", mastery: 74, risk: false, xp: 2240, streak: 5 },
    { name: "Ravi Kumar", avatar: "RK", mastery: 38, risk: true, xp: 980, streak: 0 },
    { name: "Sneha Iyer", avatar: "SI", mastery: 45, risk: true, xp: 1120, streak: 2 },
  ];
  return (
    <div className="p-4 sm:p-6 max-w-[1000px] mx-auto space-y-5">
      <div className="flex items-center justify-between flex-wrap gap-3">
        <h1 className="text-xl sm:text-2xl font-bold text-slate-900 tracking-tight">Students — CSE-B DBMS</h1>
        <div className="flex gap-2">
          <SecondaryBtn><Icon name="download" stroke="currentColor" size={14} /> Export</SecondaryBtn>
          <PrimaryBtn>Send Message</PrimaryBtn>
        </div>
      </div>
      <Card className="overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-sm min-w-[500px]">
            <thead className="bg-slate-50 border-b border-slate-200">
              <tr className="text-[10px] text-slate-400 uppercase tracking-widest">
                <th className="text-left px-5 py-3 font-semibold">Student</th>
                <th className="text-left px-5 py-3 font-semibold">Mastery</th>
                <th className="text-left px-5 py-3 font-semibold">XP</th>
                <th className="text-left px-5 py-3 font-semibold">Streak</th>
                <th className="text-left px-5 py-3 font-semibold">Status</th>
                <th className="px-5 py-3" />
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {students.map(s => (
                <tr key={s.name} className="hover:bg-slate-50 transition-colors">
                  <td className="px-5 py-3.5">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold text-white flex-shrink-0"
                        style={{ background: s.risk ? "#F43F5E" : "linear-gradient(135deg,#6366F1,#8B5CF6)" }}>{s.avatar}</div>
                      <span className="font-medium text-slate-900">{s.name}</span>
                    </div>
                  </td>
                  <td className="px-5 py-3.5">
                    <div className="flex items-center gap-2">
                      <span className="tabular text-sm font-bold" style={{ color: s.mastery >= 70 ? "#10B981" : s.mastery >= 55 ? "#0EA5E9" : "#F43F5E" }}>{s.mastery}%</span>
                      <div className="w-16"><ProgressBar value={s.mastery} color={s.mastery >= 70 ? "#10B981" : s.mastery >= 55 ? "#0EA5E9" : "#F43F5E"} height={4} /></div>
                    </div>
                  </td>
                  <td className="px-5 py-3.5 tabular text-slate-700 font-medium">{s.xp.toLocaleString()}</td>
                  <td className="px-5 py-3.5 text-sm">{s.streak > 0 ? `🔥 ${s.streak}d` : "—"}</td>
                  <td className="px-5 py-3.5"><Badge label={s.risk ? "At-risk" : "On track"} color={s.risk ? "rose" : "emerald"} /></td>
                  <td className="px-5 py-3.5 text-right">
                    <button onClick={onViewDetail} className="text-xs text-indigo-500 hover:text-indigo-700 font-medium">View →</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Card>
    </div>
  );
}

// ─── Curriculum & RAG ─────────────────────────────────────────────────────────
export function Curriculum() {
  const sources = [
    { name: "Lecture 1–8.pdf", type: "PDF", status: "indexed", size: "4.2 MB", coverage: "Ch.1–8 indexed" },
    { name: "DBMS Textbook.pdf", type: "PDF", status: "indexed", size: "12 MB", coverage: "Ch.1–6 indexed" },
    { name: "2022 QP.pdf", type: "PDF", status: "indexed", size: "0.8 MB", coverage: "Fully indexed" },
    { name: "2023 QP.pdf", type: "PDF", status: "indexed", size: "0.9 MB", coverage: "Fully indexed" },
    { name: "Lab Manual.pdf", type: "PDF", status: "processing", size: "2.1 MB", coverage: "" },
    { name: "Syllabus SEM4.pdf", type: "PDF", status: "indexed", size: "0.3 MB", coverage: "Fully indexed" },
  ];
  return (
    <div className="p-4 sm:p-6 max-w-[1000px] mx-auto space-y-5">
      <div className="flex items-start justify-between flex-wrap gap-3">
        <h1 className="text-xl sm:text-2xl font-bold text-slate-900 tracking-tight">Curriculum & Sources</h1>
        <PrimaryBtn>Auto-generate Materials</PrimaryBtn>
      </div>

      {/* Upload zone */}
      <Card className="p-5">
        <SectionLabel>Upload Sources</SectionLabel>
        <div className="border-2 border-dashed border-slate-200 rounded-[12px] p-8 text-center hover:border-indigo-300 transition-colors cursor-pointer">
          <Icon name="upload" stroke="#94A3B8" size={28} className="mx-auto mb-2" />
          <div className="text-sm font-medium text-slate-600">Drop lecture notes, PDFs, textbooks, past papers</div>
          <div className="text-xs text-slate-400 mt-1">PDF, DOCX, PPTX — max 50MB each</div>
          <button className="mt-4 px-4 py-2 rounded-[10px] bg-indigo-50 text-indigo-700 text-xs font-semibold hover:bg-indigo-100">Browse files</button>
        </div>
      </Card>

      {/* Source library */}
      <Card className="p-5">
        <div className="flex items-center justify-between mb-4 flex-wrap gap-2">
          <SectionLabel>Knowledge Library</SectionLabel>
          <Badge label="6 sources · 8 sources indexed" color="emerald" />
        </div>
        <div className="space-y-2">
          {sources.map(s => (
            <div key={s.name} className="flex items-center gap-4 p-3 rounded-[10px] bg-slate-50 border border-slate-200 flex-wrap">
              <div className="text-lg flex-shrink-0">📄</div>
              <div className="flex-1 min-w-0">
                <div className="text-sm font-medium text-slate-900 truncate">{s.name}</div>
                <div className="text-[11px] text-slate-400">{s.size} · {s.coverage}</div>
              </div>
              <Badge label={s.status === "indexed" ? "Indexed" : "Processing…"} color={s.status === "indexed" ? "emerald" : "amber"} />
              <div className="flex gap-2">
                <button className="text-xs text-slate-400 hover:text-slate-700"><Icon name="refresh" stroke="currentColor" size={14} /></button>
                <button className="text-xs text-rose-400 hover:text-rose-600"><Icon name="x" stroke="currentColor" size={14} /></button>
              </div>
            </div>
          ))}
        </div>
      </Card>

      {/* Course outline editor */}
      <Card className="p-5">
        <SectionLabel>Course Outline</SectionLabel>
        <div className="space-y-2">
          {["Unit 1: Introduction to DBMS", "Unit 2: ER Model & Relational Model", "Unit 3: SQL — DDL, DML, DCL", "Unit 4: Advanced SQL — Subqueries, Joins, Window Functions", "Unit 5: Indexing, Transactions & Normalisation"].map((u, i) => (
            <div key={i} className="flex items-center gap-3 p-3 rounded-[10px] bg-slate-50 border border-slate-200 hover:border-indigo-200 transition-colors cursor-pointer">
              <div className="w-6 h-6 rounded-full bg-indigo-50 text-indigo-600 flex items-center justify-center text-[10px] font-bold flex-shrink-0">{i + 1}</div>
              <span className="text-sm text-slate-800 flex-1">{u}</span>
              <Icon name="chevronRight" stroke="#94A3B8" size={14} />
            </div>
          ))}
        </div>
        <SecondaryBtn className="mt-4">Edit Outline</SecondaryBtn>
      </Card>
    </div>
  );
}

// ─── Assessments Management ───────────────────────────────────────────────────
export function AssessmentsManagement() {
  const assessments = [
    { name: "SQL Basics Quiz", type: "Auto-generated", students: 42, avg: "3.8/5", due: "Nov 1" },
    { name: "JOINs Assessment", type: "Auto-generated", students: 42, avg: "3.6/5", due: "Nov 8" },
    { name: "GROUP BY Quiz", type: "Teacher", students: 40, avg: "3.1/5", due: "Nov 15" },
    { name: "Subqueries Test", type: "Adaptive", students: 38, avg: "3.0/5", due: "Nov 22" },
    { name: "Window Functions", type: "Adaptive", students: 0, avg: "—", due: "Dec 1" },
  ];
  return (
    <div className="p-4 sm:p-6 max-w-[1000px] mx-auto space-y-5">
      <div className="flex items-start justify-between flex-wrap gap-3">
        <h1 className="text-xl sm:text-2xl font-bold text-slate-900 tracking-tight">Assessments</h1>
        <PrimaryBtn>Generate Adaptive Assessment</PrimaryBtn>
      </div>

      <Card className="overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-sm min-w-[500px]">
            <thead className="bg-slate-50 border-b border-slate-200">
              <tr className="text-[10px] text-slate-400 uppercase tracking-widest">
                <th className="text-left px-5 py-3 font-semibold">Assessment</th>
                <th className="text-left px-5 py-3 font-semibold">Type</th>
                <th className="text-left px-5 py-3 font-semibold">Students</th>
                <th className="text-left px-5 py-3 font-semibold">Avg Score</th>
                <th className="text-left px-5 py-3 font-semibold">Due</th>
                <th className="px-5 py-3" />
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {assessments.map(a => (
                <tr key={a.name} className="hover:bg-slate-50">
                  <td className="px-5 py-3.5 font-medium text-slate-900">{a.name}</td>
                  <td className="px-5 py-3.5"><Badge label={a.type} color={a.type === "Adaptive" ? "indigo" : a.type === "Auto-generated" ? "sky" : "slate"} /></td>
                  <td className="px-5 py-3.5 tabular text-slate-700">{a.students}</td>
                  <td className="px-5 py-3.5 tabular font-semibold text-slate-800">{a.avg}</td>
                  <td className="px-5 py-3.5 text-slate-400">{a.due}</td>
                  <td className="px-5 py-3.5 text-right">
                    <GhostBtn>Results →</GhostBtn>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Card>

      {/* Rubric editor */}
      <Card className="p-5">
        <SectionLabel>Rubric Editor — Subqueries Test</SectionLabel>
        <div className="space-y-3">
          {[{ label: "Concept Understanding", weight: 40 }, { label: "Query Correctness", weight: 35 }, { label: "Efficiency & Style", weight: 25 }].map(r => (
            <div key={r.label} className="flex items-center gap-4">
              <span className="text-sm text-slate-700 flex-1">{r.label}</span>
              <input type="number" defaultValue={r.weight} className="w-16 px-2 py-1.5 rounded-[8px] border border-slate-200 text-sm text-center tabular text-slate-800 outline-none" />
              <span className="text-xs text-slate-400">%</span>
            </div>
          ))}
          <SecondaryBtn className="mt-2">Save Rubric</SecondaryBtn>
        </div>
        <div className="mt-4 p-3 rounded-[10px] bg-indigo-50 border border-indigo-100">
          <div className="text-xs font-semibold text-indigo-700 mb-1">AI Concept Analysis (beyond scores)</div>
          <p className="text-xs text-indigo-700">72% of students correctly applied single-row subqueries. Only 38% handled correlated subqueries — recommend a focused remedial session before advancing.</p>
        </div>
      </Card>
    </div>
  );
}

// ─── Teacher wrapper component (switches subscreens) ─────────────────────────
export function TeacherApp({ onLogout }: { onLogout: () => void }) {
  const [screen, setScreen] = useState<TeacherScreen>("t-dashboard");
  const [showingDetail, setShowingDetail] = useState(false);

  const renderScreen = () => {
    if (showingDetail) return <StudentDetail onBack={() => setShowingDetail(false)} />;
    switch (screen) {
      case "t-dashboard": return <TeacherDashboard onNav={setScreen} />;
      case "t-students": return <StudentsList onViewDetail={() => setShowingDetail(true)} />;
      case "t-curriculum": return <Curriculum />;
      case "t-assessments": return <AssessmentsManagement />;
      case "t-analytics": return <TeacherDashboard onNav={setScreen} />;
    }
  };

  return (
    <div className="flex h-screen overflow-hidden bg-slate-50">
      {/* Sidebar desktop */}
      <aside className="hidden md:flex w-56 bg-white border-r border-slate-200 flex-col">
        <div className="px-5 py-5 border-b border-slate-100">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-[10px] flex items-center justify-center" style={{ background: "linear-gradient(135deg,#10B981,#0EA5E9)" }}>
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M17 21v-2a4 4 0 00-4-4H5a4 4 0 00-4 4v2"/><circle cx="9" cy="7" r="4"/></svg>
            </div>
            <div>
              <div className="text-xs font-bold text-slate-900">LearnOS AI</div>
              <div className="text-[10px] text-slate-400 uppercase tracking-wide">Teacher Portal</div>
            </div>
          </div>
        </div>
        <nav className="flex-1 px-3 py-4 space-y-0.5">
          {teacherNav.map(item => (
            <button key={item.id} onClick={() => { setScreen(item.id); setShowingDetail(false); }}
              className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-[10px] text-sm font-medium text-left transition-all ${screen === item.id && !showingDetail ? "text-emerald-700" : "text-slate-600 hover:bg-slate-50"}`}
              style={screen === item.id && !showingDetail ? { background: "#ECFDF5" } : {}}>
              <Icon name={item.icon} stroke={screen === item.id && !showingDetail ? "#059669" : "#64748B"} size={17} />
              {item.label}
            </button>
          ))}
        </nav>
        <div className="p-4 border-t border-slate-100">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-full bg-emerald-100 flex items-center justify-center text-xs font-bold text-emerald-700">MK</div>
            <div className="flex-1 min-w-0">
              <div className="text-xs font-semibold text-slate-800 truncate">Prof. Meera Krishnan</div>
              <div className="text-[10px] text-slate-400">CSE-B DBMS</div>
            </div>
          </div>
          <button onClick={onLogout} className="mt-3 w-full text-xs text-slate-400 hover:text-slate-700 text-left">← Switch role / Log out</button>
        </div>
      </aside>

      {/* Main */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Mobile header */}
        <header className="h-14 bg-white border-b border-slate-200 flex items-center px-4 gap-4">
          <div className="text-sm font-semibold text-slate-800 flex-1">
            {showingDetail ? "Student Detail" : teacherNav.find(n => n.id === screen)?.label}
          </div>
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-full bg-emerald-100 flex items-center justify-center text-xs font-bold text-emerald-700">MK</div>
            <button onClick={onLogout} className="text-xs text-slate-400 hover:text-slate-700 hidden sm:block">← Switch role</button>
          </div>
        </header>

        <main className="flex-1 overflow-y-auto">
          {renderScreen()}
        </main>

        {/* Mobile bottom nav */}
        <nav className="md:hidden flex border-t border-slate-200 bg-white">
          {teacherNav.slice(0, 5).map(item => (
            <button key={item.id} onClick={() => { setScreen(item.id); setShowingDetail(false); }}
              className={`flex-1 flex flex-col items-center gap-1 py-2.5 text-[10px] font-medium transition-colors ${screen === item.id ? "text-emerald-600" : "text-slate-400"}`}>
              <Icon name={item.icon} stroke={screen === item.id ? "#059669" : "#94A3B8"} size={20} />
              <span className="leading-none">{item.label.split(" ")[0]}</span>
            </button>
          ))}
        </nav>
      </div>
    </div>
  );
}
