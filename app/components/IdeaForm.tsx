"use client";

import { useState, useCallback, forwardRef } from "react";
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
  { value: "beginner", label: "Beginner", desc: "0-1 year" },
  { value: "intermediate", label: "Intermediate", desc: "2-4 years" },
  { value: "advanced", label: "Advanced", desc: "5+ years" },
];

const DURATIONS = [
  { value: "12h", label: "12 Hours" },
  { value: "24h", label: "24 Hours" },
  { value: "36h", label: "36 Hours" },
  { value: "48h", label: "48 Hours" },
  { value: "72h", label: "72 Hours" },
];

interface FormErrors {
  projectName?: string;
  description?: string;
  category?: string;
  skillLevel?: string;
  duration?: string;
  technologies?: string;
}

interface IdeaFormProps {
  defaultValues?: IdeaRequest;
  onSubmit: (data: IdeaRequest) => void;
  isLoading: boolean;
}

const IdeaForm = forwardRef<HTMLDivElement, IdeaFormProps>(function IdeaForm(
  { defaultValues, onSubmit, isLoading },
  ref
) {
  const [form, setForm] = useState<IdeaRequest>(
    defaultValues ?? {
      projectName: "",
      description: "",
      category: "web",
      skillLevel: "intermediate",
      duration: "24h",
      technologies: "",
    }
  );
  const [errors, setErrors] = useState<FormErrors>({});

  // Sync defaultValues when they change (sample idea click)
  useState(() => {
    if (defaultValues) setForm(defaultValues);
  });

  const updateField = useCallback(<K extends keyof IdeaRequest>(key: K, value: IdeaRequest[K]) => {
    setForm((prev) => ({ ...prev, [key]: value }));
    setErrors((prev) => ({ ...prev, [key]: undefined }));
  }, []);

  const handleSubmit = useCallback((e: React.FormEvent) => {
    e.preventDefault();
    const result = IdeaRequestSchema.safeParse(form);
    if (!result.success) {
      const fieldErrors: FormErrors = {};
      for (const issue of result.error.issues) {
        const field = issue.path[0] as keyof FormErrors;
        fieldErrors[field] = issue.message;
      }
      setErrors(fieldErrors);
      return;
    }
    onSubmit(result.data);
  }, [form, onSubmit]);

  const clearField = useCallback((key: keyof IdeaRequest) => {
    setForm((prev) => ({ ...prev, [key]: "" }));
    setErrors((prev) => ({ ...prev, [key]: undefined }));
  }, []);

  const charCount = form.description.length;
  const maxChars = 2000;

  return (
    <div ref={ref} className="max-w-2xl mx-auto px-4 pb-20">
      <div className="text-center mb-8">
        <h2 className="text-2xl font-bold text-white mb-2">Describe Your Idea</h2>
        <p className="text-slate-400 text-sm">Fill in the details below and let AI build your blueprint</p>
      </div>

      <div className="glass-card p-6 sm:p-8">
        <form onSubmit={handleSubmit} className="space-y-6" noValidate>
          {/* Project Name */}
          <div>
            <label htmlFor="projectName" className="block text-sm font-medium text-slate-300 mb-2">
              Project Name <span className="text-purple-400">*</span>
            </label>
            <div className="relative">
              <input
                id="projectName"
                type="text"
                value={form.projectName}
                onChange={(e) => updateField("projectName", e.target.value)}
                placeholder="e.g. StudyAI, BudgetWise, DevConnect"
                className="input-glass w-full px-4 py-3 rounded-lg text-sm"
                disabled={isLoading}
                maxLength={100}
              />
              {form.projectName && (
                <button
                  type="button"
                  onClick={() => clearField("projectName")}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-500 hover:text-slate-300 transition-colors"
                >
                  <X size={14} />
                </button>
              )}
            </div>
            {errors.projectName && (
              <p className="mt-1.5 text-xs text-red-400">{errors.projectName}</p>
            )}
          </div>

          {/* Description */}
          <div>
            <label htmlFor="description" className="block text-sm font-medium text-slate-300 mb-2">
              Project Description <span className="text-purple-400">*</span>
            </label>
            <textarea
              id="description"
              value={form.description}
              onChange={(e) => updateField("description", e.target.value)}
              placeholder="Describe what you want to build, the problem it solves, and the target audience. The more detail you provide, the better the plan."
              rows={5}
              className="input-glass w-full px-4 py-3 rounded-lg text-sm resize-none"
              disabled={isLoading}
              maxLength={maxChars}
            />
            <div className="flex justify-between mt-1.5">
              {errors.description ? (
                <p className="text-xs text-red-400">{errors.description}</p>
              ) : (
                <span />
              )}
              <span className={`text-xs ${charCount > maxChars * 0.9 ? "text-amber-400" : "text-slate-500"}`}>
                {charCount}/{maxChars}
              </span>
            </div>
          </div>

          {/* Category + Skill Level */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label htmlFor="category" className="block text-sm font-medium text-slate-300 mb-2">
                Category
              </label>
              <div className="relative">
                <select
                  id="category"
                  value={form.category}
                  onChange={(e) => updateField("category", e.target.value as IdeaRequest["category"])}
                  className="input-glass w-full px-4 py-3 rounded-lg text-sm appearance-none cursor-pointer"
                  disabled={isLoading}
                >
                  {CATEGORIES.map((c) => (
                    <option key={c.value} value={c.value} style={{ background: "#0d1530" }}>
                      {c.label}
                    </option>
                  ))}
                </select>
                <ChevronDown size={14} className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none" />
              </div>
            </div>

            <div>
              <label htmlFor="skillLevel" className="block text-sm font-medium text-slate-300 mb-2">
                Skill Level
              </label>
              <div className="relative">
                <select
                  id="skillLevel"
                  value={form.skillLevel}
                  onChange={(e) => updateField("skillLevel", e.target.value as IdeaRequest["skillLevel"])}
                  className="input-glass w-full px-4 py-3 rounded-lg text-sm appearance-none cursor-pointer"
                  disabled={isLoading}
                >
                  {SKILL_LEVELS.map((s) => (
                    <option key={s.value} value={s.value} style={{ background: "#0d1530" }}>
                      {s.label} ({s.desc})
                    </option>
                  ))}
                </select>
                <ChevronDown size={14} className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none" />
              </div>
            </div>
          </div>

          {/* Duration */}
          <div>
            <label className="block text-sm font-medium text-slate-300 mb-2">
              Hackathon Duration
            </label>
            <div className="flex flex-wrap gap-2">
              {DURATIONS.map((d) => (
                <button
                  key={d.value}
                  type="button"
                  id={`duration-${d.value}`}
                  onClick={() => updateField("duration", d.value as IdeaRequest["duration"])}
                  disabled={isLoading}
                  className="px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 border"
                  style={{
                    background: form.duration === d.value
                      ? "rgba(99,102,241,0.25)"
                      : "rgba(255,255,255,0.03)",
                    borderColor: form.duration === d.value
                      ? "rgba(139,92,246,0.6)"
                      : "rgba(99,102,241,0.2)",
                    color: form.duration === d.value ? "#a78bfa" : "#94a3b8",
                  }}
                >
                  {d.label}
                </button>
              ))}
            </div>
          </div>

          {/* Technologies */}
          <div>
            <label htmlFor="technologies" className="block text-sm font-medium text-slate-300 mb-2">
              Preferred Technologies <span className="text-slate-500">(optional)</span>
            </label>
            <input
              id="technologies"
              type="text"
              value={form.technologies ?? ""}
              onChange={(e) => updateField("technologies", e.target.value)}
              placeholder="e.g. React, FastAPI, PostgreSQL, OpenAI"
              className="input-glass w-full px-4 py-3 rounded-lg text-sm"
              disabled={isLoading}
              maxLength={300}
            />
            <p className="mt-1.5 text-xs text-slate-500">
              Separate with commas. Leave blank for AI recommendations.
            </p>
          </div>

          {/* Submit */}
          <button
            id="generate-plan-button"
            type="submit"
            disabled={isLoading}
            className="btn-gradient w-full py-4 rounded-xl text-base font-semibold flex items-center justify-center gap-3 disabled:opacity-60 disabled:cursor-not-allowed"
          >
            {isLoading ? (
              <>
                <span className="flex gap-1">
                  <span className="bounce-dot w-2 h-2 rounded-full bg-white inline-block" />
                  <span className="bounce-dot w-2 h-2 rounded-full bg-white inline-block" />
                  <span className="bounce-dot w-2 h-2 rounded-full bg-white inline-block" />
                </span>
                Generating Blueprint…
              </>
            ) : (
              <>
                <Sparkles size={18} />
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
