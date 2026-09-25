'use client';

import { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import { ministries } from '@/data/ministries';
import Button from '@/components/ui/Button';
import NavDropdownMenu, { NavDropdownItem, type NavDropdownChild } from '@/components/NavDropdownMenu';

type NavItem =
  | { label: string; href: string; children?: never }
  | { label: string; href: string; children: NavDropdownChild[] };

const navItems: NavItem[] = [
  {
    label: 'About',
    href: '/about-us',
    children: [
      {
        label: 'Our Story',
        href: '/about-us',
        description: 'Discover who we are and what God is building through us.',
        icon: 'story',
      },
      {
        label: 'Leadership',
        href: '/about-us#leadership',
        description: 'Meet the pastors and leaders guiding our church.',
        icon: 'leadership',
      },
      {
        label: 'Our History',
        href: '/about-us#history',
        description: 'Trace the journey of faith that shaped our community.',
        icon: 'history',
      },
    ],
  },
  {
    label: 'Ministries',
    href: '/ministries',
    children: [
      ...ministries.slice(0, 4).map((m) => ({
        label: m.name,
        href: `/ministries#${m.id}`,
        description: m.summary,
        icon: 'ministry' as const,
      })),
      {
        label: 'View all ministries',
        href: '/ministries',
        description: 'Explore every expression of ministry in our church.',
        icon: 'all',
      },
    ],
  },
  { label: 'Sermons', href: '/sermons' },
  { label: 'Events', href: '/events' },
];

function ChevronDown({ className }: { className?: string }) {
  return (
    <svg
      width="14"
      height="14"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
      aria-hidden
    >
      <polyline points="6 9 12 15 18 9" />
    </svg>
  );
}

function ChurchMark({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 32 32"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      aria-hidden
    >
      <circle cx="16" cy="16" r="15" stroke="currentColor" strokeWidth="1.5" opacity="0.35" />
      <circle cx="16" cy="16" r="10" stroke="currentColor" strokeWidth="1.5" opacity="0.55" />
      <circle cx="16" cy="16" r="5" fill="currentColor" />
    </svg>
  );
}

export default function Navbar() {
  const [isVisible, setIsVisible] = useState(true);
  const [isScrolled, setIsScrolled] = useState(false);
  const [openDropdown, setOpenDropdown] = useState<string | null>(null);
  const [mobileOpen, setMobileOpen] = useState(false);
  const lastScrollY = useRef(0);
  const navRef = useRef<HTMLElement>(null);

  const pathname = usePathname();
  const isHomePage = pathname === '/';
  const isHeroStyle = isHomePage && !isScrolled;

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      setIsScrolled(currentScrollY > 40);

      if (currentScrollY <= 40) {
        setIsVisible(true);
      } else if (currentScrollY > lastScrollY.current && currentScrollY > 80) {
        setIsVisible(false);
      } else if (currentScrollY < lastScrollY.current) {
        setIsVisible(true);
      }

      lastScrollY.current = currentScrollY;
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    setMobileOpen(false);
    setOpenDropdown(null);
  }, [pathname]);

  useEffect(() => {
    document.body.style.overflow = mobileOpen ? 'hidden' : '';
    return () => {
      document.body.style.overflow = '';
    };
  }, [mobileOpen]);

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (navRef.current && !navRef.current.contains(e.target as Node)) {
        setOpenDropdown(null);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const linkColor = isHeroStyle
    ? 'text-white/85 hover:text-white'
    : 'text-stone-600 hover:text-[#2b0835]';

  const activeLinkColor = isHeroStyle ? 'text-white' : 'text-[#2b0835]';

  const isActive = (href: string) => {
    if (href === '/') return pathname === '/';
    return pathname === href || pathname.startsWith(`${href}/`);
  };

  return (
    <>
      <motion.nav
        ref={navRef}
        initial={false}
        animate={{
          y: isVisible || mobileOpen ? 0 : -100,
          opacity: isVisible || mobileOpen ? 1 : 0,
        }}
        transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
        className={`fixed top-0 left-0 w-full z-40 overflow-visible transition-all duration-300 ${
          isHeroStyle
            ? 'bg-transparent text-white'
            : 'bg-white/90 backdrop-blur-md text-[#2b0835]'
        } ${
          isScrolled
            ? 'border-b border-stone-200/60 shadow-[0_4px_20px_rgba(0,0,0,0.03)]'
            : 'border-b border-transparent shadow-none'
        }`}
      >
        <div className="mx-auto flex h-14 max-w-7xl items-center justify-between gap-6 px-4 sm:h-16 sm:px-6 lg:px-8">
          {/* Logo */}
          <Link
            href="/"
            className={`flex shrink-0 items-center gap-2.5 transition-opacity hover:opacity-80 ${
              isHeroStyle ? 'text-white' : 'text-[#2b0835]'
            }`}
          >
            <ChurchMark className="size-7 sm:size-8" />
            <span className="text-lg font-semibold tracking-tight sm:text-xl">
              The Martyrs Church
            </span>
          </Link>

          {/* Desktop nav links */}
          <div className="hidden flex-1 items-center justify-center gap-1 lg:flex">
            {navItems.map((item) => {
              const hasChildren = 'children' in item && item.children;
              const active = isActive(item.href);

              if (!hasChildren) {
                return (
                  <Link
                    key={item.label}
                    href={item.href}
                    className={`rounded-md px-4 py-2.5 text-base font-medium transition-colors lg:text-[17px] ${
                      active ? activeLinkColor : linkColor
                    }`}
                  >
                    {item.label}
                  </Link>
                );
              }

              return (
                <div
                  key={item.label}
                  className="relative"
                  onMouseEnter={() => setOpenDropdown(item.label)}
                  onMouseLeave={() => setOpenDropdown(null)}
                >
                  <button
                    type="button"
                    onClick={() =>
                      setOpenDropdown(openDropdown === item.label ? null : item.label)
                    }
                    className={`inline-flex items-center gap-1.5 rounded-md px-4 py-2.5 text-base font-medium transition-colors lg:text-[17px] ${
                      active ? activeLinkColor : linkColor
                    } ${openDropdown === item.label ? (isHeroStyle ? 'text-white' : 'text-[#2b0835]') : ''}`}
                    aria-expanded={openDropdown === item.label}
                    aria-haspopup="true"
                  >
                    {item.label}
                    <ChevronDown
                      className={`transition-transform duration-200 ${
                        openDropdown === item.label ? 'rotate-180' : ''
                      }`}
                    />
                  </button>

                  <AnimatePresence>
                    {openDropdown === item.label && (
                      <NavDropdownMenu
                        items={item.children}
                        onClose={() => setOpenDropdown(null)}
                      />
                    )}
                  </AnimatePresence>
                </div>
              );
            })}
          </div>

          {/* Desktop CTAs */}
          <div className="hidden shrink-0 items-center gap-5 lg:flex">
            <Link
              href="/connect"
              className={`text-base font-medium transition-colors lg:text-[17px] ${
                isHeroStyle
                  ? 'text-white hover:text-white/80'
                  : 'text-[#7028a8] hover:text-[#541460]'
              }`}
            >
              Connect
            </Link>
            <Button
              href="/give"
              size="sm"
              variant={isHeroStyle ? 'ghost-white' : 'primary'}
            >
              Give
            </Button>
          </div>

          {/* Mobile menu toggle */}
          <button
            type="button"
            onClick={() => setMobileOpen((prev) => !prev)}
            className={`p-2 lg:hidden ${isHeroStyle ? 'text-white' : 'text-[#2b0835]'}`}
            aria-label={mobileOpen ? 'Close menu' : 'Open menu'}
            aria-expanded={mobileOpen}
          >
            {mobileOpen ? (
              <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round">
                <line x1="18" y1="6" x2="6" y2="18" />
                <line x1="6" y1="6" x2="18" y2="18" />
              </svg>
            ) : (
              <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round">
                <line x1="3" y1="6" x2="21" y2="6" />
                <line x1="3" y1="12" x2="21" y2="12" />
                <line x1="3" y1="18" x2="21" y2="18" />
              </svg>
            )}
          </button>
        </div>

        {/* Mobile menu panel */}
        <AnimatePresence>
          {mobileOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.25, ease: [0.22, 1, 0.36, 1] }}
              className="overflow-hidden border-t border-stone-200/60 bg-white lg:hidden"
            >
              <div className="space-y-1 px-4 py-4 sm:px-6">
                {navItems.map((item) => {
                  const hasChildren = 'children' in item && item.children;

                  if (!hasChildren) {
                    return (
                      <Link
                        key={item.label}
                        href={item.href}
                        className="block rounded-lg px-3 py-3 text-lg font-medium text-stone-700 hover:bg-[#f5edf5] hover:text-[#2b0835]"
                      >
                        {item.label}
                      </Link>
                    );
                  }

                  const expanded = openDropdown === item.label;

                  return (
                    <div key={item.label}>
                      <button
                        type="button"
                        onClick={() =>
                          setOpenDropdown(expanded ? null : item.label)
                        }
                        className="flex w-full items-center justify-between rounded-lg px-3 py-3 text-lg font-medium text-stone-700 hover:bg-[#f5edf5]"
                      >
                        {item.label}
                        <ChevronDown
                          className={`transition-transform ${expanded ? 'rotate-180' : ''}`}
                        />
                      </button>
                      <AnimatePresence>
                        {expanded && (
                          <motion.div
                            initial={{ opacity: 0, height: 0 }}
                            animate={{ opacity: 1, height: 'auto' }}
                            exit={{ opacity: 0, height: 0 }}
                            className="overflow-hidden px-1 pb-2"
                          >
                            {item.children.map((child) => (
                              <NavDropdownItem
                                key={child.href + child.label}
                                item={child}
                                onClose={() => setOpenDropdown(null)}
                                compact
                              />
                            ))}
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </div>
                  );
                })}

                <div className="mt-4 flex flex-col gap-3 border-t border-stone-100 pt-4">
                  <Link
                    href="/connect"
                    className="rounded-lg px-3 py-3 text-center text-base font-medium text-[#7028a8]"
                  >
                    Connect
                  </Link>
                  <Button href="/give" className="w-full">
                    Give
                  </Button>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.nav>
    </>
  );
}
