export default function SectionLabel({ children }: { children: string }) {
  return (
    <div className="flex items-center gap-4">
      <div className="h-px w-7 bg-outline-variant" />
      <span className="font-body font-bold text-[10px] tracking-[3.6px] uppercase text-on-surface-variant">
        {children}
      </span>
      <div className="h-px w-7 bg-outline-variant" />
    </div>
  );
}
