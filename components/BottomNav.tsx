"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Home, Compass, Users, User, Plus } from "lucide-react";

const tabs = [
  { href: "/home", icon: Home, label: "Home" },
  { href: "/discover", icon: Compass, label: "Explore" },
  { href: "/create-ride", icon: Plus, label: "Ride", isFab: true },
  { href: "/community", icon: Users, label: "Crew" },
  { href: "/profile", icon: User, label: "Profile" },
];

export default function BottomNav() {
  const pathname = usePathname();

  return (
    <nav className="glass-nav rounded-t-[2rem] px-4 pb-7 pt-3.5 flex items-end justify-around relative z-30 shadow-[0_-10px_40px_rgba(0,0,0,0.5)]">
      {tabs.map((tab) => {
        const isActive = pathname.startsWith(tab.href);
        if (tab.isFab) {
          return (
            <Link key={tab.href} href={tab.href} className="relative -mt-8">
              <div className="w-14 h-14 rounded-full bg-primary flex items-center justify-center glow-primary active:scale-95 transition-transform duration-150">
                <Plus className="w-6 h-6 text-on-primary" strokeWidth={2.5} />
              </div>
            </Link>
          );
        }
        return (
          <Link
            key={tab.href}
            href={tab.href}
            className={`flex flex-col items-center gap-1 px-5 py-2.5 rounded-full transition-all duration-200 active:scale-90 ${
              isActive
                ? "bg-primary text-on-primary shadow-[0_0_20px_rgba(231,253,78,0.25)]"
                : "text-white/30 hover:text-white/50"
            }`}
          >
            <tab.icon className="w-5 h-5" strokeWidth={isActive ? 2.5 : 2} />
            <span className="font-headline text-[10px] uppercase tracking-wide font-bold leading-none mt-1">{tab.label}</span>
          </Link>
        );
      })}
    </nav>
  );
}
