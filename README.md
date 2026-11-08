# ANJALSH®️ — PREMIUM CREATIVE PORTFOLIO WEBSITE

> **"SHAPING VISUAL STORIES."**  
> Official production-grade personal portfolio website for **Anjalsh V.S.**, Creative Multimedia Professional.

---

## ✦ DESIGN CONCEPT & IDENTITY

- **Identity**: `ANJALSH®️`
- **Tagline**: `SHAPING VISUAL STORIES.`
- **Profession**: Creative Multimedia Professional
- **Aesthetic**: Awwwards-inspired, minimal Swiss editorial design, cinematic dark palette (`#0A0A0A`), oversized typography, custom cursor, smooth scrolling, and film grain atmosphere.
- **Tech Stack**: Next.js 14 (App Router), React 18, TypeScript, Tailwind CSS, Framer Motion, Lucide Icons, and Lenis Smooth Scroll.

---

## ✦ QUICK START

### 1. Prerequisites
- Node.js (v18.17+ or v20+ LTS recommended)
- npm or pnpm or yarn

### 2. Run Development Server
```bash
npm run dev
```
Open [http://localhost:3000](http://localhost:3000) in your browser.

### 3. Production Build
```bash
npm run build
npm run start
```

---

## ✦ CONTENT MANAGEMENT & EDITING

Everything is centralized so you can update projects, experience, services, and social links **without touching UI components**.

### 1. Add / Remove Projects
Open `src/data/projects.ts`. Each project contains:
- `slug`: URL slug for dedicated case studies (`/work/[slug]`)
- `title`: Project title
- `category`: Photography, Cinematography, Graphic Design, Video Editing, Motion Graphics, AI Films, Commercial Advertising
- `year`: Production year
- `role`: Your verified role (e.g. *Director of Photography*, *Colorist*, *Editor*)
- `shortDescription`: Displayed on portfolio cards
- `fullDescription`: Full artistic narrative on modal and detail pages
- `coverImage`: Path or URL (e.g. `/assets/projects/covers/your-film.jpg`)
- `videoUrl`: MP4 trailer or preview
- `technicalDetails`: Camera, software suite, aspect ratio, colour space
- `gallery`: Array of high-resolution stills

### 2. Update Social Media, Bio & Experience
Open `src/data/siteConfig.ts`:
- **Social Media**: Update links for Instagram (`@anjalsh_`), LinkedIn, YouTube, Vimeo, Behance, and Facebook.
- **Verified Experiences**:
  - `7 Clouds Ads & Studios` (Dec 2024–Present)
  - `Kalamrith Ayurveda` (May 2024–Nov 2024)
  - `Freelance Creative Professional` (2020–Present)
- **Services**: 11 creative offerings with deliverables and toolsets.

---

## ✦ ASSETS DIRECTORY (`public/assets/`)

Upload your media into the structured folders:
- `public/assets/projects/covers/` — 16:9 or 2.39:1 Scope covers
- `public/assets/projects/stills/` — High-resolution scene stills
- `public/assets/profile/` — Studio portraits and creative profile photos
- `public/assets/videos/` — Short video clips and showreels

Read `public/assets/README.md` for recommended dimensions, formats, and compression targets.

---

## ✦ ENVIRONMENT VARIABLES (`.env.local`)

Copy `.env.example` to `.env.local`:
```bash
cp .env.example .env.local
```

### 1. Contact Form Email Delivery (Resend)
1. Sign up for free at [Resend](https://resend.com)
2. Generate an API Key
3. Add to `.env.local`:
   ```env
   RESEND_API_KEY=re_123456789...
   CONTACT_EMAIL_TO=contact@anjalsh.com
   ```
> **Honest Delivery Guarantee**: If `RESEND_API_KEY` is not present, the website transparently informs the visitor and provides a prefilled one-click mailto fallback so inquiries are never lost.

### 2. Google Analytics 4 (GA4)
```env
NEXT_PUBLIC_GA_MEASUREMENT_ID=G-XXXXXXXXXX
```

### 3. Google Search Console
```env
NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION=your-verification-code
```

---

## ✦ DEPLOYMENT

### Deploy to Vercel (Recommended)
1. Push this repository to GitHub, GitLab, or Bitbucket.
2. Go to [Vercel](https://vercel.com) and click **Import Project**.
3. Vercel automatically detects Next.js.
4. Add your environment variables (`RESEND_API_KEY`, etc.) in the Vercel dashboard.
5. Click **Deploy**.

---

## ✦ ARCHITECTURE OVERVIEW

```
├── public/
│   ├── assets/              # Upload folder for real photos & video clips
│   │   └── README.md        # Asset specifications & upload instructions
├── src/
│   ├── app/
│   │   ├── api/contact/     # Environment-based contact form delivery
│   │   ├── work/[slug]/     # Dedicated dynamic project case study pages
│   │   ├── about/           # Dedicated About & Experience page
│   │   ├── services/        # Dedicated Services & Disciplines page
│   │   ├── contact/         # Dedicated Contact page
│   │   ├── layout.tsx       # Root layout with fonts, JSON-LD, SEO, & cursor
│   │   ├── page.tsx         # Complete single-page flagship experience
│   │   ├── globals.css      # Dark cinema styles, grain overlay, Lenis
│   │   ├── robots.ts        # Search engine robots specification
│   │   └── sitemap.ts       # Automatic dynamic XML sitemap generator
│   ├── components/
│   │   ├── layout/          # Navbar, Footer, MobileNav, Cursor, Preloader
│   │   ├── sections/        # Hero, Work, About, Services, Experience, Contact
│   │   └── ui/              # ProjectCard, ProjectModal, Lightbox, Audio
│   ├── data/
│   │   ├── projects.ts      # Centralized projects database
│   │   └── siteConfig.ts    # Centralized bio, experience, services & links
│   ├── lib/
│   │   └── utils.ts         # Utility functions
│   └── types/
│       └── index.ts         # TypeScript interfaces
├── .env.example             # Documented environment template
├── tailwind.config.ts       # Tailored cinema & Swiss typography tokens
└── package.json             # Next.js 14, Framer Motion, Lenis, Lucide Icons
```

© 2024–2025 **ANJALSH®️** (Anjalsh V.S.). All rights reserved.
