"use client";

import Link from "next/link";
import FadeUp from "@/components/FadeUp";
import RentalYieldCalc from "@/components/calculators/RentalYieldCalc";
import BuyVsRentCalc from "@/components/calculators/BuyVsRentCalc";
import TotalCostCalc from "@/components/calculators/TotalCostCalc";

const moreTools = [
  { icon: "\uD83D\uDCCA", title: "Investment Scorecard", desc: "Input any property's details \u2014 location, price, builder, carpet area, expected rent. Get an instant investment grade (A/B/C/D). Coming soon." },
  { icon: "\u2705", title: "RERA Project Verifier", desc: "Check any project's RERA registration status, approved plans, completion timeline, and builder compliance history. Coming soon." },
  { icon: "\uD83C\uDF0E", title: "NRI Tax Calculator", desc: "Calculate tax implications based on your country of residence. Covers India, US, UK, Canada, UAE, Singapore, and Australia. Coming soon." },
];

export default function ToolsPage() {
  return (
    <>
      <div className="mx-auto max-w-[1200px] px-6 lg:px-14 pt-5">
        <nav className="text-[14px] text-gray-400" aria-label="Breadcrumb">
          <Link href="/" className="hover:text-sage transition-colors">Home</Link>
          <span className="mx-2">/</span><span>Tools</span>
        </nav>
      </div>

      <section className="py-[120px] max-lg:py-20">
        <div className="mx-auto max-w-[1200px] px-6 lg:px-14">
          <FadeUp>
            <span className="text-[13px] font-semibold tracking-[0.08em] uppercase text-sage mb-4 block">Free Tools</span>
            <h1 className="font-serif text-[clamp(36px,4.5vw,64px)] leading-[1.08] tracking-[-0.03em]">
              Make decisions with numbers,<br />not WhatsApp forwards.
            </h1>
            <p className="text-[18px] text-gray-500 max-w-[560px] mt-4 leading-[1.65] tracking-[-0.01em]">
              Free interactive tools built for serious investors. No signup required.
            </p>
          </FadeUp>

          <FadeUp delay={0.1}>
            <RentalYieldCalc />
          </FadeUp>

          <FadeUp delay={0.15}>
            <BuyVsRentCalc />
          </FadeUp>

          <FadeUp delay={0.2}>
            <TotalCostCalc />
          </FadeUp>

          <FadeUp delay={0.25}>
            <h2 className="font-serif text-[clamp(28px,3vw,40px)] tracking-[-0.03em] mt-20">More tools</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
              {moreTools.map((t) => (
                <div key={t.title} className="bg-cream rounded-[20px] p-10 max-lg:p-7 flex gap-6 items-start hover:-translate-y-1 hover:shadow-[0_20px_60px_rgba(0,0,0,0.06)] transition-all duration-400">
                  <div className="w-14 h-14 shrink-0 bg-white rounded-[12px] flex items-center justify-center text-[24px]">{t.icon}</div>
                  <div>
                    <div className="text-[18px] font-bold tracking-[-0.02em] mb-2">{t.title}</div>
                    <div className="text-[15px] text-gray-500 leading-relaxed tracking-[-0.01em]">{t.desc}</div>
                  </div>
                </div>
              ))}
            </div>
          </FadeUp>
        </div>
      </section>

      <section className="pb-[120px] max-lg:pb-20">
        <div className="mx-auto max-w-[1200px] px-6 lg:px-14">
          <FadeUp>
            <div className="bg-ink rounded-[28px] py-20 px-12 max-lg:py-12 max-lg:px-7 text-center">
              <h2 className="font-serif text-[clamp(32px,3.5vw,48px)] tracking-[-0.03em] text-white">Want a personalized analysis?</h2>
              <p className="text-[18px] text-white/65 mt-4 mb-9 max-w-[500px] mx-auto tracking-[-0.01em]">
                Our tools give you the framework. Our advisors give you the strategy.
              </p>
              <Link href="/consultation" className="inline-flex items-center gap-2 bg-white text-ink px-9 py-4 rounded-full text-[16px] font-bold hover:bg-cream hover:scale-[1.03] transition-all duration-300 tracking-[-0.01em]">
                Get personalized analysis
              </Link>
            </div>
          </FadeUp>
        </div>
      </section>
    </>
  );
}
