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
    <div className="max-w-2xl mx-auto px-4 mb-8">
      <button
        id="saved-plans-toggle"
        onClick={() => setIsOpen((v) => !v)}
        className="w-full flex items-center justify-between p-4 rounded-xl transition-all duration-200"
        style={{
          background: "rgba(255,255,255,0.03)",
          border: "1px solid rgba(255,255,255,0.06)",
        }}
      >
        <div className="flex items-center gap-2">
          <BookOpen size={14} className="text-purple-400" />
          <span className="text-sm font-medium text-slate-300">Saved Plans</span>
          <span className="badge text-xs">{plans.length}</span>
        </div>
        {isOpen ? <ChevronUp size={14} className="text-slate-400" /> : <ChevronDown size={14} className="text-slate-400" />}
      </button>

      {isOpen && (
        <div className="mt-2 space-y-2 animate-fade-in-up">
          {plans.map((p) => (
            <div
              key={p.id}
              className="glass-card p-4 cursor-pointer flex items-start justify-between gap-3"
              onClick={() => onLoad(p)}
            >
              <div className="min-w-0">
                <p className="text-sm font-semibold text-white truncate">{p.projectName}</p>
                <div className="flex items-center gap-2 mt-1">
                  <Clock size={10} className="text-slate-500" />
                  <p className="text-xs text-slate-500">
                    {new Date(p.generatedAt).toLocaleDateString()}
                  </p>
                  <span className="badge text-xs">{p.request?.duration || ""}</span>
                </div>
              </div>
              <button
                onClick={(e) => handleDelete(p.id, e)}
                className="flex-shrink-0 p-1.5 rounded-lg text-slate-500 hover:text-red-400 hover:bg-red-400/10 transition-all duration-200"
                title="Delete plan"
              >
                <Trash2 size={12} />
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
