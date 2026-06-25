"use client";

import { CheckCircle, HandCoins, ShieldCheck, Globe } from "@phosphor-icons/react";
import { AnimatedSection, AnimatedItem } from "@/components/ui/AnimatedSection";

const stats = [
  {
    icon: CheckCircle,
    value: "5+",
    label: "Years Experience",
    body: "Bringing expertise and industry knowledge to deliver the best logistics solutions.",
    bg: "bg-[var(--color-navy)]",
    text: "text-white",
    sub: "text-white/70",
  },
  {
    icon: HandCoins,
    value: "240+",
    label: "Successful Deliveries",
    body: "A proven track record of delivering excellence across diverse cargo and destinations.",
    bg: "bg-[var(--color-orange)]",
    text: "text-white",
    sub: "text-white/75",
  },
  {
    icon: ShieldCheck,
    value: "100%",
    label: "Cargo Safety Commitment",
    body: "Your cargo's safety is our top priority, every step of the way.",
    bg: "bg-[var(--color-mist-dim)]",
    text: "text-[var(--color-navy)]",
    sub: "text-[var(--color-ink)]/55",
  },
  {
    icon: Globe,
    value: "GCC &",
    label: "International Operations",
    body: "Operating across the GCC and globally to connect businesses to the world.",
    bg: "bg-white",
    text: "text-[var(--color-navy-soft)]",
    sub: "text-[var(--color-ink)]/55",
  },
];

export function About() {
  return (
    <section id="about" className="min-h-screen relative bg-[#7dd3fc] container-px py-20 md:py-28">
      <div className="max-content">
        <div className="grid md:grid-cols-2 gap-12 lg:gap-24 items-start">
          <AnimatedSection>
            <AnimatedItem>
              <h2 className="font-display font-semibold uppercase text-[var(--color-navy)] text-[18vw] md:text-[8rem] leading-[0.85] tracking-tighter">
                About Us
              </h2>
            </AnimatedItem>
          </AnimatedSection>

          <AnimatedSection className="flex flex-col gap-6 md:pt-6">
            <AnimatedItem>
              <h3 className="font-subheading font-semibold uppercase text-[var(--color-navy)] text-3xl md:text-4xl tracking-tight">
                We Are <span className="text-[var(--color-orange)]">Farwaygo</span>
              </h3>
            </AnimatedItem>
            
            <AnimatedItem delay={0.06} className="text-[var(--color-ink)]/80 text-[16px] leading-relaxed">
              FarWayGo is a dynamic logistics and transportation solutions
              provider based in Riyadh, Saudi Arabia. Operating under Halloul
              Al Riadeh Co. Ltd., we combine fleet ownership, advanced
              logistics systems, and industry expertise to deliver seamless
              end-to-end transportation services across multiple industries.
            </AnimatedItem>
            
            <AnimatedItem delay={0.12} className="text-[var(--color-ink)]/80 text-[16px] leading-relaxed">
              Our integrated logistics network enables businesses to manage
              transportation, warehousing, heavy equipment rentals, and
              project cargo handling through one reliable partner. We focus
              on operational efficiency, cargo safety, and long-term business
              partnerships.
            </AnimatedItem>
          </AnimatedSection>
        </div>

        {/* Stats 4-column grid */}
        <div className="mt-20 md:mt-32">
          <AnimatedSection className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {stats.map((s) => (
              <AnimatedItem
                key={s.label}
                className={`rounded-[2rem] p-8 flex flex-col items-center text-center gap-4 ${s.bg} ${s.text} ${s.bg === 'bg-white' ? 'shadow-[0_20px_40px_rgba(2,51,65,0.08)]' : ''}`}
              >
                <span className="w-16 h-16 rounded-full bg-black/10 flex items-center justify-center mb-2">
                  <s.icon size={32} weight="regular" />
                </span>
                <div className="flex flex-col items-center">
                  <p className="font-subheading font-bold text-4xl md:text-5xl">{s.value}</p>
                  <p className="font-subheading uppercase text-sm md:text-[13px] font-semibold tracking-wide mt-3 px-2">
                    {s.label}
                  </p>
                </div>
                <div className="w-8 h-px bg-current opacity-20 my-2" />
                <p className={`text-[13px] leading-relaxed mt-1 ${s.sub}`}>{s.body}</p>
              </AnimatedItem>
            ))}
          </AnimatedSection>
        </div>
      </div>
    </section>
  );
}
