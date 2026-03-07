import type { Metadata } from "next";
import Link from "next/link";
import FadeUp from "@/components/FadeUp";

export const metadata: Metadata = {
  title: "Privacy Policy — SquareMind",
  description: "SquareMind's privacy policy. How we collect, use, and protect your personal information.",
};

export default function PrivacyPage() {
  return (
    <>
      <div className="mx-auto max-w-[1200px] px-6 lg:px-14 pt-5">
        <nav className="text-[14px] text-gray-400" aria-label="Breadcrumb">
          <Link href="/" className="hover:text-sage transition-colors">Home</Link>
          <span className="mx-2">/</span><span>Privacy Policy</span>
        </nav>
      </div>

      <section className="py-[120px] max-lg:py-20">
        <div className="mx-auto max-w-[800px] px-6 lg:px-14">
          <FadeUp>
            <h1 className="font-serif text-[clamp(36px,4.5vw,56px)] leading-[1.08] tracking-[-0.03em] mb-10">
              Privacy Policy
            </h1>
          </FadeUp>
          <FadeUp delay={0.1}>
            <div className="prose prose-gray max-w-none text-[16px] leading-[1.8] text-gray-500 space-y-6">
              <p><strong className="text-ink">Last updated:</strong> March 2026</p>

              <h2 className="font-serif text-[24px] text-ink mt-10 mb-3">Information We Collect</h2>
              <p>When you book a consultation or download a report, we collect your name, email address, phone number, and investment preferences. We use this information solely to provide our advisory services.</p>

              <h2 className="font-serif text-[24px] text-ink mt-10 mb-3">How We Use Your Information</h2>
              <p>Your information is used to schedule and conduct strategy calls, send requested research reports, and communicate about our services. We never sell, share, or trade your personal data with builders, brokers, or any third party.</p>

              <h2 className="font-serif text-[24px] text-ink mt-10 mb-3">Zero Spam Policy</h2>
              <p>We will never cold-call you. We will never share your phone number. If you book a consultation, you will receive exactly one confirmation and one call at your scheduled time. No follow-up spam.</p>

              <h2 className="font-serif text-[24px] text-ink mt-10 mb-3">Data Security</h2>
              <p>We use industry-standard encryption and security practices to protect your personal information. Your data is stored securely and accessed only by authorized SquareMind advisors.</p>

              <h2 className="font-serif text-[24px] text-ink mt-10 mb-3">Your Rights</h2>
              <p>You can request access to, correction of, or deletion of your personal data at any time by emailing <a href="mailto:hello@squaremind.in" className="text-sage hover:text-sage-deep transition-colors">hello@squaremind.in</a>.</p>

              <h2 className="font-serif text-[24px] text-ink mt-10 mb-3">Contact</h2>
              <p>For privacy-related questions, contact us at <a href="mailto:hello@squaremind.in" className="text-sage hover:text-sage-deep transition-colors">hello@squaremind.in</a>.</p>
            </div>
          </FadeUp>
        </div>
      </section>
    </>
  );
}
