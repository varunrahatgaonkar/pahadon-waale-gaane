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
  loadVideoById?: (videoId: string) => void;
  setLoop?: (loop: boolean) => void;
}

export interface YTPlayerEvent {
  target: YTPlayerInstance;
  data?: number;
}

export interface TrackInfo {
  title: string;
  artist: string;
}

declare global {
  interface Window {
    onYouTubeIframeAPIReady?: () => void;
    YT?: {
      Player: new (
        el: string | HTMLElement,
        opts: {
          playerVars?: Record<string, string | number>;
          events?: {
            onReady?: (e: YTPlayerEvent) => void;
            onStateChange?: (e: YTPlayerEvent) => void;
            onError?: (e: YTPlayerEvent) => void;
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
    _pahado_is_shuffle?: boolean;
  }
}

interface YouTubePlayerProps {
  onPlayerReady?: (player: YTPlayerInstance) => void;
  onStateChange?: (isPlaying: boolean, trackData?: TrackInfo) => void;
}

function parseTrack(rawTitle?: string, author?: string): TrackInfo {
  if (!rawTitle) return PLAYLIST_CONFIG.fallbackTrack;

  const cleaned = rawTitle
    .replace(/[\(\[\{][^\)\]\}]*(official|lyric|video|hd|4k|audio|full song|visualizer|remastered|music video|lyrics)[^\)\]\}]*[\)\]\}]/gi, "")
    .replace(/\|\s*.*$/, "")
    .trim();

  // Quoted title e.g. Highway: "Maahi Ve"
  const q = cleaned.match(/(?:(.*?):)?\s*["'"']([^"'"']+)["'"']/);
  if (q) {
    const movie = q[1]?.trim() ?? "";
    const song = q[2].trim();
    const rest = cleaned.replace(q[0], "").replace(/^[-|:\s]+/, "").trim();
    return { title: song, artist: [movie, rest].filter(Boolean).join(" • ") || author || "Radio Pahad" };
  }

  const parts = cleaned.split(/\s+[-|:]\s+/);
  if (parts.length >= 2) {
    return { title: parts[0].trim(), artist: parts.slice(1).join(" • ").trim() };
  }

  return { title: cleaned, artist: author || "Radio Pahad" };
}

export function YouTubePlayer({ onPlayerReady, onStateChange }: YouTubePlayerProps) {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const playerRef = useRef<YTPlayerInstance | null>(null);
  const onReadyRef = useRef(onPlayerReady);
  const onChangeRef = useRef(onStateChange);

  useEffect(() => {
    onReadyRef.current = onPlayerReady;
    onChangeRef.current = onStateChange;
  });

  useEffect(() => {
    let isMounted = true;

    const createPlayer = () => {
      if (!window.YT?.Player || !containerRef.current || !isMounted) return;

      const origin = window.location.origin;
      console.log("[Pahado Player] Init playlist embed, origin:", origin);

      playerRef.current = new window.YT.Player(containerRef.current, {
        playerVars: {
          list: PLAYLIST_CONFIG.youtubePlaylistId,
          listType: "playlist",
          // ↓ CRITICAL — without this YouTube ignores play/pause commands
          origin: origin,
          enablejsapi: 1,
          autoplay: 0,
          controls: 0,
          disablekb: 1,
          fs: 0,
          modestbranding: 1,
          rel: 0,
          playsinline: 1,
          iv_load_policy: 3,
        },
        events: {
          onReady: (e: YTPlayerEvent) => {
            if (!isMounted) return;
            console.log("[Pahado Player] ✅ READY");
            onReadyRef.current?.(e.target);
          },
          onStateChange: (e: YTPlayerEvent) => {
            if (!isMounted) return;
            const playing = e.data === window.YT?.PlayerState.PLAYING;

            let track: TrackInfo = PLAYLIST_CONFIG.fallbackTrack;
            try {
              const d = e.target.getVideoData?.();
              if (d?.title) track = parseTrack(d.title, d.author);
            } catch { /* ignore */ }

            console.log(`[Pahado Player] State ${e.data} | Playing: ${playing} | ${track.title}`);
            onChangeRef.current?.(playing, track);
          },
          onError: (e: YTPlayerEvent) => {
            console.warn("[Pahado Player] ⚠️ Error:", e.data);
            // 100 = not found, 101/150 = embed blocked — skip to next
            if (e.data === 100 || e.data === 101 || e.data === 150 || e.data === 5) {
              console.log("[Pahado Player] Skipping restricted/unavailable video...");
              setTimeout(() => {
                if (isMounted && playerRef.current?.nextVideo) {
                  playerRef.current.nextVideo();
                }
              }, 500);
            } else if (isMounted) {
              onChangeRef.current?.(false);
            }
          },
        },
      });
    };

    if (window.YT?.Player) {
      createPlayer();
    } else {
      if (!document.getElementById("yt-iframe-api")) {
        const s = document.createElement("script");
        s.id = "yt-iframe-api";
        s.src = "https://www.youtube.com/iframe_api";
        document.head.appendChild(s);
      }
      const prev = window.onYouTubeIframeAPIReady;
      window.onYouTubeIframeAPIReady = () => {
        prev?.();
        if (isMounted) createPlayer();
      };
    }

    return () => {
      isMounted = false;
      try { playerRef.current?.destroy(); } catch { /* ignore */ }
    };
  }, []);

  return (
    <div
      ref={containerRef}
      id="youtube-hidden-player"
      aria-hidden="true"
      className="fixed bottom-0 right-0 w-16 h-16 opacity-0 pointer-events-none -z-50 overflow-hidden"
    />
  );
}
