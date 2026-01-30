"use client";
import React from "react";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { headingVariants, subtextVariants, buttonVariants, listVariants } from "../components/animations";
import SocialsModal from "@/components/SocialsModal";

const page = () => {
  // Adjustable loading duration (ms)
  const LOADING_DURATION = 1800;
  const [loading, setLoading] = React.useState(true);
  const targetDate = new Date("2026-05-01T00:00:00");
  const [timeLeft, setTimeLeft] = React.useState<{
    days: number;
    hours: number;
    minutes: number;
    seconds: number;
  }>({ days: 0, hours: 0, minutes: 0, seconds: 0 });
  const [showModal, setShowModal] = React.useState(false);
  // Only run loading effect on first mount
  React.useEffect(() => {
    setLoading(true);
    console.log('Loading screen shown');
    const timer = setTimeout(() => {
      setLoading(false);
      console.log('Loading screen hidden');
    }, LOADING_DURATION);
    return () => clearTimeout(timer);
  }, []);

  React.useEffect(() => {
    const interval = setInterval(() => {
      const now = new Date();
      const diff = targetDate.getTime() - now.getTime();
      if (diff > 0) {
        const days = Math.floor(diff / (1000 * 60 * 60 * 24));
        const hours = Math.floor((diff / (1000 * 60 * 60)) % 24);
        const minutes = Math.floor((diff / (1000 * 60)) % 60);
        const seconds = Math.floor((diff / 1000) % 60);
        setTimeLeft({ days, hours, minutes, seconds });
      } else {
        setTimeLeft({ days: 0, hours: 0, minutes: 0, seconds: 0 });
        clearInterval(interval);
      }
    }, 1000);
    return () => clearInterval(interval);
  }, []);
  return (
    <>
      <AnimatePresence>
        {loading ? (
          <motion.div
            key="loader"
            initial={{ opacity: 1, y: 0 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -100, transition: { duration: 0.9, ease: 'easeInOut' } }}
            className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-black text-white"
            style={{ pointerEvents: 'all' }}
          >
            <motion.div
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -40 }}
              transition={{ duration: 1, ease: 'easeInOut' }}
              className="flex flex-row items-center justify-center gap-2 mb-8"
            >
              <motion.span
                initial={{ opacity: 0, x: -40 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -40 }}
                transition={{ delay: 0.1, duration: 0.8, ease: 'easeInOut' }}
                className="text-3xl font-bold tracking-wide"
              >
                THE PSALMIST
              </motion.span>
              <motion.span
                initial={{ opacity: 0, x: 40 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 40 }}
                transition={{ delay: 0.3, duration: 0.8, ease: 'easeInOut' }}
                className="text-3xl  font-bold tracking-wide ml-2 uppercase"
              >
                International Church
              </motion.span>
            </motion.div>
          </motion.div>
        ) : (
          // Main content only shows after loading is false
          <motion.div
            key="main-content"
            initial={{ opacity: 0, y: 200 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -200, transition: { duration: 0.7, ease: 'easeInOut' } }}
            className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-blue-900 text-white"
            style={{ pointerEvents: 'all' }}
          >
            <img src="/assets/church.png"
              alt="Church background"
              className="pointer-events-none select-none fixed md:absolute bottom-0 left-0 w-[80vw] md:w-[40vw] max-w-[700px] opacity-20 md:opacity-30 z-0"
              style={{ objectFit: 'contain', objectPosition: 'left bottom' }}
              aria-hidden="true"
            />
            <div className="relative z-10 flex flex-col items-center grow justify-center gap-4 w-full max-w-3xl mx-auto text-center">
              <motion.h1
                initial="hidden"
                animate="visible"
                variants={headingVariants}
                custom={0}
                className="text-white text-5xl w-full text-center"
              >
                A sacred work is underway
              </motion.h1>
              <motion.p
                initial="hidden"
                animate="visible"
                variants={subtextVariants}
                custom={0.3}
                className="rency text-white text-lg mt-4 max-w-3xl text-center"
              >
                We are preparing the official digital space of The Psalmist
                International, designed to carry the teachings, resources, and ongoing
                life of the ministry. Through this platform, sermons in
                audio and video form, along with ministry updates, will be made
                available in one focused and accessible place.
              </motion.p>
              <motion.button
                initial="hidden"
                animate="visible"
                variants={buttonVariants}
                custom={0.6}
                className="bg-white shadow-[2px_2px_0px_0px] cursor-pointer shadow-gray-300 text-black text-sm font-normal px-4 py-3 rounded-sm flex items-center justify-center mt-6"
                type="button"
                onClick={() => setShowModal(true)}
              >
                <span> Connect With Us ↪ </span>
              </motion.button>
            </div>
            <div className="flex flex-col items-center w-full mb-4 z-10 relative">
              <motion.div
                initial="hidden"
                animate="visible"
                variants={buttonVariants}
                custom={1.4}
                className="bg-white w-5/6 md:w-1/3 shadow-[2px_2px_0px_0px] shadow-gray-300 hover:shadow-none transition-shadow duration-300 text-black px-6 py-3 rounded-md flex flex-col items-start justify-center gap-1 cursor-pointer"
              >
                <motion.span
                  initial="hidden"
                  animate="visible"
                  variants={headingVariants}
                  custom={1.6}
                  className="text-base font-medium"
                >🎉Almost here</motion.span>
                <motion.p
                  initial="hidden"
                  animate="visible"
                  variants={subtextVariants}
                  custom={1.8}
                  className="text-xs rency text-gray-400 font-light"
                >
                  Stay tuned for updates and be the first to know when we launch!
                </motion.p>
                <div className="flex flex-row items-center justify-between w-full mt-3 gap-6 ">
                  <motion.div
                    className="flex flex-col items-center bg-blue-800 rounded-md px-6 py-2 shadow-[2px_2px_0px_0px] shadow-purple-200"
                    initial="hidden"
                    animate="visible"
                    variants={listVariants}
                    custom={2}
                  >
                    <span className="text-lg font-medium text-white">
                      {timeLeft.days}
                    </span>
                    <span className="text-xs text-white">days</span>
                  </motion.div>
                  <motion.div
                    className="flex flex-col items-center bg-blue-800 rounded-md px-6 py-2 shadow-[2px_2px_0px_0px] shadow-purple-200"
                    initial="hidden"
                    animate="visible"
                    variants={listVariants}
                    custom={2.2}
                  >
                    <span className="text-lg font-medium text-white">
                      {timeLeft.hours}
                    </span>
                    <span className="text-xs text-white">hrs</span>
                  </motion.div>
                  <motion.div
                    className="flex flex-col items-center bg-blue-800 rounded-md px-6 py-2 shadow-[2px_2px_0px_0px] shadow-purple-200"
                    initial="hidden"
                    animate="visible"
                    variants={listVariants}
                    custom={2.4}
                  >
                    <span className="text-lg font-medium text-white">
                      {timeLeft.minutes}
                    </span>
                    <span className="text-xs text-white">min</span>
                  </motion.div>
                  <motion.div
                    className="flex flex-col items-center bg-blue-800 rounded-md px-6 py-2 shadow-[2px_2px_0px_0px] shadow-purple-200"
                    initial="hidden"
                    animate="visible"
                    variants={listVariants}
                    custom={2.6}
                  >
                    <span className="text-lg font-medium text-white">
                      {timeLeft.seconds}
                    </span>
                    <span className="text-xs text-white">sec</span>
                  </motion.div>
                </div>
              </motion.div>
            </div>
            <SocialsModal show={showModal} onClose={() => setShowModal(false)} />
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
export default page;
