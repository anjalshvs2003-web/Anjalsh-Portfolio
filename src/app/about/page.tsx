import { Metadata } from "next";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import AboutSection from "@/components/sections/AboutSection";
import Experience from "@/components/sections/Experience";

export const metadata: Metadata = {
  title: "About Anjalsh V.S. — ANJALSH®️",
  description: "Biography, creative journey, verified career timeline, and professional skillsets of Anjalsh V.S., Creative Multimedia Professional.",
};

export default function AboutPage() {
  return (
    <div className="bg-[#100D0F] min-h-screen text-[#F5F2F0] pt-16">
      <Navbar />
      <AboutSection />
      <Experience />
      <Footer />
    </div>
  );
}
