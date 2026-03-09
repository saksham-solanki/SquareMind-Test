"use client";

import type { ReactNode } from "react";

interface VerdictBoxProps {
  variant: "positive" | "neutral" | "warning";
  children: ReactNode;
}

const variantClasses: Record<VerdictBoxProps["variant"], string> = {
  positive: "bg-sage-light text-sage-deep",
  neutral: "bg-cream text-gray-600",
  warning: "bg-[#FFF3E0] text-[#E65100]",
};

export default function VerdictBox({ variant, children }: VerdictBoxProps) {
  return (
    <div
      className={`mt-5 p-4 rounded-[12px] text-[14px] leading-relaxed tracking-[-0.01em] ${variantClasses[variant]}`}
    >
      {children}
    </div>
  );
}
