"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState, useEffect, useRef } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { cn } from "@/lib/cn";
import { TOOLS } from "@/data/tool-registry";
import {
  TrendingUp,
  Scale,
  Calculator,
  Award,
  ShieldCheck,
  Globe,
  Landmark,
  Stamp,
  ChevronDown,
} from "lucide-react";
import type { LucideIcon } from "lucide-react";

const iconMap: Record<string, LucideIcon> = {
  TrendingUp,
  Scale,
  Calculator,
  Award,
  ShieldCheck,
  Globe,
  Landmark,
  Stamp,
};

const navLinks = [
  { href: "/research", label: "Research" },
  { href: "/insights", label: "Insights" },
  { href: "/tools", label: "Tools", hasDropdown: true },
  { href: "/frameworks", label: "Frameworks" },
  { href: "/properties", label: "Properties" },
  { href: "/about", label: "About" },
];

export default function Navbar() {
  const pathname = usePathname();
  const [mobileOpen, setMobileOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [toolsOpen, setToolsOpen] = useState(false);
  const [mobileToolsOpen, setMobileToolsOpen] = useState(false);
  const toolsRef = useRef<HTMLDivElement>(null);
  const toolsTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Auto-close mobile menu on route change
  useEffect(() => {
    setMobileOpen(false);
    setToolsOpen(false);
    setMobileToolsOpen(false);
  }, [pathname]);

  // Close dropdown on outside click
  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (toolsRef.current && !toolsRef.current.contains(e.target as Node)) {
        setToolsOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  function handleToolsEnter() {
    if (toolsTimeoutRef.current) clearTimeout(toolsTimeoutRef.current);
    setToolsOpen(true);
  }

  function handleToolsLeave() {
    toolsTimeoutRef.current = setTimeout(() => setToolsOpen(false), 150);
  }

  const isToolsActive = pathname.startsWith("/tools");

  return (
    <header
      className={cn(
        "fixed top-0 left-0 right-0 z-50 transition-all duration-400",
        scrolled
          ? "backdrop-blur-2xl bg-chalk/80 shadow-[0_1px_0_rgba(0,0,0,0.06)]"
          : "backdrop-blur-xl bg-chalk/60"
      )}
    >
      <nav className="mx-auto max-w-[1200px] px-6 lg:px-14 flex items-center justify-between h-20">
        <Link href="/" className="font-sans text-[22px] font-bold text-ink tracking-[-0.5px]">
          Square<span className="text-sage">Mind</span>
        </Link>

        {/* Desktop nav */}
        <div className="hidden lg:flex items-center gap-9">
          {navLinks.map((link) =>
            link.hasDropdown ? (
              /* Tools with dropdown */
              <div
                key={link.href}
                ref={toolsRef}
                className="relative"
                onMouseEnter={handleToolsEnter}
                onMouseLeave={handleToolsLeave}
              >
                <button
                  onClick={() => setToolsOpen(!toolsOpen)}
                  className={cn(
                    "relative flex items-center gap-1 text-[15px] font-medium tracking-[-0.01em] transition-colors cursor-pointer",
                    "after:content-[''] after:absolute after:bottom-[-6px] after:left-0 after:right-0 after:h-[1.5px] after:bg-ink after:origin-right after:scale-x-0 after:transition-transform after:duration-400",
                    "hover:text-ink hover:after:origin-left hover:after:scale-x-100",
                    isToolsActive
                      ? "text-ink after:origin-left after:scale-x-100"
                      : "text-gray-500"
                  )}
                >
                  {link.label}
                  <ChevronDown
                    className={cn(
                      "w-3.5 h-3.5 transition-transform duration-200",
                      toolsOpen && "rotate-180"
                    )}
                  />
                </button>

                {/* Desktop dropdown panel */}
                <AnimatePresence>
                  {toolsOpen && (
                    <motion.div
                      initial={{ opacity: 0, y: 8, scale: 0.96 }}
                      animate={{ opacity: 1, y: 0, scale: 1 }}
                      exit={{ opacity: 0, y: 8, scale: 0.96 }}
                      transition={{ duration: 0.2, ease: "easeOut" }}
                      className="absolute top-[calc(100%+12px)] -left-4 w-[380px] backdrop-blur-2xl bg-chalk/95 border border-gray-200/60 rounded-2xl shadow-[0_12px_40px_rgba(0,0,0,0.08)] overflow-hidden"
                    >
                      {/* Header */}
                      <div className="px-5 pt-4 pb-2 border-b border-gray-100">
                        <Link
                          href="/tools"
                          className="text-[13px] font-semibold text-sage hover:text-sage-deep transition-colors cursor-pointer"
                        >
                          View All Tools &rarr;
                        </Link>
                      </div>

                      {/* Tools list */}
                      <div className="py-2 max-h-[400px] overflow-y-auto">
                        {TOOLS.map((tool) => {
                          const Icon = iconMap[tool.icon];
                          return (
                            <Link
                              key={tool.slug}
                              href={`/tools/${tool.slug}`}
                              className="flex items-start gap-3.5 px-5 py-3 hover:bg-sage/5 transition-colors duration-150 cursor-pointer group"
                            >
                              <div className="mt-0.5 w-8 h-8 rounded-lg bg-sage/10 flex items-center justify-center shrink-0 group-hover:bg-sage/20 transition-colors duration-150">
                                {Icon && (
                                  <Icon className="w-4 h-4 text-sage" />
                                )}
                              </div>
                              <div className="min-w-0">
                                <p className="text-[14px] font-medium text-ink leading-tight">
                                  {tool.title}
                                </p>
                                <p className="text-[12px] text-gray-400 leading-snug mt-0.5 line-clamp-1">
                                  {tool.description}
                                </p>
                              </div>
                            </Link>
                          );
                        })}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            ) : (
              /* Regular nav links */
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
            )
          )}
          <Link
            href="/consultation"
            className="bg-ink text-white px-7 py-3 rounded-full text-[14px] font-semibold tracking-[-0.01em] hover:bg-sage hover:scale-[1.03] transition-all duration-300 cursor-pointer"
          >
            Book Free Call
          </Link>
        </div>

        {/* Mobile hamburger */}
        <button
          onClick={() => setMobileOpen(!mobileOpen)}
          className="lg:hidden relative w-7 h-5 p-0 bg-transparent border-none cursor-pointer"
          aria-label="Toggle menu"
          aria-expanded={mobileOpen}
        >
          <span className={cn("absolute left-0 w-full h-[1.5px] bg-ink rounded-sm transition-all duration-300", mobileOpen ? "top-[9px] rotate-45" : "top-0")} />
          <span className={cn("absolute left-0 top-[9px] w-full h-[1.5px] bg-ink rounded-sm transition-opacity duration-300", mobileOpen && "opacity-0")} />
          <span className={cn("absolute left-0 w-full h-[1.5px] bg-ink rounded-sm transition-all duration-300", mobileOpen ? "top-[9px] -rotate-45" : "top-[18px]")} />
        </button>
      </nav>

      {/* Mobile menu — slide-in drawer */}
      <AnimatePresence>
        {mobileOpen && (
          <>
            {/* Backdrop overlay */}
            <motion.div
              className="lg:hidden fixed inset-0 z-40 bg-ink/30 backdrop-blur-sm"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              onClick={() => setMobileOpen(false)}
            />

            {/* Slide-in drawer */}
            <motion.div
              className="lg:hidden fixed top-20 right-0 bottom-0 w-[85vw] max-w-[360px] z-50 bg-chalk shadow-[-8px_0_30px_rgba(0,0,0,0.1)]"
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ type: "spring", damping: 25, stiffness: 200 }}
            >
              <div className="flex flex-col h-full">
                <div className="flex-1 overflow-y-auto">
                  {navLinks.map((link) =>
                    link.hasDropdown ? (
                      /* Mobile Tools with expand/collapse */
                      <div key={link.href}>
                        <button
                          onClick={() => setMobileToolsOpen(!mobileToolsOpen)}
                          className={cn(
                            "w-full flex items-center justify-between px-8 py-5 text-[16px] border-b border-gray-200 cursor-pointer",
                            isToolsActive ? "text-ink font-medium" : "text-gray-500"
                          )}
                        >
                          <span>{link.label}</span>
                          <ChevronDown
                            className={cn(
                              "w-4 h-4 transition-transform duration-200",
                              mobileToolsOpen && "rotate-180"
                            )}
                          />
                        </button>

                        <AnimatePresence>
                          {mobileToolsOpen && (
                            <motion.div
                              initial={{ height: 0, opacity: 0 }}
                              animate={{ height: "auto", opacity: 1 }}
                              exit={{ height: 0, opacity: 0 }}
                              transition={{ duration: 0.25, ease: "easeInOut" }}
                              className="overflow-hidden bg-gray-50/50"
                            >
                              {/* View All Tools link */}
                              <Link
                                href="/tools"
                                onClick={() => setMobileOpen(false)}
                                className="block px-8 pl-12 py-3 text-[13px] font-semibold text-sage border-b border-gray-100 cursor-pointer"
                              >
                                View All Tools &rarr;
                              </Link>

                              {TOOLS.map((tool) => {
                                const Icon = iconMap[tool.icon];
                                return (
                                  <Link
                                    key={tool.slug}
                                    href={`/tools/${tool.slug}`}
                                    onClick={() => setMobileOpen(false)}
                                    className="flex items-center gap-3 px-8 pl-12 py-3.5 border-b border-gray-100 cursor-pointer"
                                  >
                                    <div className="w-7 h-7 rounded-lg bg-sage/10 flex items-center justify-center shrink-0">
                                      {Icon && (
                                        <Icon className="w-3.5 h-3.5 text-sage" />
                                      )}
                                    </div>
                                    <span
                                      className={cn(
                                        "text-[14px]",
                                        pathname === `/tools/${tool.slug}`
                                          ? "text-ink font-medium"
                                          : "text-gray-500"
                                      )}
                                    >
                                      {tool.title}
                                    </span>
                                  </Link>
                                );
                              })}
                            </motion.div>
                          )}
                        </AnimatePresence>
                      </div>
                    ) : (
                      <Link
                        key={link.href}
                        href={link.href}
                        onClick={() => setMobileOpen(false)}
                        className={cn(
                          "block px-8 py-5 text-[16px] border-b border-gray-200 cursor-pointer",
                          pathname === link.href ? "text-ink font-medium" : "text-gray-500"
                        )}
                      >
                        {link.label}
                      </Link>
                    )
                  )}
                </div>
                <div className="px-8 py-6">
                  <Link
                    href="/consultation"
                    onClick={() => setMobileOpen(false)}
                    className="block text-center bg-ink text-white text-[15px] font-semibold px-7 py-3 rounded-full hover:bg-sage transition-colors duration-300 cursor-pointer"
                  >
                    Book Free Call
                  </Link>
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </header>
  );
}
