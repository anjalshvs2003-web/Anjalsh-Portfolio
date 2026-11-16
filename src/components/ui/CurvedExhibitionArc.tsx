"use client";

import { useState, useRef, useEffect, useMemo, useCallback } from "react";
import Image from "next/image";
import { Project, ScrollingArcConfig } from "@/types";
import { ChevronLeft, ChevronRight, Play, ArrowRight, Pause, Sparkles } from "lucide-react";

interface CurvedExhibitionArcProps {
  projects: Project[];
  config?: ScrollingArcConfig;
  onSelectProject: (project: Project) => void;
}

export default function CurvedExhibitionArc({
  projects,
  config,
  onSelectProject,
}: CurvedExhibitionArcProps) {
  // Use curated project IDs from config if provided, otherwise default to all projects
  const arcProjects = useMemo(() => {
    if (!projects || projects.length === 0) return [];

    let pool: Project[] = [];
    if (config?.selectedProjectIds && config.selectedProjectIds.length > 0) {
      const byId = new Map(projects.map((p) => [p.id, p]));
      for (const id of config.selectedProjectIds) {
        const found = byId.get(id);
        if (found) pool.push(found);
      }
    }

    if (pool.length === 0) {
      pool = [...projects];
    }

    // Ensure smooth infinite wrap-around
    if (pool.length >= 12) return pool;
    let expanded = [...pool];
    while (expanded.length < 12) {
      expanded = [...expanded, ...pool];
    }
    return expanded;
  }, [projects, config?.selectedProjectIds]);

  const total = arcProjects.length;

  // Responsive dimensions for exact non-overlapping geometry and identical gaps
  const [dimensions, setDimensions] = useState({
    cardWidth: 270,
    cardHeight: 360,
    gap: 28,
    theta0: 11.5 * (Math.PI / 180),
    zScale: 0.65,
  });

  useEffect(() => {
    const updateDimensions = () => {
      const w = window.innerWidth;
      if (w < 640) {
        setDimensions({
          cardWidth: 175,
          cardHeight: 235,
          gap: 16,
          theta0: 14 * (Math.PI / 180),
          zScale: 0.45,
        });
      } else if (w < 1024) {
        setDimensions({
          cardWidth: 220,
          cardHeight: 295,
          gap: 22,
          theta0: 12.5 * (Math.PI / 180),
          zScale: 0.55,
        });
      } else {
        setDimensions({
          cardWidth: 270,
          cardHeight: 360,
          gap: 28,
          theta0: 11.5 * (Math.PI / 180),
          zScale: 0.65,
        });
      }
    };

    updateDimensions();
    window.addEventListener("resize", updateDimensions);
    return () => window.removeEventListener("resize", updateDimensions);
  }, []);

  // Continuous animation state for silky 60fps loop scrolling
  const posRef = useRef(3); // Start with project index 3 in center
  const targetPosRef = useRef(3);
  const isDraggingRef = useRef(false);
  const isHoveredRef = useRef(false);
  const dragStartXRef = useRef(0);
  const dragStartPosRef = useRef(3);
  const lastTimeRef = useRef(0);
  const [currentPos, setCurrentPos] = useState(3);
  const [isPausedUser, setIsPausedUser] = useState(false);
  const hasDraggedRef = useRef(false);

  // RAF loop for buttery smooth continuous infinite scrolling & spring easing
  useEffect(() => {
    let animId: number;

    const loop = (timestamp: number) => {
      if (!lastTimeRef.current) lastTimeRef.current = timestamp;
      const dt = Math.min((timestamp - lastTimeRef.current) / 1000, 0.1);
      lastTimeRef.current = timestamp;

      const speedMultiplier = config?.speed === "slow" ? 0.07 : config?.speed === "fast" ? 0.24 : 0.14;
      const directionMultiplier = config?.direction === "right" ? -1 : 1;
      const shouldPause = (config?.pauseOnHover ?? true) && isHoveredRef.current;

      // Auto-glide continuous loop if not dragging, not hovered, and not manually paused
      if (!isDraggingRef.current && !shouldPause && !isPausedUser) {
        targetPosRef.current += speedMultiplier * directionMultiplier * dt;
      }

      // Smooth lerp interpolation towards targetPos
      const diff = targetPosRef.current - posRef.current;
      if (Math.abs(diff) > 0.0001) {
        posRef.current += diff * Math.min(1, dt * 10);
        setCurrentPos(posRef.current);
      }

      animId = requestAnimationFrame(loop);
    };

    animId = requestAnimationFrame(loop);
    return () => cancelAnimationFrame(animId);
  }, [isPausedUser]);

  // Prev / Next step navigation
  const handlePrev = useCallback(() => {
    targetPosRef.current = Math.round(targetPosRef.current) - 1;
  }, []);

  const handleNext = useCallback(() => {
    targetPosRef.current = Math.round(targetPosRef.current) + 1;
  }, []);

  // Drag / Touch Scrub Handlers for smooth scrubbing
  const handlePointerDown = (e: React.PointerEvent) => {
    isDraggingRef.current = true;
    hasDraggedRef.current = false;
    dragStartXRef.current = e.clientX;
    dragStartPosRef.current = targetPosRef.current;
  };

  const handlePointerMove = (e: React.PointerEvent) => {
    if (!isDraggingRef.current) return;
    const deltaX = e.clientX - dragStartXRef.current;
    if (Math.abs(deltaX) > 6) {
      hasDraggedRef.current = true;
    }
    const stepPx = dimensions.cardWidth + dimensions.gap;
    // Advance position based on drag delta (dragging left moves forward)
    const newTarget = dragStartPosRef.current - deltaX / stepPx;
    targetPosRef.current = newTarget;
    posRef.current = newTarget;
    setCurrentPos(newTarget);
  };

  const handlePointerUp = () => {
    if (!isDraggingRef.current) return;
    isDraggingRef.current = false;
  };

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "ArrowLeft") handlePrev();
      if (e.key === "ArrowRight") handleNext();
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [handlePrev, handleNext]);

  const scrollToGrid = () => {
    const el = document.getElementById("gallery-grid");
    if (el) {
      el.scrollIntoView({ behavior: "smooth" });
    }
  };

  // 4 Primary Creative Disciplines
  const pillars = [
    { num: "#01", title: "Film & Production", desc: "Cinematography, Videography & Directing" },
    { num: "#02", title: "Post Production", desc: "DaVinci Resolve ACEScc & Non-Linear Editing" },
    { num: "#03", title: "Design & Branding", desc: "Swiss Editorial Typography & Brand Systems" },
    { num: "#04", title: "AI Visual Production", desc: "Neural Video Synthesis & Concept Design" },
  ];

  // Calculate infinite looping slots visible on stage
  // We render 9 slots: 7 visible cards matching the reference arc, plus 2 edge buffers for seamless looping
  const visibleSlots = useMemo(() => {
    if (total === 0) return [];
    const k = Math.floor(currentPos);
    const slots = [];

    for (let offset = -4; offset <= 4; offset++) {
      const m = k + offset;
      const d = m - currentPos; // Relative continuous offset from visual center

      // Project index with infinite cyclic modulo wrap
      const projectIdx = ((m % total) + total) % total;
      const project = arcProjects[projectIdx];

      slots.push({
        slotId: m,
        d,
        project,
      });
    }

    return slots;
  }, [currentPos, total, arcProjects]);

  return (
    <div className="relative w-full py-12 md:py-16 overflow-hidden select-none">
      {/* Top Editorial Header Section */}
      <div className="text-center max-w-3xl mx-auto space-y-4 mb-10 sm:mb-14 px-4">
        <span className="text-xs sm:text-sm font-mono tracking-widest text-accent uppercase font-semibold block">
          Behind the Lens & Archive
        </span>

        <h3 className="font-heading text-3xl sm:text-5xl md:text-6xl font-bold tracking-tight text-[#F8FAFC] leading-tight">
          Curious What Else I’ve <br className="hidden sm:inline" /> Created?
        </h3>

        <p className="text-[#94A3B8] text-xs sm:text-sm md:text-base font-light max-w-xl mx-auto leading-relaxed">
          Explore an expansive collection of commercial campaigns, original AI short films, editorial portraits, and graphic design systems in my extended portfolio.
        </p>

        {/* Action Pill Button with Blue Arrow */}
        <div className="pt-2">
          <button
            onClick={scrollToGrid}
            className="inline-flex items-center space-x-3 px-6 py-2.5 rounded-full bg-[#161D2A] border border-[#222C3D] text-[#F8FAFC] hover:border-accent hover:text-white transition-all duration-300 group shadow-lg"
          >
            <span className="text-xs font-mono font-medium tracking-wide">
              See All 52+ Projects Below
            </span>
            <span className="w-7 h-7 rounded-full bg-accent flex items-center justify-center text-white group-hover:scale-110 transition-transform">
              <ArrowRight className="w-3.5 h-3.5 stroke-[2.5]" />
            </span>
          </button>
        </div>
      </div>

      {/* 3D Curved Concave Arc Carousel Stage */}
      <div
        className="relative w-full h-[360px] sm:h-[420px] md:h-[480px] flex items-center justify-center cursor-grab active:cursor-grabbing overflow-hidden"
        onMouseEnter={() => {
          isHoveredRef.current = true;
        }}
        onMouseLeave={() => {
          isHoveredRef.current = false;
          if (isDraggingRef.current) isDraggingRef.current = false;
        }}
        onPointerDown={handlePointerDown}
        onPointerMove={handlePointerMove}
        onPointerUp={handlePointerUp}
        onPointerCancel={handlePointerUp}
        style={{
          perspective: "1200px",
          perspectiveOrigin: "50% 50%",
        }}
      >
        {/* Navigation Arrows for Precision Control */}
        <button
          onClick={(e) => {
            e.stopPropagation();
            handlePrev();
          }}
          className="absolute left-3 sm:left-6 z-40 p-3 sm:p-3.5 rounded-full bg-[#161D2A]/90 backdrop-blur-md border border-[#222C3D] text-[#94A3B8] hover:text-white hover:border-accent hover:bg-accent/15 transition-all shadow-2xl"
          aria-label="Previous project"
        >
          <ChevronLeft className="w-5 h-5" />
        </button>

        <button
          onClick={(e) => {
            e.stopPropagation();
            handleNext();
          }}
          className="absolute right-3 sm:right-6 z-40 p-3 sm:p-3.5 rounded-full bg-[#161D2A]/90 backdrop-blur-md border border-[#222C3D] text-[#94A3B8] hover:text-white hover:border-accent hover:bg-accent/15 transition-all shadow-2xl"
          aria-label="Next project"
        >
          <ChevronRight className="w-5 h-5" />
        </button>

        {/* Small Auto-scroll & Pause Indicator Pill */}
        <div className="absolute top-3 right-4 z-40 hidden sm:flex items-center space-x-2 px-3 py-1 rounded-full bg-[#0A0D12]/80 backdrop-blur-md border border-[#222C3D] text-[10px] font-mono text-[#94A3B8]">
          <span className="w-1.5 h-1.5 rounded-full bg-accent animate-pulse" />
          <span>{config?.badge || "INFINITE LOOP EXHIBITION"}</span>
          <button
            onClick={(e) => {
              e.stopPropagation();
              setIsPausedUser(!isPausedUser);
            }}
            className="ml-1 text-accent hover:text-white transition-colors"
            title={isPausedUser ? "Resume Auto Scroll" : "Pause Auto Scroll"}
          >
            {isPausedUser ? <Play className="w-3 h-3 fill-accent" /> : <Pause className="w-3 h-3 fill-accent" />}
          </button>
        </div>

        {/* 3D Arc Space */}
        <div
          className="relative w-full h-full flex items-center justify-center pointer-events-none"
          style={{ transformStyle: "preserve-3d" }}
        >
          {visibleSlots.map(({ slotId, d, project }) => {
            // Concave Arc Geometry Math:
            // 1. Angular position along concave cylindrical arc
            const theta = d * dimensions.theta0;

            // 2. Exact X position with analytical constant-gap formula:
            const x =
              (dimensions.cardWidth / dimensions.theta0) * Math.sin(theta) +
              d * dimensions.gap;

            // 3. Z depth: Concave ribbon pulls outer cards forward towards the viewer
            const z =
              (dimensions.cardWidth / dimensions.theta0) *
              (1 - Math.cos(theta)) *
              dimensions.zScale;

            // 4. Inward Rotation Angle: Card faces the center of curvature
            const rotateY = -theta * (180 / Math.PI);

            // 5. Full Opacity:
            // 100% full opacity on all 7 visible cards across the arc!
            const opacity =
              Math.abs(d) <= 3.4
                ? 1.0
                : Math.max(0, 1 - (Math.abs(d) - 3.4) / 0.8);

            // 6. Natural Concave Z-Index
            const zIndex = Math.round(30 + Math.abs(d) * 2);

            const isCenterCard = Math.abs(d) < 0.45;

            return (
              <div
                key={`arc-card-${slotId}`}
                onClick={(e) => {
                  e.stopPropagation();
                  if (hasDraggedRef.current) return;
                  if (isCenterCard) {
                    onSelectProject(project);
                  } else {
                    targetPosRef.current = slotId;
                  }
                }}
                className={`absolute top-1/2 left-1/2 rounded-2xl sm:rounded-3xl overflow-hidden cursor-pointer group shadow-2xl pointer-events-auto transition-shadow duration-300 ${
                  isCenterCard
                    ? "ring-2 ring-accent shadow-[0_0_35px_rgba(59,130,246,0.4)]"
                    : "border border-[#222C3D] hover:border-accent/70"
                }`}
                style={{
                  width: `${dimensions.cardWidth}px`,
                  height: `${dimensions.cardHeight}px`,
                  opacity: opacity,
                  zIndex: zIndex,
                  transform: `translate3d(calc(-50% + ${x}px), -50%, ${z}px) rotateY(${rotateY}deg)`,
                  transformStyle: "preserve-3d",
                  backgroundColor: "#161D2A",
                  willChange: "transform, opacity",
                }}
              >
                {/* Project Cover Image */}
                <Image
                  src={project.coverImage}
                  alt={project.title}
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
                  sizes="(max-width: 640px) 180px, (max-width: 1024px) 240px, 280px"
                  priority={Math.abs(d) <= 1.5}
                />

                {/* Dark Vignette Overlay for Readability */}
                <div className="absolute inset-0 bg-gradient-to-t from-[#0A0D12]/95 via-[#0A0D12]/25 to-transparent opacity-75 group-hover:opacity-45 transition-opacity" />

                {/* Top Badge: Category & Reel indicator */}
                <div className="absolute top-3 left-3 right-3 flex items-center justify-between text-[10px] font-mono">
                  <span className="px-2.5 py-0.5 rounded-full bg-[#0A0D12]/85 backdrop-blur-md border border-[#222C3D] text-[#F8FAFC] uppercase tracking-wider">
                    {project.category}
                  </span>
                  {project.videoUrl && (
                    <span className="px-2 py-0.5 rounded-full bg-accent text-white font-bold flex items-center space-x-1 shadow-sm">
                      <Play className="w-2.5 h-2.5 fill-white" />
                      <span>REEL</span>
                    </span>
                  )}
                </div>

                {/* Center Hover Action Indicator */}
                <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none">
                  <span className="px-3.5 py-1.5 rounded-full bg-[#0A0D12]/90 backdrop-blur-md border border-accent text-accent text-xs font-mono font-medium flex items-center space-x-1.5 shadow-xl">
                    <span>{isCenterCard ? "View Details" : "Inspect"}</span>
                    <ArrowRight className="w-3 h-3" />
                  </span>
                </div>

                {/* Bottom Card Title & Role */}
                <div className="absolute bottom-3.5 inset-x-3.5 space-y-0.5">
                  <span className="text-[10px] font-mono text-accent block uppercase font-medium truncate">
                    {project.role}
                  </span>
                  <h4 className="font-heading text-xs sm:text-sm md:text-base font-bold text-white truncate leading-snug">
                    {project.title}
                  </h4>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Bottom Numbered Pillars Section */}
      <div className="max-w-5xl mx-auto mt-8 sm:mt-12 px-6">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 pt-8 border-t border-[#222C3D]">
          {pillars.map((pillar) => (
            <div key={pillar.num} className="space-y-1 text-center sm:text-left">
              <span className="font-mono text-xs font-bold text-accent block">
                {pillar.num}
              </span>
              <h5 className="font-heading text-sm sm:text-base font-bold text-[#F8FAFC]">
                {pillar.title}
              </h5>
              <p className="text-[11px] font-mono text-[#94A3B8] hidden sm:block">
                {pillar.desc}
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
