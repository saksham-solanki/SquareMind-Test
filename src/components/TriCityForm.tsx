"use client";

import { useState } from "react";
import { getUTMParams } from "@/lib/utm";
import { trackEvent } from "@/lib/meta-pixel";

const LOCATIONS = [
  "Mumbai",
  "Delhi NCR",
  "Bangalore",
  "Hyderabad",
  "Pune",
  "Chennai",
  "Kolkata",
  "Chandigarh",
  "Mohali",
  "Panchkula",
  "Gurgaon",
  "Noida",
  "Jaipur",
  "Ahmedabad",
  "Lucknow",
  "Dubai (UAE)",
  "USA",
  "UK",
  "Canada",
  "Singapore",
  "Australia",
  "Other",
];

const BUDGETS = [
  "\u20B950L \u2013 \u20B91Cr",
  "\u20B91Cr \u2013 \u20B93Cr",
  "\u20B93Cr \u2013 \u20B95Cr",
  "\u20B95Cr \u2013 \u20B910Cr",
  "\u20B910Cr+",
];

const inputClasses =
  "w-full px-[18px] py-3.5 border-[1.5px] border-gray-300 rounded-[12px] text-[15px] bg-white text-ink focus:outline-none focus:border-ink focus:shadow-[0_0_0_3px_rgba(10,10,10,0.06)] transition-all tracking-[-0.01em]";

const labelClasses =
  "block text-[13px] font-semibold text-gray-600 mb-2 tracking-[-0.01em]";

export default function TriCityForm() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [location, setLocation] = useState("");
  const [budget, setBudget] = useState("");
  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState("");

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      const utmParams = getUTMParams();

      const response = await fetch("/api/leads", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name,
          email,
          phone,
          location,
          budget_range: budget,
          source_page: window.location.href,
          form_type: "landing_tri_city",
          ...utmParams,
        }),
      });

      if (!response.ok) {
        const data = await response.json();
        throw new Error(data.error || "Something went wrong. Please try again.");
      }

      setSubmitted(true);
      trackEvent("Lead");
    } catch (err) {
      setError(
        err instanceof Error ? err.message : "Something went wrong. Please try again."
      );
    } finally {
      setLoading(false);
    }
  }

  if (submitted) {
    return (
      <div className="bg-cream rounded-[28px] p-11 max-lg:p-8 w-full lg:w-[440px] text-center">
        <div className="text-[48px] mb-4">&#10003;</div>
        <h3 className="font-serif text-[24px] mb-2">
          Thank you!
        </h3>
        <p className="text-[15px] text-gray-500">
          We&apos;ll reach out within 24 hours with your free Tri-City
          investment guide and to schedule your strategy session.
        </p>
      </div>
    );
  }

  return (
    <div className="bg-cream rounded-[28px] p-11 max-lg:p-8 w-full lg:w-[440px] shrink-0">
      <h2 className="font-serif text-[24px] tracking-[-0.02em] mb-1.5">
        Get your free investment guide
      </h2>
      <p className="text-[14px] text-gray-500 mb-5">
        Tri-City 2026 market analysis. Zero spam.
      </p>

      {error && (
        <div className="mb-4 p-3 bg-red-50 border border-red-200 rounded-[12px] text-[13px] text-red-700">
          {error}
        </div>
      )}

      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label className={labelClasses}>Full Name</label>
          <input
            type="text"
            placeholder="Amit Patel"
            required
            value={name}
            onChange={(e) => setName(e.target.value)}
            className={inputClasses}
          />
        </div>

        <div className="mb-4">
          <label className={labelClasses}>Email</label>
          <input
            type="email"
            placeholder="amit@company.com"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className={inputClasses}
          />
        </div>

        <div className="mb-4">
          <label className={labelClasses}>Phone / WhatsApp</label>
          <input
            type="tel"
            placeholder="+91 98765 43210"
            required
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            className={inputClasses}
          />
        </div>

        <div className="mb-4">
          <label className={labelClasses}>Where do you currently live?</label>
          <select
            required
            value={location}
            onChange={(e) => setLocation(e.target.value)}
            className={inputClasses}
          >
            <option value="" disabled>
              Select your city
            </option>
            {LOCATIONS.map((loc) => (
              <option key={loc} value={loc}>
                {loc}
              </option>
            ))}
          </select>
        </div>

        <div className="mb-4">
          <label className={labelClasses}>Investment Budget</label>
          <select
            required
            value={budget}
            onChange={(e) => setBudget(e.target.value)}
            className={inputClasses}
          >
            <option value="" disabled>
              Select your budget range
            </option>
            {BUDGETS.map((b) => (
              <option key={b} value={b}>
                {b}
              </option>
            ))}
          </select>
        </div>

        <button
          type="submit"
          disabled={loading}
          className="w-full inline-flex items-center justify-center gap-2 bg-ink text-white px-9 py-4 rounded-full text-[16px] font-semibold tracking-[-0.01em] hover:bg-gray-600 hover:scale-[1.03] transition-all duration-300 mt-2 disabled:opacity-70"
        >
          {loading ? (
            <>
              <svg
                className="animate-spin h-5 w-5"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
              >
                <circle
                  className="opacity-25"
                  cx="12"
                  cy="12"
                  r="10"
                  stroke="currentColor"
                  strokeWidth="4"
                />
                <path
                  className="opacity-75"
                  fill="currentColor"
                  d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"
                />
              </svg>
              Submitting...
            </>
          ) : (
            "Get Your Free Investment Guide"
          )}
        </button>

        <p className="text-[12px] text-gray-400 text-center mt-3.5 tracking-[-0.01em]">
          Free. Confidential. No spam, ever.
        </p>
      </form>
    </div>
  );
}
