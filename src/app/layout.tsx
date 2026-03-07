import type { Metadata } from "next";
import { DM_Sans, Instrument_Serif } from "next/font/google";
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

const instrumentSerif = Instrument_Serif({
  weight: "400",
  subsets: ["latin"],
  variable: "--font-instrument-serif",
  display: "swap",
  style: ["normal", "italic"],
});

const siteUrl = "https://saksham-solanki.github.io/SquareMind-Test";

export const metadata: Metadata = {
  title: {
    default: "SquareMind — India's Independent Real Estate Investment Advisory",
    template: "%s | SquareMind",
  },
  description:
    "India's first independent real estate investment advisory for HNIs and NRIs. Zero broker commissions. Data-backed portfolio strategy, RERA analysis, and due diligence.",
  keywords: ["India real estate", "NRI investment", "HNI portfolio advice", "independent real estate advisory", "property investment India", "Mumbai real estate", "Bangalore real estate"],
  metadataBase: new URL(siteUrl),
  openGraph: {
    title: "SquareMind — Independent Real Estate Investment Advisory",
    description: "Don't invest in real estate until you talk to us. Zero builder commissions. Data-backed advice for HNIs and NRIs.",
    url: siteUrl,
    siteName: "SquareMind",
    locale: "en_IN",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "SquareMind — Independent Real Estate Investment Advisory",
    description: "Data-backed real estate advice. Zero builder commissions.",
  },
  robots: {
    index: true,
    follow: true,
  },
  alternates: {
    canonical: siteUrl,
  },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "Organization",
  name: "SquareMind",
  description:
    "India's first independent real estate investment advisory. Zero builder commissions. Data-backed advice.",
  url: siteUrl,
  email: "hello@squaremind.in",
  areaServed: "India",
  sameAs: [],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body className={`${dmSans.variable} ${instrumentSerif.variable} font-sans antialiased`}>
        <Navbar />
        <main className="pt-20">{children}</main>
        <Footer />
        <WhatsAppFloat />
        <StickyMobileCTA />
      </body>
    </html>
  );
}
