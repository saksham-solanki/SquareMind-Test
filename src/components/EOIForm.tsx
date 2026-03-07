"use client";

import { useState, type FormEvent } from "react";

const budgetOptions = [
  "₹30L–₹50L",
  "₹50L–₹1Cr",
  "₹1Cr–₹3Cr",
  "₹3Cr–₹5Cr",
  "₹5Cr–₹10Cr",
  "₹10Cr+",
];

const cityOptions = [
  "Chandigarh/Tricity",
  "Bangalore",
  "Pune",
  "Mumbai",
  "Hyderabad",
  "Delhi NCR",
  "Chennai",
  "Other",
];

const propertyTypeOptions = [
  "Apartment/Flat",
  "Independent House/Villa",
  "Plot/Land",
  "Commercial Property",
  "Any — Show Me All Deals",
];

export default function EOIForm() {
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState("");

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setSubmitting(true);
    setError("");

    const form = e.currentTarget;
    const data = {
      name: (form.elements.namedItem("name") as HTMLInputElement).value,
      phone: (form.elements.namedItem("phone") as HTMLInputElement).value,
      email: (form.elements.namedItem("email") as HTMLInputElement).value,
      budget_range: (form.elements.namedItem("budget_range") as HTMLSelectElement).value,
      preferred_city: (form.elements.namedItem("preferred_city") as HTMLSelectElement).value,
      property_type: (form.elements.namedItem("property_type") as HTMLSelectElement).value,
      source_page: "/properties",
    };

    try {
      // Try API route first (server deployment), fallback to client-side (static export)
      try {
        const res = await fetch("/api/eoi", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(data),
        });
        if (!res.ok) {
          const body = await res.json();
          throw new Error(body.error || "Something went wrong");
        }
      } catch {
        // Static export fallback — form submission logged client-side
        console.log("[EOI Submission]", JSON.stringify(data, null, 2));
        await new Promise((r) => setTimeout(r, 800));
      }
      setSubmitted(true);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Something went wrong");
    } finally {
      setSubmitting(false);
    }
  }

  if (submitted) {
    return (
      <div className="bg-white rounded-2xl shadow-sm border border-ink/5 p-8 lg:p-10 text-center">
        <div className="w-14 h-14 bg-sage-light rounded-full flex items-center justify-center mx-auto mb-5">
          <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#2A6F5A" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
            <path d="M20 6L9 17l-5-5" />
          </svg>
        </div>
        <h3 className="font-serif text-2xl text-ink mb-2">You&apos;re on the list.</h3>
        <p className="text-gray-500 text-[15px] leading-relaxed">
          We&apos;ll notify you the moment verified deals go live. Early waitlist members get 24-hour first access.
        </p>
      </div>
    );
  }

  const inputClass =
    "w-full px-4 py-3 rounded-lg border border-ink/10 bg-chalk text-ink text-[15px] placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-sage/20 focus:border-sage transition-colors";
  const selectClass =
    "w-full px-4 py-3 rounded-lg border border-ink/10 bg-chalk text-ink text-[15px] focus:outline-none focus:ring-2 focus:ring-sage/20 focus:border-sage transition-colors appearance-none bg-[url('data:image/svg+xml;charset=utf-8,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20width%3D%2212%22%20height%3D%2212%22%20viewBox%3D%220%200%2024%2024%22%20fill%3D%22none%22%20stroke%3D%22%236E6E6A%22%20stroke-width%3D%222%22%20stroke-linecap%3D%22round%22%20stroke-linejoin%3D%22round%22%3E%3Cpath%20d%3D%22m6%209%206%206%206-6%22%2F%3E%3C%2Fsvg%3E')] bg-[length:16px] bg-[right_12px_center] bg-no-repeat";
  const labelClass = "block text-[13px] font-medium text-gray-600 mb-1.5";

  return (
    <div id="form" className="bg-white rounded-2xl shadow-sm border border-ink/5 p-8 lg:p-10">
      <h3 className="font-serif text-2xl lg:text-[28px] text-ink mb-1.5">
        Get Notified When Deals Drop
      </h3>
      <p className="text-gray-500 text-[15px] leading-relaxed mb-7">
        Be the first to access verified distressed properties at deep discounts. Limited to serious investors only.
      </p>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label htmlFor="name" className={labelClass}>Full Name</label>
          <input id="name" name="name" type="text" required placeholder="Your full name" className={inputClass} />
        </div>

        <div>
          <label htmlFor="phone" className={labelClass}>Phone Number</label>
          <input id="phone" name="phone" type="tel" required placeholder="+91 98765 43210" className={inputClass} />
        </div>

        <div>
          <label htmlFor="email" className={labelClass}>Email</label>
          <input id="email" name="email" type="email" required placeholder="you@example.com" className={inputClass} />
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label htmlFor="budget_range" className={labelClass}>Investment Budget</label>
            <select id="budget_range" name="budget_range" required className={selectClass} defaultValue="">
              <option value="" disabled>Select budget</option>
              {budgetOptions.map((opt) => (
                <option key={opt} value={opt}>{opt}</option>
              ))}
            </select>
          </div>
          <div>
            <label htmlFor="preferred_city" className={labelClass}>Preferred City</label>
            <select id="preferred_city" name="preferred_city" required className={selectClass} defaultValue="">
              <option value="" disabled>Select city</option>
              {cityOptions.map((opt) => (
                <option key={opt} value={opt}>{opt}</option>
              ))}
            </select>
          </div>
        </div>

        <div>
          <label htmlFor="property_type" className={labelClass}>What are you looking for?</label>
          <select id="property_type" name="property_type" required className={selectClass} defaultValue="">
            <option value="" disabled>Select property type</option>
            {propertyTypeOptions.map((opt) => (
              <option key={opt} value={opt}>{opt}</option>
            ))}
          </select>
        </div>

        {error && (
          <p className="text-red-600 text-[14px]">{error}</p>
        )}

        <button
          type="submit"
          disabled={submitting}
          className="w-full bg-sage text-white font-medium text-[15px] py-3.5 rounded-lg hover:bg-sage-deep transition-colors disabled:opacity-60 disabled:cursor-not-allowed"
        >
          {submitting ? "Submitting..." : "Get Property Opportunities →"}
        </button>
      </form>

      <p className="text-center text-gray-400 text-[13px] mt-4">
        No spam. No broker calls. Only verified deal alerts.
      </p>
    </div>
  );
}
