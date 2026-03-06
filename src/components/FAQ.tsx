"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/lib/cn";

const faqs = [
  {
    q: "When does this launch?",
    a: "We're currently onboarding our first batch of verified deals and building our investor waitlist. Fill out the form above to get notified the moment deals go live. Early waitlist members get 24-hour first access to every new deal.",
  },
  {
    q: "How is this different from 99acres or MagicBricks?",
    a: "They list 500,000+ unverified properties from brokers. We list 20-50 verified distressed deals at any given time. They're a search engine. We're a curated deal room. They make money from ads and broker listings. We make money only when a deal actually closes. Our incentives are completely aligned with yours.",
  },
  {
    q: "What kind of discount can I actually expect?",
    a: "15-35% below our estimated market price. We only accept listings where the discount is genuine — verified against comparable sales, circle rates, and recent registrations in the area. We won't list an overpriced property just to have more inventory.",
  },
  {
    q: "I'm a seller with a property I need to exit quickly. Can you help?",
    a: "Yes — that's exactly who we serve. If you're an investor looking to exit, an owner with financial pressure, relocating, or stuck with a property that hasn't sold for months, reach out to us. We verify your documents, price it at a level that guarantees a 30-day sale, and connect you with vetted investors who close fast. No broker spam. No 100 random calls. Just a clean deal.",
  },
  {
    q: "Will I get spammed after filling the form?",
    a: "No. You'll receive deal alerts only when a property matching your criteria goes live. No cold calls. No broker handoffs. No selling your data. This is SquareMind — we built this because we hate the spam culture of Indian real estate.",
  },
  {
    q: "Is this free for investors?",
    a: "Yes. Browsing deals and receiving alerts is completely free. There may be a small refundable deposit required to place a bid (to ensure only serious investors participate), but you pay nothing until you actually win a deal.",
  },
];

export default function FAQ() {
  const [open, setOpen] = useState<number | null>(null);

  return (
    <div className="max-w-[800px] mx-auto space-y-0">
      {faqs.map((faq, i) => (
        <div key={i} className="border-b border-ink/8">
          <button
            onClick={() => setOpen(open === i ? null : i)}
            className="w-full flex items-center justify-between py-6 text-left group"
          >
            <span className="font-serif text-lg lg:text-xl text-ink pr-8">{faq.q}</span>
            <span
              className={cn(
                "shrink-0 w-8 h-8 rounded-full border border-ink/10 flex items-center justify-center text-gray-500 transition-transform",
                open === i && "rotate-45"
              )}
            >
              <svg width="14" height="14" viewBox="0 0 14 14" fill="none" stroke="currentColor" strokeWidth="1.5">
                <path d="M7 1v12M1 7h12" />
              </svg>
            </span>
          </button>
          <AnimatePresence initial={false}>
            {open === i && (
              <motion.div
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: "auto", opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                transition={{ duration: 0.3, ease: "easeInOut" }}
                className="overflow-hidden"
              >
                <p className="text-gray-500 text-[16px] leading-relaxed pb-6 pr-12">
                  {faq.a}
                </p>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      ))}
    </div>
  );
}
