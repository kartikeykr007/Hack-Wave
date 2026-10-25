import { NextRequest, NextResponse } from "next/server";
import { GoogleGenAI } from "@google/genai";
import { IdeaRequestSchema, ProjectPlanSchema, GenerateResponse, GenerateError } from "@/lib/types";
import { buildHackathonPrompt } from "@/lib/prompts";


function extractJSON(text: string): string {
  // Try to find a JSON object in the text
  const jsonMatch = text.match(/\{[\s\S]*\}/);
  if (jsonMatch) return jsonMatch[0];
  return text.trim();
}

export async function POST(req: NextRequest): Promise<NextResponse<GenerateResponse | GenerateError>> {
  // ── Validate env ──────────────────────────────────────────────────────────
  const apiKey = process.env.GEMINI_API_KEY;
  const modelName = process.env.GEMMA_MODEL || "gemma-3-27b-it";

  if (!apiKey) {
    return NextResponse.json(
      { error: "Server configuration error", details: "API key not configured" },
      { status: 500 }
    );
  }

  // ── Parse & validate request ──────────────────────────────────────────────
  let body: unknown;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json(
      { error: "Invalid request body", details: "Expected valid JSON" },
      { status: 400 }
    );
  }

  const parseResult = IdeaRequestSchema.safeParse(body);
  if (!parseResult.success) {
    return NextResponse.json(
      {
        error: "Validation failed",
        details: parseResult.error.issues.map((i) => i.message).join("; "),
      },
      { status: 400 }
    );
  }

  const ideaRequest = parseResult.data;

  // ── Build prompt ──────────────────────────────────────────────────────────
  const prompt = buildHackathonPrompt(ideaRequest);

  // ── Call Gemma ────────────────────────────────────────────────────────────
  try {
    const ai = new GoogleGenAI({ apiKey });

    const response = await ai.models.generateContent({
      model: modelName,
      contents: prompt,
      config: {
        temperature: 0.7,
        maxOutputTokens: 8192,
        topP: 0.9,
        topK: 40,
      },
    });

    const rawText = response.text ?? "";

    if (!rawText) {
      return NextResponse.json(
        { error: "Empty response from model", details: "The model returned no content" },
        { status: 502 }
      );
    }

    // ── Parse JSON ────────────────────────────────────────────────────────
    let parsed: unknown;
    try {
      const jsonStr = extractJSON(rawText);
      parsed = JSON.parse(jsonStr);
    } catch {
      console.error("Failed to parse model JSON:", rawText.slice(0, 500));
      return NextResponse.json(
        {
          error: "Failed to parse plan",
          details: "The AI returned an invalid JSON response. Please retry.",
        },
        { status: 502 }
      );
    }

    // ── Validate model output ─────────────────────────────────────────────
    const planResult = ProjectPlanSchema.safeParse(parsed);
    if (!planResult.success) {
      console.error("Plan validation failed:", planResult.error.issues);
      return NextResponse.json(
        {
          error: "Plan validation failed",
          details: `The generated plan was incomplete: ${planResult.error.issues.slice(0, 3).map((i) => i.message).join("; ")}`,
        },
        { status: 502 }
      );
    }

    return NextResponse.json({
      plan: planResult.data,
      modelUsed: modelName,
      generatedAt: new Date().toISOString(),
    });
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : "Unknown error";
    console.error("Gemma API error:", message);

    if (message.includes("429") || message.toLowerCase().includes("rate")) {
      return NextResponse.json(
        { error: "Rate limit exceeded", details: "Please wait a moment and try again." },
        { status: 429 }
      );
    }
    if (message.includes("401") || message.toLowerCase().includes("api key")) {
      return NextResponse.json(
        { error: "Authentication failed", details: "Invalid API key configuration." },
        { status: 401 }
      );
    }
    if (message.toLowerCase().includes("timeout") || message.includes("408")) {
      return NextResponse.json(
        { error: "Request timed out", details: "The model took too long. Please retry." },
        { status: 504 }
      );
    }

    return NextResponse.json(
      { error: "Generation failed", details: "An unexpected error occurred. Please retry." },
      { status: 500 }
    );
  }
}

export async function GET(): Promise<NextResponse> {
  return NextResponse.json(
    { error: "Method not allowed", details: "Use POST to generate a plan." },
    { status: 405 }
  );
}
