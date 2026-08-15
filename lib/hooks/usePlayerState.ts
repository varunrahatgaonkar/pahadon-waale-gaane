"use client";

import { useState, useRef, useCallback, useEffect } from "react";
import { PLAYLIST_CONFIG } from "@/lib/playlist";
import type { AudioProvider } from "@/components/NowPlayingBar";
import type { YTPlayerInstance } from "@/components/YouTubePlayer";
import type { SpotifyControllerInstance } from "@/components/SpotifyEmbed";

export interface TrackInfo {
  title: string;
  artist: string;
}

export function usePlayerState() {
  const [provider, setProvider] = useState<AudioProvider>("youtube");
  const [isPlaying, setIsPlaying] = useState<boolean>(false);
  const [currentTime, setCurrentTime] = useState<number>(0);
  const [duration, setDuration] = useState<number>(0);
  const [currentTrack, setCurrentTrack] = useState<TrackInfo>(PLAYLIST_CONFIG.fallbackTrack);
  const ytPlayerRef = useRef<YTPlayerInstance | null>(null);
  const spotifyControllerRef = useRef<SpotifyControllerInstance | null>(null);

  const handleYTReady = useCallback((playerInstance: YTPlayerInstance) => {
    ytPlayerRef.current = playerInstance;
  }, []);

  const handleYTStateChange = useCallback((playing: boolean, trackData?: TrackInfo) => {
    if (provider === "youtube") {
      setIsPlaying(playing);
      if (trackData) {
        setCurrentTrack(trackData);
      }
    }
  }, [provider]);

  const handleSpotifyReady = useCallback((controllerInstance: SpotifyControllerInstance) => {
    spotifyControllerRef.current = controllerInstance;
  }, []);

  const handleSpotifyStateChange = useCallback(
    (playing: boolean, positionSec?: number, durationSec?: number) => {
      if (provider === "spotify") {
        setIsPlaying(playing);
        if (typeof positionSec === "number") setCurrentTime(positionSec);
        if (typeof durationSec === "number" && durationSec > 0) setDuration(durationSec);
      }
    },
    [provider]
  );

  // Poll YouTube player progress when playing
  useEffect(() => {
    if (provider !== "youtube" || !isPlaying) return;

    const interval = setInterval(() => {
      if (ytPlayerRef.current) {
        try {
          if (typeof ytPlayerRef.current.getCurrentTime === "function") {
            const curr = ytPlayerRef.current.getCurrentTime() || 0;
            setCurrentTime(Math.floor(curr));
          }
          if (typeof ytPlayerRef.current.getDuration === "function") {
            const dur = ytPlayerRef.current.getDuration() || 0;
            if (dur > 0) setDuration(Math.floor(dur));
          }
        } catch {
          // ignore
        }
      }
    }, 1000);

    return () => clearInterval(interval);
  }, [provider, isPlaying]);

  // Enforce single-provider playback rule
  const handleToggleProvider = useCallback(
    (newProvider: AudioProvider) => {
      if (newProvider === provider) return;

      if (provider === "youtube" && ytPlayerRef.current) {
        try {
          if (typeof ytPlayerRef.current.pauseVideo === "function") {
            ytPlayerRef.current.pauseVideo();
          }
        } catch {
          // ignore
        }
      } else if (provider === "spotify" && spotifyControllerRef.current) {
        try {
          if (typeof spotifyControllerRef.current.pause === "function") {
            spotifyControllerRef.current.pause();
          }
        } catch {
          // ignore
        }
      }

      setIsPlaying(false);
      setCurrentTime(0);
      setDuration(0);
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
    } else if (provider === "spotify") {
      if (!spotifyControllerRef.current) return;
      try {
        if (typeof spotifyControllerRef.current.togglePlay === "function") {
          spotifyControllerRef.current.togglePlay();
        } else if (isPlaying) {
          spotifyControllerRef.current.pause();
        } else {
          spotifyControllerRef.current.play();
        }
      } catch {
        setIsPlaying(!isPlaying);
      }
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
  };
}
