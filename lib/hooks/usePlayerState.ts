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
  const [currentTime, setCurrentTime] = useState<number>(0);
  const [duration, setDuration] = useState<number>(0);
  const [currentTrack, setCurrentTrack] = useState<TrackInfo>(PLAYLIST_CONFIG.fallbackTrack);
  const ytPlayerRef = useRef<YTPlayerInstance | null>(null);

  const handleYTReady = useCallback((playerInstance: YTPlayerInstance) => {
    ytPlayerRef.current = playerInstance;
  }, []);

  const handleYTStateChange = useCallback((playing: boolean, trackData?: TrackInfo) => {
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
  }, [isPlaying]);

  const handleNext = useCallback(() => {
    if (ytPlayerRef.current) {
      try {
        if (typeof ytPlayerRef.current.nextVideo === "function") {
          ytPlayerRef.current.nextVideo();
        }
      } catch {
        // ignore
      }
    }
  }, []);

  const handlePrevious = useCallback(() => {
    if (ytPlayerRef.current) {
      try {
        if (typeof ytPlayerRef.current.previousVideo === "function") {
          ytPlayerRef.current.previousVideo();
        }
      } catch {
        // ignore
      }
    }
  }, []);

  return {
    isPlaying,
    currentTime,
    duration,
    currentTrack,
    handleYTReady,
    handleYTStateChange,
    handlePlayPause,
    handleNext,
    handlePrevious,
  };
}
