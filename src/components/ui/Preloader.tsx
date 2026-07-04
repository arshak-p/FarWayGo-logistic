"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

export const MediaCache = {
  videoUrl: "/videos/services-scroll.mp4"
};

export function Preloader() {
  const [progress, setProgress] = useState(0); // Start at 0, or 10 as in the framer component
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Disable scrolling while loading
    document.body.style.overflow = "hidden";

    let isVideoLoaded = false;
    let minTimePassed = false;

    // Simulate loading progress
    const duration = 2000; // 2 seconds
    const interval = 30;
    const steps = duration / interval;
    let currentStep = 0;

    const finishLoading = () => {
      setProgress(100);
      setTimeout(() => {
        setIsLoading(false);
        document.body.style.overflow = ""; // Re-enable scrolling
      }, 400);
    };

    const timer = setInterval(() => {
      currentStep++;
      const rawProgress = (currentStep / steps);
      const easedProgress = 1 - Math.pow(1 - rawProgress, 3); // Cubic ease out
      let currentPercentage = Math.round(easedProgress * 100);
      
      // Don't reach 100% until video is loaded
      if (currentPercentage > 99 && !isVideoLoaded) {
        currentPercentage = 99;
      }
      
      setProgress(currentPercentage > 100 ? 100 : currentPercentage);

      if (currentStep >= steps) {
        minTimePassed = true;
        clearInterval(timer);
        if (isVideoLoaded) {
          finishLoading();
        }
      }
    }, interval);

    // Force unlock after 15 seconds max (fallback)
    const fallbackTimer = setTimeout(() => {
      if (!isVideoLoaded) {
        isVideoLoaded = true;
        if (minTimePassed) finishLoading();
      }
    }, 15000);

    // Fetch video to memory blob
    fetch(MediaCache.videoUrl)
      .then(res => res.blob())
      .then(blob => {
         MediaCache.videoUrl = URL.createObjectURL(blob);
         isVideoLoaded = true;
         if (minTimePassed) finishLoading();
      })
      .catch(err => {
         console.warn("Failed to preload video blob", err);
         isVideoLoaded = true;
         if (minTimePassed) finishLoading();
      });

    return () => {
      clearInterval(timer);
      clearTimeout(fallbackTimer);
      document.body.style.overflow = "";
    };
  }, []);

  return (
    <AnimatePresence>
      {isLoading && (
        <motion.div
          key="preloader"
          initial={{ opacity: 1 }}
          exit={{ y: "-100%", transition: { duration: 0.8, ease: [0.76, 0, 0.24, 1] } }}
          className="fixed inset-0 z-[99999] flex flex-col items-center justify-center bg-white"
        >
          {/* Center Logo / Brand Name */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.3, duration: 0.6 }}
            className="font-display text-5xl md:text-7xl text-[var(--color-orange)] tracking-[0.2em]"
          >
            FARWAYGO
          </motion.div>

          {/* Bottom Left Loading Indicator */}
          <div className="absolute bottom-10 left-6 md:left-10 uppercase tracking-[0.3em] text-[var(--color-orange)]/60 text-xs font-semibold flex items-center gap-3">
            <span className="w-1.5 h-1.5 rounded-full bg-[var(--color-orange)] animate-pulse" />
            LOADING
          </div>

          {/* Bottom Right Counter (Matching Framer style) */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5, duration: 0.4 }}
            className="absolute bottom-8 right-6 md:right-10 font-subheading text-4xl md:text-6xl text-[var(--color-orange)] font-medium flex items-baseline"
          >
            {progress}
            <span className="text-2xl md:text-3xl text-[var(--color-orange)]/60 ml-1">%</span>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
