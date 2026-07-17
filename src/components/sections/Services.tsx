"use client";

import { useEffect, useRef, useState, useCallback } from "react";
import { EyebrowBadge } from "@/components/ui/EyebrowBadge";
import { AnimatePresence, motion, useInView } from "framer-motion";
import { useLenis } from "@/components/providers/SmoothScrollProvider";
import { CaretDown } from "@phosphor-icons/react";
import { MediaCache } from "@/components/ui/Preloader";

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
  
  const tickingRef = useRef(false);
  const scrollTimeoutRef = useRef<NodeJS.Timeout | null>(null);
  const lenis = useLenis();
  
  const sectionTopRef = useRef(0);
  const sectionHeightRef = useRef(0);
  
  const [activePairIndex, setActivePairIndex] = useState(-1);
  const [direction, setDirection] = useState(1);
  const prevPairIndexRef = useRef(-1);
  const [videoLoaded, setVideoLoaded] = useState(false);
  
  const [videoSrc, setVideoSrc] = useState<string | null>(null);

  const panelTriggerRef = useRef<HTMLDivElement>(null);
  const isPanelInView = useInView(panelTriggerRef, { once: false, amount: 0, margin: "10000px 0px 0px 0px" });

  useEffect(() => {
    const checkBlob = () => {
      if (MediaCache.videoUrl && MediaCache.videoUrl.startsWith("blob:")) {
        setVideoSrc(MediaCache.videoUrl);
        return true;
      }
      return false;
    };
    
    if (!checkBlob()) {
      const id = setInterval(() => {
        if (checkBlob()) clearInterval(id);
      }, 100);
      return () => clearInterval(id);
    }
  }, []);

  const recalcBounds = useCallback(() => {
    if (sectionRef.current) {
      sectionTopRef.current = sectionRef.current.offsetTop;
      sectionHeightRef.current = sectionRef.current.offsetHeight;
    }
  }, []);

  useEffect(() => {
    window.addEventListener("resize", recalcBounds);
    recalcBounds();
    return () => window.removeEventListener("resize", recalcBounds);
  }, [recalcBounds]);

  // Scroll Engine
  useEffect(() => {
    const START_DELAY = 0.20;
    
    const getPairIndex = (prog: number) => {
      let adj = Math.max(0, (prog - START_DELAY) / (1 - START_DELAY));
      adj = Math.min(1, adj);
      if (prog < START_DELAY) return -1;
      return Math.min(4, Math.floor(adj * 5));
    };

    const updateScroll = () => {
      if (sectionHeightRef.current > 0) {
        const scrollableDistance = sectionHeightRef.current - window.innerHeight;
        const scrollY = window.scrollY;
        
        let progress = (scrollY - sectionTopRef.current) / scrollableDistance;
        progress = Math.max(0, Math.min(1, progress));
        
        // Scrub Video
        if (videoRef.current && videoRef.current.duration) {
          const targetTime = progress * videoRef.current.duration;
          // Only update currentTime if the difference is larger than 30ms to prevent decoder thrashing on mobile
          if (Math.abs(videoRef.current.currentTime - targetTime) > 0.03) {
            videoRef.current.currentTime = targetTime;
          }
        }

        // Pair Logic
        const pairIndex = getPairIndex(progress);

        if (pairIndex !== prevPairIndexRef.current) {
          setDirection(pairIndex > prevPairIndexRef.current ? 1 : -1);
          prevPairIndexRef.current = pairIndex;
          setActivePairIndex(pairIndex);
        }
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
    // Run once on mount after a tiny delay to ensure layout is ready
    setTimeout(onScroll, 100);
    
    return () => {
      window.removeEventListener("scroll", onScroll);
      if (scrollTimeoutRef.current) clearTimeout(scrollTimeoutRef.current);
    };
  }, [lenis]);

  const activePair = activePairIndex >= 0 ? services.slice(activePairIndex * 2, activePairIndex * 2 + 2) : [];

  return (
    <section 
      id="services" 
      ref={sectionRef} 
      className="relative w-full h-[1200vh] bg-transparent z-10"
    >
      <div ref={panelTriggerRef} className="absolute top-[100vh] bottom-0 left-0 w-full pointer-events-none" />

      <div className="sticky top-0 h-screen w-full overflow-hidden flex items-center justify-center">
        
        {/* Loading Overlay */}
        <AnimatePresence>
          {!videoLoaded && (
            <motion.div 
              initial={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.5 }}
              className="absolute inset-0 z-50 bg-black flex flex-col items-center justify-center"
            >
              <div className="mb-8">
                <EyebrowBadge variant="orange">Loading Assets</EyebrowBadge>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Video Wrapper */}
        <motion.div
          className="absolute inset-0 z-0 overflow-hidden"
          initial="hidden"
          animate={isPanelInView ? "visible" : "hidden"}
          variants={{
            hidden: { y: "100%", transition: { duration: 0.6, ease: "easeIn" } },
            visible: { y: "0%", transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] } }
          }}
          style={{ willChange: "transform" }}
        >
          <div className="absolute inset-0 bg-black" />
          <video 
            ref={videoRef}
            src={videoSrc || undefined}
            className="absolute inset-0 w-full h-full object-cover"
            playsInline
            muted
            preload="auto"
            onCanPlayThrough={() => setVideoLoaded(true)}
            onLoadedData={() => setVideoLoaded(true)}
          />
        </motion.div>

        {/* Content Overlays */}
        <div className="absolute inset-0 flex items-center justify-center container-px z-20 pointer-events-none">
          <div className="w-full max-w-6xl mx-auto relative h-full flex flex-col justify-center">
            
            {/* Header */}
            <div className="absolute top-12 md:top-20 w-full flex flex-col items-center justify-center pointer-events-none z-30">
              <h2 className="text-3xl md:text-5xl lg:text-6xl font-display font-bold text-white uppercase tracking-tight text-center drop-shadow-xl">
                Our <span className="text-[var(--color-orange)]">Services</span>
              </h2>
              <motion.div 
                className="mt-4 text-[var(--color-orange)] drop-shadow-md"
                animate={{ y: [0, 8, 0] }}
                transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
              >
                <CaretDown size={32} weight="bold" />
              </motion.div>
            </div>

            {/* Service Cards */}
            <div className="relative w-full flex items-center justify-center">
              <AnimatePresence custom={direction}>
                {activePairIndex >= 0 && (
                  <motion.div 
                    key={activePairIndex}
                    custom={direction}
                    variants={{
                      enter: (dir: number) => ({
                        opacity: 1,
                        x: dir === 1 ? '-100vw' : '100vw',
                        scale: 1
                      }),
                      center: {
                        opacity: 1,
                        x: 0,
                        scale: 1
                      },
                      exit: (dir: number) => ({
                        opacity: 1,
                        x: dir === 1 ? '100vw' : '-100vw',
                        scale: 1
                      })
                    }}
                    initial="enter"
                    animate="center"
                    exit="exit"
                    transition={{ type: "spring", stiffness: 90, damping: 20, mass: 1 }}
                    className="absolute grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8 md:gap-24 w-full max-w-5xl pointer-events-auto"
                    style={{ perspective: 1000, willChange: "transform, opacity" }}
                  >
                    {activePair.map((service, idx) => (
                      <motion.div 
                        key={service.id} 
                        animate={{ y: [0, idx === 0 ? -15 : -10, 0] }}
                        transition={{ duration: idx === 0 ? 4 : 4.5, repeat: Infinity, ease: "easeInOut" }}
                        className="h-auto py-8 px-5 sm:px-6 md:h-[250px] md:p-6 w-full min-w-0 bg-black/60 backdrop-blur-xl border border-white/10 rounded-3xl shadow-2xl flex flex-col justify-center will-change-transform transform-gpu"
                        style={{ WebkitBackfaceVisibility: "hidden", backfaceVisibility: "hidden" }}
                      >
                        <p className="text-[var(--color-orange)] text-sm md:text-base font-bold tracking-widest uppercase mb-3">
                          {service.id.padStart(2, '0')} // {service.tag}
                        </p>
                        <h3 className="text-2xl sm:text-3xl md:text-4xl font-display text-white leading-tight mb-3">
                          {service.title}
                        </h3>
                        <p className="text-white/80 text-sm sm:text-base md:text-lg font-medium leading-relaxed">
                          {service.body}
                        </p>
                      </motion.div>
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
