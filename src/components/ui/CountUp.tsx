import { useEffect, useRef } from "react";
import { useInView, animate } from "framer-motion";

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
  const isInView = useInView(ref, { once: true, margin: "-10%" });

  useEffect(() => {
    if (isInView) {
      let timeoutId = setTimeout(() => {
        const startValue = direction === "down" ? to : from;
        const endValue = direction === "down" ? from : to;

        const controls = animate(startValue, endValue, {
          duration: duration,
          ease: "easeOut", // Super smooth deceleration
          onUpdate(value) {
            if (ref.current) {
              let formatted = Intl.NumberFormat("en-US", {
                minimumFractionDigits: decimals,
                maximumFractionDigits: decimals,
              }).format(Number(value.toFixed(decimals)));
              
              if (separator === "") {
                formatted = formatted.replace(/,/g, "");
              } else if (separator !== ",") {
                formatted = formatted.replace(/,/g, separator);
              }
              
              ref.current.textContent = formatted + suffix;
            }
          },
        });

        return controls.stop;
      }, delay * 1000);

      return () => clearTimeout(timeoutId);
    }
  }, [isInView, delay, duration, decimals, separator, suffix, from, to, direction]);

  return <span ref={ref} className={className}>{from}{suffix}</span>;
}
