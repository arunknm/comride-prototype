export default function GlassCard({
  children,
  className = "",
  onClick,
  elevated = false,
}: {
  children: React.ReactNode;
  className?: string;
  onClick?: () => void;
  elevated?: boolean;
}) {
  return (
    <div
      onClick={onClick}
      className={`${elevated ? "bg-surface-container-high" : "bg-surface-container-low"} rounded-2xl p-6 ${
        onClick
          ? "cursor-pointer hover:bg-surface-container-high hover:scale-[1.01] active:scale-[0.98] transition-all duration-200"
          : "transition-colors duration-200"
      } ${className}`}
    >
      {children}
    </div>
  );
}
