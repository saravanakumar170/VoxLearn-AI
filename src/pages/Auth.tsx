import { useState } from "react";
import { Icon, Logo, PrimaryBtn } from "../lib";
import type { AuthState, Role, IconName } from "../lib";
import { memoryStore } from "../services/memoryStore";
import { apiClient } from "../services/apiClient";

// ─── Login ────────────────────────────────────────────────────────────────────
const DEMO_ACCOUNTS: { role: Role; name: string; email: string; icon: IconName; color: string }[] = [
  { role: "student", name: "Aarav Sharma", email: "aarav@learnosdemo.ai", icon: "graduationCap", color: "bg-indigo-50 border-indigo-200 text-indigo-700" },
  { role: "teacher", name: "Prof. Meera Krishnan", email: "meera@learnosdemo.ai", icon: "user", color: "bg-emerald-50 border-emerald-200 text-emerald-700" },
  { role: "admin", name: "Institution Admin", email: "admin@learnosdemo.ai", icon: "building", color: "bg-sky-50 border-sky-200 text-sky-700" },
];

export function Login({
  onNav,
  onDemoLogin,
}: {
  onNav: (s: AuthState) => void;
  onDemoLogin: (role: Role) => void;
}) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPass, setShowPass] = useState(false);

  const handleLoginSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (email) {
      const loginName = email.split('@')[0].replace(/[._-]/g, ' ').replace(/\b\w/g, c => c.toUpperCase());
      try {
        const user = await apiClient.login(email, password || "password");
        memoryStore.updateStudentProfile({
          name: user?.name || loginName,
          email: email,
          role: user?.role || "student"
        });
      } catch (err) {
        memoryStore.updateStudentProfile({
          name: loginName,
          email: email
        });
      }
    }
    onDemoLogin("student");
  };

  return (
    <div className="min-h-screen bg-slate-50 flex">
      {/* Left panel — desktop only */}
      <div className="hidden lg:flex w-1/2 flex-col justify-between p-12"
        style={{ background: "linear-gradient(135deg,#6366F1 0%,#8B5CF6 100%)" }}>
        <Logo size={36} showText />
        <div>
          <h2 className="text-3xl font-bold text-white tracking-tight leading-snug mb-4">
            "LearnOS helped me understand subqueries in 20 minutes — my textbook couldn't do that in 2 weeks."
          </h2>
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-white/20 flex items-center justify-center text-white font-bold">AS</div>
            <div>
              <div className="text-sm font-semibold text-white">Aarav Sharma</div>
              <div className="text-sm text-white/70">2nd Year B.E. CSE · Coimbatore</div>
            </div>
          </div>
        </div>
        <div className="flex gap-4">
          {["50K+ learners", "94% goal completion", "120+ institutions"].map(s => (
            <div key={s} className="px-3 py-1.5 rounded-full bg-white/15 text-white text-xs font-medium">{s}</div>
          ))}
        </div>
      </div>

      {/* Right panel */}
      <div className="flex-1 flex flex-col items-center justify-center p-6 sm:p-10">
        <div className="w-full max-w-sm">
          <div className="lg:hidden mb-8 flex justify-center"><Logo size={36} /></div>
          <h1 className="text-2xl font-bold text-slate-900 tracking-tight mb-1">Welcome back</h1>
          <p className="text-slate-500 text-sm mb-8">Log in to your LearnOS AI account</p>

          {/* Demo logins */}
          <div className="mb-6">
            <div className="text-[10px] font-semibold uppercase tracking-widest text-slate-400 mb-3">Demo accounts — click to log in instantly</div>
            <div className="space-y-2">
              {DEMO_ACCOUNTS.map(d => (
                <button key={d.role} onClick={() => {
                  memoryStore.updateStudentProfile({
                    name: d.name,
                    email: d.email,
                    role: d.role,
                    level: 7,
                    xp: 2480,
                    streakDays: 12,
                    targetGoal: "AI Engineer & Distributed Systems Specialist"
                  });
                  onDemoLogin(d.role);
                }}
                  className={`w-full flex items-center gap-3 p-3 rounded-[10px] border transition-all hover:shadow-sm text-left ${d.color}`}>
                  <Icon name={d.icon} stroke="currentColor" size={20} />
                  <div className="flex-1 min-w-0">
                    <div className="text-xs font-semibold capitalize">{d.role} Demo</div>
                    <div className="text-xs opacity-70 truncate">{d.name}</div>
                  </div>
                  <Icon name="arrowRight" stroke="currentColor" size={14} />
                </button>
              ))}
            </div>
          </div>

          <div className="relative flex items-center gap-3 mb-6">
            <div className="flex-1 h-px bg-slate-200" />
            <span className="text-xs text-slate-400 font-medium">or log in with email</span>
            <div className="flex-1 h-px bg-slate-200" />
          </div>

          <form onSubmit={handleLoginSubmit} className="space-y-4">
            <div>
              <label className="text-xs font-semibold text-slate-700 block mb-1.5">Email</label>
              <div className="flex items-center gap-2 px-3 py-2.5 rounded-[10px] border border-slate-200 bg-white focus-within:border-indigo-400 transition-colors">
                <Icon name="mail" stroke="#94A3B8" size={16} />
                <input type="email" value={email} onChange={e => setEmail(e.target.value)}
                  placeholder="you@example.com" className="flex-1 text-sm outline-none text-slate-800 placeholder:text-slate-400" />
              </div>
            </div>
            <div>
              <div className="flex items-center justify-between mb-1.5">
                <label className="text-xs font-semibold text-slate-700">Password</label>
                <button type="button" className="text-xs text-indigo-500 hover:text-indigo-700">Forgot password?</button>
              </div>
              <div className="flex items-center gap-2 px-3 py-2.5 rounded-[10px] border border-slate-200 bg-white focus-within:border-indigo-400 transition-colors">
                <Icon name="lock" stroke="#94A3B8" size={16} />
                <input type={showPass ? "text" : "password"} value={password} onChange={e => setPassword(e.target.value)}
                  placeholder="••••••••" className="flex-1 text-sm outline-none text-slate-800 placeholder:text-slate-400" />
                <button type="button" onClick={() => setShowPass(!showPass)}>
                  <Icon name={showPass ? "eyeOff" : "eye"} stroke="#94A3B8" size={16} />
                </button>
              </div>
            </div>
            <PrimaryBtn type="submit" className="w-full py-3">Log in to LearnOS AI</PrimaryBtn>
          </form>

          <p className="text-center text-sm text-slate-500 mt-6">
            Don't have an account?{" "}
            <button onClick={() => onNav("register")} className="text-indigo-600 font-semibold hover:text-indigo-800">Sign up free</button>
          </p>
          <button onClick={() => onNav("landing")} className="w-full text-center text-xs text-slate-400 mt-4 hover:text-slate-600 flex items-center justify-center gap-1">
            <Icon name="chevronLeft" stroke="currentColor" size={12} /> Back to home
          </button>
        </div>
      </div>
    </div>
  );
}

// ─── Register ─────────────────────────────────────────────────────────────────
export function Register({
  onNav,
  onDemoLogin,
  onRegister,
}: {
  onNav: (s: AuthState) => void;
  onDemoLogin: (role: Role) => void;
  onRegister?: (role: Role) => void;
}) {
  const [role, setRole] = useState<Role>("student");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPass, setShowPass] = useState(false);

  const roleOptions: { role: Role; label: string; icon: IconName; desc: string }[] = [
    { role: "student", label: "Student", icon: "graduationCap", desc: "Learn with AI" },
    { role: "teacher", label: "Teacher", icon: "user", desc: "Manage your class" },
    { role: "admin", label: "Admin", icon: "building", desc: "Org-level insights" },
  ];

  const handleRegisterSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const finalName = name.trim() || "New Learner";
    const finalEmail = email.trim() || "user@learnos.ai";

    memoryStore.resetForNewUser({
      name: finalName,
      email: finalEmail,
      role: role,
      targetGoal: "AI Engineer & Software Systems"
    });

    try {
      await apiClient.register(finalName, finalEmail, password || "password", role);
    } catch (err) {
      console.warn("Register API call fallback:", err);
    }

    if (onRegister) {
      onRegister(role);
    } else {
      onDemoLogin(role);
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col items-center justify-center p-6 sm:p-10">
      <div className="w-full max-w-md">
        <div className="mb-8 flex justify-center"><Logo size={36} /></div>
        <h1 className="text-2xl font-bold text-slate-900 tracking-tight mb-1 text-center">Create your account</h1>
        <p className="text-slate-500 text-sm mb-8 text-center">Start your personalised learning journey today</p>

        {/* Role selector */}
        <div className="mb-6">
          <div className="text-[10px] font-semibold uppercase tracking-widest text-slate-400 mb-3">I am a…</div>
          <div className="grid grid-cols-3 gap-2">
            {roleOptions.map(r => (
              <button key={r.role} onClick={() => setRole(r.role)}
                className={`flex flex-col items-center gap-1.5 p-3 rounded-[12px] border-2 transition-all ${role === r.role ? "border-indigo-400" : "border-slate-200 hover:border-slate-300"}`}
                style={role === r.role ? { background: "#EEF0FF" } : { background: "white" }}>
                <Icon name={r.icon} stroke={role === r.role ? "#4F46E5" : "#64748B"} size={24} />
                <span className={`text-xs font-semibold ${role === r.role ? "text-indigo-700" : "text-slate-700"}`}>{r.label}</span>
                <span className="text-[10px] text-slate-400">{r.desc}</span>
              </button>
            ))}
          </div>
        </div>

        <form onSubmit={handleRegisterSubmit} className="space-y-4">
          <div>
            <label className="text-xs font-semibold text-slate-700 block mb-1.5">Full name</label>
            <div className="flex items-center gap-2 px-3 py-2.5 rounded-[10px] border border-slate-200 bg-white focus-within:border-indigo-400">
              <Icon name="user" stroke="#94A3B8" size={16} />
              <input type="text" value={name} onChange={e => setName(e.target.value)}
                placeholder="Your full name" className="flex-1 text-sm outline-none text-slate-800 placeholder:text-slate-400" required />
            </div>
          </div>
          <div>
            <label className="text-xs font-semibold text-slate-700 block mb-1.5">Email</label>
            <div className="flex items-center gap-2 px-3 py-2.5 rounded-[10px] border border-slate-200 bg-white focus-within:border-indigo-400">
              <Icon name="mail" stroke="#94A3B8" size={16} />
              <input type="email" value={email} onChange={e => setEmail(e.target.value)}
                placeholder="you@example.com" className="flex-1 text-sm outline-none text-slate-800 placeholder:text-slate-400" required />
            </div>
          </div>
          <div>
            <label className="text-xs font-semibold text-slate-700 block mb-1.5">Password</label>
            <div className="flex items-center gap-2 px-3 py-2.5 rounded-[10px] border border-slate-200 bg-white focus-within:border-indigo-400">
              <Icon name="lock" stroke="#94A3B8" size={16} />
              <input type={showPass ? "text" : "password"} value={password} onChange={e => setPassword(e.target.value)}
                placeholder="Min. 8 characters" className="flex-1 text-sm outline-none text-slate-800 placeholder:text-slate-400" required />
              <button type="button" onClick={() => setShowPass(!showPass)}>
                <Icon name={showPass ? "eyeOff" : "eye"} stroke="#94A3B8" size={16} />
              </button>
            </div>
          </div>
          <PrimaryBtn type="submit" className="w-full py-3">
            Create account & get started <Icon name="arrowRight" stroke="white" size={16} />
          </PrimaryBtn>
        </form>

        <p className="text-center text-xs text-slate-400 mt-4">
          By signing up you agree to our Terms of Service and Privacy Policy.
        </p>
        <p className="text-center text-sm text-slate-500 mt-4">
          Already have an account?{" "}
          <button onClick={() => onNav("login")} className="text-indigo-600 font-semibold hover:text-indigo-800">Log in</button>
        </p>
        <button onClick={() => onNav("landing")} className="w-full text-center text-xs text-slate-400 mt-3 hover:text-slate-600 flex items-center justify-center gap-1">
          <Icon name="chevronLeft" stroke="currentColor" size={12} /> Back to home
        </button>
      </div>
    </div>
  );
}
