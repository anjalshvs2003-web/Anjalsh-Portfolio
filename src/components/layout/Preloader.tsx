"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

export default function Preloader() {
  const [loading, setLoading] = useState(true);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const hasLoaded = sessionStorage.getItem("anjalsh_3d_preloader_seen");
    if (hasLoaded) {
      setLoading(false);
      return;
    }

    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval);
          setTimeout(() => {
            setLoading(false);
            sessionStorage.setItem("anjalsh_3d_preloader_seen", "true");
          }, 350);
          return 100;
        }
        const increment = Math.floor(Math.random() * 12) + 7;
        return Math.min(prev + increment, 100);
      });
    }, 35);

    return () => clearInterval(interval);
  }, []);

  return (
    <AnimatePresence>
      {loading && (
        <motion.div
          key="preloader"
          initial={{ opacity: 1 }}
          exit={{
            y: "-100%",
            transition: { duration: 0.85, ease: [0.76, 0, 0.24, 1] },
          }}
          className="fixed inset-0 z-[10000] flex flex-col justify-between bg-[#100D0F] p-8 md:p-14 text-white"
        >
          {/* Top metadata */}
          <div className="flex justify-between items-center text-[11px] font-mono text-zinc-500 uppercase tracking-ultra">
            <span>ANJALSH®️</span>
            <span>3D DIGITAL EXHIBITION / 2024–2025</span>
          </div>

          {/* Center Brand Identity */}
          <div className="flex flex-col items-center justify-center space-y-4 my-auto text-center">
            <motion.h1
              initial={{ opacity: 0, y: 25 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
              className="font-heading text-5xl sm:text-7xl md:text-9xl font-bold tracking-tighter text-white"
            >
              ANJALSH<span className="text-accent text-3xl sm:text-5xl md:text-7xl align-top ml-1">®️</span>
            </motion.h1>

            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.3, duration: 0.6 }}
              className="space-y-1.5"
            >
              <p className="text-xs sm:text-sm tracking-cinema font-mono text-zinc-400 uppercase">
                SHAPING VISUAL STORIES.
              </p>
              <p className="text-[11px] font-mono tracking-widest text-accent uppercase font-medium">
                VISUAL CREATOR / FILMMAKER / DESIGNER
              </p>
            </motion.div>
          </div>

          {/* Bottom Progress Bar & Counter */}
          <div className="space-y-3">
            <div className="flex justify-between items-end font-mono text-xs text-zinc-500">
              <span className="tracking-widest text-[10px]">INITIALIZING 3D ENVIRONMENT</span>
              <span className="text-accent font-mono text-sm font-semibold">
                {String(progress).padStart(3, "0")}%
              </span>
            </div>
            <div className="w-full h-[1px] bg-white/10 overflow-hidden relative">
              <motion.div
                className="h-full bg-accent"
                style={{ width: `${progress}%` }}
                transition={{ ease: "easeOut" }}
              />
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
