"use client";

import { useEffect } from "react";
import { trackEvent } from "@/lib/meta-pixel";
import { sendGAEvent } from "@next/third-parties/google";

/**
 * Fires the Meta Pixel "Lead" event and GA4 conversion event on mount.
 * Place on the /homeland/thank-you page so it fires when a Calendly
 * booking redirects here or after form submission.
 */
export default function ThankYouTracker() {
  useEffect(() => {
    // Meta Pixel — Lead event (primary conversion)
    trackEvent("Lead", { content_name: "homeland_meeting_booked" });

    // GA4 — generate_lead event
    if (typeof window !== "undefined") {
      sendGAEvent("event", "generate_lead", {
        event_category: "conversion",
        event_label: "homeland_meeting_booked",
      });
    }
  }, []);

  return null;
}
