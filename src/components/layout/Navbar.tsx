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
  const [activeSection, setActiveSection] = useState("home");
  const [scrollProgress, setScrollProgress] = useState(0);
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

  // Track scroll position & active section
  useEffect(() => {
    const handleScroll = () => {
      const totalHeight = document.documentElement.scrollHeight - window.innerHeight;
      const progress = totalHeight > 0 ? (window.scrollY / totalHeight) * 100 : 0;
      setScrollProgress(progress);

      setScrolled(window.scrollY > 30);

      // Section spy
      const sections = ["home", "work", "about", "services", "experience", "contact"];
      const scrollPos = window.scrollY + 200;

      for (const section of sections) {
        const el = document.getElementById(section);
        if (el) {
          const top = el.offsetTop;
          const height = el.offsetHeight;
          if (scrollPos >= top && scrollPos < top + height) {
            setActiveSection(section);
            break;
          }
        }
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navLinks = [
    { label: "HOME", href: "#home", id: "home" },
    { label: "WORKS", href: "#work", id: "work" },
    { label: "ABOUT", href: "#about", id: "about" },
    { label: "SERVICES", href: "#services", id: "services" },
    { label: "CONTACT", href: "#contact", id: "contact" },
  ];

  return (
    <>
      {/* Scroll Progress Reading Line */}
      <div className="fixed top-0 left-0 w-full h-[2px] z-[60] bg-transparent">
        <div
          className="h-full bg-accent transition-all duration-150 ease-out shadow-[0_0_10px_rgba(240,120,61,0.7)]"
          style={{ width: `${scrollProgress}%` }}
        />
      </div>

      <header
        className={`fixed top-0 left-0 w-full z-50 transition-all duration-500 ${
          scrolled
            ? "bg-[#100D0F]/90 backdrop-blur-xl border-b border-[#33292C] py-3.5"
            : "bg-transparent py-6"
        }`}
      >
        <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12 flex items-center justify-between">
          {/* Brand Identity on Left */}
          <Link href="/" className="group flex items-center space-x-3">
            <div className="flex flex-col">
              <span className="font-heading font-black text-lg md:text-xl tracking-tight text-white group-hover:text-accent transition-colors duration-300">
                ANJALSH<span className="text-accent text-sm ml-0.5">®️</span>
              </span>
              <span className="text-[9px] font-mono tracking-ultra text-muted uppercase -mt-0.5 hidden sm:block">
                {siteConfig.profession}
              </span>
            </div>
          </Link>

          {/* Minimal Center Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-7 text-xs font-mono tracking-widest text-muted">
            {navLinks.map((link) => {
              const isActive = activeSection === link.id;
              return (
                <Link
                  key={link.label}
                  href={link.href}
                  className={`relative py-1 transition-colors duration-200 group flex items-center space-x-1.5 ${
                    isActive ? "text-white font-medium" : "hover:text-white"
                  }`}
                >
                  {isActive && (
                    <span className="w-1.5 h-1.5 rounded-full bg-accent animate-pulse" />
                  )}
                  <span>{link.label}</span>
                  <span
                    className={`absolute bottom-0 left-0 h-[1px] bg-accent transition-all duration-300 ${
                      isActive ? "w-full" : "w-0 group-hover:w-full"
                    }`}
                  />
                </Link>
              );
            })}
          </nav>

          {/* Right Controls: IST Time, Audio, CTA */}
          <div className="flex items-center space-x-4 sm:space-x-6">
            {/* Live IST Time */}
            <div className="hidden xl:flex items-center space-x-2 text-[10px] font-mono text-zinc-500">
              <span className="inline-block w-1.5 h-1.5 rounded-full bg-accent animate-pulse" />
              <span>KERALA, IN</span>
              <span className="text-zinc-700">/</span>
              <span className="text-zinc-300">{localTime} IST</span>
            </div>

            {/* Custom Sound Controller */}
            <AudioController />

            {/* Contact CTA */}
            <Link
              href="#contact"
              className="hidden sm:inline-flex items-center space-x-2 px-4 py-2 rounded-full border border-white/20 text-xs font-mono tracking-wider text-white hover:border-accent hover:text-accent hover:bg-accent/10 transition-all duration-300"
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
    </>
  );
}
