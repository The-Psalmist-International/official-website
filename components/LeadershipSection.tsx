'use client';

import { useCmsCollection } from '@/components/cms/ContentProvider';
import CmsText from '@/components/cms/CmsText';
import { motion, useReducedMotion } from 'framer-motion';
import Image from '@/components/cms/CmsImage';

interface Leader {
  id: string;
  name: string;
  role: string;
  image: string;
  bio?: string;
}

const fallbackleaders: Leader[] = [
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
      {
        id: '18',
        name: 'Pasteur Jean-Paul Koffi',
        role: 'Francophone Ministry Lead',
        image: '/assets/IMG_7139.JPG',
      }
];



export default function LeadershipSection() {
  const leaders = useCmsCollection("leaders", fallbackleaders);
  const [setMan, ...otherLeaders] = leaders;
  const reduced = useReducedMotion();

  return (
    <section id="leadership" data-nav-theme="light" data-motion-custom aria-labelledby="leadership-heading" className="scroll-mt-32 bg-white px-6 py-20 text-[#24132e] sm:px-12 sm:py-28 lg:px-20">
      <div className="mx-auto max-w-[1160px]">
        <div className="mb-12 grid gap-6 md:grid-cols-2 md:items-end">
          <div>

            <h2 id="leadership-heading" className="text-[clamp(2.5rem,4.5vw,4.75rem)] leading-[1.04] tracking-[-.045em]"><CmsText id="components/LeadershipSection:087f2a0e575641e7" fallback="The leadership." /></h2>
          </div>
          <p className="max-w-[370px] text-base leading-relaxed text-[#49345f]/85 md:justify-self-end"><CmsText id="components/LeadershipSection:9bd6bccfb9fde7a4" fallback="Stewards of the vision, committed to raising and equipping the body." /></p>
        </div>

        <motion.article initial={reduced ? false : { opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, amount: .15 }} transition={{ duration: reduced ? 0 : .5 }} aria-labelledby="set-man-heading" className="site-card mb-16 grid gap-6 p-4 sm:p-6 md:grid-cols-[1.25fr_1fr] md:items-center md:gap-12 lg:mb-20 lg:gap-16">
          {/* Retain the identified portrait until the couple's photograph is supplied. */}
          <div className="relative aspect-[4/3] overflow-hidden rounded-2xl bg-[#eee5f6] md:aspect-[5/4]">
            <Image src={setMan.image} alt={setMan.name} fill sizes="(max-width: 767px) 90vw, (max-width: 1279px) 52vw, 610px" className="object-cover object-top grayscale transition-[filter] duration-500 hover:grayscale-0 motion-reduce:transition-none" />
          </div>
          <div className="max-w-[440px] py-2 md:py-8">
            <p className="mb-4 text-xs uppercase tracking-[.14em] text-[#75538f]">{setMan.role}</p>
            <h3 id="set-man-heading" className="text-[clamp(2rem,3.5vw,3.5rem)] leading-[1.08] tracking-[-.035em]">{setMan.name}</h3>
            <p className="mt-6 text-base leading-relaxed text-[#49345f]/85">{setMan.bio || <CmsText id="components/LeadershipSection:da74bb398bb4ebd3" fallback="Reverend Elorm John Tetteh serves as the Global Lead and Setman of Church of The Martyrs. His vision is to raise a people grounded in truth, shaped by the Spirit, and committed to God's eternal purposes." />}</p>
          </div>
        </motion.article>

        <div id="leaders-grid" className="grid grid-cols-1 gap-x-4 gap-y-6 sm:grid-cols-3 sm:gap-y-8 lg:grid-cols-5 xl:grid-cols-6">
          {otherLeaders.map(leader => (
            <motion.article key={leader.id} initial={reduced ? false : { opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, amount: .15 }} transition={{ duration: reduced ? 0 : .5, ease: [.22, 1, .36, 1] }} className="site-card group p-3">
              <div className="relative aspect-[4/5] overflow-hidden rounded-2xl bg-[#eee5f6]">
                <Image src={leader.image} alt={leader.name} fill sizes="(max-width: 639px) 90vw, (max-width: 1023px) 28vw, (max-width: 1279px) 17vw, 180px" className="object-cover grayscale transition-[filter,transform] duration-500 group-hover:grayscale-0 group-hover:scale-[1.025] motion-reduce:transition-none" />
              </div>
              <div className="px-1 pt-3 pb-1">
                <p className="text-xs leading-relaxed text-[#75538f]">{leader.role}</p>
                <h3 className="mt-1.5 text-base leading-snug tracking-tight">{leader.name}</h3>
              </div>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
}
