"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

export default function Preloader() {
  const [loading, setLoading] = useState(true);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    // Check if user has already loaded in this session
    const hasLoaded = sessionStorage.getItem("anjalsh_preloader_seen");
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
            sessionStorage.setItem("anjalsh_preloader_seen", "true");
          }, 400);
          return 100;
        }
        const increment = Math.floor(Math.random() * 14) + 6;
        return Math.min(prev + increment, 100);
      });
    }, 45);

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
            transition: { duration: 0.8, ease: [0.76, 0, 0.24, 1] },
          }}
          className="fixed inset-0 z-[10000] flex flex-col justify-between bg-[#070707] p-8 md:p-14 text-white"
        >
          {/* Top metadata */}
          <div className="flex justify-between items-center text-xs font-mono text-zinc-500 uppercase tracking-widest">
            <span>ANJALSH®️</span>
            <span>PORTFOLIO ARCHIVE / 2024–2025</span>
          </div>

          {/* Center Brand Identity */}
          <div className="flex flex-col items-center justify-center space-y-4 my-auto">
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="font-heading text-4xl sm:text-6xl md:text-8xl font-bold tracking-tight text-white"
            >
              ANJALSH<span className="text-accent text-2xl md:text-4xl align-top">®️</span>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.3, duration: 0.6 }}
              className="text-xs sm:text-sm tracking-cinema font-mono text-zinc-400 uppercase text-center"
            >
              SHAPING VISUAL STORIES.
            </motion.p>
          </div>

          {/* Bottom Progress Bar & Counter */}
          <div className="space-y-4">
            <div className="flex justify-between items-end font-mono text-xs text-zinc-500">
              <span className="tracking-widest">INITIALIZING VISUAL REEL</span>
              <span className="text-accent text-sm font-semibold">{progress}%</span>
            </div>
            <div className="w-full h-[1px] bg-zinc-800 overflow-hidden relative">
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
