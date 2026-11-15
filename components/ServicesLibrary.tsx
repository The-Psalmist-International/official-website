'use client';

import CmsText from '@/components/cms/CmsText';
import CmsLink from '@/components/cms/CmsLink';
import { useRef, useState, type ReactNode } from 'react';
import Image from '@/components/cms/CmsImage';
import type { BroadcastStatus, ServicePage, ServiceVideo } from '@/lib/youtube';

interface Feed extends ServicePage { status: BroadcastStatus; failed: boolean }
const channel = 'https://www.youtube.com/@ChurchOfTheMartyrs/streams';
const feedNames: Record<BroadcastStatus, string> = { live: 'Live now', upcoming: 'Coming up', completed: 'All services' };
const date = (value: string) => new Intl.DateTimeFormat('en-GB', { day: 'numeric', month: 'short', year: 'numeric', timeZone: 'UTC' }).format(new Date(value));

function VideoCard({ video, onSelect }: { video: ServiceVideo; onSelect: (video: ServiceVideo) => void }) {
  return <button type="button" onClick={() => onSelect(video)} className="group w-full min-w-0 text-left focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#d8c1ef]">
    <span className="relative block aspect-video overflow-hidden rounded-lg bg-white/5">
      <Image unoptimized src={video.thumbnail} alt="" fill sizes="(max-width: 639px) 80vw, (max-width: 1023px) 42vw, 300px" className="object-cover transition-[transform,opacity] duration-300 group-hover:scale-[1.04] group-hover:opacity-75 motion-reduce:transition-none" />
      {video.status !== 'completed' && <span className={`absolute left-3 top-3 rounded-sm px-2 py-1 text-[10px] font-semibold uppercase tracking-widest ${video.status === 'live' ? 'bg-red-600 text-white' : 'bg-[#d8c1ef] text-[#24132e]'}`}>{video.status === 'live' ? 'Live' : 'Upcoming'}</span>}
      <span aria-hidden="true" className="absolute inset-0 flex items-center justify-center opacity-0 transition-opacity group-hover:opacity-100 group-focus-visible:opacity-100"><span className="flex size-11 items-center justify-center rounded-lg bg-white text-[#24132e]">&#9654;</span></span>
    </span>
    <span className="mt-3 block line-clamp-2 text-sm font-medium leading-relaxed text-white/90">{video.title}</span>
    <span className="mt-1 block text-xs text-white/45">{video.status === 'completed' ? date(video.publishedAt) : video.status === 'live' ? 'Join the service' : 'View broadcast'}</span>
  </button>;
}

function VideoRow({ title, children }: { title: string; children: ReactNode }) {
  const track = useRef<HTMLDivElement>(null);
  const scroll = (direction: number) => {
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    track.current?.scrollBy({ left: direction * track.current.clientWidth * .85, behavior: reduced ? 'instant' : 'smooth' });
  };
  return <section className="mb-12" aria-label={title}>
    <div className="mb-5 flex items-center justify-between gap-4"><h2 className="text-xl tracking-tight sm:text-2xl">{title}</h2><div className="flex gap-2"><button type="button" aria-label={`Scroll ${title} left`} onClick={() => scroll(-1)} className="site-button flex size-10 items-center justify-center border border-white/15 hover:bg-white/10 focus-visible:outline-2">&#8592;</button><button type="button" aria-label={`Scroll ${title} right`} onClick={() => scroll(1)} className="site-button flex size-10 items-center justify-center border border-white/15 hover:bg-white/10 focus-visible:outline-2">&#8594;</button></div></div>
    <div ref={track} className="services-track grid auto-cols-[80%] grid-flow-col gap-4 overflow-x-auto px-1 pb-4 pt-1 sm:auto-cols-[42%] lg:auto-cols-[28%] xl:auto-cols-[23%]">{children}</div>
  </section>;
}

export default function ServicesLibrary({ initialFeeds }: { initialFeeds: Feed[] }) {
  const [feeds, setFeeds] = useState(initialFeeds);
  const [selected, setSelected] = useState<ServiceVideo | null>(null);
  const [busy, setBusy] = useState<BroadcastStatus | null>(null);
  const [error, setError] = useState('');
  const dialog = useRef<HTMLDialogElement>(null);
  const returnFocus = useRef<HTMLElement | null>(null);
  const live = feeds.find(feed => feed.status === 'live');
  const completed = feeds.find(feed => feed.status === 'completed');
  const featured = live?.videos[0] || completed?.videos[0] || feeds.find(feed => feed.status === 'upcoming')?.videos[0];
  const series = [
    { title: 'Shabbat services', pattern: /\bshabbat\b/i },
    { title: 'Midweek services', pattern: /\bmidweek\b/i },
    { title: 'Morning Dew', pattern: /\bmorning dew\b/i },
    { title: 'Nouthesia', pattern: /\bnouthesia\b/i },
  ].map(group => ({ title: group.title, videos: completed?.videos.filter(video => group.pattern.test(video.title)) || [] })).filter(group => group.videos.length > 0);

  function play(video: ServiceVideo) {
    returnFocus.current = document.activeElement as HTMLElement;
    setSelected(video);
    dialog.current?.showModal();
  }

  async function load(feed: Feed) {
    if (busy) return;
    setBusy(feed.status);
    setError('');
    try {
      const params = new URLSearchParams({ status: feed.status });
      if (!feed.failed && feed.nextPageToken) params.set('pageToken', feed.nextPageToken);
      const response = await fetch(`/api/services?${params}`);
      if (!response.ok) throw new Error('Could not load services');
      const page = await response.json() as ServicePage;
      setFeeds(previous => previous.map(current => current.status === feed.status ? { ...current, failed: false, nextPageToken: page.nextPageToken, videos: Array.from(new Map([...current.videos, ...page.videos].map(video => [video.id, video])).values()) } : current));
    } catch { setError('We could not load these services. Please try again.'); }
    finally { setBusy(null); }
  }

  return <div data-nav-theme="hero" className="bg-[#151019] text-white">
    <section className="relative isolate flex min-h-[78svh] items-end px-6 pb-20 pt-48 sm:px-12 lg:min-h-[88svh] lg:px-20" aria-labelledby="services-title">
      {featured && <Image unoptimized src={featured.thumbnail} alt="" fill sizes="100vw" priority className="-z-20 object-cover object-center opacity-60" />}
      <div aria-hidden="true" className="absolute inset-0 -z-10 bg-[linear-gradient(0deg,#151019_0%,rgba(21,16,25,.35)_65%,rgba(21,16,25,.75)_100%)]" />
      <div aria-hidden="true" className="absolute inset-0 -z-10 bg-gradient-to-r from-[#151019]/95 via-[#151019]/55 to-transparent" />
      <div className="w-full max-w-[800px]">

        <h1 id="services-title" className="max-w-[18ch] text-[clamp(2.7rem,5.5vw,5.5rem)] leading-[1.02] tracking-[-.045em]">{featured ? featured.title : 'A place to gather. A word to carry.'}</h1>
        <p className="mt-6 max-w-xl text-base leading-relaxed text-white/65">{featured ? (featured.status === 'live' ? 'We are live. Join us in worship and the word.' : 'Make room for the word. Watch our services and return to the moments that speak to you.') : 'Join our live services and revisit broadcasts from the church.'}</p>
        <div className="mt-8 flex flex-wrap gap-3">{featured && <button type="button" onClick={() => play(featured)} className="site-button inline-flex min-h-12 items-center gap-3 bg-white px-6 text-sm font-medium text-[#24132e] transition-colors hover:bg-[#d8c1ef] focus-visible:outline-2 focus-visible:outline-offset-4"><span aria-hidden="true">&#9654;</span>{featured.status === 'live' ? 'Watch live' : featured.status === 'upcoming' ? 'View upcoming service' : 'Watch service'}</button>}<CmsLink href="#service-library" className="site-button inline-flex min-h-12 items-center gap-3 bg-white/10 px-6 text-sm backdrop-blur-sm transition-colors hover:bg-white/20 focus-visible:outline-2 focus-visible:outline-offset-4"><CmsText id="components/ServicesLibrary:a3eaecdba55a4ab6" fallback="Browse services " /><span aria-hidden="true">&#8595;</span></CmsLink></div>
      </div>
    </section>

    <div id="service-library" className="relative scroll-mt-40 px-6 pb-20 sm:px-12 lg:px-20">
      {feeds.filter(feed => feed.status !== 'completed').map(feed => <div key={feed.status}>{feed.videos.length > 0 && <VideoRow title={feedNames[feed.status]}>{feed.videos.map(video => <VideoCard key={video.id} video={video} onSelect={play} />)}</VideoRow>}</div>)}
      {completed && completed.videos.length > 0 && <>
        <VideoRow title="Latest services">{completed.videos.slice(0, 12).map(video => <VideoCard key={video.id} video={video} onSelect={play} />)}</VideoRow>
        {series.map(group => <VideoRow key={group.title} title={group.title}>{group.videos.map(video => <VideoCard key={video.id} video={video} onSelect={play} />)}</VideoRow>)}
        <section aria-labelledby="all-services-title"><h2 id="all-services-title" className="mb-6 text-xl tracking-tight sm:text-2xl"><CmsText id="components/ServicesLibrary:5b980982fa251af0" fallback="All services" /></h2><div className="grid grid-cols-1 gap-x-5 gap-y-8 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">{completed.videos.map(video => <VideoCard key={video.id} video={video} onSelect={play} />)}</div></section>
      </>}
      {feeds.filter(feed => feed.failed).map(feed => <div key={feed.status} className="my-6 rounded-lg border border-white/10 p-6"><p className="text-sm text-white/65">{feedNames[feed.status]}<CmsText id="components/ServicesLibrary:b0276cb17d84d68a" fallback="are temporarily unavailable." /></p><button type="button" disabled={busy !== null} onClick={() => load(feed)} className="site-button mt-4 min-h-11 bg-white/10 px-5 text-sm hover:bg-white/20 disabled:opacity-50">{busy === feed.status ? 'Loading...' : 'Try again'}</button></div>)}
      {!featured && !feeds.some(feed => feed.failed) && <p className="py-10 text-white/60"><CmsText id="components/ServicesLibrary:4adadbcd63d7a4d5" fallback="No service broadcasts are available yet. " /><CmsLink href={channel} className="underline underline-offset-4"><CmsText id="components/ServicesLibrary:7229f03ac7a47c73" fallback="Visit our YouTube channel" /></CmsLink>.</p>}
      {feeds.filter(feed => !feed.failed && feed.nextPageToken).map(feed => <div key={feed.status} className="mt-10 flex justify-center"><button type="button" disabled={busy !== null} onClick={() => load(feed)} className="site-button min-h-12 border border-white/20 px-7 text-sm transition-colors hover:bg-white/10 disabled:opacity-50">{busy === feed.status ? 'Loading...' : `Load more ${feed.status === 'completed' ? 'services' : feedNames[feed.status].toLowerCase()}`}</button></div>)}
      <p role="status" aria-live="polite" className="mt-5 text-center text-sm text-[#d8c1ef]">{error}</p>
    </div>

    <dialog ref={dialog} aria-labelledby="service-player-title" onClose={() => { setSelected(null); returnFocus.current?.focus(); }} onClick={event => { if (event.target === event.currentTarget) dialog.current?.close(); }} className="service-player fixed inset-0 m-auto max-h-[90svh] w-[calc(100%-24px)] max-w-5xl overflow-y-auto border border-white/15 bg-[#211829] p-0 text-white backdrop:bg-black/85">
      {selected && <><div className="flex items-center justify-between gap-5 p-4 sm:px-6"><h2 id="service-player-title" className="text-base font-medium">{selected.title}</h2><button type="button" autoFocus aria-label="Close service player" onClick={() => dialog.current?.close()} className="site-button flex size-11 shrink-0 items-center justify-center bg-white/10 text-xl hover:bg-white/20">&#215;</button></div><iframe key={selected.id} src={`https://www.youtube-nocookie.com/embed/${selected.id}?autoplay=1`} title={selected.title} allow="autoplay; encrypted-media; picture-in-picture; fullscreen" allowFullScreen className="aspect-video w-full border-0" /><div className="p-6"><p className="max-w-3xl whitespace-pre-line text-sm leading-relaxed text-white/65">{selected.description}</p><CmsLink href={`https://www.youtube.com/watch?v=${selected.id}`} target="_blank" rel="noopener noreferrer" className="mt-5 inline-flex min-h-11 items-center gap-3 text-sm text-[#d8c1ef] underline underline-offset-4"><CmsText id="components/ServicesLibrary:36bb6d29c462815b" fallback="Watch on YouTube ↗" /></CmsLink></div></>}
    </dialog>
  </div>;
}
