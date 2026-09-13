import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft } from "lucide-react";
import { MarkdownContent } from "@/components/MarkdownContent";
import { formatPostDate, getAllBlogPosts, getBlogPost } from "@/lib/blog";

type BlogPostPageProps = {
  params: Promise<{
    slug: string;
  }>;
};

export async function generateStaticParams() {
  return getAllBlogPosts().map((post) => ({
    slug: post.slug
  }));
}

export async function generateMetadata({
  params
}: BlogPostPageProps): Promise<Metadata> {
  const { slug } = await params;
  const post = getBlogPost(slug);

  if (!post) {
    return {
      title: "Blog Post | Vrund Kasodariya"
    };
  }

  return {
    title: `${post.title} | Vrund Kasodariya`,
    description: post.description,
    alternates: {
      canonical: `/blog/${post.slug}`
    },
    openGraph: {
      type: "article",
      title: post.title,
      description: post.description,
      url: `/blog/${post.slug}`,
      publishedTime: post.date || undefined,
      tags: post.tags
    }
  };
}

export default async function BlogPostPage({ params }: BlogPostPageProps) {
  const { slug } = await params;
  const post = getBlogPost(slug);

  if (!post || !post.published) {
    notFound();
  }

  return (
    <main className="relative min-h-screen overflow-hidden px-5 py-10 sm:px-6 lg:px-8">
      <div className="background-grid pointer-events-none absolute inset-0" />

      <article className="relative mx-auto max-w-3xl">
        <Link
          href="/blog"
          className="inline-flex items-center gap-2 rounded border border-line bg-[#070907] px-3 py-2 text-xs font-semibold text-slate-300 transition hover:border-electric/45 hover:text-electric"
        >
          <ArrowLeft size={15} />
          Back to blog
        </Link>

        <header className="border-b border-line py-12">
          <div className="mb-4 flex flex-wrap gap-2">
            {post.tags.map((tag) => (
              <span
                key={tag}
                className="rounded border border-line bg-black/35 px-2 py-1 font-mono text-[0.68rem] text-slate-300"
              >
                {tag}
              </span>
            ))}
          </div>
          <h1 className="text-balance text-3xl font-semibold tracking-tight text-white sm:text-4xl">
            {post.title}
          </h1>
          <p className="mt-4 text-sm leading-7 text-slate-400 sm:text-base">
            {post.description}
          </p>
          <div className="mt-5 font-mono text-[0.68rem] uppercase tracking-[0.12em] text-slate-400">
            {formatPostDate(post.date)}{" "}
            / {post.readingTime}
          </div>
        </header>

        <div className="py-8">
          <MarkdownContent content={post.content} />
        </div>
      </article>
    </main>
  );
}
