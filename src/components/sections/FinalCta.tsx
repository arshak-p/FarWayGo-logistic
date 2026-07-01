"use client";

import Image from "next/image";
import { AnimatedSection, AnimatedItem } from "@/components/ui/AnimatedSection";
import { Button } from "@/components/ui/Button";
import Threads from "@/components/ui/Threads";

const footerLinks = {
  Services: [
    "Freight Forwarding",
    "Transportation",
    "Warehousing",
    "Customs Clearance",
    "Heavy Equipment Rentals",
    "Fleet Management",
  ],
  Company: ["Locations", "Network Status", "Privacy Policy", "Newsletter"],
};

export function FinalCta() {
  return (
    <footer className="relative bg-black">
      {/* final CTA card overlapping the dark footer */}
      <div className="container-px relative z-10 -mb-24 md:-mb-32">
        <div className="max-content">
          <AnimatedSection>
            <AnimatedItem className="rounded-[28px] bg-[var(--color-navy)] px-8 md:px-16 py-14 md:py-20 text-center max-w-4xl mx-auto">
              <h2 className="font-display font-semibold text-white text-3xl md:text-5xl leading-tight">
                Need a Reliable Logistics Partner?
              </h2>
              <p className="text-white/60 text-[15px] md:text-base mt-5 max-w-xl mx-auto leading-relaxed">
                Move your cargo with confidence through FarWayGo&apos;s
                reliable, compliant, and end-to-end logistics support.
              </p>
              <div className="mt-8 flex justify-center">
                <Button href="#contact" variant="primary">
                  Contact Us
                </Button>
              </div>
            </AnimatedItem>
          </AnimatedSection>
        </div>
      </div>

      <div className="bg-black pt-40 md:pt-52 relative overflow-hidden">
        <Threads 
          color={[0.99, 0.37, 0.01]} 
          amplitude={1.5} 
          distance={0} 
          enableMouseInteraction={true} 
          className="absolute inset-0 z-0 opacity-40 mix-blend-screen"
        />
        
        <div className="container-px relative z-10 pointer-events-none">
          <div className="max-content pointer-events-auto">
            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-10 pb-16">
              <div>
                <p className="text-[var(--color-orange)] font-semibold uppercase text-[13px] tracking-wide mb-4">
                  FARWAYGO
                </p>
                <p className="text-white/45 text-[13.5px] leading-relaxed max-w-[220px]">
                  The global standard for industrial logistics and
                  infrastructure technology.
                </p>
              </div>

              <div>
                <p className="text-[var(--color-orange)] font-semibold uppercase text-[13px] tracking-wide mb-4">
                  SERVICES
                </p>
                <ul className="flex flex-col gap-2.5">
                  {footerLinks.Services.map((l) => (
                    <li key={l}>
                      <a
                        href="#services"
                        className="text-white/55 text-[13.5px] hover:text-white transition-colors"
                      >
                        {l}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>

              <div>
                <p className="text-[var(--color-orange)] font-semibold uppercase text-[13px] tracking-wide mb-4">
                  COMPANY
                </p>
                <ul className="flex flex-col gap-2.5">
                  {footerLinks.Company.map((l) => (
                    <li key={l}>
                      <a
                        href="#"
                        className="text-white/55 text-[13.5px] hover:text-white transition-colors"
                      >
                        {l}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>

              <div>
                <p className="text-[var(--color-orange)] font-semibold uppercase text-[13px] tracking-wide mb-4">
                  GLOBAL HQ
                </p>
                <p className="text-white/55 text-[13.5px] leading-relaxed">
                  Al Urubah, Arrahmaniyah,
                  <br />
                  Riyadh, Saudi Arabia – 12341
                </p>
                <p className="mt-3 text-[13.5px]">
                  <span className="text-white/45">call </span>
                  <a
                    href="tel:+18005550199"
                    className="text-[var(--color-orange)] font-semibold hover:underline"
                  >
                    +1 (800) 555-0199
                  </a>
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Copyright Bar */}
        <div className="bg-[var(--color-navy)] py-6 container-px mt-4 relative z-10">
          <div className="max-content flex flex-col sm:flex-row items-center justify-between gap-3">
            <p className="text-white/50 text-[12px] tracking-wide pointer-events-auto">
              © 2024 FarWayGo. Global Logistics & Infrastructure.
            </p>
            <div className="flex gap-6 pointer-events-auto">
              <a href="#" className="text-white/50 text-[12px] tracking-wide hover:text-white">
                Terms of Service
              </a>
              <a href="#" className="text-white/50 text-[12px] tracking-wide hover:text-white">
                Cookie Policy
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
