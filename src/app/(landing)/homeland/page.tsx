import type { Metadata } from "next";
import Link from "next/link";
import FadeUp from "@/components/FadeUp";
import HomelandForm from "@/components/HomelandForm";
import UTMCapture from "@/components/UTMCapture";
import ViewContentTracker from "@/components/ViewContentTracker";
import CalendlyButton from "@/components/CalendlyButton";
import WhatsAppLink from "@/components/WhatsAppLink";

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://squaremind.in";

export const metadata: Metadata = {
  title:
    "Homeland Global Park & Sector 62 — Independent Analysis | SquareMind",
  description:
    "Independent advisory analysis of Homeland Global Park (Sector 75) and the upcoming Sector 62 project in Mohali. Data-backed insights from Tri-City's first independent real estate advisor.",
  openGraph: {
    title:
      "Homeland Global Park & Sector 62 — Independent Analysis | SquareMind",
    description:
      "Independent advisory analysis of Homeland projects in Mohali. Data-backed insights from Tri-City's first independent real estate advisor.",
    url: `${siteUrl}/homeland`,
    siteName: "SquareMind",
    locale: "en_IN",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Homeland Global Park & Sector 62 — Independent Analysis",
    description:
      "Data-backed insights from Tri-City's first independent real estate advisor.",
  },
  alternates: {
    canonical: `${siteUrl}/homeland`,
  },
  robots: {
    index: false,
    follow: false,
  },
};

const PROJECT_FEATURES = [
  {
    icon: (
      <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 21v-7.5a.75.75 0 0 1 .75-.75h3a.75.75 0 0 1 .75.75V21m-4.5 0H2.36m11.14 0H18m0 0h3.64m-1.39 0V9.349M3.75 21V9.349m0 0a3.001 3.001 0 0 0 3.75-.615A2.993 2.993 0 0 0 9.75 9.75c.896 0 1.7-.393 2.25-1.016a2.993 2.993 0 0 0 2.25 1.016c.896 0 1.7-.393 2.25-1.015a3.001 3.001 0 0 0 3.75.614m-16.5 0a3.004 3.004 0 0 1-.621-4.72l1.189-1.19A1.5 1.5 0 0 1 5.378 3h13.243a1.5 1.5 0 0 1 1.06.44l1.19 1.189a3 3 0 0 1-.621 4.72M6.75 18h3.75a.75.75 0 0 0 .75-.75V13.5a.75.75 0 0 0-.75-.75H6.75a.75.75 0 0 0-.75.75v3.75c0 .414.336.75.75.75Z" />
      </svg>
    ),
    label: "Premium Retail & Luxury High Street",
  },
  {
    icon: (
      <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 3v11.25A2.25 2.25 0 0 0 6 16.5h2.25M3.75 3h-1.5m1.5 0h16.5m0 0h1.5m-1.5 0v11.25A2.25 2.25 0 0 1 18 16.5h-2.25m-7.5 0h7.5m-7.5 0-1 3m8.5-3 1 3m0 0 .5 1.5m-.5-1.5h-9.5m0 0-.5 1.5" />
      </svg>
    ),
    label: "India\u2019s Largest Indoor Entertainment Arena",
  },
  {
    icon: (
      <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M20.25 14.15v4.25c0 1.094-.787 2.036-1.872 2.18-2.087.277-4.216.42-6.378.42s-4.291-.143-6.378-.42c-1.085-.144-1.872-1.086-1.872-2.18v-4.25m16.5 0a2.18 2.18 0 0 0 .75-1.661V8.706c0-1.081-.768-2.015-1.837-2.175a48.114 48.114 0 0 0-3.413-.387m4.5 8.006c-.194.165-.42.295-.673.38A23.978 23.978 0 0 1 12 15.75c-2.648 0-5.195-.429-7.577-1.22a2.016 2.016 0 0 1-.673-.38m0 0A2.18 2.18 0 0 1 3 12.489V8.706c0-1.081.768-2.015 1.837-2.175a48.111 48.111 0 0 1 3.413-.387m7.5 0V5.25A2.25 2.25 0 0 0 13.5 3h-3a2.25 2.25 0 0 0-2.25 2.25v.894m7.5 0a48.667 48.667 0 0 0-7.5 0M12 12.75h.008v.008H12v-.008Z" />
      </svg>
    ),
    label: "Executive Office Suites & IT Floor Plates",
  },
  {
    icon: (
      <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 21v-4.875c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21m0 0h4.5V3.545M12.75 21h7.5V10.75M2.25 21h1.5m18 0h-18M2.25 9l4.5-1.636M18.75 3l-1.5.545m0 6.205 3 1m1.5.5-1.5-.5M6.75 7.364V3h-3v18m3-13.636 10.5-3.819" />
      </svg>
    ),
    label: "Serviced Luxury Apartments (3BHK, 4+1BHK)",
  },
  {
    icon: (
      <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 8.25v-1.5m0 1.5c-1.355 0-2.697.056-4.024.166C6.845 8.51 6 9.473 6 10.608v2.513m6-4.871c1.355 0 2.697.056 4.024.166C17.155 8.51 18 9.473 18 10.608v2.513M15 8.25v-1.5m-6 1.5v-1.5m12 9.75-1.5.75a3.354 3.354 0 0 1-3 0 3.354 3.354 0 0 0-3 0 3.354 3.354 0 0 1-3 0 3.354 3.354 0 0 0-3 0 3.354 3.354 0 0 1-3 0L3 16.5m15-3.379a48.474 48.474 0 0 0-6-.371c-2.032 0-4.034.126-6 .371m12 0c.39.049.777.102 1.163.16 1.07.16 1.837 1.094 1.837 2.175v5.169c0 .621-.504 1.125-1.125 1.125H4.125A1.125 1.125 0 0 1 3 20.625v-5.17c0-1.08.768-2.014 1.837-2.174A47.78 47.78 0 0 1 6 13.12M12.265 3.11a.375.375 0 1 1-.53 0L12 2.845l.265.265Z" />
      </svg>
    ),
    label: "Fine Dining & Lifestyle Boulevard",
  },
];

const CONNECTIVITY = [
  { time: "28 min", place: "Chandigarh International Airport" },
  { time: "10 min", place: "Homeland Heights (Sector 70)" },
  { time: "8 min", place: "Homeland Regalia (Sector 77)" },
  { time: "20 min", place: "CP.67 (Sector 67)" },
];

const BUILDER_STATS = [
  { stat: "13+", label: "Years" },
  { stat: "3.5M+", label: "Sq Ft Delivered" },
  { stat: "100%", label: "RERA Compliant" },
];

const STEPS = [
  {
    step: "01",
    title: "Book a Free Meeting",
    description:
      "Pick a slot on our calendar. 30 minutes with an independent advisor \u2014 not a salesperson.",
  },
  {
    step: "02",
    title: "Get Our Analysis",
    description:
      "We\u2019ll share our research on Homeland Global Park and the Sector 62 project. Numbers, risks, projections \u2014 everything brokers won\u2019t tell you.",
  },
  {
    step: "03",
    title: "Decide With Confidence",
    description:
      "Invest if the data supports it. Walk away if it doesn\u2019t. Either way, you\u2019ll have the full picture.",
  },
];

export default function HomelandLandingPage() {
  const calendlyUrl = process.env.NEXT_PUBLIC_CALENDLY_URL || "";
  const whatsappUrl =
    "https://wa.me/918968066810?text=Hi%20SquareMind%2C%20I%27m%20interested%20in%20learning%20about%20Homeland%20projects%20in%20Mohali.";

  return (
    <>
      <UTMCapture />
      <ViewContentTracker contentName="Homeland Landing Page" />

      {/* ─── Section 1: Hero ─── */}
      <section className="bg-chalk min-h-[90vh] flex flex-col justify-center px-5 py-16 lg:py-24">
        <div className="max-w-[720px] mx-auto text-center">
          <FadeUp>
            <div className="flex items-center justify-center gap-4 mb-10">
              <Link href="/" className="inline-block" aria-label="SquareMind Home">
                <span className="font-serif text-[22px] tracking-[-0.03em] text-ink">
                  SquareMind
                </span>
              </Link>
              <span className="text-gray-300">|</span>
              <span className="text-[12px] font-semibold text-gray-400 tracking-[0.04em] uppercase">
                Authorized Channel Partner
              </span>
            </div>
          </FadeUp>

          <FadeUp delay={0.1}>
            <h1 className="font-serif text-[clamp(30px,5.5vw,52px)] leading-[1.1] tracking-[-0.03em] text-ink mb-5">
              Mohali&apos;s Largest Mixed-Use Project.
              <br />
              <span className="text-sage">Analyzed by an Independent Advisor.</span>
            </h1>
          </FadeUp>

          <FadeUp delay={0.2}>
            <p className="text-[clamp(16px,2.2vw,19px)] text-gray-500 leading-relaxed max-w-[560px] mx-auto mb-9">
              Homeland Global Park &mdash; 15 acres, Sector 75, Mohali. Plus an
              upcoming landmark project in Sector 62. We&apos;ve done the
              research. Here&apos;s our honest take.
            </p>
          </FadeUp>

          <FadeUp delay={0.3}>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              {calendlyUrl ? (
                <CalendlyButton url={calendlyUrl} text="Book Your Free Strategy Meeting" />
              ) : (
                <a
                  href="#book-meeting"
                  className="inline-flex items-center justify-center gap-2 bg-sage text-white px-9 py-4 rounded-full text-[16px] font-semibold tracking-[-0.01em] hover:bg-sage-deep hover:scale-[1.03] transition-all duration-300"
                >
                  Book Your Free Strategy Meeting
                </a>
              )}
              <WhatsAppLink
                href={whatsappUrl}
                className="inline-flex items-center justify-center gap-2 border-[1.5px] border-ink text-ink px-9 py-4 rounded-full text-[16px] font-semibold tracking-[-0.01em] hover:bg-ink hover:text-white transition-all duration-300"
              >
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
                </svg>
                WhatsApp Us
              </WhatsAppLink>
            </div>
          </FadeUp>

          <FadeUp delay={0.4}>
            <p className="text-[13px] text-gray-400 mt-6">
              30 minutes. Free. No sales pitch. No spam.
            </p>
          </FadeUp>
        </div>
      </section>

      {/* ─── Section 2: Why SquareMind (Trust) ─── */}
      <section className="bg-white px-5 py-16 lg:py-24">
        <div className="max-w-[960px] mx-auto">
          <FadeUp>
            <p className="text-[13px] font-semibold text-sage tracking-[0.08em] uppercase mb-3 text-center">
              Why Us
            </p>
            <h2 className="font-serif text-[clamp(26px,4vw,40px)] leading-[1.15] tracking-[-0.02em] text-ink text-center mb-12">
              We&apos;re Not Brokers. We&apos;re Your Independent Advisor.
            </h2>
          </FadeUp>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8">
            <FadeUp>
              <div className="bg-chalk rounded-[20px] p-7 lg:p-8 h-full text-center">
                <div className="w-12 h-12 bg-red/10 rounded-full flex items-center justify-center mx-auto mb-4">
                  <svg className="w-6 h-6 text-red" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M6 18 18 6M6 6l12 12" />
                  </svg>
                </div>
                <h3 className="font-serif text-[20px] tracking-[-0.02em] text-ink mb-2">
                  Zero Builder Commissions
                </h3>
                <p className="text-[15px] text-gray-500 leading-relaxed">
                  We don&apos;t earn from Homeland. Our only incentive is getting
                  your decision right.
                </p>
              </div>
            </FadeUp>

            <FadeUp delay={0.1}>
              <div className="bg-chalk rounded-[20px] p-7 lg:p-8 h-full text-center">
                <div className="w-12 h-12 bg-sage-light rounded-full flex items-center justify-center mx-auto mb-4">
                  <svg className="w-6 h-6 text-sage" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M3 13.125C3 12.504 3.504 12 4.125 12h2.25c.621 0 1.125.504 1.125 1.125v6.75C7.5 20.496 6.996 21 6.375 21h-2.25A1.125 1.125 0 0 1 3 19.875v-6.75ZM9.75 8.625c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125v11.25c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 0 1-1.125-1.125V8.625ZM16.5 4.125c0-.621.504-1.125 1.125-1.125h2.25C20.496 3 21 3.504 21 4.125v15.75c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 0 1-1.125-1.125V4.125Z" />
                  </svg>
                </div>
                <h3 className="font-serif text-[20px] tracking-[-0.02em] text-ink mb-2">
                  RERA-Verified Analysis
                </h3>
                <p className="text-[15px] text-gray-500 leading-relaxed">
                  Every recommendation backed by RERA filings, delivery data, and
                  market fundamentals.
                </p>
              </div>
            </FadeUp>

            <FadeUp delay={0.2}>
              <div className="bg-chalk rounded-[20px] p-7 lg:p-8 h-full text-center">
                <div className="w-12 h-12 bg-sage-light rounded-full flex items-center justify-center mx-auto mb-4">
                  <svg className="w-6 h-6 text-sage" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75 11.25 15 15 9.75m-3-7.036A11.959 11.959 0 0 1 3.598 6 11.99 11.99 0 0 0 3 9.749c0 5.592 3.824 10.29 9 11.623 5.176-1.332 9-6.03 9-11.622 0-1.31-.21-2.571-.598-3.751h-.152c-3.196 0-6.1-1.248-8.25-3.285Z" />
                  </svg>
                </div>
                <h3 className="font-serif text-[20px] tracking-[-0.02em] text-ink mb-2">
                  We&apos;ll Say &ldquo;Don&apos;t Invest&rdquo;
                </h3>
                <p className="text-[15px] text-gray-500 leading-relaxed">
                  If the numbers don&apos;t work for you, we&apos;ll tell you.
                  That&apos;s our job.
                </p>
              </div>
            </FadeUp>
          </div>
        </div>
      </section>

      {/* ─── Section 3: Homeland Global Park ─── */}
      <section className="bg-chalk px-5 py-16 lg:py-24">
        <div className="max-w-[960px] mx-auto">
          <FadeUp>
            <p className="text-[13px] font-semibold text-sage tracking-[0.08em] uppercase mb-3 text-center">
              Featured Project
            </p>
            <h2 className="font-serif text-[clamp(26px,4vw,40px)] leading-[1.15] tracking-[-0.02em] text-ink text-center mb-4">
              Homeland Global Park &mdash; The Numbers
            </h2>
            <p className="text-[16px] text-gray-500 text-center max-w-[560px] mx-auto mb-12 leading-relaxed">
              Mohali&apos;s most ambitious mixed-use development. Here&apos;s what
              the data says.
            </p>
          </FadeUp>

          <FadeUp delay={0.1}>
            <div className="bg-white rounded-[20px] border-[1.5px] border-sage/20 p-8 lg:p-10">
              {/* Key stats row */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-8 pb-8 border-b border-gray-200">
                <div>
                  <p className="text-[13px] text-gray-400 mb-1">Location</p>
                  <p className="text-[15px] font-semibold text-ink">
                    Sector 75, Airport Road
                  </p>
                </div>
                <div>
                  <p className="text-[13px] text-gray-400 mb-1">Project Size</p>
                  <p className="text-[15px] font-semibold text-ink">
                    15 Acres | ~5M Sq Ft
                  </p>
                </div>
                <div>
                  <p className="text-[13px] text-gray-400 mb-1">Developer</p>
                  <p className="text-[15px] font-semibold text-ink">
                    Homeland Group (13+ yrs)
                  </p>
                </div>
                <div>
                  <p className="text-[13px] text-gray-400 mb-1">RERA</p>
                  <p className="text-[15px] font-semibold text-sage">
                    PBRERA-SAS81-PC0325
                  </p>
                </div>
              </div>

              {/* Features */}
              <div className="mb-8">
                <p className="text-[13px] font-semibold text-gray-600 tracking-[-0.01em] mb-4">
                  What&apos;s Inside
                </p>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {PROJECT_FEATURES.map((feature) => (
                    <div
                      key={feature.label}
                      className="flex items-center gap-3 text-[15px] text-gray-500"
                    >
                      <span className="text-sage shrink-0">{feature.icon}</span>
                      {feature.label}
                    </div>
                  ))}
                </div>
              </div>

              {/* Connectivity */}
              <div>
                <p className="text-[13px] font-semibold text-gray-600 tracking-[-0.01em] mb-4">
                  Connectivity
                </p>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  {CONNECTIVITY.map((item) => (
                    <div
                      key={item.place}
                      className="bg-chalk rounded-[12px] p-4"
                    >
                      <p className="text-[20px] font-serif text-sage mb-1">
                        {item.time}
                      </p>
                      <p className="text-[13px] text-gray-400 leading-snug">
                        {item.place}
                      </p>
                    </div>
                  ))}
                </div>
              </div>

              {/* Investment range */}
              <div className="mt-8 pt-8 border-t border-gray-200 text-center">
                <p className="text-[15px] text-gray-500">
                  Investment range:{" "}
                  <span className="font-semibold text-ink">&#8377;2Cr+</span>
                  &nbsp;&middot;&nbsp;Status:{" "}
                  <span className="font-semibold text-ink">Pre-Launch</span>
                  &nbsp;&middot;&nbsp;Ground-breaking:{" "}
                  <span className="font-semibold text-ink">April 2025</span>
                </p>
              </div>
            </div>
          </FadeUp>
        </div>
      </section>

      {/* ─── Section 4: Sector 62 Teaser ─── */}
      <section className="bg-ink px-5 py-16 lg:py-24">
        <div className="max-w-[640px] mx-auto text-center">
          <FadeUp>
            <div className="inline-flex items-center gap-2 bg-white/10 rounded-full px-4 py-1.5 mb-6">
              <span className="w-2 h-2 rounded-full bg-sage animate-pulse-dot" />
              <span className="text-[12px] font-semibold text-gray-300 tracking-[0.06em] uppercase">
                Coming Soon
              </span>
            </div>
          </FadeUp>

          <FadeUp delay={0.1}>
            <h2 className="font-serif text-[clamp(28px,4.5vw,44px)] leading-[1.1] tracking-[-0.03em] text-white mb-5">
              Sector 62, Mohali
            </h2>
          </FadeUp>

          <FadeUp delay={0.2}>
            <p className="text-[clamp(15px,2vw,17px)] text-gray-400 leading-relaxed mb-4">
              One of the two largest and most prime group housing mixed-use land
              parcels in Sector 62. Recently acquired from GMADA auction.
            </p>
            <p className="text-[clamp(15px,2vw,17px)] text-gray-400 leading-relaxed mb-8">
              Project details are confidential. But as an authorized advisory
              partner, we&apos;re briefing serious investors before the public
              announcement.
            </p>
          </FadeUp>

          <FadeUp delay={0.3}>
            <a
              href="#book-meeting"
              className="inline-flex items-center justify-center gap-2 bg-white text-ink px-9 py-4 rounded-full text-[16px] font-semibold tracking-[-0.01em] hover:bg-gray-100 hover:scale-[1.03] transition-all duration-300"
            >
              Get Early Access
            </a>
            <p className="text-[13px] text-gray-500 mt-4">
              Serious investors only. &#8377;1Cr+ allocation.
            </p>
          </FadeUp>
        </div>
      </section>

      {/* ─── Section 5: Why Homeland Group ─── */}
      <section className="bg-white px-5 py-16 lg:py-24">
        <div className="max-w-[960px] mx-auto">
          <FadeUp>
            <p className="text-[13px] font-semibold text-sage tracking-[0.08em] uppercase mb-3 text-center">
              The Builder
            </p>
            <h2 className="font-serif text-[clamp(26px,4vw,40px)] leading-[1.15] tracking-[-0.02em] text-ink text-center mb-12">
              Punjab&apos;s Most Trusted Premium Developer
            </h2>
          </FadeUp>

          <FadeUp delay={0.1}>
            <div className="grid grid-cols-3 gap-4 text-center mb-10">
              {BUILDER_STATS.map((item) => (
                <div key={item.label} className="bg-chalk rounded-[16px] p-6">
                  <p className="font-serif text-[clamp(24px,3.5vw,36px)] text-sage tracking-[-0.02em]">
                    {item.stat}
                  </p>
                  <p className="text-[13px] text-gray-400 mt-1">{item.label}</p>
                </div>
              ))}
            </div>
          </FadeUp>

          <FadeUp delay={0.2}>
            <div className="bg-chalk rounded-[20px] p-7 lg:p-8">
              <p className="text-[13px] font-semibold text-gray-600 mb-4">
                Track Record
              </p>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                {[
                  { name: "Homeland Heights", loc: "Sector 70", status: "Delivered", statusColor: "text-sage" },
                  { name: "CP.67", loc: "Sector 67", status: "Operational", statusColor: "text-sage" },
                  { name: "Homeland Regalia", loc: "Sector 77", status: "Completing 2026", statusColor: "text-gold" },
                  { name: "Global Park", loc: "Sector 75", status: "Pre-Launch", statusColor: "text-sage" },
                ].map((project) => (
                  <div key={project.name} className="bg-white rounded-[12px] p-4">
                    <p className="text-[15px] font-semibold text-ink">{project.name}</p>
                    <p className="text-[13px] text-gray-400">{project.loc}</p>
                    <p className={`text-[13px] font-semibold mt-1 ${project.statusColor}`}>
                      {project.status}
                    </p>
                  </div>
                ))}
              </div>
              <p className="text-[15px] text-gray-500 mt-6 leading-relaxed">
                In a market full of builders who over-promise, Homeland Group is
                one of the few that delivers. On time. On spec. Verified by us.
              </p>
            </div>
          </FadeUp>
        </div>
      </section>

      {/* ─── Section 6: How It Works ─── */}
      <section className="bg-chalk px-5 py-16 lg:py-24">
        <div className="max-w-[960px] mx-auto">
          <FadeUp>
            <p className="text-[13px] font-semibold text-sage tracking-[0.08em] uppercase mb-3 text-center">
              How It Works
            </p>
            <h2 className="font-serif text-[clamp(26px,4vw,40px)] leading-[1.15] tracking-[-0.02em] text-ink text-center mb-12">
              3 Steps. 30 Minutes. Complete Clarity.
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

      {/* ─── Section 7: Lead Form + Calendly + WhatsApp ─── */}
      <section id="book-meeting" className="bg-white px-5 py-16 lg:py-24">
        <div className="max-w-[960px] mx-auto">
          <FadeUp>
            <h2 className="font-serif text-[clamp(26px,4vw,40px)] leading-[1.15] tracking-[-0.02em] text-ink text-center mb-3">
              Book Your Free Strategy Meeting
            </h2>
            <p className="text-[16px] text-gray-500 text-center max-w-[480px] mx-auto mb-12 leading-relaxed">
              No sales pitch. No spam. No broker follow-ups. Just data and honest
              advice.
            </p>
          </FadeUp>

          <div className="flex flex-col lg:flex-row items-start justify-center gap-10 lg:gap-16">
            {/* Form */}
            <FadeUp delay={0.1}>
              <HomelandForm />
            </FadeUp>

            {/* Or divider + alternatives */}
            <FadeUp delay={0.2}>
              <div className="flex flex-col items-center gap-6 lg:pt-10">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-[1.5px] bg-gray-200" />
                  <span className="text-[13px] text-gray-400 font-semibold">OR</span>
                  <div className="w-12 h-[1.5px] bg-gray-200" />
                </div>

                {/* Calendly */}
                {calendlyUrl && (
                  <div className="text-center">
                    <p className="text-[13px] text-gray-500 mb-3">
                      Book directly on our calendar
                    </p>
                    <CalendlyButton url={calendlyUrl} text="Pick a Time Slot" />
                  </div>
                )}

                {/* WhatsApp */}
                <div className="text-center">
                  <p className="text-[13px] text-gray-500 mb-3">
                    Quick question? Message us
                  </p>
                  <WhatsAppLink
                    href={whatsappUrl}
                    className="inline-flex items-center justify-center gap-2 bg-[#25D366] text-white px-7 py-3.5 rounded-full text-[15px] font-semibold hover:bg-[#1fb855] hover:scale-[1.03] transition-all duration-300"
                  >
                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
                    </svg>
                    WhatsApp Us
                  </WhatsAppLink>
                </div>

                {/* Trust signals */}
                <div className="text-center mt-4">
                  <p className="text-[12px] text-gray-400">
                    &#10003; Free &nbsp;&nbsp; &#10003; Confidential &nbsp;&nbsp;
                    &#10003; Zero spam guarantee
                  </p>
                  <p className="text-[12px] text-gray-300 mt-2">
                    Authorized Channel Partner of Homeland Group
                  </p>
                </div>
              </div>
            </FadeUp>
          </div>
        </div>
      </section>

      {/* ─── Section 8: Minimal Footer ─── */}
      <footer className="bg-chalk border-t border-gray-200 px-5 py-8">
        <div className="max-w-[960px] mx-auto text-center">
          <p className="font-serif text-[16px] text-ink mb-2">
            SquareMind
          </p>
          <p className="text-[13px] text-gray-400 mb-4">
            Tri-City&apos;s First Independent Real Estate Advisory
          </p>
          <p className="text-[13px] text-gray-400 mb-4">
            hello@squaremind.in &nbsp;&middot;&nbsp; +91 8968066810
          </p>
          <p className="text-[12px] text-gray-300 mb-3">
            RERA: PBRERA-SAS81-PC0325 (Homeland Global Park)
            &nbsp;&middot;&nbsp; Authorized Channel Partner of Homeland Group
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
            SquareMind is an independent advisory service. Investment decisions
            should be made after thorough due diligence. Past performance is not
            indicative of future results.
          </p>
        </div>
      </footer>
    </>
  );
}
