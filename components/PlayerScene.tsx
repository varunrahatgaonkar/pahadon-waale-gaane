import React from "react";
import { HeroCarousel } from "./HeroCarousel";

interface PlayerSceneProps {
  children?: React.ReactNode;
}

export function PlayerScene({ children }: PlayerSceneProps) {
  return (
    <div className="relative w-full h-[100dvh] overflow-hidden bg-[#121416] select-none flex flex-col justify-between">
      {/* Primary Hero Scene Image Carousel */}
      <HeroCarousel />

      {/* Atmospheric vignette for depth & contrast */}
      <div
        aria-hidden="true"
        className="absolute inset-0 bg-gradient-to-b from-black/70 via-transparent to-black/85 pointer-events-none z-0"
      />

      {/* Header - Devanagari Title & Memory Caption */}
      <header className="relative z-10 p-3.5 sm:p-6 md:p-10 max-w-xl flex flex-col items-start space-y-1 sm:space-y-1.5 pointer-events-auto pr-24 sm:pr-6">
        <h1 className="font-serif text-2xl xs:text-3xl sm:text-5xl md:text-6xl text-[#ffd7a9] text-signboard-shadow tracking-wide leading-tight font-bold">
          पहाड़ों वाले गाने
        </h1>
        <p className="font-sans text-[10px] sm:text-xs md:text-sm text-[#ffb347] font-bold tracking-widest uppercase text-caption-shadow">
          PAHADO WALE GAANE
        </p>

        {/* Nostalgic Memory Caption */}
        <div className="pt-1 flex flex-col space-y-0.5 sm:space-y-1 text-caption-shadow">
          <p className="font-sans text-xs sm:text-base text-[#e2e2e5] font-medium tracking-wide italic opacity-90 leading-snug">
            &ldquo;woh gaane jo signal jaane ke baad bhi yaad rehte the.&rdquo;
          </p>
          <p className="font-sans text-[11px] sm:text-sm text-[#e2e2e5]/75 font-normal tracking-wide">
            बस चलती रहे, गाने बजते रहें।
          </p>
        </div>
      </header>

      {/* Main viewport slot */}
      <main className="relative z-10 flex-1 flex flex-col items-center justify-end p-2 sm:p-4">
        {children}
      </main>
    </div>
  );
}
