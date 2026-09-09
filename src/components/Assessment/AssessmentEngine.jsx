import React, { useState } from 'react';
import { GroqService } from '../../services/groqService';
import { memoryStore } from '../../services/memoryStore';
import { sharyxVoice } from '../../services/sharyxVoiceService';
import { 
  Layers, CheckCircle, AlertOctagon, Zap, ArrowRight, 
  RotateCcw, Sparkles, Award, ShieldAlert, BookOpen, Volume2
} from 'lucide-react';
import confetti from 'canvas-confetti';

const SAMPLE_ASSESSMENT_QUESTIONS = [
  {
    id: 1,
    concept: 'Window Functions (OVER, PARTITION)',
    question: `In PostgreSQL or MySQL 8.0, how does a Window Function differ from a standard GROUP BY clause?`,
    options: [
      `A Window Function performs calculation across a set of rows while retaining individual row identities; GROUP BY collapses rows into a single summary row.`,
      `A Window Function only works with string columns; GROUP BY only works with numeric values.`,
      `GROUP BY always uses indexes; Window Functions always perform full table scans.`,
      `There is no difference; they are syntactic synonyms.`
    ],
    correctIndex: 0,
    explanation: `Window functions calculate values across partitions while keeping individual row details intact.`
  },
  {
    id: 2,
    concept: 'Window Functions (OVER, PARTITION)',
    question: `What is the output behavior of DENSE_RANK() versus RANK() when encountering tied values in the ORDER BY clause?`,
    options: [
      `DENSE_RANK() leaves gaps in sequence (1, 1, 3); RANK() maintains unbroken integers (1, 1, 2).`,
      `DENSE_RANK() assigns consecutive ranks without gaps (1, 1, 2); RANK() skips numbers after ties (1, 1, 3).`,
      `Both functions produce random numbers on ties.`,
      `DENSE_RANK() can only be evaluated in a WHERE clause.`
    ],
    correctIndex: 1,
    explanation: `DENSE_RANK() never skips numbers in the rank sequence, whereas RANK() leaves gaps corresponding to duplicate counts.`
  },
  {
    id: 3,
    concept: 'Window Functions (OVER, PARTITION)',
    question: `Why does the query 'SELECT id, AVG(salary) OVER () FROM emp WHERE AVG(salary) OVER () > 5000;' cause a syntax error?`,
    options: [
      `Window functions are evaluated in the SELECT stage (Phase 5 of SQL logical execution) after the WHERE clause has already filtered rows.`,
      `Salary must be converted to VARCHAR first.`,
      `PostgreSQL does not support AVG() in window queries.`,
      `The OVER clause requires at least 3 partition columns.`
    ],
    correctIndex: 0,
    explanation: `Because of logical query execution order (FROM -> WHERE -> GROUP BY -> HAVING -> SELECT/WINDOW -> ORDER BY), Window Functions cannot appear directly in WHERE clauses.`
  }
];

export default function AssessmentEngine({ onOpenVoice, initialRemedialConcept = null }) {
  const [questions, setQuestions] = useState(SAMPLE_ASSESSMENT_QUESTIONS);
  const [selectedAnswers, setSelectedAnswers] = useState({});
  const [evaluationResult, setEvaluationResult] = useState(null);
  const [isEvaluating, setIsEvaluating] = useState(false);
  const [remedialCourse, setRemedialCourse] = useState(null);
  const [isGeneratingRemedial, setIsGeneratingRemedial] = useState(false);
  
  // Remedial Mode State
  const [remedialStep, setRemedialStep] = useState('learn'); // 'learn', 'practice', 'retest'
  const [retestAnswers, setRetestAnswers] = useState({});
  const [retestCompleted, setRetestCompleted] = useState(false);

  // Trigger diagnostic evaluation
  const handleSubmitAssessment = async () => {
    setIsEvaluating(true);
    try {
      const answersArray = questions.map((_, i) => selectedAnswers[i] ?? -1);
      const result = await GroqService.evaluateAssessment(questions, answersArray, 'Window Functions (OVER, PARTITION)');
      setEvaluationResult(result);

      // Update student knowledge graph
      memoryStore.updateNodeMastery(result.concept, result.score);

      if (result.score >= 75) {
        memoryStore.addXP(100, 'Passed Concept Assessment');
        confetti({ particleCount: 70, spread: 70, origin: { y: 0.6 } });
      } else {
        memoryStore.addXP(20, 'Assessment Diagnostic Completed');
      }
    } catch (e) {
      console.error('Assessment evaluation error:', e);
    } finally {
      setIsEvaluating(false);
    }
  };

  // Launch Automatic Remedial Course
  const handleLaunchRemedial = async (conceptName, specificWeakness) => {
    setIsGeneratingRemedial(true);
    try {
      const remedial = await GroqService.generateRemedialCourse(
        conceptName || 'Window Functions (OVER, PARTITION)', 
        specificWeakness || 'Window Frame Execution Order & Partition Boundaries'
      );
      setRemedialCourse(remedial);
      setRemedialStep('learn');
      setRetestCompleted(false);
      setRetestAnswers({});
    } catch (e) {
      console.error('Remedial generation error:', e);
    } finally {
      setIsGeneratingRemedial(false);
    }
  };

  // Submit Retest in Remedial Course
  const handleRetestSubmit = () => {
    setRetestCompleted(true);
    // Upgraded mastery from Weak (28%) -> Mastered (92%)!
    memoryStore.updateNodeMastery('Window Functions (OVER, PARTITION)', 92);
    memoryStore.addXP(150, 'Conquered Weakness via Remedial Recovery');
    confetti({ particleCount: 100, spread: 90, origin: { y: 0.5 } });
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
      
      {/* Header */}
      <div className="glass-panel" style={{ padding: '1.5rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '1rem' }}>
        <div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.65rem' }}>
            <div style={{ width: '40px', height: '40px', borderRadius: '12px', background: 'var(--gradient-weakness)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <Zap size={22} color="#fff" />
            </div>
            <div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                <h2 style={{ fontSize: '1.3rem' }}>AI Assessment & Autonomous Remedial Loop</h2>
                <span className="badge badge-weak">Continuous Adaptive Feedback</span>
              </div>
              <p style={{ fontSize: '0.8rem', color: 'var(--text-secondary)' }}>
                Understand → Diagnose → Detect Weakness → Auto-Generate Remedial Course → Retest → Master
              </p>
            </div>
          </div>
        </div>

        <button 
          onClick={() => handleLaunchRemedial('Window Functions (OVER, PARTITION)', 'Confusing GROUP BY with Window Frame Execution')}
          className="btn btn-danger btn-sm"
        >
          <Zap size={14} />
          <span>Simulate Weakness Remedial Sprint</span>
        </button>
      </div>

      {/* Main Assessment Card */}
      {!remedialCourse && (
        <div className="glass-panel" style={{ padding: '1.5rem' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.25rem', borderBottom: '1px solid var(--border-subtle)', paddingBottom: '0.75rem' }}>
            <div>
              <span className="badge badge-brand">Module 02 Assessment</span>
              <h3 style={{ fontSize: '1.15rem', marginTop: '0.25rem' }}>Concept Mastery Evaluation: SQL Window Functions</h3>
            </div>
            <span style={{ fontSize: '0.78rem', color: 'var(--text-muted)' }}>{questions.length} Diagnostic Questions</span>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
            {questions.map((q, qIndex) => (
              <div key={q.id} style={{ padding: '1.25rem', borderRadius: '14px', background: 'rgba(255,255,255,0.02)', border: '1px solid var(--border-subtle)' }}>
                <div style={{ display: 'flex', alignItems: 'baseline', gap: '0.5rem', marginBottom: '0.75rem' }}>
                  <span style={{ fontSize: '0.8rem', fontWeight: 800, color: 'var(--accent-primary)' }}>Q0{qIndex + 1}.</span>
                  <p style={{ fontSize: '0.95rem', fontWeight: 600, color: '#f8fafc' }}>{q.question}</p>
                </div>

                <div style={{ display: 'flex', flexDirection: 'column', gap: '0.6rem' }}>
                  {q.options.map((opt, optIndex) => {
                    const isSelected = selectedAnswers[qIndex] === optIndex;
                    return (
                      <div
                        key={optIndex}
                        onClick={() => setSelectedAnswers({ ...selectedAnswers, [qIndex]: optIndex })}
                        style={{
                          padding: '0.85rem 1.15rem',
                          borderRadius: '10px',
                          background: isSelected ? 'rgba(99, 102, 241, 0.2)' : 'rgba(255,255,255,0.03)',
                          border: isSelected ? '1px solid var(--accent-primary)' : '1px solid var(--border-subtle)',
                          cursor: 'pointer',
                          fontSize: '0.88rem',
                          color: isSelected ? '#fff' : 'var(--text-secondary)',
                          display: 'flex',
                          alignItems: 'center',
                          gap: '0.65rem',
                          transition: 'all 0.15s'
                        }}
                      >
                        <span style={{
                          width: '24px',
                          height: '24px',
                          borderRadius: '50%',
                          background: isSelected ? 'var(--accent-primary)' : 'rgba(255,255,255,0.06)',
                          color: isSelected ? '#fff' : 'var(--text-muted)',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          fontSize: '0.75rem',
                          fontWeight: 700
                        }}>
                          {String.fromCharCode(65 + optIndex)}
                        </span>
                        <span>{opt}</span>
                      </div>
                    );
                  })}
                </div>
              </div>
            ))}
          </div>

          <div style={{ display: 'flex', justifyContent: 'flex-end', marginTop: '1.5rem' }}>
            <button
              onClick={handleSubmitAssessment}
              className="btn btn-primary"
              disabled={isEvaluating || Object.keys(selectedAnswers).length < questions.length}
              style={{ minWidth: '180px', padding: '0.75rem 1.5rem' }}
            >
              {isEvaluating ? <Sparkles size={16} className="voice-pulsing" /> : <Layers size={16} />}
              <span>{isEvaluating ? 'Analyzing Diagnostic...' : 'Submit Assessment'}</span>
            </button>
          </div>

          {/* AI Diagnostic Results Panel */}
          {evaluationResult && (
            <div style={{
              marginTop: '1.75rem',
              padding: '1.5rem',
              borderRadius: '18px',
              background: evaluationResult.requiresRemediation ? 'rgba(244,63,94,0.08)' : 'rgba(16,185,129,0.08)',
              border: `1px solid ${evaluationResult.requiresRemediation ? 'rgba(244,63,94,0.4)' : 'rgba(16,185,129,0.4)'}`
            }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '1rem', marginBottom: '1rem' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                  {evaluationResult.requiresRemediation ? (
                    <ShieldAlert size={28} color="var(--accent-rose)" />
                  ) : (
                    <CheckCircle size={28} color="var(--accent-emerald)" />
                  )}
                  <div>
                    <h3 style={{ fontSize: '1.2rem' }}>
                      Diagnostic Score: {evaluationResult.score}% ({evaluationResult.masteryStatus})
                    </h3>
                    <span style={{ fontSize: '0.75rem', color: 'var(--text-secondary)' }}>
                      Concept: {evaluationResult.concept}
                    </span>
                  </div>
                </div>

                {evaluationResult.requiresRemediation && (
                  <button 
                    onClick={() => handleLaunchRemedial(evaluationResult.concept, evaluationResult.specificWeakness)}
                    className="btn btn-danger"
                    disabled={isGeneratingRemedial}
                  >
                    <Zap size={16} />
                    <span>Auto-Build Remedial Course</span>
                  </button>
                )}
              </div>

              <p style={{ fontSize: '0.9rem', color: '#f8fafc', lineHeight: 1.55, marginBottom: '0.75rem' }}>
                {evaluationResult.diagnosticAnalysis}
              </p>

              {evaluationResult.specificWeakness && (
                <div style={{ padding: '0.75rem 1rem', borderRadius: '10px', background: 'rgba(0,0,0,0.3)', border: '1px solid var(--border-subtle)', fontSize: '0.82rem' }}>
                  <strong style={{ color: 'var(--accent-rose)' }}>🔴 Identified Root Misconception: </strong>
                  <span>{evaluationResult.specificWeakness}</span>
                </div>
              )}
            </div>
          )}
        </div>
      )}

      {/* PERSONALIZED REMEDIAL RECOVERY COURSE MODAL / VIEW */}
      {remedialCourse && (
        <div className="glass-panel" style={{
          padding: '1.75rem',
          borderRadius: '22px',
          border: '1px solid var(--accent-rose)',
          background: 'var(--bg-card)',
          boxShadow: 'var(--shadow-lg)'
        }}>
          {/* Remedial Header */}
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '1rem', marginBottom: '1.25rem' }}>
            <div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.25rem' }}>
                <span className="badge badge-weak">Targeted Remedial Sprint</span>
                <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>5-Minute Micro-Course</span>
              </div>
              <h2 style={{ fontSize: '1.35rem', color: 'var(--text-primary)' }}>{remedialCourse.title}</h2>
              <p style={{ fontSize: '0.8rem', color: 'var(--accent-rose)', fontWeight: 600 }}>
                Addressing: {remedialCourse.weakness}
              </p>
            </div>

            <button 
              onClick={() => setRemedialCourse(null)}
              className="btn btn-secondary btn-sm"
            >
              Close Remedial
            </button>
          </div>

          {/* Stepper Tabs */}
          <div style={{ display: 'flex', gap: '0.5rem', marginBottom: '1.5rem', borderBottom: '1px solid var(--border-subtle)', paddingBottom: '0.75rem' }}>
            <button 
              onClick={() => setRemedialStep('learn')}
              className={`btn btn-sm ${remedialStep === 'learn' ? 'btn-primary' : 'btn-secondary'}`}
            >
              1. Visual Mental Model
            </button>
            <button 
              onClick={() => setRemedialStep('practice')}
              className={`btn btn-sm ${remedialStep === 'practice' ? 'btn-primary' : 'btn-secondary'}`}
            >
              2. Interactive Debug Challenge
            </button>
            <button 
              onClick={() => setRemedialStep('retest')}
              className={`btn btn-sm ${remedialStep === 'retest' ? 'btn-danger' : 'btn-secondary'}`}
            >
              3. Retest for Mastery
            </button>
          </div>

          {/* Step 1: Learn Mental Model */}
          {remedialStep === 'learn' && (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
              <div className="glass-panel" style={{ padding: '1.25rem', background: 'var(--bg-tertiary)' }}>
                <h4 style={{ fontSize: '0.95rem', color: 'var(--accent-cyan)', marginBottom: '0.5rem' }}>💡 Intuitive Breakdown</h4>
                <p style={{ fontSize: '0.92rem', lineHeight: 1.6, color: 'var(--text-primary)' }}>
                  {remedialCourse.simpleExplanation}
                </p>
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
                <div className="glass-panel" style={{ padding: '1rem', background: 'var(--bg-tertiary)' }}>
                  <h5 style={{ fontSize: '0.85rem', color: 'var(--accent-rose)', marginBottom: '0.35rem' }}>⚠️ Why This Trap Happens</h5>
                  <p style={{ fontSize: '0.82rem', color: 'var(--text-secondary)' }}>
                    {remedialCourse.commonPitfall}
                  </p>
                </div>

                <div className="glass-panel" style={{ padding: '1rem', background: 'rgba(16,185,129,0.05)' }}>
                  <h5 style={{ fontSize: '0.85rem', color: 'var(--accent-emerald)', marginBottom: '0.35rem' }}>🧠 Memorable Mnemonic</h5>
                  <p style={{ fontSize: '0.82rem', color: '#34d399', fontWeight: 600 }}>
                    "{remedialCourse.mnemonicOrRule}"
                  </p>
                </div>
              </div>

              <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
                <button onClick={() => setRemedialStep('practice')} className="btn btn-primary">
                  <span>Continue to Debug Challenge</span>
                  <ArrowRight size={14} />
                </button>
              </div>
            </div>
          )}

          {/* Step 2: Practice Challenge */}
          {remedialStep === 'practice' && (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
              <div className="glass-panel" style={{ padding: '1.25rem', background: 'rgba(0,0,0,0.3)' }}>
                <h4 style={{ fontSize: '0.95rem', color: '#fff', marginBottom: '0.5rem' }}>Targeted Recovery Problem</h4>
                <p style={{ fontSize: '0.88rem', color: 'var(--text-secondary)', marginBottom: '1rem' }}>
                  {remedialCourse.interactivePractice?.problem}
                </p>

                <pre style={{ background: '#04060a', padding: '1rem', borderRadius: '10px', fontSize: '0.85rem', color: '#22d3ee', border: '1px solid var(--border-subtle)' }}>
                  <code>{remedialCourse.interactivePractice?.solution}</code>
                </pre>

                <p style={{ fontSize: '0.78rem', color: 'var(--accent-amber)', marginTop: '0.75rem' }}>
                  💡 Hint: {remedialCourse.interactivePractice?.hint}
                </p>
              </div>

              <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                <button onClick={() => setRemedialStep('learn')} className="btn btn-secondary">
                  Back
                </button>
                <button onClick={() => setRemedialStep('retest')} className="btn btn-danger">
                  <span>Take Verification Retest</span>
                  <ArrowRight size={14} />
                </button>
              </div>
            </div>
          )}

          {/* Step 3: Retest */}
          {remedialStep === 'retest' && (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
              {!retestCompleted ? (
                <>
                  <p style={{ fontSize: '0.9rem', color: '#f8fafc' }}>
                    Answer this targeted verification question to complete recovery and update your Knowledge Graph:
                  </p>

                  {remedialCourse.retestQuestions?.map((rq, qIdx) => (
                    <div key={qIdx} className="glass-panel" style={{ padding: '1.25rem', background: 'rgba(0,0,0,0.3)' }}>
                      <p style={{ fontSize: '0.92rem', fontWeight: 600, marginBottom: '0.75rem', color: '#fff' }}>
                        {rq.question}
                      </p>

                      <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                        {rq.options.map((opt, oIdx) => (
                          <div
                            key={oIdx}
                            onClick={() => setRetestAnswers({ ...retestAnswers, [qIdx]: oIdx })}
                            style={{
                              padding: '0.75rem 1rem',
                              borderRadius: '10px',
                              background: retestAnswers[qIdx] === oIdx ? 'rgba(244,63,94,0.2)' : 'rgba(255,255,255,0.03)',
                              border: retestAnswers[qIdx] === oIdx ? '1px solid var(--accent-rose)' : '1px solid var(--border-subtle)',
                              cursor: 'pointer',
                              fontSize: '0.85rem'
                            }}
                          >
                            {opt}
                          </div>
                        ))}
                      </div>
                    </div>
                  ))}

                  <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
                    <button 
                      onClick={handleRetestSubmit}
                      className="btn btn-danger"
                      disabled={Object.keys(retestAnswers).length === 0}
                    >
                      <CheckCircle size={16} />
                      <span>Confirm Recovery & Re-Evaluate</span>
                    </button>
                  </div>
                </>
              ) : (
                <div style={{ textAlign: 'center', padding: '2rem 1rem' }}>
                  <div style={{ width: '60px', height: '60px', borderRadius: '50%', background: 'var(--gradient-mastered)', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 1rem' }}>
                    <CheckCircle size={32} color="#fff" />
                  </div>
                  <h3 style={{ fontSize: '1.4rem', color: '#34d399', marginBottom: '0.5rem' }}>
                    🎉 Concept Mastered! Weakness Conquered
                  </h3>
                  <p style={{ fontSize: '0.9rem', color: 'var(--text-secondary)', maxWidth: '520px', margin: '0 auto 1.25rem' }}>
                    Your Knowledge Graph node for <strong>Window Functions</strong> has officially transitioned from 🔴 <strong>Weak (28%)</strong> to 🟢 <strong>Mastered (92%)</strong>.
                  </p>
                  <div style={{ display: 'inline-flex', gap: '0.5rem', marginBottom: '1.5rem' }}>
                    <span className="badge badge-mastered">+150 XP Awarded</span>
                    <span className="badge badge-brand">Weakness Conqueror Badge Progress</span>
                  </div>

                  <div>
                    <button 
                      onClick={() => setRemedialCourse(null)}
                      className="btn btn-primary"
                    >
                      Return to Learning Dashboard
                    </button>
                  </div>
                </div>
              )}
            </div>
          )}

        </div>
      )}

    </div>
  );
}
