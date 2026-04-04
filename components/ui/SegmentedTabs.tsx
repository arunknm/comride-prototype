"use client";

export default function SegmentedTabs({
  tabs,
  active,
  onChange,
}: {
  tabs: string[];
  active: string;
  onChange: (tab: string) => void;
}) {
  return (
    <div className="bg-black border border-outline-variant/20 rounded-full h-[58px] flex items-center p-1">
      {tabs.map((tab) => (
        <button
          key={tab}
          onClick={() => onChange(tab)}
          className={`flex-1 h-full rounded-full flex items-center justify-center transition-all ${
            active === tab ? "bg-primary" : ""
          }`}
        >
          <span
            className={`font-body font-extrabold text-[12px] tracking-[1.2px] uppercase ${
              active === tab ? "text-[#536000]" : "text-on-surface-variant"
            }`}
          >
            {tab}
          </span>
        </button>
      ))}
    </div>
  );
}
