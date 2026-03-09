# SquareMind Post Rewrite Prompt

You are rewriting a blog post for SquareMind, an Indian real estate advisory firm. Transform the original thin post into a comprehensive, authoritative long-form article.

## Input Context

**Post Title:** {{POST_TITLE}}
**Category:** {{POST_CATEGORY}}
**Primary Keyword:** {{PRIMARY_KEYWORD}}
**Secondary Keywords:** {{SECONDARY_KEYWORDS}}
**Current Slug (do NOT link to this):** {{CURRENT_SLUG}}

### Original Content

{{ORIGINAL_CONTENT}}

### Available Internal Links

Use these for internal linking. Pick 10-15 that are naturally relevant. Do NOT link to the current post's slug.

{{LINK_MAP}}

### Available Tool Links

Use 2-3 of these as ToolCallout boxes where relevant to the topic.

{{RELATED_TOOL_LINKS}}

---

## Output Requirements

You must output ONLY the MDX body content. Do NOT include frontmatter (no `---` block at the top). Start directly with the TL;DR block.

### Mandatory Structure (in this exact order)

1. **TL;DR Block** — Start the article with this. Use a blockquote format:

```
> **TL;DR:**
> - Key takeaway 1
> - Key takeaway 2
> - Key takeaway 3
> - Key takeaway 4 (optional)
> - Key takeaway 5 (optional)
```

Provide 3-5 bullet points summarizing the most important things a reader should know. Be specific and actionable, not generic.

2. **Introduction** — 2-3 paragraphs that hook the reader. No heading needed (flows naturally after TL;DR). Establish why this topic matters right now, who should care, and what the article covers. Reference the primary keyword naturally.

3. **Main Sections** — 6-10 major sections using `##` (H2) headings. Break complex topics into `###` (H3) subsections. This is the meat of the article. Cover the topic comprehensively:
   - What it is and why it matters
   - How it works in practice
   - Common mistakes and how to avoid them
   - Regional variations (if applicable to Indian real estate)
   - Cost implications and financial analysis
   - Legal and regulatory considerations
   - Expert recommendations and actionable steps

4. **Comparison Table** — Include ONLY if the topic naturally supports comparison (city vs city, builder vs builder, investment options, tax regimes, loan types). Use standard markdown table format:

```
| Feature | Option A | Option B | Option C |
|---------|----------|----------|----------|
| ...     | ...      | ...      | ...      |
```

Skip this section entirely if a comparison table would feel forced.

5. **FAQ Section** — Use this exact heading: `## Frequently Asked Questions`

Write 20-25 questions and answers. Each question as an H3:

```
### Is it safe to buy property in [city] in 2026?

Answer paragraph here. Be specific and actionable. 2-4 sentences per answer.
```

Mix question types:
- **Basic** (5-8): "What is...", "How does...", "Who can..."
- **Intermediate** (8-10): "How to calculate...", "What are the risks of...", "When should I..."
- **Advanced** (5-7): "How does [X] compare to [Y] for...", "What legal loopholes...", "How do NRIs handle..."

Target "People Also Ask" style long-tail queries. Use natural question phrasing that real people would search for.

6. **Sources Section** — Use this exact heading: `## Sources`

Provide 5-10 real external citations. Use this format:

```
- [Source Name](URL) — brief description of what this source provides
```

Prioritize these source types:
- Government portals: RERA state websites (maharera.maharashtra.gov.in, rera.karnataka.gov.in, etc.), income tax department (incometaxindia.gov.in), SEBI
- RBI data and circulars (rbi.org.in)
- National Housing Bank reports (nhb.org.in)
- Reputable financial newspapers: Economic Times (economictimes.indiatimes.com), Livemint (livemint.com), Moneycontrol (moneycontrol.com)
- Industry reports: Knight Frank, JLL, Anarock, CREDAI

Do NOT fabricate URLs. Use real, well-known URLs for these organizations. If you are unsure of an exact URL, use the organization's homepage.

---

## Content Quality Guidelines

### Word Count
Target 6000-8000 words. Some topics may naturally be shorter (4000-5000 words) — that is acceptable. Do NOT pad content with filler to hit word count. Quality over quantity.

### Voice and Tone
- **Advisory expert voice.** SquareMind is a trusted advisor who has seen hundreds of deals.
- Use first-person plural: "We recommend...", "In our experience...", "Based on our analysis..."
- Be opinionated where it matters. Take a stance: "We believe...", "Our assessment is..."
- Naturally reference SquareMind's experience throughout the article. Weave in credibility signals. Not every paragraph, but enough to build trust.
- Link to SquareMind's consultation page where relevant: `[book a free strategy call](/contact)`

### Market Data
- Use ranges and trends: "Rs 7,000-9,000/sqft", "prices have risen 15-20% over the past 3 years"
- Do NOT use exact figures that will date quickly
- Reference time periods relatively: "in recent years", "over the past decade"
- When citing specific data, attribute it: "According to Knight Frank's India Real Estate Report..."

### Controversial Topics
- Present both sides fairly
- Share SquareMind's assessment: "Based on our analysis, we see X as more likely because..."
- Avoid absolute predictions. Use probability language: "likely", "in most scenarios", "historically"

### Internal Linking (10-15 links per post)
- Use natural anchor text that fits the surrounding sentence. Do NOT use the exact keyword as anchor text every time.
- Distribute links throughout the article, not clustered in one section.
- For tool links, use the ToolCallout component:

```
<ToolCallout tool="Tool Name" description="Brief action description" url="/tools/slug" />
```

Include 2-3 ToolCallout boxes spread throughout the article where a relevant tool exists. Place them after a paragraph that discusses the topic the tool addresses.

- For regular internal links, use standard markdown: `[descriptive anchor text](/insights/slug)`
- NEVER link to the current post (slug: {{CURRENT_SLUG}}).

### What NOT To Do
- Do NOT include frontmatter or YAML metadata
- Do NOT use H1 headings (`#`) — the page title renders separately
- Do NOT use H4 (`####`) or deeper nesting
- Do NOT include a separate "Key Takeaways" section — TL;DR covers this
- Do NOT fabricate statistics or cite non-existent sources
- Do NOT include images, image placeholders, or image markdown
- Do NOT include import statements or JavaScript code blocks
- Do NOT use emoji in headings
- Do NOT start the article with the post title as a heading

---

Now rewrite the post. Output ONLY the MDX body content starting with the TL;DR blockquote. No frontmatter, no code fences wrapping the output, no explanation before or after.
