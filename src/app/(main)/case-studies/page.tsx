import type { Metadata } from "next";
import Link from "next/link";
import FadeUp from "@/components/FadeUp";

export const metadata: Metadata = {
  title: "Real Estate Investment Case Studies — NRI & HNI Outcomes | SquareMind",
  description: "Real case studies showing how investors made smarter decisions with SquareMind. Anonymized but detailed. Real scenarios, real numbers, real outcomes.",
  openGraph: {
    title: "Real Estate Investment Case Studies — NRI & HNI Outcomes",
    description: "Real case studies showing how investors made smarter decisions with SquareMind.",
    url: "/case-studies",
  },
};

const cases = [
  {
    badge: "NRI INVESTMENT",
    amount: "\u20B93.2 Crore \u2022 Bangalore + Pune",
    title: "How an NRI Couple Allocated \u20B93.2Cr Across Two Cities With a 14% Projected IRR",
    desc: "A couple based in Toronto wanted to invest in Indian real estate but had no trusted source of advice. Their family's broker was pushing a single project in Gurgaon with a 4-year delivery timeline. Our analysis revealed the builder had delayed 3 of 5 previous projects. We recommended a diversified approach: 60% in a ready-to-move Bangalore property (Whitefield corridor) and 40% in a Pune project (Hinjewadi Phase 3) from a builder with 95% on-time delivery. Projected blended IRR: 14.2%.",
  },
  {
    badge: "INVESTMENT PREVENTED",
    amount: "\u20B91.8 Crore \u2022 Saved from bad deal",
    title: "How We Saved an IT Director \u20B91.8Cr by Recommending He NOT Invest",
    desc: "An IT Director in Bangalore was about to book a \u20B91.8Cr flat in a Noida project his broker strongly recommended. Our due diligence revealed: the builder had 3 ongoing RERA complaints, a debt-to-equity ratio of 4.2x, and the micro-market showed declining prices for 6 consecutive quarters. We advised against the investment. He instead allocated \u20B91.2Cr to a Bangalore East project and \u20B960L to REITs for liquidity.",
  },
  {
    badge: "PORTFOLIO STRATEGY",
    amount: "\u20B98 Crore \u2022 Multi-city allocation",
    title: "A Business Owner's \u20B98Cr Real Estate Portfolio \u2014 Designed for Income and Appreciation",
    desc: "A textile business owner in Surat wanted to allocate \u20B98Cr to real estate for both rental income and capital appreciation. We designed a portfolio: 40% commercial (Bangalore IT corridor), 30% luxury residential (Mumbai suburbs), 20% pre-leased retail (Pune), and 10% REITs. Projected annual cash yield: 4.8%. Projected 5-year capital appreciation: 48-62%.",
  },
];

export default function CaseStudiesPage() {
  return (
    <>
      <div className="mx-auto max-w-[1200px] px-6 lg:px-14 pt-5">
        <nav className="text-[14px] text-gray-400" aria-label="Breadcrumb">
          <Link href="/" className="hover:text-sage transition-colors">Home</Link>
          <span className="mx-2">/</span><span>Case Studies</span>
        </nav>
      </div>

      <section className="py-[120px] max-lg:py-20">
        <div className="mx-auto max-w-[1200px] px-6 lg:px-14">
          <FadeUp>
            <span className="text-[13px] font-semibold tracking-[0.08em] uppercase text-sage mb-4 block">Real Outcomes</span>
            <h1 className="font-serif text-[clamp(36px,4.5vw,64px)] leading-[1.08] tracking-[-0.03em]">
              How real investors made<br />smarter decisions with SquareMind.
            </h1>
            <p className="text-[18px] text-gray-500 max-w-[560px] mt-4 leading-[1.65] tracking-[-0.01em]">
              Anonymized case studies showing our advisory process, analysis, and results. Real scenarios. Real numbers. Real outcomes.
            </p>
          </FadeUp>

          <div className="mt-10 space-y-6">
            {cases.map((c, i) => (
              <FadeUp key={c.title} delay={i * 0.1}>
                <div className="bg-cream rounded-[20px] p-11 max-lg:p-7 hover:-translate-y-1 hover:shadow-[0_20px_60px_rgba(0,0,0,0.06)] transition-all duration-400">
                  <div className="flex flex-wrap gap-3 items-center mb-4">
                    <span className="bg-white text-sage px-3.5 py-1.5 rounded-full text-[12px] font-bold">{c.badge}</span>
                    <span className="text-gray-400 text-[14px]">{c.amount}</span>
                  </div>
                  <h3 className="text-[22px] font-bold tracking-[-0.02em] mb-2.5">{c.title}</h3>
                  <p className="text-[15px] text-gray-500 leading-[1.65] tracking-[-0.01em]">{c.desc}</p>
                  <span className="inline-flex items-center gap-1.5 text-[14px] text-ink font-semibold mt-5 border-b-[1.5px] border-ink pb-0.5 hover:text-sage hover:border-sage transition-all duration-300 cursor-pointer">
                    Read Full Case Study &rarr;
                  </span>
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
              <h2 className="font-serif text-[clamp(32px,3.5vw,48px)] tracking-[-0.03em] text-white">Want your own success story?</h2>
              <p className="text-[18px] text-white/65 mt-4 mb-9 max-w-[500px] mx-auto tracking-[-0.01em]">
                Every case study started with a free 30-minute call. Yours could be next.
              </p>
              <Link href="/consultation" className="inline-flex items-center gap-2 bg-white text-ink px-9 py-4 rounded-full text-[16px] font-bold hover:bg-cream hover:scale-[1.03] transition-all duration-300 tracking-[-0.01em]">
                Start your own success story
              </Link>
            </div>
          </FadeUp>
        </div>
      </section>
    </>
  );
}
