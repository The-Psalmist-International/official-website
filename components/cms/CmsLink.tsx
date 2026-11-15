'use client';

import Link from 'next/link';
import { forwardRef, type AnchorHTMLAttributes } from 'react';
import { useSiteContent } from './ContentProvider';
import { safeContentUrl } from '@/lib/cms/types';

const CmsLink = forwardRef<HTMLAnchorElement, AnchorHTMLAttributes<HTMLAnchorElement>>(function CmsLink({ href = '', ...props }, ref) {
  const replacement = useSiteContent().links[href];
  const target = safeContentUrl(replacement, safeContentUrl(href, '#'));
  if (target.startsWith('/') && !target.startsWith('//')) return <Link {...props} ref={ref} href={target} />;
  return <a {...props} ref={ref} href={target} />;
});
export default CmsLink;
