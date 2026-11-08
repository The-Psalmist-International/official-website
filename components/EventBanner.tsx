'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

type EventInfo = {
  name: string;
  dayText: string;
  time: string;
  location: string;
  link: string;
  isToday: boolean;
};

const EVENT_CONFIG = {
  shabbat: {
    name: 'Shabbat Service',
    dayName: 'Saturday',
    time: '2:00 PM',
    location: 'Mountain of light Auditorium',
    link: 'https://share.google/ONIqoMH5HO69gJyGj',
  },
  midweek: {
    name: 'Midweek Service',
    dayName: 'Wednesday',
    time: '7:00 PM',
    location: 'Mountain of light Auditorium',
    link: 'https://share.google/ONIqoMH5HO69gJyGj',
  },
};

export default function EventBanner() {
  const [event, setEvent] = useState<EventInfo | null>(null);

  useEffect(() => {
    const now = new Date();
    const day = now.getDay(); // 0 = Sun, 1 = Mon, 2 = Tue, 3 = Wed, 4 = Thu, 5 = Fri, 6 = Sat
    const hour = now.getHours();

    let targetKey: 'shabbat' | 'midweek';
    let isToday = false;

    if (day === 3) {
      // Wednesday
      if (hour < 19) {
        targetKey = 'midweek';
        isToday = true;
      } else {
        targetKey = 'shabbat';
      }
    } else if (day === 6) {
      // Saturday
      if (hour < 14) {
        targetKey = 'shabbat';
        isToday = true;
      } else {
        targetKey = 'midweek';
      }
    } else if (day > 3 && day < 6) {
      // Thursday, Friday
      targetKey = 'shabbat';
    } else {
      // Sunday, Monday, Tuesday
      targetKey = 'midweek';
    }

    const info = EVENT_CONFIG[targetKey];
    const dayText = isToday ? 'Today' : (day === 2 || day === 5 ? `Tomorrow (${info.dayName})` : `${info.dayName}s`);

    setEvent({
      name: info.name,
      dayText,
      time: info.time,
      location: info.location,
      link: info.link,
      isToday,
    });
  }, []);

  if (!event) return null;

  return (
    <motion.aside
      initial={{ opacity: 0, y: -8 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      aria-label="Upcoming Church Service Announcement"
      className="relative z-50 w-full bg-[#180320] border-b border-white/10 text-white/90 px-3 py-2 text-xs sm:px-6 lg:px-8"
    >
      <div className="mx-auto flex max-w-[1400px] flex-wrap items-center justify-center gap-x-2.5 gap-y-1 text-center font-normal">
        {/* Event description */}
        <span className="text-white/80">
          Join us for <strong className="font-semibold text-white">{event.name}</strong>
          {' — '}
          <span className="text-white/90">
            {event.dayText} at {event.time}
          </span>
          <span className="hidden sm:inline text-white/70"> at {event.location}</span>
        </span>

        {/* Link / CTA */}
        <a
          href={event.link}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-1 font-medium text-white underline decoration-white/30 underline-offset-4 transition-colors hover:text-white hover:decoration-white ml-1"
        >
          <span>Get Directions</span>
          <svg
            width="11"
            height="11"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2.5"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="opacity-75"
            aria-hidden="true"
          >
            <line x1="5" y1="12" x2="19" y2="12" />
            <polyline points="12 5 19 12 12 19" />
          </svg>
        </a>
      </div>
    </motion.aside>
  );
}
