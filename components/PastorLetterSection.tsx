'use client';

import { useState, useRef } from 'react';
import { motion, useScroll, useTransform, useSpring } from 'framer-motion';

// Separate each sentence/line for precise scroll-driven reveal
const letterLines = [
  { text: 'I come in the name of the Lord.', isHeader: true },
  { text: 'Welcome to The Martyrs Church — a movement born out of divine instruction and committed to raising a generation that will live in the full witness of Christ.' },
  { text: 'In this season, God is calling men and women into deeper alignment with His will — to know Him, to walk with Him, and to manifest His purposes in every sphere of life.' },
  { text: 'The Martyrs Church is a response to that call: a community devoted to prayer, discipleship, and the raising of a people who will carry His presence and power to the nations.' },
  { text: 'It is my conviction that God is building a people who are grounded in truth, shaped by His Spirit, and yielded to His eternal agenda.' },
  { text: 'As you journey with us, my prayer is that you will encounter God deeply, grow in your understanding of Him, and walk fully in your divine purpose.' },
  { text: 'Welcome to the family.', isClosing: true },
  { text: 'Shalom. Maranatha.', isClosing: true },
];

export default function PastorLetterSection() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [isPlaying, setIsPlaying] = useState(false);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start start', 'end end'],
  });

  const smoothProgress = useSpring(scrollYProgress, {
    stiffness: 85,
    damping: 24,
    restDelta: 0.001,
  });

  // Signature reveal starts towards the end of the scroll track
  const signatureOpacity = useTransform(smoothProgress, [0.82, 0.94], [0.15, 1]);
  const signatureScale = useTransform(smoothProgress, [0.82, 0.94], [0.95, 1]);

  return (
    <div ref={containerRef} className="relative w-full h-[280vh]">
      {/* Sticky Viewport fitting exactly h-screen */}
      <div className="sticky top-0 w-full h-screen flex flex-col items-center justify-center overflow-hidden bg-[#fbfbfa] text-stone-900 font-['Stack_Sans_Headline',sans-serif] px-4 sm:px-6">
        
        {/* Google Font for fancy cursive signature */}
        <style jsx global>{`
          @import url('https://fonts.googleapis.com/css2?family=Great+Vibes&display=swap');
          .fancy-signature {
            font-family: 'Great Vibes', cursive;
          }
        `}</style>

        {/* Top-Right Audio Toggle Icon */}
        <div className="max-w-3xl w-full flex justify-end mb-2 sm:mb-3 pr-2 sm:pr-4 z-20">
          <button
            onClick={() => setIsPlaying(!isPlaying)}
            className={`p-2.5 sm:p-3 rounded-full border transition-all duration-300 focus:outline-none ${
              isPlaying
                ? 'bg-[#2b0835] text-white border-[#2b0835] shadow-md'
                : 'bg-white text-stone-600 border-stone-200 hover:border-stone-400 hover:text-stone-950 shadow-sm'
            }`}
            aria-label={isPlaying ? 'Pause audio letter' : 'Listen to audio letter'}
          >
            <svg
              width="20"
              height="20"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5"></polygon>
              <path d="M19.07 4.93a10 10 0 0 1 0 14.14M15.54 8.46a5 5 0 0 1 0 7.07"></path>
            </svg>
          </button>
        </div>

        {/* Tilted Warm Parchment Paper Card - Border Radius 0, Spacious & Fitted */}
        <div className="max-w-xl sm:max-w-2xl md:max-w-[740px] w-full relative z-10">
          <div className="relative bg-[#FCF8EE] border border-[#f0e9d6] rounded-none p-6 sm:p-9 md:p-11 shadow-[0_20px_50px_rgba(0,0,0,0.06),0_2px_8px_rgba(0,0,0,0.02)] -rotate-[1.2deg] transition-transform duration-500 flex flex-col justify-center">
            
            {/* Paper Texture Overlay */}
            <div 
              className="absolute inset-0 opacity-[0.03] pointer-events-none rounded-none mix-blend-multiply"
              style={{
                backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")`,
              }}
            />

            {/* Letter Content with Precise Line-by-Line Scroll Reveal */}
            <div className="relative z-10 space-y-2.5 sm:space-y-3.5 text-[13.5px] sm:text-[15px] md:text-[16px] leading-[1.65] sm:leading-[1.75] font-light">
              
              {letterLines.map((line, index) => {
                // Progressive scroll intervals for each line
                const start = 0.05 + (index / letterLines.length) * 0.72;
                const end = start + 0.08;

                const opacity = useTransform(smoothProgress, [start, end], [0.2, 1]);
                const textColor = useTransform(
                  smoothProgress,
                  [start, end],
                  line.isHeader ? ['#a8a29e', '#1c1917'] : ['#a8a29e', '#44403c']
                );

                if (line.isHeader) {
                  return (
                    <motion.h2
                      key={index}
                      style={{ opacity, color: textColor }}
                      className="text-base sm:text-lg md:text-2xl font-semibold tracking-tight mb-2 sm:mb-3 transition-colors"
                    >
                      {line.text}
                    </motion.h2>
                  );
                }

                return (
                  <motion.p
                    key={index}
                    style={{ opacity, color: textColor }}
                    className={`transition-colors ${line.isClosing ? 'font-normal' : 'font-light'}`}
                  >
                    {line.text}
                  </motion.p>
                );
              })}

              {/* Handwritten Signature Revealed on Scroll */}
              <motion.div
                style={{ opacity: signatureOpacity, scale: signatureScale }}
                className="pt-3 sm:pt-5 flex flex-col items-start origin-left"
              >
                <div className="fancy-signature text-3xl sm:text-5xl md:text-6xl text-stone-950 font-normal tracking-wide leading-none">
                  Rev Elorm John Tetteh
                </div>
                <div className="w-36 sm:w-48 h-[1.5px] bg-stone-900/40 mt-1 sm:mt-1.5 rounded-full" />
              </motion.div>

            </div>

          </div>
        </div>

      </div>
    </div>
  );
}
