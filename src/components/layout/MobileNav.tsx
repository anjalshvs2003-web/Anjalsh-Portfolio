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
    { label: "HOME", href: "#home", sub: "3D Space & Overview" },
    { label: "WORKS", href: "#work", sub: "50+ Curated Projects" },
    { label: "ABOUT", href: "#about", sub: "Biography & Arsenal" },
    { label: "SERVICES", href: "#services", sub: "11 Creative Disciplines" },
    { label: "CONTACT", href: "#contact", sub: "Initiate Collaboration" },
  ];

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
          className="fixed inset-0 z-50 bg-[#080808]/98 backdrop-blur-2xl flex flex-col justify-between p-6 sm:p-10 pt-28 md:hidden"
        >
          {/* Close button inside top */}
          <div className="absolute top-6 right-6">
            <button
              onClick={onClose}
              className="p-3 rounded-full bg-white/5 border border-white/10 text-white hover:text-accent hover:border-accent transition-colors"
              aria-label="Close menu"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Navigation Links */}
          <div className="space-y-6 my-auto">
            <div className="text-[10px] font-mono tracking-ultra text-zinc-500 uppercase">
              EXHIBITION INDEX
            </div>
            <nav className="flex flex-col space-y-4">
              {navLinks.map((link, idx) => (
                <motion.div
                  key={link.label}
                  initial={{ opacity: 0, x: -25 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: idx * 0.07, duration: 0.4 }}
                >
                  <Link
                    href={link.href}
                    onClick={onClose}
                    className="group flex items-baseline justify-between py-2.5 border-b border-white/[0.06]"
                  >
                    <div>
                      <span className="font-heading text-2xl sm:text-3xl font-bold tracking-tight text-white group-hover:text-accent transition-colors">
                        {link.label}
                      </span>
                      <span className="block text-[11px] font-mono text-muted mt-0.5">
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
            <div className="flex items-center justify-between text-xs font-mono text-muted">
              <span className="flex items-center space-x-2">
                <span className="w-2 h-2 rounded-full bg-accent animate-pulse" />
                <span className="text-white">{siteConfig.availabilityStatus}</span>
              </span>
            </div>

            <div className="flex items-center space-x-4">
              <a
                href={siteConfig.socialLinks[0].url}
                target="_blank"
                rel="noopener noreferrer"
                className="p-2.5 rounded-full bg-white/5 border border-white/10 text-zinc-300 hover:text-accent hover:border-accent transition-colors"
                aria-label="Instagram profile"
              >
                <Instagram className="w-4 h-4" />
              </a>
              <a
                href={siteConfig.socialLinks[1].url}
                target="_blank"
                rel="noopener noreferrer"
                className="p-2.5 rounded-full bg-white/5 border border-white/10 text-zinc-300 hover:text-accent hover:border-accent transition-colors"
                aria-label="LinkedIn profile"
              >
                <Linkedin className="w-4 h-4" />
              </a>
              <a
                href={siteConfig.socialLinks[2].url}
                target="_blank"
                rel="noopener noreferrer"
                className="p-2.5 rounded-full bg-white/5 border border-white/10 text-zinc-300 hover:text-accent hover:border-accent transition-colors"
                aria-label="YouTube channel"
              >
                <Youtube className="w-4 h-4" />
              </a>
              <span className="text-[11px] font-mono text-zinc-500 ml-auto">
                ANJALSH®️ / 2025
              </span>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
