import type { Metadata, Viewport } from "next";
import { Inter } from "next/font/google";
import { Footer } from "@/components/Footer";
import { MotionProvider } from "@/components/MotionProvider";
import { siteConfig } from "@/lib/site";
import "./globals.css";

const inter = Inter({ subsets: ["latin"], variable: "--font-inter" });

const personJsonLd = {
  "@context": "https://schema.org",
  "@type": "Person",
  name: siteConfig.name,
  url: siteConfig.url,
  email: `mailto:${siteConfig.email}`,
  jobTitle: "Backend Engineer",
  alumniOf: "Nitte Meenakshi Institute of Technology",
  sameAs: [siteConfig.links.github, siteConfig.links.linkedin]
};

export const viewport: Viewport = {
  themeColor: "#050505"
};

export const metadata: Metadata = {
  metadataBase: new URL(siteConfig.url),
  title: siteConfig.title,
  description: siteConfig.description,
  alternates: {
    canonical: "/"
  },
  keywords: [
    "Vrund Kasodariya",
    "Backend Engineer",
    "Node.js",
    "Kafka",
    "gRPC",
    "Distributed Systems",
    "APIs"
  ],
  authors: [{ name: "Vrund Kasodariya" }],
  openGraph: {
    title: siteConfig.title,
    description: siteConfig.tagline,
    type: "website",
    url: "/",
    siteName: siteConfig.name,
    locale: "en_US"
  },
  twitter: {
    card: "summary_large_image",
    title: siteConfig.title,
    description: siteConfig.tagline
  }
};

export default function RootLayout({
  children
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`scroll-smooth ${inter.variable}`}>
      <body id="top" className="bg-ink font-sans text-slate-100">
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(personJsonLd) }}
        />
        <MotionProvider>{children}</MotionProvider>
        <Footer />
      </body>
    </html>
  );
}
