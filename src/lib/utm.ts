const UTM_KEYS = [
  "utm_source",
  "utm_medium",
  "utm_campaign",
  "utm_content",
  "utm_term",
] as const;

type UTMParams = Record<(typeof UTM_KEYS)[number], string | null>;

/**
 * Captures UTM parameters from the current URL and stores them in sessionStorage.
 * Only writes values that are present in the URL — does not overwrite with null.
 * Safe for SSR (no-ops when window is undefined).
 */
export function captureUTMParams(): void {
  if (typeof window === "undefined") return;

  const params = new URLSearchParams(window.location.search);

  for (const key of UTM_KEYS) {
    const value = params.get(key);
    if (value) {
      sessionStorage.setItem(key, value);
    }
  }
}

/**
 * Retrieves all UTM parameters from sessionStorage.
 * Returns null for any key not found.
 */
export function getUTMParams(): UTMParams {
  if (typeof window === "undefined") {
    return {
      utm_source: null,
      utm_medium: null,
      utm_campaign: null,
      utm_content: null,
      utm_term: null,
    };
  }

  const result = {} as UTMParams;
  for (const key of UTM_KEYS) {
    result[key] = sessionStorage.getItem(key);
  }
  return result;
}
