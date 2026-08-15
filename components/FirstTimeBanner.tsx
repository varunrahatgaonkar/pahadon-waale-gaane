"use client";

import React, { useState, useEffect } from "react";

interface FirstTimeBannerProps {
  onStartAudio?: () => void;
}

export function FirstTimeBanner({ onStartAudio }: FirstTimeBannerProps) {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const hasSeen = localStorage.getItem("pahad_tutorial_seen");
    if (!hasSeen) {
      const timer = setTimeout(() => setIsVisible(true), 0);
      return () => clearTimeout(timer);
    }
  }, []);

  const handleDismiss = () => {
    localStorage.setItem("pahad_tutorial_seen", "true");
    setIsVisible(false);
  };

  const handlePlayClick = () => {
    handleDismiss();
    onStartAudio?.();
  };

  if (!isVisible) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/75 backdrop-blur-md animate-in fade-in duration-300">
      <div className="w-full max-w-sm sm:max-w-md bg-[#121416] border border-[#ffb347]/30 rounded-3xl p-6 sm:p-7 shadow-[0_0_60px_rgba(255,179,71,0.25)] text-[#e2e2e5] relative overflow-hidden text-center">
        {/* Glow accent background */}
        <div className="absolute -top-20 -left-20 w-40 h-40 bg-[#ffb347]/20 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute -bottom-20 -right-20 w-40 h-40 bg-[#D97B4C]/20 rounded-full blur-3xl pointer-events-none" />

        {/* Bus ticket header badge */}
        <div className="inline-flex items-center gap-2 px-3.5 py-1 bg-[#ffb347]/15 border border-[#ffb347]/30 rounded-full font-mono text-[10px] sm:text-xs text-[#ffd7a9] uppercase tracking-widest mb-4">
          <span>🚍</span> Radio Pahad • Special Journey
        </div>

        {/* Title */}
        <h2 className="font-serif text-2xl sm:text-3xl font-bold text-[#ffd7a9] leading-tight">
          पहाड़ों वाले गाने
        </h2>
        <p className="font-sans text-xs sm:text-sm text-[#d6c3b0]/90 italic mt-1">
          &ldquo;woh gaane jo signal jaane ke baad bhi yaad rehte the.&rdquo;
        </p>

        {/* Instructions */}
        <div className="my-5 p-4 bg-[#1a1c1e] border border-white/10 rounded-2xl text-left space-y-2 text-xs text-[#d6c3b0]">
          <div className="flex items-start gap-2.5">
            <span className="text-base">📻</span>
            <p>
              <strong className="text-[#ffd7a9]">Click on Play</strong> to start the mountain radio & feel the PAHAD!
            </p>
          </div>
          <div className="flex items-start gap-2.5">
            <span className="text-base">🔀</span>
            <p>Use the **Playlist & Shuffle** button to pick your favorite retro tunes.</p>
          </div>
          <div className="flex items-start gap-2.5">
            <span className="text-base">🏔️</span>
            <p>Enjoy the golden-hour mountain views as the bus travels through the valley.</p>
          </div>
        </div>

        {/* Action Button */}
        <button
          type="button"
          onClick={handlePlayClick}
          className="w-full py-3.5 px-6 rounded-2xl bg-gradient-to-r from-[#ffb347] to-[#D97B4C] text-[#331c00] font-bold text-sm sm:text-base shadow-[0_0_25px_rgba(255,179,71,0.5)] hover:scale-[1.02] active:scale-[0.98] transition-all flex items-center justify-center gap-2"
        >
          <span>▶</span> Click to Play & Feel the Pahad!
        </button>

        {/* Secondary close button */}
        <button
          type="button"
          onClick={handleDismiss}
          className="mt-3 text-xs text-white/40 hover:text-white/70 transition-colors"
        >
          Just explore the scenery first
        </button>
      </div>
    </div>
  );
}
