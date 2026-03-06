"use client";

import { useState } from "react";

export default function HeroForm() {
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setLoading(true);
    await new Promise((r) => setTimeout(r, 1000));
    setSubmitted(true);
    setLoading(false);
  }

  if (submitted) {
    return (
      <div className="bg-cream rounded-[28px] p-11 max-lg:p-8 w-full lg:w-[440px] text-center">
        <div className="text-[48px] mb-4">&#10003;</div>
        <h3 className="font-serif text-[24px] mb-2">You&apos;re in!</h3>
        <p className="text-[15px] text-gray-500">We&apos;ll reach out within 2 hours to schedule your free strategy session.</p>
      </div>
    );
  }

  return (
    <div className="bg-cream rounded-[28px] p-11 max-lg:p-8 w-full lg:w-[440px] shrink-0">
      <h2 className="font-serif text-[24px] tracking-[-0.02em] mb-1.5">Book your free call</h2>
      <p className="text-[14px] text-gray-500 mb-5">30 minutes. No sales pitch. Just answers.</p>
      <div className="flex items-center gap-2 text-[13px] text-gray-500 mb-5 py-3 px-4 bg-white rounded-[12px] tracking-[-0.01em]">
        <strong className="text-gold">{"\u2605"} 4.9</strong> rated by 1,200+ investors &bull; Zero spam guarantee
      </div>
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label className="block text-[13px] font-semibold text-gray-600 mb-2 tracking-[-0.01em]">Full Name</label>
          <input type="text" placeholder="Amit Patel" required className="w-full px-[18px] py-3.5 border-[1.5px] border-gray-300 rounded-[12px] text-[15px] bg-white text-ink focus:outline-none focus:border-ink focus:shadow-[0_0_0_3px_rgba(10,10,10,0.06)] transition-all tracking-[-0.01em]" />
        </div>
        <div className="mb-4">
          <label className="block text-[13px] font-semibold text-gray-600 mb-2 tracking-[-0.01em]">Email</label>
          <input type="email" placeholder="amit@company.com" required className="w-full px-[18px] py-3.5 border-[1.5px] border-gray-300 rounded-[12px] text-[15px] bg-white text-ink focus:outline-none focus:border-ink focus:shadow-[0_0_0_3px_rgba(10,10,10,0.06)] transition-all tracking-[-0.01em]" />
        </div>
        <div className="mb-4">
          <label className="block text-[13px] font-semibold text-gray-600 mb-2 tracking-[-0.01em]">Phone / WhatsApp</label>
          <input type="tel" placeholder="+91 98765 43210" required className="w-full px-[18px] py-3.5 border-[1.5px] border-gray-300 rounded-[12px] text-[15px] bg-white text-ink focus:outline-none focus:border-ink focus:shadow-[0_0_0_3px_rgba(10,10,10,0.06)] transition-all tracking-[-0.01em]" />
        </div>
        <div className="mb-4">
          <label className="block text-[13px] font-semibold text-gray-600 mb-2 tracking-[-0.01em]">Investment Budget</label>
          <select required className="w-full px-[18px] py-3.5 border-[1.5px] border-gray-300 rounded-[12px] text-[15px] bg-white text-ink focus:outline-none focus:border-ink transition-all tracking-[-0.01em]">
            <option value="" disabled>Select your budget range</option>
            <option>{"\u20B9"}50L &ndash; {"\u20B9"}1Cr</option>
            <option>{"\u20B9"}1Cr &ndash; {"\u20B9"}3Cr</option>
            <option>{"\u20B9"}3Cr &ndash; {"\u20B9"}5Cr</option>
            <option>{"\u20B9"}5Cr &ndash; {"\u20B9"}10Cr</option>
            <option>{"\u20B9"}10Cr+</option>
          </select>
        </div>
        <button
          type="submit"
          disabled={loading}
          className="w-full inline-flex items-center justify-center gap-2 bg-ink text-white px-9 py-4 rounded-full text-[16px] font-semibold tracking-[-0.01em] hover:bg-gray-600 hover:scale-[1.03] transition-all duration-300 mt-2 disabled:opacity-70"
        >
          {loading ? "Submitting..." : "Get my free strategy session"}
        </button>
        <p className="text-[12px] text-gray-400 text-center mt-3.5 tracking-[-0.01em]">
          Free. Confidential. No sales pitch.
        </p>
      </form>
    </div>
  );
}
