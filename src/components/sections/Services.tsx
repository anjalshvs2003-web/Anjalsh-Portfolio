"use client";

import { useState } from "react";
import { siteConfig } from "@/data/siteConfig";
import SectionHeader from "@/components/ui/SectionHeader";
import { ArrowUpRight, Plus, Minus, Check } from "lucide-react";
import Link from "next/link";

export default function Services() {
  const [expandedId, setExpandedId] = useState<string | null>("creative-direction");

  const toggleService = (id: string) => {
    setExpandedId(expandedId === id ? null : id);
  };

  return (
    <section id="services" className="relative py-24 sm:py-32 px-6 sm:px-8 lg:px-12 bg-[#0a0a0a]">
      <div className="max-w-7xl mx-auto">
        <SectionHeader
          number="03"
          tag="DISCIPLINES & EXPERTISE"
          title="SERVICES & CREATIVE OFFERINGS"
          description="From initial script concepts and on-set camera operation to final DaVinci Resolve color grading and next-generation AI cinema."
        />

        {/* Services Accordion List */}
        <div className="border-t border-white/[0.08] divide-y divide-white/[0.08]">
          {siteConfig.services.map((service) => {
            const isExpanded = expandedId === service.id;

            return (
              <div
                key={service.id}
                className={`transition-colors duration-300 ${
                  isExpanded ? "bg-white/[0.02]" : "hover:bg-white/[0.01]"
                }`}
              >
                {/* Header row */}
                <button
                  onClick={() => toggleService(service.id)}
                  className="w-full py-7 px-4 sm:px-6 flex items-center justify-between text-left group"
                  aria-expanded={isExpanded}
                >
                  <div className="flex items-baseline space-x-4 sm:space-x-8">
                    <span className="font-mono text-xs text-zinc-500 group-hover:text-accent transition-colors">
                      {service.number}
                    </span>
                    <div>
                      <h3 className="font-heading text-xl sm:text-3xl font-bold tracking-tight text-white group-hover:text-accent transition-colors">
                        {service.title}
                      </h3>
                      <span className="text-[11px] font-mono text-zinc-500 uppercase tracking-wider block sm:inline sm:ml-4">
                        {service.shortTag}
                      </span>
                    </div>
                  </div>

                  <div className="flex items-center space-x-4">
                    <div className="p-2 rounded-full border border-white/10 group-hover:border-accent text-zinc-400 group-hover:text-white transition-all">
                      {isExpanded ? (
                        <Minus className="w-4 h-4 text-accent" />
                      ) : (
                        <Plus className="w-4 h-4" />
                      )}
                    </div>
                  </div>
                </button>

                {/* Expanded Details */}
                {isExpanded && (
                  <div className="px-4 sm:px-14 pb-8 pt-2 grid grid-cols-1 md:grid-cols-12 gap-8 text-sm">
                    {/* Left: Description */}
                    <div className="md:col-span-6 space-y-4">
                      <p className="text-zinc-300 font-light leading-relaxed text-base">
                        {service.description}
                      </p>
                      <div className="pt-2">
                        <Link
                          href={`#contact?service=${encodeURIComponent(service.title)}`}
                          className="inline-flex items-center space-x-2 text-xs font-mono tracking-wider text-accent hover:underline uppercase"
                        >
                          <span>INQUIRE FOR {service.title}</span>
                          <ArrowUpRight className="w-3.5 h-3.5" />
                        </Link>
                      </div>
                    </div>

                    {/* Middle: Deliverables */}
                    <div className="md:col-span-3 space-y-2">
                      <span className="text-[11px] font-mono uppercase tracking-widest text-zinc-500 block mb-2">
                        KEY DELIVERABLES
                      </span>
                      <ul className="space-y-1.5 font-mono text-xs text-zinc-400">
                        {service.deliverables.map((item) => (
                          <li key={item} className="flex items-center space-x-2">
                            <Check className="w-3.5 h-3.5 text-accent shrink-0" />
                            <span>{item}</span>
                          </li>
                        ))}
                      </ul>
                    </div>

                    {/* Right: Tools & Environment */}
                    <div className="md:col-span-3 space-y-2">
                      <span className="text-[11px] font-mono uppercase tracking-widest text-zinc-500 block mb-2">
                        TOOLS & METHODOLOGY
                      </span>
                      <div className="flex flex-wrap gap-1.5">
                        {service.tools.map((tool) => (
                          <span
                            key={tool}
                            className="px-2.5 py-1 rounded bg-white/[0.04] border border-white/[0.08] text-[11px] font-mono text-zinc-400"
                          >
                            {tool}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {/* Custom Commission Prompt */}
        <div className="mt-16 p-8 rounded-2xl bg-gradient-to-r from-white/[0.02] to-white/[0.04] border border-white/[0.08] flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6">
          <div>
            <h4 className="font-heading text-lg sm:text-xl font-bold text-white">
              Need a bespoke combination of services?
            </h4>
            <p className="text-zinc-400 text-xs sm:text-sm font-light mt-1">
              From end-to-end commercial production to dedicated color grading packages, projects can be tailored to your exact scope.
            </p>
          </div>

          <Link
            href="#contact"
            className="px-6 py-3 rounded-full bg-white text-black font-mono text-xs font-semibold hover:bg-accent transition-colors shrink-0"
          >
            DISCUSS PROJECT SCOPE
          </Link>
        </div>
      </div>
    </section>
  );
}
