"use client";

import { useState } from "react";

function fmt(n: number) {
  return "\u20B9" + Math.round(n).toLocaleString("en-IN");
}

export default function RentalYieldCalc() {
  const [price, setPrice] = useState(10000000);
  const [rent, setRent] = useState(25000);
  const [maintenance, setMaintenance] = useState(36000);
  const [vacancy, setVacancy] = useState(1);
  const [calculated, setCalculated] = useState(false);

  const annualGross = rent * 12;
  const vacancyLoss = rent * vacancy;
  const netBeforeTax = annualGross - maintenance - vacancyLoss;
  const tax = netBeforeTax * 0.3;
  const netIncome = netBeforeTax - tax;
  const grossYield = price > 0 ? (annualGross / price) * 100 : 0;
  const netYield = price > 0 ? (netIncome / price) * 100 : 0;

  let verdictClass = "bg-cream text-gray-600";
  let verdictText = "Enter your numbers and calculate to see the verdict.";
  if (calculated) {
    if (netYield >= 3) {
      verdictClass = "bg-sage-light text-sage-deep";
      verdictText = `Verdict: Strong yield at ${netYield.toFixed(1)}% net. This is above the national average of 2-3%. Worth considering as a rental investment.`;
    } else if (netYield >= 2) {
      verdictClass = "bg-cream text-gray-600";
      verdictText = `Verdict: Average yield at ${netYield.toFixed(1)}% net. Most Indian properties fall in this range. Capital appreciation will need to do the heavy lifting.`;
    } else {
      verdictClass = "bg-[#FFF3E0] text-[#E65100]";
      verdictText = `Verdict: Weak yield at ${netYield.toFixed(1)}% net. You would earn more in a fixed deposit. Only invest here if you expect significant appreciation.`;
    }
  }

  return (
    <div className="bg-cream rounded-[28px] p-12 max-lg:p-6 mt-8" id="rental-yield">
      <h3 className="font-serif text-[28px] tracking-[-0.02em] mb-2">Rental Yield Calculator</h3>
      <p className="text-[15px] text-gray-500 mb-8 tracking-[-0.01em]">Calculate the REAL rental yield &mdash; not the inflated number brokers quote.</p>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-start">
        <div className="flex flex-col gap-4">
          <CalcField label="Property Purchase Price (\u20B9)" value={price} onChange={setPrice} />
          <CalcField label="Monthly Rent Expected (\u20B9)" value={rent} onChange={setRent} />
          <CalcField label="Annual Maintenance (\u20B9)" value={maintenance} onChange={setMaintenance} hint="Society charges, repairs, property tax" />
          <CalcField label="Vacancy (months/year)" value={vacancy} onChange={setVacancy} min={0} max={12} hint="Average 1-2 months between tenants" />
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
              <Row label="Annual Gross Rent" value={fmt(annualGross)} />
              <Row label="Less: Maintenance" value={fmt(maintenance)} />
              <Row label="Less: Vacancy Loss" value={fmt(vacancyLoss)} />
              <Row label="Less: Tax (30%)" value={fmt(tax)} />
              <div className="flex justify-between pt-3 mt-2 border-t-[1.5px] border-gray-300 font-bold text-[15px] text-ink">
                <span>Net Annual Income</span>
                <span className="text-sage">{fmt(netIncome)}</span>
              </div>
            </div>
          </div>
          <div className={`mt-5 p-4 rounded-[12px] text-[14px] leading-relaxed tracking-[-0.01em] ${verdictClass}`}>{verdictText}</div>
        </div>
      </div>
    </div>
  );
}

function CalcField({ label, value, onChange, hint, min, max }: { label: string; value: number; onChange: (v: number) => void; hint?: string; min?: number; max?: number }) {
  return (
    <div>
      <label className="block text-[13px] font-semibold text-gray-600 mb-1.5 tracking-[-0.01em]">{label}</label>
      <input
        type="number"
        value={value}
        onChange={(e) => onChange(+e.target.value)}
        min={min}
        max={max}
        className="w-full px-[18px] py-3.5 border-[1.5px] border-gray-300 rounded-[12px] text-[15px] bg-white text-ink focus:outline-none focus:border-ink focus:shadow-[0_0_0_3px_rgba(13,13,13,0.06)] transition-all tracking-[-0.01em]"
      />
      {hint && <div className="text-[12px] text-gray-400 mt-1">{hint}</div>}
    </div>
  );
}

function Row({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex justify-between py-2 text-[14px] text-gray-500 tracking-[-0.01em]">
      <span>{label}</span>
      <span className="font-semibold text-ink">{value}</span>
    </div>
  );
}
