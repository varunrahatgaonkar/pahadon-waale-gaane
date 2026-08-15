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
      <div className="relative flex items-center justify-center w-28 h-28 md:w-36 md:h-36 rounded-full bg-[#E8A33D] border-4 border-[#2F4538] shadow-2xl transition-all duration-300 group-hover:bg-[#d49232] group-hover:scale-105">
        <div className="absolute inset-2 rounded-full border-2 border-dashed border-[#2F4538]/30 pointer-events-none" />

        {isPlaying ? (
          <svg
            className="w-10 h-10 md:w-14 md:h-14 text-[#2F4538] transition-transform duration-200 group-hover:scale-110"
            fill="currentColor"
            viewBox="0 0 24 24"
            aria-hidden="true"
          >
            <path d="M6 19h4V5H6v14zm8-14v14h4V5h-4z" />
          </svg>
        ) : (
          <svg
            className="w-10 h-10 md:w-14 md:h-14 text-[#2F4538] ml-1 transition-transform duration-200 group-hover:scale-110"
            fill="currentColor"
            viewBox="0 0 24 24"
            aria-hidden="true"
          >
            <path d="M8 5v14l11-7z" />
          </svg>
        )}
      </div>

      <span className="mt-3 font-serif text-lg md:text-xl text-[#F7EFE2] drop-shadow-md tracking-wider font-medium group-hover:text-[#E8A33D] transition-colors">
        {isPlaying ? "रुकिए" : "🎵 बजाओ"}
      </span>
    </button>
  );
}
