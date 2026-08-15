"use client";

import React from "react";

export interface MusicCardProps {
  trackTitle?: string;
  artistName?: string;
  isPlaying?: boolean;
  isShuffle?: boolean;
  currentTime?: number;
  duration?: number;
  onPlayPause?: () => void;
  onNext?: () => void;
  onPrevious?: () => void;
  onToggleShuffle?: () => void;
  onOpenPlaylist?: () => void;
  className?: string;
}

function formatTime(seconds: number): string {
  if (!seconds || isNaN(seconds) || seconds < 0) return "0:00";
  const mins = Math.floor(seconds / 60);
  const secs = Math.floor(seconds % 60);
  return `${mins}:${secs < 10 ? "0" : ""}${secs}`;
}

export function MusicCard({
  trackTitle = "पहाड़ों वाले गाने",
  artistName = "Radio Pahad",
  isPlaying = false,
  isShuffle = false,
  currentTime = 0,
  duration = 0,
  onPlayPause,
  onNext,
  onPrevious,
  onToggleShuffle,
  onOpenPlaylist,
  className = "",
}: MusicCardProps) {
  const progressPercent = duration > 0 ? Math.min(100, (currentTime / duration) * 100) : 0;

  return (
    <div
      className={`w-full max-w-sm sm:max-w-md bg-[#121416]/90 backdrop-blur-xl border border-white/15 rounded-2xl p-3.5 sm:p-4 shadow-[0_16px_50px_rgba(0,0,0,0.8)] text-[#e2e2e5] select-none transition-all duration-300 relative overflow-hidden ${className}`}
    >
      {/* Inner Subtle Glow */}
      <div className="absolute inset-0 bg-gradient-to-tr from-[#ffb347]/10 via-transparent to-transparent pointer-events-none" />

      <div className="relative z-10 space-y-3">
        {/* Top Row: Track Thumbnail, Title & Action Buttons */}
        <div className="flex items-center gap-2.5 sm:gap-3">
          {/* Spinning Disc Thumbnail (Compact) */}
          <div className="relative w-10 h-10 sm:w-11 sm:h-11 rounded-full border border-white/15 bg-[#1a1c1e] flex items-center justify-center shrink-0 overflow-hidden shadow-md">
            <div
              className={`w-full h-full rounded-full border-2 border-[#0c0e10] bg-[#1a1c1e] flex items-center justify-center ${
                isPlaying ? "animate-spin [animation-duration:6s]" : ""
              }`}
            >
              <div className="w-3.5 h-3.5 rounded-full bg-[#ffb347] border border-[#1e2022]" />
            </div>
          </div>

          {/* Title & Artist */}
          <div className="min-w-0 flex-1">
            <h3 className="font-serif text-xs sm:text-base font-bold text-[#ffd7a9] truncate leading-tight">
              {trackTitle}
            </h3>
            <p className="font-sans text-[11px] sm:text-xs text-[#d6c3b0]/70 truncate mt-0.5">
              {artistName}
            </p>
          </div>

          {/* Top-Right Action Pill Buttons: Shuffle & Playlist */}
          <div className="flex items-center gap-1.5 shrink-0">
            {/* Prominent Shuffle Button */}
            <button
              type="button"
              onClick={onToggleShuffle}
              className={`px-2 py-1 rounded-full font-sans text-[11px] sm:text-xs flex items-center gap-1 transition-all border ${
                isShuffle
                  ? "bg-[#ffb347] text-[#462a00] border-[#ffb347] font-bold shadow-[0_0_12px_rgba(255,179,71,0.5)]"
                  : "bg-white/5 hover:bg-white/10 border-white/15 text-[#d6c3b0] hover:text-[#ffd7a9]"
              }`}
              title={isShuffle ? "Shuffle ON" : "Enable Shuffle"}
            >
              <span>🔀</span>
              <span>{isShuffle ? "ON" : "Shuffle"}</span>
            </button>

            {/* Playlist Button */}
            <button
              type="button"
              onClick={onOpenPlaylist}
              className="px-2.5 py-1 bg-white/5 hover:bg-white/10 border border-white/15 rounded-full font-sans text-[11px] sm:text-xs text-[#ffd7a9] flex items-center gap-1 shrink-0 transition-colors"
              title="Open Playlist"
            >
              <span>📜</span>
              <span>Songs</span>
            </button>
          </div>
        </div>

        {/* Dynamic Progress Bar & Timestamps */}
        <div className="w-full space-y-1">
          <div className="relative w-full h-1.5 bg-[#333537] rounded-full overflow-hidden">
            <div
              className="h-full bg-gradient-to-r from-[#ffb95a] to-[#ffb347] rounded-full transition-all duration-300 ease-linear"
              style={{ width: `${progressPercent}%` }}
            />
          </div>
          <div className="flex justify-between font-mono text-[10px] text-[#d6c3b0]/70">
            <span>{formatTime(currentTime)}</span>
            <span>{duration > 0 ? formatTime(duration) : "--:--"}</span>
          </div>
        </div>

        {/* Playback Controls Row */}
        <div className="flex items-center justify-between pt-1 border-t border-white/10">
          {/* Animated Equalizer */}
          <div className="flex items-end gap-1 h-3 px-1" aria-hidden="true">
            <span className={`w-0.5 bg-[#ffd7a9] rounded-full ${isPlaying ? "h-full animate-bounce" : "h-1 opacity-40"}`} />
            <span className={`w-0.5 bg-[#ffd7a9] rounded-full ${isPlaying ? "h-3/4 animate-bounce [animation-delay:0.2s]" : "h-1.5 opacity-40"}`} />
            <span className={`w-0.5 bg-[#ffd7a9] rounded-full ${isPlaying ? "h-full animate-bounce [animation-delay:0.4s]" : "h-1 opacity-40"}`} />
          </div>

          {/* Media Controls */}
          <div className="flex items-center gap-3">
            {/* Previous */}
            <button
              type="button"
              onClick={() => {
                console.log("[MusicCard] Previous button clicked!");
                onPrevious?.();
              }}
              aria-label="Previous track"
              className="p-1 rounded-full text-[#e2e2e5]/70 hover:text-[#ffd7a9] transition-colors focus:outline-none"
            >
              <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                <path d="M6 6h2v12H6zm3.5 6l8.5 6V6z" />
              </svg>
            </button>

            {/* Play/Pause Knob */}
            <button
              type="button"
              onClick={() => {
                console.log("[MusicCard] Play/Pause button clicked!");
                onPlayPause?.();
              }}
              aria-label={isPlaying ? "Pause track" : "Play track"}
              className="w-9 h-9 rounded-full bg-gradient-to-b from-[#ffb347] to-[#845400] border-2 border-[#1e2022] shadow-[0_0_15px_rgba(255,179,71,0.4)] flex items-center justify-center text-[#462a00] hover:scale-105 active:scale-95 transition-all focus:outline-none focus-visible:ring-2 focus-visible:ring-[#ffd7a9]"
            >
              {isPlaying ? (
                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                  <path d="M6 19h4V5H6v14zm8-14v14h4V5h-4z" />
                </svg>
              ) : (
                <svg className="w-4 h-4 ml-0.5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                  <path d="M8 5v14l11-7z" />
                </svg>
              )}
            </button>

            {/* Next */}
            <button
              type="button"
              onClick={() => {
                console.log("[MusicCard] Next button clicked!");
                onNext?.();
              }}
              aria-label="Next track"
              className="p-1 rounded-full text-[#e2e2e5]/70 hover:text-[#ffd7a9] transition-colors focus:outline-none"
            >
              <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                <path d="M6 18l8.5-6L6 6v12zM16 6v12h2V6h-2z" />
              </svg>
            </button>
          </div>

          <span className="font-mono text-[9px] text-[#d6c3b0]/50 uppercase tracking-wider">
            FM 92.7
          </span>
        </div>
      </div>
    </div>
  );
}
