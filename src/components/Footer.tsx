import Link from "next/link";

const footerCols = [
  {
    title: "Research",
    links: [
      { href: "/insights", label: "Insights Blog" },
      { href: "/research", label: "Research Reports" },
      { href: "/research", label: "Builder Trust Index" },
      { href: "/research", label: "City Ratings" },
    ],
  },
  {
    title: "Tools",
    links: [
      { href: "/tools", label: "Rental Yield Calculator" },
      { href: "/tools", label: "Buy vs Rent Analyzer" },
      { href: "/tools", label: "Total Cost Calculator" },
    ],
  },
  {
    title: "Company",
    links: [
      { href: "/about", label: "About" },
      { href: "/consultation", label: "Free Consultation" },
      { href: "/properties", label: "Properties" },
      { href: "/frameworks", label: "Frameworks" },
      { href: "/case-studies", label: "Case Studies" },
      { href: "/faq", label: "FAQ" },
    ],
  },
];

export default function Footer() {
  return (
    <footer className="bg-ink text-gray-400 pt-20 pb-12">
      <div className="mx-auto max-w-[1200px] px-6 lg:px-14">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-[2fr_1fr_1fr_1fr] gap-14">
          {/* Brand */}
          <div>
            <div className="text-[22px] font-bold text-white tracking-[-0.5px]">
              Square<span className="text-sage-muted">Mind</span>
            </div>
            <p className="text-[14px] leading-relaxed mt-3.5 max-w-[300px] tracking-[-0.01em]">
              India&apos;s first independent real estate investment advisory. We don&apos;t sell properties. We help you invest smarter.
            </p>
            <div className="mt-[18px] text-[13px] leading-[1.8]">
              <span className="text-sage-muted">&#9679;</span> Zero builder commissions<br />
              <span className="text-sage-muted">&#9679;</span> Data-backed research<br />
              <span className="text-sage-muted">&#9679;</span> Investor-first. Always.
            </div>
            <p className="text-[13px] mt-[18px] leading-relaxed">
              SquareMind Investment Advisory<br />
              Bangalore, India<br />
              <a href="mailto:hello@squaremind.in" className="text-sage-muted hover:text-white transition-colors">
                hello@squaremind.in
              </a>
            </p>
          </div>

          {/* Link columns */}
          {footerCols.map((col) => (
            <div key={col.title}>
              <h4 className="text-[13px] font-semibold tracking-[0.06em] uppercase text-gray-300 mb-5">
                {col.title}
              </h4>
              {col.links.map((link) => (
                <Link
                  key={link.label}
                  href={link.href}
                  className="block text-[14px] text-gray-400 mb-3 hover:text-white transition-colors tracking-[-0.01em]"
                >
                  {link.label}
                </Link>
              ))}
            </div>
          ))}
        </div>

        {/* Bottom */}
        <div className="mt-14 pt-7 border-t border-white/[0.06] text-[13px] flex flex-col sm:flex-row justify-between gap-4">
          <span>&copy; 2026 SquareMind. All rights reserved.</span>
          <span className="flex gap-7">
            <Link href="/privacy" className="text-gray-400 hover:text-white transition-colors">Privacy Policy</Link>
            <Link href="/terms" className="text-gray-400 hover:text-white transition-colors">Terms</Link>
          </span>
        </div>
      </div>
    </footer>
  );
}
