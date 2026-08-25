'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';

const footerLinks = {
  EXPLORE: [
    { label: 'About Us', href: '/about-us' },
    { label: 'Leadership', href: '/about-us#leadership' },
    { label: 'Our History', href: '/about-us#history' },
    { label: 'Sermons', href: '/sermons' },
  ],
  MINISTRIES: [
    { label: 'House of Prayer', href: '/ministries#house-of-prayer' },
    { label: 'The Watchmen', href: '/ministries#watchmen' },
    { label: 'Zemirot', href: '/ministries#zemirot' },
    { label: 'The Oracles', href: '/ministries#oracles' },
    { label: 'Mystic Theatre', href: '/ministries#mystic-theatre' },
    { label: 'Priestesses of the Altar', href: '/ministries#priestesses' },
  ],
  COMMUNITY: [
    { label: 'Events', href: '/events' },
    { label: 'French Community', href: '/ministries#french' },
    { label: 'Connect', href: '/connect' },
  ],
  GIVING: [
    { label: 'Give Online', href: '/give' },
    { label: 'Mission Support', href: '/give#missions' },
    { label: 'Contact Us', href: '/contact' },
  ],
};

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-[#2b0835] text-white font-['Stack_Sans_Headline',sans-serif]">

      {/* CTA Hero Strip */}
      <div className="border-b border-white/15 px-6 sm:px-8 lg:px-12 py-14 sm:py-18 md:py-20">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row md:items-center justify-between gap-8 md:gap-12">
          <div className="max-w-xl">
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-normal leading-tight tracking-tight text-white mb-3">
              Come journey with us.
            </h2>
            <p className="text-white/65 text-base sm:text-lg font-light leading-relaxed max-w-md">
              Whether you're new to faith or walking deep in the Spirit — there's a place for you here at The Martyrs Church.
            </p>
          </div>

          <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
            <Link
              href="/connect"
              className="inline-flex items-center gap-3 border border-white/80 text-white px-7 py-3.5 text-sm font-medium tracking-wide hover:bg-white hover:text-[#2b0835] transition-all duration-300 group whitespace-nowrap"
            >
              Connect With Us
              <svg
                width="16"
                height="16"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="group-hover:translate-x-1 transition-transform duration-200"
              >
                <line x1="5" y1="12" x2="19" y2="12" />
                <polyline points="12 5 19 12 12 19" />
              </svg>
            </Link>
          </motion.div>
        </div>
      </div>

      {/* Main Footer Body */}
      <div className="px-6 sm:px-8 lg:px-12 py-12 md:py-16">
        <div className="max-w-7xl mx-auto flex flex-col lg:flex-row gap-12 lg:gap-16">

          {/* Brand Column */}
          <div className="lg:w-64 xl:w-72 flex-shrink-0">
            <Link href="/" className="block text-xl font-semibold tracking-tight text-white mb-3 hover:text-white/80 transition-colors">
              The Martyrs Church
            </Link>
            <p className="text-white/55 text-sm font-light leading-relaxed">
              An apostolic movement raising a prophetic generation to disciple nations and manifest the complete witness of God.
            </p>

            {/* Social Icons */}
            <div className="flex items-center gap-4 mt-6">
              {[
                {
                  label: 'YouTube',
                  href: '#',
                  icon: (
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
                      <path d="M22.54 6.42a2.78 2.78 0 0 0-1.95-1.96C18.88 4 12 4 12 4s-6.88 0-8.59.46A2.78 2.78 0 0 0 1.46 6.42 29 29 0 0 0 1 12a29 29 0 0 0 .46 5.58A2.78 2.78 0 0 0 3.41 19.6C5.12 20 12 20 12 20s6.88 0 8.59-.46a2.78 2.78 0 0 0 1.95-1.95A29 29 0 0 0 23 12a29 29 0 0 0-.46-5.58z"/>
                      <polygon points="9.75 15.02 15.5 12 9.75 8.98 9.75 15.02" fill="#2b0835"/>
                    </svg>
                  ),
                },
                {
                  label: 'Instagram',
                  href: '#',
                  icon: (
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
                      <rect x="2" y="2" width="20" height="20" rx="5" ry="5"/>
                      <circle cx="12" cy="12" r="4"/>
                      <circle cx="17.5" cy="6.5" r="0.5" fill="currentColor"/>
                    </svg>
                  ),
                },
                {
                  label: 'Facebook',
                  href: '#',
                  icon: (
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
                      <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"/>
                    </svg>
                  ),
                },
              ].map(({ label, href, icon }) => (
                <a
                  key={label}
                  href={href}
                  aria-label={label}
                  className="text-white/50 hover:text-white transition-colors duration-200"
                >
                  {icon}
                </a>
              ))}
            </div>
          </div>

          {/* Nav Link Columns */}
          <div className="flex-1 grid grid-cols-2 sm:grid-cols-4 gap-8 sm:gap-6">
            {Object.entries(footerLinks).map(([category, links]) => (
              <div key={category}>
                <p className="text-white/40 text-[11px] font-semibold tracking-[0.12em] uppercase mb-4">
                  {category}
                </p>
                <ul className="space-y-2.5">
                  {links.map(({ label, href }) => (
                    <li key={label}>
                      <Link
                        href={href}
                        className="text-white/70 text-sm font-light hover:text-white transition-colors duration-200"
                      >
                        {label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>

        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-white/10 px-6 sm:px-8 lg:px-12 py-5">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-3 text-white/35 text-xs font-light">
          <p>© {currentYear} The Martyrs Church. All rights reserved.</p>
          <div className="flex items-center gap-5">
            <Link href="/privacy" className="hover:text-white/70 transition-colors">Privacy Policy</Link>
            <Link href="/terms" className="hover:text-white/70 transition-colors">Terms of Service</Link>
          </div>
        </div>
      </div>

    </footer>
  );
}
