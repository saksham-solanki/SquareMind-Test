"use client";

import { useState } from "react";
import { getUTMParams } from "@/lib/utm";
import { trackEvent } from "@/lib/meta-pixel";
import { trackFormSubmit } from "@/lib/analytics";

interface NewsletterFormProps {
  className?: string;
}

export default function NewsletterForm({ className }: NewsletterFormProps) {
  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setLoading(true);
    setError(null);

    const formData = new FormData(e.currentTarget);
    const email = formData.get("email") as string;
    const utmParams = getUTMParams();

    try {
      const res = await fetch("/api/leads", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email,
          form_type: "newsletter",
          source_page: window.location.pathname,
          ...utmParams,
        }),
      });

      if (res.ok) {
        setSubmitted(true);
        trackEvent("Lead", { content_name: "newsletter" });
        trackFormSubmit("newsletter");
      } else {
        const data = await res.json().catch(() => ({}));
        setError(data.error || "Something went wrong. Please try again.");
      }
    } catch {
      setError("Network error. Please check your connection and try again.");
    } finally {
      setLoading(false);
    }
  }

  if (submitted) {
    return (
      <div className={className}>
        <div className="flex flex-col items-center justify-center gap-2 py-2">
          <span className="text-sage text-[28px] font-bold">&#10003;</span>
          <p className="text-[16px] font-semibold text-ink tracking-[-0.01em]">
            You&apos;re in! Check your inbox.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className={className}>
      <form
        onSubmit={handleSubmit}
        className="flex flex-col sm:flex-row gap-2.5 max-w-[440px] mx-auto"
      >
        <input
          type="email"
          name="email"
          placeholder="your@email.com"
          required
          disabled={loading}
          className="flex-1 px-5 py-3.5 border-[1.5px] border-gray-300 rounded-full text-[15px] bg-white text-ink focus:outline-none focus:border-ink transition-colors tracking-[-0.01em] disabled:opacity-60"
        />
        <button
          type="submit"
          disabled={loading}
          className="bg-ink text-white px-7 py-3.5 rounded-full text-[15px] font-semibold whitespace-nowrap hover:bg-gray-600 hover:scale-[1.03] transition-all duration-300 tracking-[-0.01em] disabled:opacity-60 disabled:hover:scale-100"
        >
          {loading ? "Sending..." : "Get free checklist"}
        </button>
      </form>
      {error && (
        <p className="text-red text-[13px] mt-2 text-center tracking-[-0.01em]">
          {error}
        </p>
      )}
    </div>
  );
}
