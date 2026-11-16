"use client";

import { useState, useRef, useEffect } from "react";
import Image from "next/image";
import { Play, Pause, Volume2, VolumeX, Maximize2, Sparkles, Film } from "lucide-react";

export default function ShowreelBanner() {
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(true);
  const [progress, setProgress] = useState(0);
  const [videoError, setVideoError] = useState(false);
  const videoRef = useRef<HTMLVideoElement | null>(null);

  const togglePlay = () => {
    if (!videoRef.current) return;
    if (isPlaying) {
      videoRef.current.pause();
      setIsPlaying(false);
    } else {
      videoRef.current.play().then(() => {
        setIsPlaying(true);
      }).catch((err) => {
        console.warn("Video playback blocked or failed:", err);
      });
    }
  };

  const toggleMute = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (!videoRef.current) return;
    const nextMuted = !isMuted;
    videoRef.current.muted = nextMuted;
    setIsMuted(nextMuted);
  };

  const toggleFullscreen = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (!videoRef.current) return;
    if (videoRef.current.requestFullscreen) {
      videoRef.current.requestFullscreen();
    }
  };

  const handleTimeUpdate = () => {
    if (!videoRef.current) return;
    const current = videoRef.current.currentTime;
    const duration = videoRef.current.duration || 1;
    setProgress((current / duration) * 100);
  };

  return (
    <section className="relative w-full py-16 px-6 sm:px-8 lg:px-12 bg-[#0A0D12] border-y border-[#222C3D] overflow-hidden text-[#F8FAFC]">
      <div className="max-w-7xl mx-auto">
        {/* Header Metadata */}
        <div className="flex items-center justify-between pb-6 text-xs font-mono">
          <div className="flex items-center space-x-2 text-accent">
            <span className="w-2 h-2 rounded-full bg-accent animate-pulse" />
            <span className="uppercase tracking-widest font-semibold">OFFICIAL SHOWREEL &bull; CINEMA REEL</span>
          </div>
          <div className="hidden sm:flex items-center space-x-4 text-[#94A3B8]">
            <span>TC 00:00:37:12</span>
            <span>•</span>
            <span>24.000 FPS</span>
            <span>•</span>
            <span>2.39:1 ANAMORPHIC SCOPE</span>
          </div>
        </div>

        {/* Cinematic Wide Video Container */}
        <div
          onClick={togglePlay}
          className="group relative w-full aspect-video sm:aspect-[2.39/1] rounded-2xl overflow-hidden bg-[#111620] border border-[#222C3D] cursor-pointer shadow-2xl hover:border-accent/60 transition-colors"
        >
          {/* Real video player */}
          {!videoError ? (
            <video
              ref={videoRef}
              src="/videos/the-forgotten-smile.mp4"
              poster="/images/ai-films/the-unseen-vision.jpg"
              playsInline
              muted={isMuted}
              loop
              onTimeUpdate={handleTimeUpdate}
              onError={() => setVideoError(true)}
              className="w-full h-full object-cover"
            />
          ) : (
            <Image
              src="/images/ai-films/the-unseen-vision.jpg"
              alt="Anjalsh Showreel Visual"
              fill
              className="object-cover"
              sizes="100vw"
            />
          )}

          {/* Dark Vignette Overlay */}
          <div
            className={`absolute inset-0 bg-gradient-to-t from-[#0A0D12]/90 via-[#0A0D12]/20 to-[#0A0D12]/40 transition-opacity duration-300 ${
              isPlaying ? "opacity-30 group-hover:opacity-60" : "opacity-80"
            }`}
          />

          {/* Center Play/Pause Trigger */}
          <div
            className={`absolute inset-0 flex flex-col items-center justify-center space-y-4 transition-opacity duration-300 pointer-events-none ${
              isPlaying ? "opacity-0 group-hover:opacity-100" : "opacity-100"
            }`}
          >
            <div className="relative pointer-events-auto">
              <div className="w-20 h-20 sm:w-24 sm:h-24 rounded-full bg-white/10 backdrop-blur-md border border-white/20 flex items-center justify-center group-hover:scale-110 group-hover:bg-accent group-hover:text-white text-white transition-all duration-300 shadow-2xl">
                {isPlaying ? (
                  <Pause className="w-7 h-7 sm:w-8 sm:h-8 fill-current" />
                ) : (
                  <Play className="w-7 h-7 sm:w-8 sm:h-8 fill-current ml-1" />
                )}
              </div>
              {!isPlaying && (
                <div className="absolute -inset-2 rounded-full border border-accent/40 animate-ping opacity-40 pointer-events-none" />
              )}
            </div>

            <div className="text-center font-mono">
              <span className="text-[#F8FAFC] text-xs sm:text-sm tracking-widest uppercase font-semibold block">
                {isPlaying ? "PAUSE SHOWREEL" : "PLAY CINEMATIC SHOWREEL"}
              </span>
              <span className="text-[#94A3B8] text-[11px] tracking-wider block mt-0.5">
                CINEMATOGRAPHY &bull; COLOUR GRADING &bull; DIRECTION
              </span>
            </div>
          </div>

          {/* Bottom Custom Playback Bar */}
          <div className="absolute bottom-4 left-6 right-6 flex items-center justify-between text-[11px] font-mono text-[#94A3B8] z-20">
            <span className="flex items-center space-x-1.5">
              <Film className="w-3.5 h-3.5 text-accent" />
              <span className="text-[#F8FAFC]">DIRECTED & GRADED BY ANJALSH V.S.</span>
            </span>

            {/* Video Controls */}
            <div className="flex items-center space-x-3 pointer-events-auto">
              <button
                onClick={toggleMute}
                className="p-2 rounded-full bg-black/60 backdrop-blur-md border border-white/10 text-white hover:text-accent transition-colors"
                title={isMuted ? "Unmute audio" : "Mute audio"}
                aria-label={isMuted ? "Unmute audio" : "Mute audio"}
              >
                {isMuted ? <VolumeX className="w-3.5 h-3.5" /> : <Volume2 className="w-3.5 h-3.5" />}
              </button>

              <button
                onClick={toggleFullscreen}
                className="p-2 rounded-full bg-black/60 backdrop-blur-md border border-white/10 text-white hover:text-accent transition-colors hidden sm:block"
                title="Fullscreen"
                aria-label="Fullscreen"
              >
                <Maximize2 className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>

          {/* Thin Progress Line at Bottom of Video */}
          <div className="absolute bottom-0 left-0 w-full h-[3px] bg-white/10">
            <div
              className="h-full bg-accent transition-all duration-100 ease-linear shadow-[0_0_8px_rgba(59,130,246,0.8)]"
              style={{ width: `${progress}%` }}
            />
          </div>
        </div>
      </div>
    </section>
  );
}
