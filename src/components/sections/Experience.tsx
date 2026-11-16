"use client";

import { siteConfig } from "@/data/siteConfig";
import SectionHeader from "@/components/ui/SectionHeader";
import { MapPin, CheckCircle2 } from "lucide-react";

export default function Experience() {
  return (
    <section id="experience" className="relative py-24 sm:py-32 px-6 sm:px-8 lg:px-12 bg-[#0A0D12] border-t border-[#222C3D] text-[#F8FAFC]">
      <div className="max-w-7xl mx-auto">
        <SectionHeader
          number="04"
          tag="CAREER TIMELINE"
          title="PROFESSIONAL EXPERIENCE"
          description="A documented track record of creative output across commercial advertising studios, wellness brands, and independent creative practice."
        />

        {/* Experience Timeline Cards */}
        <div className="space-y-8 relative">
          {/* Vertical subtle timeline guideline for large screens */}
          <div className="hidden lg:block absolute left-[300px] top-6 bottom-6 w-[1px] bg-[#222C3D]" />

          {siteConfig.experiences.map((exp, idx) => (
            <div
              key={exp.period + exp.company}
              className="relative grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-12 p-6 sm:p-10 rounded-2xl bg-[#161D2A] border border-[#222C3D] hover:border-accent/60 transition-all duration-300"
            >
              {/* Left: Number, Time & Company Meta */}
              <div className="lg:col-span-4 space-y-3 lg:pr-6">
                <div className="flex items-center space-x-3">
                  <span className="font-mono text-lg font-bold text-accent">
                    0{idx + 1}
                  </span>
                  <span className="text-[#222C3D]">/</span>
                  {exp.isCurrent && (
                    <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-[10px] font-mono bg-accent/15 text-accent border border-accent/40 font-semibold">
                      ACTIVE ROLE
                    </span>
                  )}
                  <span className="font-mono text-xs text-[#94A3B8]">
                    {exp.period}
                  </span>
                </div>

                <h3 className="font-heading text-xl sm:text-2xl font-bold text-[#F8FAFC] tracking-tight">
                  {exp.company}
                </h3>

                <div className="flex items-center space-x-1.5 text-xs font-mono text-[#94A3B8]">
                  <MapPin className="w-3.5 h-3.5 text-accent shrink-0" />
                  <span>{exp.location}</span>
                </div>
              </div>

              {/* Right: Role, Description & Highlights */}
              <div className="lg:col-span-8 space-y-4">
                <div>
                  <h4 className="font-heading text-lg sm:text-xl font-semibold text-accent">
                    {exp.role}
                  </h4>
                  <p className="text-[#94A3B8] text-sm sm:text-base font-normal mt-2 leading-relaxed">
                    {exp.description}
                  </p>
                </div>

                {/* Bulleted Highlights */}
                <div className="space-y-2 pt-3 border-t border-[#222C3D]">
                  <span className="text-[11px] font-mono uppercase tracking-widest text-accent font-medium block">
                    KEY RESPONSIBILITIES
                  </span>
                  <ul className="space-y-2.5 font-mono text-xs text-[#94A3B8]">
                    {exp.highlights.map((h, i) => (
                      <li key={i} className="flex items-start space-x-2.5">
                        <CheckCircle2 className="w-4 h-4 text-accent shrink-0 mt-0.5" />
                        <span className="text-[#F8FAFC]/90">{h}</span>
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
