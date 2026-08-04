"use client";

import { Github, Linkedin } from "lucide-react";

const navItems = [
  ["About", "#about"],
  ["Journey", "#journey"],
  ["Projects", "#projects"],
  ["Skills", "#skills"],
  ["Contact", "#contact"]
];

export function Header() {
  return (
    <header className="fixed inset-x-0 top-0 z-50 border-b border-line bg-ink/88 backdrop-blur-2xl">
      <nav className="mx-auto flex max-w-7xl items-center justify-between px-5 py-3 sm:px-6 lg:px-8">
        <a
          href="#home"
          className="inline-flex h-8 w-8 items-center justify-center rounded border border-electric/25 bg-[#070907] text-xs font-bold tracking-tight text-white"
        >
          VK
        </a>
        <div className="hidden items-center gap-1 rounded border border-line bg-[#070907] p-1 md:flex">
          {navItems.map(([label, href]) => (
            <a
              key={label}
              href={href}
              className="rounded px-2.5 py-1.5 text-xs font-medium text-slate-400 transition hover:bg-electric/10 hover:text-white"
            >
              {label}
            </a>
          ))}
        </div>
        <div className="flex items-center gap-2">
          <a
            href="https://github.com/VrundKasodariya"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Open Vrund Kasodariya GitHub profile"
            className="rounded border border-line bg-[#070907] p-2 text-slate-300 transition hover:border-electric/60 hover:text-electric"
          >
            <Github size={18} />
          </a>
          <a
            href="https://www.linkedin.com/in/vrund-kasodariya/"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Open Vrund Kasodariya LinkedIn profile"
            className="rounded border border-line bg-[#070907] p-2 text-slate-300 transition hover:border-electric/60 hover:text-electric"
          >
            <Linkedin size={18} />
          </a>
        </div>
      </nav>
    </header>
  );
}
