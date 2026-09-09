---------------------------------------------------------------------
GLOBAL DESIGN PREAMBLE (paste this before every screen)
---------------------------------------------------------------------
You are designing "LearnOS AI", a personalized, multi-agent AI learning
ecosystem. Use a modern, clean SaaS aesthetic inspired by Linear, Notion,
and Vercel — confident, calm, premium, with generous whitespace.

Brand: LearnOS AI · Tagline: "A unique learning experience for every student."

Color system:
- Primary: Indigo #6366F1 (hover #4F46E5). Brand gradient (hero/featured
  surfaces): 135deg indigo #6366F1 -> violet #8B5CF6. Soft tint #EEF0FF.
- Mastery/Success: Emerald #10B981 · Info/Developing: Sky #0EA5E9 ·
  Streak/Warning: Amber #F59E0B · Risk/Weakness: Rose #F43F5E.
- Neutrals (slate): text #0F172A, secondary #334155, muted #64748B,
  disabled #94A3B8, border #E2E8F0, surface #F1F5F9, app bg #F8FAFC,
  card #FFFFFF.
- Dark mode variant: bg #0B0F1A, card #111726, border #1E293B, text #F8FAFC.

Typography: Inter (or Geist). Headings semibold/bold, tight tracking -0.02em.
Body 14-16px, line-height 1.5. Labels 12-13px medium, uppercase + tracking.
Numerics (XP, scores) tabular figures, semibold.

Layout: 8px grid. Card padding 20-24px. Section gaps 24-32px. Desktop
max-width ~1200px centered. Cards = white, 1px border #E2E8F0, radius 14px,
soft shadow 0 1px 3px rgba(15,23,42,0.06). Buttons radius 10px (primary =
indigo fill, secondary = white + border, ghost = text only). Pills/chips
radius 999px with tinted bg + matching text. Icons: 1.5px stroke line icons
(Lucide style), 20px. Subtle hairline borders, minimal shadows. Show clear
hover/active/focus states.

Reusable components: top app bar (logo left, search center, avatar + XP chip
+ notifications right); persistent left sidebar nav (desktop) / bottom tab
bar (mobile); stat cards; progress rings & bars; concept-mastery badges;
message bubbles (user = indigo right, AI = white left); voice waveform;
syllabus/module accordion; quiz question cards; leaderboard rows; badge
tiles; radar/heatmap knowledge graph.

Example content throughout: Student = Aarav Sharma, 2nd-year B.E. CSE,
Coimbatore. Goal: "Become an AI Engineer." Level 7 · 2,480 XP · 12-day
streak. Active subject: Database Management Systems (Sem IV).

---------------------------------------------------------------------
A. FOUNDATIONS / DESIGN SYSTEM PAGE
---------------------------------------------------------------------
Create a Design System / Foundations cover page for LearnOS AI. Include:
brand logo lockup (indigo gradient mark + "LearnOS AI"); color swatches
with hex labels grouped into Primary, Semantic (mastery/info/streak/risk),
and Neutrals rows; typography specimen (Display, H1, H2, Body, Label,
Numeric); a components gallery (buttons, pills/chips, inputs, tabs, cards,
progress ring, progress bar, message bubble pair, voice waveform, badge
tile, leaderboard row, concept-mastery badge); icon set row (Lucide 1.5px
stroke). Tidy, labeled, on a light slate background. Include a dark-mode
swatch row.

---------------------------------------------------------------------
B1. WELCOME / ONBOARDING & GOAL SETUP (mobile)
---------------------------------------------------------------------
Design a 3-step onboarding flow (mobile, portrait) for LearnOS AI.
Step 1: hero welcome — indigo->violet gradient, "Welcome to LearnOS AI",
subline "A unique learning experience for every student," CTA "Get Started,"
small "I already have an account" link.
Step 2: "What's your goal?" — large prompt with goal suggestion chips
("Become an AI Engineer", "Pass DBMS", "Learn Python", "Crack placements",
custom input), then an input field.
Step 3: "Tell us about you" — current role dropdown (student/working pro),
year/level, interests multi-select, preferred learning style chips (Lesson,
Conversation, Game, Podcast, Video, Interactive, Simulation, Problem-solving).
Progress dots at bottom; primary "Enter LearnOS" button.

---------------------------------------------------------------------
B2. KNOWLEDGE DIAGNOSIS (CALIBRATION)
---------------------------------------------------------------------
Design a Knowledge Diagnosis screen. Header: "Let's find your starting
point — a few quick questions to calibrate." Show a single adaptive quiz
card: question stem, 4 answer options (radio), a live "Diagnosing: SQL
subqueries" pill, progress ring (3/8), and an AI side-note: "Skip if
unsure — I'll adapt." Footer: "This isn't graded. It builds your knowledge
map." Calm, low-pressure. Add a final "Building your knowledge graph..."
loading state with an animated ring.

---------------------------------------------------------------------
B3. STUDENT HOME DASHBOARD (desktop)
---------------------------------------------------------------------
Design the Student Home Dashboard (left sidebar nav + top bar). Greeting
"Good morning, Aarav" with level chip "Lv 7 · 2,480 XP" and "12-day streak".
Main grid: (1) Continue learning card — "Database Management Systems ->
Subqueries," progress bar 60%, "Resume" button, style switcher chips.
(2) Goal roadmap mini — "Become an AI Engineer" with 5 milestone dots
(2 done, 1 current). (3) Knowledge health card — donut 68% overall mastery
+ weak-area alert "Subqueries — 54%". (4) Today's tasks list (assessment
due, project checkpoint, mentor suggestion). (5) Streak/XP card with mini
weekly bar chart. (6) Recommended next cards (course chips). Left sidebar:
Home, AI Tutor, Courses, Knowledge Graph, Assessments, Projects, Peer
Learning, Progress, Settings.

---------------------------------------------------------------------
B4. AI TUTOR — COLLEGE TUTOR (TEXT + VOICE)
---------------------------------------------------------------------
Design the College AI Tutor chat (desktop split: left = subject/course
context panel "DBMS · SQL", right = chat). AI bubble: "Ask me anything
about your course. I pull from your lecture notes, textbooks, PDFs, and
past papers." Show a user question "Explain SQL subqueries with an example"
and an AI answer card with a source-cited explanation, chips of referenced
sources ("Lecture 7.pdf", "Textbook Ch.4", "2022 QP Q3"), and a runnable
SQL code block. Below the answer: action chips "Show as diagram", "Quiz me
on this", "Explain simpler". Input bar with mic button (voice mode),
attach, send. Add a voice conversation state: full-screen overlay with
animated waveform + "Listening..." and suggested follow-up bubbles.
Include a "Socratic mode" toggle (guides via questions instead of direct
answers).

---------------------------------------------------------------------
B5. UNIVERSAL LEARNING AGENT
---------------------------------------------------------------------
Design a Universal Learning Agent chat (similar shell to B4, branded
"beyond your curriculum"). Empty state: "Ask about anything — new concepts,
unfamiliar domains, or what you need to learn for a goal." Sample exchange:
user "What do I need to learn to build a RAG system?" -> AI returns a
learning map card (prerequisite chips: Python, Embeddings, Vector DBs,
LLMs) with "Generate a course from this" CTA.

---------------------------------------------------------------------
B6. AI COURSE GENERATOR
---------------------------------------------------------------------
Design the AI Course Generator flow. Step 1: input card "What do you want
to learn?" with example chips ("Machine Learning Foundations", "System
Design", "DSA for placements"). Step 2: configuration — target level
slider, duration (modules count), depth, goal alignment ("tie to: Become
an AI Engineer"), and a multi-select of learning styles. Step 3: generated
course preview — course hero ("Machine Learning Foundations", 6 weeks,
difficulty) + a syllabus accordion of modules: "1. Math for ML, 2. Python
for Data, 3. Supervised Learning, 4. Model Evaluation, 5. Mini Project"
each expandable to lessons, examples, exercises, a quiz, a project. CTA
"Generate course" with a shimmering "LearnOS is generating..." state.
Footer: "This course is generated for you — it adapts as you learn."

---------------------------------------------------------------------
B7. LEARNING STYLE PICKER
---------------------------------------------------------------------
Design a Learning Style Picker modal/panel for one topic ("Subqueries").
Prompt: "How do you want to learn this?" Grid of style cards with icon +
label + one-line description: Traditional Lesson, Conversational Session,
Educational Game, Podcast, Video Lesson, Interactive Activity, Simulation,
Problem-Solving. Highlight "Recommended for you: Interactive Activity."
Confirm button "Start learning".

---------------------------------------------------------------------
B8. COURSE PLAYER (MODULE VIEW)
---------------------------------------------------------------------
Design a Course Player (desktop: left module outline, center content, right
"AI helper" rail). Center: a lesson on SQL subqueries — heading, rich
explanation, example callout, code block, "Try it" interactive SQL sandbox
card. Top: module progress bar + adaptive difficulty indicator ("Difficulty:
adapted to you"). Right rail: AI helper "Stuck? Ask me", quick actions
"Summarize", "Quiz me", "Explain with analogy". Bottom: "Mark complete &
assess" primary button + style switcher. Breadcrumb: DBMS -> SQL -> Subqueries.

---------------------------------------------------------------------
B9. AI ASSESSMENT (QUIZ / TEST TAKING)
---------------------------------------------------------------------
Design an AI Assessment screen (focused, minimal chrome). Header:
"Assessment · Subqueries · Adaptive" with counter "Q2/5" and a subtle timer.
Question card with options; include a mix of types — multiple choice, a
"write SQL" code answer box, a "match the concepts" drag item. Show adaptive
difficulty badge updating, a "Need a hint (Socratic)" link, and navigation
(Prev / Next / Submit). Progress bar at top. Calm, no-pressure.

---------------------------------------------------------------------
B10. ASSESSMENT RESULTS & CONCEPT ANALYSIS
---------------------------------------------------------------------
Design an Assessment Results screen. Hero score: "3 / 5" with circular
progress and label "Good — let's close the gaps". Below: concept breakdown
list — each concept with a mastery bar and status badge (e.g., "Correlated
subqueries — Mastered" emerald, "EXISTS vs IN — Needs work" rose). An AI
insight card: "You grasp single-row subqueries but confuse correlated
subqueries with joins. Let's fix that." CTAs: "Start remedial course"
(primary), "Review answers", "Re-attempt". Growth-focused.

---------------------------------------------------------------------
B11. STUDENT KNOWLEDGE GRAPH (MASTERY MAP)
---------------------------------------------------------------------
Design an interactive-looking Student Knowledge Graph (desktop). A concept-
map canvas with nodes for SQL topics connected by lines; node fill encodes
mastery (emerald = mastered 92% SQL Basics, 85% JOINs; sky = developing
78% GROUP BY; amber = weak 54% Subqueries; rose = at-risk 38% Window
Functions). Side panel: a selected node's detail (concept, mastery %, last
practiced, related concepts) + a radar/heatmap summary. Legend for mastery
colors. Top filter (by subject/domain). Red weak-area callout with
"Auto-generate remedial course" button. Make it feel like a live, explorable
map.

---------------------------------------------------------------------
B12. WEAKNESS DETECTION & AUTO-GENERATED REMEDIAL COURSE
---------------------------------------------------------------------
Design a Remediation flow triggered from the knowledge graph. Banner:
"LearnOS detected a gap -> Subqueries (54%)". Show an auto-generated
remedial micro-course card: "Subqueries: Focused Remediation", 3 short
modules tailored to the weak concept, each tagged with the exact weakness
it fixes, a quick re-test at the end, and an "Estimated 25 min" chip.
Progress preview and "Start remediation" CTA. Show a post-retest state
updating the knowledge node from amber -> emerald with a "+24% mastery"
celebration frame.

---------------------------------------------------------------------
B13. GAMIFICATION HUB (XP, BADGES, STREAKS, LEADERBOARD)
---------------------------------------------------------------------
Design a Gamification Hub. Top: a Level progress bar "Level 7 -> 8" with
"2,480 / 3,000 XP" and next reward preview. Grid: Streak card (12-day with
calendar heatmap of last 4 weeks), Badges gallery (tiles: "7-Day Streak",
"SQL Starter", "First Course", "Quiz Master", "Concept Crusher", plus
locked greyscale tiles), Daily Challenges checklist (3 quests with XP
rewards), Leaderboard ("AI Builders — Coimbatore" cohort, rank #3, top 5
rows). Topic Mastery progress bars row. Celebratory but clean — Duolingo
energy with Linear restraint.

---------------------------------------------------------------------
B14. AI MENTOR INSIGHTS PANEL
---------------------------------------------------------------------
Design an AI Mentor panel that reads like a weekly coach report. Header
"Your Mentor" with an avatar. Insight cards: "You're strongest in JOINs",
"Subqueries are slowing you down", "Try learning interactively — you retain
28% more", "You focus best 7-9pm", "On track for your AI Engineer goal — 2
milestones left." A natural-language summary paragraph and a recommended
next action CTA. Warm, encouraging microcopy.

---------------------------------------------------------------------
B15. EARLY LEARNING-RISK INTERVENTION (STUDENT VIEW)
---------------------------------------------------------------------
Design a gentle risk-intervention nudge (on dashboard/in-app). Card:
"Let's get back on track — you missed 2 sessions and DBMS quiz scores
dipped." Contributing factors as chips ("2 missed sessions", "quiz 3/5",
"prerequisite gap: JOINs"). Supportive options: "15-min catch-up plan",
"Ask tutor", "Adjust pace". Non-alarming, supportive — nothing punitive.

---------------------------------------------------------------------
B16. PEER LEARNING (GROUPS + COLLABORATIVE CHALLENGES)
---------------------------------------------------------------------
Design a Peer Learning screen. Section 1: My Groups ("AI Builders —
Coimbatore", 6 members, avatars, shared goal). Section 2: Collaborative
Challenge card ("Build a SQL analytics dashboard together", deadline, group
progress, "Join session"). Section 3: Suggested matches — cards of students
with complementary strengths ("Pairs well: Priya — strong in Window
Functions"). Section 4: Group leaderboard. Friendly, social, encouraging.

---------------------------------------------------------------------
B17. GOAL ROADMAP VIEW ("BECOME AN AI ENGINEER")
---------------------------------------------------------------------
Design a Goal Roadmap for the goal "Become an AI Engineer." A vertical/
timeline roadmap of phases with milestone nodes: 1 Foundations (done),
2 Math & Stats (done), 3 ML Core (current), 4 Deep Learning, 5 Projects &
Portfolio, 6 Interview Prep (locked). Each expandable to show: required
skills, generated courses, projects, assessments, interview prep. Header:
goal title, overall % complete ring (42%), ETA. A "Regenerate plan" option.
Show how it connects to the knowledge graph and adaptive loop.

---------------------------------------------------------------------
B18. PROJECTS (PERSONALIZED PROJECT + AI RUBRIC)
---------------------------------------------------------------------
Design a Projects screen. Hero: current personalized project "Build a Movie
Recommender (calibrated to your level)". Card shows: brief, recommended
stack, skills it builds (chips), milestones checklist, a submit/upload zone.
Side: AI Rubric panel with evaluation criteria weight bars (Functionality
30%, Code Quality 20%, etc.) and a current score with per-criterion
feedback once submitted. "Request AI review" button.

---------------------------------------------------------------------
B19. PROFILE / SETTINGS / LEARNING MEMORY
---------------------------------------------------------------------
Design a Profile & Settings screen. Top: avatar, name, level/XP, edit.
Tabs: Learning Profile (goal, role, interests, preferred styles — editable),
Learning Memory ("What LearnOS remembers about you": strengths, weaknesses,
pace, best focus times, mistakes to avoid — toggleable/clearable for
privacy), Notifications, Account, Data & Privacy. Clean settings list.

---------------------------------------------------------------------
C1. TEACHER DASHBOARD
---------------------------------------------------------------------
Design a Teacher Dashboard for an instructor of "CSE-B · DBMS (Sem IV)"
cohort. KPI cards: students 42, class avg mastery 71%, at-risk 6,
assessments due 3. A class mastery heatmap by topic. An at-risk list with
risk reason chips ("missed sessions", "low quiz", "prereq gap"). Recent
activity feed. Assignments table. Tone: empowering early intervention.
Left nav: Classes, Students, Curriculum, Assessments, Analytics,
Interventions.

---------------------------------------------------------------------
C2. STUDENT DETAIL / ANALYTICS (TEACHER VIEW)
---------------------------------------------------------------------
Design a Student Detail page (teacher viewing Aarav). Show his knowledge
graph summary, mastery trend line, assessment history, time spent,
strengths/weaknesses, and an AI-suggested intervention ("Send a 15-min
subqueries catch-up"). "Message student" and "Assign remedial" actions.

---------------------------------------------------------------------
C3. CURRICULUM & RAG SOURCE MANAGEMENT
---------------------------------------------------------------------
Design a Curriculum / Sources screen where a teacher manages RAG knowledge:
a file/library list (lecture notes, textbooks, PDFs, syllabi, past papers)
with upload zone, per-source status (indexed/processing), and coverage tags
("Ch.4 indexed"). A "Course outline" editor and an "auto-generate materials"
helper. Note data freshness / re-index actions.

---------------------------------------------------------------------
C4. ASSESSMENTS MANAGEMENT (TEACHER)
---------------------------------------------------------------------
Design an Assessments management screen: list of auto-generated + teacher
assessments, per-student results table, a rubric editor, and a "Generate
adaptive assessment" button. Show how the system auto-analyzes concept
understanding beyond scores.

---------------------------------------------------------------------
D1. INSTITUTION DASHBOARD (ADMIN)
---------------------------------------------------------------------
Design an Institution Dashboard (admin) overviewing the whole org:
departments, cohorts, total learners, active streaks, org mastery index,
usage/adoption, and outcome metrics (improvement over term). Filters by
department/cohort/term. Executive KPI tiles + trend charts.

---------------------------------------------------------------------
D2. COHORT ANALYTICS & OUTCOMES (ADMIN)
---------------------------------------------------------------------
Design a Cohort Analytics screen: compare cohorts, mastery distributions,
retention/engagement, early-risk trends over time, and equity flags (which
groups are undersupported). Export/report actions.

---------------------------------------------------------------------
D3. CURRICULUM & RESOURCE MANAGEMENT (ORG/ADMIN)
---------------------------------------------------------------------
Design an org-level Curriculum & Resources screen: manage shared knowledge
libraries across departments, AI resource budgets, quality flags, and
integrations with existing LMS/SIS.

---------------------------------------------------------------------
D4. USER & ROLE MANAGEMENT (ADMIN)
---------------------------------------------------------------------
Design a Users & Roles admin screen: students/teachers/admins tables, role
assignment, SSO/invite, bulk import, and license/seat usage.

---------------------------------------------------------------------
D5. INTEGRATIONS, DATA & PRIVACY (ADMIN)
---------------------------------------------------------------------
Design an Integrations & Privacy settings screen: data residency, consent/
privacy controls (student memory controls, FERPA-style toggles), AI model/
region config, and integration cards (LMS, SIS, video, SSO).

---------------------------------------------------------------------
MOBILE VARIANTS
---------------------------------------------------------------------
For each priority screen, also generate a mobile portrait (390x844)
variant: collapse the left sidebar into a bottom tab bar (Home, Tutor,
Courses, Graph, Profile); stack dashboard cards vertically; make chat
full-width; turn the knowledge graph into a pannable/zoomable card; convert
modals to bottom sheets; ensure tap targets >= 44px. Reuse the same
color/type system. Prioritize mobile for: Dashboard (B3), AI Tutor (B4),
Assessment (B9), Knowledge Graph (B11), Gamification (B13), Goal Roadmap
(B17).

---------------------------------------------------------------------
SAMPLE CONTENT / DATA ANCHORS (use everywhere)
---------------------------------------------------------------------
Student: Aarav Sharma · 2nd-year B.E. CSE, Coimbatore · Goal: "Become an
AI Engineer" · Level 7 · 2,480 / 3,000 XP · 12-day streak.
Active subject: Database Management Systems (DBMS), Sem IV.
SQL Knowledge Graph mastery:
- SQL Basics — 92% (Mastered, emerald)
- JOINs — 85% (Strong, emerald)
- GROUP BY — 78% (Developing, sky)
- Subqueries — 54% (Weak, amber) <- current focus
- Window Functions — 38% (At-risk, rose)
Generated course: "Machine Learning Foundations" — 6 weeks — Modules:
1 Math for ML (done), 2 Python for Data (done), 3 Supervised Learning
(current), 4 Model Evaluation, 5 Mini Project.
Learning styles: Traditional Lesson · Conversational · Game · Podcast ·
Video · Interactive · Simulation · Problem-Solving (recommended: Interactive).
Assessment sample: "Subqueries · 5 questions" -> 3/5. Weak: correlated
subqueries / EXISTS vs IN.
Gamification: Badges earned: 7-Day Streak, SQL Starter, First Course, Quiz
Master. Locked: Deep Dive, Window Wizard. Leaderboard rank #3 ("AI
Builders — Coimbatore").
Mentor insight: "You grasp single-row subqueries but confuse correlated
subqueries with joins. Best focus window: 7-9 pm."
Project: "Build a Movie Recommender" — skills: Python, Pandas, Collaborative
Filtering — rubric: Functionality 30, Code Quality 20, ML approach 30,
Docs 20.