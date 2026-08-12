import type { Metadata } from "next";
import Link from "next/link";
import { ArrowLeft, ArrowUpRight, BookOpen } from "lucide-react";
import { getAllBlogPosts } from "@/lib/blog";

export const metadata: Metadata = {
  title: "Blog | Vrund Kasodariya",
  description:
    "Backend systems and technology writing by Vrund Kasodariya."
};

export default function BlogPage() {
  const posts = getAllBlogPosts();

  return (
    <main className="relative min-h-screen overflow-hidden px-5 py-10 sm:px-6 lg:px-8">
      <div className="background-grid pointer-events-none absolute inset-0" />
      <div className="flow-field pointer-events-none absolute inset-x-[-12%] top-0 h-[34rem]" />

      <div className="relative mx-auto max-w-5xl">
        <Link
          href="/"
          className="inline-flex items-center gap-2 rounded border border-line bg-[#070907] px-3 py-2 text-xs font-semibold text-slate-300 transition hover:border-electric/45 hover:text-electric"
        >
          <ArrowLeft size={15} />
          Back to portfolio
        </Link>

        <section className="py-16">
          <div className="mb-10 max-w-3xl">
            <p className="mb-3 text-[0.68rem] font-semibold uppercase tracking-[0.24em] text-electric/90">
              Blog
            </p>
            <h1 className="text-balance text-3xl font-semibold tracking-tight text-white sm:text-4xl">
              Backend systems, notes, and tech essays.
            </h1>
            <p className="mt-4 text-sm leading-7 text-slate-400 sm:text-base">
              A simple place for writing about backend fundamentals, APIs,
              authentication, databases, distributed systems, and the tech ideas
              I am working through.
            </p>
          </div>

          <div className="space-y-4">
            {posts.map((post) => (
              <Link
                key={post.slug}
                href={`/blog/${post.slug}`}
                className="flow-hover group block rounded border border-line bg-[#070907] p-5 transition hover:border-electric/45 hover:bg-[#0a0d0a]"
              >
                <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-start">
                  <div>
                    <div className="mb-3 flex items-center gap-2 font-mono text-[0.68rem] uppercase tracking-[0.12em] text-linkblue/85">
                      <BookOpen size={14} />
                      {new Date(post.date).toLocaleDateString("en", {
                        year: "numeric",
                        month: "short",
                        day: "numeric"
                      })}
                      <span className="text-slate-600">/</span>
                      {post.readingTime}
                    </div>
                    <h2 className="text-xl font-semibold tracking-tight text-white">
                      {post.title}
                    </h2>
                    <p className="mt-3 max-w-3xl text-sm leading-6 text-slate-400">
                      {post.description}
                    </p>
                  </div>
                  <ArrowUpRight
                    size={18}
                    className="text-slate-500 transition group-hover:text-electric"
                  />
                </div>
                <div className="mt-5 flex flex-wrap gap-1.5">
                  {post.tags.map((tag) => (
                    <span
                      key={tag}
                      className="rounded border border-line bg-black/35 px-2 py-1 font-mono text-[0.68rem] text-slate-300"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </Link>
            ))}
          </div>
        </section>
      </div>
    </main>
  );
}
