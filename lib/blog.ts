import fs from "node:fs";
import path from "node:path";

export type BlogPostMeta = {
  slug: string;
  title: string;
  description: string;
  date: string;
  tags: string[];
  published: boolean;
  readingTime: string;
};

export type BlogPost = BlogPostMeta & {
  content: string;
};

const blogDirectory = path.join(process.cwd(), "content", "blog");

function parseFrontmatter(fileContent: string) {
  const match = fileContent.match(/^---\r?\n([\s\S]*?)\r?\n---\r?\n([\s\S]*)$/);

  if (!match) {
    return {
      metadata: {},
      content: fileContent
    };
  }

  const metadata = match[1].split(/\r?\n/).reduce<Record<string, string>>(
    (acc, line) => {
      const separatorIndex = line.indexOf(":");

      if (separatorIndex === -1) {
        return acc;
      }

      const key = line.slice(0, separatorIndex).trim();
      const value = line.slice(separatorIndex + 1).trim();
      acc[key] = value.replace(/^["']|["']$/g, "");
      return acc;
    },
    {}
  );

  return {
    metadata,
    content: match[2].trim()
  };
}

function parseTags(value?: string) {
  if (!value) {
    return [];
  }

  return value
    .replace(/^\[/, "")
    .replace(/\]$/, "")
    .split(",")
    .map((tag) => tag.trim().replace(/^["']|["']$/g, ""))
    .filter(Boolean);
}

function getReadingTime(content: string) {
  const words = content.trim().split(/\s+/).filter(Boolean).length;
  const minutes = Math.max(1, Math.ceil(words / 220));
  return `${minutes} min read`;
}

export function getAllBlogPosts() {
  if (!fs.existsSync(blogDirectory)) {
    return [];
  }

  return fs
    .readdirSync(blogDirectory)
    .filter((fileName) => fileName.endsWith(".md"))
    .map((fileName) => {
      const slug = fileName.replace(/\.md$/, "");
      return getBlogPost(slug);
    })
    .filter((post): post is BlogPost => Boolean(post && post.published))
    .sort(
      (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
    );
}

export function getBlogPost(slug: string) {
  const filePath = path.join(blogDirectory, `${slug}.md`);

  if (!fs.existsSync(filePath)) {
    return null;
  }

  const fileContent = fs.readFileSync(filePath, "utf8");
  const { metadata, content } = parseFrontmatter(fileContent);

  return {
    slug,
    title: metadata.title ?? slug,
    description: metadata.description ?? "",
    date: metadata.date ?? "",
    tags: parseTags(metadata.tags),
    published: metadata.published !== "false",
    readingTime: getReadingTime(content),
    content
  };
}
