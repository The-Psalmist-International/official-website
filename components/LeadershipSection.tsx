'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface Leader {
  id: string;
  name: string;
  role: string;
  image: string;
  bio?: string;
}

interface Category {
  id: string;
  title: string;
  shortTitle?: string;
  leaders: Leader[];
}

const leadershipData: Category[] = [
  {
    id: 'core-leadership',
    title: 'CORE LEADERSHIP',
    shortTitle: 'Core Leadership',
    leaders: [
      {
        id: '1',
        name: 'Reverend Elorm John Tetteh',
        role: 'Global Lead & Setman',
        image: '/assets/IMG_7172.JPG',
      },
      {
        id: '2',
        name: 'Joseph Blay Mensah',
        role: 'Administrator',
        image: '/assets/IMG_7174.JPG',
      },
      {
        id: '3',
        name: 'Bishop Derek Agbeko',
        role: 'Assistant Administrator',
        image: '/assets/IMG_7178.JPG',
      },
      {
        id: '4',
        name: 'Episcopal Leader',
        role: 'Assistant Administrator',
        image: '/assets/IMG_7191.JPG',
      },
    ],
  },
  {
    id: 'ministry-coordinators',
    title: 'MINISTRY & COMMUNITY',
    shortTitle: 'Coordinators',
    leaders: [
      {
        id: '5',
        name: 'Pastor Michael Brown',
        role: 'Campus Ministry Coordinator',
        image: '/assets/IMG_7194.JPG',
      },
      {
        id: '6',
        name: 'Sarah Mensah',
        role: 'Discipleship Lead',
        image: '/assets/IMG_7234.JPG',
      },
      {
        id: '7',
        name: 'David Osei',
        role: 'Outreach & Community Lead',
        image: '/assets/IMG_7237.JPG',
      },
      {
        id: '8',
        name: 'Grace Ampofo',
        role: 'Worship Coordinator',
        image: '/assets/IMG_7255.JPG',
      },
    ],
  },
  {
    id: 'watchmen',
    title: 'WATCHMEN',
    shortTitle: 'Watchmen',
    leaders: [
      {
        id: '9',
        name: 'Elder Joshua Mensah',
        role: 'Chief Intercessor',
        image: '/assets/IMG_7283.JPG',
      },
      {
        id: '10',
        name: 'Minister Samuel Addo',
        role: 'Prophetic Watchman',
        image: '/assets/IMG_7289.JPG',
      },
      {
        id: '11',
        name: 'Daniel Kojo',
        role: 'Night Watch Coordinator',
        image: '/assets/IMG_7294.JPG',
      },
    ],
  },
  {
    id: 'priestess-of-the-altar',
    title: 'PRIESTESS OF THE ALTAR',
    shortTitle: 'Priestess of the Altar',
    leaders: [
      {
        id: '12',
        name: 'Lady Pastor Deborah',
        role: 'Lead Intercessor',
        image: '/assets/IMG_7255.JPG',
      },
      {
        id: '13',
        name: 'Minister Abigail Boateng',
        role: 'Altar Ministry Coordinator',
        image: '/assets/IMG_7295.JPG',
      },
    ],
  },
  {
    id: 'missions',
    title: 'MISSIONS',
    shortTitle: 'Missions',
    leaders: [
      {
        id: '14',
        name: 'Pastor Peter Kwakye',
        role: 'Global Missions Director',
        image: '/assets/IMG_6718.JPG',
      },
      {
        id: '15',
        name: 'Timothy Ansah',
        role: 'Unreached Nations Coordinator',
        image: '/assets/IMG_6744.JPG',
      },
    ],
  },
  {
    id: 'house-of-prayer',
    title: 'HOUSE OF PRAYER',
    shortTitle: 'House of Prayer',
    leaders: [
      {
        id: '16',
        name: 'Minister Caleb Arthur',
        role: '24/7 Prayer Hub Lead',
        image: '/assets/IMG_6756.JPG',
      },
      {
        id: '17',
        name: 'Esther Appiah',
        role: 'Spiritual Formation Lead',
        image: '/assets/IMG_6776.JPG',
      },
    ],
  },
  {
    id: 'french-community',
    title: 'FRENCH COMMUNITY',
    shortTitle: 'French Community',
    leaders: [
      {
        id: '18',
        name: 'Pasteur Jean-Paul Koffi',
        role: 'Francophone Ministry Lead',
        image: '/assets/IMG_7139.JPG',
      },
    ],
  },
];

export default function LeadershipSection() {
  const [activeTabId, setActiveTabId] = useState<string>('core-leadership');

  const activeCategory = leadershipData.find((cat) => cat.id === activeTabId) || leadershipData[0];

  return (
    <section className="w-full bg-[#180320] text-white py-20 sm:py-28 px-4 sm:px-6 lg:px-8 font-['Stack_Sans_Headline',sans-serif] relative overflow-hidden">
      {/* Subtle background ambient grain & gradient */}
      <div 
        className="absolute inset-0 opacity-[0.05] pointer-events-none mix-blend-overlay"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")`,
        }}
      />
      
      <div className="max-w-7xl mx-auto relative z-10">
        
        {/* Header - Linear Style Split Row */}
        <div className="flex flex-col md:flex-row md:items-start justify-between gap-6 md:gap-12 pb-6">
          <div className="max-w-xl">
            <h2 className="text-4xl sm:text-5xl lg:text-6xl font-normal tracking-tight text-white">
              The Leadership
            </h2>
          </div>
          <div className="max-w-md">
            <p className="text-base sm:text-lg text-purple-200/80 font-light leading-relaxed">
              Stewards of the vision, committed to raising and equipping the body.
            </p>
          </div>
        </div>

        {/* Category Pill Tabs */}
        <div className="mt-8 mb-12 flex items-center gap-2.5 overflow-x-auto pb-3 no-scrollbar flex-wrap">
          {leadershipData.map((category) => {
            const isActive = category.id === activeTabId;

            return (
              <button
                key={category.id}
                onClick={() => setActiveTabId(category.id)}
                className={`relative px-5 py-2.5 rounded-full text-xs sm:text-sm font-medium tracking-wide uppercase transition-colors duration-300 focus:outline-none whitespace-nowrap border ${
                  isActive 
                    ? 'border-[#c026d3] text-white' 
                    : 'border-purple-800/50 bg-purple-950/20 text-purple-300/80 hover:border-purple-600 hover:text-white'
                }`}
              >
                {/* Active Solid Pill Indicator (No gradient) */}
                {isActive && (
                  <motion.div
                    layoutId="activeCategoryPill"
                    transition={{ type: 'spring', stiffness: 380, damping: 30 }}
                    className="absolute inset-0 rounded-full bg-[#c026d3]"
                  />
                )}
                <span className="relative z-10">
                  {category.title}
                </span>
              </button>
            );
          })}
        </div>

        {/* Team Grid (Linear Style Grid for Active Tab) */}
        <AnimatePresence mode="wait">
          <motion.div
            key={activeCategory.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
            className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6"
          >
            {activeCategory.leaders.map((leader, index) => (
              <motion.div
                key={leader.id}
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: index * 0.05, duration: 0.3 }}
                className="group flex flex-col relative rounded-2xl bg-[#24032d] border border-purple-800/30 overflow-hidden hover:border-purple-500/50 transition-all duration-400 hover:shadow-[0_15px_35px_rgba(0,0,0,0.45)]"
              >
                {/* Portrait Photo Container */}
                <div className="relative aspect-[4/5] w-full overflow-hidden bg-purple-900/20">
                  <img
                    src={leader.image}
                    alt={leader.name}
                    className="w-full h-full object-cover object-center grayscale contrast-[1.05] group-hover:grayscale-0 group-hover:scale-105 transition-all duration-500 ease-out"
                  />
                </div>

                {/* Card Details (Solid Background) */}
                <div className="p-5 flex flex-col justify-between flex-1 bg-[#24032d]">
                  <div>
                    <span className="block text-xs font-medium text-purple-300 uppercase tracking-wider mb-1.5">
                      {leader.role}
                    </span>
                    <h3 className="text-lg font-medium text-white tracking-tight group-hover:text-purple-100 transition-colors">
                      {leader.name}
                    </h3>
                  </div>

                  {/* External Profile / Info Action Icon */}
                  <div className="mt-4 flex justify-end">
                    <div className="w-8 h-8 rounded-lg bg-[#c026d3] flex items-center justify-center text-white shadow-md group-hover:bg-[#d946ef] transition-colors">
                      <svg
                        width="14"
                        height="14"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2.5"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      >
                        <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"></path>
                        <polyline points="15 3 21 3 21 9"></polyline>
                        <line x1="10" y1="14" x2="21" y2="3"></line>
                      </svg>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </AnimatePresence>

      </div>
    </section>
  );
}
