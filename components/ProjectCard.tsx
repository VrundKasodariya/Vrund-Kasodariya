"use client";

import { motion } from "framer-motion";
import { ArrowUpRight, GitBranch } from "lucide-react";

type ProjectCardProps = {
  title: string;
  description: string;
  tags: string[];
};

export function ProjectCard({ title, description, tags }: ProjectCardProps) {
  return (
    <motion.article
      whileHover={{ y: -3 }}
      transition={{ duration: 0.2, ease: "easeOut" }}
      className="flow-hover group relative flex h-full min-h-[17rem] flex-col rounded border border-line bg-[#070907] p-4 transition duration-200 hover:border-electric/45 hover:bg-[#0a0d0a]"
    >
      <div className="mb-4 flex items-start justify-between gap-4 border-b border-line pb-3">
        <div>
          <div className="mb-2 flex items-center gap-2 font-mono text-[0.68rem] font-medium uppercase tracking-[0.12em] text-linkblue/85">
            <GitBranch size={13} />
            Project
          </div>
          <h3 className="text-base font-semibold leading-tight tracking-tight text-white">
            {title}
          </h3>
        </div>
        <span className="rounded border border-line bg-black/35 p-1.5 text-slate-500 transition group-hover:border-linkblue/45 group-hover:text-linkblue">
          <ArrowUpRight size={15} aria-hidden="true" />
        </span>
      </div>
      <p className="flex-1 text-sm leading-6 text-slate-400">{description}</p>
      <div className="mt-5 flex flex-wrap gap-1.5">
        {tags.map((tag) => (
          <span
            key={tag}
            className="rounded border border-line bg-black/35 px-2 py-0.5 font-mono text-[0.68rem] text-slate-300"
          >
            {tag}
          </span>
        ))}
      </div>
      <div className="mt-5 flex items-center justify-between border-t border-line pt-3 font-mono text-[0.68rem] uppercase tracking-[0.12em] text-slate-500">
        <span className="text-linkblue/75">Repo/status pending</span>
        <span className="text-signal">WIP</span>
      </div>
    </motion.article>
  );
}
