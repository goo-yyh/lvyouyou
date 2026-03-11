import { useYouyouStore } from "@/stores/youyou-store";
import { Button } from "@/components/ui/button";

interface SectionCardProps {
  name: string;
  icon: string;
  description: string;
  type: "folder" | "file";
}

export function SectionCard({ name, icon, description, type }: SectionCardProps) {
  const { activeSection, setActiveSection, listDir, readFile } =
    useYouyouStore();
  const isActive = activeSection === name;

  const handleClick = async () => {
    if (isActive) {
      setActiveSection(null);
      return;
    }
    setActiveSection(name);
    if (type === "folder") {
      await listDir(name);
    } else {
      await readFile(name);
    }
  };

  return (
    <Button
      variant="outline"
      onClick={handleClick}
      className={`flex h-auto flex-col items-start gap-1 p-4 text-left md-border transition-all duration-120 hover:bg-md-blue/10 ${
        isActive ? "bg-md-blue/15 md-shadow" : "hover:md-shadow"
      }`}
    >
      <div className="flex w-full items-center gap-2">
        <span className="text-lg">{icon}</span>
        <span className="font-semibold text-foreground">{name}</span>
        <span className="ml-auto text-[10px] uppercase tracking-widest text-muted-foreground">
          {type}
        </span>
      </div>
      <span className="text-xs text-muted-foreground">{description}</span>
    </Button>
  );
}
