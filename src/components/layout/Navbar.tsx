"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { siteConfig } from "@/data/siteConfig";
import AudioController from "@/components/ui/AudioController";
import { ArrowUpRight, Menu, X } from "lucide-react";

interface NavbarProps {
  onOpenMobileMenu?: () => void;
  isMobileMenuOpen?: boolean;
}

export default function Navbar({ onOpenMobileMenu, isMobileMenuOpen }: NavbarProps) {
  const [scrolled, setScrolled] = useState(false);
  const [localTime, setLocalTime] = useState("");

  // Update time indicator
  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      const options: Intl.DateTimeFormatOptions = {
        timeZone: siteConfig.timezone,
        hour: "2-digit",
        minute: "2-digit",
        second: "2-digit",
        hour12: false,
      };
      const formatted = new Intl.DateTimeFormat("en-GB", options).format(now);
      setLocalTime(formatted);
    };

    updateTime();
    const timer = setInterval(updateTime, 1000);
    return () => clearInterval(timer);
  }, []);

  // Track scroll for navigation background opacity
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 40) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navLinks = [
    { label: "WORK", href: "#work" },
    { label: "ABOUT", href: "#about" },
    { label: "SERVICES", href: "#services" },
    { label: "EXPERIENCE", href: "#experience" },
    { label: "CONTACT", href: "#contact" },
  ];

  return (
    <header
      className={`fixed top-0 left-0 w-full z-50 transition-all duration-500 ${
        scrolled
          ? "bg-[#0a0a0a]/85 backdrop-blur-xl border-b border-white/[0.06] py-3.5"
          : "bg-transparent py-6"
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12 flex items-center justify-between">
        {/* Brand identity */}
        <Link href="/" className="group flex items-center space-x-3">
          <div className="flex flex-col">
            <span className="font-heading font-bold text-lg md:text-xl tracking-tight text-white group-hover:text-accent transition-colors duration-300">
              ANJALSH<span className="text-accent text-sm ml-0.5">®️</span>
            </span>
            <span className="text-[9px] font-mono tracking-widest text-zinc-500 uppercase -mt-0.5 hidden sm:block">
              {siteConfig.profession}
            </span>
          </div>
        </Link>

        {/* Center Desktop Navigation */}
        <nav className="hidden md:flex items-center space-x-8 text-xs font-mono tracking-widest text-zinc-400">
          {navLinks.map((link) => (
            <Link
              key={link.label}
              href={link.href}
              className="relative py-1 hover:text-white transition-colors duration-200 group"
            >
              <span>{link.label}</span>
              <span className="absolute bottom-0 left-0 w-0 h-[1px] bg-accent transition-all duration-300 group-hover:w-full" />
            </Link>
          ))}
        </nav>

        {/* Right side info, sound, CTA */}
        <div className="flex items-center space-x-5 lg:space-x-8">
          {/* Live Location & IST Time Clock */}
          <div className="hidden xl:flex items-center space-x-2 text-[10px] font-mono text-zinc-500">
            <span className="inline-block w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
            <span>KERALA, IN</span>
            <span className="text-zinc-600">/</span>
            <span className="text-zinc-300">{localTime} IST</span>
          </div>

          {/* Sound Toggle */}
          <AudioController />

          {/* Contact Direct CTA Button */}
          <Link
            href="#contact"
            className="hidden sm:inline-flex items-center space-x-2 px-4 py-2 rounded-full border border-white/20 text-xs font-mono tracking-wider text-white hover:border-accent hover:text-accent hover:bg-accent/5 transition-all duration-300"
          >
            <span>START A PROJECT</span>
            <ArrowUpRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
          </Link>

          {/* Mobile Menu Button */}
          <button
            onClick={onOpenMobileMenu}
            aria-label={isMobileMenuOpen ? "Close menu" : "Open navigation menu"}
            className="md:hidden p-2 text-zinc-300 hover:text-white focus:outline-none"
          >
            {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>
    </header>
  );
}
