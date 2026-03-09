"use client";

import { useState, useMemo } from "react";
import CalcField from "@/components/calculators/shared/CalcField";
import ResultRow from "@/components/calculators/shared/ResultRow";
import VerdictBox from "@/components/calculators/shared/VerdictBox";
import {
  NRI_TAX_PROFILES,
  LTCG_RATE,
  CESS_RATE,
  SURCHARGE_BRACKETS,
} from "@/data/nri-tax-data";

type Mode = "rental" | "capital";

function fmt(n: number): string {
  return new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: "INR",
    maximumFractionDigits: 0,
  }).format(n);
}

function getSurchargeRate(gain: number): number {
  for (const b of [...SURCHARGE_BRACKETS].reverse()) {
    if (gain >= b.min) return b.rate;
  }
  return 0;
}

export default function NRITaxCalc() {
  const [mode, setMode] = useState<Mode>("rental");
  const [country, setCountry] = useState("US");

  // Rental inputs
  const [annualRent, setAnnualRent] = useState(1200000);
  const [municipalTaxes, setMunicipalTaxes] = useState(0);

  // Capital gains inputs
  const [salePrice, setSalePrice] = useState(10000000);
  const [purchasePrice, setPurchasePrice] = useState(6000000);
  const [holdingYears, setHoldingYears] = useState(3);
  const [improvementCosts, setImprovementCosts] = useState(0);

  const profile = useMemo(
    () => NRI_TAX_PROFILES.find((p) => p.code === country) ?? NRI_TAX_PROFILES[0],
    [country]
  );

  const countryOptions = NRI_TAX_PROFILES.map((p) => ({
    value: p.code,
    label: p.country,
  }));

  // Rental income calculation
  const rentalResult = useMemo(() => {
    const grossRent = annualRent;
    const netAfterMunicipal = grossRent - municipalTaxes;
    const standardDeduction = netAfterMunicipal * 0.3;
    const netRentalIncome = netAfterMunicipal - standardDeduction;

    const tdsRate = profile.hasDTAA ? profile.tdsOnRental : 31.2;
    const tdsAmount = netRentalIncome * tdsRate / 100;
    const cess = tdsAmount * CESS_RATE / 100;
    const totalTax = tdsAmount + cess;

    return {
      grossRent,
      municipalTaxes,
      netAfterMunicipal,
      standardDeduction,
      netRentalIncome,
      tdsRate,
      isDTAARate: profile.hasDTAA,
      tdsAmount,
      cess,
      totalTax,
    };
  }, [annualRent, municipalTaxes, profile]);

  // Capital gains calculation
  const capitalResult = useMemo(() => {
    const capitalGain = salePrice - purchasePrice - improvementCosts;
    const isLTCG = holdingYears > 2;
    const baseRate = isLTCG ? LTCG_RATE : 30;
    const baseTax = Math.max(capitalGain, 0) * baseRate / 100;

    const surchargeRate = capitalGain > 5000000 ? getSurchargeRate(capitalGain) : 0;
    const surcharge = baseTax * surchargeRate / 100;

    const cess = (baseTax + surcharge) * CESS_RATE / 100;
    const totalTax = baseTax + surcharge + cess;

    const tdsAtSourceRate = isLTCG ? LTCG_RATE : 30;
    const tdsAtSource = salePrice * tdsAtSourceRate / 100;

    return {
      capitalGain,
      isLTCG,
      classification: isLTCG ? "Long-Term Capital Gain (LTCG)" : "Short-Term Capital Gain (STCG)",
      baseRate,
      baseTax,
      surchargeRate,
      surcharge,
      cess,
      totalTax,
      tdsAtSource,
      tdsAtSourceRate,
    };
  }, [salePrice, purchasePrice, holdingYears, improvementCosts]);

  return (
    <div className="mt-8 space-y-8">
      {/* Mode Toggle */}
      <div className="bg-cream rounded-[28px] p-12 max-lg:p-6">
        <h3 className="font-serif text-[28px] tracking-[-0.02em] mb-2">
          NRI Property Tax Calculator
        </h3>
        <p className="text-[15px] text-gray-500 mb-8 tracking-[-0.01em]">
          Estimate tax on rental income or capital gains from Indian property as an NRI.
        </p>

        {/* Toggle */}
        <div className="flex gap-2 mb-8 max-w-[400px]">
          <button
            onClick={() => setMode("rental")}
            className={`flex-1 py-3 rounded-[12px] text-[14px] font-semibold tracking-[-0.01em] transition-all ${
              mode === "rental"
                ? "bg-ink text-white"
                : "bg-white text-gray-500 hover:text-ink border border-gray-200"
            }`}
          >
            Rental Income Tax
          </button>
          <button
            onClick={() => setMode("capital")}
            className={`flex-1 py-3 rounded-[12px] text-[14px] font-semibold tracking-[-0.01em] transition-all ${
              mode === "capital"
                ? "bg-ink text-white"
                : "bg-white text-gray-500 hover:text-ink border border-gray-200"
            }`}
          >
            Capital Gains Tax
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-start">
          {/* Inputs */}
          <div className="flex flex-col gap-4">
            <CalcField
              label="Country of Residence"
              value={country}
              onChange={(v) => setCountry(String(v))}
              type="select"
              options={countryOptions}
            />

            {mode === "rental" ? (
              <>
                <CalcField
                  label="Annual Rental Income (Rs.)"
                  value={annualRent}
                  onChange={(v) => setAnnualRent(+v)}
                  min={0}
                  step={10000}
                  hint="Total rent received per year from Indian property"
                />
                <CalcField
                  label="Municipal Taxes Paid (Rs.)"
                  value={municipalTaxes}
                  onChange={(v) => setMunicipalTaxes(+v)}
                  min={0}
                  step={1000}
                  hint="Property tax paid to local municipality"
                />
              </>
            ) : (
              <>
                <CalcField
                  label="Sale Price (Rs.)"
                  value={salePrice}
                  onChange={(v) => setSalePrice(+v)}
                  min={0}
                  step={100000}
                />
                <CalcField
                  label="Purchase Price (Rs.)"
                  value={purchasePrice}
                  onChange={(v) => setPurchasePrice(+v)}
                  min={0}
                  step={100000}
                />
                <CalcField
                  label="Holding Period (years)"
                  value={holdingYears}
                  onChange={(v) => setHoldingYears(+v)}
                  min={0}
                  max={50}
                  step={1}
                  hint="More than 2 years qualifies as LTCG"
                />
                <CalcField
                  label="Improvement Costs (Rs.)"
                  value={improvementCosts}
                  onChange={(v) => setImprovementCosts(+v)}
                  min={0}
                  step={10000}
                  hint="Cost of renovations, additions etc."
                />
              </>
            )}
          </div>

          {/* Results */}
          <div className="bg-white rounded-[20px] p-9 max-lg:p-6">
            <div className="text-[13px] font-semibold text-gray-400 uppercase tracking-[0.06em] mb-4">
              {mode === "rental" ? "Rental Income Tax Estimate" : "Capital Gains Tax Estimate"}
            </div>

            {mode === "rental" ? (
              <div className="space-y-0">
                <ResultRow label="Gross Rental Income" value={fmt(rentalResult.grossRent)} />
                {rentalResult.municipalTaxes > 0 && (
                  <ResultRow
                    label="Less: Municipal Taxes"
                    value={`- ${fmt(rentalResult.municipalTaxes)}`}
                  />
                )}
                <ResultRow
                  label="Less: Standard Deduction (30%)"
                  value={`- ${fmt(rentalResult.standardDeduction)}`}
                />
                <ResultRow label="Net Taxable Rental Income" value={fmt(rentalResult.netRentalIncome)} />
                <ResultRow
                  label={`TDS Rate${rentalResult.isDTAARate ? " (DTAA)" : ""}`}
                  value={`${rentalResult.tdsRate}%`}
                />
                <ResultRow label="TDS Amount" value={fmt(rentalResult.tdsAmount)} />
                <ResultRow label="Health & Education Cess (4%)" value={fmt(rentalResult.cess)} />
                <ResultRow label="Total Estimated Tax" value={fmt(rentalResult.totalTax)} highlight />
              </div>
            ) : (
              <div className="space-y-0">
                <ResultRow label="Sale Price" value={fmt(salePrice)} />
                <ResultRow label="Less: Purchase Price" value={`- ${fmt(purchasePrice)}`} />
                {improvementCosts > 0 && (
                  <ResultRow
                    label="Less: Improvement Costs"
                    value={`- ${fmt(improvementCosts)}`}
                  />
                )}
                <ResultRow label="Capital Gain" value={fmt(capitalResult.capitalGain)} />
                <ResultRow label="Classification" value={capitalResult.classification} />
                <ResultRow label={`Tax Rate`} value={`${capitalResult.baseRate}%`} />
                <ResultRow label="Base Tax" value={fmt(capitalResult.baseTax)} />
                {capitalResult.surcharge > 0 && (
                  <ResultRow
                    label={`Surcharge (${capitalResult.surchargeRate}%)`}
                    value={fmt(capitalResult.surcharge)}
                  />
                )}
                <ResultRow label="Health & Education Cess (4%)" value={fmt(capitalResult.cess)} />
                <ResultRow
                  label="Total Estimated Tax"
                  value={fmt(capitalResult.totalTax)}
                  highlight
                />
                <div className="mt-4 pt-3 border-t border-gray-100">
                  <ResultRow
                    label={`TDS at Source (${capitalResult.tdsAtSourceRate}% of sale)`}
                    value={fmt(capitalResult.tdsAtSource)}
                  />
                </div>
              </div>
            )}

            {/* Country notes */}
            {profile.notes && (
              <div className="mt-4 p-3 bg-cream rounded-[10px] text-[13px] text-gray-500 leading-[1.65] tracking-[-0.01em]">
                <span className="font-semibold text-gray-600">{profile.country}:</span>{" "}
                {profile.notes}
              </div>
            )}

            {profile.hasDTAA && (
              <VerdictBox variant="positive">
                DTAA benefit available. {profile.country} has a Double Taxation Avoidance
                Agreement with India, which may reduce your effective tax rate.
              </VerdictBox>
            )}
          </div>
        </div>
      </div>

      {/* Disclaimer */}
      <div className="bg-cream/60 rounded-[20px] p-6 border border-gray-200">
        <p className="text-[13px] text-gray-400 leading-[1.7] tracking-[-0.01em]">
          <span className="font-semibold text-gray-500">Disclaimer:</span> This is an
          estimate for educational purposes. Tax laws are complex and change
          frequently. Surcharge and indexation rules may vary. Please consult a
          Chartered Accountant for exact calculations and filing.
        </p>
      </div>
    </div>
  );
}
