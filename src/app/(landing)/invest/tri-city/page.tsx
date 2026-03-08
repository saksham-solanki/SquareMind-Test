import type { Metadata } from "next";
import Link from "next/link";
import FadeUp from "@/components/FadeUp";
import TriCityForm from "@/components/TriCityForm";
import UTMCapture from "@/components/UTMCapture";
import ViewContentTracker from "@/components/ViewContentTracker";
import CalendlyButton from "@/components/CalendlyButton";

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://squaremind.in";

export const metadata: Metadata = {
  title: "Tri-City 2026 Investment Guide | SquareMind",
  description:
    "Independent analysis of Chandigarh, Mohali & Panchkula real estate for 2026. Infrastructure growth, IT corridor expansion, and data-backed investment insights from SquareMind.",
  openGraph: {
    title: "Tri-City 2026 Investment Guide | SquareMind",
    description:
      "Independent analysis of Chandigarh, Mohali & Panchkula real estate for 2026. Data-backed investment insights.",
    url: `${siteUrl}/invest/tri-city`,
    siteName: "SquareMind",
    locale: "en_IN",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Tri-City 2026 Investment Guide | SquareMind",
    description:
      "Independent analysis of Chandigarh, Mohali & Panchkula real estate for 2026.",
  },
  alternates: {
    canonical: `${siteUrl}/invest/tri-city`,
  },
};

const WHY_REASONS = [
  {
    icon: (
      <svg
        className="w-8 h-8 text-sage"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
        strokeWidth={1.5}
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M2.25 21h19.5m-18-18v18m10.5-18v18m6-13.5V21M6.75 6.75h.75m-.75 3h.75m-.75 3h.75m3-6h.75m-.75 3h.75m-.75 3h.75M6.75 21v-3.375c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21M3 3h12m-.75 4.5H21m-3.75 3H21"
        />
      </svg>
    ),
    title: "IT Corridor Expansion",
    description:
      "Mohali's IT City and Knowledge City are attracting major tech companies, driving demand for residential and commercial spaces across the Tri-City belt.",
  },
  {
    icon: (
      <svg
        className="w-8 h-8 text-sage"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
        strokeWidth={1.5}
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M6 12 3.269 3.125A59.769 59.769 0 0 1 21.485 12 59.768 59.768 0 0 1 3.27 20.875L5.999 12Zm0 0h7.5"
        />
      </svg>
    ),
    title: "Airport & Metro Development",
    description:
      "The upcoming Mohali International Airport expansion and Tri-City Metro project are set to transform connectivity, historically a key driver of property appreciation.",
  },
  {
    icon: (
      <svg
        className="w-8 h-8 text-sage"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
        strokeWidth={1.5}
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M3.75 3v11.25A2.25 2.25 0 0 0 6 16.5h2.25M3.75 3h-1.5m1.5 0h16.5m0 0h1.5m-1.5 0v11.25A2.25 2.25 0 0 1 18 16.5h-2.25m-7.5 0h7.5m-7.5 0-1 3m8.5-3 1 3m0 0 .5 1.5m-.5-1.5h-9.5m0 0-.5 1.5M9 11.25v1.5M12 9v3.75m3-6v6"
        />
      </svg>
    ),
    title: "Government Infrastructure Push",
    description:
      "Punjab and Haryana governments are investing in new expressways, medical hubs, and educational institutions -- creating a strong foundation for long-term property value growth.",
  },
  {
    icon: (
      <svg
        className="w-8 h-8 text-sage"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
        strokeWidth={1.5}
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M12 6v12m-3-2.818.879.659c1.171.879 3.07.879 4.242 0 1.172-.879 1.172-2.303 0-3.182C13.536 12.219 12.768 12 12 12c-.725 0-1.45-.22-2.003-.659-1.106-.879-1.106-2.303 0-3.182s2.9-.879 4.006 0l.415.33M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"
        />
      </svg>
    ),
    title: "Attractive Price Points",
    description:
      "Compared to Delhi NCR, Mumbai, or Bangalore, Tri-City offers significantly lower entry prices with comparable growth potential -- ideal for investors seeking value.",
  },
];

const TRUST_SIGNALS = [
  { stat: "Independent", label: "Advisory" },
  { stat: "Zero", label: "Builder Commissions" },
  { stat: "Data-Backed", label: "Analysis" },
];

const STEPS = [
  {
    step: "01",
    title: "Get Expert Analysis",
    description:
      "Share your investment goals. We analyse Tri-City projects, RERA compliance, builder track records, and market data to shortlist the best options for you.",
  },
  {
    step: "02",
    title: "Choose the Right Property",
    description:
      "Receive a detailed comparison of shortlisted properties with pricing trends, location advantages, and risk assessment -- so you invest with clarity, not guesswork.",
  },
  {
    step: "03",
    title: "Invest with Confidence",
    description:
      "We guide you through the entire process -- from negotiation to documentation -- ensuring a transparent and secure investment experience.",
  },
];

export default function TriCityInvestPage() {
  const calendlyUrl = process.env.NEXT_PUBLIC_CALENDLY_URL || "";

  return (
    <>
      <UTMCapture />
      <ViewContentTracker contentName="Tri-City Investment Guide" />

      {/* Section 1: Hero */}
      <section className="bg-chalk min-h-[85vh] flex flex-col justify-center px-5 py-16 lg:py-24">
        <div className="max-w-[720px] mx-auto text-center">
          <FadeUp>
            <Link
              href="/"
              className="inline-block mb-10"
              aria-label="SquareMind Home"
            >
              <span className="font-serif text-[22px] tracking-[-0.03em] text-ink">
                SquareMind
              </span>
            </Link>
          </FadeUp>

          <FadeUp delay={0.1}>
            <h1 className="font-serif text-[clamp(32px,6vw,56px)] leading-[1.1] tracking-[-0.03em] text-ink mb-5">
              The Smart Money Is Moving to{" "}
              <span className="text-sage">Chandigarh Tri-City</span>
            </h1>
          </FadeUp>

          <FadeUp delay={0.2}>
            <p className="text-[clamp(16px,2.2vw,19px)] text-gray-500 leading-relaxed max-w-[560px] mx-auto mb-9">
              Independent investment analysis for Chandigarh, Mohali &
              Panchkula. Understand the 2026 opportunity before you commit your
              capital.
            </p>
          </FadeUp>

          <FadeUp delay={0.3}>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              {calendlyUrl && (
                <CalendlyButton url={calendlyUrl} />
              )}
              <a
                href="#get-guide"
                className="inline-flex items-center justify-center gap-2 border-[1.5px] border-ink text-ink px-9 py-4 rounded-full text-[16px] font-semibold tracking-[-0.01em] hover:bg-ink hover:text-white transition-all duration-300"
              >
                Get Free Investment Guide
              </a>
            </div>
          </FadeUp>
        </div>
      </section>

      {/* Section 2: Why Tri-City */}
      <section className="bg-white px-5 py-16 lg:py-24">
        <div className="max-w-[960px] mx-auto">
          <FadeUp>
            <p className="text-[13px] font-semibold text-sage tracking-[0.08em] uppercase mb-3 text-center">
              Market Opportunity
            </p>
            <h2 className="font-serif text-[clamp(26px,4vw,40px)] leading-[1.15] tracking-[-0.02em] text-ink text-center mb-4">
              Why Tri-City in 2026?
            </h2>
            <p className="text-[16px] text-gray-500 text-center max-w-[560px] mx-auto mb-12 leading-relaxed">
              Four structural tailwinds are converging to make Chandigarh
              Tri-City one of North India's most compelling real estate
              markets.
            </p>
          </FadeUp>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8">
            {WHY_REASONS.map((reason, i) => (
              <FadeUp key={reason.title} delay={i * 0.1}>
                <div className="bg-chalk rounded-[20px] p-7 lg:p-8 h-full">
                  <div className="mb-4">{reason.icon}</div>
                  <h3 className="font-serif text-[20px] tracking-[-0.02em] text-ink mb-2">
                    {reason.title}
                  </h3>
                  <p className="text-[15px] text-gray-500 leading-relaxed">
                    {reason.description}
                  </p>
                </div>
              </FadeUp>
            ))}
          </div>
        </div>
      </section>

      {/* Section 3: Trust Signals */}
      <section className="bg-ink px-5 py-14 lg:py-20">
        <div className="max-w-[960px] mx-auto">
          <FadeUp>
            <div className="grid grid-cols-3 gap-4 text-center mb-10">
              {TRUST_SIGNALS.map((signal) => (
                <div key={signal.label}>
                  <p className="font-serif text-[clamp(22px,3.5vw,32px)] text-white tracking-[-0.02em]">
                    {signal.stat}
                  </p>
                  <p className="text-[13px] text-gray-400 mt-1">
                    {signal.label}
                  </p>
                </div>
              ))}
            </div>
          </FadeUp>
          <FadeUp delay={0.1}>
            <p className="text-[15px] text-gray-400 text-center max-w-[520px] mx-auto leading-relaxed">
              SquareMind provides independent real estate advisory with
              zero builder commissions. We work with leading developers
              including Homeland projects in the Tri-City region to bring
              you verified, data-backed investment options.
            </p>
          </FadeUp>
        </div>
      </section>

      {/* Section 4: How SquareMind Helps */}
      <section className="bg-white px-5 py-16 lg:py-24">
        <div className="max-w-[960px] mx-auto">
          <FadeUp>
            <p className="text-[13px] font-semibold text-sage tracking-[0.08em] uppercase mb-3 text-center">
              How It Works
            </p>
            <h2 className="font-serif text-[clamp(26px,4vw,40px)] leading-[1.15] tracking-[-0.02em] text-ink text-center mb-12">
              Three Steps to a Smarter Investment
            </h2>
          </FadeUp>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {STEPS.map((step, i) => (
              <FadeUp key={step.step} delay={i * 0.1}>
                <div className="text-center md:text-left">
                  <span className="inline-block text-[13px] font-semibold text-sage bg-sage-light rounded-full px-3 py-1 mb-4">
                    Step {step.step}
                  </span>
                  <h3 className="font-serif text-[20px] tracking-[-0.02em] text-ink mb-2">
                    {step.title}
                  </h3>
                  <p className="text-[15px] text-gray-500 leading-relaxed">
                    {step.description}
                  </p>
                </div>
              </FadeUp>
            ))}
          </div>
        </div>
      </section>

      {/* Section 5: Lead Form */}
      <section id="get-guide" className="bg-chalk px-5 py-16 lg:py-24">
        <div className="max-w-[520px] mx-auto">
          <FadeUp>
            <h2 className="font-serif text-[clamp(26px,4vw,36px)] leading-[1.15] tracking-[-0.02em] text-ink text-center mb-3">
              Get Your Free Tri-City Investment Guide
            </h2>
            <p className="text-[15px] text-gray-500 text-center mb-8 leading-relaxed">
              Receive our 2026 market analysis with pricing trends,
              infrastructure timelines, and top-rated projects -- delivered
              to your inbox.
            </p>
          </FadeUp>
          <FadeUp delay={0.1}>
            <TriCityForm />
          </FadeUp>
        </div>
      </section>

      {/* Section 6: Calendly CTA */}
      {calendlyUrl && (
        <section className="bg-white px-5 py-14 lg:py-20">
          <div className="max-w-[560px] mx-auto text-center">
            <FadeUp>
              <h2 className="font-serif text-[clamp(24px,3.5vw,32px)] leading-[1.15] tracking-[-0.02em] text-ink mb-3">
                Prefer to Talk First?
              </h2>
              <p className="text-[15px] text-gray-500 mb-8 leading-relaxed">
                Book a free 20-minute strategy call with our advisory team.
                No pressure, no sales pitch -- just honest answers about
                Tri-City real estate.
              </p>
            </FadeUp>
            <FadeUp delay={0.1}>
              <CalendlyButton url={calendlyUrl} />
            </FadeUp>
          </div>
        </section>
      )}

      {/* Section 7: Minimal Footer */}
      <footer className="bg-chalk border-t border-gray-200 px-5 py-8">
        <div className="max-w-[960px] mx-auto text-center">
          <p className="text-[13px] text-gray-400 mb-2">
            &copy; {new Date().getFullYear()} SquareMind. All rights reserved.
          </p>
          <div className="flex items-center justify-center gap-4 mb-4">
            <Link
              href="/privacy"
              className="text-[13px] text-gray-400 hover:text-ink transition-colors"
            >
              Privacy Policy
            </Link>
            <Link
              href="/terms"
              className="text-[13px] text-gray-400 hover:text-ink transition-colors"
            >
              Terms
            </Link>
          </div>
          <p className="text-[11px] text-gray-300 max-w-[480px] mx-auto leading-relaxed">
            SquareMind is an independent advisory service. We do not sell
            properties. Investment decisions should be made after thorough due
            diligence. Past performance is not indicative of future results.
          </p>
        </div>
      </footer>
    </>
  );
}
