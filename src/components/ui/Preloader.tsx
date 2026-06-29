"use client";

import { useState, useEffect } from "react";

export function Preloader() {
  const [isVisible, setIsVisible] = useState(true);
  const [isFading, setIsFading] = useState(false);

  useEffect(() => {
    // Disable scrolling while preloader is active
    if (isVisible) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [isVisible]);

  const handleComplete = () => {
    if (isFading) return;
    setIsFading(true);
    setTimeout(() => {
      setIsVisible(false);
    }, 800); // 800ms fade out duration
  };

  if (!isVisible) return null;

  return (
    <div
      className={`fixed inset-0 z-[9999] flex flex-col items-center justify-center bg-[#090b0c] transition-opacity duration-800 ${
        isFading ? "opacity-0" : "opacity-100"
      }`}
    >
      <video
        className="w-full h-full object-cover"
        autoPlay
        muted
        playsInline
        onEnded={handleComplete}
        // Fallback in case video fails to load or play
        onError={handleComplete}
      >
        <source src="/videos/intro.mp4" type="video/mp4" />
      </video>

      {/* Skip button in case they don't want to watch the whole thing */}
      <button
        onClick={handleComplete}
        className="absolute bottom-8 right-8 text-white/50 hover:text-white text-sm uppercase tracking-widest font-subheading z-10 transition-colors"
      >
        Skip Intro
      </button>
    </div>
  );
}
