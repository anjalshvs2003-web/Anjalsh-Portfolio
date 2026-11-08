"use client";

import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import { siteConfig } from "@/data/siteConfig";
import { ArrowUpRight, X, Instagram, Linkedin, Youtube } from "lucide-react";

interface MobileNavProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function MobileNav({ isOpen, onClose }: MobileNavProps) {
  const navLinks = [
    { label: "SELECTED WORK", href: "#work", sub: "Curated Projects" },
    { label: "ABOUT", href: "#about", sub: "Biography & Journey" },
    { label: "SERVICES", href: "#services", sub: "Creative Disciplines" },
    { label: "EXPERIENCE", href: "#experience", sub: "Career Timeline" },
    { label: "CONTACT", href: "#contact", sub: "Get in Touch" },
  ];

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
          className="fixed inset-0 z-40 bg-[#070707]/98 backdrop-blur-2xl flex flex-col justify-between p-6 sm:p-10 pt-28 md:hidden"
        >
          {/* Close button inside top */}
          <div className="absolute top-6 right-6">
            <button
              onClick={onClose}
              className="p-3 rounded-full bg-white/5 border border-white/10 text-white"
              aria-label="Close menu"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Navigation Links */}
          <div className="space-y-6 my-auto">
            <div className="text-[11px] font-mono tracking-widest text-zinc-500 uppercase">
              INDEX
            </div>
            <nav className="flex flex-col space-y-4">
              {navLinks.map((link, idx) => (
                <motion.div
                  key={link.label}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: idx * 0.08, duration: 0.4 }}
                >
                  <Link
                    href={link.href}
                    onClick={onClose}
                    className="group flex items-baseline justify-between py-2 border-b border-white/[0.06]"
                  >
                    <div>
                      <span className="font-heading text-2xl sm:text-3xl font-bold tracking-tight text-white group-hover:text-accent transition-colors">
                        {link.label}
                      </span>
                      <span className="block text-[11px] font-mono text-zinc-500 mt-0.5">
                        {link.sub}
                      </span>
                    </div>
                    <ArrowUpRight className="w-5 h-5 text-zinc-600 group-hover:text-accent group-hover:translate-x-1 group-hover:-translate-y-1 transition-all" />
                  </Link>
                </motion.div>
              ))}
            </nav>
          </div>

          {/* Bottom Footer Info */}
          <div className="space-y-4 pt-6 border-t border-white/10">
            <div className="flex items-center justify-between text-xs font-mono text-zinc-400">
              <span className="flex items-center space-x-2">
                <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                <span>{siteConfig.availabilityStatus}</span>
              </span>
            </div>

            <div className="flex items-center space-x-4">
              <a
                href={siteConfig.socialLinks[0].url}
                target="_blank"
                rel="noopener noreferrer"
                className="p-2 rounded-full bg-white/5 border border-white/10 text-zinc-300 hover:text-accent"
              >
                <Instagram className="w-4 h-4" />
              </a>
              <a
                href={siteConfig.socialLinks[1].url}
                target="_blank"
                rel="noopener noreferrer"
                className="p-2 rounded-full bg-white/5 border border-white/10 text-zinc-300 hover:text-accent"
              >
                <Linkedin className="w-4 h-4" />
              </a>
              <a
                href={siteConfig.socialLinks[2].url}
                target="_blank"
                rel="noopener noreferrer"
                className="p-2 rounded-full bg-white/5 border border-white/10 text-zinc-300 hover:text-accent"
              >
                <Youtube className="w-4 h-4" />
              </a>
              <span className="text-[11px] font-mono text-zinc-500 ml-auto">
                ANJALSH®️ / 2024
              </span>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
