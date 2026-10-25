"use client";

import { Sparkles, GitFork } from "lucide-react";

export default function Navbar() {
  return (
    <header
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        right: 0,
        zIndex: 50,
        height: "56px",
        display: "flex",
        alignItems: "center",
        background: "rgba(8,13,26,0.85)",
        backdropFilter: "blur(14px)",
        WebkitBackdropFilter: "blur(14px)",
        borderBottom: "1px solid rgba(99,102,241,0.15)",
        padding: "0 1.5rem",
      }}
    >
      <div
        style={{
          maxWidth: 1200,
          margin: "0 auto",
          width: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
        }}
      >
        {/* Brand */}
        <div style={{ display: "flex", alignItems: "center", gap: "0.6rem" }}>
          <div
            style={{
              width: 30,
              height: 30,
              borderRadius: 8,
              background: "linear-gradient(135deg, #6366f1, #8b5cf6)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              flexShrink: 0,
            }}
          >
            <Sparkles size={14} color="#fff" />
          </div>
          <span style={{ fontSize: "0.9rem", fontWeight: 700, color: "#f1f5f9" }}>
            Hackathon Copilot
          </span>
          <span
            className="badge"
            style={{ fontSize: "0.65rem", padding: "2px 8px", display: "none" }}
          >
            Beta
          </span>
        </div>

        {/* Right side */}
        <div style={{ display: "flex", alignItems: "center", gap: "1rem" }}>
          <span
            style={{
              fontSize: "0.75rem",
              color: "#475569",
              display: "none",
            }}
            className="sm-visible"
          >
            Powered by Gemma AI
          </span>
          <a
            href="https://github.com/kartikeykr007/Hack-Wave"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="GitHub repository"
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              width: 34,
              height: 34,
              borderRadius: 8,
              color: "#64748b",
              transition: "color 0.15s, background 0.15s",
              textDecoration: "none",
            }}
            onMouseEnter={(e) => {
              const el = e.currentTarget as HTMLAnchorElement;
              el.style.color = "#f1f5f9";
              el.style.background = "rgba(255,255,255,0.06)";
            }}
            onMouseLeave={(e) => {
              const el = e.currentTarget as HTMLAnchorElement;
              el.style.color = "#64748b";
              el.style.background = "transparent";
            }}
          >
            <GitFork size={16} />
          </a>
        </div>
      </div>
    </header>
  );
}
