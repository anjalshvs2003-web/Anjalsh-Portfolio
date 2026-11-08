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
  // Asymmetrical card layout styles based on index
  const isLarge = index % 3 === 0;

  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.6, delay: (index % 4) * 0.1 }}
      className={`group relative flex flex-col justify-between ${
        isLarge ? "md:col-span-2" : "col-span-1"
      }`}
      data-cursor-text="VIEW"
    >
      {/* Visual Frame */}
      <div
        onClick={() => onSelectProject(project)}
        className="relative w-full overflow-hidden rounded-xl bg-zinc-900 border border-white/[0.08] cursor-pointer group-hover:border-accent/40 transition-colors duration-500"
        style={{
          aspectRatio: isLarge ? "21 / 9" : project.aspectRatio === "4:5" ? "4 / 5" : "16 / 10",
        }}
      >
        <Image
          src={project.coverImage}
          alt={project.title}
          fill
          className="object-cover transition-transform duration-700 ease-out group-hover:scale-105"
          sizes={isLarge ? "(max-width: 768px) 100vw, 80vw" : "(max-width: 768px) 100vw, 45vw"}
        />

        {/* Gradient Shadow Overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/20 to-transparent opacity-60 group-hover:opacity-40 transition-opacity duration-500" />

        {/* Corner Tag: Video Indicator or Category */}
        <div className="absolute top-4 left-4 z-10 flex items-center space-x-2">
          <span className="glass-pill px-3 py-1 rounded-full text-[10px] font-mono tracking-widest text-zinc-300 uppercase">
            {project.category}
          </span>
          {project.videoUrl && (
            <span className="glass-pill px-2.5 py-1 rounded-full text-[10px] font-mono text-accent flex items-center space-x-1">
              <Play className="w-2.5 h-2.5 fill-accent" />
              <span>REEL</span>
            </span>
          )}
        </div>

        {/* Year stamp top right */}
        <div className="absolute top-4 right-4 z-10">
          <span className="text-[11px] font-mono tracking-widest text-zinc-400">
            {project.year}
          </span>
        </div>

        {/* Hover Quick Action Button */}
        <div className="absolute bottom-4 right-4 z-10 opacity-0 group-hover:opacity-100 transition-all duration-300 transform translate-y-2 group-hover:translate-y-0">
          <div className="p-3 rounded-full bg-accent text-black font-semibold shadow-lg shadow-accent/20 flex items-center justify-center">
            <Eye className="w-4 h-4" />
          </div>
        </div>
      </div>

      {/* Card Info Below */}
      <div className="pt-4 pb-2 flex flex-col justify-between">
        <div className="flex items-baseline justify-between gap-4">
          <h3
            onClick={() => onSelectProject(project)}
            className="font-heading text-lg sm:text-xl font-bold tracking-tight text-white group-hover:text-accent transition-colors duration-300 cursor-pointer"
          >
            {project.title}
          </h3>
          <span className="text-xs font-mono text-zinc-500 whitespace-nowrap">
            {project.role}
          </span>
        </div>

        <p className="text-zinc-400 text-xs sm:text-sm font-light mt-1.5 line-clamp-2">
          {project.shortDescription}
        </p>

        {/* Action Link row */}
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
            className="inline-flex items-center space-x-1 text-xs font-mono text-zinc-400 hover:text-white group/link transition-colors"
          >
            <span>DETAILS</span>
            <ArrowUpRight className="w-3.5 h-3.5 group-hover/link:text-accent group-hover/link:translate-x-0.5 group-hover/link:-translate-y-0.5 transition-all" />
          </Link>
        </div>
      </div>
    </motion.div>
  );
}
