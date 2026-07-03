"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { MapPin, Phone, EnvelopeSimple, CaretDown, CheckCircle } from "@phosphor-icons/react";
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
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setLoading(true);
    setError("");
    const formData = new FormData(e.currentTarget);
    formData.append("access_key", "01ee2b70-09d9-41a9-b517-0e838f83efdd");
    
    try {
      const response = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        body: formData
      });
      if (response.ok) {
        setSubmitted(true);
      } else {
        setError("Something went wrong. Please try again.");
      }
    } catch (err) {
      console.error(err);
      setError("Network error. Please try again.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <section id="contact" className="-mt-[100vh] z-20 min-h-screen relative overflow-hidden bg-cover bg-bottom bg-no-repeat container-px pt-32 md:pt-40 pb-20 md:pb-28" style={{ backgroundImage: 'url(/images/contact-bg-3.webp)' }}>
      <div className="max-content relative z-10">
        <AnimatedSection>
          <AnimatedItem delay={0.6}>
            <h2 className="font-display font-semibold uppercase tracking-normal text-white text-[16vw] md:text-[7.5rem] leading-[0.85]">
              Contact Us
            </h2>
          </AnimatedItem>
          <AnimatedItem delay={0.7} className="mt-5 max-w-xl">
            <p className="text-white/90 text-[15.5px] leading-relaxed">
              FarWayGo operates a high-precision global network 24/7.
              Whether you need immediate technical assistance or a long-term
              logistics partnership, our specialists are standing by.
            </p>
          </AnimatedItem>
        </AnimatedSection>

        <div className="mt-14 grid lg:grid-cols-[1.3fr_1fr] gap-10">
          <AnimatedSection>
            <AnimatedItem delay={0.8}>
              <h3 className="font-semibold text-white text-lg mb-5">
                Send a Message
              </h3>
            </AnimatedItem>

            {submitted ? (
              <motion.div
                initial={{ opacity: 0, scale: 0.95, y: 10 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
                className="rounded-2xl bg-black/40 backdrop-blur-xl border border-[var(--color-orange)]/50 p-10 text-white flex flex-col items-center justify-center text-center shadow-[0_0_40px_rgba(255,107,0,0.15)] mt-4"
              >
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ delay: 0.2, type: "spring", stiffness: 200, damping: 15 }}
                  className="w-16 h-16 rounded-full bg-[var(--color-orange)]/20 flex items-center justify-center mb-6"
                >
                  <CheckCircle size={36} weight="fill" className="text-[var(--color-orange)]" />
                </motion.div>
                <h4 className="font-display font-semibold text-3xl mb-3 tracking-wide">Message Sent Successfully</h4>
                <p className="text-white/80 text-[15.5px] leading-relaxed max-w-md">
                  Thank you for reaching out to FarWayGo. A logistics specialist has received your inquiry and will contact you within one business day.
                </p>
              </motion.div>
            ) : (
              <form onSubmit={handleSubmit} className="grid gap-5">
                <div className="grid sm:grid-cols-2 gap-5">
                  <div>
                    <label className="text-[13px] font-semibold text-white/90 block mb-2">
                      Full Name
                    </label>
                    <input
                      name="name"
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
                      name="email"
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
                    <select name="subject" className="w-full appearance-none rounded-xl border border-white/20 bg-black/30 backdrop-blur-sm px-4 py-3 text-[14.5px] text-white outline-none focus:border-[var(--color-orange)] transition-colors">
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
                    name="message"
                    required
                    rows={5}
                    placeholder="Describe your logistical requirements..."
                    className="w-full rounded-xl border border-white/20 bg-black/30 backdrop-blur-sm px-4 py-3 text-[14.5px] text-white placeholder-white/50 outline-none focus:border-[var(--color-orange)] transition-colors resize-none"
                  />
                </div>

                <div>
                  <Button type="submit" variant="primary">
                    {loading ? "Submitting..." : "Submit Inquiry"}
                  </Button>
                  {error && <p className="text-red-400 text-sm mt-3">{error}</p>}
                </div>
              </form>
            )}
          </AnimatedSection>

          <AnimatedSection className="flex flex-col gap-4 lg:mt-[52px]">
            <AnimatedItem className="group rounded-2xl border border-white/20 bg-black/30 backdrop-blur-md p-6 flex gap-4 items-start relative hover:bg-black/50 hover:border-white/40 transition-all cursor-pointer">
              <a 
                href="https://www.google.com/maps/search/?api=1&query=Al+Urubah,+Ar+Rahmaniyah,+Riyadh,+Saudi+Arabia+12341"
                target="_blank"
                rel="noopener noreferrer"
                className="absolute inset-0 z-10 rounded-2xl"
                aria-label="View on Google Maps"
              />
              <span className="w-10 h-10 rounded-full bg-[var(--color-orange)]/20 flex items-center justify-center shrink-0 relative z-0 group-hover:scale-110 transition-transform">
                <MapPin size={20} weight="fill" className="text-[var(--color-orange)]" />
              </span>
              <div className="relative z-0">
                <p className="font-semibold text-white text-[15px]">
                  Global Headquarters
                </p>
                <p className="text-white/70 text-[13.5px] mt-1 group-hover:text-white transition-colors">
                  Al Urubah, Ar Rahmaniyah, Riyadh, Saudi Arabia – 12341
                </p>
              </div>
            </AnimatedItem>

            <AnimatedItem className="group rounded-2xl border border-white/20 bg-black/30 backdrop-blur-md p-6 flex gap-4 items-start relative hover:bg-black/50 hover:border-white/40 transition-all cursor-pointer">
              <a 
                href="tel:+18005550199"
                className="absolute inset-0 z-10 rounded-2xl"
                aria-label="Call 24/7 Support Line"
              />
              <span className="w-10 h-10 rounded-full bg-[var(--color-orange)]/20 flex items-center justify-center shrink-0 relative z-0 group-hover:scale-110 transition-transform">
                <Phone size={20} weight="fill" className="text-[var(--color-orange)]" />
              </span>
              <div className="relative z-0">
                <p className="font-semibold text-white text-[15px]">
                  24/7 Support Line
                </p>
                <p className="text-[var(--color-orange)] font-semibold text-[14.5px] mt-1">
                  +1 (800) 555-0199
                </p>
                <p className="text-white/70 text-[12.5px] mt-0.5 group-hover:text-white/90 transition-colors">
                  Real-time resolution for active shipments.
                </p>
              </div>
            </AnimatedItem>

            <AnimatedItem className="group rounded-2xl border border-white/20 bg-black/30 backdrop-blur-md p-6 flex gap-4 items-start relative hover:bg-black/50 hover:border-white/40 transition-all cursor-pointer">
              <a 
                href="mailto:global.ops@farwaygo.com"
                className="absolute inset-0 z-10 rounded-2xl"
                aria-label="Send an email"
              />
              <span className="w-10 h-10 rounded-full bg-[var(--color-orange)]/20 flex items-center justify-center shrink-0 relative z-0 group-hover:scale-110 transition-transform">
                <EnvelopeSimple size={20} weight="fill" className="text-[var(--color-orange)]" />
              </span>
              <div className="relative z-0">
                <p className="font-semibold text-white text-[15px]">
                  Dedicated Email
                </p>
                <p className="text-white/70 text-[13.5px] mt-1 group-hover:text-white transition-colors">
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
