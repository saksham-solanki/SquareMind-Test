"use client";

import { useState } from "react";
import CalcField from "@/components/calculators/shared/CalcField";
import ResultRow from "@/components/calculators/shared/ResultRow";
import VerdictBox from "@/components/calculators/shared/VerdictBox";
import { CITY_BENCHMARKS } from "@/data/city-benchmarks";

function fmt(n: number) {
  return "\u20B9" + Math.round(n).toLocaleString("en-IN");
}

const TAX_OPTIONS = [
  { value: "0", label: "0% (No tax)" },
  { value: "5", label: "5% (Old regime)" },
  { value: "20", label: "20% (Old regime)" },
  { value: "30", label: "30% (Highest slab)" },
];

export default function RentalYieldCalc() {
  const [price, setPrice] = useState(10000000);
  const [rent, setRent] = useState(25000);
  const [maintenance, setMaintenance] = useState(36000);
  const [vacancy, setVacancy] = useState(1);
  const [taxRate, setTaxRate] = useState("30");
  const [calculated, setCalculated] = useState(false);

  const taxPct = Number(taxRate) / 100;
  const annualGross = rent * 12;
  const vacancyLoss = rent * vacancy;
  const netBeforeTax = annualGross - maintenance - vacancyLoss;
  const tax = netBeforeTax * taxPct;
  const netIncome = netBeforeTax - tax;
  const grossYield = price > 0 ? (annualGross / price) * 100 : 0;
  const netYield = price > 0 ? (netIncome / price) * 100 : 0;

  const verdictVariant = calculated
    ? netYield >= 3
      ? "positive"
      : netYield >= 2
        ? "neutral"
        : "warning"
    : "neutral";

  const verdictText = calculated
    ? netYield >= 3
      ? `Verdict: Strong yield at ${netYield.toFixed(1)}% net. This is above the national average of 2-3%. Worth considering as a rental investment.`
      : netYield >= 2
        ? `Verdict: Average yield at ${netYield.toFixed(1)}% net. Most Indian properties fall in this range. Capital appreciation will need to do the heavy lifting.`
        : `Verdict: Weak yield at ${netYield.toFixed(1)}% net. You would earn more in a fixed deposit. Only invest here if you expect significant appreciation.`
    : "Enter your numbers and calculate to see the verdict.";

  return (
    <div className="bg-cream rounded-[28px] p-12 max-lg:p-6 mt-8" id="rental-yield">
      <h3 className="font-serif text-[28px] tracking-[-0.02em] mb-2">Rental Yield Calculator</h3>
      <p className="text-[15px] text-gray-500 mb-8 tracking-[-0.01em]">Calculate the REAL rental yield &mdash; not the inflated number brokers quote.</p>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-start">
        <div className="flex flex-col gap-4">
          <CalcField label="Property Purchase Price (₹)" value={price} onChange={(v) => setPrice(+v)} />
          <CalcField label="Monthly Rent Expected (₹)" value={rent} onChange={(v) => setRent(+v)} />
          <CalcField label="Annual Maintenance (₹)" value={maintenance} onChange={(v) => setMaintenance(+v)} hint="Society charges, repairs, property tax" />
          <CalcField label="Vacancy (months/year)" value={vacancy} onChange={(v) => setVacancy(+v)} min={0} max={12} hint="Average 1-2 months between tenants" />
          <CalcField
            label="Tax Bracket"
            value={taxRate}
            onChange={(v) => setTaxRate(String(v))}
            type="select"
            options={TAX_OPTIONS}
          />
          <button onClick={() => setCalculated(true)} className="w-full bg-ink text-white py-4 rounded-full text-[16px] font-semibold hover:bg-gray-600 hover:scale-[1.02] transition-all duration-300 mt-2 tracking-[-0.01em]">
            Calculate rental yield
          </button>
        </div>
        <div className="bg-white rounded-[20px] p-9 max-lg:p-6">
          <div className="text-[13px] font-semibold text-gray-400 uppercase tracking-[0.06em] mb-2">Gross Rental Yield</div>
          <div className="font-serif text-[clamp(36px,4vw,48px)] tracking-[-0.03em] text-ink leading-[1.1]">{grossYield.toFixed(2)}%</div>
          <div className="text-[14px] text-gray-500 mt-2 tracking-[-0.01em]">{fmt(rent)}/month on {fmt(price)} property</div>
          <div className="mt-6 pt-6 border-t border-gray-200">
            <div className="text-[13px] font-semibold text-gray-400 uppercase tracking-[0.06em] mb-2">Net Rental Yield</div>
            <div className="font-serif text-[36px] tracking-[-0.03em] text-ink leading-[1.1]">{netYield.toFixed(2)}%</div>
            <div className="mt-4 space-y-2">
              <ResultRow label="Annual Gross Rent" value={fmt(annualGross)} />
              <ResultRow label="Less: Maintenance" value={fmt(maintenance)} />
              <ResultRow label="Less: Vacancy Loss" value={fmt(vacancyLoss)} />
              <ResultRow label={`Less: Tax (${taxRate}%)`} value={fmt(tax)} />
              <ResultRow label="Net Annual Income" value={fmt(netIncome)} highlight />
            </div>
          </div>
          <VerdictBox variant={verdictVariant}>{verdictText}</VerdictBox>

          {/* City Benchmark Comparison */}
          <div className="mt-6 pt-6 border-t border-gray-200">
            <div className="text-[13px] font-semibold text-gray-400 uppercase tracking-[0.06em] mb-3">City Benchmark Comparison</div>
            <div className="space-y-2">
              {CITY_BENCHMARKS.map((b) => (
                <div key={b.city} className="flex justify-between items-center py-1.5 text-[13px]">
                  <span className="text-gray-600">{b.city}</span>
                  <div className="flex items-center gap-2">
                    <span className="font-semibold text-ink">{b.avgGrossYield}%</span>
                    <span className="text-gray-400 text-[12px]">({b.yieldRange[0]}-{b.yieldRange[1]}%)</span>
                  </div>
                </div>
              ))}
            </div>
            <div className="text-[12px] text-gray-400 mt-2">Average gross yields. Your net yield will vary based on expenses and tax bracket.</div>
          </div>
        </div>
      </div>
    </div>
  );
}
