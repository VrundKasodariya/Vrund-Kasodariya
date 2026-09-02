import type { AnchorHTMLAttributes, ReactNode } from "react";

type ExternalButtonProps = AnchorHTMLAttributes<HTMLAnchorElement> & {
  children: ReactNode;
  variant?: "primary" | "secondary" | "ghost";
};

const variants = {
  primary:
    "border-electric bg-electric text-black shadow-glow hover:-translate-y-0.5 hover:bg-[#45f235] hover:border-[#45f235]",
  secondary:
    "border-linkblue/35 bg-white/[0.025] text-slate-100 hover:-translate-y-0.5 hover:border-linkblue/75 hover:bg-linkblue/10 hover:text-white hover:shadow-blueglow",
  ghost:
    "border-transparent bg-transparent text-slate-300 hover:-translate-y-0.5 hover:text-white hover:bg-white/[0.05]"
};

export function ExternalButton({
  children,
  variant = "secondary",
  className = "",
  ...props
}: ExternalButtonProps) {
  return (
    <a
      className={`inline-flex min-h-10 items-center justify-center gap-2 rounded border px-3.5 text-xs font-semibold transition duration-200 max-sm:w-full ${variants[variant]} ${className}`}
      {...props}
    >
      {children}
    </a>
  );
}
