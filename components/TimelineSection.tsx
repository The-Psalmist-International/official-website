"use client";

import Image from "next/image";
import { useRef, useState } from "react";
import {
  motion,
  MotionValue,
  useMotionValueEvent,
  useReducedMotion,
  useScroll,
  useTransform,
} from "framer-motion";

const timelineEvents = [
  {
    title: "The Vision",
    date: "January 4, 2020",
    description:
      "A divine vision was received revealing God's agenda to raise a family of believers committed to His eternal purposes.",
    image: "/assets/IMG_7289.JPG",
  },
  {
    title: "Movement Begins",
    date: "March 2020",
    description:
      "Church of The Martyrs officially began as an apostolic Christian movement established after the pattern of Christ — King, Priest, and Prophet.",
    image: "/assets/IMG_6718.JPG",
  },
  {
    title: "Early Gatherings & Discipleship",
    date: "2020–2021",
    description:
      "The ministry began forming a community of believers focused on prayer, spiritual formation, and discipleship.",
    image: "/assets/hero-bg.JPG",
  },
  {
    title: "Campus Expansion",
    date: "2021–2022",
    description:
      "The movement spread across universities as campus communities became hubs for discipleship, prayer, and evangelism.",
    image: "/assets/IMG_7178.JPG",
  },
];

type TimelineCardProps = {
  event: (typeof timelineEvents)[number];
  index: number;
  activeStep: number;
  progress: MotionValue<number>;
};

function TimelineCard({ event, index, activeStep, progress }: TimelineCardProps) {
  const startPoint = 0.28 + index * (0.72 / timelineEvents.length);
  const endPoint = 0.28 + (index + 1) * (0.72 / timelineEvents.length);
  const lineWidth = useTransform(progress, [startPoint, endPoint], ["0%", "100%"]);
  const isActive = activeStep === index;
  const hasReached = activeStep >= index;

  return (
    <article className="relative flex shrink-0 flex-col pt-8">
      <div className="absolute left-0 top-0 flex w-full items-center" aria-hidden="true">
        <div
          className="relative z-10 flex size-6 shrink-0 items-center justify-center rounded-full border-2 transition-[border-color,background-color] duration-500"
          style={{
            borderColor: hasReached ? "#6c2a7b" : "#ded8df",
            backgroundColor: hasReached ? "#f1e7f3" : "#fbfaf8",
          }}
        >
          <div
            className="size-2 rounded-full bg-[#6c2a7b] transition-opacity duration-500"
            style={{ opacity: hasReached ? 1 : 0 }}
          />
        </div>

        {index !== timelineEvents.length - 1 && (
          <div className="relative ml-4 h-px w-[272px] shrink-0 bg-[#e8e2e8] sm:w-[328px] lg:w-[368px]">
            <motion.div
              className="absolute inset-y-0 left-0 bg-[#6c2a7b]"
              style={{ width: lineWidth }}
            />
          </div>
        )}
      </div>

      <div
        className={`relative mt-10 flex min-h-[390px] w-[272px] shrink-0 flex-col overflow-hidden rounded-[24px] bg-white p-3 shadow-[0_12px_45px_rgba(43,8,53,0.08),0_1px_0_rgba(43,8,53,0.06)] transition-[filter,opacity,transform] duration-700 sm:min-h-[430px] sm:w-[328px] lg:w-[368px] ${
          isActive
            ? "scale-100 opacity-100 blur-none"
            : "scale-[0.96] opacity-40 blur-[6px]"
        }`}
      >
        <div className="relative h-44 w-full overflow-hidden rounded-[16px] bg-stone-200 sm:h-52">
          <Image
            src={event.image}
            alt=""
            fill
            sizes="(max-width: 640px) 272px, (max-width: 1024px) 328px, 368px"
            className="object-cover"
          />
          <div className="pointer-events-none absolute inset-0 shadow-[inset_0_0_0_1px_rgba(0,0,0,0.1)]" />
        </div>

        <div className="flex flex-1 flex-col px-3 pb-4 pt-6 sm:px-4">
          <p className="mb-3 text-[11px] font-medium uppercase tracking-[0.18em] text-[#6c2a7b]">
            {event.date}
          </p>
          <h3 className="max-w-[15ch] text-[25px] font-medium leading-[1.05] tracking-[-0.03em] text-[#2b0835] text-balance sm:text-[29px]">
            {event.title}
          </h3>
          <p className="mt-4 text-[14px] font-normal leading-relaxed text-stone-500 [text-wrap:pretty] sm:text-[15px]">
            {event.description}
          </p>
        </div>

        <div
          className={`pointer-events-none absolute -bottom-12 -right-12 size-44 rounded-full bg-[#c796d1] blur-3xl transition-opacity duration-700 ${
            isActive ? "opacity-30" : "opacity-0"
          }`}
          aria-hidden="true"
        />
      </div>
    </article>
  );
}

export function TimelineSection() {
  const containerRef = useRef<HTMLElement>(null);
  const [activeStep, setActiveStep] = useState(0);
  const reduceMotion = useReducedMotion();

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  });

  const xTranslate = useTransform(scrollYProgress, [0.28, 1], ["0%", "-72%"]);
  const ourColor = useTransform(scrollYProgress, [0, 0.06], ["#c8c1c9", "#2b0835"]);
  const storyColor = useTransform(scrollYProgress, [0.04, 0.11], ["#c8c1c9", "#2b0835"]);
  const beganColor = useTransform(scrollYProgress, [0.09, 0.16], ["#c8c1c9", "#2b0835"]);
  const withColor = useTransform(scrollYProgress, [0.14, 0.2], ["#c8c1c9", "#2b0835"]);
  const aColor = useTransform(scrollYProgress, [0.18, 0.23], ["#c8c1c9", "#2b0835"]);
  const visionColor = useTransform(scrollYProgress, [0.21, 0.28], ["#c8c1c9", "#6c2a7b"]);
  const underlineWidth = useTransform(scrollYProgress, [0.22, 0.28], ["0%", "100%"]);

  useMotionValueEvent(scrollYProgress, "change", (latest) => {
    if (latest < 0.28) {
      setActiveStep(0);
      return;
    }

    const cardProgress = (latest - 0.28) / (0.72 / timelineEvents.length);
    setActiveStep(Math.min(Math.floor(cardProgress), timelineEvents.length - 1));
  });

  return (
    <section
      ref={containerRef}
      aria-labelledby="timeline-heading"
      className="relative h-[410vh] w-full bg-[#fbfaf8]"
    >
      <div className="sticky top-0 flex h-screen w-full flex-col justify-center overflow-hidden pt-20 sm:pt-24">
        <div className="mx-auto w-full max-w-[1440px] px-6 py-6 md:px-12 lg:px-20">
          <p className="mb-5 text-[11px] font-medium uppercase tracking-[0.2em] text-[#6c2a7b] sm:text-xs">
            Our journey
          </p>

          <h2
            id="timeline-heading"
            className="mb-8 max-w-[1120px] text-[36px] font-medium leading-[1.02] tracking-[-0.045em] text-balance sm:text-[48px] md:mb-10 md:text-[64px] lg:text-[76px]"
          >
            <motion.span style={{ color: ourColor }}>Our</motion.span>{" "}
            <motion.span style={{ color: storyColor }}>story</motion.span>{" "}
            <motion.span style={{ color: beganColor }}>began</motion.span>{" "}
            <motion.span style={{ color: withColor }}>with</motion.span>{" "}
            <motion.span style={{ color: aColor }}>a</motion.span>{" "}
            <motion.span className="relative inline-block" style={{ color: visionColor }}>
              vision
              <motion.span
                className="absolute -bottom-1 left-0 h-[3px] rounded-full bg-[#c796d1] md:h-1"
                style={{ width: underlineWidth }}
                aria-hidden="true"
              />
            </motion.span>
          </h2>

          <div className="relative mt-2 w-full sm:mt-8">
            <motion.div
              className="flex w-max items-start gap-8 px-1 pb-8"
              style={{ x: reduceMotion ? "0%" : xTranslate }}
            >
              {timelineEvents.map((event, index) => (
                <TimelineCard
                  key={`${event.date}-${event.title}`}
                  event={event}
                  index={index}
                  activeStep={activeStep}
                  progress={scrollYProgress}
                />
              ))}
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}
