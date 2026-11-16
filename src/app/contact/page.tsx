import { Metadata } from "next";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import ContactSection from "@/components/sections/ContactSection";

export const metadata: Metadata = {
  title: "Contact Anjalsh V.S. — Initiate Collaboration",
  description: "Initiate a commercial campaign, directorial commission, or DaVinci Resolve color grading inquiry with Anjalsh V.S.",
};

export default function ContactPage() {
  return (
    <div className="bg-[#0A0D12] min-h-screen text-[#F8FAFC] pt-16">
      <Navbar />
      <ContactSection />
      <Footer />
    </div>
  );
}
