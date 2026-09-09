import { useState } from "react";
import { Icon, Logo, COURSES } from "./lib";
import type { Role, AuthState, StudentScreen, CourseId } from "./lib";

import Landing from "./pages/Landing";
import { Login, Register } from "./pages/Auth";
import { Onboarding, Diagnosis } from "./pages/Onboarding";
import { TeacherApp } from "./screens/teacher";
import { AdminApp } from "./screens/admin";
import {
  Dashboard, AITutor, CourseCatalog, CoursePlayer, KnowledgeGraph,
  Assessment, AssessmentResults, Gamification, GoalRoadmap, Projects, Mentor, PeerLearning, Profile, DesignSystem
} from "./screens/student";
import VoiceTutorModal from "./components/VoiceTutorModal";
import SettingsModal from "./components/SettingsModal";

// ─── Student nav config ───────────────────────────────────────────────────────
const studentNav = [
  { id: "dashboard", label: "Home", icon: "home" as const },
  { id: "tutor", label: "AI Tutor", icon: "tutor" as const },
  { id: "courses", label: "Courses", icon: "book" as const },
  { id: "knowledge-graph", label: "Knowledge Graph", icon: "brain" as const },
  { id: "assessment", label: "Assessments", icon: "assess" as const },
  { id: "goal-roadmap", label: "Goal Roadmap", icon: "map" as const },
  { id: "gamification", label: "Progress", icon: "trophy" as const },
  { id: "projects", label: "Projects", icon: "folder" as const },
  { id: "mentor", label: "AI Mentor", icon: "sparkles" as const },
  { id: "peers", label: "Peer Learning", icon: "users" as const },
  { id: "profile", label: "Profile", icon: "user" as const },
  { id: "design-system", label: "Design System", icon: "layers" as const },
] as const;

const bottomTabNav = [
  { id: "dashboard", label: "Home", icon: "home" as const },
  { id: "tutor", label: "Tutor", icon: "tutor" as const },
  { id: "courses", label: "Courses", icon: "book" as const },
  { id: "knowledge-graph", label: "Graph", icon: "brain" as const },
  { id: "profile", label: "Profile", icon: "user" as const },
] as const;

const screenTitles: Record<StudentScreen, string> = {
  dashboard: "Home",
  tutor: "AI Tutor · DBMS",
  courses: "Courses",
  "course-player": "Course Player",
  "knowledge-graph": "Knowledge Graph",
  assessment: "Assessment · SQL Subqueries",
  "assessment-results": "Assessment Results",
  gamification: "Progress & Gamification",
  "goal-roadmap": "Goal Roadmap",
  projects: "Projects",
  mentor: "AI Mentor",
  peers: "Peer Learning",
  profile: "Profile & Settings",
  "design-system": "Design System",
};

// Full-height screens that shouldn't have overflow-y on the main wrapper
const noScrollScreens: StudentScreen[] = ["tutor", "knowledge-graph", "course-player"];

// ─── Student App Shell ────────────────────────────────────────────────────────
function StudentApp({ onLogout }: { onLogout: () => void }) {
  const [screen, setScreen] = useState<StudentScreen>("dashboard");
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [activeCourse, setActiveCourse] = useState<CourseId>("dbms");
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [isVoiceOpen, setIsVoiceOpen] = useState(false);
  const [isSettingsOpen, setIsSettingsOpen] = useState(false);

  const handleEnterCourse = (id: CourseId) => {
    setActiveCourse(id);
    setScreen("course-player");
  };

  const activeCourseData = COURSES.find(c => c.id === activeCourse)!;

  const renderScreen = () => {
    switch (screen) {
      case "dashboard": return <Dashboard onNav={setScreen} />;
      case "tutor": return <AITutor />;
      case "courses": return <CourseCatalog onEnter={handleEnterCourse} onNav={setScreen} />;
      case "course-player": return <CoursePlayer course={activeCourseData} onBack={() => setScreen("courses")} onNav={setScreen} />;
      case "knowledge-graph": return <KnowledgeGraph onNav={setScreen} />;
      case "assessment": return <Assessment onNav={setScreen} />;
      case "assessment-results": return <AssessmentResults onNav={setScreen} />;
      case "gamification": return <Gamification />;
      case "goal-roadmap": return <GoalRoadmap onNav={setScreen} />;
      case "projects": return <Projects onNav={setScreen} />;
      case "mentor": return <Mentor onNav={setScreen} />;
      case "peers": return <PeerLearning onNav={setScreen} />;
      case "profile": return <Profile />;
      case "design-system": return <DesignSystem />;
    }
  };

  const navigate = (s: StudentScreen) => {
    setScreen(s);
    setMobileMenuOpen(false);
  };

  const fullHeight = noScrollScreens.includes(screen);

  return (
    <div className="flex h-screen overflow-hidden bg-slate-50">
      {/* ── Desktop Sidebar ── */}
      <aside
        className={`hidden md:flex flex-col bg-white border-r border-slate-200 transition-all duration-200 flex-shrink-0 ${sidebarCollapsed ? "w-14" : "w-60"}`}
        style={{ minWidth: sidebarCollapsed ? 56 : 240 }}>

        {/* Logo + collapse toggle */}
        <div className={`px-3 py-4 border-b border-slate-100 flex items-center ${sidebarCollapsed ? "justify-center" : "justify-between"}`}>
          {!sidebarCollapsed && <Logo size={30} />}
          {sidebarCollapsed && <Logo size={30} showText={false} />}
          <button onClick={() => setSidebarCollapsed(!sidebarCollapsed)}
            className={`p-1.5 rounded-[8px] hover:bg-slate-100 transition-colors flex-shrink-0 ${sidebarCollapsed ? "mt-0" : ""}`}
            title={sidebarCollapsed ? "Expand sidebar" : "Collapse sidebar"}>
            <Icon name={sidebarCollapsed ? "chevronRight" : "chevronLeft"} stroke="#94A3B8" size={16} />
          </button>
        </div>

        {/* Nav items */}
        <nav className="flex-1 px-2 py-3 space-y-0.5 overflow-y-auto scrollbar-hide">
          {studentNav.map(item => {
            const isActive = screen === item.id || (screen === "course-player" && item.id === "courses");
            return (
              <button key={item.id} onClick={() => navigate(item.id as StudentScreen)}
                title={sidebarCollapsed ? item.label : undefined}
                className={`w-full flex items-center gap-3 px-2.5 py-2.5 rounded-[10px] text-sm font-medium transition-all text-left ${isActive ? "" : "text-slate-600 hover:bg-slate-50 hover:text-slate-900"} ${sidebarCollapsed ? "justify-center" : ""}`}
                style={isActive ? { background: "#EEF0FF", color: "#4F46E5" } : {}}>
                <Icon name={item.icon} stroke={isActive ? "#4F46E5" : "#64748B"} size={18} />
                {!sidebarCollapsed && <span className="truncate">{item.label}</span>}
              </button>
            );
          })}
        </nav>

        {/* User */}
        <div className={`p-3 border-t border-slate-100 ${sidebarCollapsed ? "flex justify-center" : ""}`}>
          {!sidebarCollapsed ? (
            <div>
              <div className="flex items-center gap-2.5">
                <div className="w-8 h-8 rounded-full flex items-center justify-center text-xs font-semibold text-white flex-shrink-0" style={{ background: "linear-gradient(135deg,#6366F1,#8B5CF6)" }}>AS</div>
                <div className="flex-1 min-w-0">
                  <div className="text-xs font-semibold text-slate-800 truncate">Aarav Sharma</div>
                  <div className="text-[10px] text-slate-400">Level 7 · 2,480 XP</div>
                </div>
              </div>
              <div className="flex items-center justify-between mt-2 pt-2 border-t border-slate-100">
                <button onClick={onLogout} className="text-xs text-slate-400 hover:text-slate-700 text-left px-1">← Switch role</button>
                <button onClick={() => setIsSettingsOpen(true)} className="text-xs text-slate-400 hover:text-slate-700">⚙️ API</button>
              </div>
            </div>
          ) : (
            <div className="flex flex-col items-center gap-2">
              <div className="w-8 h-8 rounded-full flex items-center justify-center text-xs font-semibold text-white" style={{ background: "linear-gradient(135deg,#6366F1,#8B5CF6)" }}>AS</div>
            </div>
          )}
        </div>
      </aside>

      {/* ── Main area ── */}
      <div className="flex-1 flex flex-col overflow-hidden min-w-0">
        {/* Top bar */}
        <header className="h-14 bg-white border-b border-slate-200 flex items-center px-4 gap-3 flex-shrink-0">
          {/* Mobile menu button */}
          <button onClick={() => setMobileMenuOpen(!mobileMenuOpen)} className="md:hidden p-1.5 rounded-[8px] hover:bg-slate-100">
            <Icon name="menu" stroke="#64748B" size={20} />
          </button>

          <div className="hidden sm:block flex-1 max-w-sm">
            <div className="flex items-center gap-2 px-3 py-1.5 rounded-[10px] bg-slate-50 border border-slate-200">
              <Icon name="search" stroke="#94A3B8" size={14} />
              <input placeholder="Search courses, topics…" className="flex-1 text-xs bg-transparent outline-none text-slate-600 placeholder:text-slate-400" />
            </div>
          </div>

          <h1 className="sm:hidden text-sm font-semibold text-slate-800 flex-1 truncate">{screenTitles[screen]}</h1>

          <div className="ml-auto flex items-center gap-2">
            
            {/* Sharyx Voice Companion Launch Trigger */}
            <button
              onClick={() => setIsVoiceOpen(true)}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-semibold cursor-pointer transition-transform hover:scale-105"
              style={{ background: "linear-gradient(135deg, #6366F1, #8B5CF6)", color: "#FFFFFF", boxShadow: "0 2px 8px rgba(99, 102, 241, 0.35)" }}
              title="Open Spoken Sharyx Voice Tutor"
            >
              <Icon name="mic" stroke="#FFFFFF" size={13} />
              <span>Voice Tutor</span>
            </button>

            <span className="hidden sm:flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-semibold" style={{ background: "#EEF0FF", color: "#4F46E5" }}>
              <Icon name="zap" stroke="#4F46E5" size={12} />2,480 XP
            </span>
            <span className="hidden sm:flex items-center gap-1 px-2.5 py-1.5 rounded-full text-xs font-semibold bg-amber-50 text-amber-700">🔥 12d</span>
            
            <button onClick={() => setIsSettingsOpen(true)} className="p-1.5 hover:bg-slate-100 rounded-[8px]" title="API Setup">
              <Icon name="settings" stroke="#64748B" size={17} />
            </button>
            <div className="w-8 h-8 rounded-full flex items-center justify-center text-xs font-semibold text-white" style={{ background: "linear-gradient(135deg,#6366F1,#8B5CF6)" }}>AS</div>
          </div>
        </header>

        {/* Mobile slide-in nav */}
        {mobileMenuOpen && (
          <div className="fixed inset-0 z-50 md:hidden">
            <div className="absolute inset-0 bg-slate-900/40" onClick={() => setMobileMenuOpen(false)} />
            <aside className="absolute left-0 top-0 h-full w-64 bg-white shadow-xl flex flex-col">
              <div className="px-5 py-5 border-b border-slate-100 flex items-center justify-between">
                <Logo size={30} />
                <button onClick={() => setMobileMenuOpen(false)} className="p-1.5 hover:bg-slate-100 rounded-[8px]">
                  <Icon name="x" stroke="#64748B" size={18} />
                </button>
              </div>
              <nav className="flex-1 px-3 py-4 space-y-0.5 overflow-y-auto">
                {studentNav.map(item => {
                  const isActive = screen === item.id;
                  return (
                    <button key={item.id} onClick={() => navigate(item.id as StudentScreen)}
                      className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-[10px] text-sm font-medium text-left transition-all ${isActive ? "text-indigo-700" : "text-slate-600"}`}
                      style={isActive ? { background: "#EEF0FF" } : {}}>
                      <Icon name={item.icon} stroke={isActive ? "#4F46E5" : "#64748B"} size={18} />
                      {item.label}
                    </button>
                  );
                })}
              </nav>
              <div className="p-4 border-t border-slate-100">
                <div className="flex items-center gap-3 mb-3">
                  <div className="w-9 h-9 rounded-full flex items-center justify-center text-xs font-semibold text-white" style={{ background: "linear-gradient(135deg,#6366F1,#8B5CF6)" }}>AS</div>
                  <div><div className="text-xs font-semibold text-slate-900">Aarav Sharma</div><div className="text-[10px] text-slate-400">Level 7 · 2,480 XP</div></div>
                </div>
                <button onClick={onLogout} className="text-xs text-slate-400 hover:text-slate-700">← Switch role / Log out</button>
              </div>
            </aside>
          </div>
        )}

        {/* Screen content */}
        <main className={`flex-1 min-w-0 ${fullHeight ? "overflow-hidden flex flex-col" : "overflow-y-auto"} pb-16 md:pb-0`}>
          {renderScreen()}
        </main>

        {/* ── Mobile Bottom Tab Bar ── */}
        <nav className="md:hidden fixed bottom-0 left-0 right-0 flex border-t border-slate-200 bg-white z-40 safe-area-inset-bottom">
          {bottomTabNav.map(item => {
            const isActive = screen === item.id || (item.id === "courses" && screen === "course-player");
            return (
              <button key={item.id} onClick={() => navigate(item.id as StudentScreen)}
                className={`flex-1 flex flex-col items-center gap-1 py-2.5 text-[10px] font-medium transition-colors min-h-[56px] ${isActive ? "text-indigo-600" : "text-slate-400"}`}>
                <Icon name={item.icon} stroke={isActive ? "#4F46E5" : "#94A3B8"} size={21} />
                <span className="leading-none">{item.label}</span>
              </button>
            );
          })}
        </nav>
      </div>

      {/* Floating Sharyx Voice Companion Modal */}
      <VoiceTutorModal 
        isOpen={isVoiceOpen}
        onClose={() => setIsVoiceOpen(false)}
        initialConcept={screenTitles[screen] || "DBMS & SQL Concepts"}
      />

      {/* API & Configuration Modal */}
      <SettingsModal 
        isOpen={isSettingsOpen}
        onClose={() => setIsSettingsOpen(false)}
      />
    </div>
  );
}

// ─── Root App ─────────────────────────────────────────────────────────────────
export default function App() {
  const [authState, setAuthState] = useState<AuthState>("landing");
  const [role, setRole] = useState<Role>("student");

  const handleDemoLogin = (r: Role) => {
    setRole(r);
    setAuthState("app");
  };

  const handleRegister = (r: Role) => {
    setRole(r);
    if (r === "student") {
      setAuthState("onboarding");
    } else {
      setAuthState("app");
    }
  };

  const handleLogout = () => {
    setAuthState("landing");
  };

  // Pre-auth screens
  if (authState === "landing") return <Landing onNav={setAuthState} onDemoLogin={handleDemoLogin} />;
  if (authState === "login") return <Login onNav={setAuthState} onDemoLogin={handleDemoLogin} />;
  if (authState === "register") return <Register onNav={setAuthState} onDemoLogin={handleDemoLogin} onRegister={handleRegister} />;
  if (authState === "onboarding") return <Onboarding onDone={() => setAuthState("diagnosis")} />;
  if (authState === "diagnosis") return <Diagnosis onDone={() => setAuthState("app")} />;

  // Authenticated app
  if (role === "teacher") return <TeacherApp onLogout={handleLogout} />;
  if (role === "admin") return <AdminApp onLogout={handleLogout} />;

  // Student app (default)
  return <StudentApp onLogout={handleLogout} />;
}
