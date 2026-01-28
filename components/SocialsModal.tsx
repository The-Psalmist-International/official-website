"use client"
import React from "react";
import { motion } from "framer-motion";

interface SocialsModalProps {
  show: boolean;
  onClose: () => void;
}

const socials = [
  {
    name: "Instagram",
    url: "https://instagram.com/yourchurch",
    bg: "border border-black",
  },
  {
    name: "Telegram",
    url: "https://t.me/yourchurch",
    bg: "bg-blue-500 hover:bg-blue-900",
  },
  {
    name: "YouTube",
    url: "https://youtube.com/yourchurch",
    bg: "bg-red-600 hover:bg-red-700",
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
        className="bg-white w-5/6 md:w-1/3 shadow-[2px_2px_0px_0px] shadow-gray-300 text-black px-8 py-8 rounded-md flex flex-col items-center justify-center gap-6 relative"
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
        <div className="flex flex-col gap-4 w-full items-center">
          {socials.map((social) => (
            <a
              key={social.name}
              href={social.url}
              target="_blank"
              rel="noopener noreferrer"
              className={`w-full ${social.bg} text-white font-semibold py-2 px-4 rounded transition-colors flex items-center justify-center gap-2`}
            >
              <span>{social.name}</span>
            </a>
          ))}
        </div>
      </motion.div>
    </div>
  );
}
