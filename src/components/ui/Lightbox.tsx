"use client";

import { useEffect, useCallback } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { X, ChevronLeft, ChevronRight } from "lucide-react";
import { ProjectMedia } from "@/types";

interface LightboxProps {
  isOpen: boolean;
  onClose: () => void;
  mediaList: ProjectMedia[];
  currentIndex: number;
  onIndexChange: (index: number) => void;
  projectTitle: string;
}

export default function Lightbox({
  isOpen,
  onClose,
  mediaList,
  currentIndex,
  onIndexChange,
  projectTitle,
}: LightboxProps) {
  const currentItem = mediaList[currentIndex];

  const handlePrev = useCallback(() => {
    onIndexChange(currentIndex === 0 ? mediaList.length - 1 : currentIndex - 1);
  }, [currentIndex, mediaList.length, onIndexChange]);

  const handleNext = useCallback(() => {
    onIndexChange(currentIndex === mediaList.length - 1 ? 0 : currentIndex + 1);
  }, [currentIndex, mediaList.length, onIndexChange]);

  useEffect(() => {
    if (!isOpen) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
      if (e.key === "ArrowLeft") handlePrev();
      if (e.key === "ArrowRight") handleNext();
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isOpen, onClose, handlePrev, handleNext]);

  return (
    <AnimatePresence>
      {isOpen && currentItem && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3 }}
          className="fixed inset-0 z-[11000] bg-black/95 backdrop-blur-2xl flex flex-col justify-between p-4 sm:p-8"
        >
          {/* Top Bar */}
          <div className="flex items-center justify-between z-10">
            <div className="text-xs font-mono text-zinc-400">
              <span className="text-white font-medium">{projectTitle}</span>
              <span className="mx-2 text-zinc-600">—</span>
              <span className="text-accent">
                {String(currentIndex + 1).padStart(2, "0")} /{" "}
                {String(mediaList.length).padStart(2, "0")}
              </span>
            </div>

            <button
              onClick={onClose}
              className="p-2.5 rounded-full bg-white/10 hover:bg-white/20 text-white transition-colors"
              aria-label="Close Lightbox"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Media Center */}
          <div className="relative flex-1 flex items-center justify-center my-4 overflow-hidden">
            {/* Prev Button */}
            {mediaList.length > 1 && (
              <button
                onClick={handlePrev}
                className="absolute left-2 sm:left-6 z-20 p-3 rounded-full bg-black/60 border border-white/10 text-white hover:border-accent hover:text-accent transition-colors"
                aria-label="Previous Image"
              >
                <ChevronLeft className="w-6 h-6" />
              </button>
            )}

            <div className="relative w-full h-full max-w-6xl max-h-[82vh] flex items-center justify-center">
              {currentItem.type === "video" ? (
                <video
                  src={currentItem.url}
                  controls
                  autoPlay
                  className="max-h-full max-w-full rounded-lg object-contain shadow-2xl"
                />
              ) : (
                <div className="relative w-full h-full">
                  <Image
                    src={currentItem.url}
                    alt={currentItem.caption || projectTitle}
                    fill
                    className="object-contain"
                    sizes="(max-width: 1200px) 100vw, 1200px"
                    priority
                  />
                </div>
              )}
            </div>

            {/* Next Button */}
            {mediaList.length > 1 && (
              <button
                onClick={handleNext}
                className="absolute right-2 sm:right-6 z-20 p-3 rounded-full bg-black/60 border border-white/10 text-white hover:border-accent hover:text-accent transition-colors"
                aria-label="Next Image"
              >
                <ChevronRight className="w-6 h-6" />
              </button>
            )}
          </div>

          {/* Bottom Caption */}
          <div className="text-center font-mono text-xs text-zinc-400 max-w-2xl mx-auto">
            {currentItem.caption && <p>{currentItem.caption}</p>}
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
