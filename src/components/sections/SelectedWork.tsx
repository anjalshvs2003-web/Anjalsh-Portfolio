"use client";

import { useState, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { projectsData, projectCategories } from "@/data/projects";
import { Project, ProjectCategory } from "@/types";
import SectionHeader from "@/components/ui/SectionHeader";
import ProjectCard from "@/components/ui/ProjectCard";
import ProjectModal from "@/components/ui/ProjectModal";
import { Filter } from "lucide-react";

export default function SelectedWork() {
  const [activeCategory, setActiveCategory] = useState<ProjectCategory>("All");
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const filteredProjects = useMemo(() => {
    if (activeCategory === "All") return projectsData;
    return projectsData.filter((p) => p.category === activeCategory);
  }, [activeCategory]);

  const handleOpenProject = (project: Project) => {
    setSelectedProject(project);
    setIsModalOpen(true);
  };

  return (
    <section id="work" className="relative py-24 sm:py-32 px-6 sm:px-8 lg:px-12 bg-[#0a0a0a]">
      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-8 mb-12">
          <SectionHeader
            number="01"
            tag="PORTFOLIO ARCHIVE"
            title="SELECTED WORK"
            description="A curated catalog of directorial commissions, commercial spots, cinema grading, and experimental digital narratives."
          />

          {/* Project Counter */}
          <div className="text-right font-mono text-xs text-zinc-500 hidden lg:block pb-12">
            <span className="text-accent text-2xl font-bold block">{projectsData.length}</span>
            <span>INDEXED WORKS</span>
          </div>
        </div>

        {/* Filter Pills */}
        <div className="mb-14 overflow-x-auto pb-4 scrollbar-none">
          <div className="flex items-center space-x-2 min-w-max">
            <div className="flex items-center space-x-1.5 text-zinc-500 text-xs font-mono pr-2">
              <Filter className="w-3.5 h-3.5" />
              <span>FILTER:</span>
            </div>

            {projectCategories.map((category) => {
              const count =
                category === "All"
                  ? projectsData.length
                  : projectsData.filter((p) => p.category === category).length;

              return (
                <button
                  key={category}
                  onClick={() => setActiveCategory(category)}
                  className={`relative px-4 py-2 rounded-full text-xs font-mono tracking-wider transition-all duration-300 ${
                    activeCategory === category
                      ? "text-black bg-white font-semibold shadow-md"
                      : "text-zinc-400 bg-white/[0.03] hover:text-white hover:bg-white/[0.08] border border-white/[0.06]"
                  }`}
                >
                  <span>{category}</span>
                  <span
                    className={`ml-1.5 text-[10px] ${
                      activeCategory === category ? "text-black/70" : "text-zinc-600"
                    }`}
                  >
                    ({count})
                  </span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Dynamic Project Grid */}
        <motion.div
          layout
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 lg:gap-10"
        >
          <AnimatePresence mode="popLayout">
            {filteredProjects.map((project, idx) => (
              <ProjectCard
                key={project.id}
                project={project}
                index={idx}
                onSelectProject={handleOpenProject}
              />
            ))}
          </AnimatePresence>
        </motion.div>

        {/* Empty State */}
        {filteredProjects.length === 0 && (
          <div className="text-center py-20 border border-white/10 rounded-2xl bg-white/[0.01]">
            <p className="font-mono text-sm text-zinc-400">
              No projects found in this category.
            </p>
            <button
              onClick={() => setActiveCategory("All")}
              className="mt-4 px-4 py-2 rounded-full bg-accent text-black font-mono text-xs font-semibold"
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
