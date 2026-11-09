import { Metadata } from "next";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import SelectedWork from "@/components/sections/SelectedWork";

export const metadata: Metadata = {
  title: "Selected Work — ANJALSH®️",
  description: "Curated portfolio gallery of cinematography, video editing, DaVinci Resolve color grading, AI films, and commercial advertising.",
};

export default function WorkPage() {
  return (
    <div className="bg-[#080808] min-h-screen text-white pt-16">
      <Navbar />
      <SelectedWork />
      <Footer />
    </div>
  );
}
