"use client";

import { useRef, useState, useCallback, useEffect } from "react";
import { IdeaRequest, ProjectPlan, GenerateResponse, GenerateError } from "@/lib/types";
import { savePlan, generateId } from "@/lib/storage";
import { SavedPlan } from "@/lib/types";

import Navbar from "./components/Navbar";
import LandingHero from "./components/LandingHero";
import IdeaForm from "./components/IdeaForm";
import PlanSkeleton from "./components/PlanSkeleton";
import ResultsDashboard from "./components/ResultsDashboard";
import ErrorBanner from "./components/ErrorBanner";
import SavedPlans from "./components/SavedPlans";

type AppState =
  | { status: "idle" }
  | { status: "loading"; request: IdeaRequest }
  | { status: "success"; request: IdeaRequest; plan: ProjectPlan; modelUsed: string; generatedAt: string; savedId: string | null }
  | { status: "error"; request: IdeaRequest; error: string; details?: string };

export default function Home() {
  const formRef = useRef<HTMLDivElement>(null);
  const resultsRef = useRef<HTMLDivElement>(null);
  const [appState, setAppState] = useState<AppState>({ status: "idle" });
  const [sampleIdea, setSampleIdea] = useState<IdeaRequest | undefined>(undefined);
  const [savedRefresh, setSavedRefresh] = useState(0);

  const scrollToForm = useCallback(() => {
    setTimeout(() => {
      formRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
    }, 100);
  }, []);

  const scrollToResults = useCallback(() => {
    setTimeout(() => {
      resultsRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
    }, 100);
  }, []);

  const handleSelectSample = useCallback((idea: IdeaRequest) => {
    setSampleIdea(idea);
    setAppState({ status: "idle" });
  }, []);

  const handleSubmit = useCallback(async (request: IdeaRequest) => {
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

      const successData = data as GenerateResponse;
      setAppState({
        status: "success",
        request,
        plan: successData.plan,
        modelUsed: successData.modelUsed,
        generatedAt: successData.generatedAt,
        savedId: null,
      });
      scrollToResults();
    } catch (err) {
      const message = err instanceof Error ? err.message : "Network error";
      setAppState({
        status: "error",
        request,
        error: "Connection error",
        details: message.includes("fetch") ? "Could not reach the server. Please check your connection." : message,
      });
    }
  }, [scrollToResults]);

  const handleRetry = useCallback(() => {
    if (appState.status === "error") {
      handleSubmit(appState.request);
    }
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
    setAppState((prev) => prev.status === "success" ? { ...prev, savedId: id } : prev);
    setSavedRefresh((n) => n + 1);
  }, [appState]);

  const handleLoadSaved = useCallback((saved: SavedPlan) => {
    setAppState({
      status: "success",
      request: saved.request,
      plan: saved.plan,
      modelUsed: saved.modelUsed,
      generatedAt: saved.generatedAt,
      savedId: saved.id,
    });
    scrollToResults();
  }, [scrollToResults]);

  const handleReset = useCallback(() => {
    setAppState({ status: "idle" });
    setSampleIdea(undefined);
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, []);

  // Update form when sample idea changes
  useEffect(() => {
    if (sampleIdea) scrollToForm();
  }, [sampleIdea, scrollToForm]);

  const showResults = appState.status === "success";
  const showLoading = appState.status === "loading";
  const showError = appState.status === "error";
  const showForm = !showResults && !showLoading;

  return (
    <div className="min-h-screen bg-gradient-radial noise-overlay">
      <Navbar />

      {/* Main content */}
      <main className="pt-14 relative z-10">
        {/* Landing hero — hide when viewing results */}
        {!showResults && !showLoading && (
          <LandingHero
            onSelectSample={handleSelectSample}
            onScrollToForm={scrollToForm}
          />
        )}

        {/* Saved plans */}
        {!showLoading && !showResults && (
          <SavedPlans onLoad={handleLoadSaved} refreshTrigger={savedRefresh} />
        )}

        {showError && appState.status === "error" && (
          <ErrorBanner
            error={appState.error}
            details={appState.details}
            onRetry={handleRetry}
            onDismiss={() => setAppState({ status: "idle" })}
          />
        )}

        {/* Idea form */}
        {showForm && !showLoading && (
          <IdeaForm
            ref={formRef}
            key={sampleIdea ? JSON.stringify(sampleIdea) : "empty"}
            defaultValues={sampleIdea}
            onSubmit={handleSubmit}
            isLoading={false}
          />
        )}

        {/* Loading skeleton */}
        {showLoading && (
          <div ref={resultsRef}>
            <PlanSkeleton />
          </div>
        )}

        {/* Results */}
        {showResults && appState.status === "success" && (
          <div ref={resultsRef}>
            <ResultsDashboard
              plan={appState.plan}
              modelUsed={appState.modelUsed}
              generatedAt={appState.generatedAt}
              request={appState.request}
              onSave={handleSave}
              onReset={handleReset}
              isSaved={appState.savedId !== null}
            />
          </div>
        )}
      </main>

      {/* Footer */}
      <footer className="relative z-10 text-center py-8 px-4"
        style={{ borderTop: "1px solid rgba(99,102,241,0.1)" }}>
        <p className="text-xs text-slate-600">
          Hackathon Copilot · Powered by Google Gemma AI · Built for builders
        </p>
      </footer>
    </div>
  );
}
