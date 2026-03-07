"use client";

import Link from "next/link";
import { useState, useEffect } from "react";
import { cn } from "@/lib/cn";

export default function StickyMobileCTA() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const onScroll = () => setVisible(window.scrollY > 500);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <div
      className={cn(
        "hidden max-[900px]:block fixed bottom-0 left-0 right-0 z-[80] bg-ink px-6 py-3.5 text-center transition-transform duration-400",
        visible ? "translate-y-0" : "translate-y-full"
      )}
    >
      <Link href="/consultation" className="text-white font-bold text-[15px] block tracking-[-0.01em]">
        Free Strategy Call &mdash; Book Now &rarr;
      </Link>
    </div>
  );
}
