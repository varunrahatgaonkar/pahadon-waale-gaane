"use client";

import React from "react";
import type { AudioProvider } from "./NowPlayingBar";

export interface MusicCardProps {
  trackTitle?: string;
  artistName?: string;
  isPlaying?: boolean;
  currentTime?: number;
  duration?: number;
  provider?: AudioProvider;
  onPlayPause?: () => void;
  onNext?: () => void;
  onPrevious?: () => void;
  onToggleProvider?: (newProvider: AudioProvider) => void;
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
  currentTime = 0,
  duration = 0,
  provider = "youtube",
  onPlayPause,
  onNext,
  onPrevious,
  onToggleProvider,
  className = "",
}: MusicCardProps) {
  const progressPercent = duration > 0 ? Math.min(100, (currentTime / duration) * 100) : 0;

  return (
    <div
      className={`w-full max-w-md bg-black/75 backdrop-blur-xl border border-white/15 rounded-2xl p-4 sm:p-5 shadow-[0_16px_50px_rgba(0,0,0,0.8)] text-[#F7EFE2] select-none transition-all duration-300 ${className}`}
    >
      {/* Top Track Header Row */}
      <div className="flex items-center justify-between gap-3 mb-3">
        <div className="flex items-center gap-3 min-w-0 flex-1">
          {/* Cassette / Spinning Disc Thumbnail */}
          <div className="relative w-11 h-11 sm:w-12 sm:h-12 rounded-full bg-[#2F4538] border-2 border-[#E8A33D] shrink-0 flex items-center justify-center shadow-md overflow-hidden">
            <div
              className={`w-full h-full rounded-full bg-gradient-to-tr from-[#2F4538] via-[#E8A33D]/30 to-[#2F4538] flex items-center justify-center ${
                isPlaying ? "animate-spin [animation-duration:8s]" : ""
              }`}
            >
              <div className="w-4 h-4 rounded-full bg-[#E8A33D] border border-black/50" />
            </div>
          </div>

          {/* Title & Artist */}
          <div className="min-w-0 flex-1">
            <h3 className="font-sans text-sm sm:text-base font-bold text-[#F7EFE2] truncate leading-tight">
              {trackTitle}
            </h3>
            <p className="font-sans text-xs text-[#F7EFE2]/60 truncate mt-0.5">
              {artistName}
            </p>
          </div>
        </div>

        {/* Animated Equalizer Waveform when playing */}
        <div className="flex items-end gap-0.5 h-4 px-2 shrink-0" aria-hidden="true">
          <span className={`w-1 bg-[#E8A33D] rounded-full ${isPlaying ? "animate-bounce h-full" : "h-1.5 opacity-40"}`} />
          <span className={`w-1 bg-[#E8A33D] rounded-full ${isPlaying ? "animate-bounce [animation-delay:0.2s] h-3/4" : "h-2.5 opacity-40"}`} />
          <span className={`w-1 bg-[#E8A33D] rounded-full ${isPlaying ? "animate-bounce [animation-delay:0.4s] h-full" : "h-1.5 opacity-40"}`} />
        </div>
      </div>

      {/* Dynamic Real Progress Bar & Timestamps */}
      <div className="w-full mb-3">
        <div className="w-full h-1.5 bg-white/10 rounded-full overflow-hidden">
          <div
            className="h-full bg-gradient-to-r from-[#E8A33D] to-amber-300 transition-all duration-300 ease-linear rounded-full"
            style={{ width: `${progressPercent}%` }}
          />
        </div>
        <div className="flex items-center justify-between text-[10px] text-[#F7EFE2]/60 font-mono mt-1">
          <span>{formatTime(currentTime)}</span>
          <span>{duration > 0 ? formatTime(duration) : "--:--"}</span>
        </div>
      </div>

      {/* Playback Controls & Provider Selector */}
      <div className="flex items-center justify-between gap-2 pt-1 border-t border-white/10">
        {/* Audio Provider Toggle Switch */}
        <div className="inline-flex items-center bg-black/60 p-0.5 rounded-full border border-white/10 text-[9px] font-sans">
          <button
            type="button"
            onClick={() => onToggleProvider?.("youtube")}
            aria-label="Switch to YouTube player"
            aria-pressed={provider === "youtube"}
            className={`px-2.5 py-1 rounded-full transition-all duration-200 ${
              provider === "youtube"
                ? "bg-[#D97B4C] text-[#F7EFE2] font-semibold"
                : "text-[#F7EFE2]/40 hover:text-[#F7EFE2]"
            } focus:outline-none focus-visible:ring-1 focus-visible:ring-[#E8A33D]`}
          >
            YouTube
          </button>
          <button
            type="button"
            onClick={() => onToggleProvider?.("spotify")}
            aria-label="Switch to Spotify player"
            aria-pressed={provider === "spotify"}
            className={`px-2.5 py-1 rounded-full transition-all duration-200 ${
              provider === "spotify"
                ? "bg-[#1DB954] text-white font-semibold"
                : "text-[#F7EFE2]/40 hover:text-[#F7EFE2]"
            } focus:outline-none focus-visible:ring-1 focus-visible:ring-[#1DB954]`}
          >
            Spotify
          </button>
        </div>

        {/* Media Buttons */}
        <div className="flex items-center gap-2 sm:gap-3">
          <button
            type="button"
            onClick={onPrevious}
            aria-label="Previous track"
            className="p-1.5 rounded-full text-[#F7EFE2]/70 hover:text-[#E8A33D] transition-colors focus:outline-none focus-visible:ring-1 focus-visible:ring-[#E8A33D]"
          >
            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
              <path d="M6 6h2v12H6zm3.5 6l8.5 6V6z" />
            </svg>
          </button>

          {/* Sole Play/Pause Trigger */}
          <button
            type="button"
            onClick={onPlayPause}
            aria-label={isPlaying ? "Pause track" : "Play track"}
            className="w-10 h-10 rounded-full bg-[#E8A33D] text-[#2F4538] hover:bg-[#d49232] transition-transform active:scale-95 flex items-center justify-center shadow-lg focus:outline-none focus-visible:ring-2 focus-visible:ring-[#F7EFE2]"
          >
            {isPlaying ? (
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                <path d="M6 19h4V5H6v14zm8-14v14h4V5h-4z" />
              </svg>
            ) : (
              <svg className="w-5 h-5 ml-0.5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                <path d="M8 5v14l11-7z" />
              </svg>
            )}
          </button>

          <button
            type="button"
            onClick={onNext}
            aria-label="Next track"
            className="p-1.5 rounded-full text-[#F7EFE2]/70 hover:text-[#E8A33D] transition-colors focus:outline-none focus-visible:ring-1 focus-visible:ring-[#E8A33D]"
          >
            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
              <path d="M6 18l8.5-6L6 6v12zM16 6v12h2V6h-2z" />
            </svg>
          </button>
        </div>
      </div>
    </div>
  );
}
