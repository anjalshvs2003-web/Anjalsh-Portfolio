import { notFound } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { Metadata } from "next";
import { projectsData } from "@/data/projects";
import { siteConfig } from "@/data/siteConfig";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import { ArrowLeft, ArrowUpRight, Play, Camera, Sliders, Calendar, Tag, ChevronLeft, ChevronRight } from "lucide-react";

interface ProjectPageProps {
  params: {
    slug: string;
  };
}

export async function generateStaticParams() {
  return projectsData.map((project) => ({
    slug: project.slug,
  }));
}

export async function generateMetadata({ params }: ProjectPageProps): Promise<Metadata> {
  const project = projectsData.find((p) => p.slug === params.slug);
  if (!project) return { title: "Project Not Found | ANJALSH®️" };

  return {
    title: `${project.title} — ANJALSH®️ | ${project.category}`,
    description: project.shortDescription,
    openGraph: {
      title: `${project.title} — ANJALSH®️`,
      description: project.shortDescription,
      images: [{ url: project.coverImage }],
    },
  };
}

export default function ProjectPage({ params }: ProjectPageProps) {
  const currentIndex = projectsData.findIndex((p) => p.slug === params.slug);
  if (currentIndex === -1) {
    notFound();
  }

  const project = projectsData[currentIndex];
  const prevProject = currentIndex > 0 ? projectsData[currentIndex - 1] : projectsData[projectsData.length - 1];
  const nextProject = currentIndex < projectsData.length - 1 ? projectsData[currentIndex + 1] : projectsData[0];

  return (
    <div className="bg-[#100D0F] min-h-screen text-[#F5F2F0]">
      <Navbar />

      <main className="pt-28 pb-24 px-6 sm:px-8 lg:px-12 max-w-7xl mx-auto">
        {/* Back Link */}
        <div className="mb-8">
          <Link
            href="/#work"
            className="inline-flex items-center space-x-2 text-xs font-mono text-[#999194] hover:text-[#F5F2F0] transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>RETURN TO ARCHIVE</span>
          </Link>
        </div>

        {/* Project Header */}
        <div className="space-y-6 mb-12">
          <div className="flex flex-wrap items-center gap-3 text-xs font-mono">
            <span className="px-3 py-1 rounded-full bg-accent/15 border border-accent/35 text-accent uppercase font-semibold">
              {project.category}
            </span>
            <span className="text-[#33292C]">/</span>
            <span className="text-[#999194]">{project.year}</span>
            {project.client && (
              <>
                <span className="text-[#33292C]">/</span>
                <span className="text-[#999194]">{project.client}</span>
              </>
            )}
          </div>

          <h1 className="font-heading text-4xl sm:text-6xl md:text-7xl font-bold tracking-tight text-[#F5F2F0] leading-tight">
            {project.title}
          </h1>

          <p className="text-[#999194] text-base sm:text-xl font-light max-w-4xl leading-relaxed">
            {project.shortDescription}
          </p>
        </div>

        {/* Hero Visual or Video */}
        <div className="relative w-full aspect-video sm:aspect-[2.39/1] rounded-2xl overflow-hidden bg-black border border-[#33292C] mb-16 shadow-2xl">
          {project.videoUrl ? (
            <video
              src={project.videoUrl}
              controls
              autoPlay
              muted
              loop
              className="w-full h-full object-cover"
            />
          ) : (
            <Image
              src={project.coverImage}
              alt={project.title}
              fill
              priority
              className="object-cover"
              sizes="100vw"
            />
          )}
        </div>

        {/* Editorial Narrative & Specs Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 pb-20 border-b border-[#33292C]">
          <div className="lg:col-span-8 space-y-8">
            <div className="space-y-4">
              <span className="text-xs font-mono tracking-widest text-accent uppercase font-medium">
                THE CONCEPT & ARTISTIC RATIONALE
              </span>
              <p className="text-[#999194] text-base sm:text-lg font-light leading-relaxed">
                {project.fullDescription}
              </p>
            </div>

            {/* Gallery Stills */}
            {project.gallery && project.gallery.length > 0 && (
              <div className="space-y-6 pt-8">
                <span className="text-xs font-mono tracking-widest text-[#999194] uppercase block">
                  SELECTED FRAMES & STILLS
                </span>
                <div className="space-y-8">
                  {project.gallery.map((item, idx) => (
                    <div key={idx} className="space-y-2">
                      <div className="relative w-full aspect-video sm:aspect-[2.39/1] rounded-xl overflow-hidden border border-[#33292C] bg-[#211A1D]">
                        <Image
                          src={item.url}
                          alt={item.caption || `${project.title} Still ${idx + 1}`}
                          fill
                          className="object-cover"
                          sizes="(max-width: 1024px) 100vw, 800px"
                        />
                      </div>
                      {item.caption && (
                        <p className="text-xs font-mono text-[#999194] italic">
                          Frame {idx + 1} — {item.caption}
                        </p>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Sidebar Specifications */}
          <div className="lg:col-span-4 space-y-8 font-mono text-xs">
            {/* Meta Card */}
            <div className="p-6 rounded-xl bg-[#211A1D] border border-[#33292C] space-y-4">
              <span className="text-accent uppercase tracking-widest block border-b border-[#33292C] pb-2 font-semibold">
                PROJECT CREDITS
              </span>
              <div className="space-y-2.5">
                <div className="flex justify-between">
                  <span className="text-[#999194]">ROLE</span>
                  <span className="text-[#F5F2F0] text-right font-medium">{project.role}</span>
                </div>
                {project.client && (
                  <div className="flex justify-between">
                    <span className="text-[#999194]">CLIENT / BRAND</span>
                    <span className="text-[#F5F2F0] text-right">{project.client}</span>
                  </div>
                )}
                <div className="flex justify-between">
                  <span className="text-[#999194]">YEAR</span>
                  <span className="text-[#F5F2F0]">{project.year}</span>
                </div>
                {project.credits?.map((credit, i) => (
                  <div key={i} className="flex justify-between">
                    <span className="text-[#999194]">{credit.role.toUpperCase()}</span>
                    <span className="text-[#F5F2F0] text-right">{credit.name}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Technical Card */}
            {project.technicalDetails && (
              <div className="p-6 rounded-xl bg-[#211A1D] border border-[#33292C] space-y-4">
                <span className="text-accent uppercase tracking-widest block border-b border-[#33292C] pb-2 font-semibold">
                  TECHNICAL METRICS
                </span>
                <div className="space-y-2.5">
                  {project.technicalDetails.camera && (
                    <div>
                      <span className="text-[#999194] block text-[10px]">CAPTURE SYSTEM</span>
                      <span className="text-[#F5F2F0] block mt-0.5">{project.technicalDetails.camera}</span>
                    </div>
                  )}
                  {project.technicalDetails.aspectRatio && (
                    <div>
                      <span className="text-[#999194] block text-[10px]">ASPECT RATIO</span>
                      <span className="text-accent block mt-0.5">{project.technicalDetails.aspectRatio}</span>
                    </div>
                  )}
                  {project.technicalDetails.colourSpace && (
                    <div>
                      <span className="text-[#999194] block text-[10px]">COLOUR PIPELINE</span>
                      <span className="text-[#F5F2F0] block mt-0.5">{project.technicalDetails.colourSpace}</span>
                    </div>
                  )}
                  {project.technicalDetails.software && (
                    <div>
                      <span className="text-[#999194] block text-[10px]">SUITE</span>
                      <span className="text-[#999194] block mt-0.5">
                        {project.technicalDetails.software.join(", ")}
                      </span>
                    </div>
                  )}
                </div>
              </div>
            )}

            {/* Inquire CTA */}
            <div className="p-6 rounded-xl bg-[#211A1D] border border-accent/40 space-y-3 shadow-lg shadow-accent/10">
              <span className="text-accent uppercase tracking-widest text-[11px] font-semibold block">
                COMMISSION SIMILAR WORK
              </span>
              <p className="text-[#999194] text-xs font-light">
                Interested in this aesthetic for your upcoming commercial, music film or editorial series?
              </p>
              <Link
                href="/#contact"
                className="inline-flex items-center space-x-2 text-[#F5F2F0] hover:text-accent font-semibold pt-1 transition-colors"
              >
                <span>INITIATE INQUIRY</span>
                <ArrowUpRight className="w-4 h-4" />
              </Link>
            </div>
          </div>
        </div>

        {/* Pagination Prev / Next Projects */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 pt-16 font-mono text-xs">
          <Link
            href={`/work/${prevProject.slug}`}
            className="p-6 rounded-xl bg-[#211A1D] border border-[#33292C] hover:border-accent transition-colors flex items-center space-x-4 group"
          >
            <ChevronLeft className="w-5 h-5 text-[#999194] group-hover:text-accent group-hover:-translate-x-1 transition-all" />
            <div>
              <span className="text-[#999194] block text-[10px] uppercase">PREVIOUS PROJECT</span>
              <span className="text-[#F5F2F0] text-sm font-semibold group-hover:text-accent transition-colors block mt-0.5">
                {prevProject.title}
              </span>
            </div>
          </Link>

          <Link
            href={`/work/${nextProject.slug}`}
            className="p-6 rounded-xl bg-[#211A1D] border border-[#33292C] hover:border-accent transition-colors flex items-center justify-between group text-right"
          >
            <div className="ml-auto">
              <span className="text-[#999194] block text-[10px] uppercase">NEXT PROJECT</span>
              <span className="text-[#F5F2F0] text-sm font-semibold group-hover:text-accent transition-colors block mt-0.5">
                {nextProject.title}
              </span>
            </div>
            <ChevronRight className="w-5 h-5 text-[#999194] group-hover:text-accent group-hover:translate-x-1 transition-all" />
          </Link>
        </div>
      </main>

      <Footer />
    </div>
  );
}
