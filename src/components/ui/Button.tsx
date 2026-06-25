"use client";

import { motion } from "framer-motion";
import { ReactNode } from "react";

type ButtonProps = {
  children: ReactNode;
  variant?: "primary" | "ghost" | "outline-light";
  href?: string;
  onClick?: () => void;
  className?: string;
  type?: "button" | "submit";
};

export function Button({
  children,
  variant = "primary",
  href,
  onClick,
  className = "",
  type = "button",
}: ButtonProps) {
  const base =
    "inline-flex items-center justify-center gap-2 rounded-full px-7 py-3.5 font-body font-semibold text-[15px] transition-colors duration-200 whitespace-nowrap";

  const styles: Record<string, string> = {
    primary: "bg-[var(--color-orange)] text-white hover:bg-[var(--color-orange-soft)]",
    ghost: "bg-[var(--color-navy)] text-white hover:bg-[var(--color-navy-soft)]",
    "outline-light":
      "bg-white text-[var(--color-navy)] hover:bg-[var(--color-mist-dim)]",
  };

  const content = (
    <motion.span
      whileHover={{ scale: 1.03 }}
      whileTap={{ scale: 0.97 }}
      className={`${base} ${styles[variant]} ${className}`}
    >
      {children}
    </motion.span>
  );

  if (href) {
    return (
      <a href={href} className="inline-block">
        {content}
      </a>
    );
  }

  return (
    <button type={type} onClick={onClick} className="inline-block">
      {content}
    </button>
  );
}
