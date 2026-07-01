"use client";

import { useState } from "react";
import { MapPin, Phone, EnvelopeSimple, CaretDown } from "@phosphor-icons/react";
import { AnimatedSection, AnimatedItem } from "@/components/ui/AnimatedSection";
import { Button } from "@/components/ui/Button";

const subjects = [
  "Freight Partnership Inquiry",
  "Customs Clearance Support",
  "Warehousing & Storage",
  "Heavy Equipment Rental",
  "General Inquiry",
];

export function Contact() {
  const [submitted, setSubmitted] = useState(false);

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setSubmitted(true);
  }

  return (
    <section id="contact" className="-mt-[100vh] z-20 min-h-screen relative bg-black bg-cover bg-center container-px pt-32 md:pt-40 pb-20 md:pb-28" style={{ backgroundImage: 'url(/images/contact-bg-3.webp)' }}>
      <div className="max-content relative z-10">
        <AnimatedSection>
          <AnimatedItem>
            <h2 className="font-display font-semibold uppercase tracking-normal text-white text-[16vw] md:text-[7.5rem] leading-[0.85]">
              Contact Us
            </h2>
          </AnimatedItem>
          <AnimatedItem delay={0.06} className="mt-5 max-w-xl">
            <p className="text-white/90 text-[15.5px] leading-relaxed">
              FarWayGo operates a high-precision global network 24/7.
              Whether you need immediate technical assistance or a long-term
              logistics partnership, our specialists are standing by.
            </p>
          </AnimatedItem>
        </AnimatedSection>

        <div className="mt-14 grid lg:grid-cols-[1.3fr_1fr] gap-10">
          <AnimatedSection>
            <AnimatedItem>
              <h3 className="font-semibold text-white text-lg mb-5">
                Send a Message
              </h3>
            </AnimatedItem>

            {submitted ? (
              <AnimatedItem>
                <div className="rounded-2xl bg-black/30 backdrop-blur-md border border-white/20 p-8 text-white">
                  <p className="font-subheading text-xl mb-2">Inquiry received.</p>
                  <p className="text-white/80 text-[14.5px]">
                    A FarWayGo logistics specialist will reach out within one
                    business day.
                  </p>
                </div>
              </AnimatedItem>
            ) : (
              <form onSubmit={handleSubmit} className="grid gap-5">
                <div className="grid sm:grid-cols-2 gap-5">
                  <div>
                    <label className="text-[13px] font-semibold text-white/90 block mb-2">
                      Full Name
                    </label>
                    <input
                      required
                      type="text"
                      placeholder="John Doe"
                      className="w-full rounded-xl border border-white/20 bg-black/30 backdrop-blur-sm px-4 py-3 text-[14.5px] text-white placeholder-white/50 outline-none focus:border-[var(--color-orange)] transition-colors"
                    />
                  </div>
                  <div>
                    <label className="text-[13px] font-semibold text-white/90 block mb-2">
                      Business Email
                    </label>
                    <input
                      required
                      type="email"
                      placeholder="j.doe@enterprise.com"
                      className="w-full rounded-xl border border-white/20 bg-black/30 backdrop-blur-sm px-4 py-3 text-[14.5px] text-white placeholder-white/50 outline-none focus:border-[var(--color-orange)] transition-colors"
                    />
                  </div>
                </div>

                <div>
                  <label className="text-[13px] font-semibold text-white/90 block mb-2">
                    Subject
                  </label>
                  <div className="relative">
                    <select className="w-full appearance-none rounded-xl border border-white/20 bg-black/30 backdrop-blur-sm px-4 py-3 text-[14.5px] text-white outline-none focus:border-[var(--color-orange)] transition-colors">
                      {subjects.map((s) => (
                        <option key={s} value={s} className="bg-black/90 text-white">{s}</option>
                      ))}
                    </select>
                    <CaretDown
                      size={16}
                      className="absolute right-4 top-1/2 -translate-y-1/2 text-white/50 pointer-events-none"
                    />
                  </div>
                </div>

                <div>
                  <label className="text-[13px] font-semibold text-white/90 block mb-2">
                    Message
                  </label>
                  <textarea
                    required
                    rows={5}
                    placeholder="Describe your logistical requirements..."
                    className="w-full rounded-xl border border-white/20 bg-black/30 backdrop-blur-sm px-4 py-3 text-[14.5px] text-white placeholder-white/50 outline-none focus:border-[var(--color-orange)] transition-colors resize-none"
                  />
                </div>

                <div>
                  <Button type="submit" variant="primary">
                    Submit Inquiry
                  </Button>
                </div>
              </form>
            )}
          </AnimatedSection>

          <AnimatedSection className="flex flex-col gap-4 lg:mt-[52px]">
            <AnimatedItem className="rounded-2xl border border-white/20 bg-black/30 backdrop-blur-md p-6 flex gap-4 items-start">
              <span className="w-10 h-10 rounded-full bg-[var(--color-orange)]/20 flex items-center justify-center shrink-0">
                <MapPin size={20} weight="fill" className="text-[var(--color-orange)]" />
              </span>
              <div>
                <p className="font-semibold text-white text-[15px]">
                  Global Headquarters
                </p>
                <p className="text-white/70 text-[13.5px] mt-1">
                  Al Urubah, Ar Rahmaniyah, Riyadh, Saudi Arabia – 12341
                </p>
              </div>
            </AnimatedItem>

            <AnimatedItem className="rounded-2xl border border-white/20 bg-black/30 backdrop-blur-md p-6 flex gap-4 items-start">
              <span className="w-10 h-10 rounded-full bg-[var(--color-orange)]/20 flex items-center justify-center shrink-0">
                <Phone size={20} weight="fill" className="text-[var(--color-orange)]" />
              </span>
              <div>
                <p className="font-semibold text-white text-[15px]">
                  24/7 Support Line
                </p>
                <p className="text-[var(--color-orange)] font-semibold text-[14.5px] mt-1">
                  +1 (800) 555-0199
                </p>
                <p className="text-white/70 text-[12.5px] mt-0.5">
                  Real-time resolution for active shipments.
                </p>
              </div>
            </AnimatedItem>

            <AnimatedItem className="rounded-2xl border border-white/20 bg-black/30 backdrop-blur-md p-6 flex gap-4 items-start">
              <span className="w-10 h-10 rounded-full bg-[var(--color-orange)]/20 flex items-center justify-center shrink-0">
                <EnvelopeSimple size={20} weight="fill" className="text-[var(--color-orange)]" />
              </span>
              <div>
                <p className="font-semibold text-white text-[15px]">
                  Dedicated Email
                </p>
                <p className="text-white/70 text-[13.5px] mt-1">
                  global.ops@farwaygo.com
                </p>
              </div>
            </AnimatedItem>
          </AnimatedSection>
        </div>

        <AnimatedSection className="mt-8">
          <AnimatedItem className="rounded-2xl bg-white px-7 py-6 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-5">
            <div>
              <p className="font-semibold text-[var(--color-orange)] text-[15px]">
                Need a custom logistics solution?
              </p>
              <p className="text-[var(--color-orange)]/80 text-[13.5px] mt-1">
                Our engineering team can design a global supply chain
                tailored to your specific speed and volume requirements.
              </p>
            </div>
            <Button href="#contact" variant="primary" className="shrink-0">
              Schedule a Consultation
            </Button>
          </AnimatedItem>
        </AnimatedSection>
      </div>
    </section>
  );
}
