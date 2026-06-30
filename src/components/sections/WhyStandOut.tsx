"use client";

import { useRef, useEffect } from "react";
import { motion, useScroll, useTransform, useSpring, useMotionValue } from "framer-motion";
import { Truck, Globe, MapPin, UsersThree, Lightning, ShieldCheck, Headset, Tag, Clock, Star } from "@phosphor-icons/react";

const stats = [
  {
    title: "Reliable Delivery",
    body: "We ensure every shipment reaches its destination safely, securely, and on time with complete operational precision.",
    icon: Truck,
  },
  {
    title: "Global Network",
    body: "Our strong international logistics network allows us to provide seamless transportation solutions across worldwide markets.",
    icon: Globe,
  },
  {
    title: "Real-Time Tracking",
    body: "Track your cargo anytime with advanced monitoring systems designed for transparency and accuracy.",
    icon: MapPin,
  },
  {
    title: "Experienced Team",
    body: "Our logistics professionals bring years of industry expertise to manage shipments efficiently and professionally.",
    icon: UsersThree,
  },
  {
    title: "Fast & Efficient Service",
    body: "We streamline transportation and supply chain operations to reduce delays and improve delivery performance.",
    icon: Lightning,
  },
  {
    title: "Secure Cargo Handling",
    body: "Your goods are handled with the highest safety standards throughout every stage of transportation.",
    icon: ShieldCheck,
  },
  {
    title: "Customer-Focused Solutions",
    body: "We create customized logistics strategies tailored to meet your business requirements and shipping goals.",
    icon: Headset,
  },
  {
    title: "Competitive Pricing",
    body: "High-quality logistics services delivered with cost-effective solutions that maximize business value.",
    icon: Tag,
  },
  {
    title: "24/7 Support",
    body: "Our dedicated support team is available around the clock to assist with shipments and operational inquiries.",
    icon: Clock,
  },
  {
    title: "Trusted By Businesses",
    body: "Companies rely on us for dependable logistics solutions that support long-term business growth and success.",
    icon: Star,
  },
];

function OrbitCard({ s, isLeft, idx }: { s: any; isLeft: boolean; idx: number }) {
  const Icon = s.icon;
  const cardRef = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({
    target: cardRef,
    offset: ["start end", "start 0.4"],
  });

  const isEven = idx % 2 === 0;
  
  const rotateYScroll = useTransform(scrollYProgress, [0, 1], [isEven ? -90 : 90, 0]);
  const rotateXScroll = useTransform(scrollYProgress, [0, 1], [25, 0]);
  const translateZScroll = useTransform(scrollYProgress, [0, 1], [-300, 0]);
  const translateXScroll = useTransform(scrollYProgress, [0, 1], [isEven ? -150 : 150, 0]);
  const scaleScroll = useTransform(scrollYProgress, [0, 1], [0.7, 1]);
  const opacityScroll = useTransform(scrollYProgress, [0, 1], [0, 1]);

  const hoverRef = useRef<HTMLDivElement>(null);
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const hoverRotateX = useSpring(useTransform(mouseY, [-0.5, 0.5], [8, -8]), { stiffness: 150, damping: 15 });
  const hoverRotateY = useSpring(useTransform(mouseX, [-0.5, 0.5], [-8, 8]), { stiffness: 150, damping: 15 });

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!hoverRef.current) return;
    const rect = hoverRef.current.getBoundingClientRect();
    const xPct = (e.clientX - rect.left) / rect.width - 0.5;
    const yPct = (e.clientY - rect.top) / rect.height - 0.5;
    mouseX.set(xPct);
    mouseY.set(yPct);
  };

  const handleMouseLeave = () => {
    mouseX.set(0);
    mouseY.set(0);
  };

  return (
    <div
      ref={cardRef}
      className={isLeft ? "md:pr-16 lg:pr-24 flex flex-col items-end" : "md:pl-16 lg:pl-24 flex flex-col items-start"}
      style={{ transformStyle: "preserve-3d" }}
    >
      {/* Outer scroll-driven motion.div */}
      <motion.div
        style={{
          rotateY: rotateYScroll,
          rotateX: rotateXScroll,
          z: translateZScroll,
          x: translateXScroll,
          scale: scaleScroll,
          opacity: opacityScroll,
          transformStyle: "preserve-3d",
        }}
        className="w-full [will-change:transform]"
      >
        {/* Inner hover-driven motion.div */}
        <motion.div
          ref={hoverRef}
          onMouseMove={handleMouseMove}
          onMouseLeave={handleMouseLeave}
          style={{
            rotateX: hoverRotateX,
            rotateY: hoverRotateY,
            transformStyle: "preserve-3d",
          }}
          className={`group w-full rounded-2xl border border-[var(--color-navy)]/10 bg-white/40 backdrop-blur-sm p-6 [will-change:transform] ${
            isLeft ? "text-right flex flex-col items-end" : "text-left flex flex-col items-start"
          }`}
        >
          <div 
            className="mb-4 text-[var(--color-navy)] transition-colors duration-300 group-hover:text-[var(--color-orange)]"
            style={{ transform: "translateZ(40px)" }}
          >
            <Icon size={32} weight="regular" />
          </div>
          <h3 className="font-subheading font-semibold uppercase text-[var(--color-navy)] text-lg mb-2">
            {s.title}
          </h3>
          <p className="text-[var(--color-ink)]/60 text-[14.5px] leading-relaxed max-w-md">
            {s.body}
          </p>
        </motion.div>
      </motion.div>
    </div>
  );
}

export function WhyStandOut() {
  const ref = useRef<HTMLDivElement>(null);
  
  // Mouse Parallax Tracking
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      // Normalize mouse position from -1 to 1 based on screen center
      const x = (e.clientX / window.innerWidth) * 2 - 1;
      const y = (e.clientY / window.innerHeight) * 2 - 1;
      mouseX.set(x);
      mouseY.set(y);
    };
    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, [mouseX, mouseY]);

  // Spring smooth the mouse for fluid parallax
  const smoothMouseX = useSpring(mouseX, { stiffness: 50, damping: 20 });
  const smoothMouseY = useSpring(mouseY, { stiffness: 50, damping: 20 });

  // Different depths for clouds
  const parallax1X = useTransform(smoothMouseX, [-1, 1], [-40, 40]);
  const parallax1Y = useTransform(smoothMouseY, [-1, 1], [-40, 40]);
  
  const parallax2X = useTransform(smoothMouseX, [-1, 1], [30, -30]);
  const parallax2Y = useTransform(smoothMouseY, [-1, 1], [30, -30]);

  const parallax3X = useTransform(smoothMouseX, [-1, 1], [-60, 60]);
  const parallax3Y = useTransform(smoothMouseY, [-1, 1], [-60, 60]);

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start 0.9", "start 0.2"],
  });

  const smoothProgress = useSpring(scrollYProgress, {
    stiffness: 70,
    damping: 20,
    restDelta: 0.001
  });

  // Text splitting animation
  const leftX = useTransform(smoothProgress, [0, 1], ["0vw", "-7vw"]);
  const rightX = useTransform(smoothProgress, [0, 1], ["0vw", "7vw"]);

  const standLeftX = useTransform(smoothProgress, [0, 1], ["0vw", "-4vw"]);
  const standRightX = useTransform(smoothProgress, [0, 1], ["0vw", "4vw"]);

  // Cloud entrance animation
  const cloudLeftX = useTransform(smoothProgress, [0, 1], ["-100%", "0%"]);
  const cloudRightX = useTransform(smoothProgress, [0, 1], ["100%", "0%"]);
  
  // New clouds
  const cloudRightX2 = useTransform(smoothProgress, [0, 1], ["80%", "0%"]);
  const cloudCenterY = useTransform(smoothProgress, [0, 1], ["50%", "0%"]);
  const cloudCenterScale = useTransform(smoothProgress, [0, 1], [0.8, 1]);
  
  const cloudOpacity = useTransform(smoothProgress, [0, 1], [0, 0.9]);

  return (
    <section
      id="why-us"
      ref={ref}
      className="min-h-screen relative bg-transparent py-24 md:py-32"
    >
      {/* Floating clouds with scroll AND mouse parallax */}
      <div className="absolute inset-0 pointer-events-none z-0">
        
        {/* Left Cloud */}
        <motion.div
          style={{ x: cloudLeftX, opacity: cloudOpacity }}
          className="absolute top-[15%] left-[-20%] md:left-[-10%] w-[75%] md:w-[45%] max-w-[700px]"
        >
          <motion.div style={{ x: parallax1X, y: parallax1Y }}>
            <motion.img 
              animate={{ x: [0, 40, 0], y: [0, -15, 0] }}
              transition={{ duration: 25, repeat: Infinity, ease: "easeInOut" }}
              src="/images/clouds/8918172.webp" 
              alt="cloud" 
              className="w-full h-auto object-contain opacity-80" 
            />
          </motion.div>
        </motion.div>

        {/* Right Cloud */}
        <motion.div
          style={{ x: cloudRightX, opacity: cloudOpacity }}
          className="absolute bottom-[-10%] right-[-15%] md:right-[-5%] w-[85%] md:w-[50%] max-w-[800px]"
        >
          <motion.div style={{ x: parallax2X, y: parallax2Y }}>
            <motion.img 
              animate={{ x: [0, -30, 0], y: [0, 20, 0] }}
              transition={{ duration: 20, repeat: Infinity, ease: "easeInOut" }}
              src="/images/clouds/8918181.webp" 
              alt="cloud" 
              className="w-full h-auto object-contain" 
            />
          </motion.div>
        </motion.div>

        {/* Second WE side cloud (Right side) */}
        <motion.div
          style={{ x: cloudRightX2, opacity: cloudOpacity }}
          className="absolute top-[5%] right-[-5%] md:right-[5%] w-[60%] md:w-[35%] max-w-[600px]"
        >
          <motion.div style={{ x: parallax1X, y: parallax2Y }}>
            <motion.img 
              animate={{ x: [0, -20, 0], y: [0, 10, 0] }}
              transition={{ duration: 18, repeat: Infinity, ease: "easeInOut", delay: 2 }}
              src="/images/clouds/8918191.webp" 
              alt="cloud" 
              className="w-full h-auto object-contain opacity-80" 
            />
          </motion.div>
        </motion.div>

        {/* Center cloud (Replaced with a non-cropped cloud) */}
        <motion.div
          style={{ y: cloudCenterY, scale: cloudCenterScale, opacity: cloudOpacity }}
          className="absolute top-[20%] left-[50%] -translate-x-[50%] w-[90%] md:w-[60%] max-w-[1000px] z-[-1]"
        >
          <motion.div style={{ x: parallax3X, y: parallax3Y }}>
            <motion.img 
              animate={{ x: [0, 15, -15, 0], y: [0, -10, 10, 0] }}
              transition={{ duration: 30, repeat: Infinity, ease: "easeInOut" }}
              src="/images/clouds/8918176.webp" 
              alt="cloud" 
              className="w-full h-auto object-contain opacity-50" 
            />
          </motion.div>
        </motion.div>
      </div>

      <div className="relative container-px max-content">
        {/* headline with hanging container layered through it */}
        <div className="relative flex flex-col items-center justify-center min-h-[280px] md:min-h-[360px] w-full">
          
          <div className="flex items-center justify-center gap-4 w-full relative z-0">
            <motion.h2 
              style={{ x: leftX }}
              className="font-display font-semibold uppercase text-[#dbe1e3] text-[20vw] md:text-[12vw] leading-[0.85] text-center select-none pointer-events-none"
            >
              Why
            </motion.h2>

            <motion.h2 
              style={{ x: rightX }}
              className="font-display font-semibold uppercase text-[#dbe1e3] text-[20vw] md:text-[12vw] leading-[0.85] text-center select-none pointer-events-none"
            >
              We
            </motion.h2>
          </div>

          <div className="flex items-center justify-center gap-4 w-full relative z-0 mt-8 md:mt-16">
            <motion.h2 
              style={{ x: standLeftX }}
              className="font-display font-semibold uppercase text-[#dbe1e3] text-[20vw] md:text-[12vw] leading-[0.85] text-center select-none pointer-events-none"
            >
              Stand
            </motion.h2>
            <motion.h2 
              style={{ x: standRightX }}
              className="font-display font-semibold uppercase text-[#dbe1e3] text-[20vw] md:text-[12vw] leading-[0.85] text-center select-none pointer-events-none"
            >
              Out?
            </motion.h2>
          </div>
        </div>

        {/* feature grid */}
        <div 
          className="relative mt-16 md:mt-24 grid md:grid-cols-2 gap-x-24 md:gap-x-48 lg:gap-x-[400px] gap-y-12 md:gap-y-20 max-w-[1400px] mx-auto z-10"
          style={{ perspective: "1500px" }}
        >
          {stats.map((s, idx) => {
            const isLeft = idx % 2 === 0;
            return <OrbitCard key={s.title} s={s} isLeft={isLeft} idx={idx} />;
          })}
        </div>
      </div>
    </section>
  );
}