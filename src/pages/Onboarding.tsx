import { useState, useEffect } from "react";
import { Icon, Logo, PrimaryBtn, SecondaryBtn, ProgressRing } from "../lib";
import { memoryStore } from "../services/memoryStore";
import { groqService } from "../services/groqService";

const goalChips = ["Become an AI Engineer", "DSA for Placements", "Learn Python for Data Science", "Pass Operating Systems Exam", "Master System Design", "Build a Startup", "Upskill at work"];
const styleChips = ["Interactive Simulation", "Dual-Host Podcast", "Game Arena", "Traditional Lesson", "Socratic Conversation", "Video Storyboard"];
const interestChips = ["Machine Learning & RAG", "Data Structures & Algorithms", "Distributed Systems", "Operating Systems", "Relational Databases", "Cloud Infrastructure", "Full-Stack Web"];

// ─── Onboarding (3 steps) ─────────────────────────────────────────────────────
export function Onboarding({ onDone }: { onDone: () => void }) {
  const [step, setStep] = useState(0);
  const [goal, setGoal] = useState("Become an AI Engineer");
  const [customGoal, setCustomGoal] = useState("");
  const [role, setRole] = useState("student");
  const [year, setYear] = useState("2nd Year");
  const [interests, setInterests] = useState<string[]>(["Machine Learning & RAG", "Data Structures & Algorithms"]);
  const [styles, setStyles] = useState<string[]>(["Interactive Simulation", "Dual-Host Podcast"]);

  const toggleArr = (arr: string[], setArr: (v: string[]) => void, val: string) => {
    setArr(arr.includes(val) ? arr.filter(x => x !== val) : [...arr, val]);
  };

  const handleFinishOnboarding = () => {
    const finalGoal = customGoal.trim() || goal || "AI Engineer & Software Systems";
    memoryStore.updateStudentProfile({
      targetGoal: finalGoal,
      targetRole: finalGoal,
      preferredMode: styles.join(", ") || "Interactive Simulation, Dual-Host Podcast"
    });
    onDone();
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
            <h1 className="text-3xl font-extrabold text-slate-900 tracking-tight mb-3">Welcome to VoxLearn AI</h1>
            <p className="text-slate-500 text-base leading-relaxed mb-10">
              Autonomous, multi-agent AI learning calibrated to your starting knowledge and career targets.
            </p>
            <PrimaryBtn onClick={() => setStep(1)} className="w-full py-3.5 text-base">Get Started</PrimaryBtn>
            <button onClick={() => setStep(1)} className="mt-4 text-sm text-slate-400 hover:text-slate-600 underline underline-offset-2">I already have an account</button>
          </div>
        )}

        {/* Step 1 — Goal */}
        {step === 1 && (
          <div className="fade-in">
            <div className="text-center mb-8">
              <div className="w-12 h-12 rounded-full bg-indigo-100 flex items-center justify-center mx-auto mb-3">
                <Icon name="target" stroke="#4F46E5" size={24} />
              </div>
              <h2 className="text-2xl font-bold text-slate-900 tracking-tight mb-2">What's your primary goal?</h2>
              <p className="text-slate-500 text-sm">Our AI will generate 8 diagnostic calibration questions around this domain.</p>
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
                placeholder="Or type your custom course or career goal…" className="flex-1 text-sm outline-none text-slate-800 placeholder:text-slate-400" />
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
              <div className="w-12 h-12 rounded-full bg-indigo-100 flex items-center justify-center mx-auto mb-3">
                <Icon name="user" stroke="#4F46E5" size={24} />
              </div>
              <h2 className="text-2xl font-bold text-slate-900 tracking-tight mb-2">Customize your profile</h2>
              <p className="text-slate-500 text-sm">VoxLearn AI will calibrate depth, pace, and multi-modal delivery.</p>
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
                <label className="text-xs font-semibold text-slate-600 uppercase tracking-widest block mb-2">Preferred learning modes</label>
                <div className="flex flex-wrap gap-2">
                  {styleChips.map(s => (
                    <button key={s} onClick={() => toggleArr(styles, setStyles, s)}
                      className={`px-3 py-1.5 rounded-full text-xs font-medium border transition-all ${styles.includes(s) ? "border-indigo-400 text-indigo-700" : "border-slate-200 text-slate-500"}`}
                      style={styles.includes(s) ? { background: "#EEF0FF" } : { background: "white" }}>
                      {s}
                      {s === "Interactive Simulation" && <span className="ml-1 text-[9px] text-indigo-400">★ rec</span>}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            <div className="flex gap-3 mt-8">
              <SecondaryBtn onClick={() => setStep(1)} className="flex-1">Back</SecondaryBtn>
              <PrimaryBtn onClick={handleFinishOnboarding} className="flex-1 py-3">
                Calibrate Knowledge <Icon name="arrowRight" stroke="white" size={16} />
              </PrimaryBtn>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

// ─── Knowledge Diagnosis (8 Dynamic Questions) ────────────────────────────────
export function Diagnosis({ onDone }: { onDone: () => void }) {
  const [domain, setDomain] = useState(() => memoryStore.getState().student?.targetGoal || "AI Engineer & Software Systems");
  const [questions, setQuestions] = useState<any[]>([]);
  const [isLoadingQuestions, setIsLoadingQuestions] = useState(true);
  const [currentIdx, setCurrentIdx] = useState(0);
  const [selectedOption, setSelectedOption] = useState<number | null>(null);
  const [userAnswers, setUserAnswers] = useState<number[]>([]);
  const [building, setBuilding] = useState(false);
  const total = 8;

  useEffect(() => {
    let isMounted = true;
    const loadQuestions = async () => {
      setIsLoadingQuestions(true);
      try {
        const loaded = await groqService.generateDiagnosticQuestions(domain, total);
        if (isMounted) {
          setQuestions(loaded.slice(0, total));
        }
      } catch (err) {
        if (isMounted) {
          setQuestions(groqService.getFallbackDiagnosticQuestions(domain));
        }
      } finally {
        if (isMounted) {
          setIsLoadingQuestions(false);
        }
      }
    };
    loadQuestions();
    return () => { isMounted = false; };
  }, [domain]);

  const activeQuestion = questions[currentIdx] || {
    id: currentIdx + 1,
    concept: `${domain} Core`,
    question: `Calibrating question ${currentIdx + 1} for ${domain}...`,
    options: ["Option A", "Option B", "Option C", "Option D"],
    correctIndex: 0,
    hint: "Think about core system invariants.",
    explanation: "Correct fundamental logic."
  };

  const handleNext = () => {
    const updatedAnswers = [...userAnswers, selectedOption !== null ? selectedOption : -1];
    setUserAnswers(updatedAnswers);

    if (currentIdx + 1 < total) {
      setCurrentIdx(currentIdx + 1);
      setSelectedOption(null);
    } else {
      setBuilding(true);
      
      // Analyze performance across 8 questions and update Knowledge Nodes in memoryStore
      setTimeout(() => {
        let correctCount = 0;
        questions.forEach((q, idx) => {
          const ans = updatedAnswers[idx];
          const isCorrect = ans === q.correctIndex;
          if (isCorrect) correctCount++;
          
          // Update or add knowledge node
          memoryStore.updateNodeMastery(q.concept, isCorrect ? 88 : 42);
        });

        // Award initial diagnostic XP (+150 XP)
        memoryStore.addXP(150, "Completed Knowledge Calibration");
        memoryStore.recordHistory({
          action: `Completed 8-Question Diagnostic Calibration for ${domain}`,
          score: Math.round((correctCount / total) * 100),
          severity: "Low"
        });

        onDone();
      }, 2200);
    }
  };

  if (isLoadingQuestions) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-slate-50 px-4">
        <div className="text-center fade-in">
          <div className="w-16 h-16 rounded-2xl mx-auto mb-4 flex items-center justify-center bg-indigo-50 border border-indigo-100 animate-pulse">
            <Icon name="sparkles" stroke="#4F46E5" size={32} />
          </div>
          <h2 className="text-xl font-bold text-slate-900 mb-2">Generating 8 Dynamic Calibration Questions…</h2>
          <p className="text-slate-500 text-sm max-w-sm mx-auto">
            Groq AI is analyzing the curriculum for <strong className="text-indigo-600">{domain}</strong> to create a personalized starting assessment.
          </p>
        </div>
      </div>
    );
  }

  if (building) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-slate-50 px-4">
        <div className="text-center fade-in">
          <div className="relative mx-auto mb-8" style={{ width: 120, height: 120 }}>
            <svg width="120" height="120" style={{ transform: "rotate(-90deg)" }}>
              <circle cx="60" cy="60" r="52" fill="none" stroke="#E2E8F0" strokeWidth="8" />
              <circle cx="60" cy="60" r="52" fill="none" stroke="#6366F1" strokeWidth="8"
                strokeDasharray={2 * Math.PI * 52} strokeDashoffset={2 * Math.PI * 52 * 0.25}
                strokeLinecap="round" className="pulse-ring" />
            </svg>
            <div className="absolute inset-0 flex items-center justify-center">
              <Icon name="brain" stroke="#4F46E5" size={40} />
            </div>
          </div>
          <h2 className="text-xl font-bold text-slate-900 mb-2">Building your personalized knowledge graph…</h2>
          <p className="text-slate-500 text-sm">Mapping your strengths, flagging prerequisite gaps, and preparing your adaptive course player.</p>
        </div>
      </div>
    );
  }

  const qNum = currentIdx + 1;

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col px-4 py-10">
      <div className="max-w-lg mx-auto w-full">
        {/* Header */}
        <div className="text-center mb-8">
          <Logo size={32} />
          <h1 className="text-xl font-bold text-slate-900 mt-5 mb-2 tracking-tight leading-snug">
            Let's find your starting point
          </h1>
          <p className="text-slate-500 text-sm">8 quick diagnostic questions calibrated for <strong>{domain}</strong>.</p>
        </div>

        {/* Progress */}
        <div className="flex items-center gap-4 mb-6">
          <ProgressRing value={(qNum / total) * 100} size={56} stroke={6} color="#6366F1" label={`${qNum}/${total}`} />
          <div className="flex-1">
            <div className="text-xs font-semibold text-slate-600 mb-1.5">Question {qNum} of {total}</div>
            <div className="w-full bg-slate-100 rounded-full h-1.5">
              <div className="h-1.5 rounded-full bg-indigo-500 transition-all duration-300" style={{ width: `${(qNum / total) * 100}%` }} />
            </div>
            <div className="flex items-center gap-1.5 mt-1.5">
              <div className="w-2 h-2 rounded-full bg-indigo-400 pulse-ring" />
              <span className="text-[11px] text-indigo-600 font-medium">Diagnosing: {activeQuestion.concept}</span>
            </div>
          </div>
        </div>

        {/* Question card */}
        <div className="bg-white rounded-[16px] border border-slate-200 p-6 mb-4 fade-in" style={{ boxShadow: "0 1px 3px rgba(15,23,42,0.06)" }}>
          <p className="text-base font-semibold text-slate-900 mb-5 leading-relaxed">
            {activeQuestion.question}
          </p>
          <div className="space-y-2.5">
            {activeQuestion.options.map((opt: string, i: number) => (
              <button key={`opt-${currentIdx}-${i}`} onClick={() => setSelectedOption(i)}
                className={`w-full text-left p-3.5 rounded-[10px] border-2 transition-all flex items-center gap-3 text-sm ${selectedOption === i ? "border-indigo-400" : "border-slate-200 hover:border-slate-300"}`}
                style={selectedOption === i ? { background: "#EEF0FF" } : { background: "white" }}>
                <span className={`w-6 h-6 rounded-full border-2 flex-shrink-0 flex items-center justify-center text-xs font-bold transition-all ${selectedOption === i ? "border-indigo-500 bg-indigo-500 text-white" : "border-slate-300 text-slate-400"}`}>
                  {String.fromCharCode(65 + i)}
                </span>
                <span className={selectedOption === i ? "text-indigo-900 font-medium" : "text-slate-700"}>{opt}</span>
              </button>
            ))}
          </div>
          {activeQuestion.hint && (
            <div className="mt-4 flex items-center gap-2 p-3 rounded-[10px] bg-violet-50 border border-violet-100">
              <Icon name="bot" stroke="#7C3AED" size={18} />
              <p className="text-xs text-violet-700 font-medium">Hint: {activeQuestion.hint}</p>
            </div>
          )}
        </div>

        <div className="flex gap-3">
          <button onClick={handleNext} className="text-sm text-slate-400 hover:text-slate-600 px-4 py-2.5">Skip</button>
          <button onClick={handleNext} disabled={selectedOption === null}
            className="flex-1 py-2.5 rounded-[10px] text-sm font-semibold text-white transition-all disabled:opacity-40 flex items-center justify-center gap-2"
            style={{ background: "linear-gradient(135deg,#6366F1,#8B5CF6)" }}>
            {qNum < total ? "Next question" : "Finish calibration"} <Icon name="arrowRight" stroke="white" size={16} />
          </button>
        </div>

        <p className="text-center text-xs text-slate-400 mt-5">
          This isn't graded. It builds your knowledge map so VoxLearn AI knows where to start.
        </p>
      </div>
    </div>
  );
}
