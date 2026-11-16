"use client";

import Image from "next/image";
import { siteConfig } from "@/data/siteConfig";
import SectionHeader from "@/components/ui/SectionHeader";
import { CheckCircle2, Film, Palette, Cpu, Sparkles, Sliders, Layers } from "lucide-react";

export default function AboutSection() {
  const skillCategories = [
    {
      title: "01 — Film & Production",
      icon: Film,
      skills: [
        "Low-Key & Natural Light Sculpting",
        "Anamorphic Lens Selection & Framing (2.39:1 Scope)",
        "Sony Cinema Line (FX3 / FX6) & Blackmagic RAW",
        "Directing Commercial Talent & Creative Crews",
        "High Dynamic Range Sensor Preservation",
      ],
    },
    {
      title: "02 — Post Production & Colour",
      icon: Sliders,
      skills: [
        "DaVinci Resolve Studio (ACEScc, Custom Node Trees)",
        "Film Stock Emulation (Kodak 5219 / 2383 Stocks)",
        "Non-Linear Narrative Pacing (Premiere Pro & FCP)",
        "Sound Synchronisation & Foley Sculpting",
        "Mastering for DCI-P3 & Rec.709 Delivery",
      ],
    },
    {
      title: "03 — Design & Branding",
      icon: Palette,
      skills: [
        "Minimal Swiss Editorial Grids & Bespoke Typography",
        "Poster, Lookbook & Key Visual Design",
        "Luxury Brand Identity & Monogram Architecture",
        "Packaging, Label & Stationery Design",
        "Motion Typography (Cinema 4D & After Effects)",
      ],
    },
    {
      title: "04 — AI Visual Production",
      icon: Cpu,
      skills: [
        "Neural Video Generation (Runway Gen-3)",
        "Generative Visual Concepting (Midjourney v6)",
        "ComfyUI Custom Workflows & Optical Upscaling",
        "Hybrid Live-Action / AI Compositing",
        "Rapid Ideation for High-Stakes Commercial Pitches",
      ],
    },
  ];

  return (
    <section id="about" className="relative py-24 sm:py-32 px-6 sm:px-8 lg:px-12 bg-[#0A0D12] border-t border-[#222C3D] text-[#F8FAFC]">
      <div className="max-w-7xl mx-auto">
        <SectionHeader
          number="02"
          tag="CREATIVE BIOGRAPHY"
          title="CREATIVE THINKING. VISUAL STORYTELLING."
          description="An independent creative professional working across filmmaking, cinematography, photography, graphic design, motion graphics and emerging visual technologies."
        />

        {/* Narrative & Visual Editorial Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start pb-20 border-b border-[#222C3D]">
          {/* Left Column: Authentic Portrait of Anjalsh */}
          <div className="lg:col-span-5 space-y-6">
            <div className="relative aspect-[4/5] rounded-2xl overflow-hidden border border-[#222C3D] bg-[#161D2A] group shadow-2xl hover:border-accent/60 transition-colors duration-500">
              <Image
                src="/images/photography/anjalsh-portrait.jpg"
                alt="Anjalsh V.S. — Filmmaker & Visual Artist"
                fill
                priority
                className="object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
                sizes="(max-width: 1024px) 100vw, 40vw"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#0A0D12]/90 via-[#0A0D12]/20 to-transparent" />

              {/* Bottom Card Label */}
              <div className="absolute bottom-6 left-6 right-6">
                <span className="text-xs font-mono tracking-widest text-accent uppercase block font-semibold">
                  ANJALSH V.S.
                </span>
                <span className="font-heading text-xl font-bold text-white block mt-0.5">
                  Filmmaker & Visual Artist
                </span>
                <span className="text-xs font-mono text-[#94A3B8] mt-1 block">
                  Kerala, India &bull; Available Worldwide
                </span>
              </div>
            </div>

            {/* Creative Philosophy Quote */}
            <div className="p-6 rounded-xl bg-[#161D2A] border border-[#222C3D] relative">
              <div className="w-1 h-6 bg-accent absolute top-6 left-0 rounded-r" />
              <p className="text-[#F8FAFC]/90 text-sm font-light italic leading-relaxed pl-2 font-serif">
                &ldquo;{siteConfig.bio.mission}&rdquo;
              </p>
            </div>
          </div>

          {/* Right Column: In-Depth Biography & The Journey */}
          <div className="lg:col-span-7 space-y-8">
            <div className="space-y-4">
              <span className="text-xs font-mono tracking-widest text-accent uppercase font-medium">
                THE PHILOSOPHY
              </span>
              <h3 className="font-heading text-2xl sm:text-4xl font-bold text-[#F8FAFC] tracking-tight leading-snug">
                Every frame must evoke an emotional echo long after the screen dims.
              </h3>
              <p className="text-[#94A3B8] text-base sm:text-lg font-light leading-relaxed">
                {siteConfig.bio.full}
              </p>
            </div>

            {/* Creative Journey Narrative */}
            <div className="space-y-4 pt-4 border-t border-[#222C3D]">
              <span className="text-xs font-mono tracking-widest text-accent uppercase font-medium">
                MY JOURNEY SINCE 2020
              </span>
              <div className="space-y-4 text-[#94A3B8] text-sm leading-relaxed font-light">
                <p>
                  My journey began with a camera in hand, exploring the dramatic landscapes and vibrant cultural textures of Kerala. What started as an obsession with raw light and framing quickly transformed into an intensive study of the complete visual pipeline—from script conceptualization and cinematography through precision non-linear editing, sound design, and color timing in DaVinci Resolve.
                </p>
                <p>
                  Over the years, working as an independent freelance director allowed me to collaborate with international clients across diverse artistic media—fashion lookbooks, documentary films, brand identity systems, and commercial spots. In 2024, my tenure as Creative Media Lead at <span className="text-[#F8FAFC] font-medium">Kalamrith Ayurveda</span> refined my ability to architect organic, heritage-focused wellness visual identities.
                </p>
                <p>
                  Today, at <span className="text-[#F8FAFC] font-medium">7 Clouds Ads & Studios</span>, I lead commercial video productions and post-production workflows, continuously embracing AI filmmaking methodologies to expand what is visually possible while maintaining the timeless soul of traditional cinema craft.
                </p>
              </div>
            </div>

            {/* Key Metrics with Blue Highlights */}
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 pt-4">
              <div className="p-4 rounded-xl bg-[#161D2A] border border-[#222C3D]">
                <span className="text-accent text-3xl font-bold font-mono block">2020+</span>
                <span className="text-[#94A3B8] text-xs font-mono uppercase mt-1 block">Active Practice</span>
              </div>
              <div className="p-4 rounded-xl bg-[#161D2A] border border-[#222C3D]">
                <span className="text-accent text-3xl font-bold font-mono block">52+</span>
                <span className="text-[#94A3B8] text-xs font-mono uppercase mt-1 block">Curated Works</span>
              </div>
              <div className="p-4 rounded-xl bg-[#161D2A] border border-[#222C3D] col-span-2 sm:col-span-1">
                <span className="text-accent text-3xl font-bold font-mono block">4</span>
                <span className="text-[#94A3B8] text-xs font-mono uppercase mt-1 block">Core Disciplines</span>
              </div>
            </div>
          </div>
        </div>

        {/* Professional Skills & Toolsets Grid */}
        <div className="pt-20">
          <div className="max-w-2xl mb-12">
            <span className="text-xs font-mono tracking-widest text-accent uppercase block mb-2 font-medium">
              CREATIVE ARSENAL
            </span>
            <h3 className="font-heading text-2xl sm:text-4xl font-bold text-[#F8FAFC] tracking-tight">
              Disciplined Capabilities & Toolsets
            </h3>
            <p className="text-[#94A3B8] text-sm mt-2 font-light">
              Mastery over contemporary production hardware, post-production suites, and emerging neural generative tools.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8">
            {skillCategories.map((cat) => {
              const Icon = cat.icon;
              return (
                <div
                  key={cat.title}
                  className="p-6 sm:p-8 rounded-2xl bg-[#161D2A] border border-[#222C3D] hover:border-accent/60 transition-all duration-300 group"
                >
                  <div className="flex items-center space-x-3 mb-6">
                    <div className="p-2.5 rounded-lg bg-accent/10 text-accent group-hover:bg-accent group-hover:text-white transition-colors duration-300">
                      <Icon className="w-5 h-5" />
                    </div>
                    <h4 className="font-heading text-lg sm:text-xl font-bold text-[#F8FAFC] group-hover:text-accent transition-colors">
                      {cat.title}
                    </h4>
                  </div>

                  <ul className="space-y-3 font-mono text-xs text-[#94A3B8]">
                    {cat.skills.map((skill) => (
                      <li key={skill} className="flex items-start space-x-2.5">
                        <CheckCircle2 className="w-4 h-4 text-accent shrink-0 mt-0.5" />
                        <span className="text-[#F8FAFC]/90 group-hover:text-white transition-colors">
                          {skill}
                        </span>
                      </li>
                    ))}
                  </ul>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
