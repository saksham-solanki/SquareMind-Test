import type { Metadata } from "next";
import ToolPageWrapper from "@/components/calculators/shared/ToolPageWrapper";
import RentalYieldCalc from "@/components/calculators/RentalYieldCalc";

export const metadata: Metadata = {
  title: "Rental Yield Calculator — Real Rental Yield India | SquareMind",
  description:
    "Calculate the real rental yield on your investment property. Compare gross and net yields with city benchmarks across India. Adjustable tax bracket, maintenance, and vacancy inputs.",
  openGraph: {
    title: "Rental Yield Calculator — Real Rental Yield India | SquareMind",
    description:
      "Calculate the real rental yield on your investment property. Compare gross and net yields with city benchmarks across India.",
    type: "website",
  },
};

export default function RentalYieldPage() {
  return (
    <ToolPageWrapper
      title="Rental Yield Calculator"
      description="Calculate the REAL rental yield — not the inflated number brokers quote. Compare with city benchmarks across India."
    >
      <RentalYieldCalc />
    </ToolPageWrapper>
  );
}
