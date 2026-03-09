const fs = require('fs')
const path = require('path')
const matter = require('gray-matter')

const postsDir = path.join(__dirname, '..', 'content', 'posts')
const requiredFields = ['title', 'tag', 'category', 'description', 'readTime', 'publishedAt', 'primaryKeyword']
const expectedSlugs = [
  'builders-delivery-timelines-india',
  'real-estate-vs-mutual-funds-gold-india',
  'nri-buying-property-india-guide-2026',
  'carpet-area-super-built-up-area-scam',
  'bangalore-real-estate-investment-2026',
  'capital-gains-tax-property-india',
  'godrej-properties-review-analysis',
  'pre-launch-vs-ready-to-move-property-india',
  'india-real-estate-market-2026',
  'is-real-estate-good-investment-india-2026',
]

let hasErrors = false

// Check all expected slugs exist
const files = fs.readdirSync(postsDir).filter((f) => f.endsWith('.mdx'))
const slugs = files.map((f) => f.replace(/\.mdx$/, ''))

for (const expected of expectedSlugs) {
  if (!slugs.includes(expected)) {
    console.error(`FAIL: Missing expected slug: ${expected}`)
    hasErrors = true
  }
}

console.log(`Found ${files.length} MDX files`)

// Validate each file
for (const file of files) {
  const filePath = path.join(postsDir, file)
  const content = fs.readFileSync(filePath, 'utf8')
  const { data } = matter(content)
  const slug = file.replace(/\.mdx$/, '')

  for (const field of requiredFields) {
    if (!data[field]) {
      console.error(`FAIL: ${slug} missing required field: ${field}`)
      hasErrors = true
    }
  }

  if (!data.secondaryKeywords || !Array.isArray(data.secondaryKeywords)) {
    console.error(`FAIL: ${slug} missing or invalid secondaryKeywords array`)
    hasErrors = true
  }

  console.log(`  PASS: ${slug} (${requiredFields.length} required fields valid)`)
}

if (hasErrors) {
  console.error('\nValidation FAILED')
  process.exit(1)
} else {
  console.log(`\nValidation PASSED: ${files.length} files, all ${requiredFields.length} required fields present`)
}
