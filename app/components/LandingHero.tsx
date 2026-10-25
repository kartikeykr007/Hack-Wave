"use client";

import { useState, useCallback } from "react";
import { Zap, Clock, Code2, Cpu, Layers, Sparkles } from "lucide-react";
import { IdeaRequest } from "@/lib/types";

const SAMPLE_IDEAS: { label: string; icon: React.ReactNode; data: IdeaRequest }[] = [
  {
    label: "AI Study Buddy",
    icon: <Cpu size={14} />,
    data: {
      projectName: "StudyAI",
      description: "An AI-powered study companion that generates personalized quizzes, flashcards, and summaries from any study material (PDFs, notes, YouTube links). Students upload their content and the AI creates adaptive practice tests that focus on weak areas.",
      category: "ai-ml",
      skillLevel: "intermediate",
      duration: "24h",
      technologies: "Next.js, OpenAI, Pinecone, Tailwind CSS",
    },
  },
  {
    label: "Dev Event Finder",
    icon: <Code2 size={14} />,
    data: {
      projectName: "DevConnect",
      description: "A platform where developers can discover local and online hackathons, tech meetups, and open-source sprints. Features include personalized recommendations based on skills and interests, team formation tools, and project showcase.",
      category: "web",
      skillLevel: "beginner",
      duration: "48h",
      technologies: "React, Node.js, MongoDB, Express",
    },
  },
  {
    label: "Smart Budget Tracker",
    icon: <Layers size={14} />,
    data: {
      projectName: "BudgetWise",
      description: "A mobile-first personal finance app that uses AI to categorize expenses automatically, detect spending patterns, and provide actionable savings recommendations. Users can set goals and get smart nudges when they are about to overspend.",
      category: "fintech",
      skillLevel: "advanced",
      duration: "36h",
      technologies: "React Native, FastAPI, PostgreSQL, GPT-4",
    },
  },
  {
    label: "IoT Home Monitor",
    icon: <Zap size={14} />,
    data: {
      projectName: "HomeGuard",
      description: "A smart home monitoring dashboard that aggregates data from IoT sensors (temperature, humidity, motion, energy) and uses ML to detect anomalies, predict maintenance needs, and optimize energy consumption.",
      category: "iot",
      skillLevel: "advanced",
      duration: "48h",
      technologies: "Vue.js, FastAPI, InfluxDB, MQTT, TensorFlow Lite",
    },
  },
];

const FEATURE_HIGHLIGHTS = [
  {
    icon: <Cpu size={20} />,
    title: "Gemma AI-Powered",
    desc: "Uses Google's Gemma model to generate context-aware, realistic plans",
  },
  {
    icon: <Clock size={20} />,
    title: "Time-Boxed Roadmaps",
    desc: "Roadmaps calibrated to your exact hackathon duration",
  },
  {
    icon: <Sparkles size={20} />,
    title: "Full Blueprints",
    desc: "Architecture diagrams, API specs, DB schemas and judging pitches",
  },
];

interface LandingHeroProps {
  onSelectSample: (idea: IdeaRequest) => void;
  onScrollToForm: () => void;
}

export default function LandingHero({ onSelectSample, onScrollToForm }: LandingHeroProps) {
  const [hoveredSample, setHoveredSample] = useState<number | null>(null);

  const handleSampleClick = useCallback((idea: IdeaRequest) => {
    onSelectSample(idea);
    onScrollToForm();
  }, [onSelectSample, onScrollToForm]);

  return (
    <div className="relative pt-20 pb-16 px-4">
      {/* Background decorations */}
      <div
        className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[400px] pointer-events-none"
        style={{
          background: "radial-gradient(ellipse at center, rgba(99,102,241,0.12) 0%, rgba(139,92,246,0.06) 40%, transparent 70%)",
        }}
      />

      {/* Badge */}
      <div className="flex justify-center mb-8 animate-fade-in-up">
        <div className="badge gap-2 px-4 py-2 text-sm">
          <Sparkles size={14} className="text-purple-400" />
          <span>Powered by Google Gemma AI</span>
        </div>
      </div>

      {/* Headline */}
      <div className="text-center max-w-4xl mx-auto animate-fade-in-up animate-delay-100">
        <h1 className="text-5xl sm:text-6xl lg:text-7xl font-bold tracking-tight leading-tight mb-6">
          <span className="text-white">Turn your idea into a</span>
          <br />
          <span className="gradient-text">winning blueprint</span>
        </h1>
        <p className="text-xl text-slate-400 max-w-2xl mx-auto leading-relaxed mb-10">
          Hackathon Copilot uses AI to transform your project idea into a complete, 
          actionable software development plan — with architecture, APIs, database 
          schemas and a judging pitch.
        </p>

        {/* CTA Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center mb-16">
          <button
            id="hero-cta-button"
            onClick={onScrollToForm}
            className="btn-gradient inline-flex items-center justify-center gap-2 px-8 py-4 rounded-xl text-base font-semibold"
          >
            <Sparkles size={18} />
            Generate My Plan
          </button>
          <button
            onClick={() => handleSampleClick(SAMPLE_IDEAS[0].data)}
            className="inline-flex items-center justify-center gap-2 px-8 py-4 rounded-xl text-base font-medium border border-indigo-500/30 text-indigo-300 hover:bg-indigo-500/10 transition-all duration-200"
          >
            <Zap size={18} />
            Try a Sample Idea
          </button>
        </div>
      </div>

      {/* Feature highlights */}
      <div className="max-w-3xl mx-auto grid grid-cols-1 sm:grid-cols-3 gap-4 mb-16 animate-fade-in-up animate-delay-200">
        {FEATURE_HIGHLIGHTS.map((f, i) => (
          <div key={i} className="glass-card p-5 text-center">
            <div className="inline-flex items-center justify-center w-10 h-10 rounded-lg mb-3"
              style={{ background: "rgba(99,102,241,0.15)", color: "#a78bfa" }}>
              {f.icon}
            </div>
            <h3 className="text-sm font-semibold text-white mb-1">{f.title}</h3>
            <p className="text-xs text-slate-400 leading-relaxed">{f.desc}</p>
          </div>
        ))}
      </div>

      {/* Sample ideas */}
      <div className="max-w-3xl mx-auto animate-fade-in-up animate-delay-300">
        <p className="text-center text-sm text-slate-500 mb-4 uppercase tracking-wider font-medium">
          Quick-start with a sample idea
        </p>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
          {SAMPLE_IDEAS.map((s, i) => (
            <button
              key={i}
              id={`sample-idea-${i}`}
              onClick={() => handleSampleClick(s.data)}
              onMouseEnter={() => setHoveredSample(i)}
              onMouseLeave={() => setHoveredSample(null)}
              className="glass-card p-4 text-left transition-all duration-200 cursor-pointer"
              style={{
                borderColor: hoveredSample === i ? "rgba(139,92,246,0.5)" : undefined,
                background: hoveredSample === i ? "rgba(99,102,241,0.1)" : undefined,
              }}
            >
              <div className="flex items-center gap-2 mb-2">
                <span style={{ color: "#a78bfa" }}>{s.icon}</span>
                <span className="text-xs text-slate-400">Sample</span>
              </div>
              <p className="text-sm font-medium text-white leading-tight">{s.label}</p>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
