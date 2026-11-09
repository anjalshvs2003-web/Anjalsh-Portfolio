"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import Image from "next/image";
import dynamic from "next/dynamic";
import { siteConfig } from "@/data/siteConfig";
import { ArrowDown, ArrowUpRight, Sparkles, Film, Camera } from "lucide-react";

// Dynamically import 3D canvas with ssr disabled for optimal performance
const Hero3DCanvas = dynamic(() => import("@/components/canvas/Hero3DCanvas"), {
  ssr: false,
});

export default function Hero() {
  return (
    <section
      id="home"
      className="relative min-h-screen w-full flex flex-col justify-between pt-28 pb-12 px-6 sm:px-8 lg:px-14 overflow-hidden bg-[#100D0F]"
    >
      {/* 3D WebGL Canvas Layer */}
      <Hero3DCanvas />

      {/* Atmospheric Vignette & Depth Gradients */}
      <div className="absolute inset-0 pointer-events-none z-[1] bg-gradient-to-b from-[#100D0F]/90 via-transparent to-[#100D0F]" />
      <div className="absolute inset-0 pointer-events-none z-[1] bg-[radial-gradient(circle_at_center,transparent_30%,#100D0F_95%)]" />

      {/* Top Meta Header: Status & Disciplines */}
      <div className="relative z-10 max-w-7xl w-full mx-auto flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 border-b border-[#33292C] pb-5">
        <div className="flex items-center space-x-3 text-xs font-mono">
          <span className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-accent opacity-75" />
            <span className="relative inline-flex rounded-full h-2 w-2 bg-accent" />
          </span>
          <span className="text-zinc-400 tracking-wider">
            {siteConfig.availabilityStatus}
          </span>
        </div>

        <div className="text-[11px] font-mono tracking-ultra text-[#999194] uppercase flex items-center space-x-3 sm:space-x-4">
          <span className="text-accent font-medium">INDEPENDENT CREATIVE PROFESSIONAL</span>
          <span className="text-[#33292C]">/</span>
          <span>EST. 2020</span>
        </div>
      </div>

      {/* Main Asymmetrical Editorial Composition (Reference 01 Inspired) */}
      <div className="relative z-10 max-w-7xl w-full mx-auto my-auto py-8 lg:py-14">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          {/* Left Column: Typographic Monument */}
          <div className="lg:col-span-7 space-y-6">
            {/* Small Label */}
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
              className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-[#211A1D] border border-[#33292C] text-[11px] font-mono text-[#F5F2F0]"
            >
              <span className="w-1.5 h-1.5 rounded-full bg-accent" />
              <span className="text-accent uppercase font-semibold">
                CREATIVE MULTIMEDIA PROFESSIONAL
              </span>
            </motion.div>

            {/* Oversized Brand Typography */}
            <motion.div
              initial={{ opacity: 0, y: 35 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.9, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
              className="space-y-1"
            >
              <h1 className="font-heading font-black tracking-tighter text-[#F5F2F0] text-[15vw] sm:text-[12vw] lg:text-[7.5rem] leading-[0.85] select-none">
                ANJALSH<sup className="text-accent text-3xl sm:text-5xl lg:text-7xl ml-1 font-mono font-bold">®️</sup>
              </h1>
              <p className="font-heading text-2xl sm:text-3xl lg:text-4xl font-bold tracking-tight text-white pt-2">
                {siteConfig.tagline}
              </p>
            </motion.div>

            {/* Personal Statement */}
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.85, delay: 0.25, ease: [0.16, 1, 0.3, 1] }}
              className="text-[#999194] text-base sm:text-lg font-light leading-relaxed max-w-xl"
            >
              {siteConfig.bio.hero}
            </motion.p>

            {/* CTAs */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.85, delay: 0.35, ease: [0.16, 1, 0.3, 1] }}
              className="flex flex-wrap items-center gap-4 pt-2"
            >
              <Link
                href="#work"
                className="inline-flex items-center space-x-3 px-8 py-4 rounded-full bg-accent text-black font-semibold text-xs font-mono tracking-widest hover:bg-accent-hover transition-all duration-300 shadow-[0_0_30px_rgba(240,120,61,0.35)] group"
              >
                <span>VIEW SELECTED WORKS</span>
                <ArrowDown className="w-4 h-4 group-hover:translate-y-1 transition-transform" />
              </Link>

              <Link
                href="#contact"
                className="inline-flex items-center space-x-2 px-8 py-4 rounded-full bg-[#211A1D] border border-[#33292C] text-xs font-mono tracking-widest text-[#F5F2F0] hover:border-accent hover:text-accent transition-all duration-300 group"
              >
                <span>LET&apos;S COLLABORATE</span>
                <ArrowUpRight className="w-4 h-4 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
              </Link>
            </motion.div>

            {/* Disciplines Strip */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 1, delay: 0.5 }}
              className="pt-4 flex flex-wrap gap-2 text-[11px] font-mono text-[#999194]"
            >
              {[
                "Cinematography",
                "Color Grading",
                "Photography",
                "Graphic Design",
                "AI Films",
                "Motion Graphics",
              ].map((item, i) => (
                <span
                  key={item}
                  className="px-2.5 py-1 rounded bg-[#211A1D]/80 border border-[#33292C] text-xs"
                >
                  <span className="text-accent mr-1.5">•</span>
                  {item}
                </span>
              ))}
            </motion.div>
          </div>

          {/* Right Column: Layered Asymmetrical Composition */}
          <div className="lg:col-span-5 relative flex justify-center lg:justify-end">
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 30 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              transition={{ duration: 1, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
              className="relative w-full max-w-[380px] sm:max-w-[420px]"
            >
              {/* Primary Frame: Authentic Studio Portrait */}
              <div className="relative aspect-[4/5] rounded-2xl overflow-hidden bg-[#211A1D] border border-[#33292C] shadow-2xl group hover:border-accent/60 transition-colors duration-500">
                <Image
                  src="/images/photography/anjalsh-portrait.jpg"
                  alt="Anjalsh V.S. — Creative Multimedia Professional"
                  fill
                  priority
                  className="object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
                  sizes="(max-width: 768px) 100vw, 420px"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#100D0F] via-transparent to-transparent opacity-80" />

                {/* Film Data Tag in Primary Frame */}
                <div className="absolute top-4 left-4 right-4 flex items-center justify-between text-[10px] font-mono text-[#F5F2F0] bg-[#100D0F]/70 px-3 py-1.5 rounded-lg border border-[#33292C] backdrop-blur-md">
                  <span className="flex items-center space-x-1.5">
                    <Camera className="w-3 h-3 text-accent" />
                    <span>PORTRAIT ARCHIVE</span>
                  </span>
                  <span className="text-accent font-semibold">2024–2025</span>
                </div>

                {/* Bottom Frame Label */}
                <div className="absolute bottom-5 left-5 right-5">
                  <span className="text-[10px] font-mono tracking-widest text-accent uppercase block">
                    ANJALSH V.S.
                  </span>
                  <span className="font-heading text-lg font-bold text-white block mt-0.5">
                    Creative Director & Filmmaker
                  </span>
                </div>
              </div>

              {/* Overlapping Secondary Frame (Cinema Frame Grab) */}
              <motion.div
                initial={{ opacity: 0, x: 25, y: 25 }}
                animate={{ opacity: 1, x: 0, y: 0 }}
                transition={{ duration: 0.9, delay: 0.4, ease: [0.16, 1, 0.3, 1] }}
                className="absolute -bottom-8 -left-8 sm:-left-12 w-48 sm:w-56 aspect-[16/9] rounded-xl overflow-hidden bg-[#191417] border border-accent/40 shadow-2xl hidden sm:block group"
              >
                <Image
                  src="/images/ai-films/the-forgotten-smile.jpg"
                  alt="AI Short Film Cinema Frame"
                  fill
                  className="object-cover group-hover:scale-110 transition-transform duration-500"
                  sizes="240px"
                />
                <div className="absolute inset-0 bg-black/40 group-hover:bg-transparent transition-colors" />
                <div className="absolute bottom-2 left-2 right-2 flex items-center justify-between text-[9px] font-mono text-white bg-black/60 px-2 py-0.5 rounded backdrop-blur-sm">
                  <span className="flex items-center space-x-1">
                    <Film className="w-2.5 h-2.5 text-accent" />
                    <span>NEURAL CINEMA</span>
                  </span>
                  <span className="text-accent">2.39:1</span>
                </div>
              </motion.div>

              {/* Decorative Accent Orange Corner Marker */}
              <div className="absolute -top-3 -right-3 w-8 h-8 border-t-2 border-r-2 border-accent pointer-events-none" />
            </motion.div>
          </div>
        </div>
      </div>

      {/* Bottom Editorial Indicator & Camera Strip */}
      <div className="relative z-10 max-w-7xl w-full mx-auto flex flex-col sm:flex-row items-center justify-between gap-4 pt-4 border-t border-[#33292C] text-xs font-mono text-[#999194]">
        <div className="flex items-center space-x-4">
          <span className="flex items-center space-x-2">
            <Sparkles className="w-3.5 h-3.5 text-accent" />
            <span className="text-[#F5F2F0]">52+ CURATED PROJECTS</span>
          </span>
          <span className="text-[#33292C]">/</span>
          <span className="hidden sm:inline">8 CREATIVE DISCIPLINES</span>
        </div>

        {/* Small Orange Animated Indicator showing that user can explore the website */}
        <Link
          href="#work"
          className="group flex items-center space-x-3 text-accent hover:text-accent-hover transition-colors"
        >
          <span className="text-[11px] tracking-widest uppercase font-semibold">
            EXPLORE EXHIBITION
          </span>
          <div className="w-8 h-8 rounded-full border border-accent/40 flex items-center justify-center group-hover:border-accent group-hover:bg-accent/10 transition-colors">
            <motion.div
              animate={{ y: [0, 4, 0] }}
              transition={{ repeat: Infinity, duration: 1.5, ease: "easeInOut" }}
            >
              <ArrowDown className="w-3.5 h-3.5 text-accent" />
            </motion.div>
          </div>
        </Link>
      </div>
    </section>
  );
}
