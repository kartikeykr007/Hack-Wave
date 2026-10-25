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
  role: z.string(),
  action: z.string(),
  benefit: z.string(),
});

export const FeatureSchema = z.object({
  name: z.string(),
  description: z.string(),
  priority: z.enum(["must-have", "should-have", "nice-to-have"]).optional(),
  estimatedHours: z.number().optional(),
});

export const TechChoiceSchema = z.object({
  category: z.string(),
  technology: z.string(),
  reasoning: z.string(),
});

export const ApiEndpointSchema = z.object({
  method: z.enum(["GET", "POST", "PUT", "PATCH", "DELETE"]),
  path: z.string(),
  description: z.string(),
  requestExample: z.string().optional(),
  responseExample: z.string().optional(),
});

export const DatabaseTableSchema = z.object({
  tableName: z.string(),
  fields: z.array(z.object({
    name: z.string(),
    type: z.string(),
    constraints: z.string().optional(),
  })),
  relationships: z.string().optional(),
});

export const RoadmapPhaseSchema = z.object({
  phase: z.string(),
  timeBox: z.string(),
  tasks: z.array(z.string()),
});

export const RiskSchema = z.object({
  risk: z.string(),
  mitigation: z.string(),
  severity: z.enum(["low", "medium", "high"]).optional(),
});

export const ProjectPlanSchema = z.object({
  projectTitle: z.string(),
  problemStatement: z.string(),
  solutionSummary: z.string(),
  targetUsers: z.array(z.string()),
  userStories: z.array(UserStorySchema),
  mvpFeatures: z.array(FeatureSchema),
  futureFeatures: z.array(FeatureSchema),
  techStack: z.array(TechChoiceSchema),
  mermaidDiagram: z.string(),
  apiEndpoints: z.array(ApiEndpointSchema),
  databaseTables: z.array(DatabaseTableSchema),
  roadmap: z.array(RoadmapPhaseSchema),
  testingChecklist: z.array(z.string()),
  risks: z.array(RiskSchema),
  demoScript: z.string(),
  judgingPitch: z.string(),
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
