import type { Metadata } from "next";
import Link from "next/link";
import FadeUp from "@/components/FadeUp";
import ConsultForm from "@/components/ConsultForm";

export const metadata: Metadata = {
  title: "Free Real Estate Investment Strategy Call — SquareMind",
  description: "Book a free 30-minute real estate investment strategy call. No sales pitch. No broker BS. Just honest, data-backed advice from independent advisors.",
};

const features = [
  { icon: "\uD83D\uDCCD", title: "Personalized City & Location Strategy", desc: "Based on your budget, risk appetite, and investment timeline \u2014 which cities and micro-markets make sense for you specifically." },
  { icon: "\u2696\uFE0F", title: "Risk Assessment", desc: "An honest evaluation of your current plan. If something doesn't make sense, we'll tell you \u2014 even if it means advising you NOT to invest right now." },
  { icon: "\uD83D\uDCCA", title: "Builder & Project Evaluation", desc: "If you're considering a specific project, we'll pull RERA data, delivery track records, and financial health indicators." },
  { icon: "\uD83E\uDDEE", title: "Tax & Structure Guidance", desc: "How to structure your investment for maximum tax efficiency. Especially critical for NRIs navigating FEMA and DTAA." },
  { icon: "\uD83D\uDCCB", title: "Due Diligence Checklist", desc: "Walk away with our 7-Point Due Diligence Framework \u2014 the same one our advisors use for every property evaluation." },
];

const donts = [
  "We don't push any specific property or builder.",
  "We don't earn commission from any transaction.",
  "We don't share your details with third parties. Ever.",
  "We don't follow up with spam calls if you're not interested.",
  "We don't give generic advice. Every call is specific to YOU.",
];

export default function ConsultationPage() {
  return (
    <>
      <div className="mx-auto max-w-[1200px] px-6 lg:px-14 pt-5">
        <nav className="text-[14px] text-gray-400" aria-label="Breadcrumb">
          <Link href="/" className="hover:text-sage transition-colors">Home</Link>
          <span className="mx-2">/</span><span>Consultation</span>
        </nav>
      </div>

      <section className="py-[120px] max-lg:py-20 pb-0 max-lg:pb-0">
        <div className="mx-auto max-w-[1200px] px-6 lg:px-14">
          <FadeUp>
            <span className="text-[13px] font-semibold tracking-[0.08em] uppercase text-sage mb-4 block">Free Strategy Call</span>
            <h1 className="font-serif text-[clamp(36px,4.5vw,56px)] leading-[1.08] tracking-[-0.03em]">
              30 minutes that could save you<br /><em className="italic text-sage">{"\u20B9"}20 Lakhs in bad decisions.</em>
            </h1>
            <p className="text-[20px] leading-[1.65] text-gray-500 max-w-[560px] mt-7 tracking-[-0.01em]">
              Book a free, no-obligation call with a SquareMind investment advisor. Not a salesperson. Not a broker. Someone who is genuinely paid to think about YOUR investment.
            </p>
          </FadeUp>
        </div>
      </section>

      <section className="py-[120px] max-lg:py-20">
        <div className="mx-auto max-w-[1200px] px-6 lg:px-14">
          <div className="grid grid-cols-1 lg:grid-cols-[1.1fr_0.9fr] gap-[72px] max-lg:gap-12 items-start">
            <FadeUp>
              <div>
                <h3 className="text-[22px] font-bold tracking-[-0.02em] mb-6">What You&apos;ll Get in 30 Minutes</h3>
                <div className="flex flex-col gap-6">
                  {features.map((f) => (
                    <div key={f.title} className="flex gap-4 items-start">
                      <div className="w-10 h-10 shrink-0 bg-cream rounded-[12px] flex items-center justify-center text-[16px] text-sage">{f.icon}</div>
                      <div>
                        <h4 className="text-[16px] font-semibold tracking-[-0.02em]">{f.title}</h4>
                        <p className="text-[14px] text-gray-500 mt-1 leading-[1.55] tracking-[-0.01em]">{f.desc}</p>
                      </div>
                    </div>
                  ))}
                </div>
                <div className="mt-10 p-7 bg-cream rounded-[20px]">
                  <h4 className="text-[16px] font-bold tracking-[-0.02em] mb-3.5">What We DON&apos;T Do</h4>
                  <div className="text-[14px] text-gray-500 leading-[1.8] tracking-[-0.01em]">
                    {donts.map((d) => (
                      <div key={d}>&#10005; {d}</div>
                    ))}
                  </div>
                </div>
              </div>
            </FadeUp>

            <FadeUp delay={0.15}>
              <ConsultForm />
            </FadeUp>
          </div>
        </div>
      </section>
    </>
  );
}
