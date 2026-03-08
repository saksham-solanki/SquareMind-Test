"use client";

import { sendGAEvent } from "@next/third-parties/google";

export function trackFormSubmit(formType: string) {
  if (typeof window === "undefined") return;
  sendGAEvent("event", "form_submit", { form_type: formType });
}

export function trackCalendlyOpen() {
  if (typeof window === "undefined") return;
  sendGAEvent("event", "calendly_open", {});
}

export function trackWhatsAppClick() {
  if (typeof window === "undefined") return;
  sendGAEvent("event", "whatsapp_click", {});
}
