import fs from 'fs'
import path from 'path'
import matter from 'gray-matter'

export interface PostMeta {
  title: string
  slug: string
  description: string
  category: string
  tag: string
  tags: string[]
  publishedAt: string
  readTime: string
  views: string
  primaryKeyword: string
  secondaryKeywords: string[]
}

export interface Post {
  meta: PostMeta
  slug: string
  content: string
}

const postsDirectory = path.join(process.cwd(), 'content', 'posts')

export function getAllPosts(): Post[] {
  const fileNames = fs.readdirSync(postsDirectory).filter((f) => f.endsWith('.mdx'))

  const posts: Post[] = fileNames.map((fileName) => {
    const slug = fileName.replace(/\.mdx$/, '')
    const fullPath = path.join(postsDirectory, fileName)
    const fileContent = fs.readFileSync(fullPath, 'utf8')
    const { data, content } = matter(fileContent)

    return {
      meta: {
        title: data.title,
        slug,
        description: data.description,
        category: data.category,
        tag: data.tag,
        tags: data.tags || [],
        publishedAt: data.publishedAt,
        readTime: data.readTime,
        views: data.views,
        primaryKeyword: data.primaryKeyword,
        secondaryKeywords: data.secondaryKeywords || [],
      },
      slug,
      content,
    }
  })

  return posts.sort(
    (a, b) => new Date(b.meta.publishedAt).getTime() - new Date(a.meta.publishedAt).getTime()
  )
}

export function getPostBySlug(slug: string): Post | undefined {
  const fullPath = path.join(postsDirectory, `${slug}.mdx`)

  if (!fs.existsSync(fullPath)) {
    return undefined
  }

  const fileContent = fs.readFileSync(fullPath, 'utf8')
  const { data, content } = matter(fileContent)

  return {
    meta: {
      title: data.title,
      slug,
      description: data.description,
      category: data.category,
      tag: data.tag,
      tags: data.tags || [],
      publishedAt: data.publishedAt,
      readTime: data.readTime,
      views: data.views,
      primaryKeyword: data.primaryKeyword,
      secondaryKeywords: data.secondaryKeywords || [],
    },
    slug,
    content,
  }
}

export function getRelatedPosts(currentSlug: string, category: string, count = 3): Post[] {
  const allPosts = getAllPosts()
  return allPosts
    .filter((p) => p.slug !== currentSlug && p.meta.category === category)
    .slice(0, count)
}
