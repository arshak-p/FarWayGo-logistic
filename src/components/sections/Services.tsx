"use client";

import { useEffect, useRef, useState, useCallback } from "react";
import { EyebrowBadge } from "@/components/ui/EyebrowBadge";
import { AnimatePresence, motion } from "framer-motion";
import { useLenis } from "@/components/providers/SmoothScrollProvider";

const FRAME_COUNT = 437;

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
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const imagesRef = useRef<HTMLImageElement[]>([]);
  const currentFrameRef = useRef(-1);
  const tickingRef = useRef(false);
  const scrollTimeoutRef = useRef<NodeJS.Timeout | null>(null);
  const lenis = useLenis();
  
  const [activePairIndex, setActivePairIndex] = useState(-1);
  const prevPairIndexRef = useRef(-1);
  
  const [framesReady, setFramesReady] = useState(false);
  const [loadProgress, setLoadProgress] = useState(0);

  // 1. Preload Frames
  useEffect(() => {
    let loadedCount = 0;
    const images: HTMLImageElement[] = [];
    
    for (let i = 1; i <= FRAME_COUNT; i++) {
      const img = new Image();
      img.src = `/frames/services/frame_${String(i).padStart(4, '0')}.jpg`;
      img.onload = () => {
        loadedCount++;
        setLoadProgress(loadedCount / FRAME_COUNT);
        if (loadedCount === FRAME_COUNT) {
          setFramesReady(true);
        }
      };
      images.push(img);
    }
    imagesRef.current = images;
  }, []);

  // 2. Draw Frame Logic (cover-fit)
  const drawFrame = useCallback((index: number) => {
    const canvas = canvasRef.current;
    const img = imagesRef.current[index];
    if (!canvas || !img || !img.complete) return;
    
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    
    const canvasAspect = canvas.width / canvas.height;
    const imgAspect = img.width / img.height;
    
    let drawWidth = canvas.width;
    let drawHeight = canvas.height;
    let offsetX = 0;
    let offsetY = 0;
    
    if (canvasAspect > imgAspect) {
      drawHeight = canvas.width / imgAspect;
      offsetY = (canvas.height - drawHeight) / 2;
    } else {
      drawWidth = canvas.height * imgAspect;
      offsetX = (canvas.width - drawWidth) / 2;
    }
    
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.drawImage(img, offsetX, offsetY, drawWidth, drawHeight);
  }, []);

  // 3. Resize Handler (DPR scaling)
  useEffect(() => {
    const resizeCanvas = () => {
      const canvas = canvasRef.current;
      if (!canvas) return;
      const dpr = window.devicePixelRatio || 1;
      const rect = canvas.getBoundingClientRect();
      canvas.width = rect.width * dpr;
      canvas.height = rect.height * dpr;
      
      if (currentFrameRef.current >= 0) {
        drawFrame(currentFrameRef.current);
      } else if (framesReady) {
        drawFrame(0);
      }
    };
    
    window.addEventListener("resize", resizeCanvas);
    resizeCanvas();
    return () => window.removeEventListener("resize", resizeCanvas);
  }, [drawFrame, framesReady]);

  // 4. Scroll Engine
  useEffect(() => {
    if (!framesReady) return;

    // Draw initial frame if we haven't scrolled yet
    if (currentFrameRef.current === -1) {
      currentFrameRef.current = 0;
      drawFrame(0);
    }

    const updateScroll = () => {
      if (sectionRef.current) {
        const rect = sectionRef.current.getBoundingClientRect();
        const scrollableDistance = rect.height - window.innerHeight;
        
        let progress = -rect.top / scrollableDistance;
        progress = Math.max(0, Math.min(1, progress));
        
        // Scrub Frames
        const frameIndex = Math.min(FRAME_COUNT - 1, Math.floor(progress * FRAME_COUNT));
        if (frameIndex !== currentFrameRef.current) {
          currentFrameRef.current = frameIndex;
          drawFrame(frameIndex);
        }

        // Pair Logic
        const START_DELAY = 0.20;
        let adjustedProgress = Math.max(0, (progress - START_DELAY) / (1 - START_DELAY));
        adjustedProgress = Math.min(1, adjustedProgress);
        
        let pairIndex = -1;
        if (progress >= START_DELAY) {
          pairIndex = Math.floor(adjustedProgress * 5.2);
          if (pairIndex >= 5) pairIndex = 4;
        }

        if (pairIndex !== prevPairIndexRef.current) {
          prevPairIndexRef.current = pairIndex;
          setActivePairIndex(pairIndex);
        }

        // JS Settle
        if (scrollTimeoutRef.current) clearTimeout(scrollTimeoutRef.current);
        scrollTimeoutRef.current = setTimeout(() => {
          if (progress > START_DELAY && progress < 0.99 && lenis) {
            const currentPair = Math.min(4, Math.max(0, Math.floor(adjustedProgress * 5.2)));
            const targetAdjusted = (currentPair + 0.5) / 5.2;
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
    onScroll(); // initial trigger
    
    return () => {
      window.removeEventListener("scroll", onScroll);
      if (scrollTimeoutRef.current) clearTimeout(scrollTimeoutRef.current);
    };
  }, [framesReady, lenis, drawFrame]);

  const activePair = activePairIndex >= 0 ? services.slice(activePairIndex * 2, activePairIndex * 2 + 2) : [];

  return (
    <section 
      id="services" 
      ref={sectionRef} 
      className="relative w-full h-[800vh] bg-black"
    >
      <div className="sticky top-0 h-screen w-full overflow-hidden flex items-center justify-center">
        
        {/* Loading Overlay */}
        <AnimatePresence>
          {!framesReady && (
            <motion.div 
              initial={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.5 }}
              className="absolute inset-0 z-50 bg-black flex flex-col items-center justify-center"
            >
              <EyebrowBadge variant="orange" className="mb-8">Optimizing Assets</EyebrowBadge>
              <div className="w-64 h-1 bg-white/20 rounded-full overflow-hidden">
                <div 
                  className="h-full bg-[var(--color-orange)] transition-all duration-300 ease-out"
                  style={{ width: `${loadProgress * 100}%` }}
                />
              </div>
              <p className="mt-4 text-white/50 text-sm tracking-widest uppercase font-bold">
                {Math.round(loadProgress * 100)}%
              </p>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Canvas Frame Sequence */}
        <canvas 
          ref={canvasRef}
          className="absolute inset-0 w-full h-full object-cover"
        />

        {/* Content Overlays */}
        <div className="absolute inset-0 flex items-center justify-center container-px z-20 pointer-events-none">
          <div className="w-full max-w-6xl mx-auto relative h-full flex flex-col justify-center">
            
            {/* Header */}
            <div className="absolute top-24 left-0 md:left-auto">
              <EyebrowBadge variant="orange">Our Services</EyebrowBadge>
            </div>

            {/* Service Cards */}
            <div className="relative w-full flex items-center justify-center">
              <AnimatePresence>
                {activePairIndex >= 0 && (
                  <motion.div 
                    key={activePairIndex}
                    initial={{ opacity: 0, x: -150, scale: 0.95 }}
                    animate={{ opacity: 1, x: 0, scale: 1 }}
                    exit={{ opacity: 0, x: 150, scale: 0.95 }}
                    transition={{ type: "spring", stiffness: 120, damping: 25, duration: 0.5 }}
                    className="absolute flex flex-col md:flex-row items-stretch justify-center gap-12 md:gap-24 w-full max-w-5xl pointer-events-auto"
                    style={{ perspective: 1000 }}
                  >
                    {activePair.map((service) => (
                      <div 
                        key={service.id} 
                        className="flex-1 min-w-0 bg-white/10 backdrop-blur-md border border-white/20 p-6 md:p-8 rounded-3xl shadow-2xl flex flex-col justify-center"
                      >
                        <p className="text-[var(--color-orange)] text-xs md:text-sm font-bold tracking-widest uppercase mb-3">
                          {service.id.padStart(2, '0')} // {service.tag}
                        </p>
                        <h3 className="text-2xl md:text-3xl font-display text-white leading-tight mb-3">
                          {service.title}
                        </h3>
                        <p className="text-white/80 text-sm md:text-base font-medium">
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
