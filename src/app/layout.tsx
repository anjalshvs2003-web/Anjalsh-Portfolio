import type { Metadata, Viewport } from "next";
import { Space_Grotesk, Inter, JetBrains_Mono, Playfair_Display } from "next/font/google";
import "./globals.css";
import { siteConfig } from "@/data/siteConfig";
import CustomCursor from "@/components/layout/CustomCursor";
import Preloader from "@/components/layout/Preloader";
import SmoothScroll from "@/components/layout/SmoothScroll";

const spaceGrotesk = Space_Grotesk({
  subsets: ["latin"],
  variable: "--font-space",
  display: "swap",
});

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

const playfair = Playfair_Display({
  subsets: ["latin"],
  variable: "--font-serif",
  display: "swap",
  style: ["normal", "italic"],
});

const jetbrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-mono",
  display: "swap",
});

export const viewport: Viewport = {
  themeColor: "#100D0F",
  colorScheme: "dark",
  width: "device-width",
  initialScale: 1,
};

export const metadata: Metadata = {
  metadataBase: new URL(siteConfig.seo.siteUrl),
  title: {
    default: siteConfig.title,
    template: `%s | ${siteConfig.name}`,
  },
  description: siteConfig.seo.description,
  keywords: siteConfig.seo.keywords,
  authors: [{ name: siteConfig.author, url: siteConfig.seo.siteUrl }],
  creator: siteConfig.author,
  publisher: siteConfig.name,
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: siteConfig.seo.siteUrl,
    title: siteConfig.title,
    description: siteConfig.seo.description,
    siteName: siteConfig.name,
    images: [
      {
        url: "https://images.unsplash.com/photo-1518709268805-4e9042af9f23?q=80&w=1200&auto=format&fit=crop",
        width: 1200,
        height: 630,
        alt: siteConfig.title,
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: siteConfig.title,
    description: siteConfig.seo.description,
    images: [
      "https://images.unsplash.com/photo-1518709268805-4e9042af9f23?q=80&w=1200&auto=format&fit=crop",
    ],
  },
  verification: {
    google: process.env.NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION || undefined,
  },
  alternates: {
    canonical: siteConfig.seo.siteUrl,
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Person",
        "@id": `${siteConfig.seo.siteUrl}/#person`,
        "name": siteConfig.author,
        "alternateName": "ANJALSH®️",
        "jobTitle": siteConfig.profession,
        "url": siteConfig.seo.siteUrl,
        "sameAs": [
          siteConfig.socialLinks.find((s) => s.platform === "Instagram")?.url || "https://www.instagram.com/anjalsh_/",
        ],
        "knowsAbout": [
          "Cinematography",
          "Color Grading",
          "DaVinci Resolve Studio",
          "Graphic Design",
          "AI Filmmaking",
          "Creative Direction",
        ],
      },
      {
        "@type": "WebSite",
        "@id": `${siteConfig.seo.siteUrl}/#website`,
        "url": siteConfig.seo.siteUrl,
        "name": siteConfig.name,
        "description": siteConfig.seo.description,
        "publisher": {
          "@id": `${siteConfig.seo.siteUrl}/#person`,
        },
      },
      {
        "@type": "ProfessionalService",
        "@id": `${siteConfig.seo.siteUrl}/#service`,
        "name": "ANJALSH Studio",
        "description": siteConfig.bio.mission,
        "address": {
          "@type": "PostalAddress",
          "addressRegion": "Kerala",
          "addressCountry": "IN",
        },
        "founder": {
          "@id": `${siteConfig.seo.siteUrl}/#person`,
        },
      },
    ],
  };

  const gaMeasurementId = process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID;

  return (
    <html
      lang="en"
      className={`${spaceGrotesk.variable} ${inter.variable} ${playfair.variable} ${jetbrainsMono.variable} dark`}
    >
      <head>
        {/* Structured Data JSON-LD */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />

        {/* Google Analytics 4 Placeholder */}
        {gaMeasurementId && (
          <>
            <script
              async
              src={`https://www.googletagmanager.com/gtag/js?id=${gaMeasurementId}`}
            />
            <script
              dangerouslySetInnerHTML={{
                __html: `
                  window.dataLayer = window.dataLayer || [];
                  function gtag(){dataLayer.push(arguments);}
                  gtag('js', new Date());
                  gtag('config', '${gaMeasurementId}', {
                    page_path: window.location.pathname,
                  });
                `,
              }}
            />
          </>
        )}
      </head>
      <body className="font-body bg-[#100D0F] text-[#F5F2F0] selection:bg-accent/30 selection:text-white antialiased overflow-x-hidden">
        {/* Subtle Film Grain */}
        <div className="film-grain" />

        {/* Custom Cinematic Cursor (Desktop) */}
        <CustomCursor />

        {/* Elegant Preloader */}
        <Preloader />

        {/* Smooth Scrolling Container */}
        <SmoothScroll>
          {children}
        </SmoothScroll>
      </body>
    </html>
  );
}
