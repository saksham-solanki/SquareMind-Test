export interface RERAPortal {
  state: string;
  code: string;
  portalUrl: string;
  searchTip?: string;
}

export const RERA_PORTALS: RERAPortal[] = [
  { state: "Maharashtra", code: "MH", portalUrl: "https://maharera.maharashtra.gov.in", searchTip: "Search by project name or RERA registration number under 'Registered Projects'" },
  { state: "Karnataka", code: "KA", portalUrl: "https://rera.karnataka.gov.in", searchTip: "Use 'Project Search' to look up by name, promoter, or district" },
  { state: "Delhi", code: "DL", portalUrl: "https://rera.delhi.gov.in", searchTip: "Search under 'Registered Projects' by project name or promoter" },
  { state: "Haryana", code: "HR", portalUrl: "https://haryanarera.gov.in", searchTip: "Use 'Project Registration' section to search by district or project name" },
  { state: "Tamil Nadu", code: "TN", portalUrl: "https://rera.tn.gov.in", searchTip: "Search registered projects by district, promoter name, or RERA number" },
  { state: "Telangana", code: "TS", portalUrl: "https://rera.telangana.gov.in", searchTip: "Use 'Search Project' with RERA number or project name" },
  { state: "Uttar Pradesh", code: "UP", portalUrl: "https://up-rera.in", searchTip: "Search by project name, promoter, or RERA registration number" },
  { state: "Gujarat", code: "GJ", portalUrl: "https://gujrera.gujarat.gov.in", searchTip: "Use 'Search Project' with district, taluka, or project name" },
  { state: "Rajasthan", code: "RJ", portalUrl: "https://rera.rajasthan.gov.in", searchTip: "Search registered projects by district or promoter name" },
  { state: "Punjab", code: "PB", portalUrl: "https://rera.punjab.gov.in", searchTip: "Use 'Search Projects' to look up by name or promoter" },
  { state: "Kerala", code: "KL", portalUrl: "https://rera.kerala.gov.in", searchTip: "Search by project name or registration number under 'Projects'" },
  { state: "Madhya Pradesh", code: "MP", portalUrl: "https://rera.mp.gov.in", searchTip: "Search registered projects by name, city, or developer" },
  { state: "Andhra Pradesh", code: "AP", portalUrl: "https://rera.ap.gov.in", searchTip: "Search by project name, district, or RERA number" },
  { state: "Bihar", code: "BR", portalUrl: "https://rera.bihar.gov.in", searchTip: "Search registered projects by name or location" },
  { state: "Odisha", code: "OD", portalUrl: "https://rera.odisha.gov.in", searchTip: "Use project search by district or developer name" },
  { state: "West Bengal", code: "WB", portalUrl: "https://wbhira.gov.in", searchTip: "West Bengal uses HIRA (not RERA). Search by project name or promoter" },
  { state: "Chhattisgarh", code: "CG", portalUrl: "https://rera.cgstate.gov.in", searchTip: "Search by project name or developer" },
  { state: "Jharkhand", code: "JH", portalUrl: "https://rera.jharkhand.gov.in", searchTip: "Search registered projects by name or location" },
  { state: "Uttarakhand", code: "UK", portalUrl: "https://rera.uk.gov.in", searchTip: "Search by project name or registration number" },
  { state: "Goa", code: "GA", portalUrl: "https://rera.goa.gov.in", searchTip: "Search projects by name, taluka, or promoter" },
  { state: "Himachal Pradesh", code: "HP", portalUrl: "https://rera.hp.gov.in", searchTip: "Search registered projects by district or promoter" },
  { state: "Assam", code: "AS", portalUrl: "https://rera.assam.gov.in", searchTip: "Search by project name or developer" },
];
