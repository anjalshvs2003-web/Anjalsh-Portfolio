"use client";

import Image from "next/image";
import { siteConfig } from "@/data/siteConfig";
import SectionHeader from "@/components/ui/SectionHeader";
import { ArrowUpRight, Instagram } from "lucide-react";

export default function SocialSection() {
  const primaryInstagram = siteConfig.socialLinks.find((s) => s.platform === "Instagram");
  const otherSocials = siteConfig.socialLinks.filter((s) => s.platform !== "Instagram");

  return (
    <section className="relative py-28 sm:py-36 px-6 sm:px-8 lg:px-12 bg-[#080808] border-t border-white/[0.06] overflow-hidden">
      <div className="max-w-7xl mx-auto">
        <SectionHeader
          number="05"
          tag="CONNECTED CHANNELS"
          title="FOLLOW THE VISUAL FEED"
          description="Behind-the-scenes photography, camera rig configurations, DaVinci Resolve color grading breakdowns, and live creative updates."
        />

        {/* Featured Instagram Spotlight Card */}
        {primaryInstagram && (
          <div className="relative rounded-2xl bg-[#111111] border border-white/10 p-8 sm:p-12 mb-12 shadow-2xl overflow-hidden hover:border-accent/40 transition-colors duration-500">
            {/* Ambient background glow */}
            <div className="absolute top-0 right-0 w-96 h-96 bg-accent/[0.05] rounded-full blur-[120px] pointer-events-none" />

            <div className="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
              <div className="lg:col-span-7 space-y-4">
                <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-accent/10 border border-accent/25 text-accent text-xs font-mono">
                  <Instagram className="w-3.5 h-3.5" />
                  <span>PRIMARY VISUAL LOG</span>
                </div>

                <h3 className="font-heading text-3xl sm:text-5xl font-bold tracking-tight text-white">
                  {primaryInstagram.handle}
                </h3>

                <p className="text-zinc-400 text-sm sm:text-base font-light max-w-lg leading-relaxed">
                  Real-time visual experiments, cinematic frame grabs, DaVinci Resolve timelines, and behind-the-scenes moments from recent studio shoots.
                </p>

                <div className="pt-2">
                  <a
                    href={primaryInstagram.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center space-x-2 px-6 py-3 rounded-full bg-accent text-black font-semibold text-xs font-mono tracking-wider hover:bg-white transition-all duration-300 shadow-[0_0_25px_rgba(212,255,0,0.25)]"
                  >
                    <span>VISIT INSTAGRAM PROFILE</span>
                    <ArrowUpRight className="w-4 h-4" />
                  </a>
                </div>
              </div>

              {/* Instagram Visual Stills Showcase featuring authentic user assets */}
              <div className="lg:col-span-5 grid grid-cols-2 gap-3">
                <div className="relative aspect-square rounded-xl overflow-hidden border border-white/10 bg-[#080808] group">
                  <Image
                    src="/assets/profile/anjalsh.jpg"
                    alt="Anjalsh V.S. — Creative Multimedia Professional"
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-500"
                    sizes="250px"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                  <span className="absolute bottom-2 left-2 text-[10px] font-mono text-zinc-300 bg-black/60 px-2 py-0.5 rounded backdrop-blur-sm">
                    PORTRAIT
                  </span>
                </div>
                <div className="relative aspect-square rounded-xl overflow-hidden border border-white/10 bg-[#080808] group">
                  <Image
                    src="/images/photography/im-vijayan-cover.jpg"
                    alt="I.M. Vijayan Documentary Still by Anjalsh"
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-500"
                    sizes="250px"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                  <span className="absolute bottom-2 left-2 text-[10px] font-mono text-zinc-300 bg-black/60 px-2 py-0.5 rounded backdrop-blur-sm">
                    STILL / SHOOT
                  </span>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Other Editable Social Links Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {otherSocials.map((social) => (
            <a
              key={social.platform}
              href={social.url}
              target="_blank"
              rel="noopener noreferrer"
              className="p-6 rounded-xl bg-[#111111] border border-white/[0.08] hover:border-accent/40 transition-all duration-300 group flex flex-col justify-between h-36"
            >
              <div className="flex items-center justify-between">
                <span className="text-xs font-mono uppercase text-zinc-400 group-hover:text-accent transition-colors">
                  {social.platform}
                </span>
                <ArrowUpRight className="w-4 h-4 text-zinc-500 group-hover:text-accent group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all" />
              </div>

              <div>
                <span className="font-heading text-lg font-bold text-white group-hover:text-accent transition-colors block">
                  {social.handle}
                </span>
                <span className="text-[11px] font-mono text-zinc-500 block mt-1">
                  Connect on {social.platform}
                </span>
              </div>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}
