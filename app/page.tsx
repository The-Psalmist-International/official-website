"use client";
import React from "react";
import { motion } from "framer-motion";
import { buttonVariants } from "../components/animations";
import SocialsModal from "@/components/SocialsModal";

const page = () => {
  const targetDate = new Date("2026-05-01T00:00:00");
  const [timeLeft, setTimeLeft] = React.useState<{
    days: number;
    hours: number;
    minutes: number;
    seconds: number;
  }>({ days: 0, hours: 0, minutes: 0, seconds: 0 });
  const [showModal, setShowModal] = React.useState(false);
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
    <div className="bg-blue-900 min-h-screen flex flex-col w-full p-4">
      <div className="flex flex-col items-center flex-grow justify-center gap-4">
        <h1 className="text-white text-5xl w-full text-center">
          A sacred work is underway
        </h1>
        <p className="rency text-white text-lg mt-4 max-w-3xl text-center">
          We are preparing the official digital space of The Psalmist
          International, designed to carry the teachings, resources, and ongoing
          life of the ministry. {/* <br /> */} Through this platform, sermons in
          audio and video form, along with ministry updates, will be made
          available in one focused and accessible place.
        </p>
         <motion.button
            initial="hidden"
            animate="visible"
            variants={buttonVariants}
            custom={0.3}
            className="bg-white shadow-[2px_2px_0px_0px] cursor-pointer shadow-gray-300 text-black text-sm font-normal px-4 py-3 rounded-sm flex items-center justify-center"
            type="button"
            onClick={() => setShowModal(true)}
          >
            {" "}
            <span> Connect With Us ↪ </span>{" "}
          </motion.button>
      </div>

      <div className="flex flex-col items-center w-full mb-4">
        <motion.div
          initial="hidden"
          animate="visible"
          variants={buttonVariants}
          custom={1.4}
          className="bg-white w-5/6 md:w-1/3 shadow-[2px_2px_0px_0px] shadow-gray-300 hover:shadow-none transition-shadow duration-300 text-black px-6 py-3 rounded-md flex flex-col items-start justify-center gap-1 cursor-pointer"
        >
          <span className="text-base font-medium">🎉Almost here</span>
          <p className="text-xs rency text-gray-400 font-light">
            Stay tuned for updates and be the first to know when we launch!
          </p>
         
          <div className="flex flex-row items-center justify-between w-full mt-3 gap-6 ">
            <div className="flex flex-col items-center bg-blue-800 rounded-md px-6 py-2 shadow-[2px_2px_0px_0px] shadow-purple-200">
              <span className="text-lg font-medium text-white">
                {timeLeft.days}
              </span>
              <span className="text-xs text-white">days</span>
            </div>
            <div className="flex flex-col items-center bg-blue-800 rounded-md px-6 py-2 shadow-[2px_2px_0px_0px] shadow-purple-200">
              <span className="text-lg font-medium text-white">
                {timeLeft.hours}
              </span>
              <span className="text-xs text-white">hrs</span>
            </div>
            <div className="flex flex-col items-center bg-blue-800 rounded-md px-6 py-2 shadow-[2px_2px_0px_0px] shadow-purple-200">
              <span className="text-lg font-medium text-white">
                {timeLeft.minutes}
              </span>
              <span className="text-xs text-white">min</span>
            </div>
            <div className="flex flex-col items-center bg-blue-800 rounded-md px-6 py-2 shadow-[2px_2px_0px_0px] shadow-purple-200">
              <span className="text-lg font-medium text-white">
                {timeLeft.seconds}
              </span>
              <span className="text-xs text-white">sec</span>
            </div>
          </div>
        </motion.div>
      </div>
      <SocialsModal show={showModal} onClose={() => setShowModal(false)} />
    </div>
  );
};

export default page;
