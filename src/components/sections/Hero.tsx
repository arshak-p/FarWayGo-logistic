"use client";

import Image from "next/image";
import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import { ArrowDown } from "@phosphor-icons/react";
import { AnimatedSection, AnimatedItem } from "@/components/ui/AnimatedSection";

export function Hero() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });

  return (
    <section
      id="home"
      ref={ref}
      className="relative min-h-[100vh] bg-[var(--color-mist)] pt-32 md:pt-40"
    >
      {/* ambient sky gradient */}
      <div className="absolute inset-0 bg-gradient-to-b from-[#7dd3fc] via-[var(--color-mist)] to-[var(--color-mist)] opacity-60" />

      {/* Floating Clouds */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none z-0">
        <motion.div
          animate={{ x: [0, 60, 0], y: [0, 15, 0] }}
          transition={{ duration: 25, repeat: Infinity, ease: "easeInOut" }}
          className="absolute top-[5%] left-[-15%] md:left-[-5%] w-[80%] md:w-[50%] max-w-[800px] opacity-60"
        >
          <img src="/images/clouds/8918166.png" alt="cloud" className="w-full h-auto object-contain" />
        </motion.div>
        
        <motion.div
          animate={{ x: [0, -50, 0], y: [0, -20, 0] }}
          transition={{ duration: 30, repeat: Infinity, ease: "easeInOut", delay: 2 }}
          className="absolute top-[30%] right-[-20%] md:right-[-5%] w-[70%] md:w-[45%] max-w-[700px] opacity-50"
        >
          <img src="/images/clouds/8918191.png" alt="cloud" className="w-full h-auto object-contain" />
        </motion.div>

        <motion.div
          animate={{ x: [0, 40, 0], y: [0, 30, 0] }}
          transition={{ duration: 22, repeat: Infinity, ease: "easeInOut", delay: 5 }}
          className="absolute bottom-[-10%] left-[20%] w-[90%] md:w-[60%] max-w-[900px] opacity-40"
        >
          <img src="/images/clouds/8918206.png" alt="cloud" className="w-full h-auto object-contain" />
        </motion.div>
      </div>

      {/* Hero Image (Group 2) */}
      <div className="absolute right-[-20%] md:right-[-10%] lg:right-0 top-[5%] md:top-[8%] lg:top-[10%] w-[100%] md:w-[75%] lg:w-[65%] xl:w-[60%] max-w-[1300px] z-0 pointer-events-none">
        <Image
          src="/images/group-2.png"
          alt="Logistics Solutions Group"
          width={1600}
          height={1600}
          className="w-full h-auto object-contain object-right opacity-90 md:opacity-100"
          priority
        />
      </div>

      <div className="relative z-10 container-px max-content">
        <AnimatedSection>
          <AnimatedItem>
            <h1 className="font-display font-semibold uppercase leading-[0.95] tracking-tight text-[12vw] md:text-[6.2vw] xl:text-[5.4rem] text-[var(--color-ink)] max-w-[18ch]">
              Storage,
              <br />
              Distribution
              <br />
              &amp; Transportation
              <br />
              <span className="text-[var(--color-orange)]">Solutions</span>
            </h1>
          </AnimatedItem>

          <AnimatedItem delay={0.1} className="mt-10">
            <a
              href="#trust"
              className="group inline-flex items-center justify-center w-14 h-14 rounded-full bg-[var(--color-orange)] text-white shadow-[0_10px_30px_rgba(253,94,2,0.35)]"
            >
              <motion.span
                animate={{ y: [0, 5, 0] }}
                transition={{ duration: 1.6, repeat: Infinity, ease: "easeInOut" }}
              >
                <ArrowDown size={22} weight="bold" />
              </motion.span>
            </a>
          </AnimatedItem>
        </AnimatedSection>

        <div className="mt-24 md:mt-32 max-w-md ml-auto">
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
