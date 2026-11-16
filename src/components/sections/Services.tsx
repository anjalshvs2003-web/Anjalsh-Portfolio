"use client";

import { useState } from "react";
import { siteConfig } from "@/data/siteConfig";
import SectionHeader from "@/components/ui/SectionHeader";
import { ArrowUpRight, Plus, Minus, Check, Sparkles } from "lucide-react";
import Link from "next/link";

export default function Services() {
  const [expandedId, setExpandedId] = useState<string | null>("film-production");

  const toggleService = (id: string) => {
    setExpandedId(expandedId === id ? null : id);
  };

  return (
    <section id="services" className="relative py-24 sm:py-32 px-6 sm:px-8 lg:px-12 bg-[#0A0D12] border-t border-[#222C3D] text-[#F8FAFC]">
      <div className="max-w-7xl mx-auto">
        <SectionHeader
          number="03"
          tag="DISCIPLINES & SERVICES"
          title="CREATIVE DISCIPLINES & SERVICES"
          description="From on-set cinematography and directorial leadership to DaVinci Resolve color timing, disciplined Swiss design systems, and generative neural cinema."
        />

        {/* Services Accordion List with Minimal Swiss Layout */}
        <div className="border-t border-[#222C3D] divide-y divide-[#222C3D]">
          {siteConfig.services.map((service) => {
            const isExpanded = expandedId === service.id;

            return (
              <div
                key={service.id}
                className={`transition-colors duration-300 ${
                  isExpanded ? "bg-[#161D2A]/80" : "hover:bg-[#161D2A]/40"
                }`}
              >
                {/* Header Row */}
                <button
                  onClick={() => toggleService(service.id)}
                  className="w-full py-8 px-4 sm:px-6 flex items-center justify-between text-left group"
                  aria-expanded={isExpanded}
                >
                  <div className="flex items-baseline space-x-4 sm:space-x-8">
                    <span className="font-mono text-sm font-bold text-accent group-hover:text-accent-hover transition-colors">
                      {service.number}
                    </span>
                    <div>
                      <h3 className="font-heading text-xl sm:text-2xl md:text-3xl font-bold tracking-tight text-[#F8FAFC] group-hover:text-accent transition-colors">
                        {service.title}
                      </h3>
                      <span className="text-[11px] font-mono text-[#94A3B8] uppercase tracking-wider block sm:inline sm:ml-4">
                        {service.shortTag}
                      </span>
                    </div>
                  </div>

                  <div className="flex items-center space-x-4">
                    <div className="p-2 rounded-full border border-[#222C3D] group-hover:border-accent text-[#94A3B8] group-hover:text-accent transition-all">
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
                      <p className="text-[#94A3B8] font-normal leading-relaxed text-base">
                        {service.description}
                      </p>
                      <div className="pt-2">
                        <Link
                          href={`/#contact?service=${encodeURIComponent(service.title)}`}
                          className="inline-flex items-center space-x-2 text-xs font-mono tracking-wider text-accent hover:text-accent-hover uppercase font-semibold"
                        >
                          <span>INQUIRE FOR {service.title}</span>
                          <ArrowUpRight className="w-3.5 h-3.5" />
                        </Link>
                      </div>
                    </div>

                    {/* Middle: Deliverables */}
                    <div className="md:col-span-3 space-y-2">
                      <span className="text-[10px] font-mono uppercase tracking-ultra text-accent font-medium block mb-2">
                        KEY DELIVERABLES
                      </span>
                      <ul className="space-y-1.5 font-mono text-xs text-[#94A3B8]">
                        {service.deliverables.map((item) => (
                          <li key={item} className="flex items-center space-x-2">
                            <Check className="w-3.5 h-3.5 text-accent shrink-0" />
                            <span className="text-[#F8FAFC]/90">{item}</span>
                          </li>
                        ))}
                      </ul>
                    </div>

                    {/* Right: Hardware & Software Arsenal */}
                    <div className="md:col-span-3 space-y-2">
                      <span className="text-[10px] font-mono uppercase tracking-ultra text-[#94A3B8] font-medium block mb-2">
                        HARDWARE & PIPELINE
                      </span>
                      <ul className="space-y-1.5 font-mono text-xs text-[#94A3B8]">
                        {service.tools.map((tool) => (
                          <li key={tool} className="flex items-center space-x-2">
                            <span className="w-1.5 h-1.5 rounded-full bg-accent/60" />
                            <span>{tool}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
