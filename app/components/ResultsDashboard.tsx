"use client";

import { useState, useMemo } from "react";
import {
  Layers, Database, GitBranch, CheckSquare, AlertTriangle,
  Play, Mic, Star, Clock, Users, Zap, ChevronRight, Server, Globe, Save, RotateCcw,
  Download, FileText
} from "lucide-react";
import { ProjectPlan, IdeaRequest } from "@/lib/types";
import CopyButton from "./CopyButton";
import MermaidDiagram from "./MermaidDiagram";
import { generateMarkdownReport, downloadMarkdown } from "@/lib/exportMarkdown";

const TABS = [
  { id: "overview", label: "Overview", icon: <Star size={14} /> },
  { id: "features", label: "Features", icon: <Zap size={14} /> },
  { id: "techstack", label: "Tech Stack", icon: <Layers size={14} /> },
  { id: "architecture", label: "Architecture", icon: <GitBranch size={14} /> },
  { id: "api", label: "API Design", icon: <Globe size={14} /> },
  { id: "database", label: "Database", icon: <Database size={14} /> },
  { id: "roadmap", label: "Roadmap", icon: <Clock size={14} /> },
  { id: "launch", label: "Launch", icon: <Play size={14} /> },
] as const;

type TabId = (typeof TABS)[number]["id"];

const METHOD_COLORS: Record<string, string> = {
  GET: "badge-blue",
  POST: "badge-green",
  PUT: "badge-yellow",
  PATCH: "badge-yellow",
  DELETE: "badge-red",
};

const SEVERITY_COLORS: Record<string, string> = {
  low: "badge-green",
  medium: "badge-yellow",
  high: "badge-red",
};

const PRIORITY_COLORS: Record<string, string> = {
  "must-have": "badge-red",
  "should-have": "badge-yellow",
  "nice-to-have": "badge-green",
};

interface ResultsDashboardProps {
  plan: ProjectPlan;
  modelUsed: string;
  generatedAt: string;
  request: IdeaRequest;
  onSave: () => void;
  onReset: () => void;
  isSaved: boolean;
  isDemo?: boolean;
}

export default function ResultsDashboard({
  plan,
  modelUsed,
  generatedAt,
  request,
  onSave,
  onReset,
  isSaved,
  isDemo = false,
}: ResultsDashboardProps) {
  const [activeTab, setActiveTab] = useState<TabId>("overview");

  const fullPlanText = JSON.stringify(plan, null, 2);
  const markdownReport = useMemo(() => generateMarkdownReport(plan, request), [plan, request]);
  const generatedDate = new Date(generatedAt).toLocaleString();

  const handleDownloadMarkdown = () => {
    const safeTitle = plan.projectTitle.toLowerCase().replace(/[^a-z0-9]+/g, "-");
    downloadMarkdown(`${safeTitle}-blueprint.md`, markdownReport);
  };

  return (
    <div className="max-w-5xl mx-auto px-4 pb-20 animate-fade-in-up">
      {/* Demo mode banner */}
      {isDemo && (
        <div
          style={{
            marginBottom: "1rem",
            padding: "0.75rem 1rem",
            borderRadius: "10px",
            background: "rgba(245,158,11,0.1)",
            border: "1px solid rgba(245,158,11,0.3)",
            display: "flex",
            alignItems: "center",
            gap: "0.6rem",
            fontSize: "0.8rem",
            color: "#fcd34d",
          }}
        >
          <span>🧪</span>
          <span>
            <strong>Demo mode</strong> — This is a pre-generated sample plan. Submit your own idea above to generate a real blueprint with Gemma AI.
          </span>
        </div>
      )}
      {/* Header bar */}
      <div className="glass-card p-4 sm:p-5 mb-6 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <Star size={16} className="text-purple-400" />
            <h2 className="text-lg font-bold text-white">{plan.projectTitle}</h2>
          </div>
          <p className="text-xs text-slate-400">
            Generated with <span className="text-purple-300">{modelUsed}</span> · {generatedDate}
          </p>
        </div>
        <div className="flex items-center gap-2 flex-wrap">
          <CopyButton text={markdownReport} label="Copy Markdown" />
          <button
            id="download-markdown-button"
            onClick={handleDownloadMarkdown}
            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium bg-purple-500/10 border border-purple-500/25 text-purple-300 hover:text-white hover:bg-purple-500/20 transition-all duration-200"
            title="Download formatted project plan as .md file"
          >
            <Download size={12} />
            Export .md
          </button>
          <CopyButton text={fullPlanText} label="Copy JSON" />
          <button
            id="save-plan-button"
            onClick={onSave}
            disabled={isSaved}
            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium transition-all duration-200 border"
            style={{
              background: isSaved ? "rgba(16,185,129,0.15)" : "rgba(139,92,246,0.15)",
              borderColor: isSaved ? "rgba(16,185,129,0.3)" : "rgba(139,92,246,0.3)",
              color: isSaved ? "#6ee7b7" : "#c4b5fd",
            }}
          >
            <Save size={12} />
            {isSaved ? "Saved!" : "Save Plan"}
          </button>
          <button
            id="new-plan-button"
            onClick={onReset}
            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium bg-white/5 border border-white/10 text-slate-400 hover:text-white hover:bg-white/10 transition-all duration-200"
          >
            <RotateCcw size={12} />
            New Plan
          </button>
        </div>
      </div>

      {/* Tabs */}
      <div className="flex gap-1 mb-6 overflow-x-auto pb-2 scrollbar-thin">
        {TABS.map((tab) => (
          <button
            key={tab.id}
            id={`tab-${tab.id}`}
            onClick={() => setActiveTab(tab.id)}
            className="flex items-center gap-1.5 px-4 py-2.5 rounded-lg text-sm font-medium flex-shrink-0 transition-all duration-200 border"
            style={{
              background: activeTab === tab.id
                ? "rgba(99,102,241,0.2)"
                : "rgba(255,255,255,0.03)",
              borderColor: activeTab === tab.id
                ? "rgba(139,92,246,0.5)"
                : "rgba(255,255,255,0.06)",
              color: activeTab === tab.id ? "#a78bfa" : "#64748b",
              borderBottomWidth: activeTab === tab.id ? "2px" : "1px",
              borderBottomColor: activeTab === tab.id ? "#8b5cf6" : "rgba(255,255,255,0.06)",
            }}
          >
            {tab.icon}
            {tab.label}
          </button>
        ))}
      </div>

      {/* Tab Content */}
      <div className="glass-card p-6 sm:p-8">
        {/* ── OVERVIEW ── */}
        {activeTab === "overview" && (
          <div className="space-y-6">
            <div className="flex items-start justify-between gap-4">
              <h3 className="text-xl font-bold text-white">{plan.projectTitle}</h3>
              <CopyButton text={`${plan.projectTitle}\n\n${plan.problemStatement}\n\n${plan.solutionSummary}`} />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="p-4 rounded-xl" style={{ background: "rgba(239,68,68,0.08)", border: "1px solid rgba(239,68,68,0.2)" }}>
                <p className="text-xs font-semibold text-red-400 uppercase tracking-wider mb-2">Problem</p>
                <p className="text-sm text-slate-300 leading-relaxed">{plan.problemStatement}</p>
              </div>
              <div className="p-4 rounded-xl" style={{ background: "rgba(16,185,129,0.08)", border: "1px solid rgba(16,185,129,0.2)" }}>
                <p className="text-xs font-semibold text-emerald-400 uppercase tracking-wider mb-2">Solution</p>
                <p className="text-sm text-slate-300 leading-relaxed">{plan.solutionSummary}</p>
              </div>
            </div>

            <div>
              <div className="flex items-center gap-2 mb-3">
                <Users size={14} className="text-blue-400" />
                <p className="text-sm font-semibold text-slate-200">Target Users</p>
              </div>
              <div className="flex flex-wrap gap-2">
                {plan.targetUsers.map((u, i) => (
                  <span key={i} className="badge-blue badge">{u}</span>
                ))}
              </div>
            </div>

            <div>
              <p className="text-sm font-semibold text-slate-200 mb-3">User Stories</p>
              <div className="space-y-2">
                {plan.userStories.map((s, i) => (
                  <div key={i} className="flex items-start gap-2 text-sm">
                    <ChevronRight size={14} className="text-purple-400 flex-shrink-0 mt-0.5" />
                    <span className="text-slate-300">
                      As a <span className="text-purple-300 font-medium">{s.role}</span>, I want to{" "}
                      <span className="text-white">{s.action}</span> so that{" "}
                      <span className="text-slate-400">{s.benefit}</span>.
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* Testing checklist preview */}
            <div>
              <div className="flex items-center gap-2 mb-3">
                <CheckSquare size={14} className="text-emerald-400" />
                <p className="text-sm font-semibold text-slate-200">Testing Checklist</p>
              </div>
              <div className="space-y-2">
                {plan.testingChecklist.map((item, i) => (
                  <div key={i} className="flex items-start gap-2 text-sm">
                    <div className="w-4 h-4 rounded border border-emerald-500/40 flex-shrink-0 mt-0.5 flex items-center justify-center">
                      <div className="w-2 h-2 rounded-sm bg-emerald-500/30" />
                    </div>
                    <span className="text-slate-300">{item}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* ── FEATURES ── */}
        {activeTab === "features" && (
          <div className="space-y-6">
            <div className="flex items-start justify-between">
              <h3 className="text-lg font-bold text-white">MVP Features</h3>
              <CopyButton text={plan.mvpFeatures.map((f) => `• ${f.name}: ${f.description}`).join("\n")} />
            </div>
            <div className="space-y-3">
              {plan.mvpFeatures.map((f, i) => (
                <div key={i} className="p-4 rounded-xl" style={{ background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.06)" }}>
                  <div className="flex items-start justify-between gap-3 flex-wrap">
                    <div className="flex items-center gap-2">
                      <span className="w-6 h-6 rounded-md flex items-center justify-center text-xs font-bold"
                        style={{ background: "rgba(99,102,241,0.2)", color: "#a78bfa" }}>
                        {i + 1}
                      </span>
                      <h4 className="text-sm font-semibold text-white">{f.name}</h4>
                    </div>
                    <div className="flex items-center gap-2">
                      {f.priority && <span className={`badge ${PRIORITY_COLORS[f.priority] || "badge"}`}>{f.priority}</span>}
                      {f.estimatedHours && (
                        <span className="text-xs text-slate-400">~{f.estimatedHours}h</span>
                      )}
                    </div>
                  </div>
                  <p className="mt-2 text-sm text-slate-400 ml-8">{f.description}</p>
                </div>
              ))}
            </div>

            {plan.futureFeatures.length > 0 && (
              <>
                <h3 className="text-lg font-bold text-white mt-8">Future Features</h3>
                <div className="space-y-3">
                  {plan.futureFeatures.map((f, i) => (
                    <div key={i} className="p-4 rounded-xl" style={{ background: "rgba(255,255,255,0.02)", border: "1px solid rgba(255,255,255,0.04)" }}>
                      <div className="flex items-start gap-2">
                        <Zap size={14} className="text-slate-500 flex-shrink-0 mt-0.5" />
                        <div>
                          <h4 className="text-sm font-medium text-slate-300">{f.name}</h4>
                          <p className="text-xs text-slate-500 mt-1">{f.description}</p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </>
            )}
          </div>
        )}

        {/* ── TECH STACK ── */}
        {activeTab === "techstack" && (
          <div className="space-y-4">
            <div className="flex items-start justify-between">
              <h3 className="text-lg font-bold text-white">Recommended Tech Stack</h3>
              <CopyButton text={plan.techStack.map((t) => `${t.category}: ${t.technology} — ${t.reasoning}`).join("\n")} />
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {plan.techStack.map((t, i) => (
                <div key={i} className="p-4 rounded-xl flex gap-3"
                  style={{ background: "rgba(99,102,241,0.06)", border: "1px solid rgba(99,102,241,0.15)" }}>
                  <div className="w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0"
                    style={{ background: "rgba(139,92,246,0.2)" }}>
                    <Layers size={14} className="text-purple-400" />
                  </div>
                  <div className="min-w-0">
                    <p className="text-xs text-slate-500 uppercase tracking-wider font-medium">{t.category}</p>
                    <p className="text-sm font-semibold text-white mt-0.5">{t.technology}</p>
                    <p className="text-xs text-slate-400 mt-1 leading-relaxed">{t.reasoning}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* ── ARCHITECTURE ── */}
        {activeTab === "architecture" && (
          <MermaidDiagram source={plan.mermaidDiagram} />
        )}

        {/* ── API DESIGN ── */}
        {activeTab === "api" && (
          <div className="space-y-4">
            <div className="flex items-start justify-between">
              <h3 className="text-lg font-bold text-white">API Endpoints</h3>
              <CopyButton text={plan.apiEndpoints.map((e) =>
                `${e.method} ${e.path}\n${e.description}${e.requestExample ? `\nRequest: ${e.requestExample}` : ""}${e.responseExample ? `\nResponse: ${e.responseExample}` : ""}`
              ).join("\n\n")} />
            </div>
            <div className="space-y-3">
              {plan.apiEndpoints.map((ep, i) => (
                <div key={i} className="rounded-xl overflow-hidden"
                  style={{ border: "1px solid rgba(255,255,255,0.06)" }}>
                  <div className="flex items-center gap-3 px-4 py-3"
                    style={{ background: "rgba(255,255,255,0.03)" }}>
                    <span className={`badge ${METHOD_COLORS[ep.method] || "badge"} font-mono text-xs`}>
                      {ep.method}
                    </span>
                    <code className="text-sm font-mono text-slate-200">{ep.path}</code>
                  </div>
                  <div className="px-4 py-3 space-y-3">
                    <p className="text-sm text-slate-400">{ep.description}</p>
                    {ep.requestExample && (
                      <div>
                        <p className="text-xs text-slate-500 mb-1 flex items-center gap-1">
                          <Server size={10} /> Request Body
                        </p>
                        <div className="code-block p-3">
                          <pre className="text-xs whitespace-pre-wrap break-all">{ep.requestExample}</pre>
                        </div>
                      </div>
                    )}
                    {ep.responseExample && (
                      <div>
                        <p className="text-xs text-slate-500 mb-1 flex items-center gap-1">
                          <Globe size={10} /> Response
                        </p>
                        <div className="code-block p-3">
                          <pre className="text-xs whitespace-pre-wrap break-all">{ep.responseExample}</pre>
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* ── DATABASE ── */}
        {activeTab === "database" && (
          <div className="space-y-6">
            <div className="flex items-start justify-between">
              <h3 className="text-lg font-bold text-white">Database Design</h3>
              <CopyButton text={plan.databaseTables.map((t) =>
                `Table: ${t.tableName}\n${t.fields.map((f) => `  ${f.name} ${f.type} ${f.constraints || ""}`).join("\n")}${t.relationships ? `\nRelationships: ${t.relationships}` : ""}`
              ).join("\n\n")} />
            </div>
            <div className="space-y-4">
              {plan.databaseTables.map((table, i) => (
                <div key={i} className="rounded-xl overflow-hidden"
                  style={{ border: "1px solid rgba(6,182,212,0.2)" }}>
                  <div className="flex items-center gap-2 px-4 py-3"
                    style={{ background: "rgba(6,182,212,0.08)" }}>
                    <Database size={14} className="text-cyan-400" />
                    <h4 className="text-sm font-semibold text-cyan-300">{table.tableName}</h4>
                    {table.relationships && (
                      <span className="ml-auto text-xs text-slate-400">{table.relationships}</span>
                    )}
                  </div>
                  <div className="overflow-x-auto">
                    <table className="w-full text-sm">
                      <thead>
                        <tr style={{ borderBottom: "1px solid rgba(255,255,255,0.05)" }}>
                          <th className="text-left px-4 py-2 text-xs text-slate-500 font-medium uppercase tracking-wider">Field</th>
                          <th className="text-left px-4 py-2 text-xs text-slate-500 font-medium uppercase tracking-wider">Type</th>
                          <th className="text-left px-4 py-2 text-xs text-slate-500 font-medium uppercase tracking-wider">Constraints</th>
                        </tr>
                      </thead>
                      <tbody>
                        {table.fields.map((field, j) => (
                          <tr key={j} style={{ borderBottom: "1px solid rgba(255,255,255,0.03)" }}>
                            <td className="px-4 py-2.5">
                              <code className="text-sm text-white font-mono">{field.name}</code>
                            </td>
                            <td className="px-4 py-2.5">
                              <code className="text-xs text-blue-300 font-mono">{field.type}</code>
                            </td>
                            <td className="px-4 py-2.5">
                              <span className="text-xs text-slate-400">{field.constraints || "—"}</span>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* ── ROADMAP ── */}
        {activeTab === "roadmap" && (
          <div className="space-y-4">
            <div className="flex items-start justify-between">
              <h3 className="text-lg font-bold text-white">Implementation Roadmap</h3>
              <CopyButton text={plan.roadmap.map((p) =>
                `[${p.timeBox}] ${p.phase}\n${p.tasks.map((t) => `  • ${t}`).join("\n")}`
              ).join("\n\n")} />
            </div>
            <div className="relative pl-4">
              {/* Vertical line */}
              <div className="absolute left-[7px] top-0 bottom-0 w-px"
                style={{ background: "linear-gradient(to bottom, #6366f1, transparent)" }} />

              <div className="space-y-6">
                {plan.roadmap.map((phase, i) => (
                  <div key={i} className="relative pl-6">
                    {/* Dot */}
                    <div className="absolute left-[-5px] top-1 w-4 h-4 rounded-full border-2 flex items-center justify-center"
                      style={{ borderColor: "#6366f1", background: "#0a0f1e" }}>
                      <div className="w-1.5 h-1.5 rounded-full bg-indigo-500" />
                    </div>

                    <div className="p-4 rounded-xl"
                      style={{ background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.06)" }}>
                      <div className="flex items-center justify-between mb-3 flex-wrap gap-2">
                        <h4 className="text-sm font-semibold text-white">{phase.phase}</h4>
                        <span className="badge">{phase.timeBox}</span>
                      </div>
                      <ul className="space-y-1.5">
                        {phase.tasks.map((task, j) => (
                          <li key={j} className="flex items-start gap-2 text-sm text-slate-400">
                            <ChevronRight size={12} className="text-indigo-400 flex-shrink-0 mt-1" />
                            {task}
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Risks */}
            {plan.risks.length > 0 && (
              <div className="mt-8">
                <div className="flex items-center gap-2 mb-3">
                  <AlertTriangle size={14} className="text-amber-400" />
                  <h4 className="text-sm font-semibold text-slate-200">Risks & Mitigations</h4>
                </div>
                <div className="space-y-3">
                  {plan.risks.map((r, i) => (
                    <div key={i} className="p-3 rounded-lg flex items-start gap-3"
                      style={{ background: "rgba(245,158,11,0.06)", border: "1px solid rgba(245,158,11,0.15)" }}>
                      <AlertTriangle size={14} className="text-amber-400 flex-shrink-0 mt-0.5" />
                      <div className="min-w-0 flex-1">
                        <div className="flex items-center gap-2 mb-1">
                          <p className="text-sm font-medium text-amber-200">{r.risk}</p>
                          {r.severity && <span className={`badge ${SEVERITY_COLORS[r.severity] || "badge"} text-xs`}>{r.severity}</span>}
                        </div>
                        <p className="text-xs text-slate-400">{r.mitigation}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        )}

        {/* ── LAUNCH ── */}
        {activeTab === "launch" && (
          <div className="space-y-6">
            <div>
              <div className="flex items-start justify-between mb-3">
                <div className="flex items-center gap-2">
                  <Play size={16} className="text-emerald-400" />
                  <h3 className="text-lg font-bold text-white">Demo Script</h3>
                </div>
                <CopyButton text={plan.demoScript} />
              </div>
              <div className="p-4 rounded-xl whitespace-pre-wrap text-sm text-slate-300 leading-relaxed"
                style={{ background: "rgba(16,185,129,0.06)", border: "1px solid rgba(16,185,129,0.15)" }}>
                {plan.demoScript}
              </div>
            </div>

            <div>
              <div className="flex items-start justify-between mb-3">
                <div className="flex items-center gap-2">
                  <Mic size={16} className="text-purple-400" />
                  <h3 className="text-lg font-bold text-white">Judging Pitch</h3>
                </div>
                <CopyButton text={plan.judgingPitch} />
              </div>
              <div className="p-4 rounded-xl"
                style={{ background: "rgba(139,92,246,0.06)", border: "1px solid rgba(139,92,246,0.2)" }}>
                <p className="text-sm text-slate-200 leading-relaxed italic">
                  &ldquo;{plan.judgingPitch}&rdquo;
                </p>
              </div>
            </div>

            {/* Project metadata */}
            <div className="p-4 rounded-xl"
              style={{ background: "rgba(255,255,255,0.02)", border: "1px solid rgba(255,255,255,0.05)" }}>
              <p className="text-xs font-semibold text-slate-500 uppercase tracking-wider mb-3">Project Details</p>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-sm">
                <div>
                  <p className="text-xs text-slate-500 mb-1">Category</p>
                  <p className="text-white font-medium capitalize">{request.category}</p>
                </div>
                <div>
                  <p className="text-xs text-slate-500 mb-1">Skill Level</p>
                  <p className="text-white font-medium capitalize">{request.skillLevel}</p>
                </div>
                <div>
                  <p className="text-xs text-slate-500 mb-1">Duration</p>
                  <p className="text-white font-medium">{request.duration}</p>
                </div>
                <div>
                  <p className="text-xs text-slate-500 mb-1">Tech Hint</p>
                  <p className="text-white font-medium">{request.technologies || "AI-chosen"}</p>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
