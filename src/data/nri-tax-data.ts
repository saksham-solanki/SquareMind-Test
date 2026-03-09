export interface CountryTaxProfile {
  country: string;
  code: string;
  hasDTAA: boolean;
  tdsOnRental: number;
  capitalGainsRelief: boolean;
  notes: string;
}

export const NRI_TAX_PROFILES: CountryTaxProfile[] = [
  { country: "United States", code: "US", hasDTAA: true, tdsOnRental: 15, capitalGainsRelief: true, notes: "Foreign tax credit available. File Form 67 in India." },
  { country: "United Kingdom", code: "UK", hasDTAA: true, tdsOnRental: 15, capitalGainsRelief: true, notes: "Property income taxable in both countries; claim credit." },
  { country: "Canada", code: "CA", hasDTAA: true, tdsOnRental: 15, capitalGainsRelief: true, notes: "Treaty allows credit method. Report worldwide income." },
  { country: "UAE", code: "AE", hasDTAA: true, tdsOnRental: 12.5, capitalGainsRelief: true, notes: "No income tax in UAE. India taxes at normal rates." },
  { country: "Singapore", code: "SG", hasDTAA: true, tdsOnRental: 15, capitalGainsRelief: true, notes: "Singapore taxes worldwide income; claim credit for Indian tax." },
  { country: "Australia", code: "AU", hasDTAA: true, tdsOnRental: 15, capitalGainsRelief: true, notes: "Australian CGT applies; claim credit for Indian tax paid." },
  { country: "India (Resident)", code: "IN", hasDTAA: false, tdsOnRental: 0, capitalGainsRelief: false, notes: "Standard income tax slabs apply." },
];

export interface TaxSlab {
  min: number;
  max: number | null;
  rate: number;
}

/** Indian income tax slabs for NRIs -- FY 2025-26 (Old Regime) */
export const INDIAN_TAX_SLABS: TaxSlab[] = [
  { min: 0, max: 250000, rate: 0 },
  { min: 250001, max: 500000, rate: 5 },
  { min: 500001, max: 1000000, rate: 20 },
  { min: 1000001, max: null, rate: 30 },
];

/** Long-term capital gains tax rate (property held > 2 years) -- post July 2024 budget */
export const LTCG_RATE = 12.5;

/** Short-term capital gains TDS rate */
export const STCG_TDS = 30;

/** Health & Education Cess rate */
export const CESS_RATE = 4;

/** Surcharge brackets based on total income */
export interface SurchargeBracket {
  min: number;
  max: number | null;
  rate: number;
}

export const SURCHARGE_BRACKETS: SurchargeBracket[] = [
  { min: 0, max: 5000000, rate: 0 },
  { min: 5000001, max: 10000000, rate: 10 },
  { min: 10000001, max: 20000000, rate: 15 },
  { min: 20000001, max: 50000000, rate: 25 },
  { min: 50000001, max: null, rate: 37 },
];
