"use client";

import Link from "next/link";
import { siteConfig } from "@/data/siteConfig";
import { ArrowUp, ArrowUpRight, Instagram, Mail, MapPin } from "lucide-react";

export default function Footer() {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const primaryInstagram = siteConfig.socialLinks.find((s) => s.platform === "Instagram");

  return (
    <footer className="relative bg-[#100D0F] border-t border-[#33292C] pt-20 pb-12 overflow-hidden text-[#F5F2F0]">
      {/* Background subtle radial ambient highlight with signature orange */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[900px] h-[300px] bg-accent/[0.04] rounded-full blur-[160px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12 relative z-10">
        {/* Main Editorial Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-12 pb-16 border-b border-[#33292C]">
          {/* Brand & Manifesto Column */}
          <div className="lg:col-span-5 space-y-6">
            <div className="space-y-2">
              <span className="font-heading text-2xl font-bold tracking-tight text-white block">
                ANJALSH<sup className="text-xs font-mono text-accent ml-0.5">®️</sup>
              </span>
              <span className="text-xs font-mono uppercase tracking-widest text-[#999194] block">
                {siteConfig.title} &bull; {siteConfig.tagline}
              </span>
            </div>

            <p className="text-[#999194] text-sm font-light leading-relaxed max-w-md">
              Shaping visual stories through cinematic direction, raw analog optics, disciplined Swiss editorial design, and modern neural filmmaking pipelines.
            </p>

            <div className="pt-2 flex items-center space-x-3 text-xs font-mono text-[#999194]">
              <span className="w-2 h-2 rounded-full bg-accent animate-pulse" />
              <span className="text-[#F5F2F0]">AVAILABLE FOR DIRECTORIAL & FREELANCE COMMISSIONS (2025)</span>
            </div>
          </div>

          {/* Quick Navigation Links */}
          <div className="lg:col-span-2 space-y-4 font-mono text-xs">
            <span className="text-[#999194] uppercase tracking-widest block font-medium">INDEX</span>
            <ul className="space-y-2.5 text-[#F5F2F0]/80">
              <li>
                <Link href="#work" className="hover:text-accent transition-colors flex items-center space-x-1 group">
                  <span>01. Selected Works</span>
                </Link>
              </li>
              <li>
                <Link href="#about" className="hover:text-accent transition-colors flex items-center space-x-1 group">
                  <span>02. Biography</span>
                </Link>
              </li>
              <li>
                <Link href="#services" className="hover:text-accent transition-colors flex items-center space-x-1 group">
                  <span>03. Disciplines</span>
                </Link>
              </li>
              <li>
                <Link href="#experience" className="hover:text-accent transition-colors flex items-center space-x-1 group">
                  <span>04. Experience</span>
                </Link>
              </li>
              <li>
                <Link href="#contact" className="hover:text-accent transition-colors flex items-center space-x-1 group">
                  <span>05. Contact Brief</span>
                </Link>
              </li>
            </ul>
          </div>

          {/* Creative Disciplines Column */}
          <div className="lg:col-span-3 space-y-4 font-mono text-xs">
            <span className="text-[#999194] uppercase tracking-widest block font-medium">CORE DISCIPLINES</span>
            <ul className="space-y-2 text-[#999194]">
              <li>Cinematography & Directing</li>
              <li>DaVinci Resolve Color Grading</li>
              <li>Portrait & Film Photography</li>
              <li>Swiss Editorial Graphic Design</li>
              <li>AI Film Production & Neural Pipelines</li>
              <li>Commercial Brand Advertising</li>
            </ul>
          </div>

          {/* Direct Dispatch & Verified Social */}
          <div className="lg:col-span-2 space-y-6 font-mono text-xs">
            <div className="space-y-2">
              <span className="text-[#999194] uppercase tracking-widest block font-medium">DIRECT DISPATCH</span>
              <a
                href={`mailto:${siteConfig.contact.email}`}
                className="text-[#F5F2F0] hover:text-accent transition-colors flex items-center space-x-1.5 break-all"
              >
                <Mail className="w-3.5 h-3.5 text-accent shrink-0" />
                <span className="text-xs">{siteConfig.contact.email}</span>
              </a>
              <div className="flex items-center space-x-1.5 text-[#999194] pt-1">
                <MapPin className="w-3.5 h-3.5 shrink-0" />
                <span>{siteConfig.location}</span>
              </div>
            </div>

            <div className="space-y-2 pt-2 border-t border-[#33292C]">
              <span className="text-[#999194] uppercase tracking-widest block font-medium">PRIMARY FEED</span>
              {primaryInstagram && (
                <a
                  href={primaryInstagram.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center space-x-2 text-[#F5F2F0] hover:text-accent transition-colors group"
                >
                  <Instagram className="w-4 h-4 text-accent" />
                  <span className="font-semibold">{primaryInstagram.handle}</span>
                  <ArrowUpRight className="w-3 h-3 text-[#999194] group-hover:text-accent group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all" />
                </a>
              )}
            </div>
          </div>
        </div>

        {/* Oversized Architectural Brand Typography Mark */}
        <div className="pt-16 pb-8 flex flex-col items-center justify-center select-none overflow-hidden">
          <div className="w-full text-center">
            <h1 className="font-heading font-black text-[14vw] leading-none tracking-tighter text-[#F5F2F0]/[0.05] hover:text-accent/[0.12] transition-colors duration-700 uppercase">
              ANJALSH®️
            </h1>
          </div>
        </div>

        {/* Bottom Legal & Back to Top Bar */}
        <div className="flex flex-col sm:flex-row items-center justify-between pt-8 border-t border-[#33292C] text-[11px] font-mono text-[#999194]">
          <p>© {new Date().getFullYear()} ANJALSH®️ (Anjalsh V.S.). All Rights Reserved.</p>
          <div className="flex items-center space-x-6 mt-4 sm:mt-0">
            <span className="tracking-widest uppercase text-[#999194]">
              SHAPING VISUAL STORIES.
            </span>
            <button
              onClick={scrollToTop}
              className="inline-flex items-center space-x-2 text-[#999194] hover:text-accent transition-colors group"
              aria-label="Back to top"
            >
              <span>TOP</span>
              <span className="p-1.5 rounded-full border border-[#33292C] group-hover:border-accent group-hover:bg-accent/10 transition-colors">
                <ArrowUp className="w-3 h-3 group-hover:-translate-y-0.5 transition-transform" />
              </span>
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
}
