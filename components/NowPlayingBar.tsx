"use client";

import React, { useState, useEffect } from "react";

export type AudioProvider = "youtube" | "spotify";

export interface NowPlayingBarProps {
  trackTitle?: string;
  artistName?: string;
  isPlaying?: boolean;
  provider?: AudioProvider;
  onPlayPause?: () => void;
  onNext?: () => void;
  onPrevious?: () => void;
  onToggleProvider?: (newProvider: AudioProvider) => void;
  className?: string;
}

export function NowPlayingBar({
  trackTitle = "पहाड़ों वाले गाने",
  artistName = "Radio Pahad",
  isPlaying = false,
  provider = "youtube",
  onPlayPause,
  onNext,
  onPrevious,
  onToggleProvider,
  className = "",
}: NowPlayingBarProps) {
  const [listeners, setListeners] = useState<number>(18);

  // Poll live active listener count & send heartbeat
  useEffect(() => {
    const sessionId =
      typeof window !== "undefined"
        ? window.sessionStorage.getItem("pahado_session") ||
          (() => {
            const id = Math.random().toString(36).substring(2, 9);
            window.sessionStorage.setItem("pahado_session", id);
            return id;
          })()
        : "anon";

    const fetchListeners = () => {
      fetch(`/api/listeners?session=${sessionId}`)
        .then((res) => res.json())
        .then((data) => {
          if (data.listeners) {
            setListeners(data.listeners);
          }
        })
        .catch(() => {});
    };

    fetchListeners();
    const interval = setInterval(fetchListeners, 20000); // Heartbeat every 20s
    return () => clearInterval(interval);
  }, []);

  return (
    <footer
      className={`fixed bottom-0 inset-x-0 bg-black/70 backdrop-blur-md border-t border-[#F7EFE2]/15 px-3 py-2.5 md:px-6 md:py-3 z-20 flex items-center justify-between gap-2 text-[#F7EFE2] ${className}`}
    >
      {/* Track Info & Live Listeners Badge */}
      <div className="flex items-center gap-2.5 min-w-0 flex-1 sm:flex-initial sm:w-1/3">
        <div className="min-w-0 text-left">
          <div className="flex items-center gap-1.5">
            <p className="font-sans text-xs md:text-sm font-semibold truncate tracking-wide text-[#F7EFE2]">
              {trackTitle}
            </p>
          </div>
          <div className="flex items-center gap-2 mt-0.5">
            <span className="font-sans text-[10px] md:text-xs text-[#F7EFE2]/60 truncate">
              {artistName}
            </span>
            <span className="text-[#F7EFE2]/30 text-[10px]" aria-hidden="true">•</span>
            {/* Live Listener Ticker Badge */}
            <span className="inline-flex items-center gap-1 text-[10px] md:text-[11px] text-[#E8A33D] font-medium shrink-0">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-ping" aria-hidden="true" />
              <span>{listeners} लोग सुन रहे हैं</span>
            </span>
          </div>
        </div>
      </div>

      {/* Playback Controls */}
      <div className="flex items-center justify-center gap-2.5 sm:gap-3 shrink-0">
        <button
          type="button"
          onClick={onPrevious}
          aria-label="Previous track"
          className="p-1.5 rounded-full text-[#F7EFE2]/70 hover:text-[#E8A33D] transition-colors focus:outline-none focus-visible:ring-1 focus-visible:ring-[#E8A33D]"
        >
          <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
            <path d="M6 6h2v12H6zm3.5 6l8.5 6V6z" />
          </svg>
        </button>

        <button
          type="button"
          onClick={onPlayPause}
          aria-label={isPlaying ? "Pause track" : "Play track"}
          className="p-2 rounded-full bg-[#E8A33D] text-[#2F4538] hover:bg-[#d49232] transition-transform active:scale-95 focus:outline-none focus-visible:ring-1 focus-visible:ring-[#F7EFE2]"
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

        <button
          type="button"
          onClick={onNext}
          aria-label="Next track"
          className="p-1.5 rounded-full text-[#F7EFE2]/70 hover:text-[#E8A33D] transition-colors focus:outline-none focus-visible:ring-1 focus-visible:ring-[#E8A33D]"
        >
          <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
            <path d="M6 18l8.5-6L6 6v12zM16 6v12h2V6h-2z" />
          </svg>
        </button>
      </div>

      {/* Audio Provider Selector */}
      <div className="flex items-center justify-end flex-1 sm:flex-initial sm:w-1/3">
        <div className="inline-flex items-center bg-black/50 p-0.5 rounded-full border border-[#F7EFE2]/10 text-[9px] font-sans">
          <button
            type="button"
            onClick={() => onToggleProvider?.("youtube")}
            aria-label="Switch to YouTube player"
            aria-pressed={provider === "youtube"}
            className={`px-2 py-0.5 rounded-full transition-all duration-200 ${
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
            className={`px-2 py-0.5 rounded-full transition-all duration-200 ${
              provider === "spotify"
                ? "bg-[#1DB954] text-white font-semibold"
                : "text-[#F7EFE2]/40 hover:text-[#F7EFE2]"
            } focus:outline-none focus-visible:ring-1 focus-visible:ring-[#1DB954]`}
          >
            Spotify
          </button>
        </div>
      </div>
    </footer>
  );
}
