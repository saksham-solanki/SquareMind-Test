#!/usr/bin/env node

/**
 * Generate keyword-to-URL link map from all MDX posts and tool/page routes.
 * Output: content/link-map.json
 *
 * Usage: node scripts/generate-link-map.js
 */

const fs = require('fs')
const path = require('path')
const matter = require('gray-matter')

const POSTS_DIR = path.join(__dirname, '..', 'content', 'posts')
const OUTPUT_PATH = path.join(__dirname, '..', 'content', 'link-map.json')

// Static tool pages
const TOOLS = {
  'EMI calculator': { url: '/tools/emi-calculator', title: 'EMI Calculator' },
  'emi calculator': { url: '/tools/emi-calculator', title: 'EMI Calculator' },
  'home loan EMI': { url: '/tools/emi-calculator', title: 'EMI Calculator' },
  'RERA verifier': { url: '/tools/rera-verifier', title: 'RERA Project Verifier' },
  'rera verification': { url: '/tools/rera-verifier', title: 'RERA Project Verifier' },
  'verify RERA': { url: '/tools/rera-verifier', title: 'RERA Project Verifier' },
  'NRI tax calculator': { url: '/tools/nri-tax-calculator', title: 'NRI Tax Calculator' },
  'nri tax calculator': { url: '/tools/nri-tax-calculator', title: 'NRI Tax Calculator' },
  'buy vs rent calculator': { url: '/tools/buy-vs-rent', title: 'Buy vs Rent Calculator' },
  'buy vs rent': { url: '/tools/buy-vs-rent', title: 'Buy vs Rent Calculator' },
  'rent or buy': { url: '/tools/buy-vs-rent', title: 'Buy vs Rent Calculator' },
  'rental yield calculator': { url: '/tools/rental-yield', title: 'Rental Yield Calculator' },
  'rental yield': { url: '/tools/rental-yield', title: 'Rental Yield Calculator' },
  'total cost calculator': { url: '/tools/total-cost', title: 'Total Cost Calculator' },
  'total cost of ownership': { url: '/tools/total-cost', title: 'Total Cost Calculator' },
  'stamp duty calculator': { url: '/tools/stamp-duty-calculator', title: 'Stamp Duty Calculator' },
  'stamp duty': { url: '/tools/stamp-duty-calculator', title: 'Stamp Duty Calculator' },
  'investment scorecard': { url: '/tools/investment-scorecard', title: 'Investment Scorecard' },
  'property scorecard': { url: '/tools/investment-scorecard', title: 'Investment Scorecard' },
}

// Static page links
const PAGES = {
  'consultation': { url: '/consultation', title: 'Book a Free Strategy Session' },
  'free strategy call': { url: '/consultation', title: 'Book a Free Strategy Session' },
  'free strategy session': { url: '/consultation', title: 'Book a Free Strategy Session' },
  'book a call': { url: '/consultation', title: 'Book a Free Strategy Session' },
  'speak to an advisor': { url: '/consultation', title: 'Book a Free Strategy Session' },
}

function generatePostsMap() {
  const files = fs.readdirSync(POSTS_DIR).filter((f) => f.endsWith('.mdx'))
  const postsMap = {}

  for (const file of files) {
    const slug = file.replace(/\.mdx$/, '')
    const content = fs.readFileSync(path.join(POSTS_DIR, file), 'utf8')
    const { data } = matter(content)

    const entry = {
      url: `/insights/${slug}`,
      title: data.title || slug,
      category: data.category || '',
    }

    const primaryKeyword = data.primaryKeyword
    if (primaryKeyword) {
      // Dedup: if keyword already exists, keep the one with shorter slug (more focused)
      if (postsMap[primaryKeyword]) {
        if (slug.length < postsMap[primaryKeyword].url.replace('/insights/', '').length) {
          postsMap[primaryKeyword] = entry
        }
      } else {
        postsMap[primaryKeyword] = entry
      }
    }

    const secondaryKeywords = data.secondaryKeywords || []
    for (const kw of secondaryKeywords) {
      if (!kw) continue
      if (postsMap[kw]) {
        // Keep existing if slug is shorter (more focused)
        if (slug.length < postsMap[kw].url.replace('/insights/', '').length) {
          postsMap[kw] = entry
        }
      } else {
        postsMap[kw] = entry
      }
    }
  }

  return postsMap
}

function main() {
  console.log('Scanning posts directory:', POSTS_DIR)
  const posts = generatePostsMap()
  const postKeywordCount = Object.keys(posts).length

  // Deduplicate tools to unique URL entries for counting
  const uniqueToolUrls = new Set(Object.values(TOOLS).map((t) => t.url))

  const linkMap = {
    posts,
    tools: TOOLS,
    pages: PAGES,
  }

  fs.writeFileSync(OUTPUT_PATH, JSON.stringify(linkMap, null, 2), 'utf8')

  console.log(`Link map generated: ${OUTPUT_PATH}`)
  console.log(`  Posts keywords: ${postKeywordCount}`)
  console.log(`  Tool entries: ${Object.keys(TOOLS).length} (${uniqueToolUrls.size} unique tools)`)
  console.log(`  Page entries: ${Object.keys(PAGES).length}`)
}

main()
