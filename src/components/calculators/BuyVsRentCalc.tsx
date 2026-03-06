"use client";

import { useState } from "react";

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
  for (let y = 0; y < years; y++) totalRent += rent * 12 * Math.pow(1.05, y);
  const investedAmt = downAmt + regCost;
  const investedValue = investedAmt * Math.pow(1.12, years);
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
          <Field label="Property Price (\u20B9)" value={price} onChange={setPrice} />
          <Field label="Current Monthly Rent (\u20B9)" value={rent} onChange={setRent} />
          <Field label="Down Payment %" value={downPct} onChange={setDownPct} />
          <Field label="Home Loan Interest Rate %" value={rate} onChange={setRate} step={0.1} />
          <Field label="Expected Annual Appreciation %" value={appreciation} onChange={setAppreciation} step={0.5} />
          <Field label="Investment Horizon (years)" value={years} onChange={setYears} min={1} max={30} />
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
            <Row label="Total Cost of Buying" value={fmt(totalBuyCost)} />
            <Row label="\u2014 EMI Payments" value={fmt(totalEmi)} />
            <Row label="\u2014 Down Payment" value={fmt(downAmt)} />
            <Row label="\u2014 Registration & Stamp" value={fmt(regCost)} />
            <Row label="Less: Property Value" value={fmt(futureVal)} />
            <div className="flex justify-between pt-3 mt-2 border-t-[1.5px] border-gray-300 font-bold text-[15px] text-ink">
              <span>Net Cost of Buying</span><span className="text-sage">{fmt(netBuyCost)}</span>
            </div>
            <div className="h-4" />
            <Row label="Total Rent Paid" value={fmt(totalRent)} />
            <Row label="Investment Returns (12%)" value={fmt(investGain)} />
            <div className="flex justify-between pt-3 mt-2 border-t-[1.5px] border-gray-300 font-bold text-[15px] text-ink">
              <span>Net Cost of Renting</span><span className="text-sage">{fmt(netRentCost)}</span>
            </div>
          </div>
          {calculated && (
            <div className={`mt-5 p-4 rounded-[12px] text-[14px] leading-relaxed tracking-[-0.01em] ${buyWins ? "bg-sage-light text-sage-deep" : "bg-[#FFF3E0] text-[#E65100]"}`}>
              {buyWins
                ? `At ${appreciation}% annual appreciation, buying makes financial sense over ${years} years.`
                : `Renting + investing the difference in equity mutual funds (12% CAGR) creates more wealth than buying at current prices.`}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

function Field({ label, value, onChange, step, min, max }: { label: string; value: number; onChange: (v: number) => void; step?: number; min?: number; max?: number }) {
  return (
    <div>
      <label className="block text-[13px] font-semibold text-gray-600 mb-1.5 tracking-[-0.01em]">{label}</label>
      <input type="number" value={value} onChange={(e) => onChange(+e.target.value)} step={step} min={min} max={max} className="w-full px-[18px] py-3.5 border-[1.5px] border-gray-300 rounded-[12px] text-[15px] bg-white text-ink focus:outline-none focus:border-ink focus:shadow-[0_0_0_3px_rgba(13,13,13,0.06)] transition-all tracking-[-0.01em]" />
    </div>
  );
}

function Row({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex justify-between py-2 text-[14px] text-gray-500 tracking-[-0.01em]">
      <span>{label}</span><span className="font-semibold text-ink">{value}</span>
    </div>
  );
}
