"use client"
import React from "react";
import { motion } from "framer-motion";
import Link from "next/link";

interface SocialsModalProps {
  show: boolean;
  onClose: () => void;
}

const socials = [
  {
    name: "Instagram",
    url: "https://instagram.com/yourchurch",
    
    
  },
  {
    name: "Telegram",
    url: "https://t.me/yourchurch",
   
  },
  {
    name: "YouTube",
    url: "https://youtube.com/yourchurch",
    
  },
  {
    name: "Tiktok",
    url: "https://tiktok.com/yourchurch"
  },
];

export default function SocialsModal({ show, onClose }: SocialsModalProps) {
  if (!show) return null;
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60">
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.95 }}
        transition={{ duration: 0.3 }}
        className="bg-white w-5/6 md:w-2/5 shadow-[2px_2px_0px_0px] shadow-gray-300 text-black px-8 py-8 rounded-md flex flex-col items-center justify-center gap-6 relative"
      >
        <button
          className="absolute top-3 right-3 text-gray-400 hover:text-gray-700 text-xl font-medium"
          type="button"
          onClick={onClose}
          aria-label="Close"
        >
          ×
        </button>
        <h2 className="text-2xl font-medium mb-2">Connect With Us</h2>
        <div className="grid grid-cols-2  md:grid-cols-4 place-items-center gap-4 w-full items-center">
          {socials.map((social) => (
            <button key={social.url} className="flex justify-center items-center gap-3   bg-gray-200 rounded-md px-6 py-2 shadow-[2px_2px_0px_0px] shadow-purple-200 text-black">
              <Link href={social.url}>
               {
              social.name
            }
              </Link>
            </button>
          ))}
        </div>
      </motion.div>
    </div>
  );
}
