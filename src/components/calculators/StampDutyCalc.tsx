"use client";

import { useState } from "react";
import CalcField from "@/components/calculators/shared/CalcField";
import ResultRow from "@/components/calculators/shared/ResultRow";
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

// Top 5 investment states for comparison
const COMPARISON_STATES = ["MH", "KA", "DL", "TS", "UP"];

export default function StampDutyCalc() {
  const [price, setPrice] = useState(10000000);
  const [stateCode, setStateCode] = useState("MH");
  const [gender, setGender] = useState("male");
  const [calculated, setCalculated] = useState(false);

  const stateData =
    STAMP_DUTY_RATES.find((s) => s.code === stateCode) || STAMP_DUTY_RATES[0];
  const dutyRate = gender === "female" ? stateData.female : stateData.male;
  const stampDuty = price * (dutyRate / 100);
  const regPct = stateData.registration / 100;
  const regFeeRaw = price * regPct;
  const regFee = stateData.regCap
    ? Math.min(regFeeRaw, stateData.regCap)
    : regFeeRaw;
  const totalCharges = stampDuty + regFee;
  const effectiveRate = price > 0 ? (totalCharges / price) * 100 : 0;

  const comparisonData = COMPARISON_STATES.map((code) => {
    const s = STAMP_DUTY_RATES.find((r) => r.code === code)!;
    return {
      state: s.state,
      male: s.male,
      female: s.female,
      registration: s.registration,
    };
  });

  return (
    <div
      className="bg-cream rounded-[28px] p-12 max-lg:p-6 mt-8"
      id="stamp-duty-calculator"
    >
      <h3 className="font-serif text-[28px] tracking-[-0.02em] mb-2">
        Stamp Duty Calculator
      </h3>
      <p className="text-[15px] text-gray-500 mb-8 tracking-[-0.01em]">
        Calculate stamp duty and registration charges for any state in India.
        Gender-based rates included.
      </p>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-start">
        <div className="flex flex-col gap-4">
          <CalcField
            label="Property Value (₹)"
            value={price}
            onChange={(v) => setPrice(+v)}
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
          <button
            onClick={() => setCalculated(true)}
            className="w-full bg-ink text-white py-4 rounded-full text-[16px] font-semibold hover:bg-gray-600 hover:scale-[1.02] transition-all duration-300 mt-2 tracking-[-0.01em]"
          >
            Calculate stamp duty
          </button>
        </div>
        <div className="bg-white rounded-[20px] p-9 max-lg:p-6">
          <div className="text-[13px] font-semibold text-gray-400 uppercase tracking-[0.06em] mb-2">
            Total Government Charges
          </div>
          <div className="font-serif text-[clamp(36px,4vw,48px)] tracking-[-0.03em] text-ink leading-[1.1]">
            {fmt(totalCharges)}
          </div>
          <div className="text-[14px] text-gray-500 mt-2 tracking-[-0.01em]">
            Effective rate: {effectiveRate.toFixed(2)}% of property value
          </div>
          <div className="mt-6 pt-6 border-t border-gray-200 space-y-2">
            <ResultRow
              label={`Stamp Duty (${dutyRate}%)`}
              value={fmt(stampDuty)}
            />
            <ResultRow
              label={`Registration Fee (${stateData.registration}%)${stateData.regCap ? ` — capped at ${fmt(stateData.regCap)}` : ""}`}
              value={fmt(regFee)}
            />
            <ResultRow
              label="Total Government Charges"
              value={fmt(totalCharges)}
              highlight
            />
          </div>

          {stateData.notes && (
            <div className="mt-4 p-3 bg-cream rounded-[10px] text-[13px] text-gray-600 tracking-[-0.01em]">
              <span className="font-semibold">Note:</span> {stateData.notes}
            </div>
          )}

          {/* Comparison Table */}
          <div className="mt-6 pt-6 border-t border-gray-200">
            <div className="text-[13px] font-semibold text-gray-400 uppercase tracking-[0.06em] mb-3">
              Comparison: Top Investment States
            </div>
            <div className="overflow-x-auto">
              <table className="w-full text-[13px] tracking-[-0.01em]">
                <thead>
                  <tr className="border-b border-gray-200 text-gray-400 font-semibold uppercase tracking-[0.04em]">
                    <th className="text-left py-2 pr-2">State</th>
                    <th className="text-right py-2 px-2">Male</th>
                    <th className="text-right py-2 px-2">Female</th>
                    <th className="text-right py-2 pl-2">Regn.</th>
                  </tr>
                </thead>
                <tbody>
                  {comparisonData.map((row) => (
                    <tr
                      key={row.state}
                      className="border-b border-gray-100 text-gray-600"
                    >
                      <td className="py-2 pr-2 font-semibold text-ink">
                        {row.state}
                      </td>
                      <td className="py-2 px-2 text-right">{row.male}%</td>
                      <td className="py-2 px-2 text-right">{row.female}%</td>
                      <td className="py-2 pl-2 text-right">
                        {row.registration}%
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          <div className="mt-4 text-[12px] text-gray-400 tracking-[-0.01em]">
            Last updated: March 2026. Rates may vary by locality and property
            type.
          </div>
        </div>
      </div>
    </div>
  );
}
