"use client";
import { useState } from "react";
import {
  MapPin,
  Clock,
  Users,
  ChevronRight,
  Zap,
  TrendingUp,
  Navigation,
  Heart,
  MessageSquare,
  MoreVertical,
  Bell,
  Search,
  Home,
  Compass,
  User,
  Plus,
  Star,
  Shield,
  Gauge,
  Activity,
  Calendar,
  ArrowUpRight,
  Eye,
  Route,
} from "lucide-react";

/* ─── Section Divider ─── */
function SectionDivider({ label }: { label: string }) {
  return (
    <div className="flex items-center gap-4 py-4">
      <div className="h-px w-7 bg-outline-variant" />
      <span className="font-body font-bold text-[10px] tracking-[3.6px] uppercase text-on-surface-variant whitespace-nowrap">
        {label}
      </span>
      <div className="h-px flex-1 bg-outline-variant" />
    </div>
  );
}

export default function ModulesPage() {
  const [activeRidingDna, setActiveRidingDna] = useState("Hyper Performance");

  return (
    <div className="flex-1 flex flex-col bg-black">
      <div className="flex-1 overflow-y-auto hide-scrollbar">
        <div className="flex flex-col px-6 pt-[128px] pb-[160px]">
          {/* ═══════════════════════════════════════════════ */}
          {/* SECTION 1: HERO & BRANDING                     */}
          {/* ═══════════════════════════════════════════════ */}
          <section className="mb-[128px]">
            <h1 className="font-headline font-bold text-[48px] leading-[48px] tracking-[-1.2px] uppercase text-white mb-4">
              Master<br />Module<br />Gallery
            </h1>
            <p className="text-on-surface-variant text-[14px] leading-[22px] font-body mb-8 max-w-[337px]">
              A comprehensive showcase of every UI module, pattern, and interaction flow available in
              the Volt Noir design system. Each section represents a production-ready component block.
            </p>
            <div className="flex gap-4">
              <button className="bg-primary rounded-full px-9 py-4 flex items-center justify-center">
                <span className="font-body font-extrabold text-[12px] tracking-[1.2px] uppercase text-[#536000]">
                  Explore
                </span>
              </button>
              <button className="border border-outline-variant/30 rounded-full px-6 py-4 flex items-center justify-center">
                <span className="font-body font-semibold text-[12px] text-on-surface-variant">
                  View Documentation
                </span>
              </button>
            </div>
          </section>

          <SectionDivider label="01. Upcoming Rides" />

          {/* ═══════════════════════════════════════════════ */}
          {/* SECTION 2: ONBOARDING ELEMENTS                 */}
          {/* ═══════════════════════════════════════════════ */}
          <section className="mb-[128px] flex flex-col gap-10">
            {/* Rider Profile Setup Card */}
            <div className="bg-surface-container-low rounded-2xl p-5">
              <h3 className="font-headline font-bold text-[20px] uppercase text-white mb-6">
                Rider Profile Setup
              </h3>
              <div className="flex flex-col gap-5">
                <div>
                  <label className="font-body font-extrabold text-[10px] uppercase text-on-surface-variant ml-2 mb-1 block">
                    Callsign / Username
                  </label>
                  <div className="bg-black border-2 border-outline-variant/30 rounded-[48px] h-14 flex items-center px-[18px]">
                    <span className="text-[#6b7280] font-body text-[14px]">Enter your callsign</span>
                  </div>
                </div>
                <div>
                  <label className="font-body font-extrabold text-[10px] uppercase text-on-surface-variant ml-2 mb-1 block">
                    Primary Vessel
                  </label>
                  <div className="bg-black border-2 border-outline-variant/30 rounded-[48px] h-14 flex items-center px-[18px]">
                    <span className="text-[#6b7280] font-body text-[14px]">Select your ride</span>
                  </div>
                </div>
                <button className="w-full h-12 rounded-full bg-primary flex items-center justify-center mt-2">
                  <span className="font-body font-extrabold text-[12px] tracking-[1.2px] uppercase text-[#536000]">
                    Initialize Profile
                  </span>
                </button>
              </div>
            </div>

            {/* Riding DNA Grid */}
            <div>
              <h3 className="font-headline font-bold text-[20px] uppercase text-white mb-6">
                Riding DNA
              </h3>
              <div className="grid grid-cols-2 gap-4">
                {[
                  { name: "Hyper Performance", icon: Zap },
                  { name: "Midnight Cruising", icon: Navigation },
                  { name: "Urban Exploration", icon: Compass },
                  { name: "Squad Tactics", icon: Users },
                ].map((item) => (
                  <button
                    key={item.name}
                    onClick={() => setActiveRidingDna(item.name)}
                    className={`rounded-2xl p-6 flex flex-col justify-between h-40 transition-all ${
                      activeRidingDna === item.name
                        ? "bg-surface-container-low"
                        : "border border-outline-variant/30"
                    }`}
                  >
                    <item.icon className={`w-6 h-6 ${activeRidingDna === item.name ? "text-primary" : "text-on-surface-variant"}`} />
                    <span className="font-body font-bold text-[12px] text-white leading-tight text-left">
                      {item.name}
                    </span>
                  </button>
                ))}
              </div>
            </div>
          </section>

          <SectionDivider label="02. Button Systems" />

          {/* ═══════════════════════════════════════════════ */}
          {/* SECTION 3 & 4: DASHBOARD & ACTIVITY + MAP      */}
          {/* ═══════════════════════════════════════════════ */}
          <section className="mb-[128px] flex flex-col gap-10">
            {/* Activity Feeds */}
            <div>
              <h3 className="font-headline font-bold text-[20px] uppercase text-white mb-6">
                Activity Feeds
              </h3>
              <div className="flex flex-col gap-4">
                {[
                  { user: "AK", name: "Arjun K.", action: "completed Sunrise Highway Run", time: "2h ago", distance: "120 km" },
                  { user: "PM", name: "Priya M.", action: "joined Mountain Madness", time: "4h ago", distance: "65 km" },
                ].map((feed, i) => (
                  <div key={i} className="bg-surface-container-low rounded-2xl p-5 flex items-start gap-3">
                    <div className="size-10 rounded-full bg-surface-container-highest flex items-center justify-center shrink-0">
                      <span className="font-body font-bold text-[11px] text-on-surface-variant">{feed.user}</span>
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-1">
                        <span className="font-body font-bold text-[14px] text-white">{feed.name}</span>
                        <span className="font-body text-[11px] text-on-surface-variant">{feed.time}</span>
                      </div>
                      <p className="font-body text-[13px] text-on-surface-variant">{feed.action}</p>
                      <span className="font-body font-bold text-[11px] text-primary mt-1 inline-block">{feed.distance}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Grid Lock Run Card */}
            <div className="bg-surface-container-low rounded-2xl p-5">
              <div className="flex items-center justify-between mb-4">
                <h4 className="font-headline font-bold text-[14px] uppercase text-white">Grid Lock Run</h4>
                <span className="font-body font-bold text-[10px] tracking-[1px] uppercase text-primary">Live</span>
              </div>
              <div className="flex gap-6 mb-4">
                <div>
                  <span className="font-body font-bold text-[10px] uppercase text-on-surface-variant block">Riders</span>
                  <span className="font-headline font-bold text-[20px] text-white">12</span>
                </div>
                <div>
                  <span className="font-body font-bold text-[10px] uppercase text-on-surface-variant block">Distance</span>
                  <span className="font-headline font-bold text-[20px] text-white">45.2</span>
                  <span className="font-headline font-bold text-[10px] text-white/40 ml-1">km</span>
                </div>
                <div>
                  <span className="font-body font-bold text-[10px] uppercase text-on-surface-variant block">Avg Speed</span>
                  <span className="font-headline font-bold text-[20px] text-primary">72</span>
                  <span className="font-headline font-bold text-[10px] text-primary/40 ml-1">km/h</span>
                </div>
              </div>
              <button className="w-full h-12 rounded-full bg-primary flex items-center justify-center">
                <span className="font-body font-extrabold text-[12px] tracking-[1.2px] uppercase text-[#536000]">
                  Join Ride
                </span>
              </button>
            </div>

            {/* Map Module */}
            <div className="border border-outline-variant/30 rounded-3xl h-[360px] overflow-hidden relative">
              <div className="absolute inset-0 bg-[#0a0a0a]">
                <div className="w-full h-full opacity-10 bg-gradient-to-br from-surface-container via-black to-surface-container-high" />
              </div>
              <div className="absolute top-4 left-4 backdrop-blur-[6px] bg-black/80 border border-white/10 rounded-full px-4 py-2 flex items-center gap-2">
                <div className="size-2 rounded-full bg-primary" />
                <span className="font-body font-extrabold text-[10px] tracking-[1px] uppercase text-white">
                  Live: Mumbai Central
                </span>
              </div>
              <div className="absolute bottom-4 left-4 right-4">
                <div className="backdrop-blur-[12px] bg-black/90 border border-white/10 rounded-2xl p-5 flex items-center justify-between">
                  <div className="flex gap-8">
                    <div>
                      <span className="font-body font-bold text-[10px] tracking-[1px] uppercase text-on-surface-variant block">ETA</span>
                      <span className="font-headline font-bold text-[18px] text-white">14:42</span>
                    </div>
                    <div>
                      <span className="font-body font-bold text-[10px] tracking-[1px] uppercase text-on-surface-variant block">Dist</span>
                      <span className="font-headline font-bold text-[18px] text-primary">8.4</span>
                      <span className="font-headline text-[10px] text-primary/40 ml-0.5">km</span>
                    </div>
                  </div>
                  <button className="bg-primary rounded-full px-6 py-3">
                    <span className="font-body font-extrabold text-[11px] tracking-[1px] uppercase text-[#536000]">Navigate</span>
                  </button>
                </div>
              </div>
            </div>
          </section>

          <SectionDivider label="03. Presets & Modes" />

          {/* ═══════════════════════════════════════════════ */}
          {/* SECTION 5: RIDE & EVENT CARDS                   */}
          {/* ═══════════════════════════════════════════════ */}
          <section className="mb-[128px] flex flex-col gap-6">
            {/* Card 1 - Event */}
            <div className="bg-surface-container-low rounded-2xl overflow-hidden">
              <div className="h-44 bg-gradient-to-br from-primary/20 via-surface-container to-surface-container-high flex items-center justify-center">
                <span className="font-headline font-bold text-[18px] text-outline-variant/40 uppercase">Event Banner</span>
              </div>
              <div className="p-5">
                <div className="flex items-center gap-2 mb-2">
                  <span className="text-[10px] px-2 py-0.5 rounded-full bg-primary/10 text-primary font-body font-bold uppercase">Featured</span>
                  <span className="font-body text-[11px] text-on-surface-variant">Tomorrow, 6:00 AM</span>
                </div>
                <h4 className="font-headline font-bold text-[18px] text-white uppercase mb-2">Night Circuit Rally</h4>
                <div className="flex items-center gap-4 text-on-surface-variant text-[11px]">
                  <div className="flex items-center gap-1">
                    <MapPin className="w-3 h-3" />
                    <span className="font-body">Mumbai → Pune Expressway</span>
                  </div>
                </div>
                <div className="flex items-center justify-between mt-3">
                  <div className="flex items-center gap-1 text-on-surface-variant text-[11px]">
                    <Users className="w-3 h-3" />
                    <span className="font-body">24 riders</span>
                  </div>
                  <span className="text-primary text-[11px] font-semibold">180 km</span>
                </div>
              </div>
            </div>

            {/* Card 2 - Compact */}
            <div className="bg-surface-container-low rounded-2xl p-5 flex items-center gap-4">
              <div className="size-16 rounded-2xl bg-gradient-to-br from-primary/20 to-surface-container-high flex items-center justify-center shrink-0">
                <Route className="w-6 h-6 text-primary" />
              </div>
              <div className="flex-1">
                <h4 className="font-headline font-bold text-[14px] text-white uppercase">Coastal Cruise</h4>
                <div className="flex items-center gap-2 mt-1">
                  <Clock className="w-3 h-3 text-on-surface-variant" />
                  <span className="font-body text-[11px] text-on-surface-variant">Sat, Apr 12 • 85 km</span>
                </div>
              </div>
              <ChevronRight className="w-4 h-4 text-on-surface-variant" />
            </div>

            {/* Card 3 - Minimal */}
            <div className="border border-outline-variant/20 rounded-2xl p-5 flex items-center justify-between">
              <div>
                <h4 className="font-headline font-bold text-[14px] text-white uppercase">Mountain Madness</h4>
                <span className="font-body text-[11px] text-on-surface-variant">Sun, Apr 13 • 8 riders</span>
              </div>
              <button className="bg-primary rounded-full px-4 py-2">
                <span className="font-body font-extrabold text-[10px] tracking-[1px] uppercase text-[#536000]">Join</span>
              </button>
            </div>
          </section>

          <SectionDivider label="04. Dashboard Modules" />

          {/* ═══════════════════════════════════════════════ */}
          {/* SECTION 6 & 7: RIDER IDENTITY & GAMIFICATION   */}
          {/* ═══════════════════════════════════════════════ */}
          <section className="mb-[128px] flex flex-col gap-10">
            {/* Rider Identity Card */}
            <div className="bg-surface-container-low rounded-2xl p-6 flex flex-col items-center gap-4">
              <div className="size-20 rounded-full border-2 border-primary bg-surface-container-highest flex items-center justify-center">
                <span className="font-headline font-bold text-2xl text-primary">VN</span>
              </div>
              <div className="text-center">
                <h3 className="font-headline font-bold text-[20px] uppercase text-white">Volt Rider</h3>
                <span className="font-body text-[12px] text-on-surface-variant">Level 42 • Phantom Class</span>
              </div>
              <div className="flex gap-6">
                <div className="text-center">
                  <span className="font-headline font-bold text-[20px] text-white">2.4K</span>
                  <span className="font-body text-[10px] uppercase text-on-surface-variant block">km ridden</span>
                </div>
                <div className="text-center">
                  <span className="font-headline font-bold text-[20px] text-primary">42</span>
                  <span className="font-body text-[10px] uppercase text-on-surface-variant block">rides</span>
                </div>
                <div className="text-center">
                  <span className="font-headline font-bold text-[20px] text-white">4.8</span>
                  <span className="font-body text-[10px] uppercase text-on-surface-variant block">rating</span>
                </div>
              </div>
            </div>

            {/* Lean Angle / Gamification */}
            <div className="bg-surface-container-low rounded-2xl p-6 flex flex-col items-center gap-4">
              <span className="font-body font-bold text-[10px] uppercase tracking-[1px] text-on-surface-variant">
                Lean Angle Record
              </span>
              <div className="relative size-32 flex items-center justify-center">
                <div className="absolute inset-0 rounded-full border-4 border-surface-container-highest" />
                <div className="absolute inset-0 rounded-full border-4 border-primary border-t-transparent border-r-transparent rotate-45" />
                <span className="font-headline font-bold text-[36px] text-white">42</span>
              </div>
              <span className="font-body text-[12px] text-on-surface-variant">degrees maximum lean</span>
            </div>
          </section>

          <SectionDivider label="05. Ride & Event Cards" />

          {/* ═══════════════════════════════════════════════ */}
          {/* SECTION 8 & 9: E-COMMERCE & UTILITY            */}
          {/* ═══════════════════════════════════════════════ */}
          <section className="mb-[128px] flex flex-col gap-6">
            {/* Product Card 1 */}
            <div className="bg-surface-container border border-outline-variant/20 rounded-2xl overflow-hidden">
              <div className="h-48 bg-gradient-to-br from-surface-container-high to-surface-container flex items-center justify-center">
                <span className="font-headline font-bold text-[16px] text-outline-variant/30 uppercase">Product Image</span>
              </div>
              <div className="p-6 flex flex-col gap-3">
                <h4 className="font-headline font-bold text-[18px] uppercase text-white">Riding Jacket Pro</h4>
                <div className="flex items-center justify-between">
                  <span className="font-mono text-[10px] text-on-surface-variant uppercase">CE Level 2 Armor</span>
                  <div>
                    <span className="font-body font-bold text-[24px] text-primary">$14,250</span>
                    <span className="font-body text-[12px] text-on-surface-variant ml-1">.00</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Product Card 2 */}
            <div className="bg-surface-container border border-outline-variant/20 rounded-2xl overflow-hidden">
              <div className="h-48 bg-gradient-to-br from-surface-container to-surface-container-high flex items-center justify-center">
                <span className="font-headline font-bold text-[16px] text-outline-variant/30 uppercase">Product Image</span>
              </div>
              <div className="p-6 flex flex-col gap-3">
                <h4 className="font-headline font-bold text-[18px] uppercase text-white">Volt Helmet X</h4>
                <div className="flex items-center justify-between">
                  <span className="font-mono text-[10px] text-on-surface-variant uppercase">DOT + ECE 22.06</span>
                  <div>
                    <span className="font-body font-bold text-[24px] text-primary">$14,250</span>
                    <span className="font-body text-[12px] text-on-surface-variant ml-1">.00</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Notification Sample */}
            <div className="bg-primary/10 border-l-4 border-primary rounded-r-[48px] py-4 pl-5 pr-4 flex items-center gap-3">
              <Bell className="w-5 h-5 text-primary shrink-0" />
              <span className="font-body font-medium text-[14px] text-white">
                Your order has been shipped. Track delivery.
              </span>
            </div>
          </section>

          <SectionDivider label="06. Rider Identity" />

          {/* ═══════════════════════════════════════════════ */}
          {/* SECTION 10: FINANCIALS & ANALYTICS             */}
          {/* ═══════════════════════════════════════════════ */}
          <section className="mb-[128px] flex flex-col gap-6">
            {/* Status Indicators */}
            <div className="flex gap-3">
              {[
                { label: "Active", color: "bg-success" },
                { label: "Pending", color: "bg-warning" },
                { label: "Offline", color: "bg-error" },
              ].map((s) => (
                <div key={s.label} className="flex items-center gap-2 bg-surface-container-low rounded-full px-4 py-2">
                  <div className={`size-2 rounded-full ${s.color}`} />
                  <span className="font-body font-bold text-[10px] uppercase text-white">{s.label}</span>
                </div>
              ))}
            </div>

            {/* Ride Analytics Bar Chart */}
            <div className="bg-surface-container-low rounded-2xl p-6">
              <h4 className="font-headline font-bold text-[14px] uppercase text-white mb-6">Ride Analytics</h4>
              <div className="flex items-end gap-3 h-32">
                {[40, 65, 85, 45, 70, 95, 55].map((h, i) => (
                  <div key={i} className="flex-1 flex flex-col items-center gap-2">
                    <div
                      className={`w-full rounded-t-lg ${i === 5 ? "bg-primary" : "bg-surface-container-highest"}`}
                      style={{ height: `${h}%` }}
                    />
                    <span className="font-body text-[9px] text-on-surface-variant">
                      {["M", "T", "W", "T", "F", "S", "S"][i]}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </section>

          {/* ═══════════════════════════════════════════════ */}
          {/* HERO: UPCOMING JOURNEY                         */}
          {/* ═══════════════════════════════════════════════ */}
          <section className="mb-[128px]">
            <h2 className="font-headline font-bold text-[36px] leading-[40px] tracking-[-0.9px] uppercase text-white mb-6">
              Upcoming<br />Journey
            </h2>
            <div className="bg-surface-container-low rounded-3xl p-6 border border-outline-variant/20 shadow-[0_0_40px_rgba(226,255,59,0.05)]">
              <div className="flex items-center justify-between mb-4">
                <span className="text-[10px] px-2 py-0.5 rounded-full bg-primary/10 text-primary font-body font-bold uppercase">Confirmed</span>
                <span className="font-body text-[11px] text-on-surface-variant">Tomorrow, 6:00 AM</span>
              </div>
              <h3 className="font-headline font-bold text-[18px] text-white uppercase mb-3">Sunrise Highway Run</h3>
              <div className="flex flex-col gap-2 text-on-surface-variant text-[12px]">
                <div className="flex items-center gap-2">
                  <MapPin className="w-3 h-3" />
                  <span className="font-body">Mumbai → Lonavala</span>
                </div>
                <div className="flex items-center gap-2">
                  <Clock className="w-3 h-3" />
                  <span className="font-body">Est. 2h 30m • 120 km</span>
                </div>
                <div className="flex items-center gap-2">
                  <Users className="w-3 h-3" />
                  <span className="font-body">12 riders confirmed</span>
                </div>
              </div>
              <button className="w-full h-12 rounded-full bg-primary flex items-center justify-center mt-6">
                <span className="font-body font-extrabold text-[12px] tracking-[1.2px] uppercase text-[#536000]">
                  View Route Details
                </span>
              </button>
            </div>
          </section>

          {/* ═══════════════════════════════════════════════ */}
          {/* FRIENDS ACTIVITY BENTO                          */}
          {/* ═══════════════════════════════════════════════ */}
          <section className="mb-[128px]">
            <h3 className="font-headline font-bold text-[20px] uppercase text-white mb-6">
              Friends Activity
            </h3>
            <div className="flex flex-col gap-4">
              {[
                { initials: "AK", name: "Arjun K.", msg: "Just completed 450 km ride!", time: "2h", likes: 42, badge: "Pro" },
                { initials: "PM", name: "Priya M.", msg: "New riding jacket from Rynox. Season ready!", time: "5h", likes: 28, badge: "Explorer" },
              ].map((post, i) => (
                <div key={i} className="bg-surface-container-low rounded-2xl p-5">
                  <div className="flex items-center gap-3 mb-3">
                    <div className="size-10 rounded-full bg-primary flex items-center justify-center">
                      <span className="font-body font-bold text-[11px] text-on-primary">{post.initials}</span>
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center gap-2">
                        <span className="font-body font-bold text-[13px] text-white">{post.name}</span>
                        <span className="text-[10px] px-2 py-0.5 rounded-full bg-primary/10 text-primary font-body font-medium">{post.badge}</span>
                      </div>
                      <span className="font-body text-[11px] text-on-surface-variant">{post.time} ago</span>
                    </div>
                    <MoreVertical className="w-4 h-4 text-on-surface-variant" />
                  </div>
                  <p className="font-body text-[13px] text-white/80 mb-3">{post.msg}</p>
                  <div className="flex gap-4 text-on-surface-variant">
                    <div className="flex items-center gap-1">
                      <Heart className="w-4 h-4" />
                      <span className="text-[11px]">{post.likes}</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <MessageSquare className="w-4 h-4" />
                      <span className="text-[11px]">12</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* ═══════════════════════════════════════════════ */}
          {/* STATS GRID                                      */}
          {/* ═══════════════════════════════════════════════ */}
          <section className="mb-[128px]">
            <h3 className="font-headline font-bold text-[20px] uppercase text-white mb-6">
              Ride Stats
            </h3>
            <div className="grid grid-cols-2 gap-4">
              {[
                { label: "Ride Hours", value: "156", unit: "hrs", icon: Clock },
                { label: "Total Distance", value: "2.4K", unit: "km", icon: TrendingUp },
                { label: "Top Speed", value: "168", unit: "km/h", icon: Gauge },
                { label: "Avg Rating", value: "4.8", unit: "/5", icon: Star },
              ].map((stat) => (
                <div key={stat.label} className="bg-surface-container-low rounded-2xl p-5 flex flex-col gap-3">
                  <stat.icon className="w-5 h-5 text-primary" />
                  <div>
                    <span className="font-headline font-bold text-[24px] text-white">{stat.value}</span>
                    <span className="font-body text-[10px] text-on-surface-variant ml-1">{stat.unit}</span>
                  </div>
                  <span className="font-body font-bold text-[10px] uppercase tracking-wider text-on-surface-variant">{stat.label}</span>
                </div>
              ))}
            </div>
          </section>

          {/* ═══════════════════════════════════════════════ */}
          {/* HOME SCREEN ASSEMBLY                            */}
          {/* ═══════════════════════════════════════════════ */}
          <section>
            <h2 className="font-headline font-bold text-[36px] leading-[40px] tracking-[-0.9px] uppercase text-white mb-6">
              Home Screen<br />Assembly
            </h2>

            {/* Mock Home Screen */}
            <div className="bg-black rounded-3xl border border-outline-variant/20 overflow-hidden">
              {/* Header */}
              <div className="flex items-center justify-between px-5 py-4">
                <h3 className="font-headline font-black text-xl tracking-tighter text-primary uppercase">Comride</h3>
                <div className="relative">
                  <Bell className="w-5 h-5 text-white/50" />
                  <div className="absolute top-0 right-0 w-2 h-2 bg-primary rounded-full" />
                </div>
              </div>

              {/* Greeting */}
              <div className="px-5 mb-6">
                <p className="text-[10px] tracking-[0.15em] uppercase font-headline text-on-surface-variant">Good morning, Rider</p>
                <h2 className="text-2xl font-headline font-black tracking-tighter uppercase text-white mt-1">Ready to ride</h2>
              </div>

              {/* Quick Stats */}
              <div className="flex gap-2 px-5 mb-6">
                {[
                  { label: "Rides", value: "23", icon: TrendingUp },
                  { label: "Distance", value: "2.4K", icon: MapPin },
                  { label: "Rating", value: "4.8", icon: Star },
                ].map((stat) => (
                  <div key={stat.label} className="flex-1 bg-surface-container-low rounded-xl p-3 text-center">
                    <stat.icon className="w-4 h-4 text-primary mx-auto mb-1" />
                    <p className="text-lg font-headline font-black text-white">{stat.value}</p>
                    <p className="text-[9px] uppercase tracking-wider text-on-surface-variant">{stat.label}</p>
                  </div>
                ))}
              </div>

              {/* FAB */}
              <div className="flex justify-center py-4">
                <div className="w-14 h-14 rounded-full bg-primary flex items-center justify-center glow-primary">
                  <Plus className="w-6 h-6 text-on-primary" strokeWidth={2.5} />
                </div>
              </div>

              {/* Bottom Nav */}
              <div className="glass-nav rounded-t-2xl px-3 pb-5 pt-3 flex items-end justify-around">
                {[
                  { icon: Home, label: "Home", active: true },
                  { icon: Compass, label: "Explore" },
                  { icon: Users, label: "Crew" },
                  { icon: User, label: "Profile" },
                ].map((tab) => (
                  <div
                    key={tab.label}
                    className={`flex flex-col items-center gap-1 px-4 py-2 rounded-full ${
                      tab.active ? "bg-primary text-on-primary" : "text-white/30"
                    }`}
                  >
                    <tab.icon className="w-4 h-4" strokeWidth={tab.active ? 2.5 : 2} />
                    <span className="font-headline text-[9px] uppercase tracking-wide font-bold">{tab.label}</span>
                  </div>
                ))}
              </div>
            </div>
          </section>
        </div>
      </div>
    </div>
  );
}
