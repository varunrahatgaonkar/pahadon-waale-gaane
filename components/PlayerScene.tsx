import React from "react";

interface PlayerSceneProps {
  children?: React.ReactNode;
}

export function PlayerScene({ children }: PlayerSceneProps) {
  return (
    <div className="relative w-full h-screen overflow-hidden bg-[#2F4538] select-none">
      {/* Background scene layer with subtle CSS drift animation */}
      <div 
        aria-hidden="true" 
        className="absolute inset-0 w-full h-full animate-slow-drift origin-center pointer-events-none"
      >
        {/* Temporary CSS Gradient Art treating golden hour mountain scene until final asset is bound */}
        <div 
          className="w-full h-full bg-gradient-to-b from-[#5C6E79] via-[#D97B4C]/80 to-[#2F4538] opacity-90 transition-opacity duration-700"
          style={{
            backgroundImage: `
              radial-gradient(circle at 50% 20%, rgba(232, 163, 61, 0.35) 0%, transparent 60%),
              linear-gradient(to bottom, #5C6E79 0%, #D97B4C 45%, #2F4538 90%)
            `
          }}
        />

        {/* Distant mountain contour & mist illusion layer */}
        <div className="absolute inset-x-0 bottom-0 h-2/3 bg-gradient-to-t from-[#2F4538] via-[#2F4538]/70 to-transparent" />
      </div>

      {/* Scrim overlay for legibility & atmospheric vignette */}
      <div 
        aria-hidden="true" 
        className="absolute inset-0 bg-radial from-transparent via-black/20 to-black/60 pointer-events-none" 
      />

      {/* Scene Header - Title & Subtitle */}
      <header className="absolute top-6 left-6 right-6 md:top-8 md:left-8 flex flex-col items-start z-10 pointer-events-auto">
        <h1 className="font-serif text-3xl md:text-5xl text-[#F7EFE2] drop-shadow-md tracking-wide leading-tight">
          पहाड़ों वाले गाने
        </h1>
        <p className="font-sans text-xs md:text-sm text-[#F7EFE2]/80 tracking-wider uppercase mt-1 font-medium">
          Pahado Wale Gaane
        </p>
      </header>

      {/* Main viewport slot for interactive UI elements (PlayButton, NowPlayingBar, etc.) */}
      <main className="relative z-10 w-full h-full flex flex-col items-center justify-between p-6 md:p-8">
        {children}
      </main>
    </div>
  );
}
