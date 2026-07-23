"use client";

import { AnimatedSection, AnimatedItem } from "@/components/ui/AnimatedSection";
import { AnimatedTitleGroup, SplitText } from "@/components/ui/AnimatedTitle";
import { ReactNode, useRef, useEffect, useState } from "react";
import Image from "next/image";
import { motion, useScroll, useVelocity, useSpring, useTransform } from "framer-motion";

const leftFeatures = [
  {
    title: "Global Shipping Solutions",
    body: "We provide seamless domestic and international shipping services across air, sea, and land transportation. From small cargo deliveries to large-scale freight operations, our logistics solutions are designed to keep your business moving without delays.",
  },
  {
    title: "Reliable Freight Network",
    body: "Our global logistics network ensures seamless cargo movement across GCC, Africa, Asia, and international trade routes. Through strategic partnerships and efficient coordination, we provide dependable transportation solutions.",
  },
];

const rightFeatures: { title: string; body: ReactNode }[] = [
  {
    title: "Experience and Expertise",
    body: (
      <>
        At <span className="text-[var(--color-orange)]">Farwaygo</span>, we bring years of logistics expertise and operational excellence to businesses worldwide. Our team specializes in freight transportation, cargo management, warehousing, and supply chain solutions tailored to modern business demands.
      </>
    ),
  },
  {
    title: "Dedicated To Your Success",
    body: "Our mission is to build long-term partnerships by delivering dependable logistics services that businesses can trust. We work closely with clients to understand their transportation challenges and create customized solutions.",
  },
  {
    title: "Customer-Focused Service",
    body: "We prioritize long-term partnerships by delivering responsive communication, timely execution, and reliable logistics support. Every shipment is handled with commitment, professionalism, and attention to detail.",
  },
];

export function TrustGrid() {
  const trackRef = useRef<HTMLDivElement>(null);
  const elementRef = useRef<HTMLDivElement>(null);
  const [layout, setLayout] = useState({ track: 2000, element: 400 });

  useEffect(() => {
    const update = () => {
      if (trackRef.current && elementRef.current) {
        setLayout({
          track: trackRef.current.offsetHeight,
          element: elementRef.current.offsetHeight
        });
      }
    };
    update();
    setTimeout(update, 100);
    window.addEventListener("resize", update);
    return () => window.removeEventListener("resize", update);
  }, []);

  const { scrollYProgress } = useScroll({
    target: trackRef,
    offset: ["start start", "end start"]
  });

  const maxTravel = Math.max(0, layout.track - layout.element - 10);
  const progressStop = layout.track > 0 ? maxTravel / layout.track : 1;

  const rawY = useTransform(
    scrollYProgress,
    [0, progressStop, 1],
    [0, maxTravel, maxTravel]
  );

  const smoothY = useSpring(rawY, {
    stiffness: 70,
    damping: 20,
    restDelta: 0.1
  });

  // Asymmetric smoothing: 
  // Scroll Down: smoothY lags behind rawY (smoothY < rawY). min() picks smoothY -> Smooth stop!
  // Scroll Up: smoothY lags behind rawY (smoothY > rawY). min() picks rawY -> Instant tracking, no lag!
  const y = useTransform([rawY, smoothY], ([raw, smooth]: number[]) => Math.min(raw, smooth));

  return (
    <section id="trust" className="min-h-screen relative z-20 bg-transparent container-px pb-20 md:pb-28">

      {/* Extends into the next section so the container stops between the WHY WE text */}
      <div ref={trackRef} className="absolute top-0 left-0 right-0 -bottom-[425px] md:-bottom-[550px] z-0 pointer-events-none">
        <motion.div style={{ y, willChange: "transform", transform: "translateZ(0)" }} className="w-full flex justify-center absolute top-0 left-0">
          <div ref={elementRef} className="hidden md:flex w-[70%] md:w-[45%] lg:w-[35%] xl:w-[30%] max-w-[500px] justify-center items-center -translate-y-[8%] lg:-translate-x-[0.3rem]">
            <Image
              src="/images/GroupB.webp"
              alt="FarWayGo logistics operations and warehousing services"
              width={1600}
              height={1600}
              className="w-full h-auto object-contain object-center opacity-40 md:opacity-100"
            />
          </div>
        </motion.div>
      </div>

      <div className="max-content relative z-10">
        <div className="grid md:grid-cols-2 gap-x-24 lg:gap-x-[300px] xl:gap-x-[400px] 2xl:gap-x-[500px] gap-y-14 md:gap-y-24 relative max-w-[1500px] mx-auto">
          <AnimatedSection className="flex flex-col md:pr-16 lg:pr-24 mt-[20px]">
            <AnimatedTitleGroup as="h2" className="font-display font-bold uppercase text-[var(--color-navy-deep)] text-[12vw] md:text-[5.5vw] lg:text-[6rem] xl:text-[6.5rem] leading-[0.85] tracking-normal max-w-3xl pr-4">
              <div className="flex flex-wrap gap-x-[3vw] md:gap-x-6">
                <SplitText text="Delivering Trust" />
              </div>
              <div className="flex flex-wrap gap-x-[3vw] md:gap-x-6 mt-2">
                <SplitText text="Across Every Mile" />
              </div>
            </AnimatedTitleGroup>

            <div className="pt-20 md:pt-44 flex flex-col gap-14 md:gap-24">
              {leftFeatures.map((f) => (
                <AnimatedItem key={f.title} className="text-left flex flex-col items-start md:text-right md:items-end">
                  <h3 className="font-subheading font-semibold uppercase text-[var(--color-navy)] text-xl md:text-[1.4rem] mb-3">
                    {f.title}
                  </h3>
                  <p className="text-[var(--color-ink)]/65 text-[15px] leading-relaxed max-w-md">
                    {f.body}
                  </p>
                </AnimatedItem>
              ))}
            </div>
          </AnimatedSection>

          <AnimatedSection className="flex flex-col gap-14 md:gap-20 md:pl-16 lg:pl-24 pt-32 md:pt-[380px] lg:pt-[500px] xl:pt-[600px] text-left -mt-[80px]">
            {rightFeatures.map((f) => (
              <AnimatedItem key={f.title}>
                <h3 className="font-subheading font-semibold uppercase text-[var(--color-navy)] text-xl md:text-[1.4rem] mb-3">
                  {f.title}
                </h3>
                <p className="text-[var(--color-ink)]/65 text-[15px] leading-relaxed max-w-md">
                  {f.body}
                </p>
              </AnimatedItem>
            ))}
          </AnimatedSection>
        </div>
      </div>
    </section>
  );
}