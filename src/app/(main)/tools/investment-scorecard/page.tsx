import type { Metadata } from "next";
import ToolPageWrapper from "@/components/calculators/shared/ToolPageWrapper";
import InvestmentScorecard from "@/components/calculators/InvestmentScorecard";

export const metadata: Metadata = {
  title: "Investment Scorecard -- Rate Your Property Investment | SquareMind",
  description:
    "Get an objective A/B/C/D investment grade for any property. Score across 7 key parameters including rental yield, builder reputation, RERA status, and location.",
};

export default function InvestmentScorecardPage() {
  return (
    <ToolPageWrapper
      title="Investment Scorecard"
      description="Rate any property investment across 7 key parameters. Get an objective grade backed by data, not broker opinions."
    >
      <InvestmentScorecard />
    </ToolPageWrapper>
  );
}
