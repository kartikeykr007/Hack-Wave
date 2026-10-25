"use client";

export default function PlanSkeleton() {
  return (
    <div className="max-w-5xl mx-auto px-4 pb-20 animate-fade-in-up">
      {/* Progress messages */}
      <div className="glass-card p-6 mb-6 flex items-center gap-4">
        <div className="flex gap-1">
          <span className="bounce-dot w-2.5 h-2.5 rounded-full bg-purple-400 inline-block" />
          <span className="bounce-dot w-2.5 h-2.5 rounded-full bg-purple-400 inline-block" />
          <span className="bounce-dot w-2.5 h-2.5 rounded-full bg-purple-400 inline-block" />
        </div>
        <div>
          <p className="text-sm font-medium text-white">Analyzing your idea with Gemma AI…</p>
          <p className="text-xs text-slate-400 mt-0.5">Generating architecture, APIs, roadmap and pitch. This usually takes 15–30 seconds.</p>
        </div>
      </div>

      {/* Tab skeletons */}
      <div className="flex gap-2 mb-6 overflow-x-auto pb-2">
        {[120, 100, 110, 130, 100, 120, 100].map((w, i) => (
          <div key={i} className="skeleton h-9 rounded-lg flex-shrink-0" style={{ width: w }} />
        ))}
      </div>

      {/* Content skeleton */}
      <div className="glass-card p-6 space-y-4">
        <div className="skeleton h-7 w-2/3 rounded-lg" />
        <div className="skeleton h-4 w-full rounded" />
        <div className="skeleton h-4 w-4/5 rounded" />
        <div className="skeleton h-4 w-3/4 rounded" />

        <div className="pt-4 grid grid-cols-1 sm:grid-cols-3 gap-4">
          {[1, 2, 3].map((i) => (
            <div key={i} className="skeleton h-28 rounded-lg" />
          ))}
        </div>

        <div className="pt-2 space-y-3">
          {[1, 2, 3, 4].map((i) => (
            <div key={i} className="flex items-start gap-3">
              <div className="skeleton w-5 h-5 rounded-full flex-shrink-0 mt-0.5" />
              <div className="flex-1 space-y-1.5">
                <div className="skeleton h-4 rounded" style={{ width: `${70 + i * 5}%` }} />
                <div className="skeleton h-3 rounded w-1/2" />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
