import type { Metadata } from "next";
import ToolPageWrapper from "@/components/calculators/shared/ToolPageWrapper";
import StampDutyCalc from "@/components/calculators/StampDutyCalc";

export const metadata: Metadata = {
  title:
    "Stamp Duty Calculator — State-wise Stamp Duty Rates 2026 | SquareMind",
  description:
    "Calculate stamp duty and registration charges for any state in India. Compare gender-based rates across all 28 states and 8 union territories. Updated for 2026.",
  openGraph: {
    title:
      "Stamp Duty Calculator — State-wise Stamp Duty Rates 2026 | SquareMind",
    description:
      "Calculate stamp duty and registration charges for any Indian state. Gender-based rates for all states and UTs.",
    type: "website",
  },
};

export default function StampDutyCalculatorPage() {
  return (
    <ToolPageWrapper
      title="Stamp Duty Calculator"
      description="Calculate stamp duty and registration charges for any state in India. Gender-based rates included for all 28 states and 8 union territories."
    >
      <StampDutyCalc />
    </ToolPageWrapper>
  );
}
