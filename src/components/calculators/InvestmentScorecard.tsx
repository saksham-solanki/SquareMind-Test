"use client";

import { useState } from "react";
import CalcField from "@/components/calculators/shared/CalcField";
import VerdictBox from "@/components/calculators/shared/VerdictBox";

interface ScoreCategory {
  name: string;
  scored: number;
  max: number;
}

function getGrade(score: number): "A" | "B" | "C" | "D" {
  if (score >= 75) return "A";
  if (score >= 55) return "B";
  if (score >= 35) return "C";
  return "D";
}

const gradeColors: Record<string, string> = {
  A: "text-sage",
  B: "text-blue-500",
  C: "text-amber-500",
  D: "text-red-500",
};

const gradeBgColors: Record<string, string> = {
  A: "bg-sage-light",
  B: "bg-blue-50",
  C: "bg-amber-50",
  D: "bg-red-50",
};

const gradeMessages: Record<string, string> = {
  A: "Strong investment candidate. This property scores well across key parameters.",
  B: "Decent investment. Consider improving weak areas before committing.",
  C: "Proceed with caution. Multiple risk factors identified.",
  D: "High risk. Significant concerns across multiple parameters.",
};

function getVerdictVariant(
  grade: string
): "positive" | "neutral" | "warning" {
  if (grade === "A") return "positive";
  if (grade === "B") return "neutral";
  return "warning";
}

export default function InvestmentScorecard() {
  const [rentalYield, setRentalYield] = useState<number>(3);
  const [cityTier, setCityTier] = useState<string>("tier1");
  const [builderRep, setBuilderRep] = useState<string>("established");
  const [reraRegistered, setReraRegistered] = useState<string>("yes");
  const [nearMetro, setNearMetro] = useState<string>("yes");
  const [priceRatio, setPriceRatio] = useState<number>(1.0);
  const [hasOC, setHasOC] = useState<string>("yes");

  // Scoring logic
  const yieldScore =
    rentalYield >= 4 ? 25 : rentalYield >= 3 ? 20 : rentalYield >= 2 ? 12 : 5;

  const locationScore =
    cityTier === "tier1" ? 20 : cityTier === "tier2" ? 15 : 8;

  const builderScore =
    builderRep === "established" ? 15 : builderRep === "mid" ? 10 : 5;

  const reraScore = reraRegistered === "yes" ? 15 : 0;

  const infraScore = nearMetro === "yes" ? 10 : 3;

  const priceScore = priceRatio <= 1.1 ? 10 : priceRatio <= 1.3 ? 6 : 2;

  const docScore = hasOC === "yes" ? 5 : 0;

  const totalScore =
    yieldScore +
    locationScore +
    builderScore +
    reraScore +
    infraScore +
    priceScore +
    docScore;

  const grade = getGrade(totalScore);

  const categories: ScoreCategory[] = [
    { name: "Rental Yield", scored: yieldScore, max: 25 },
    { name: "Location (City Tier)", scored: locationScore, max: 20 },
    { name: "Builder Reputation", scored: builderScore, max: 15 },
    { name: "RERA Registration", scored: reraScore, max: 15 },
    { name: "Infrastructure (Metro)", scored: infraScore, max: 10 },
    { name: "Price Fairness", scored: priceScore, max: 10 },
    { name: "Documentation (OC)", scored: docScore, max: 5 },
  ];

  return (
    <div
      className="bg-cream rounded-[28px] p-12 max-lg:p-6 mt-8"
      id="investment-scorecard"
    >
      <h3 className="font-serif text-[28px] tracking-[-0.02em] mb-2">
        SquareMind Investment Scorecard
      </h3>
      <p className="text-[15px] text-gray-500 mb-8 tracking-[-0.01em]">
        Rate any property investment across 7 key parameters and get an
        objective A/B/C/D grade.
      </p>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-start">
        {/* Inputs */}
        <div className="flex flex-col gap-4">
          <CalcField
            label="Expected Rental Yield (%)"
            value={rentalYield}
            onChange={(v) => setRentalYield(+v)}
            min={0}
            max={20}
            step={0.5}
            hint="Annual rent / property price as percentage"
          />
          <CalcField
            label="City Tier"
            value={cityTier}
            onChange={(v) => setCityTier(String(v))}
            type="select"
            options={[
              { value: "tier1", label: "Tier 1 (Metro cities)" },
              { value: "tier2", label: "Tier 2 (Growing cities)" },
              { value: "tier3", label: "Tier 3 (Smaller cities)" },
            ]}
          />
          <CalcField
            label="Builder Reputation"
            value={builderRep}
            onChange={(v) => setBuilderRep(String(v))}
            type="select"
            options={[
              { value: "established", label: "Established (10+ years, known brand)" },
              { value: "mid", label: "Mid-tier (5-10 years)" },
              { value: "new", label: "New (< 5 years)" },
            ]}
          />
          <CalcField
            label="RERA Registered"
            value={reraRegistered}
            onChange={(v) => setReraRegistered(String(v))}
            type="select"
            options={[
              { value: "yes", label: "Yes" },
              { value: "no", label: "No" },
            ]}
          />
          <CalcField
            label="Near Metro / Major Transit"
            value={nearMetro}
            onChange={(v) => setNearMetro(String(v))}
            type="select"
            options={[
              { value: "yes", label: "Yes, within 2km" },
              { value: "no", label: "No" },
            ]}
          />
          <CalcField
            label="Price vs Circle Rate Ratio"
            value={priceRatio}
            onChange={(v) => setPriceRatio(+v)}
            min={0.5}
            max={3}
            step={0.05}
            hint="1.0 = at circle rate, 1.2 = 20% above"
          />
          <CalcField
            label="Has Occupancy Certificate (OC)"
            value={hasOC}
            onChange={(v) => setHasOC(String(v))}
            type="select"
            options={[
              { value: "yes", label: "Yes" },
              { value: "no", label: "No" },
            ]}
          />
        </div>

        {/* Scorecard Results */}
        <div className="bg-white rounded-[20px] p-9 max-lg:p-6">
          <div className="text-[13px] font-semibold text-gray-400 uppercase tracking-[0.06em] mb-4">
            Investment Grade
          </div>

          {/* Large Grade */}
          <div className="flex items-baseline gap-4 mb-6">
            <div
              className={`font-serif text-[80px] leading-[1] tracking-[-0.04em] ${gradeColors[grade]}`}
            >
              {grade}
            </div>
            <div className="text-[14px] text-gray-500 tracking-[-0.01em]">
              <span className="font-bold text-ink text-[28px]">
                {totalScore}
              </span>
              <span className="text-[18px]"> / 100</span>
            </div>
          </div>

          {/* Breakdown Table */}
          <div className="space-y-0">
            <div className="flex justify-between text-[12px] font-semibold text-gray-400 uppercase tracking-[0.06em] pb-2 border-b border-gray-200">
              <span>Category</span>
              <span>Score</span>
            </div>
            {categories.map((cat) => (
              <div
                key={cat.name}
                className="flex justify-between py-2.5 text-[14px] tracking-[-0.01em] border-b border-gray-100"
              >
                <span className="text-gray-600">{cat.name}</span>
                <span className="font-semibold text-ink">
                  {cat.scored}{" "}
                  <span className="text-gray-400 font-normal">
                    / {cat.max}
                  </span>
                </span>
              </div>
            ))}
            <div className="flex justify-between pt-3 mt-1 font-bold text-[15px] text-ink">
              <span>Total</span>
              <span className="text-sage">
                {totalScore}{" "}
                <span className="text-gray-400 font-normal">/ 100</span>
              </span>
            </div>
          </div>

          {/* Grade Badge */}
          <div
            className={`mt-5 rounded-[12px] px-4 py-3 flex items-center gap-3 ${gradeBgColors[grade]}`}
          >
            <span
              className={`font-serif text-[24px] font-bold ${gradeColors[grade]}`}
            >
              {grade}
            </span>
            <span className="text-[13px] text-gray-600 leading-snug">
              {grade === "A" && "Excellent"}
              {grade === "B" && "Good"}
              {grade === "C" && "Below Average"}
              {grade === "D" && "Poor"}
            </span>
          </div>

          <VerdictBox variant={getVerdictVariant(grade)}>
            {gradeMessages[grade]}
          </VerdictBox>

          <div className="mt-4 text-[11px] text-gray-400 tracking-[-0.01em]">
            SquareMind Investment Scorecard &mdash; not an industry standard
          </div>
        </div>
      </div>
    </div>
  );
}
