import { ProjectPlan } from "./types";

/**
 * A realistic demo plan used for frontend testing without API calls.
 * Shows every section of the ResultsDashboard fully populated.
 */
export const DEMO_PLAN: ProjectPlan = {
  projectTitle: "StudyAI — Adaptive Learning Companion",
  problemStatement:
    "Students struggle to retain information from long study sessions because passive reading is ineffective and generic study tools don't adapt to individual knowledge gaps. This results in poor exam performance despite hours of studying.",
  solutionSummary:
    "StudyAI converts any study material (PDFs, notes, YouTube transcripts) into personalized quizzes, flashcards, and summaries powered by AI. It tracks weak areas and automatically generates targeted practice until mastery is achieved.",
  targetUsers: [
    "University students preparing for exams",
    "Self-learners studying new technical skills",
    "Teachers creating assessment materials",
    "Corporate trainers building onboarding curricula",
  ],
  userStories: [
    {
      role: "university student",
      action: "upload my lecture slides and instantly get a quiz",
      benefit: "I can test my understanding right after class while it's fresh",
    },
    {
      role: "self-learner",
      action: "track which topics I keep getting wrong",
      benefit: "I can focus my limited study time on actual weak areas",
    },
    {
      role: "teacher",
      action: "generate a 20-question quiz from a chapter PDF in seconds",
      benefit: "I save hours of manual question writing every week",
    },
  ],
  mvpFeatures: [
    {
      name: "Material Upload & Parsing",
      description:
        "Upload PDFs or paste text/YouTube URLs. Extract clean text using pdfjs and youtube-transcript.",
      priority: "must-have",
      estimatedHours: 3,
    },
    {
      name: "AI Quiz Generation",
      description:
        "Call Gemma to generate multiple-choice and short-answer questions with explanations from the parsed content.",
      priority: "must-have",
      estimatedHours: 4,
    },
    {
      name: "Flashcard Deck Builder",
      description:
        "Auto-generate front/back flashcard pairs. Users can swipe through them with keyboard shortcuts.",
      priority: "must-have",
      estimatedHours: 3,
    },
    {
      name: "AI Summary Generator",
      description:
        "Generate a concise structured summary with key concepts, definitions, and important facts.",
      priority: "should-have",
      estimatedHours: 2,
    },
    {
      name: "Session Progress Tracker",
      description:
        "Track quiz scores per topic. Show a simple mastery percentage dashboard after each session.",
      priority: "should-have",
      estimatedHours: 3,
    },
    {
      name: "Share & Export",
      description: "Export flashcards as PDF or share a quiz link with teammates.",
      priority: "nice-to-have",
      estimatedHours: 2,
    },
  ],
  futureFeatures: [
    {
      name: "Spaced Repetition Scheduler",
      description:
        "Use a SuperMemo SM-2 algorithm to schedule flashcard reviews at optimal intervals for long-term retention.",
      priority: "nice-to-have",
    },
    {
      name: "Collaborative Study Rooms",
      description: "Real-time multiplayer quiz battles for study groups via WebSockets.",
      priority: "nice-to-have",
    },
    {
      name: "Voice Mode",
      description:
        "Use speech-to-text to answer questions verbally, graded by an LLM for correctness.",
      priority: "nice-to-have",
    },
  ],
  techStack: [
    {
      category: "Frontend",
      technology: "Next.js 14 + React + Tailwind CSS",
      reasoning:
        "App Router enables seamless server/client split. Tailwind keeps the UI fast to build during a hackathon.",
    },
    {
      category: "AI / LLM",
      technology: "Google Gemma 3 (via @google/genai)",
      reasoning:
        "Free tier available, strong instruction-following for structured JSON output, and fast enough for interactive use.",
    },
    {
      category: "Backend / API",
      technology: "Next.js Route Handlers (serverless)",
      reasoning:
        "No separate server needed. Route handlers run server-side so the API key stays safe.",
    },
    {
      category: "Database",
      technology: "Vercel KV (Redis) or localStorage",
      reasoning:
        "For a 24-hour hackathon, localStorage suffices for session data. Vercel KV provides durable storage in minutes if needed.",
    },
    {
      category: "PDF Parsing",
      technology: "pdf-parse (Node.js)",
      reasoning: "Lightweight, runs server-side, extracts clean text from PDFs without external APIs.",
    },
    {
      category: "Deployment",
      technology: "Vercel",
      reasoning:
        "One-command deploy, free tier, automatic HTTPS, and Edge Network — perfect for a demo.",
    },
  ],
  mermaidDiagram: `graph TD
    User["👤 Student / Teacher"]
    Upload["📄 Upload Material\nPDF · Text · YouTube URL"]
    Parse["🔍 Parser Service\npdf-parse · youtube-transcript"]
    Gemma["🤖 Gemma AI\ngemma-3-27b-it"]
    Quiz["✅ Quiz Engine\nMultiple Choice · Short Answer"]
    Flash["🃏 Flashcard Deck\nFront / Back pairs"]
    Summary["📝 Summary View\nKey Concepts · Definitions"]
    Tracker["📊 Progress Tracker\nMastery % · Weak Areas"]
    KV["💾 Vercel KV\nSession · Scores"]

    User --> Upload
    Upload --> Parse
    Parse --> Gemma
    Gemma --> Quiz
    Gemma --> Flash
    Gemma --> Summary
    Quiz --> Tracker
    Flash --> Tracker
    Tracker --> KV
    KV --> User`,
  apiEndpoints: [
    {
      method: "POST",
      path: "/api/parse",
      description: "Parse uploaded material and extract plain text",
      requestExample: '{"type": "pdf", "content": "<base64-encoded-pdf>"}',
      responseExample: '{"text": "..extracted text...", "wordCount": 1240, "estimatedReadTime": "5 min"}',
    },
    {
      method: "POST",
      path: "/api/quiz/generate",
      description: "Generate a quiz from extracted text",
      requestExample: '{"text": "...", "questionCount": 10, "difficulty": "intermediate"}',
      responseExample:
        '{"questions": [{"id": "q1", "question": "What is...", "options": ["A", "B", "C", "D"], "correct": "B", "explanation": "..."}]}',
    },
    {
      method: "POST",
      path: "/api/flashcards/generate",
      description: "Generate flashcard pairs from extracted text",
      requestExample: '{"text": "...", "cardCount": 20}',
      responseExample: '{"cards": [{"id": "c1", "front": "What is photosynthesis?", "back": "The process by which..."}]}',
    },
    {
      method: "POST",
      path: "/api/summary/generate",
      description: "Generate a structured summary from extracted text",
      requestExample: '{"text": "...", "style": "bullet-points"}',
      responseExample:
        '{"title": "Chapter 3 Summary", "keyConcepts": [...], "definitions": [...], "importantFacts": [...]}',
    },
    {
      method: "POST",
      path: "/api/session/score",
      description: "Record quiz session scores for progress tracking",
      requestExample: '{"sessionId": "sess_123", "topic": "Photosynthesis", "score": 8, "total": 10}',
      responseExample: '{"masteryPct": 80, "weakAreas": ["Light reactions"], "nextReviewAt": "2024-01-15"}',
    },
  ],
  databaseTables: [
    {
      tableName: "sessions",
      fields: [
        { name: "id", type: "VARCHAR(26)", constraints: "PRIMARY KEY" },
        { name: "user_id", type: "VARCHAR(26)", constraints: "NOT NULL" },
        { name: "material_text", type: "TEXT", constraints: "NOT NULL" },
        { name: "source_type", type: "ENUM('pdf','text','youtube')", constraints: "NOT NULL" },
        { name: "created_at", type: "TIMESTAMP", constraints: "DEFAULT NOW()" },
      ],
      relationships: "Has many quiz_attempts, flashcard_decks",
    },
    {
      tableName: "quiz_attempts",
      fields: [
        { name: "id", type: "VARCHAR(26)", constraints: "PRIMARY KEY" },
        { name: "session_id", type: "VARCHAR(26)", constraints: "FOREIGN KEY → sessions.id" },
        { name: "score", type: "INT", constraints: "NOT NULL" },
        { name: "total", type: "INT", constraints: "NOT NULL" },
        { name: "topic", type: "VARCHAR(255)", constraints: "" },
        { name: "attempted_at", type: "TIMESTAMP", constraints: "DEFAULT NOW()" },
      ],
      relationships: "Belongs to sessions",
    },
    {
      tableName: "flashcard_decks",
      fields: [
        { name: "id", type: "VARCHAR(26)", constraints: "PRIMARY KEY" },
        { name: "session_id", type: "VARCHAR(26)", constraints: "FOREIGN KEY → sessions.id" },
        { name: "cards", type: "JSONB", constraints: "NOT NULL" },
        { name: "created_at", type: "TIMESTAMP", constraints: "DEFAULT NOW()" },
      ],
      relationships: "Belongs to sessions",
    },
  ],
  roadmap: [
    {
      phase: "⚙️ Setup & Scaffolding",
      timeBox: "Hours 0–2",
      tasks: [
        "Init Next.js project with Tailwind CSS",
        "Configure GEMINI_API_KEY in .env.local",
        "Create base layout, navbar and landing page",
        "Set up API route stubs",
      ],
    },
    {
      phase: "📄 Content Ingestion",
      timeBox: "Hours 2–6",
      tasks: [
        "Build drag-and-drop PDF upload UI",
        "Implement server-side PDF text extraction with pdf-parse",
        "Add YouTube URL paste + transcript extraction",
        "Add plain text paste fallback",
      ],
    },
    {
      phase: "🤖 AI Generation",
      timeBox: "Hours 6–14",
      tasks: [
        "Build /api/quiz/generate calling Gemma with structured prompt",
        "Build /api/flashcards/generate",
        "Build /api/summary/generate",
        "Add Zod validation and error handling for all AI responses",
      ],
    },
    {
      phase: "🎨 UI Polish",
      timeBox: "Hours 14–20",
      tasks: [
        "Build quiz-taking UI with answer selection and feedback",
        "Build flashcard swipe interface",
        "Build progress tracker dashboard",
        "Add loading skeletons and error states",
      ],
    },
    {
      phase: "🚀 Ship & Demo Prep",
      timeBox: "Hours 20–24",
      tasks: [
        "Deploy to Vercel",
        "End-to-end smoke test with real PDF",
        "Prepare 3-minute demo script",
        "Polish landing page and screenshots for submission",
      ],
    },
  ],
  testingChecklist: [
    "Upload a 10-page PDF and verify text extraction is clean",
    "Generate a 10-question quiz and verify all questions have correct answers",
    "Submit wrong answer and verify explanation is shown",
    "Generate 20 flashcards and verify all have non-empty front and back",
    "Paste a YouTube URL and verify transcript is fetched",
    "Verify quiz score is persisted after page refresh",
    "Test on mobile viewport — all touch targets must be ≥ 44px",
    "Verify API key never appears in browser network tab",
  ],
  risks: [
    {
      risk: "Gemma returns malformed JSON breaking the app",
      mitigation: "Wrap all AI calls with try/catch + Zod validation. Show friendly error with retry.",
      severity: "high",
    },
    {
      risk: "PDF parsing fails on scanned/image-based PDFs",
      mitigation:
        "Detect and show a clear error message: 'This PDF appears to be image-based. Please paste the text directly.'",
      severity: "medium",
    },
    {
      risk: "YouTube transcript API rate-limited or unavailable",
      mitigation:
        "Add fallback: show a text paste input with a helpful prompt when transcript fetch fails.",
      severity: "medium",
    },
    {
      risk: "Gemma API quota exhausted during the demo",
      mitigation:
        "Pre-generate 2–3 demo quiz sets and cache them. Have them ready to show judges without live generation.",
      severity: "high",
    },
  ],
  demoScript: `1. Open the app and show the clean landing page (10 seconds)
2. Drag-and-drop a 5-page study PDF onto the upload area (10 seconds)
3. Watch the parsing progress bar complete (5 seconds)
4. Click "Generate Quiz" — point out the loading state while Gemma processes (15 seconds)
5. Walk through 3 quiz questions — get one intentionally wrong to show the explanation feedback
6. Switch to Flashcards tab — swipe through 5 cards
7. Open the Summary tab — show the AI-generated key concepts list
8. Open Progress Tracker — show the mastery percentage and "weak areas" highlight
9. Show mobile responsiveness by resizing the browser
10. End with the sharing link feature`,
  judgingPitch:
    "StudyAI turns passive reading into active learning in seconds. Upload any study material — PDF, notes, or YouTube video — and instantly get personalized quizzes, flashcards, and AI summaries tailored to your knowledge gaps. We built this in 24 hours using Next.js and Google Gemma, and it already cuts study prep time by 60% in our own testing.",
};

export const DEMO_META = {
  modelUsed: "gemma-3-27b-it (demo)",
  generatedAt: new Date().toISOString(),
};
