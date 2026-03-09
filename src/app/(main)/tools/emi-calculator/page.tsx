import type { Metadata } from "next";
import ToolPageWrapper from "@/components/calculators/shared/ToolPageWrapper";
import EMICalculator from "@/components/calculators/EMICalculator";

export const metadata: Metadata = {
  title: "EMI Calculator — Home Loan EMI Calculator India | SquareMind",
  description:
    "Calculate your monthly home loan EMI with our free calculator. See total interest payable, amortization schedule by year, and get verdicts on loan efficiency.",
  openGraph: {
    title: "EMI Calculator — Home Loan EMI Calculator India | SquareMind",
    description:
      "Calculate your monthly home loan EMI. View year-wise amortization schedule and total interest payable.",
    type: "website",
  },
};

export default function EMICalculatorPage() {
  return (
    <ToolPageWrapper
      title="EMI Calculator"
      description="Calculate your monthly home loan EMI and see the full amortization schedule. Know exactly how much you will pay in interest over the loan tenure."
    >
      <EMICalculator />
    </ToolPageWrapper>
  );
}
