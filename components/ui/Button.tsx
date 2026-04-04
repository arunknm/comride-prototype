import { ReactNode } from "react";

type ButtonVariant = "primary" | "secondary" | "tertiary" | "ghost" | "error";
type ButtonSize = "sm" | "md" | "lg";

export default function Button({
  children,
  variant = "primary",
  size = "md",
  disabled = false,
  loading = false,
  className = "",
  onClick,
}: {
  children: ReactNode;
  variant?: ButtonVariant;
  size?: ButtonSize;
  disabled?: boolean;
  loading?: boolean;
  className?: string;
  onClick?: () => void;
}) {
  const base = "rounded-full flex items-center justify-center transition-all active:scale-95 duration-150";

  const variants: Record<ButtonVariant, string> = {
    primary: "bg-primary hover:shadow-[0_0_20px_rgba(226,255,59,0.3)]",
    secondary: "border-2 border-primary",
    tertiary: "bg-surface-container-highest",
    ghost: "",
    error: "bg-error",
  };

  const textColors: Record<ButtonVariant, string> = {
    primary: "text-[#536000]",
    secondary: "text-primary",
    tertiary: "text-white",
    ghost: "text-on-surface-variant",
    error: "text-[#450900]",
  };

  const sizes: Record<ButtonSize, string> = {
    sm: "py-2 px-4",
    md: "h-12 px-8",
    lg: "py-6 px-12 w-full",
  };

  const textSizes: Record<ButtonSize, string> = {
    sm: "text-[10px] tracking-[1px]",
    md: "text-[12px] tracking-[1.2px]",
    lg: "text-[18px] tracking-[1.8px]",
  };

  return (
    <button
      onClick={onClick}
      disabled={disabled || loading}
      className={`${base} ${variants[variant]} ${sizes[size]} ${disabled ? "opacity-50 cursor-not-allowed" : ""} ${className}`}
    >
      {loading && (
        <div className="size-3 border-2 border-transparent border-t-white rounded-full animate-spin mr-2" />
      )}
      <span className={`font-body font-extrabold uppercase ${textColors[variant]} ${textSizes[size]}`}>
        {children}
      </span>
    </button>
  );
}
