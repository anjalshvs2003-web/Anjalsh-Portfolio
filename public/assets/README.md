# ANJALSH®️ — PUBLIC ASSETS MANAGEMENT GUIDE

This directory houses your media files, high-resolution photographs, showreels, posters, and profile portraits.

---

## FOLDER STRUCTURE

```
public/
└── assets/
    ├── profile/             # Portraits, studio photos, profile images of Anjalsh
    │   └── anjalsh-portrait.jpg (Recommended: 1200x1500px, 4:5 aspect ratio)
    ├── projects/            # Project cover images and gallery stills
    │   ├── covers/          # Primary project thumbnail/covers (2.39:1 Scope or 16:9)
    │   └── stills/          # Film stills, behind-the-scenes, high-res captures
    ├── branding/            # Logos, monograms, favicons, vector marks
    └── videos/              # Short MP4 previews, video loops, showreel teasers
```

---

## RECOMMENDED SPECS & FORMATS

| Asset Type | Aspect Ratio | Dimensions | Recommended Format | File Size Target |
| :--- | :--- | :--- | :--- | :--- |
| **Hero / Showreel Still** | 2.39:1 Scope | 2560 × 1070 px | WebP or AVIF (or JPG) | < 350 KB |
| **Project Covers** | 16:9 or 2.39:1 | 1920 × 1080 px | WebP / JPG | < 250 KB |
| **Editorial Photography** | 4:5 Portrait | 1600 × 2000 px | WebP / JPG | < 300 KB |
| **Video Loops / Previews** | 16:9 or 2.39:1 | 1920 × 1080 px (24fps) | MP4 (H.264/AAC) | < 5 MB |
| **Profile Portrait** | 4:5 | 1200 × 1500 px | WebP / JPG | < 200 KB |

---

## HOW TO ADD OR UPDATE A PROJECT

You can add, edit, or remove projects **without modifying any UI components**:

1. Drop your new cover and stills into `public/assets/projects/covers/` and `public/assets/projects/stills/`.
2. Open `src/data/projects.ts`.
3. Add a new object to the `projectsData` array:

```typescript
{
  id: "proj-09",
  slug: "your-project-slug",
  title: "Your Project Title",
  category: "Cinematography", // Pick from: Cinematography, Photography, Graphic Design, Video Editing, Motion Graphics, AI Films, Commercial Advertising
  year: "2025",
  client: "Client Name",
  role: "Director of Photography",
  shortDescription: "One sentence summary for gallery cards.",
  fullDescription: "Detailed narrative and artistic rationale.",
  coverImage: "/assets/projects/covers/your-cover.jpg",
  videoUrl: "/assets/videos/your-trailer.mp4", // optional
  featured: true,
  aspectRatio: "2.39:1",
  tags: ["Anamorphic", "DaVinci Resolve", "Commercial"],
  technicalDetails: {
    camera: "Blackmagic Cinema 6K",
    software: ["DaVinci Resolve Studio"],
    colourSpace: "ACEScc",
    aspectRatio: "2.39:1",
    runtime: "02:30",
  },
  credits: [
    { role: "Director", name: "Anjalsh V.S." },
  ],
  gallery: [
    {
      type: "image",
      url: "/assets/projects/stills/still-01.jpg",
      caption: "Scene description",
    },
  ],
}
```

The website will automatically:
- Render the new card in the Selected Work gallery.
- Add it to the dynamic category filter counters.
- Generate a dedicated page route at `/work/your-project-slug`.
- Add it to the interactive lightbox and modal view.
- Update the XML sitemap automatically.
