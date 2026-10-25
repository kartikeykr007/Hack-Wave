"use client";

import { useState, useCallback, forwardRef, useEffect } from "react";
import { Sparkles, ChevronDown, X } from "lucide-react";
import { IdeaRequest, IdeaRequestSchema } from "@/lib/types";

const CATEGORIES = [
  { value: "web", label: "Web App" },
  { value: "mobile", label: "Mobile App" },
  { value: "ai-ml", label: "AI / ML" },
  { value: "iot", label: "IoT" },
  { value: "blockchain", label: "Blockchain" },
  { value: "gaming", label: "Gaming" },
  { value: "devtools", label: "Dev Tools" },
  { value: "fintech", label: "FinTech" },
  { value: "healthtech", label: "HealthTech" },
  { value: "edtech", label: "EdTech" },
  { value: "other", label: "Other" },
];

const SKILL_LEVELS = [
  { value: "beginner", label: "Beginner", desc: "0–1 yr" },
  { value: "intermediate", label: "Intermediate", desc: "2–4 yrs" },
  { value: "advanced", label: "Advanced", desc: "5+ yrs" },
];

const DURATIONS = [
  { value: "12h", label: "12h" },
  { value: "24h", label: "24h" },
  { value: "36h", label: "36h" },
  { value: "48h", label: "48h" },
  { value: "72h", label: "72h" },
];

interface FormErrors {
  projectName?: string;
  description?: string;
  category?: string;
  skillLevel?: string;
  duration?: string;
  technologies?: string;
}

const DEFAULT_FORM: IdeaRequest = {
  projectName: "",
  description: "",
  category: "web",
  skillLevel: "intermediate",
  duration: "24h",
  technologies: "",
};

interface IdeaFormProps {
  defaultValues?: IdeaRequest;
  onSubmit: (data: IdeaRequest) => void;
  isLoading: boolean;
}

const IdeaForm = forwardRef<HTMLDivElement, IdeaFormProps>(function IdeaForm(
  { defaultValues, onSubmit, isLoading },
  ref
) {
  const [form, setForm] = useState<IdeaRequest>(defaultValues ?? DEFAULT_FORM);
  const [errors, setErrors] = useState<FormErrors>({});

  // Sync when defaultValues changes (sample idea re-mount via key prop is the primary mechanism,
  // but this handles edge cases where the same component instance receives new defaults)
  useEffect(() => {
    if (defaultValues) setForm(defaultValues);
  }, [defaultValues]);

  const setField = useCallback(<K extends keyof IdeaRequest>(key: K, value: IdeaRequest[K]) => {
    setForm((prev) => ({ ...prev, [key]: value }));
    setErrors((prev) => ({ ...prev, [key]: undefined }));
  }, []);

  const clearField = useCallback((key: keyof IdeaRequest) => {
    setForm((prev) => ({ ...prev, [key]: "" }));
    setErrors((prev) => ({ ...prev, [key]: undefined }));
  }, []);

  const handleSubmit = useCallback(
    (e: React.FormEvent) => {
      e.preventDefault();
      const result = IdeaRequestSchema.safeParse(form);
      if (!result.success) {
        const errs: FormErrors = {};
        for (const issue of result.error.issues) {
          const f = issue.path[0] as keyof FormErrors;
          if (!errs[f]) errs[f] = issue.message;
        }
        setErrors(errs);
        return;
      }
      onSubmit(result.data);
    },
    [form, onSubmit]
  );

  const charCount = form.description.length;
  const MAX_DESC = 2000;

  return (
    <div ref={ref} style={{ maxWidth: 640, margin: "0 auto", padding: "0 1rem 5rem" }}>
      {/* Section heading */}
      <div style={{ textAlign: "center", marginBottom: "2rem" }}>
        <h2
          style={{
            fontSize: "1.6rem",
            fontWeight: 700,
            color: "#f1f5f9",
            marginBottom: "0.4rem",
          }}
        >
          Describe Your Idea
        </h2>
        <p style={{ fontSize: "0.875rem", color: "#64748b" }}>
          Fill in the details and let Gemma AI build your blueprint
        </p>
      </div>

      <div className="glass-card" style={{ padding: "2rem" }}>
        <form onSubmit={handleSubmit} noValidate style={{ display: "flex", flexDirection: "column", gap: "1.4rem" }}>

          {/* Project Name */}
          <div>
            <label
              htmlFor="projectName"
              style={{ display: "block", fontSize: "0.8rem", fontWeight: 600, color: "#cbd5e1", marginBottom: "0.5rem", letterSpacing: "0.02em" }}
            >
              PROJECT NAME <span style={{ color: "#8b5cf6" }}>*</span>
            </label>
            <div style={{ position: "relative" }}>
              <input
                id="projectName"
                type="text"
                value={form.projectName}
                onChange={(e) => setField("projectName", e.target.value)}
                placeholder="e.g. StudyAI, BudgetWise, DevConnect"
                className="input-glass"
                disabled={isLoading}
                maxLength={100}
                style={{ paddingRight: form.projectName ? "2.5rem" : undefined }}
              />
              {form.projectName && (
                <button
                  type="button"
                  onClick={() => clearField("projectName")}
                  style={{
                    position: "absolute",
                    right: "0.75rem",
                    top: "50%",
                    transform: "translateY(-50%)",
                    color: "#64748b",
                    background: "none",
                    border: "none",
                    cursor: "pointer",
                    padding: "2px",
                    lineHeight: 1,
                  }}
                  aria-label="Clear project name"
                >
                  <X size={14} />
                </button>
              )}
            </div>
            {errors.projectName && (
              <p style={{ marginTop: "0.4rem", fontSize: "0.75rem", color: "#f87171" }}>
                {errors.projectName}
              </p>
            )}
          </div>

          {/* Description */}
          <div>
            <label
              htmlFor="description"
              style={{ display: "block", fontSize: "0.8rem", fontWeight: 600, color: "#cbd5e1", marginBottom: "0.5rem", letterSpacing: "0.02em" }}
            >
              PROJECT DESCRIPTION <span style={{ color: "#8b5cf6" }}>*</span>
            </label>
            <textarea
              id="description"
              value={form.description}
              onChange={(e) => setField("description", e.target.value)}
              placeholder="Describe what you want to build, the problem it solves, and who will use it. The more detail, the better the plan."
              rows={5}
              className="input-glass"
              disabled={isLoading}
              maxLength={MAX_DESC}
              style={{ resize: "vertical", minHeight: "120px" }}
            />
            <div style={{ display: "flex", justifyContent: "space-between", marginTop: "0.35rem" }}>
              {errors.description ? (
                <p style={{ fontSize: "0.75rem", color: "#f87171" }}>{errors.description}</p>
              ) : (
                <span />
              )}
              <span
                style={{
                  fontSize: "0.72rem",
                  color: charCount > MAX_DESC * 0.9 ? "#f59e0b" : "#475569",
                }}
              >
                {charCount}/{MAX_DESC}
              </span>
            </div>
          </div>

          {/* Category + Skill Level */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label
                htmlFor="category"
                style={{ display: "block", fontSize: "0.8rem", fontWeight: 600, color: "#cbd5e1", marginBottom: "0.5rem", letterSpacing: "0.02em" }}
              >
                CATEGORY
              </label>
              <div style={{ position: "relative" }}>
                <select
                  id="category"
                  value={form.category}
                  onChange={(e) => setField("category", e.target.value as IdeaRequest["category"])}
                  className="input-glass"
                  disabled={isLoading}
                  style={{ appearance: "none", paddingRight: "2.2rem", cursor: "pointer" }}
                >
                  {CATEGORIES.map((c) => (
                    <option key={c.value} value={c.value} style={{ background: "#0d1530" }}>
                      {c.label}
                    </option>
                  ))}
                </select>
                <ChevronDown
                  size={14}
                  style={{
                    position: "absolute",
                    right: "0.75rem",
                    top: "50%",
                    transform: "translateY(-50%)",
                    color: "#64748b",
                    pointerEvents: "none",
                  }}
                />
              </div>
            </div>

            <div>
              <label
                htmlFor="skillLevel"
                style={{ display: "block", fontSize: "0.8rem", fontWeight: 600, color: "#cbd5e1", marginBottom: "0.5rem", letterSpacing: "0.02em" }}
              >
                SKILL LEVEL
              </label>
              <div style={{ position: "relative" }}>
                <select
                  id="skillLevel"
                  value={form.skillLevel}
                  onChange={(e) => setField("skillLevel", e.target.value as IdeaRequest["skillLevel"])}
                  className="input-glass"
                  disabled={isLoading}
                  style={{ appearance: "none", paddingRight: "2.2rem", cursor: "pointer" }}
                >
                  {SKILL_LEVELS.map((s) => (
                    <option key={s.value} value={s.value} style={{ background: "#0d1530" }}>
                      {s.label} ({s.desc})
                    </option>
                  ))}
                </select>
                <ChevronDown
                  size={14}
                  style={{
                    position: "absolute",
                    right: "0.75rem",
                    top: "50%",
                    transform: "translateY(-50%)",
                    color: "#64748b",
                    pointerEvents: "none",
                  }}
                />
              </div>
            </div>
          </div>

          {/* Duration pills */}
          <div>
            <p style={{ fontSize: "0.8rem", fontWeight: 600, color: "#cbd5e1", marginBottom: "0.65rem", letterSpacing: "0.02em" }}>
              HACKATHON DURATION
            </p>
            <div style={{ display: "flex", gap: "0.5rem", flexWrap: "wrap" }}>
              {DURATIONS.map((d) => {
                const active = form.duration === d.value;
                return (
                  <button
                    key={d.value}
                    type="button"
                    id={`duration-${d.value}`}
                    onClick={() => setField("duration", d.value as IdeaRequest["duration"])}
                    disabled={isLoading}
                    style={{
                      padding: "0.45rem 1rem",
                      borderRadius: "8px",
                      fontSize: "0.82rem",
                      fontWeight: 500,
                      border: `1px solid ${active ? "rgba(139,92,246,0.65)" : "rgba(99,102,241,0.2)"}`,
                      background: active ? "rgba(99,102,241,0.22)" : "rgba(255,255,255,0.03)",
                      color: active ? "#c4b5fd" : "#64748b",
                      cursor: isLoading ? "not-allowed" : "pointer",
                      transition: "all 0.15s ease",
                    }}
                  >
                    {d.label}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Technologies (optional) */}
          <div>
            <label
              htmlFor="technologies"
              style={{ display: "block", fontSize: "0.8rem", fontWeight: 600, color: "#cbd5e1", marginBottom: "0.5rem", letterSpacing: "0.02em" }}
            >
              PREFERRED TECHNOLOGIES{" "}
              <span style={{ color: "#475569", fontWeight: 400, fontSize: "0.75rem", textTransform: "none", letterSpacing: 0 }}>
                (optional)
              </span>
            </label>
            <input
              id="technologies"
              type="text"
              value={form.technologies ?? ""}
              onChange={(e) => setField("technologies", e.target.value)}
              placeholder="e.g. React, FastAPI, PostgreSQL, OpenAI"
              className="input-glass"
              disabled={isLoading}
              maxLength={300}
            />
            <p style={{ marginTop: "0.35rem", fontSize: "0.72rem", color: "#475569" }}>
              Comma-separated. Leave blank for AI recommendations.
            </p>
          </div>

          {/* Submit button */}
          <button
            id="generate-plan-button"
            type="submit"
            disabled={isLoading}
            className="btn-gradient"
            style={{
              width: "100%",
              padding: "0.95rem",
              borderRadius: "12px",
              fontSize: "0.95rem",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              gap: "0.6rem",
              marginTop: "0.4rem",
            }}
          >
            {isLoading ? (
              <>
                <span style={{ display: "flex", gap: "5px" }}>
                  <span className="bounce-dot" />
                  <span className="bounce-dot" />
                  <span className="bounce-dot" />
                </span>
                Generating Blueprint…
              </>
            ) : (
              <>
                <Sparkles size={16} />
                Generate Project Plan
              </>
            )}
          </button>
        </form>
      </div>
    </div>
  );
});

export default IdeaForm;
