"use client";

import React, { useEffect, useRef } from "react";
import { PLAYLIST_CONFIG } from "@/lib/playlist";

export interface YTPlayerInstance {
  playVideo: () => void;
  pauseVideo: () => void;
  nextVideo: () => void;
  previousVideo: () => void;
  destroy: () => void;
  getVideoData: () => { title?: string; author?: string };
  getCurrentTime?: () => number;
  getDuration?: () => number;
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
        elementId: string,
        options: {
          height?: string | number;
          width?: string | number;
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
      };
    };
  }
}

interface YouTubePlayerProps {
  onPlayerReady?: (player: YTPlayerInstance) => void;
  onStateChange?: (isPlaying: boolean, trackData?: { title: string; artist: string }) => void;
}

export function YouTubePlayer({ onPlayerReady, onStateChange }: YouTubePlayerProps) {
  const playerRef = useRef<YTPlayerInstance | null>(null);
  const onPlayerReadyRef = useRef(onPlayerReady);
  const onStateChangeRef = useRef(onStateChange);

  useEffect(() => {
    onPlayerReadyRef.current = onPlayerReady;
    onStateChangeRef.current = onStateChange;
  });

  useEffect(() => {
    let isMounted = true;

    const initPlayer = () => {
      if (!window.YT || !window.YT.Player) return;

      playerRef.current = new window.YT.Player("youtube-hidden-player", {
        height: "1",
        width: "1",
        playerVars: {
          listType: "playlist",
          list: PLAYLIST_CONFIG.youtubePlaylistId,
          autoplay: 0,
          controls: 0,
          disablekb: 1,
          fs: 0,
          modestbranding: 1,
          rel: 0,
        },
        events: {
          onReady: (event: YTPlayerEvent) => {
            if (isMounted) {
              onPlayerReadyRef.current?.(event.target);
            }
          },
          onStateChange: (event: YTPlayerEvent) => {
            if (!isMounted) return;
            const isPlaying = event.data === window.YT?.PlayerState.PLAYING;
            let trackInfo = PLAYLIST_CONFIG.fallbackTrack;

            if (event.target && typeof event.target.getVideoData === "function") {
              const videoData = event.target.getVideoData();
              if (videoData && videoData.title) {
                const parts = videoData.title.split("-");
                if (parts.length > 1) {
                  trackInfo = {
                    title: parts[1].trim(),
                    artist: parts[0].trim(),
                  };
                } else {
                  trackInfo = {
                    title: videoData.title,
                    artist: videoData.author || "Pahadi Classics",
                  };
                }
              }
            }

            onStateChangeRef.current?.(isPlaying, trackInfo);
          },
          onError: () => {
            onStateChangeRef.current?.(false);
          },
        },
      });
    };

    if (window.YT && window.YT.Player) {
      initPlayer();
    } else {
      const existingScript = document.getElementById("youtube-iframe-api");
      if (!existingScript) {
        const tag = document.createElement("script");
        tag.id = "youtube-iframe-api";
        tag.src = "https://www.youtube.com/iframe_api";
        const firstScriptTag = document.getElementsByTagName("script")[0];
        firstScriptTag?.parentNode?.insertBefore(tag, firstScriptTag);
      }

      const prevCallback = window.onYouTubeIframeAPIReady;
      window.onYouTubeIframeAPIReady = () => {
        if (prevCallback) prevCallback();
        if (isMounted) initPlayer();
      };
    }

    return () => {
      isMounted = false;
      if (playerRef.current && typeof playerRef.current.destroy === "function") {
        playerRef.current.destroy();
      }
    };
  }, []);

  return (
    <div
      id="youtube-hidden-player"
      className="absolute top-0 left-0 w-px h-px opacity-0 pointer-events-none -z-50 overflow-hidden"
      aria-hidden="true"
    />
  );
}
