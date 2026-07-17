"use client";

import { ReactNode, useRef } from "react";
import { motion, useInView } from "framer-motion";
import Image from "next/image";
import { AnimatedTitleBlock, AnimatedTitleGroup, SplitText } from "@/components/ui/AnimatedTitle";

const steps = [
  {
    id: "01",
    title: "Consultation",
    body: "Understanding shipment requirements, cargo type, and logistics needs.",
    image: "/images/consultation.webp"
  },
  {
    id: "02",
    title: "Planning",
    body: "Route optimization, customs coordination, and transportation scheduling.",
    image: "/images/planning.webp"
  },
  {
    id: "03",
    title: "Warehousing",
    body: "Safe loading, warehousing, and operational management.",
    image: "/images/warehousing.webp"
  },
  {
    id: "04",
    title: "Transportation",
    body: "Efficient cargo movement through air, sea, or land transportation.",
    image: "/images/transpot.webp"
  },
  {
    id: "05",
    title: "Delivery",
    body: "Secure and timely shipment delivery with real-time tracking support.",
    image: "/images/delivery.webp"
  },
];

export function Process() {
  const panelTriggerRef = useRef(null);
  const contentTriggerRef = useRef(null);
  
  // Both triggers are independent and fire their animations once they enter the viewport
  // once: false ensures they reverse fully when you scroll back up
  const isPanelInView = useInView(panelTriggerRef, { once: false, amount: 0 });
  const isContentInView = useInView(contentTriggerRef, { once: false, amount: 0 });

  return (
    // 350vh gives plenty of scroll room between triggers and a clean exit at the bottom
    <section className="h-auto md:h-[350vh] relative z-0 w-full bg-black">
      
      <div ref={panelTriggerRef} className="absolute top-[100vh] bottom-0 left-0 w-full pointer-events-none" />
      <div ref={contentTriggerRef} className="absolute top-[102vh] bottom-0 left-0 w-full pointer-events-none" />

      {/* ========================================= */}
      {/* DESKTOP VIEW: Sticky Scroll & Horizontal Snap */}
      {/* ========================================= */}
      <div className="hidden md:flex sticky top-0 h-screen w-full overflow-hidden flex-col justify-center py-24 px-6 md:px-12">
        
        {/* The Animated Black Panel */}
        <motion.div 
          className="absolute inset-0 bg-black z-0 pointer-events-none"
          initial="hidden"
          animate={isPanelInView ? "visible" : "hidden"}
          variants={{
            hidden: { y: "100%", transition: { duration: 0.6, ease: "easeIn" } },
            visible: { y: "0%", transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] } }
          }}
          style={{ willChange: "transform" }}
        />

        {/* Background radial gradient */}
        <div className="absolute inset-0 pointer-events-none z-10 overflow-hidden">
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[120vw] h-[120vw] opacity-30" style={{ background: 'radial-gradient(circle, rgba(255,255,255,0.03) 0%, rgba(0,0,0,0) 70%)' }}></div>
        </div>

        {/* Content Wrapper */}
        <div className="max-w-[1400px] mx-auto w-full relative z-20 pt-10">
          
          <motion.div 
            initial="hidden"
            animate={isContentInView ? "visible" : "hidden"}
            variants={{
              hidden: { opacity: 0 },
              visible: { 
                opacity: 1,
                transition: { staggerChildren: 0.05, delayChildren: 0 }
              }
            }}
            className="flex md:grid md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-x-8 gap-y-12 overflow-x-auto md:overflow-visible snap-x snap-mandatory pb-8 md:pb-0 hide-scrollbar"
          >
            
            {/* Header Block (Col 1, Row 1) */}
            <motion.div 
              variants={{
                hidden: { opacity: 0, y: 40, transition: { duration: 0.4, ease: "easeIn" } },
                visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: "easeOut" } }
              }}
              className="flex flex-col justify-end items-start min-w-[85vw] sm:min-w-[300px] md:min-w-0 snap-center pb-8 md:pb-0"
            >
              <AnimatedTitleBlock>
                <h2 className="text-[var(--color-orange)] font-display font-bold text-5xl md:text-6xl lg:text-[4rem] uppercase tracking-tight mb-6">
                  Our Process
                </h2>
              </AnimatedTitleBlock>
              <AnimatedTitleGroup 
                as="h3"
                className="font-display text-white text-3xl md:text-4xl lg:text-4xl leading-[1.1] tracking-tight"
              >
                <div className="flex flex-wrap gap-x-[2vw] md:gap-x-4">
                  <SplitText text="How we move" className="pr-4 shrink-0" />
                </div>
                <div className="flex flex-wrap gap-x-[2vw] md:gap-x-4">
                  <SplitText text="your cargo across" className="pr-4 shrink-0" />
                </div>
                <div className="flex flex-wrap gap-x-[2vw] md:gap-x-4">
                  <SplitText text="the skies" className="pr-4 shrink-0" />
                </div>
              </AnimatedTitleGroup>
            </motion.div>

            {/* Process Steps */}
            {steps.map((step) => (
              <motion.div 
                key={step.id} 
                variants={{
                  hidden: { opacity: 0, y: 40, transition: { duration: 0.4, ease: "easeIn" } },
                  visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: "easeOut" } }
                }}
                className="flex flex-col group h-full min-w-[85vw] sm:min-w-[300px] md:min-w-0 snap-center"
              >
                {/* Image Container with Text Inside */}
                <div className="relative w-full aspect-[16/9] rounded-2xl overflow-hidden border border-white/5 bg-white/5 flex flex-col justify-end">
                  {/* Image Reveal Animation */}
                  <motion.div
                    variants={{
                      hidden: { opacity: 0, scale: 1.15, transition: { duration: 0.4, ease: "easeIn" } },
                      visible: { opacity: 1, scale: 1, transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1] } }
                    }}
                    className="absolute inset-0 z-0"
                  >
                    <Image 
                      src={step.image}
                      alt={step.title}
                      fill
                      className="object-cover transition-transform duration-700 group-hover:scale-105"
                      sizes="(max-width: 1200px) 50vw, 33vw"
                    />
                  </motion.div>

                  {/* Step Number Fade-Up */}
                  <motion.div
                    variants={{
                      hidden: { opacity: 0, y: 20, transition: { duration: 0.4, ease: "easeIn" } },
                      visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1], delay: 0.1 } }
                    }}
                    className="absolute top-5 left-5 z-20 text-white/20 text-5xl font-display"
                  >
                    {step.id}
                  </motion.div>
                  
                  {/* Dark gradient overlay for text readability */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent z-10 transition-opacity duration-500 group-hover:opacity-80" />

                  {/* Text Content inside the image box */}
                  <div className="relative z-20 p-5 md:p-6 flex flex-col">
                    <h3 className="text-white font-display text-2xl md:text-3xl mb-0 tracking-wide transition-all duration-500">
                      {step.title}
                    </h3>
                    <div className="overflow-hidden max-h-0 group-hover:max-h-32 transition-all duration-500 ease-in-out">
                      <p className="text-white/70 text-xs md:text-sm leading-relaxed opacity-0 group-hover:opacity-100 transition-opacity duration-500 mt-2">
                        {step.body}
                      </p>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
            
          </motion.div>
        </div>
      </div>

      {/* ========================================= */}
      {/* MOBILE VIEW: Simple Vertical List */}
      {/* ========================================= */}
      <div className="md:hidden w-full flex flex-col py-16 container-px relative z-20 bg-black">
        <div className="flex flex-col items-start justify-center mb-10">
          <h2 className="text-[var(--color-orange)] font-display font-bold text-4xl uppercase tracking-tight mb-2">
            Our Process
          </h2>
          <h3 className="font-display text-white text-2xl leading-[1.2] tracking-tight">
            How we move your cargo across the skies
          </h3>
        </div>
        
        <div className="flex flex-col gap-6 w-full">
          {steps.map((step) => (
            <div 
              key={step.id} 
              className="relative w-full aspect-[4/3] rounded-2xl overflow-hidden border border-white/10 bg-white/5 flex flex-col justify-end shadow-xl"
            >
              <Image 
                src={step.image}
                alt={step.title}
                fill
                className="object-cover"
                sizes="(max-width: 768px) 100vw"
              />
              <div className="absolute top-4 left-4 z-20 text-white/40 text-4xl font-display font-bold">
                {step.id}
              </div>
              <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent z-10" />
              
              <div className="relative z-20 p-5 flex flex-col">
                <h3 className="text-white font-display text-2xl mb-2 tracking-wide">
                  {step.title}
                </h3>
                {/* On mobile, text is ALWAYS visible, no hover mechanics needed */}
                <p className="text-white/80 text-[15px] leading-relaxed">
                  {step.body}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>

    </section>
  );
}
