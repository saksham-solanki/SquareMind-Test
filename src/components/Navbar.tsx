"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { cn } from "@/lib/cn";

const navLinks = [
  { href: "/", label: "Home" },
  { href: "/properties", label: "Properties" },
  { href: "/about", label: "About" },
];

export default function Navbar() {
  const pathname = usePathname();
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-chalk/80 backdrop-blur-md border-b border-ink/5">
      <nav className="mx-auto max-w-[1200px] px-5 lg:px-8 flex items-center justify-between h-16">
        <Link href="/" className="font-serif text-2xl text-ink tracking-tight">
          SquareMind
        </Link>

        {/* Desktop nav */}
        <div className="hidden md:flex items-center gap-8">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className={cn(
                "text-[15px] transition-colors",
                pathname === link.href
                  ? "text-sage font-medium"
                  : "text-gray-500 hover:text-ink"
              )}
            >
              {link.label}
            </Link>
          ))}
          <Link
            href="/properties#form"
            className="inline-flex items-center gap-2 bg-sage text-white text-[14px] font-medium px-5 py-2.5 rounded-lg hover:bg-sage-deep transition-colors"
          >
            Get Early Access
          </Link>
        </div>

        {/* Mobile hamburger */}
        <button
          onClick={() => setMobileOpen(!mobileOpen)}
          className="md:hidden flex flex-col gap-1.5 p-2"
          aria-label="Toggle menu"
        >
          <span className={cn("block w-5 h-0.5 bg-ink transition-transform", mobileOpen && "rotate-45 translate-y-2")} />
          <span className={cn("block w-5 h-0.5 bg-ink transition-opacity", mobileOpen && "opacity-0")} />
          <span className={cn("block w-5 h-0.5 bg-ink transition-transform", mobileOpen && "-rotate-45 -translate-y-2")} />
        </button>
      </nav>

      {/* Mobile menu */}
      {mobileOpen && (
        <div className="md:hidden bg-chalk border-b border-ink/5 px-5 pb-6 pt-2">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              onClick={() => setMobileOpen(false)}
              className={cn(
                "block py-3 text-[16px] border-b border-ink/5",
                pathname === link.href
                  ? "text-sage font-medium"
                  : "text-gray-500"
              )}
            >
              {link.label}
            </Link>
          ))}
          <Link
            href="/properties#form"
            onClick={() => setMobileOpen(false)}
            className="mt-4 block text-center bg-sage text-white text-[15px] font-medium px-5 py-3 rounded-lg"
          >
            Get Early Access
          </Link>
        </div>
      )}
    </header>
  );
}
