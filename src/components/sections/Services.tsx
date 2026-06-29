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
    <section id="services" className="min-h-screen relative bg-transparent container-px py-20 md:py-28">
      <div className="max-content">
        <div>
          <div>
            <h2 className="font-display font-semibold uppercase tracking-normal text-[16vw] md:text-[7.5rem] leading-[0.85]">
              <span className="block text-[var(--color-navy)]">
                Our
              </span>
              <span className="block text-[var(--color-orange)]">
                Services
              </span>
            </h2>
          </div>
          <div className="mt-8 max-w-xl">
            <p className="text-[var(--color-ink)]/80 text-[16px] md:text-[18px] leading-relaxed font-medium">
              From freight forwarding across continents to last-mile
              delivery, FarWayGo moves what matters on time, every time.
            </p>
          </div>
        </div>

        <div className="mt-20 flex flex-wrap justify-start gap-6">
          {services.map((s) => (
            <div 
              key={s.title} 
              className="w-full sm:w-[calc(50%-12px)] lg:w-[calc(25%-18px)] flex"
            >
              <div 
                className="w-full h-full group relative overflow-hidden rounded-r-3xl rounded-l-md p-8 flex flex-col transition-transform duration-500 bg-[var(--color-cream)] border-[var(--color-cream-line)] hover:border-transparent hover:shadow-[0_20px_40px_rgba(253,94,2,0.25)] hover:scale-[1.02]"
              >
                {/* Expanding Background Layer (Hover) - Optimized with scaleX instead of width */}
                <div className="absolute inset-0 bg-[var(--color-orange)] z-0 origin-left scale-x-0 opacity-0 group-hover:scale-x-100 group-hover:opacity-100 transition-all duration-500 ease-[cubic-bezier(0.23,1,0.32,1)]" />

                <h3 className="relative z-10 font-subheading font-bold text-xl leading-snug mb-3 transition-colors duration-300 text-[var(--color-orange)] group-hover:text-white">
                  {s.title}
                </h3>
                <p className="relative z-10 text-[11px] uppercase tracking-wider font-bold mb-4 transition-colors duration-300 text-[var(--color-ink)]/40 group-hover:text-white/75">
                  {s.tag}
                </p>
                <p className="relative z-10 text-[14px] font-semibold leading-relaxed mt-auto transition-colors duration-300 text-[var(--color-ink)]/85 group-hover:text-white/95">
                  {s.body}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
