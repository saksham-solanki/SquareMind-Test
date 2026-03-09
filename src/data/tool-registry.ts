export interface ToolMeta {
  slug: string;
  title: string;
  description: string;
  icon: string;
  status: "live";
  category: "calculator" | "verifier" | "analyzer";
}

export const TOOLS: ToolMeta[] = [
  {
    slug: "rental-yield",
    title: "Rental Yield Calculator",
    description: "Calculate the REAL rental yield -- not the inflated number brokers quote. Factor in maintenance, vacancy, and taxes.",
    icon: "TrendingUp",
    status: "live",
    category: "calculator",
  },
  {
    slug: "buy-vs-rent",
    title: "Buy vs Rent Analyzer",
    description: "Should you buy or keep renting? Compare the true cost of ownership against renting with real Indian market assumptions.",
    icon: "Scale",
    status: "live",
    category: "analyzer",
  },
  {
    slug: "total-cost",
    title: "Total Cost Calculator",
    description: "Calculate the REAL cost of buying property -- stamp duty, registration, GST, legal fees, and hidden charges by state.",
    icon: "Calculator",
    status: "live",
    category: "calculator",
  },
  {
    slug: "investment-scorecard",
    title: "Investment Scorecard",
    description: "Get an instant A/B/C/D investment grade for any property based on yield, location, builder, RERA status, and more.",
    icon: "Award",
    status: "live",
    category: "analyzer",
  },
  {
    slug: "rera-verifier",
    title: "RERA Project Verifier",
    description: "Find the right RERA portal for your state and learn exactly what to verify before investing in any project.",
    icon: "ShieldCheck",
    status: "live",
    category: "verifier",
  },
  {
    slug: "nri-tax-calculator",
    title: "NRI Tax Calculator",
    description: "Calculate tax implications on Indian property based on your country of residence. Covers DTAA treaties for 7 countries.",
    icon: "Globe",
    status: "live",
    category: "calculator",
  },
  {
    slug: "emi-calculator",
    title: "EMI Calculator",
    description: "Calculate your monthly home loan EMI and view the full amortization schedule. See total interest paid over the loan tenure.",
    icon: "Landmark",
    status: "live",
    category: "calculator",
  },
  {
    slug: "stamp-duty-calculator",
    title: "Stamp Duty Calculator",
    description: "Calculate stamp duty and registration charges for all 28 states and 8 UTs. Gender-based rates included.",
    icon: "Stamp",
    status: "live",
    category: "calculator",
  },
];
