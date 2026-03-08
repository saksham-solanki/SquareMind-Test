"use client";

import { useEffect } from "react";
import { trackEvent } from "@/lib/meta-pixel";

export default function ViewContentTracker({
  contentName,
}: {
  contentName: string;
}) {
  useEffect(() => {
    trackEvent("ViewContent", { content_name: contentName });
  }, [contentName]);

  return null;
}
