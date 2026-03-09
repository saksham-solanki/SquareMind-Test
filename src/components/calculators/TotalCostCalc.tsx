"use client";

import { useState } from "react";
import CalcField from "@/components/calculators/shared/CalcField";
import ResultRow from "@/components/calculators/shared/ResultRow";
import VerdictBox from "@/components/calculators/shared/VerdictBox";
import { STAMP_DUTY_RATES } from "@/data/stamp-duty-rates";

function fmt(n: number) {
  return "\u20B9" + Math.round(n).toLocaleString("en-IN");
}

const stateOptions = STAMP_DUTY_RATES.map((s) => ({
  value: s.code,
  label: s.state,
}));

const genderOptions = [
  { value: "male", label: "Male" },
  { value: "female", label: "Female" },
];

export default function TotalCostCalc() {
  const [price, setPrice] = useState(10000000);
  const [type, setType] = useState("ready");
  const [stateCode, setStateCode] = useState("KA");
  const [gender, setGender] = useState("male");
  const [years, setYears] = useState(10);
  const [calculated, setCalculated] = useState(false);

  const stateData = STAMP_DUTY_RATES.find((s) => s.code === stateCode) || STAMP_DUTY_RATES[0];
  const dutyRate = gender === "female" ? stateData.female : stateData.male;
  const stampDuty = price * (dutyRate / 100);
  const regPct = stateData.registration / 100;
  const regFeeRaw = price * regPct;
  const regFee = stateData.regCap ? Math.min(regFeeRaw, stateData.regCap) : regFeeRaw;
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
          <CalcField label="Property Price (₹)" value={price} onChange={(v) => setPrice(+v)} />
          <CalcField
            label="Property Type"
            value={type}
            onChange={(v) => setType(String(v))}
            type="select"
            options={[
              { value: "under", label: "Under Construction" },
              { value: "ready", label: "Ready to Move" },
              { value: "resale", label: "Resale" },
            ]}
          />
          <CalcField
            label="State"
            value={stateCode}
            onChange={(v) => setStateCode(String(v))}
            type="select"
            options={stateOptions}
          />
          <CalcField
            label="Gender"
            value={gender}
            onChange={(v) => setGender(String(v))}
            type="select"
            options={genderOptions}
            hint="Women get lower stamp duty rates in most states"
          />
          <CalcField label="Holding Period (years)" value={years} onChange={(v) => setYears(+v)} min={1} max={30} />
          <button onClick={() => setCalculated(true)} className="w-full bg-ink text-white py-4 rounded-full text-[16px] font-semibold hover:bg-gray-600 hover:scale-[1.02] transition-all duration-300 mt-2 tracking-[-0.01em]">
            Calculate total cost
          </button>
        </div>
        <div className="bg-white rounded-[20px] p-9 max-lg:p-6">
          <div className="text-[13px] font-semibold text-gray-400 uppercase tracking-[0.06em] mb-2">True Cost of Ownership</div>
          <div className="font-serif text-[clamp(36px,4vw,48px)] tracking-[-0.03em] text-ink leading-[1.1]">{fmt(totalCost)}</div>
          <div className="text-[14px] text-gray-500 mt-2 tracking-[-0.01em]">That&apos;s {overSticker}% above the sticker price</div>
          <div className="mt-6 pt-6 border-t border-gray-200 space-y-2">
            <ResultRow label="Property Price" value={fmt(price)} />
            <ResultRow label={`Stamp Duty (${dutyRate}%)`} value={fmt(stampDuty)} />
            <ResultRow label="Registration Fee" value={fmt(regFee)} />
            <ResultRow label="GST (if applicable)" value={gst > 0 ? fmt(gst) : "\u2014"} />
            <ResultRow label="Legal & Brokerage" value={fmt(legal)} />
            <ResultRow label="Interiors & Furnishing" value={fmt(interiors)} />
            <ResultRow label={`Maintenance (over ${years} yrs)`} value={fmt(totalMaint)} />
            <ResultRow label={`Property Tax (over ${years} yrs)`} value={fmt(totalPtax)} />
            <ResultRow label="Total Cost of Ownership" value={fmt(totalCost)} highlight />
          </div>
          {stateData.notes && (
            <div className="mt-3 text-[12px] text-gray-400 tracking-[-0.01em]">
              Note: {stateData.notes}
            </div>
          )}
          {calculated && (
            <VerdictBox variant="neutral">
              On a {fmt(price)} property, you will spend an additional {fmt(totalCost - price)} over {years} years. Most buyers underestimate this by 40-60%.
            </VerdictBox>
          )}
          <div className="mt-4 text-[12px] text-gray-400 tracking-[-0.01em]">
            Last updated: March 2026. Rates may vary by locality.
          </div>
        </div>
      </div>
    </div>
  );
}
