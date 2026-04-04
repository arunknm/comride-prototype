"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";

export default function SplashScreen() {
  const router = useRouter();
  const [phase, setPhase] = useState(0);

  useEffect(() => {
    const t1 = setTimeout(() => setPhase(1), 400);
    const t2 = setTimeout(() => setPhase(2), 1200);
    const t3 = setTimeout(() => router.push("/login"), 2800);
    return () => { clearTimeout(t1); clearTimeout(t2); clearTimeout(t3); };
  }, [router]);

  return (
    <div className="flex-1 flex flex-col items-center justify-center bg-[#000] relative overflow-hidden">
      {/* Background glow — subtle */}
      <div className="absolute inset-0">
        <div className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[300px] h-[300px] rounded-full bg-primary/6 blur-[120px]" />
        <div className="absolute bottom-1/4 left-1/3 w-[200px] h-[200px] rounded-full bg-primary/3 blur-[100px]" />
      </div>

      {/* Road line animation */}
      <motion.div
        className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[2px] bg-gradient-to-t from-primary/40 to-transparent"
        initial={{ height: 0 }}
        animate={{ height: "40%" }}
        transition={{ duration: 1.5, ease: "easeOut" }}
      />

      <AnimatePresence>
        {phase >= 0 && (
          <motion.div
            initial={{ scale: 0.5, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
            className="relative z-10 flex flex-col items-center"
          >
            {/* Logo */}
            <div className="w-24 h-24 rounded-3xl bg-primary flex items-center justify-center glow-primary mb-6">
              <svg width="48" height="48" viewBox="0 0 40 40" fill="none">
                <path d="M20 5L8 15v15a3 3 0 003 3h18a3 3 0 003-3V15L20 5z" stroke="black" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/>
                <path d="M15 33V22h10v11" stroke="black" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/>
                <circle cx="20" cy="15" r="3" stroke="black" strokeWidth="2"/>
              </svg>
            </div>

            {/* Brand name */}
            <motion.h1
              initial={{ y: 10, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.3, duration: 0.5 }}
              className="text-5xl font-headline font-black tracking-tighter uppercase"
            >
              <span className="text-primary">Com</span>
              <span className="text-white">ride</span>
            </motion.h1>
          </motion.div>
        )}
      </AnimatePresence>

      {phase >= 1 && (
        <motion.p
          initial={{ y: 10, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.5 }}
          className="text-xs tracking-[0.2em] uppercase font-headline text-on-surface-variant mt-4 relative z-10"
        >
          The Digital Home for Motorcyclists
        </motion.p>
      )}

      {phase >= 2 && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="absolute bottom-16 flex gap-1.5 z-10"
        >
          {[0, 1, 2].map((i) => (
            <motion.div
              key={i}
              className="w-2 h-2 rounded-full bg-primary"
              animate={{ opacity: [0.3, 1, 0.3] }}
              transition={{ duration: 1, repeat: Infinity, delay: i * 0.2 }}
            />
          ))}
        </motion.div>
      )}
    </div>
  );
}
