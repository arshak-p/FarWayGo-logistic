"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { CaretDown } from "@phosphor-icons/react";
import { AnimatedSection, AnimatedItem } from "@/components/ui/AnimatedSection";

const faqs = [
  {
    question: "What logistics services does FarWayGo provide?",
    answer: "FarWayGo offers comprehensive logistics solutions, including customs clearance, freight forwarding (air, sea, and land), transportation, warehousing, heavy equipment rentals, project logistics, oversized cargo handling, heavy freight transport, construction logistics, FMCG distribution, and fleet management.",
  },
  {
    question: "Which industries does FarWayGo serve?",
    answer: "We support a wide range of industries, including construction, manufacturing, retail, FMCG, oil & gas, infrastructure, mining, and government sectors with tailored logistics solutions.",
  },
  {
    question: "Do you handle both domestic and international shipments?",
    answer: "Yes. We provide reliable domestic transportation within Saudi Arabia as well as international logistics solutions across the GCC and global trade routes.",
  },
  {
    question: "Can FarWayGo manage oversized or heavy cargo?",
    answer: "Absolutely. Our specialized logistics team handles oversized, heavy-lift, and project cargo using dedicated equipment, specialized trailers, route planning, and safety-compliant transportation.",
  },
  {
    question: "Do you provide warehousing services?",
    answer: "Yes. We offer secure warehousing solutions, including dry storage, temperature-controlled facilities, inventory management, barcode tracking, and flexible short- and long-term storage options.",
  },
  {
    question: "How does FarWayGo ensure shipment safety?",
    answer: "We combine experienced logistics professionals, GPS-enabled tracking, regulatory compliance, operational best practices, and strict cargo handling procedures to ensure every shipment is transported safely and efficiently.",
  },
  {
    question: "Can you provide customized logistics solutions?",
    answer: "Yes. Every business has unique logistics requirements. We work closely with our clients to develop customized transportation and supply chain solutions that improve operational efficiency and reduce costs.",
  },
  {
    question: "How can I request a quotation or logistics consultation?",
    answer: "Simply contact our team through our website, email, or phone. We'll assess your logistics requirements and provide a tailored solution and competitive quotation based on your business needs.",
  },
];

export function Faq() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const toggleOpen = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section data-cursor="white" className="-mt-[100vh] py-20 md:py-32 container-px relative z-30 bg-[var(--color-orange)]">
      <div className="max-content">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-12 lg:gap-20 items-start">
          <div className="md:col-span-5 md:sticky md:top-32">
            <AnimatedSection>
              <motion.div 
                initial="hidden"
                whileInView="visible"
                viewport={{ once: false, margin: "10000px 0px -100px 0px" }}
                className="overflow-hidden pb-4 md:pb-6 mb-4 md:mb-6"
              >
                <motion.h2 
                  variants={{
                    hidden: { y: "100%" },
                    visible: { y: "0%", transition: { duration: 1.2, ease: [0.16, 1, 0.3, 1] } }
                  }}
                  className="font-display font-semibold uppercase tracking-normal text-black text-[18vw] md:text-7xl lg:text-8xl leading-[0.85]"
                >
                  FAQ
                </motion.h2>
              </motion.div>
              <AnimatedItem delay={0.1}>
                <p className="text-black font-medium text-xl md:text-2xl mb-4">
                  Still have a doubt?
                </p>
                <p className="text-black/70 text-base md:text-lg">
                  Everything you need to know about our logistics services and operations. If you can't find your answer here, feel free to reach out to our support team.
                </p>
              </AnimatedItem>
            </AnimatedSection>
          </div>

          <div className="md:col-span-7">
          {faqs.map((faq, index) => {
            const isOpen = openIndex === index;
            return (
              <AnimatedSection key={index} className="border-b border-black/10">
                <AnimatedItem delay={index * 0.05}>
                  <button
                    onClick={() => toggleOpen(index)}
                    className="w-full py-6 md:py-8 flex items-center justify-between gap-6 text-left group focus:outline-none"
                  >
                    <span className="font-semibold text-lg md:text-xl text-black group-hover:text-black/70 transition-colors duration-300">
                      {faq.question}
                    </span>
                    <span
                      className={`flex-shrink-0 w-10 h-10 rounded-full border flex items-center justify-center transition-all duration-300 ${
                        isOpen ? "bg-black border-black text-white" : "border-black/20 text-black group-hover:border-black group-hover:bg-black/5"
                      }`}
                    >
                      <motion.div
                        animate={{ rotate: isOpen ? 180 : 0 }}
                        transition={{ duration: 0.3, ease: "easeInOut" }}
                      >
                        <CaretDown size={20} weight="bold" />
                      </motion.div>
                    </span>
                  </button>

                  <AnimatePresence>
                    {isOpen && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
                        className="overflow-hidden"
                      >
                        <div className="pb-8 text-black/80 font-medium leading-relaxed text-[15px] md:text-[16px] max-w-3xl">
                          {faq.answer}
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </AnimatedItem>
              </AnimatedSection>
            );
          })}
          </div>
        </div>
      </div>
    </section>
  );
}
