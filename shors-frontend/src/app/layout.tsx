import type { Metadata } from "next";
import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import PreOrderModal from "@/components/PreOrderModal";
import CommunityModal from "@/components/CommunityModal";
import FloatingAudioPlayer from "@/components/FloatingAudioPlayer";

export const metadata: Metadata = {
  title: {
    template: "%s | SHORS",
    default: "SHORS | Heritage, Designed for Today",
  },
  description: "SHORS is a fashion apparel and accessories brand designing bold, culturally expressive canvas tote bags rooted in Indian heritage. Unapologetic, loud, and confident.",
  keywords: ["SHORS", "tote bags", "canvas tote bags", "Indian heritage", "editorial fashion", "maximalist fashion", "urban India", "diaspora", "Sukrit art", "pre-order"],
  authors: [{ name: "Rutal & Monik" }],
  icons: {
    icon: [
      { url: "/shors.logo.pngs/shors.logo.black.png", media: "(prefers-color-scheme: light)" },
      { url: "/shors.logo.pngs/shors.logo.white.png", media: "(prefers-color-scheme: dark)" },
    ],
  },
  openGraph: {
    title: "SHORS | Heritage in Motion",
    description: "Bold, culturally expressive canvas tote bags rooted in Indian heritage.",
    type: "website",
    images: [
      {
        url: "/shors.logo.pngs/shors.black.png",
        width: 1200,
        height: 630,
        alt: "SHORS Logo",
      }
    ],
  }
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;0,500;0,600;0,700;1,300;1,400;1,500;1,600;1,700&family=Italiana&family=JetBrains+Mono:wght@400;700&family=Playfair+Display:ital,wght@0,400;0,700;1,400;1,700&family=Poppins:wght@300;400;500;600;700&family=Syne:wght@700;800&family=Tangerine:wght@400;700&display=swap" rel="stylesheet" />
      </head>
      <body>
        <div className="layout-wrapper">
          <Navbar />
          <main className="main-content">{children}</main>
          <Footer />
        </div>
        <PreOrderModal />
        <CommunityModal />
        <FloatingAudioPlayer />
      </body>
    </html>
  );
}
