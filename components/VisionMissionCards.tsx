"use client";
import { useCmsCollection } from '@/components/cms/ContentProvider';
import { motion, useReducedMotion } from "framer-motion";
import PurposeIllustration from "@/components/PurposeIllustration";

const fallbackcards = [
  { id: "vision", label: "Our vision", title: "A vision for the nations.", text: "To disciple believers, raise leaders, and establish God's influence across every sphere of life." },
  { id: "mission", label: "Our mission", title: "Raising a prophetic generation.", text: "Restoring the apostolic tradition of martyrdom by the Spirit. Raising a prophetic generation capable of discerning and manifesting the desires of God in every sphere of life." },
];

export default function VisionMissionCards() {
  const cards = useCmsCollection("visionMission", fallbackcards);
  const reduced = useReducedMotion();
  return <section id="vision-mission" data-nav-theme="light" data-motion-custom aria-label="Our vision and mission" className="scroll-mt-36 bg-white px-6 py-20 text-[#24132e] sm:px-12 sm:py-28 lg:px-20">
    <div className="mx-auto grid max-w-[1160px] gap-4 md:grid-cols-2">
      {cards.map((card, index) => <motion.article key={card.id} id={card.id} initial={false} animate={{ opacity: 1 }} className="site-card group relative flex flex-col min-h-[530px] scroll-mt-36 overflow-hidden bg-[#eee5f6] p-7 lg:min-h-[570px]">

        <h2 className="relative z-10 mt-2 max-w-[18ch] text-3xl font-normal tracking-[-.025em] sm:text-4xl">{card.title}</h2>
        <p className="relative z-10 mt-5 max-w-[430px] text-base leading-relaxed text-[#49345f]/80">{card.text}</p>
        <motion.div initial={reduced ? false : { opacity: 0, y: 30, scale: .97 }} whileInView={{ opacity: 1, y: 0, scale: 1 }} viewport={{ once: true, amount: .2 }} transition={{ duration: reduced ? 0 : .8, delay: reduced ? 0 : .12 + index * .08, ease: [.22, 1, .36, 1] }} className="relative -mb-5 -mr-5 mt-auto h-[270px] w-[370px] max-w-[calc(100%+28px)] shrink-0 self-end origin-bottom-right pt-6 sm:h-[300px] sm:w-[420px]">
          <div className="h-full w-full origin-bottom-right transition-transform duration-700 ease-out group-hover:scale-[1.025] motion-reduce:transition-none">
            <PurposeIllustration kind={card.id as "vision" | "mission"} />
          </div>
        </motion.div>
      </motion.article>)}
    </div>
  </section>;
}
