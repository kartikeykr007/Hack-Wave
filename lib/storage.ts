import { SavedPlan } from "./types";

const STORAGE_KEY = "hackathon_copilot_plans";

export function getSavedPlans(): SavedPlan[] {
  if (typeof window === "undefined") return [];
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return [];
    return JSON.parse(raw) as SavedPlan[];
  } catch {
    return [];
  }
}

export function savePlan(plan: SavedPlan): void {
  if (typeof window === "undefined") return;
  try {
    const existing = getSavedPlans();
    const updated = [plan, ...existing.filter((p) => p.id !== plan.id)].slice(0, 20);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
  } catch {
    console.error("Failed to save plan to localStorage");
  }
}

export function deletePlan(id: string): void {
  if (typeof window === "undefined") return;
  try {
    const existing = getSavedPlans();
    localStorage.setItem(STORAGE_KEY, JSON.stringify(existing.filter((p) => p.id !== id)));
  } catch {
    console.error("Failed to delete plan from localStorage");
  }
}

export function generateId(): string {
  return `plan_${Date.now()}_${Math.random().toString(36).slice(2, 7)}`;
}
