"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowUpRight, Play, Eye } from "lucide-react";
import { Project } from "@/types";

interface ProjectCardProps {
  project: Project;
  onSelectProject: (project: Project) => void;
  index: number;
}

export default function ProjectCard({
  project,
  onSelectProject,
  index,
}: ProjectCardProps) {
  // Asymmetrical masonry sizing: featured items or every 5th item spans 2 columns
  const isLarge = project.featured && (index % 4 === 0 || index === 0);

  // Compute aspect ratio CSS
  const getAspectRatio = () => {
    if (project.aspectRatio === "4:5" || project.aspectRatio === "3:4") return "4 / 5";
    if (project.aspectRatio === "1:1") return "1 / 1";
    if (project.aspectRatio === "2.39:1" || project.aspectRatio === "21:9") return "2.39 / 1";
    if (isLarge) return "16 / 9";
    return "16 / 10";
  };

  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 25 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 0.55, delay: (index % 3) * 0.08 }}
      className={`group relative flex flex-col justify-between ${
        isLarge ? "md:col-span-2" : "col-span-1"
      }`}
      data-cursor-text={project.videoUrl ? "PLAY" : "VIEW"}
    >
      {/* Visual Frame */}
      <div
        onClick={() => onSelectProject(project)}
        className="relative w-full overflow-hidden rounded-xl bg-[#111111] border border-white/[0.08] cursor-pointer group-hover:border-accent/50 transition-all duration-500 shadow-lg group-hover:shadow-[0_0_30px_rgba(212,255,0,0.12)]"
        style={{ aspectRatio: getAspectRatio() }}
      >
        <Image
          src={project.coverImage}
          alt={project.title}
          fill
          loading="lazy"
          className="object-cover transition-transform duration-700 ease-out group-hover:scale-105"
          sizes={isLarge ? "(max-width: 768px) 100vw, 80vw" : "(max-width: 768px) 100vw, 45vw"}
        />

        {/* Cinematic Gradient Vignette */}
        <div className="absolute inset-0 bg-gradient-to-t from-[#080808]/90 via-[#080808]/20 to-transparent opacity-65 group-hover:opacity-45 transition-opacity duration-500" />

        {/* Top Badges: Category & Video tag */}
        <div className="absolute top-4 left-4 z-10 flex items-center space-x-2">
          <span className="px-3 py-1 rounded-full bg-[#080808]/80 backdrop-blur-md border border-white/10 text-[10px] font-mono tracking-widest text-zinc-300 uppercase">
            {project.category}
          </span>
          {project.videoUrl && (
            <span className="px-2.5 py-1 rounded-full bg-[#080808]/80 backdrop-blur-md border border-accent/40 text-[10px] font-mono text-accent flex items-center space-x-1">
              <Play className="w-2.5 h-2.5 fill-accent" />
              <span>REEL</span>
            </span>
          )}
        </div>

        {/* Year stamp top right */}
        <div className="absolute top-4 right-4 z-10">
          <span className="text-[11px] font-mono tracking-widest text-zinc-400 bg-[#080808]/60 px-2.5 py-0.5 rounded-full backdrop-blur-sm border border-white/[0.06]">
            {project.year}
          </span>
        </div>

        {/* Hover Quick Action Eye Button */}
        <div className="absolute bottom-4 right-4 z-10 opacity-0 group-hover:opacity-100 transition-all duration-300 transform translate-y-2 group-hover:translate-y-0">
          <div className="p-3 rounded-full bg-accent text-black font-semibold shadow-xl shadow-accent/25 flex items-center justify-center">
            {project.videoUrl ? <Play className="w-4 h-4 fill-black ml-0.5" /> : <Eye className="w-4 h-4" />}
          </div>
        </div>

        {/* Hover Title Overlay on Image */}
        <div className="absolute bottom-4 left-4 right-16 z-10 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
          <p className="text-[11px] font-mono text-accent truncate">
            {project.role}
          </p>
        </div>
      </div>

      {/* Card Info Below Frame */}
      <div className="pt-3.5 pb-2 flex flex-col justify-between">
        <div className="flex items-baseline justify-between gap-3">
          <h3
            onClick={() => onSelectProject(project)}
            className="font-heading text-base sm:text-lg font-bold tracking-tight text-white group-hover:text-accent transition-colors duration-300 cursor-pointer truncate"
          >
            {project.title}
          </h3>
          <span className="text-[11px] font-mono text-muted whitespace-nowrap">
            {project.category}
          </span>
        </div>

        <p className="text-muted text-xs font-light mt-1 line-clamp-2 leading-relaxed">
          {project.shortDescription}
        </p>

        {/* Bottom Details Row */}
        <div className="flex items-center justify-between mt-3 pt-2 border-t border-white/[0.04]">
          <div className="flex flex-wrap gap-1.5">
            {project.tags.slice(0, 3).map((tag) => (
              <span key={tag} className="text-[10px] font-mono text-zinc-500">
                #{tag}
              </span>
            ))}
          </div>

          <Link
            href={`/work/${project.slug}`}
            className="inline-flex items-center space-x-1 text-xs font-mono text-muted hover:text-white group/link transition-colors"
          >
            <span>CASE STUDY</span>
            <ArrowUpRight className="w-3.5 h-3.5 group-hover/link:text-accent group-hover/link:translate-x-0.5 group-hover/link:-translate-y-0.5 transition-all" />
          </Link>
        </div>
      </div>
    </motion.div>
  );
}
