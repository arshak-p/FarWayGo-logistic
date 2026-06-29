"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";

export function CustomCursor() {
  const cursorRef = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    // Check if the device is a touch screen. If so, abort immediately.
    if (!window.matchMedia("(pointer: fine)").matches) return;
    
    setIsVisible(true);
    // Add custom cursor class to body safely
    document.body.style.cursor = 'none';

    const moveCursor = (e: MouseEvent) => {
      if (cursorRef.current) {
        cursorRef.current.style.transform = `translate3d(${e.clientX}px, ${e.clientY}px, 0)`;
      }
    };

    const handleMouseLeave = () => {
      if (cursorRef.current) cursorRef.current.style.opacity = "0";
    };
    const handleMouseEnter = () => {
      if (cursorRef.current) cursorRef.current.style.opacity = "1";
    };

    window.addEventListener("mousemove", moveCursor, { passive: true });
    document.addEventListener("mouseleave", handleMouseLeave);
    document.addEventListener("mouseenter", handleMouseEnter);

    return () => {
      document.body.style.cursor = 'auto';
      window.removeEventListener("mousemove", moveCursor);
      document.removeEventListener("mouseleave", handleMouseLeave);
      document.removeEventListener("mouseenter", handleMouseEnter);
    };
  }, []);

  if (!isVisible) return null;

  return (
    <div 
      ref={cursorRef}
      className="fixed top-0 left-0 pointer-events-none z-[99999] transition-opacity duration-300"
      style={{ 
        width: '40px', 
        height: '40px', 
        willChange: 'transform',
        marginTop: '-2px',
        marginLeft: '-2px'
      }}
    >
      <Image 
        src="/images/cursor.webp" 
        alt="cursor" 
        fill 
        className="object-contain object-top object-left drop-shadow-md" 
        unoptimized 
      />
    </div>
  );
}
