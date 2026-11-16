"use client";

import { useState, useMemo } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { projectsData, projectCategories } from "@/data/projects";
import { Project, ProjectCategory } from "@/types";
import SectionHeader from "@/components/ui/SectionHeader";
import ProjectCard from "@/components/ui/ProjectCard";
import ProjectModal from "@/components/ui/ProjectModal";
import CurvedExhibitionArc from "@/components/ui/CurvedExhibitionArc";
import { usePortfolio } from "@/context/PortfolioContext";
import { Filter, ArrowDown, ArrowUpDown, Search, ArrowRight, Sparkles } from "lucide-react";

type SortOption = "featured" | "newest" | "oldest";

interface SelectedWorkProps {
  isFullArchive?: boolean;
}

export default function SelectedWork({ isFullArchive = false }: SelectedWorkProps) {
  const { projects: liveProjects, scrollingArcConfig } = usePortfolio();
  const currentProjects = liveProjects && liveProjects.length > 0 ? liveProjects : projectsData;

  const [activeCategory, setActiveCategory] = useState<ProjectCategory>("All Works");
  const [searchQuery, setSearchQuery] = useState("");
  const [sortBy, setSortBy] = useState<SortOption>("featured");
  const [visibleCount, setVisibleCount] = useState<number>(isFullArchive ? 18 : 8);
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Filter, Search & Sort Logic
  const filteredAndSortedProjects = useMemo(() => {
    let result = [...currentProjects];

    // Category filter
    if (activeCategory !== "All Works") {
      result = result.filter((p) => p.category === activeCategory);
    }

    // Search query filter
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase().trim();
      result = result.filter(
        (p) =>
          p.title.toLowerCase().includes(q) ||
          p.category.toLowerCase().includes(q) ||
          p.role.toLowerCase().includes(q) ||
          (p.client && p.client.toLowerCase().includes(q)) ||
          p.tags.some((t) => t.toLowerCase().includes(q))
      );
    }

    // Sorting
    if (sortBy === "featured") {
      result.sort((a, b) => {
        if (a.featured === b.featured) {
          return parseInt(b.year) - parseInt(a.year);
        }
        return a.featured ? -1 : 1;
      });
    } else if (sortBy === "newest") {
      result.sort((a, b) => parseInt(b.year) - parseInt(a.year));
    } else if (sortBy === "oldest") {
      result.sort((a, b) => parseInt(a.year) - parseInt(b.year));
    }

    return result;
  }, [activeCategory, searchQuery, sortBy]);

  // For homepage: Take the top 8 curated featured projects
  // For full archive: Take paginated visible items
  const displayProjects = useMemo(() => {
    if (!isFullArchive) {
      // Pick 8 diverse, high-impact projects representing cinematography, AI films, photography, and design
      return filteredAndSortedProjects.slice(0, 8);
    }
    return filteredAndSortedProjects.slice(0, visibleCount);
  }, [isFullArchive, filteredAndSortedProjects, visibleCount]);

  const handleOpenProject = (project: Project) => {
    setSelectedProject(project);
    setIsModalOpen(true);
  };

  const handleLoadMore = () => {
    setVisibleCount((prev) => Math.min(prev + 12, filteredAndSortedProjects.length));
  };

  const handleCategoryChange = (category: ProjectCategory) => {
    setActiveCategory(category);
    setVisibleCount(18);
  };

  // Discipline description mapping for editorial context
  const disciplineDescriptions: Record<string, string> = {
    "Photography": "A dense visual archive: High-contrast chiaroscuro portraiture, natural shadow falloff, and tactile still framing captured on Sony Cinema Line & medium format optics.",
    "Graphic Design": "Swiss editorial typography, luxury branding identity, poster collections, and experimental visual communications.",
    "Cinematography": "Cinematic 2.39:1 widescreen anamorphic frames, dramatic light sculpting, and directorial scene composition.",
    "Video Editing": "Non-linear narrative pacing, rhythmic audio synchronization, and high-impact commercial cuts.",
    "Motion Graphics": "Kinetic typography, abstract 3D visualizers, dynamic identity reels, and procedural animation.",
    "AI Films": "Original AI-generated fiction short films: Neural prompt engineering, runway Gen-3 temporal synthesis, and cinematic sound design.",
    "Commercial Advertising": "High-conversion brand campaigns, wellness storytelling, and multi-format social advertising.",
    "Branding": "Full visual identity systems, corporate brand books, typographic hierarchy, and luxury packaging.",
  };

  return (
    <section id="work" className="relative py-24 sm:py-32 px-6 sm:px-8 lg:px-12 bg-[#0A0D12] text-[#F8FAFC]">
      <div className="max-w-7xl mx-auto">
        {/* Section Header with live project count */}
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-8 mb-12">
          <SectionHeader
            number="01"
            tag={isFullArchive ? "COMPLETE ARCHIVE" : "SELECTED WORKS"}
            title={isFullArchive ? "EXHIBITION ARCHIVE" : "CURATED PROJECTS & PORTFOLIO"}
            description={
              isFullArchive
                ? "An expansive digital exhibition showcasing 52+ projects across cinematography, original AI filmmaking, editorial photography, Swiss typography, and high-stakes commercial direction."
                : "A curated selection of 8 flagship projects demonstrating directorial vision, DaVinci Resolve color grading, Swiss typography, and neural cinema pipelines."
            }
          />

          <div className="text-right font-mono text-xs text-[#94A3B8] hidden lg:block pb-14">
            <span className="text-accent text-4xl font-black block tracking-tight">
              {currentProjects.length}+
            </span>
            <span className="uppercase text-[10px] tracking-ultra text-[#94A3B8]">
              CURATED EXHIBITION PIECES
            </span>
          </div>
        </div>

        {/* ============================================================== */}
        {/* 3D CURVED CONCAVE EXHIBITION ARC */}
        {/* ============================================================== */}
        <div className="mb-16 pb-12 border-b border-[#222C3D]">
          <CurvedExhibitionArc
            projects={currentProjects}
            config={scrollingArcConfig}
            onSelectProject={handleOpenProject}
          />
        </div>

        {/* ============================================================== */}
        {/* FILTER PILLS, SEARCH & SORT BAR (Full archive or category filter) */}
        {/* ============================================================== */}
        <div
          id="gallery-grid"
          className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-8 pb-6 border-b border-[#222C3D]"
        >
          {/* Category Filter Pills (Horizontal scroll on mobile) */}
          <div className="overflow-x-auto pb-2 -mx-2 px-2 scrollbar-none">
            <div className="flex items-center space-x-2 min-w-max">
              <div className="flex items-center space-x-1.5 text-[#94A3B8] text-xs font-mono pr-2">
                <Filter className="w-3.5 h-3.5 text-accent" />
                <span>FILTER:</span>
              </div>

              {projectCategories.map((category) => {
                const count =
                  category === "All Works"
                    ? currentProjects.length
                    : currentProjects.filter((p) => p.category === category).length;

                const isActive = activeCategory === category;

                return (
                  <button
                    key={category}
                    onClick={() => handleCategoryChange(category)}
                    className={`relative px-4 py-2 rounded-full text-xs font-mono tracking-wider transition-all duration-300 ${
                      isActive
                        ? "text-white bg-accent font-semibold shadow-[0_0_20px_rgba(59,130,246,0.4)]"
                        : "text-[#94A3B8] bg-[#161D2A] hover:text-white hover:bg-[#1E2638] border border-[#222C3D]"
                    }`}
                  >
                    <span>{category}</span>
                    <span
                      className={`ml-1.5 text-[10px] ${
                        isActive ? "text-white/90 font-bold" : "text-[#94A3B8]/70"
                      }`}
                    >
                      ({count})
                    </span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Search Bar & Sorting Dropdown */}
          <div className="flex items-center justify-between md:justify-end space-x-3 shrink-0 font-mono text-xs">
            {isFullArchive && (
              <div className="relative">
                <Search className="w-3.5 h-3.5 text-[#94A3B8] absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none" />
                <input
                  type="text"
                  placeholder="Search works..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-8 pr-3 py-1.5 rounded-lg bg-[#161D2A] border border-[#222C3D] text-[#F8FAFC] placeholder-[#94A3B8]/50 focus:outline-none focus:border-accent font-mono text-xs w-36 sm:w-48 transition-colors"
                />
              </div>
            )}

            <div className="flex items-center space-x-2 text-[#94A3B8]">
              <ArrowUpDown className="w-3.5 h-3.5 text-accent" />
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value as SortOption)}
                aria-label="Sort projects"
                className="bg-[#161D2A] border border-[#222C3D] text-[#F8FAFC] rounded-lg px-2.5 py-1.5 focus:outline-none focus:border-accent text-xs font-mono"
              >
                <option value="featured">Featured</option>
                <option value="newest">Newest</option>
                <option value="oldest">Oldest</option>
              </select>
            </div>
          </div>
        </div>

        {/* Discipline Context Explainer */}
        {activeCategory !== "All Works" && disciplineDescriptions[activeCategory] && (
          <div className="mb-10 p-5 rounded-xl bg-[#161D2A] border border-[#222C3D] flex items-start space-x-3 text-xs font-mono">
            <span className="text-accent font-bold mt-0.5">•</span>
            <div>
              <span className="text-accent uppercase font-semibold mr-2">
                {activeCategory} ARCHIVE:
              </span>
              <span className="text-[#94A3B8]">
                {disciplineDescriptions[activeCategory]}
              </span>
            </div>
          </div>
        )}

        {/* ============================================================== */}
        {/* DYNAMIC ASYMMETRICAL EDITORIAL GRID */}
        {/* ============================================================== */}
        <motion.div
          layout
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-7 lg:gap-9"
        >
          <AnimatePresence mode="popLayout">
            {displayProjects.map((project, idx) => (
              <ProjectCard
                key={project.id}
                project={project}
                index={idx}
                onSelectProject={handleOpenProject}
              />
            ))}
          </AnimatePresence>
        </motion.div>

        {/* HOMEPAGE CTA: VIEW COMPLETE ARCHIVE */}
        {!isFullArchive && (
          <div className="flex flex-col items-center justify-center mt-20 pt-10 border-t border-[#222C3D] space-y-4">
            <Link
              href="/work"
              className="inline-flex items-center space-x-3 px-10 py-4 rounded-full bg-accent text-white font-mono text-xs tracking-widest uppercase font-semibold hover:bg-accent-hover transition-all duration-300 shadow-[0_0_30px_rgba(59,130,246,0.35)] group"
            >
              <span>EXPLORE COMPLETE ARCHIVE ({currentProjects.length}+ WORKS)</span>
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1.5 transition-transform" />
            </Link>
            <p className="text-xs font-mono text-[#94A3B8]">
              Browse complete case studies across all 9 creative categories
            </p>
          </div>
        )}

        {/* Scalable Load More Pagination for Full Archive */}
        {isFullArchive && visibleCount < filteredAndSortedProjects.length && (
          <div className="flex flex-col items-center justify-center mt-16 pt-8 border-t border-[#222C3D] space-y-3">
            <button
              onClick={handleLoadMore}
              className="inline-flex items-center space-x-3 px-10 py-4 rounded-full bg-[#161D2A] border border-[#222C3D] text-[#F8FAFC] hover:border-accent hover:text-accent hover:bg-accent/5 font-mono text-xs tracking-widest uppercase transition-all duration-300 shadow-xl group"
            >
              <span>LOAD MORE WORKS ({filteredAndSortedProjects.length - visibleCount} REMAINING)</span>
              <ArrowDown className="w-4 h-4 group-hover:translate-y-1 transition-transform" />
            </button>
            <p className="text-[11px] font-mono text-[#94A3B8]">
              Displaying {displayProjects.length} of {filteredAndSortedProjects.length} curated works
            </p>
          </div>
        )}

        {/* Empty State */}
        {filteredAndSortedProjects.length === 0 && (
          <div className="text-center py-24 border border-[#222C3D] rounded-2xl bg-[#161D2A]/50">
            <p className="font-mono text-sm text-[#94A3B8]">
              No projects found matching your criteria.
            </p>
            <button
              onClick={() => {
                setActiveCategory("All Works");
                setSearchQuery("");
              }}
              className="mt-4 px-5 py-2.5 rounded-full bg-accent text-white font-mono text-xs font-semibold shadow-lg"
            >
              Reset Filters
            </button>
          </div>
        )}
      </div>

      {/* Project Detail Modal & Lightbox */}
      <ProjectModal
        project={selectedProject}
        isOpen={isModalOpen}
        onClose={() => {
          setIsModalOpen(false);
          setSelectedProject(null);
        }}
      />
    </section>
  );
}
