"use client";

import { Sparkles, GitFork } from "lucide-react";

export default function Navbar() {
  return (
    <header
      className="fixed top-0 left-0 right-0 z-50"
      style={{
        background: "rgba(10,15,30,0.85)",
        backdropFilter: "blur(12px)",
        borderBottom: "1px solid rgba(99,102,241,0.15)",
      }}
    >
      <div className="max-w-6xl mx-auto px-4 sm:px-6 flex items-center justify-between h-14">
        <div className="flex items-center gap-2.5">
          <div className="w-7 h-7 rounded-lg flex items-center justify-center"
            style={{ background: "linear-gradient(135deg, #6366f1, #8b5cf6)" }}>
            <Sparkles size={14} className="text-white" />
          </div>
          <span className="text-sm font-bold text-white">Hackathon Copilot</span>
          <span className="badge text-xs hidden sm:inline-flex">Beta</span>
        </div>

        <div className="flex items-center gap-3">
          <span className="hidden sm:block text-xs text-slate-500">Powered by Gemma AI</span>
          <a
            href="https://github.com"
            target="_blank"
            rel="noopener noreferrer"
            className="p-2 rounded-lg text-slate-400 hover:text-white hover:bg-white/10 transition-all duration-200"
            aria-label="GitHub"
          >
            <GitFork size={16} />
          </a>
        </div>
      </div>
    </header>
  );
}
