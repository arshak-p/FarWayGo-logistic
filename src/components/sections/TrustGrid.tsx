"use client";

import { AnimatedSection, AnimatedItem } from "@/components/ui/AnimatedSection";
import { ReactNode } from "react";
import Image from "next/image";

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
  return (
    <section id="trust" className="min-h-screen relative z-20 bg-[var(--color-mist)] container-px pb-20 md:pb-28">


      {/* Sticky Group 1 image centered */}
      {/* Extends into the next section so the container stops between the WHY WE text */}
      <div className="absolute top-0 left-0 right-0 -bottom-[350px] md:-bottom-[480px] z-0 pointer-events-none">
        <div className="sticky top-[0vh] w-full flex justify-center">
          <div className="w-[70%] md:w-[45%] lg:w-[35%] xl:w-[30%] max-w-[500px] flex justify-center items-center -translate-y-[8%]">
            <Image
              src="/images/group-1.png"
              alt="Logistics Operations"
              width={1600}
              height={1600}
              className="w-full h-auto object-contain object-center opacity-40 md:opacity-100"
            />
          </div>
        </div>
      </div>

      <div className="max-content relative z-10">
        <div className="grid md:grid-cols-2 gap-x-24 md:gap-x-48 lg:gap-x-[400px] gap-y-14 md:gap-y-24 relative max-w-[1400px] mx-auto">
          <AnimatedSection className="flex flex-col md:pr-16 lg:pr-24">
            <AnimatedItem>
              <h2 className="font-display font-bold uppercase text-[var(--color-navy-deep)] text-[12vw] md:text-[4.5rem] leading-[0.95] tracking-tight max-w-3xl">
                Delivering Trust
                <br />
                Across Every Mile
              </h2>
            </AnimatedItem>

            <div className="pt-20 md:pt-44 flex flex-col gap-14 md:gap-24">
              {leftFeatures.map((f) => (
                <AnimatedItem key={f.title} className="text-right flex flex-col items-end">
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

          <AnimatedSection className="flex flex-col gap-14 md:gap-20 md:pl-16 lg:pl-24 pt-20 md:pt-[240px] lg:pt-[320px] text-left">
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
