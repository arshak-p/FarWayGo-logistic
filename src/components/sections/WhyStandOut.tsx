"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { ContainerHook } from "@/components/ui/ContainerHook";

const stats = [
  {
    title: "Reliable Delivery",
    body: "We ensure every shipment reaches its destination safely, securely, and on time with complete operational precision.",
  },
  {
    title: "Global Network",
    body: "Our strong international logistics network allows us to provide seamless transportation solutions across worldwide markets.",
  },
  {
    title: "Real-Time Tracking",
    body: "Track your cargo anytime with advanced monitoring systems designed for transparency and accuracy.",
  },
  {
    title: "Experienced Team",
    body: "Our logistics professionals bring years of industry expertise to manage shipments efficiently and professionally.",
  },
  {
    title: "Fast & Efficient Service",
    body: "We streamline transportation and supply chain operations to reduce delays and improve delivery performance.",
  },
  {
    title: "Secure Cargo Handling",
    body: "Your goods are handled with the highest safety standards throughout every stage of transportation.",
  },
  {
    title: "Customer-Focused Solutions",
    body: "We create customized logistics strategies tailored to meet your business requirements and shipping goals.",
  },
  {
    title: "Competitive Pricing",
    body: "High-quality logistics services delivered with cost-effective solutions that maximize business value.",
  },
  {
    title: "24/7 Support",
    body: "Our dedicated support team is available around the clock to assist with shipments and operational inquiries.",
  },
  {
    title: "Trusted By Businesses",
    body: "Companies rely on us for dependable logistics solutions that support long-term business growth and success.",
  },
];

export function WhyStandOut() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start 0.9", "end 0.3"],
  });

  const containerY = useTransform(scrollYProgress, [0, 0.55], [-160, 0]);
  const cableScale = useTransform(scrollYProgress, [0, 0.55], [0.25, 1]);
  const sway = useTransform(scrollYProgress, [0, 0.3, 0.6, 1], [-3, 3, -2, 0]);
  const smokeX = useTransform(scrollYProgress, [0, 1], [-40, 60]);
  const smokeOpacity = useTransform(scrollYProgress, [0, 0.3, 0.8], [0, 0.5, 0.15]);

  return (
    <section
      id="why-us"
      ref={ref}
      className="relative bg-[var(--color-mist)] overflow-hidden py-24 md:py-32"
    >
      {/* drifting cloud / smoke accents */}
      <motion.div
        style={{ x: smokeX, opacity: smokeOpacity }}
        className="pointer-events-none absolute left-[-10%] top-[30%] w-[420px] h-[260px] rounded-full bg-white blur-3xl"
      />
      <div className="pointer-events-none absolute right-[-8%] top-[10%] w-[360px] h-[220px] rounded-full bg-white/70 blur-3xl" />

      <div className="relative container-px max-content">
        {/* headline with hanging container layered through it */}
        <div className="relative flex flex-col items-center justify-center min-h-[280px] md:min-h-[360px] w-full">
          
          <div className="flex items-center justify-center gap-10 md:gap-32 w-full relative z-0">
            <h2 className="font-display font-semibold uppercase text-[#dbe1e3] text-[16vw] md:text-[7.5rem] leading-[0.85] text-center select-none pointer-events-none">
              Why
            </h2>

            <motion.div
              style={{ y: containerY, rotate: sway }}
              className="relative z-10 w-[220px] md:w-[300px]"
            >
              <ContainerHook className="w-full h-auto drop-shadow-[0_30px_40px_rgba(2,51,65,0.25)]" />
              <motion.div
                style={{ scaleY: cableScale }}
                className="absolute -top-[260px] md:-top-[340px] left-1/2 -translate-x-1/2 w-px h-[260px] md:h-[340px] bg-[var(--color-navy)]/30 origin-bottom"
              />
            </motion.div>

            <h2 className="font-display font-semibold uppercase text-[#dbe1e3] text-[16vw] md:text-[7.5rem] leading-[0.85] text-center select-none pointer-events-none">
              We
            </h2>
          </div>

          <h2 className="font-display font-semibold uppercase text-[#dbe1e3] text-[16vw] md:text-[7.5rem] leading-[0.85] text-center select-none pointer-events-none mt-2 md:-mt-8 relative z-0">
            Stand Out?
          </h2>
        </div>

        {/* feature grid */}
        <div className="mt-16 md:mt-24 grid md:grid-cols-2 gap-x-24 md:gap-x-48 lg:gap-x-[400px] gap-y-12 md:gap-y-20 max-w-[1400px] mx-auto">
          {stats.map((s, idx) => {
            const isLeft = idx % 2 === 0;
            return (
              <div
                key={s.title}
                className={isLeft ? "text-right flex flex-col items-end md:pr-16 lg:pr-24" : "text-left flex flex-col items-start md:pl-16 lg:pl-24"}
              >
                <h3 className="font-subheading font-semibold uppercase text-[var(--color-navy)] text-lg mb-2">
                  {s.title}
                </h3>
                <p className="text-[var(--color-ink)]/60 text-[14.5px] leading-relaxed max-w-md">
                  {s.body}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
