# Hackathon Copilot 🚀

**AI-powered hackathon project planner.** Turn any project idea into a complete software development blueprint in seconds — with architecture diagrams, API specs, database schemas, roadmaps and judging pitches.

Powered by **Google Gemma AI** via the Gemini API.

---

## Features

- 🧠 **AI Blueprint Generation** — Generates full project plans using Gemma models
- 📐 **Architecture Diagrams** — Mermaid-powered system design visualizations
- 🗺️ **Time-boxed Roadmaps** — Calibrated to your exact hackathon duration
- 🔌 **API Design** — Complete endpoint specs with request/response examples
- 🗄️ **Database Schemas** — Tables, fields, types and relationships
- 💾 **Save & Restore** — Persist plans in localStorage
- 📋 **Copy to Clipboard** — One-click copy for every section
- 🎨 **Dark Premium UI** — Dark navy, glass morphism, responsive design

---

## Quick Start

### 1. Prerequisites

- Node.js 18+
- A [Google AI Studio](https://aistudio.google.com/apikey) API key with Gemma access

### 2. Install dependencies

```bash
cd hackathon-copilot
npm install
```

### 3. Configure environment

```bash
cp .env.example .env.local
```

Edit `.env.local`:

```env
GEMINI_API_KEY=your_api_key_here
GEMMA_MODEL=gemma-3-27b-it
```

Available Gemma models (check [Google AI Studio](https://aistudio.google.com) for current availability):
- `gemma-3-27b-it` (recommended)
- `gemma-4-26b-a4b-it`
- `gemma-3-9b-it` (faster, lighter)

### 4. Run locally

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

---

## Project Structure

```
app/
  api/generate/route.ts     # Server-side Gemma API call
  components/
    Navbar.tsx              # Fixed glassmorphism header
    LandingHero.tsx         # Hero section with sample ideas
    IdeaForm.tsx            # Project idea input form
    ResultsDashboard.tsx    # 8-tab results viewer
    MermaidDiagram.tsx      # Architecture diagram renderer
    PlanSkeleton.tsx        # Loading skeleton
    ErrorBanner.tsx         # Error display with retry
    CopyButton.tsx          # Clipboard utility
    SavedPlans.tsx          # localStorage plan manager
  page.tsx                  # Main page orchestrator
  layout.tsx                # Root layout with metadata
  globals.css               # Design system / theme
lib/
  types.ts                  # TypeScript types + Zod schemas
  prompts.ts                # Gemma prompt builder
  storage.ts                # localStorage helpers
```

---

## Environment Variables

| Variable | Required | Description |
|---|---|---|
| `GEMINI_API_KEY` | ✅ | Your Google AI Studio API key |
| `GEMMA_MODEL` | ✅ | Gemma model name (e.g. `gemma-3-27b-it`) |

**Security:** API keys are only read server-side in `/api/generate/route.ts`. They are never exposed to the browser or included in client bundles.

---

## Deployment (Vercel)

1. Push to GitHub
2. Import repo in [Vercel](https://vercel.com)
3. Add environment variables in Vercel project settings:
   - `GEMINI_API_KEY`
   - `GEMMA_MODEL`
4. Deploy

---

## Tech Stack

- **Framework:** Next.js 16 App Router
- **Language:** TypeScript
- **Styling:** Tailwind CSS v4
- **AI:** Google Gemma via `@google/genai` SDK
- **Validation:** Zod v4
- **Diagrams:** Mermaid.js v12
- **Icons:** Lucide React
- **Storage:** Browser localStorage

---

## Development Commands

```bash
npm run dev      # Start dev server (http://localhost:3000)
npm run build    # Production build
npm run start    # Start production server
npm run lint     # ESLint check
```

---

## Known Limitations

- Generation takes 15–45 seconds depending on model and prompt complexity
- Mermaid diagrams require the Gemma model to produce valid syntax; fallback shows raw source
- localStorage is cleared if the user clears browser data; no server-side persistence in this version
- Rate limits depend on your Google AI Studio plan

---

## License

MIT
