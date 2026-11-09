"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { X, ArrowUpRight, Play, Maximize2, Tag, Calendar, User, Film } from "lucide-react";
import { Project } from "@/types";
import Lightbox from "./Lightbox";

interface ProjectModalProps {
  project: Project | null;
  isOpen: boolean;
  onClose: () => void;
}

export default function ProjectModal({ project, isOpen, onClose }: ProjectModalProps) {
  const [isPlayingVideo, setIsPlayingVideo] = useState(false);
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [lightboxIndex, setLightboxIndex] = useState(0);

  useEffect(() => {
    if (!isOpen) {
      setIsPlayingVideo(false);
      return;
    }

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape" && !lightboxOpen) onClose();
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isOpen, onClose, lightboxOpen]);

  if (!project) return null;

  return (
    <>
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 z-[10000] bg-black/85 backdrop-blur-xl flex items-center justify-center p-3 sm:p-6 lg:p-10 overflow-y-auto"
            onClick={onClose}
          >
            <motion.div
              initial={{ scale: 0.95, opacity: 0, y: 20 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.95, opacity: 0, y: 20 }}
              transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
              className="relative w-full max-w-5xl bg-[#191417] border border-[#33292C] rounded-2xl overflow-hidden shadow-2xl my-auto text-[#F5F2F0] max-h-[92vh] flex flex-col"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Modal Header */}
              <div className="flex items-center justify-between px-6 py-4 border-b border-[#33292C] bg-[#191417]/95 sticky top-0 z-20">
                <div className="flex items-center space-x-3 text-xs font-mono">
                  <span className="text-accent uppercase font-semibold">{project.category}</span>
                  <span className="text-[#33292C]">/</span>
                  <span className="text-[#999194]">{project.year}</span>
                </div>

                <div className="flex items-center space-x-3">
                  <Link
                    href={`/work/${project.slug}`}
                    className="text-xs font-mono text-[#999194] hover:text-[#F5F2F0] flex items-center space-x-1 border border-[#33292C] px-3 py-1.5 rounded-full hover:border-accent hover:text-accent transition-colors"
                  >
                    <span>FULL CASE STUDY</span>
                    <ArrowUpRight className="w-3.5 h-3.5" />
                  </Link>

                  <button
                    onClick={onClose}
                    className="p-1.5 rounded-full bg-white/5 hover:bg-white/10 text-[#999194] hover:text-white transition-colors"
                    aria-label="Close modal"
                  >
                    <X className="w-5 h-5" />
                  </button>
                </div>
              </div>

              {/* Scrollable Content */}
              <div className="overflow-y-auto p-6 sm:p-8 space-y-8">
                {/* Hero Media / Video */}
                <div className="relative w-full aspect-video sm:aspect-[2.39/1] rounded-xl overflow-hidden bg-black border border-[#33292C] group">
                  {isPlayingVideo && project.videoUrl ? (
                    <video
                      src={project.videoUrl}
                      controls
                      autoPlay
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <>
                      <Image
                        src={project.coverImage}
                        alt={project.title}
                        fill
                        className="object-cover"
                        sizes="(max-width: 1200px) 100vw, 1200px"
                        priority
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-[#100D0F]/80 via-transparent to-transparent" />

                      {project.videoUrl && (
                        <button
                          onClick={() => setIsPlayingVideo(true)}
                          className="absolute inset-0 flex items-center justify-center group-hover:scale-105 transition-transform"
                          aria-label="Play video trailer"
                        >
                          <div className="p-4 rounded-full bg-accent text-black shadow-lg shadow-accent/30 flex items-center justify-center">
                            <Play className="w-6 h-6 fill-black ml-1" />
                          </div>
                        </button>
                      )}
                    </>
                  )}
                </div>

                {/* Title & Metadata Bar */}
                <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-start pb-8 border-b border-[#33292C]">
                  <div className="md:col-span-8 space-y-3">
                    <h2 className="font-heading text-2xl sm:text-4xl font-bold tracking-tight text-[#F5F2F0]">
                      {project.title}
                    </h2>
                    <p className="text-[#999194] text-sm sm:text-base leading-relaxed">
                      {project.fullDescription}
                    </p>
                  </div>

                  <div className="md:col-span-4 bg-[#211A1D] border border-[#33292C] rounded-xl p-5 space-y-3 font-mono text-xs">
                    <div className="flex justify-between py-1 border-b border-[#33292C]">
                      <span className="text-[#999194]">ROLE</span>
                      <span className="text-[#F5F2F0] text-right font-medium">{project.role}</span>
                    </div>
                    {project.client && (
                      <div className="flex justify-between py-1 border-b border-[#33292C]">
                        <span className="text-[#999194]">CLIENT</span>
                        <span className="text-[#F5F2F0] text-right">{project.client}</span>
                      </div>
                    )}
                    <div className="flex justify-between py-1 border-b border-[#33292C]">
                      <span className="text-[#999194]">YEAR</span>
                      <span className="text-[#F5F2F0]">{project.year}</span>
                    </div>
                    {project.technicalDetails?.aspectRatio && (
                      <div className="flex justify-between py-1 border-b border-[#33292C]">
                        <span className="text-[#999194]">ASPECT RATIO</span>
                        <span className="text-accent">{project.technicalDetails.aspectRatio}</span>
                      </div>
                    )}
                  </div>
                </div>

                {/* Technical Specifications */}
                {project.technicalDetails && (
                  <div className="space-y-3">
                    <h3 className="text-xs font-mono tracking-widest text-[#999194] uppercase">
                      TECHNICAL SPECIFICATIONS
                    </h3>
                    <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 font-mono text-xs">
                      {project.technicalDetails.camera && (
                        <div className="p-3 bg-[#211A1D] border border-[#33292C] rounded-lg">
                          <span className="text-[#999194] block text-[10px]">CAPTURE SYSTEM</span>
                          <span className="text-[#F5F2F0] mt-1 block">{project.technicalDetails.camera}</span>
                        </div>
                      )}
                      {project.technicalDetails.software && (
                        <div className="p-3 bg-[#211A1D] border border-[#33292C] rounded-lg">
                          <span className="text-[#999194] block text-[10px]">SOFTWARE & PIPELINE</span>
                          <span className="text-[#F5F2F0] mt-1 block">
                            {project.technicalDetails.software.join(", ")}
                          </span>
                        </div>
                      )}
                      {project.technicalDetails.colourSpace && (
                        <div className="p-3 bg-[#211A1D] border border-[#33292C] rounded-lg">
                          <span className="text-[#999194] block text-[10px]">COLOUR SPACE</span>
                          <span className="text-accent mt-1 block">{project.technicalDetails.colourSpace}</span>
                        </div>
                      )}
                      {project.technicalDetails.runtime && (
                        <div className="p-3 bg-[#211A1D] border border-[#33292C] rounded-lg">
                          <span className="text-[#999194] block text-[10px]">RUNTIME</span>
                          <span className="text-[#F5F2F0] mt-1 block">{project.technicalDetails.runtime}</span>
                        </div>
                      )}
                    </div>
                  </div>
                )}

                {/* Gallery Stills */}
                {project.gallery && project.gallery.length > 0 && (
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <h3 className="text-xs font-mono tracking-widest text-[#999194] uppercase">
                        STILLS & VISUAL FRAMES ({project.gallery.length})
                      </h3>
                      <span className="text-[11px] font-mono text-accent">CLICK FOR LIGHTBOX</span>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                      {project.gallery.map((item, idx) => (
                        <div
                          key={idx}
                          onClick={() => {
                            setLightboxIndex(idx);
                            setLightboxOpen(true);
                          }}
                          className="group/still relative aspect-video rounded-xl overflow-hidden bg-[#211A1D] border border-[#33292C] cursor-pointer hover:border-accent transition-colors"
                        >
                          <Image
                            src={item.url}
                            alt={item.caption || project.title}
                            fill
                            className="object-cover group-hover/still:scale-105 transition-transform duration-500"
                            sizes="400px"
                          />
                          <div className="absolute inset-0 bg-black/40 opacity-0 group-hover/still:opacity-100 transition-opacity flex items-center justify-center">
                            <Maximize2 className="w-5 h-5 text-accent" />
                          </div>
                          {item.caption && (
                            <div className="absolute bottom-0 inset-x-0 p-2.5 bg-gradient-to-t from-black/80 to-transparent text-[11px] font-mono text-[#F5F2F0] truncate">
                              {item.caption}
                            </div>
                          )}
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Lightbox for Full-Resolution Viewing */}
      {project.gallery && (
        <Lightbox
          isOpen={lightboxOpen}
          onClose={() => setLightboxOpen(false)}
          mediaList={project.gallery}
          currentIndex={lightboxIndex}
          onIndexChange={setLightboxIndex}
          projectTitle={project.title}
        />
      )}
    </>
  );
}
