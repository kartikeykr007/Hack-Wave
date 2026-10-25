import { z } from "zod";

// ─── Request Schema ───────────────────────────────────────────────────────────

export const IdeaRequestSchema = z.object({
  projectName: z.string().min(2, "Project name must be at least 2 characters").max(100),
  description: z.string().min(20, "Description must be at least 20 characters").max(2000),
  category: z.enum([
    "web", "mobile", "ai-ml", "iot", "blockchain", "gaming", "devtools", "fintech", "healthtech", "edtech", "other"
  ]),
  skillLevel: z.enum(["beginner", "intermediate", "advanced"]),
  duration: z.enum(["12h", "24h", "36h", "48h", "72h"]),
  technologies: z.string().max(300).optional(),
});

export type IdeaRequest = z.infer<typeof IdeaRequestSchema>;

// ─── Response Schema ──────────────────────────────────────────────────────────

export const UserStorySchema = z.object({
  role: z.string().default("user"),
  action: z.string().default("use the application"),
  benefit: z.string().default("achieve my goal"),
});

export const FeatureSchema = z.object({
  name: z.string().default("Feature"),
  description: z.string().default(""),
  priority: z.preprocess(
    (v) => (typeof v === "string" ? v.toLowerCase().trim() : undefined),
    z.enum(["must-have", "should-have", "nice-to-have"]).optional()
  ),
  estimatedHours: z.coerce.number().optional(),
});

export const TechChoiceSchema = z.object({
  category: z.string().default("General"),
  technology: z.string().default("Standard"),
  reasoning: z.string().default(""),
});

export const ApiEndpointSchema = z.object({
  method: z.preprocess(
    (v) => (typeof v === "string" ? v.toUpperCase().trim() : "GET"),
    z.enum(["GET", "POST", "PUT", "PATCH", "DELETE"]).catch("GET")
  ),
  path: z.string().default("/api"),
  description: z.string().default(""),
  requestExample: z.preprocess((v) => {
    if (typeof v === "object" && v !== null) return JSON.stringify(v, null, 2);
    return typeof v === "string" ? v : undefined;
  }, z.string().optional()),
  responseExample: z.preprocess((v) => {
    if (typeof v === "object" && v !== null) return JSON.stringify(v, null, 2);
    return typeof v === "string" ? v : undefined;
  }, z.string().optional()),
});

export const DatabaseTableSchema = z.object({
  tableName: z.string().default("items"),
  fields: z.array(z.object({
    name: z.string().default("id"),
    type: z.string().default("string"),
    constraints: z.string().optional(),
  })).default([]),
  relationships: z.string().optional(),
});

export const RoadmapPhaseSchema = z.object({
  phase: z.string().default("Phase"),
  timeBox: z.string().default("Hour 0"),
  tasks: z.array(z.string()).default([]),
});

export const RiskSchema = z.object({
  risk: z.string().default(""),
  mitigation: z.string().default(""),
  severity: z.preprocess(
    (v) => (typeof v === "string" ? v.toLowerCase().trim() : undefined),
    z.enum(["low", "medium", "high"]).optional()
  ),
});

export const ProjectPlanSchema = z.object({
  projectTitle: z.string().default("Hackathon Project"),
  problemStatement: z.string().default(""),
  solutionSummary: z.string().default(""),
  targetUsers: z.array(z.string()).default([]),
  userStories: z.array(UserStorySchema).default([]),
  mvpFeatures: z.array(FeatureSchema).default([]),
  futureFeatures: z.array(FeatureSchema).default([]),
  techStack: z.array(TechChoiceSchema).default([]),
  mermaidDiagram: z.string().default("graph TD\n  Client[Frontend App] --> Server[Backend API]\n  Server --> DB[(Database)]"),
  apiEndpoints: z.array(ApiEndpointSchema).default([]),
  databaseTables: z.array(DatabaseTableSchema).default([]),
  roadmap: z.array(RoadmapPhaseSchema).default([]),
  testingChecklist: z.array(z.string()).default([]),
  risks: z.array(RiskSchema).default([]),
  demoScript: z.string().default(""),
  judgingPitch: z.string().default(""),
});

export type ProjectPlan = z.infer<typeof ProjectPlanSchema>;

// ─── API Response ─────────────────────────────────────────────────────────────

export interface GenerateResponse {
  plan: ProjectPlan;
  modelUsed: string;
  generatedAt: string;
}

export interface GenerateError {
  error: string;
  details?: string;
}

// ─── Saved Plan ───────────────────────────────────────────────────────────────

export interface SavedPlan {
  id: string;
  projectName: string;
  plan: ProjectPlan;
  generatedAt: string;
  modelUsed: string;
  request: IdeaRequest;
}
