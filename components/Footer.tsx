import { ArrowUp, Github, Linkedin, Mail } from "lucide-react";
import { siteConfig } from "@/lib/site";

const iconLinkClass =
  "inline-flex rounded border border-line bg-[#070907] p-2 text-slate-300 transition hover:border-electric/60 hover:text-electric";

export function Footer() {
  return (
    <footer className="relative border-t border-line">
      <div className="mx-auto flex max-w-7xl flex-col gap-4 px-5 py-8 sm:flex-row sm:items-center sm:justify-between sm:px-6 lg:px-8">
        <div>
          <p className="text-sm font-semibold text-white">{siteConfig.name}</p>
          <p className="mt-1 text-xs text-slate-400">
            Backend engineer &middot; Bengaluru, India
          </p>
        </div>
        <div className="flex items-center gap-2">
          <a
            href={siteConfig.links.github}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Open Vrund Kasodariya GitHub profile"
            className={iconLinkClass}
          >
            <Github size={16} />
          </a>
          <a
            href={siteConfig.links.linkedin}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Open Vrund Kasodariya LinkedIn profile"
            className={iconLinkClass}
          >
            <Linkedin size={16} />
          </a>
          <a
            href={`mailto:${siteConfig.email}`}
            aria-label="Email Vrund Kasodariya"
            className={iconLinkClass}
          >
            <Mail size={16} />
          </a>
          <a href="#top" aria-label="Back to top" className={iconLinkClass}>
            <ArrowUp size={16} />
          </a>
        </div>
      </div>
    </footer>
  );
}
