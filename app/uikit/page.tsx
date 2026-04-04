"use client";
import { useState } from "react";
import {
  Eye,
  EyeOff,
  ChevronDown,
  Check,
  WifiOff,
  Info,
  X,
  CheckCircle,
  XCircle,
  Zap,
  Wrench,
  Navigation,
  Settings,
  Bolt,
  MonitorSmartphone,
  Shield,
  Bell,
  Heart,
  MessageSquare,
  MoreVertical,
  MapPin,
} from "lucide-react";

/* ──────────────────── Section Heading ──────────────────── */
function SectionHeading({ number, title }: { number: string; title: string }) {
  return (
    <div className="flex flex-col gap-2">
      <h2 className="font-headline font-bold text-[36px] leading-[40px] tracking-[-0.9px] uppercase text-white">
        {number}. {title}
      </h2>
      <div className="h-px w-full bg-outline-variant/20" />
    </div>
  );
}

function SubHeading({ children, accent = false }: { children: string; accent?: boolean }) {
  return (
    <p
      className={`font-body font-bold text-[12px] uppercase tracking-[1.2px] ${
        accent ? "text-primary tracking-[3.6px]" : "text-on-surface-variant"
      }`}
    >
      {children}
    </p>
  );
}

/* ══════════════════════════════════════════════════════════ */
export default function UIKitPage() {
  const [activeTab, setActiveTab] = useState("Daily");
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [dropdownValue, setDropdownValue] = useState("Volt Premium");
  const [toggleOn, setToggleOn] = useState(true);
  const [checkboxOn, setCheckboxOn] = useState(true);
  const [radioOn, setRadioOn] = useState(true);
  const [showPassword, setShowPassword] = useState(false);
  const [activeInput, setActiveInput] = useState<string | null>(null);

  return (
    <div className="flex-1 flex flex-col bg-black">
      <div className="flex-1 overflow-y-auto hide-scrollbar">
        <div className="flex flex-col gap-[160px] px-6 pt-[128px] pb-[160px]">
          {/* ── HERO ── */}
          <div className="flex flex-col gap-4">
            <p className="font-body font-bold text-[12px] tracking-[3.6px] uppercase text-primary">
              Design System V2.0 Official
            </p>
            <h1 className="font-headline font-bold text-[96px] leading-[96px] tracking-[-4.8px] uppercase">
              <span className="text-white">VOLT</span>
              <br />
              <span className="text-outline-variant">NOIR</span>
            </h1>
            <p className="text-on-surface-variant text-[20px] leading-[32.5px] font-body pt-4 max-w-[672px]">
              A high-frequency UI Kit engineered for speed, depth, and cinematic
              intensity. Built on the &ldquo;Electric Void&rdquo; philosophy&mdash;where
              absolute darkness meets aggressive neon precision.
            </p>
          </div>

          {/* ── 01. ATOMIC FOUNDATIONS ── */}
          <section className="flex flex-col gap-12">
            <SectionHeading number="01" title="Atomic Foundations" />

            {/* Color Architecture */}
            <div className="flex flex-col gap-6">
              <SubHeading>Color Architecture</SubHeading>
              <div className="grid grid-cols-2 gap-4">
                <div className="bg-primary rounded-[32px] p-6 h-[160px] flex flex-col justify-end shadow-[0_0_40px_rgba(226,255,59,0.15)]">
                  <p className="font-body font-bold text-[16px] text-[#536000]">#E2FF3B</p>
                  <p className="font-body font-bold text-[10px] uppercase text-[#536000]/60">
                    Electric Lime<br />(Primary)
                  </p>
                </div>
                <div className="border border-outline-variant/30 rounded-[32px] p-6 h-[160px] flex flex-col justify-end">
                  <p className="font-body font-bold text-[16px] text-white">#000000</p>
                  <p className="font-body font-bold text-[10px] uppercase text-on-surface-variant">
                    Obsidian (Base)
                  </p>
                </div>
                <div className="bg-surface rounded-[32px] p-6 h-[160px] flex flex-col justify-end">
                  <p className="font-body font-bold text-[16px] text-white">#0E0E0E</p>
                  <p className="font-body font-bold text-[10px] uppercase text-on-surface-variant">
                    Surface Gray (Layer)
                  </p>
                </div>
                <div className="bg-error rounded-[32px] p-6 h-[160px] flex flex-col justify-end">
                  <p className="font-body font-bold text-[16px] text-[#450900]">#FF7351</p>
                  <p className="font-body font-bold text-[10px] uppercase text-[#450900]/60">
                    Heat Flare (Error)
                  </p>
                </div>
              </div>
            </div>

            {/* Radius & Elevation */}
            <div className="grid grid-cols-[1fr_127px] gap-8">
              <div className="flex flex-col gap-6">
                <SubHeading>Radius Scale</SubHeading>
                <div className="flex flex-col gap-4">
                  {[
                    { r: "rounded-[2px]", label: "sm (4px)" },
                    { r: "rounded-[32px]", label: "lg (16px)" },
                    { r: "rounded-[48px]", label: "xl (24px)" },
                    { r: "rounded-full", label: "full (99px)" },
                  ].map((item) => (
                    <div key={item.label} className="flex items-center gap-4">
                      <div
                        className={`size-10 bg-surface-container border border-outline-variant/20 ${item.r}`}
                      />
                      <span className="font-mono text-[10px] text-on-surface-variant">
                        {item.label}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
              <div className="flex flex-col gap-6">
                <SubHeading>Elevation &amp; Blur</SubHeading>
                <div className="flex flex-col gap-4">
                  <div className="bg-surface-container rounded-[32px] p-4 flex items-center justify-between shadow-[0_10px_40px_rgba(226,255,59,0.08)]">
                    <span className="font-body font-bold text-[10px] uppercase text-white">
                      L3 Glow
                    </span>
                    <div className="size-3 rounded-full bg-primary shadow-[0_0_10px_#e2ff3b]" />
                  </div>
                  <div className="backdrop-blur-[10px] bg-surface-container/40 border border-white/10 rounded-[32px] p-4 flex items-center justify-between">
                    <span className="font-body font-bold text-[10px] uppercase text-white">
                      Glass (20px)
                    </span>
                    <span className="text-white/40 text-xs">✦</span>
                  </div>
                  <div className="border-2 border-primary/20 rounded-[32px] p-4 flex items-center justify-between">
                    <span className="font-body font-bold text-[10px] uppercase text-white">
                      Active Outline
                    </span>
                    <span className="text-primary text-xs">⬡</span>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* ── 02. BUTTON PRIMITIVES ── */}
          <section className="flex flex-col gap-12">
            <SectionHeading number="02" title="Button Primitives" />

            {/* States & Variants */}
            <div className="bg-surface-container-low rounded-2xl p-8 flex flex-col gap-8">
              <SubHeading accent>States &amp; Variants (M)</SubHeading>
              <div className="grid grid-cols-2 gap-6">
                <div className="flex flex-col gap-2">
                  <span className="font-body font-bold text-[10px] uppercase text-on-surface-variant">
                    Primary Default
                  </span>
                  <button className="h-12 rounded-full bg-primary flex items-center justify-center">
                    <span className="font-body font-extrabold text-[12px] tracking-[1.2px] uppercase text-[#536000]">
                      Request Ride
                    </span>
                  </button>
                </div>
                <div className="flex flex-col gap-2">
                  <span className="font-body font-bold text-[10px] uppercase text-on-surface-variant">
                    Primary Hover
                  </span>
                  <button className="h-12 rounded-full bg-primary flex items-center justify-center shadow-[0_0_20px_rgba(226,255,59,0.3)]">
                    <span className="font-body font-extrabold text-[12px] tracking-[1.2px] uppercase text-[#536000]">
                      Confirm Action
                    </span>
                  </button>
                </div>
                <div className="flex flex-col gap-2">
                  <span className="font-body font-bold text-[10px] uppercase text-on-surface-variant">
                    Secondary Outline
                  </span>
                  <button className="h-12 rounded-full border-2 border-primary flex items-center justify-center">
                    <span className="font-body font-extrabold text-[12px] tracking-[1.2px] uppercase text-primary">
                      Plan Route
                    </span>
                  </button>
                </div>
                <div className="flex flex-col gap-2">
                  <span className="font-body font-bold text-[10px] uppercase text-on-surface-variant">
                    Tertiary / Loading
                  </span>
                  <button className="h-12 rounded-full bg-surface-container-highest flex items-center justify-center gap-2">
                    <div className="size-3 border-2 border-transparent border-t-white rounded-full animate-spin" />
                    <span className="font-body font-extrabold text-[12px] tracking-[1.2px] uppercase text-white">
                      Syncing
                    </span>
                  </button>
                </div>
                <div className="flex flex-col gap-2">
                  <span className="font-body font-bold text-[10px] uppercase text-on-surface-variant">
                    Ghost Link
                  </span>
                  <button className="h-12 rounded-full flex items-center justify-center">
                    <span className="font-body font-extrabold text-[12px] tracking-[1.2px] uppercase text-on-surface-variant">
                      Skip Setup
                    </span>
                  </button>
                </div>
                <div className="flex flex-col gap-2">
                  <span className="font-body font-bold text-[10px] uppercase text-on-surface-variant">
                    Disabled
                  </span>
                  <button className="h-12 rounded-full bg-surface-container-highest opacity-50 flex items-center justify-center" disabled>
                    <span className="font-body font-extrabold text-[12px] tracking-[1.2px] uppercase text-outline">
                      Awaiting Input
                    </span>
                  </button>
                </div>
              </div>
            </div>

            {/* Scale */}
            <div className="bg-surface-container-low rounded-2xl p-8 flex flex-col gap-8">
              <SubHeading accent>Scale (S, M, L)</SubHeading>
              <div className="flex flex-col gap-6">
                <button className="w-full py-6 px-12 rounded-full bg-primary flex items-center justify-center">
                  <span className="font-body font-extrabold text-[18px] tracking-[1.8px] uppercase text-[#536000]">
                    Large Action
                  </span>
                </button>
                <button className="self-start py-4 px-8 rounded-full bg-primary flex items-center justify-center">
                  <span className="font-body font-extrabold text-[14px] tracking-[1.4px] uppercase text-[#536000]">
                    Medium Action
                  </span>
                </button>
                <button className="self-start py-2 px-4 rounded-full bg-primary flex items-center justify-center">
                  <span className="font-body font-extrabold text-[10px] tracking-[1px] uppercase text-[#536000]">
                    Small Action
                  </span>
                </button>
              </div>
            </div>
          </section>

          {/* ── 03. TYPOGRAPHY & TEXT ELEMENTS ── */}
          <section className="flex flex-col gap-12">
            <SectionHeading number="03" title="Typography & Text" />
            <div className="bg-surface-container rounded-2xl p-12 flex flex-col gap-16">
              <div className="flex flex-col gap-12">
                <SubHeading accent>Display Large / 128px</SubHeading>
                <h1 className="font-headline font-bold text-[96px] leading-[96px] tracking-[-4.8px] uppercase text-white">
                  RACE
                </h1>
              </div>
              <div className="border-t border-outline-variant/10 pt-12 flex flex-col gap-12">
                <SubHeading accent>Headline M / 48px</SubHeading>
                <h2 className="font-headline font-bold text-[48px] leading-[48px] tracking-[-1.2px] uppercase text-white">
                  Electric<br />speed<br />urbanity
                </h2>
              </div>
              <div className="border-t border-outline-variant/10 pt-12 flex flex-col gap-12">
                <SubHeading accent>Body Large / 18px</SubHeading>
                <p className="font-body text-[20px] leading-[32.5px] text-on-surface-variant max-w-[240px]">
                  Standard body copy utilizes the Manrope typeface, providing
                  technical precision and superior legibility at smaller scales.
                  It balances the aggressive character of Space Grotesk.
                </p>
              </div>
              <div className="border-t border-outline-variant/10 pt-12 flex flex-col gap-4">
                <SubHeading accent>Label &amp; Error</SubHeading>
                <div className="flex flex-col gap-4">
                  <p className="font-body font-extrabold text-[12px] tracking-[1.2px] uppercase text-white">
                    Label Medium / 12px
                  </p>
                  <p className="font-body font-extrabold text-[10px] tracking-[1px] uppercase text-error">
                    Critical System Error / 10px
                  </p>
                  <a className="font-body font-bold text-[14px] text-primary underline cursor-pointer">
                    Interactive text link
                  </a>
                </div>
              </div>
            </div>
          </section>

          {/* ── 04. ICONS & AVATARS ── */}
          <section className="flex flex-col gap-12">
            <SectionHeading number="04" title="Icons & Avatars" />

            <div className="bg-surface-container rounded-2xl p-8 flex flex-col gap-8">
              <SubHeading>System Icon Set</SubHeading>
              <div className="grid grid-cols-4 gap-8">
                <Zap className="w-6 h-6 text-primary" />
                <Wrench className="w-6 h-6 text-primary" />
                <Navigation className="w-6 h-6 text-primary" />
                <Settings className="w-6 h-6 text-primary" />
                <Bolt className="w-6 h-6 text-primary" />
                <MonitorSmartphone className="w-6 h-6 text-primary" />
                <Shield className="w-6 h-6 text-primary" />
                <Bell className="w-6 h-6 text-primary" />
              </div>
              <div className="border-t border-outline-variant/10 pt-8">
                <p className="font-mono text-[10px] uppercase text-white/50 mb-4">
                  Functional Sizes
                </p>
                <div className="flex items-end gap-8">
                  <MapPin className="w-6 h-6 text-primary" />
                  <MapPin className="w-4 h-4 text-primary" />
                  <MapPin className="w-2.5 h-2.5 text-primary" />
                </div>
              </div>
            </div>

            <div className="bg-surface-container rounded-2xl p-8 flex flex-col gap-8">
              <SubHeading>Avatar Variants</SubHeading>
              <div className="flex items-start gap-8">
                <div className="flex flex-col items-center gap-1">
                  <div className="size-16 rounded-full border-2 border-primary bg-surface-container-highest flex items-center justify-center overflow-hidden">
                    <span className="font-headline font-bold text-lg text-primary">VN</span>
                  </div>
                  <span className="font-body font-bold text-[10px] uppercase text-white/50">
                    Large (64)
                  </span>
                </div>
                <div className="flex flex-col items-center gap-1">
                  <div className="size-12 rounded-full border border-outline-variant/30 bg-surface-container-highest flex items-center justify-center overflow-hidden">
                    <span className="font-headline font-bold text-sm text-on-surface-variant">MR</span>
                  </div>
                  <span className="font-body font-bold text-[10px] uppercase text-white/50">
                    Medium (48)
                  </span>
                </div>
              </div>
              <div className="flex items-center -space-x-4">
                <div className="size-10 rounded-full bg-surface-container-highest border-2 border-black" />
                <div className="size-10 rounded-full bg-surface-container-highest border-2 border-black" />
                <div className="size-10 rounded-full bg-primary border-2 border-black flex items-center justify-center">
                  <span className="font-body font-bold text-[10px] text-[#536000]">+2k</span>
                </div>
              </div>
            </div>
          </section>

          {/* ── 05. FORM ARCHITECTURE ── */}
          <section className="flex flex-col gap-12">
            <SectionHeading number="05" title="Form Architecture" />

            <div className="bg-surface-container rounded-2xl p-8 flex flex-col gap-8">
              <SubHeading accent>Input Archetypes</SubHeading>
              <div className="flex flex-col gap-6">
                {/* Default */}
                <div>
                  <label className="font-body font-extrabold text-[10px] uppercase text-on-surface-variant ml-2 mb-1 block">
                    Destination (Default)
                  </label>
                  <div className="bg-black border-2 border-outline-variant/30 rounded-[48px] h-14 flex items-center px-[18px]">
                    <span className="text-[#6b7280] font-body text-[16px]">Where to?</span>
                  </div>
                </div>
                {/* Active */}
                <div>
                  <label className="font-body font-extrabold text-[10px] uppercase text-primary ml-2 mb-1 block">
                    Rider Focus (Active)
                  </label>
                  <div
                    className="bg-black border-2 border-primary rounded-[48px] h-14 flex items-center justify-between px-[18px] shadow-[0_0_15px_rgba(226,255,58,0.15)] cursor-text"
                    onClick={() => setActiveInput("focus")}
                  >
                    <span className="text-white font-body text-[16px]">Silicon Valley</span>
                    <Navigation className="w-[18px] h-[18px] text-primary" />
                  </div>
                </div>
                {/* Password */}
                <div>
                  <label className="font-body font-extrabold text-[10px] uppercase text-on-surface-variant ml-2 mb-1 block">
                    Secure Key (Password)
                  </label>
                  <div className="bg-black border-2 border-outline-variant/30 rounded-[48px] h-14 flex items-center justify-between px-[18px]">
                    <span className="text-white font-body text-[16px]">
                      {showPassword ? "my_secret_123" : "********"}
                    </span>
                    <button onClick={() => setShowPassword(!showPassword)}>
                      {showPassword ? (
                        <EyeOff className="w-[22px] h-[15px] text-on-surface-variant" />
                      ) : (
                        <Eye className="w-[22px] h-[15px] text-on-surface-variant" />
                      )}
                    </button>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-surface-container rounded-2xl p-8 flex flex-col gap-12">
              <SubHeading accent>Selection &amp; Advanced</SubHeading>
              <div className="grid grid-cols-2 gap-8">
                <div className="flex flex-col gap-4">
                  <SubHeading>Controls</SubHeading>
                  {/* Checkbox */}
                  <button
                    className="flex items-center gap-3"
                    onClick={() => setCheckboxOn(!checkboxOn)}
                  >
                    <div
                      className={`size-[22px] rounded-[4px] flex items-center justify-center ${
                        checkboxOn ? "bg-primary" : "border-2 border-outline-variant/30"
                      }`}
                    >
                      {checkboxOn && <Check className="w-4 h-4 text-[#536000]" />}
                    </div>
                    <span className="font-body font-bold text-[14px] text-white">Checkbox</span>
                  </button>
                  {/* Radio */}
                  <button
                    className="flex items-center gap-3"
                    onClick={() => setRadioOn(!radioOn)}
                  >
                    <div
                      className={`size-[22px] rounded-full flex items-center justify-center ${
                        radioOn ? "bg-primary" : "border-2 border-outline-variant/30"
                      }`}
                    >
                      {radioOn && <div className="size-2 rounded-full bg-[#536000]" />}
                    </div>
                    <span className="font-body font-bold text-[14px] text-white">Radio Opt</span>
                  </button>
                  {/* Toggle */}
                  <div className="flex items-center justify-between">
                    <span className="font-body font-bold text-[14px] text-white">Toggle Sw</span>
                    <button
                      onClick={() => setToggleOn(!toggleOn)}
                      className={`w-10 h-5 rounded-full flex items-center transition-all ${
                        toggleOn ? "bg-primary pl-6 pr-1" : "bg-surface-container-highest pl-1 pr-6"
                      } py-1`}
                    >
                      <div
                        className={`size-3 rounded-full ${
                          toggleOn ? "bg-[#536000]" : "bg-on-surface-variant"
                        }`}
                      />
                    </button>
                  </div>
                </div>
                <div className="flex flex-col gap-4">
                  <SubHeading>OTP Entry</SubHeading>
                  <div className="flex gap-2">
                    {["4", "", "", ""].map((val, i) => (
                      <div
                        key={i}
                        className={`w-6 h-12 rounded-[32px] flex items-center justify-center border-2 bg-black ${
                          val ? "border-primary" : "border-outline-variant/30"
                        }`}
                      >
                        {val && (
                          <span className="font-body font-bold text-[16px] text-white">{val}</span>
                        )}
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Slider */}
              <div className="flex flex-col gap-6">
                <div className="flex items-end justify-between">
                  <SubHeading>Lean Angle / Slider</SubHeading>
                  <span className="font-headline font-bold text-[16px] text-primary">42&deg;</span>
                </div>
                <div className="relative h-2 bg-surface-container-highest rounded-full overflow-hidden">
                  <div className="absolute inset-y-0 left-0 w-[60%] bg-primary rounded-full" />
                </div>
              </div>
            </div>
          </section>

          {/* ── 06. NAVIGATION & OVERLAYS ── */}
          <section className="flex flex-col gap-12">
            <SectionHeading number="06" title="Navigation & Overlays" />

            {/* Bottom Sheet Modal */}
            <div className="bg-surface-container rounded-2xl overflow-hidden relative min-h-[400px]">
              <div className="p-8">
                <SubHeading>Bottom Sheet Overlay</SubHeading>
              </div>
              {/* Overlay */}
              <div className="absolute inset-0 bg-black/40 backdrop-blur-[2px] flex items-end">
                <div className="w-full bg-surface-container-high border-t border-primary/20 rounded-t-3xl p-8 flex flex-col items-center gap-4">
                  <div className="w-12 h-1.5 rounded-full bg-outline-variant/30" />
                  <h3 className="font-headline font-bold text-[20px] uppercase text-white w-full pt-4">
                    Confirm Destination
                  </h3>
                  <p className="text-on-surface-variant text-[14px] leading-5 font-body w-full pb-4">
                    Route to Alexanderplatz involves toll roads. Estimated arrival 14:42.
                  </p>
                  <button className="w-full h-14 rounded-full bg-primary flex items-center justify-center">
                    <span className="font-body font-extrabold text-[16px] tracking-[1.6px] uppercase text-[#536000]">
                      Initiate Ride
                    </span>
                  </button>
                </div>
              </div>
            </div>

            {/* Tabs & Selection */}
            <div className="bg-surface-container rounded-2xl p-8 flex flex-col gap-12">
              <div className="flex flex-col gap-4">
                <SubHeading>Segmented Tabs</SubHeading>
                <div className="bg-black border border-outline-variant/20 rounded-full h-[66px] flex items-center p-1">
                  {["Daily", "Monthly", "All Time"].map((tab) => (
                    <button
                      key={tab}
                      onClick={() => setActiveTab(tab)}
                      className={`flex-1 h-full rounded-full flex items-center justify-center transition-all ${
                        activeTab === tab
                          ? "bg-primary"
                          : ""
                      }`}
                    >
                      <span
                        className={`font-body font-extrabold text-[12px] tracking-[1.2px] uppercase ${
                          activeTab === tab ? "text-[#536000]" : "text-on-surface-variant"
                        }`}
                      >
                        {tab}
                      </span>
                    </button>
                  ))}
                </div>
              </div>

              <div className="flex flex-col gap-4">
                <SubHeading>Selection Dropdown</SubHeading>
                <div>
                  <button
                    onClick={() => setDropdownOpen(!dropdownOpen)}
                    className={`w-full bg-black border-2 border-primary h-14 flex items-center justify-between px-[18px] ${
                      dropdownOpen ? "rounded-t-[32px]" : "rounded-[32px]"
                    }`}
                  >
                    <span className="font-body font-bold text-[16px] text-white">{dropdownValue}</span>
                    <ChevronDown
                      className={`w-3 h-3 text-primary transition-transform ${
                        dropdownOpen ? "rotate-180" : ""
                      }`}
                    />
                  </button>
                  {dropdownOpen && (
                    <div className="bg-black border-2 border-primary border-t-0 rounded-b-[32px] overflow-hidden">
                      {["Volt Standard", "Volt Premium"].map((option) => (
                        <button
                          key={option}
                          onClick={() => {
                            setDropdownValue(option);
                            setDropdownOpen(false);
                          }}
                          className={`w-full text-left px-4 py-3 border-t border-outline-variant/10 flex items-center justify-between ${
                            dropdownValue === option
                              ? "bg-primary/10"
                              : ""
                          }`}
                        >
                          <span
                            className={`font-body text-[14px] ${
                              dropdownValue === option
                                ? "font-bold text-primary"
                                : "text-white"
                            }`}
                          >
                            {option}
                          </span>
                          {dropdownValue === option && (
                            <Check className="w-2.5 h-2.5 text-primary" />
                          )}
                        </button>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            </div>
          </section>

          {/* ── 07. FEEDBACK & STATUS ── */}
          <section className="flex flex-col gap-12">
            <SectionHeading number="07" title="Feedback & Status" />

            <div className="flex flex-col gap-6">
              {/* Alert Banner */}
              <div className="bg-primary/10 border-l-4 border-primary rounded-r-[48px] py-4 pl-5 pr-4 flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <Info className="w-5 h-5 text-primary" />
                  <span className="font-body font-medium text-[14px] text-white">
                    New Firmware V2.4 is now available.
                  </span>
                </div>
                <X className="w-[7px] h-[7px] text-on-surface-variant" />
              </div>

              {/* Snackbar */}
              <div className="bg-surface-container-highest rounded-[48px] p-4 flex items-center justify-between shadow-xl">
                <span className="font-body text-[14px] text-white">
                  Garage updated successfully
                </span>
                <button>
                  <span className="font-body font-extrabold text-[10px] tracking-[1px] uppercase text-primary">
                    Undo
                  </span>
                </button>
              </div>

              {/* Offline Status */}
              <div className="bg-surface-container rounded-2xl p-8 flex flex-col items-center gap-4">
                <div className="size-12 rounded-full bg-outline-variant/20 flex items-center justify-center">
                  <WifiOff className="w-6 h-5 text-on-surface-variant" />
                </div>
                <div className="text-center">
                  <p className="font-body font-bold text-[16px] text-white">Offline Mode Active</p>
                  <p className="font-body text-[12px] text-on-surface-variant">
                    Live tracking disabled. Saving locally.
                  </p>
                </div>
              </div>
            </div>

            {/* Skeleton Loaders */}
            <div className="bg-surface-container rounded-2xl p-8 flex flex-col gap-8">
              <SubHeading>Skeleton Loaders</SubHeading>
              <div className="flex items-center gap-4">
                <div className="size-12 rounded-full bg-surface-container-highest animate-pulse" />
                <div className="flex-1 flex flex-col gap-2">
                  <div className="h-3 w-[71px] rounded-full bg-surface-container-highest animate-pulse" />
                  <div className="h-2 w-[107px] rounded-full bg-surface-container-highest/50 animate-pulse" />
                </div>
              </div>
              <div className="h-32 rounded-[48px] bg-surface-container-highest animate-pulse" />
            </div>
          </section>

          {/* ── 08. PRODUCT MOLECULES & PATTERNS ── */}
          <section className="flex flex-col gap-12">
            <SectionHeading number="08" title="Product Molecules" />

            {/* Live Tracking Card */}
            <div className="border border-outline-variant/30 rounded-3xl h-[500px] overflow-hidden relative">
              <div className="absolute inset-0 bg-[#0a0a0a] flex items-center justify-center">
                <div className="w-full h-full opacity-20 bg-gradient-to-br from-surface-container via-black to-surface-container" />
              </div>
              {/* Live Badge */}
              <div className="absolute top-6 left-6 backdrop-blur-[6px] bg-black/80 border border-white/10 rounded-full px-5 py-3 flex items-center gap-3">
                <div className="size-2 rounded-full bg-primary" />
                <span className="font-body font-extrabold text-[10px] tracking-[1px] uppercase text-white">
                  Live: Berlin Mitte
                </span>
              </div>
              {/* Stats Panel */}
              <div className="absolute bottom-6 left-6 right-6">
                <div className="backdrop-blur-[12px] bg-black/90 border border-white/10 rounded-2xl p-6 flex items-center justify-between">
                  <div className="flex gap-12">
                    <div className="flex flex-col">
                      <span className="font-body font-bold text-[10px] tracking-[1px] uppercase text-on-surface-variant">
                        Dist
                      </span>
                      <span className="font-headline font-bold text-[20px] text-white">24.8</span>
                      <span className="font-headline font-bold text-[10px] text-white/40">km</span>
                    </div>
                    <div className="flex flex-col">
                      <span className="font-body font-bold text-[10px] tracking-[1px] uppercase text-on-surface-variant">
                        Speed
                      </span>
                      <span className="font-headline font-bold text-[20px] text-primary">68</span>
                      <span className="font-headline font-bold text-[10px] text-primary/40">km/h</span>
                    </div>
                  </div>
                  <button className="bg-error rounded-full px-10 py-3">
                    <span className="font-body font-extrabold text-[12px] tracking-[1.2px] uppercase text-[#450900]">
                      Stop<br />Ride
                    </span>
                  </button>
                </div>
              </div>
            </div>

            {/* Vehicle Card */}
            <div className="bg-surface-container border border-outline-variant/20 rounded-2xl overflow-hidden">
              <div className="h-48 bg-gradient-to-br from-surface-container-high to-surface-container flex items-center justify-center">
                <span className="font-headline font-bold text-2xl text-outline-variant/30 uppercase">
                  Vehicle Image
                </span>
              </div>
              <div className="p-6 flex flex-col gap-4">
                <h4 className="font-headline font-bold text-[18px] uppercase text-white">
                  Supernova SV-4
                </h4>
                <div className="flex items-center justify-between">
                  <span className="font-mono text-[10px] text-on-surface-variant">
                    LVL 4 MAPPING
                  </span>
                  <span className="font-body font-bold text-[16px] text-primary">$12.4k</span>
                </div>
              </div>
            </div>

            {/* Feed Card */}
            <div className="bg-surface-container rounded-2xl p-6 flex flex-col gap-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="size-10 rounded-full bg-surface-container-highest flex items-center justify-center">
                    <span className="font-body font-bold text-[11px] text-on-surface-variant">MR</span>
                  </div>
                  <span className="font-body font-bold text-[14px] text-white">Marco Rossi</span>
                </div>
                <MoreVertical className="w-1 h-4 text-on-surface-variant" />
              </div>
              <p className="font-body text-[14px] leading-[22.75px] text-on-surface-variant">
                &ldquo;The grip on these curves is insane. Volt Noir mapping really makes a difference.&rdquo;
              </p>
              <div className="flex items-center gap-4">
                <div className="flex items-center gap-1">
                  <Heart className="w-3 h-3 text-primary" />
                  <span className="font-body font-bold text-[10px] text-primary">1.2k</span>
                </div>
                <div className="flex items-center gap-1">
                  <MessageSquare className="w-3 h-3 text-on-surface-variant" />
                  <span className="font-body font-bold text-[10px] text-on-surface-variant">42</span>
                </div>
              </div>
            </div>

            {/* Points Card */}
            <div className="bg-primary rounded-2xl p-8 flex flex-col justify-between min-h-[187px] relative overflow-hidden">
              <h4 className="font-headline font-bold text-[24px] tracking-[-1.2px] uppercase text-[#536000] leading-8">
                VOLT<br />REWARDS
              </h4>
              <div>
                <p className="font-body font-bold text-[36px] text-[#536000]">4,250</p>
                <p className="font-body font-extrabold text-[10px] tracking-[1px] uppercase text-[#536000]/60">
                  Points Available
                </p>
              </div>
              <Zap className="absolute -bottom-1 right-1 w-[85px] h-[107px] text-[#536000]/20" />
            </div>
          </section>

          {/* ── 09. USAGE GUIDELINES ── */}
          <section className="flex flex-col gap-12">
            <SectionHeading number="09" title="Usage Guidelines" />

            {/* DO */}
            <div className="bg-primary/5 border border-primary/20 rounded-3xl p-8 flex flex-col gap-6">
              <div className="flex items-center gap-2">
                <CheckCircle className="w-5 h-5 text-primary" />
                <span className="font-body font-bold text-[20px] text-primary">DO</span>
              </div>
              <div className="flex flex-col gap-4">
                {[
                  "Use extreme whitespace to create an editorial feel.",
                  "Apply #E2FF3B only to meaningful actions and data.",
                  "Embrace pure #000000 for maximum contrast.",
                ].map((item) => (
                  <div key={item} className="flex items-start gap-3">
                    <div className="w-1 h-1.5 rounded-full bg-primary mt-2 shrink-0" />
                    <p className="font-body text-[14px] leading-5 text-white/80">{item}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* DON'T */}
            <div className="bg-error/5 border border-error/20 rounded-3xl p-8 flex flex-col gap-6">
              <div className="flex items-center gap-2">
                <XCircle className="w-5 h-5 text-error" />
                <span className="font-body font-bold text-[20px] text-error">DON&apos;T</span>
              </div>
              <div className="flex flex-col gap-4">
                {[
                  "Do not use 1px solid borders for container boundaries.",
                  "Do not use drop shadows; use neon glow sparingly.",
                  "Avoid using primary lime for body copy.",
                ].map((item) => (
                  <div key={item} className="flex items-start gap-3">
                    <div className="w-1 h-1.5 rounded-full bg-error mt-2 shrink-0" />
                    <p className="font-body text-[14px] leading-5 text-white/80">{item}</p>
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
