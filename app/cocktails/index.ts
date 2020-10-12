import fs from "fs"
import { join } from "path"
import matter from "gray-matter"
import remark from "remark"
import html from "remark-html"

const postsDirectory = join(process.cwd(), "content")

export function getPostSlugs() {
  return fs.readdirSync(postsDirectory)
}

export function getPostBySlug<T extends string>(slug, fields: T[] = []) {
  const realSlug = slug.replace(/\.md$/, "")
  const fullPath = join(postsDirectory, `${realSlug}.md`)
  const fileContents = fs.readFileSync(fullPath, "utf8")
  const { data, content } = matter(fileContents)

  const item = {} as Record<T, string>

  // Ensure only the minimal needed data is exposed
  fields.forEach((field) => {
    if (field === "slug") {
      item[field] = realSlug
    }
    if (field === "content") {
      item[field] = content
    }

    if (data[field]) {
      item[field] = data[field]
    }
  })

  return item
}

export function getAllPosts(fields: string[] = []) {
  const slugs = getPostSlugs()
  const posts = slugs.map((slug) => getPostBySlug(slug, fields))
  return posts
}

export default async function markdownToHtml(markdown) {
  const result = await remark().use(html).process(markdown)
  return result.toString()
}
