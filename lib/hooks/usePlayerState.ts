"use client";

import { useState, useRef, useCallback, useEffect } from "react";
import { PLAYLIST_CONFIG } from "@/lib/playlist";
import type { YTPlayerInstance, TrackInfo } from "@/components/YouTubePlayer";

export function usePlayerState() {
  const [isPlaying, setIsPlaying] = useState<boolean>(false);
  const [isShuffle, setIsShuffle] = useState<boolean>(false);
  const [currentTime, setCurrentTime] = useState<number>(0);
  const [duration, setDuration] = useState<number>(0);
  const [currentTrack, setCurrentTrack] = useState<TrackInfo>(PLAYLIST_CONFIG.fallbackTrack);
  const ytPlayerRef = useRef<YTPlayerInstance | null>(null);

  const handleYTReady = useCallback((player: YTPlayerInstance) => {
    console.log("[Pahado] Player ready ✅");
    ytPlayerRef.current = player;
  }, []);

  const handleYTStateChange = useCallback((playing: boolean, track?: TrackInfo) => {
    setIsPlaying(playing);
    if (track) setCurrentTrack(track);
  }, []);

  // Poll progress while playing
  useEffect(() => {
    if (!isPlaying) return;
    const t = setInterval(() => {
      try {
        const curr = ytPlayerRef.current?.getCurrentTime?.() ?? 0;
        const dur = ytPlayerRef.current?.getDuration?.() ?? 0;
        setCurrentTime(Math.floor(curr));
        if (dur > 0) setDuration(Math.floor(dur));
      } catch { /* ignore */ }
    }, 1000);
    return () => clearInterval(t);
  }, [isPlaying]);

  const handlePlayPause = useCallback(() => {
    if (!ytPlayerRef.current) {
      console.warn("[Pahado] Player not ready yet");
      return;
    }
    try {
      if (isPlaying) {
        ytPlayerRef.current.pauseVideo();
      } else {
        ytPlayerRef.current.playVideo();
      }
    } catch (e) {
      console.error("[Pahado] play/pause error:", e);
    }
  }, [isPlaying]);

  const handleNext = useCallback(() => {
    try { ytPlayerRef.current?.nextVideo?.(); } catch { /* ignore */ }
  }, []);

  const handlePrevious = useCallback(() => {
    try { ytPlayerRef.current?.previousVideo?.(); } catch { /* ignore */ }
  }, []);

  const handleToggleShuffle = useCallback(() => {
    const next = !isShuffle;
    setIsShuffle(next);
    window._pahado_is_shuffle = next;
    try { ytPlayerRef.current?.setShuffle?.(next); } catch { /* ignore */ }
  }, [isShuffle]);

  const handleSelectTrackIndex = useCallback((index: number) => {
    try { ytPlayerRef.current?.playVideoAt?.(index); } catch { /* ignore */ }
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
