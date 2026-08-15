"use client";

import React from "react";
import { PlayerScene } from "@/components/PlayerScene";
import { MusicCard } from "@/components/MusicCard";
import { ShareButton } from "@/components/ShareButton";
import { LiveListenersBadge } from "@/components/LiveListenersBadge";
import { YouTubePlayer } from "@/components/YouTubePlayer";
import { SpotifyEmbed } from "@/components/SpotifyEmbed";
import { usePlayerState } from "@/lib/hooks/usePlayerState";

export default function Home() {
  const {
    provider,
    isPlaying,
    currentTime,
    duration,
    currentTrack,
    handleYTReady,
    handleYTStateChange,
    handleSpotifyReady,
    handleSpotifyStateChange,
    handleToggleProvider,
    handlePlayPause,
    handleNext,
    handlePrevious,
  } = usePlayerState();

  return (
    <PlayerScene>
      {/* Top Header Row - Top Center Listener Badge & Top Right Share Button */}
      <div className="absolute top-4 inset-x-4 md:top-6 md:inset-x-8 z-30 flex items-center justify-between pointer-events-none">
        {/* Left spacing to balance flex header */}
        <div className="hidden md:block w-32" />

        {/* Top Center: Pusher Presence Listener Count Badge */}
        <div className="mx-auto md:mx-0 pointer-events-auto">
          <LiveListenersBadge />
        </div>

        {/* Top Right Corner: Share Button */}
        <div className="pointer-events-auto">
          <ShareButton />
        </div>
      </div>

      {/* Hero Center - Clean Unobscured Scene View */}
      <div className="flex-1" />

      {/* Bottom Center Floating Music Dashboard Card (Sole Control Center) */}
      <div className="w-full flex justify-center z-20 pb-4 sm:pb-6">
        <MusicCard
          trackTitle={currentTrack.title}
          artistName={currentTrack.artist}
          isPlaying={isPlaying}
          currentTime={currentTime}
          duration={duration}
          provider={provider}
          onPlayPause={handlePlayPause}
          onNext={handleNext}
          onPrevious={handlePrevious}
          onToggleProvider={handleToggleProvider}
        />
      </div>

      {/* Headless YouTube Player Engine */}
      <YouTubePlayer onPlayerReady={handleYTReady} onStateChange={handleYTStateChange} />

      {/* Headless Spotify Player Engine */}
      <SpotifyEmbed
        isVisible={provider === "spotify"}
        onControllerReady={handleSpotifyReady}
        onStateChange={handleSpotifyStateChange}
        onClose={() => handleToggleProvider("youtube")}
      />
    </PlayerScene>
  );
}
