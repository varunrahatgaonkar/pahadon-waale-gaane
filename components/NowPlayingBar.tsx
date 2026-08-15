import React from "react";

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
  trackTitle = "पहाड़ी धुन — Mountain Melodies",
  artistName = "Radio Pahad",
  isPlaying = false,
  provider = "youtube",
  onPlayPause,
  onNext,
  onPrevious,
  onToggleProvider,
  className = "",
}: NowPlayingBarProps) {
  return (
    <footer
      className={`fixed bottom-0 inset-x-0 bg-[#2F4538]/90 backdrop-blur-md border-t border-[#F7EFE2]/15 px-4 py-3 md:px-8 md:py-4 z-20 shadow-2xl flex flex-col sm:flex-row items-center justify-between gap-3 text-[#F7EFE2] ${className}`}
    >
      {/* Track Info Section */}
      <div className="flex items-center gap-3 w-full sm:w-1/3 min-w-0 justify-center sm:justify-start">
        <div className="w-2.5 h-2.5 rounded-full bg-[#E8A33D] shrink-0 animate-pulse" aria-hidden="true" />
        <div className="min-w-0 text-center sm:text-left">
          <p className="font-sans text-sm md:text-base font-semibold truncate tracking-wide text-[#F7EFE2]">
            {trackTitle}
          </p>
          <p className="font-sans text-xs text-[#F7EFE2]/75 truncate">
            {artistName}
          </p>
        </div>
      </div>

      {/* Playback Controls Section */}
      <div className="flex items-center justify-center gap-4 w-full sm:w-1/3">
        {/* Previous Track */}
        <button
          type="button"
          onClick={onPrevious}
          aria-label="Previous track"
          className="p-2 rounded-full text-[#F7EFE2]/80 hover:text-[#E8A33D] hover:bg-[#F7EFE2]/10 transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-[#E8A33D]"
        >
          <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
            <path d="M6 6h2v12H6zm3.5 6l8.5 6V6z" />
          </svg>
        </button>

        {/* Play/Pause Main Button */}
        <button
          type="button"
          onClick={onPlayPause}
          aria-label={isPlaying ? "Pause track" : "Play track"}
          className="p-2.5 rounded-full bg-[#E8A33D] text-[#2F4538] hover:bg-[#d49232] transition-transform active:scale-95 focus:outline-none focus-visible:ring-2 focus-visible:ring-[#F7EFE2] focus-visible:ring-offset-2 focus-visible:ring-offset-[#2F4538]"
        >
          {isPlaying ? (
            <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
              <path d="M6 19h4V5H6v14zm8-14v14h4V5h-4z" />
            </svg>
          ) : (
            <svg className="w-6 h-6 ml-0.5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
              <path d="M8 5v14l11-7z" />
            </svg>
          )}
        </button>

        {/* Next Track */}
        <button
          type="button"
          onClick={onNext}
          aria-label="Next track"
          className="p-2 rounded-full text-[#F7EFE2]/80 hover:text-[#E8A33D] hover:bg-[#F7EFE2]/10 transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-[#E8A33D]"
        >
          <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
            <path d="M6 18l8.5-6L6 6v12zM16 6v12h2V6h-2z" />
          </svg>
        </button>
      </div>

      {/* Audio Provider Toggle Switch (YouTube vs Spotify) */}
      <div className="flex items-center justify-center sm:justify-end w-full sm:w-1/3">
        <div className="inline-flex items-center bg-black/25 p-1 rounded-full border border-[#F7EFE2]/15 text-xs font-sans">
          <button
            type="button"
            onClick={() => onToggleProvider?.("youtube")}
            aria-label="Switch to YouTube player"
            aria-pressed={provider === "youtube"}
            className={`px-3 py-1 rounded-full transition-all duration-200 font-medium ${
              provider === "youtube"
                ? "bg-[#D97B4C] text-[#F7EFE2] shadow-sm"
                : "text-[#F7EFE2]/60 hover:text-[#F7EFE2]"
            } focus:outline-none focus-visible:ring-2 focus-visible:ring-[#E8A33D]`}
          >
            YouTube
          </button>
          <button
            type="button"
            onClick={() => onToggleProvider?.("spotify")}
            aria-label="Switch to Spotify player"
            aria-pressed={provider === "spotify"}
            className={`px-3 py-1 rounded-full transition-all duration-200 font-medium ${
              provider === "spotify"
                ? "bg-[#1DB954] text-white shadow-sm"
                : "text-[#F7EFE2]/60 hover:text-[#F7EFE2]"
            } focus:outline-none focus-visible:ring-2 focus-visible:ring-[#1DB954]`}
          >
            Spotify
          </button>
        </div>
      </div>
    </footer>
  );
}
