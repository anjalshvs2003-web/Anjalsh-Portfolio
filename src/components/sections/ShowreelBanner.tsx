"use client";

import { useState } from "react";
import Image from "next/image";
import { Play, Sparkles } from "lucide-react";
import Lightbox from "@/components/ui/Lightbox";

export default function ShowreelBanner() {
  const [isPlaying, setIsPlaying] = useState(false);

  return (
    <>
      <section className="relative w-full py-16 px-6 sm:px-8 lg:px-12 bg-[#080808] border-y border-white/[0.06] overflow-hidden">
        <div className="max-w-7xl mx-auto">
          {/* Header Metadata */}
          <div className="flex items-center justify-between pb-6 text-xs font-mono">
            <div className="flex items-center space-x-2 text-accent">
              <span className="w-2 h-2 rounded-full bg-accent animate-pulse" />
              <span className="uppercase tracking-widest">SHOWREEL CUT / 2024–2025</span>
            </div>
            <div className="hidden sm:flex items-center space-x-4 text-zinc-500">
              <span>TC 00:00:24:18</span>
              <span>•</span>
              <span>24.000 FPS</span>
              <span>•</span>
              <span>2.39:1 SCOPE</span>
            </div>
          </div>

          {/* Cinematic Wide Banner Frame */}
          <div
            onClick={() => setIsPlaying(true)}
            className="group relative w-full aspect-[21/9] sm:aspect-[2.39/1] rounded-2xl overflow-hidden bg-zinc-950 border border-white/10 cursor-pointer shadow-2xl"
          >
            <Image
              src="https://images.unsplash.com/photo-1509198397868-475647b2a1e5?q=80&w=2000&auto=format&fit=crop"
              alt="Anjalsh Showreel Visual"
              fill
              className="object-cover group-hover:scale-105 transition-transform duration-700 ease-out filter contrast-110"
              sizes="100vw"
            />

            {/* Dark Vignette Overlay */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/25 to-black/60 group-hover:opacity-80 transition-opacity" />

            {/* Center Play Pulse Trigger */}
            <div className="absolute inset-0 flex flex-col items-center justify-center space-y-4">
              <div className="relative">
                <div className="w-20 h-20 sm:w-24 sm:h-24 rounded-full bg-white/10 backdrop-blur-md border border-white/20 flex items-center justify-center group-hover:scale-110 group-hover:bg-accent group-hover:text-black text-white transition-all duration-300 shadow-2xl">
                  <Play className="w-7 h-7 sm:w-8 sm:h-8 fill-current ml-1" />
                </div>
                <div className="absolute -inset-2 rounded-full border border-white/10 animate-ping opacity-40 pointer-events-none" />
              </div>

              <div className="text-center font-mono">
                <span className="text-white text-xs sm:text-sm tracking-widest uppercase font-semibold block">
                  PLAY CINEMATIC SHOWREEL
                </span>
                <span className="text-zinc-400 text-[11px] tracking-wider block mt-0.5">
                  AUDIO &bull; COLOR &bull; DIRECTION
                </span>
              </div>
            </div>

            {/* Bottom film data strip inside banner */}
            <div className="absolute bottom-4 left-6 right-6 flex items-center justify-between text-[11px] font-mono text-zinc-400">
              <span className="flex items-center space-x-1.5">
                <Sparkles className="w-3.5 h-3.5 text-accent" />
                <span>DIRECTED & GRADED BY ANJALSH V.S.</span>
              </span>
              <span className="hidden sm:inline text-zinc-500">
                PRODUCED FOR COMMERCIAL, CINEMA & ART BIENNIALS
              </span>
            </div>
          </div>
        </div>
      </section>

      {/* Showreel Lightbox */}
      <Lightbox
        isOpen={isPlaying}
        onClose={() => setIsPlaying(false)}
        mediaList={[
          {
            type: "video",
            url: "https://assets.mixkit.co/videos/preview/mixkit-cinematic-night-street-in-the-city-43187-large.mp4",
            caption: "ANJALSH®️ — Complete Cinematic Showreel (Direction, Cinematography, Color Grading)",
          },
        ]}
        currentIndex={0}
        onIndexChange={() => {}}
        projectTitle="ANJALSH®️ OFFICIAL SHOWREEL"
      />
    </>
  );
}
