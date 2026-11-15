'use client';

import Image, { type ImageProps } from 'next/image';
import { useSiteContent } from './ContentProvider';

export default function CmsImage(props: ImageProps) {
  const replacement = useSiteContent().media[typeof props.src === 'string' ? props.src : ''];
  const candidate = replacement?.url || props.src;
  const src = typeof candidate === 'string' && !/^(https?:\/\/|\/(?!\/))/.test(candidate) ? '/assets/church-bg-2.jpg' : candidate;
  const remote = typeof src === 'string' && /^https?:/.test(src);
  const sanityImage = typeof src === 'string' && src.startsWith('https://cdn.sanity.io/images/');
  return <Image {...props} src={src} alt={replacement?.alt || props.alt} unoptimized={props.unoptimized || (remote && !sanityImage)} />;
}
