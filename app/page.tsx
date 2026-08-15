"use client";

import React from "react";
import { PlayerScene } from "@/components/PlayerScene";
import { PlayButton } from "@/components/PlayButton";
import { NowPlayingBar } from "@/components/NowPlayingBar";
import { ShareButton } from "@/components/ShareButton";
import { YouTubePlayer } from "@/components/YouTubePlayer";
import { SpotifyEmbed } from "@/components/SpotifyEmbed";
import { usePlayerState } from "@/lib/hooks/usePlayerState";

export default function Home() {
  const {
    provider,
    isPlaying,
    currentTrack,
    handleYTReady,
    handleYTStateChange,
    handleToggleProvider,
    handlePlayPause,
    handleNext,
    handlePrevious,
  } = usePlayerState();

  return (
    <PlayerScene>
      {/* Top Controls Bar - Share Button */}
      <div className="w-full flex justify-end items-center z-20">
        <ShareButton />
      </div>

      {/* Center Hero Play Interaction Button */}
      <div className="my-auto flex flex-col items-center justify-center z-10">
        <PlayButton isPlaying={isPlaying} onClick={handlePlayPause} />
      </div>

      {/* Bottom Now Playing Bar & Provider Switcher */}
      <NowPlayingBar
        trackTitle={currentTrack.title}
        artistName={currentTrack.artist}
        isPlaying={isPlaying}
        provider={provider}
        onPlayPause={handlePlayPause}
        onNext={handleNext}
        onPrevious={handlePrevious}
        onToggleProvider={handleToggleProvider}
      />

      {/* Headless YouTube IFrame Player */}
      <YouTubePlayer onPlayerReady={handleYTReady} onStateChange={handleYTStateChange} />

      {/* Spotify Embed Overlay */}
      <SpotifyEmbed
        isVisible={provider === "spotify"}
        onClose={() => handleToggleProvider("youtube")}
      />
    </PlayerScene>
  );
}
