import Link from "next/link";

export default function Home() {
  return (
    <section className="min-h-[80vh] flex items-center justify-center">
      <div className="text-center px-5">
        <h1 className="font-serif text-[48px] lg:text-[64px] text-ink leading-tight mb-4">
          SquareMind
        </h1>
        <p className="text-gray-500 text-[18px] max-w-[480px] mx-auto mb-8">
          Real estate intelligence. Verified deals. Data-driven investing.
        </p>
        <Link
          href="/properties"
          className="inline-flex items-center bg-sage text-white font-medium text-[15px] px-7 py-3.5 rounded-lg hover:bg-sage-deep transition-colors"
        >
          Explore Properties →
        </Link>
      </div>
    </section>
  );
}
