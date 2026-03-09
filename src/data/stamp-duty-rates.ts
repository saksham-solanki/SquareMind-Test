export interface StampDutyRate {
  state: string;
  code: string;
  male: number;
  female: number;
  registration: number;
  regCap?: number;
  notes?: string;
}

export const STAMP_DUTY_RATES: StampDutyRate[] = [
  // Major investment states
  { state: "Maharashtra", code: "MH", male: 6, female: 5, registration: 1, regCap: 30000, notes: "Mumbai 6%, Pune/Thane/Nagpur 7%" },
  { state: "Karnataka", code: "KA", male: 5, female: 3, registration: 1 },
  { state: "Delhi", code: "DL", male: 6, female: 4, registration: 1 },
  { state: "Tamil Nadu", code: "TN", male: 8, female: 7, registration: 1 },
  { state: "Telangana", code: "TS", male: 5, female: 3, registration: 1 },
  { state: "Uttar Pradesh", code: "UP", male: 7, female: 4, registration: 1, notes: "Noida/Ghaziabad 7%" },
  { state: "Punjab", code: "PB", male: 6, female: 3, registration: 1 },
  { state: "Rajasthan", code: "RJ", male: 5, female: 3, registration: 1 },
  { state: "Gujarat", code: "GJ", male: 5, female: 3, registration: 1 },
  { state: "Haryana", code: "HR", male: 6, female: 4, registration: 1, notes: "Gurugram same rates" },
  { state: "West Bengal", code: "WB", male: 6, female: 4, registration: 1 },
  { state: "Kerala", code: "KL", male: 8, female: 6, registration: 1 },
  { state: "Madhya Pradesh", code: "MP", male: 7.5, female: 5.5, registration: 1 },

  // Other states
  { state: "Andhra Pradesh", code: "AP", male: 5, female: 3, registration: 1 },
  { state: "Assam", code: "AS", male: 5, female: 3, registration: 1 },
  { state: "Bihar", code: "BR", male: 6, female: 4, registration: 1 },
  { state: "Chhattisgarh", code: "CG", male: 5, female: 3, registration: 1 },
  { state: "Goa", code: "GA", male: 5, female: 3, registration: 1 },
  { state: "Himachal Pradesh", code: "HP", male: 5, female: 3, registration: 1 },
  { state: "Jharkhand", code: "JH", male: 5, female: 3, registration: 1 },
  { state: "Manipur", code: "MN", male: 5, female: 3, registration: 1, notes: "Conservative estimate" },
  { state: "Meghalaya", code: "ML", male: 5, female: 3, registration: 1, notes: "Conservative estimate" },
  { state: "Mizoram", code: "MZ", male: 5, female: 3, registration: 1, notes: "Conservative estimate" },
  { state: "Nagaland", code: "NL", male: 5, female: 3, registration: 1, notes: "Conservative estimate" },
  { state: "Odisha", code: "OD", male: 5, female: 3, registration: 1 },
  { state: "Sikkim", code: "SK", male: 5, female: 3, registration: 1, notes: "Conservative estimate" },
  { state: "Tripura", code: "TR", male: 5, female: 3, registration: 1, notes: "Conservative estimate" },
  { state: "Uttarakhand", code: "UK", male: 5, female: 3, registration: 1 },
  { state: "Arunachal Pradesh", code: "AR", male: 5, female: 3, registration: 1, notes: "Conservative estimate" },

  // Union Territories
  { state: "Chandigarh", code: "CH", male: 6, female: 4, registration: 1 },
  { state: "Puducherry", code: "PY", male: 5, female: 3, registration: 1 },
  { state: "Jammu & Kashmir", code: "JK", male: 5, female: 3, registration: 1 },
  { state: "Ladakh", code: "LA", male: 5, female: 3, registration: 1, notes: "Conservative estimate" },
  { state: "Andaman & Nicobar", code: "AN", male: 5, female: 3, registration: 1, notes: "Conservative estimate" },
  { state: "Dadra & Nagar Haveli and Daman & Diu", code: "DD", male: 5, female: 3, registration: 1, notes: "Conservative estimate" },
  { state: "Lakshadweep", code: "LD", male: 5, female: 3, registration: 1, notes: "Conservative estimate" },
];
