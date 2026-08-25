'use client';

import { motion } from 'framer-motion';

export default function AboutHeroSection() {
  return (
    <section className="relative w-full pt-28 pb-20 md:pt-36 md:pb-28 overflow-hidden font-['Stack_Sans_Headline',sans-serif] bg-white text-stone-900">
      
      {/* Centered Hero Heading & Subtext */}
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10 mb-14 sm:mb-20">
        <motion.h1
          initial={{ opacity: 0, y: 25 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          className="text-4xl sm:text-5xl md:text-6xl lg:text-[4.2rem] font-normal text-[#2b0835] tracking-tight leading-[1.08] mb-6 [text-wrap:balance]"
        >
          Raising a prophetic generation for the nations
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.15, ease: [0.22, 1, 0.36, 1] }}
          className="text-base sm:text-lg md:text-xl text-[#666666] font-light max-w-2xl mx-auto leading-relaxed [text-wrap:pretty]"
        >
          We are an apostolic movement committed to spiritual formation, raising leaders, and establishing God's influence across every sphere of life.
        </motion.p>
      </div>

      {/* Rich Multi-Image Mosaic Collage */}
      <div className="w-full relative z-10 px-3 sm:px-6 lg:px-8 max-w-[1500px] mx-auto">
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3.5 sm:gap-4 md:gap-5 items-start">
          
          {/* Column 1 */}
          <motion.div
            initial={{ opacity: 0, y: 35 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="flex flex-col gap-3.5 sm:gap-5 lg:translate-y-8"
          >
            <div className="group aspect-[4/5] rounded-2xl sm:rounded-3xl overflow-hidden bg-stone-100 border border-stone-200/80 shadow-[0_8px_25px_rgba(0,0,0,0.05)]">
              <img
                src="/assets/IMG_6718.JPG"
                alt="Community life"
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
              />
            </div>
            <div className="group aspect-[3/4] rounded-2xl sm:rounded-3xl overflow-hidden bg-stone-100 border border-stone-200/80 shadow-[0_8px_25px_rgba(0,0,0,0.05)]">
              <img
                src="/assets/IMG_7194.JPG"
                alt="Community fellowship"
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
              />
            </div>
          </motion.div>

          {/* Column 2 */}
          <motion.div
            initial={{ opacity: 0, y: 35 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="flex flex-col gap-3.5 sm:gap-5 lg:-translate-y-6"
          >
            <div className="group aspect-[3/4] rounded-2xl sm:rounded-3xl overflow-hidden bg-stone-100 border border-stone-200/80 shadow-[0_8px_25px_rgba(0,0,0,0.05)]">
              <img
                src="/assets/IMG_6744.JPG"
                alt="Prayer and worship"
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
              />
            </div>
            <div className="group aspect-[4/5] rounded-2xl sm:rounded-3xl overflow-hidden bg-stone-100 border border-stone-200/80 shadow-[0_8px_25px_rgba(0,0,0,0.05)]">
              <img
                src="/assets/IMG_7255.JPG"
                alt="Worship team"
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
              />
            </div>
          </motion.div>

          {/* Column 3 (Centerpiece Column) */}
          <motion.div
            initial={{ opacity: 0, y: 35 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="col-span-2 sm:col-span-1 flex flex-col gap-3.5 sm:gap-5 lg:translate-y-2"
          >
            <div className="group aspect-[4/5] rounded-2xl sm:rounded-3xl overflow-hidden bg-stone-100 border border-stone-200/80 shadow-[0_12px_30px_rgba(43,8,53,0.08)]">
              <img
                src="/assets/IMG_7289.JPG"
                alt="Apostolic gathering"
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
              />
            </div>
            <div className="group aspect-[3/4] rounded-2xl sm:rounded-3xl overflow-hidden bg-stone-100 border border-stone-200/80 shadow-[0_8px_25px_rgba(0,0,0,0.05)]">
              <img
                src="/assets/IMG_7172.JPG"
                alt="Ministry leadership"
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
              />
            </div>
          </motion.div>

          {/* Column 4 */}
          <motion.div
            initial={{ opacity: 0, y: 35 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="flex flex-col gap-3.5 sm:gap-5 lg:-translate-y-8"
          >
            <div className="group aspect-[3/4] rounded-2xl sm:rounded-3xl overflow-hidden bg-stone-100 border border-stone-200/80 shadow-[0_8px_25px_rgba(0,0,0,0.05)]">
              <img
                src="/assets/IMG_7234.JPG"
                alt="Joyful community"
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
              />
            </div>
            <div className="group aspect-[4/5] rounded-2xl sm:rounded-3xl overflow-hidden bg-stone-100 border border-stone-200/80 shadow-[0_8px_25px_rgba(0,0,0,0.05)]">
              <img
                src="/assets/IMG_6776.JPG"
                alt="Church discipleship"
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
              />
            </div>
          </motion.div>

          {/* Column 5 */}
          <motion.div
            initial={{ opacity: 0, y: 35 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.5 }}
            className="flex flex-col gap-3.5 sm:gap-5 lg:translate-y-6"
          >
            <div className="group aspect-[4/5] rounded-2xl sm:rounded-3xl overflow-hidden bg-stone-100 border border-stone-200/80 shadow-[0_8px_25px_rgba(0,0,0,0.05)]">
              <img
                src="/assets/hero-bg.JPG"
                alt="Ministry campus"
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
              />
            </div>
            <div className="group aspect-[3/4] rounded-2xl sm:rounded-3xl overflow-hidden bg-stone-100 border border-stone-200/80 shadow-[0_8px_25px_rgba(0,0,0,0.05)]">
              <img
                src="/assets/IMG_7283.JPG"
                alt="Prayer meeting"
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
              />
            </div>
          </motion.div>

        </div>
      </div>

    </section>
  );
}
