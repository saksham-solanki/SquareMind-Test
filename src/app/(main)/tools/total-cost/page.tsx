import type { Metadata } from "next";
import ToolPageWrapper from "@/components/calculators/shared/ToolPageWrapper";
import TotalCostCalc from "@/components/calculators/TotalCostCalc";

export const metadata: Metadata = {
  title: "Total Cost of Ownership Calculator — True Property Cost India | SquareMind",
  description:
    "Calculate the true total cost of owning a property in India. Includes state-wise stamp duty, registration, GST, maintenance, property tax, and more across all 28 states and 8 UTs.",
  openGraph: {
    title: "Total Cost of Ownership Calculator — True Property Cost India | SquareMind",
    description:
      "Calculate the true total cost of owning a property in India. Includes state-wise stamp duty, registration, and all hidden costs.",
    type: "website",
  },
};

export default function TotalCostPage() {
  return (
    <ToolPageWrapper
      title="Total Cost of Ownership Calculator"
      description="The REAL cost of owning a property — beyond the sticker price. State-wise stamp duty rates with gender-based differences for all Indian states."
    >
      <TotalCostCalc />
    </ToolPageWrapper>
  );
}
