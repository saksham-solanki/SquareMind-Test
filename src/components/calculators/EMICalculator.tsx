"use client";

import { useState } from "react";
import CalcField from "@/components/calculators/shared/CalcField";
import ResultRow from "@/components/calculators/shared/ResultRow";
import VerdictBox from "@/components/calculators/shared/VerdictBox";

function fmt(n: number) {
  return "\u20B9" + Math.round(n).toLocaleString("en-IN");
}

interface AmortRow {
  year: number;
  opening: number;
  principal: number;
  interest: number;
  closing: number;
}

export default function EMICalculator() {
  const [principal, setPrincipal] = useState(5000000);
  const [annualRate, setAnnualRate] = useState(8.5);
  const [tenure, setTenure] = useState(20);
  const [calculated, setCalculated] = useState(false);
  const [showAmort, setShowAmort] = useState(false);

  const months = tenure * 12;
  const r = annualRate / 100 / 12;
  const emi =
    r > 0
      ? (principal * r * Math.pow(1 + r, months)) /
        (Math.pow(1 + r, months) - 1)
      : principal / months;
  const totalAmount = emi * months;
  const totalInterest = totalAmount - principal;
  const interestRatio = principal > 0 ? totalInterest / principal : 0;

  // Build amortization schedule aggregated by year
  const amortization: AmortRow[] = [];
  let balance = principal;
  for (let yr = 1; yr <= tenure; yr++) {
    const opening = balance;
    let yearPrincipal = 0;
    let yearInterest = 0;
    for (let m = 0; m < 12; m++) {
      const intPart = balance * r;
      const prinPart = emi - intPart;
      yearInterest += intPart;
      yearPrincipal += prinPart;
      balance -= prinPart;
    }
    if (balance < 0) balance = 0;
    amortization.push({
      year: yr,
      opening,
      principal: yearPrincipal,
      interest: yearInterest,
      closing: balance,
    });
  }

  const verdictVariant = calculated
    ? totalInterest > principal
      ? "warning"
      : totalInterest < principal * 0.5
        ? "positive"
        : "neutral"
    : "neutral";

  const verdictText = calculated
    ? totalInterest > principal
      ? `You will pay more in interest (${fmt(totalInterest)}) than the loan itself (${fmt(principal)}). Consider a shorter tenure or higher down payment.`
      : totalInterest < principal * 0.5
        ? `Interest-efficient loan. Total interest is ${(interestRatio * 100).toFixed(0)}% of the principal — well below the loan amount.`
        : `Total interest is ${(interestRatio * 100).toFixed(0)}% of the principal. A shorter tenure or lower rate would reduce this further.`
    : "Enter your loan details and calculate to see the verdict.";

  return (
    <div className="bg-cream rounded-[28px] p-12 max-lg:p-6 mt-8" id="emi-calculator">
      <h3 className="font-serif text-[28px] tracking-[-0.02em] mb-2">EMI Calculator</h3>
      <p className="text-[15px] text-gray-500 mb-8 tracking-[-0.01em]">
        Calculate your monthly home loan EMI and see the full amortization schedule.
      </p>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-start">
        <div className="flex flex-col gap-4">
          <CalcField
            label="Loan Amount (₹)"
            value={principal}
            onChange={(v) => setPrincipal(+v)}
          />
          <CalcField
            label="Annual Interest Rate (%)"
            value={annualRate}
            onChange={(v) => setAnnualRate(+v)}
            step={0.1}
            min={0}
            max={25}
          />
          <CalcField
            label="Loan Tenure (years)"
            value={tenure}
            onChange={(v) => setTenure(+v)}
            min={1}
            max={30}
          />
          <button
            onClick={() => setCalculated(true)}
            className="w-full bg-ink text-white py-4 rounded-full text-[16px] font-semibold hover:bg-gray-600 hover:scale-[1.02] transition-all duration-300 mt-2 tracking-[-0.01em]"
          >
            Calculate EMI
          </button>
        </div>
        <div className="bg-white rounded-[20px] p-9 max-lg:p-6">
          <div className="text-[13px] font-semibold text-gray-400 uppercase tracking-[0.06em] mb-2">
            Monthly EMI
          </div>
          <div className="font-serif text-[clamp(36px,4vw,48px)] tracking-[-0.03em] text-ink leading-[1.1]">
            {fmt(emi)}
          </div>
          <div className="text-[14px] text-gray-500 mt-2 tracking-[-0.01em]">
            per month for {tenure} years
          </div>
          <div className="mt-6 pt-6 border-t border-gray-200 space-y-2">
            <ResultRow label="Loan Amount" value={fmt(principal)} />
            <ResultRow label="Total Interest Payable" value={fmt(totalInterest)} />
            <ResultRow label="Total Amount Payable" value={fmt(totalAmount)} highlight />
            <ResultRow
              label="Interest-to-Principal Ratio"
              value={`${(interestRatio * 100).toFixed(0)}%`}
            />
          </div>
          <VerdictBox variant={verdictVariant}>{verdictText}</VerdictBox>

          {/* Amortization Schedule */}
          <div className="mt-6 pt-6 border-t border-gray-200">
            <button
              onClick={() => setShowAmort(!showAmort)}
              className="text-[14px] font-semibold text-sage hover:text-sage-deep transition-colors tracking-[-0.01em]"
            >
              {showAmort ? "Hide" : "Show"} amortization schedule
            </button>
            {showAmort && (
              <div className="mt-4 overflow-x-auto">
                <table className="w-full text-[13px] tracking-[-0.01em]">
                  <thead>
                    <tr className="border-b border-gray-200 text-gray-400 font-semibold uppercase tracking-[0.04em]">
                      <th className="text-left py-2 pr-2">Year</th>
                      <th className="text-right py-2 px-2">Opening</th>
                      <th className="text-right py-2 px-2">Principal</th>
                      <th className="text-right py-2 px-2">Interest</th>
                      <th className="text-right py-2 pl-2">Closing</th>
                    </tr>
                  </thead>
                  <tbody>
                    {amortization.map((row) => (
                      <tr
                        key={row.year}
                        className="border-b border-gray-100 text-gray-600"
                      >
                        <td className="py-2 pr-2 font-semibold text-ink">
                          {row.year}
                        </td>
                        <td className="py-2 px-2 text-right">{fmt(row.opening)}</td>
                        <td className="py-2 px-2 text-right">{fmt(row.principal)}</td>
                        <td className="py-2 px-2 text-right">{fmt(row.interest)}</td>
                        <td className="py-2 pl-2 text-right">{fmt(row.closing)}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
