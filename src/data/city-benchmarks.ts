export interface CityBenchmark {
  city: string;
  avgGrossYield: number;
  yieldRange: [number, number];
  avgPricePerSqft?: number;
}

export const CITY_BENCHMARKS: CityBenchmark[] = [
  { city: "Bangalore", avgGrossYield: 3.25, yieldRange: [2.5, 4.5] },
  { city: "Mumbai", avgGrossYield: 2.25, yieldRange: [1.5, 3.5] },
  { city: "Pune", avgGrossYield: 3.25, yieldRange: [2.5, 4.0] },
  { city: "Hyderabad", avgGrossYield: 3.75, yieldRange: [3.0, 5.0] },
  { city: "Chennai", avgGrossYield: 3.25, yieldRange: [2.5, 4.0] },
  { city: "Delhi NCR", avgGrossYield: 2.75, yieldRange: [2.0, 4.0] },
  { city: "Chandigarh Tri-City", avgGrossYield: 2.75, yieldRange: [2.0, 3.5] },
  { city: "Ahmedabad", avgGrossYield: 3.25, yieldRange: [2.5, 4.0] },
];
