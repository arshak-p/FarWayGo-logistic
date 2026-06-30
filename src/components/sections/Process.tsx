"use client";

import { EyebrowBadge } from "@/components/ui/EyebrowBadge";
import { motion, useInView } from "framer-motion";
import Image from "next/image";
import { useRef } from "react";

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
    // 250vh gives plenty of scroll room between triggers and a clean exit at the bottom
    <section className="h-[250vh] relative z-20 w-full bg-transparent">
      
      {/* 
        1. PANEL TRIGGER: Placed exactly at 100vh.
        When the top of this section pins to the top of the screen, the bottom of your screen 
        crosses the 100vh mark, triggering the panel to slide up. 
        When scrolling back up, it leaves the screen exactly at this point, sliding the panel away.
      */}
      <div ref={panelTriggerRef} className="absolute top-[100vh] bottom-0 left-0 w-full pointer-events-none" />

      {/* 
        2. CONTENT TRIGGER: Placed at 160vh.
        You must scroll 60vh INTO the pinned section before this hits the bottom of your screen.
        When scrolling back up, this exits the screen first (at 60vh), making the content disappear BEFORE the panel.
      */}
      <div ref={contentTriggerRef} className="absolute top-[160vh] bottom-0 left-0 w-full pointer-events-none" />

      {/* The sticky wrapper holds the UI on screen while we scroll through the triggers */}
      <div className="sticky top-0 h-screen w-full overflow-hidden flex flex-col justify-center py-24 px-6 md:px-12">
        
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
                transition: { staggerChildren: 0.15, delayChildren: 0.1 }
              }
            }}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-12"
          >
            
            {/* Header Block (Col 1, Row 1) */}
            <motion.div 
              variants={{
                hidden: { opacity: 0, y: 40, transition: { duration: 0.6, ease: "easeIn" } },
                visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: "easeOut" } }
              }}
              className="flex flex-col items-start justify-start"
            >
              <EyebrowBadge variant="orange">Our Process</EyebrowBadge>
              <h2 className="font-display text-white text-5xl md:text-6xl lg:text-[4rem] leading-[1.1] tracking-tight mt-6">
                How we move<br/>your cargo across<br/>the skies
              </h2>
            </motion.div>

            {/* Process Steps */}
            {steps.map((step) => (
              <motion.div 
                key={step.id} 
                variants={{
                  hidden: { opacity: 0, y: 40, transition: { duration: 0.6, ease: "easeIn" } },
                  visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: "easeOut" } }
                }}
                className="flex flex-col group h-full"
              >
                {/* Image Container with Text Inside */}
                <div className="relative w-full aspect-[16/9] rounded-2xl overflow-hidden border border-white/5 bg-white/5 flex flex-col justify-end">
                  {/* Image Reveal Animation */}
                  <motion.div
                    variants={{
                      hidden: { opacity: 0, scale: 1.15, transition: { duration: 0.6, ease: "easeIn" } },
                      visible: { opacity: 1, scale: 1, transition: { duration: 0.9, ease: [0.16, 1, 0.3, 1] } }
                    }}
                    className="absolute inset-0 z-0"
                  >
                    <Image 
                      src={step.image}
                      alt={step.title}
                      fill
                      className="object-cover transition-transform duration-700 group-hover:scale-105"
                      sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                    />
                  </motion.div>

                  {/* Step Number Fade-Up */}
                  <motion.div
                    variants={{
                      hidden: { opacity: 0, y: 20, transition: { duration: 0.6, ease: "easeIn" } },
                      visible: { opacity: 1, y: 0, transition: { duration: 0.9, ease: [0.16, 1, 0.3, 1], delay: 0.1 } }
                    }}
                    className="absolute top-5 left-5 z-20 text-white/20 text-5xl font-display"
                  >
                    {step.id}
                  </motion.div>
                  
                  {/* Dark gradient overlay for text readability */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent z-10 transition-opacity duration-500 group-hover:opacity-80" />

                  {/* Text Content inside the image box */}
                  <div className="relative z-20 p-5 md:p-6 flex flex-col">
                    <h3 className="text-white font-display text-2xl md:text-3xl mb-2 tracking-wide">
                      {step.title}
                    </h3>
                    <p className="text-white/70 text-xs md:text-sm leading-relaxed">
                      {step.body}
                    </p>
                  </div>
                </div>
              </motion.div>
            ))}
            
          </motion.div>
        </div>
      </div>
    </section>
  );
}
