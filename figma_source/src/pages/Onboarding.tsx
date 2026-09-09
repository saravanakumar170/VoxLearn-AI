import { useState } from "react";
import { Icon, Logo, PrimaryBtn, SecondaryBtn, ProgressRing } from "../lib";
import type { AuthState } from "../lib";

const goalChips = ["Become an AI Engineer", "Pass DBMS Exam", "Learn Python", "Crack Placements", "Build a Startup", "Upskill at work"];
const styleChips = ["Lesson", "Conversation", "Game", "Podcast", "Video", "Interactive", "Simulation", "Problem-Solving"];
const interestChips = ["Machine Learning", "Web Dev", "Data Science", "Cloud", "Cybersecurity", "Mobile Apps", "System Design", "Algorithms"];

// ─── Onboarding (3 steps) ─────────────────────────────────────────────────────
export function Onboarding({ onDone }: { onDone: () => void }) {
  const [step, setStep] = useState(0);
  const [goal, setGoal] = useState("");
  const [customGoal, setCustomGoal] = useState("");
  const [role, setRole] = useState("student");
  const [year, setYear] = useState("2nd Year");
  const [interests, setInterests] = useState<string[]>([]);
  const [styles, setStyles] = useState<string[]>(["Interactive"]);

  const toggleArr = (arr: string[], setArr: (v: string[]) => void, val: string) => {
    setArr(arr.includes(val) ? arr.filter(x => x !== val) : [...arr, val]);
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-slate-50 px-4 py-10">
      <div className="w-full max-w-md">
        {/* Progress dots */}
        <div className="flex items-center justify-center gap-2 mb-8">
          {[0, 1, 2].map(i => (
            <div key={i} className={`rounded-full transition-all ${i === step ? "w-8 h-2 bg-indigo-500" : i < step ? "w-2 h-2 bg-indigo-300" : "w-2 h-2 bg-slate-200"}`} />
          ))}
        </div>

        {/* Step 0 — Welcome */}
        {step === 0 && (
          <div className="text-center fade-in">
            <div className="w-20 h-20 rounded-2xl mx-auto mb-6 flex items-center justify-center"
              style={{ background: "linear-gradient(135deg,#6366F1,#8B5CF6)" }}>
              <Logo size={44} showText={false} />
            </div>
            <h1 className="text-3xl font-extrabold text-slate-900 tracking-tight mb-3">Welcome to LearnOS AI</h1>
            <p className="text-slate-500 text-base leading-relaxed mb-10">
              A unique learning experience for every student. Let's personalise your journey in 2 minutes.
            </p>
            <PrimaryBtn onClick={() => setStep(1)} className="w-full py-3.5 text-base">Get Started</PrimaryBtn>
            <button className="mt-4 text-sm text-slate-400 hover:text-slate-600 underline underline-offset-2">I already have an account</button>
          </div>
        )}

        {/* Step 1 — Goal */}
        {step === 1 && (
          <div className="fade-in">
            <div className="text-center mb-8">
              <div className="text-4xl mb-3">🎯</div>
              <h2 className="text-2xl font-bold text-slate-900 tracking-tight mb-2">What's your goal?</h2>
              <p className="text-slate-500 text-sm">We'll build a personalised roadmap around it.</p>
            </div>
            <div className="flex flex-wrap gap-2 mb-5">
              {goalChips.map(g => (
                <button key={g} onClick={() => setGoal(g)}
                  className={`px-3.5 py-2 rounded-full text-sm font-medium border transition-all ${goal === g ? "border-indigo-400 text-indigo-700" : "border-slate-200 text-slate-600 hover:border-slate-300"}`}
                  style={goal === g ? { background: "#EEF0FF" } : { background: "white" }}>
                  {g}
                </button>
              ))}
            </div>
            <div className="flex items-center gap-2 px-3.5 py-2.5 rounded-[10px] border border-slate-200 bg-white mb-8 focus-within:border-indigo-400">
              <Icon name="plus" stroke="#94A3B8" size={16} />
              <input value={customGoal} onChange={e => setCustomGoal(e.target.value)}
                placeholder="Or type your own goal…" className="flex-1 text-sm outline-none text-slate-800 placeholder:text-slate-400" />
            </div>
            <div className="flex gap-3">
              <SecondaryBtn onClick={() => setStep(0)} className="flex-1">Back</SecondaryBtn>
              <PrimaryBtn onClick={() => setStep(2)} className="flex-1" disabled={!goal && !customGoal}>Continue</PrimaryBtn>
            </div>
          </div>
        )}

        {/* Step 2 — About you */}
        {step === 2 && (
          <div className="fade-in">
            <div className="text-center mb-6">
              <div className="text-4xl mb-3">👤</div>
              <h2 className="text-2xl font-bold text-slate-900 tracking-tight mb-2">Tell us about you</h2>
              <p className="text-slate-500 text-sm">So LearnOS adapts the depth, pace, and style.</p>
            </div>

            <div className="space-y-5">
              <div>
                <label className="text-xs font-semibold text-slate-600 uppercase tracking-widest block mb-2">Current role</label>
                <select value={role} onChange={e => setRole(e.target.value)}
                  className="w-full px-3 py-2.5 rounded-[10px] border border-slate-200 bg-white text-sm text-slate-800 outline-none">
                  <option value="student">Student</option>
                  <option value="working">Working Professional</option>
                  <option value="researcher">Researcher</option>
                  <option value="self">Self-learner</option>
                </select>
              </div>

              <div>
                <label className="text-xs font-semibold text-slate-600 uppercase tracking-widest block mb-2">Year / Level</label>
                <select value={year} onChange={e => setYear(e.target.value)}
                  className="w-full px-3 py-2.5 rounded-[10px] border border-slate-200 bg-white text-sm text-slate-800 outline-none">
                  {["1st Year", "2nd Year", "3rd Year", "4th Year", "Postgrad", "Professional"].map(y => <option key={y}>{y}</option>)}
                </select>
              </div>

              <div>
                <label className="text-xs font-semibold text-slate-600 uppercase tracking-widest block mb-2">Interests</label>
                <div className="flex flex-wrap gap-2">
                  {interestChips.map(t => (
                    <button key={t} onClick={() => toggleArr(interests, setInterests, t)}
                      className={`px-3 py-1.5 rounded-full text-xs font-medium border transition-all ${interests.includes(t) ? "border-indigo-400 text-indigo-700" : "border-slate-200 text-slate-500 hover:border-slate-300"}`}
                      style={interests.includes(t) ? { background: "#EEF0FF" } : { background: "white" }}>
                      {t}
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <label className="text-xs font-semibold text-slate-600 uppercase tracking-widest block mb-2">Preferred learning styles</label>
                <div className="flex flex-wrap gap-2">
                  {styleChips.map(s => (
                    <button key={s} onClick={() => toggleArr(styles, setStyles, s)}
                      className={`px-3 py-1.5 rounded-full text-xs font-medium border transition-all ${styles.includes(s) ? "border-indigo-400 text-indigo-700" : "border-slate-200 text-slate-500"}`}
                      style={styles.includes(s) ? { background: "#EEF0FF" } : { background: "white" }}>
                      {s}
                      {s === "Interactive" && <span className="ml-1 text-[9px] text-indigo-400">★ rec</span>}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            <div className="flex gap-3 mt-8">
              <SecondaryBtn onClick={() => setStep(1)} className="flex-1">Back</SecondaryBtn>
              <PrimaryBtn onClick={onDone} className="flex-1 py-3">Enter LearnOS 🚀</PrimaryBtn>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

// ─── Knowledge Diagnosis ──────────────────────────────────────────────────────
export function Diagnosis({ onDone }: { onDone: () => void }) {
  const [selected, setSelected] = useState<number | null>(null);
  const [q, setQ] = useState(1);
  const [building, setBuilding] = useState(false);
  const total = 8;

  const handleNext = () => {
    if (q < total) {
      setQ(q + 1);
      setSelected(null);
    } else {
      setBuilding(true);
      setTimeout(onDone, 2200);
    }
  };

  if (building) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-slate-50 px-4">
        <div className="text-center fade-in">
          <div className="relative mx-auto mb-8" style={{ width: 120, height: 120 }}>
            <svg width="120" height="120" style={{ transform: "rotate(-90deg)" }}>
              <circle cx="60" cy="60" r="52" fill="none" stroke="#E2E8F0" strokeWidth="8" />
              <circle cx="60" cy="60" r="52" fill="none" stroke="#6366F1" strokeWidth="8"
                strokeDasharray={2 * Math.PI * 52} strokeDashoffset={2 * Math.PI * 52 * 0.3}
                strokeLinecap="round" className="pulse-ring" />
            </svg>
            <div className="absolute inset-0 flex items-center justify-center text-2xl">🧠</div>
          </div>
          <h2 className="text-xl font-bold text-slate-900 mb-2">Building your knowledge graph…</h2>
          <p className="text-slate-500 text-sm">Mapping your strengths and finding where to start.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col px-4 py-10">
      <div className="max-w-lg mx-auto w-full">
        {/* Header */}
        <div className="text-center mb-8">
          <Logo size={32} />
          <h1 className="text-xl font-bold text-slate-900 mt-5 mb-2 tracking-tight leading-snug">
            Let's find your starting point
          </h1>
          <p className="text-slate-500 text-sm">A few quick questions to calibrate your learning path.</p>
        </div>

        {/* Progress */}
        <div className="flex items-center gap-4 mb-6">
          <ProgressRing value={(q / total) * 100} size={56} stroke={6} color="#6366F1" label={`${q}/${total}`} />
          <div className="flex-1">
            <div className="text-xs font-semibold text-slate-600 mb-1.5">Question {q} of {total}</div>
            <div className="w-full bg-slate-100 rounded-full h-1.5">
              <div className="h-1.5 rounded-full bg-indigo-500 transition-all" style={{ width: `${(q / total) * 100}%` }} />
            </div>
            <div className="flex items-center gap-1.5 mt-1.5">
              <div className="w-2 h-2 rounded-full bg-indigo-400 pulse-ring" />
              <span className="text-[11px] text-indigo-600 font-medium">Diagnosing: SQL subqueries</span>
            </div>
          </div>
        </div>

        {/* Question card */}
        <div className="bg-white rounded-[16px] border border-slate-200 p-6 mb-4 fade-in" style={{ boxShadow: "0 1px 3px rgba(15,23,42,0.06)" }}>
          <p className="text-base font-semibold text-slate-900 mb-5 leading-relaxed">
            Which SQL clause is used to filter results <em>after</em> grouping rows by a column?
          </p>
          <div className="space-y-2.5">
            {["WHERE", "HAVING", "GROUP BY", "ORDER BY"].map((opt, i) => (
              <button key={`opt-${i}`} onClick={() => setSelected(i)}
                className={`w-full text-left p-3.5 rounded-[10px] border-2 transition-all flex items-center gap-3 text-sm ${selected === i ? "border-indigo-400" : "border-slate-200 hover:border-slate-300"}`}
                style={selected === i ? { background: "#EEF0FF" } : {}}>
                <span className={`w-6 h-6 rounded-full border-2 flex-shrink-0 flex items-center justify-center text-xs font-bold transition-all ${selected === i ? "border-indigo-500 bg-indigo-500 text-white" : "border-slate-300 text-slate-400"}`}>
                  {String.fromCharCode(65 + i)}
                </span>
                <span className={selected === i ? "text-indigo-800 font-medium" : "text-slate-700"}>{opt}</span>
              </button>
            ))}
          </div>
          <div className="mt-4 flex items-start gap-2 p-3 rounded-[10px] bg-violet-50 border border-violet-100">
            <span className="text-base">🤖</span>
            <p className="text-xs text-violet-700 font-medium">Skip if unsure — I'll adapt the next question based on your pattern.</p>
          </div>
        </div>

        <div className="flex gap-3">
          <button onClick={handleNext} className="text-sm text-slate-400 hover:text-slate-600 px-4 py-2.5">Skip</button>
          <button onClick={handleNext} disabled={selected === null}
            className="flex-1 py-2.5 rounded-[10px] text-sm font-semibold text-white transition-all disabled:opacity-40"
            style={{ background: "linear-gradient(135deg,#6366F1,#8B5CF6)" }}>
            {q < total ? "Next question →" : "Finish calibration →"}
          </button>
        </div>

        <p className="text-center text-xs text-slate-400 mt-5">
          This isn't graded. It builds your knowledge map so LearnOS knows where to start.
        </p>
      </div>
    </div>
  );
}
