import React from "react";

interface PlayButtonProps {
  isPlaying?: boolean;
  onClick?: () => void;
  className?: string;
}

export function PlayButton({
  isPlaying = false,
  onClick,
  className = "",
}: PlayButtonProps) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-label={isPlaying ? "Pause pahadi songs playlist" : "Play pahadi songs playlist"}
      className={`group relative flex flex-col items-center justify-center cursor-pointer focus:outline-none focus-visible:ring-4 focus-visible:ring-[#E8A33D] focus-visible:ring-offset-4 focus-visible:ring-offset-[#2F4538] rounded-full transition-transform active:scale-95 ${
        !isPlaying ? "animate-soft-pulse" : ""
      } ${className}`}
    >
      {/* Outer Dial Knob Chassis - Compact & Perfectly Proportioned */}
      <div className="relative flex items-center justify-center w-24 h-24 sm:w-28 sm:h-28 md:w-32 md:h-32 rounded-full bg-gradient-to-b from-[#E8A33D] via-[#d49232] to-[#b37720] border-4 border-[#2F4538] shadow-[0_8px_30px_rgba(0,0,0,0.65)] transition-all duration-300 group-hover:scale-105">
        {/* Tactile Inner Dial Ring */}
        <div className="absolute inset-2 rounded-full border-2 border-dashed border-[#2F4538]/40 pointer-events-none" />
        <div className="absolute inset-3.5 rounded-full border border-[#F7EFE2]/25 pointer-events-none" />

        {/* Center Play / Pause Icon */}
        {isPlaying ? (
          <svg
            className="w-8 h-8 sm:w-10 sm:h-10 md:w-12 md:h-12 text-[#2F4538] drop-shadow-sm transition-transform duration-200 group-hover:scale-110"
            fill="currentColor"
            viewBox="0 0 24 24"
            aria-hidden="true"
          >
            <path d="M6 19h4V5H6v14zm8-14v14h4V5h-4z" />
          </svg>
        ) : (
          <svg
            className="w-8 h-8 sm:w-10 sm:h-10 md:w-12 md:h-12 text-[#2F4538] ml-1 drop-shadow-sm transition-transform duration-200 group-hover:scale-110"
            fill="currentColor"
            viewBox="0 0 24 24"
            aria-hidden="true"
          >
            <path d="M8 5v14l11-7z" />
          </svg>
        )}
      </div>

      {/* Button Text Label in Devanagari */}
      <span className="mt-2.5 font-serif text-base sm:text-lg md:text-xl text-[#F7EFE2] text-caption-shadow tracking-wider font-semibold group-hover:text-[#E8A33D] transition-colors">
        {isPlaying ? "रुकिए" : "🎵 बजाओ"}
      </span>
    </button>
  );
}
