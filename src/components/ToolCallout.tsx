import Link from "next/link";

interface ToolCalloutProps {
  tool: string;
  description: string;
  url: string;
}

const TOOL_ICONS: Record<string, string> = {
  "EMI Calculator": "\u{1F4CA}",
  "Rental Yield Calculator": "\u{1F4C8}",
  "Buy vs Rent Calculator": "\u{1F3E0}",
  "Total Cost Calculator": "\u{1F9EE}",
  "Stamp Duty Calculator": "\u{1F4DD}",
  "Investment Scorecard": "\u{2B50}",
  "RERA Project Verifier": "\u{1F50D}",
  "NRI Tax Calculator": "\u{1F4B0}",
};

export default function ToolCallout({ tool, description, url }: ToolCalloutProps) {
  const icon = TOOL_ICONS[tool] || "\u{1F4CA}";

  return (
    <div className="not-prose my-8 bg-cream rounded-[16px] p-6 flex items-start gap-4 border border-gray-100">
      <span className="text-[28px] shrink-0 mt-0.5" aria-hidden="true">
        {icon}
      </span>
      <div className="flex-1 min-w-0">
        <p className="font-semibold text-ink text-[16px] leading-tight mb-1">
          {tool}
        </p>
        <p className="text-[14px] text-gray-500 leading-[1.5] mb-3">
          {description}
        </p>
        <Link
          href={url}
          className="inline-flex items-center text-[14px] font-semibold text-sage hover:text-[#236050] transition-colors"
        >
          Try it free <span className="ml-1">&rarr;</span>
        </Link>
      </div>
    </div>
  );
}
