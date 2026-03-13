import type { MetadataRoute } from "next";
import { getAllPosts } from "@/lib/mdx";

export const dynamic = "force-static";

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = "https://squaremind.in";
  const now = new Date();

  const blogEntries: MetadataRoute.Sitemap = getAllPosts().map((post) => ({
    url: `${baseUrl}/insights/${post.slug}`,
    lastModified: new Date(post.meta.publishedAt),
    priority: 0.7,
  }));

  return [
    // Homepage
    { url: baseUrl, lastModified: now, priority: 1.0 },

    // High-priority pages
    { url: `${baseUrl}/consultation`, lastModified: now, priority: 0.9 },
    { url: `${baseUrl}/invest/tri-city`, lastModified: now, priority: 0.9 },

    // Content pages
    { url: `${baseUrl}/about`, lastModified: now, priority: 0.8 },
    { url: `${baseUrl}/research`, lastModified: now, priority: 0.8 },
    { url: `${baseUrl}/insights`, lastModified: now, priority: 0.8 },
    { url: `${baseUrl}/tools`, lastModified: now, priority: 0.8 },
    { url: `${baseUrl}/frameworks`, lastModified: now, priority: 0.8 },
    { url: `${baseUrl}/properties`, lastModified: now, priority: 0.8 },
    { url: `${baseUrl}/case-studies`, lastModified: now, priority: 0.8 },
    { url: `${baseUrl}/faq`, lastModified: now, priority: 0.8 },

    // Blog posts
    ...blogEntries,

    // Legal pages
    { url: `${baseUrl}/privacy`, lastModified: now, priority: 0.3 },
    { url: `${baseUrl}/terms`, lastModified: now, priority: 0.3 },
  ];
}
