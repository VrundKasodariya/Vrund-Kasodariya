import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Vrund Kasodariya | Backend Engineer",
  description:
    "Personal portfolio of Vrund Kasodariya, a backend engineer focused on scalable systems, APIs, authentication, distributed architecture, and first-principles learning.",
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
    title: "Vrund Kasodariya | Backend Engineer",
    description:
      "Backend engineer building scalable systems from first principles.",
    type: "website",
    url: "https://vrund-kasodariya.vercel.app"
  },
  twitter: {
    card: "summary_large_image",
    title: "Vrund Kasodariya | Backend Engineer",
    description:
      "Backend engineer building scalable systems from first principles."
  }
};

export default function RootLayout({
  children
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="scroll-smooth">
      <body className="bg-ink font-sans text-slate-100">{children}</body>
    </html>
  );
}
