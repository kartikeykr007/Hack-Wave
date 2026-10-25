"use client";

import { useState, useCallback } from "react";
import { Clock, Cpu, Layers, Sparkles, FlaskConical } from "lucide-react";
import { IdeaRequest } from "@/lib/types";
import FluxLines from "@/components/FluxLines";
import AnimatedContent from "@/components/AnimatedContent";

// ─── Sample ideas ─────────────────────────────────────────────────────────────
const SAMPLE_IDEAS: { label: string; emoji: string; data: IdeaRequest }[] = [
  {
    label: "AI Study Buddy",
    emoji: "🧠",
    data: {
      projectName: "StudyAI",
      description:
        "An AI-powered study companion that generates personalized quizzes, flashcards, and summaries from any study material (PDFs, notes, YouTube links). Students upload their content and the AI creates adaptive practice tests that focus on weak areas.",
      category: "ai-ml",
      skillLevel: "intermediate",
      duration: "24h",
      technologies: "Next.js, OpenAI, Pinecone, Tailwind CSS",
    },
  },
  {
    label: "Dev Event Finder",
    emoji: "📅",
    data: {
      projectName: "DevConnect",
      description:
        "A platform where developers can discover local and online hackathons, tech meetups, and open-source sprints. Features include personalized recommendations based on skills and interests, team formation tools, and project showcase.",
      category: "web",
      skillLevel: "beginner",
      duration: "48h",
      technologies: "React, Node.js, MongoDB, Express",
    },
  },
  {
    label: "Smart Budget Tracker",
    emoji: "💰",
    data: {
      projectName: "BudgetWise",
      description:
        "A mobile-first personal finance app that uses AI to categorize expenses automatically, detect spending patterns, and provide actionable savings recommendations. Users can set goals and get smart nudges when they are about to overspend.",
      category: "fintech",
      skillLevel: "advanced",
      duration: "36h",
      technologies: "React Native, FastAPI, PostgreSQL, GPT-4",
    },
  },
  {
    label: "IoT Home Monitor",
    emoji: "🏠",
    data: {
      projectName: "HomeGuard",
      description:
        "A smart home monitoring dashboard that aggregates data from IoT sensors (temperature, humidity, motion, energy) and uses ML to detect anomalies, predict maintenance needs, and optimize energy consumption.",
      category: "iot",
      skillLevel: "advanced",
      duration: "48h",
      technologies: "Vue.js, FastAPI, InfluxDB, MQTT, TensorFlow Lite",
    },
  },
];

const PILLARS = [
  {
    icon: <Cpu size={18} />,
    title: "Gemma AI-Powered",
    desc: "Generates context-aware, realistic plans using Google's Gemma model",
  },
  {
    icon: <Clock size={18} />,
    title: "Time-Boxed Roadmaps",
    desc: "Calibrated precisely to your hackathon duration",
  },
  {
    icon: <Layers size={18} />,
    title: "Complete Blueprints",
    desc: "Architecture diagrams, API specs, DB schemas, and judging pitches",
  },
];

interface LandingHeroProps {
  onSelectSample: (idea: IdeaRequest) => void;
  onScrollToForm: () => void;
  onDemoMode: () => void;
}

export default function LandingHero({
  onSelectSample,
  onScrollToForm,
  onDemoMode,
}: LandingHeroProps) {
  const [hoveredSample, setHoveredSample] = useState<number | null>(null);

  const handleSampleClick = useCallback(
    (idea: IdeaRequest) => {
      onSelectSample(idea);
      onScrollToForm();
    },
    [onSelectSample, onScrollToForm]
  );

  return (
    <section className="relative pt-24 pb-12 px-4 overflow-hidden">
      {/* Background FluxLines dynamic fluid effect */}
      <div
        className="absolute inset-0 pointer-events-none overflow-hidden"
        style={{
          zIndex: 0,
          opacity: 0.85,
          maskImage:
            "radial-gradient(ellipse 100% 85% at 50% 25%, black 60%, transparent 100%)",
          WebkitMaskImage:
            "radial-gradient(ellipse 100% 85% at 50% 25%, black 60%, transparent 100%)",
        }}
        aria-hidden="true"
      >
        <FluxLines
          colors={["#818cf8", "#c084fc", "#38bdf8", "#ffffff"]}
          glow={2.5}
          rimWidth={0.22}
          lineWidth={1.2}
          speed={0.45}
          scale={1.5}
          turbulence={0.85}
          flowDirection="down"
          mouseInteraction
          clickSwirl
          transparent
        />
      </div>

      {/* Subtle top glow */}
      <div
        aria-hidden="true"
        style={{
          position: "absolute",
          top: 0,
          left: "50%",
          transform: "translateX(-50%)",
          width: 700,
          height: 300,
          background:
            "radial-gradient(ellipse at center top, rgba(99,102,241,0.18) 0%, transparent 65%)",
          pointerEvents: "none",
        }}
      />

      {/* ── Badge, Headline & CTA ─────────────────────────────────────────────── */}
      <AnimatedContent
        distance={40}
        direction="vertical"
        duration={0.8}
        ease="power3.out"
        trigger="mount"
        className="relative z-10"
      >
        <div className="flex justify-center mb-7">
          <div
            className="badge gap-2 px-4 py-2"
            style={{ fontSize: "0.8rem" }}
          >
            <Sparkles size={12} style={{ color: "#a78bfa" }} />
            Powered by Google Gemma AI
          </div>
        </div>

        <div
          className="text-center"
          style={{ maxWidth: 720, margin: "0 auto" }}
        >
          <h1
            style={{
              fontSize: "clamp(2.4rem, 6vw, 4.5rem)",
              fontWeight: 800,
              lineHeight: 1.1,
              letterSpacing: "-0.03em",
              marginBottom: "1.25rem",
            }}
          >
            <span style={{ color: "#f1f5f9" }}>Turn your idea into a </span>
            <span className="gradient-text">winning blueprint</span>
          </h1>
          <p
            style={{
              fontSize: "1.1rem",
              color: "#94a3b8",
              lineHeight: 1.7,
              maxWidth: 560,
              margin: "0 auto 2.5rem",
            }}
          >
            Paste your hackathon concept and get a complete software development
            plan — architecture, APIs, database schemas, roadmap and a judging
            pitch — in under 30 seconds.
          </p>

          {/* ── CTA buttons ────────────────────────────────────────────── */}
          <div
            style={{
              display: "flex",
              gap: "0.75rem",
              justifyContent: "center",
              flexWrap: "wrap",
              marginBottom: "3.5rem",
            }}
          >
            <button
              id="hero-cta-button"
              onClick={onScrollToForm}
              className="btn-gradient"
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: "0.5rem",
                padding: "0.85rem 2rem",
                borderRadius: "12px",
                fontSize: "0.95rem",
              }}
            >
              <Sparkles size={16} />
              Generate My Plan
            </button>

            <button
              id="demo-mode-button"
              onClick={onDemoMode}
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: "0.5rem",
                padding: "0.85rem 2rem",
                borderRadius: "12px",
                fontSize: "0.95rem",
                fontWeight: 500,
                border: "1px solid rgba(99,102,241,0.35)",
                color: "#a5b4fc",
                background: "rgba(99,102,241,0.08)",
                cursor: "pointer",
                transition: "all 0.2s ease",
              }}
              onMouseEnter={(e) => {
                (e.currentTarget as HTMLButtonElement).style.background =
                  "rgba(99,102,241,0.15)";
              }}
              onMouseLeave={(e) => {
                (e.currentTarget as HTMLButtonElement).style.background =
                  "rgba(99,102,241,0.08)";
              }}
            >
              <FlaskConical size={16} />
              Preview Demo
            </button>
          </div>
        </div>
      </AnimatedContent>

      {/* ── Pillars ───────────────────────────────────────────────────── */}
      <AnimatedContent
        distance={35}
        direction="vertical"
        duration={0.7}
        ease="power3.out"
        stagger={0.1}
        delay={0.15}
        trigger="mount"
        className="relative z-10"
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))",
          gap: "1rem",
          maxWidth: 720,
          margin: "0 auto 3rem",
        }}
      >
        {PILLARS.map((p, i) => (
          <div key={i} className="glass-card" style={{ padding: "1.25rem", textAlign: "center" }}>
            <div
              style={{
                display: "inline-flex",
                alignItems: "center",
                justifyContent: "center",
                width: 40,
                height: 40,
                borderRadius: 10,
                background: "rgba(99,102,241,0.18)",
                color: "#a78bfa",
                marginBottom: "0.6rem",
              }}
            >
              {p.icon}
            </div>
            <p style={{ fontSize: "0.85rem", fontWeight: 600, color: "#f1f5f9", marginBottom: "0.25rem" }}>
              {p.title}
            </p>
            <p style={{ fontSize: "0.75rem", color: "#64748b", lineHeight: 1.5 }}>{p.desc}</p>
          </div>
        ))}
      </AnimatedContent>

      {/* ── Sample ideas ─────────────────────────────────────────────── */}
      <AnimatedContent
        distance={30}
        direction="vertical"
        duration={0.7}
        ease="power3.out"
        delay={0.25}
        trigger="mount"
        className="relative z-10"
        style={{ maxWidth: 720, margin: "0 auto" }}
      >
        <p
          style={{
            textAlign: "center",
            fontSize: "0.72rem",
            letterSpacing: "0.08em",
            textTransform: "uppercase",
            color: "#475569",
            fontWeight: 600,
            marginBottom: "0.85rem",
          }}
        >
          Or quick-start with a sample idea
        </p>
        <AnimatedContent
          distance={25}
          direction="vertical"
          duration={0.6}
          ease="power3.out"
          stagger={0.08}
          trigger="mount"
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(150px, 1fr))",
            gap: "0.75rem",
          }}
        >
          {SAMPLE_IDEAS.map((s, i) => (
            <button
              key={i}
              id={`sample-idea-${i}`}
              onClick={() => handleSampleClick(s.data)}
              onMouseEnter={() => setHoveredSample(i)}
              onMouseLeave={() => setHoveredSample(null)}
              className="glass-card"
              style={{
                padding: "0.9rem 1rem",
                textAlign: "left",
                cursor: "pointer",
                background:
                  hoveredSample === i
                    ? "rgba(99,102,241,0.12)"
                    : "rgba(13,21,48,0.75)",
                borderColor:
                  hoveredSample === i
                    ? "rgba(139,92,246,0.5)"
                    : "rgba(99,102,241,0.18)",
                transition: "all 0.2s ease",
                border: `1px solid ${hoveredSample === i ? "rgba(139,92,246,0.5)" : "rgba(99,102,241,0.18)"}`,
              }}
            >
              <div style={{ fontSize: "1.4rem", marginBottom: "0.4rem" }}>{s.emoji}</div>
              <p style={{ fontSize: "0.82rem", fontWeight: 600, color: "#e2e8f0" }}>{s.label}</p>
              <p style={{ fontSize: "0.7rem", color: "#64748b", marginTop: "0.2rem" }}>
                {s.data.duration} · {s.data.skillLevel}
              </p>
            </button>
          ))}
        </AnimatedContent>
      </AnimatedContent>
    </section>
  );
}
