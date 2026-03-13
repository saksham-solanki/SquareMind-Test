"use client";

import { trackEvent } from "@/lib/meta-pixel";
import { trackWhatsAppClick } from "@/lib/analytics";

export default function WhatsAppLink({
  href,
  className,
  children,
}: {
  href: string;
  className?: string;
  children: React.ReactNode;
}) {
  function handleClick() {
    trackEvent("Contact", { content_name: "whatsapp_click" });
    trackWhatsAppClick();
  }

  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className={className}
      onClick={handleClick}
    >
      {children}
    </a>
  );
}
