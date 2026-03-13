"use client";

import { useState } from "react";
import { getUTMParams } from "@/lib/utm";
import { trackEvent } from "@/lib/meta-pixel";
import { trackFormSubmit } from "@/lib/analytics";

const BUDGETS = [
  "\u20B91Cr \u2013 \u20B93Cr",
  "\u20B93Cr \u2013 \u20B95Cr",
  "\u20B95Cr \u2013 \u20B910Cr",
  "\u20B910Cr+",
];

const INTERESTS = [
  "Homeland Global Park (Sector 75)",
  "Upcoming Sector 62 Project",
  "Both Projects",
  "Not sure \u2014 need guidance",
];

const inputClasses =
  "w-full px-[18px] py-3.5 border-[1.5px] border-gray-300 rounded-[12px] text-[15px] bg-white text-ink focus:outline-none focus:border-ink focus:shadow-[0_0_0_3px_rgba(10,10,10,0.06)] transition-all tracking-[-0.01em]";

const labelClasses =
  "block text-[13px] font-semibold text-gray-600 mb-2 tracking-[-0.01em]";

export default function HomelandForm() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [budget, setBudget] = useState("");
  const [interest, setInterest] = useState("");
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
          location: "Tri-City",
          budget_range: budget,
          source_page: window.location.href,
          form_type: "homeland",
          notes: interest,
          ...utmParams,
        }),
      });

      if (!response.ok) {
        const data = await response.json();
        throw new Error(data.error || "Something went wrong. Please try again.");
      }

      setSubmitted(true);
      trackEvent("Lead", { content_name: "homeland_form", value: budget });
      trackFormSubmit("homeland");
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
      <div className="bg-cream rounded-[28px] p-11 max-lg:p-8 w-full text-center">
        <div className="w-14 h-14 bg-sage rounded-full flex items-center justify-center mx-auto mb-4">
          <svg className="w-7 h-7 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
          </svg>
        </div>
        <h3 className="font-serif text-[24px] mb-2">We&apos;ll be in touch</h3>
        <p className="text-[15px] text-gray-500 mb-6">
          Our advisory team will reach out within 24 hours to schedule your
          free strategy meeting.
        </p>
        <a
          href="https://wa.me/918968066810?text=Hi%20SquareMind%2C%20I%20just%20submitted%20my%20details%20for%20Homeland%20projects.%20Looking%20forward%20to%20connecting."
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2 text-[15px] font-semibold text-sage hover:text-sage-deep transition-colors"
        >
          <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
            <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
          </svg>
          Message us on WhatsApp
        </a>
      </div>
    );
  }

  return (
    <div className="bg-cream rounded-[28px] p-11 max-lg:p-8 w-full">
      <h2 className="font-serif text-[24px] tracking-[-0.02em] mb-1.5">
        Book your free strategy meeting
      </h2>
      <p className="text-[14px] text-gray-500 mb-5">
        30 minutes. Independent advice. Zero spam.
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
            placeholder="Rajinder Singh"
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
            placeholder="rajinder@company.com"
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

        <div className="mb-4">
          <label className={labelClasses}>Which project interests you?</label>
          <select
            required
            value={interest}
            onChange={(e) => setInterest(e.target.value)}
            className={inputClasses}
          >
            <option value="" disabled>
              Select a project
            </option>
            {INTERESTS.map((item) => (
              <option key={item} value={item}>
                {item}
              </option>
            ))}
          </select>
        </div>

        <button
          type="submit"
          disabled={loading}
          className="w-full inline-flex items-center justify-center gap-2 bg-ink text-white px-9 py-4 rounded-full text-[16px] font-semibold tracking-[-0.01em] hover:bg-gray-600 hover:scale-[1.03] transition-all duration-300 mt-2 disabled:opacity-70 cursor-pointer"
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
            "Book My Free Strategy Meeting"
          )}
        </button>

        <p className="text-[12px] text-gray-400 text-center mt-3.5 tracking-[-0.01em]">
          Free. Confidential. No spam, ever.
        </p>
      </form>
    </div>
  );
}
