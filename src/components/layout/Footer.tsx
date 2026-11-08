"use client";

import Link from "next/link";
import { siteConfig } from "@/data/siteConfig";
import { ArrowUp, ArrowUpRight, Instagram, Linkedin, Youtube, Film } from "lucide-react";

export default function Footer() {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <footer className="relative bg-[#050505] border-t border-white/[0.08] pt-20 pb-12 overflow-hidden">
      {/* Background ambient glow */}
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[800px] h-[350px] bg-accent/5 rounded-full blur-[140px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12 relative z-10">
        {/* Top Call to Action in Footer */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 pb-16 border-b border-white/[0.08]">
          <div className="lg:col-span-7 space-y-6">
            <span className="text-xs font-mono tracking-widest text-accent uppercase">
              NEXT STEP
            </span>
            <h2 className="font-heading text-4xl sm:text-6xl md:text-7xl font-bold tracking-tight text-white leading-[0.95]">
              HAVE A VISION IN MIND? <br />
              <span className="text-zinc-500 hover:text-white transition-colors duration-300">
                LET&apos;S SHAPE IT.
              </span>
            </h2>
            <p className="text-zinc-400 text-sm sm:text-base max-w-xl font-light">
              Available for directorial commissions, commercial campaigns, DaVinci Resolve color grading, and creative multimedia projects worldwide.
            </p>
          </div>

          <div className="lg:col-span-5 flex flex-col justify-between items-start lg:items-end space-y-8">
            <Link
              href="#contact"
              className="inline-flex items-center space-x-3 px-8 py-4 rounded-full bg-accent text-black font-semibold text-sm tracking-wider hover:bg-accent-hover transition-all duration-300 shadow-[0_0_30px_rgba(229,169,60,0.25)]"
            >
              <span>INITIATE COLLABORATION</span>
              <ArrowUpRight className="w-4 h-4" />
            </Link>

            <div className="space-y-1 text-left lg:text-right font-mono text-xs text-zinc-400">
              <p className="text-zinc-500 uppercase tracking-widest">DIRECT DISPATCH</p>
              <a
                href={`mailto:${siteConfig.contact.email}`}
                className="text-white hover:text-accent transition-colors block text-sm"
              >
                {siteConfig.contact.email}
              </a>
              <p className="text-zinc-500">{siteConfig.location}</p>
            </div>
          </div>
        </div>

        {/* Middle Navigation & Social Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 py-12 border-b border-white/[0.08] text-xs font-mono">
          <div>
            <span className="text-zinc-500 uppercase tracking-widest block mb-4">EXPLORE</span>
            <ul className="space-y-2.5 text-zinc-300">
              <li>
                <Link href="#work" className="hover:text-accent transition-colors">
                  Selected Work
                </Link>
              </li>
              <li>
                <Link href="#about" className="hover:text-accent transition-colors">
                  Biography & Skills
                </Link>
              </li>
              <li>
                <Link href="#services" className="hover:text-accent transition-colors">
                  Disciplines & Services
                </Link>
              </li>
              <li>
                <Link href="#experience" className="hover:text-accent transition-colors">
                  Experience Timeline
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <span className="text-zinc-500 uppercase tracking-widest block mb-4">VERIFIED SOCIAL</span>
            <ul className="space-y-2.5 text-zinc-300">
              <li>
                <a
                  href="https://www.instagram.com/anjalsh_/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-accent transition-colors inline-flex items-center space-x-1.5"
                >
                  <Instagram className="w-3.5 h-3.5 text-accent" />
                  <span>Instagram</span>
                  <ArrowUpRight className="w-3 h-3 text-zinc-600" />
                </a>
              </li>
              {siteConfig.socialLinks
                .filter((s) => s.platform !== "Instagram")
                .map((social) => (
                  <li key={social.platform}>
                    <a
                      href={social.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="hover:text-accent transition-colors inline-flex items-center space-x-1.5"
                    >
                      <span>{social.platform}</span>
                      <ArrowUpRight className="w-3 h-3 text-zinc-600" />
                    </a>
                  </li>
                ))}
            </ul>
          </div>

          <div>
            <span className="text-zinc-500 uppercase tracking-widest block mb-4">VERIFIED ROLES</span>
            <ul className="space-y-2.5 text-zinc-400">
              <li>7 Clouds Ads & Studios</li>
              <li>Kalamrith Ayurveda</li>
              <li>Freelance Creative Practice</li>
              <li>DaVinci Resolve Colourist</li>
            </ul>
          </div>

          <div className="flex flex-col justify-between items-start md:items-end">
            <div>
              <span className="text-zinc-500 uppercase tracking-widest block mb-4">SYSTEM</span>
              <p className="text-zinc-400">
                Designed with Swiss editorial typography & cinema aesthetics.
              </p>
            </div>
            <button
              onClick={scrollToTop}
              className="mt-6 inline-flex items-center space-x-2 text-zinc-400 hover:text-white group transition-colors"
            >
              <span>BACK TO TOP</span>
              <span className="p-2 rounded-full border border-white/10 group-hover:border-accent transition-colors">
                <ArrowUp className="w-3.5 h-3.5 group-hover:-translate-y-0.5 transition-transform" />
              </span>
            </button>
          </div>
        </div>

        {/* Oversized Brand Typography Mark */}
        <div className="pt-12 pb-6 flex flex-col items-center justify-center">
          <div className="w-full text-center">
            <h1 className="font-heading font-black text-[13vw] leading-none tracking-tighter text-white/[0.07] select-none uppercase hover:text-white/[0.12] transition-colors duration-700">
              ANJALSH®️
            </h1>
          </div>
        </div>

        {/* Bottom Legal bar */}
        <div className="flex flex-col sm:flex-row items-center justify-between pt-6 border-t border-white/[0.04] text-[11px] font-mono text-zinc-500">
          <p>© {new Date().getFullYear()} ANJALSH®️ (Anjalsh V.S.). All Rights Reserved.</p>
          <p className="mt-2 sm:mt-0 tracking-widest">
            {siteConfig.tagline}
          </p>
        </div>
      </div>
    </footer>
  );
}
