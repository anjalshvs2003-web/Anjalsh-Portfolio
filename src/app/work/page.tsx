import { Metadata } from "next";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import SelectedWork from "@/components/sections/SelectedWork";

export const metadata: Metadata = {
  title: "Complete Exhibition Archive — ANJALSH®️",
  description: "Browse 52+ projects across cinematography, DaVinci Resolve color grading, Swiss editorial design, AI films, and commercial advertising by Anjalsh V.S.",
};

export default function WorkPage() {
  return (
    <div className="bg-[#0A0D12] min-h-screen text-[#F8FAFC] pt-16">
      <Navbar />
      <SelectedWork isFullArchive={true} />
      <Footer />
    </div>
  );
}
