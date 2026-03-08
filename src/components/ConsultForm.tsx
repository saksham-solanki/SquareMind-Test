"use client";

import { useState } from "react";
import { getUTMParams } from "@/lib/utm";
import { trackEvent } from "@/lib/meta-pixel";

export default function ConsultForm() {
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setLoading(true);
    setError(null);

    const fd = new FormData(e.currentTarget);
    const name = fd.get("name") as string;
    const email = fd.get("email") as string;
    const phone = fd.get("phone") as string;
    const location = fd.get("location") as string;
    const budget_range = fd.get("budget_range") as string;

    try {
      const res = await fetch("/api/leads", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name,
          email,
          phone,
          location: location || null,
          budget_range: budget_range || null,
          source_page: window.location.pathname,
          form_type: "consultation",
          ...getUTMParams(),
        }),
      });

      const data = await res.json();

      if (!res.ok) {
        setError(data.error || "Something went wrong. Please try again.");
        setLoading(false);
        return;
      }

      setSubmitted(true);
      trackEvent("Lead", { content_name: "consult_form" });
    } catch {
      setError("Network error. Please check your connection and try again.");
    } finally {
      setLoading(false);
    }
  }

  if (submitted) {
    return (
      <div className="bg-cream rounded-[28px] p-11 max-lg:p-8 sticky top-[104px] text-center">
        <div className="text-[48px] mb-4">&#10003;</div>
        <h3 className="font-serif text-[24px] mb-2">You&apos;re booked!</h3>
        <p className="text-[15px] text-gray-500">We&apos;ll confirm your free strategy session within 2 hours.</p>
      </div>
    );
  }

  return (
    <div className="bg-cream rounded-[28px] p-11 max-lg:p-8 sticky top-[104px]">
      <h3 className="text-[20px] font-bold mb-1">Book Your Free Call</h3>
      <p className="text-[13px] text-gray-400 mb-5">Takes 30 seconds. We&apos;ll confirm within 2 hours.</p>
      <div className="flex items-center gap-2 text-[13px] text-gray-500 mb-5 py-3 px-4 bg-white rounded-[12px] tracking-[-0.01em]">
        <strong className="text-gold">{"\u2605"} 4.9</strong> rated by 1,200+ investors &bull; Zero spam guarantee
      </div>
      {error && (
        <div className="mb-4 p-3 bg-red-50 border border-red-200 rounded-[12px] text-[13px] text-red-700">
          {error}
        </div>
      )}
      <form onSubmit={handleSubmit}>
        <FormField name="name" label="Full Name" type="text" placeholder="Amit Patel" required />
        <FormField name="email" label="Email" type="email" placeholder="amit@company.com" required />
        <FormField name="phone" label="Phone / WhatsApp" type="tel" placeholder="+91 98765 43210" required />
        <div className="mb-4">
          <label className="block text-[13px] font-semibold text-gray-600 mb-2 tracking-[-0.01em]">Where are you based?</label>
          <select name="location" className="w-full px-[18px] py-3.5 border-[1.5px] border-gray-300 rounded-[12px] text-[15px] bg-white text-ink focus:outline-none focus:border-ink transition-all tracking-[-0.01em]">
            <option value="" disabled>Select location</option>
            <option>India</option><option>USA</option><option>Canada</option><option>UK</option><option>UAE</option><option>Singapore</option><option>Australia</option><option>Other</option>
          </select>
        </div>
        <div className="mb-4">
          <label className="block text-[13px] font-semibold text-gray-600 mb-2 tracking-[-0.01em]">Investment Budget Range</label>
          <select name="budget_range" required className="w-full px-[18px] py-3.5 border-[1.5px] border-gray-300 rounded-[12px] text-[15px] bg-white text-ink focus:outline-none focus:border-ink transition-all tracking-[-0.01em]">
            <option value="" disabled>Select budget</option>
            <option>{"\u20B9"}30L &ndash; {"\u20B9"}50L</option>
            <option>{"\u20B9"}50L &ndash; {"\u20B9"}1Cr</option>
            <option>{"\u20B9"}1Cr &ndash; {"\u20B9"}3Cr</option>
            <option>{"\u20B9"}3Cr &ndash; {"\u20B9"}5Cr</option>
            <option>{"\u20B9"}5Cr &ndash; {"\u20B9"}10Cr</option>
            <option>{"\u20B9"}10Cr+</option>
          </select>
        </div>
        <div className="mb-4">
          <label className="block text-[13px] font-semibold text-gray-600 mb-2 tracking-[-0.01em]">What&apos;s on your mind? (Optional)</label>
          <textarea name="message" placeholder="e.g. Considering a flat in Bangalore, need help evaluating..." className="w-full px-[18px] py-3.5 border-[1.5px] border-gray-300 rounded-[12px] text-[15px] bg-white text-ink focus:outline-none focus:border-ink transition-all tracking-[-0.01em] resize-y min-h-[90px]" />
        </div>
        <button type="submit" disabled={loading} className="w-full inline-flex items-center justify-center bg-ink text-white px-9 py-4 rounded-full text-[16px] font-semibold tracking-[-0.01em] hover:bg-gray-600 hover:scale-[1.03] transition-all duration-300 mt-2 disabled:opacity-70">
          {loading ? "Submitting..." : "Get My Free Strategy Session"}
        </button>
        <p className="text-[11px] text-gray-400 text-center mt-3">100% free. 100% confidential. Zero spam.</p>
      </form>
    </div>
  );
}

function FormField({ name, label, type, placeholder, required }: { name: string; label: string; type: string; placeholder: string; required?: boolean }) {
  return (
    <div className="mb-4">
      <label className="block text-[13px] font-semibold text-gray-600 mb-2 tracking-[-0.01em]">{label}</label>
      <input name={name} type={type} placeholder={placeholder} required={required} className="w-full px-[18px] py-3.5 border-[1.5px] border-gray-300 rounded-[12px] text-[15px] bg-white text-ink focus:outline-none focus:border-ink focus:shadow-[0_0_0_3px_rgba(10,10,10,0.06)] transition-all tracking-[-0.01em]" />
    </div>
  );
}
