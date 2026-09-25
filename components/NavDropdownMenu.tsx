'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';

export type NavDropdownChild = {
  label: string;
  href: string;
  description: string;
  icon: 'story' | 'leadership' | 'history' | 'ministry' | 'sermons' | 'events' | 'all';
};

type NavDropdownMenuProps = {
  items: NavDropdownChild[];
  onClose: () => void;
  align?: 'left' | 'center';
  className?: string;
};

function DropdownIcon({ type }: { type: NavDropdownChild['icon'] }) {
  const iconClass = 'size-[18px]';

  switch (type) {
    case 'story':
      return (
        <svg className={iconClass} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
          <path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20" />
          <path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z" />
        </svg>
      );
    case 'leadership':
      return (
        <svg className={iconClass} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
          <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" />
          <circle cx="9" cy="7" r="4" />
          <path d="M22 21v-2a4 4 0 0 0-3-3.87" />
          <path d="M16 3.13a4 4 0 0 1 0 7.75" />
        </svg>
      );
    case 'history':
      return (
        <svg className={iconClass} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
          <circle cx="12" cy="12" r="10" />
          <polyline points="12 6 12 12 16 14" />
        </svg>
      );
    case 'ministry':
      return (
        <svg className={iconClass} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
          <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
        </svg>
      );
    case 'sermons':
      return (
        <svg className={iconClass} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
          <polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5" />
          <path d="M15.54 8.46a5 5 0 0 1 0 7.07" />
        </svg>
      );
    case 'events':
      return (
        <svg className={iconClass} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
          <rect x="3" y="4" width="18" height="18" rx="2" ry="2" />
          <line x1="16" y1="2" x2="16" y2="6" />
          <line x1="8" y1="2" x2="8" y2="6" />
          <line x1="3" y1="10" x2="21" y2="10" />
        </svg>
      );
    case 'all':
      return (
        <svg className={iconClass} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
          <rect x="3" y="3" width="7" height="7" />
          <rect x="14" y="3" width="7" height="7" />
          <rect x="14" y="14" width="7" height="7" />
          <rect x="3" y="14" width="7" height="7" />
        </svg>
      );
  }
}

export function NavDropdownItem({
  item,
  onClose,
  compact = false,
}: {
  item: NavDropdownChild;
  onClose: () => void;
  compact?: boolean;
}) {
  return (
    <Link
      href={item.href}
      onClick={onClose}
      className={`group flex gap-3.5 rounded-lg transition-colors hover:bg-[#f8f3fa] ${
        compact ? 'px-3 py-3' : 'px-3 py-3.5'
      }`}
    >
      <div className="flex size-11 shrink-0 items-center justify-center rounded-lg bg-[#f2e7f4] text-[#7028a8] transition-colors group-hover:bg-[#eadcf0]">
        <DropdownIcon type={item.icon} />
      </div>
      <div className="min-w-0 pt-0.5">
        <span className="block text-[15px] font-medium leading-tight text-[#2b0835]">
          {item.label}
        </span>
        <span className="graphik mt-1 block text-sm leading-snug text-stone-500">
          {item.description}
        </span>
      </div>
    </Link>
  );
}

export default function NavDropdownMenu({
  items,
  onClose,
  align = 'left',
  className = '',
}: NavDropdownMenuProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: 8 }}
      transition={{ duration: 0.2, ease: [0.22, 1, 0.36, 1] }}
      className={`absolute top-full z-50 mt-3 w-[min(calc(100vw-2rem),400px)] overflow-hidden rounded-lg border border-stone-100/90 bg-white p-3 shadow-[0_24px_60px_rgba(43,8,53,0.12),0_8px_20px_rgba(43,8,53,0.06)] ${
        align === 'center' ? 'left-1/2 -translate-x-1/2' : 'left-0'
      } ${className}`}
    >
      <div className="flex flex-col gap-0.5">
        {items.map((item) => (
          <NavDropdownItem key={item.href + item.label} item={item} onClose={onClose} />
        ))}
      </div>
    </motion.div>
  );
}
