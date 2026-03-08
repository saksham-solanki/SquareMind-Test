"use client";

import { useEffect } from "react";
import { captureUTMParams } from "@/lib/utm";

/**
 * Client component that captures UTM parameters from the URL on mount.
 * Place in any page layout where you need UTM tracking.
 * Renders nothing — purely a side-effect component.
 */
export default function UTMCapture() {
  useEffect(() => {
    captureUTMParams();
  }, []);

  return null;
}
