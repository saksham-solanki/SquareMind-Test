#!/usr/bin/env node

/**
 * SquareMind Content Rewrite CLI
 *
 * Rewrites thin MDX posts into comprehensive long-form articles via Claude API.
 *
 * Usage:
 *   node scripts/rewrite-batch.js --count 5
 *   node scripts/rewrite-batch.js --count 10 --category "Investment Strategy"
 *   node scripts/rewrite-batch.js --count 5 --dry-run
 *   node scripts/rewrite-batch.js --status
 */

const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');
const matter = require('gray-matter');

// ---------------------------------------------------------------------------
// Config
// ---------------------------------------------------------------------------

const POSTS_DIR = path.join(__dirname, '..', 'content', 'posts');
const LINK_MAP_PATH = path.join(__dirname, '..', 'content', 'link-map.json');
const PROMPT_PATH = path.join(__dirname, 'rewrite-prompt.md');
const ENV_PATH = path.join(__dirname, '..', '.env.local');

const REWRITTEN_THRESHOLD = 3000; // words — posts above this are considered rewritten
const WORDS_PER_MINUTE = 200;
const API_DELAY_MS = 2000;

const CATEGORY_PRIORITY = [
  'Investment Strategy',
  'Tax & Legal',
  'NRI Corner',
  'City Guides',
  'First-Time Buyers',
  'Builder Analysis',
  'Market Data',
  'Due Diligence',
  'Dark Truths',
];

// API provider config — auto-detected from available keys
const PROVIDERS = {
  anthropic: {
    url: 'https://api.anthropic.com/v1/messages',
    model: 'claude-sonnet-4-20250514',
    maxTokens: 16000,
  },
  openai: {
    url: 'https://api.openai.com/v1/chat/completions',
    model: 'gpt-4o',
    maxTokens: 16000,
  },
};

// ---------------------------------------------------------------------------
// Argument parsing
// ---------------------------------------------------------------------------

function parseArgs() {
  const args = process.argv.slice(2);
  const parsed = { count: 5, category: null, dryRun: false, status: false };

  for (let i = 0; i < args.length; i++) {
    switch (args[i]) {
      case '--count':
        parsed.count = parseInt(args[++i], 10);
        if (isNaN(parsed.count) || parsed.count < 1) {
          console.error('Error: --count must be a positive integer');
          process.exit(1);
        }
        break;
      case '--category':
        parsed.category = args[++i];
        break;
      case '--dry-run':
        parsed.dryRun = true;
        break;
      case '--status':
        parsed.status = true;
        break;
      default:
        console.error(`Unknown argument: ${args[i]}`);
        process.exit(1);
    }
  }

  return parsed;
}

// ---------------------------------------------------------------------------
// Helpers
// ---------------------------------------------------------------------------

function countWords(text) {
  return text.split(/\s+/).filter(Boolean).length;
}

function loadApiConfig() {
  let envContent = '';
  try {
    envContent = fs.readFileSync(ENV_PATH, 'utf8');
  } catch {
    // .env.local doesn't exist
  }

  function getKey(envName) {
    if (process.env[envName]) return process.env[envName];
    const match = envContent.match(new RegExp(`^${envName}=(.+)$`, 'm'));
    if (match) return match[1].trim().replace(/^["']|["']$/g, '');
    return null;
  }

  // Prefer Anthropic, fall back to OpenAI
  const anthropicKey = getKey('ANTHROPIC_API_KEY');
  if (anthropicKey) return { provider: 'anthropic', apiKey: anthropicKey, ...PROVIDERS.anthropic };

  const openaiKey = getKey('OPENAI_API_KEY');
  if (openaiKey) return { provider: 'openai', apiKey: openaiKey, ...PROVIDERS.openai };

  return null;
}

function loadLinkMap() {
  try {
    return JSON.parse(fs.readFileSync(LINK_MAP_PATH, 'utf8'));
  } catch (err) {
    console.error(`Warning: Could not load link map: ${err.message}`);
    return { posts: {}, tools: {}, pages: {} };
  }
}

function loadPromptTemplate() {
  return fs.readFileSync(PROMPT_PATH, 'utf8');
}

function loadAllPosts() {
  const files = fs.readdirSync(POSTS_DIR).filter(f => f.endsWith('.mdx'));
  const posts = [];

  for (const file of files) {
    const filePath = path.join(POSTS_DIR, file);
    try {
      const raw = fs.readFileSync(filePath, 'utf8');
      const { data: frontmatter, content } = matter(raw);
      const slug = file.replace(/\.mdx$/, '');
      const wordCount = countWords(content);

      posts.push({
        slug,
        file,
        filePath,
        frontmatter,
        content,
        wordCount,
        category: frontmatter.category || 'Uncategorized',
        isRewritten: wordCount > REWRITTEN_THRESHOLD,
      });
    } catch (err) {
      console.warn(`Warning: Could not parse ${file}: ${err.message}`);
    }
  }

  return posts;
}

// ---------------------------------------------------------------------------
// --status mode
// ---------------------------------------------------------------------------

function showStatus(posts) {
  const categories = {};

  for (const post of posts) {
    if (!categories[post.category]) {
      categories[post.category] = { total: 0, rewritten: 0, totalWords: 0 };
    }
    categories[post.category].total++;
    categories[post.category].totalWords += post.wordCount;
    if (post.isRewritten) categories[post.category].rewritten++;
  }

  console.log('\n  SquareMind Content Rewrite Status');
  console.log('  ' + '='.repeat(76));
  console.log(
    '  ' +
      'Category'.padEnd(25) +
      'Total'.padStart(8) +
      'Rewritten'.padStart(12) +
      'Remaining'.padStart(12) +
      'Avg Words'.padStart(12)
  );
  console.log('  ' + '-'.repeat(76));

  // Sort by priority order, then alphabetical for unlisted categories
  const sortedCategories = Object.keys(categories).sort((a, b) => {
    const ai = CATEGORY_PRIORITY.indexOf(a);
    const bi = CATEGORY_PRIORITY.indexOf(b);
    if (ai === -1 && bi === -1) return a.localeCompare(b);
    if (ai === -1) return 1;
    if (bi === -1) return -1;
    return ai - bi;
  });

  let totalAll = 0;
  let rewrittenAll = 0;

  for (const cat of sortedCategories) {
    const c = categories[cat];
    const remaining = c.total - c.rewritten;
    const avgWords = Math.round(c.totalWords / c.total);
    totalAll += c.total;
    rewrittenAll += c.rewritten;

    console.log(
      '  ' +
        cat.padEnd(25) +
        String(c.total).padStart(8) +
        String(c.rewritten).padStart(12) +
        String(remaining).padStart(12) +
        String(avgWords).padStart(12)
    );
  }

  console.log('  ' + '-'.repeat(76));
  const remainingAll = totalAll - rewrittenAll;
  console.log(
    '  ' +
      'TOTAL'.padEnd(25) +
      String(totalAll).padStart(8) +
      String(rewrittenAll).padStart(12) +
      String(remainingAll).padStart(12)
  );

  // Progress bar
  const pct = totalAll > 0 ? Math.round((rewrittenAll / totalAll) * 100) : 0;
  const filled = Math.round(pct / 5);
  const bar = '#'.repeat(filled) + '-'.repeat(20 - filled);
  console.log(`\n  Progress: [${bar}] ${pct}% (${rewrittenAll}/${totalAll} posts)\n`);
}

// ---------------------------------------------------------------------------
// Post selection
// ---------------------------------------------------------------------------

function selectPosts(posts, count, category) {
  let candidates = posts.filter(p => !p.isRewritten);

  if (category) {
    candidates = candidates.filter(p => p.category === category);
    if (candidates.length === 0) {
      console.log(`No unrewritten posts found in category "${category}".`);
      return [];
    }
  } else {
    // Sort by category priority order
    candidates.sort((a, b) => {
      const ai = CATEGORY_PRIORITY.indexOf(a.category);
      const bi = CATEGORY_PRIORITY.indexOf(b.category);
      if (ai === -1 && bi === -1) return a.slug.localeCompare(b.slug);
      if (ai === -1) return 1;
      if (bi === -1) return -1;
      if (ai !== bi) return ai - bi;
      return a.slug.localeCompare(b.slug);
    });
  }

  return candidates.slice(0, count);
}

// ---------------------------------------------------------------------------
// Prompt building
// ---------------------------------------------------------------------------

function buildFilteredLinkMap(linkMap, post) {
  const { category, slug } = post;
  const selfUrl = `/insights/${slug}`;
  const entries = [];

  // Same-category post links (most relevant)
  for (const [keyword, info] of Object.entries(linkMap.posts || {})) {
    if (info.url === selfUrl) continue; // exclude self
    if (info.category === category) {
      entries.push({ keyword, ...info });
    }
  }

  // Add some cross-category posts for diversity (up to 15)
  let crossCount = 0;
  for (const [keyword, info] of Object.entries(linkMap.posts || {})) {
    if (info.url === selfUrl) continue;
    if (info.category === category) continue;
    if (crossCount >= 15) break;
    entries.push({ keyword, ...info });
    crossCount++;
  }

  // All tool links
  for (const [keyword, info] of Object.entries(linkMap.tools || {})) {
    entries.push({ keyword, ...info, type: 'tool' });
  }

  // All page links
  for (const [keyword, info] of Object.entries(linkMap.pages || {})) {
    entries.push({ keyword, ...info, type: 'page' });
  }

  // Limit to 50 entries
  return entries.slice(0, 50);
}

function formatLinkMapForPrompt(entries) {
  const lines = entries.map(e => {
    const type = e.type || 'post';
    return `- [${type}] "${e.keyword}" -> ${e.url} (${e.title})`;
  });
  return lines.join('\n');
}

function formatToolLinks(linkMap) {
  const tools = linkMap.tools || {};
  const seen = new Set();
  const lines = [];

  for (const [keyword, info] of Object.entries(tools)) {
    if (seen.has(info.url)) continue;
    seen.add(info.url);
    lines.push(`- Tool: "${info.title}" at ${info.url}`);
  }

  return lines.join('\n');
}

function buildPrompt(template, post, linkMap) {
  const filteredLinks = buildFilteredLinkMap(linkMap, post);
  const fm = post.frontmatter;

  const secondaryKeywords = Array.isArray(fm.secondaryKeywords)
    ? fm.secondaryKeywords.join(', ')
    : fm.secondaryKeywords || '';

  return template
    .replace('{{ORIGINAL_CONTENT}}', post.content)
    .replace('{{POST_TITLE}}', fm.title || '')
    .replace('{{POST_CATEGORY}}', fm.category || '')
    .replace('{{PRIMARY_KEYWORD}}', fm.primaryKeyword || '')
    .replace('{{SECONDARY_KEYWORDS}}', secondaryKeywords)
    .replace('{{CURRENT_SLUG}}', post.slug)
    .replace('{{LINK_MAP}}', formatLinkMapForPrompt(filteredLinks))
    .replace('{{RELATED_TOOL_LINKS}}', formatToolLinks(linkMap));
}

// ---------------------------------------------------------------------------
// API call
// ---------------------------------------------------------------------------

async function callLLMAPI(config, prompt) {
  const systemMsg =
    'You are a senior real estate content writer for SquareMind, an Indian real estate advisory firm. Follow the rewrite instructions exactly.';

  let body, headers;

  if (config.provider === 'anthropic') {
    body = {
      model: config.model,
      max_tokens: config.maxTokens,
      system: systemMsg,
      messages: [{ role: 'user', content: prompt }],
    };
    headers = {
      'x-api-key': config.apiKey,
      'anthropic-version': '2023-06-01',
      'content-type': 'application/json',
    };
  } else {
    // OpenAI-compatible
    body = {
      model: config.model,
      max_tokens: config.maxTokens,
      messages: [
        { role: 'system', content: systemMsg },
        { role: 'user', content: prompt },
      ],
    };
    headers = {
      Authorization: `Bearer ${config.apiKey}`,
      'content-type': 'application/json',
    };
  }

  const response = await fetch(config.url, {
    method: 'POST',
    headers,
    body: JSON.stringify(body),
  });

  if (!response.ok) {
    const errorText = await response.text();
    throw new Error(`API error ${response.status}: ${errorText}`);
  }

  const data = await response.json();

  if (config.provider === 'anthropic') {
    if (!data.content || !data.content[0] || !data.content[0].text) {
      throw new Error('Unexpected Anthropic API response structure');
    }
    return data.content[0].text;
  } else {
    if (!data.choices || !data.choices[0] || !data.choices[0].message) {
      throw new Error('Unexpected OpenAI API response structure');
    }
    return data.choices[0].message.content;
  }
}

// ---------------------------------------------------------------------------
// Rewrite a single post
// ---------------------------------------------------------------------------

async function rewritePost(post, apiConfig, promptTemplate, linkMap) {
  const prompt = buildPrompt(promptTemplate, post, linkMap);
  const newContent = await callLLMAPI(apiConfig, prompt);
  const newWordCount = countWords(newContent);

  // Update readTime based on new word count
  const readMinutes = Math.max(1, Math.round(newWordCount / WORDS_PER_MINUTE));
  const updatedFrontmatter = { ...post.frontmatter, readTime: `${readMinutes} min` };

  // Reconstruct the MDX file
  const newFile = matter.stringify(newContent, updatedFrontmatter);
  fs.writeFileSync(post.filePath, newFile);

  return { oldWords: post.wordCount, newWords: newWordCount };
}

// ---------------------------------------------------------------------------
// Sleep helper
// ---------------------------------------------------------------------------

function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

// ---------------------------------------------------------------------------
// Main
// ---------------------------------------------------------------------------

async function main() {
  const args = parseArgs();
  const posts = loadAllPosts();

  // --status mode
  if (args.status) {
    showStatus(posts);
    return;
  }

  // Select posts
  const selected = selectPosts(posts, args.count, args.category);

  if (selected.length === 0) {
    console.log('No posts to rewrite.');
    return;
  }

  // --dry-run mode
  if (args.dryRun) {
    console.log(`\n  Dry Run: Would rewrite ${selected.length} posts\n`);
    console.log('  ' + 'Slug'.padEnd(55) + 'Category'.padEnd(25) + 'Words');
    console.log('  ' + '-'.repeat(90));
    for (const post of selected) {
      console.log(
        '  ' +
          post.slug.padEnd(55) +
          post.category.padEnd(25) +
          String(post.wordCount)
      );
    }
    console.log();
    return;
  }

  // Load API config
  const apiConfig = loadApiConfig();
  if (!apiConfig) {
    console.error(
      'Error: No API key found.\n' +
        'Set ANTHROPIC_API_KEY or OPENAI_API_KEY in .env.local:\n' +
        '  echo "OPENAI_API_KEY=sk-proj-..." >> .env.local\n' +
        '  echo "ANTHROPIC_API_KEY=sk-ant-..." >> .env.local'
    );
    process.exit(1);
  }

  // Load dependencies for rewriting
  const linkMap = loadLinkMap();
  const promptTemplate = loadPromptTemplate();

  console.log(`\n  Using ${apiConfig.provider} (${apiConfig.model})`);
  console.log(`  Rewriting ${selected.length} posts...\n`);

  const results = { success: 0, failed: 0, failures: [], totalNewWords: 0 };

  for (let i = 0; i < selected.length; i++) {
    const post = selected[i];
    const progress = `[${i + 1}/${selected.length}]`;

    try {
      console.log(`${progress} Rewriting: ${post.slug} (${post.category})...`);
      const { oldWords, newWords } = await rewritePost(
        post,
        apiConfig,
        promptTemplate,
        linkMap
      );
      console.log(`${progress} Rewrote: ${post.slug} (${oldWords} -> ${newWords} words)`);
      results.success++;
      results.totalNewWords += newWords;

      // Rate limit buffer between API calls
      if (i < selected.length - 1) {
        await sleep(API_DELAY_MS);
      }
    } catch (err) {
      console.error(`${progress} FAILED: ${post.slug} — ${err.message}`);
      results.failed++;
      results.failures.push({ slug: post.slug, error: err.message });
    }
  }

  // Summary
  console.log('\n  ' + '='.repeat(60));
  console.log(`  Batch Complete`);
  console.log('  ' + '='.repeat(60));
  console.log(`  Rewritten: ${results.success} posts`);
  if (results.success > 0) {
    console.log(
      `  Average word count: ${Math.round(results.totalNewWords / results.success)} words`
    );
  }
  if (results.failed > 0) {
    console.log(`  Failed: ${results.failed} posts`);
    for (const f of results.failures) {
      console.log(`    - ${f.slug}: ${f.error}`);
    }
  }

  // Git commit if any posts were rewritten
  if (results.success > 0) {
    try {
      const categoryLabel = args.category || 'mixed';
      execSync('git add content/posts/', { stdio: 'pipe' });
      execSync(
        `git commit -m "content: rewrite batch — ${results.success} ${categoryLabel} posts"`,
        { stdio: 'pipe' }
      );
      console.log(
        `\n  Git commit created: "content: rewrite batch — ${results.success} ${categoryLabel} posts"`
      );
    } catch (err) {
      console.warn(`  Warning: Git commit failed — ${err.message}`);
    }
  }

  // Remaining count
  const allPosts = loadAllPosts();
  const remaining = allPosts.filter(p => !p.isRewritten).length;
  console.log(`\n  Remaining unrewritten posts: ${remaining}\n`);
}

main().catch(err => {
  console.error('Fatal error:', err.message);
  process.exit(1);
});
