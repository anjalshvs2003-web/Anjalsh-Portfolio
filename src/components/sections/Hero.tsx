"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import Image from "next/image";
import { siteConfig } from "@/data/siteConfig";
import { ArrowDown, ArrowUpRight, Play, Sparkles } from "lucide-react";

export default function Hero() {
  return (
    <section className="relative min-h-screen w-full flex flex-col justify-between pt-32 pb-12 px-6 sm:px-8 lg:px-12 overflow-hidden bg-[#0a0a0a]">
      {/* Background Cinematic Atmosphere */}
      <div className="absolute inset-0 pointer-events-none z-0">
        <Image
          src="https://images.unsplash.com/photo-1518709268805-4e9042af9f23?q=80&w=2000&auto=format&fit=crop"
          alt="Cinematic atmospheric background"
          fill
          priority
          className="object-cover opacity-20 filter contrast-125 saturate-50"
        />
        {/* Gradients */}
        <div className="absolute inset-0 bg-gradient-to-b from-[#0a0a0a]/90 via-[#0a0a0a]/80 to-[#0a0a0a]" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(229,169,60,0.06)_0,transparent_70%)]" />
      </div>

      {/* Top Meta Header: Status & Disciplines */}
      <div className="relative z-10 max-w-7xl w-full mx-auto flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 border-b border-white/[0.08] pb-6">
        <div className="flex items-center space-x-3 text-xs font-mono">
          <span className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-accent opacity-75" />
            <span className="relative inline-flex rounded-full h-2 w-2 bg-accent" />
          </span>
          <span className="text-zinc-400 tracking-wider">
            {siteConfig.availabilityStatus}
          </span>
        </div>

        <div className="text-xs font-mono tracking-widest text-zinc-500 uppercase flex items-center space-x-4">
          <span>CINEMATOGRAPHY</span>
          <span>•</span>
          <span>POST-PRODUCTION</span>
          <span>•</span>
          <span>AI CINEMA</span>
        </div>
      </div>

      {/* Main Hero Center Typography */}
      <div className="relative z-10 max-w-7xl w-full mx-auto my-auto py-12 lg:py-16">
        {/* Animated Brand / Identity */}
        <div className="space-y-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            className="inline-flex items-center space-x-2 px-3.5 py-1 rounded-full bg-white/[0.04] border border-white/10 text-xs font-mono text-zinc-300"
          >
            <Sparkles className="w-3.5 h-3.5 text-accent" />
            <span>DIRECTOR & MULTIMEDIA ARTIST</span>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
          >
            <h1 className="font-heading font-black tracking-tight text-white text-[12vw] sm:text-[11vw] lg:text-[10vw] leading-[0.88] select-none">
              ANJALSH<span className="text-accent text-3xl sm:text-5xl md:text-7xl align-top">®️</span>
            </h1>
          </motion.div>

          {/* Tagline */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.25, ease: [0.16, 1, 0.3, 1] }}
            className="flex flex-col md:flex-row md:items-end justify-between gap-6 pt-4"
          >
            <div>
              <p className="font-heading text-2xl sm:text-3xl md:text-5xl font-light tracking-tight text-zinc-200">
                {siteConfig.tagline}
              </p>
              <p className="text-zinc-400 text-sm sm:text-base md:text-lg max-w-2xl font-light mt-3 leading-relaxed">
                {siteConfig.bio.hero}
              </p>
            </div>

            {/* CTAs */}
            <div className="flex flex-wrap items-center gap-4 pt-2">
              <Link
                href="#work"
                className="inline-flex items-center space-x-3 px-8 py-4 rounded-full bg-white text-black font-semibold text-xs font-mono tracking-widest hover:bg-accent transition-all duration-300 shadow-xl group"
              >
                <span>VIEW PROJECTS</span>
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
      <div className="relative z-10 max-w-7xl w-full mx-auto grid grid-cols-2 md:grid-cols-4 gap-6 pt-6 border-t border-white/[0.08] text-xs font-mono">
        <div>
          <span className="text-zinc-500 block uppercase">CURRENT AFFILIATION</span>
          <span className="text-zinc-200 mt-1 block">7 Clouds Ads & Studios</span>
        </div>

        <div>
          <span className="text-zinc-500 block uppercase">FOCUS DISCIPLINES</span>
          <span className="text-zinc-200 mt-1 block">Colorist &bull; DP &bull; Editor</span>
        </div>

        <div>
          <span className="text-zinc-500 block uppercase">ORIGIN</span>
          <span className="text-zinc-200 mt-1 block">{siteConfig.location}</span>
        </div>

        <div className="flex justify-end items-center">
          <a
            href="#work"
            className="flex items-center space-x-2 text-zinc-400 hover:text-accent transition-colors"
          >
            <span>SCROLL TO DISCOVER</span>
            <ArrowDown className="w-3.5 h-3.5 animate-bounce" />
          </a>
        </div>
      </div>
    </section>
  );
}
