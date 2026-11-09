"use client";

import { useState, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { projectsData, projectCategories } from "@/data/projects";
import { Project, ProjectCategory } from "@/types";
import SectionHeader from "@/components/ui/SectionHeader";
import ProjectCard from "@/components/ui/ProjectCard";
import ProjectModal from "@/components/ui/ProjectModal";
import CurvedExhibitionArc from "@/components/ui/CurvedExhibitionArc";
import { Filter, ArrowDown, ArrowUpDown } from "lucide-react";

type SortOption = "featured" | "newest" | "oldest";

export default function SelectedWork() {
  const [activeCategory, setActiveCategory] = useState<ProjectCategory>("All Works");
  const [sortBy, setSortBy] = useState<SortOption>("featured");
  const [visibleCount, setVisibleCount] = useState<number>(18);
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Filter & Sort Logic
  const filteredAndSortedProjects = useMemo(() => {
    let result = [...projectsData];

    // Category filter
    if (activeCategory !== "All Works") {
      result = result.filter((p) => p.category === activeCategory);
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
  }, [activeCategory, sortBy]);

  // Paginated visible items
  const visibleProjects = useMemo(() => {
    return filteredAndSortedProjects.slice(0, visibleCount);
  }, [filteredAndSortedProjects, visibleCount]);

  const handleOpenProject = (project: Project) => {
    setSelectedProject(project);
    setIsModalOpen(true);
  };

  const handleLoadMore = () => {
    setVisibleCount((prev) => Math.min(prev + 12, filteredAndSortedProjects.length));
  };

  const handleCategoryChange = (category: ProjectCategory) => {
    setActiveCategory(category);
    setVisibleCount(18); // Reset page count on filter switch
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
    <section id="work" className="relative py-28 sm:py-36 px-6 sm:px-8 lg:px-12 bg-[#100D0F] text-[#F5F2F0]">
      <div className="max-w-7xl mx-auto">
        {/* Section Header with live project count */}
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-8 mb-12">
          <SectionHeader
            number="01"
            tag="EXHIBITION ARCHIVE"
            title="SELECTED WORKS & PORTFOLIO"
            description="An expansive digital exhibition showcasing 52+ projects across cinematography, original AI filmmaking, editorial photography, Swiss typography, and high-stakes commercial direction."
          />

          <div className="text-right font-mono text-xs text-[#999194] hidden lg:block pb-14">
            <span className="text-accent text-4xl font-black block tracking-tight">
              {projectsData.length}+
            </span>
            <span className="uppercase text-[10px] tracking-ultra text-[#999194]">
              CURATED EXHIBITION PIECES
            </span>
          </div>
        </div>

        {/* ============================================================== */}
        {/* 3D CURVED CONCAVE EXHIBITION ARC (Reference Image Matched) */}
        {/* ============================================================== */}
        <div className="mb-16 pb-12 border-b border-[#33292C]">
          <CurvedExhibitionArc
            projects={projectsData}
            onSelectProject={handleOpenProject}
          />
        </div>

        {/* ============================================================== */}
        {/* FILTER PILLS & SORTING BAR */}
        {/* ============================================================== */}
        <div
          id="gallery-grid"
          className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-8 pb-6 border-b border-[#33292C]"
        >
          {/* Category Filter Pills (Horizontal scroll on mobile) */}
          <div className="overflow-x-auto pb-2 -mx-2 px-2 scrollbar-none">
            <div className="flex items-center space-x-2 min-w-max">
              <div className="flex items-center space-x-1.5 text-[#999194] text-xs font-mono pr-2">
                <Filter className="w-3.5 h-3.5 text-accent" />
                <span>FILTER:</span>
              </div>

              {projectCategories.map((category) => {
                const count =
                  category === "All Works"
                    ? projectsData.length
                    : projectsData.filter((p) => p.category === category).length;

                const isActive = activeCategory === category;

                return (
                  <button
                    key={category}
                    onClick={() => handleCategoryChange(category)}
                    className={`relative px-4 py-2 rounded-full text-xs font-mono tracking-wider transition-all duration-300 ${
                      isActive
                        ? "text-black bg-accent font-semibold shadow-[0_0_20px_rgba(240,120,61,0.4)]"
                        : "text-[#999194] bg-[#211A1D] hover:text-white hover:bg-[#292024] border border-[#33292C]"
                    }`}
                  >
                    <span>{category}</span>
                    <span
                      className={`ml-1.5 text-[10px] ${
                        isActive ? "text-black/85 font-bold" : "text-[#999194]/70"
                      }`}
                    >
                      ({count})
                    </span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Sorting Dropdown & Progress */}
          <div className="flex items-center justify-between md:justify-end space-x-4 shrink-0 font-mono text-xs">
            <div className="flex items-center space-x-2 text-[#999194]">
              <ArrowUpDown className="w-3.5 h-3.5 text-accent" />
              <span className="text-[10px] uppercase tracking-wider text-[#999194]">SORT:</span>
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value as SortOption)}
                className="bg-[#211A1D] border border-[#33292C] text-[#F5F2F0] rounded-lg px-3 py-1.5 focus:outline-none focus:border-accent text-xs font-mono"
              >
                <option value="featured">Featured First</option>
                <option value="newest">Newest (2025–2020)</option>
                <option value="oldest">Oldest (2020–2025)</option>
              </select>
            </div>

            <span className="text-[#999194] text-[11px] hidden sm:inline">
              Showing {visibleProjects.length} of {filteredAndSortedProjects.length}
            </span>
          </div>
        </div>

        {/* Discipline Context Explainer (when a specific category is active) */}
        {activeCategory !== "All Works" && disciplineDescriptions[activeCategory] && (
          <div className="mb-10 p-5 rounded-xl bg-[#211A1D] border border-[#33292C] flex items-start space-x-3 text-xs font-mono">
            <span className="text-accent font-bold mt-0.5">•</span>
            <div>
              <span className="text-accent uppercase font-semibold mr-2">
                {activeCategory} ARCHIVE:
              </span>
              <span className="text-[#999194]">
                {disciplineDescriptions[activeCategory]}
              </span>
            </div>
          </div>
        )}

        {/* ============================================================== */}
        {/* DYNAMIC ASYMMETRICAL MASONRY GRID */}
        {/* ============================================================== */}
        <motion.div
          layout
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-7 lg:gap-9"
        >
          <AnimatePresence mode="popLayout">
            {visibleProjects.map((project, idx) => (
              <ProjectCard
                key={project.id}
                project={project}
                index={idx}
                onSelectProject={handleOpenProject}
              />
            ))}
          </AnimatePresence>
        </motion.div>

        {/* Scalable Load More Pagination */}
        {visibleCount < filteredAndSortedProjects.length && (
          <div className="flex flex-col items-center justify-center mt-16 pt-8 border-t border-[#33292C] space-y-3">
            <button
              onClick={handleLoadMore}
              className="inline-flex items-center space-x-3 px-10 py-4 rounded-full bg-[#211A1D] border border-[#33292C] text-[#F5F2F0] hover:border-accent hover:text-accent hover:bg-accent/5 font-mono text-xs tracking-widest uppercase transition-all duration-300 shadow-xl group"
            >
              <span>LOAD MORE WORKS ({filteredAndSortedProjects.length - visibleCount} REMAINING)</span>
              <ArrowDown className="w-4 h-4 group-hover:translate-y-1 transition-transform" />
            </button>
            <p className="text-[11px] font-mono text-[#999194]">
              Displaying {visibleProjects.length} of {filteredAndSortedProjects.length} curated works
            </p>
          </div>
        )}

        {/* Empty State */}
        {filteredAndSortedProjects.length === 0 && (
          <div className="text-center py-24 border border-[#33292C] rounded-2xl bg-[#211A1D]/50">
            <p className="font-mono text-sm text-[#999194]">
              No projects found in this category.
            </p>
            <button
              onClick={() => handleCategoryChange("All Works")}
              className="mt-4 px-5 py-2.5 rounded-full bg-accent text-black font-mono text-xs font-semibold shadow-lg"
            >
              Reset to All Works
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
