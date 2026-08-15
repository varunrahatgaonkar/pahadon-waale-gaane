"use client";

import { useState, useRef, useCallback, useEffect } from "react";
import { PLAYLIST_CONFIG } from "@/lib/playlist";
import type { YTPlayerInstance } from "@/components/YouTubePlayer";

export interface TrackInfo {
  title: string;
  artist: string;
}

export function usePlayerState() {
  const [isPlaying, setIsPlaying] = useState<boolean>(false);
  const [isShuffle, setIsShuffle] = useState<boolean>(false);
  const [currentTime, setCurrentTime] = useState<number>(0);
  const [duration, setDuration] = useState<number>(0);
  const [currentTrack, setCurrentTrack] = useState<TrackInfo>(PLAYLIST_CONFIG.fallbackTrack);
  const ytPlayerRef = useRef<YTPlayerInstance | null>(null);

  const handleYTReady = useCallback((playerInstance: YTPlayerInstance) => {
    console.log("[Pahado Player Hook] handleYTReady called with playerInstance:", playerInstance);
    ytPlayerRef.current = playerInstance;
  }, []);

  const handleYTStateChange = useCallback((playing: boolean, trackData?: TrackInfo) => {
    console.log(`[Pahado Player Hook] handleYTStateChange -> playing: ${playing}`, trackData);
    setIsPlaying(playing);
    if (trackData) {
      setCurrentTrack(trackData);
    }
  }, []);

  // Poll YouTube player progress when playing
  useEffect(() => {
    if (!isPlaying) return;

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
  }, [isPlaying]);

  const handlePlayPause = useCallback(() => {
    console.log("[Pahado Player Hook] handlePlayPause clicked! Current isPlaying state:", isPlaying);
    console.log("[Pahado Player Hook] ytPlayerRef.current status:", ytPlayerRef.current);

    if (!ytPlayerRef.current) {
      console.warn("[Pahado Player Hook] YouTube player reference is not ready yet!");
      return;
    }

    try {
      if (isPlaying) {
        console.log("[Pahado Player Hook] Sending pause command to YouTube player...");
        ytPlayerRef.current.pauseVideo();
      } else {
        console.log("[Pahado Player Hook] Sending play command to YouTube player...");
        ytPlayerRef.current.playVideo();
      }
    } catch (err) {
      console.error("[Pahado Player Hook] Error toggling play/pause:", err);
      setIsPlaying(!isPlaying);
    }
  }, [isPlaying]);

  const handleNext = useCallback(() => {
    console.log("[Pahado Player Hook] handleNext clicked!");
    if (ytPlayerRef.current) {
      try {
        if (typeof ytPlayerRef.current.nextVideo === "function") {
          ytPlayerRef.current.nextVideo();
        }
      } catch (err) {
        console.error("[Pahado Player Hook] Error calling nextVideo:", err);
      }
    }
  }, []);

  const handlePrevious = useCallback(() => {
    console.log("[Pahado Player Hook] handlePrevious clicked!");
    if (ytPlayerRef.current) {
      try {
        if (typeof ytPlayerRef.current.previousVideo === "function") {
          ytPlayerRef.current.previousVideo();
        }
      } catch (err) {
        console.error("[Pahado Player Hook] Error calling previousVideo:", err);
      }
    }
  }, []);

  const handleToggleShuffle = useCallback(() => {
    const nextShuffle = !isShuffle;
    console.log(`[Pahado Player Hook] Toggling shuffle: ${nextShuffle}`);
    setIsShuffle(nextShuffle);
    if (ytPlayerRef.current && typeof ytPlayerRef.current.setShuffle === "function") {
      try {
        ytPlayerRef.current.setShuffle(nextShuffle);
      } catch (err) {
        console.error("[Pahado Player Hook] Error toggling shuffle:", err);
      }
    }
  }, [isShuffle]);

  const handleSelectTrackIndex = useCallback((index: number, videoId?: string) => {
    console.log(`[Pahado Player Hook] Selecting track index: ${index}, videoId: ${videoId}`);
    if (ytPlayerRef.current) {
      try {
        if (videoId && typeof ytPlayerRef.current.loadVideoById === "function") {
          ytPlayerRef.current.loadVideoById(videoId);
        } else if (typeof ytPlayerRef.current.playVideoAt === "function") {
          ytPlayerRef.current.playVideoAt(index);
        } else {
          ytPlayerRef.current.playVideo();
        }
      } catch (err) {
        console.error("[Pahado Player Hook] Error playing video at index/ID:", err);
      }
    }
  }, []);

  return {
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
  };
}
