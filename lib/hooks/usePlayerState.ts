"use client";

import { useState, useRef, useCallback } from "react";
import { PLAYLIST_CONFIG } from "@/lib/playlist";
import type { AudioProvider } from "@/components/NowPlayingBar";
import type { YTPlayerInstance } from "@/components/YouTubePlayer";

export interface TrackInfo {
  title: string;
  artist: string;
}

export function usePlayerState() {
  const [provider, setProvider] = useState<AudioProvider>("youtube");
  const [isPlaying, setIsPlaying] = useState<boolean>(false);
  const [currentTrack, setCurrentTrack] = useState<TrackInfo>(PLAYLIST_CONFIG.fallbackTrack);
  const ytPlayerRef = useRef<YTPlayerInstance | null>(null);

  const handleYTReady = useCallback((playerInstance: YTPlayerInstance) => {
    ytPlayerRef.current = playerInstance;
  }, []);

  const handleYTStateChange = useCallback((playing: boolean, trackData?: TrackInfo) => {
    // Only update state if YouTube is the active provider
    if (provider === "youtube") {
      setIsPlaying(playing);
      if (trackData) {
        setCurrentTrack(trackData);
      }
    }
  }, [provider]);

  // Enforce single-provider playback rule
  const handleToggleProvider = useCallback(
    (newProvider: AudioProvider) => {
      if (newProvider === provider) return;

      // If YouTube was playing and we switch away to Spotify, explicitly pause YouTube
      if (provider === "youtube" && ytPlayerRef.current) {
        try {
          if (typeof ytPlayerRef.current.pauseVideo === "function") {
            ytPlayerRef.current.pauseVideo();
          }
        } catch {
          // ignore
        }
      }

      setIsPlaying(false);
      setProvider(newProvider);

      if (newProvider === "spotify") {
        setCurrentTrack({
          title: "Spotify Mountain Playlist",
          artist: "Pahado Wale Gaane",
        });
      } else {
        setCurrentTrack(PLAYLIST_CONFIG.fallbackTrack);
      }
    },
    [provider]
  );

  const handlePlayPause = useCallback(() => {
    if (provider === "youtube") {
      if (!ytPlayerRef.current) return;
      try {
        if (isPlaying) {
          ytPlayerRef.current.pauseVideo();
        } else {
          ytPlayerRef.current.playVideo();
        }
      } catch {
        setIsPlaying(!isPlaying);
      }
    } else {
      // Toggle play state representation for Spotify embed view
      setIsPlaying((prev) => !prev);
    }
  }, [provider, isPlaying]);

  const handleNext = useCallback(() => {
    if (provider === "youtube" && ytPlayerRef.current) {
      try {
        if (typeof ytPlayerRef.current.nextVideo === "function") {
          ytPlayerRef.current.nextVideo();
        }
      } catch {
        // ignore
      }
    }
  }, [provider]);

  const handlePrevious = useCallback(() => {
    if (provider === "youtube" && ytPlayerRef.current) {
      try {
        if (typeof ytPlayerRef.current.previousVideo === "function") {
          ytPlayerRef.current.previousVideo();
        }
      } catch {
        // ignore
      }
    }
  }, [provider]);

  return {
    provider,
    isPlaying,
    currentTrack,
    handleYTReady,
    handleYTStateChange,
    handleToggleProvider,
    handlePlayPause,
    handleNext,
    handlePrevious,
  };
}
