import { IdeaRequest } from "./types";

export function buildHackathonPrompt(req: IdeaRequest): string {
  const techHint = req.technologies
    ? `\nPreferred Technologies: ${req.technologies}`
    : "";

  return `You are a pragmatic hackathon solution architect with 10+ years of experience helping teams ship winning projects in tight timeframes. Your job is to convert a raw project idea into a concrete, actionable development blueprint.

PROJECT DETAILS:
- Name: ${req.projectName}
- Description: ${req.description}
- Category: ${req.category}
- Team Skill Level: ${req.skillLevel}
- Hackathon Duration: ${req.duration}${techHint}

Generate a complete, realistic project plan. Be specific, opinionated and practical. Prioritize what can actually be built in ${req.duration}.

Respond with ONLY valid JSON matching this exact schema (no markdown code fences, no explanation text):

{
  "projectTitle": "string — polished project name",
  "problemStatement": "string — 2-3 sentence clear problem description",
  "solutionSummary": "string — 2-3 sentence solution overview",
  "targetUsers": ["array of 3-4 specific user personas"],
  "userStories": [
    {"role": "string", "action": "string", "benefit": "string"}
  ],
  "mvpFeatures": [
    {"name": "string", "description": "string", "priority": "must-have|should-have|nice-to-have", "estimatedHours": number}
  ],
  "futureFeatures": [
    {"name": "string", "description": "string", "priority": "nice-to-have"}
  ],
  "techStack": [
    {"category": "string", "technology": "string", "reasoning": "string"}
  ],
  "mermaidDiagram": "string — valid Mermaid graph TD diagram showing system architecture with nodes for frontend, backend, database, and external services",
  "apiEndpoints": [
    {"method": "GET|POST|PUT|PATCH|DELETE", "path": "/api/example", "description": "string", "requestExample": "JSON string or null", "responseExample": "JSON string"}
  ],
  "databaseTables": [
    {"tableName": "string", "fields": [{"name": "string", "type": "string", "constraints": "string"}], "relationships": "string"}
  ],
  "roadmap": [
    {"phase": "string", "timeBox": "string e.g. Hour 0-2", "tasks": ["specific task 1", "specific task 2"]}
  ],
  "testingChecklist": ["specific test item 1", "specific test item 2"],
  "risks": [
    {"risk": "string", "mitigation": "string", "severity": "low|medium|high"}
  ],
  "demoScript": "string — step-by-step demo walkthrough for judges",
  "judgingPitch": "string — 30-second elevator pitch for judges"
}

Requirements:
- mvpFeatures should have 4-6 items achievable in ${req.duration}
- futureFeatures should have 3-5 post-hackathon ideas
- techStack should cover: Frontend, Backend, Database, AI/ML (if applicable), Deployment, plus any relevant categories
- mermaidDiagram must be valid Mermaid syntax using graph TD with quoted labels if they contain special chars
- apiEndpoints should have 4-7 relevant endpoints
- databaseTables should have 2-5 tables with proper field definitions
- roadmap should map to the ${req.duration} timeframe with realistic phases
- risks should have 3-5 items with actionable mitigations
- testingChecklist should have 5-8 specific test cases
- Tailor complexity to ${req.skillLevel} skill level
- All string values must be properly JSON-escaped`;
}
