"use client";

import { useState } from "react";
import Link from "next/link";
import CalcField from "@/components/calculators/shared/CalcField";
import ResultRow from "@/components/calculators/shared/ResultRow";
import VerdictBox from "@/components/calculators/shared/VerdictBox";

function fmt(n: number) {
  return "\u20B9" + Math.round(n).toLocaleString("en-IN");
}

export default function BuyVsRentCalc() {
  const [price, setPrice] = useState(10000000);
  const [rent, setRent] = useState(25000);
  const [downPct, setDownPct] = useState(20);
  const [rate, setRate] = useState(8.5);
  const [appreciation, setAppreciation] = useState(5);
  const [years, setYears] = useState(10);
  const [rentInflation, setRentInflation] = useState(5);
  const [equityReturn, setEquityReturn] = useState(12);
  const [calculated, setCalculated] = useState(false);

  const downAmt = price * (downPct / 100);
  const loanAmt = price - downAmt;
  const months = years * 12;
  const monthlyRate = rate / 100 / 12;
  const emi = monthlyRate > 0 ? (loanAmt * monthlyRate * Math.pow(1 + monthlyRate, months)) / (Math.pow(1 + monthlyRate, months) - 1) : loanAmt / months;
  const totalEmi = emi * months;
  const regCost = price * 0.07;
  const totalBuyCost = downAmt + totalEmi + regCost;
  const futureVal = price * Math.pow(1 + appreciation / 100, years);
  const netBuyCost = totalBuyCost - futureVal;

  let totalRent = 0;
  for (let y = 0; y < years; y++) totalRent += rent * 12 * Math.pow(1 + rentInflation / 100, y);
  const investedAmt = downAmt + regCost;
  const investedValue = investedAmt * Math.pow(1 + equityReturn / 100, years);
  const investGain = investedValue - investedAmt;
  const netRentCost = totalRent - investGain;

  const buyWins = netBuyCost < netRentCost;
  const diff = Math.abs(netBuyCost - netRentCost);

  return (
    <div className="bg-cream rounded-[28px] p-12 max-lg:p-6 mt-8" id="buy-vs-rent">
      <h3 className="font-serif text-[28px] tracking-[-0.02em] mb-2">Buy vs Rent Analyzer</h3>
      <p className="text-[15px] text-gray-500 mb-8 tracking-[-0.01em]">The honest math behind &quot;should I buy or rent?&quot;</p>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-start">
        <div className="flex flex-col gap-4">
          <CalcField label="Property Price (₹)" value={price} onChange={(v) => setPrice(+v)} />
          <CalcField label="Current Monthly Rent (₹)" value={rent} onChange={(v) => setRent(+v)} />
          <CalcField label="Down Payment %" value={downPct} onChange={(v) => setDownPct(+v)} />
          <CalcField label="Home Loan Interest Rate %" value={rate} onChange={(v) => setRate(+v)} step={0.1} />
          <CalcField label="Expected Annual Appreciation %" value={appreciation} onChange={(v) => setAppreciation(+v)} step={0.5} />
          <CalcField label="Rent Inflation (% per year)" value={rentInflation} onChange={(v) => setRentInflation(+v)} step={0.5} hint="Annual increase in rent" />
          <CalcField label="Equity Return (% CAGR)" value={equityReturn} onChange={(v) => setEquityReturn(+v)} step={0.5} hint="Expected return if you invest instead" />
          <CalcField label="Investment Horizon (years)" value={years} onChange={(v) => setYears(+v)} min={1} max={30} />
          <button onClick={() => setCalculated(true)} className="w-full bg-ink text-white py-4 rounded-full text-[16px] font-semibold hover:bg-gray-600 hover:scale-[1.02] transition-all duration-300 mt-2 tracking-[-0.01em]">
            Analyze buy vs rent
          </button>
        </div>
        <div className="bg-white rounded-[20px] p-9 max-lg:p-6">
          <div className="text-[13px] font-semibold text-gray-400 uppercase tracking-[0.06em] mb-2">Verdict</div>
          <div className={`font-serif text-[clamp(36px,4vw,48px)] tracking-[-0.03em] leading-[1.1] ${calculated ? (buyWins ? "text-sage" : "text-red") : "text-ink"}`}>
            {calculated ? (buyWins ? "Buying wins" : "Renting wins") : "\u2014"}
          </div>
          {calculated && <div className="text-[14px] text-gray-500 mt-2">by {fmt(diff)} over {years} years</div>}
          <div className="mt-6 pt-6 border-t border-gray-200">
            <div className="text-[13px] font-semibold text-gray-400 uppercase tracking-[0.06em] mb-2">Cost Comparison ({years} years)</div>
            <ResultRow label="Total Cost of Buying" value={fmt(totalBuyCost)} />
            <ResultRow label="— EMI Payments" value={fmt(totalEmi)} />
            <ResultRow label="— Down Payment" value={fmt(downAmt)} />
            <ResultRow label="— Registration & Stamp (est. 7%)" value={fmt(regCost)} />
            <ResultRow label="Less: Property Value" value={fmt(futureVal)} />
            <ResultRow label="Net Cost of Buying" value={fmt(netBuyCost)} highlight />
            <div className="h-4" />
            <ResultRow label="Total Rent Paid" value={fmt(totalRent)} />
            <ResultRow label={`Investment Returns (${equityReturn}%)`} value={fmt(investGain)} />
            <ResultRow label="Net Cost of Renting" value={fmt(netRentCost)} highlight />
          </div>
          <div className="mt-4 text-[12px] text-gray-400 tracking-[-0.01em]">
            Registration & stamp duty estimated at 7%.{" "}
            <Link href="/tools/stamp-duty-calculator" className="text-sage underline hover:text-sage-deep transition-colors">
              Use our Stamp Duty Calculator
            </Link>{" "}
            for exact numbers.
          </div>
          {calculated && (
            <VerdictBox variant={buyWins ? "positive" : "warning"}>
              {buyWins
                ? `At ${appreciation}% annual appreciation, buying makes financial sense over ${years} years.`
                : `Renting + investing the difference in equity mutual funds (${equityReturn}% CAGR) creates more wealth than buying at current prices.`}
            </VerdictBox>
          )}
        </div>
      </div>
    </div>
  );
}
