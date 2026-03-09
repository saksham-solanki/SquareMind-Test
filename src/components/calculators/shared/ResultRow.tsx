"use client";

interface ResultRowProps {
  label: string;
  value: string;
  highlight?: boolean;
}

export default function ResultRow({ label, value, highlight }: ResultRowProps) {
  return (
    <div
      className={`flex justify-between tracking-[-0.01em] ${
        highlight
          ? "pt-3 mt-2 border-t-[1.5px] border-gray-300 font-bold text-[15px] text-ink"
          : "py-2 text-[14px] text-gray-500"
      }`}
    >
      <span>{label}</span>
      <span className={highlight ? "text-sage" : "font-semibold text-ink"}>
        {value}
      </span>
    </div>
  );
}
