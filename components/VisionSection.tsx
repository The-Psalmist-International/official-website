'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

const visionData = [
  {
    id: 1,
    tag: 'SHORT TERM VISION',
    text: (
      <>
        By <span className="font-bold">2030</span>, The Martyrs Church seeks to disciple over 5,000 believers into spiritual maturity, establish training structures for future generations, raise faithful Christians into strategic roles in society, and send missionaries to unreached regions.
      </>
    ),
    image: '/assets/IMG_6718.JPG',
  },
  {
    id: 2,
    tag: 'LONG TERM VISION',
    text: 'In the coming years, The Martyrs Church aims to establish apostolic centers in every nation, raising believers who embody the sacrificial devotion of Christ and carry the gospel to the ends of the earth.',
    image: '/assets/IMG_6744.JPG',
  }
];

export default function VisionSection() {
  const [currentIndex, setCurrentIndex] = useState(0);

  // Auto-play
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % visionData.length);
    }, 5000);
    return () => clearInterval(timer);
  }, []);

  return (
    <section className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-24 font-['Stack_Sans_Headline',sans-serif]">
      <div className="mb-8">
        <span className="inline-block px-4 py-1.5 rounded-full bg-[#fae8ff] text-[#2b0835] text-xs sm:text-sm font-medium tracking-wide uppercase mb-4 font-['Stack_Sans_Headline',sans-serif]">
          Our Vision
        </span>
        <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-[3.25rem] font-normal text-[#2b0835] mb-3 tracking-tight leading-[1.1] font-['Stack_Sans_Headline',sans-serif]">
          A Vision for the Nations
        </h2>
        <p className="text-[#666666] text-base sm:text-lg max-w-3xl font-light leading-relaxed font-['Stack_Sans_Headline',sans-serif]">
          To disciple believers, raise leaders, and establish God's influence across every sphere of life.
        </p>
      </div>

      <div className="relative w-full aspect-[4/3] sm:aspect-[16/9] md:aspect-[21/9] rounded-2xl overflow-hidden bg-neutral-950 shadow-2xl">
        {visionData.map((item, idx) => {
          const isActive = idx === currentIndex;
          return (
            <motion.div
              key={item.id}
              initial={false}
              animate={{
                opacity: isActive ? 1 : 0,
                scale: isActive ? 1 : 1.04,
                zIndex: isActive ? 10 : 1,
              }}
              transition={{
                opacity: { duration: 0.65, ease: [0.33, 1, 0.68, 1] },
                scale: { duration: 0.9, ease: 'easeOut' },
              }}
              className={`absolute inset-0 w-full h-full ${isActive ? 'pointer-events-auto' : 'pointer-events-none'}`}
            >
              {/* Background Image */}
              <div 
                className="absolute inset-0 w-full h-full bg-cover bg-center"
                style={{ backgroundImage: `url(${item.image})` }}
              />
              {/* Overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/35 to-transparent" />
              
              {/* Content */}
              <div className="absolute bottom-0 left-0 right-0 p-6 sm:p-10 md:p-12 z-10 flex flex-col justify-end h-full">
                <div className="max-w-4xl">
                  <motion.span
                    animate={{ y: isActive ? 0 : 10, opacity: isActive ? 1 : 0 }}
                    transition={{ duration: 0.45, delay: isActive ? 0.15 : 0 }}
                    className="inline-block px-3.5 py-1 rounded-full border border-white/30 bg-black/20 text-white text-xs font-medium tracking-wider uppercase mb-4 backdrop-blur-md font-['Stack_Sans_Headline',sans-serif]"
                  >
                    {item.tag}
                  </motion.span>
                  <motion.p
                    animate={{ y: isActive ? 0 : 15, opacity: isActive ? 1 : 0 }}
                    transition={{ duration: 0.55, delay: isActive ? 0.2 : 0 }}
                    className="text-white text-lg sm:text-xl md:text-2xl lg:text-[1.85rem] font-light leading-snug sm:leading-relaxed font-['Stack_Sans_Headline',sans-serif]"
                  >
                    {item.text}
                  </motion.p>
                </div>
              </div>
            </motion.div>
          );
        })}

        {/* Carousel Indicators */}
        <div className="absolute bottom-6 sm:bottom-10 right-6 sm:right-10 z-20 flex gap-2">
          {visionData.map((_, idx) => (
            <button
              key={idx}
              onClick={() => setCurrentIndex(idx)}
              className={`h-1.5 sm:h-2 rounded-full transition-all duration-300 ${
                idx === currentIndex ? 'w-8 sm:w-12 bg-white' : 'w-4 sm:w-6 bg-white/40 hover:bg-white/60'
              }`}
              aria-label={`Go to slide ${idx + 1}`}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
