"use client";

import { useEffect, useRef, useState } from "react";
import CopyButton from "./CopyButton";
import { AlertCircle } from "lucide-react";

interface MermaidDiagramProps {
  source: string;
}

export default function MermaidDiagram({ source }: MermaidDiagramProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [error, setError] = useState<string | null>(null);
  const [rendered, setRendered] = useState(false);

  useEffect(() => {
    if (!source || !containerRef.current) return;

    let cancelled = false;

    async function render() {
      try {
        const mermaid = (await import("mermaid")).default;
        mermaid.initialize({
          startOnLoad: false,
          suppressErrorRendering: true,
          theme: "dark",
          themeVariables: {
            primaryColor: "#6366f1",
            primaryTextColor: "#f1f5f9",
            primaryBorderColor: "#8b5cf6",
            lineColor: "#6366f1",
            sectionBkgColor: "#1e1b4b",
            altSectionBkgColor: "#1e3a5f",
            gridColor: "#334155",
            secondaryColor: "#0f172a",
            tertiaryColor: "#1e293b",
            background: "#0a0f1e",
            mainBkg: "#111827",
            nodeBorder: "#6366f1",
            clusterBkg: "#1e1b4b",
            titleColor: "#a78bfa",
            edgeLabelBackground: "#1e293b",
            fontFamily: "var(--font-geist-sans), system-ui, sans-serif",
          },
          flowchart: {
            htmlLabels: false,
            curve: "basis",
          },
          securityLevel: "strict",
        });

        if (cancelled) return;

        // Clean source of markdown fences or outer backticks
        let cleanSource = source
          .replace(/^```(?:mermaid)?\s*\n?/i, "")
          .replace(/\n?```\s*$/i, "")
          .trim();

        // Ensure valid diagram type header
        if (!/^(graph|flowchart|sequenceDiagram|classDiagram|stateDiagram|erDiagram|journey|gantt|pie|gitGraph)/i.test(cleanSource)) {
          cleanSource = `graph TD\n${cleanSource}`;
        }

        const id = `mermaid-${Date.now()}`;
        const { svg } = await mermaid.render(id, cleanSource);

        if (!cancelled && containerRef.current) {
          containerRef.current.innerHTML = svg;
          // Remove any fixed width/height attributes for responsiveness
          const svgEl = containerRef.current.querySelector("svg");
          if (svgEl) {
            svgEl.removeAttribute("width");
            svgEl.removeAttribute("height");
            svgEl.style.maxWidth = "100%";
            svgEl.style.height = "auto";
          }
          setRendered(true);
          setError(null);
        }
      } catch (err) {
        if (!cancelled) {
          console.error("Mermaid render error:", err);
          // Clean up any stray error elements injected by mermaid into body
          document.querySelectorAll("[id^='dmermaid']").forEach((el) => el.remove());
          setError("Diagram syntax cannot be rendered graphically. Showing architecture source below.");
          setRendered(false);
        }
      }
    }

    render();
    return () => { cancelled = true; };
  }, [source]);

  return (
    <div className="space-y-3">
      <div className="flex items-center justify-between">
        <h3 className="text-sm font-semibold text-slate-300 uppercase tracking-wider">Architecture Diagram</h3>
        <CopyButton text={source} label="Copy Source" />
      </div>

      {error && (
        <div className="flex items-start gap-2 p-3 rounded-lg bg-amber-500/10 border border-amber-500/20">
          <AlertCircle size={14} className="text-amber-400 mt-0.5 flex-shrink-0" />
          <p className="text-xs text-amber-300">{error}</p>
        </div>
      )}

      {!rendered && !error && (
        <div className="skeleton h-48 rounded-lg" />
      )}

      <div
        ref={containerRef}
        className="p-4 rounded-xl overflow-x-auto mermaid-container"
        style={{
          background: "rgba(0,0,0,0.3)",
          border: "1px solid rgba(99,102,241,0.15)",
          display: error ? "none" : "block",
        }}
      />

      {error && (
        <div className="code-block p-4">
          <pre className="whitespace-pre-wrap break-all text-xs">{source}</pre>
        </div>
      )}
    </div>
  );
}
