import type { Metadata } from "next";
import Link from "next/link";
import FadeUp from "@/components/FadeUp";
import BlogGrid from "@/components/BlogGrid";
import { getAllPosts } from "@/lib/mdx";

export const metadata: Metadata = {
  title: "Real Estate Investment Insights & Analysis — SquareMind Blog",
  description: "Data-driven real estate investment analysis, builder reviews, NRI guides, and market intelligence. Independent research from SquareMind.",
  openGraph: {
    title: "Real Estate Investment Insights & Analysis — SquareMind Blog",
    description: "Data-driven real estate investment analysis and market intelligence.",
    url: "/insights",
  },
  alternates: {
    canonical: "https://squaremind.in/insights",
  },
};

export default function InsightsPage() {
  const posts = getAllPosts();

  return (
    <>
      <div className="mx-auto max-w-[1200px] px-6 lg:px-14 pt-5">
        <nav className="text-[14px] text-gray-400" aria-label="Breadcrumb">
          <Link href="/" className="hover:text-sage transition-colors">Home</Link>
          <span className="mx-2">/</span><span>Insights</span>
        </nav>
      </div>

      <section className="py-[120px] max-lg:py-20">
        <div className="mx-auto max-w-[1200px] px-6 lg:px-14">
          <FadeUp>
            <span className="text-[13px] font-semibold tracking-[0.08em] uppercase text-sage mb-4 block">SquareMind Insights</span>
            <h1 className="font-serif text-[clamp(36px,4.5vw,64px)] leading-[1.08] tracking-[-0.03em]">
              Real estate intelligence.<br />Not real estate marketing.
            </h1>
            <p className="text-[18px] text-gray-500 max-w-[560px] mt-4 leading-[1.65] tracking-[-0.01em]">
              Data-driven analysis, investor education, and the uncomfortable truths the industry doesn&apos;t want you to know.
            </p>
          </FadeUp>

          <FadeUp delay={0.1}>
            <BlogGrid posts={posts.map((p) => ({ slug: p.slug, meta: p.meta }))} />
          </FadeUp>
        </div>
      </section>

      <section className="pb-[120px] max-lg:pb-20">
        <div className="mx-auto max-w-[1200px] px-6 lg:px-14">
          <FadeUp>
            <div className="bg-cream rounded-[28px] py-[72px] px-12 max-lg:py-10 max-lg:px-7 text-center max-w-[720px] mx-auto">
              <h3 className="font-serif text-[36px] tracking-[-0.03em]">Get the 7-Point Due Diligence Checklist</h3>
              <p className="text-[16px] text-gray-500 mt-3 mb-7 tracking-[-0.01em]">
                The exact framework we use to evaluate every property. Avoid costly mistakes with this free PDF checklist.
              </p>
              <form className="flex flex-col sm:flex-row gap-2.5 max-w-[440px] mx-auto">
                <input type="email" placeholder="your@email.com" required className="flex-1 px-5 py-3.5 border-[1.5px] border-gray-300 rounded-full text-[15px] bg-white text-ink focus:outline-none focus:border-ink transition-colors tracking-[-0.01em]" />
                <button type="submit" className="bg-ink text-white px-7 py-3.5 rounded-full text-[15px] font-semibold whitespace-nowrap hover:bg-gray-600 hover:scale-[1.03] transition-all duration-300 tracking-[-0.01em]">
                  Get Free Checklist
                </button>
              </form>
              <p className="text-[11px] text-gray-400 mt-3">Join 10,000+ smart investors. No spam. Unsubscribe anytime.</p>
            </div>
          </FadeUp>
        </div>
      </section>
    </>
  );
}
