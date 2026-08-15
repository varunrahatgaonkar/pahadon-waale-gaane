"use client";

import React from "react";
import { PlayerScene } from "@/components/PlayerScene";
import { MusicCard } from "@/components/MusicCard";
import { ShareButton } from "@/components/ShareButton";
import { LiveListenersBadge } from "@/components/LiveListenersBadge";
import { YouTubePlayer } from "@/components/YouTubePlayer";
import { usePlayerState } from "@/lib/hooks/usePlayerState";

export default function Home() {
  const {
    isPlaying,
    currentTime,
    duration,
    currentTrack,
    handleYTReady,
    handleYTStateChange,
    handlePlayPause,
    handleNext,
    handlePrevious,
  } = usePlayerState();

  return (
    <PlayerScene>
      {/* Top Header Navigation Group - Fixed in Top Right Corner with zero title overlap */}
      <div className="fixed top-4 right-4 sm:top-6 sm:right-8 z-40 flex items-center gap-2.5 sm:gap-3 pointer-events-auto">
        <LiveListenersBadge />
        <ShareButton />
      </div>

      {/* Hero Center - Clean Unobscured Scene View */}
      <div className="flex-1" />

      {/* Bottom Center Floating Compact Music Dashboard Card */}
      <div className="w-full flex justify-center z-20 pb-4 sm:pb-6">
        <MusicCard
          trackTitle={currentTrack.title}
          artistName={currentTrack.artist}
          isPlaying={isPlaying}
          currentTime={currentTime}
          duration={duration}
          onPlayPause={handlePlayPause}
          onNext={handleNext}
          onPrevious={handlePrevious}
        />
      </div>

      {/* Headless YouTube Player Engine */}
      <YouTubePlayer onPlayerReady={handleYTReady} onStateChange={handleYTStateChange} />
    </PlayerScene>
  );
}
