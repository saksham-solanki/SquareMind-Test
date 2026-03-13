import type { Metadata } from "next";
import Link from "next/link";
import FadeUp from "@/components/FadeUp";
import ThankYouTracker from "@/components/ThankYouTracker";

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://squaremind.in";

export const metadata: Metadata = {
  title: "Thank You — Meeting Booked | SquareMind",
  description:
    "Your free strategy meeting with SquareMind has been booked. We look forward to sharing our independent analysis.",
  robots: {
    index: false,
    follow: false,
  },
  alternates: {
    canonical: `${siteUrl}/homeland/thank-you`,
  },
};

export default function HomelandThankYou() {
  const whatsappUrl =
    "https://wa.me/918968066810?text=Hi%20SquareMind%2C%20I%20just%20booked%20a%20meeting.%20Looking%20forward%20to%20connecting.";

  return (
    <>
      <ThankYouTracker />

      <section className="bg-chalk min-h-screen flex flex-col justify-center px-5 py-16">
        <div className="max-w-[560px] mx-auto text-center">
          <FadeUp>
            <Link href="/" className="inline-block mb-10" aria-label="SquareMind Home">
              <span className="font-serif text-[22px] tracking-[-0.03em] text-ink">
                SquareMind
              </span>
            </Link>
          </FadeUp>

          <FadeUp delay={0.1}>
            <div className="w-16 h-16 bg-sage rounded-full flex items-center justify-center mx-auto mb-6">
              <svg
                className="w-8 h-8 text-white"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={2.5}
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M4.5 12.75l6 6 9-13.5"
                />
              </svg>
            </div>
          </FadeUp>

          <FadeUp delay={0.2}>
            <h1 className="font-serif text-[clamp(28px,5vw,44px)] leading-[1.1] tracking-[-0.03em] text-ink mb-4">
              You&apos;re All Set.
            </h1>
          </FadeUp>

          <FadeUp delay={0.3}>
            <p className="text-[clamp(16px,2vw,18px)] text-gray-500 leading-relaxed mb-3">
              Your free strategy meeting has been booked. Our advisory team will
              reach out within 24 hours to confirm.
            </p>
            <p className="text-[15px] text-gray-400 leading-relaxed mb-8">
              We&apos;ll walk you through our independent analysis of Homeland
              Global Park and the upcoming Sector 62 project &mdash; numbers,
              risks, and an honest recommendation.
            </p>
          </FadeUp>

          <FadeUp delay={0.4}>
            <div className="bg-white rounded-[20px] border border-gray-200 p-6 mb-8">
              <p className="text-[13px] font-semibold text-gray-600 mb-4">
                What to expect in your meeting:
              </p>
              <div className="space-y-3 text-left">
                {[
                  "Independent analysis of Homeland Global Park (Sector 75)",
                  "Early briefing on the Sector 62 pre-launch project",
                  "RERA-verified data, builder track record, risk assessment",
                  "Honest recommendation — including reasons NOT to invest",
                ].map((item) => (
                  <div key={item} className="flex items-start gap-3">
                    <span className="text-sage mt-0.5 shrink-0">
                      <svg
                        className="w-4 h-4"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                        strokeWidth={2}
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M4.5 12.75l6 6 9-13.5"
                        />
                      </svg>
                    </span>
                    <span className="text-[14px] text-gray-500">{item}</span>
                  </div>
                ))}
              </div>
            </div>
          </FadeUp>

          <FadeUp delay={0.5}>
            <p className="text-[14px] text-gray-500 mb-4">
              Want to connect before the meeting?
            </p>
            <a
              href={whatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-2 bg-[#25D366] text-white px-7 py-3.5 rounded-full text-[15px] font-semibold hover:bg-[#1fb855] hover:scale-[1.03] transition-all duration-300"
            >
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
              </svg>
              Message Us on WhatsApp
            </a>
          </FadeUp>

          <FadeUp delay={0.6}>
            <div className="mt-10 pt-8 border-t border-gray-200">
              <p className="text-[12px] text-gray-300">
                SquareMind &mdash; Tri-City&apos;s First Independent Real Estate
                Advisory
              </p>
              <p className="text-[11px] text-gray-300 mt-1">
                Authorized Channel Partner of Homeland Group
              </p>
            </div>
          </FadeUp>
        </div>
      </section>
    </>
  );
}
