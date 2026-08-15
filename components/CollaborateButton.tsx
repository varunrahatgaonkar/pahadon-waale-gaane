"use client";

import React from "react";

export function CollaborateButton() {
  return (
    <a
      href="https://www.youtube.com/playlist?list=PLcwotpnLerAU&jct=f9j1lugp2n2y24wQ7hj_qg"
      target="_blank"
      rel="noopener noreferrer"
      className="group relative inline-flex items-center justify-center gap-2 px-4 py-2 sm:px-5 sm:py-2.5 rounded-full bg-white/5 border border-white/10 backdrop-blur-md overflow-hidden transition-all duration-300 hover:bg-white/10 hover:border-[#ffb347]/50 hover:shadow-[0_0_20px_rgba(255,179,71,0.2)] pointer-events-auto"
      title="Join the collaborative playlist"
    >
      {/* Cool glowing background effect on hover */}
      <div className="absolute inset-0 bg-gradient-to-r from-[#ffb347]/0 via-[#ffb347]/10 to-[#ffb347]/0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 ease-in-out" />
      
      {/* Icon */}
      <span className="relative z-10 text-base sm:text-lg drop-shadow-[0_2px_4px_rgba(0,0,0,0.5)] group-hover:scale-110 transition-transform duration-300">
        📼✨
      </span>
      
      {/* Text */}
      <div className="relative z-10 flex items-center leading-none">
        <span className="font-sans text-xs sm:text-sm font-bold text-[#ffd7a9] tracking-wide drop-shadow-[0_2px_4px_rgba(0,0,0,0.8)]">
          Add your Pahado Waale Gaane!!
        </span>
      </div>
      
      {/* Animated Arrow */}
      <span className="relative z-10 text-[#ffb347] font-bold opacity-0 -ml-3 group-hover:opacity-100 group-hover:ml-0 transition-all duration-300">
        →
      </span>
    </a>
  );
}
