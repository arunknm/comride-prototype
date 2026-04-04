export function SkeletonCircle({ size = 48 }: { size?: number }) {
  return (
    <div
      className="rounded-full bg-surface-container-highest animate-pulse"
      style={{ width: size, height: size }}
    />
  );
}

export function SkeletonLine({ width = 71, height = 12 }: { width?: number; height?: number }) {
  return (
    <div
      className="rounded-full bg-surface-container-highest animate-pulse"
      style={{ width, height }}
    />
  );
}

export function SkeletonBlock({ height = 128 }: { height?: number }) {
  return (
    <div
      className="w-full rounded-[48px] bg-surface-container-highest animate-pulse"
      style={{ height }}
    />
  );
}

export default function SkeletonCard() {
  return (
    <div className="flex items-center gap-4">
      <SkeletonCircle />
      <div className="flex-1 flex flex-col gap-2">
        <SkeletonLine />
        <SkeletonLine width={107} height={8} />
      </div>
    </div>
  );
}
