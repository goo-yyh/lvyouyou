interface StatusBadgeProps {
  created: boolean;
}

export function StatusBadge({ created }: StatusBadgeProps) {
  return (
    <span
      className={`inline-flex items-center gap-1.5 px-3 py-1 text-xs font-semibold uppercase tracking-wider md-border ${
        created
          ? "bg-md-teal text-md-dark"
          : "bg-md-blue text-md-dark"
      }`}
    >
      <span
        className={`h-1.5 w-1.5 rounded-full ${
          created ? "bg-emerald-700" : "bg-blue-700"
        }`}
      />
      {created ? "Just Created" : "Ready"}
    </span>
  );
}
