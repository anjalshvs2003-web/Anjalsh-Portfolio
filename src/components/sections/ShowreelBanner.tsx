"use client";

import { useState } from "react";
import Image from "next/image";
import { Play, Sparkles } from "lucide-react";
import Lightbox from "@/components/ui/Lightbox";

export default function ShowreelBanner() {
  const [isPlaying, setIsPlaying] = useState(false);

  return (
    <>
      <section className="relative w-full py-16 px-6 sm:px-8 lg:px-12 bg-[#100D0F] border-y border-[#33292C] overflow-hidden text-[#F5F2F0]">
        <div className="max-w-7xl mx-auto">
          {/* Header Metadata */}
          <div className="flex items-center justify-between pb-6 text-xs font-mono">
            <div className="flex items-center space-x-2 text-accent">
              <span className="w-2 h-2 rounded-full bg-accent animate-pulse" />
              <span className="uppercase tracking-widest font-semibold">SHOWREEL CUT / 2024–2025</span>
            </div>
            <div className="hidden sm:flex items-center space-x-4 text-[#999194]">
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
            className="group relative w-full aspect-[21/9] sm:aspect-[2.39/1] rounded-2xl overflow-hidden bg-[#191417] border border-[#33292C] cursor-pointer shadow-2xl hover:border-accent/60 transition-colors"
          >
            <Image
              src="/images/ai-films/the-unseen-vision.jpg"
              alt="Anjalsh Showreel Visual"
              fill
              className="object-cover group-hover:scale-105 transition-transform duration-700 ease-out filter contrast-110"
              sizes="100vw"
            />

            {/* Dark Vignette Overlay */}
            <div className="absolute inset-0 bg-gradient-to-t from-[#100D0F]/90 via-[#100D0F]/30 to-[#100D0F]/60 group-hover:opacity-75 transition-opacity" />

            {/* Center Play Pulse Trigger */}
            <div className="absolute inset-0 flex flex-col items-center justify-center space-y-4">
              <div className="relative">
                <div className="w-20 h-20 sm:w-24 sm:h-24 rounded-full bg-white/10 backdrop-blur-md border border-white/20 flex items-center justify-center group-hover:scale-110 group-hover:bg-accent group-hover:text-black text-white transition-all duration-300 shadow-2xl">
                  <Play className="w-7 h-7 sm:w-8 sm:h-8 fill-current ml-1" />
                </div>
                <div className="absolute -inset-2 rounded-full border border-accent/40 animate-ping opacity-40 pointer-events-none" />
              </div>

              <div className="text-center font-mono">
                <span className="text-[#F5F2F0] text-xs sm:text-sm tracking-widest uppercase font-semibold block">
                  PLAY CINEMATIC SHOWREEL
                </span>
                <span className="text-[#999194] text-[11px] tracking-wider block mt-0.5">
                  AUDIO &bull; COLOR &bull; DIRECTION
                </span>
              </div>
            </div>

            {/* Bottom film data strip inside banner */}
            <div className="absolute bottom-4 left-6 right-6 flex items-center justify-between text-[11px] font-mono text-[#999194]">
              <span className="flex items-center space-x-1.5">
                <Sparkles className="w-3.5 h-3.5 text-accent" />
                <span>DIRECTED & GRADED BY ANJALSH V.S.</span>
              </span>
              <span className="hidden sm:inline text-[#999194]">
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
            url: "/videos/the-forgotten-smile.mp4",
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
