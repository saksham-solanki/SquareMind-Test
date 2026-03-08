import type { Metadata } from "next";
import Link from "next/link";
import FadeUp from "@/components/FadeUp";
import HeroForm from "@/components/HeroForm";
import NewsletterForm from "@/components/NewsletterForm";

export const metadata: Metadata = {
  title: "SquareMind — India's Independent Real Estate Investment Advisory",
  description:
    "India's first independent real estate investment advisory. Zero builder commissions. Data-backed advice for HNIs and NRIs. Book a free strategy call today.",
  openGraph: {
    title: "SquareMind — India's Independent Real Estate Investment Advisory",
    description: "Zero builder commissions. Data-backed real estate advice for serious investors.",
    url: "/",
  },
};

const stats = [
  { number: "\u20B9240Cr+", label: "Investment decisions guided" },
  { number: "4.9 \u2605", label: "Google rating" },
  { number: "1,200+", label: "Investors advised" },
  { number: "Zero", label: "Builder commissions" },
];

const contrastLeft = [
  "Brokers pushing projects they earn highest commission on",
  '"Market insights" that are actually builder advertisements',
  "Carpet area manipulation you don't discover until possession",
  '"Pre-launch" pricing designed to create artificial urgency',
  "Endless spam calls the moment you show interest",
  'No data. No analysis. Just "trust me, sir"',
];

const contrastRight = [
  "Independent advice. We earn zero commission from any builder.",
  "Data-backed research from RERA filings, market data, and financial analysis.",
  "Full due diligence frameworks you can verify yourself.",
  "Honest pricing analysis with comparable market data.",
  "Zero spam. You contact us, not the other way around.",
  "Every recommendation comes with data you can audit.",
];

const steps = [
  { num: "01", title: "Book a free call", desc: "30 minutes with a real estate investment advisor. Not a salesperson. Not a broker. An advisor who's paid to think, not sell." },
  { num: "02", title: "Get your strategy", desc: "We build a personalized investment thesis \u2014 which cities, which asset types, which price points, what to avoid. Backed by data from our proprietary research." },
  { num: "03", title: "Invest with confidence", desc: "Execute your strategy with complete clarity. We guide you through due diligence, RERA verification, builder evaluation, and negotiation." },
];

const audiences = [
  { icon: "\uD83C\uDF0E", title: "NRI Investors", desc: "Investing from the US, UK, Canada, UAE, or Singapore. Navigate FEMA, taxation, and builder reliability from abroad." },
  { icon: "\uD83D\uDCBC", title: "Business Owners & HNIs", desc: "Allocating \u20B91Cr+ to real estate as part of a larger wealth strategy. Portfolio-level thinking, not project-level selling." },
  { icon: "\u26A1", title: "Tech Professionals", desc: "High-income professionals in Bangalore, Hyderabad, Pune, and Gurgaon. Data-driven mindset. Allergic to broker BS." },
  { icon: "\uD83C\uDFE5", title: "Doctors & Professionals", desc: "High earning, time-poor. Need someone trustworthy to handle the research, analysis, and due diligence." },
];

const testimonials = [
  {
    text: "I was about to invest \u20B91.8Cr in a Noida project my broker recommended. SquareMind's analysis showed the builder had delayed 4 of 6 previous projects. Saved me from a nightmare.",
    name: "Rajesh K.",
    role: "IT Director, Bangalore \u2022 Invested \u20B92.1Cr",
  },
  {
    text: "As an NRI in Toronto, I had zero visibility into which builders were reliable. SquareMind gave me a data sheet comparing 8 projects across 3 cities. First time someone treated me like an investor, not a target.",
    name: "Priya & Sanjay M.",
    role: "NRI Couple, Canada \u2022 Invested \u20B93.2Cr",
  },
  {
    text: "The consultation was genuinely free. No upsell, no hidden agenda. They told me NOT to invest in commercial property given my timeline. That honesty is what made me come back.",
    name: "Dr. Meera S.",
    role: "Surgeon, Mumbai \u2022 Invested \u20B91.5Cr",
  },
];

const articles = [
  { tag: "Dark Truth", title: "We Checked 50 Builders' Delivery Timelines. Only 12 Delivered On Time.", meta: "8 min read \u2022 12,400 views" },
  { tag: "Investment Strategy", title: "Real Estate vs Nifty vs Gold: A 10-Year Return Comparison With Actual Data", meta: "12 min read \u2022 8,200 views" },
  { tag: "NRI Guide", title: "The Complete NRI Guide to Indian Real Estate: FEMA, Tax, and Everything In Between", meta: "15 min read \u2022 6,800 views" },
];

export default function HomePage() {
  return (
    <>
      {/* HERO */}
      <section className="pb-20">
        <div className="mx-auto max-w-[1200px] px-6 lg:px-14">
          <div className="flex flex-col lg:flex-row items-center justify-between min-h-[calc(92vh-80px)] gap-12 lg:gap-20 pt-10">
            <div className="flex-1">
              <FadeUp>
                <h1 className="text-[13px] font-semibold tracking-[0.08em] uppercase text-sage mb-4 block">
                  India&apos;s Independent Real Estate Advisory
                </h1>
              </FadeUp>
              <FadeUp delay={0.05}>
                <h2 className="font-serif text-[clamp(48px,6.5vw,88px)] leading-[1.04] tracking-[-0.035em] text-ink max-w-[900px]">
                  Invest in real estate<br /><em className="italic text-sage">with your eyes open.</em>
                </h2>
              </FadeUp>
              <FadeUp delay={0.1}>
                <p className="text-[20px] leading-[1.65] text-gray-500 max-w-[560px] mt-7 tracking-[-0.01em]">
                  India&apos;s first independent real estate investment advisory. We don&apos;t sell properties. We don&apos;t take builder commissions. We help you make decisions you won&apos;t regret.
                </p>
              </FadeUp>
              <FadeUp delay={0.15}>
                <div className="flex gap-4 mt-11 flex-wrap items-center">
                  <Link href="/consultation" className="inline-flex items-center gap-2 bg-ink text-white px-9 py-4 rounded-full text-[16px] font-semibold tracking-[-0.01em] hover:bg-sage hover:scale-[1.03] transition-all duration-300">
                    Get my free strategy session
                  </Link>
                  <Link href="/research" className="text-[16px] font-semibold text-ink inline-flex items-center gap-1.5 border-b-[1.5px] border-ink pb-0.5 hover:text-sage hover:border-sage transition-all duration-300 tracking-[-0.01em]">
                    Read our research &rarr;
                  </Link>
                </div>
                <div className="mt-3.5 text-[13px] text-gray-500 tracking-[-0.01em] flex items-center gap-2">
                  <span className="text-sage font-bold">&#10003;</span> 100% Free. No spam guarantee.
                </div>
              </FadeUp>
              <FadeUp delay={0.2}>
                <p className="text-[14px] text-gray-400 mt-16 pt-10 border-t border-gray-200 tracking-[-0.01em]">
                  Free. Confidential. No sales pitch.
                </p>
              </FadeUp>
            </div>
            <FadeUp delay={0.15}>
              <HeroForm />
            </FadeUp>
          </div>
        </div>
      </section>

      {/* STATS BAR */}
      <FadeUp>
        <div className="grid grid-cols-2 lg:grid-cols-4 border-t border-b border-gray-200">
          {stats.map((s, i) => (
            <div key={s.label} className={`py-12 px-6 lg:px-10 text-center ${i < 3 ? "border-r border-gray-200 max-lg:[&:nth-child(2)]:border-r-0" : ""}`}>
              <div className="font-serif text-[clamp(40px,4vw,56px)] tracking-[-0.03em] leading-none text-ink">{s.number}</div>
              <div className="text-[14px] text-gray-400 mt-2 tracking-[-0.01em]">{s.label}</div>
            </div>
          ))}
        </div>
      </FadeUp>

      {/* WHY WE EXIST */}
      <section className="py-[120px] max-lg:py-20">
        <div className="mx-auto max-w-[1200px] px-6 lg:px-14">
          <FadeUp>
            <span className="text-[13px] font-semibold tracking-[0.08em] uppercase text-sage mb-4 block">Why SquareMind Exists</span>
            <h2 className="font-serif text-[clamp(36px,4.5vw,64px)] leading-[1.08] tracking-[-0.03em]">
              Real estate advice in India<br />is fundamentally broken.
            </h2>
            <p className="text-[18px] text-gray-500 max-w-[560px] mt-4 leading-[1.65] tracking-[-0.01em]">
              Every broker, every portal, every &quot;advisor&quot; earns commission from the builder. Their incentive is to sell you a property &mdash; not to protect your investment.
            </p>
          </FadeUp>
          <FadeUp delay={0.1}>
            <div className="grid grid-cols-1 md:grid-cols-2 rounded-[20px] overflow-hidden mt-12">
              <div className="bg-ink text-white p-12 max-lg:p-8">
                <h3 className="text-[20px] font-bold mb-7 tracking-[-0.02em] flex items-center gap-2">What you&apos;re used to</h3>
                {contrastLeft.map((item) => (
                  <div key={item} className="py-3.5 border-b border-white/[0.06] text-[15px] leading-relaxed tracking-[-0.01em] flex items-start gap-3">
                    <span className="text-red font-bold shrink-0">&#10005;</span>
                    {item}
                  </div>
                ))}
              </div>
              <div className="bg-white p-12 max-lg:p-8">
                <h3 className="text-[20px] font-bold mb-7 tracking-[-0.02em] flex items-center gap-2">The SquareMind approach</h3>
                {contrastRight.map((item) => (
                  <div key={item} className="py-3.5 border-b border-gray-200 text-[15px] text-gray-500 leading-relaxed tracking-[-0.01em] flex items-start gap-3">
                    <span className="text-sage font-bold shrink-0">&#10003;</span>
                    {item}
                  </div>
                ))}
              </div>
            </div>
          </FadeUp>
        </div>
      </section>

      {/* HOW IT WORKS */}
      <section className="bg-cream py-[120px] max-lg:py-20">
        <div className="mx-auto max-w-[1200px] px-6 lg:px-14">
          <FadeUp>
            <span className="text-[13px] font-semibold tracking-[0.08em] uppercase text-sage mb-4 block">How It Works</span>
            <h2 className="font-serif text-[clamp(36px,4.5vw,64px)] leading-[1.08] tracking-[-0.03em]">
              Three steps to<br />investing smarter.
            </h2>
            <p className="text-[18px] text-gray-500 max-w-[560px] mt-4 leading-[1.65] tracking-[-0.01em]">
              No paperwork. No pressure. Just a conversation with someone who&apos;s on your side.
            </p>
          </FadeUp>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-14">
            {steps.map((step, i) => (
              <FadeUp key={step.num} delay={i * 0.1}>
                <div className="bg-cream-dark rounded-[20px] p-11 max-lg:p-8 relative hover:-translate-y-1 transition-transform duration-400">
                  <span className="absolute top-6 right-7 font-serif text-[56px] text-cream-dark leading-none" style={{ color: "rgba(237,229,216,1)" }}>{step.num}</span>
                  <h3 className="font-serif text-[24px] tracking-[-0.02em] mt-2 mb-3.5">{step.title}</h3>
                  <p className="text-[15px] text-gray-500 leading-[1.65] tracking-[-0.01em]">{step.desc}</p>
                </div>
              </FadeUp>
            ))}
          </div>
        </div>
      </section>

      {/* WHO WE SERVE */}
      <section className="bg-ink py-[120px] max-lg:py-20">
        <div className="mx-auto max-w-[1200px] px-6 lg:px-14">
          <FadeUp>
            <span className="text-[13px] font-semibold tracking-[0.08em] uppercase text-sage-muted mb-4 block">Built for Serious Investors</span>
            <h2 className="font-serif text-[clamp(36px,4.5vw,64px)] leading-[1.08] tracking-[-0.03em] text-white">
              We work with people who invest<br />with their brain, not their emotions.
            </h2>
          </FadeUp>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 mt-12">
            {audiences.map((a, i) => (
              <FadeUp key={a.title} delay={i * 0.1}>
                <div className="border border-white/[0.08] rounded-[20px] p-8 hover:border-white/20 hover:-translate-y-1 hover:bg-white/[0.03] transition-all duration-400">
                  <div className="text-[32px] mb-4">{a.icon}</div>
                  <h4 className="text-white text-[17px] font-semibold tracking-[-0.02em]">{a.title}</h4>
                  <p className="text-gray-400 text-[14px] mt-2 leading-relaxed tracking-[-0.01em]">{a.desc}</p>
                </div>
              </FadeUp>
            ))}
          </div>
        </div>
      </section>

      {/* TESTIMONIALS */}
      <section className="py-[120px] max-lg:py-20">
        <div className="mx-auto max-w-[1200px] px-6 lg:px-14">
          <FadeUp>
            <span className="text-[13px] font-semibold tracking-[0.08em] uppercase text-sage mb-4 block">What Investors Say</span>
            <h2 className="font-serif text-[clamp(36px,4.5vw,64px)] leading-[1.08] tracking-[-0.03em]">
              Trusted by investors who<br />don&apos;t trust easily.
            </h2>
          </FadeUp>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-12">
            {testimonials.map((t, i) => (
              <FadeUp key={t.name} delay={i * 0.1}>
                <div className="bg-cream rounded-[20px] p-10 max-lg:p-8 hover:-translate-y-1 transition-transform duration-400">
                  <div className="text-gold text-[16px] mb-4 tracking-[3px]">{"\u2605\u2605\u2605\u2605\u2605"}</div>
                  <p className="font-serif text-[18px] leading-[1.55] text-ink italic tracking-[-0.01em]">&ldquo;{t.text}&rdquo;</p>
                  <div className="mt-6 pt-5 border-t border-cream-dark">
                    <div className="text-[15px] font-semibold tracking-[-0.01em]">{t.name}</div>
                    <div className="text-[13px] text-gray-400 mt-0.5">{t.role}</div>
                  </div>
                </div>
              </FadeUp>
            ))}
          </div>
        </div>
      </section>

      {/* LATEST RESEARCH */}
      <section className="bg-cream py-[120px] max-lg:py-20">
        <div className="mx-auto max-w-[1200px] px-6 lg:px-14">
          <FadeUp>
            <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-5">
              <div>
                <span className="text-[13px] font-semibold tracking-[0.08em] uppercase text-sage mb-4 block">Latest Research</span>
                <h2 className="font-serif text-[clamp(36px,4.5vw,64px)] leading-[1.08] tracking-[-0.03em]">
                  Insights you won&apos;t find<br />on a broker&apos;s WhatsApp.
                </h2>
              </div>
              <Link href="/insights" className="inline-flex items-center gap-2 bg-transparent text-ink px-9 py-4 rounded-full text-[16px] font-semibold border-[1.5px] border-gray-300 hover:border-ink hover:bg-ink hover:text-white transition-all duration-300 tracking-[-0.01em] mb-2">
                View all insights &rarr;
              </Link>
            </div>
          </FadeUp>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-12">
            {articles.map((a, i) => (
              <FadeUp key={a.title} delay={i * 0.1}>
                <Link href="/insights" className="block bg-cream-dark rounded-[20px] p-9 max-lg:p-7 hover:-translate-y-1 hover:shadow-[0_20px_60px_rgba(0,0,0,0.08)] transition-all duration-400">
                  <div className="text-[12px] font-semibold text-sage tracking-[0.06em] uppercase mb-3">{a.tag}</div>
                  <div className="font-serif text-[21px] leading-[1.3] text-ink tracking-[-0.02em]">{a.title}</div>
                  <div className="text-[13px] text-gray-400 mt-4">{a.meta}</div>
                </Link>
              </FadeUp>
            ))}
          </div>
        </div>
      </section>

      {/* NEWSLETTER */}
      <section className="py-[120px] max-lg:py-20">
        <div className="mx-auto max-w-[1200px] px-6 lg:px-14">
          <FadeUp>
            <div className="bg-cream rounded-[28px] py-[72px] px-12 max-lg:py-10 max-lg:px-7 text-center max-w-[720px] mx-auto">
              <h3 className="font-serif text-[36px] tracking-[-0.03em]">Get the 7-Point Due Diligence Checklist</h3>
              <p className="text-[16px] text-gray-500 mt-3 mb-7 tracking-[-0.01em]">
                The exact framework our advisors use to evaluate every property. Free PDF. Used by 1,200+ investors.
              </p>
              <NewsletterForm />
              <p className="text-[12px] text-gray-400 mt-3.5 tracking-[-0.01em]">
                Also get The SquareMind Brief &mdash; one insight per week. Unsubscribe anytime.
              </p>
            </div>
          </FadeUp>
        </div>
      </section>

      {/* FINAL CTA */}
      <section className="pb-[120px] max-lg:pb-20">
        <div className="mx-auto max-w-[1200px] px-6 lg:px-14">
          <FadeUp>
            <div className="bg-ink rounded-[28px] py-20 px-12 max-lg:py-12 max-lg:px-7 text-center">
              <h2 className="font-serif text-[clamp(32px,3.5vw,48px)] tracking-[-0.03em] text-white">Ready to invest smarter?</h2>
              <p className="text-[18px] text-white/65 mt-4 mb-9 max-w-[500px] mx-auto tracking-[-0.01em]">
                Book a free 30-minute strategy call. No sales pitch. No commitment. Just honest advice backed by data.
              </p>
              <Link href="/consultation" className="inline-flex items-center gap-2 bg-white text-ink px-9 py-4 rounded-full text-[16px] font-bold hover:bg-cream hover:scale-[1.03] transition-all duration-300 tracking-[-0.01em]">
                Talk to an independent advisor &rarr;
              </Link>
            </div>
          </FadeUp>
        </div>
      </section>
    </>
  );
}
