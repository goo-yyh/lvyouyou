import { useYouyouStore } from "@/stores/youyou-store";

const SECTION_META: Record<string, { type: "folder" | "file" }> = {
  skills: { type: "folder" },
  tools: { type: "folder" },
  plugins: { type: "folder" },
  prompt: { type: "folder" },
  "AGENT.md": { type: "file" },
  "SOUL.md": { type: "file" },
};

export function DetailPanel() {
  const { activeSection, sectionFiles, fileContent, loading } =
    useYouyouStore();

  if (!activeSection) {
    return (
      <div className="flex h-full items-center justify-center text-muted-foreground">
        <p className="text-sm">Select a section to view details</p>
      </div>
    );
  }

  const meta = SECTION_META[activeSection];

  if (loading) {
    return (
      <div className="flex h-full items-center justify-center">
        <div className="h-5 w-5 animate-spin rounded-full border-2 border-md-blue border-t-transparent" />
      </div>
    );
  }

  if (meta?.type === "file" && fileContent !== null) {
    return (
      <div className="flex h-full flex-col">
        <div className="flex items-center gap-2 border-b-2 border-foreground px-4 py-2">
          <span className="text-xs font-semibold uppercase tracking-widest text-muted-foreground">
            {activeSection}
          </span>
        </div>
        <pre className="flex-1 overflow-auto p-4 text-sm leading-relaxed whitespace-pre-wrap">
          {fileContent}
        </pre>
      </div>
    );
  }

  return (
    <div className="flex h-full flex-col">
      <div className="flex items-center gap-2 border-b-2 border-foreground px-4 py-2">
        <span className="text-xs font-semibold uppercase tracking-widest text-muted-foreground">
          {activeSection}/
        </span>
      </div>
      <div className="flex-1 overflow-auto p-4">
        {sectionFiles.length === 0 ? (
          <p className="text-sm text-muted-foreground">
            Empty directory — add files to get started.
          </p>
        ) : (
          <ul className="space-y-1">
            {sectionFiles.map((f) => (
              <li
                key={f}
                className="flex items-center gap-2 px-3 py-1.5 text-sm md-border bg-card"
              >
                <span className="text-xs text-muted-foreground">-</span>
                {f}
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}
