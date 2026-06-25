"use client";

import { AnimatedSection, AnimatedItem } from "@/components/ui/AnimatedSection";

const services = [
  {
    title: "Freight Forwarding",
    tag: "Air, Sea and Land",
    body: "Express shipments to bulk cargo across all modes.",
  },
  {
    title: "Transportation Services",
    tag: "Domestic & International",
    body: "Flatbeds, reefers, trailers, and oversized transport.",
  },
  {
    title: "Customs Clearance",
    tag: "GCC, Africa & Asia",
    body: "Expert documentation, duty optimization, compliance.",
  },
  {
    title: "Warehousing & Storage",
    tag: "Bonded, Dry & Cold Chain",
    body: "Inventory tracking, pick-and-pack, flexible storage.",
  },
  {
    title: "Heavy Equipment Rentals",
    tag: "Cranes, Forklifts & More",
    body: "Cranes, loaders, excavators with operational support.",
  },
  {
    title: "Project Logistics",
    tag: "Complex Cargo Handling",
    body: "Critical cargo, lifting ops, and route studies.",
  },
  {
    title: "Oversized Cargo",
    tag: "Out-of-Gauge & Heavy-Lift",
    body: "Specialized trailers, escorts, and lifting systems.",
  },
  {
    title: "Heavy Freight Transport",
    tag: "Industrial & Bulk Cargo",
    body: "Machinery, bulk cargo, construction equipment.",
  },
  {
    title: "Construction Logistics",
    tag: "Site & Mobilization",
    body: "Equipment mobilization and site logistics support.",
  },
  {
    title: "Fleet Management",
    tag: "GPS & Performance",
    body: "Monitoring, maintenance, and optimization.",
  },
];

export function Services() {
  return (
    <section id="services" className="min-h-screen relative bg-[#7dd3fc] container-px py-20 md:py-28">
      <div className="max-content">
        <AnimatedSection>
          <AnimatedItem>
            <h2 className="font-display font-semibold uppercase tracking-tighter text-[16vw] md:text-[7.5rem] leading-[0.85]">
              <span className="block text-[var(--color-navy)]">
                Our
              </span>
              <span className="block text-[var(--color-orange)]">
                Services
              </span>
            </h2>
          </AnimatedItem>
          <AnimatedItem delay={0.08} className="mt-8 max-w-xl">
            <p className="text-[var(--color-ink)]/80 text-[16px] md:text-[18px] leading-relaxed font-medium">
              From freight forwarding across continents to last-mile
              delivery, FarWayGo moves what matters on time, every time.
            </p>
          </AnimatedItem>
        </AnimatedSection>

        <AnimatedSection className="mt-20 flex flex-wrap justify-center gap-6">
          {services.map((s) => (
            <AnimatedItem 
              key={s.title} 
              className="w-full sm:w-[calc(50%-12px)] lg:w-[calc(25%-18px)] flex"
            >
              <div className="w-full h-full group rounded-2xl bg-[var(--color-cream)] border border-[var(--color-cream-line)] p-8 flex flex-col transition-all duration-300 hover:bg-[var(--color-navy)] hover:-translate-y-1.5 hover:shadow-[0_20px_40px_rgba(2,51,65,0.18)]">
                <h3 className="font-subheading font-bold text-[var(--color-orange)] text-xl leading-snug mb-3">
                  {s.title}
                </h3>
                <p className="text-[11px] uppercase tracking-wider font-bold text-[var(--color-ink)]/40 group-hover:text-white/50 transition-colors mb-4">
                  {s.tag}
                </p>
                <p className="text-[14px] font-semibold text-[var(--color-ink)]/85 group-hover:text-white/90 transition-colors leading-relaxed mt-auto">
                  {s.body}
                </p>
              </div>
            </AnimatedItem>
          ))}
        </AnimatedSection>
      </div>
    </section>
  );
}
