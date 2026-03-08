import type { Metadata } from "next";
import Link from "next/link";
import FadeUp from "@/components/FadeUp";

export const metadata: Metadata = {
  title: "Terms of Service — SquareMind",
  description: "SquareMind's terms of service for advisory services, website usage, and consultation bookings.",
};

export default function TermsPage() {
  return (
    <>
      <div className="mx-auto max-w-[1200px] px-6 lg:px-14 pt-5">
        <nav className="text-[14px] text-gray-400" aria-label="Breadcrumb">
          <Link href="/" className="hover:text-sage transition-colors">Home</Link>
          <span className="mx-2">/</span><span>Terms of Service</span>
        </nav>
      </div>

      <section className="py-[120px] max-lg:py-20">
        <div className="mx-auto max-w-[800px] px-6 lg:px-14">
          <FadeUp>
            <h1 className="font-serif text-[clamp(36px,4.5vw,56px)] leading-[1.08] tracking-[-0.03em] mb-10">
              Terms of Service
            </h1>
          </FadeUp>
          <FadeUp delay={0.1}>
            <div className="prose prose-gray max-w-none text-[16px] leading-[1.8] text-gray-500 space-y-6">
              <p><strong className="text-ink">Last updated:</strong> March 2026</p>

              <h2 className="font-serif text-[24px] text-ink mt-10 mb-3">Advisory Services</h2>
              <p>SquareMind provides independent real estate investment advisory services. Our advice is based on data analysis and research but does not constitute a guarantee of investment returns. All investment decisions are ultimately yours.</p>

              <h2 className="font-serif text-[24px] text-ink mt-10 mb-3">Independence</h2>
              <p>SquareMind earns zero commissions from builders, developers, or property sellers. Our advisory fees are paid directly by clients. This ensures our recommendations are unbiased and investor-first.</p>

              <h2 className="font-serif text-[24px] text-ink mt-10 mb-3">Free Consultation</h2>
              <p>The initial 30-minute strategy call is completely free with no obligation. There is no automatic enrollment in any paid service.</p>

              <h2 className="font-serif text-[24px] text-ink mt-10 mb-3">Research & Tools</h2>
              <p>Our research reports, calculators, and frameworks are provided for informational purposes. While we strive for accuracy, data may change and should be independently verified before making investment decisions.</p>

              <h2 className="font-serif text-[24px] text-ink mt-10 mb-3">Limitation of Liability</h2>
              <p>SquareMind provides advisory services in good faith based on available data. We are not liable for investment losses resulting from market conditions, builder defaults, or other factors beyond our control.</p>

              <h2 className="font-serif text-[24px] text-ink mt-10 mb-3">Contact</h2>
              <p>For questions about these terms, contact us at <a href="mailto:hello@squaremind.in" className="text-sage hover:text-sage-deep transition-colors">hello@squaremind.in</a>.</p>
            </div>
          </FadeUp>
        </div>
      </section>
    </>
  );
}
