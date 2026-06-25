"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import { List, X, House, Info, Stack, Phone } from "@phosphor-icons/react";
import { Button } from "@/components/ui/Button";

const links = [
  { label: "Home", href: "#home", icon: House },
  { label: "About", href: "#about", icon: Info },
  { label: "Services", href: "#services", icon: Stack },
  { label: "Contact", href: "#contact", icon: Phone },
];

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [hidden, setHidden] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    let lastY = window.scrollY;
    const onScroll = () => {
      const y = window.scrollY;
      setScrolled(y > 40);
      if (y > lastY && y > 120) {
        setHidden(true);
      } else {
        setHidden(false);
      }
      lastY = y;
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <>
      <motion.header
        animate={{ y: hidden ? -110 : 0 }}
        transition={{ duration: 0.35, ease: "easeInOut" }}
        className="fixed top-0 left-0 right-0 z-50 container-px pt-6"
      >
        <div className="max-content flex items-center justify-between">
          <a href="#home" className="flex items-center">
            <Image
              src="/images/logo.svg"
              alt="FarWayGo Logistics"
              width={160}
              height={42}
              priority
              className="h-8 w-auto md:h-9"
            />
          </a>

          <nav
            className={`hidden md:flex items-center gap-1 rounded-full px-2 py-2 transition-all duration-300 ${
              scrolled
                ? "bg-white/70 backdrop-blur-xl shadow-[0_8px_30px_rgba(2,51,65,0.12)]"
                : "bg-white/40 backdrop-blur-md"
            }`}
          >
            {links.map((l) => (
              <a
                key={l.href}
                href={l.href}
                className="px-4 py-2 rounded-full text-sm font-medium text-[var(--color-navy)] hover:bg-[var(--color-navy)] hover:text-white transition-colors duration-200"
              >
                {l.label}
              </a>
            ))}
          </nav>

          <div className="hidden md:block">
            <Button href="#contact" variant="ghost">
              Get a Quote
            </Button>
          </div>

          <button
            aria-label="Open menu"
            onClick={() => setOpen(true)}
            className="md:hidden flex items-center justify-center w-11 h-11 rounded-full bg-white/70 backdrop-blur-md shadow-sm"
          >
            <List size={22} color="#023341" />
          </button>
        </div>
      </motion.header>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[60] bg-[var(--color-navy)] flex flex-col"
          >
            <div className="container-px pt-6 flex items-center justify-between">
              <Image
                src="/images/logo-on-dark.svg"
                alt="FarWayGo Logistics"
                width={160}
                height={42}
                className="h-8 w-auto"
              />
              <button
                aria-label="Close menu"
                onClick={() => setOpen(false)}
                className="flex items-center justify-center w-11 h-11 rounded-full bg-white/10"
              >
                <X size={22} color="white" />
              </button>
            </div>
            <nav className="flex-1 flex flex-col items-start justify-center gap-2 container-px">
              {links.map((l, i) => (
                <motion.a
                  key={l.href}
                  href={l.href}
                  onClick={() => setOpen(false)}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.06 }}
                  className="font-subheading text-5xl text-white py-3 flex items-center gap-4"
                >
                  <l.icon size={28} className="text-[var(--color-orange)]" />
                  {l.label}
                </motion.a>
              ))}
              <div className="mt-8">
                <Button href="#contact" variant="primary" onClick={() => setOpen(false)}>
                  Get a Quote
                </Button>
              </div>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
