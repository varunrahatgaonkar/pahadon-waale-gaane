"use client";

import React, { useEffect, useRef } from "react";
import { PLAYLIST_CONFIG } from "@/lib/playlist";

export interface YTPlayerInstance {
  playVideo: () => void;
  pauseVideo: () => void;
  nextVideo: () => void;
  previousVideo: () => void;
  destroy: () => void;
  getVideoData: () => { title?: string; author?: string; video_id?: string };
  getCurrentTime?: () => number;
  getDuration?: () => number;
  getPlayerState?: () => number;
  setShuffle?: (shuffle: boolean) => void;
  playVideoAt?: (index: number) => void;
  loadVideoById?: (videoId: string | { videoId: string; suggestedQuality?: string }) => void;
  cueVideoById?: (videoId: string) => void;
  setLoop?: (loopPlaylists: boolean) => void;
}

export interface YTPlayerEvent {
  target: YTPlayerInstance;
  data?: number;
}

declare global {
  interface Window {
    onYouTubeIframeAPIReady?: () => void;
    YT?: {
      Player: new (
        elementId: string | HTMLElement,
        options: {
          videoId?: string;
          playerVars?: Record<string, string | number>;
          events?: {
            onReady?: (event: YTPlayerEvent) => void;
            onStateChange?: (event: YTPlayerEvent) => void;
            onError?: (event: YTPlayerEvent) => void;
          };
        }
      ) => YTPlayerInstance;
      PlayerState: {
        PLAYING: number;
        PAUSED: number;
        ENDED: number;
        BUFFERING: number;
        CUED: number;
      };
    };
    _pahado_queue_index?: number;
    _pahado_is_shuffle?: boolean;
    _pahado_played_indices?: Set<number>;
  }
}

export interface TrackInfo {
  title: string;
  artist: string;
}

interface YouTubePlayerProps {
  onPlayerReady?: (player: YTPlayerInstance) => void;
  onStateChange?: (isPlaying: boolean, trackData?: TrackInfo) => void;
  onTrackIndexChange?: (index: number) => void;
}

/**
 * Parses a YouTube video title into a { title, artist } pair.
 * Song name → big bold primary title
 * Movie / singer → small subtext artist
 */
function parseYouTubeTrack(rawTitle?: string, author?: string): TrackInfo {
  if (!rawTitle) return PLAYLIST_CONFIG.fallbackTrack;

  // Strip common YouTube noise from brackets/parens
  const cleaned = rawTitle
    .replace(/[\(\[\{][^\)\]\}]*(official|lyric|video|hd|4k|audio|full song|visualizer|remastered|music video|lyrics)[^\)\]\}]*[\)\]\}]/gi, "")
    .replace(/\|\s*.*$/, "") // strip anything after a pipe
    .trim();

  // Handle quoted song titles: e.g. Highway: "Maahi Ve" or 'Ik Vaari Aa'
  const quoteMatch = cleaned.match(/(?:(.*?):)?\s*["'"']([^"'"']+)["'"']/);
  if (quoteMatch) {
    const moviePrefix = quoteMatch[1] ? quoteMatch[1].trim() : "";
    const songTitle = quoteMatch[2].trim();
    const afterPart = cleaned.replace(quoteMatch[0], "").replace(/^[-|:\s]+/, "").trim();
    const movieOrArtist = [moviePrefix, afterPart].filter(Boolean).join(" • ") || author || "Radio Pahad";
    return { title: songTitle, artist: movieOrArtist };
  }

  // Split on " - " or " | " or " : "
  const parts = cleaned.split(/\s+[-|:]\s+/);
  if (parts.length >= 2) {
    return {
      title: parts[0].trim(),
      artist: parts.slice(1).join(" • ").trim() || author || "Radio Pahad",
    };
  }

  return {
    title: cleaned,
    artist: author || "Radio Pahad • Pahadi Classics",
  };
}

/**
 * Advances to the next track index — with shuffle support.
 */
function getNextIndex(currentIndex: number, total: number, shuffle: boolean): number {
  if (!shuffle) {
    return (currentIndex + 1) % total;
  }
  // Shuffle: pick a random index different from current
  if (total <= 1) return 0;
  let next = Math.floor(Math.random() * total);
  if (next === currentIndex) next = (next + 1) % total;
  return next;
}

export function YouTubePlayer({ onPlayerReady, onStateChange, onTrackIndexChange }: YouTubePlayerProps) {
  const playerRef = useRef<YTPlayerInstance | null>(null);
  const containerRef = useRef<HTMLDivElement | null>(null);
  const onPlayerReadyRef = useRef(onPlayerReady);
  const onStateChangeRef = useRef(onStateChange);
  const onTrackIndexChangeRef = useRef(onTrackIndexChange);
  const currentIndexRef = useRef<number>(0);

  useEffect(() => {
    onPlayerReadyRef.current = onPlayerReady;
    onStateChangeRef.current = onStateChange;
    onTrackIndexChangeRef.current = onTrackIndexChange;
  });

  const loadTrackAtIndex = (index: number) => {
    const tracks = PLAYLIST_CONFIG.tracks;
    if (!tracks.length) return;
    const safeIndex = ((index % tracks.length) + tracks.length) % tracks.length;
    currentIndexRef.current = safeIndex;
    onTrackIndexChangeRef.current?.(safeIndex);

    const videoId = tracks[safeIndex].id;
    console.log(`[Pahado Player] Loading track [${safeIndex}]: ${tracks[safeIndex].title} (${videoId})`);

    if (playerRef.current && typeof playerRef.current.loadVideoById === "function") {
      playerRef.current.loadVideoById(videoId);
    }
  };

  // Expose queue navigator so usePlayerState can call it
  useEffect(() => {
    (window as Window & { _pahado_loadIndex?: (i: number) => void })._pahado_loadIndex = loadTrackAtIndex;
  });

  useEffect(() => {
    let isMounted = true;
    const tracks = PLAYLIST_CONFIG.tracks;

    const createPlayer = () => {
      if (!window.YT?.Player || !containerRef.current || !isMounted) return;

      // Determine the site origin for YouTube IFrame API auth
      const origin = typeof window !== "undefined" ? window.location.origin : "https://pahadon-waale-gaane.vercel.app";

      console.log("[Pahado Player] Creating YT.Player with origin:", origin);

      const firstVideoId = tracks[0]?.id ?? "";

      playerRef.current = new window.YT.Player(containerRef.current, {
        videoId: firstVideoId,
        playerVars: {
          // CRITICAL: origin must match the page's URL for IFrame API to work
          origin: origin,
          enablejsapi: 1,
          autoplay: 0,
          controls: 0,
          disablekb: 1,
          fs: 0,
          modestbranding: 1,
          rel: 0,
          // iv_load_policy 3 = hide video annotations
          iv_load_policy: 3,
          // playsinline is essential for iOS
          playsinline: 1,
        },
        events: {
          onReady: (event: YTPlayerEvent) => {
            if (!isMounted) return;
            console.log("[Pahado Player] ✅ Player READY — queue-based navigation enabled.");
            onPlayerReadyRef.current?.(event.target);
          },

          onStateChange: (event: YTPlayerEvent) => {
            if (!isMounted) return;
            const state = event.data;
            const isPlaying = state === window.YT?.PlayerState.PLAYING;

            // Ended → auto-advance to next
            if (state === window.YT?.PlayerState.ENDED) {
              const nextIdx = getNextIndex(
                currentIndexRef.current,
                tracks.length,
                window._pahado_is_shuffle ?? false
              );
              console.log("[Pahado Player] Track ended, auto-advancing to index:", nextIdx);
              loadTrackAtIndex(nextIdx);
              return;
            }

            let trackInfo: TrackInfo = PLAYLIST_CONFIG.fallbackTrack;
            try {
              const videoData = event.target.getVideoData?.();
              if (videoData?.title) {
                trackInfo = parseYouTubeTrack(videoData.title, videoData.author);
              }
            } catch {
              // ignore getVideoData errors
            }

            // Override with curated metadata if available for current track
            const curated = tracks[currentIndexRef.current];
            if (curated) {
              trackInfo = { title: curated.title, artist: curated.artist };
            }

            console.log(`[Pahado Player] State: ${state} | Playing: ${isPlaying} |`, trackInfo.title);
            onStateChangeRef.current?.(isPlaying, trackInfo);
          },

          onError: (err: YTPlayerEvent) => {
            console.warn("[Pahado Player] ⚠️ Error code:", err.data, "on track index:", currentIndexRef.current);

            // Error 100 = video not found
            // Error 101 / 150 = embed-restricted by video owner — SKIP
            // Error 5 = HTML5 player error — SKIP
            if (err.data === 101 || err.data === 150 || err.data === 100 || err.data === 5) {
              console.log("[Pahado Player] Embed-restricted or unavailable — skipping to next track...");
              const nextIdx = getNextIndex(currentIndexRef.current, tracks.length, window._pahado_is_shuffle ?? false);
              setTimeout(() => loadTrackAtIndex(nextIdx), 600);
            } else {
              onStateChangeRef.current?.(false);
            }
          },
        },
      });
    };

    if (window.YT?.Player) {
      createPlayer();
    } else {
      // Load the YouTube IFrame API script once
      if (!document.getElementById("youtube-iframe-api")) {
        const tag = document.createElement("script");
        tag.id = "youtube-iframe-api";
        tag.src = "https://www.youtube.com/iframe_api";
        document.head.appendChild(tag);
      }

      const prev = window.onYouTubeIframeAPIReady;
      window.onYouTubeIframeAPIReady = () => {
        prev?.();
        if (isMounted) createPlayer();
      };
    }

    return () => {
      isMounted = false;
      try {
        playerRef.current?.destroy();
      } catch {
        // ignore
      }
    };
  }, []);

  return (
    // The div becomes the YouTube player container — YT replaces it with an iframe
    <div
      ref={containerRef}
      id="youtube-hidden-player"
      className="fixed bottom-0 right-0 w-16 h-16 opacity-0 pointer-events-none -z-50 overflow-hidden"
      aria-hidden="true"
    />
  );
}
