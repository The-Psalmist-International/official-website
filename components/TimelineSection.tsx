"use client";
import React, { useRef, useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

// Helper for synthetic clock tick
class TimelineTickSynth {
  private ctx: AudioContext | null = null;
  private isUnlocked = false;

  constructor() {
    this.unlock = this.unlock.bind(this);
    if (typeof window !== "undefined") {
      window.addEventListener("pointerdown", this.unlock, { once: true });
      window.addEventListener("touchstart", this.unlock, { once: true });
      window.addEventListener("keydown", this.unlock, { once: true });
    }
  }

  private unlock() {
    if (this.isUnlocked) return;
    const AudioContextClass = window.AudioContext || (window as any).webkitAudioContext;
    if (AudioContextClass) {
      this.ctx = new AudioContextClass();
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();
      gain.gain.value = 0;
      osc.connect(gain);
      gain.connect(this.ctx.destination);
      osc.start(0);
      osc.stop(0.01);
      this.isUnlocked = true;
    }
  }

  playTick() {
    if (!this.ctx || this.ctx.state !== "running") {
      this.unlock();
    }
    if (!this.ctx) return;

    const t = this.ctx.currentTime;
    const osc = this.ctx.createOscillator();
    const gain = this.ctx.createGain();

    osc.type = "sine";
    osc.frequency.setValueAtTime(800, t);
    osc.frequency.exponentialRampToValueAtTime(100, t + 0.05);

    gain.gain.setValueAtTime(0, t);
    gain.gain.linearRampToValueAtTime(0.5, t + 0.005);
    gain.gain.exponentialRampToValueAtTime(0.001, t + 0.05);

    osc.connect(gain);
    gain.connect(this.ctx.destination);

    osc.start(t);
    osc.stop(t + 0.05);
  }
}

const timelineEvents = [
  {
    title: "The Vision",
    date: "JANUARY 4, 2020",
    description: "A divine vision was received revealing God's agenda to raise a family of believers committed to His eternal purposes.",
    image: "/assets/IMG_7289.JPG"
  },
  {
    title: "Movement Begins",
    date: "MARCH 2020",
    description: "Church of The Martyrs officially began as an apostolic Christian movement established after the pattern of Christ — King, Priest, and Prophet.",
    image: "/assets/IMG_6718.JPG"
  },
  {
    title: "Early Gatherings & Discipleship",
    date: "2020-2021",
    description: "The ministry began forming a community of believers focused on prayer, spiritual formation, and discipleship.",
    image: "/assets/hero-bg.JPG"
  },
  {
    title: "Campus Expansion",
    date: "2021-2022",
    description: "The movement spread across universities as campus communities began to form. These campuses became hubs for discipleship, prayer, and evangelism.",
    image: "/assets/IMG_7289.JPG"
  }
];

export const TimelineSection = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const synthRef = useRef<TimelineTickSynth | null>(null);
  const [activeIndex, setActiveIndex] = useState(0);
  const isScrollingRef = useRef(false);

  useEffect(() => {
    synthRef.current = new TimelineTickSynth();
  }, []);

  // Scroll hijacking logic
  useEffect(() => {
    const handleWheel = (e: WheelEvent) => {
      if (!containerRef.current) return;
      
      const rect = containerRef.current.getBoundingClientRect();
      const viewportHeight = window.innerHeight;
      
      // Check if container is essentially occupying the full viewport
      const isFullyInView = rect.top <= 10 && rect.bottom >= viewportHeight - 10;

      if (isFullyInView) {
        const isScrollingDown = e.deltaY > 0;
        const isScrollingUp = e.deltaY < 0;

        if (isScrollingDown && activeIndex < timelineEvents.length - 1) {
          e.preventDefault();
          if (!isScrollingRef.current) {
            isScrollingRef.current = true;
            setActiveIndex(prev => prev + 1);
            synthRef.current?.playTick();
            setTimeout(() => { isScrollingRef.current = false; }, 800); // debounce threshold
          }
        } else if (isScrollingUp && activeIndex > 0) {
          e.preventDefault();
          if (!isScrollingRef.current) {
            isScrollingRef.current = true;
            setActiveIndex(prev => prev - 1);
            synthRef.current?.playTick();
            setTimeout(() => { isScrollingRef.current = false; }, 800);
          }
        }
      }
    };

    // Passive false is required to call e.preventDefault()
    window.addEventListener("wheel", handleWheel, { passive: false });
    return () => window.removeEventListener("wheel", handleWheel);
  }, [activeIndex]);

  const currentEvent = timelineEvents[activeIndex];
  
  const isPurpleBg = activeIndex === 1 || activeIndex === 3;
  const bgColor = isPurpleBg ? "#2b0835" : "#ffffff";
  const textColor = isPurpleBg ? "#ffffff" : "#2b0835";
  const textMutedColor = isPurpleBg ? "#e5e7eb" : "#666666";

  return (
    <motion.div 
      ref={containerRef}
      className="relative w-full h-screen overflow-hidden flex flex-col justify-between py-8 px-6 md:px-12 lg:px-24 transition-colors duration-1000 ease-in-out"
      style={{ backgroundColor: bgColor }}
    >
      {/* Subtle Noise Texture Overlay */}
      <div 
        className="absolute inset-0 opacity-[0.04] mix-blend-overlay pointer-events-none"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")`,
        }}
      />

      <div className="w-full max-w-[1100px] mx-auto flex-1 flex flex-col justify-between min-h-0 relative z-10">
        {/* Header Row */}
        <div className="flex justify-between items-end mb-4 shrink-0 overflow-hidden">
          <AnimatePresence mode="wait">
            <motion.h2 
              key={currentEvent.title}
              initial={{ y: 40, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: -40, opacity: 0 }}
              transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
              className="text-2xl md:text-4xl font-semibold font-['Stack_Sans_Headline',sans-serif]"
              style={{ color: textColor }}
            >
              {currentEvent.title}
            </motion.h2>
          </AnimatePresence>
          <AnimatePresence mode="wait">
            <motion.span 
              key={currentEvent.date}
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: -20, opacity: 0 }}
              transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1], delay: 0.1 }}
              className="text-xs md:text-sm uppercase tracking-widest font-semibold font-['Stack_Sans_Headline',sans-serif]"
              style={{ color: textColor }}
            >
              {currentEvent.date}
            </motion.span>
          </AnimatePresence>
        </div>

        {/* Image - Flex-1 min-h-0 forces image container to scale within vertical space */}
        <div className="flex-1 min-h-0 w-full rounded-[2rem] overflow-hidden mb-4 shadow-xl relative bg-stone-200">
          <AnimatePresence mode="wait">
            <motion.img
              key={currentEvent.image}
              src={currentEvent.image}
              alt={currentEvent.title}
              initial={{ opacity: 0, scale: 1.05 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
              className="absolute inset-0 w-full h-full object-cover"
            />
          </AnimatePresence>
        </div>

        {/* Description */}
        <div className="max-w-4xl shrink-0 mb-4">
          <AnimatePresence mode="wait">
            <motion.p
              key={currentEvent.description}
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: -20, opacity: 0 }}
              transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
              className="text-base md:text-lg leading-relaxed [text-wrap:pretty] font-['Stack_Sans_Headline',sans-serif]"
              style={{ color: textMutedColor }}
            >
              {currentEvent.description}
            </motion.p>
          </AnimatePresence>
        </div>

        {/* Scrubber */}
        <div className="w-full h-12 flex items-end justify-between gap-[2px] shrink-0">
          {Array.from({ length: 60 }).map((_, i) => {
            const numBarsPerEvent = 60 / timelineEvents.length; // 15 bars per event
            const eventIndexForBar = Math.floor(i / numBarsPerEvent);
            const isActive = eventIndexForBar === activeIndex;
            const isPast = eventIndexForBar < activeIndex;

            const isPulse = isActive && (i % 3 === 0);
            
            return (
              <motion.div
                key={i}
                initial={false}
                animate={{
                  height: isActive ? (isPulse ? "2.5rem" : "1.5rem") : (isPast ? "1rem" : "0.6rem"),
                  opacity: isActive ? 1 : 0.3,
                  width: isActive ? "3px" : "2px",
                  backgroundColor: textColor
                }}
                transition={{ duration: 0.4, ease: "easeOut", delay: i * 0.005 }}
                className="rounded-t-full"
              />
            );
          })}
        </div>
      </div>
    </motion.div>
  );
};
