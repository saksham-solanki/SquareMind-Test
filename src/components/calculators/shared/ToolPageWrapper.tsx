import Link from "next/link";
import FadeUp from "@/components/FadeUp";
import type { ReactNode } from "react";

interface ToolPageWrapperProps {
  title: string;
  description: string;
  children: ReactNode;
}

export default function ToolPageWrapper({
  title,
  description,
  children,
}: ToolPageWrapperProps) {
  return (
    <>
      <div className="mx-auto max-w-[1200px] px-6 lg:px-14 pt-5">
        <nav
          className="text-[14px] text-gray-400"
          aria-label="Breadcrumb"
        >
          <Link
            href="/"
            className="hover:text-sage transition-colors"
          >
            Home
          </Link>
          <span className="mx-2">/</span>
          <Link
            href="/tools"
            className="hover:text-sage transition-colors"
          >
            Tools
          </Link>
          <span className="mx-2">/</span>
          <span>{title}</span>
        </nav>
      </div>

      <section className="py-[120px] max-lg:py-20">
        <div className="mx-auto max-w-[1200px] px-6 lg:px-14">
          <FadeUp>
            <h1 className="font-serif text-[clamp(36px,4.5vw,64px)] leading-[1.08] tracking-[-0.03em]">
              {title}
            </h1>
            <p className="text-[18px] text-gray-500 max-w-[560px] mt-4 leading-[1.65] tracking-[-0.01em]">
              {description}
            </p>
          </FadeUp>

          <FadeUp delay={0.1}>{children}</FadeUp>
        </div>
      </section>

      <section className="pb-[120px] max-lg:pb-20">
        <div className="mx-auto max-w-[1200px] px-6 lg:px-14">
          <FadeUp>
            <div className="bg-ink rounded-[28px] py-20 px-12 max-lg:py-12 max-lg:px-7 text-center">
              <h2 className="font-serif text-[clamp(32px,3.5vw,48px)] tracking-[-0.03em] text-white">
                Want a personalized analysis?
              </h2>
              <p className="text-[18px] text-white/65 mt-4 mb-9 max-w-[500px] mx-auto tracking-[-0.01em]">
                Our tools give you the framework. Our advisors give you the
                strategy.
              </p>
              <Link
                href="/consultation"
                className="inline-flex items-center gap-2 bg-white text-ink px-9 py-4 rounded-full text-[16px] font-bold hover:bg-cream hover:scale-[1.03] transition-all duration-300 tracking-[-0.01em]"
              >
                Get personalized analysis
              </Link>
            </div>
          </FadeUp>
        </div>
      </section>
    </>
  );
}
