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
    <footer className="relative bg-[#0A0D12] border-t border-[#222C3D] pt-20 pb-12 overflow-hidden text-[#F8FAFC]">
      {/* Background subtle radial ambient highlight with signature blue */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[900px] h-[300px] bg-accent/[0.05] rounded-full blur-[160px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12 relative z-10">
        {/* Main Editorial Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-12 pb-16 border-b border-[#222C3D]">
          {/* Brand & Manifesto Column */}
          <div className="lg:col-span-5 space-y-6">
            <div className="space-y-2">
              <span className="font-heading text-2xl font-bold tracking-tight text-white block">
                ANJALSH<sup className="text-xs font-mono text-accent ml-0.5">®️</sup>
              </span>
              <span className="text-xs font-mono uppercase tracking-widest text-[#94A3B8] block">
                {siteConfig.title} &bull; {siteConfig.tagline}
              </span>
            </div>

            <p className="text-[#94A3B8] text-sm font-light leading-relaxed max-w-md">
              Shaping visual stories through cinematic direction, raw analog optics, disciplined Swiss editorial design, and modern neural filmmaking pipelines.
            </p>

            <div className="pt-2 flex items-center space-x-3 text-xs font-mono text-[#94A3B8]">
              <span className="w-2 h-2 rounded-full bg-accent animate-pulse" />
              <span className="text-[#F8FAFC]">AVAILABLE FOR DIRECTORIAL & FREELANCE COMMISSIONS</span>
            </div>
          </div>

          {/* Quick Navigation Links */}
          <div className="lg:col-span-2 space-y-4 font-mono text-xs">
            <span className="text-[#94A3B8] uppercase tracking-widest block font-medium">INDEX</span>
            <ul className="space-y-2.5 text-[#F8FAFC]/80">
              <li>
                <Link href="/#work" className="hover:text-accent transition-colors flex items-center space-x-1 group">
                  <span>01. Selected Works</span>
                </Link>
              </li>
              <li>
                <Link href="/#about" className="hover:text-accent transition-colors flex items-center space-x-1 group">
                  <span>02. Biography</span>
                </Link>
              </li>
              <li>
                <Link href="/#services" className="hover:text-accent transition-colors flex items-center space-x-1 group">
                  <span>03. Disciplines</span>
                </Link>
              </li>
              <li>
                <Link href="/#experience" className="hover:text-accent transition-colors flex items-center space-x-1 group">
                  <span>04. Experience</span>
                </Link>
              </li>
              <li>
                <Link href="/#contact" className="hover:text-accent transition-colors flex items-center space-x-1 group">
                  <span>05. Contact Brief</span>
                </Link>
              </li>
            </ul>
          </div>

          {/* Creative Disciplines Column */}
          <div className="lg:col-span-3 space-y-4 font-mono text-xs">
            <span className="text-[#94A3B8] uppercase tracking-widest block font-medium">CORE DISCIPLINES</span>
            <ul className="space-y-2 text-[#94A3B8]">
              <li>01 — Film & Production</li>
              <li>02 — Post Production & Colour</li>
              <li>03 — Design & Branding</li>
              <li>04 — AI Visual Production</li>
              <li>Commercial Advertising & Direction</li>
            </ul>
          </div>

          {/* Direct Dispatch & Verified Social */}
          <div className="lg:col-span-2 space-y-6 font-mono text-xs">
            <div className="space-y-2">
              <span className="text-[#94A3B8] uppercase tracking-widest block font-medium">DIRECT DISPATCH</span>
              <a
                href={`mailto:${siteConfig.contact.email}`}
                className="text-[#F8FAFC] hover:text-accent transition-colors flex items-center space-x-1.5 break-all"
              >
                <Mail className="w-3.5 h-3.5 text-accent shrink-0" />
                <span className="text-xs">{siteConfig.contact.email}</span>
              </a>
              <div className="flex items-center space-x-1.5 text-[#94A3B8] pt-1">
                <MapPin className="w-3.5 h-3.5 shrink-0" />
                <span>{siteConfig.location}</span>
              </div>
            </div>

            <div className="space-y-2">
              <span className="text-[#94A3B8] uppercase tracking-widest block font-medium">INSTAGRAM</span>
              {primaryInstagram && (
                <a
                  href={primaryInstagram.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-white hover:text-accent transition-colors inline-flex items-center space-x-1"
                >
                  <Instagram className="w-3.5 h-3.5 mr-1" />
                  <span>{primaryInstagram.handle}</span>
                  <ArrowUpRight className="w-3 h-3 text-[#94A3B8]" />
                </a>
              )}
            </div>
          </div>
        </div>

        {/* Bottom Bar: Copyright, Time, Back to Top */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs font-mono text-[#94A3B8]">
          <div className="flex items-center space-x-4">
            <span>&copy; {new Date().getFullYear()} ANJALSH V.S. ALL RIGHTS RESERVED.</span>
            <span className="text-[#222C3D]">•</span>
            <span className="text-zinc-500">AUTHENTIC MULTIMEDIA PORTFOLIO</span>
          </div>

          <div className="flex items-center space-x-6">
            <button
              onClick={scrollToTop}
              className="flex items-center space-x-1.5 text-zinc-400 hover:text-accent transition-colors"
            >
              <span>BACK TO TOP</span>
              <ArrowUp className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
}
