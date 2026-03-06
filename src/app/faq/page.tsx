import type { Metadata } from "next";
import Link from "next/link";
import FadeUp from "@/components/FadeUp";
import FAQList from "@/components/FAQList";

export const metadata: Metadata = {
  title: "Real Estate Investment Advisory FAQ — SquareMind",
  description: "Everything you're wondering about SquareMind's free consultation, advisory fees, NRI services, and how we're different from brokers. Answered honestly.",
};

const faqItems = [
  {
    q: "Is the consultation really free? What's the catch?",
    a: "Yes, genuinely free. No credit card. No hidden upsell during the call. The \"catch\" is that if we do a great job, some people choose to work with us on a paid advisory engagement. But most people just take the free advice and invest on their own \u2014 and that's completely fine. We'd rather build trust than push a sale.",
  },
  {
    q: "If you don't earn commission, how do you make money?",
    a: "We charge advisory fees directly from investors who want our comprehensive service. Think of it like a financial advisor \u2014 you pay for the expertise, not the product. Our fee is a fraction of what a bad investment decision would cost you.",
  },
  {
    q: "How is this different from a broker or property consultant?",
    a: "A broker earns 2-4% commission from the builder. Their incentive is to sell you the property that earns them the highest commission. We earn zero from any builder or developer. Our only incentive is to give you advice that protects your investment.",
  },
  {
    q: "I'm an NRI. Can you help me invest from abroad?",
    a: "Absolutely. A significant portion of our clients are NRIs in the US, Canada, UK, UAE, and Singapore. We handle FEMA compliance guidance, help evaluate builders remotely, advise on Power of Attorney structures, and provide tax implications specific to your country of residence.",
  },
  {
    q: "What if you tell me something I don't want to hear?",
    a: "That's exactly why we exist. If a deal doesn't make financial sense, we'll tell you. If a builder has a terrible track record, you'll know. If your timing is off, we'll explain why waiting might be smarter.",
  },
  {
    q: "Do you cover all cities in India?",
    a: "We cover every major investment market: Bangalore, Mumbai, Pune, Hyderabad, Chennai, Delhi NCR, Ahmedabad, and key Tier-2 cities including Chandigarh, Lucknow, Indore, Jaipur, Kochi, and Goa.",
  },
  {
    q: "What does the paid advisory service include?",
    a: "Our comprehensive advisory includes: personalized investment strategy, detailed builder and project evaluation with RERA data, tax structuring guidance, negotiation support, document verification, and ongoing support until your registration is complete.",
  },
  {
    q: "Will you spam me with calls after I book?",
    a: "No. This is our hardest rule. You will receive exactly one confirmation message and one call at your booked time. If you're not interested after the call, we won't follow up unless you reach out. We built SquareMind because we hated the spam culture of Indian real estate.",
  },
];

export default function FAQPage() {
  return (
    <>
      <div className="mx-auto max-w-[1200px] px-6 lg:px-14 pt-5">
        <nav className="text-[14px] text-gray-400" aria-label="Breadcrumb">
          <Link href="/" className="hover:text-sage transition-colors">Home</Link>
          <span className="mx-2">/</span><span>FAQ</span>
        </nav>
      </div>

      <section className="py-[120px] max-lg:py-20">
        <div className="mx-auto max-w-[1200px] px-6 lg:px-14">
          <FadeUp>
            <div className="text-center">
              <span className="text-[13px] font-semibold tracking-[0.08em] uppercase text-sage mb-4 block">Questions</span>
              <h1 className="font-serif text-[clamp(36px,4.5vw,64px)] leading-[1.08] tracking-[-0.03em] mx-auto">
                Everything you&apos;re wondering.<br />Answered honestly.
              </h1>
            </div>
          </FadeUp>

          <FadeUp delay={0.1}>
            <FAQList items={faqItems} />
          </FadeUp>
        </div>
      </section>

      <section className="pb-[120px] max-lg:pb-20">
        <div className="mx-auto max-w-[1200px] px-6 lg:px-14">
          <FadeUp>
            <div className="bg-ink rounded-[28px] py-20 px-12 max-lg:py-12 max-lg:px-7 text-center">
              <h2 className="font-serif text-[clamp(32px,3.5vw,48px)] tracking-[-0.03em] text-white">Still have questions? Let&apos;s talk.</h2>
              <p className="text-[18px] text-white/65 mt-4 mb-9 max-w-[500px] mx-auto tracking-[-0.01em]">
                30 minutes. Free. No spam. Just answers.
              </p>
              <Link href="/consultation" className="inline-flex items-center gap-2 bg-white text-ink px-9 py-4 rounded-full text-[16px] font-bold hover:bg-cream hover:scale-[1.03] transition-all duration-300 tracking-[-0.01em]">
                Ask your question live
              </Link>
            </div>
          </FadeUp>
        </div>
      </section>
    </>
  );
}
