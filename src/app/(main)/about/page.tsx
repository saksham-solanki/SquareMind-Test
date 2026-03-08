import type { Metadata } from "next";
import Link from "next/link";
import FadeUp from "@/components/FadeUp";

export const metadata: Metadata = {
  title: "About SquareMind — India's Independent Real Estate Investment Advisory",
  description: "Why SquareMind exists: every source of real estate advice in India has a hidden incentive. We built India's first independent, data-backed real estate advisory to fix that.",
  openGraph: {
    title: "About SquareMind — India's Independent Real Estate Investment Advisory",
    description: "Why SquareMind exists: every source of real estate advice in India has a hidden incentive.",
    url: "/about",
  },
};

const values = [
  { icon: "\uD83C\uDFAF", title: "Investor-First. Always.", desc: "We get paid by investors, not builders. Our incentive is to protect your money, not to sell you a property." },
  { icon: "\uD83D\uDCCA", title: "Data Over Opinions", desc: "Every recommendation comes with data you can verify. If we can't prove it with numbers, we don't say it." },
  { icon: "\uD83D\uDD0D", title: "Radical Transparency", desc: "We publish our research. We expose industry practices. We tell you what others won't." },
  { icon: "\uD83E\uDD1D", title: "Zero Spam. Full Stop.", desc: "We will never cold-call you. We will never share your number. You reach out to us. That's how trust works." },
];

export default function AboutPage() {
  return (
    <>
      {/* Breadcrumb */}
      <div className="mx-auto max-w-[1200px] px-6 lg:px-14 pt-5">
        <nav className="text-[14px] text-gray-400" aria-label="Breadcrumb">
          <Link href="/" className="hover:text-sage transition-colors">Home</Link>
          <span className="mx-2">/</span>
          <span>About</span>
        </nav>
      </div>

      {/* Story */}
      <section className="py-[120px] max-lg:py-20">
        <div className="mx-auto max-w-[1200px] px-6 lg:px-14">
          <FadeUp>
            <span className="text-[13px] font-semibold tracking-[0.08em] uppercase text-sage mb-4 block">Our Story</span>
            <h1 className="font-serif text-[clamp(36px,4.5vw,64px)] leading-[1.08] tracking-[-0.03em] max-w-[700px]">
              We got tired of watching<br />smart people make dumb<br />real estate decisions.
            </h1>
          </FadeUp>
          <FadeUp delay={0.1}>
            <div className="max-w-[700px] font-serif text-[24px] leading-[1.7] text-gray-500 mt-12 space-y-6">
              <p>Not because they were careless. But because <strong className="text-ink">every source of real estate advice in India has a hidden incentive.</strong></p>
              <p>Brokers earn 2-4% commission from builders. The more expensive the property they sell you, the more they earn. Portals like 99acres and MagicBricks sell advertising to builders. The projects you see first? <strong className="text-ink">They paid to be there.</strong></p>
              <p>YouTube &quot;experts&quot; get paid for project reviews. Instagram influencers get paid per walkthrough. Financial advisors know stocks and mutual funds &mdash; but treat real estate as an afterthought.</p>
              <p><strong className="text-ink">Nobody is paid to tell you the truth.</strong></p>
              <p>SquareMind was built to fix that. We are India&apos;s first independent real estate investment advisory. We don&apos;t sell properties. We don&apos;t accept builder commissions. We don&apos;t run ads for developers. Our only client is <strong className="text-ink">you, the investor.</strong></p>
              <p>We use data &mdash; RERA filings, market transactions, builder track records, financial analysis &mdash; to give you advice that&apos;s backed by evidence, not relationships.</p>
              <p>That&apos;s why we exist. <strong className="text-ink">To be the advisor we wished we had.</strong></p>
            </div>
          </FadeUp>
        </div>
      </section>

      {/* Values */}
      <section className="py-[120px] max-lg:py-20 border-t border-gray-200">
        <div className="mx-auto max-w-[1200px] px-6 lg:px-14">
          <FadeUp>
            <span className="text-[13px] font-semibold tracking-[0.08em] uppercase text-sage mb-4 block">What We Stand For</span>
            <h2 className="font-serif text-[clamp(36px,4.5vw,64px)] leading-[1.08] tracking-[-0.03em]">Four principles. Zero exceptions.</h2>
          </FadeUp>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mt-12">
            {values.map((v, i) => (
              <FadeUp key={v.title} delay={i * 0.1}>
                <div className="bg-cream rounded-[20px] p-9 max-lg:p-7 hover:-translate-y-1 transition-transform duration-400">
                  <div className="text-[28px]">{v.icon}</div>
                  <h4 className="text-[18px] font-bold mt-3.5 mb-2.5 tracking-[-0.02em]">{v.title}</h4>
                  <p className="text-[14px] text-gray-500 leading-relaxed tracking-[-0.01em]">{v.desc}</p>
                </div>
              </FadeUp>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="pb-[120px] max-lg:pb-20">
        <div className="mx-auto max-w-[1200px] px-6 lg:px-14">
          <FadeUp>
            <div className="bg-ink rounded-[28px] py-20 px-12 max-lg:py-12 max-lg:px-7 text-center">
              <h2 className="font-serif text-[clamp(32px,3.5vw,48px)] tracking-[-0.03em] text-white">Have a real estate investment question?</h2>
              <p className="text-[18px] text-white/65 mt-4 mb-9 max-w-[500px] mx-auto tracking-[-0.01em]">
                Our advisors have helped 1,200+ investors make data-backed decisions. Yours could be next.
              </p>
              <Link href="/consultation" className="inline-flex items-center gap-2 bg-white text-ink px-9 py-4 rounded-full text-[16px] font-bold hover:bg-cream hover:scale-[1.03] transition-all duration-300 tracking-[-0.01em]">
                Talk to an Independent Advisor &rarr;
              </Link>
            </div>
          </FadeUp>
        </div>
      </section>
    </>
  );
}
