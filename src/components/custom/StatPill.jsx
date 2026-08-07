const StatPill = ({ icon: Icon, label, value }) => {
  return (
    <div className="inline-flex items-center gap-1.5 rounded-full bg-white/5 border border-white/10 px-3 py-1.5 text-xs text-white/80 backdrop-blur-sm">
      {Icon && <Icon className="h-3.5 w-3.5 text-white/50" />}
      <span className="text-white/50">{label}</span>
      <span className="font-medium text-white">{value}</span>
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
