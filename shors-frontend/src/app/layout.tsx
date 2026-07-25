import type { Metadata } from "next";
import { Syne, Poppins, JetBrains_Mono, Playfair_Display, Italiana, Tangerine, Cormorant_Garamond } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import PreOrderModal from "@/components/PreOrderModal";
import CommunityModal from "@/components/CommunityModal";
import FloatingAudioPlayer from "@/components/FloatingAudioPlayer";

const syne = Syne({
  variable: "--font-syne",
  subsets: ["latin"],
  weight: ["700", "800"],
});

const poppins = Poppins({
  variable: "--font-poppins",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
});

const jetbrainsMono = JetBrains_Mono({
  variable: "--font-jetbrains-mono",
  subsets: ["latin"],
  weight: ["400", "700"],
});

const tangerine = Tangerine({
  variable: "--font-cursive",
  subsets: ["latin"],
  weight: ["400", "700"],
});

const italiana = Italiana({
  variable: "--font-italiana",
  subsets: ["latin"],
  weight: ["400"],
});

const playfair = Playfair_Display({
  variable: "--font-serif",
  subsets: ["latin"],
  weight: ["400", "700"],
  style: ["normal", "italic"],
});

const cormorant = Cormorant_Garamond({
  variable: "--font-cormorant",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  style: ["normal", "italic"],
});

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
    <html
      lang="en"
      className={`${syne.variable} ${poppins.variable} ${jetbrainsMono.variable} ${playfair.variable} ${tangerine.variable} ${italiana.variable} ${cormorant.variable}`}
    >
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
