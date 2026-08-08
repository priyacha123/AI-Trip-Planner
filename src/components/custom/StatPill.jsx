const StatPill = ({ icon: Icon, label, value, variant = "glass" }) => {
  const glass = variant === "glass";
  return (
    <div
      className={`inline-flex items-center gap-1.5 rounded-full border px-3 py-1.5 text-xs ${
        glass
          ? "bg-white/5 border-white/10 text-white/80 backdrop-blur-sm"
          : "bg-muted border-border text-foreground"
      }`}
    >
      {Icon && (
        <Icon className={`h-3.5 w-3.5 ${glass ? "text-white/50" : "text-muted-foreground"}`} />
      )}
      <span className={glass ? "text-white/50" : "text-muted-foreground"}>{label}</span>
      <span className={`font-medium ${glass ? "text-white" : "text-foreground"}`}>{value}</span>
    </div>
  );
};

const StatPillRow = ({ children, className }) => {
  return (
    <div className={`flex flex-wrap items-center justify-center gap-2 ${className || ""}`}>
      {children}
    </div>
  );
};

export { StatPill, StatPillRow };
