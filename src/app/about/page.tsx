import { Metadata } from "next";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import AboutSection from "@/components/sections/AboutSection";
import Experience from "@/components/sections/Experience";

export const metadata: Metadata = {
  title: "About Anjalsh V.S. — Creative Director & Filmmaker",
  description: "Biography, creative journey, verified career timeline, and professional skillsets of Anjalsh V.S., Creative Director, Filmmaker & Visual Artist.",
};

export default function AboutPage() {
  return (
    <div className="bg-[#0A0D12] min-h-screen text-[#F8FAFC] pt-16">
      <Navbar />
      <AboutSection />
      <Experience />
      <Footer />
    </div>
  );
}
