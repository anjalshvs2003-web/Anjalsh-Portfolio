"use client";

import { useState, useRef, useEffect } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { Project } from "@/types";
import { ChevronLeft, ChevronRight, Play, ArrowRight, Sparkles } from "lucide-react";

interface CurvedExhibitionArcProps {
  projects: Project[];
  onSelectProject: (project: Project) => void;
}

export default function CurvedExhibitionArc({
  projects,
  onSelectProject,
}: CurvedExhibitionArcProps) {
  // Use 7 to 9 featured projects for the 3D arc
  const arcProjects = projects.slice(0, 9);
  const [activeIndex, setActiveIndex] = useState(3); // Start with center card focused
  const [isDragging, setIsDragging] = useState(false);
  const startXRef = useRef(0);

  const total = arcProjects.length;

  const handlePrev = () => {
    setActiveIndex((prev) => (prev > 0 ? prev - 1 : total - 1));
  };

  const handleNext = () => {
    setActiveIndex((prev) => (prev < total - 1 ? prev + 1 : 0));
  };

  // Touch and mouse drag handlers for natural mobile & desktop interaction
  const handleTouchStart = (e: React.TouchEvent | React.MouseEvent) => {
    setIsDragging(true);
    const clientX = "touches" in e ? e.touches[0].clientX : e.clientX;
    startXRef.current = clientX;
  };

  const handleTouchEnd = (e: React.TouchEvent | React.MouseEvent) => {
    if (!isDragging) return;
    setIsDragging(false);
    const clientX = "changedTouches" in e ? e.changedTouches[0].clientX : e.clientX;
    const diff = clientX - startXRef.current;
    if (diff > 50) {
      handlePrev();
    } else if (diff < -50) {
      handleNext();
    }
  };

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "ArrowLeft") handlePrev();
      if (e.key === "ArrowRight") handleNext();
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  const scrollToGrid = () => {
    const el = document.getElementById("gallery-grid");
    if (el) {
      el.scrollIntoView({ behavior: "smooth" });
    }
  };

  // Bottom pillars matching Reference
  const pillars = [
    { num: "#01", title: "Strategy & Concept", desc: "Scriptwriting & Creative Direction" },
    { num: "#02", title: "Cinematography & Lighting", desc: "Sony Cinema Line & Anamorphic" },
    { num: "#03", title: "Post & Color Grading", desc: "DaVinci Resolve ACEScc Workflows" },
    { num: "#04", title: "AI Cinema & Synthesis", desc: "Runway Gen-3 & Neural Stills" },
  ];

  return (
    <div className="relative w-full py-12 md:py-16 overflow-hidden select-none">
      {/* Top Editorial Header Section (Exact match to Reference) */}
      <div className="text-center max-w-3xl mx-auto space-y-4 mb-12 sm:mb-16 px-4">
        <span className="text-xs sm:text-sm font-mono tracking-widest text-accent uppercase font-semibold block">
          Behind the Lens & Archive
        </span>

        <h3 className="font-heading text-3xl sm:text-5xl md:text-6xl font-bold tracking-tight text-[#F5F2F0] leading-tight">
          Curious What Else I’ve <br className="hidden sm:inline" /> Created?
        </h3>

        <p className="text-[#999194] text-xs sm:text-sm md:text-base font-light max-w-xl mx-auto leading-relaxed">
          Explore an expansive collection of commercial campaigns, original AI short films, editorial portraits, and graphic design systems in my extended portfolio.
        </p>

        {/* Action Pill Button with Orange Arrow (Reference Match) */}
        <div className="pt-2">
          <button
            onClick={scrollToGrid}
            className="inline-flex items-center space-x-3 px-6 py-2.5 rounded-full bg-[#211A1D] border border-[#33292C] text-[#F5F2F0] hover:border-accent hover:text-white transition-all duration-300 group shadow-lg"
          >
            <span className="text-xs font-mono font-medium tracking-wide">
              See All 52+ Projects
            </span>
            <span className="w-7 h-7 rounded-full bg-accent flex items-center justify-center text-black group-hover:scale-110 transition-transform">
              <ArrowRight className="w-3.5 h-3.5 stroke-[2.5]" />
            </span>
          </button>
        </div>
      </div>

      {/* 3D Cylindrical Concave Arc Stage */}
      <div
        className="relative w-full max-w-6xl mx-auto h-[380px] sm:h-[460px] md:h-[500px] flex items-center justify-center cursor-grab active:cursor-grabbing"
        onMouseDown={handleTouchStart}
        onMouseUp={handleTouchEnd}
        onTouchStart={handleTouchStart}
        onTouchEnd={handleTouchEnd}
        style={{
          perspective: "1100px",
          perspectiveOrigin: "50% 50%",
        }}
      >
        {/* Navigation Arrows for precision control */}
        <button
          onClick={(e) => {
            e.stopPropagation();
            handlePrev();
          }}
          className="absolute left-2 sm:left-4 z-40 p-3 rounded-full bg-[#211A1D]/80 backdrop-blur-md border border-[#33292C] text-[#999194] hover:text-white hover:border-accent hover:bg-accent/10 transition-all shadow-xl"
          aria-label="Previous card"
        >
          <ChevronLeft className="w-5 h-5" />
        </button>

        <button
          onClick={(e) => {
            e.stopPropagation();
            handleNext();
          }}
          className="absolute right-2 sm:right-4 z-40 p-3 rounded-full bg-[#211A1D]/80 backdrop-blur-md border border-[#33292C] text-[#999194] hover:text-white hover:border-accent hover:bg-accent/10 transition-all shadow-xl"
          aria-label="Next card"
        >
          <ChevronRight className="w-5 h-5" />
        </button>

        {/* 3D Curved Concave Cards */}
        <div
          className="relative w-full h-full flex items-center justify-center"
          style={{ transformStyle: "preserve-3d" }}
        >
          {arcProjects.map((project, idx) => {
            const diff = idx - activeIndex;

            // Display up to 3 cards on each side of the active card
            const isVisible = Math.abs(diff) <= 3;
            if (!isVisible) return null;

            // Concave Arc Geometry Math:
            // Outer cards angle inwards toward the center, coming closer to the camera
            // to produce the exact curved amphitheater perspective from the reference image.
            const rotateY = diff * -12.5; // Inward rotation angle
            const translateX = diff * 170; // Horizontal spacing between cards
            const translateZ = Math.pow(Math.abs(diff), 1.25) * 32; // Outer cards pull forward in Z
            const scale = 1 - Math.abs(diff) * 0.04;
            const opacity = 1 - Math.abs(diff) * 0.12;
            const zIndex = 30 - Math.abs(diff);

            return (
              <motion.div
                key={project.id}
                layout
                initial={false}
                animate={{
                  x: translateX,
                  z: translateZ,
                  rotateY: rotateY,
                  scale: scale,
                  opacity: opacity,
                }}
                transition={{
                  type: "spring",
                  stiffness: 280,
                  damping: 30,
                  mass: 0.8,
                }}
                onClick={(e) => {
                  e.stopPropagation();
                  if (diff === 0) {
                    onSelectProject(project);
                  } else {
                    setActiveIndex(idx);
                  }
                }}
                className={`absolute w-[200px] sm:w-[250px] md:w-[280px] aspect-[3/4] rounded-2xl sm:rounded-3xl overflow-hidden cursor-pointer group shadow-2xl transition-all duration-300 ${
                  diff === 0
                    ? "ring-2 ring-accent shadow-[0_0_35px_rgba(240,120,61,0.35)]"
                    : "border border-[#33292C] hover:border-accent/60"
                }`}
                style={{
                  zIndex: zIndex,
                  transformStyle: "preserve-3d",
                  backgroundColor: "#211A1D",
                }}
              >
                {/* Image / Thumbnail with Original Aspect Filling Card */}
                <Image
                  src={project.coverImage}
                  alt={project.title}
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
                  sizes="(max-width: 768px) 250px, 300px"
                  priority={Math.abs(diff) <= 1}
                />

                {/* Dark Vignette Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-[#100D0F]/90 via-[#100D0F]/20 to-transparent opacity-70 group-hover:opacity-40 transition-opacity" />

                {/* Top Badge: Category & Reel indicator */}
                <div className="absolute top-3.5 left-3.5 right-3.5 flex items-center justify-between text-[10px] font-mono">
                  <span className="px-2.5 py-0.5 rounded-full bg-[#100D0F]/80 backdrop-blur-md border border-[#33292C] text-[#F5F2F0] uppercase">
                    {project.category}
                  </span>
                  {project.videoUrl && (
                    <span className="px-2 py-0.5 rounded-full bg-accent text-black font-bold flex items-center space-x-1 shadow-sm">
                      <Play className="w-2.5 h-2.5 fill-black" />
                      <span>REEL</span>
                    </span>
                  )}
                </div>

                {/* Bottom Card Title (Clean, unobscured) */}
                <div className="absolute bottom-4 inset-x-4 space-y-0.5">
                  <span className="text-[10px] font-mono text-accent block uppercase font-medium">
                    {project.role}
                  </span>
                  <h4 className="font-heading text-sm sm:text-base font-bold text-white truncate">
                    {project.title}
                  </h4>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>

      {/* Bottom Numbered Pillars Section (Exact match to Reference) */}
      <div className="max-w-5xl mx-auto mt-8 sm:mt-12 px-6">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 pt-8 border-t border-[#33292C]">
          {pillars.map((pillar) => (
            <div key={pillar.num} className="space-y-1 text-center sm:text-left">
              <span className="font-mono text-xs font-bold text-accent block">
                {pillar.num}
              </span>
              <h5 className="font-heading text-sm sm:text-base font-bold text-[#F5F2F0]">
                {pillar.title}
              </h5>
              <p className="text-[11px] font-mono text-[#999194] hidden sm:block">
                {pillar.desc}
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
