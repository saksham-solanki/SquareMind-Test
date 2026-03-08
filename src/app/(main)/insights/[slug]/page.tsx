import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import FadeUp from "@/components/FadeUp";
import NewsletterForm from "@/components/NewsletterForm";
import { ScrollProgress } from "@/components/animations/ScrollProgress";
import { getPostBySlug, getRelatedPosts, posts } from "@/lib/posts";

interface Props {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  return posts.map((post) => ({ slug: post.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const post = getPostBySlug(slug);
  if (!post) return {};
  return {
    title: `${post.title} | SquareMind`,
    description: post.description,
    keywords: [post.primaryKeyword, ...post.secondaryKeywords].join(", "),
    openGraph: {
      title: post.title,
      description: post.description,
      type: "article",
      publishedTime: post.publishedAt,
      url: `/insights/${post.slug}`,
    },
    alternates: {
      canonical: `https://squaremind.in/insights/${post.slug}`,
    },
  };
}

export default async function PostPage({ params }: Props) {
  const { slug } = await params;
  const post = getPostBySlug(slug);
  if (!post) notFound();

  const related = getRelatedPosts(slug, post.category);

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: post.title,
    description: post.description,
    datePublished: post.publishedAt,
    dateModified: post.publishedAt,
    author: {
      "@type": "Organization",
      name: "SquareMind",
      url: "https://squaremind.in",
    },
    publisher: {
      "@type": "Organization",
      name: "SquareMind",
      logo: {
        "@type": "ImageObject",
        url: "https://squaremind.in/logo.png",
      },
    },
    mainEntityOfPage: {
      "@type": "WebPage",
      "@id": `https://squaremind.in/insights/${post.slug}`,
    },
    keywords: [post.primaryKeyword, ...post.secondaryKeywords].join(", "),
    articleSection: post.category,
  };

  return (
    <>
      <ScrollProgress />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      {/* Breadcrumb */}
      <div className="mx-auto max-w-[1200px] px-6 lg:px-14 pt-5">
        <nav className="text-[14px] text-gray-400" aria-label="Breadcrumb">
          <Link href="/" className="hover:text-sage transition-colors">Home</Link>
          <span className="mx-2">/</span>
          <Link href="/insights" className="hover:text-sage transition-colors">Insights</Link>
          <span className="mx-2">/</span>
          <span className="text-gray-600">{post.category}</span>
        </nav>
      </div>

      {/* Hero */}
      <section className="py-[80px] max-lg:py-16">
        <div className="mx-auto max-w-[860px] px-6 lg:px-14">
          <FadeUp>
            <span className="text-[13px] font-semibold tracking-[0.08em] uppercase text-sage mb-4 block">
              {post.tag}
            </span>
            <h1 className="font-serif text-[clamp(28px,3.8vw,52px)] leading-[1.1] tracking-[-0.03em] mb-6">
              {post.title}
            </h1>
            <p className="text-[18px] text-gray-500 leading-[1.65] tracking-[-0.01em] mb-8">
              {post.description}
            </p>
            <div className="flex items-center gap-6 text-[13px] text-gray-400 pb-8 border-b border-gray-200">
              <span>By <strong className="text-ink">SquareMind Research</strong></span>
              <span>{new Date(post.publishedAt).toLocaleDateString("en-IN", { day: "numeric", month: "long", year: "numeric" })}</span>
              <span>{post.readTime} read</span>
              <span>{post.views} views</span>
            </div>
          </FadeUp>
        </div>
      </section>

      {/* Content */}
      <section className="pb-[80px] max-lg:pb-16">
        <div className="mx-auto max-w-[860px] px-6 lg:px-14">
          <FadeUp>
            {/* Mid-article newsletter CTA */}
            <div
              className="prose-squaremind"
              dangerouslySetInnerHTML={{ __html: post.content.split("</h2>").slice(0, 3).join("</h2>") + "</h2>" }}
            />

            <div className="bg-cream rounded-[20px] p-8 my-10 text-center">
              <p className="text-[13px] font-semibold text-sage uppercase tracking-[0.08em] mb-2">Free Resource</p>
              <h3 className="font-serif text-[24px] tracking-[-0.02em] mb-3">Get the 7-Point Due Diligence Checklist</h3>
              <p className="text-[15px] text-gray-500 mb-6 max-w-[480px] mx-auto">The exact framework SquareMind uses to evaluate every property before recommending it to a client.</p>
              <NewsletterForm />
            </div>

            <div
              className="prose-squaremind"
              dangerouslySetInnerHTML={{ __html: post.content.split("</h2>").slice(3).join("</h2>") }}
            />
          </FadeUp>

          {/* Consultation CTA */}
          <FadeUp delay={0.1}>
            <div className="mt-16 bg-ink text-white rounded-[24px] p-10 max-lg:p-8 text-center">
              <p className="text-[13px] font-semibold text-sage uppercase tracking-[0.08em] mb-3">Free Strategy Session</p>
              <h3 className="font-serif text-[32px] max-lg:text-[26px] tracking-[-0.03em] mb-4">
                Invest in real estate with your eyes open.
              </h3>
              <p className="text-[16px] text-gray-300 mb-8 max-w-[520px] mx-auto leading-[1.6]">
                Book a free 30-minute call with our team. We'll give you a data-backed view on any property or city — no commission, no agenda.
              </p>
              <Link
                href="/consultation"
                className="inline-block bg-sage text-white px-8 py-4 rounded-full text-[15px] font-semibold hover:bg-[#236050] transition-all duration-300"
              >
                Book Free Strategy Session →
              </Link>
              <p className="text-[12px] text-gray-500 mt-4">100% free. No spam. No broker referrals.</p>
            </div>
          </FadeUp>
        </div>
      </section>

      {/* Related Posts */}
      {related.length > 0 && (
        <section className="pb-[120px] max-lg:pb-20">
          <div className="mx-auto max-w-[1200px] px-6 lg:px-14">
            <FadeUp>
              <h2 className="font-serif text-[32px] tracking-[-0.03em] mb-8">Related Insights</h2>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {related.map((r, i) => (
                  <FadeUp key={r.slug} delay={i * 0.05}>
                    <Link href={`/insights/${r.slug}`}>
                      <div className="bg-cream rounded-[20px] p-8 hover:-translate-y-1 hover:shadow-[0_20px_60px_rgba(0,0,0,0.08)] transition-all duration-400 h-full cursor-pointer">
                        <div className="text-[12px] font-semibold text-sage tracking-[0.06em] uppercase mb-3">{r.tag}</div>
                        <div className="font-serif text-[19px] leading-[1.3] text-ink tracking-[-0.02em]">{r.title}</div>
                        <div className="text-[13px] text-gray-400 mt-4">{r.readTime} read</div>
                      </div>
                    </Link>
                  </FadeUp>
                ))}
              </div>
            </FadeUp>
          </div>
        </section>
      )}
    </>
  );
}
