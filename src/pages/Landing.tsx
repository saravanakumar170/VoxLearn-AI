import { Icon, Logo, PrimaryBtn, SecondaryBtn } from "../lib";
import type { AuthState, Role, IconName } from "../lib";

const features = [
  { icon: "sparkles" as const, title: "AI-Personalised Learning", desc: "Adaptive content that adjusts to your mastery level in real time." },
  { icon: "brain" as const, title: "Knowledge Graph", desc: "Visual map of what you know, what's weak, and what to learn next." },
  { icon: "tutor" as const, title: "College AI Tutor", desc: "Chat with AI trained on your own lecture notes, PDFs, and past papers." },
  { icon: "trophy" as const, title: "Gamification & Streaks", desc: "XP, badges, leaderboards, and daily challenges to keep you motivated." },
  { icon: "target" as const, title: "Goal Roadmaps", desc: "Auto-generated learning paths tied to your career goals." },
  { icon: "users" as const, title: "Peer Learning", desc: "Collaborative challenges, study groups, and peer matching." },
];

const roles: { role: Role; label: string; icon: IconName; desc: string; color: string; demo: string }[] = [
  {
    role: "student",
    label: "Student",
    icon: "graduationCap",
    desc: "Learn smarter with AI that adapts to you",
    color: "from-indigo-500 to-violet-600",
    demo: "Aarav Sharma · Level 7 · 2,480 XP",
  },
  {
    role: "teacher",
    label: "Teacher",
    icon: "user",
    desc: "Empower your class with AI-driven insights",
    color: "from-emerald-500 to-teal-600",
    demo: "Prof. Meera Krishnan · CSE-B DBMS",
  },
  {
    role: "admin",
    label: "Institution Admin",
    icon: "building",
    desc: "Manage cohorts, analytics, and outcomes",
    color: "from-sky-500 to-blue-600",
    demo: "Admin · Sri Venkateswara College of Engg.",
  },
];

const stats = [
  { value: "50,000+", label: "Active Learners" },
  { value: "94%", label: "Goal Completion Rate" },
  { value: "3.2×", label: "Faster Mastery" },
  { value: "120+", label: "Institutions" },
];

export default function Landing({
  onNav,
  onDemoLogin,
}: {
  onNav: (s: AuthState) => void;
  onDemoLogin: (role: Role) => void;
}) {
  return (
    <div className="min-h-screen bg-[#F8FAFC] text-slate-900">
      {/* Nav */}
      <nav className="sticky top-0 z-50 bg-white/90 backdrop-blur border-b border-slate-200">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 h-14 flex items-center justify-between">
          <Logo size={32} />
          <div className="hidden sm:flex items-center gap-6 text-sm text-slate-500 font-medium">
            <a href="#features" className="hover:text-slate-900 transition-colors">Features</a>
            <a href="#roles" className="hover:text-slate-900 transition-colors">For Students</a>
            <a href="#roles" className="hover:text-slate-900 transition-colors">For Teachers</a>
          </div>
          <div className="flex items-center gap-2">
            <SecondaryBtn onClick={() => onNav("login")} className="hidden sm:flex">Log in</SecondaryBtn>
            <PrimaryBtn onClick={() => onNav("register")}>Get Started</PrimaryBtn>
          </div>
        </div>
      </nav>

      {/* Hero */}
      <section className="relative overflow-hidden pt-16 pb-24 px-4">
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[900px] h-[500px] rounded-full opacity-10"
            style={{ background: "radial-gradient(ellipse,#6366F1 0%,transparent 70%)" }} />
        </div>
        <div className="max-w-4xl mx-auto text-center relative">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full text-xs font-semibold mb-6 border"
            style={{ background: "#EEF0FF", color: "#4F46E5", borderColor: "#C7D2FE" }}>
            <Icon name="sparkles" stroke="#4F46E5" size={13} />
            Now with Multi-Agent AI — every learner gets a unique path
          </div>
          <h1 className="text-4xl sm:text-6xl font-extrabold tracking-tight text-slate-900 leading-tight mb-5">
            A unique learning experience<br className="hidden sm:block" />
            <span className="gradient-text"> for every student.</span>
          </h1>
          <p className="text-lg sm:text-xl text-slate-500 mb-10 max-w-2xl mx-auto leading-relaxed">
            LearnOS AI combines your lecture notes, textbooks, and goals into a fully adaptive learning ecosystem — with an AI tutor that knows your curriculum inside out.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
            <PrimaryBtn onClick={() => onNav("register")} className="w-full sm:w-auto px-8 py-3 text-base">
              Start Learning Free <Icon name="arrowRight" stroke="white" size={16} />
            </PrimaryBtn>
            <SecondaryBtn onClick={() => onNav("login")} className="w-full sm:w-auto px-8 py-3 text-base">
              Log in to your account
            </SecondaryBtn>
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="bg-white border-y border-slate-200 py-10 px-4">
        <div className="max-w-5xl mx-auto grid grid-cols-2 sm:grid-cols-4 gap-8">
          {stats.map(s => (
            <div key={s.label} className="text-center">
              <div className="text-3xl font-extrabold tabular gradient-text">{s.value}</div>
              <div className="text-sm text-slate-500 mt-1 font-medium">{s.label}</div>
            </div>
          ))}
        </div>
      </section>

      {/* Features */}
      <section id="features" className="py-20 px-4">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-12">
            <div className="text-xs font-semibold uppercase tracking-widest text-indigo-500 mb-3">Why LearnOS AI</div>
            <h2 className="text-3xl sm:text-4xl font-bold text-slate-900 tracking-tight">Everything you need to master any subject</h2>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {features.map(f => (
              <div key={f.title} className="bg-white rounded-[16px] border border-slate-200 p-5 hover:shadow-md hover:-translate-y-0.5 transition-all"
                style={{ boxShadow: "0 1px 3px rgba(15,23,42,0.06)" }}>
                <div className="w-10 h-10 rounded-[10px] flex items-center justify-center mb-4" style={{ background: "#EEF0FF" }}>
                  <Icon name={f.icon} stroke="#4F46E5" size={20} />
                </div>
                <h3 className="text-sm font-bold text-slate-900 mb-1">{f.title}</h3>
                <p className="text-sm text-slate-500 leading-relaxed">{f.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Demo Login by Role */}
      <section id="roles" className="py-20 px-4 bg-white border-y border-slate-200">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-12">
            <div className="text-xs font-semibold uppercase tracking-widest text-indigo-500 mb-3">Try a Demo</div>
            <h2 className="text-3xl sm:text-4xl font-bold text-slate-900 tracking-tight">Built for every role in education</h2>
            <p className="text-slate-500 mt-3 text-base">Click any card to instantly log in with a demo account.</p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
            {roles.map(r => (
              <button key={r.role} onClick={() => onDemoLogin(r.role)}
                className="text-left rounded-[18px] overflow-hidden border border-slate-200 hover:shadow-lg hover:-translate-y-1 transition-all group">
                <div className={`h-28 bg-gradient-to-br ${r.color} flex items-center justify-center p-5`}>
                  <Icon name={r.icon} stroke="white" size={44} />
                </div>
                <div className="p-5 bg-white">
                  <div className="text-base font-bold text-slate-900 group-hover:text-indigo-700 transition-colors">{r.label}</div>
                  <div className="text-sm text-slate-500 mt-1 mb-4 leading-relaxed">{r.desc}</div>
                  <div className="flex items-center justify-between">
                    <span className="text-xs text-slate-400 font-medium">{r.demo}</span>
                    <span className="text-xs font-semibold text-indigo-600 group-hover:text-indigo-800 flex items-center gap-1">
                      Demo login <Icon name="arrowRight" stroke="currentColor" size={12} />
                    </span>
                  </div>
                </div>
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 px-4">
        <div className="max-w-2xl mx-auto text-center rounded-[24px] p-12" style={{ background: "linear-gradient(135deg,#6366F1,#8B5CF6)" }}>
          <h2 className="text-2xl sm:text-3xl font-bold text-white mb-4 tracking-tight">Ready to learn smarter?</h2>
          <p className="text-white/80 mb-8 text-base">Join 50,000+ students who are mastering their subjects with AI-powered personalized learning.</p>
          <button onClick={() => onNav("register")} className="mx-auto px-10 py-3 text-base font-semibold rounded-[12px] transition-all" style={{ background: "white", color: "#4338CA" }}>
            Get started for free
          </button>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-slate-200 py-8 px-4">
        <div className="max-w-5xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4 text-sm text-slate-400">
          <Logo size={24} />
          <div>© 2025 LearnOS AI. A unique learning experience for every student.</div>
        </div>
      </footer>
    </div>
  );
}
