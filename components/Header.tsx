"use client";
import { useRouter } from "next/navigation";
import { ChevronLeft, Bell } from "lucide-react";

export default function Header({
  title,
  showBack = false,
  showNotification = false,
  rightAction,
}: {
  title: string;
  showBack?: boolean;
  showNotification?: boolean;
  rightAction?: React.ReactNode;
}) {
  const router = useRouter();

  return (
    <div className="flex items-center justify-between px-6 pt-5 pb-4 relative z-20">
      <div className="flex items-center gap-3">
        {showBack && (
          <button onClick={() => router.back()} className="p-1.5 -ml-1.5 rounded-full text-primary hover:opacity-80 transition-opacity active:scale-95 duration-150">
            <ChevronLeft className="w-6 h-6" />
          </button>
        )}
        <h1 className="font-headline font-black text-2xl tracking-tighter text-primary uppercase">{title}</h1>
      </div>
      <div className="flex items-center gap-3">
        {rightAction}
        {showNotification && (
          <button onClick={() => router.push("/notifications")} className="p-2 rounded-full text-white/50 hover:text-white/80 transition-all active:scale-95 duration-150 relative">
            <Bell className="w-[22px] h-[22px]" />
            <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-primary rounded-full ring-2 ring-background" />
          </button>
        )}
      </div>
    </div>
  );
}
