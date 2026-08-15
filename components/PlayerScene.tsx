import React from "react";
import { HeroCarousel } from "./HeroCarousel";

interface PlayerSceneProps {
  children?: React.ReactNode;
}

export function PlayerScene({ children }: PlayerSceneProps) {
  return (
    <div className="relative w-full h-screen overflow-hidden bg-[#1f2d25] select-none flex flex-col justify-between">
      {/* Primary Hero Scene Image Carousel */}
      <HeroCarousel />

      {/* Light atmospheric vignette for contrast & readability without obscuring artwork */}
      <div
        aria-hidden="true"
        className="absolute inset-0 bg-gradient-to-b from-black/50 via-transparent to-black/70 pointer-events-none z-0"
      />

      {/* Header - Devanagari Title & Memory Caption */}
      <header className="relative z-10 p-6 md:p-10 max-w-xl flex flex-col items-start space-y-1.5 pointer-events-auto">
        <h1 className="font-serif text-4xl sm:text-5xl md:text-6xl text-[#F7EFE2] text-signboard-shadow tracking-wide leading-tight">
          पहाड़ों वाले गाने
        </h1>
        <p className="font-sans text-xs md:text-sm text-[#E8A33D] font-bold tracking-widest uppercase text-caption-shadow">
          PAHADO WALE GAANE
        </p>

        {/* Nostalgic Memory Caption */}
        <div className="pt-2 flex flex-col space-y-1 text-caption-shadow">
          <p className="font-sans text-sm sm:text-base text-[#F7EFE2] font-medium tracking-wide">
            &ldquo;woh gaane jo signal jaane ke baad bhi yaad rehte the.&rdquo;
          </p>
          <p className="font-sans text-xs sm:text-sm text-[#F7EFE2]/75 font-normal tracking-wide">
            बस चलती रहे, गाने बजते रहें।
          </p>
        </div>
      </header>

      {/* Main viewport slot */}
      <main className="relative z-10 flex-1 flex flex-col items-center justify-center p-4">
        {children}
      </main>
    </div>
  );
}
