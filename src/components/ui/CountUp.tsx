import { useEffect, useRef } from "react";
import { useInView, useMotionValue, useSpring } from "framer-motion";

export interface CountUpProps {
  to: number;
  from?: number;
  direction?: "up" | "down";
  delay?: number;
  duration?: number;
  className?: string;
  separator?: string;
  decimals?: number;
  suffix?: string;
}

export default function CountUp({
  to,
  from = 0,
  direction = "up",
  delay = 0,
  duration = 2,
  className = "",
  separator = "",
  decimals = 0,
  suffix = "",
}: CountUpProps) {
  const ref = useRef<HTMLSpanElement>(null);
  const motionValue = useMotionValue(direction === "down" ? to : from);
  
  // Calculate damping and stiffness based on duration
  const damping = 20 + 40 * (1 / duration);
  const stiffness = 100 * (1 / duration);
  
  const springValue = useSpring(motionValue, {
    damping,
    stiffness,
  });
  
  const isInView = useInView(ref, { once: true, margin: "-10%" });

  useEffect(() => {
    if (isInView) {
      setTimeout(() => {
        motionValue.set(direction === "down" ? from : to);
      }, delay * 1000);
    }
  }, [motionValue, isInView, delay, to, from, direction]);

  useEffect(() => {
    springValue.on("change", (latest) => {
      if (ref.current) {
        let formatted = Intl.NumberFormat("en-US", {
          minimumFractionDigits: decimals,
          maximumFractionDigits: decimals,
        }).format(Number(latest.toFixed(decimals)));
        
        if (separator === "") {
          formatted = formatted.replace(/,/g, "");
        } else if (separator !== ",") {
          formatted = formatted.replace(/,/g, separator);
        }
        
        ref.current.textContent = formatted + suffix;
      }
    });
  }, [springValue, decimals, separator, suffix]);

  return <span ref={ref} className={className}>{from}{suffix}</span>;
}
