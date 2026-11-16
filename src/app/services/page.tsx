import { Metadata } from "next";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import Services from "@/components/sections/Services";

export const metadata: Metadata = {
  title: "Creative Disciplines & Services — ANJALSH®️",
  description: "Comprehensive creative disciplines: Film & Production, Post Production & Colour Grading, Design & Branding, and AI Visual Production.",
};

export default function ServicesPage() {
  return (
    <div className="bg-[#0A0D12] min-h-screen text-[#F8FAFC] pt-16">
      <Navbar />
      <Services />
      <Footer />
    </div>
  );
}
