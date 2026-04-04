import type { Metadata } from "next";
import { Manrope, Space_Grotesk } from "next/font/google";
import "./globals.css";

const manrope = Manrope({
  variable: "--font-manrope",
  subsets: ["latin"],
});

const spaceGrotesk = Space_Grotesk({
  variable: "--font-space-grotesk",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "COMRIDE — The Electric Void",
  description: "Interactive mobile wireframe for Comride",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${manrope.variable} ${spaceGrotesk.variable} h-full dark`}>
      <body className="min-h-full bg-black flex items-center justify-center font-body">
        {/* Mobile Frame Wrapper */}
        <div className="relative w-[390px] h-[844px] bg-[#000] rounded-[44px] overflow-hidden border-[3px] border-outline-variant/20 shadow-2xl shadow-black/50 flex flex-col">
          {/* Notch */}
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[126px] h-[34px] bg-black rounded-b-[20px] z-50" />
          {/* Status bar */}
          <div className="relative z-40 flex items-center justify-between px-8 pt-3 pb-1 text-[11px] font-semibold text-white/80">
            <span>9:41</span>
            <div className="flex items-center gap-1">
              <svg width="16" height="12" viewBox="0 0 16 12" fill="currentColor"><rect x="0" y="4" width="3" height="8" rx="1" opacity="0.3"/><rect x="4.5" y="2.5" width="3" height="9.5" rx="1" opacity="0.5"/><rect x="9" y="1" width="3" height="11" rx="1" opacity="0.7"/><rect x="13.5" y="0" width="2.5" height="12" rx="1"/></svg>
              <svg width="15" height="12" viewBox="0 0 15 12" fill="currentColor"><path d="M7.5 3.6c1.7 0 3.2.7 4.3 1.8l1.1-1.1C11.5 2.9 9.6 2 7.5 2S3.5 2.9 2.1 4.3l1.1 1.1C4.3 4.3 5.8 3.6 7.5 3.6zm0 3.2c.9 0 1.8.4 2.4 1l1.1-1.1c-.9-.9-2.1-1.5-3.5-1.5s-2.6.5-3.5 1.5l1.1 1.1c.6-.6 1.5-1 2.4-1zM7.5 9c.6 0 1 .4 1.2.7L7.5 11l-1.2-1.3c.2-.3.6-.7 1.2-.7z"/></svg>
              <svg width="25" height="12" viewBox="0 0 25 12" fill="currentColor"><rect x="0" y="1" width="21" height="10" rx="2" stroke="currentColor" strokeWidth="1" fill="none"/><rect x="22" y="4" width="2" height="4" rx="0.5"/><rect x="1.5" y="2.5" width="15" height="7" rx="1" fill="#E2FF3B"/></svg>
            </div>
          </div>
          {/* Content */}
          <div className="flex-1 overflow-hidden flex flex-col px-6">
            {children}
          </div>
        </div>
      </body>
    </html>
  );
}
