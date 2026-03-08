declare global {
  interface Window {
    fbq?: (
      action: string,
      eventName: string,
      params?: Record<string, unknown>
    ) => void;
  }
}

/**
 * Fires a Meta Pixel event if fbq is loaded on the page.
 * Safe for SSR — no-ops when window is undefined.
 */
export function trackEvent(
  eventName: string,
  params?: Record<string, unknown>
): void {
  if (typeof window === "undefined") return;
  if (typeof window.fbq === "function") {
    window.fbq("track", eventName, params);
  }
}
