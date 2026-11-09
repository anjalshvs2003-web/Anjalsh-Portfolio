import { Metadata } from "next";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import ContactSection from "@/components/sections/ContactSection";

export const metadata: Metadata = {
  title: "Contact Anjalsh V.S. — ANJALSH®️",
  description: "Initiate a commercial campaign, directorial commission, or DaVinci Resolve color grading inquiry with Anjalsh V.S.",
};

export default function ContactPage() {
  return (
    <div className="bg-[#080808] min-h-screen text-white pt-16">
      <Navbar />
      <ContactSection />
      <Footer />
    </div>
  );
}
