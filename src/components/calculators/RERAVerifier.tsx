"use client";

import { useState } from "react";
import { ExternalLink, Search, CheckCircle } from "lucide-react";
import { RERA_PORTALS } from "@/data/rera-portals";

const CHECKLIST_ITEMS = [
  "RERA registration number is valid and active",
  "Project completion timeline matches builder claims",
  "Builder's track record on the portal (other projects, complaints)",
  "Approved building plans match actual construction",
  "Financial disclosures and escrow account details",
];

export default function RERAVerifier() {
  const [search, setSearch] = useState("");

  const filteredPortals = RERA_PORTALS.filter((p) =>
    p.state.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="mt-8 space-y-8">
      {/* What is RERA? */}
      <div className="bg-cream rounded-[28px] p-12 max-lg:p-6">
        <h3 className="font-serif text-[28px] tracking-[-0.02em] mb-4">
          What is RERA?
        </h3>
        <p className="text-[15px] text-gray-600 leading-[1.75] tracking-[-0.01em] max-w-[700px]">
          The Real Estate (Regulation and Development) Act, 2016 (RERA) is
          India&apos;s landmark law protecting homebuyers. Every real estate
          project must be registered with the state RERA authority before
          advertising or selling. RERA ensures transparency by mandating
          builders to disclose project details, timelines, and financials on
          public portals.
        </p>
      </div>

      {/* What to Check */}
      <div className="bg-cream rounded-[28px] p-12 max-lg:p-6">
        <h3 className="font-serif text-[24px] tracking-[-0.02em] mb-5">
          What to check on the RERA portal
        </h3>
        <ul className="space-y-3">
          {CHECKLIST_ITEMS.map((item) => (
            <li key={item} className="flex items-start gap-3">
              <CheckCircle className="w-5 h-5 text-sage flex-shrink-0 mt-0.5" />
              <span className="text-[15px] text-gray-600 tracking-[-0.01em] leading-[1.65]">
                {item}
              </span>
            </li>
          ))}
        </ul>
      </div>

      {/* State Portal Directory */}
      <div className="bg-cream rounded-[28px] p-12 max-lg:p-6">
        <h3 className="font-serif text-[24px] tracking-[-0.02em] mb-2">
          State RERA Portals
        </h3>
        <p className="text-[15px] text-gray-500 mb-6 tracking-[-0.01em]">
          Find your state&apos;s RERA portal and verify any project directly.
        </p>

        {/* Search */}
        <div className="relative mb-8 max-w-[400px]">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
          <input
            type="text"
            placeholder="Search by state name..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full pl-11 pr-4 py-3.5 border-[1.5px] border-gray-300 rounded-[12px] text-[15px] bg-white text-ink focus:outline-none focus:border-ink focus:shadow-[0_0_0_3px_rgba(13,13,13,0.06)] transition-all tracking-[-0.01em]"
          />
        </div>

        {/* Portal Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {filteredPortals.map((portal) => (
            <a
              key={portal.code}
              href={portal.portalUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="bg-white rounded-[16px] p-5 hover:shadow-md transition-all duration-200 group border border-gray-100"
            >
              <div className="flex items-start justify-between mb-2">
                <h4 className="font-semibold text-[15px] text-ink tracking-[-0.01em]">
                  {portal.state}
                </h4>
                <ExternalLink className="w-4 h-4 text-gray-400 group-hover:text-sage transition-colors flex-shrink-0" />
              </div>
              <div className="text-[12px] text-sage font-medium mb-2 tracking-[-0.01em]">
                {portal.portalUrl.replace("https://", "")}
              </div>
              {portal.searchTip && (
                <p className="text-[12px] text-gray-400 leading-[1.5] tracking-[-0.01em]">
                  {portal.searchTip}
                </p>
              )}
            </a>
          ))}
        </div>

        {filteredPortals.length === 0 && (
          <div className="text-center py-12 text-gray-400 text-[15px]">
            No portals found for &quot;{search}&quot;
          </div>
        )}
      </div>
    </div>
  );
}
