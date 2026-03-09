import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Free Real Estate Investment Tools & Calculators — SquareMind",
  description:
    "Free interactive real estate investment tools: Rental Yield, Buy vs Rent, Total Cost, EMI, Stamp Duty, Investment Scorecard, RERA Verifier, and NRI Tax Calculator. No signup required.",
  openGraph: {
    title: "Free Real Estate Investment Tools & Calculators — SquareMind",
    description: "Free interactive real estate investment calculators. No signup required.",
    url: "/tools",
  },
};

export default function ToolsLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
