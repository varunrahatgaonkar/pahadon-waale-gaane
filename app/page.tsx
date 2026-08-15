"use client";

import React, { useState } from "react";
import { PlayerScene } from "@/components/PlayerScene";
import { MusicCard } from "@/components/MusicCard";
import { ShareButton } from "@/components/ShareButton";
import { LiveListenersBadge } from "@/components/LiveListenersBadge";
import { YouTubePlayer } from "@/components/YouTubePlayer";
import { PlaylistDrawer } from "@/components/PlaylistDrawer";
import { FirstTimeBanner } from "@/components/FirstTimeBanner";
import { CollaborateButton } from "@/components/CollaborateButton";
import { usePlayerState } from "@/lib/hooks/usePlayerState";

export default function Home() {
  const [isPlaylistOpen, setIsPlaylistOpen] = useState(false);

  const {
    isPlaying,
    isShuffle,
    currentTime,
    duration,
    currentTrack,
    handleYTReady,
    handleYTStateChange,
    handlePlayPause,
    handleNext,
    handlePrevious,
    handleToggleShuffle,
    handleSelectTrackIndex,
  } = usePlayerState();

  const startAudioFromTutorial = () => {
    if (!isPlaying) {
      handlePlayPause();
    }
  };

  return (
    <PlayerScene>
      {/* Onboarding Tutorial Modal for First-time Visitors */}
      <FirstTimeBanner onStartAudio={startAudioFromTutorial} />

      {/* Top Header Navigation Group - Fixed in Top Right Corner */}
      <div className="fixed top-3 right-3 sm:top-6 sm:right-8 z-40 flex items-center gap-2 sm:gap-3 pointer-events-auto">
        <LiveListenersBadge />
        <ShareButton />
      </div>

      {/* Top Center Collaborative Button */}
      <div className="fixed top-3 left-1/2 -translate-x-1/2 z-40 pointer-events-auto">
        <CollaborateButton />
      </div>

      {/* Hero Center - Clean Unobscured Scene View */}
      <div className="flex-1" />

      {/* Bottom Center Floating Compact Music Dashboard Card */}
      <div className="w-full flex justify-center z-20 px-3 pb-3 sm:pb-6">
        <MusicCard
          trackTitle={currentTrack.title}
          artistName={currentTrack.artist}
          isPlaying={isPlaying}
          isShuffle={isShuffle}
          currentTime={currentTime}
          duration={duration}
          onPlayPause={handlePlayPause}
          onNext={handleNext}
          onPrevious={handlePrevious}
          onToggleShuffle={handleToggleShuffle}
          onOpenPlaylist={() => setIsPlaylistOpen(true)}
        />
      </div>

      {/* Playlist Drawer Modal */}
      <PlaylistDrawer
        isOpen={isPlaylistOpen}
        onClose={() => setIsPlaylistOpen(false)}
        currentTrackTitle={currentTrack.title}
        currentArtistName={currentTrack.artist}
        isPlaying={isPlaying}
        isShuffle={isShuffle}
        onToggleShuffle={handleToggleShuffle}
        onSelectTrack={handleSelectTrackIndex}
      />

      {/* Headless YouTube Player Engine */}
      <YouTubePlayer onPlayerReady={handleYTReady} onStateChange={handleYTStateChange} />
    </PlayerScene>
  );
}
