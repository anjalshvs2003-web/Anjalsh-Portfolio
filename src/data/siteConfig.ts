import { ExperienceItem, ServiceItem, SocialLink } from "@/types";

export const siteConfig = {
  name: "ANJALSH®️",
  author: "Anjalsh V.S.",
  title: "Anjalsh V.S. — Filmmaker & Visual Artist",
  tagline: "I CREATE VISUALS THAT TELL STORIES.",
  profession: "Filmmaker & Visual Artist",
  location: "Kerala, India",
  profileImage: "/images/photography/anjalsh-portrait.jpg",
  timezone: "Asia/Kolkata",
  availabilityStatus: "Available for Select Commissions & Directorial Work",
  bio: {
    hero: "Filmmaker & Visual Artist based in Kerala, India. Crafting cinematic visual narratives with intentional light sculpting, editorial precision, and evocative atmosphere.",
    positioning: "An independent creative professional working across filmmaking, cinematography, photography, graphic design, motion graphics and emerging visual technologies.",
    full: "Rooted in high-end cinematography, post-production and contemporary digital direction, Anjalsh fuses disciplined visual craft with emerging storytelling tools. From commercial campaigns and brand films to documentary photography and experimental AI cinema, every frame is treated as an intentional emotional dialogue between light, movement, and human resonance.",
    mission: "Rejecting generic visual noise in pursuit of enduring atmospheres, meticulous colour grading, and evocative audiovisual compositions.",
  },
  creativeArsenal: {
    cameras: ["Blackmagic Cinema 6K / RAW", "Sony FX Cinema Line (FX3 / FX6)", "Arri / RED RAW Workflows"],
    editingAndColor: ["DaVinci Resolve Studio (ACEScc)", "Adobe Premiere Pro", "Final Cut Pro"],
    motionAnd3D: ["After Effects", "Cinema 4D", "Blender"],
    designAndArtDirection: ["Adobe Photoshop", "Adobe Illustrator", "Figma", "Editorial Typography"],
    aiAndModernPipelines: ["Runway Gen-3", "Midjourney v6", "ComfyUI", "Magnific AI"],
    audio: ["Sound Design", "Audio Mastering", "Spatial Mix Balancing"],
  },
  socialLinks: [
    {
      platform: "Instagram",
      label: "Instagram",
      url: "https://www.instagram.com/anjalsh_/",
      handle: "@anjalsh_",
      featured: true,
    },
    {
      platform: "LinkedIn",
      label: "LinkedIn",
      url: "https://www.linkedin.com/in/anjalsh",
      handle: "Anjalsh V.S.",
      featured: true,
    },
    {
      platform: "YouTube",
      label: "YouTube",
      url: "https://www.youtube.com/@anjalsh",
      handle: "@anjalsh",
      featured: true,
    },
    {
      platform: "Vimeo",
      label: "Vimeo",
      url: "https://vimeo.com/anjalsh",
      handle: "anjalsh",
      featured: true,
    },
    {
      platform: "Behance",
      label: "Behance",
      url: "https://www.behance.net/anjalsh",
      handle: "anjalsh",
      featured: false,
    },
    {
      platform: "Facebook",
      label: "Facebook",
      url: "https://www.facebook.com/anjalsh",
      handle: "anjalsh",
      featured: false,
    },
  ] as SocialLink[],

  experiences: [
    {
      period: "December 2024 – Present",
      role: "Motion Graphic Designer & Video Editor",
      company: "7 Clouds Ads & Studios",
      location: "Kerala, India",
      isCurrent: true,
      description: "Spearheading cinematic commercial productions, high-impact brand campaigns, narrative video editing, motion design, and digital visual identity for commercial studio clients.",
      highlights: [
        "Directing commercial video shoots and managing end-to-end cinematography.",
        "Precision colour grading and high-end post-production mastering in DaVinci Resolve.",
        "Developing multi-platform visual advertising concepts and creative direction.",
      ],
    },
    {
      period: "May 2024 – November 2024",
      role: "Creative Media & Visual Content Lead",
      company: "Kalamrith Ayurveda",
      location: "Kerala, India",
      isCurrent: false,
      description: "Led comprehensive brand imagery, promotional videography, packaging and digital marketing aesthetics for authentic Ayurvedic wellness campaigns.",
      highlights: [
        "Crafted serene, nature-integrated visual narratives highlighting traditional wellness.",
        "Produced digital video commercials, product photography, and social visual architecture.",
        "Strengthened organic brand engagement through high-fidelity visual storytelling.",
      ],
    },
    {
      period: "2020 – Present",
      role: "Freelance Creative Professional & Visual Artist",
      company: "Independent Practice",
      location: "Kerala, India / Remote",
      isCurrent: true,
      description: "Partnering with visionary brands, directors, artists, and independent agencies worldwide across cinematography, editorial photography, music visuals, and AI-assisted filmmaking.",
      highlights: [
        "Over four years of multidisciplinary commissions spanning filmmaking, photography, and design.",
        "Pioneering early adoption of AI video pipelines blended with authentic live-action footage.",
        "Delivered international-standard photography collections, editorial layouts, and brand films.",
      ],
    },
  ] as ExperienceItem[],

  // 4 Primary Service Groups per Master Direction:
  // 01 — FILM & PRODUCTION
  // 02 — POST PRODUCTION
  // 03 — DESIGN & BRANDING
  // 04 — AI VISUAL PRODUCTION
  services: [
    {
      id: "film-production",
      number: "01",
      title: "FILM & PRODUCTION",
      shortTag: "Cinematography, Videography & Directing",
      description: "Comprehensive on-set visual leadership from concept and storyboard to principal photography. Expert in camera movement, anamorphic framing (2.39:1), lighting design, and directing actors and talent.",
      deliverables: [
        "Commercial & Narrative Directing",
        "Cinematography & Gaffing / Lighting Design",
        "Sony Cinema Line & Blackmagic RAW Capture",
        "Run-and-Gun Documentary & Event Videography",
        "Creative Treatment, Scripting & Shot Lists",
      ],
      tools: ["Sony FX3 / FX6", "Blackmagic RAW 6K", "Anamorphic Lenses", "Gimbals & Cine Rigs"],
    },
    {
      id: "post-production",
      number: "02",
      title: "POST PRODUCTION",
      shortTag: "Video Editing, Colour Grading & Motion",
      description: "Non-linear narrative pacing, rhythmic audio synchronization, and industry-standard colour timing in DaVinci Resolve Studio. Emulating Kodak/Fuji film stocks with ACEScc precision.",
      deliverables: [
        "Assembly, Rough Cut & Final Master Video Editing",
        "DaVinci Resolve Studio ACEScc Colour Grading",
        "Film Stock Emulation (Kodak 5219 / 2383)",
        "Sound Synchronisation & Foley Sculpting",
        "Kinetic Typography, Animated Logos & Visual Effects",
      ],
      tools: ["DaVinci Resolve Studio", "Adobe Premiere Pro", "After Effects", "Cinema 4D"],
    },
    {
      id: "design-branding",
      number: "03",
      title: "DESIGN & BRANDING",
      shortTag: "Graphic Design, Visual Identity & Art Direction",
      description: "Minimal Swiss-inspired editorial design, bespoke typographic hierarchy, luxury monogram and brand identities, advertising campaign key visuals, and print/packaging architecture.",
      deliverables: [
        "Brand Identity Systems & Visual Guidelines",
        "Swiss Editorial Typography & Layouts",
        "Poster, Lookbook & Key Visual Design",
        "Packaging & Label Design",
        "Vector Iconography & Digital Assets",
      ],
      tools: ["Adobe Illustrator", "Photoshop", "InDesign", "Figma"],
    },
    {
      id: "ai-visual-production",
      number: "04",
      title: "AI VISUAL PRODUCTION",
      shortTag: "AI Filmmaking & Generative Compositing",
      description: "Cutting-edge neural video generation, generative visual concepting, and hybrid live-action/AI compositing. Delivering cinematic world-building with zero compromise on visual fidelity.",
      deliverables: [
        "Original AI Short Films & Neural Video Synthesis",
        "Generative Visual Concepting & Pitch Decks",
        "ComfyUI Custom Workflows & Optical Upscaling",
        "Hybrid Live-Action / AI Compositing",
        "High-Resolution Cinematic Stills & Texture Synthesis",
      ],
      tools: ["Runway Gen-3", "Midjourney v6", "ComfyUI", "Magnific AI"],
    },
  ] as ServiceItem[],

  contact: {
    email: "contact@anjalsh.com",
    phone: "+91 (Kerala, India)",
    note: "Response within 24–48 hours for verified project inquiries.",
  },

  seo: {
    siteUrl: "https://anjalsh-portfolio.vercel.app",
    title: "Anjalsh V.S. — Filmmaker & Visual Artist",
    description: "Explore the creative portfolio of Anjalsh V.S., featuring filmmaking, cinematography, photography, graphic design, motion graphics and AI visual production.",
    keywords: [
      "Anjalsh",
      "Anjalsh V.S.",
      "ANJALSH",
      "Creative Director Kerala",
      "Filmmaker India",
      "Cinematographer",
      "DaVinci Resolve Colourist",
      "Video Editor Kerala",
      "AI Filmmaker",
      "Motion Graphics Designer",
      "Graphic Designer Kerala",
      "7 Clouds Ads & Studios",
      "Kalamrith Ayurveda",
    ],
  },
};
