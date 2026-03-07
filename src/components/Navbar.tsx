"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState, useEffect } from "react";
import { cn } from "@/lib/cn";

const navLinks = [
  { href: "/research", label: "Research" },
  { href: "/insights", label: "Insights" },
  { href: "/tools", label: "Tools" },
  { href: "/frameworks", label: "Frameworks" },
  { href: "/properties", label: "Properties" },
  { href: "/about", label: "About" },
];

export default function Navbar() {
  const pathname = usePathname();
  const [mobileOpen, setMobileOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={cn(
        "fixed top-0 left-0 right-0 z-50 backdrop-blur-[24px] transition-all duration-400",
        scrolled
          ? "bg-chalk/95 shadow-[0_1px_0_rgba(0,0,0,0.06)]"
          : "bg-chalk/85"
      )}
    >
      <nav className="mx-auto max-w-[1200px] px-6 lg:px-14 flex items-center justify-between h-20">
        <Link href="/" className="font-sans text-[22px] font-bold text-ink tracking-[-0.5px]">
          Square<span className="text-sage">Mind</span>
        </Link>

        {/* Desktop nav */}
        <div className="hidden lg:flex items-center gap-9">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className={cn(
                "relative text-[15px] font-medium tracking-[-0.01em] transition-colors",
                "after:content-[''] after:absolute after:bottom-[-6px] after:left-0 after:right-0 after:h-[1.5px] after:bg-ink after:origin-right after:scale-x-0 after:transition-transform after:duration-400",
                "hover:text-ink hover:after:origin-left hover:after:scale-x-100",
                pathname === link.href
                  ? "text-ink after:origin-left after:scale-x-100"
                  : "text-gray-500"
              )}
            >
              {link.label}
            </Link>
          ))}
          <Link
            href="/consultation"
            className="bg-ink text-white px-7 py-3 rounded-full text-[14px] font-semibold tracking-[-0.01em] hover:bg-sage hover:scale-[1.03] transition-all duration-300"
          >
            Book Free Call
          </Link>
        </div>

        {/* Mobile hamburger */}
        <button
          onClick={() => setMobileOpen(!mobileOpen)}
          className="lg:hidden relative w-7 h-5 p-0 bg-transparent border-none"
          aria-label="Toggle menu"
          aria-expanded={mobileOpen}
        >
          <span className={cn("absolute left-0 w-full h-[1.5px] bg-ink rounded-sm transition-all duration-300", mobileOpen ? "top-[9px] rotate-45" : "top-0")} />
          <span className={cn("absolute left-0 top-[9px] w-full h-[1.5px] bg-ink rounded-sm transition-opacity duration-300", mobileOpen && "opacity-0")} />
          <span className={cn("absolute left-0 w-full h-[1.5px] bg-ink rounded-sm transition-all duration-300", mobileOpen ? "top-[9px] -rotate-45" : "top-[18px]")} />
        </button>
      </nav>

      {/* Mobile menu */}
      <div
        className={cn(
          "lg:hidden bg-chalk border-b border-gray-200 shadow-[0_20px_60px_rgba(0,0,0,0.08)] overflow-hidden transition-[max-height] duration-400",
          mobileOpen ? "max-h-[420px]" : "max-h-0"
        )}
      >
        {navLinks.map((link) => (
          <Link
            key={link.href}
            href={link.href}
            onClick={() => setMobileOpen(false)}
            className={cn(
              "block px-6 py-[18px] text-[16px] border-b border-gray-200",
              pathname === link.href ? "text-ink font-medium" : "text-gray-500"
            )}
          >
            {link.label}
          </Link>
        ))}
        <div className="px-6 py-[18px]">
          <Link
            href="/consultation"
            onClick={() => setMobileOpen(false)}
            className="block text-center bg-ink text-white text-[15px] font-semibold px-7 py-3 rounded-full hover:bg-sage transition-colors duration-300"
          >
            Book Free Call
          </Link>
        </div>
      </div>
    </header>
  );
}
