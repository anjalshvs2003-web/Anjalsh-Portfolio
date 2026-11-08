import { Metadata } from "next";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import Services from "@/components/sections/Services";

export const metadata: Metadata = {
  title: "Services & Disciplines — ANJALSH®️",
  description: "Comprehensive creative disciplines: Cinematography, DaVinci Resolve Colour Grading, Video Editing, AI Film Production, Motion Graphics, and Commercial Advertising.",
};

export default function ServicesPage() {
  return (
    <div className="bg-[#0a0a0a] min-h-screen text-white pt-16">
      <Navbar />
      <Services />
      <Footer />
    </div>
  );
}
