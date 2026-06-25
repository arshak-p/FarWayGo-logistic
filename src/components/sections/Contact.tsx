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
    <section id="contact" className="relative bg-[var(--color-mist)] container-px py-20 md:py-28">
      <div className="max-content">
        <AnimatedSection>
          <AnimatedItem>
            <h2 className="font-display font-semibold uppercase text-[var(--color-navy)] text-[14vw] md:text-6xl">
              Contact Us
            </h2>
          </AnimatedItem>
          <AnimatedItem delay={0.06} className="mt-5 max-w-xl">
            <p className="text-[var(--color-ink)]/65 text-[15.5px] leading-relaxed">
              FarWayGo operates a high-precision global network 24/7.
              Whether you need immediate technical assistance or a long-term
              logistics partnership, our specialists are standing by.
            </p>
          </AnimatedItem>
        </AnimatedSection>

        <div className="mt-14 grid lg:grid-cols-[1.3fr_1fr] gap-10">
          <AnimatedSection>
            <AnimatedItem>
              <h3 className="font-semibold text-[var(--color-navy)] text-lg mb-5">
                Send a Message
              </h3>
            </AnimatedItem>

            {submitted ? (
              <AnimatedItem>
                <div className="rounded-2xl bg-white border border-[var(--color-navy)]/10 p-8 text-[var(--color-navy)]">
                  <p className="font-subheading text-xl mb-2">Inquiry received.</p>
                  <p className="text-[var(--color-ink)]/65 text-[14.5px]">
                    A FarWayGo logistics specialist will reach out within one
                    business day.
                  </p>
                </div>
              </AnimatedItem>
            ) : (
              <form onSubmit={handleSubmit} className="grid gap-5">
                <div className="grid sm:grid-cols-2 gap-5">
                  <div>
                    <label className="text-[13px] font-semibold text-[var(--color-navy)]/80 block mb-2">
                      Full Name
                    </label>
                    <input
                      required
                      type="text"
                      placeholder="John Doe"
                      className="w-full rounded-xl border border-[var(--color-navy)]/15 bg-white px-4 py-3 text-[14.5px] outline-none focus:border-[var(--color-orange)] transition-colors"
                    />
                  </div>
                  <div>
                    <label className="text-[13px] font-semibold text-[var(--color-navy)]/80 block mb-2">
                      Business Email
                    </label>
                    <input
                      required
                      type="email"
                      placeholder="j.doe@enterprise.com"
                      className="w-full rounded-xl border border-[var(--color-navy)]/15 bg-white px-4 py-3 text-[14.5px] outline-none focus:border-[var(--color-orange)] transition-colors"
                    />
                  </div>
                </div>

                <div>
                  <label className="text-[13px] font-semibold text-[var(--color-navy)]/80 block mb-2">
                    Subject
                  </label>
                  <div className="relative">
                    <select className="w-full appearance-none rounded-xl border border-[var(--color-navy)]/15 bg-white px-4 py-3 text-[14.5px] outline-none focus:border-[var(--color-orange)] transition-colors">
                      {subjects.map((s) => (
                        <option key={s}>{s}</option>
                      ))}
                    </select>
                    <CaretDown
                      size={16}
                      className="absolute right-4 top-1/2 -translate-y-1/2 text-[var(--color-navy)]/50 pointer-events-none"
                    />
                  </div>
                </div>

                <div>
                  <label className="text-[13px] font-semibold text-[var(--color-navy)]/80 block mb-2">
                    Message
                  </label>
                  <textarea
                    required
                    rows={5}
                    placeholder="Describe your logistical requirements..."
                    className="w-full rounded-xl border border-[var(--color-navy)]/15 bg-white px-4 py-3 text-[14.5px] outline-none focus:border-[var(--color-orange)] transition-colors resize-none"
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

          <AnimatedSection className="flex flex-col gap-4">
            <AnimatedItem className="rounded-2xl border border-[var(--color-navy)]/10 bg-white p-6 flex gap-4 items-start">
              <span className="w-10 h-10 rounded-full bg-[var(--color-orange)]/10 flex items-center justify-center shrink-0">
                <MapPin size={20} weight="fill" className="text-[var(--color-orange)]" />
              </span>
              <div>
                <p className="font-semibold text-[var(--color-navy)] text-[15px]">
                  Global Headquarters
                </p>
                <p className="text-[var(--color-ink)]/60 text-[13.5px] mt-1">
                  Al Urubah, Ar Rahmaniyah, Riyadh, Saudi Arabia – 12341
                </p>
              </div>
            </AnimatedItem>

            <AnimatedItem className="rounded-2xl border border-[var(--color-navy)]/10 bg-white p-6 flex gap-4 items-start">
              <span className="w-10 h-10 rounded-full bg-[var(--color-orange)]/10 flex items-center justify-center shrink-0">
                <Phone size={20} weight="fill" className="text-[var(--color-orange)]" />
              </span>
              <div>
                <p className="font-semibold text-[var(--color-navy)] text-[15px]">
                  24/7 Support Line
                </p>
                <p className="text-[var(--color-orange)] font-semibold text-[14.5px] mt-1">
                  +1 (800) 555-0199
                </p>
                <p className="text-[var(--color-ink)]/55 text-[12.5px] mt-0.5">
                  Real-time resolution for active shipments.
                </p>
              </div>
            </AnimatedItem>

            <AnimatedItem className="rounded-2xl border border-[var(--color-navy)]/10 bg-white p-6 flex gap-4 items-start">
              <span className="w-10 h-10 rounded-full bg-[var(--color-orange)]/10 flex items-center justify-center shrink-0">
                <EnvelopeSimple size={20} weight="fill" className="text-[var(--color-orange)]" />
              </span>
              <div>
                <p className="font-semibold text-[var(--color-navy)] text-[15px]">
                  Dedicated Email
                </p>
                <p className="text-[var(--color-ink)]/60 text-[13.5px] mt-1">
                  global.ops@farwaygo.com
                </p>
              </div>
            </AnimatedItem>
          </AnimatedSection>
        </div>

        <AnimatedSection className="mt-8">
          <AnimatedItem className="rounded-2xl bg-[var(--color-navy)] px-7 py-6 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-5">
            <div>
              <p className="font-semibold text-white text-[15px]">
                Need a custom logistics solution?
              </p>
              <p className="text-white/55 text-[13.5px] mt-1">
                Our engineering team can design a global supply chain
                tailored to your specific speed and volume requirements.
              </p>
            </div>
            <Button href="#contact" variant="outline-light" className="shrink-0">
              Schedule a Consultation
            </Button>
          </AnimatedItem>
        </AnimatedSection>
      </div>
    </section>
  );
}
