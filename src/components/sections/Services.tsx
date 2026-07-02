"use client";

import { useEffect, useRef, useState, useCallback } from "react";
import { EyebrowBadge } from "@/components/ui/EyebrowBadge";
import { AnimatePresence, motion, useInView } from "framer-motion";
import { useLenis } from "@/components/providers/SmoothScrollProvider";
import { CaretDown } from "@phosphor-icons/react";

const FRAME_COUNT = 273;

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
  const bitmapCache = useRef<Map<number, ImageBitmap>>(new Map());
  const fetchingRef = useRef<Set<number>>(new Set());
  const WINDOW_SIZE = 40;
  
  const currentFrameRef = useRef(-1);
  const tickingRef = useRef(false);
  const scrollTimeoutRef = useRef<NodeJS.Timeout | null>(null);
  const lenis = useLenis();
  
  const sectionTopRef = useRef(0);
  const sectionHeightRef = useRef(0);
  
  const [activePairIndex, setActivePairIndex] = useState(-1);
  const [direction, setDirection] = useState(1);
  const prevPairIndexRef = useRef(-1);
  
  const [framesReady, setFramesReady] = useState(false);
  const [loadProgress, setLoadProgress] = useState(0);

  const panelTriggerRef = useRef(null);
  const isPanelInView = useInView(panelTriggerRef, { once: false, amount: 0, margin: "10000px 0px 0px 0px" });

  const ensureFrameLoaded = useCallback(async (index: number) => {
    if (bitmapCache.current.has(index)) return bitmapCache.current.get(index)!;
    if (fetchingRef.current.has(index)) return null;
    
    fetchingRef.current.add(index);
    try {
      const res = await fetch(`/frames/services-v2/frame_${String(index + 1).padStart(4, '0')}.jpg`);
      const blob = await res.blob();
      const bitmap = await createImageBitmap(blob);
      bitmapCache.current.set(index, bitmap);
      
      for (const key of bitmapCache.current.keys()) {
        if (Math.abs(key - currentFrameRef.current) > WINDOW_SIZE) {
          const oldBitmap = bitmapCache.current.get(key);
          if (oldBitmap && oldBitmap.close) oldBitmap.close();
          bitmapCache.current.delete(key);
        }
      }
      fetchingRef.current.delete(index);
      return bitmap;
    } catch (err) {
      fetchingRef.current.delete(index);
      return null;
    }
  }, []);

  // 1. Preload Initial Frames
  useEffect(() => {
    let cancelled = false;
    let loadedCount = 0;
    const initialLoadCount = Math.min(WINDOW_SIZE, FRAME_COUNT);
    
    async function init() {
      for (let i = 0; i < initialLoadCount; i++) {
        await ensureFrameLoaded(i);
        if (cancelled) return;
        loadedCount++;
        setLoadProgress(loadedCount / initialLoadCount);
      }
      setFramesReady(true);
    }
    
    init();
    return () => { cancelled = true; };
  }, [ensureFrameLoaded]);

  // 2. Draw Frame Logic
  const drawFrame = useCallback(async (index: number) => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    
    const bitmap = await ensureFrameLoaded(index);
    if (!bitmap) return; 
    if (currentFrameRef.current !== index) return;
    
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    
    const canvasAspect = canvas.width / canvas.height;
    const imgAspect = bitmap.width / bitmap.height;
    
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
    ctx.drawImage(bitmap, offsetX, offsetY, drawWidth, drawHeight);
  }, []);

  // 3. Resize & Bounds Handler
  const recalcBounds = useCallback(() => {
    if (sectionRef.current) {
      sectionTopRef.current = sectionRef.current.offsetTop;
      sectionHeightRef.current = sectionRef.current.offsetHeight;
    }
    
    const canvas = canvasRef.current;
    if (canvas) {
      const dpr = window.devicePixelRatio || 1;
      const rect = canvas.getBoundingClientRect();
      canvas.width = rect.width * dpr;
      canvas.height = rect.height * dpr;
      
      if (currentFrameRef.current >= 0) {
        drawFrame(currentFrameRef.current);
      } else if (framesReady) {
        drawFrame(0);
      }
    }
  }, [drawFrame, framesReady]);

  useEffect(() => {
    window.addEventListener("resize", recalcBounds);
    recalcBounds();
    return () => window.removeEventListener("resize", recalcBounds);
  }, [recalcBounds]);

  // 4. Scroll Engine
  useEffect(() => {
    if (!framesReady) return;

    if (currentFrameRef.current === -1) {
      currentFrameRef.current = 0;
      drawFrame(0);
    }
    
    const START_DELAY = 0.20;
    
    // Unified math helper
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
        
        // Scrub Frames
        const frameIndex = Math.min(FRAME_COUNT - 1, Math.floor(progress * FRAME_COUNT));
        if (frameIndex !== currentFrameRef.current) {
          currentFrameRef.current = frameIndex;
          drawFrame(frameIndex);
        }

        // Pair Logic
        const pairIndex = getPairIndex(progress);

        if (pairIndex !== prevPairIndexRef.current) {
          setDirection(pairIndex > prevPairIndexRef.current ? 1 : -1);
          prevPairIndexRef.current = pairIndex;
          setActivePairIndex(pairIndex);
        }

        // Removed JS Settle (Debounced Snap) to prevent scroll jacking and restore smooth scrolling
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
      if (scrollTimeoutRef.current) clearTimeout(scrollTimeoutRef.current);
    };
  }, [framesReady, lenis, drawFrame]);

  const activePair = activePairIndex >= 0 ? services.slice(activePairIndex * 2, activePairIndex * 2 + 2) : [];

  return (
    <section 
      id="services" 
      ref={sectionRef} 
      className="relative w-full h-[800vh] bg-transparent z-10"
    >
      <div ref={panelTriggerRef} className="absolute top-[100vh] bottom-0 left-0 w-full pointer-events-none" />

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
              <div className="mb-8">
                <EyebrowBadge variant="orange">Optimizing Assets</EyebrowBadge>
              </div>
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

        {/* Canvas & Background Frame Sequence Wrapper */}
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
          <canvas 
            ref={canvasRef}
            className="absolute inset-0 w-full h-full object-cover"
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
                    className="absolute grid grid-cols-1 md:grid-cols-2 gap-12 md:gap-24 w-full max-w-5xl pointer-events-auto"
                    style={{ perspective: 1000, willChange: "transform, opacity" }}
                  >
                    {activePair.map((service, idx) => (
                      <motion.div 
                        key={service.id} 
                        animate={{ y: [0, idx === 0 ? -15 : -10, 0] }}
                        transition={{ duration: idx === 0 ? 4 : 4.5, repeat: Infinity, ease: "easeInOut" }}
                        className="h-[240px] md:h-[250px] w-full min-w-0 bg-black/60 backdrop-blur-xl border border-white/10 p-6 rounded-3xl shadow-2xl flex flex-col justify-center will-change-transform transform-gpu"
                        style={{ WebkitBackfaceVisibility: "hidden", backfaceVisibility: "hidden" }}
                      >
                        <p className="text-[var(--color-orange)] text-sm md:text-base font-bold tracking-widest uppercase mb-3">
                          {service.id.padStart(2, '0')} // {service.tag}
                        </p>
                        <h3 className="text-3xl md:text-4xl font-display text-white leading-tight mb-3">
                          {service.title}
                        </h3>
                        <p className="text-white/80 text-base md:text-lg font-medium leading-relaxed">
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
