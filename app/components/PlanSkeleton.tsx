"use client";

export default function PlanSkeleton() {
  return (
    <div
      className="animate-fade-in-up"
      style={{ maxWidth: 900, margin: "0 auto", padding: "0 1rem 5rem" }}
    >
      {/* Progress card */}
      <div
        className="glass-card"
        style={{ padding: "1.25rem 1.5rem", marginBottom: "1.5rem", display: "flex", alignItems: "center", gap: "1rem" }}
      >
        <div style={{ display: "flex", gap: "6px" }}>
          <span className="bounce-dot" style={{ background: "#8b5cf6" }} />
          <span className="bounce-dot" style={{ background: "#8b5cf6" }} />
          <span className="bounce-dot" style={{ background: "#8b5cf6" }} />
        </div>
        <div>
          <p style={{ fontSize: "0.9rem", fontWeight: 600, color: "#f1f5f9", marginBottom: "0.2rem" }}>
            Analyzing your idea with Gemma AI…
          </p>
          <p style={{ fontSize: "0.78rem", color: "#64748b" }}>
            Generating architecture, APIs, roadmap and pitch. Usually takes 15–40 seconds.
          </p>
        </div>
      </div>

      {/* Tab row skeleton */}
      <div style={{ display: "flex", gap: "8px", marginBottom: "1.25rem", overflowX: "auto", paddingBottom: "4px" }}>
        {[90, 80, 100, 120, 90, 100, 90, 80].map((w, i) => (
          <div
            key={i}
            className="skeleton"
            style={{ width: w, height: 38, flexShrink: 0, borderRadius: 10 }}
          />
        ))}
      </div>

      {/* Content skeleton */}
      <div className="glass-card" style={{ padding: "2rem" }}>
        {/* Heading */}
        <div className="skeleton" style={{ height: 28, width: "55%", marginBottom: "1.5rem" }} />

        {/* Two-col cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6">
          <div className="skeleton" style={{ height: 100, borderRadius: 12 }} />
          <div className="skeleton" style={{ height: 100, borderRadius: 12 }} />
        </div>

        {/* Lines */}
        {[100, 85, 90, 75].map((w, i) => (
          <div
            key={i}
            className="skeleton"
            style={{ height: 14, width: `${w}%`, marginBottom: "0.75rem", borderRadius: 6 }}
          />
        ))}

        {/* Feature cards row */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 mt-6">
          {[1, 2, 3].map((i) => (
            <div key={i} className="skeleton" style={{ height: 90, borderRadius: 12 }} />
          ))}
        </div>
      </div>
    </div>
  );
}
