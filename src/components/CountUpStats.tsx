"use client";

import { CountUp } from "@/components/animations/CountUp";

type NumericStat = {
  target: number;
  prefix?: string;
  suffix?: string;
  label: string;
};

type DisplayStat = {
  display: string;
  label: string;
};

type Stat = NumericStat | DisplayStat;

function isNumeric(stat: Stat): stat is NumericStat {
  return "target" in stat;
}

const stats: Stat[] = [
  { target: 240, prefix: "\u20B9", suffix: "Cr+", label: "Investment decisions guided" },
  { display: "4.9 \u2605", label: "Google rating" },
  { target: 1200, suffix: "+", label: "Investors advised" },
  { display: "Zero", label: "Builder commissions" },
];

export default function CountUpStats() {
  return (
    <div className="grid grid-cols-2 lg:grid-cols-4 border-t border-b border-gray-200">
      {stats.map((s, i) => (
        <div
          key={s.label}
          className={`py-12 px-6 lg:px-10 text-center ${
            i < 3
              ? "border-r border-gray-200 max-lg:[&:nth-child(2)]:border-r-0"
              : ""
          }`}
        >
          <div className="font-serif text-[clamp(40px,4vw,56px)] tracking-[-0.03em] leading-none text-ink">
            {isNumeric(s) ? (
              <CountUp
                target={s.target}
                prefix={s.prefix}
                suffix={s.suffix}
              />
            ) : (
              s.display
            )}
          </div>
          <div className="text-[14px] text-gray-400 mt-2 tracking-[-0.01em]">
            {s.label}
          </div>
        </div>
      ))}
    </div>
  );
}
