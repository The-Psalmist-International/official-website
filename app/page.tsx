"use client";
import React, { useState, useEffect, useRef } from "react";
import { motion, useScroll, useTransform, useMotionValueEvent, useSpring } from "framer-motion";
import { headingVariants, subtextVariants, buttonVariants } from "../components/animations";
import { TimelineSection } from "../components/TimelineSection";
import LocationsSection from "../components/LocationsSection";

const HomePage = () => {
  // State for the live stream data
  const [liveStream, setLiveStream] = useState<{ title: string; url: string; isLive: boolean; thumbnail: string } | null>(null);

  const containerRef = useRef<HTMLDivElement>(null);
  const [activeSlide, setActiveSlide] = useState(0);

  const { scrollYProgress } = useScroll({
    target: containerRef,
  });

  // Smooth scroll progress using useSpring for continuous physics-based easing
  const smoothProgress = useSpring(scrollYProgress, {
    stiffness: 80,
    damping: 26,
    restDelta: 0.001
  });

  // Easing presets
  const easeOut = (t: number) => 1 - Math.pow(1 - t, 3);
  const easeInOut = (t: number) => t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2;

  // Background slides from 0% to -66.67% across 3 panels
  const backgroundX = useTransform(smoothProgress, [0, 0.6], ["0%", "-66.667%"], { ease: easeInOut });

  // Opacity & Blur for Slide 1 text
  const slide1Opacity = useTransform(smoothProgress, [0, 0.15], [1, 0], { ease: easeInOut });
  const slide1Filter = useTransform(smoothProgress, [0, 0.15], ["blur(0px)", "blur(20px)"], { ease: easeInOut });

  // Opacity & Blur for Slide 2 text
  const slide2Opacity = useTransform(smoothProgress, [0.12, 0.22, 0.32, 0.42], [0, 1, 1, 0], { ease: easeInOut });
  const slide2Filter = useTransform(smoothProgress, [0.12, 0.22, 0.32, 0.42], ["blur(20px)", "blur(0px)", "blur(0px)", "blur(20px)"], { ease: easeInOut });

  // Opacity & Blur for Slide 3 text
  const slide3Opacity = useTransform(smoothProgress, [0.38, 0.48, 0.58, 0.68], [0, 1, 1, 0], { ease: easeInOut });
  const slide3Filter = useTransform(smoothProgress, [0.38, 0.48, 0.58, 0.68], ["blur(20px)", "blur(0px)", "blur(0px)", "blur(20px)"], { ease: easeInOut });

  // Vertical Slide 4 (deep purple paragraph section) translation
  const slide4Y = useTransform(smoothProgress, [0.68, 0.8], ["100vh", "0vh"], { ease: easeOut });

  // YouTube card persists during horizontal sequences, fades out before white section
  const youtubeCardOpacity = useTransform(smoothProgress, [0, 0.65, 0.72], [1, 1, 0], { ease: easeInOut });

  // Update active slide state for pointer events
  useMotionValueEvent(scrollYProgress, "change", (latest) => {
    if (latest < 0.15) {
      if (activeSlide !== 0) setActiveSlide(0);
    } else if (latest >= 0.15 && latest < 0.42) {
      if (activeSlide !== 1) setActiveSlide(1);
    } else if (latest >= 0.42 && latest < 0.72) {
      if (activeSlide !== 2) setActiveSlide(2);
    } else {
      if (activeSlide !== 3) setActiveSlide(3);
    }
  });

  useEffect(() => {
    const fetchLiveStream = async () => {
      try {
        const API_KEY = process.env.NEXT_PUBLIC_YOUTUBE_API_KEY;
        const CHANNEL_ID = process.env.NEXT_PUBLIC_YOUTUBE_CHANNEL_ID;
        const liveUrl = `https://www.googleapis.com/youtube/v3/search?part=snippet&channelId=${CHANNEL_ID}&eventType=live&type=video&key=${API_KEY}`;

        const response = await fetch(liveUrl);
        const data = await response.json();

        if (data.items && data.items.length > 0) {
          const liveVideo = data.items[0];
          setLiveStream({
            title: liveVideo.snippet.title,
            url: `https://www.youtube.com/watch?v=${liveVideo.id.videoId}`,
            isLive: true,
            thumbnail: liveVideo.snippet.thumbnails?.high?.url || liveVideo.snippet.thumbnails?.medium?.url || "",
          });
        } else {
          // Fallback to the latest completed livestream
          const completedUrl = `https://www.googleapis.com/youtube/v3/search?part=snippet&channelId=${CHANNEL_ID}&eventType=completed&type=video&order=date&maxResults=1&key=${API_KEY}`;
          const completedResponse = await fetch(completedUrl);
          const completedData = await completedResponse.json();

          if (completedData.items && completedData.items.length > 0) {
            const completedVideo = completedData.items[0];
            setLiveStream({
              title: completedVideo.snippet.title,
              url: `https://www.youtube.com/watch?v=${completedVideo.id.videoId}`,
              isLive: false,
              thumbnail: completedVideo.snippet.thumbnails?.high?.url || completedVideo.snippet.thumbnails?.medium?.url || "",
            });
          } else {
            setLiveStream(null);
          }
        }
      } catch (error) {
        console.error("Error fetching live stream:", error);
        setLiveStream(null);
      }
    };

    fetchLiveStream();
  }, []);

  return (
    <main className="relative w-full bg-black">
    <div ref={containerRef} className="relative w-full h-[400vh]">
      {/* Sticky Viewport */}
      <div className="sticky top-0 w-full h-screen overflow-hidden">
        
        {/* Horizontally Sliding Background Track (300vw wide = 3 panels) */}
        <motion.div
          className="absolute inset-0 w-[300vw] h-full flex z-0"
          style={{ x: backgroundX }}
        >
          {/* Panel 1 */}
          <div className="relative w-screen h-full shrink-0">
            <img
              src="/assets/IMG_7289.JPG"
              alt="Church of The Martyrs worship service"
              className="absolute inset-0 w-full h-full object-cover object-[center_20%] brightness-[0.55] contrast-[1.05]"
            />
          </div>
          {/* Panel 2 */}
          <div className="relative w-screen h-full shrink-0">
            <img
              src="/assets/IMG_6718.JPG"
              alt="Church of The Martyrs community"
              className="absolute inset-0 w-full h-full object-cover object-[center_35%] brightness-[0.5] contrast-[1.05]"
            />
          </div>
          {/* Panel 3 */}
          <div className="relative w-screen h-full shrink-0">
            <img
              src="/assets/hero-bg.JPG"
              alt="Church of The Martyrs ministry"
              className="absolute inset-0 w-full h-full object-cover object-center brightness-[0.45] contrast-[1.1]"
            />
          </div>
        </motion.div>

        {/* Gradient Overlay (persists across all slides) */}
        <div className="absolute inset-0 z-10 bg-gradient-to-t from-black/90 via-black/50 to-transparent pointer-events-none" aria-hidden="true" />

        {/* ===== SLIDE 1 TEXT ===== */}
        <motion.div
          className="absolute inset-0 z-20 flex items-end"
          style={{
            opacity: slide1Opacity,
            filter: slide1Filter,
            pointerEvents: activeSlide === 0 ? "auto" : "none",
          }}
        >
          <div className="w-full px-6 md:px-12 lg:px-24 pb-12 md:pb-20">
            <div className="max-w-[700px] flex flex-col gap-6 md:mb-24 lg:mb-32">
              <h1 className="text-4xl md:text-5xl lg:text-[4.5rem] font-normal leading-[1.05] tracking-tight text-white drop-shadow-2xl font-['Stack_Sans_Headline',sans-serif] [text-wrap:balance]">
                Preparing God&rsquo;s endtime army
              </h1>
              <p className="text-sm md:text-base lg:text-[1.05rem] text-white/80 max-w-[600px] leading-relaxed drop-shadow-lg font-['Stack_Sans_Headline',sans-serif] [text-wrap:pretty]">
                Church of The Martyrs is an apostolic movement raising a
                prophetic generation and revealing the witness of God to the
                nations.
              </p>
              <div className="shrink-0 mt-2">
                <button type="button" className="group inline-flex items-center justify-center px-8 py-3.5 text-sm font-medium tracking-wide text-black bg-white rounded-full hover:bg-gray-100 active:scale-[0.96] transition-[transform,background-color,box-shadow] duration-200 ease-out shadow-xl hover:shadow-2xl font-['Stack_Sans_Headline',sans-serif]">
                  <div className="relative flex items-center h-5 overflow-hidden">
                    <div className="flex flex-col transition-transform duration-500 ease-[cubic-bezier(0.76,0,0.24,1)] group-hover:-translate-y-full">
                      <span className="flex items-center gap-2 h-5">
                        Learn More
                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="9 18 15 12 9 6"></polyline></svg>
                      </span>
                    </div>
                    <div className="absolute inset-0 flex flex-col translate-y-full transition-transform duration-500 ease-[cubic-bezier(0.76,0,0.24,1)] group-hover:translate-y-0">
                      <span className="flex items-center gap-2 h-5">
                        Learn More
                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="9 18 15 12 9 6"></polyline></svg>
                      </span>
                    </div>
                  </div>
                </button>
              </div>
            </div>
          </div>
        </motion.div>

        {/* ===== SLIDE 2 TEXT ===== */}
        <motion.div
          className="absolute inset-0 z-20 flex items-end"
          style={{
            opacity: slide2Opacity,
            filter: slide2Filter,
            pointerEvents: activeSlide === 1 ? "auto" : "none",
          }}
        >
          <div className="w-full px-6 md:px-12 lg:px-24 pb-12 md:pb-20">
            <div className="max-w-[700px] flex flex-col gap-6 md:mb-24 lg:mb-32">
              <h2 className="text-4xl md:text-5xl lg:text-[4.5rem] font-normal leading-[1.05] tracking-tight text-white drop-shadow-2xl font-['Stack_Sans_Headline',sans-serif] [text-wrap:balance]">
                Kings, Priests &amp; Prophets
              </h2>
              <p className="text-sm md:text-base lg:text-[1.05rem] text-white/80 max-w-[600px] leading-relaxed drop-shadow-lg font-['Stack_Sans_Headline',sans-serif] [text-wrap:pretty]">
                Join a community where you are equipped, empowered, and sent
                forth to impact your world through the power of God&rsquo;s word
                and Spirit.
              </p>
              <div className="shrink-0 mt-2">
                <a href="#join" className="group inline-flex items-center justify-center px-8 py-3.5 text-sm font-medium tracking-wide text-black bg-white rounded-full hover:bg-gray-100 active:scale-[0.96] transition-[transform,background-color,box-shadow] duration-200 ease-out shadow-xl hover:shadow-2xl font-['Stack_Sans_Headline',sans-serif]">
                  <div className="relative flex items-center h-5 overflow-hidden">
                    <div className="flex flex-col transition-transform duration-500 ease-[cubic-bezier(0.76,0,0.24,1)] group-hover:-translate-y-full">
                      <span className="flex items-center gap-2 h-5">
                        Join Us
                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="9 18 15 12 9 6"></polyline></svg>
                      </span>
                    </div>
                    <div className="absolute inset-0 flex flex-col translate-y-full transition-transform duration-500 ease-[cubic-bezier(0.76,0,0.24,1)] group-hover:translate-y-0">
                      <span className="flex items-center gap-2 h-5">
                        Join Us
                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="9 18 15 12 9 6"></polyline></svg>
                      </span>
                    </div>
                  </div>
                </a>
              </div>
            </div>
          </div>
        </motion.div>

        {/* ===== SLIDE 3 TEXT ===== */}
        <motion.div
          className="absolute inset-0 z-20 flex items-end"
          style={{
            opacity: slide3Opacity,
            filter: slide3Filter,
            pointerEvents: activeSlide === 2 ? "auto" : "none",
          }}
        >
          <div className="w-full px-6 md:px-12 lg:px-24 pb-12 md:pb-20">
            <div className="max-w-[700px] flex flex-col gap-6 md:mb-24 lg:mb-32">
              <h2 className="text-4xl md:text-5xl lg:text-[4.5rem] font-normal leading-[1.05] tracking-tight text-white drop-shadow-2xl font-['Stack_Sans_Headline',sans-serif] [text-wrap:balance]">
                Experience worship from anywhere
              </h2>
              <p className="text-sm md:text-base lg:text-[1.05rem] text-white/80 max-w-[600px] leading-relaxed drop-shadow-lg font-['Stack_Sans_Headline',sans-serif] [text-wrap:pretty]">
                Our online campus brings the presence of God to wherever you
                are. Join thousands across the world who worship with us every
                week.
              </p>
              <div className="shrink-0 mt-2">
                <a href="https://www.youtube.com/@ChurchOfTheMartyrs?sub_confirmation=1" target="_blank" rel="noopener noreferrer" className="group inline-flex items-center justify-center px-8 py-3.5 text-sm font-medium tracking-wide text-black bg-white rounded-full hover:bg-gray-100 active:scale-[0.96] transition-[transform,background-color,box-shadow] duration-200 ease-out shadow-xl hover:shadow-2xl font-['Stack_Sans_Headline',sans-serif]">
                  <div className="relative flex items-center h-5 overflow-hidden">
                    <div className="flex flex-col transition-transform duration-500 ease-[cubic-bezier(0.76,0,0.24,1)] group-hover:-translate-y-full">
                      <span className="flex items-center gap-2 h-5">
                        Watch Online
                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="9 18 15 12 9 6"></polyline></svg>
                      </span>
                    </div>
                    <div className="absolute inset-0 flex flex-col translate-y-full transition-transform duration-500 ease-[cubic-bezier(0.76,0,0.24,1)] group-hover:translate-y-0">
                      <span className="flex items-center gap-2 h-5">
                        Watch Online
                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="9 18 15 12 9 6"></polyline></svg>
                      </span>
                    </div>
                  </div>
                </a>
              </div>
            </div>
          </div>
        </motion.div>

        {/* ===== PERSISTENT YOUTUBE CARD (visible across all 3 horizontal slides) ===== */}
        {liveStream && (
          <motion.div
            className="absolute z-30 bottom-12 md:bottom-20 right-6 md:right-12 lg:right-24"
            style={{
              opacity: youtubeCardOpacity,
              pointerEvents: activeSlide <= 2 ? "auto" : "none",
            }}
          >
            <div className="group flex flex-col gap-3 w-full md:w-[340px] shrink-0">
              <a
                href={liveStream.url}
                target="_blank"
                rel="noopener noreferrer"
                className="self-end inline-flex items-center gap-1.5 text-xs font-semibold uppercase tracking-wider text-white/80 hover:text-white transition-colors font-['Stack_Sans_Headline',sans-serif]"
              >
                {liveStream.isLive ? "Watch Live" : "Watch Latest Sermon"}
                <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5"><line x1="7" y1="17" x2="17" y2="7"></line><polyline points="7 7 17 7 17 17"></polyline></svg>
              </a>
              <a
                href={liveStream.url}
                target="_blank"
                rel="noopener noreferrer"
                className="block relative bg-white rounded-2xl p-2.5 w-full shadow-2xl hover:shadow-[0_20px_50px_rgba(0,0,0,0.15)] active:scale-[0.98] transition-[transform,box-shadow] duration-200 ease-out overflow-hidden border border-stone-200/50"
              >
                <div className="relative rounded-md overflow-hidden aspect-[16/9] mb-3 bg-stone-100 border border-black/[0.08]">
                  {liveStream.thumbnail ? (
                    <img src={liveStream.thumbnail} alt={liveStream.title} className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105" />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center bg-gray-200 text-gray-400">
                      <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><polygon points="5 3 19 12 5 21 5 3"></polygon></svg>
                    </div>
                  )}
                  <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                    <div className="w-12 h-12 bg-white/90 rounded-full flex items-center justify-center backdrop-blur-sm shadow-lg">
                      <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="black" className="ml-1"><polygon points="5 3 19 12 5 21 5 3"></polygon></svg>
                    </div>
                  </div>
                </div>
                <div className="px-2 pb-2">
                  <h3 className="text-stone-900 font-semibold text-[15px] leading-snug line-clamp-2 font-['Stack_Sans_Headline',sans-serif]">
                    {liveStream.title}
                  </h3>
                </div>
              </a>
            </div>
          </motion.div>
        )}

        {/* ===== SLIDE 4: Deep Purple Paragraph Section Sliding Up ===== */}
        <motion.section
          className="absolute inset-0 z-40 bg-[#2b0835] overflow-hidden flex items-center justify-center px-6 md:px-12 lg:px-24"
          style={{
            y: slide4Y,
            pointerEvents: activeSlide === 3 ? "auto" : "none",
          }}
        >
          {/* Subtle Noise Texture Overlay */}
          <div 
            className="absolute inset-0 opacity-[0.4] mix-blend-overlay pointer-events-none"
            style={{
              backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")`,
            }}
          />
          <div className="max-w-[1100px] w-full text-left relative z-10">
            <p className="text-2xl md:text-4xl lg:text-[3rem] font-light leading-[1.25] tracking-tight text-white font-['Stack_Sans_Headline',sans-serif]">
              {(() => {
                const paragraphText = "Church of The Martyrs is an apostolic Christian movement committed to raising a prophetic generation, discipling nations, and revealing the complete witness of God to this age and beyond.";
                const words = paragraphText.split(" ");
                return words.map((word, index) => {
                  // Scroll highlight points between 0.8 and 0.98
                  const start = 0.8 + (index / words.length) * 0.16;
                  const end = start + 0.02;
                  // Map smoothProgress to opacity [0.15, 1]
                  const opacity = useTransform(smoothProgress, [start, end], [0.15, 1]);
                  return (
                    <motion.span
                      key={index}
                      style={{ opacity }}
                      className="inline-block mr-[0.25em] transition-opacity duration-150 text-white"
                    >
                      {word}
                    </motion.span>
                  );
                });
              })()}
            </p>
          </div>
        </motion.section>

      </div>
    </div>
    <TimelineSection />
    <LocationsSection />
    </main>
  );
}
export default HomePage;
