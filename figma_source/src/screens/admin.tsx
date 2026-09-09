import { useState } from "react";
import { Icon, Card, Badge, ProgressBar, PrimaryBtn, SecondaryBtn, GhostBtn, SectionLabel, Toggle } from "../lib";

type AdminScreen = "a-dashboard" | "a-cohorts" | "a-curriculum" | "a-users" | "a-integrations";

const adminNav = [
  { id: "a-dashboard", label: "Dashboard", icon: "home" as const },
  { id: "a-cohorts", label: "Cohort Analytics", icon: "barChart" as const },
  { id: "a-curriculum", label: "Curriculum", icon: "book" as const },
  { id: "a-users", label: "Users & Roles", icon: "users" as const },
  { id: "a-integrations", label: "Integrations", icon: "link" as const },
] as const;

// ─── Institution Dashboard ────────────────────────────────────────────────────
function InstitutionDashboard() {
  const depts = [
    { name: "CSE", learners: 1240, mastery: 74, atRisk: 48 },
    { name: "ECE", learners: 980, mastery: 69, atRisk: 61 },
    { name: "Mech", learners: 760, mastery: 65, atRisk: 89 },
    { name: "Civil", learners: 540, mastery: 71, atRisk: 32 },
    { name: "IT", learners: 620, mastery: 77, atRisk: 28 },
  ];
  const outcomes = [
    { label: "Term avg mastery", before: 61, after: 74, delta: "+13%" },
    { label: "Assessment pass rate", before: 68, after: 82, delta: "+14%" },
    { label: "Course completion", before: 55, after: 78, delta: "+23%" },
    { label: "Student satisfaction", before: 72, after: 89, delta: "+17%" },
  ];

  return (
    <div className="p-4 sm:p-6 space-y-5 max-w-[1200px] mx-auto">
      <div className="flex items-start justify-between flex-wrap gap-3">
        <div>
          <div className="text-[10px] font-semibold uppercase tracking-widest text-slate-400 mb-1">Institution Overview</div>
          <h1 className="text-xl sm:text-2xl font-bold text-slate-900 tracking-tight">Sri Venkateswara College of Engineering</h1>
          <p className="text-sm text-slate-500 mt-1">AY 2025–26 · Term 1 · AI-powered learning platform</p>
        </div>
        <div className="flex gap-2 flex-wrap">
          <select className="text-xs border border-slate-200 rounded-[8px] px-2.5 py-2 text-slate-600 outline-none bg-white">
            <option>All Departments</option><option>CSE</option><option>ECE</option>
          </select>
          <SecondaryBtn>Export Report</SecondaryBtn>
        </div>
      </div>

      {/* Org KPIs */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-5">
        {[
          { label: "Total Learners", value: "4,140", sub: "+12% vs last term", color: "#6366F1", icon: "users" as const },
          { label: "Org Mastery Index", value: "72%", sub: "+8pts this term", color: "#10B981", icon: "trendUp" as const },
          { label: "Active Streaks", value: "2,890", sub: "70% of learners", color: "#F59E0B", icon: "zap" as const },
          { label: "At-Risk Learners", value: "258", sub: "6.2% — down from 9%", color: "#F43F5E", icon: "alertTriangle" as const },
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

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
        {/* Dept breakdown */}
        <Card className="p-5">
          <SectionLabel>Department Breakdown</SectionLabel>
          <div className="space-y-3">
            {depts.map(d => (
              <div key={d.name} className="flex items-center gap-3">
                <div className="w-10 font-semibold text-xs text-slate-600 flex-shrink-0">{d.name}</div>
                <div className="flex-1">
                  <div className="flex justify-between text-[11px] mb-1 text-slate-500">
                    <span>{d.learners.toLocaleString()} learners</span>
                    <span className="tabular font-semibold" style={{ color: d.mastery >= 72 ? "#10B981" : "#0EA5E9" }}>{d.mastery}%</span>
                  </div>
                  <ProgressBar value={d.mastery} color={d.mastery >= 72 ? "#10B981" : "#0EA5E9"} height={8} />
                </div>
                <div className="text-xs text-rose-500 font-medium flex-shrink-0">{d.atRisk} at-risk</div>
              </div>
            ))}
          </div>
        </Card>

        {/* Outcome metrics */}
        <Card className="p-5">
          <SectionLabel>Outcomes vs. Pre-LearnOS</SectionLabel>
          <div className="space-y-4">
            {outcomes.map(o => (
              <div key={o.label}>
                <div className="flex items-center justify-between text-xs mb-1.5">
                  <span className="text-slate-600 font-medium">{o.label}</span>
                  <Badge label={o.delta} color="emerald" />
                </div>
                <div className="flex items-center gap-2">
                  <div className="flex-1 bg-slate-100 rounded-full overflow-hidden" style={{ height: 8 }}>
                    <div style={{ width: `${o.before}%`, height: "100%", background: "#CBD5E1", borderRadius: 99 }} />
                  </div>
                  <div className="flex-1 bg-slate-100 rounded-full overflow-hidden" style={{ height: 8 }}>
                    <div style={{ width: `${o.after}%`, height: "100%", background: "#10B981", borderRadius: 99 }} />
                  </div>
                </div>
                <div className="flex justify-between text-[10px] text-slate-400 mt-0.5">
                  <span>Before: {o.before}%</span><span>After: {o.after}%</span>
                </div>
              </div>
            ))}
          </div>
        </Card>

        {/* Usage adoption */}
        <Card className="p-5">
          <SectionLabel>Platform Adoption</SectionLabel>
          <div className="space-y-3">
            {[
              { label: "Weekly active learners", value: 3480, max: 4140 },
              { label: "AI Tutor sessions / week", value: 8920, max: 12000 },
              { label: "Courses in progress", value: 6200, max: 8000 },
              { label: "Assessments completed", value: 9140, max: 10000 },
            ].map(m => (
              <div key={m.label}>
                <div className="flex justify-between text-xs mb-1"><span className="text-slate-600">{m.label}</span><span className="tabular font-semibold text-slate-800">{m.value.toLocaleString()}</span></div>
                <ProgressBar value={(m.value / m.max) * 100} color="#6366F1" height={5} />
              </div>
            ))}
          </div>
        </Card>

        {/* At-risk trend */}
        <Card className="p-5">
          <SectionLabel>At-Risk Trend (8 weeks)</SectionLabel>
          <div className="flex items-end gap-1.5 h-20">
            {[9.1, 8.8, 8.2, 7.9, 7.4, 7.0, 6.5, 6.2].map((v, i) => (
              <div key={i} className="flex-1 flex flex-col items-center gap-1">
                <div className="w-full rounded-t" style={{ height: `${(v / 10) * 100}%`, background: v > 8 ? "#F43F5E" : v > 7 ? "#F59E0B" : "#10B981" }} />
                <span className="text-[9px] text-slate-400">W{i + 1}</span>
              </div>
            ))}
          </div>
          <div className="mt-3 flex items-center gap-2 text-xs text-emerald-700 font-medium">
            <Icon name="trendUp" stroke="#10B981" size={13} /> Down from 9.1% → 6.2% — 32% improvement
          </div>
        </Card>
      </div>
    </div>
  );
}

// ─── Cohort Analytics ─────────────────────────────────────────────────────────
function CohortAnalytics() {
  const cohorts = [
    { name: "CSE-A", dept: "CSE", sem: "IV", learners: 62, mastery: 76, engagement: 88, atRisk: 4 },
    { name: "CSE-B", dept: "CSE", sem: "IV", learners: 58, mastery: 71, engagement: 82, atRisk: 6 },
    { name: "ECE-A", dept: "ECE", sem: "VI", learners: 55, mastery: 68, engagement: 75, atRisk: 9 },
    { name: "IT-A", dept: "IT", sem: "II", learners: 61, mastery: 80, engagement: 91, atRisk: 3 },
    { name: "Mech-B", dept: "Mech", sem: "III", learners: 49, mastery: 63, engagement: 68, atRisk: 14 },
  ];
  return (
    <div className="p-4 sm:p-6 space-y-5 max-w-[1100px] mx-auto">
      <div className="flex items-start justify-between flex-wrap gap-3">
        <h1 className="text-xl sm:text-2xl font-bold text-slate-900 tracking-tight">Cohort Analytics</h1>
        <div className="flex gap-2">
          <SecondaryBtn><Icon name="download" stroke="currentColor" size={14} /> Export</SecondaryBtn>
          <PrimaryBtn>Generate Report</PrimaryBtn>
        </div>
      </div>

      <Card className="overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-sm min-w-[550px]">
            <thead className="bg-slate-50 border-b border-slate-200">
              <tr className="text-[10px] text-slate-400 uppercase tracking-widest">
                <th className="text-left px-5 py-3 font-semibold">Cohort</th>
                <th className="text-left px-5 py-3 font-semibold">Dept / Sem</th>
                <th className="text-left px-5 py-3 font-semibold">Learners</th>
                <th className="text-left px-5 py-3 font-semibold">Avg Mastery</th>
                <th className="text-left px-5 py-3 font-semibold">Engagement</th>
                <th className="text-left px-5 py-3 font-semibold">At-risk</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {cohorts.map(c => (
                <tr key={c.name} className="hover:bg-slate-50">
                  <td className="px-5 py-3.5 font-bold text-slate-900">{c.name}</td>
                  <td className="px-5 py-3.5 text-slate-500">{c.dept} · Sem {c.sem}</td>
                  <td className="px-5 py-3.5 tabular text-slate-700">{c.learners}</td>
                  <td className="px-5 py-3.5">
                    <div className="flex items-center gap-2">
                      <span className="tabular font-bold text-sm" style={{ color: c.mastery >= 75 ? "#10B981" : c.mastery >= 65 ? "#0EA5E9" : "#F59E0B" }}>{c.mastery}%</span>
                      <div className="w-16"><ProgressBar value={c.mastery} color={c.mastery >= 75 ? "#10B981" : c.mastery >= 65 ? "#0EA5E9" : "#F59E0B"} height={4} /></div>
                    </div>
                  </td>
                  <td className="px-5 py-3.5">
                    <Badge label={`${c.engagement}%`} color={c.engagement >= 85 ? "emerald" : c.engagement >= 75 ? "sky" : "amber"} />
                  </td>
                  <td className="px-5 py-3.5">
                    <Badge label={`${c.atRisk} students`} color={c.atRisk <= 5 ? "emerald" : c.atRisk <= 10 ? "amber" : "rose"} />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Card>

      <Card className="p-5">
        <SectionLabel>Equity Flags</SectionLabel>
        <div className="space-y-3">
          {[
            { group: "Mech-B cohort", flag: "Below avg mastery (63%) — 14 at-risk students, possible resource gap", color: "rose" as const },
            { group: "ECE-A cohort", flag: "Engagement dropped 12% last 3 weeks — intervention recommended", color: "amber" as const },
            { group: "CSE-B · Female students", flag: "3% lower avg mastery vs male peers — check content bias", color: "amber" as const },
          ].map(f => (
            <div key={f.group} className="flex items-start gap-3 p-3.5 rounded-[10px]" style={{ background: f.color === "rose" ? "#FFF1F2" : "#FFFBEB" }}>
              <Icon name="alertTriangle" stroke={f.color === "rose" ? "#F43F5E" : "#F59E0B"} size={16} />
              <div>
                <div className="text-xs font-semibold text-slate-900">{f.group}</div>
                <div className="text-xs text-slate-600 mt-0.5">{f.flag}</div>
              </div>
            </div>
          ))}
        </div>
      </Card>
    </div>
  );
}

// ─── Users & Roles ────────────────────────────────────────────────────────────
function UsersRoles() {
  const [tab, setTab] = useState<"students" | "teachers" | "admins">("students");
  const users = {
    students: [{ name: "Aarav Sharma", email: "aarav@college.edu", role: "Student", dept: "CSE", status: "Active" }, { name: "Priya Nair", email: "priya@college.edu", role: "Student", dept: "IT", status: "Active" }, { name: "Ravi Kumar", email: "ravi@college.edu", role: "Student", dept: "ECE", status: "Inactive" }],
    teachers: [{ name: "Prof. Meera Krishnan", email: "meera@college.edu", role: "Teacher", dept: "CSE", status: "Active" }, { name: "Dr. Arjun Iyer", email: "arjun@college.edu", role: "Teacher", dept: "ECE", status: "Active" }],
    admins: [{ name: "Admin User", email: "admin@college.edu", role: "Admin", dept: "All", status: "Active" }],
  };
  return (
    <div className="p-4 sm:p-6 space-y-5 max-w-[1000px] mx-auto">
      <div className="flex items-start justify-between flex-wrap gap-3">
        <h1 className="text-xl sm:text-2xl font-bold text-slate-900 tracking-tight">Users & Roles</h1>
        <div className="flex gap-2 flex-wrap">
          <SecondaryBtn><Icon name="upload" stroke="currentColor" size={14} /> Bulk Import</SecondaryBtn>
          <PrimaryBtn><Icon name="plus" stroke="white" size={14} /> Invite User</PrimaryBtn>
        </div>
      </div>

      <Card className="p-4">
        <div className="grid grid-cols-3 gap-3">
          {[{ label: "Total Students", value: "4,140" }, { label: "Teachers", value: "187" }, { label: "Admins", value: "12" }].map(s => (
            <div key={s.label} className="text-center"><div className="text-xl font-bold tabular text-slate-900">{s.value}</div><div className="text-xs text-slate-400 mt-0.5">{s.label}</div></div>
          ))}
        </div>
        <div className="mt-3 pt-3 border-t border-slate-100 text-xs text-slate-500 flex items-center gap-2">
          <Badge label="92% seats used" color="amber" /> 384 / 4,339 licenses remaining
        </div>
      </Card>

      <div className="flex gap-1 bg-slate-100 rounded-[10px] p-1 w-fit">
        {(["students", "teachers", "admins"] as const).map(t => (
          <button key={t} onClick={() => setTab(t)}
            className={`px-3 py-1.5 rounded-[8px] text-xs font-semibold capitalize transition-all ${tab === t ? "bg-white text-slate-900 shadow-sm" : "text-slate-500"}`}>
            {t}
          </button>
        ))}
      </div>

      <Card className="overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-sm min-w-[400px]">
            <thead className="bg-slate-50 border-b border-slate-200">
              <tr className="text-[10px] text-slate-400 uppercase tracking-widest">
                <th className="text-left px-5 py-3 font-semibold">Name</th>
                <th className="text-left px-5 py-3 font-semibold">Email</th>
                <th className="text-left px-5 py-3 font-semibold">Dept</th>
                <th className="text-left px-5 py-3 font-semibold">Status</th>
                <th className="px-5 py-3" />
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {users[tab].map(u => (
                <tr key={u.email} className="hover:bg-slate-50">
                  <td className="px-5 py-3 font-medium text-slate-900">{u.name}</td>
                  <td className="px-5 py-3 text-slate-400 text-xs">{u.email}</td>
                  <td className="px-5 py-3"><Badge label={u.dept} color="slate" /></td>
                  <td className="px-5 py-3"><Badge label={u.status} color={u.status === "Active" ? "emerald" : "slate"} /></td>
                  <td className="px-5 py-3 text-right"><GhostBtn>Edit</GhostBtn></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Card>
    </div>
  );
}

// ─── Integrations & Privacy ───────────────────────────────────────────────────
function Integrations() {
  const integrations = [
    { name: "Google Classroom", desc: "Sync courses and assignments", status: "connected", icon: "📚" },
    { name: "Moodle LMS", desc: "Import student rosters and grades", status: "connected", icon: "🎓" },
    { name: "Microsoft Teams", desc: "Session notifications and calendar", status: "pending", icon: "🏢" },
    { name: "Zoom", desc: "Sync virtual class sessions", status: "disconnected", icon: "📹" },
    { name: "SSO (SAML 2.0)", desc: "Single sign-on for all users", status: "connected", icon: "🔐" },
  ];
  return (
    <div className="p-4 sm:p-6 space-y-5 max-w-[900px] mx-auto">
      <h1 className="text-xl sm:text-2xl font-bold text-slate-900 tracking-tight">Integrations & Privacy</h1>

      <Card className="p-5">
        <SectionLabel>Data & Privacy Controls</SectionLabel>
        <div className="space-y-3">
          {[
            { label: "Student learning memory", desc: "AI remembers student patterns for personalisation" },
            { label: "FERPA-compliant data handling", desc: "All student data stays within institution boundaries" },
            { label: "AI model data residency: India", desc: "No data leaves the selected region" },
            { label: "Consent logging", desc: "Record and audit student/parent consent" },
          ].map(p => (
            <div key={p.label} className="flex items-start justify-between py-3 border-b border-slate-100 last:border-0 gap-3">
              <div>
                <div className="text-sm font-medium text-slate-800">{p.label}</div>
                <div className="text-xs text-slate-400 mt-0.5">{p.desc}</div>
              </div>
              <Toggle value={true} onChange={() => {}} />
            </div>
          ))}
        </div>
      </Card>

      <Card className="p-5">
        <div className="flex items-center justify-between mb-4 flex-wrap gap-2">
          <SectionLabel>Connected Integrations</SectionLabel>
          <PrimaryBtn>+ Add Integration</PrimaryBtn>
        </div>
        <div className="space-y-3">
          {integrations.map(int => (
            <div key={int.name} className="flex items-center gap-4 p-4 rounded-[12px] bg-slate-50 border border-slate-200 flex-wrap">
              <div className="text-2xl flex-shrink-0">{int.icon}</div>
              <div className="flex-1 min-w-0">
                <div className="text-sm font-semibold text-slate-900">{int.name}</div>
                <div className="text-xs text-slate-400">{int.desc}</div>
              </div>
              <Badge label={int.status === "connected" ? "Connected" : int.status === "pending" ? "Pending" : "Disconnected"} color={int.status === "connected" ? "emerald" : int.status === "pending" ? "amber" : "slate"} />
              <SecondaryBtn className="text-xs px-3 py-1.5">{int.status === "connected" ? "Manage" : "Connect"}</SecondaryBtn>
            </div>
          ))}
        </div>
      </Card>

      <Card className="p-5">
        <SectionLabel>AI Model Configuration</SectionLabel>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          {[{ label: "Model Provider", value: "Anthropic Claude" }, { label: "Data Region", value: "Asia-Pacific (Mumbai)" }, { label: "Token Budget / Month", value: "500M tokens" }].map(c => (
            <div key={c.label} className="bg-slate-50 rounded-[10px] p-3.5">
              <div className="text-[10px] text-slate-400 uppercase tracking-widest mb-1">{c.label}</div>
              <div className="text-sm font-semibold text-slate-900">{c.value}</div>
            </div>
          ))}
        </div>
        <SecondaryBtn className="mt-4">Edit AI Config</SecondaryBtn>
      </Card>
    </div>
  );
}

// ─── Admin app wrapper ────────────────────────────────────────────────────────
export function AdminApp({ onLogout }: { onLogout: () => void }) {
  const [screen, setScreen] = useState<AdminScreen>("a-dashboard");

  const renderScreen = () => {
    switch (screen) {
      case "a-dashboard": return <InstitutionDashboard />;
      case "a-cohorts": return <CohortAnalytics />;
      case "a-curriculum": return <div className="p-6"><h1 className="text-xl font-bold text-slate-900">Org Curriculum & Resources</h1><p className="text-slate-500 mt-2 text-sm">Manage shared knowledge libraries, AI resource budgets, and LMS/SIS integrations.</p></div>;
      case "a-users": return <UsersRoles />;
      case "a-integrations": return <Integrations />;
    }
  };

  return (
    <div className="flex h-screen overflow-hidden bg-slate-50">
      <aside className="hidden md:flex w-56 bg-white border-r border-slate-200 flex-col">
        <div className="px-5 py-5 border-b border-slate-100">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-[10px] flex items-center justify-center" style={{ background: "linear-gradient(135deg,#0EA5E9,#6366F1)" }}>
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M3 9l9-7 9 7v11a2 2 0 01-2 2H5a2 2 0 01-2-2z"/></svg>
            </div>
            <div>
              <div className="text-xs font-bold text-slate-900">LearnOS AI</div>
              <div className="text-[10px] text-slate-400 uppercase tracking-wide">Admin Portal</div>
            </div>
          </div>
        </div>
        <nav className="flex-1 px-3 py-4 space-y-0.5">
          {adminNav.map(item => (
            <button key={item.id} onClick={() => setScreen(item.id)}
              className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-[10px] text-sm font-medium text-left transition-all ${screen === item.id ? "text-sky-700" : "text-slate-600 hover:bg-slate-50"}`}
              style={screen === item.id ? { background: "#E0F2FE" } : {}}>
              <Icon name={item.icon} stroke={screen === item.id ? "#0369A1" : "#64748B"} size={17} />
              {item.label}
            </button>
          ))}
        </nav>
        <div className="p-4 border-t border-slate-100">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-full bg-sky-100 flex items-center justify-center text-xs font-bold text-sky-700">AD</div>
            <div className="flex-1 min-w-0"><div className="text-xs font-semibold text-slate-800 truncate">Institution Admin</div><div className="text-[10px] text-slate-400">SVCE</div></div>
          </div>
          <button onClick={onLogout} className="mt-3 w-full text-xs text-slate-400 hover:text-slate-700 text-left">← Switch role / Log out</button>
        </div>
      </aside>

      <div className="flex-1 flex flex-col overflow-hidden">
        <header className="h-14 bg-white border-b border-slate-200 flex items-center px-4 gap-4">
          <div className="text-sm font-semibold text-slate-800 flex-1">{adminNav.find(n => n.id === screen)?.label}</div>
          <div className="w-8 h-8 rounded-full bg-sky-100 flex items-center justify-center text-xs font-bold text-sky-700">AD</div>
          <button onClick={onLogout} className="text-xs text-slate-400 hover:text-slate-700 hidden sm:block">← Switch role</button>
        </header>
        <main className="flex-1 overflow-y-auto">{renderScreen()}</main>
        <nav className="md:hidden flex border-t border-slate-200 bg-white">
          {adminNav.map(item => (
            <button key={item.id} onClick={() => setScreen(item.id)}
              className={`flex-1 flex flex-col items-center gap-1 py-2.5 text-[10px] font-medium ${screen === item.id ? "text-sky-600" : "text-slate-400"}`}>
              <Icon name={item.icon} stroke={screen === item.id ? "#0284C7" : "#94A3B8"} size={19} />
              <span className="leading-none">{item.label.split(" ")[0]}</span>
            </button>
          ))}
        </nav>
      </div>
    </div>
  );
}
