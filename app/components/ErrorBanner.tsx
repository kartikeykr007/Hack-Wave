"use client";

import { AlertCircle, RotateCcw, X } from "lucide-react";

interface ErrorBannerProps {
  error: string;
  details?: string;
  onRetry?: () => void;
  onDismiss?: () => void;
}

export default function ErrorBanner({ error, details, onRetry, onDismiss }: ErrorBannerProps) {
  return (
    <div
      className="max-w-2xl mx-auto px-4 mb-6 animate-fade-in-up"
      role="alert"
      aria-live="assertive"
    >
      <div className="p-4 rounded-xl flex items-start gap-3"
        style={{ background: "rgba(239,68,68,0.1)", border: "1px solid rgba(239,68,68,0.3)" }}>
        <AlertCircle size={16} className="text-red-400 flex-shrink-0 mt-0.5" />
        <div className="flex-1 min-w-0">
          <p className="text-sm font-semibold text-red-300">{error}</p>
          {details && <p className="text-xs text-red-400/80 mt-1">{details}</p>}
          {onRetry && (
            <button
              id="retry-button"
              onClick={onRetry}
              className="mt-3 inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium transition-all duration-200"
              style={{ background: "rgba(239,68,68,0.15)", border: "1px solid rgba(239,68,68,0.3)", color: "#fca5a5" }}
            >
              <RotateCcw size={11} />
              Retry
            </button>
          )}
        </div>
        {onDismiss && (
          <button
            onClick={onDismiss}
            className="flex-shrink-0 p-1 rounded text-red-400/60 hover:text-red-300 transition-colors"
          >
            <X size={14} />
          </button>
        )}
      </div>
    </div>
  );
}
