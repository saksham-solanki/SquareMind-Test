import type { Metadata } from "next";
import Link from "next/link";
import FadeUp from "@/components/FadeUp";
import DownloadGate from "@/components/DownloadGate";

export const metadata: Metadata = {
  title: "Real Estate Research Reports — Builder Trust Index, City Ratings | SquareMind",
  description: "Independent, data-driven research on Indian real estate. Builder Trust Index, City Ratings, NRI Guides. Free to download.",
  openGraph: {
    title: "Real Estate Research Reports — Builder Trust Index, City Ratings",
    description: "Independent, data-driven research on Indian real estate. Free to download.",
    url: "/research",
  },
};

const reports = [
  {
    cover: "Builder\nTrust\nIndex\n2026",
    title: "The Builder Trust Index: Q1 2026",
    desc: "We analyzed RERA filings, delivery timelines, customer reviews, legal disputes, and financial health for India's top 50 builders. 68% scored below our \"investable\" threshold.",
    meta: "47 pages \u2022 Published March 2026 \u2022 4,200 downloads",
  },
  {
    cover: "India RE\nInvestment\nOutlook\nQ1 2026",
    title: "India Real Estate Investment Outlook: Q1 2026",
    desc: "City-by-city investment analysis covering appreciation data, rental yields, infrastructure pipeline, and risk factors. Which cities deserve your capital.",
    meta: "62 pages \u2022 Published March 2026 \u2022 3,800 downloads",
  },
  {
    cover: "NRI\nInvestment\nGuide\n2026",
    title: "The NRI Real Estate Investment Guide: 2026 Edition",
    desc: "Everything an NRI needs to know: FEMA regulations, taxation by country of residence, builder due diligence from abroad, Power of Attorney risks, and repatriation rules.",
    meta: "38 pages \u2022 Published February 2026 \u2022 2,600 downloads",
  },
];

export default function ResearchPage() {
  return (
    <>
      <div className="mx-auto max-w-[1200px] px-6 lg:px-14 pt-5">
        <nav className="text-[14px] text-gray-400" aria-label="Breadcrumb">
          <Link href="/" className="hover:text-sage transition-colors">Home</Link>
          <span className="mx-2">/</span><span>Research</span>
        </nav>
      </div>

      <section className="py-[120px] max-lg:py-20">
        <div className="mx-auto max-w-[1200px] px-6 lg:px-14">
          <FadeUp>
            <span className="text-[13px] font-semibold tracking-[0.08em] uppercase text-sage mb-4 block">Original Research</span>
            <h1 className="font-serif text-[clamp(36px,4.5vw,64px)] leading-[1.08] tracking-[-0.03em]">
              Reports that builders don&apos;t<br />want you to read.
            </h1>
            <p className="text-[18px] text-gray-500 max-w-[560px] mt-4 leading-[1.65] tracking-[-0.01em]">
              Independent, data-driven research on Indian real estate. Published quarterly. Free to download. No paywall, no agenda.
            </p>
          </FadeUp>

          <div className="mt-10 space-y-6">
            {reports.map((r, i) => (
              <FadeUp key={r.title} delay={i * 0.1}>
                <div className="bg-cream rounded-[20px] p-10 max-lg:p-7 flex flex-col sm:flex-row gap-7 items-center hover:-translate-y-1 hover:shadow-[0_20px_60px_rgba(0,0,0,0.06)] transition-all duration-400">
                  <div className="w-[130px] h-[172px] max-sm:w-full max-sm:h-[120px] shrink-0 bg-ink rounded-[12px] flex items-center justify-center text-white text-[11px] font-semibold text-center px-5 tracking-[0.04em] uppercase leading-[1.5] whitespace-pre-line">
                    {r.cover}
                  </div>
                  <div>
                    <h3 className="text-[20px] font-bold tracking-[-0.02em]">{r.title}</h3>
                    <p className="text-[15px] text-gray-500 mt-2.5 leading-relaxed tracking-[-0.01em]">{r.desc}</p>
                    <div className="text-[13px] text-gray-400 mt-3.5">{r.meta}</div>
                    <DownloadGate reportName={r.title} />
                  </div>
                </div>
              </FadeUp>
            ))}
          </div>
        </div>
      </section>

      <section className="pb-[120px] max-lg:pb-20">
        <div className="mx-auto max-w-[1200px] px-6 lg:px-14">
          <FadeUp>
            <div className="bg-ink rounded-[28px] py-20 px-12 max-lg:py-12 max-lg:px-7 text-center">
              <h2 className="font-serif text-[clamp(32px,3.5vw,48px)] tracking-[-0.03em] text-white">Want a personalized analysis?</h2>
              <p className="text-[18px] text-white/65 mt-4 mb-9 max-w-[500px] mx-auto tracking-[-0.01em]">
                Our reports cover the market. Our advisors cover YOUR specific investment. Book a free call.
              </p>
              <Link href="/consultation" className="inline-flex items-center gap-2 bg-white text-ink px-9 py-4 rounded-full text-[16px] font-bold hover:bg-cream hover:scale-[1.03] transition-all duration-300 tracking-[-0.01em]">
                Get Personalized Analysis
              </Link>
            </div>
          </FadeUp>
        </div>
      </section>
    </>
  );
}
