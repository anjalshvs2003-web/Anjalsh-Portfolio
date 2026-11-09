# ANJALSH®️ Media Asset Directory & Content Guide

This document explains the organization of media assets across the **ANJALSH®️** portfolio and provides clear, step-by-step instructions for adding new creative works (photography, graphic design, cinematography, AI films, and commercials).

---

## 1. Directory Structure

Media files are located under `/public/`:

```
public/
├── assets/
│   ├── audio/
│   │   └── ambient.mp3          <- Background audio track (toggled via sound controller in Navbar)
│   └── profile/
│       └── anjalsh.jpg          <- Anjalsh's authentic portrait photo
├── images/
│   ├── photography/             <- Stills, portraiture, editorial photography
│   │   ├── anjalsh-portrait.jpg
│   │   ├── im-vijayan-cover.jpg
│   │   ├── im-vijayan-01.jpg
│   │   ├── im-vijayan-02.jpg
│   │   ├── editorial-portrait-cover.jpg
│   │   ├── editorial-portrait-02.jpg
│   │   └── editorial-portrait-03.jpg
│   ├── graphic-design/          <- Client campaign posters, social media creatives, identity
│   │   ├── luxe-gold-01.jpg ... luxe-gold-04.jpg
│   │   ├── eid-poster.jpg
│   │   ├── alzheimers-day.jpg
│   │   ├── ethnic-post.jpg
│   │   ├── onam-visual.jpg
│   │   ├── janat-campaign.jpg
│   │   └── my-radio.jpg
│   ├── cinematography/          <- High-resolution frame grabs from commercial and film shoots
│   ├── motion-graphics/         <- Motion design keyframes, title sequences, 3D typography
│   ├── ai-films/                <- Stills and posters from AI-generated cinematic short films
│   │   ├── the-forgotten-smile.jpg
│   │   ├── the-last-letter-out.jpg
│   │   └── the-unseen-vision.jpg
│   ├── commercials/             <- Commercial campaign frames and advertising creatives
│   └── projects/                <- Miscellaneous project galleries and lookbooks
└── videos/                      <- Direct MP4 video files for AI films, showreels, and clips
    ├── the-forgotten-smile.mp4
    ├── the-last-letter-out.mp4
    └── the-unseen-vision.mp4
```

---

## 2. How to Add a New Project

All project data lives in a single centralized TypeScript file:
`src/data/projects.ts`

### Step 1: Place Your Media Files
1. For an image (poster, photograph, design):
   Copy your image file into `/public/images/<category>/` (e.g. `my-new-film.jpg`).
2. For a video:
   Copy your `.mp4` or `.webm` file into `/public/videos/` (e.g. `my-new-film.mp4`).

### Step 2: Open `src/data/projects.ts`
Add a new project object to the `projectsData` array:

```ts
{
  id: "proj-my-new-film",
  slug: "my-new-film",
  title: "Title of Your Project",
  category: "AI Films", // One of: "Photography" | "Graphic Design" | "Cinematography" | "Video Editing" | "Motion Graphics" | "AI Films" | "Commercial Advertising" | "Branding"
  year: "2025",
  client: "Client Name or Personal Project",
  role: "Director & Cinematographer",
  shortDescription: "A concise 1-2 sentence overview shown on gallery cards and previews.",
  fullDescription: "Detailed narrative describing concept, creative direction, gear, and execution.",
  coverImage: "/images/ai-films/my-new-film.jpg",
  thumbnail: "/images/ai-films/my-new-film.jpg",
  videoUrl: "/videos/my-new-film.mp4", // Optional: embed video playback
  featured: true, // true to pin near top of gallery
  aspectRatio: "16:9", // "16:9" | "4:5" | "1:1" | "9:16" | "21:9"
  tags: ["AI Cinema", "Runway Gen-3", "Sound Design", "Fiction"],
  technicalDetails: {
    camera: "Midjourney v6 + Runway Gen-3 Alpha",
    software: ["DaVinci Resolve Studio", "Premiere Pro", "ComfyUI"],
    colourSpace: "ACEScc / DCI-P3",
    aspectRatio: "2.39:1 Anamorphic Scope",
  },
  credits: [
    { role: "Director & Neural Filmmaker", name: "Anjalsh V.S." },
    { role: "Sound Design", name: "Anjalsh V.S." },
  ],
  gallery: [
    { type: "video", url: "/videos/my-new-film.mp4", caption: "Full Short Film cut" },
    { type: "image", url: "/images/ai-films/my-new-film.jpg", caption: "Official Film Still" },
  ],
}
```

### Step 3: Done!
The project automatically:
- Renders in the dynamic masonry gallery (`/#work` and `/work`).
- Appears under its category filter and in search/sort.
- Generates a static detail page at `/work/my-new-film`.
- Shows full-screen video and image previews in the interactive lightbox.
