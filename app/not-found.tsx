import Link from "next/link";
import { ArrowLeft } from "lucide-react";

export default function NotFound() {
  return (
    <main className="relative flex min-h-screen items-center overflow-hidden px-5 sm:px-6 lg:px-8">
      <div className="background-grid pointer-events-none absolute inset-0" />
      <div className="relative mx-auto w-full max-w-3xl">
        <p className="mb-3 font-mono text-xs uppercase tracking-[0.18em] text-signal">
          404 / not found
        </p>
        <h1 className="text-balance text-3xl font-semibold tracking-tight text-white sm:text-4xl">
          This route doesn&apos;t resolve to anything.
        </h1>
        <p className="mt-4 max-w-xl text-sm leading-7 text-slate-400 sm:text-base">
          The page may have moved, or the link might be mistyped. Head back and
          try from the top.
        </p>
        <div className="mt-8 flex flex-wrap gap-3">
          <Link
            href="/"
            className="inline-flex min-h-10 items-center gap-2 rounded border border-electric bg-electric px-3.5 text-xs font-semibold text-black transition hover:bg-[#45f235]"
          >
            <ArrowLeft size={15} />
            Back to portfolio
          </Link>
          <Link
            href="/blog"
            className="inline-flex min-h-10 items-center rounded border border-line bg-[#070907] px-3.5 text-xs font-semibold text-slate-300 transition hover:border-electric/45 hover:text-electric"
          >
            Read the blog
          </Link>
        </div>
      </div>
    </main>
  );
}
