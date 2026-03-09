import type { Metadata } from "next";
import ToolPageWrapper from "@/components/calculators/shared/ToolPageWrapper";
import NRITaxCalc from "@/components/calculators/NRITaxCalc";

export const metadata: Metadata = {
  title:
    "NRI Tax Calculator -- Property Tax for NRIs in India 2026 | SquareMind",
  description:
    "Calculate tax on rental income and capital gains from Indian property as an NRI. DTAA-aware rates for US, UK, Canada, UAE, Singapore, and Australia.",
};

export default function NRITaxCalculatorPage() {
  return (
    <ToolPageWrapper
      title="NRI Tax Calculator"
      description="Estimate tax on rental income and capital gains from Indian property. DTAA-aware rates for 6 countries with surcharge computation."
    >
      <NRITaxCalc />
    </ToolPageWrapper>
  );
}
