import type { Metadata, Viewport } from "next";
import { Poppins, JetBrains_Mono } from "next/font/google";
import "./globals.css";
import { siteConfig } from "@/data/siteConfig";
import CustomCursor from "@/components/layout/CustomCursor";
import Preloader from "@/components/layout/Preloader";
import SmoothScroll from "@/components/layout/SmoothScroll";
import { PortfolioProvider } from "@/context/PortfolioContext";

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700", "800"],
  variable: "--font-poppins",
  display: "swap",
});

const jetbrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-mono",
  display: "swap",
});

export const viewport: Viewport = {
  themeColor: "#0A0D12",
  colorScheme: "dark",
  width: "device-width",
  initialScale: 1,
};

export const metadata: Metadata = {
  metadataBase: new URL(siteConfig.seo.siteUrl),
  title: {
    default: "Anjalsh V.S. — Filmmaker & Visual Artist",
    template: `%s | ${siteConfig.name}`,
  },
  description: "Explore the creative portfolio of Anjalsh V.S., featuring filmmaking, cinematography, photography, graphic design, motion graphics and AI visual production.",
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
    title: "Anjalsh V.S. — Filmmaker & Visual Artist",
    description: "Explore the creative portfolio of Anjalsh V.S., featuring filmmaking, cinematography, photography, graphic design, motion graphics and AI visual production.",
    siteName: siteConfig.name,
    images: [
      {
        url: "/images/photography/anjalsh-portrait.jpg",
        width: 1200,
        height: 630,
        alt: "Anjalsh V.S. — Filmmaker & Visual Artist",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Anjalsh V.S. — Filmmaker & Visual Artist",
    description: "Explore the creative portfolio of Anjalsh V.S., featuring filmmaking, cinematography, photography, graphic design, motion graphics and AI visual production.",
    images: ["/images/photography/anjalsh-portrait.jpg"],
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
        "jobTitle": "Filmmaker & Visual Artist",
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
      className={`${poppins.variable} ${jetbrainsMono.variable} dark`}
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
      <body className="font-body bg-[#0A0D12] text-[#F8FAFC] selection:bg-accent/30 selection:text-white antialiased overflow-x-hidden">
        {/* Subtle Film Grain */}
        <div className="film-grain" />

        {/* Custom Cinematic Cursor (Desktop) */}
        <CustomCursor />

        {/* Elegant Preloader */}
        <Preloader />

        {/* Smooth Scrolling Container */}
        <PortfolioProvider>
          <SmoothScroll>
            {children}
          </SmoothScroll>
        </PortfolioProvider>
      </body>
    </html>
  );
}
