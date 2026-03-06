import type { Metadata } from "next";
import Link from "next/link";
import FadeUp from "@/components/FadeUp";

export const metadata: Metadata = {
  title: "Real Estate Investment Frameworks — Due Diligence, City Selection | SquareMind",
  description: "Proprietary real estate investment frameworks: 7-Point Due Diligence, City Selection Matrix, Builder Trust Score, Portfolio Allocation Model.",
};

const frameworks = [
  {
    title: "The 7-Point Due Diligence Framework",
    desc: "The systematic checklist for evaluating any property before committing a single rupee. Covers legal, financial, builder, location, project, market timing, and exit analysis.",
    steps: ["1. RERA Compliance", "2. Builder Track Record", "3. Title Verification", "4. Financial Health", "5. Location Fundamentals", "6. Pricing Validation", "7. Exit Strategy"],
  },
  {
    title: "The City Selection Matrix",
    desc: "How to objectively compare Indian cities for real estate investment. Weighted scoring model across 8 factors that actually determine long-term returns.",
    steps: ["Economic Growth", "Infrastructure Pipeline", "Demand-Supply Gap", "Rental Yield", "Regulatory Environment", "Builder Quality", "Price-to-Income Ratio", "Exit Liquidity"],
  },
  {
    title: "The Builder Trust Score",
    desc: 'A quantitative model to evaluate builder reliability. Because "reputed builder" means nothing without data behind it.',
    steps: ["Delivery History", "RERA Compliance Rate", "Legal Dispute Record", "Financial Stability", "Customer Sentiment", "Quality Consistency"],
  },
  {
    title: "RE Portfolio Allocation Model",
    desc: "How much of your total wealth should be in real estate? And how should that allocation be distributed across cities, asset types, and risk profiles?",
    steps: ["Net Worth Analysis", "Liquidity Needs", "Risk Tolerance", "Geographic Diversification", "Asset Type Mix", "Time Horizon"],
  },
];

export default function FrameworksPage() {
  return (
    <>
      <div className="mx-auto max-w-[1200px] px-6 lg:px-14 pt-5">
        <nav className="text-[14px] text-gray-400" aria-label="Breadcrumb">
          <Link href="/" className="hover:text-sage transition-colors">Home</Link>
          <span className="mx-2">/</span><span>Frameworks</span>
        </nav>
      </div>

      <section className="py-[120px] max-lg:py-20">
        <div className="mx-auto max-w-[1200px] px-6 lg:px-14">
          <FadeUp>
            <span className="text-[13px] font-semibold tracking-[0.08em] uppercase text-sage mb-4 block">Proprietary Frameworks</span>
            <h1 className="font-serif text-[clamp(36px,4.5vw,64px)] leading-[1.08] tracking-[-0.03em]">
              Think like an institutional investor.<br />Not like a retail buyer.
            </h1>
            <p className="text-[18px] text-gray-500 max-w-[560px] mt-4 leading-[1.65] tracking-[-0.01em]">
              These are the exact frameworks our advisors use to evaluate every real estate investment. We&apos;re making them public because transparency is how trust is built.
            </p>
          </FadeUp>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-12">
            {frameworks.map((f, i) => (
              <FadeUp key={f.title} delay={i * 0.1}>
                <div className="bg-cream rounded-[20px] p-10 max-lg:p-7 hover:-translate-y-1 transition-transform duration-400">
                  <h3 className="text-[19px] font-bold tracking-[-0.02em] mb-2.5">{f.title}</h3>
                  <p className="text-[15px] text-gray-500 leading-relaxed tracking-[-0.01em]">{f.desc}</p>
                  <div className="flex flex-wrap gap-2 mt-[18px]">
                    {f.steps.map((step) => (
                      <span key={step} className="text-[12px] font-semibold bg-white text-sage px-3 py-1.5 rounded-full">{step}</span>
                    ))}
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
              <h2 className="font-serif text-[clamp(32px,3.5vw,48px)] tracking-[-0.03em] text-white">Want these frameworks applied to your investment?</h2>
              <p className="text-[18px] text-white/65 mt-4 mb-9 max-w-[500px] mx-auto tracking-[-0.01em]">
                Our advisors use these exact models for every client. Get a personalized analysis in a free 30-minute call.
              </p>
              <Link href="/consultation" className="inline-flex items-center gap-2 bg-white text-ink px-9 py-4 rounded-full text-[16px] font-bold hover:bg-cream hover:scale-[1.03] transition-all duration-300 tracking-[-0.01em]">
                Get These Frameworks Applied &rarr;
              </Link>
            </div>
          </FadeUp>
        </div>
      </section>
    </>
  );
}
