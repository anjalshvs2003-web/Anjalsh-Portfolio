"use client";

import { siteConfig } from "@/data/siteConfig";
import SectionHeader from "@/components/ui/SectionHeader";
import { Briefcase, Calendar, MapPin, CheckCircle2 } from "lucide-react";

export default function Experience() {
  return (
    <section id="experience" className="relative py-24 sm:py-32 px-6 sm:px-8 lg:px-12 bg-[#09090b] border-t border-white/[0.06]">
      <div className="max-w-7xl mx-auto">
        <SectionHeader
          number="04"
          tag="CAREER TIMELINE"
          title="PROFESSIONAL EXPERIENCE"
          description="A track record of high-impact creative output across advertising studios, wellness brands, and independent creative practice."
        />

        {/* Experience Timeline Cards */}
        <div className="space-y-8 relative">
          {/* Vertical subtle timeline guideline for large screens */}
          <div className="hidden lg:block absolute left-[280px] top-6 bottom-6 w-[1px] bg-white/[0.08]" />

          {siteConfig.experiences.map((exp, idx) => (
            <div
              key={exp.period + exp.company}
              className="relative grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-12 p-6 sm:p-10 rounded-2xl bg-white/[0.02] border border-white/[0.06] hover:border-white/20 transition-all duration-300"
            >
              {/* Left: Time & Company Meta */}
              <div className="lg:col-span-4 space-y-2 lg:pr-6">
                <div className="flex items-center space-x-2">
                  {exp.isCurrent && (
                    <span className="inline-flex items-center px-2 py-0.5 rounded-full text-[10px] font-mono bg-accent/15 text-accent border border-accent/30 font-medium">
                      ACTIVE
                    </span>
                  )}
                  <span className="font-mono text-xs text-zinc-400">
                    {exp.period}
                  </span>
                </div>

                <h3 className="font-heading text-xl sm:text-2xl font-bold text-white tracking-tight">
                  {exp.company}
                </h3>

                <div className="flex items-center space-x-1.5 text-xs font-mono text-zinc-500">
                  <MapPin className="w-3.5 h-3.5" />
                  <span>{exp.location}</span>
                </div>
              </div>

              {/* Right: Role, Description & Highlights */}
              <div className="lg:col-span-8 space-y-4">
                <div>
                  <h4 className="font-heading text-lg sm:text-xl font-semibold text-accent">
                    {exp.role}
                  </h4>
                  <p className="text-zinc-300 text-sm sm:text-base font-light mt-2 leading-relaxed">
                    {exp.description}
                  </p>
                </div>

                {/* Bulleted Highlights */}
                <div className="space-y-2 pt-2 border-t border-white/[0.04]">
                  <span className="text-[11px] font-mono uppercase tracking-widest text-zinc-500 block">
                    KEY CONTRIBUTIONS
                  </span>
                  <ul className="space-y-2 font-mono text-xs text-zinc-400">
                    {exp.highlights.map((h, i) => (
                      <li key={i} className="flex items-start space-x-2.5">
                        <CheckCircle2 className="w-4 h-4 text-accent/80 shrink-0 mt-0.5" />
                        <span>{h}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
