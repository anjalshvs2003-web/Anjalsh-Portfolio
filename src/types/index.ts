export type ProjectCategory =
  | "All Works"
  | "All"
  | "Photography"
  | "Graphic Design"
  | "Cinematography"
  | "Video Editing"
  | "Motion Graphics"
  | "AI Films"
  | "Commercial Advertising"
  | "Branding";

export interface ProjectMedia {
  type: "image" | "video";
  url: string;
  caption?: string;
  aspectRatio?: "16:9" | "9:16" | "4:5" | "1:1" | "2.39:1" | "3:4" | "21:9";
}

export interface Project {
  id: string;
  slug: string;
  title: string;
  category: ProjectCategory;
  year: string;
  client?: string;
  role: string;
  shortDescription: string;
  fullDescription: string;
  coverImage: string;
  thumbnail?: string;
  videoUrl?: string; // Optional direct video or trailer preview URL
  videoEmbed?: string; // Optional Vimeo/YouTube embed ID or URL
  featured: boolean;
  aspectRatio?: "16:9" | "9:16" | "4:5" | "1:1" | "2.39:1" | "3:4" | "21:9";
  tags: string[];
  gallery: ProjectMedia[];
  credits?: {
    role: string;
    name: string;
  }[];
  technicalDetails?: {
    camera?: string;
    software?: string[];
    colourSpace?: string;
    aspectRatio?: string;
    runtime?: string;
  };
}

export interface ServiceItem {
  id: string;
  number: string;
  title: string;
  shortTag: string;
  description: string;
  deliverables: string[];
  tools: string[];
}

export interface ExperienceItem {
  period: string;
  role: string;
  company: string;
  location: string;
  isCurrent?: boolean;
  description: string;
  highlights: string[];
}

export interface SocialLink {
  platform: string;
  label: string;
  url: string;
  handle: string;
  featured?: boolean;
}
