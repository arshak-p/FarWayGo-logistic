"use client";

import Image from "next/image";
import { motion, useScroll, useTransform, useMotionValue, useSpring } from "framer-motion";
import { useRef, useEffect, useState } from "react";
import { ArrowDown } from "@phosphor-icons/react";
import { AnimatedSection, AnimatedItem } from "@/components/ui/AnimatedSection";
import { AnimatedTitleGroup, AnimatedWord, SplitText } from "@/components/ui/AnimatedTitle";

export function Hero() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });

  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  useEffect(() => {
    // Only run mouse tracking on devices with a fine pointer (mouse/trackpad) to save battery/performance on mobile
    if (window.matchMedia("(pointer: fine)").matches) {
      const handleMouseMove = (e: MouseEvent) => {
        mouseX.set((e.clientX / window.innerWidth) * 2 - 1);
        mouseY.set((e.clientY / window.innerHeight) * 2 - 1);
      };

      window.addEventListener("mousemove", handleMouseMove);
      return () => window.removeEventListener("mousemove", handleMouseMove);
    }
  }, [mouseX, mouseY]);

  const smoothMouseX = useSpring(mouseX, { stiffness: 50, damping: 20 });
  const smoothMouseY = useSpring(mouseY, { stiffness: 50, damping: 20 });

  const parallax1X = useTransform(smoothMouseX, [-1, 1], [-30, 30]);
  const parallax1Y = useTransform(smoothMouseY, [-1, 1], [-30, 30]);
  const parallax2X = useTransform(smoothMouseX, [-1, 1], [40, -40]);
  const parallax2Y = useTransform(smoothMouseY, [-1, 1], [40, -40]);
  const parallax3X = useTransform(smoothMouseX, [-1, 1], [-50, 50]);
  const parallax3Y = useTransform(smoothMouseY, [-1, 1], [-50, 50]);

  return (
    <section
      id="home"
      ref={ref}
      className="relative z-30 md:z-0 min-h-[115vh] md:min-h-[100vh] bg-transparent md:bg-[var(--color-mist)] pt-28 md:pt-40 pb-40 md:pb-48 overflow-visible md:overflow-hidden"
    >
      {/* ambient sky gradient */}
      <div className="hidden md:block absolute inset-0 bg-gradient-to-b from-[#bae6fd] via-[var(--color-mist)] to-[var(--color-mist)] opacity-60" />
      
      {/* Top dark blue gradient overlay */}
      <div className="absolute top-0 left-0 right-0 h-48 md:h-64 bg-gradient-to-b from-[var(--color-navy)] to-transparent opacity-60 z-0 pointer-events-none" />

      {/* Floating Clouds with Entrance & Parallax */}
      <div className="absolute inset-0 pointer-events-none z-0">
        <motion.div
          initial={{ x: "-20vw", opacity: 0 }}
          animate={{ x: 0, opacity: 0.6 }}
          transition={{ duration: 2.5, ease: [0.16, 1, 0.3, 1] }}
          className="absolute top-[5%] left-[-15%] md:left-[-5%] w-[80%] md:w-[50%] max-w-[800px]"
        >
          <motion.div style={{ x: parallax1X, y: parallax1Y, willChange: "transform", transform: "translateZ(0)" }}>
            <motion.div
              style={{ willChange: "transform", transform: "translateZ(0)" }}
              animate={{ x: [0, 60, 0], y: [0, 15, 0] }}
              transition={{ duration: 25, repeat: Infinity, ease: "easeInOut", delay: 2.5 }}
            >
              <img src="/images/clouds/8918166.webp" alt="cloud" className="w-full h-auto object-contain" />
            </motion.div>
          </motion.div>
        </motion.div>
        
        <motion.div
          initial={{ x: "20vw", opacity: 0 }}
          animate={{ x: 0, opacity: 0.5 }}
          transition={{ duration: 2.8, ease: [0.16, 1, 0.3, 1], delay: 0.2 }}
          className="absolute top-[30%] right-[-20%] md:right-[-5%] w-[70%] md:w-[45%] max-w-[700px]"
        >
          <motion.div style={{ x: parallax2X, y: parallax2Y, willChange: "transform", transform: "translateZ(0)" }}>
            <motion.div
              style={{ willChange: "transform", transform: "translateZ(0)" }}
              animate={{ x: [0, -50, 0], y: [0, -20, 0] }}
              transition={{ duration: 30, repeat: Infinity, ease: "easeInOut", delay: 3 }}
            >
              <img src="/images/clouds/8918191.webp" alt="cloud" className="w-full h-auto object-contain" />
            </motion.div>
          </motion.div>
        </motion.div>

        <motion.div
          initial={{ x: "-15vw", y: "5vw", opacity: 0 }}
          animate={{ x: 0, y: 0, opacity: 0.4 }}
          transition={{ duration: 3, ease: [0.16, 1, 0.3, 1], delay: 0.4 }}
          className="absolute bottom-[-10%] left-[20%] w-[90%] md:w-[60%] max-w-[900px]"
        >
          <motion.div style={{ x: parallax3X, y: parallax3Y, willChange: "transform", transform: "translateZ(0)" }}>
            <motion.div
              style={{ willChange: "transform", transform: "translateZ(0)" }}
              animate={{ x: [0, 40, 0], y: [0, 30, 0] }}
              transition={{ duration: 22, repeat: Infinity, ease: "easeInOut", delay: 3.4 }}
            >
              <img src="/images/clouds/8918206.webp" alt="cloud" className="w-full h-auto object-contain" />
            </motion.div>
          </motion.div>
        </motion.div>
      </div>

      {/* Hero Image (Group 2) */}
      <div className="absolute inset-0 pointer-events-none z-0 overflow-hidden flex flex-col justify-end">
        {/* Desktop Wrapper (Original) */}
        <div className="hidden md:block absolute right-[-20%] md:right-[-10%] lg:right-0 bottom-0 w-[100%] md:w-[75%] lg:w-[65%] xl:w-[60%] max-w-[1300px] z-0">
          <Image
            src="/images/group-2.webp"
            alt="Logistics Solutions Group"
            width={1600}
            height={1600}
            className="w-full h-auto object-contain object-right opacity-90 md:opacity-100"
            priority
          />
        </div>
        
        {/* Mobile Wrapper (Full Background) */}
        <div className="md:hidden absolute right-0 top-[35%] w-[75%] h-[100vh] z-40 pointer-events-none">
          <Image
            src="/images/phone-crane-hero.webp"
            alt="Logistics Solutions Group Mobile"
            fill
            className="object-contain object-right-top opacity-90"
            priority
          />
        </div>

        {/* Mobile-Only Container Clouds */}
        <div className="md:hidden absolute inset-0 pointer-events-none z-50">
          <motion.div
            initial={{ x: "-10vw", opacity: 0 }}
            animate={{ x: 0, opacity: 0.7 }}
            transition={{ duration: 3, delay: 0.5 }}
            className="absolute bottom-[2%] left-[-45%] w-[80%]"
          >
            <motion.div
              style={{ willChange: "transform", transform: "translateZ(0)" }}
              animate={{ x: [0, 40, 0], y: [0, 15, 0] }}
              transition={{ duration: 22, repeat: Infinity, ease: "easeInOut" }}
            >
              <img src="/images/clouds/8918206.webp" alt="cloud" className="w-full h-auto object-contain" />
            </motion.div>
          </motion.div>

          <motion.div
            initial={{ x: "10vw", opacity: 0 }}
            animate={{ x: 0, opacity: 0.6 }}
            transition={{ duration: 3, delay: 0.8 }}
            className="absolute bottom-[-10%] right-[-45%] w-[75%]"
          >
            <motion.div
              style={{ willChange: "transform", transform: "translateZ(0)" }}
              animate={{ x: [0, -35, 0], y: [0, -10, 0] }}
              transition={{ duration: 26, repeat: Infinity, ease: "easeInOut" }}
            >
              <img src="/images/clouds/8918166.webp" alt="cloud" className="w-full h-auto object-contain" />
            </motion.div>
          </motion.div>
        </div>
      </div>

      <div className="relative z-10 container-px max-content">
        <AnimatedSection>
          <AnimatedTitleGroup 
            as="h1"
            className="font-display font-semibold uppercase leading-[0.95] tracking-normal text-[11vw] sm:text-[9.5vw] md:text-[6.2vw] xl:text-[5.4rem] text-[var(--color-ink)] max-w-[18ch]"
          >
            {/* Mobile: 1 Line for Storage/Distribution (3 lines total) */}
            <div className="flex md:hidden flex-wrap gap-x-[2vw]">
              <AnimatedWord>Storage,</AnimatedWord>
              <AnimatedWord>Distribution</AnimatedWord>
            </div>
            
            {/* Desktop: 2 Lines for Storage/Distribution (4 lines total) */}
            <div className="hidden md:flex flex-wrap gap-x-4">
              <AnimatedWord>Storage,</AnimatedWord>
            </div>
            <div className="hidden md:flex flex-wrap gap-x-4">
              <AnimatedWord>Distribution</AnimatedWord>
            </div>
            <div className="flex flex-wrap gap-x-[2vw] md:gap-x-4">
              <SplitText text="& Transportation" className="pr-4 shrink-0" />
            </div>
            <div className="flex flex-wrap gap-x-[2vw] md:gap-x-4">
              <AnimatedWord className="text-[var(--color-orange)]">Solutions</AnimatedWord>
            </div>
          </AnimatedTitleGroup>

          <AnimatedItem delay={0.1} className="mt-10">
            <HeroCtaButton />
          </AnimatedItem>
        </AnimatedSection>

        <div className="mt-12 sm:mt-16 md:-mt-20 max-w-md ml-auto">
          <AnimatedSection>
            <AnimatedItem>
              <p className="font-subheading text-[var(--color-orange)] font-semibold uppercase text-xl md:text-2xl tracking-wide leading-tight">
                We Are The Best
                <br />
                In This Field
              </p>
            </AnimatedItem>
            <AnimatedItem delay={0.08} className="mt-3">
              <p className="text-[var(--color-ink)]/70 text-[15px] leading-relaxed">
                FarWayGo provides reliable transport, freight forwarding,
                customs clearance, and logistics solutions across Saudi
                Arabia, the GCC, and international markets with operational
                excellence and real-time visibility.
              </p>
            </AnimatedItem>
          </AnimatedSection>
        </div>
      </div>
    </section>
  );
}

function HeroCtaButton() {
  const isTouchRef = useRef(false);
  const [isExpanded, setIsExpanded] = useState(false);

  return (
    <a
      href="#contact"
      onTouchStart={() => { isTouchRef.current = true; }}
      onMouseEnter={() => { if (!isTouchRef.current) setIsExpanded(true); }}
      onMouseLeave={() => { if (!isTouchRef.current) setIsExpanded(false); }}
      onClick={(e) => {
        if (isTouchRef.current && !isExpanded) {
          e.preventDefault();
          setIsExpanded(true);
        }
      }}
      className={`relative flex items-center justify-center h-16 md:h-20 rounded-full shadow-[0_10px_30px_rgba(253,94,2,0.35)] transition-all duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] overflow-hidden cursor-pointer ${
        isExpanded 
          ? "w-[200px] md:w-[260px] bg-[#fff4ea] text-[var(--color-ink)]" 
          : "w-16 md:w-20 bg-[var(--color-orange)] text-white"
      }`}
    >
      {/* Text that slides in */}
      <span className={`absolute left-7 md:left-9 whitespace-nowrap transition-all duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] font-subheading font-medium text-[16px] md:text-[18px] tracking-wide pointer-events-none ${
        isExpanded ? "opacity-100 translate-x-0" : "opacity-0 -translate-x-4"
      }`}>
        Get in Touch
      </span>
      
      {/* Arrow that slides to the right and rotates */}
      <div className={`absolute right-0 w-16 h-16 md:w-20 md:h-20 flex items-center justify-center transition-transform duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] ${
        isExpanded ? "-rotate-90" : "rotate-0"
      }`}>
        <ArrowDown size={28} className="md:w-8 md:h-8" weight="bold" />
      </div>
    </a>
  );
}
