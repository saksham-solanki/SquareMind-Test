"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { useRef, type ReactNode } from "react";

interface ParallaxHeroProps {
  children: ReactNode;
  speed?: number;
}

export function ParallaxHero({ children, speed = 0.3 }: ParallaxHeroProps) {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });
  const y = useTransform(scrollYProgress, [0, 1], [0, speed * 150]);

  return (
    <div ref={ref} className="overflow-hidden">
      <motion.div style={{ y }}>{children}</motion.div>
    </div>
  );
}
