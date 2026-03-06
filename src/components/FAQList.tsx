"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

export default function FAQList({ items }: { items: { q: string; a: string }[] }) {
  const [openIndex, setOpenIndex] = useState(0);

  return (
    <div className="max-w-[740px] mx-auto mt-12">
      {items.map((item, i) => (
        <div key={item.q} className="border-b border-gray-200 py-7">
          <button
            onClick={() => setOpenIndex(openIndex === i ? -1 : i)}
            className="w-full flex justify-between items-center text-left font-serif text-[20px] tracking-[-0.02em] hover:text-sage transition-colors select-none"
          >
            {item.q}
            <span className={`w-7 h-7 shrink-0 flex items-center justify-center text-[20px] text-gray-400 transition-transform duration-400 ${openIndex === i ? "rotate-45" : ""}`}>
              +
            </span>
          </button>
          <AnimatePresence>
            {openIndex === i && (
              <motion.div
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: "auto", opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                transition={{ duration: 0.3, ease: "easeOut" }}
                className="overflow-hidden"
              >
                <p className="text-[15px] text-gray-500 leading-[1.7] tracking-[-0.01em] mt-3.5">
                  {item.a}
                </p>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      ))}
    </div>
  );
}
