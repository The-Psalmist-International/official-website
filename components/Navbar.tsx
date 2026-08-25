'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';

const menuItems = [
  { label: 'Home', href: '/' },
  { label: 'About Us', href: '/about-us' },
  { label: 'Ministries', href: '/ministries' },
  { label: 'Sermons', href: '/sermons' },
  { label: 'Events', href: '/events' },
  { label: 'Give', href: '/give' },
];

// Candle positions (7 branches: 3 left, 1 center, 3 right)
const candlePositions = [
  { x: 55, y: 130, id: 0 },
  { x: 120, y: 130, id: 1 },
  { x: 185, y: 130, id: 2 },
  { x: 250, y: 130, id: 3 },
  { x: 315, y: 130, id: 4 },
  { x: 380, y: 130, id: 5 },
  { x: 445, y: 130, id: 6 },
];

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
  const [isVisible, setIsVisible] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);
  const [isScrolled, setIsScrolled] = useState(false);

  const pathname = usePathname();
  const isHomePage = pathname === '/';

  // Smart navbar visibility: visible near top, hides on scroll down, reveals on scroll up
  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;

      setIsScrolled(currentScrollY > 40);

      if (currentScrollY <= 40) {
        setIsVisible(true);
      } else if (currentScrollY > lastScrollY && currentScrollY > 80) {
        // Scrolling down
        setIsVisible(false);
      } else if (currentScrollY < lastScrollY) {
        // Scrolling up
        setIsVisible(true);
      }

      setLastScrollY(currentScrollY);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [lastScrollY]);

  // Prevent scrolling when fullscreen menu is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]);

  return (
    <>
      {/* Top Navigation Bar - Appears smoothly on Scroll Up */}
      <motion.nav 
        initial={false}
        animate={{
          y: isVisible || isOpen ? 0 : -100,
          opacity: isVisible || isOpen ? 1 : 0,
        }}
        transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
        className={`fixed top-0 left-0 w-full z-40 transition-colors duration-300 ${
          isHomePage && !isScrolled
            ? 'bg-transparent text-white' 
            : 'bg-white/85 backdrop-blur-md border-b border-stone-200/60 text-stone-900 shadow-[0_4px_20px_rgba(0,0,0,0.03)]'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-14 sm:h-16 flex items-center justify-between">
          <Link 
            href="/" 
            className={`text-lg sm:text-xl font-medium tracking-tight transition-colors ${
              isHomePage && !isScrolled ? 'text-white hover:text-white/80' : 'text-stone-900 hover:text-amber-900'
            }`}
          >
            The Martyrs Church
          </Link>

          {/* Scaled Bold Hamburger Button */}
          <button
            onClick={() => setIsOpen(true)}
            className={`p-1.5 -mr-1.5 transition-transform hover:scale-105 active:scale-95 focus:outline-none ${
              isHomePage && !isScrolled ? 'text-white hover:text-white/80' : 'text-stone-900 hover:text-amber-900'
            }`}
            aria-label="Open Navigation Menu"
          >
            <svg
              width="26"
              height="26"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2.4"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <line x1="3" y1="6" x2="21" y2="6"></line>
              <line x1="3" y1="12" x2="21" y2="12"></line>
              <line x1="3" y1="18" x2="21" y2="18"></line>
            </svg>
          </button>
        </div>
      </motion.nav>

      {/* Fullscreen Menu Overlay with White/Light Theme & Grain */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
            className="fixed inset-0 z-50 bg-[#FAF8F5] text-stone-900 flex flex-col overflow-hidden"
          >
            {/* Tactile Noise/Grain Overlay across background */}
            <div 
              className="absolute inset-0 pointer-events-none opacity-[0.06] z-10 mix-blend-multiply"
              style={{
                backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")`,
                backgroundRepeat: 'repeat',
              }}
            />

            {/* Menu Header with Logo and Scaled Close Button */}
            <div className="relative z-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-14 sm:h-16 w-full flex items-center justify-between flex-shrink-0">
              <Link 
                href="/" 
                onClick={() => setIsOpen(false)} 
                className="text-lg sm:text-xl font-medium tracking-tight text-stone-900 hover:text-amber-800 transition"
              >
                The Martyrs Church
              </Link>
              
              {/* Scaled Close Button */}
              <button
                onClick={() => setIsOpen(false)}
                className="p-1.5 -mr-1.5 text-stone-900 hover:text-amber-800 transition-transform hover:scale-105 active:scale-95 focus:outline-none"
                aria-label="Close Navigation Menu"
              >
                <svg
                  width="26"
                  height="26"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2.4"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <line x1="18" y1="6" x2="6" y2="18"></line>
                  <line x1="6" y1="6" x2="18" y2="18"></line>
                </svg>
              </button>
            </div>

            {/* Menu Body - Split Layout */}
            <div className="relative z-20 flex-1 flex flex-col lg:flex-row max-w-7xl mx-auto w-full px-4 sm:px-6 lg:px-8 items-center justify-between py-6 lg:py-0">
              
              {/* Left Side: Realistic 3D Antique Bronze/Brown Sculptural Menorah with Granular Texture */}
              <div className="w-full lg:w-1/2 flex flex-col justify-center items-center h-[280px] sm:h-[350px] lg:h-[480px]">
                <div className="relative w-full max-w-[340px] sm:max-w-[420px] lg:max-w-[480px] flex items-center justify-center">
                  
                  {/* Subtle warm glow aura behind active menorah */}
                  <div 
                    className="absolute inset-0 rounded-full blur-3xl transition-opacity duration-700 pointer-events-none"
                    style={{
                      background: hoveredIndex !== null 
                        ? 'radial-gradient(circle, rgba(245,158,11,0.22) 0%, rgba(217,119,6,0.08) 50%, transparent 75%)' 
                        : 'radial-gradient(circle, rgba(168,114,64,0.08) 0%, transparent 60%)',
                      opacity: hoveredIndex !== null ? 1 : 0.4,
                    }}
                  />

                  <svg
                    viewBox="0 0 500 480"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                    className="w-full h-auto overflow-visible drop-shadow-[0_15px_25px_rgba(60,30,10,0.12)]"
                  >
                    <defs>
                      {/* Heavy granular stipple / bronze cast texture filter */}
                      <filter id="bronzeGrain" x="-10%" y="-10%" width="120%" height="120%">
                        <feTurbulence type="fractalNoise" baseFrequency="0.75" numOctaves="4" result="noise" />
                        <feColorMatrix type="matrix" values="1 0 0 0 0  0 1 0 0 0  0 0 1 0 0  0 0 0 0.55 0" in="noise" result="coloredNoise" />
                        <feComposite operator="in" in="coloredNoise" in2="SourceGraphic" result="textured" />
                        <feBlend in="SourceGraphic" in2="textured" mode="overlay" />
                      </filter>

                      {/* Deep Volumetric 3D Cylinder Gradients (Antique Bronze / Walnut Brown) */}
                      <linearGradient id="stemBronze3D" x1="0%" y1="0%" x2="100%" y2="0%">
                        <stop offset="0%" stopColor="#2E170A" />
                        <stop offset="20%" stopColor="#573117" />
                        <stop offset="50%" stopColor="#A86E3D" />
                        <stop offset="70%" stopColor="#D49B6A" />
                        <stop offset="85%" stopColor="#784420" />
                        <stop offset="100%" stopColor="#241207" />
                      </linearGradient>

                      <linearGradient id="armBronze3D" x1="0%" y1="0%" x2="100%" y2="100%">
                        <stop offset="0%" stopColor="#3B1E0C" />
                        <stop offset="25%" stopColor="#7C4722" />
                        <stop offset="55%" stopColor="#C48D5A" />
                        <stop offset="75%" stopColor="#E0B087" />
                        <stop offset="90%" stopColor="#8C5229" />
                        <stop offset="100%" stopColor="#2A1407" />
                      </linearGradient>

                      <radialGradient id="basePedestal3D" cx="50%" cy="30%" r="70%">
                        <stop offset="0%" stopColor="#C99465" />
                        <stop offset="40%" stopColor="#875128" />
                        <stop offset="75%" stopColor="#4A2711" />
                        <stop offset="100%" stopColor="#261206" />
                      </radialGradient>

                      <radialGradient id="cupBronze3D" cx="45%" cy="35%" r="60%">
                        <stop offset="0%" stopColor="#E4BA91" />
                        <stop offset="45%" stopColor="#A86E3D" />
                        <stop offset="80%" stopColor="#522C14" />
                        <stop offset="100%" stopColor="#261206" />
                      </radialGradient>

                      <linearGradient id="knopHighlight" x1="0%" y1="0%" x2="100%" y2="100%">
                        <stop offset="0%" stopColor="#F5D7B8" />
                        <stop offset="50%" stopColor="#9C6233" />
                        <stop offset="100%" stopColor="#301709" />
                      </linearGradient>

                      <radialGradient id="fireHalo" cx="50%" cy="50%" r="50%">
                        <stop offset="0%" stopColor="#F59E0B" stopOpacity="0.9" />
                        <stop offset="50%" stopColor="#EA580C" stopOpacity="0.5" />
                        <stop offset="100%" stopColor="#DC2626" stopOpacity="0" />
                      </radialGradient>
                    </defs>

                    {/* Menorah Pedestal Base Shadow */}
                    <ellipse cx="250" cy="460" rx="140" ry="14" fill="#3D2010" opacity="0.18" filter="blur(6px)" />

                    {/* ================= MENORAH BODY (3D BRONZE/BROWN ARTWORK) ================= */}
                    <g filter="url(#bronzeGrain)">
                      
                      {/* Tiered Ornate 3D Base */}
                      {/* Bottom tier base */}
                      <path
                        d="M140,455 C140,442 165,438 250,438 C335,438 360,442 360,455 C360,462 335,465 250,465 C165,465 140,462 140,455 Z"
                        fill="url(#basePedestal3D)"
                        stroke="#2B1408"
                        strokeWidth="1.5"
                      />
                      {/* Middle tier pedestal */}
                      <path
                        d="M175,440 L195,405 C215,400 285,400 305,405 L325,440 Z"
                        fill="url(#basePedestal3D)"
                        stroke="#2B1408"
                        strokeWidth="1.5"
                      />
                      {/* Top tier collar & ornamental ring */}
                      <ellipse cx="250" cy="405" rx="55" ry="8" fill="url(#knopHighlight)" stroke="#2B1408" strokeWidth="1" />
                      <ellipse cx="250" cy="385" rx="35" ry="12" fill="url(#basePedestal3D)" stroke="#2B1408" strokeWidth="1" />
                      
                      {/* Large Lower Knop / Ornamental Sphere on Stem */}
                      <circle cx="250" cy="360" r="18" fill="url(#knopHighlight)" stroke="#2B1408" strokeWidth="1.2" />
                      <ellipse cx="250" cy="342" rx="20" ry="5" fill="url(#cupBronze3D)" />

                      {/* ================= 6 BRANCHING ARMS (PAIR 1, 2, 3) ================= */}
                      
                      {/* Outer Arms (Branch 0 & 6) - Left: x=55, Right: x=445 */}
                      <path
                        d="M55,160 C55,340 238,340 242,340"
                        fill="none"
                        stroke="url(#armBronze3D)"
                        strokeWidth="13"
                        strokeLinecap="round"
                      />
                      <path
                        d="M445,160 C445,340 262,340 258,340"
                        fill="none"
                        stroke="url(#armBronze3D)"
                        strokeWidth="13"
                        strokeLinecap="round"
                      />

                      {/* Middle Arms (Branch 1 & 5) - Left: x=120, Right: x=380 */}
                      <path
                        d="M120,160 C120,290 240,290 244,290"
                        fill="none"
                        stroke="url(#armBronze3D)"
                        strokeWidth="12"
                        strokeLinecap="round"
                      />
                      <path
                        d="M380,160 C380,290 260,290 256,290"
                        fill="none"
                        stroke="url(#armBronze3D)"
                        strokeWidth="12"
                        strokeLinecap="round"
                      />

                      {/* Inner Arms (Branch 2 & 4) - Left: x=185, Right: x=315 */}
                      <path
                        d="M185,160 C185,240 242,240 246,240"
                        fill="none"
                        stroke="url(#armBronze3D)"
                        strokeWidth="11"
                        strokeLinecap="round"
                      />
                      <path
                        d="M315,160 C315,240 258,240 254,240"
                        fill="none"
                        stroke="url(#armBronze3D)"
                        strokeWidth="11"
                        strokeLinecap="round"
                      />

                      {/* Central Main Pillar (Branch 3) */}
                      <path
                        d="M243,155 L243,375 C243,378 257,378 257,375 L257,155 Z"
                        fill="url(#stemBronze3D)"
                        stroke="#2B1408"
                        strokeWidth="1.2"
                      />

                      {/* Decorative Joint Knops / Almond Blossoms on Arms */}
                      {[
                        { cx: 55, cy: 230 }, { cx: 445, cy: 230 },
                        { cx: 120, cy: 215 }, { cx: 380, cy: 215 },
                        { cx: 185, cy: 195 }, { cx: 315, cy: 195 },
                        { cx: 250, cy: 275 }, { cx: 250, cy: 220 }, { cx: 250, cy: 175 }
                      ].map((knop, kIdx) => (
                        <g key={kIdx}>
                          <ellipse cx={knop.cx} cy={knop.cy} rx="8" ry="6" fill="url(#knopHighlight)" stroke="#261206" strokeWidth="0.8" />
                          <ellipse cx={knop.cx} cy={knop.cy - 1} rx="4" ry="2" fill="#FCE7D0" opacity="0.6" />
                        </g>
                      ))}

                      {/* ================= 7 OIL LAMPS / CANDLE CUPS ================= */}
                      {candlePositions.map((candle) => (
                        <g key={`cup-${candle.id}`}>
                          {/* Lower chalice cup collar */}
                          <path
                            d={`M${candle.x - 14},${candle.y + 24} L${candle.x - 7},${candle.y + 32} L${candle.x + 7},${candle.y + 32} L${candle.x + 14},${candle.y + 24} Z`}
                            fill="url(#cupBronze3D)"
                            stroke="#2B1408"
                            strokeWidth="0.8"
                          />
                          {/* Main 3D Goblet/Cup */}
                          <path
                            d={`M${candle.x - 16},${candle.y + 10} C${candle.x - 18},${candle.y + 26} ${candle.x + 18},${candle.y + 26} ${candle.x + 16},${candle.y + 10} Z`}
                            fill="url(#cupBronze3D)"
                            stroke="#2B1408"
                            strokeWidth="1"
                          />
                          {/* Top rim of cup */}
                          <ellipse
                            cx={candle.x}
                            cy={candle.y + 10}
                            rx="16"
                            ry="5"
                            fill="url(#knopHighlight)"
                            stroke="#2B1408"
                            strokeWidth="1"
                          />
                          {/* Inner reservoir / dark oil basin */}
                          <ellipse
                            cx={candle.x}
                            cy={candle.y + 10}
                            rx="12"
                            ry="3.5"
                            fill="#1F0E05"
                          />
                          {/* Candle Wick */}
                          <line
                            x1={candle.x}
                            y1={candle.y + 9}
                            x2={candle.x}
                            y2={candle.y - 1}
                            stroke="#18181B"
                            strokeWidth="2.5"
                            strokeLinecap="round"
                          />
                          {/* Warm Ember on unlit wick */}
                          <circle
                            cx={candle.x}
                            cy={candle.y - 1}
                            r="1.8"
                            fill={hoveredIndex === candle.id ? '#FFED4A' : '#713F12'}
                            opacity={hoveredIndex === candle.id ? 1 : 0.5}
                          />
                        </g>
                      ))}
                    </g>

                    {/* ================= REALISTIC INTERACTIVE CANDLE FLAMES ================= */}
                    {candlePositions.map((candle) => {
                      const isLit = hoveredIndex === candle.id;
                      return (
                        <g key={`flame-${candle.id}`} className="transition-all duration-300">
                          {/* Ambient Radiant Glow when lit */}
                          {isLit && (
                            <>
                              {/* Outer wide fire halo */}
                              <circle
                                cx={candle.x}
                                cy={candle.y - 20}
                                r="48"
                                fill="url(#fireHalo)"
                                opacity="0.35"
                                filter="blur(8px)"
                              />
                              {/* Light cast reflection down on the bronze cup */}
                              <ellipse
                                cx={candle.x}
                                cy={candle.y + 10}
                                rx="14"
                                ry="4"
                                fill="#FEF08A"
                                opacity="0.85"
                                filter="blur(1px)"
                              />
                            </>
                          )}

                          {/* Multi-layered Elegant Fire Flame */}
                          <motion.g
                            initial={{ scale: 0.2, opacity: 0.05 }}
                            animate={{
                              scale: isLit ? 1 : 0.2,
                              opacity: isLit ? 1 : 0.05,
                              y: isLit ? 0 : 6,
                            }}
                            transition={{
                              duration: 0.35,
                              ease: [0.22, 1, 0.36, 1],
                            }}
                            style={{ originX: `${candle.x}px`, originY: `${candle.y + 4}px` }}
                          >
                            {/* Layer 1: Outer Warm Fire Envelope */}
                            <path
                              d={`M${candle.x},${candle.y + 2} Q${candle.x - 11},${candle.y - 14} ${candle.x - 3},${candle.y - 30} Q${candle.x},${candle.y - 44} ${candle.x + 3},${candle.y - 30} Q${candle.x + 11},${candle.y - 14} ${candle.x},${candle.y + 2} Z`}
                              fill="#EA580C"
                              filter="drop-shadow(0 0 8px rgba(234, 88, 12, 0.8))"
                            />

                            {/* Layer 2: Core Warm Golden Flame */}
                            <path
                              d={`M${candle.x},${candle.y} Q${candle.x - 7},${candle.y - 11} ${candle.x - 2},${candle.y - 24} Q${candle.x},${candle.y - 35} ${candle.x + 2},${candle.y - 24} Q${candle.x + 7},${candle.y - 11} ${candle.x},${candle.y} Z`}
                              fill="#F59E0B"
                              filter="drop-shadow(0 0 10px rgba(245, 158, 11, 0.9))"
                            />

                            {/* Layer 3: Inner Radiant Core */}
                            <path
                              d={`M${candle.x},${candle.y - 1} Q${candle.x - 3.5},${candle.y - 7} ${candle.x},${candle.y - 16} Q${candle.x + 3.5},${candle.y - 7} ${candle.x},${candle.y - 1} Z`}
                              fill="#FFFBEB"
                              filter="drop-shadow(0 0 4px #FFFFFF)"
                            />
                          </motion.g>
                        </g>
                      );
                    })}
                  </svg>
                </div>
              </div>

              {/* Right Side: Menu Items */}
              <div className="w-full lg:w-1/2 flex flex-col justify-center space-y-2 sm:space-y-4 lg:space-y-5 lg:pl-16 xl:pl-24">
                {menuItems.map((item, index) => {
                  const isHovered = hoveredIndex === index;
                  return (
                    <motion.div
                      key={item.label}
                      initial={{ opacity: 0, x: 25 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.08 + index * 0.04, duration: 0.4, ease: 'easeOut' }}
                    >
                      <Link
                        href={item.href}
                        onClick={() => setIsOpen(false)}
                        className="group flex items-baseline py-1 transition-all duration-300"
                        onMouseEnter={() => setHoveredIndex(index)}
                        onMouseLeave={() => setHoveredIndex(null)}
                      >
                        {/* Number Indicator */}
                        <span 
                          className={`mr-4 sm:mr-6 text-xs sm:text-sm font-mono tracking-wider transition-colors duration-300 ${
                            isHovered ? 'text-amber-700 font-bold' : 'text-stone-400 group-hover:text-stone-600'
                          }`}
                        >
                          0{index + 1}
                        </span>

                        {/* Link Text matching app font */}
                        <span 
                          className={`text-3xl sm:text-4xl lg:text-5xl tracking-tight transition-all duration-300 ${
                            isHovered
                              ? 'text-stone-950 translate-x-2 font-medium'
                              : 'text-stone-600 group-hover:text-stone-900 font-normal'
                          }`}
                        >
                          {item.label}
                        </span>

                        {/* Subtle interactive warm amber dash on hover */}
                        <span 
                          className={`ml-4 h-[2px] bg-gradient-to-r from-amber-600 to-amber-400 rounded-full transition-all duration-300 ${
                            isHovered ? 'w-12 opacity-100' : 'w-0 opacity-0'
                          }`}
                        />
                      </Link>
                    </motion.div>
                  );
                })}
              </div>

            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
