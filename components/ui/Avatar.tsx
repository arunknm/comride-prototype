type AvatarSize = "sm" | "md" | "lg";

export default function Avatar({
  initials,
  size = "md",
  bordered = false,
  src,
}: {
  initials?: string;
  size?: AvatarSize;
  bordered?: boolean;
  src?: string;
}) {
  const sizes: Record<AvatarSize, string> = {
    sm: "size-8 text-[9px]",
    md: "size-10 text-[11px]",
    lg: "size-16 text-lg",
  };

  const borderStyles = bordered
    ? size === "lg"
      ? "border-2 border-primary"
      : "border border-outline-variant/30"
    : "";

  return (
    <div
      className={`rounded-full bg-surface-container-highest flex items-center justify-center overflow-hidden ${sizes[size]} ${borderStyles}`}
    >
      {src ? (
        <img src={src} alt="" className="w-full h-full object-cover" />
      ) : (
        <span className={`font-headline font-bold ${bordered && size === "lg" ? "text-primary" : "text-on-surface-variant"}`}>
          {initials}
        </span>
      )}
    </div>
  );
}
