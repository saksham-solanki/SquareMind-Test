"use client";

import { useState } from "react";
import Link from "next/link";
import FadeUp from "@/components/FadeUp";
import { cn } from "@/lib/cn";
import type { PostMeta } from "@/lib/mdx";

interface BlogGridProps {
  posts: { slug: string; meta: PostMeta }[];
}

const categories = [
  "All",
  "Investment Strategy",
  "Dark Truths",
  "NRI Corner",
  "City Guides",
  "Tax & Legal",
  "Builder Analysis",
  "Market Data",
];

export default function BlogGrid({ posts }: BlogGridProps) {
  const [active, setActive] = useState("All");

  const filtered =
    active === "All" ? posts : posts.filter((p) => p.meta.category === active);

  return (
    <>
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

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-8">
        {filtered.map((post, i) => (
          <FadeUp key={post.slug} delay={i * 0.05}>
            <Link href={`/insights/${post.slug}`} className="block h-full">
              <div className="bg-cream rounded-[20px] p-9 max-lg:p-7 hover:-translate-y-1 hover:shadow-[0_20px_60px_rgba(0,0,0,0.08)] transition-all duration-400 cursor-pointer h-full">
                <div className="text-[12px] font-semibold text-sage tracking-[0.06em] uppercase mb-3">
                  {post.meta.tag}
                </div>
                <div className="font-serif text-[21px] leading-[1.3] text-ink tracking-[-0.02em]">
                  {post.meta.title}
                </div>
                <div className="text-[14px] text-gray-500 mt-3 leading-[1.6]">
                  {post.meta.description.slice(0, 100)}...
                </div>
                <div className="text-[13px] text-gray-400 mt-4">
                  {post.meta.readTime} read &bull; {post.meta.views} views
                </div>
              </div>
            </Link>
          </FadeUp>
        ))}
      </div>
    </>
  );
}
