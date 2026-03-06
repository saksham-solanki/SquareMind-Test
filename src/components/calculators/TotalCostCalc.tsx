"use client";

import { useState } from "react";

function fmt(n: number) {
  return "\u20B9" + Math.round(n).toLocaleString("en-IN");
}

const stampRates: Record<string, number> = { karnataka: 0.05, maharashtra: 0.06, delhi: 0.06, tamilnadu: 0.07, telangana: 0.06, other: 0.05 };

export default function TotalCostCalc() {
  const [price, setPrice] = useState(10000000);
  const [type, setType] = useState("ready");
  const [state, setState] = useState("karnataka");
  const [years, setYears] = useState(10);
  const [calculated, setCalculated] = useState(false);

  const stampDuty = price * (stampRates[state] || 0.05);
  const regFee = Math.min(price * 0.01, 30000);
  const gst = type === "under" ? price * 0.05 : 0;
  const legal = type === "resale" ? price * 0.02 : price * 0.005;
  const interiors = price * 0.08;
  const annualMaint = Math.max(price * 0.005, 48000);
  const totalMaint = annualMaint * years;
  const annualPtax = price * 0.002;
  const totalPtax = annualPtax * years;
  const totalCost = price + stampDuty + regFee + gst + legal + interiors + totalMaint + totalPtax;
  const overSticker = ((totalCost - price) / price * 100).toFixed(0);

  return (
    <div className="bg-cream rounded-[28px] p-12 max-lg:p-6 mt-8" id="total-cost">
      <h3 className="font-serif text-[28px] tracking-[-0.02em] mb-2">Total Cost of Ownership</h3>
      <p className="text-[15px] text-gray-500 mb-8 tracking-[-0.01em]">The REAL cost of owning a property &mdash; beyond the sticker price.</p>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-start">
        <div className="flex flex-col gap-4">
          <div>
            <label className="block text-[13px] font-semibold text-gray-600 mb-1.5 tracking-[-0.01em]">Property Price ({"\u20B9"})</label>
            <input type="number" value={price} onChange={(e) => setPrice(+e.target.value)} className="w-full px-[18px] py-3.5 border-[1.5px] border-gray-300 rounded-[12px] text-[15px] bg-white text-ink focus:outline-none focus:border-ink transition-all tracking-[-0.01em]" />
          </div>
          <div>
            <label className="block text-[13px] font-semibold text-gray-600 mb-1.5 tracking-[-0.01em]">Property Type</label>
            <select value={type} onChange={(e) => setType(e.target.value)} className="w-full px-[18px] py-3.5 border-[1.5px] border-gray-300 rounded-[12px] text-[15px] bg-white text-ink focus:outline-none focus:border-ink transition-all tracking-[-0.01em]">
              <option value="under">Under Construction</option>
              <option value="ready">Ready to Move</option>
              <option value="resale">Resale</option>
            </select>
          </div>
          <div>
            <label className="block text-[13px] font-semibold text-gray-600 mb-1.5 tracking-[-0.01em]">State</label>
            <select value={state} onChange={(e) => setState(e.target.value)} className="w-full px-[18px] py-3.5 border-[1.5px] border-gray-300 rounded-[12px] text-[15px] bg-white text-ink focus:outline-none focus:border-ink transition-all tracking-[-0.01em]">
              <option value="karnataka">Karnataka</option>
              <option value="maharashtra">Maharashtra</option>
              <option value="delhi">Delhi NCR</option>
              <option value="tamilnadu">Tamil Nadu</option>
              <option value="telangana">Telangana</option>
              <option value="other">Other</option>
            </select>
          </div>
          <div>
            <label className="block text-[13px] font-semibold text-gray-600 mb-1.5 tracking-[-0.01em]">Holding Period (years)</label>
            <input type="number" value={years} onChange={(e) => setYears(+e.target.value)} min={1} max={30} className="w-full px-[18px] py-3.5 border-[1.5px] border-gray-300 rounded-[12px] text-[15px] bg-white text-ink focus:outline-none focus:border-ink transition-all tracking-[-0.01em]" />
          </div>
          <button onClick={() => setCalculated(true)} className="w-full bg-ink text-white py-4 rounded-full text-[16px] font-semibold hover:bg-gray-600 hover:scale-[1.02] transition-all duration-300 mt-2 tracking-[-0.01em]">
            Calculate total cost
          </button>
        </div>
        <div className="bg-white rounded-[20px] p-9 max-lg:p-6">
          <div className="text-[13px] font-semibold text-gray-400 uppercase tracking-[0.06em] mb-2">True Cost of Ownership</div>
          <div className="font-serif text-[clamp(36px,4vw,48px)] tracking-[-0.03em] text-ink leading-[1.1]">{fmt(totalCost)}</div>
          <div className="text-[14px] text-gray-500 mt-2 tracking-[-0.01em]">That&apos;s {overSticker}% above the sticker price</div>
          <div className="mt-6 pt-6 border-t border-gray-200 space-y-2">
            <Row label="Property Price" value={fmt(price)} />
            <Row label="Stamp Duty" value={fmt(stampDuty)} />
            <Row label="Registration Fee" value={fmt(regFee)} />
            <Row label="GST (if applicable)" value={gst > 0 ? fmt(gst) : "\u2014"} />
            <Row label="Legal & Brokerage" value={fmt(legal)} />
            <Row label="Interiors & Furnishing" value={fmt(interiors)} />
            <Row label={`Maintenance (over ${years} yrs)`} value={fmt(totalMaint)} />
            <Row label={`Property Tax (over ${years} yrs)`} value={fmt(totalPtax)} />
            <div className="flex justify-between pt-3 mt-2 border-t-[1.5px] border-gray-300 font-bold text-[15px] text-ink">
              <span>Total Cost of Ownership</span><span className="text-sage">{fmt(totalCost)}</span>
            </div>
          </div>
          {calculated && (
            <div className="mt-5 p-4 rounded-[12px] text-[14px] leading-relaxed tracking-[-0.01em] bg-cream text-gray-600">
              On a {fmt(price)} property, you will spend an additional {fmt(totalCost - price)} over {years} years. Most buyers underestimate this by 40-60%.
            </div>
          )}
        </div>
      </div>
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
