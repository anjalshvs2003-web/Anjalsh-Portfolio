"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import dynamic from "next/dynamic";
import { siteConfig } from "@/data/siteConfig";
import { ArrowDown, ArrowUpRight, Compass, Sparkles } from "lucide-react";

// Dynamically import 3D canvas with ssr disabled for optimal performance
const Hero3DCanvas = dynamic(() => import("@/components/canvas/Hero3DCanvas"), {
  ssr: false,
});

export default function Hero() {
  return (
    <section className="relative min-h-screen w-full flex flex-col justify-between pt-28 pb-10 px-6 sm:px-8 lg:px-14 overflow-hidden bg-[#080808]">
      {/* 3D WebGL Canvas Layer */}
      <Hero3DCanvas />

      {/* Atmospheric Vignette & Depth Gradients */}
      <div className="absolute inset-0 pointer-events-none z-[1] bg-gradient-to-b from-[#080808]/85 via-transparent to-[#080808]" />
      <div className="absolute inset-0 pointer-events-none z-[1] bg-[radial-gradient(circle_at_center,transparent_30%,#080808_95%)]" />

      {/* Top Meta Header: Status & Disciplines */}
      <div className="relative z-10 max-w-7xl w-full mx-auto flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 border-b border-white/[0.08] pb-5">
        <div className="flex items-center space-x-3 text-xs font-mono">
          <span className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-accent opacity-75" />
            <span className="relative inline-flex rounded-full h-2 w-2 bg-accent" />
          </span>
          <span className="text-zinc-400 tracking-wider">
            {siteConfig.availabilityStatus}
          </span>
        </div>

        <div className="text-[11px] font-mono tracking-ultra text-zinc-500 uppercase flex items-center space-x-3 sm:space-x-4">
          <span className="text-accent font-medium">3D SPACE ACTIVE</span>
          <span className="text-zinc-700">/</span>
          <span>PARALLAX CAMERA</span>
        </div>
      </div>

      {/* Main Hero Center Typography */}
      <div className="relative z-10 max-w-7xl w-full mx-auto my-auto py-10 lg:py-16">
        <div className="space-y-4">
          {/* Introduction Badge */}
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            className="inline-flex items-center space-x-2 px-3.5 py-1 rounded-full bg-white/[0.04] border border-white/10 text-[11px] font-mono text-zinc-300"
          >
            <Sparkles className="w-3.5 h-3.5 text-accent" />
            <span>VISUAL CREATOR / FILMMAKER / DESIGNER</span>
          </motion.div>

          {/* Oversized Brand Typography */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
          >
            <h1 className="font-heading font-black tracking-tighter text-white text-[13vw] sm:text-[12vw] lg:text-[11vw] leading-[0.85] select-none">
              ANJALSH<span className="text-accent text-3xl sm:text-5xl md:text-8xl align-top ml-1">®️</span>
            </h1>
          </motion.div>

          {/* Tagline & Editorial Summary */}
          <motion.div
            initial={{ opacity: 0, y: 25 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.85, delay: 0.25, ease: [0.16, 1, 0.3, 1] }}
            className="flex flex-col md:flex-row md:items-end justify-between gap-6 pt-2"
          >
            <div>
              <p className="font-heading text-2xl sm:text-3xl md:text-5xl font-light tracking-tight text-white">
                {siteConfig.tagline}
              </p>
              <p className="text-muted text-sm sm:text-base md:text-lg max-w-2xl font-light mt-3 leading-relaxed">
                {siteConfig.bio.hero}
              </p>
            </div>

            {/* CTAs with Magnetic Vibe */}
            <div className="flex flex-wrap items-center gap-4 pt-2">
              <Link
                href="#work"
                className="inline-flex items-center space-x-3 px-8 py-4 rounded-full bg-white text-black font-semibold text-xs font-mono tracking-widest hover:bg-accent transition-all duration-300 shadow-[0_0_25px_rgba(255,255,255,0.15)] hover:shadow-[0_0_35px_rgba(212,255,0,0.35)] group"
              >
                <span>VIEW SELECTED WORKS</span>
                <ArrowDown className="w-4 h-4 group-hover:translate-y-1 transition-transform" />
              </Link>

              <Link
                href="#contact"
                className="inline-flex items-center space-x-2 px-8 py-4 rounded-full border border-white/20 text-xs font-mono tracking-widest text-white hover:border-accent hover:text-accent hover:bg-accent/5 transition-all duration-300"
              >
                <span>CONTACT DIRECTLY</span>
                <ArrowUpRight className="w-4 h-4" />
              </Link>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Hero Bottom Bar */}
      <div className="relative z-10 max-w-7xl w-full mx-auto grid grid-cols-2 md:grid-cols-4 gap-6 pt-5 border-t border-white/[0.08] text-xs font-mono">
        <div>
          <span className="text-muted block uppercase text-[10px] tracking-wider">CREATIVE DISCIPLINES</span>
          <span className="text-white mt-1 block">Direction &bull; DP &bull; Color &bull; AI</span>
        </div>

        <div>
          <span className="text-muted block uppercase text-[10px] tracking-wider">BASE STUDIO</span>
          <span className="text-white mt-1 block">7 Clouds Ads & Studios</span>
        </div>

        <div>
          <span className="text-muted block uppercase text-[10px] tracking-wider">ORIGIN</span>
          <span className="text-white mt-1 block">{siteConfig.location}</span>
        </div>

        <div className="flex justify-end items-center">
          <a
            href="#work"
            className="flex items-center space-x-2 text-muted hover:text-accent transition-colors"
          >
            <Compass className="w-3.5 h-3.5 animate-spin" style={{ animationDuration: "12s" }} />
            <span className="tracking-wider">SCROLL TO EXHIBITION</span>
          </a>
        </div>
      </div>
    </section>
  );
}
