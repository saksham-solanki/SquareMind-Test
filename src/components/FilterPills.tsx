"use client";

import { useState } from "react";
import { cn } from "@/lib/cn";

export default function FilterPills({ categories }: { categories: string[] }) {
  const [active, setActive] = useState("All");

  return (
    <div className="flex flex-wrap gap-2.5 mt-9">
      {categories.map((cat) => (
        <button
          key={cat}
          onClick={() => setActive(cat)}
          className={cn(
            "px-5 py-2.5 rounded-full text-[14px] font-medium border-[1.5px] transition-all duration-300 tracking-[-0.01em]",
            active === cat
              ? "bg-ink text-white border-ink font-semibold"
              : "bg-white text-gray-500 border-gray-300 hover:border-ink hover:text-ink"
          )}
        >
          {cat}
        </button>
      ))}
    </div>
  );
}
