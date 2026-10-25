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
      className="animate-fade-in-up"
      style={{ maxWidth: 640, margin: "0 auto 1.5rem", padding: "0 1rem" }}
      role="alert"
      aria-live="assertive"
    >
      <div
        style={{
          padding: "1rem 1.25rem",
          borderRadius: "12px",
          background: "rgba(239,68,68,0.1)",
          border: "1px solid rgba(239,68,68,0.3)",
          display: "flex",
          alignItems: "flex-start",
          gap: "0.75rem",
        }}
      >
        <AlertCircle size={16} style={{ color: "#f87171", flexShrink: 0, marginTop: "2px" }} />
        <div style={{ flex: 1, minWidth: 0 }}>
          <p style={{ fontSize: "0.875rem", fontWeight: 600, color: "#fca5a5" }}>{error}</p>
          {details && (
            <p style={{ fontSize: "0.78rem", color: "rgba(252,165,165,0.75)", marginTop: "0.25rem" }}>
              {details}
            </p>
          )}
          {onRetry && (
            <button
              id="retry-button"
              onClick={onRetry}
              style={{
                marginTop: "0.75rem",
                display: "inline-flex",
                alignItems: "center",
                gap: "0.4rem",
                padding: "0.35rem 0.85rem",
                borderRadius: "8px",
                fontSize: "0.78rem",
                fontWeight: 500,
                background: "rgba(239,68,68,0.15)",
                border: "1px solid rgba(239,68,68,0.35)",
                color: "#fca5a5",
                cursor: "pointer",
              }}
            >
              <RotateCcw size={11} />
              Retry
            </button>
          )}
        </div>
        {onDismiss && (
          <button
            onClick={onDismiss}
            style={{
              color: "rgba(252,165,165,0.5)",
              background: "none",
              border: "none",
              cursor: "pointer",
              padding: "2px",
              flexShrink: 0,
            }}
            aria-label="Dismiss error"
          >
            <X size={14} />
          </button>
        )}
      </div>
    </div>
  );
}
