"use client";

import { useEffect, useRef, useState } from "react";
import { Volume2, VolumeX } from "lucide-react";

export default function AudioController() {
  const [isPlaying, setIsPlaying] = useState(false);
  const audioCtxRef = useRef<AudioContext | null>(null);
  const gainNodeRef = useRef<GainNode | null>(null);
  const osc1Ref = useRef<OscillatorNode | null>(null);
  const osc2Ref = useRef<OscillatorNode | null>(null);

  const toggleAudio = () => {
    try {
      if (!audioCtxRef.current) {
        const AudioContextClass = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
        audioCtxRef.current = new AudioContextClass();

        // Create gain node for gentle fade in/out
        const gain = audioCtxRef.current.createGain();
        gain.gain.setValueAtTime(0, audioCtxRef.current.currentTime);
        gain.connect(audioCtxRef.current.destination);
        gainNodeRef.current = gain;

        // Sub low frequency cinematic harmonic tone (55Hz A1 & 110Hz A2)
        const osc1 = audioCtxRef.current.createOscillator();
        osc1.type = "sine";
        osc1.frequency.setValueAtTime(55, audioCtxRef.current.currentTime);
        osc1.connect(gain);
        osc1.start();
        osc1Ref.current = osc1;

        const osc2 = audioCtxRef.current.createOscillator();
        osc2.type = "triangle";
        osc2.frequency.setValueAtTime(110, audioCtxRef.current.currentTime);
        osc2.connect(gain);
        osc2.start();
        osc2Ref.current = osc2;
      }

      if (audioCtxRef.current.state === "suspended") {
        audioCtxRef.current.resume();
      }

      if (!isPlaying) {
        // Fade in
        gainNodeRef.current?.gain.cancelScheduledValues(audioCtxRef.current.currentTime);
        gainNodeRef.current?.gain.setValueAtTime(0.001, audioCtxRef.current.currentTime);
        gainNodeRef.current?.gain.exponentialRampToValueAtTime(0.035, audioCtxRef.current.currentTime + 1.2);
        setIsPlaying(true);
      } else {
        // Fade out
        gainNodeRef.current?.gain.cancelScheduledValues(audioCtxRef.current.currentTime);
        gainNodeRef.current?.gain.setValueAtTime(gainNodeRef.current.gain.value, audioCtxRef.current.currentTime);
        gainNodeRef.current?.gain.exponentialRampToValueAtTime(0.0001, audioCtxRef.current.currentTime + 0.8);
        setIsPlaying(false);
      }
    } catch {
      // Audio not permitted or supported
      setIsPlaying(false);
    }
  };

  useEffect(() => {
    return () => {
      try {
        osc1Ref.current?.stop();
        osc2Ref.current?.stop();
        audioCtxRef.current?.close();
      } catch {
        // Clean up
      }
    };
  }, []);

  return (
    <button
      onClick={toggleAudio}
      aria-label={isPlaying ? "Mute ambient cinema sound" : "Enable ambient cinema sound"}
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
              height: isPlaying ? `${6 + (bar * 3)}px` : "4px",
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
