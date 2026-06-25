"use client";

import Image from "next/image";
import { AnimatedSection, AnimatedItem } from "@/components/ui/AnimatedSection";
import { EyebrowBadge } from "@/components/ui/EyebrowBadge";

const steps = [
  {
    title: "Consultation",
    body: "Understanding shipment requirements, cargo type, and logistics needs.",
    img: "/images/warehouse-2.jpg",
  },
  {
    title: "Planning",
    body: "Route optimization, customs coordination, and transportation scheduling.",
    img: "/images/warehouse-1.jpg",
  },
  {
    title: "Warehousing",
    body: "Safe loading, warehousing, and operational management.",
    img: "/images/chatgpt-1.png",
  },
  {
    title: "Transportation",
    body: "Efficient cargo movement through air, sea, or land transportation.",
    img: "/images/kling-2.png",
  },
  {
    title: "Delivery",
    body: "Secure and timely shipment delivery with real-time tracking support.",
    img: "/images/kling-1.png",
  },
];

export function Process() {
  return (
    <section className="min-h-screen relative bg-[#7dd3fc] container-px py-10 md:py-16">
      <div className="max-content">
        <AnimatedSection
          className="relative rounded-[28px] md:rounded-[36px] bg-[var(--color-navy-deep)] overflow-hidden px-6 md:px-12 py-12 md:py-16"
        >
          <div className="pointer-events-none absolute -top-32 right-0 w-[500px] h-[500px] rounded-full bg-[var(--color-orange)]/10 blur-[100px]" />

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 lg:gap-10 relative z-10">
            {/* The Text Column taking the first slot */}
            <AnimatedItem className="flex flex-col justify-start lg:pr-6 mb-4 lg:mb-0">
              <div className="w-max mb-6">
                <EyebrowBadge variant="orange">Our Process</EyebrowBadge>
              </div>
              <h2 className="font-display text-white text-[10vw] md:text-[3.2rem] leading-[1.05] tracking-tight">
                How we move<br/>your cargo across<br/>the skies
              </h2>
            </AnimatedItem>

            {/* The 5 Cards mapping into the remaining grid slots */}
            {steps.map((s) => (
              <AnimatedItem key={s.title} className="flex flex-col gap-4">
                <div className="relative w-full aspect-[16/10] rounded-[1.5rem] overflow-hidden border border-white/5">
                  <Image
                    src={s.img}
                    alt={s.title}
                    fill
                    sizes="(min-width: 1024px) 30vw, (min-width: 640px) 45vw, 90vw"
                    className="object-cover"
                  />
                  {/* Subtle gradient overlay to match image mood if needed */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent pointer-events-none" />
                </div>
                <div className="px-1">
                  <h3 className="font-subheading text-white text-3xl font-normal tracking-wide">
                    {s.title}
                  </h3>
                  <p className="text-white/50 text-[12px] leading-relaxed mt-1 font-medium">
                    {s.body}
                  </p>
                </div>
              </AnimatedItem>
            ))}
          </div>
        </AnimatedSection>
      </div>
    </section>
  );
}
