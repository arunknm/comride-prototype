import { Info, X } from "lucide-react";
import { ReactNode } from "react";

export default function AlertBanner({
  children,
  variant = "info",
  onDismiss,
}: {
  children: ReactNode;
  variant?: "info" | "error" | "success";
  onDismiss?: () => void;
}) {
  const colors = {
    info: { bg: "bg-primary/10", border: "border-primary", icon: "text-primary" },
    error: { bg: "bg-error/10", border: "border-error", icon: "text-error" },
    success: { bg: "bg-success/10", border: "border-success", icon: "text-success" },
  };

  const c = colors[variant];

  return (
    <div className={`${c.bg} border-l-4 ${c.border} rounded-r-[48px] py-4 pl-5 pr-4 flex items-center justify-between`}>
      <div className="flex items-center gap-3">
        <Info className={`w-5 h-5 ${c.icon} shrink-0`} />
        <span className="font-body font-medium text-[14px] text-white">{children}</span>
      </div>
      {onDismiss && (
        <button onClick={onDismiss} className="shrink-0 ml-3">
          <X className="w-3 h-3 text-on-surface-variant" />
        </button>
      )}
    </div>
  );
}
