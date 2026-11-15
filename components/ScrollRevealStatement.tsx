"use client";

import { useSiteContent } from "@/components/cms/ContentProvider";
import { useRef } from "react";
import Image from '@/components/cms/CmsImage';
import { motion, useReducedMotion, useScroll, useTransform, type MotionValue } from "framer-motion";

const fallbackWords = "Church of The Martyrs is an apostolic Christian movement committed to raising a prophetic generation, discipling nations, and revealing the complete witness of God to this age and beyond.".split(" ");

function RevealWord({ word, index, progress, count }: { word: string; index: number; progress: MotionValue<number>; count: number }) {
  const reduced = useReducedMotion();
  const start = .08 + index / count * .62;
  const end = start + .1;
  const opacity = useTransform(progress, [start, end, .88, 1], [.2, 1, 1, .25]);
  const filter = useTransform(progress, [start, end, .88, 1], ["blur(4px)", "blur(0px)", "blur(0px)", "blur(4px)"]);
  return <motion.span className="inline-block" style={reduced ? undefined : { opacity, filter }}>{word}</motion.span>;
}

function RollingAvatar({ image, index, progress, count }: { image: string; index: number; progress: MotionValue<number>; count: number }) {
  const reduced = useReducedMotion();
  // Begin at the same point as the words surrounding the inline stack.
  const start = .08 + 17 / count * .62 + index * .025;
  const end = start + .1;
  const x = useTransform(progress, [start, end], [28 + index * 10, 0]);
  const y = useTransform(progress, [start, end], [12, 0]);
  const rotate = useTransform(progress, [start, end], [65 + index * 15, 0]);
  const opacity = useTransform(progress, [start, end, .88, 1], [0, 1, 1, .25]);
  const filter = useTransform(progress, [start, end, .88, 1], ["blur(4px)", "blur(0px)", "blur(0px)", "blur(4px)"]);
  return (
    <motion.span className="statement-avatar relative inline-block size-12 overflow-hidden rounded-full border-[3px] border-white sm:size-16 lg:size-20" style={{ zIndex: 3 - index, ...(reduced ? {} : { x, y, rotate, opacity, filter }) }}>
      <Image src={`/assets/${image}`} alt="" fill sizes="80px" className="object-cover object-[center_25%]" />
    </motion.span>
  );
}

export default function ScrollRevealStatement() {
  const content = useSiteContent();
  const words = (content.copy["home.statement"] || fallbackWords.join(" ")).trim().split(/\s+/);
  const section = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({ target: section, offset: ["start end", "end start"] });
  return (
    <section data-motion-custom data-nav-theme="light" ref={section} aria-label="Our purpose" className="relative bg-white px-6 py-28 text-stone-950 sm:px-12 sm:py-40 lg:min-h-[160svh] lg:px-20">
      <div className="mx-auto max-w-[1160px] lg:sticky lg:top-[24vh]">

        <p className="font-primary text-[clamp(1.9rem,4.2vw,4rem)] font-normal leading-[1.3] tracking-[-.035em]">
          <span className="sr-only">{words.join(" ")}</span>
          <span aria-hidden="true">
            {words.map((word, index) => (
              <span key={index}>
                <RevealWord word={word} index={index} progress={scrollYProgress} count={words.length} />{" "}
                {index === 17 && <span className="mx-1 inline-flex -space-x-4 align-middle sm:mx-2 sm:-space-x-5">
                  {["IMG_7172.JPG", "IMG_7174.JPG", "IMG_7178.JPG"].map((image, i) => <RollingAvatar key={image} image={image} index={i} progress={scrollYProgress} count={words.length} />)}
                </span>}
              </span>
            ))}
          </span>
        </p>
      </div>
    </section>
  );
}
