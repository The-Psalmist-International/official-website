"use client";

import { useEffect, useState } from "react";

/** Preserved hero card. Fetches the live stream, falling back to the latest completed stream. */
export default function YouTubeStreamCard() {
  const [liveStream, setLiveStream] = useState<{ title: string; url: string; isLive: boolean; thumbnail: string } | null>(null);

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

  if (!liveStream) return null;

  return (
<div className="group flex flex-col gap-3 w-full max-w-[280px] shrink-0">
              <a
                href={liveStream.url}
                target="_blank"
                rel="noopener noreferrer"
                className="self-end inline-flex items-center gap-1.5 text-xs font-semibold uppercase tracking-wider text-white/80 hover:text-white transition-colors"
              >
                {liveStream.isLive ? "Watch Live" : "Watch Latest Sermon"}
                <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="transition-transform group-hover:translate-x-0.5 "><line x1="5" y1="12" x2="19" y2="12"></line><polyline points="12 5 19 12 12 19"></polyline></svg>
              </a>
              <a
                href={liveStream.url}
                target="_blank"
                rel="noopener noreferrer"
                className="block relative bg-white/10 backdrop-blur-sm rounded-sm p-2.5 w-full active:scale-[0.98] transition-[transform,box-shadow] duration-200 ease-out overflow-hidden border border-white/15"
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
                    <div className="w-12 h-12 bg-white/90 rounded-lg flex items-center justify-center backdrop-blur-sm shadow-lg">
                      <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="black" className="ml-1"><polygon points="5 3 19 12 5 21 5 3"></polygon></svg>
                    </div>
                  </div>
                </div>
                <div className="px-2 pb-2">
                  <h3 className="text-white/70 font-normal text-[15px] leading-snug line-clamp-2">
                    {liveStream.title}
                  </h3>
                </div>
              </a>
            </div>
  );
}
