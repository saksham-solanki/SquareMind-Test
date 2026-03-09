import type { Metadata } from "next";
import ToolPageWrapper from "@/components/calculators/shared/ToolPageWrapper";
import BuyVsRentCalc from "@/components/calculators/BuyVsRentCalc";

export const metadata: Metadata = {
  title: "Buy vs Rent Calculator — Should You Buy or Rent in India? | SquareMind",
  description:
    "Compare the true cost of buying vs renting in India. Factor in EMI, appreciation, rent inflation, and equity returns to make a data-driven decision.",
  openGraph: {
    title: "Buy vs Rent Calculator — Should You Buy or Rent in India? | SquareMind",
    description:
      "Compare the true cost of buying vs renting in India. Factor in EMI, appreciation, rent inflation, and equity returns.",
    type: "website",
  },
};

export default function BuyVsRentPage() {
  return (
    <ToolPageWrapper
      title="Buy vs Rent Calculator"
      description="The honest math behind 'should I buy or rent?' — with adjustable assumptions so you can model your exact scenario."
    >
      <BuyVsRentCalc />
    </ToolPageWrapper>
  );
}
