"use client";

import { useRef, useState, useCallback, useEffect } from "react";
import { IdeaRequest, ProjectPlan, GenerateResponse, GenerateError, SavedPlan } from "@/lib/types";
import { savePlan, generateId } from "@/lib/storage";
import { DEMO_PLAN, DEMO_META } from "@/lib/demo";

import Navbar from "./components/Navbar";
import LandingHero from "./components/LandingHero";
import IdeaForm from "./components/IdeaForm";
import PlanSkeleton from "./components/PlanSkeleton";
import ResultsDashboard from "./components/ResultsDashboard";
import ErrorBanner from "./components/ErrorBanner";
import SavedPlans from "./components/SavedPlans";

// ─── App state machine ────────────────────────────────────────────────────────
type AppState =
  | { status: "idle" }
  | { status: "loading"; request: IdeaRequest }
  | {
      status: "success";
      request: IdeaRequest;
      plan: ProjectPlan;
      modelUsed: string;
      generatedAt: string;
      savedId: string | null;
      isDemo: boolean;
    }
  | { status: "error"; request: IdeaRequest; error: string; details?: string };

const DEMO_REQUEST: IdeaRequest = {
  projectName: "StudyAI",
  description: "AI-powered adaptive study companion",
  category: "ai-ml",
  skillLevel: "intermediate",
  duration: "24h",
  technologies: "Next.js, Gemma AI, Tailwind CSS",
};

export default function Home() {
  const formRef = useRef<HTMLDivElement>(null);
  const resultsRef = useRef<HTMLDivElement>(null);

  const [appState, setAppState] = useState<AppState>({ status: "idle" });
  const [sampleIdea, setSampleIdea] = useState<IdeaRequest | undefined>(undefined);
  const [savedRefresh, setSavedRefresh] = useState(0);

  // ─── Scroll helpers ─────────────────────────────────────────────────────────
  const scrollToForm = useCallback(() => {
    setTimeout(() => {
      formRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
    }, 80);
  }, []);

  const scrollToResults = useCallback(() => {
    setTimeout(() => {
      resultsRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
    }, 80);
  }, []);

  // When a sample idea is selected, scroll to form
  useEffect(() => {
    if (sampleIdea) scrollToForm();
  }, [sampleIdea, scrollToForm]);

  // ─── Handlers ───────────────────────────────────────────────────────────────
  const handleSelectSample = useCallback((idea: IdeaRequest) => {
    setSampleIdea(idea);
    setAppState({ status: "idle" });
  }, []);

  /** Load the demo plan instantly without hitting the API */
  const handleDemoMode = useCallback(() => {
    setAppState({
      status: "success",
      request: DEMO_REQUEST,
      plan: DEMO_PLAN,
      modelUsed: DEMO_META.modelUsed,
      generatedAt: DEMO_META.generatedAt,
      savedId: null,
      isDemo: true,
    });
    scrollToResults();
  }, [scrollToResults]);

  const handleSubmit = useCallback(
    async (request: IdeaRequest) => {
      setAppState({ status: "loading", request });

      try {
        const res = await fetch("/api/generate", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(request),
        });

        const data = (await res.json()) as GenerateResponse | GenerateError;

        if (!res.ok || "error" in data) {
          const errData = data as GenerateError;
          setAppState({
            status: "error",
            request,
            error: errData.error || "Generation failed",
            details: errData.details,
          });
          return;
        }

        const ok = data as GenerateResponse;
        setAppState({
          status: "success",
          request,
          plan: ok.plan,
          modelUsed: ok.modelUsed,
          generatedAt: ok.generatedAt,
          savedId: null,
          isDemo: false,
        });
        scrollToResults();
      } catch (err) {
        const msg = err instanceof Error ? err.message : "Network error";
        setAppState({
          status: "error",
          request,
          error: "Connection error",
          details: msg.includes("fetch")
            ? "Could not reach the server. Check your connection."
            : msg,
        });
      }
    },
    [scrollToResults]
  );

  const handleRetry = useCallback(() => {
    if (appState.status === "error") handleSubmit(appState.request);
  }, [appState, handleSubmit]);

  const handleSave = useCallback(() => {
    if (appState.status !== "success") return;
    const id = generateId();
    const saved: SavedPlan = {
      id,
      projectName: appState.plan.projectTitle,
      plan: appState.plan,
      generatedAt: appState.generatedAt,
      modelUsed: appState.modelUsed,
      request: appState.request,
    };
    savePlan(saved);
    setAppState((prev) =>
      prev.status === "success" ? { ...prev, savedId: id } : prev
    );
    setSavedRefresh((n) => n + 1);
  }, [appState]);

  const handleLoadSaved = useCallback(
    (saved: SavedPlan) => {
      setAppState({
        status: "success",
        request: saved.request,
        plan: saved.plan,
        modelUsed: saved.modelUsed,
        generatedAt: saved.generatedAt,
        savedId: saved.id,
        isDemo: false,
      });
      scrollToResults();
    },
    [scrollToResults]
  );

  const handleReset = useCallback(() => {
    setAppState({ status: "idle" });
    setSampleIdea(undefined);
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, []);

  // ─── Derived view flags ──────────────────────────────────────────────────────
  const isLoading = appState.status === "loading";
  const isSuccess = appState.status === "success";
  const isError = appState.status === "error";
  const showHero = !isSuccess && !isLoading;
  const showForm = !isSuccess && !isLoading;

  return (
    <div className="relative min-h-screen" style={{ background: "var(--bg-primary)" }}>
      {/* Animated background blobs */}
      <div className="bg-scene" aria-hidden="true">
        <div className="bg-blob bg-blob-1" />
        <div className="bg-blob bg-blob-2" />
        <div className="bg-blob bg-blob-3" />
      </div>

      {/* Fixed nav */}
      <Navbar />

      {/* Content layer — above blobs */}
      <main className="relative z-10 pt-14">
        {/* ── Hero ─────────────────────────────────────────────────────── */}
        {showHero && (
          <LandingHero
            onSelectSample={handleSelectSample}
            onScrollToForm={scrollToForm}
            onDemoMode={handleDemoMode}
          />
        )}

        {/* ── Saved plans ──────────────────────────────────────────────── */}
        {showHero && (
          <SavedPlans onLoad={handleLoadSaved} refreshTrigger={savedRefresh} />
        )}

        {/* ── Error banner ─────────────────────────────────────────────── */}
        {isError && appState.status === "error" && (
          <ErrorBanner
            error={appState.error}
            details={appState.details}
            onRetry={handleRetry}
            onDismiss={() => setAppState({ status: "idle" })}
          />
        )}

        {/* ── Idea form ─────────────────────────────────────────────────── */}
        {showForm && (
          <IdeaForm
            ref={formRef}
            /* key forces full remount when sample changes — correct approach */
            key={sampleIdea ? JSON.stringify(sampleIdea) : "__empty__"}
            defaultValues={sampleIdea}
            onSubmit={handleSubmit}
            isLoading={isLoading}
          />
        )}

        {/* ── Loading skeleton ──────────────────────────────────────────── */}
        {isLoading && (
          <div ref={resultsRef}>
            <PlanSkeleton />
          </div>
        )}

        {/* ── Results dashboard ─────────────────────────────────────────── */}
        {isSuccess && appState.status === "success" && (
          <div ref={resultsRef}>
            <ResultsDashboard
              plan={appState.plan}
              modelUsed={appState.modelUsed}
              generatedAt={appState.generatedAt}
              request={appState.request}
              onSave={handleSave}
              onReset={handleReset}
              isSaved={appState.savedId !== null}
              isDemo={appState.isDemo}
            />
          </div>
        )}
      </main>

      {/* Footer */}
      <footer
        className="relative z-10 text-center py-8 px-4 mt-8"
        style={{ borderTop: "1px solid rgba(99,102,241,0.1)" }}
      >
        <p className="text-xs" style={{ color: "var(--text-muted)" }}>
          Hackathon Copilot · Powered by Google Gemma AI · Built for builders
        </p>
      </footer>
    </div>
  );
}
