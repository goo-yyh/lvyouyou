import { useEffect } from "react";
import { useYouyouStore } from "@/stores/youyou-store";
import { StatusBadge } from "@/components/status-badge";
import { SectionCard } from "@/components/section-card";
import { DetailPanel } from "@/components/detail-panel";

const SECTIONS = [
  { name: "skills", icon: "\u2692\uFE0F", description: "Reusable agent skills", type: "folder" as const },
  { name: "tools", icon: "\uD83D\uDD27", description: "External tool integrations", type: "folder" as const },
  { name: "plugins", icon: "\uD83E\uDDE9", description: "Plugin extensions", type: "folder" as const },
  { name: "prompt", icon: "\uD83D\uDCAC", description: "Prompt templates", type: "folder" as const },
  { name: "AGENT.md", icon: "\uD83E\uDD16", description: "Agent behavior config", type: "file" as const },
  { name: "SOUL.md", icon: "\u2728", description: "Agent personality & values", type: "file" as const },
];

function App() {
  const { status, loading, error, fetchStatus } = useYouyouStore();

  useEffect(() => {
    fetchStatus();
  }, [fetchStatus]);

  return (
    <div className="flex h-screen flex-col overflow-hidden">
      {/* Header */}
      <header className="flex items-center justify-between border-b-2 border-foreground px-6 py-4">
        <div className="flex items-center gap-3">
          <h1 className="text-xl font-bold uppercase tracking-wider">
            YouYouJiang
          </h1>
          <span className="text-xs text-muted-foreground tracking-wide">
            v0.1.0
          </span>
        </div>
        {status && <StatusBadge created={status.created} />}
      </header>

      {/* Error banner */}
      {error && (
        <div className="bg-md-red/10 border-b-2 border-md-red px-6 py-2 text-sm text-md-red">
          {error}
        </div>
      )}

      {/* Loading state */}
      {loading && !status && (
        <div className="flex flex-1 items-center justify-center">
          <div className="flex flex-col items-center gap-3">
            <div className="h-8 w-8 animate-spin rounded-full border-2 border-md-blue border-t-transparent" />
            <p className="text-sm text-muted-foreground">Initializing...</p>
          </div>
        </div>
      )}

      {/* Main content */}
      {status && (
        <div className="flex flex-1 overflow-hidden">
          {/* Sidebar — section navigation */}
          <aside className="flex w-80 flex-col gap-2 overflow-y-auto border-r-2 border-foreground p-4">
            <p className="mb-2 text-[10px] font-semibold uppercase tracking-widest text-muted-foreground">
              ~/.youyou
            </p>
            <p className="mb-3 truncate text-xs text-muted-foreground">
              {status.path}
            </p>
            {SECTIONS.map((s) => (
              <SectionCard key={s.name} {...s} />
            ))}
          </aside>

          {/* Detail panel */}
          <main className="flex-1 overflow-hidden">
            <DetailPanel />
          </main>
        </div>
      )}
    </div>
  );
}

export default App;
