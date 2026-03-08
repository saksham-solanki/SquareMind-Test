"use client";

import { useState } from "react";
import { getUTMParams } from "@/lib/utm";
import { trackEvent } from "@/lib/meta-pixel";

export default function DownloadGate({ reportName }: { reportName: string }) {
  const [open, setOpen] = useState(false);
  const [sent, setSent] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setLoading(true);
    setError(null);

    const fd = new FormData(e.currentTarget);
    const email = fd.get("email") as string;

    try {
      const res = await fetch("/api/leads", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email,
          source_page: window.location.pathname,
          form_type: "download_gate",
          ...getUTMParams(),
        }),
      });

      const data = await res.json();

      if (!res.ok) {
        setError(data.error || "Something went wrong. Please try again.");
        setLoading(false);
        return;
      }

      setSent(true);
      trackEvent("Lead", { content_name: "download_gate" });
      setTimeout(() => setOpen(false), 2000);
    } catch {
      setError("Network error. Please check your connection and try again.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <>
      <button
        onClick={() => setOpen(true)}
        className="mt-3 inline-flex items-center gap-2 bg-sage text-white px-5 py-2.5 rounded-full text-[13px] font-semibold hover:bg-sage-deep hover:scale-[1.03] transition-all duration-300"
      >
        Download Free Report
      </button>

      {open && (
        <div
          className="fixed inset-0 z-[200] bg-black/55 backdrop-blur-[4px] flex items-center justify-center transition-opacity"
          onClick={(e) => e.target === e.currentTarget && setOpen(false)}
        >
          <div className="bg-white rounded-[28px] p-12 max-lg:p-8 max-w-[460px] w-[90%] text-center relative">
            <button
              onClick={() => setOpen(false)}
              className="absolute top-[18px] right-[18px] w-9 h-9 flex items-center justify-center rounded-full text-[22px] text-gray-400 hover:bg-gray-100 hover:text-ink transition-all"
              aria-label="Close"
            >
              &times;
            </button>
            <h3 className="font-serif text-[28px] tracking-[-0.03em] mb-2">Get your free report</h3>
            <p className="text-[14px] text-gray-500 mb-5 leading-relaxed">
              {reportName} &mdash; enter your email and we&apos;ll send it to your inbox.
            </p>
            {error && (
              <div className="mb-3 p-3 bg-red-50 border border-red-200 rounded-[12px] text-[13px] text-red-700">
                {error}
              </div>
            )}
            <form onSubmit={handleSubmit} className="flex flex-col gap-2.5">
              <input
                name="email"
                type="email"
                placeholder="your@email.com"
                required
                className="px-5 py-3.5 border-[1.5px] border-gray-300 rounded-full text-[15px] text-center focus:outline-none focus:border-ink transition-colors"
              />
              <button
                type="submit"
                disabled={loading || sent}
                className="bg-ink text-white py-3.5 rounded-full text-[15px] font-semibold hover:bg-gray-600 transition-all disabled:opacity-70"
              >
                {sent ? "Sent! Check your inbox" : loading ? "Sending..." : "Send me the report"}
              </button>
            </form>
            <p className="text-[11px] text-gray-400 mt-3">No spam. Unsubscribe anytime.</p>
          </div>
        </div>
      )}
    </>
  );
}
