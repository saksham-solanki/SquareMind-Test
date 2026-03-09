import Link from "next/link";
import FadeUp from "@/components/FadeUp";
import { TOOLS } from "@/data/tool-registry";
import {
  TrendingUp,
  Scale,
  Calculator,
  Award,
  ShieldCheck,
  Globe,
  Landmark,
  Stamp,
  ArrowRight,
} from "lucide-react";
import type { LucideIcon } from "lucide-react";

const iconMap: Record<string, LucideIcon> = {
  TrendingUp,
  Scale,
  Calculator,
  Award,
  ShieldCheck,
  Globe,
  Landmark,
  Stamp,
};

function ToolIcon({ name }: { name: string }) {
  const Icon = iconMap[name];
  if (!Icon) return null;
  return <Icon className="w-6 h-6 text-ink" strokeWidth={1.5} />;
}

export default function ToolsPage() {
  return (
    <>
      <div className="mx-auto max-w-[1200px] px-6 lg:px-14 pt-5">
        <nav className="text-[14px] text-gray-400" aria-label="Breadcrumb">
          <Link href="/" className="hover:text-sage transition-colors">
            Home
          </Link>
          <span className="mx-2">/</span>
          <span>Tools</span>
        </nav>
      </div>

      <section className="py-[120px] max-lg:py-20">
        <div className="mx-auto max-w-[1200px] px-6 lg:px-14">
          <FadeUp>
            <span className="text-[13px] font-semibold tracking-[0.08em] uppercase text-sage mb-4 block">
              Free Tools
            </span>
            <h1 className="font-serif text-[clamp(36px,4.5vw,64px)] leading-[1.08] tracking-[-0.03em]">
              Make decisions with numbers,
              <br />
              not WhatsApp forwards.
            </h1>
            <p className="text-[18px] text-gray-500 max-w-[560px] mt-4 leading-[1.65] tracking-[-0.01em]">
              Free interactive tools built for serious investors. No signup
              required.
            </p>
          </FadeUp>

          <FadeUp delay={0.1}>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-10">
              {TOOLS.map((tool) => (
                <Link
                  key={tool.slug}
                  href={`/tools/${tool.slug}`}
                  className="bg-cream rounded-[20px] p-10 max-lg:p-7 flex gap-6 items-start hover:-translate-y-1 hover:shadow-[0_20px_60px_rgba(0,0,0,0.06)] transition-all duration-400 group"
                >
                  <div className="w-14 h-14 shrink-0 bg-white rounded-[12px] flex items-center justify-center">
                    <ToolIcon name={tool.icon} />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between gap-2 mb-2">
                      <div className="text-[18px] font-bold tracking-[-0.02em]">
                        {tool.title}
                      </div>
                      <ArrowRight className="w-4 h-4 text-gray-400 group-hover:text-ink group-hover:translate-x-1 transition-all shrink-0" />
                    </div>
                    <div className="text-[15px] text-gray-500 leading-relaxed tracking-[-0.01em]">
                      {tool.description}
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </FadeUp>
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
