"use client";

import { useState, useEffect } from "react";
import { BookOpen, Trash2, Clock, ChevronDown, ChevronUp } from "lucide-react";
import { SavedPlan } from "@/lib/types";
import { getSavedPlans, deletePlan } from "@/lib/storage";

interface SavedPlansProps {
  onLoad: (plan: SavedPlan) => void;
  refreshTrigger: number;
}

export default function SavedPlans({ onLoad, refreshTrigger }: SavedPlansProps) {
  const [plans, setPlans] = useState<SavedPlan[]>([]);
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    // Intentionally reading from external localStorage on each refreshTrigger change
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setPlans(getSavedPlans());
  }, [refreshTrigger]);

  if (plans.length === 0) return null;

  const handleDelete = (id: string, e: React.MouseEvent) => {
    e.stopPropagation();
    deletePlan(id);
    setPlans(getSavedPlans());
  };

  return (
    <div style={{ maxWidth: 640, margin: "0 auto 2rem", padding: "0 1rem" }}>
      <button
        id="saved-plans-toggle"
        onClick={() => setIsOpen((v) => !v)}
        style={{
          width: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          padding: "0.85rem 1rem",
          borderRadius: "12px",
          background: "rgba(255,255,255,0.03)",
          border: "1px solid rgba(99,102,241,0.15)",
          cursor: "pointer",
          transition: "background 0.15s ease",
        }}
        onMouseEnter={(e) => {
          (e.currentTarget as HTMLButtonElement).style.background = "rgba(99,102,241,0.07)";
        }}
        onMouseLeave={(e) => {
          (e.currentTarget as HTMLButtonElement).style.background = "rgba(255,255,255,0.03)";
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: "0.6rem" }}>
          <BookOpen size={14} style={{ color: "#8b5cf6" }} />
          <span style={{ fontSize: "0.85rem", fontWeight: 500, color: "#cbd5e1" }}>Saved Plans</span>
          <span className="badge" style={{ fontSize: "0.68rem" }}>{plans.length}</span>
        </div>
        {isOpen
          ? <ChevronUp size={14} style={{ color: "#64748b" }} />
          : <ChevronDown size={14} style={{ color: "#64748b" }} />}
      </button>

      {isOpen && (
        <div className="animate-fade-in-up" style={{ marginTop: "0.5rem", display: "flex", flexDirection: "column", gap: "0.5rem" }}>
          {plans.map((p) => (
            <div
              key={p.id}
              className="glass-card"
              onClick={() => onLoad(p)}
              style={{
                padding: "0.85rem 1rem",
                cursor: "pointer",
                display: "flex",
                alignItems: "flex-start",
                justifyContent: "space-between",
                gap: "0.75rem",
              }}
            >
              <div style={{ minWidth: 0 }}>
                <p style={{ fontSize: "0.875rem", fontWeight: 600, color: "#f1f5f9", overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>
                  {p.projectName}
                </p>
                <div style={{ display: "flex", alignItems: "center", gap: "0.5rem", marginTop: "0.3rem" }}>
                  <Clock size={10} style={{ color: "#475569" }} />
                  <span style={{ fontSize: "0.72rem", color: "#475569" }}>
                    {new Date(p.generatedAt).toLocaleDateString()}
                  </span>
                  {p.request?.duration && (
                    <span className="badge" style={{ fontSize: "0.65rem", padding: "1px 7px" }}>
                      {p.request.duration}
                    </span>
                  )}
                </div>
              </div>
              <button
                onClick={(e) => handleDelete(p.id, e)}
                aria-label={`Delete ${p.projectName}`}
                style={{
                  flexShrink: 0,
                  padding: "0.3rem",
                  borderRadius: "6px",
                  background: "none",
                  border: "none",
                  color: "#475569",
                  cursor: "pointer",
                  transition: "color 0.15s, background 0.15s",
                }}
                onMouseEnter={(e) => {
                  const el = e.currentTarget as HTMLButtonElement;
                  el.style.color = "#f87171";
                  el.style.background = "rgba(239,68,68,0.1)";
                }}
                onMouseLeave={(e) => {
                  const el = e.currentTarget as HTMLButtonElement;
                  el.style.color = "#475569";
                  el.style.background = "none";
                }}
              >
                <Trash2 size={13} />
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
