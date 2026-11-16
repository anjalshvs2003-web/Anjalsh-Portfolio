"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import Image from "next/image";
import dynamic from "next/dynamic";
import { siteConfig } from "@/data/siteConfig";
import { ArrowDown, ArrowUpRight, Sparkles, Camera, MapPin } from "lucide-react";

// Dynamically import 3D canvas with ssr disabled for optimal performance
const Hero3DCanvas = dynamic(() => import("@/components/canvas/Hero3DCanvas"), {
  ssr: false,
});

export default function Hero() {
  const [mouseOffset, setMouseOffset] = useState({ x: 0, y: 0 });

  const handleMouseMove = (e: React.MouseEvent<HTMLElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width - 0.5;
    const y = (e.clientY - rect.top) / rect.height - 0.5;
    setMouseOffset({ x: x * 45, y: y * 45 });
  };

  return (
    <section
      id="home"
      onMouseMove={handleMouseMove}
      className="relative min-h-screen w-full flex flex-col justify-between pt-28 pb-12 px-6 sm:px-8 lg:px-14 overflow-hidden bg-[#0A0D12]"
    >
      {/* 3D WebGL Canvas Layer (Interactive 3D Gradient Shapes: Torus Knot, Icosahedron, Orb, Ring) */}
      <Hero3DCanvas />

      {/* Interactive 2D Ambient Gradient Orbs & Meshes */}
      <motion.div
        animate={{
          x: mouseOffset.x * 1.4,
          y: mouseOffset.y * 1.4,
        }}
        transition={{ type: "spring", damping: 35, stiffness: 180 }}
        className="absolute top-1/4 -left-20 w-[480px] h-[480px] rounded-full bg-gradient-to-tr from-blue-600/20 via-cyan-500/15 to-transparent blur-[120px] pointer-events-none z-[1]"
      />

      <motion.div
        animate={{
          x: -mouseOffset.x * 1.2,
          y: -mouseOffset.y * 1.2,
        }}
        transition={{ type: "spring", damping: 35, stiffness: 180 }}
        className="absolute bottom-1/4 right-0 w-[520px] h-[520px] rounded-full bg-gradient-to-bl from-indigo-600/18 via-blue-500/12 to-transparent blur-[130px] pointer-events-none z-[1]"
      />

      {/* Interactive 2D Geometric Vector Accents */}
      <div className="absolute inset-0 pointer-events-none z-[2] overflow-hidden">
        {/* Subtle 2D dashed orbital ring */}
        <motion.div
          animate={{
            x: mouseOffset.x * 0.4,
            y: mouseOffset.y * 0.4,
            rotate: 360,
          }}
          transition={{
            x: { type: "spring", damping: 40, stiffness: 150 },
            y: { type: "spring", damping: 40, stiffness: 150 },
            rotate: { repeat: Infinity, duration: 60, ease: "linear" },
          }}
          className="absolute top-1/3 left-1/4 w-[360px] h-[360px] rounded-full border border-dashed border-accent/15 opacity-40 hidden lg:block"
        />

        {/* Technical Corner Crosshairs */}
        <div className="absolute top-32 left-10 text-[10px] font-mono text-[#94A3B8]/30 hidden xl:block select-none">
          <span>+ 01.3D_GEO_FIELD</span>
        </div>
        <div className="absolute top-32 right-10 text-[10px] font-mono text-[#94A3B8]/30 hidden xl:block select-none text-right">
          <span>LAT 10.8505° N &bull; 76.2711° E +</span>
        </div>
      </div>

      {/* Atmospheric Vignette & Depth Gradients */}
      <div className="absolute inset-0 pointer-events-none z-[2] bg-gradient-to-b from-[#0A0D12]/85 via-transparent to-[#0A0D12]" />
      <div className="absolute inset-0 pointer-events-none z-[2] bg-[radial-gradient(circle_at_center,transparent_35%,#0A0D12_92%)]" />

      {/* Top Meta Header: Location, Availability & Profession */}
      <div className="relative z-10 max-w-7xl w-full mx-auto flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 border-b border-[#222C3D] pb-5">
        <div className="flex items-center space-x-3 text-xs font-mono">
          <span className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-accent opacity-75" />
            <span className="relative inline-flex rounded-full h-2 w-2 bg-accent" />
          </span>
          <span className="text-[#94A3B8] tracking-wider">
            {siteConfig.availabilityStatus}
          </span>
        </div>

        <div className="text-[11px] font-mono tracking-wider text-[#94A3B8] uppercase flex items-center space-x-3 sm:space-x-4">
          <span className="flex items-center space-x-1.5 text-accent font-medium">
            <MapPin className="w-3 h-3 text-accent" />
            <span>KERALA, INDIA &bull; WORLDWIDE</span>
          </span>
          <span className="text-[#222C3D]">/</span>
          <span>EST. 2020</span>
        </div>
      </div>

      {/* Main Asymmetrical Editorial Composition */}
      <div className="relative z-10 max-w-7xl w-full mx-auto my-auto py-8 lg:py-12">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-center">
          {/* Left Column: Typographic Monument */}
          <div className="lg:col-span-7 space-y-6">
            {/* Small Label Pill */}
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
              className="inline-flex items-center space-x-2 px-3.5 py-1 rounded-full bg-[#161D2A] border border-[#222C3D] text-[11px] font-mono text-[#F8FAFC]"
            >
              <span className="w-1.5 h-1.5 rounded-full bg-accent" />
              <span className="text-accent uppercase font-semibold">
                ANJALSH V.S. &bull; PORTFOLIO
              </span>
            </motion.div>

            {/* Main Headline: I CREATE VISUALS THAT TELL STORIES */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
              className="space-y-3"
            >
              <h1 className="font-heading font-extrabold tracking-tight text-[#F8FAFC] text-4xl sm:text-6xl md:text-7xl lg:text-[4.75rem] leading-[1.02]">
                I CREATE VISUALS THAT <span className="text-accent underline decoration-accent/40 decoration-wavy decoration-2 underline-offset-8">TELL STORIES.</span>
              </h1>
              <p className="font-heading text-lg sm:text-2xl font-semibold text-white/90 pt-1 tracking-normal">
                {siteConfig.profession} based in {siteConfig.location}.
              </p>
            </motion.div>

            {/* Professional Statement */}
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.25, ease: [0.16, 1, 0.3, 1] }}
              className="text-[#94A3B8] text-sm sm:text-base font-normal leading-relaxed max-w-xl"
            >
              {siteConfig.bio.positioning} Crafting intentional lighting, disciplined Swiss typography, and high-fidelity colour grading for commercials, films, and brands.
            </motion.p>

            {/* CTAs */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.35, ease: [0.16, 1, 0.3, 1] }}
              className="flex flex-wrap items-center gap-4 pt-2"
            >
              <Link
                href="#work"
                className="inline-flex items-center space-x-3 px-8 py-3.5 rounded-full bg-accent text-white font-semibold text-xs font-mono tracking-widest hover:bg-accent-hover transition-all duration-300 shadow-[0_0_25px_rgba(59,130,246,0.35)] group"
              >
                <span>VIEW SELECTED WORK</span>
                <ArrowDown className="w-4 h-4 group-hover:translate-y-1 transition-transform" />
              </Link>

              <Link
                href="#contact"
                className="inline-flex items-center space-x-2 px-8 py-3.5 rounded-full bg-[#161D2A] border border-[#222C3D] text-xs font-mono tracking-widest text-[#F8FAFC] hover:border-accent hover:text-accent transition-all duration-300 group"
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
              className="pt-2 flex flex-wrap gap-2 text-[11px] font-mono text-[#94A3B8]"
            >
              {[
                "Cinematography",
                "Color Grading",
                "Video Editing",
                "Graphic Design",
                "AI Films",
                "Motion Graphics",
              ].map((item) => (
                <span
                  key={item}
                  className="px-2.5 py-1 rounded bg-[#161D2A]/80 border border-[#222C3D] text-xs"
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
              className="relative w-full max-w-[360px] sm:max-w-[400px]"
            >
              {/* Primary Frame: Authentic Studio Portrait */}
              <div className="relative aspect-[4/5] rounded-2xl overflow-hidden bg-[#161D2A] border border-[#222C3D] shadow-2xl group hover:border-accent/60 transition-colors duration-500">
                <Image
                  src="/images/photography/anjalsh-portrait.jpg"
                  alt="Anjalsh V.S. — Creative Director, Filmmaker & Visual Artist"
                  fill
                  priority
                  className="object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
                  sizes="(max-width: 768px) 100vw, 400px"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#0A0D12] via-transparent to-transparent opacity-85" />

                {/* Film Data Tag in Primary Frame */}
                <div className="absolute top-4 left-4 right-4 flex items-center justify-between text-[10px] font-mono text-[#F8FAFC] bg-[#0A0D12]/75 px-3 py-1.5 rounded-lg border border-[#222C3D] backdrop-blur-md">
                  <span className="flex items-center space-x-1.5">
                    <Camera className="w-3 h-3 text-accent" />
                    <span>PORTRAIT ARCHIVE</span>
                  </span>
                  <span className="text-accent font-semibold">2024–2025</span>
                </div>

                {/* Bottom Frame Label */}
                <div className="absolute bottom-5 left-5 right-5">
                  <span className="text-[10px] font-mono tracking-widest text-accent uppercase block font-semibold">
                    ANJALSH V.S.
                  </span>
                  <span className="font-heading text-base sm:text-lg font-bold text-white block mt-0.5 leading-snug">
                    Creative Director & Filmmaker
                  </span>
                </div>
              </div>

              {/* Decorative Accent Blue Corner Marker */}
              <div className="absolute -top-3 -right-3 w-8 h-8 border-t-2 border-r-2 border-accent pointer-events-none" />
            </motion.div>
          </div>
        </div>
      </div>

      {/* Bottom Editorial Indicator & Archive Stats */}
      <div className="relative z-10 max-w-7xl w-full mx-auto flex flex-col sm:flex-row items-center justify-between gap-4 pt-4 border-t border-[#222C3D] text-xs font-mono text-[#94A3B8]">
        <div className="flex items-center space-x-4">
          <span className="flex items-center space-x-2">
            <Sparkles className="w-3.5 h-3.5 text-accent" />
            <span className="text-[#F8FAFC]">52+ CURATED PROJECTS</span>
          </span>
          <span className="text-[#222C3D]">/</span>
          <span className="hidden sm:inline">4 CORE DISCIPLINES</span>
        </div>

        {/* Small Blue Animated Indicator showing that user can explore the website */}
        <Link
          href="#work"
          className="group flex items-center space-x-3 text-accent hover:text-accent-hover transition-colors"
        >
          <span className="text-[11px] tracking-widest uppercase font-semibold">
            EXPLORE SELECTED WORKS
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
