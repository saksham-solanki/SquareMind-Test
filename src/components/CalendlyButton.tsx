"use client";

import { useState, useEffect } from "react";
import { PopupButton, useCalendlyEventListener } from "react-calendly";
import { trackEvent } from "@/lib/meta-pixel";

export default function CalendlyButton({
  url,
  text = "Book Your Free Strategy Call",
}: {
  url: string;
  text?: string;
}) {
  const [rootElement, setRootElement] = useState<HTMLElement | null>(null);

  useEffect(() => {
    setRootElement(document.body);
  }, []);

  useCalendlyEventListener({
    onEventScheduled: () => {
      trackEvent("Schedule");
    },
  });

  if (!url || !rootElement) return null;

  return (
    <PopupButton
      url={url}
      rootElement={rootElement}
      text={text}
      className="inline-flex items-center justify-center gap-2 bg-sage text-white px-9 py-4 rounded-full text-[16px] font-semibold tracking-[-0.01em] hover:bg-sage-deep hover:scale-[1.03] transition-all duration-300 cursor-pointer"
    />
  );
}
