"use client"
import Image from "next/image";
import React from "react";
export default function Home() {
  // Countdown target date (example: March 1, 2026)
  const targetDate = new Date('2026-05-01T00:00:00');
  const [timeLeft, setTimeLeft] = React.useState<{days: number, hours: number, minutes: number, seconds: number}>({days: 0, hours: 0, minutes: 0, seconds: 0});

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
    <div className="relative flex min-h-screen  w-full bg-[url('/assets/church-bg-3.jpg')] bg-cover bg-center">
      <div className="z-10 absolute w-full h-full bg-gradient-to-b from-black/80 via-black/60 to-black/30"></div>
       <div className="flex justify-between items-center w-full absolute top-10 z-20 px-10 ">
        <div>
        <span className="text-white text-base font-semibold">The Psalmist<br/>International Church</span>

        </div>
        <div className="flex gap-4">
          <button className="bg-white shadow-[2px_2px_0px_0px] shadow-gray-300 text-black text-sm font-medium px-4 py-3 rounded-sm flex items-center justify-center">
           Connect With Us ↪
          </button>
        </div>
      </div>
      <div className="relative z-20 flex flex-col items-center justify-center p-5 md:p-10">
        <h1 className="text-6xl font-normal text-white text-center">A sacred work is underway</h1>
        <p className="text-white  rency  text-sm font-light text-center w-full md:w-3/4">We are preparing the official digital space of The Psalmist International, designed to carry the teachings, resources, and ongoing life of the ministry.

Through this platform, sermons in audio and video form, along with ministry updates, will be made available in one focused and accessible place.</p>
        {/* Countdown Timer */}
        <div className=" text-black px-6 py-4 rounded-md flex flex-row items-center justify-center gap-6">
          
        </div>
      </div>
      <div className="flex justify-center items-center w-full absolute bottom-10 z-20">
        <div className="bg-white  w-5/6 md:w-1/3 shadow-[2px_2px_0px_0px] shadow-gray-300 hover:shadow-none transition-shadow duration-300 text-black  px-6 py-3 rounded-md flex flex-col items-start justify-center gap-1 cursor-pointer">
          <span className="text-base  font-semibold">🎉Almost here</span>
          <p className="text-xs text-gray-400 font-light"> Stay tuned for updates and be the first to know when we launch!
          </p>
          <div className="flex flex-row items-center justify-between w-full mt-3 gap-6 ">
 <div className="flex flex-col items-center bg-purple-600 rounded-md px-6 py-2 shadow-[2px_2px_0px_0px] shadow-purple-200">
            <span className="text-lg font-bold text-white">{timeLeft.days}</span>
            <span className="text-xs text-white">days</span>
          </div>
 <div className="flex flex-col items-center bg-purple-600 rounded-md px-6 py-2 shadow-[2px_2px_0px_0px] shadow-purple-200">
            <span className="text-lg font-bold text-white">{timeLeft.hours}</span>
            <span className="text-xs text-white">hrs</span>
          </div>
 <div className="flex flex-col items-center bg-purple-600 rounded-md px-6 py-2 shadow-[2px_2px_0px_0px] shadow-purple-200">
            <span className="text-lg font-bold text-white">{timeLeft.minutes}</span>
            <span className="text-xs text-white">min</span>
          </div>
 <div className="flex flex-col items-center bg-purple-600 rounded-md px-6 py-2 shadow-[2px_2px_0px_0px] shadow-purple-200">
            <span className="text-lg font-bold text-white">{timeLeft.seconds}</span>
            <span className="text-xs text-white">sec</span>
          </div>
        
          </div>
         
        </div>
      </div>
    </div>
  );
}
