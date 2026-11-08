"use client";

import { useState } from "react";
import { siteConfig } from "@/data/siteConfig";
import SectionHeader from "@/components/ui/SectionHeader";
import { Send, CheckCircle2, AlertCircle, Mail, MapPin, Instagram, ArrowUpRight, Loader2 } from "lucide-react";

export default function ContactSection() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    projectType: "Cinematography",
    budget: "$2,000 – $5,000",
    message: "",
  });

  const [status, setStatus] = useState<"idle" | "submitting" | "success" | "unconfigured" | "error">("idle");
  const [responseMessage, setResponseMessage] = useState("");
  const [mailToLink, setMailToLink] = useState("");

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus("submitting");
    setResponseMessage("");

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      const data = await res.json();

      if (res.ok) {
        if (data.configured === false) {
          // Backend is not configured yet - honest transparent notice
          setStatus("unconfigured");
          setResponseMessage(data.message);
          const mailSubject = encodeURIComponent(`[Portfolio Inquiry] ${formData.projectType} - ${formData.name}`);
          const mailBody = encodeURIComponent(
            `Hi Anjalsh,\n\nName: ${formData.name}\nEmail: ${formData.email}\nProject Type: ${formData.projectType}\nBudget/Timeline: ${formData.budget}\n\nMessage:\n${formData.message}`
          );
          setMailToLink(`mailto:${siteConfig.contact.email}?subject=${mailSubject}&body=${mailBody}`);
        } else {
          // Live sent
          setStatus("success");
          setResponseMessage(data.message || "Message successfully sent.");
          setFormData({
            name: "",
            email: "",
            projectType: "Cinematography",
            budget: "$2,000 – $5,000",
            message: "",
          });
        }
      } else {
        setStatus("error");
        setResponseMessage(data.error || "An error occurred while transmitting your request.");
      }
    } catch {
      setStatus("error");
      setResponseMessage("Network error. Please try again or email directly.");
    }
  };

  return (
    <section id="contact" className="relative py-24 sm:py-32 px-6 sm:px-8 lg:px-12 bg-[#09090b] border-t border-white/[0.06]">
      <div className="max-w-7xl mx-auto">
        <SectionHeader
          number="06"
          tag="GET IN TOUCH"
          title="INITIATE A COLLABORATION"
          description="Ready to discuss an upcoming film, commercial campaign, or color grading project? Send a brief message below."
        />

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
          {/* Left Column: Direct Info & Guidelines */}
          <div className="lg:col-span-5 space-y-8">
            <div className="space-y-4">
              <span className="text-xs font-mono tracking-widest text-zinc-500 uppercase">
                INQUIRY GUIDELINES
              </span>
              <h3 className="font-heading text-2xl sm:text-3xl font-bold text-white tracking-tight">
                Let&apos;s build something resonant.
              </h3>
              <p className="text-zinc-400 text-sm font-light leading-relaxed">
                Whether you have a fully formed storyboard, a rough concept deck, or a set of RAW video reels requiring color timing in DaVinci Resolve, Anjalsh collaborates with agencies, production houses, and visionary creators.
              </p>
            </div>

            {/* Quick Contact Cards */}
            <div className="space-y-3 font-mono text-xs">
              <div className="p-4 rounded-xl bg-white/[0.02] border border-white/[0.06] flex items-center space-x-3">
                <Mail className="w-4 h-4 text-accent shrink-0" />
                <div>
                  <span className="text-zinc-500 text-[10px] block">DIRECT EMAIL</span>
                  <a
                    href={`mailto:${siteConfig.contact.email}`}
                    className="text-white hover:text-accent transition-colors"
                  >
                    {siteConfig.contact.email}
                  </a>
                </div>
              </div>

              <div className="p-4 rounded-xl bg-white/[0.02] border border-white/[0.06] flex items-center space-x-3">
                <MapPin className="w-4 h-4 text-accent shrink-0" />
                <div>
                  <span className="text-zinc-500 text-[10px] block">BASE LOCATION</span>
                  <span className="text-zinc-300">{siteConfig.location}</span>
                </div>
              </div>

              <div className="p-4 rounded-xl bg-white/[0.02] border border-white/[0.06] flex items-center space-x-3">
                <Instagram className="w-4 h-4 text-accent shrink-0" />
                <div>
                  <span className="text-zinc-500 text-[10px] block">INSTAGRAM DIRECT MESSAGE</span>
                  <a
                    href="https://www.instagram.com/anjalsh_/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-white hover:text-accent transition-colors flex items-center space-x-1"
                  >
                    <span>@anjalsh_</span>
                    <ArrowUpRight className="w-3 h-3 text-zinc-500" />
                  </a>
                </div>
              </div>
            </div>

            <div className="p-4 rounded-xl bg-white/[0.01] border border-white/[0.04] text-[11px] font-mono text-zinc-500">
              ⚡ {siteConfig.contact.note}
            </div>
          </div>

          {/* Right Column: Functional Contact Form */}
          <div className="lg:col-span-7">
            <div className="p-8 sm:p-10 rounded-2xl bg-[#0c0c0e] border border-white/10 shadow-2xl relative">
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  {/* Name */}
                  <div className="space-y-2">
                    <label htmlFor="name" className="block text-xs font-mono tracking-wider text-zinc-400 uppercase">
                      Your Name *
                    </label>
                    <input
                      type="text"
                      id="name"
                      name="name"
                      required
                      value={formData.name}
                      onChange={handleChange}
                      placeholder="e.g. Elena Rostova"
                      className="w-full px-4 py-3 rounded-lg bg-white/[0.03] border border-white/10 text-white placeholder-zinc-600 focus:outline-none focus:border-accent font-mono text-xs transition-colors"
                    />
                  </div>

                  {/* Email */}
                  <div className="space-y-2">
                    <label htmlFor="email" className="block text-xs font-mono tracking-wider text-zinc-400 uppercase">
                      Email Address *
                    </label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      required
                      value={formData.email}
                      onChange={handleChange}
                      placeholder="e.g. elena@production.com"
                      className="w-full px-4 py-3 rounded-lg bg-white/[0.03] border border-white/10 text-white placeholder-zinc-600 focus:outline-none focus:border-accent font-mono text-xs transition-colors"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  {/* Project Type */}
                  <div className="space-y-2">
                    <label htmlFor="projectType" className="block text-xs font-mono tracking-wider text-zinc-400 uppercase">
                      Project Discipline
                    </label>
                    <select
                      id="projectType"
                      name="projectType"
                      value={formData.projectType}
                      onChange={handleChange}
                      className="w-full px-4 py-3 rounded-lg bg-[#141416] border border-white/10 text-white focus:outline-none focus:border-accent font-mono text-xs transition-colors"
                    >
                      {siteConfig.services.map((s) => (
                        <option key={s.id} value={s.title}>
                          {s.title}
                        </option>
                      ))}
                      <option value="Multiple Disciplines / Full Production">
                        Multiple Disciplines / Full Production
                      </option>
                    </select>
                  </div>

                  {/* Estimated Scope / Budget */}
                  <div className="space-y-2">
                    <label htmlFor="budget" className="block text-xs font-mono tracking-wider text-zinc-400 uppercase">
                      Estimated Scope / Budget
                    </label>
                    <select
                      id="budget"
                      name="budget"
                      value={formData.budget}
                      onChange={handleChange}
                      className="w-full px-4 py-3 rounded-lg bg-[#141416] border border-white/10 text-white focus:outline-none focus:border-accent font-mono text-xs transition-colors"
                    >
                      <option value="Under $2,000">Under $2,000 / &lt; ₹1.5L</option>
                      <option value="$2,000 – $5,000">$2,000 – $5,000 / ₹1.5L – ₹4L</option>
                      <option value="$5,000 – $10,000">$5,000 – $10,000 / ₹4L – ₹8L</option>
                      <option value="$10,000+">$10,000+ / ₹8L+</option>
                      <option value="Custom / Non-commercial Grant">Custom / Grant / Discussion</option>
                    </select>
                  </div>
                </div>

                {/* Message */}
                <div className="space-y-2">
                  <label htmlFor="message" className="block text-xs font-mono tracking-wider text-zinc-400 uppercase">
                    Project Brief & Vision *
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    required
                    rows={4}
                    value={formData.message}
                    onChange={handleChange}
                    placeholder="Describe your project, shooting timeline, camera requirements, or visual goals..."
                    className="w-full px-4 py-3 rounded-lg bg-white/[0.03] border border-white/10 text-white placeholder-zinc-600 focus:outline-none focus:border-accent font-mono text-xs transition-colors resize-none"
                  />
                </div>

                {/* Submit Button */}
                <button
                  type="submit"
                  disabled={status === "submitting"}
                  className="w-full py-4 rounded-xl bg-accent text-black font-semibold text-xs font-mono tracking-widest uppercase hover:bg-accent-hover transition-all duration-300 flex items-center justify-center space-x-2 shadow-lg shadow-accent/20 disabled:opacity-50"
                >
                  {status === "submitting" ? (
                    <>
                      <Loader2 className="w-4 h-4 animate-spin" />
                      <span>DISPATCHING BRIEF...</span>
                    </>
                  ) : (
                    <>
                      <span>TRANSMIT PROJECT BRIEF</span>
                      <Send className="w-4 h-4" />
                    </>
                  )}
                </button>
              </form>

              {/* Status Feedbacks */}
              {status === "success" && (
                <div className="mt-6 p-4 rounded-xl bg-emerald-500/10 border border-emerald-500/30 flex items-start space-x-3 text-emerald-400 text-xs font-mono">
                  <CheckCircle2 className="w-4 h-4 mt-0.5 shrink-0" />
                  <div>
                    <span className="font-semibold block">BRIEF TRANSMITTED</span>
                    <span>{responseMessage}</span>
                  </div>
                </div>
              )}

              {status === "unconfigured" && (
                <div className="mt-6 p-5 rounded-xl bg-amber-500/10 border border-amber-500/30 space-y-3 text-xs font-mono">
                  <div className="flex items-start space-x-2.5 text-amber-400">
                    <AlertCircle className="w-4 h-4 mt-0.5 shrink-0" />
                    <div>
                      <span className="font-semibold block uppercase">BACKEND ENVIRONMENT STATUS</span>
                      <p className="text-zinc-300 mt-1 leading-relaxed">
                        {responseMessage}
                      </p>
                    </div>
                  </div>

                  {mailToLink && (
                    <div className="pt-2">
                      <a
                        href={mailToLink}
                        className="inline-flex items-center space-x-2 px-4 py-2 rounded-lg bg-accent text-black font-semibold hover:bg-accent-hover transition-colors"
                      >
                        <span>SEND DIRECT EMAIL VIA CLIENT</span>
                        <ArrowUpRight className="w-3.5 h-3.5" />
                      </a>
                    </div>
                  )}
                </div>
              )}

              {status === "error" && (
                <div className="mt-6 p-4 rounded-xl bg-rose-500/10 border border-rose-500/30 flex items-start space-x-3 text-rose-400 text-xs font-mono">
                  <AlertCircle className="w-4 h-4 mt-0.5 shrink-0" />
                  <div>
                    <span className="font-semibold block">TRANSMISSION ERROR</span>
                    <span>{responseMessage}</span>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
