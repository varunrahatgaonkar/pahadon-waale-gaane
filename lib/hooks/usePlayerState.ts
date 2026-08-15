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
  const [currentIndex, setCurrentIndex] = useState<number>(0);

  const ytPlayerRef = useRef<YTPlayerInstance | null>(null);

  // Keep window-level shuffle flag in sync (read by YouTubePlayer for auto-advance)
  useEffect(() => {
    window._pahado_is_shuffle = isShuffle;
  }, [isShuffle]);

  const handleYTReady = useCallback((playerInstance: YTPlayerInstance) => {
    console.log("[Pahado Player Hook] handleYTReady ✅ — player is ready.");
    ytPlayerRef.current = playerInstance;
  }, []);

  const handleYTStateChange = useCallback((playing: boolean, trackData?: TrackInfo) => {
    setIsPlaying(playing);
    if (trackData) {
      setCurrentTrack(trackData);
    }
  }, []);

  const handleTrackIndexChange = useCallback((index: number) => {
    setCurrentIndex(index);
    const curated = PLAYLIST_CONFIG.tracks[index];
    if (curated) {
      setCurrentTrack({ title: curated.title, artist: curated.artist });
    }
  }, []);

  // Poll YouTube player progress when playing
  useEffect(() => {
    if (!isPlaying) return;
    const interval = setInterval(() => {
      if (ytPlayerRef.current) {
        try {
          const curr = ytPlayerRef.current.getCurrentTime?.() ?? 0;
          setCurrentTime(Math.floor(curr));
          const dur = ytPlayerRef.current.getDuration?.() ?? 0;
          if (dur > 0) setDuration(Math.floor(dur));
        } catch {
          // ignore
        }
      }
    }, 1000);
    return () => clearInterval(interval);
  }, [isPlaying]);

  // ── Controls ──────────────────────────────────────────────────────────────

  const handlePlayPause = useCallback(() => {
    console.log("[Pahado Player Hook] Play/Pause clicked — isPlaying:", isPlaying);
    if (!ytPlayerRef.current) {
      console.warn("[Pahado Player Hook] Player not ready yet!");
      return;
    }
    try {
      if (isPlaying) {
        ytPlayerRef.current.pauseVideo();
      } else {
        ytPlayerRef.current.playVideo();
      }
    } catch (err) {
      console.error("[Pahado Player Hook] play/pause error:", err);
    }
  }, [isPlaying]);

  const handleNext = useCallback(() => {
    const tracks = PLAYLIST_CONFIG.tracks;
    let nextIdx: number;
    if (isShuffle && tracks.length > 1) {
      let r = Math.floor(Math.random() * tracks.length);
      if (r === currentIndex) r = (r + 1) % tracks.length;
      nextIdx = r;
    } else {
      nextIdx = (currentIndex + 1) % tracks.length;
    }
    console.log("[Pahado Player Hook] Next → index", nextIdx);
    // Delegate to YouTubePlayer's queue loader
    const loader = (window as Window & { _pahado_loadIndex?: (i: number) => void })._pahado_loadIndex;
    loader?.(nextIdx);
  }, [currentIndex, isShuffle]);

  const handlePrevious = useCallback(() => {
    const tracks = PLAYLIST_CONFIG.tracks;
    const prevIdx = ((currentIndex - 1) + tracks.length) % tracks.length;
    console.log("[Pahado Player Hook] Prev → index", prevIdx);
    const loader = (window as Window & { _pahado_loadIndex?: (i: number) => void })._pahado_loadIndex;
    loader?.(prevIdx);
  }, [currentIndex]);

  const handleToggleShuffle = useCallback(() => {
    const next = !isShuffle;
    console.log("[Pahado Player Hook] Shuffle:", next);
    setIsShuffle(next);
  }, [isShuffle]);

  const handleSelectTrackIndex = useCallback((index: number) => {
    console.log("[Pahado Player Hook] Select track index:", index);
    const loader = (window as Window & { _pahado_loadIndex?: (i: number) => void })._pahado_loadIndex;
    loader?.(index);
  }, []);

  return {
    isPlaying,
    isShuffle,
    currentTime,
    duration,
    currentTrack,
    currentIndex,
    handleYTReady,
    handleYTStateChange,
    handleTrackIndexChange,
    handlePlayPause,
    handleNext,
    handlePrevious,
    handleToggleShuffle,
    handleSelectTrackIndex,
  };
}
