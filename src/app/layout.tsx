import type { Metadata } from "next";
import { DM_Sans } from "next/font/google";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import WhatsAppFloat from "@/components/WhatsAppFloat";
import StickyMobileCTA from "@/components/StickyMobileCTA";
import "./globals.css";

const dmSans = DM_Sans({
  subsets: ["latin"],
  variable: "--font-dm-sans",
  display: "swap",
});

export const metadata: Metadata = {
  title: "SquareMind — India's Independent Real Estate Investment Advisory",
  description:
    "India's first independent real estate investment advisory for HNIs and NRIs. Zero broker commissions. Data-backed portfolio strategy, RERA analysis, and due diligence.",
  keywords: ["India real estate", "NRI investment", "HNI portfolio advice", "independent real estate advisory", "property investment India", "Mumbai real estate", "Bangalore real estate"],
  metadataBase: new URL("https://squaremind.in"),
  robots: "index, follow",
  openGraph: {
    title: "SquareMind — Independent Real Estate Investment Advisory",
    description: "Don't invest in real estate until you talk to us. Zero builder commissions. Data-backed advice for HNIs and NRIs.",
    url: "https://squaremind.in",
    siteName: "SquareMind",
    locale: "en_IN",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "SquareMind — Independent Real Estate Investment Advisory",
    description: "Data-backed real estate advice. Zero builder commissions.",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <link
          href="https://fonts.googleapis.com/css2?family=Instrument+Serif:ital@0;1&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className={`${dmSans.variable} font-sans antialiased`}>
        <Navbar />
        <main className="pt-20">{children}</main>
        <Footer />
        <WhatsAppFloat />
        <StickyMobileCTA />
      </body>
    </html>
  );
}
