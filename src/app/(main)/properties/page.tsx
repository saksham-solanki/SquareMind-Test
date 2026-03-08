import type { Metadata } from "next";
import EOIForm from "@/components/EOIForm";
import FadeUp from "@/components/FadeUp";
import FAQ from "@/components/FAQ";

export const metadata: Metadata = {
  title: "SquareMind Properties — Verified Distressed Real Estate Deals",
  description:
    "India's first curated distressed property deal room. Verified deals at 15-35% below market. No broker spam. Sale guaranteed in 30 days.",
  openGraph: {
    title: "SquareMind Properties — Verified Distressed Real Estate Deals",
    description:
      "India's first curated distressed property deal room. Verified deals at 15-35% below market. No broker spam.",
    url: "/properties",
    siteName: "SquareMind",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "SquareMind Properties — Verified Distressed Real Estate Deals",
    description:
      "India's first curated distressed property deal room. Verified deals at 15-35% below market.",
  },
};

function Tag({ children, color = "sage" }: { children: React.ReactNode; color?: "sage" | "red" }) {
  const colors = {
    sage: "bg-sage-light text-sage",
    red: "bg-red-50 text-red-600",
  };
  return (
    <span className={`inline-block text-[13px] font-medium px-3 py-1 rounded-full ${colors[color]}`}>
      {children}
    </span>
  );
}

/* ─── HERO ─────────────────────────────────────────────────────── */
function HeroSection() {
  return (
    <section className="bg-chalk py-20 lg:py-28">
      <div className="mx-auto max-w-[1200px] px-5 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-start">
          {/* Left column */}
          <FadeUp>
            <div>
              {/* Coming soon pill */}
              <div className="inline-flex items-center gap-2 bg-sage-light text-sage text-[13px] font-medium px-4 py-1.5 rounded-full mb-8">
                <span className="relative flex h-2.5 w-2.5">
                  <span className="animate-pulse-dot absolute inline-flex h-full w-full rounded-full bg-sage opacity-75" />
                  <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-sage" />
                </span>
                Coming Soon — Join the Waitlist
              </div>

              <h1 className="font-serif text-[40px] lg:text-[56px] leading-[1.08] text-ink mb-6">
                Verified distressed deals.
                <br />
                <span className="italic text-sage">15–35% below market.</span>
                <br />
                No broker spam.
              </h1>

              <p className="text-gray-500 text-[17px] leading-relaxed max-w-[540px] mb-10">
                SquareMind Properties is India&apos;s first curated distressed property deal room.
                We verify every listing, vet every investor, and guarantee sellers a clean exit in 30
                days. No 100 broker calls. No garbage listings. Just real deals for serious investors.
              </p>

              {/* Stats */}
              <div className="grid grid-cols-3 border-t border-ink/10 pt-6 gap-4">
                {[
                  { value: "15–35%", label: "Below Market Price" },
                  { value: "30 Days", label: "Sale Guarantee" },
                  { value: "Zero", label: "Broker Involvement" },
                ].map((stat) => (
                  <div key={stat.label}>
                    <div className="font-serif text-[28px] lg:text-[32px] text-ink">{stat.value}</div>
                    <div className="text-gray-400 text-[13px] mt-0.5">{stat.label}</div>
                  </div>
                ))}
              </div>

              {/* CTA */}
              <a
                href="#form"
                className="inline-flex items-center mt-10 bg-sage text-white font-medium text-[15px] px-7 py-3.5 rounded-lg hover:bg-sage-deep transition-colors"
              >
                Get Early Access to Deals →
              </a>
            </div>
          </FadeUp>

          {/* Right column - EOI Form */}
          <FadeUp delay={0.15}>
            <EOIForm />
          </FadeUp>
        </div>
      </div>
    </section>
  );
}

/* ─── PROBLEM ──────────────────────────────────────────────────── */
function ProblemSection() {
  const cards = [
    {
      number: "80+",
      title: "Broker calls in 24 hours",
      body: "List on 99acres. Within a day, your phone is flooded. 90% are brokers fishing for exclusivity, not buyers. The 2-3 genuine calls get lost in the noise.",
    },
    {
      number: "70%",
      title: "Listings are broker duplicates",
      body: "Same property appears 5 times at different prices. No verification. No documents. Just photos and a phone number. Investors waste weeks chasing ghost listings.",
    },
    {
      number: "12+",
      title: "Months to sell distressed property",
      body: "Sellers with genuine urgency — relocation, financial pressure, dead inventory — get stuck for 6-12 months because platforms can't filter serious buyers from noise.",
    },
  ];

  return (
    <section className="bg-ink py-20 lg:py-28">
      <div className="mx-auto max-w-[1200px] px-5 lg:px-8">
        <FadeUp>
          <Tag color="red">Why This Exists</Tag>
          <h2 className="font-serif text-[32px] lg:text-[44px] leading-[1.1] text-white mt-4 mb-12 max-w-[700px]">
            Property marketplaces in India are broken. Here&apos;s what actually happens.
          </h2>
        </FadeUp>

        <div className="grid md:grid-cols-3 gap-5">
          {cards.map((card, i) => (
            <FadeUp key={card.title} delay={i * 0.1}>
              <div className="rounded-2xl border border-white/10 bg-white/5 backdrop-blur-sm p-7 lg:p-8 hover:-translate-y-0.5 hover:shadow-lg transition-all duration-200">
                <div className="font-serif text-[44px] text-red-400/70 mb-3">{card.number}</div>
                <h3 className="text-white text-[18px] font-medium mb-2">{card.title}</h3>
                <p className="text-white/60 text-[15px] leading-relaxed">{card.body}</p>
              </div>
            </FadeUp>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ─── HOW IT WORKS ─────────────────────────────────────────────── */
function HowItWorksSection() {
  const steps = [
    {
      step: "01",
      icon: "🔍",
      title: "We Source Distressed Deals",
      body: "Investors exiting, owners relocating, properties stuck in resale, financial pressure situations. We find sellers who need a fast, clean exit — not casual 'testing the market' listings.",
    },
    {
      step: "02",
      icon: "✅",
      title: "We Verify Everything",
      body: "Title deed, encumbrance certificate, RERA status, tax receipts, physical inspection. If anything is off, the property doesn't make it to the platform. Our reputation is the product.",
    },
    {
      step: "03",
      icon: "📊",
      title: "Full Analytics Per Deal",
      body: "Market price estimate. Discount percentage. Rental yield. Liquidity score. Area intelligence. Comparable sales. Everything you need to decide — without calling a single broker.",
    },
    {
      step: "04",
      icon: "⚡",
      title: "Vetted Investors Only",
      body: "Budget-confirmed, OTP-verified investors who actually close deals. No tourists, no brokers, no tire-kickers. Sellers get 3-5 serious inquiries, not 100 spam calls.",
    },
  ];

  const promiseItems = [
    "Seller talks to SquareMind only. Zero buyer spam.",
    "Every property listed at genuine 15-35% below market.",
    "We guarantee sale within 30 days or we review pricing.",
    "2-3 serious investor bids, not 100 broker calls.",
    "End-to-end support: listing → auction → registration.",
  ];

  return (
    <section className="bg-chalk py-20 lg:py-28">
      <div className="mx-auto max-w-[1200px] px-5 lg:px-8">
        <FadeUp>
          <Tag>How It Works</Tag>
          <h2 className="font-serif text-[32px] lg:text-[44px] leading-[1.1] text-ink mt-4 mb-2">
            Not a marketplace.
            <br />
            A curated deal room.
          </h2>
          <p className="text-gray-500 text-[17px] leading-relaxed max-w-[600px] mb-14">
            We reject 60-70% of submissions. Only genuine distressed deals with verified documents
            make it to our investors.
          </p>
        </FadeUp>

        {/* 2x2 grid */}
        <div className="grid md:grid-cols-2 gap-5 mb-5">
          {steps.map((step, i) => (
            <FadeUp key={step.step} delay={i * 0.08}>
              <div className="relative bg-white rounded-2xl border border-ink/5 p-7 lg:p-8 hover:-translate-y-0.5 hover:shadow-md transition-all duration-200">
                <span className="absolute top-6 right-7 font-serif text-[48px] text-sage-light leading-none">
                  {step.step}
                </span>
                <span className="text-[28px] block mb-4">{step.icon}</span>
                <h3 className="text-ink text-[18px] font-semibold mb-2">{step.title}</h3>
                <p className="text-gray-500 text-[15px] leading-relaxed pr-12">{step.body}</p>
              </div>
            </FadeUp>
          ))}
        </div>

        {/* Full-width Step 05 */}
        <FadeUp delay={0.35}>
          <div className="bg-sage rounded-2xl p-8 lg:p-12">
            <div className="grid lg:grid-cols-2 gap-8 lg:gap-12">
              <div>
                <span className="font-serif text-[48px] text-white/20 leading-none block mb-4">05</span>
                <h3 className="font-serif text-[28px] lg:text-[32px] text-white leading-tight mb-3">
                  Transparent Auction. Deal Closes in 30 Days.
                </h3>
                <p className="text-white/70 text-[16px] leading-relaxed">
                  Properties are auctioned to verified investors with full bid transparency. No opaque
                  negotiation. No broker playing both sides. The best price wins. We handhold both
                  sides through documentation, legal, and registration.
                </p>
              </div>
              <div className="bg-white/12 rounded-xl p-6 lg:p-8">
                <h4 className="font-serif text-[20px] text-white mb-4">The SquareMind Promise</h4>
                <ul className="space-y-3">
                  {promiseItems.map((item) => (
                    <li key={item} className="flex items-start gap-3 text-white text-[15px] leading-relaxed">
                      <svg className="w-5 h-5 shrink-0 mt-0.5 text-white/80" viewBox="0 0 20 20" fill="currentColor">
                        <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                      </svg>
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </FadeUp>
      </div>
    </section>
  );
}

/* ─── WHAT INVESTORS GET ───────────────────────────────────────── */
function InvestorsGetSection() {
  const cards = [
    { icon: "💰", title: "Deep Discount Deals", body: "Every property is priced 15-35% below estimated market value. We only accept listings where the discount is real, not manufactured." },
    { icon: "📋", title: "Verified Documents", body: "Title deed, encumbrance, RERA, tax receipts — all checked by our team before you see the listing. No surprises after you bid." },
    { icon: "📈", title: "Investment Analytics", body: "Market price comparison, rental yield estimate, liquidity score, area intelligence, comparable sales. Data, not broker opinions." },
    { icon: "🔒", title: "Fair Auction Process", body: "Transparent bidding with full bid history. No shill bids. No broker middlemen. Price is discovered by the market, not negotiated in backrooms." },
  ];

  return (
    <section className="bg-warm py-20 lg:py-28">
      <div className="mx-auto max-w-[1200px] px-5 lg:px-8">
        <FadeUp>
          <Tag>For Investors</Tag>
          <h2 className="font-serif text-[32px] lg:text-[44px] leading-[1.1] text-ink mt-4 mb-12">
            What you get with every deal
          </h2>
        </FadeUp>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {cards.map((card, i) => (
            <FadeUp key={card.title} delay={i * 0.08}>
              <div className="bg-white rounded-2xl border border-warm p-7 hover:-translate-y-0.5 hover:shadow-md transition-all duration-200 h-full">
                <span className="text-[28px] block mb-4">{card.icon}</span>
                <h3 className="text-ink text-[17px] font-semibold mb-2">{card.title}</h3>
                <p className="text-gray-500 text-[15px] leading-relaxed">{card.body}</p>
              </div>
            </FadeUp>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ─── WHO THIS IS FOR ──────────────────────────────────────────── */
function WhoSection() {
  const audiences = [
    { tag: "Investors", title: "Serious Capital Deployers", body: "You have ₹50L–₹10Cr+ ready. You want deals, not search results. You evaluate with numbers, not site visits to 20 overpriced flats." },
    { tag: "NRIs", title: "Remote Indian RE Investors", body: "Investing from US, UK, Canada, UAE. Can't visit properties. Need a trusted platform with verified docs, analytics, and someone who handles everything." },
    { tag: "HNIs", title: "Portfolio Builders", body: "Building a multi-property portfolio. Want deal flow delivered, not discovered. Looking for yield, appreciation, and exit clarity — not brochures." },
    { tag: "Distressed Sellers", title: "Need a Fast, Clean Exit", body: "Stuck with a property for 6+ months? Tired of broker spam? We guarantee a clean sale in 30 days to a vetted buyer. Zero calls from random agents." },
    { tag: "Flippers", title: "Buy Low, Exit Fast", body: "Looking for undervalued deals with clear exit potential. Our liquidity score tells you exactly how easy this property is to resell." },
    { tag: "First-Time Investors", title: "Want Guidance, Not Chaos", body: "First RE investment? Our analytics dashboard gives you the confidence to bid — backed by comparable sales, rental data, and area intelligence." },
  ];

  return (
    <section className="bg-chalk py-20 lg:py-28">
      <div className="mx-auto max-w-[1200px] px-5 lg:px-8">
        <FadeUp>
          <Tag>Who This Is For</Tag>
          <h2 className="font-serif text-[32px] lg:text-[44px] leading-[1.1] text-ink mt-4 mb-12">
            Built for people who invest with data, not emotions.
          </h2>
        </FadeUp>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {audiences.map((a, i) => (
            <FadeUp key={a.tag} delay={i * 0.06}>
              <div className="bg-white rounded-2xl border border-ink/5 p-7 hover:-translate-y-0.5 hover:shadow-md transition-all duration-200 h-full">
                <span className="inline-block text-[12px] font-semibold uppercase tracking-wider text-sage bg-sage-light px-2.5 py-1 rounded mb-4">
                  {a.tag}
                </span>
                <h3 className="text-ink text-[18px] font-semibold mb-2">{a.title}</h3>
                <p className="text-gray-500 text-[15px] leading-relaxed">{a.body}</p>
              </div>
            </FadeUp>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ─── FAQ ──────────────────────────────────────────────────────── */
function FAQSection() {
  return (
    <section className="bg-chalk py-20 lg:py-28 border-t border-ink/5">
      <div className="mx-auto max-w-[1200px] px-5 lg:px-8">
        <FadeUp>
          <div className="text-center mb-12">
            <Tag>Questions</Tag>
            <h2 className="font-serif text-[32px] lg:text-[44px] text-ink mt-4">Before you ask</h2>
          </div>
        </FadeUp>
        <FadeUp delay={0.1}>
          <FAQ />
        </FadeUp>
      </div>
    </section>
  );
}

/* ─── FINAL CTA ────────────────────────────────────────────────── */
function FinalCTASection() {
  return (
    <section className="bg-chalk py-20 lg:py-28">
      <div className="mx-auto max-w-[1200px] px-5 lg:px-8">
        <FadeUp>
          <div className="bg-sage rounded-2xl px-8 py-14 lg:px-16 lg:py-20 text-center">
            <h2 className="font-serif text-[32px] lg:text-[44px] text-white leading-tight mb-4">
              Don&apos;t miss the first batch of deals.
            </h2>
            <p className="text-white/70 text-[17px] max-w-[520px] mx-auto mb-8">
              Join the waitlist. Get 24-hour early access before deals go public. Limited to verified
              investors only.
            </p>
            <a
              href="#form"
              className="inline-flex items-center bg-white text-sage font-medium text-[15px] px-8 py-3.5 rounded-lg hover:bg-white/90 transition-colors"
            >
              Join the Waitlist →
            </a>
          </div>
        </FadeUp>
      </div>
    </section>
  );
}

/* ─── PAGE ─────────────────────────────────────────────────────── */
export default function PropertiesPage() {
  return (
    <>
      <HeroSection />
      <ProblemSection />
      <HowItWorksSection />
      <InvestorsGetSection />
      <WhoSection />
      <FAQSection />
      <FinalCTASection />
    </>
  );
}
