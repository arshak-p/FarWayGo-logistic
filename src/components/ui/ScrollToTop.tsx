"use client";

import { useEffect, useState } from "react";
import { motion, useScroll, useSpring, useTransform } from "framer-motion";
import { ArrowUp } from "@phosphor-icons/react";

export function ScrollToTop() {
  const { scrollYProgress, scrollY } = useScroll();
  const [isVisible, setIsVisible] = useState(false);

  // Smooth out the progress value so the ring fills smoothly
  const smoothProgress = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  });

  useEffect(() => {
    return scrollY.onChange((latest) => {
      if (latest > 400) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }
    });
  }, [scrollY]);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  // Circle circumference calculation
  // With 56x56 svg and center 28, a radius of 26 + stroke/2 (1.5) = 27.5 (prevents clipping)
  const radius = 26;
  const circumference = 2 * Math.PI * radius;
  // Map 0-1 progress to strokeDashoffset (circumference to 0)
  const strokeDashoffset = useTransform(smoothProgress, [0, 1], [circumference, 0]);

  return (
    <motion.button
      initial={{ opacity: 0, scale: 0.5, y: 20 }}
      animate={isVisible ? { opacity: 1, scale: 1, y: 0 } : { opacity: 0, scale: 0.5, y: 20 }}
      transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
      onClick={scrollToTop}
      className={`fixed bottom-6 right-6 md:bottom-10 md:right-10 z-[100] w-[56px] h-[56px] rounded-full bg-white/70 backdrop-blur-md flex items-center justify-center cursor-pointer shadow-[0_8px_32px_rgba(0,0,0,0.15)] hover:bg-white/90 transition-colors ${!isVisible ? 'pointer-events-none' : ''}`}
      aria-label="Scroll to top"
    >
      {/* SVG Progress Ring */}
      <svg width="56" height="56" className="absolute inset-0 rotate-[-90deg]">
        {/* Background circle track */}
        <circle 
          cx="28" 
          cy="28" 
          r={radius} 
          fill="none" 
          stroke="rgba(0,0,0,0.08)" 
          strokeWidth="3" 
        />
        {/* Progress circle */}
        <motion.circle 
          cx="28" 
          cy="28" 
          r={radius} 
          fill="none" 
          stroke="var(--color-orange)" 
          strokeWidth="3" 
          strokeDasharray={circumference}
          style={{ strokeDashoffset }}
          strokeLinecap="round"
        />
      </svg>

      {/* Up Arrow Icon */}
      <ArrowUp size={24} weight="bold" className="text-[var(--color-orange)] relative z-10" />
    </motion.button>
  );
}
