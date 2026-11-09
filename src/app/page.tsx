"use client";

import { useState } from "react";
import Navbar from "@/components/layout/Navbar";
import MobileNav from "@/components/layout/MobileNav";
import Footer from "@/components/layout/Footer";
import Hero from "@/components/sections/Hero";
import ShowreelBanner from "@/components/sections/ShowreelBanner";
import SelectedWork from "@/components/sections/SelectedWork";
import AboutSection from "@/components/sections/AboutSection";
import Services from "@/components/sections/Services";
import Experience from "@/components/sections/Experience";
import SocialSection from "@/components/sections/SocialSection";
import ContactSection from "@/components/sections/ContactSection";

export default function HomePage() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  return (
    <div className="relative bg-[#080808] min-h-screen text-white">
      {/* Navigation */}
      <Navbar
        isMobileMenuOpen={isMobileMenuOpen}
        onOpenMobileMenu={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
      />

      {/* Mobile Drawer */}
      <MobileNav
        isOpen={isMobileMenuOpen}
        onClose={() => setIsMobileMenuOpen(false)}
      />

      <main>
        {/* 1. Hero */}
        <Hero />

        {/* Cinematic Showreel Bar */}
        <ShowreelBanner />

        {/* 3. Selected Work */}
        <SelectedWork />

        {/* 2. About */}
        <AboutSection />

        {/* 4. Services */}
        <Services />

        {/* 5. Experience */}
        <Experience />

        {/* 6. Social Media */}
        <SocialSection />

        {/* 7. Contact */}
        <ContactSection />
      </main>

      {/* Footer */}
      <Footer />
    </div>
  );
}
