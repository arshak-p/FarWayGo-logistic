"use client";

import { useEffect, useRef, useState } from "react";
import { EyebrowBadge } from "@/components/ui/EyebrowBadge";
import { AnimatePresence, motion } from "framer-motion";
import { useLenis } from "@/components/providers/SmoothScrollProvider";

const services = [
  { id: "1", title: "Freight Forwarding", tag: "Air, Sea and Land", body: "Express shipments to bulk cargo across all modes." },
  { id: "2", title: "Transportation Services", tag: "Domestic & International", body: "Flatbeds, reefers, trailers, and oversized transport." },
  { id: "3", title: "Customs Clearance", tag: "GCC, Africa & Asia", body: "Expert documentation, duty optimization, compliance." },
  { id: "4", title: "Warehousing & Storage", tag: "Bonded, Dry & Cold Chain", body: "Inventory tracking, pick-and-pack, flexible storage." },
  { id: "5", title: "Heavy Equipment Rentals", tag: "Cranes, Forklifts & More", body: "Cranes, loaders, excavators with operational support." },
  { id: "6", title: "Project Logistics", tag: "Complex Cargo Handling", body: "Critical cargo, lifting ops, and route studies." },
  { id: "7", title: "Oversized Cargo", tag: "Out-of-Gauge & Heavy-Lift", body: "Specialized trailers, escorts, and lifting systems." },
  { id: "8", title: "Heavy Freight Transport", tag: "Industrial & Bulk Cargo", body: "Machinery, bulk cargo, construction equipment." },
  { id: "9", title: "Construction Logistics", tag: "Site & Mobilization", body: "Equipment mobilization and site logistics support." },
  { id: "10", title: "Fleet Management", tag: "GPS & Performance", body: "Monitoring, maintenance, and optimization." },
];

export function Services() {
  const sectionRef = useRef<HTMLElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const lenis = useLenis();
  
  const [activePairIndex, setActivePairIndex] = useState(-1);
  const prevPairIndexRef = useRef(-1);
  
  const tickingRef = useRef(false);
  const seekingRef = useRef(false);
  const scrollTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    const handleSeeking = () => { seekingRef.current = true; };
    const handleSeeked = () => { seekingRef.current = false; };
    video.addEventListener("seeking", handleSeeking);
    video.addEventListener("seeked", handleSeeked);

    const updateScroll = () => {
      if (sectionRef.current && videoRef.current) {
        const rect = sectionRef.current.getBoundingClientRect();
        
        // Total distance we can scroll while section is pinned
        const scrollableDistance = rect.height - window.innerHeight;
        
        // Calculate raw progress 0 to 1
        let progress = -rect.top / scrollableDistance;
        progress = Math.max(0, Math.min(1, progress));
        
        // 1. Scrub video (100% ref-based) with seeking lock and sub-frame guard
        if (videoRef.current.duration && !seekingRef.current) {
          const targetTime = progress * videoRef.current.duration;
          const diff = Math.abs(videoRef.current.currentTime - targetTime);
          if (diff > 0.008) {
            videoRef.current.currentTime = targetTime;
          }
        }

        // 2. Compute adjusted progress for cards
        const START_DELAY = 0.20;
        let adjustedProgress = Math.max(0, (progress - START_DELAY) / (1 - START_DELAY));
        adjustedProgress = Math.min(1, adjustedProgress);
        
        // 3. Compute pair index (5 pairs total)
        let pairIndex = -1;
        if (progress >= START_DELAY) {
          pairIndex = Math.floor(adjustedProgress * 5.2);
          if (pairIndex >= 5) pairIndex = 4;
        }

        // 4. Update state only on actual index change
        if (pairIndex !== prevPairIndexRef.current) {
          prevPairIndexRef.current = pairIndex;
          setActivePairIndex(pairIndex);
        }

        // 5. JS Settle (debounce to nearest pair boundary)
        if (scrollTimeoutRef.current) clearTimeout(scrollTimeoutRef.current);
        scrollTimeoutRef.current = setTimeout(() => {
          if (progress > START_DELAY && progress < 0.99 && lenis) {
            const currentPair = Math.min(4, Math.max(0, Math.floor(adjustedProgress * 5.2)));
            const targetAdjusted = (currentPair + 0.5) / 5.2; // center of the pair's band
            const targetProgress = START_DELAY + targetAdjusted * (1 - START_DELAY);
            const targetY = sectionRef.current!.offsetTop + targetProgress * scrollableDistance;
            
            lenis.scrollTo(targetY, { duration: 1.2 });
          }
        }, 150);
      }
      tickingRef.current = false;
    };

    const onScroll = () => {
      if (!tickingRef.current) {
        tickingRef.current = true;
        requestAnimationFrame(updateScroll);
      }
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
    
    return () => {
      window.removeEventListener("scroll", onScroll);
      video.removeEventListener("seeking", handleSeeking);
      video.removeEventListener("seeked", handleSeeked);
      if (scrollTimeoutRef.current) clearTimeout(scrollTimeoutRef.current);
    };
  }, [lenis]);

  const activePair = activePairIndex >= 0 ? services.slice(activePairIndex * 2, activePairIndex * 2 + 2) : [];


  return (
    <section 
      id="services" 
      ref={sectionRef} 
      className="relative w-full h-[800vh] bg-black"
    >
      <div className="sticky top-0 h-screen w-full overflow-hidden flex items-center justify-center">
        
        {/* Background Scrub Video */}
        <video 
          ref={videoRef}
          src="/videos/services-scrub-v2.mp4"
          className="absolute inset-0 w-full h-full object-cover"
          muted
          playsInline
          preload="auto"
        />


        {/* Content Overlays */}
        <div className="absolute inset-0 flex items-center justify-center container-px z-20 pointer-events-none">
          <div className="w-full max-w-6xl mx-auto relative h-full flex flex-col justify-center">
            
            {/* Header */}
            <div className="absolute top-24 left-0 md:left-auto">
              <EyebrowBadge variant="orange">Our Services</EyebrowBadge>
            </div>

            {/* Service Cards Staggered Reveal */}
            <div className="relative w-full flex items-center justify-center">
              <AnimatePresence mode="wait">
                {activePairIndex >= 0 && (
                  <motion.div 
                    key={activePairIndex}
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -30 }}
                    transition={{ type: "tween", duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
                    className="flex flex-col md:flex-row items-stretch justify-center gap-16 md:gap-32 w-full pointer-events-auto"
                  >
                    {activePair.map((service) => (
                      <div 
                        key={service.id} 
                        className="flex-1 min-w-0 bg-white/10 backdrop-blur-md border border-white/20 p-8 md:p-12 rounded-3xl shadow-2xl flex flex-col justify-center"
                      >
                        <p className="text-[var(--color-orange)] text-sm font-bold tracking-widest uppercase mb-4">
                          {service.id.padStart(2, '0')} // {service.tag}
                        </p>
                        <h3 className="text-3xl md:text-4xl font-display text-white leading-tight mb-4">
                          {service.title}
                        </h3>
                        <p className="text-white/80 text-base md:text-lg font-medium">
                          {service.body}
                        </p>
                      </div>
                    ))}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
            
          </div>
        </div>
        
      </div>
    </section>
  );
}
