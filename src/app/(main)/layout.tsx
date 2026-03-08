"use client";

import { MotionConfig } from "framer-motion";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import WhatsAppFloat from "@/components/WhatsAppFloat";
import StickyMobileCTA from "@/components/StickyMobileCTA";
import { LayoutTransition } from "@/components/animations/LayoutTransition";

export default function MainLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <MotionConfig reducedMotion="user">
      <Navbar />
      <LayoutTransition>
        <main className="pt-20">{children}</main>
      </LayoutTransition>
      <Footer />
      <WhatsAppFloat />
      <StickyMobileCTA />
    </MotionConfig>
  );
}
