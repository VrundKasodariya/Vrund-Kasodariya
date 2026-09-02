"use client";

import { AnimatePresence, motion } from "framer-motion";
import { Github, Linkedin, Menu, X } from "lucide-react";
import { useEffect, useState } from "react";

const navItems = [
  ["About", "#about"],
  ["Journey", "#journey"],
  ["Projects", "#projects"],
  ["Blog", "/blog"],
  ["Skills", "#skills"],
  ["Contact", "#contact"]
];

export function Header() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [activeHref, setActiveHref] = useState<string>(navItems[0][1]);

  useEffect(() => {
    if (!menuOpen) return;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = "";
    };
  }, [menuOpen]);

  useEffect(() => {
    const sections = navItems
      .filter(([, href]) => href.startsWith("#"))
      .map(([, href]) => document.getElementById(href.slice(1)))
      .filter((el): el is HTMLElement => el !== null);

    if (sections.length === 0) return;

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top);
        if (visible.length > 0) {
          setActiveHref(`#${visible[0].target.id}`);
        }
      },
      { rootMargin: "-45% 0px -50% 0px", threshold: 0 }
    );

    sections.forEach((section) => observer.observe(section));
    return () => observer.disconnect();
  }, []);

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
              aria-current={activeHref === href ? "page" : undefined}
              className={`rounded px-2.5 py-1.5 text-xs font-medium transition hover:bg-electric/10 hover:text-white ${
                activeHref === href ? "bg-electric/10 text-white" : "text-slate-400"
              }`}
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
            className="hidden rounded border border-line bg-[#070907] p-2 text-slate-300 transition hover:border-electric/60 hover:text-electric sm:inline-flex"
          >
            <Github size={18} />
          </a>
          <a
            href="https://www.linkedin.com/in/vrund-kasodariya/"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Open Vrund Kasodariya LinkedIn profile"
            className="hidden rounded border border-line bg-[#070907] p-2 text-slate-300 transition hover:border-electric/60 hover:text-electric sm:inline-flex"
          >
            <Linkedin size={18} />
          </a>
          <button
            type="button"
            onClick={() => setMenuOpen((open) => !open)}
            aria-label={menuOpen ? "Close navigation menu" : "Open navigation menu"}
            aria-expanded={menuOpen}
            className="inline-flex rounded border border-line bg-[#070907] p-2 text-slate-300 transition hover:border-electric/60 hover:text-electric md:hidden"
          >
            {menuOpen ? <X size={18} /> : <Menu size={18} />}
          </button>
        </div>
      </nav>

      <AnimatePresence>
        {menuOpen ? (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.2, ease: "easeOut" }}
            className="overflow-hidden border-b border-line bg-ink/95 backdrop-blur-2xl md:hidden"
          >
            <div className="flex flex-col gap-1 px-5 py-3 sm:px-6">
              {navItems.map(([label, href]) => (
                <a
                  key={label}
                  href={href}
                  onClick={() => setMenuOpen(false)}
                  className="rounded px-3 py-2.5 text-sm font-medium text-slate-300 transition hover:bg-electric/10 hover:text-white"
                >
                  {label}
                </a>
              ))}
              <div className="mt-2 flex items-center gap-2 border-t border-line pt-3">
                <a
                  href="https://github.com/VrundKasodariya"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Open Vrund Kasodariya GitHub profile"
                  onClick={() => setMenuOpen(false)}
                  className="inline-flex items-center gap-2 rounded border border-line bg-[#070907] px-3 py-2 text-xs font-medium text-slate-300 transition hover:border-electric/60 hover:text-electric"
                >
                  <Github size={16} /> GitHub
                </a>
                <a
                  href="https://www.linkedin.com/in/vrund-kasodariya/"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Open Vrund Kasodariya LinkedIn profile"
                  onClick={() => setMenuOpen(false)}
                  className="inline-flex items-center gap-2 rounded border border-line bg-[#070907] px-3 py-2 text-xs font-medium text-slate-300 transition hover:border-electric/60 hover:text-electric"
                >
                  <Linkedin size={16} /> LinkedIn
                </a>
              </div>
            </div>
          </motion.div>
        ) : null}
      </AnimatePresence>
    </header>
  );
}
