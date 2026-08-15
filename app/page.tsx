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
      {/* Top Header Fixed Navigation Elements - Fixed strictly to top edge */}
      <div className="fixed top-4 right-4 sm:top-6 sm:right-8 z-40">
        <ShareButton />
      </div>

      <div className="fixed top-4 left-4 sm:top-6 sm:left-auto sm:left-1/2 sm:-translate-x-1/2 z-40">
        <LiveListenersBadge />
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
