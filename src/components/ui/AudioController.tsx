"use client";

import { useEffect, useRef, useState } from "react";
import { Volume2, VolumeX } from "lucide-react";

export default function AudioController() {
  const [isPlaying, setIsPlaying] = useState(false);
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const fadeIntervalRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    const audio = new Audio("/assets/audio/ambient.mp3");
    audio.loop = true;
    audio.preload = "auto";
    audio.volume = 0;
    audioRef.current = audio;

    return () => {
      if (fadeIntervalRef.current) clearInterval(fadeIntervalRef.current);
      audio.pause();
      audio.src = "";
    };
  }, []);

  const toggleAudio = () => {
    const audio = audioRef.current;
    if (!audio) return;

    if (fadeIntervalRef.current) {
      clearInterval(fadeIntervalRef.current);
      fadeIntervalRef.current = null;
    }

    if (!isPlaying) {
      audio
        .play()
        .then(() => {
          setIsPlaying(true);
          // Smooth fade in to 0.45 volume
          fadeIntervalRef.current = setInterval(() => {
            if (audio.volume < 0.45) {
              audio.volume = Math.min(0.45, Number((audio.volume + 0.05).toFixed(2)));
            } else {
              if (fadeIntervalRef.current) clearInterval(fadeIntervalRef.current);
            }
          }, 40);
        })
        .catch((err) => {
          console.warn("Audio playback blocked by browser:", err);
        });
    } else {
      // Smooth fade out
      fadeIntervalRef.current = setInterval(() => {
        if (audio.volume > 0.05) {
          audio.volume = Math.max(0, Number((audio.volume - 0.05).toFixed(2)));
        } else {
          audio.volume = 0;
          audio.pause();
          setIsPlaying(false);
          if (fadeIntervalRef.current) clearInterval(fadeIntervalRef.current);
        }
      }, 40);
    }
  };

  return (
    <button
      onClick={toggleAudio}
      aria-label={isPlaying ? "Mute ambient music" : "Play ambient music"}
      className="group flex items-center space-x-2 text-[11px] font-mono tracking-widest text-zinc-400 hover:text-white transition-colors duration-200"
    >
      <div className="flex items-center space-x-1 h-3">
        {[1, 2, 3].map((bar) => (
          <span
            key={bar}
            className={`w-[2px] rounded-full transition-all ${
              isPlaying
                ? "bg-accent animate-pulse"
                : "bg-zinc-600 group-hover:bg-zinc-400"
            }`}
            style={{
              height: isPlaying ? `${6 + bar * 3}px` : "4px",
              animationDelay: `${bar * 150}ms`,
            }}
          />
        ))}
      </div>
      <span className="hidden sm:inline uppercase text-[10px]">
        {isPlaying ? "SOUND ON" : "SOUND OFF"}
      </span>
      {isPlaying ? (
        <Volume2 className="w-3.5 h-3.5 text-accent sm:hidden" />
      ) : (
        <VolumeX className="w-3.5 h-3.5 text-zinc-500 sm:hidden" />
      )}
    </button>
  );
}
